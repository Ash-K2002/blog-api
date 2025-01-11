import { useEffect, useState } from 'react';
import authUtil from '../utils/authUtil.js';
import Blogs from '../components/Blogs.jsx';

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
        <Blogs/>
        </>);
    }

    return (
        <>
            <h1>sign in to see magic!!</h1>
            <Blogs/>
        </>
    );
}

export default HomePage;