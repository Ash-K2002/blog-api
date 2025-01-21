import { useState, useEffect, createContext } from "react";
import {checkAuth} from '../utils/authUtil.js';
import { AuthContext } from "../contexts/AuthContext.jsx";


function AuthProvider({children}){
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const logout = ()=>{
        localStorage.removeItem('authorToken');
        setIsAuthenticated(false);
    }

    useEffect(()=>{
        const authCheck = async ()=>{
            const res = await checkAuth();
            setIsAuthenticated(res);
        }
        authCheck();
    },[]);
    
    return(
    <AuthContext.Provider value={{isAuthenticated,logout,setIsAuthenticated}}>
        {children}
    </AuthContext.Provider>
    );
}

export {AuthProvider, AuthContext};