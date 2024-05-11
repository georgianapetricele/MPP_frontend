import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { ModalStudent } from "./ModalStudent.jsx";
import { ModalEditStudent } from "./ModalEditStudent.jsx";
import "../css/master.css";
import axios from "axios";


const StudentsPage = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [modalAddOpen, setModalAddOpen] = useState(false);
    const [modalEditOpen, setModalEditOpen] = useState(false);
    const [studentToEdit, setStudentToEdit] = useState(null);
    const [totalPages, setTotalPages] = useState(500);

    const { userId } = useParams();
    console.log('The user id',userId);
    const [students, setStudents] = useState([]);

    useEffect(() => {
        fetchStudents();
    }, [userId, currentPage]);

    console.log('The current page',currentPage);

    const handlePrevPage = () => {
        setCurrentPage(currentPage - 1); 
      };
    
      
      const handleNextPage = () => {
        setCurrentPage(currentPage + 1); 
      };

    
    const fetchStudents = () => {
        syncLocalDataStudents(); 
        axios.get(`http://localhost:8080/students/page/${userId}/${currentPage}`)
            .then(response => {
                const serverStudents = response.data;
                setStudents(serverStudents);
            
            })
            .catch(error => {
                console.error('Error fetching students:', error);
                alert('Failed to fetch students from the server. Fetching local data...');
                fetchLocalDataStudents();
            });
    };


    const syncLocalDataStudents = () => {
        const localData = getLocalDataStudents();
        try {
            localData.map((student) => {
                console.log('id online',userId);
                axios.post(`http://localhost:8080/students/${userId}`, student);
                console.log('Student synced:', student);
                removeLocalStudent(student.id);
            });
            localStorage.removeItem("students");
        } catch (error) {
            console.error('Error syncing students:', error);
        }
    };

    
     const removeLocalStudent = (studentId) => {
            const currentData = getLocalDataStudents();
            const updatedData = currentData.filter(student => student.id !== studentId);
            localStorage.setItem("students", JSON.stringify(updatedData));
        };
    

    const fetchLocalDataStudents = () => {
        const localData = getLocalDataStudents();
        if (localData) {
            setStudents(localData);
        } else {
            alert('Local data not available.');
        }
    };

    const getLocalDataStudents = () => {
        const data = localStorage.getItem("students");
        return data ? JSON.parse(data) : [];
    };

    const saveToLocalStudents = (data) => {
        localStorage.setItem("students", JSON.stringify(data));
    };


    const handleSubmitStudents = (studentUserId,newStudent) => {
   
        axios.post(`http://localhost:8080/students/${userId}`, newStudent)
            .then(() => {
                fetchStudents();
            })
            .catch(error => {
                //console.error('Error adding student:', error);
                console.log(newStudent);
                saveToLocalStudents([...students, newStudent]);
                console.log('Students:', students);
                fetchLocalDataStudents();
            });
    };

    const handleEditStudents = (studentId, updatedStudent) => {
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
                saveToLocalStudents(updatedStudents);
            });
    };
    

    const handleDeleteStudents = (studentId) => {
        axios.delete(`http://localhost:8080/students/${studentId}`)
            .then(() => {
                fetchStudents(); 
            })
            .catch(error => {
                console.error('Error deleting student:', error);
                saveToLocalStudents(students.filter(student => student.id !== studentId));
                fetchLocalDataStudents();
            });
    };


    return (
        <div className="centerContainer">
            <h1>Students List</h1>
            <table className="table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Age</th>
                        <th colSpan={2}>Options</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map((student,index) => (
                        <tr key={student.id}>
                            <td>
                                    {student.name}
                            </td>
                            <td>{student.age}</td>
                            <td>
                                <button className="btn" onClick={() => {
                                    setModalEditOpen(true);
                                    setStudentToEdit(student);
                                }}>Update</button>
                            </td>
                            <td>
                                <button className="btn" onClick={() => handleDeleteStudents(student.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
                    
            <div>
            {/* Previous page button */}
            <button onClick={handlePrevPage} disabled={currentPage === 1}>
            Previous
            </button>

            {/* Display current page and total pages */}
            <span>Page {currentPage} of {totalPages}</span>

            {/* Next page button */}
            <button onClick={handleNextPage} disabled={currentPage === totalPages}>
            Next
            </button>
            </div>
            
            <table>
                <tbody>
                    <tr>
                        <td>
                            <button className="btn" onClick={() => setModalAddOpen(true)}>Add</button>
                        </td>
                    </tr>
                </tbody>
            </table>

            {modalEditOpen && (
                <ModalEditStudent
                    closeModal={() => {
                        setModalEditOpen(false);
                        setStudentToEdit(null);
                    }}
                    onSubmit={handleEditStudents}
                    defaultValue={studentToEdit}
                    studentId={studentToEdit.id}
                />
            )}
            {modalAddOpen && (
                <ModalStudent
                    closeModal={() => setModalAddOpen(false)}
                    onSubmit={handleSubmitStudents}
                    studentUserId={userId}
                />
            )}
          
        </div>
    );
};

export default StudentsPage;