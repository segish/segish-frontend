import "./Comment.scss"
import { useContext, useState } from "react"
import {AuthContext} from "../../context/authContext"
import {useQuery, useMutation, useQueryClient} from '@tanstack/react-query'
import {makeRequest} from '../../axios'
import moment from "moment";

const Coment = ({postid}) => {
  const [desc,setDesc] = useState("")
  const {currentUser} = useContext(AuthContext)
    
  
  const { isLoading, error, data } = useQuery(["comments"], () =>
  makeRequest.get("/posts/"+postid+"/comment").then((res) => {
    return res.data;
  })
  );
  const queryClient = useQueryClient();

  const mutation = useMutation(
    (desc) => {
      return makeRequest.put("/posts/"+postid+"/comment", desc);
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["comments"]);
      },
    }
  );

  const handleClick = async (e) => {
    e.preventDefault();
    mutation.mutate({desc});
    setDesc("");
  };
  return (
    <div className="comments">
      <div className="write">
        <img src={currentUser.profilePic?"/upload/"+currentUser.profilePic:"/upload/profile.png"} alt="" />
        <input type="text" 
        placeholder="write a comment"
        value={desc}
        onChange={(e) =>setDesc (e.target.value)}
        />
        <button onClick={handleClick}>send</button>
      </div>
      {error ? "somthing went wrong"
      :isLoading? "loading..."
      : data.map((comment)=>(
        <div className="comment">
            <img src={comment.profilePic?"/upload/"+comment.profilePic:"/upload/profile.png"} alt="" />
            <div className="info">
                <span>{comment.name}</span>
                <p>{comment.desc}</p>
            </div>
            <span className="date">{moment(comment.createdat).fromNow()}</span>
        </div>
      ))}
    </div>
  )
}

export default Coment