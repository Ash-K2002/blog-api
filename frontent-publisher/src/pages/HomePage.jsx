import {AuthContext} from '../components/AuthProvider';
import { useContext} from 'react';

function HomePage(){
    const {isAuthenticated} = useContext(AuthContext);
    
    if(!isAuthenticated){
        return(<h1>
         Please login to see magic
        </h1>);
    }
    return(<h1>magic!!</h1>)
}

export default HomePage;