import {BASE_URL} from '../constants/constants.js';

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

const authUtil = {
    checkAuth,
}

export default authUtil;