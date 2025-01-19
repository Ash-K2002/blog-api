import { data, useParams } from "react-router-dom"
import useFetchData from '../utils/useFetchData.js';
import {BASE_URL} from '../constants/constants.js';
import {createContext, useContext, useState } from "react";
import authUtils from '../utils/authUtil.js';
import classNames from "../constants/classNames.js";
import {AuthContext} from '../utils/Contexts.js';

const BlogDetailContext= createContext({
    refreshKey:0,
    handleCommentSubmit:()=>{},
});

// The main component that renders the page
function BlogDetail(){
    const {isAuthenticated} = useContext(AuthContext);
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
        const commentCardArr=data.blog.comments.map((comment)=>{
            return (<li key={comment.id}
             className="bg-customGray-dark text-customBlue-dark p-2"><BlogCommentsCard data={comment}/></li>);
        });

        return(<BlogDetailContext.Provider value={{refreshKey, handleCommentSubmit}}>

        <BlogMainCard blog={data.blog}/>
        <section id="blog-detail-comment" className="my-10 flex flex-col gap-3">

        <h2 className="font-bold text-customBlue-dark text-xl px-2">Comments</h2>

        {(isAuthenticated)?<AddComments blogId={data.blog.id}/>:<div className="p-4 font-semibold text-xl text-customBlue-dark">Login to comment to blogs</div>}
        
        {
        (commentCardArr.length==0)?
        <div className="px-3 text-customBlue-dark font-semibold text-lg">No comments to show here, be the first to comment!</div>:<ul className="flex flex-col gap-3 p-2">
            {commentCardArr}
        </ul>
        }
        

        </section> 
        </BlogDetailContext.Provider>);
    }
}

// the main body of the blog's content and description
function BlogMainCard({blog}){
    return (
        <section id="blog-detail-main" className="flex flex-col bg-customGray-dark p-4 text-customBlue-dark">
        <h2 className="font-bold text-3xl">{blog.title}</h2>
        <ul className="flex flex-row gap-4 text-sm">
                <li> <span className="font-semibold">By:</span> {blog.author.username}</li>
                <li><span className="font-semibold">Published at:</span> {blog.publishedAt}</li>
        </ul>
        <p className="mt-4 py-3 text-lg font-medium">
            {blog.content}
        </p>
        </section>
    );
}

// Used to add new comments
function AddComments({blogId}){
    const [content, setContent] = useState("");
    const {handleCommentSubmit} = useContext(BlogDetailContext);

    const handleAddComment= async (e)=>{
        e.preventDefault();
        if(content==""){
            return;
        }
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
    <form onSubmit={handleAddComment} className="bg-customGray-light flex flex-col p-2 gap-2 text-customBlue-dark">
                <label htmlFor="comment-form-content" className="flex flex-row items-start gap-2 font-semibold">Comment
                <textarea
                    name="content" id="comment-form-content"
                    value={content}
                    onChange={(e)=>setContent(e.target.value)}
                    className={classNames.textArea1}
                    placeholder="Add you comment.."
                    />
                </label>
 
        <section className="flex flex-row gap-3">
        <button type="submit" className={`${classNames.button1}`}  disabled={!content.trim()}>Submit</button>

        <button type="button" onClick={()=>{setContent("")}} className={`${classNames.button1}`}>Cancel</button> 
        </section>
        
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
    <section className="comment-user text-sm font-semibold text-customBlue-medium">{data.user.username}</section>
    <p className="text-lg font-medium">{data.content}</p>
    <section className="comment-createdAt text-sm text-medium">{data.createdAt}
    </section>
    {isLoggedInUser && <section className="flex flex-row gap-2">
      <button onClick={handleDeleteComment} className={classNames.button1}>Delete</button>
    <button onClick={(e)=>{setEditing(true)}} className={classNames.button1}>Edit</button>
    </section>}
    
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
                <label htmlFor="comment-edit-content" className="font-semibold flex flex-row gap-2 items-center">Comment <textarea 
                    name="content" id="comment-edit-content"
                    onChange={(e)=>{setContent(e.target.value)}}
                    value={content}
                    className={classNames.textArea1}
                    /> </label>
                
            <section className='buttons flex flex-row gap-3'>
                <button type="submit" className={classNames.button1}
                disabled={!content.trim()}
                >Submit</button>
                <button type="button" onClick={()=>{setContent("");
                 setEditing(false);
                }} className={classNames.button1}>Cancel</button>
            </section>
        </form>
    </>);

}



export default BlogDetail;