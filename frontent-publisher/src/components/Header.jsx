import {Link} from 'react-router-dom';
import { useContext } from 'react';
import {LayoutContext, AuthContext} from '../contexts/Contexts';
import {MenuIcon, AccountIcon} from './Icons';

function Header(){
    const {toggleSideBar} =useContext(LayoutContext);
    const {isAuthenticated} =useContext(AuthContext);

    return(
        <header className='sticky top-0 flex flex-row justify-between p-2'>
            <div className='flex flex-row gap-4'>
            {
            isAuthenticated &&
            <button onClick={toggleSideBar}>
                <MenuIcon classname={"w-10 h-10 fill-blue-400"}/>
            </button>
            }

            Blog-Creator
            
            </div>
            {isAuthenticated && <Link to={'/account'}>
            <AccountIcon classname={"w-16 h-16 fill-blue-500"}/>
            </Link>}
        </header>
    );
}

export default Header;