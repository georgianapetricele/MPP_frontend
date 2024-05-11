import React, { useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import  UserAccountService  from '../service/UserAccountService.jsx';


function LoginPage(){

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [count, setCount] = useState(0);

    const navigate = useNavigate();


    const handleLogin = async (e) => {
        e.preventDefault();
        try{
            const userData= await UserAccountService.login(email,password);
            if(userData.token){
                localStorage.setItem('token',userData.token);
                localStorage.setItem('role',userData.role);
                navigate('/profile');
            }
            else
            {
                setError(userData.error);
            }
                
        }
        catch(error){
            console.error("Error logging in:",error);
            setError(error.message);
            setTimeout(()=>{
                setError('');
            },5000);
        }
    }

    return (
        <div className='auth-container'>
            <h2>Login Page</h2>
            {error && <p className='error-message'>{error}</p>}
            <form onSubmit={handleLogin}>
                <div className='form-group'>
                    <label>Email:</label>
                    <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)}/>

                </div>

                <div className='form-group'>
                    <label>Password:</label>
                    <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                </div>

                <button type="submit">Login</button>
            </form>
        </div>
    )
}

export default LoginPage;