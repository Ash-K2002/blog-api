import { useState } from "react"
import { BASE_URL } from "../constants/constants";
import classNames from "../constants/classNames";

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

    return(
    <>
    <h2 className="mx-5 text-2xl text-customCool-dark font-bold">Create Blog</h2>
    <form onSubmit={handleSubmit}
    className="flex-grow flex flex-col gap-4 p-4 items-start m-4 border-4 border-customCool-dark rounded-2xl bg-customCool-dark outline outline-4 outline-customCool-dark outline-offset-4"
    >
        <label htmlFor="title"
        className="flex flex-col items-start gap-3 text-customWarm-dark text-xl font-semibold w-full"
        >
            Title 
            <input 
            type="text"
            value={title}
            onChange={(e)=>setTitle(e.target.value)}
            required
            className="font-normal text-customCool-dark text-lg focus:bg-customWarm-light rounded-xl p-2 w-3/4 outline outline-customWarm-light outline-offset-2 outline-2"
            />
        </label>
        <label htmlFor="content" className="flex-grow flex flex-col items-start gap-3 w-full text-customWarm-dark text-xl font-semibold">
            Content
            <textarea 
            name="content"
            value={content}
            onChange={(e)=>setContent(e.target.value)}
            className="flex-grow font-normal text-customCool-dark text-lg focus:bg-customWarm-light rounded-xl p-2 w-3/4 outline outline-customWarm-light outline-offset-2 outline-2"
            />
        </label>  
        <label htmlFor="publish" className="w-full text-customWarm-dark text-xl font-semibold">
            Publish
            <input 
            type="checkbox" 
            name="publish"
            checked={published}
            onChange={(e)=>setPublished(e.target.checked)}
            className="mx-3 w-4 h-4 accent-customWarm-dark"
            />
        </label>
        <button type="submit" className={classNames.button1}>Save</button>
    </form>
    </>
    )
}

export default CreateBlog;