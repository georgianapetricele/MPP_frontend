import axios from "axios";


class UserAccountService{
    static BASE_URL = "http://13.53.41.209:8080"


    static async login(email,password){
        try{
            const response = await axios.post(`${UserAccountService.BASE_URL}/auth/login`, {email, password});
            console.log("User logged in:",response.data);
            return response.data;
        }catch(error){
            console.error("Error logging in:",error);
            return null;
        }
    }

    static async register(userData,token){
        try{
            const response = await axios.post(`${UserAccountService.BASE_URL}/auth/register`, userData,{
                headers:{
                    Authorization: `Bearer ${token}`
                }
            });
            console.log("User registered:",response.data);
            return response.data;
        }catch(error){
            console.error("Error registering user:",error);
            return null;
        }
    }

    static async fetchUsers(token){
        try{
            const response = await axios.get(`${UserAccountService.BASE_URL}/admin/get-all-users`,{
                headers:{
                    Authorization: `Bearer ${token}`
                }
            });
            console.log("Users:",response.data);
            return response.data;
        }catch(error){
            console.error("Error fetching users:",error);
            return null;
        }
    }

    static async getYourProfile(token){
        try{
            const response = await axios.get(`${UserAccountService.BASE_URL}/adminuser/get-profile`, 
            {
                headers: {Authorization: `Bearer ${token}`}
            })
            console.log("Profile info: ", response.data);
            return response.data;
        }catch(err){
            throw err;
        }
    }

    static async getUserById(userId,token){
        try{
            const response = await axios.get(`${UserAccountService.BASE_URL}/admin/get-user/${userId}`,{
                headers:{
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        }catch(error){
            console.error("Error fetching user details:",error);
            return null;
        }
    }

    static async updateUser(userId,userData,token){
        try{
            const response = await axios.put(`${UserAccountService.BASE_URL}/admin/update/${userId}`,userData,{
                headers:{
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        }catch(error){
            console.error("Error updating user:",error);
            return null;
        }
    }

    static async deleteUser(userId,token){
        try{
            const response = await axios.delete(`${UserAccountService.BASE_URL}/admin/delete/${userId}`,{
                headers:{
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        }catch(error){
            console.error("Error deleting user:",error);
            return null;
        }
    }

    /*Authentification checker*/

    static logout(){
        localStorage.removeItem("token");
        localStorage.removeItem("role");
    }

    static isAuthenticated(){
        const token = localStorage.getItem('token')
        return !!token
    }

    static isAdmin(){
        const role = localStorage.getItem('role')
        return role === 'ADMIN'
    }

    static isUser(){
        const role = localStorage.getItem('role')
        return role === 'USER'
    }

    static isAdminOnly(){
        return this.isAuthenticated() && this.isAdmin();
    }
}

export default UserAccountService;