import PropTypes from 'prop-types';
import { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import {AuthContext} from '../utils/Contexts.js';
import { useContext } from 'react';

function LoginPage(){
    const [username, setUsername]= useState("");
    const [password, setPassword]= useState("");
    const navigate = useNavigate();
    const {setIsAuthenticated} = useContext(AuthContext);

    const handleSubmit = async (e)=>{
        e.preventDefault();

        try{
            const response = await fetch("http://localhost:3000/login",{
                method: 'POST',
                headers:{
                    "Content-Type":"application/json",
                },
                body: JSON.stringify({username:username, password:password}),
                mode: 'cors'
            });

            if(!response.ok){
                throw new Error("Login Failed");
            }

            const data = await response.json();
            if(data.error){
                console.log(error);
            }
            if(data.token){
            console.log("JWT Token: ", data.token);
            localStorage.setItem('token', data.token);
            setIsAuthenticated(true);
            navigate('/');
            }
        }
        catch(err){
            console.error("Error during login: ",err);
            alert("Login failed.");
        }
    }

    return(<>
    <form onSubmit={handleSubmit}>
        <ul>
            <li>
                <label htmlFor="login-username">Username</label>
                <input  type="text"
                        name="username"
                        value={username}
                        id="login-username"
                        onChange={(e)=> setUsername(e.target.value)} 
                        required
                />
            </li>
            <li>
                <label htmlFor="">Password</label>
                <input type="password"
                       name="password" 
                       id="login-password"
                       value={password}
                       onChange={(e)=>setPassword(e.target.value)}
                       required
                />
            </li>
        </ul>
        <button type="submit">Login</button>
    </form>
    </>);
}

export default LoginPage;