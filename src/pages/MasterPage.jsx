import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Modal } from "./Modal.jsx";
import { ModalEdit } from "./ModalEdit.jsx";
import { ModalFilter } from "./ModalFilter.jsx";
import "../css/master.css";
import ReactPaginate from 'react-paginate';
import axios from "axios";
import StudentContext from "./StudentContext";

const STUDENTS_PER_PAGE = 3;

const MasterPage = () => {
    const { students, studentToEdit, setStudentToEdit, handleSubmit, handleEdit, handleDelete } = useContext(StudentContext);
    const [currentPage, setCurrentPage] = useState(0);
    const [modalAddOpen, setModalAddOpen] = useState(false);
    const [modalEditOpen, setModalEditOpen] = useState(false);

    const handlePageChange = ({ selected }) => {
        setCurrentPage(selected);
    };

    const startIndex = currentPage * STUDENTS_PER_PAGE;
    const endIndex = (currentPage + 1) * STUDENTS_PER_PAGE;
    const paginatedStudents = students.slice(startIndex, endIndex);

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
                    {paginatedStudents.map((student,index) => (
                        <tr key={student.id}>
                            <td>
                                {/* <Link to={`/${student.id}`} className="link">
                                    {student.name}
                                </Link> */}
                            </td>
                            <td>{student.age}</td>
                            <td>
                                <button className="btn" onClick={() => {
                                    setModalEditOpen(true);
                                    setStudentToEdit(student);
                                }}>Update</button>
                            </td>
                            <td>
                                <button className="btn" onClick={() => handleDelete(student.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <ReactPaginate
                pageCount={Math.ceil(students.length / STUDENTS_PER_PAGE)}
                pageRangeDisplayed={3}
                marginPagesDisplayed={1}
                onPageChange={handlePageChange}
                containerClassName={'pagination'}
                activeClassName={'active'}
            />
            
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
                <ModalEdit
                    closeModal={() => {
                        setModalEditOpen(false);
                        setStudentToEdit(null);
                    }}
                    onSubmit={handleEdit}
                    defaultValue={studentToEdit}
                />
            )}
            {modalAddOpen && (
                <Modal
                    closeModal={() => setModalAddOpen(false)}
                    onSubmit={handleSubmit}
                />
            )}
          
        </div>
    );
};

export default MasterPage;
