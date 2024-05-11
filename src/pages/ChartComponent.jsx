// import React, { useEffect, useRef } from "react";
// import Chart from "chart.js/auto";

// const ChartComponent = ({ data, height, width }) => { 
//   const chartRef = useRef(null);
//   const chartInstance = useRef(null); 

//   useEffect(() => {
//     if (chartInstance.current !== null) {

//       chartInstance.current.destroy();
//     }

//     if (chartRef.current) {
//       const ctx = chartRef.current.getContext("2d");

//       chartInstance.current = new Chart(ctx, {
//         type: 'bar',
//         data: data,
//         options: {
//           scales: {
//             y: {
//               beginAtZero: true 
//             }
//           }
//         }
//       });
//     }

//     return () => {
//       if (chartInstance.current !== null) {

//         chartInstance.current.destroy();
//       }
//     };
//   }, [data]);

 
//   useEffect(() => {
//     if (chartRef.current && height && width) {
//       chartRef.current.height = height;
//       chartRef.current.width = width;
//     }
//   }, [height, width]);

//   return (
//     <div>
//       <canvas ref={chartRef} height="600" width="800"></canvas>
//     </div>
//   );
// };

// export default ChartComponent;