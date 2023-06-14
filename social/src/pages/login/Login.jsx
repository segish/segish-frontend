import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import "./login.scss"
import { Link, useNavigate } from "react-router-dom"

const Login = () => {
  const [inputs,setInputs] = useState({
    username: "",
    password: "",
  });
  const [err,setErr] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) =>{
    setInputs((perv) => ({...perv,[e.target.name]: e.target.value}));
  };
  const { login } = useContext(AuthContext);

  const handleLogin= async (e) => {
    e.preventDefault();  
    try{
      await login(inputs);
      navigate("/")
    }catch(err){
      setErr(err.response.data);
    }
  }

  return (
      <div className="login">
        <div className="card">
          <div className="left">
            <h1>Hello World.</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero cum,
              alias totam numquam ipsa 
            </p>
            <span>Don't you have an account?</span>
            <Link to="/Register">
              <button>Register</button>
            </Link>
          </div>
          <div className="right">
            <h1>Login</h1>
            <form>
              <input 
              type="text" 
              placeholder="Username" 
              name="username" 
              onChange={handleChange}
              />
              <input 
              type="password" 
              placeholder="Password" 
              name="password" 
              onChange={handleChange}
              />
              <span style={{color:"red" }}>{err && err}</span>
                <button onClick={handleLogin }>Login</button>
            </form>
          </div>
        </div>
      </div>
  )
}

export default Login
