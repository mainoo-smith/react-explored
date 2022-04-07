import { Link } from "react-router-dom";
import { useNavigate } from "react-router";



const Navbar = () => {

    const user = localStorage.getItem("username")
    const navigate = useNavigate();

    const handleLogOut = (e) => {
        e.preventDefault();
        navigate('/');
        localStorage.clear();
    }

    return ( 
        <nav className="navbar">
            <h1>The Code Blog</h1>
            <div className="links">
                <Link to="/create">New Blog</Link>
                <Link to="/auth/login" onClick={handleLogOut}>Log Out</Link>
            </div>
            <div>{user}</div>
        </nav>
     );
}
 
export default Navbar;