
import BlogList from './BlogLists';
import useFetch from './useFetch';

const Home = () => {
    const {data, isPending, error} = useFetch('http://localhost:8000/blogs');
    // use conditional and (&&) to make sure data (blogs) 
    // is present before rendering component
    return ( 
        <div className="home">
            {error && <div>{error}</div>}
            {isPending && <div>Loading...</div>}
            {data && <BlogList blogs={data} />}
        </div>
     );
}
 
export default Home;