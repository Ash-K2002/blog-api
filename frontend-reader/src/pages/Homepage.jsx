import { useEffect, useState } from 'react';
import authUtil from '../utils/authUtil.js';

function HomePage(){
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(()=>{
        const verifyAuth = async ()=>{
            const isAuth = await authUtil.checkAuth();
            setIsAuthenticated(isAuth);
            setLoading(false);
        }

        verifyAuth();
    })
    if(loading){
        return (
            <section>Loading...</section>
        );
    }
    if(isAuthenticated){
        return (<>
        <h1>Hello user</h1>
        </>);
    }

    return (
        <>
            <section>sign in to see magic!!</section>
        </>
    );
}

export default HomePage;