import { getMaximumSize } from "chart.js/helpers";
import "../css/modal.css";
import { useState } from "react";

export const ModalStudent = ({ closeModal, onSubmit,studentUserId }) => {
    const [formState, setFormState] = useState({
        name: "",
        age: "",
        major: ""
    });

    const [errors, setErrors] = useState("");
    const studentsFromLocalStorage = JSON.parse(localStorage.getItem("students")); // Retrieve students from local storage
    if(studentsFromLocalStorage === null)
        var maxId = 0;
    else
        var maxId = studentsFromLocalStorage.length;

    const validateForm = () => {
        const { name, age, major } = formState;
        if (name && age && major) {
            setErrors("");
            return true;
        } else {
            let errorFields = [];
            for (const [key, value] of Object.entries(formState)) {
                if (!value) {
                    errorFields.push(key);
                }
            }
            setErrors(errorFields.join(", "));
            return false;
        }
    };

    const handleChange = (e) => {
        setFormState({
            ...formState,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validateForm()) return;
        const newId = maxId + 1; // Increment ID for the new student
        const newStudent = { ...formState, id: newId.toString() };
        onSubmit(studentUserId,newStudent);
        closeModal();
    };

    return (
        <div
            className="modal-container"
            onClick={(e) => {
                if (e.target.className === "modal-container") closeModal();
            }}
        >
            <div className="modal">
                <form>
                    <div className="form-group">
                        <input type="hidden" id="studentId" />
                        <label htmlFor="name">Name: </label>
                        <input type="text" id="name" name="name" value={formState.name} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="age">Age: </label>
                        <input type="number" id="age" name="age" value={formState.age} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="major">Major: </label>
                        <input type="text" id="major" name="major" value={formState.major} onChange={handleChange} />
                    </div>
                    {errors && <div className="error">{`Please include: ${errors}`}</div>}
                    <div className="form-group">
                        <button type="submit" className="btn" onClick={handleSubmit}>
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};