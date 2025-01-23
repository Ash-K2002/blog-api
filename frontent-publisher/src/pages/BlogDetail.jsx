import {useParams, useNavigate} from 'react-router-dom';
import {useFetchData} from '../utils/useFetchData.js';
import {BASE_URL} from '../constants/constants.js';
import { getUserId } from '../utils/authUtil.js';
import { useState,useContext } from 'react';
import {BlogContext} from '../contexts/Contexts.jsx';
import classNames from '../constants/classNames.js'


function BlogDetail(){
    const {id} = useParams();
    const navigate = useNavigate();
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

    const handleDeleteBlog=async(e)=>{
        e.preventDefault();
        try{
            const token = localStorage.getItem('authorToken');
            const response = await fetch(`${BASE_URL}/blog/delete/${blog.id}`,{
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
            navigate('/blogs');
        }
        catch(e){
            alert(e);
        }
    }

    return (<BlogContext.Provider value={{handleRefreshPage}}>

        {
        
        (editing)?
        <EditBlog blog={blog} setEditing={setEditing}/>
        :
        <section className='blog-main-content p-4 '>
        <h2 className='text-customCool-dark text-2xl font-bold'>{blog.title}</h2>
        <p className='text-customCool-dark text-lg mt-2 mb-10 border-2 border-customCool-dark rounded-xl p-2'>{blog.content}</p>
        <ul className='flex flex-row gap-3'>
            <li>
        <button className={classNames.button3}  onClick={()=>setEditing(true)
        }>Edit Blog</button>
        </li>
        <li>
            <button className={classNames.button3}
            onClick={handleDeleteBlog}
            >
                Delete
            </button>
        </li>
        </ul>
        </section>
        }

        <section id='comment-section' className='border-t-2 border-customCool-dark m-2 p-2'>
        <CreateComment blogId={blog.id}/>
        <h2 className='text-xl font-bold text-customCool-dark my-2 border-y-2 border-customCool-dark'>Comments</h2>
        <ul className='flex flex-col gap-2 divide-y-2 divide-customWarm-dark'>
            {commentsArr}
        </ul>

        </section>
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
        <form onSubmit={handleSubmit}
        className='border-2 border-customCool-dark rounded-lg m-2 p-2 flex flex-col gap-3'
        >
            <label htmlFor="title"
            className="flex flex-col gap-2 text-lg font-semibold text-customCool-dark"
            >
                Title
                <input 
                name='title'
                type="text"
                value={title}
                onChange={(e)=>setTitle(e.target.value)}
                required
                className='font-normal rounded-lg border-2 border-customCool-dark bg-customCool-medium focus:bg-customCool-light p-1'
                 />
            </label>

            <label htmlFor="content"
            className='flex flex-col font-semibold text-lg text-customCool-dark gap-2'
            >
                Content
                <textarea
                name='content'
                value={content}
                onChange={(e)=>setContent(e.target.value)}
                required
                className='border-2 border-customCool-dark p-1 rounded-lg bg-customCool-medium focus:bg-customCool-light resize-none h-40 font-normal'
                />
            </label>

            <label htmlFor="published"
            className='text-customCool-dark font-semibold text-lg'
            >
                Publish
                <input 
                name='published'
                type="checkbox"
                checked={published}
                onChange={(e)=>setPublished(e.target.checked)}
                className='mx-2 w-4 h-4 accent-customWarm-dark'
                 />
            </label>

            <ul className='flex flex-row gap-2'>
                <li>
                    <button type='submit'
                    className={classNames.button2}
                    >Submit</button>
                </li>
                <li>
                    <button
                    onClick={(e)=>{
                        setEditing(false);
                    }}
                    className={classNames.button2}
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
    <form onSubmit={handleSubmit} 
    className='border-customCool-dark border-2 rounded-xl p-2 bg-customCool-medium'
    >
        <label htmlFor="create-comment-content"
        className='flex flex-row items-start gap-2 p-4 font-semibold text-customCool-dark'>
            Comment
        <textarea 
        name="create-comment-content"
        value={content}
        onChange={(e)=>setContent(e.target.value)}
        required
        className='resize-none w-3/4 h-40 border-2 rounded-lg border-customCool-dark bg-customWarm-light focus:bg-customCool-light p-2 text-lg font-normal'
        />
        </label>
        <ul className='flex flex-row gap-2'>
            <li><button type='submit'
            className={classNames.button2}
            >Submit</button></li>

            <li><button 
                    onClick={(e)=>{
                        setContent("");
                    }}
                    className={classNames.button2}
                    >
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
    <div className='comment-card-username flex flex-row justify-between text-md text-customCool-dark'><span>{comment.user.username}</span> {role && <span className='bg-customWarm-dark p-1 font-semibold'>{role}</span>}</div>
    <div className='comment-card-content font-semibold text-lg'>{comment.content}</div>
    <div className='text-sm text-customCool-dark'>Created at: {comment.createdAt}</div>
   { (comment.user.id==getUserId())&&<div className='buttons flex flex-row gap-2 items-start py-1'>
        <button onClick={handleDelete}
        className={classNames.button2}
        >Delete</button>
        <button onClick={()=>setEditing(true)}
            className={classNames.button2}
            >Edit</button>
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

    return(<form onSubmit={handleSubmit} className='p-2 text-customCool-dark'>
        <label htmlFor="edit-comment" className='flex flex-row gap-2 font-semibold'>
            Comment
                <textarea 
                name="edit-comment"
                value={content}
                onChange={(e)=>setContent(e.target.value)}
                required
                className='w-3/4 resize-none rounded-lg 
                border-2 border-customCool-dark hover:bg-customCool-light p-1 font-normal'
                />
        </label>
        <ul className='flex flex-row gap-2 py-2'>
            <li>
                <button type='submit'
                className={classNames.button2}
                >Submit</button>
            </li>
            <li>
                <button onClick={()=>setEditing(false)}
                className={classNames.button2}
                    >Cancel</button>
            </li>
        </ul>
    </form>)
}

export default BlogDetail;