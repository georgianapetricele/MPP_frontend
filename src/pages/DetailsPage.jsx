// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import "../css/details.css";

// const DetailsPage = () => {
//     const { userId } = useParams();
//     const [user, setUser] = useState(null);

//     useEffect(() => {
//         fetchUserDetails();
//     }, [userId]);

//     const fetchUserDetails = () => {
//         axios.get(`http://localhost:8080/users/${userId}`)
//             .then(response => {
//                 console.log('Fetched user details:', response.data);
//                 setUser(response.data);
//             })
//             .catch(error => {
//                 console.error('Error fetching user details:', error);
//             });
//     };

//     return (
//         <div className="detailsContainer">
//             <div className="detailsContent">
//                 {user ? (
//                     <>
//                         <div className="detailsHeader">User Details</div>
//                         <div className="detailsBody">
//                             <div className="detailsItem">
//                                 <span className="detailsLabel">Username:</span>
//                                 <span className="detailsText">{user.username}</span>
//                             </div>
                         
//                             <div className="detailsItem">
//                                 <span className="detailsLabel">Email:</span>
//                                 <span className="detailsText">{user.email}</span>
//                             </div>
//                         </div>
//                     </>
//                 ) : (
//                     <div className="detailsText">Loading...</div>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default DetailsPage;
