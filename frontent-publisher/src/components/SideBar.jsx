import { Link } from "react-router-dom";
import { useContext } from "react";
import {LayoutContext} from '../contexts/Contexts';
import {CloseIcon} from '../components/Icons';

function SideBar(){
    const {toggleSideBar} = useContext(LayoutContext);

    return(
        <section className="fixed top-0 left-0 w-[200px] bg-gray-500 h-screen pt-4">
            <button onClick={toggleSideBar}><CloseIcon classname={"w-16 h-16 fill-red-500"}/></button>
            <ul>
                <li>
                    <Link to={'/'}>Home</Link>
                </li>
                <li>
                    <Link to={'/create'}>create</Link>
                </li>
                <li>
                    <Link to={'/blogs'}>blogs</Link>
                </li>
            </ul>
        </section>
    )
}

export default SideBar;