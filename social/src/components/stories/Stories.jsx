import "./stories.scss"
import { AuthContext } from '../../context/authContext';
import { useContext } from "react";
import { makeRequest } from "../../axios";
import {  useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const Stories = () => {
    
    const { currentUser} = useContext(AuthContext);

  const queryClient = useQueryClient();

    const mutation = useMutation(
        (img) => {
          return makeRequest.post("/stories",img);
        },
        {
          onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries(["stories"]);
          },
        }
      );
  
    const { isLoading,err:eroor, data:storiedata } = useQuery(["stories"], () =>
        makeRequest.get("/stories").then((res) => {
            return res.data;
        })
    );
    const handleClick=()=>{
        mutation.mutate({img:data?.profilePic})
    }
    
    //I inserted this by my self If profile is updated

    const { data } = useQuery(["user"], () =>
        makeRequest.get("/users/" + currentUser.id).then((res) => {
            return res.data;
        })
    );

  return (
    <div className="stories"> 
      <div className="ssdd">
        <div className="story">
            <img src={data?.profilePic?"/upload/"+data?.profilePic:"/upload/profile.png"} alt=""/>
            <span>{data?.name}</span>
            <button onClick={handleClick}>+</button>
        </div>
        {isLoading?"loading":eroor?"somthing went wrong"
        :storiedata?.map(story=>(
          <div className="story" key={story.id}>
              <img src={"/upload/"+story.img} alt=""/>
              <span>{story.name===data?.name?"You":story.name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Stories
