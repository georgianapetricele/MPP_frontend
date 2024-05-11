import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
const Context = React.createContext({
    users: [],
    setUsers: () => {},

    totalPages:1,
    setTotalPages:()=>{},

    currentPage:1,
    setCurrentPage:()=>{},
});

export const Provider = ({ children }) => {
    const [users, setUsers] = React.useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(2000);

    useEffect(() => {
        fetchUsers();
    }, [users,currentPage]);


    const fetchUsers = () => {
        console.log("Here ",currentPage);
        syncLocalData(); // Synchronize local data before fetching from server
        axios.get(`http://localhost:8080/users/page/${currentPage}`)
            .then(response => {
                const serverUsers = response.data;
                setUsers(serverUsers);
            })
            .catch(error => {
                console.log('Users',users);
                console.error('Error fetching users:', error);
                alert('Failed to fetch users from the server. Fetching local data...');
                fetchLocalData();
            });
    };


    const syncLocalData = () => {
        console.log("Sync");
        const localData = getLocalData();
        console.log(localData);
        try {
            //await Promise.all(
                localData.map(async (user) => {
                axios.post('http://localhost:8080/users', user);
                console.log('User synced:', user);
                removeLocalUser(user.userId); // Make sure this function properly updates local storage
                //await new Promise(resolve => setTimeout(resolve, 3000)); // Wait for 3 seconds between requests
        });
                localStorage.removeItem("users"); 
        } catch (error) {
            console.error('Error syncing users:', error);
        }
    };

    
     const removeLocalUser = (userId) => {
            const currentData = getLocalData();
            console.log('The current id',userId);
            const updatedData = currentData.filter(user => user.userId !== userId);
            localStorage.setItem("users", JSON.stringify(updatedData));
        };
    

    const fetchLocalData = () => {
        const localData = getLocalData();
        if (localData) {
            setUsers(localData);
        } else {
            alert('Local data not available.');
        }
    };

    const getLocalData = () => {
        const data = localStorage.getItem("users");
        return data ? JSON.parse(data) : [];
    };

    const saveToLocal = (data) => {
        localStorage.setItem("users", JSON.stringify(data));
    };


    const handleSubmit = (newUser) => {
        axios.post('http://localhost:8080/users', newUser)
            .then(() => {
                fetchUsers();
            })
            .catch(error => {
                //console.error('Error adding studen:', error);
                console.log('Added offline',newUser);
                saveToLocal([...users, newUser]);
                console.log('Users:', users);
                fetchLocalData();
            });
    };

    const handleEdit = (userId, updatedUser) => {
        axios.put(`http://localhost:8080/users/${userId}`, updatedUser)
            .then(() => {
                fetchUsers(); 
            })
            .catch(error => {
                console.log(userId, updatedUser);
                const updatedUsers = users.map(user => {
                    if(user.userId === userId) {
                        return { ...user, ...updatedUser };
                    }
                    return user;
                });
                setUsers(updatedUsers);
                saveToLocal(updatedUsers);
            });
    };
    

    const handleDelete = (userId) => {
        axios.delete(`http://localhost:8080/users/${userId}`)
            .then(() => {
                fetchUsers(); 
            })
            .catch(error => {
                console.error('Error deleting user:', error);
                saveToLocal(users.filter(user => user.userId !== userId));
                fetchLocalData();
            });
    };


    return(
        <Context.Provider value={{users, setUsers, handleSubmit, handleEdit, handleDelete,currentPage,setCurrentPage,totalPages}}>
            {children}
        </Context.Provider>
    )
}

export default Context;