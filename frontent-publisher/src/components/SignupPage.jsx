import { useState } from "react";
import {BASE_URL} from '../constants/constants.js';
import classNames from '../constants/classNames.js';

function SignupPage({setShowLogin}){
    const [username, setUsername]= useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword]= useState("");

    const handleSubmit = async(e)=>{
        e.preventDefault();
        if(password!=confirmPassword){
            alert('Enter same password twice');
            return;
        }
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
            setShowLogin(true);
        }
        catch(err){
            console.error('Error occured',err);
            alert(`Error: ${err}`);
        }
    }

    return(
    <form onSubmit={handleSubmit}
    className={classNames.form1}
    >
        <label className={classNames.label1} htmlFor="username">
            Username 
            <input 
                type="text" 
                name="username"
                value={username}
                onChange={(e)=>setUsername(e.target.value)}
                required
                placeholder="Enter username"
                className={classNames.input1}
            />
        </label>
        
        <label htmlFor="password" className={classNames.label1}>
            Password
            <input 
                type="password" 
                name="password"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                required
                placeholder="Enter password"
                className={classNames.input1}
            />
        </label>

        <label htmlFor="confirm-password" className={classNames.label1}>
            Confirm Password
            <input 
                type="password" 
                name="confirm-password"
                value={confirmPassword}
                onChange={(e)=>setConfirmPassword(e.target.value)}
                required
                placeholder="Re enter password"
                className={classNames.input1}
            />
        </label>
        <button type="submit" className={classNames.button1}>Sign Up</button>
    </form>
    );
}

export default SignupPage;