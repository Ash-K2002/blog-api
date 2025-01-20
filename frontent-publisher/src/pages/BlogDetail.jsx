import {useParams} from 'react-router-dom';
import {useFetchData} from '../utils/useFetchData.js';
import {BASE_URL} from '../constants/constants.js';
import { getUserId } from '../utils/authUtil.js';
import { useState,createContext,useContext } from 'react';

const BlogContext = createContext({
    handleRefreshPage:()=>{},
});

function BlogDetail(){
    const {id} = useParams();
    const [refreshCounter, setRefreshCounter] = useState(0);

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
        <section className='blog-main-content'>
        <h2>{blog.title}</h2>
        <p>{blog.content}</p>
        </section>
        
        {(blog.published)?
        <button>Move to drafts</button>
        :
        <button>Publish</button>}
        <CreateComment blogId={blog.id}/>
        <ul>
            {commentsArr}
        </ul>
        </BlogContext.Provider>);
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