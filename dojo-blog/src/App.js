import './App.css';
import Home from './Home';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Create from './Create';
import BlogDetails from './BlogDetails';
import NotFound from './NotFound';
import Login from './Auth/Login';
import SignUp from './Auth/SignUp';


function App() {
  return (
    <Router>
      <div className="App">
        <div className="content">
          <Routes>
            <Route path="/" element={<Login/>} />
            <Route path="/home" element={<Home/>} />
            <Route path="/create" element={<Create />}/>
            <Route path="/auth/login" element={<Login />}/>
            <Route path="/auth/signup" element={<SignUp />}/>
            <Route path="/blogs/:id" element={ <BlogDetails />}/>
            <Route path='*' element={<NotFound />}/>
          </Routes>
        </div>
      </div>
    </Router>
    
  );
}

export default App;
