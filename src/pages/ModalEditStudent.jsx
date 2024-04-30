import "../css/modal.css";
import { useState } from "react";

export const ModalEditStudent = ({ closeModal, onSubmit, defaultValue, studentId }) => {
    const [formState, setFormState] = useState(defaultValue || {
        name: "",
        age: "",
        major: "",
    });

    const [errors, setErrors] = useState("");

    const validateForm = (e) => {
        if (formState.name && formState.age && formState.major) {
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
        onSubmit(studentId, formState);
        closeModal();
    }

    return (
        <div className="modal-container" onClick={(e) => {
            if (e.target.className === "modal-container")
                closeModal();
        }}>
            <div className="modal">
                <form>
                    <div className="form-group">
                        <label htmlFor="name">Name:</label>
                        <input type="text" id="name" name="name" value={formState.name} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="age">Age:</label>
                        <input type="text" id="age" name="age" value={formState.age} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="major">Major:</label>
                        <input type="text" id="major" name="major" value={formState.major} onChange={handleChange} />
                    </div>
                    {/* {errors && <div className="error">{`Please include: ${errors}`}</div>} */}
                    <div className="form-group">
                        <button type="submit" className="btn" onClick={handleSubmit}>Submit</button>
                    </div>
                </form>
            </div>
        </div>
    );
};