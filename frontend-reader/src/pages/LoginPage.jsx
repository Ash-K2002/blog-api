import PropTypes from 'prop-types';
import { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import {AuthContext} from '../utils/Contexts.js';
import { useContext } from 'react';
import classNames from '../constants/classNames.js'
;
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
    <form onSubmit={handleSubmit} className='bg-customGray-dark rounded-lg p-5 flex flex-col items-start w-[400px] border-2 border-customBlue-dark mx-4 my-2'>
        <ul className='flex flex-col gap-3'>
            <li className='flex flex-row gap-4'>
                <label htmlFor="login-username">Username</label>
                <input  type="text"
                        name="username"
                        value={username}
                        id="login-username"
                        onChange={(e)=> setUsername(e.target.value)} 
                        required
                        placeholder='Enter Username'
                        className={classNames.textInput1}
                />
            </li>
            <li className='flex flex-row gap-4'>
                <label htmlFor="">Password</label>
                <input type="password"
                       name="password" 
                       id="login-password"
                       value={password}
                       onChange={(e)=>setPassword(e.target.value)}
                       required
                       placeholder='Enter password'
                       className={classNames.textInput1}
                />
            </li>
        </ul>
        <button type="submit" disabled={!password.trim() || !username.trim()}
        className={classNames.button1}>Login</button>
    </form>
    </>);
}

export default LoginPage;