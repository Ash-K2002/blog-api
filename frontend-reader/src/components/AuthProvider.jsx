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
        const valid = authUtil.checkAuth();
        setIsAuthenticated(valid);
    },[]);

    return <AuthContext.Provider value={{isAuthenticated, logout}}>
        {children}
    </AuthContext.Provider>
}

export default AuthProvider;