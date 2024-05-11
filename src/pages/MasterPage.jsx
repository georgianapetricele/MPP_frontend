import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Modal } from "./Modal.jsx";
import { ModalEdit } from "./ModalEdit.jsx";
import { ModalFilter } from "./ModalFilter.jsx";
import "../css/master.css";
import ReactPaginate from 'react-paginate';
import axios from "axios";
import Context from "./Context.jsx";


const MasterPage = () => {
    const { users, handleSubmit, handleEdit, handleDelete,currentPage,setCurrentPage,totalPages } = useContext(Context);
    const [modalAddOpen, setModalAddOpen] = useState(false);
    const [modalEditOpen, setModalEditOpen] = useState(false);
    const [userToEdit, setUserToEdit] = useState(null);

    console.log('users:', users );

    const handlePrevPage = () => {
        setCurrentPage(currentPage - 1); // Decrement currentPage
      };
    
      // Function to handle click event for next page button
      const handleNextPage = () => {
        setCurrentPage(currentPage + 1); // Increment currentPage
      }; 

    return (
        <div className="centerContainer">
            <h1>Users List</h1>
            <table className="table">
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Students Count</th>
                        <th colSpan={2}>Options</th>
                    </tr>
                </thead>
                <tbody>
                    {
              
                    users.map((user,index) => (
                        <tr key={user.userId}>
                            <td>
                            <Link to={`/${user.userId}`} className="link">
                                {user.username}
                            </Link>
                            </td>
                            <td>{user.email}</td>
                            <td>{user.nrStudents}</td>
                            <td>
                                <button className="btn" onClick={() => {
                                    setModalEditOpen(true);
                                    setUserToEdit(user);
                                }}>Update</button>
                            </td>
                            <td>
                                <button className="btn" onClick={() => handleDelete(user.userId)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="pag">
            {/* Previous page button */}
            <button className="pagBtn" onClick={handlePrevPage} disabled={currentPage === 1}>
            Previous
            </button>

            {/* Display current page and total pages */}
            <span>Page {currentPage} of {totalPages}</span>

            {/* Next page button */}
            <button className="pagBtn" onClick={handleNextPage} disabled={currentPage === totalPages}>
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
                <ModalEdit
                    closeModal={() => {
                        setModalEditOpen(false);
                        setUserToEdit(null);
                    }}
                    onSubmit={handleEdit}
                    defaultValue={userToEdit}
                    userId={userToEdit.userId}
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