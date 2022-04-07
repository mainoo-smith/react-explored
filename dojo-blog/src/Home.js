
import BlogList from './BlogLists';
import Navbar from './Navabar';
import useFetch from './useFetch';

const Home = () => {
    const {data, isPending, error} = useFetch('http://localhost:8000/blogs');
    // use conditional and (&&) to make sure data (blogs) 
    // is present before rendering component
    return ( 
        <div className="home">
            <Navbar />
            {error && <div>{error}</div>}
            {isPending && <div>Loading...</div>}
            {data && <BlogList blogs={data} />}
        </div>
     );
}
 
export default Home;