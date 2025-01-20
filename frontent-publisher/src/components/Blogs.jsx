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
        return <li key={blog.id}>
            <BlogCard blog={blog}/>
        </li>
    })
    return(<>
        {deck}
    </>);
}

function BlogCard({blog}){
    return(<Link to={'/blog/'+blog.id}>
        <section>{blog.title}</section>
        {blog.publishedAt &&
        <section>
            Published At: {blog.publishedAt}
        </section>}
    </Link>);
}

export default Blogs;