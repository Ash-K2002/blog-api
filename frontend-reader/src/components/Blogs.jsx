import useFetchData from '../utils/useFetchData.js';
import { BASE_URL } from "../constants/constants";
import Deck from './Deck.jsx';
import PropType from 'prop-types';
import {Link} from 'react-router-dom';

function BlogCard({data}){
    return <>
    <Link to={`/blog/${Number(data.id)}`} className='flex flex-col p-2 gap-3 bg-customGray-dark border-customBlue-dark border-4 rounded-3xl hover:bg-customBlue-dark hover:text-customGray-dark'>
        <h3 className='font-semibold overflow-hidden text-xl'>
            {data.title}
        </h3>
        <ul className='flex flex-col gap-1'>
            <li>Author: {data.author.username} </li>
            <li>Published at : {data.publishedAt}</li>
        </ul>
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
    const blogCards=data.blogs.map((blog)=>{
        return <BlogCard key={blog.id} data={blog}/>
    });

    return (<>
    <ul className='grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4'>
        {blogCards}
    </ul>
    </>);
}



BlogCard.propTypes={
    data: PropType.object,
}

export default Blogs;

