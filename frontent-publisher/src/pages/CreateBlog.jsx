import { useState } from "react"
import { BASE_URL } from "../constants/constants";

function CreateBlog(){
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [published, setPublished] =useState(false);

    const handleSubmit = async(e)=>{
        e.preventDefault();
        try{
            const token = localStorage.getItem('authorToken');
            const response = await fetch(`${BASE_URL}/blog/create`,{
                method:'POST',
                headers:{
                    'Content-Type':'application/json',
                    'Authorization':`Bearer ${token}`,
                },
                body:JSON.stringify({
                    title,
                    content,
                    published
                }),
                mode:'cors'
            }
            );

            if(!response.ok){
                const errorData = await response.json();
                console.log(errorData);
                throw new Error('An error occured while saving new blog');
            }
            
            setTitle("");
            setContent("");
            setPublished(false);
            alert('Blog saved!!');
            
        }
        catch(err){
            alert(`An error occured: ${err}`);
        }
    }

    return(<>
    <form onSubmit={handleSubmit}>
        <label htmlFor="title">
            Title 
            <input 
            type="text"
            value={title}
            onChange={(e)=>setTitle(e.target.value)}
            required
            />
        </label>
        <label htmlFor="content">
            Content
            <textarea 
            name="content"
            value={content}
            onChange={(e)=>setContent(e.target.value)}
            />
        </label>  
        <label htmlFor="publish">
            Publish
            <input 
            type="checkbox" 
            name="publish"
            checked={published}
            onChange={(e)=>setPublished(e.target.checked)}
            />
        </label>
        <button type="submit">Save</button>
    </form>
    </>)
}

export default CreateBlog;