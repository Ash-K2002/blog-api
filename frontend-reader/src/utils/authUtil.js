import {BASE_URL} from '../constants/constants.js';
import {jwtDecode} from 'jwt-decode';

async function checkAuth(){
    const token = localStorage.getItem('token');
    if(!token){
        return false;
    }

    try{
        const response = await fetch(BASE_URL+'/check-auth',{
            method: 'GET',
            headers:{
                'Authorization': `Bearer ${token}`
            },
        });

        if(!response.ok){
            return false;
        }
        return true;
    }
    catch(err){
        console.error('Error checking auth:',err);
        return false;
    }
}

function getLoggedInUserId(){
    const token = localStorage.getItem('token');
    if(!token) return null;

    try{
        const decoded = jwtDecode(token);
        return decoded.id;
    }
    catch(err){
        console.error('Invalid token:', err);
        return null;
    }
}

const authUtil = {
    checkAuth,
    getLoggedInUserId,
}

export default authUtil;