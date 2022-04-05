import { useState } from "react";
import {useHistory} from "react-router-dom";

const Create = () => {
    // track input values with states
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [author, setAuthor] = useState("mario");
    const [isSending, setIsSending] = useState(false);
    
    //redirect to a page with useHistory
    const RouteHistory = useHistory();

    // handle submit form
    // post data with fetch method
    const handleSunmit = (e) => {
        e.preventDefault();
        const blog = {title, body, author}
        
        setIsSending(true);

        fetch('http://localhost:8000/blogs', {
            method: "POST",
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify(blog)
        }).then(() =>{
            setIsSending(false);
            RouteHistory.push('/');
        })
    }

    return ( 
        <div className="create">
            <h1>Add new Blog</h1>
            <form onSubmit={handleSunmit}>
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
                    onChange={(e) => setAuthor(e.target.value)}>
                    <option value="mario">mario</option>
                    <option value="yoshi">yoshi</option>
                </select>
                <button>Add new Blog</button>
                {isSending && <div>Adding Blog...</div>}
            </form>
        </div>
        
     );
}
 
export default Create;