import {Link} from 'react-router-dom';
import authUtil from '../utils/authUtil.js';
import {AuthContext} from '../utils/Contexts.js';
import { useContext } from 'react';

function NavBar(){
    const {isAuthenticated} = useContext(AuthContext);
    const userLoggedIn = authUtil.getLoggedInUserId();

    return(
        <nav className='navbar'>
            <ul>
                <li>
                    <Link to={'/'}>Home</Link>
                </li>
                
                {!isAuthenticated && <li><Link to={'/login'}>Login</Link></li>}
                
                {!isAuthenticated && <li><Link to={'/signup'}>Signup</Link></li>}
                
                {isAuthenticated && <li><Link to={'/account'}>Account</Link></li>}
            </ul>
        </nav>
    )
}

export default NavBar;