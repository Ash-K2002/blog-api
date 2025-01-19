import { Link } from "react-router-dom";
import classNames from "../constants/classNames";

function ErrorPage(){
return(
    <section className="flex flex-col items-start m-4 gap-4 border-4 rounded-2xl border-customBlue-dark bg-customGray-dark p-3 text-lg text-customBlue-dark">
        <h2 className="font-bold text-3xl text-customBlue-medium">Oopsie daisy!</h2>
        <p>An unexpected error occured. But don't worry, we'll be with you soon. You can contact support, if it is bothering you.</p>
        <Link className={classNames.button1} to={"/"}>Go back Home</Link>
    </section>
);
}

export default ErrorPage;