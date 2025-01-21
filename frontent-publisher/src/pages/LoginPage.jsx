import {useContext, useState} from 'react';
import {jwtDecode} from 'jwt-decode';
import { BASE_URL } from '../constants/constants';
import {AuthContext} from '../components/AuthProvider';
import { useNavigate } from 'react-router-dom';

function LoginPage(){
    const [username, setUsername] = useState("");
    const [password, setPassword]= useState("");
    const {setIsAuthenticated} = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit= async(e)=>{
        e.preventDefault();
        try{
            const response = await fetch(BASE_URL+"/login",{
                method: 'POST',
                headers:{
                    "Content-Type":"application/json",
                },
                body: JSON.stringify({username:username, password:password}),
                mode: 'cors'
            });

            if(!response.ok){
                const err = await response.json();
                throw new Error('Internal server error',err);
            }

            const res = await response.json();
            const decode = jwtDecode(res.token);
            if(decode.role!='AUTHOR'){
                throw new Error('An error occured');
            }
            localStorage.setItem('authorToken',res.token);
            setIsAuthenticated(true);
            navigate("/");
        }
        catch(error){
            console.log("Error while logging in ");
            alert('Error while login');
        }
    }

    return(<form onSubmit={handleSubmit}>
    <label htmlFor="username">
        Username 
        <input type="text"
        name="username"
        value={username}
        onChange={(e)=>setUsername(e.target.value)}
        required
         />
    </label>

    <label htmlFor="password">
        Password 
        <input type="password"
        name="password"
        value={password}
        onChange={(e)=>setPassword(e.target.value)}
        required
         />
    </label>
    <button type="submit">Submit</button>
    </form>);
}

export default LoginPage;