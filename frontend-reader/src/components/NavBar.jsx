import {Link} from 'react-router-dom';
import {AuthContext} from '../utils/Contexts.js';
import { useContext, useState } from 'react';

const styleString={
    link1:"hover:bg-customBlue-light hover:rounded-md hover:text-customBlue-dark",
    link2:"text-customBlue-light p-1 font-bold" 
}

function NavBar(){
    const {isAuthenticated} = useContext(AuthContext);

    const links=[
        {
            link:'/',
            name:'Home',
            hidden: false,
        },
        {
            link:'/login',
            name:'Login',
            hidden: isAuthenticated,
        },
        {
            link:'/signup',
            name:'Signup',
            hidden: isAuthenticated,
        },
        {
            link:'/account',
            name:'Account',
            hidden: !isAuthenticated,
        },
    ]

    const linkArr = links.map((l)=>{
        let classname= `${styleString.link1} ${styleString.link2}`;
        if(l.hidden){
            classname+=' hidden'
        }
        return <li key={links.indexOf(l)}>
            <Link to={l.link} className={classname}>{l.name}</Link>
        </li>
    });



    return(
        <nav className=''>
            <ul className='flex flex-row gap-1 items-center'>
                {
                    linkArr
                }
            </ul>
        </nav>
    )
}

export default NavBar;