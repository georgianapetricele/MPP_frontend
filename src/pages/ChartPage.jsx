// import React, { useEffect, useState } from "react";
// import ChartComponent from "./ChartComponent.jsx";

// const ChartPage = () => {
//   const [students, setStudents] = useState([]);

//   useEffect(() => {
//     const savedStudents = localStorage.getItem("students");
//     if (savedStudents) {
//       setStudents(JSON.parse(savedStudents));
//     }
//   }, []);

//   // Generate chart data based on the students fetched from local storage
//   const chartData = {
//     labels: students.map(student => student.name),
//     datasets: [{
//       label: 'Age',
//       data: students.map(student => student.age),
//       backgroundColor: 'rgba(54, 162, 235, 0.2)', // Background color for bars
//       borderColor: 'rgba(54, 162, 235, 1)', // Border color for bars
//       borderWidth: 1
      
//     }]
//   };

//   // Chart options
//   const chartOptions = {
//     scales: {
//       y: {
//         beginAtZero: true // Start y-axis at 0
//       }
//     }
//   };

//   return (
//     <div className="centerContainer">
//       <h1>Students Age Chart</h1>
//       <ChartComponent type="bar" data={chartData} options={chartOptions}  height={300} // Set height
//         width={500}/>
//     </div>
//   );
// };

// export default ChartPage;