import { useParams } from "react-router";
import useFetch from "./useFetch";
import {Link, useNavigate} from 'react-router-dom';
import { useState } from "react";

const BlogDetails = () => {
    const [title, setTitle] = useState();
    const [author, setAuthor] = useState();
    const [body, setBody] = useState();

    const { id } = useParams();
    const { data: blog, error, isPending} = useFetch("http://localhost:8000/blogs/" + id);
    const navigate = useNavigate();

    const handleDelete = () => {
        fetch("http://localhost:8000/blogs/" + blog.id, {
            method: "DELETE"
        }).then(() => {
            navigate('/home');
        })
    }

    const handleUpdate = blogId => {
        blogId = blog.id;
        console.log(blogId)
        return blogId;
    }

    return ( 
        <div className="blog-details">
            {isPending && <div>Loading...</div>}
            {error && <div>{error}</div>}
            {blog && (
                <article>
                    <h2>{blog.title}</h2>
                    <p>written by {blog.author}</p>
                    <div>{blog.body}</div>
                </article>
            )}
            <div>
                <button onClick={handleDelete}>Delete</button>
                
            </div>
            
        </div>
     );
}
 
export default BlogDetails;