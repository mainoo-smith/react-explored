import {useEffect, useState} from 'react';
import BlogList from './BlogLists';

const Home = () => {
    // handle click event
    const [blogs, setBlogs] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('http://localhost:8000/blogs')
        .then(response => {
            if(!response.ok){
                throw Error("resource not found");
            }
            return response.json();
        })
        .then(data => {
            setBlogs(data);
            setIsPending(false);
            setError(null);
        })
        .catch(err => {
            setIsPending(false);
            setError(err.message);
        })
    }, []);

    // use conditional and (&&) to make sure data (blogs) 
    // is present before rendering component
    return ( 
        <div className="home">
            {error && <div>{error}</div>}
            {isPending && <div>Loading...</div>}
            {blogs && <BlogList blogs={blogs} />}
        </div>
     );
}
 
export default Home;