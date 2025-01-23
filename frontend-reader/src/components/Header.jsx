import NavBar from './NavBar';
import {AuthContext} from '../utils/Contexts.js';
import { useContext } from 'react';

function Header(){
    const {isAuthenticated} = useContext(AuthContext);

    return (
        <header className='sticky top-0 flex flex-col md:flex-row justify-between items-center bg-customBlue-dark p-2'>
            <h1 className='text-2xl text-center py-1 text-customBlue-light font-black'>Super blog-App</h1>
            <NavBar key={isAuthenticated}/>
        </header>
    );
}

export default Header;