import {Link} from 'react-router-dom';

function ErrorPage(){
    return(<>
    <h1>Goodness gracious!!</h1>
    <p>We are trying to fix this error. Please contact support if it persists.</p>
    <Link to={'/'}>Go back home</Link>
    </>)
}

export default ErrorPage;