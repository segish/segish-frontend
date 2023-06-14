import React from 'react'
import "./RightBar.scss"
import login from "../navbar/login.jpg"
import { makeRequest } from '../../axios';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

const RightBar = () => {
  const { isLoading, error, data } = useQuery(["relationship"], () =>
  makeRequest.get("/users/suggesion/get").then((res) => {
    return res.data;
  })
  );

  const queryClient = useQueryClient();

const mutation = useMutation(
  (ids) => {
    return makeRequest.put("/users/"+ ids +"/follow");
  },
  {
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries(["relationship"]);
    },
  }
);

  const handleDismiss = ()=>{
    queryClient.invalidateQueries(["relationship"]);
  }

  const handleFollow = (ids)=>{
    mutation.mutate(ids);
  }

  return (
    <div className='RightBar'>
      <div className="container">
        <div className="item">
          <span>Suggestions For You</span>
          {error ? "somthing went wrong"
            :isLoading? "loading..."
            : data.map((suggestion)=>(
            <div className="user">
              <div className="userInfo">
                <img src={suggestion.profilePic?"/upload/"+suggestion.profilePic:"/upload/profile.png"} alt="" />
                <span>{suggestion.name}</span>
              </div>
              <div className="buttons">
                <button onClick={()=>handleFollow(suggestion._id)}>Follow</button>
                <button onClick={handleDismiss}>dismiss</button>
              </div>
            </div>
            ))}
        </div>
        <div className="item">
          <span>Latest Activities</span>
          <div className="user">
            <div className="userInfo">
              <img src={login} alt="" />
              <p>
                <span>user name</span> Changed their co
              </p>
              <div className="time">
                <span>1 min ago</span>
              </div>
            </div>
          </div>
          <div className="user">
            <div className="userInfo">
              <img src={login} alt="" />
              <p>
                <span>user name</span> Changed their cov
              </p>
              <div className="time">
                <span>1 min ago</span>
              </div>
            </div>
          </div>
          <div className="user">
            <div className="userInfo">
              <img src={login} alt="" />
              <p>
                <span>Jane Doe</span> Changed their co
              </p>
              <div className="time">
                <span>1 min ago</span>
              </div>
            </div>
          </div>
        </div>
        <div className="item">
          <span>Online Friends</span>
          <div className="user">
            <div className="userInfo">
              <img src={login} alt="" />
              <div className="online"/>
                <span>user name</span>
            </div>
          </div>
          <div className="user">
            <div className="userInfo">
              <img src={login} alt="" />
              <div className="online"/>
                <span>user name</span>
            </div>
          </div>
          <div className="user">
            <div className="userInfo">
              <img src={login} alt="" />
              <div className="online"/>
                <span>user name</span>
            </div>
          </div>
          <div className="user">
            <div className="userInfo">
              <img src={login} alt="" />
              <div className="online"/>
                <span>user name</span>
            </div>
          </div>
          <div className="user">
            <div className="userInfo">
              <img src={login} alt="" />
              <div className="online"/>
                <span>user name</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RightBar
