import {jwtDecode} from 'jwt-decode';
import {BASE_URL} from '../constants/constants.js';

export async function checkAuth(){
    const token = localStorage.getItem('authorToken');
    if(!token){
        return false;
    }
    try {
        const response = await fetch(`${BASE_URL}/check-auth`,{
            method: 'GET',
            headers:{
                'Authorization': 'Bearer '+token,
            },
            mode:'cors'
        });
        if(!response.ok){
            throw new Error('Error checking auth');
        }
        const result = await response.json();
        return true;
    } catch (error) {
        console.error('Error checking auth',error);
        return false;
    }
}

export function getUserId(){
    const token = localStorage.getItem('authorToken');
    const decoded = jwtDecode(token);
    return decoded.id;
}