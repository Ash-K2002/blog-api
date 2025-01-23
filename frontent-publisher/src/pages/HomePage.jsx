import {AuthContext} from '../components/AuthProvider';
import { useContext, useState} from 'react';
import LoginPage from '../components/LoginPage';
import SignupPage from '../components/SignupPage';
import blogIcon from '../assets/blogIcon.jpg';
import { jwtDecode } from 'jwt-decode';


function HomePage(){
    const {isAuthenticated} = useContext(AuthContext);
    
    if(!isAuthenticated){
        return(<NoLoginHome/>);
    }
    return(<LoggedInHome/>)
}

function NoLoginHome(){
    const [showLogin, setShowLogin] = useState(true);

    return(
        <>
        <section className='HeroSection mt-10 grid grid-cols-1 md:grid-cols-2 p-4 gap-4  bg-customCool-dark text-customWarm-light' aria-labelledby='hero-title'>
            <img src={blogIcon} alt="hero-icon"
            className='w-3/4 justify-self-center'
            />
            <div 
            className='flex flex-col gap-4 justify-center'
            >
                <h2 className='text-3xl font-bold'>
                    Welcome to blog-creator!!
                </h2>
                <p 
                className='text-lg'
                >
                Welcome to blog-creator, the platform designed for creators like you. Manage your blogs effortlessly, share your stories with the world, and connect with your audience—all from one place. Whether you're crafting your next masterpiece or organizing your content, we've got you covered.
                </p>
            </div>
        </section>

        <section className='grid grid-cols-1 md:grid-cols-2 py-5 md:p-10'>
            <div className='flex flex-col gap-2 p-4 bg-customCool-dark justify-self-center rounded-xl outline outline-4 outline-offset-2 outline-customCool-dark'>

            <h2
            className='font-bold text-2xl text-customWarm-dark'
            >{(showLogin)?"Login":"Signup"}</h2>

            <p className='text-md font-semibold text-customCool-medium'>{(showLogin)?"Continue your journey!":"Embark on a new adventure!"}</p>

            {
                (showLogin)?<LoginPage/>:<SignupPage setShowLogin={setShowLogin}/>
            }
            </div>

            <div className='flex flex-col items-start gap-4 px-3 items-center md:items-start'>
                <p className='text-customCool-dark text-3xl font-semibold'>
                    {(showLogin)?"New to our platform?":"Existing user?"}</p>
                <button onClick={()=>{
                    setShowLogin(!showLogin);
                }}
                className='bg-customWarm-dark outline outline-customCool-dark outline-3 outline-offset-2 text-xl font-semibold text-customCool-dark ml-2 rounded-xl p-2 hover:bg-customCool-dark hover:text-customCool-light '>
                    {(showLogin)?'Signup':'Login'}
                </button>
            </div>
        </section>
            
        </>
    );
}

function LoggedInHome(){
    const username= jwtDecode(localStorage.getItem('authorToken')).username;
    return(
        <>  
        <h2 className='m-4 font-bold text-customCool-dark text-3xl'>Welcome User</h2>
        </>
    )
}

export default HomePage;