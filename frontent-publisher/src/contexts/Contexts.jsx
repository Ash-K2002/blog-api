import { createContext } from "react";

export const AuthContext = createContext({
    isAuthenticated: false,
    logout: ()=>{},
    setIsAuthenticated: ()=>{},
});

export const BlogContext = createContext({
    handleRefreshPage:()=>{},
});

export const LayoutContext = createContext({
    showSideBar:false,
    toggleSideBar:()=>{},
});