import { jwtDecode } from "jwt-decode";
import { useFetchData } from "../utils/useFetchData.js";
import { BASE_URL } from "../constants/constants";
import { useContext } from "react";
import { AuthContext } from "../contexts/Contexts.jsx";
import { useNavigate } from "react-router-dom";
import classNames from "../constants/classNames.js";

function Account(){
    const {logout} = useContext(AuthContext);
    const navigate = useNavigate();
    const token = localStorage.getItem('authorToken');

    const handleLogout=()=>{
        logout();
        navigate('/');
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

    return(<section className="flex flex-col gap-2 p-2 text-customCool-dark">
        <h2 className="font-bold text-xl">Welcome {data.username}</h2>
        <p className="text-lg font-semibold">Role: {data.role}</p>
        <div><button onClick={handleLogout}
        className={classNames.button3}
        >logout</button></div>
        
    </section>);
}

export default Account;