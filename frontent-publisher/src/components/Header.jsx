import {Link} from 'react-router-dom';
import { useContext } from 'react';
import {LayoutContext, AuthContext} from '../contexts/Contexts';
import {MenuIcon, AccountIcon} from './Icons';

function Header(){
    const {toggleSideBar} =useContext(LayoutContext);
    const {isAuthenticated} =useContext(AuthContext);

    return(
        <header className='sticky top-0 flex flex-row justify-between p-2 bg-customWarm-dark'>
            <div className='flex flex-row gap-4'>
            {
            isAuthenticated &&
            <button onClick={toggleSideBar}>
                <MenuIcon classname={"w-10 h-10 fill-customCool-dark"}/>
            </button>
            }
            <Link to={'/'}>
            <h1 className='text-customCool-dark text-2xl font-black'>Blog-Creator</h1>
            </Link>
            
            </div>
            {isAuthenticated && <Link to={'/account'}>
            <AccountIcon classname={"w-10 h-10 fill-customCool-dark hover:fill-customCool-medium hover:bg-customCool-dark"}/>
            </Link>}
        </header>
    );
}

export default Header;