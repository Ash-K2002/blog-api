import { useContext, createContext, useState, useEffect } from "react";
import authUtil from '../utils/authUtil.js';
import {AuthContext} from '../utils/Contexts.js';

function AuthProvider({children}){
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const logout =()=>{
        localStorage.removeItem('token');
        setIsAuthenticated(false);
    }

    useEffect(()=>{
        let valid = isAuthenticated;
        const authenticate=async()=>{
        valid = await authUtil.checkAuth();
        setIsAuthenticated(valid);
        }
        authenticate();
    },[]);

    return <AuthContext.Provider value={{isAuthenticated, logout, setIsAuthenticated}}>
        {children}
    </AuthContext.Provider>
}

export default AuthProvider;