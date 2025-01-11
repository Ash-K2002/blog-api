import useFetchData from '../utils/useFetchData.js';
import { BASE_URL } from "../constants/constants";
import Deck from './Deck.jsx';
import PropType from 'prop-types';
import {Link} from 'react-router-dom';

function BlogCard({data}){
    return <>
    <Link to={`/blog/${Number(data.id)}`}>
    <section className='blog-card'>
        <h3>{data.title}</h3>
        <ul>
            <li>Author: {data.author.username} </li>
            <li>Published at : {data.publishedAt}</li>
        </ul>
    </section>
    </Link>
    </>
}

function Blogs(){
    const {data, loading, error} = useFetchData(BASE_URL+'/blog/read/published');
    if(loading){
        return (<>
        <h1>loading...</h1></>);
    }
    if(error){
        return (<>
        <h1>An error occured</h1></>);
    }
    return (<>
    <Deck dataArr={data.blogs} Card={BlogCard}/>
    </>);
}



BlogCard.propTypes={
    data: PropType.object,
}

export default Blogs;

