import { useState } from "react";
import { useNavigate } from "react-router";
import useFetch from "../useFetch";


const Login = () => {
    const [username, SetUsername] = useState("");
    const [password, SetPassword] = useState("");
    const [authenticating, setAuthenticating]  = useState(false);
    const [loggedIn, SetLogIn] = useState(false);
    const [logginError, SetError] = useState(false);
    const {data:users} = useFetch("http://localhost:9000/users/");
    const navigate = useNavigate();

    const handleNewUser = (e) => {
        e.preventDefault();
        navigate('/auth/signup');
    }
    const handleErrorSunmit = (e) => {
        e.preventDefault();
        SetUsername("")
        SetPassword("");
        SetError(false);
    }
    
    const handleSignIn = (e) =>{
        e.preventDefault();

        setAuthenticating(true);
        
        const result  = users.filter(user => user.username === username && user.password === password);
        if(result.length > 0){
            localStorage.setItem("username", username);
            setAuthenticating(false);
            SetLogIn(true);
            navigate('/home'); 
        }else{
            SetError(true);
            setAuthenticating(false);
        }

    }

    return ( 
        <div className="auth">
            <h3>Sign In to your Account</h3>
            {loggedIn &&<h3>Welcome {username}</h3>}
            <form onSubmit={handleSignIn}>
                <label>Username</label>
                <input type="text" value={username} onChange={(e) => SetUsername(e.target.value)}/>
                <label >Password</label>
                <input type="password" value={password} onChange={(e) => SetPassword(e.target.value)}/>
                <button className="login">Login</button>
                {authenticating &&<div>Authenticating...</div>}
                {logginError && <button className="error" onClick={handleErrorSunmit}>Inavlid username or password. Reset</button>}
            </form>

            <button onClick={handleNewUser} className="new-user-btn">New User</button>
        </div>
     );
}
 
export default Login;