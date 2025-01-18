import { BASE_URL } from '../constants/constants.js';
import authUtil from '../utils/authUtil.js';
import useFetchData from '../utils/useFetchData.js';
import {useNavigate} from 'react-router-dom';
import { useContext } from 'react';
import {AuthContext} from '../utils/Contexts.js';
import classNames from '../constants/classNames.js';

function Account(){
    const {logout} = useContext(AuthContext);
    const navigate = useNavigate();
    const id = authUtil.getLoggedInUserId();
    if(!id){
        return<>
        <h2>Login to view account</h2>
        </>
    }
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
            <section className='text-customBlue-dark'>
            <h2 className='text-3xl'>Hello <span className='font-bold'>{data.username}</span></h2>
            <ul>
                <li className=''>Role: {data.role}</li>
                <li><button type='button' onClick={handleLogout} className={classNames.button2}>Logout</button></li>                
            </ul>
            </section>
        )
    }
    
}

export default Account;