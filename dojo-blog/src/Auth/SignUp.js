import { useState } from "react";
import { useNavigate } from "react-router";
import useFetch from "../useFetch";


const SignUp = () => {
    const [fisrtName, SetFirstName] = useState("");
    const [lastName, SetLastName] = useState("");
    const [username, SetUsername] = useState("");
    const [password, SetPassword] = useState("");
    const [password1, SetPassword1]  = useState("");
    const [userExists, SetUserExists] = useState(false);
    const [noMatch, SetNoMatch] = useState(false);
    const {data:users} = useFetch("http://localhost:9000/users/");
    const navigate = useNavigate();

    const handleClick = (e) => {
        e.preventDefault();
        navigate('/home');
    }

    const handleSignUp = (e) =>{
        e.preventDefault();

        const result  = users.filter(user => user.username === username);
        if(result.length > 0){
            SetUserExists(true)
            navigate('/Auth/login'); 
        }else if (password !== password1){
            SetNoMatch(true);
            SetUsername("");
            SetPassword("");
            SetPassword1("");
        }
        else{
            const users = {username, password};
            fetch("http://localhost:9000/users/", {
                method: "POST",
                headers: {"Content-Type" : "application/json"},
                body: JSON.stringify(users)
            }).then(() =>{
                navigate('/home');
            });
        }

    }

    return ( 
        <div className="auth">
            <h3>Welcome to the Blog! Sign up for your workspace</h3>
            <p>Happy blogging</p>
            <form onSubmit={handleSignUp}>
                <label > First name</label>  
                <input type="text" required value={fisrtName} onChange={e => SetFirstName(e.target.value)}/>
                <label > Last Name</label>  
                <input type="text" required value={lastName} onChange={ e => SetLastName(e.target.value)}/>
                <label > Username</label>  
                <input type="text" required value={username} onChange={(e) => SetUsername(e.target.value)}/>
                <label >Password</label>
                <input type="password" required value={password} onChange={(e) => SetPassword(e.target.value)}/>
                <label >Confirm Password</label>
                <input type="password" required value={password1} onChange={e => SetPassword1(e.target.value)}/>
                <button onClick={handleClick} className="sign-up">Sign Up</button>
                {userExists && <div className="user-exists">Username already exists...</div>}
                {noMatch && <div className="no-match">Passwords do not match...</div>}
            </form>
        </div>
     );
}
 
export default SignUp;