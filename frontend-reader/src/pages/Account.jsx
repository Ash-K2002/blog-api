import { BASE_URL } from '../constants/constants.js';
import authUtil from '../utils/authUtil.js';
import useFetchData from '../utils/useFetchData.js';
import {useNavigate} from 'react-router-dom';
import { useContext } from 'react';
import {AuthContext} from '../utils/Contexts.js';

function Account(){
    const {logout} = useContext(AuthContext);
    const navigate = useNavigate();
    const id = authUtil.getLoggedInUserId();
    const {data, loading, error} = useFetchData(`${BASE_URL}/user/read/${id}`);

    const handleLogout = ()=>{
        logout();
        navigate('/login');
    }
    
    if(loading){
        return (
            <>
                <h2>...Loading</h2>
            </>
        )
    }
    if(error){
        return(
            <>
            <h2>Error:{JSON.stringify(error)}</h2>
            </>
        )
    }
    if(data){
        return (
            <>
            <h2>Welcome {data.username}</h2>
            <ul>
                <li>Role: {data.role}</li>
                <li><button type='button' onClick={handleLogout}>Logout</button></li>                
            </ul>
            </>
        )
    }
    
}

export default Account;