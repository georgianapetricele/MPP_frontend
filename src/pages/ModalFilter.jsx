import React, { useState } from "react";
import "../css/modal.css";

export const ModalFilter = ({ closeModal, onSubmit }) => {
    const [filterCriteria, setFilterCriteria] = useState({
        name: "",
        age: "",
        major: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFilterCriteria({
            ...filterCriteria,
            [name]: value
        });
    };

    const handleSubmit = () => {
        // Remove empty criteria
        const filteredCriteria = Object.keys(filterCriteria)
            .filter((key) => filterCriteria[key] !== "")
            .reduce((obj, key) => {
                obj[key] = filterCriteria[key];
                return obj;
            }, {});

        onSubmit(filteredCriteria); // Pass the filter criteria back to the parent component
        closeModal();
    };

    return (
        <div className="modal-container" onClick={(e) => { if (e.target.className === "modal-container") closeModal(); }}>
            <div className="modal">
                <h2>Filter Students</h2>
                <div className="form-group">
                    <label htmlFor="name">Name: </label>
                    <input type="text" id="name" name="name" value={filterCriteria.name} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="age">Age: </label>
                    <input type="text" id="age" name="age" value={filterCriteria.age} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="major">Major: </label>
                    <input type="text" id="major" name="major" value={filterCriteria.major} onChange={handleChange} />
                </div>
                <button className="btn" onClick={handleSubmit}>Filter</button>
            </div>
        </div>
    );
};

export default ModalFilter;