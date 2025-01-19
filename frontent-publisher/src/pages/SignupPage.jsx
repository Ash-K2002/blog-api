import { useState } from "react";
import {BASE_URL} from '../constants/constants.js';

function SignupPage(){
    const [username, setUsername]= useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword]= useState("");

    const handleSubmit = async(e)=>{
        e.preventDefault();
        try{
            if(password!==confirmPassword){
                alert('Re enter same password');
                return;
            }

            const response = await fetch(`${BASE_URL}/user/create`,{
                method: 'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({
                    username:username,
                    password:password,
                    role: 'AUTHOR'
                }),
                mode:'cors'
            });

            if(!response.ok){
                throw new Error('Internal server error');
            }
            alert('Account created');

        }
        catch(err){
            console.error('Error occured',err);
            alert(`Error: ${err}`);
        }
    }

    return(
    <form onSubmit={handleSubmit}>
        <label htmlFor="username">
            Username 
            <input 
                type="text" 
                name="username"
                value={username}
                onChange={(e)=>setUsername(e.target.value)}
                required
                placeholder="Enter username"
            />
        </label>
        
        <label htmlFor="password">
            Password
            <input 
                type="password" 
                name="password"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                required
                placeholder="Enter password"
            />
        </label>

        <label htmlFor="confirm-password">
            Confirm Password
            <input 
                type="password" 
                name="confirm-password"
                value={confirmPassword}
                onChange={(e)=>setConfirmPassword(e.target.value)}
                required
                placeholder="Re enter password"
            />
        </label>
        <button type="submit">Sign Up</button>
    </form>
    );
}

export default SignupPage;