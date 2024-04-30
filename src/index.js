import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MasterPage from "./pages/MasterPage";
//import DetailsPage from "./pages/DetailsPage";
import ChartPage from "./pages/ChartPage";
import StudentsPage  from "./pages/StudentsPage";
import { Provider } from "./pages/Context";
import axios from "axios";


ReactDOM.render(
    <React.StrictMode>
        <Router>
            <Provider> 
                <Routes>
                    <Route path="/" element={<MasterPage />} />
                    {/* <Route path="/:userId" element={<DetailsPage />} /> */}
                    <Route path="/:userId" element={<StudentsPage />} />
                    <Route path="/chart" element={<ChartPage />} />
                </Routes>
            </Provider>
        </Router>
    </React.StrictMode>,
    document.getElementById("root")
);
