import { useState } from "react";
import {useNavigate} from "react-router-dom";
import Navbar from "./Navabar";

const Create = () => {
    // track input values with states
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [author, setAuthor] = useState("");
    const [isSending, setIsSending] = useState(false);
    
    //redirect to a page with useNavigate
    const navigate = useNavigate();

    // handle submit form
    // post data with fetch method
    const handleSubmit = (e) => {
        e.preventDefault();
        const blog = {title, body, author}
        
        setIsSending(true);

        fetch('http://localhost:8000/blogs', {
            method: "POST",
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify(blog)
        }).then(() =>{
            setIsSending(false);
            navigate('/home');
        })
    }

    return ( 
        <div >
            <Navbar />
            <div className="create">
            <h3>Add new Blog</h3>
            <form onSubmit={handleSubmit}>
                <label htmlFor="">Blog Title:</label>
                <input 
                    type="text"
                    required
                    value= {title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <label>Blog body:</label>
                <textarea 
                    required 
                    value={body}
                    onChange={(e) => setBody(e.target.value)}>
                    
                </textarea>
                <label>Blog Author:</label>
                <select
                    value={author}
                    onChange={(e) => setAuthor(localStorage.getItem("username"))}>
                    <option value="anonymous">Anon</option>
                    <option >{localStorage.getItem("username")}</option>
                </select>
                <button>Add new Blog</button>
                {isSending && <div>Adding Blog...</div>}
            </form>
        </div>
        </div>
        
     );
}
 
export default Create;