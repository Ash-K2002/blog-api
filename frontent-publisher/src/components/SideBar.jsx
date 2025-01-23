import { Link } from "react-router-dom";
import { useContext } from "react";
import {LayoutContext} from '../contexts/Contexts';
import {CloseIcon} from '../components/Icons';

function SideBar(){
    const {toggleSideBar} = useContext(LayoutContext);

    return(
        <div className="flex flex-row w-screen h-screen fixed top-0 left-0">
        <div className="w-1/2 h-screen bg-customCool-dark p-2">
            <button onClick={toggleSideBar}><CloseIcon classname={"w-16 h-16 fill-red-500"}/></button>

            <ul className="text-customWarm-light text-xl px-4 flex flex-col gap-2 divide-y-2">
                <li className="hover:bg-customCool-light hover:text-customCool-dark">
                    <Link to={'/'}>Home</Link>
                </li>
                <li className="hover:bg-customCool-light hover:text-customCool-dark">
                    <Link to={'/create'}>create</Link>
                </li>
                <li className="hover:bg-customCool-light hover:text-customCool-dark">
                    <Link to={'/blogs'}>blogs</Link>
                </li>
            </ul>
        </div>

        <div className='flex-grow' onClick={toggleSideBar}>

        </div>
        </div>
    )
}

export default SideBar;