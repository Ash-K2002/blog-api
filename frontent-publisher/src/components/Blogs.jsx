import {useFetchData} from '../utils/useFetchData.js';
import {BASE_URL} from '../constants/constants.js';
import {Link} from 'react-router-dom';

function Blogs({published}){
    const url = `${BASE_URL}/user/${(published)?'published-blogs':'unpublished-blogs'}`;

    const {loading, data, error} = useFetchData(url,true);

    if(loading){
        return(<h1>
            Loading...
        </h1>);
    }
    if(error){
        return (
            <>
            <h1>An error occured</h1>
            <section>{JSON.stringify(error)}</section>
            </>
        )
    }
    const deck = data.blogs.map((blog)=>{
        return <li key={blog.id}
        className='px-4 py-1 text-customCool-dark hover:bg-customCool-light'
        >
            <BlogCard blog={blog}/>
        </li>
    })
    return(<ul className='flex flex-col divide-y-2 divide-customWarm-dark'>
        {deck}
    </ul>);
}

function BlogCard({blog}){
    return(<Link to={'/blog/'+blog.id}
    className=''
    >
        <div className='font-semibold text-lg'>{blog.title}</div>
        {blog.publishedAt &&
        <div>
            Published At: {blog.publishedAt}
        </div>}
    </Link>);
}

export default Blogs;