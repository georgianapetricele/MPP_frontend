// App.js
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from './common/Navbar.jsx';
import LoginPage from './auth/LoginPage.jsx';
import ProfilePage from './userpages/ProfilePage.jsx';
import RegistrationPage from './auth/RegistrationPage.jsx';
import UsersManagementPage from './userpages/UsersManagementPage.jsx';
import UpdateUser from './userpages/UpdateUser.jsx';
import  UserAccountService  from './service/UserAccountService.jsx';

function App() {

  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <div className="content">
          <Routes>
            <Route exact path="/" element={<LoginPage />} />
            <Route exact path="/login" element={<LoginPage />} />
            <Route path="/profile" element={<ProfilePage />} />

            {/* Check if user is authenticated and admin before rendering admin-only routes */}
            {UserAccountService.isAdminOnly() && (
              <>
                <Route path="/register" element={<RegistrationPage />} />
                <Route path="/admin/user-management" element={<UsersManagementPage />} />
                <Route path="/update-user/:userId" element={<UpdateUser />} />
              </>
            )}
            <Route path="*" element={<Navigate to="/login" />} />‰
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;