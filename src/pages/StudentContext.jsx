import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
const StudentContext = React.createContext({
    students: [],
    setStudents: () => {}
});

export const StudentProvider = ({ children }) => {
    const [students, setStudents] = React.useState([]);

    useEffect(() => {
        fetchStudents();
    }, []);


    const fetchStudents = async () => {
        await syncLocalData(); // Synchronize local data before fetching from server
        axios.get('http://localhost:8080/students')
            .then(response => {
                const serverStudents = response.data;
                setStudents(serverStudents);
            })
            .catch(error => {
                console.error('Error fetching students:', error);
                alert('Failed to fetch students from the server. Fetching local data...');
                fetchLocalData();
            });
    };


    const syncLocalData = async () => {
        const localData = getLocalData();
        try {
            await Promise.all(localData.map(async (student) => {
                await axios.post('http://localhost:8080/students/2', student);
                console.log('Student synced:', student);
                removeLocalStudent(student.id); // Make sure this function properly updates local storage
                await new Promise(resolve => setTimeout(resolve, 3000)); // Wait for 3 seconds between requests
            }));
        } catch (error) {
            console.error('Error syncing students:', error);
        }
    };

    
     const removeLocalStudent = (studentId) => {
            const currentData = getLocalData();
            const updatedData = currentData.filter(student => student.id !== studentId);
            localStorage.setItem("students", JSON.stringify(updatedData));
        };
    

    const fetchLocalData = () => {
        const localData = getLocalData();
        if (localData) {
            setStudents(localData);
        } else {
            alert('Local data not available.');
        }
    };

    const getLocalData = () => {
        const data = localStorage.getItem("students");
        return data ? JSON.parse(data) : [];
    };

    const saveToLocal = (data) => {
        localStorage.setItem("students", JSON.stringify(data));
    };


    const handleSubmit = (newStudent) => {
        axios.post('http://localhost:8080/students/2', newStudent)
            .then(() => {
                fetchStudents();
            })
            .catch(error => {
                //console.error('Error adding student:', error);
                console.log(newStudent);
                saveToLocal([...students, newStudent]);
                console.log('Students:', students);
                fetchLocalData();
            });
    };

    const handleEdit = (studentId, updatedStudent) => {
        axios.put(`http://localhost:8080/students/${studentId}`, updatedStudent)
            .then(() => {
                fetchStudents(); 
            })
            .catch(error => {
                console.log(studentId, updatedStudent);
                const updatedStudents = students.map(student => {
                    if (student.id === studentId) {
                        return { ...student, ...updatedStudent };
                    }
                    return student;
                });
                setStudents(updatedStudents);
                saveToLocal(updatedStudents);
            });
    };
    

    const handleDelete = (studentId) => {
        axios.delete(`http://localhost:8080/students/${studentId}`)
            .then(() => {
                fetchStudents(); 
            })
            .catch(error => {
                console.error('Error deleting student:', error);
                saveToLocal(students.filter(student => student.id !== studentId));
                fetchLocalData();
            });
    };

    return(
        <StudentContext.Provider value={{students, setStudents, handleSubmit, handleEdit, handleDelete}}>
            {children}
        </StudentContext.Provider>
    )
}

export default StudentContext;