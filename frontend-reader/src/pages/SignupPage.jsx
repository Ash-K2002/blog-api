import { useState } from "react";
import {BASE_URL} from '../constants/constants.js';
import {useNavigate} from 'react-router-dom';

function SignupPage(){
    const navigate=useNavigate();
    const [username, setUsername]= useState("");
    const [password, setPassword]= useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSubmit=async(e)=>{
        e.preventDefault();
        if(confirmPassword!==password){
            alert('Re enter the same password');
            return;
        }
        try{
            const response = await fetch(`${BASE_URL}/user/create`,{
                method:'POST',
                headers:{
                    'Content-Type':"application/json",
                },
                body:JSON.stringify({
                    username,
                    password,
                    role: 'READER'
                }),
                mode:'cors'
            });

            if(!response.ok){
                const errorData = await response.json();
                console.log(errorData);

                if(errorData.errors){
                    const errorLog = errorData.errors.errors.map((error)=>{return error.msg});
                    throw new Error (JSON.stringify(errorLog));
                }
                
                throw new Error(errorData.error||'Something wrong happened');
            }

            const data = await response.json();
            console.log(data);
            alert('Account successfully created');
            navigate('/login');
        }
        catch(err){
            alert(`${err}`);
            console.log(err);
        }
    }

    return (<>
    <h2>This is the signup page</h2>
    <form>
        <ul>
            <li>
                <label htmlFor="signup-username">Username</label>
                <input type="text"
                       name="username" 
                       id="signup-username"
                       value={username}
                       onChange={(e)=>{setUsername(e.target.value)}}
                       required
                       />
            </li>
            <li>
                <label htmlFor="signup-password">Password</label>
                <input type="password"
                       name="password" 
                       id="signup-password"
                       value={password}
                       onChange={(e)=>{setPassword(e.target.value)}}
                       required
                       />
            </li>
            <li>
                <label htmlFor="signup-confirm-password">Confirm password</label>
                <input type="password"
                       name="confirm-password" 
                       id="signup-confirm-password"
                       value={confirmPassword}
                       onChange={(e)=>{setConfirmPassword(e.target.value)}}
                       required
                       />
            </li>
        </ul>
        <button type="submit" onClick={handleSubmit}>Submit</button>
    </form>
    </>);
}

export default SignupPage;