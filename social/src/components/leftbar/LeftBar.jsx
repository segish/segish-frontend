import React, { useContext } from 'react'
import "./LeftBar.scss"
import { Link } from 'react-router-dom';
import Friends from "../../assets/1.png";
import Groups from "../../assets/2.png";
import Market from "../../assets/3.png";
import Watch from "../../assets/5.png";
import Memories from "../../assets/4.png";
import Events from "../../assets/6.png";
import Gaming from "../../assets/7.png";
import Gallery from "../../assets/8.png";
import Videos from "../../assets/9.png";
import Messages from "../../assets/10.png";
import Tutorials from "../../assets/11.png";
import Courses from "../../assets/12.png";
import Fund from "../../assets/13.png";
import { AuthContext } from '../../context/authContext';
import { useQuery } from '@tanstack/react-query';
import { makeRequest } from '../../axios';
const LeftBar = () => {
  
  const { currentUser} = useContext(AuthContext);

//I inserted this by my self If profile is updated
  const {isLoading, data } = useQuery(["user"], () =>
    makeRequest.get("/users/" + currentUser?._id).then((res) => {
      return res.data;
    })
  );
//  http://localhost:8800/api/users/648649796bd191a73ecf0765


  return (
    <div className="leftBar">
      <div className="container">
        <div className="menu">
          <div className="user">{ isLoading? "loading..."
            :(<Link to={'profile/'+data?._id} onClick={() => {window.location.href="/profile/"+data?._id}} style={{textDecoration:"none",color:"inherit"}}>
              <img src={data?.profilePic?"/upload/"+data?.profilePic:"/upload/profile.png"} alt=""/>
              <span>{data?.name}</span>
            </Link>)}
          </div>
          <div className="item">                      
            <img src={Friends} alt=""/>
            <span>Frinds</span>
          </div>
          <div className="item">
            <img src={Groups} alt=""/>
            <span>Groups</span>
          </div>
          <div className="item">
            <img src={Market} alt=""/>
            <span>Markets</span>
          </div>
          <div className="item">
            <img src={Watch} alt=""/>
            <span>Watch</span>
          </div>  
          <div className="item">
            <img src={Memories} alt=""/>
            <span>Memories</span>
          </div>
        </div>
        <hr />
        <div className="menu">
          <span>Your shortcut</span>
          <div className="item">
            <img src={Events} alt=""/>
            <span>Events</span>
          </div>
          <div className="item">
            <img src={Gaming} alt=""/>
            <span>Gming</span>
          </div>
          <div className="item">
            <img src={Gallery} alt=""/>
            <span>Gallery</span>
          </div>  
          <div className="item">
            <img src={Videos} alt=""/>
            <span>Videos</span>
          </div>
          <div className="item">
            <img src={Messages} alt=""/>
            <span>Messages</span>
          </div>
        </div><hr />
        <div className="menu">
          <span>Others</span>
          <div className="item">
            <img src={Fund} alt=""/>
            <span>Fundriser</span>
          </div>
          <div className="item">
            <img src={Tutorials} alt=""/>
            <span>Tutorials</span>
          </div>
          <div className="item">
            <img src={Courses} alt=""/>
            <span>Courses</span>
          </div>
        </div>
      </div>
    </div>
    )
}

export default LeftBar