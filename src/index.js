import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MasterPage from "./pages/MasterPage";
import DetailsPage from "./pages/DetailsPage";
import ChartPage from "./pages/ChartPage";
import StudentContext from "./pages/StudentContext";
import { useState } from "react";
import { StudentProvider } from "./pages/StudentContext";
import axios from "axios";


ReactDOM.render(
    <React.StrictMode>
        <Router>
            <StudentProvider> 
                <Routes>
                    <Route path="/" element={<MasterPage />} />
                    <Route path="/:studentId" element={<DetailsPage />} />
                    <Route path="/chart" element={<ChartPage />} />
                </Routes>
            </StudentProvider>
        </Router>
    </React.StrictMode>,
    document.getElementById("root")
);
