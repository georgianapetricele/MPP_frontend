import React from 'react';
import { Link } from 'react-router-dom';
import  UserAccountService  from '../service/UserAccountService.jsx';

function Navbar() {
    const isAuthenticated = UserAccountService.isAuthenticated();
    const isAdmin = UserAccountService.isAdmin();



    const handleLogout = () => {
        const confirmDelete = window.confirm('Are you sure you want to logout this user?');
        if (confirmDelete) {
            UserAccountService.logout();
        }
    };


    return (
        <nav>
            <ul>
                {!isAuthenticated && <li><Link to="/">Home</Link></li>}
                {isAuthenticated && <li><Link to="/profile">Profile</Link></li>}
                {isAdmin && <li><Link to="/admin/user-management">User Management</Link></li>}
                {isAuthenticated && <li><Link to="/" onClick={handleLogout}>Logout</Link></li>}
            </ul>
        </nav>
    );
}

export default Navbar;