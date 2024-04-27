import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../css/details.css";

const DetailsPage = () => {
    const { studentId } = useParams();
    const [student, setStudent] = useState(null);

    useEffect(() => {
        fetchStudentDetails();
    }, [studentId]);

    const fetchStudentDetails = () => {
        axios.get(`http://localhost:8080/students/${studentId}`)
            .then(response => {
                console.log('Fetched student details:', response.data);
                setStudent(response.data);
            })
            .catch(error => {
                console.error('Error fetching student details:', error);
            });
    };

    return (
        <div className="detailsContainer">
            <div className="detailsContent">
                {student ? (
                    <>
                        <div className="detailsHeader">Student Details</div>
                        <div className="detailsBody">
                            <div className="detailsItem">
                                <span className="detailsLabel">Name:</span>
                                <span className="detailsText">{student.name}</span>
                            </div>
                            <div className="detailsItem">
                                <span className="detailsLabel">Age:</span>
                                <span className="detailsText">{student.age}</span>
                            </div>
                            <div className="detailsItem">
                                <span className="detailsLabel">Major:</span>
                                <span className="detailsText">{student.major}</span>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="detailsText">Loading...</div>
                )}
            </div>
        </div>
    );
};

export default DetailsPage;
