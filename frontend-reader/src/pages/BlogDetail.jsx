import { data, useParams } from "react-router-dom"
import useFetchData from '../utils/useFetchData.js';
import {BASE_URL} from '../constants/constants.js';
import Deck from '../components/Deck.jsx';
import {createContext, useContext, useState } from "react";
import authUtils from '../utils/authUtil.js';

const BlogDetailContext= createContext({
    refreshKey:0,
    handleCommentSubmit:()=>{},
});

// The main component that renders the page
function BlogDetail(){

    const {id}=useParams();
    const [refreshKey, setRefreshKey] = useState(0);
    const {data, loading, error} = useFetchData(`${BASE_URL}/blog/read/${id}`, refreshKey);

    const handleCommentSubmit =()=>{
        setRefreshKey((prevKey)=>prevKey+1);
    }

    if(loading){
        return (<>
        <h2>...Loading</h2>
        </>);
    }

    if(error){
        return <>
        <section>Error: {error}</section></>
    }

    if(data){
        return(<BlogDetailContext.Provider value={{refreshKey, handleCommentSubmit}}>

        <BlogMainCard blog={data.blog}/>
        <section className="blog-comments">
        <h2>Comments</h2>
        <AddComments blogId={data.blog.id}/>
        <Deck dataArr={data.blog.comments} 
              Card={BlogCommentsCard}/>
        </section>

        </BlogDetailContext.Provider>);
    }
}

// the main body of the blog's content and description
function BlogMainCard({blog}){
    return (
        <><h2 className="blog-title">{blog.title}</h2>
        <section className="blog-detail">
            <ul>
                <li>By: {blog.author.username}</li>
                <li>Published at: {blog.publishedAt}</li>
            </ul>
        </section>
        <p className="blog-content">
            {blog.content}
        </p>
        </>
    );
}

// Used to add new comments
function AddComments({blogId}){
    const [content, setContent] = useState("");
    const {handleCommentSubmit} = useContext(BlogDetailContext);

    const handleAddComment= async (e)=>{
        e.preventDefault();
        try {
            const response = await fetch(`${BASE_URL}/comment/create`,{
                method:'POST',
                headers:{
                    "Content-type":"application/json",
                    "Authorization": `Bearer ${localStorage.token}`,
                },
                body: JSON.stringify({content: content, blogId: blogId}),
                mode:'cors'
            });

            if(!response.ok){
                const errorData = await response.json();
                throw new Error(errorData.error||'Some issue occured');
            }

            setContent("");

            
            alert('Successfully added comment');
            handleCommentSubmit();
        } catch (error) {
            console.log(error);
            alert(error||'Some issue occured while adding comment');
        }
    } 


    return (<>
    <form onSubmit={handleAddComment}>
        <ul>
            <li>
                <label htmlFor="comment-form-content">Comment:</label>
                <input type="text"
                    name="content" id="comment-form-content"
                    value={content}
                    onChange={(e)=>setContent(e.target.value)}/>
            </li>
        </ul>
        <button type="submit">Submit</button>
        <button type="button" onClick={()=>{setContent("")}}>Cancel</button>
    </form>
    </>)
}

// Renders individual comments
function BlogCommentsCard({data}){
    const {handleCommentSubmit} = useContext(BlogDetailContext);
    const [editing, setEditing] = useState(false);

    const handleDeleteComment= async (e)=>{
        e.preventDefault();
        try{
            const response = await fetch(`${BASE_URL}/comment/delete/${data.id}`,{
                method:'DELETE',
                headers:{
                    "Content-type":"application/json",
                    "Authorization": `Bearer ${localStorage.token}`,
                },
                mode:'cors'
            });
            if(!response.ok){
                const errorData = await response.json();
                throw new Error(errorData.error||'Some error occurred');
            }
            handleCommentSubmit();
        }catch(err){
            console.log(err);
            alert(err||'Some issue occurred while adding comment');
        }
    }

  const userId = authUtils.getLoggedInUserId();

   const isLoggedInUser=(userId==data.user.id);

  if(editing){
    return (<>
    <EditComment
     comment={data}
     setEditing={setEditing} /></>)
  }

  return (
    <>
    <p>{data.content}</p>
    <section className="comment-user">{data.user.username}, {data.user.id}</section>
    <section className="comment-createdAt">{data.createdAt}
    </section>
    {isLoggedInUser && <button onClick={handleDeleteComment}>Delete</button>}
    {isLoggedInUser && <button onClick={(e)=>{setEditing(true)}}>Edit</button>}
    </>
  );
}

function EditComment({comment, setEditing}){
    const {handleCommentSubmit} = useContext(BlogDetailContext);
    const [content, setContent] = useState(comment.content||"");


    const handleEditComment= async (e)=>{
        e.preventDefault();
        try{
            const response = await fetch(`${BASE_URL}/comment/update/${comment.id}`,{
                method:'POST',
                headers:{
                    "Content-type":"application/json",
                    "Authorization": `Bearer ${localStorage.token}`,
                },
                body: JSON.stringify({'content':content}),
                mode:'cors'
            });

            if(!response.ok){
                const errMessage= await response.json();
                throw new Error(errMessage.error||"Some error occured");
            }

            setEditing(false);
            handleCommentSubmit();

        }catch(err){
            console.log(err);
            alert(`Error: ${err}`);
        }
        
    }

    return (<>
        <form onSubmit={handleEditComment}>
            <ul>
                <li><label htmlFor="comment-edit-content">Content: </label>
                <input 
                    type="text"
                    name="content" id="comment-edit-content"
                    onChange={(e)=>{setContent(e.target.value)}}
                    value={content}
                    />
                </li>
            </ul>
            <section className='buttons'>
                <button type="submit">Submit</button>
                <button type="button" onClick={()=>{setContent("");
                 setEditing(false);
                }}>Cancel</button>
            </section>
        </form>
    </>);

}



export default BlogDetail;