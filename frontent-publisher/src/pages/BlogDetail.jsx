import {useParams} from 'react-router-dom';
import {useFetchData} from '../utils/useFetchData.js';
import {BASE_URL} from '../constants/constants.js';
import { getUserId } from '../utils/authUtil.js';
import { useState,useContext } from 'react';
import {BlogContext} from '../contexts/Contexts.jsx';


function BlogDetail(){
    const {id} = useParams();
    const [refreshCounter, setRefreshCounter] = useState(0);
    const [editing, setEditing] = useState(false);

    const handleRefreshPage=()=>{
        setRefreshCounter(refreshCounter+1);
    }

    const url= `${BASE_URL}/blog/read/${id}`;
    const {loading, data, error} = useFetchData(url,false,refreshCounter);

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

    const blog = data.blog;
    const commentsArr=blog.comments.map((comment)=>{
        return <li key={comment.id}>
            <CommentCards comment={comment}/>
        </li>
    });

    return (<BlogContext.Provider value={{handleRefreshPage}}>

        {
        (editing)?
        <EditBlog blog={blog} setEditing={setEditing}/>
        :
        <section className='blog-main-content p-4 '>
        <h2 className='text-customCool-dark text-2xl font-bold'>{blog.title}</h2>
        <p className='text-customCool-dark text-lg my-2'>{blog.content}</p>

        <button className='text-lg rounded-lg bg-customCool-dark px-2 py-1 text-customWarm-dark outline outline-offset-2 outline-customCool-dark hover:bg-customCool-medium hover:text-customCool-dark' onClick={()=>setEditing(true)
        }>Edit Blog</button>
        </section>
        }

        <CreateComment blogId={blog.id}/>
        <ul>
            {commentsArr}
        </ul>
        </BlogContext.Provider>);
}

function EditBlog({blog,setEditing}){
    const [content, setContent] = useState(blog.content||"");
    const [title, setTitle] = useState(blog.title||"");
    const [published, setPublished] =useState(blog.published||false);
    const {handleRefreshPage}=useContext(BlogContext);

    const handleSubmit=async(e)=>{
        e.preventDefault();
        try{
            const response = await fetch(`${BASE_URL}/blog/update/${blog.id}`,
            {
                method:'POST',
                headers:{
                    'Content-Type':'application/json',
                    'Authorization':`Bearer ${localStorage.getItem('authorToken')}`
                },
                body: JSON.stringify({
                    title,
                    content,
                    published,
                }),
                mode:'cors'
            });

            if(!response.ok){
                throw new Error('Error while updating blog');
            }
            handleRefreshPage();
            setEditing(false);
        }
        catch(err){
            alert(err);
        }
    }


    return(
        <form onSubmit={handleSubmit}>
            <label htmlFor="title">
                Title
                <input 
                name='title'
                type="text"
                value={title}
                onChange={(e)=>setTitle(e.target.value)}
                required
                 />
            </label>

            <label htmlFor="content">
                content
                <textarea
                name='content'
                value={content}
                onChange={(e)=>setContent(e.target.value)}
                required
                />
            </label>

            <label htmlFor="published">
                Publish
                <input 
                name='published'
                type="checkbox"
                checked={published}
                onChange={(e)=>setPublished(e.target.checked)}
                required
                 />
            </label>

            <ul>
                <li>
                    <button type='submit'>Submit</button>
                </li>
                <li>
                    <button
                    onClick={(e)=>{
                        setEditing(false);
                    }}
                    >Cancel</button>
                </li>
            </ul>
        </form>
    )
}

function CreateComment({blogId}){
    const {handleRefreshPage}=useContext(BlogContext);
    const [content, setContent] = useState("");
    const handleSubmit = async(e)=>{
        e.preventDefault();
        try{
            const token = localStorage.getItem('authorToken');
            const response = await fetch(`${BASE_URL}/comment/create`,
                {
                    method:'POST',
                    headers:{
                        "Content-Type":"application/json",
                        "Authorization":`Bearer ${token}` 
                    },
                    body:JSON.stringify({content,blogId}),
                    mode:'cors'
                }
            );

            if(!response.ok){
                throw new Error('Error while creating comment');
            }

            setContent("");
            handleRefreshPage();
        }
        catch(e){
            alert(e)
        }
    }
    return(
    <form onSubmit={handleSubmit}>
        <label htmlFor="create-comment-content">
            Comment:
        <textarea 
        name="create-comment-content"
        value={content}
        onChange={(e)=>setContent(e.target.value)}
        required
        />
        </label>
        <ul>
            <li><button type='submit'>Submit</button></li>

            <li><button 
                    onClick={(e)=>{
                        setContent("");
                    }}>
                Cancel
            </button>
            </li>
        </ul>
    </form>);
}

function CommentCards({comment}){
    const [editing, setEditing] = useState(false);
    const {handleRefreshPage}=useContext(BlogContext);

    const handleDelete=async(e)=>{
        e.preventDefault();

        try{
            const token = localStorage.getItem('authorToken');
            const response = await fetch(`${BASE_URL}/comment/delete/${comment.id}`,{
                method:'delete',
                headers:{
                    'Content-Type':'application/json',
                    'Authorization':`Bearer ${token}`
                },
                mode:'cors'
            });
            if(!response.ok){
                throw new Error('Error while deleting comment');
            }
            handleRefreshPage();
        }
        catch(e){
            alert(e);
        }
    };
    
    const role = (comment.user.role!='READER')?comment.user.role:"";

    if(editing){
        return(<EditComment comment={comment} setEditing={setEditing}/>);
    }

    return(<>
    <div className='comment-card-username'>{comment.user.username} {role}</div>
    <div className='comment-card-content'>{comment.content}</div>
    <div>Created at: {comment.createdAt}</div>
   { (comment.user.id==getUserId())&&<div className='buttons'>
        <button onClick={handleDelete}>Delete</button>
        <button onClick={()=>setEditing(true)}>Edit</button>
    </div>
    }
    </>)
}

function EditComment({comment, setEditing}){
    const [content, setContent] = useState(comment.content||"");
    const {handleRefreshPage}=useContext(BlogContext);

    const handleSubmit = async(e)=>{
        e.preventDefault();
        try{
            const token = localStorage.getItem('authorToken');
            const response = await fetch(`${BASE_URL}/comment/update/${comment.id}`,{
                method:'POST',
                headers:{
                    'Content-Type':'application/json',
                    'Authorization':`Bearer ${token}`
                },
                body:JSON.stringify({
                    content
                }),
                mode:'cors'
            });

            if(!response.ok){
                throw new Error('An error occured');
            }

            setEditing(false);
            handleRefreshPage();
        }
        catch(err){
            alert(`An error occured ${err}`);
        }
    }

    return(<form onSubmit={handleSubmit}>
        <label htmlFor="edit-comment">
            Comment
                <textarea 
                name="edit-comment"
                value={content}
                onChange={(e)=>setContent(e.target.value)}
                required
                />
        </label>
        <ul>
            <li>
                <button type='submit'>Submit</button>
            </li>
            <li>
                <button onClick={()=>setEditing(false)}>Cancel</button>
            </li>
        </ul>
    </form>)
}

export default BlogDetail;