import {useParams} from 'react-router-dom';
import {useFetchData} from '../utils/useFetchData.js';
import {BASE_URL} from '../constants/constants.js';

function BlogDetail(){
    const {id} = useParams();

    const url= `${BASE_URL}/blog/read/${id}`;
    const {loading, data, error} = useFetchData(url,false);

    if(loading){
        return <>
        <h1>...Loading</h1>
        </>
    }
    if(error){
        return <>
        <h1>An error occured</h1>
        {JSON.stringify(error)}
        </>
    }
    return (<>
        {JSON.stringify(data)}
    </>);
}

export default BlogDetail;