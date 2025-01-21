import { jwtDecode } from "jwt-decode";
import { useFetchData } from "../utils/useFetchData.js";
import { BASE_URL } from "../constants/constants";
import { useContext } from "react";
import { AuthContext } from "../contexts/Contexts.jsx";
import { useNavigate } from "react-router-dom";

function Account(){
    const {logout} = useContext(AuthContext);
    const navigate = useNavigate();
    const token = localStorage.getItem('authorToken');

    const handleLogout=()=>{
        logout();
        navigate('/login');
    }

    if(!token){
        return(<>
            <h1>Login to view account</h1>
        </>);
    }

    const id = jwtDecode(token).id;
    const {loading, error, data} = useFetchData(`${BASE_URL}/user/read/${id}`,false);

    if(loading){
        return(<section>
            Loading...
        </section>);
    }

    if(error){
        return(<section>
            {JSON.stringify(error)}
        </section>);
    }

    return(<section>
        <h2>Welcome {data.username}</h2>
        <p>Role: {data.role}</p>
        <button onClick={handleLogout}>logout</button>
    </section>);
}

export default Account;