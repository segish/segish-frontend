import React, { useContext, useEffect, useState } from 'react'
import "./NavBar.scss"
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import ModeNightOutlinedIcon from '@mui/icons-material/ModeNightOutlined';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import MailOutlinedIcon from '@mui/icons-material/MailOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { Link } from 'react-router-dom';
import { DarkModeContext } from '../../context/darkModeContext';
import { AuthContext } from '../../context/authContext';
import { useNavigate } from "react-router-dom";
import axios from "axios"
import { useQuery} from '@tanstack/react-query';
import { makeRequest } from '../../axios';
import Search1 from "../../components/search/search"


const NavBar = () => {

  const [openSerach,setOpenSerach] = useState(false)
  const navigate = useNavigate();
  const { toggle ,darkMode} = useContext(DarkModeContext);
  const { currentUser} = useContext(AuthContext);
  
  const [texts,setTexts] = useState(undefined)

  const { data } = useQuery(["user"], () =>
    makeRequest.get("/users/" + currentUser?._id).then((res) => {
      return res.data;
    })
  );

  const handleLogout = async (e) =>{
    e.preventDefault();
    try{
      localStorage.clear();
      navigate("/login")
    }catch(err){
      console.log(err)
    }
  };
  const handleClick = ()=>{
    setOpenSerach(true);
    setTexts("")
  }
    const [datas, setDatas] = useState([])
  
  const handleChange = (e) => {
    setTexts(() => (e.target.value ));
    };

    useEffect(()=>{
      
      const fetchData = async () =>{
        try {
          const {data: response} = await axios.get("https://tsegish.onrender.com/api/search?texts="+texts,{ withCredentials: true});
          setDatas(response);
        } catch (error) {
          console.error(error.message);
        }
      }
  
      fetchData();
    },[texts])


  return (
    <div className='NavBar'>
      <div className="left">
        <Link to="/" style={{ textDecoration: "none" }}>
            <span >Segish</span>
        </Link>
        <HomeOutlinedIcon/>
        { darkMode ? <WbSunnyIcon onClick={toggle}/> : <ModeNightOutlinedIcon onClick={toggle}/>}
        <GridViewOutlinedIcon/>
        <div className="search">
            <input type="text" placeholder='Search' onClick={handleClick} onChange={handleChange}/>
            <div className='icon'><SearchOutlinedIcon/></div>
        </div>
      </div>
      {openSerach && <Search1 setOpenSerach={setOpenSerach} searchdata={datas}/>}
      <div className="right">
        <PersonOutlinedIcon/>
        <MailOutlinedIcon/>
        <NotificationsNoneOutlinedIcon/>
        <div className="user">
            <img src={data?.profilePic?"/upload/"+data?.profilePic:"/upload/profile.png"} alt="" />
            <button onClick={handleLogout}>logout</button>
        </div>
      </div>
    </div>
  )
}

export default NavBar
