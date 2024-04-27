import axios from "axios";
import React, { useEffect, useState, useContext } from "react";

const StudentContext = React.createContext({
    students: [],
    setStudents: () => {}
});

export const StudentProvider = ({ children }) => {
    const [students, setStudents] = React.useState([]);
    const [studentToEdit, setStudentToEdit] = React.useState(null);

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
                fetchLocalData();
            });
    };

    const handleEdit = (updatedStudent) => {
        console.log('Student to edit:', studentToEdit);
        axios.put(`http://localhost:8080/students/${studentToEdit.id}`, updatedStudent)
            .then(() => {
                fetchStudents(); 
                setStudentToEdit(null);
            })
            .catch(error => {
                console.error('Error updating student:', error);
            });
    };
    

    const handleDelete = (studentId) => {
        axios.delete(`http://localhost:8080/students/${studentId}`)
            .then(() => {
                fetchStudents(); 
            })
            .catch(error => {
                console.error('Error deleting student:', error);
            });
    };

    return(
        <StudentContext.Provider value={{students, setStudents, handleSubmit, handleEdit, handleDelete, setStudentToEdit}}>
            {children}
        </StudentContext.Provider>
    )
}

export default StudentContext;
