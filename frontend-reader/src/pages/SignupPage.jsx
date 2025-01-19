import { useState } from "react";
import {BASE_URL} from '../constants/constants.js';
import {useNavigate} from 'react-router-dom';
import classNames from '../constants/classNames.js';

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
    <form className="border-2 border-customBlue-dark text-customBlue-dark bg-customGray-dark p-3 rounded-xl w-[450px] mx-5">
        <h2 className="font-semibold">Signup</h2>
        <ul className="flex flex-col gap-2">
            <li className="flex flex-row gap-4 justify-between">
                <label htmlFor="signup-username" >Username</label>
                <input type="text"
                       name="username" 
                       id="signup-username"
                       value={username}
                       onChange={(e)=>{setUsername(e.target.value)}}
                       required
                       className={classNames.textInput1}
                       />
            </li>
            <li className="flex flex-row gap-4 justify-between">
                <label htmlFor="signup-password">Password</label>
                <input type="password"
                       name="password" 
                       id="signup-password"
                       value={password}
                       onChange={(e)=>{setPassword(e.target.value)}}
                       required
                       className={classNames.textInput1}
                       />
            </li>
            <li className="flex flex-row gap-4 justify-between">
                <label htmlFor="signup-confirm-password">Confirm password</label>
                <input type="password"
                       name="confirm-password" 
                       id="signup-confirm-password"
                       value={confirmPassword}
                       onChange={(e)=>{setConfirmPassword(e.target.value)}}
                       required
                       className={classNames.textInput1}
                       />
            </li>
        </ul>
        <button type="submit" onClick={handleSubmit} className={classNames.button1} 
        disabled={!password.trim() || !confirmPassword.trim() || !username.trim()}
        >Submit</button>
    </form>
    </>);
}

export default SignupPage;