import { Link,useNavigate } from "react-router-dom"
import "./register.scss"
import { useState } from "react"
import axios from "axios"

const Register = () => {

  const navigate = useNavigate();
  const [inputs,setInputs] = useState({
    username: "",
    email: "",
    password: "",
    name: ""
  });
  const [err,setErr] = useState(null)

  const handleChange = (e) =>{
    setInputs((perv) => ({...perv,[e.target.name]: e.target.value}));
  };
  
  const handleClick = async (e) =>{
    e.preventDefault();
    if(inputs.username===""||inputs.email===""||inputs.password===""||inputs.name===""){
      setErr("All fields must be field")
    }else{
      try{
        await axios.post("https://tsegish.onrender.com/api/auth/register",inputs)
        navigate("/login")
      }catch(err){
        setErr(err)
      }
    }
  };

  return (
      <div className="register">
        <div className="card">
          <div className="right">
            <h1>Register</h1>
            <form>
              <input 
              type="text" 
              placeholder="Username" 
              name="username" 
              onChange={handleChange}
              />
              <input 
              type="email" 
              placeholder="Email" 
              name="email" 
              onChange={handleChange}
              />
              <input 
              type="password" 
              placeholder="Password" 
              name="password" 
              onChange={handleChange}
              />
              <input 
              type="text" 
              placeholder="Name" 
              name="name" 
              onChange={handleChange}
              />
              <span style={{color:"red"}}>{err && err}</span>
              <button onClick={handleClick}>Register</button>
            </form>
          </div>
            <div className="left">
              <h1>Hi Gust!</h1>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero cum,
                alias totam numquam ipsa.
              </p>
              <span>Don't you have an account?</span>
              <Link to="/Login">
                <button>Login</button>
              </Link>
            </div>
          </div>
      </div>
  )
}

export default Register
