import { Link } from 'react-router-dom';
import './Post.scss'
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import Comment from '../comment/Comment';
import moment from 'moment';
import { useContext, useState } from 'react';
import {useQuery,useQueryClient,useMutation} from '@tanstack/react-query'
import {makeRequest} from '../../axios'
import { AuthContext } from '../../context/authContext';

const Post = ({post,userid}) => {
    const [commentOpen,setCommentOpen] = useState(false)
    const [menueOpen,setMenueOpen] = useState(false)
    const {currentUser} = useContext(AuthContext); 
    
    const { isLoading, data } = useQuery(["likes",post._id], () =>
    makeRequest.get("/posts/"+post._id+"/likes").then((res) => {
      return res.data;
    })
    );
    //posach info
    const { isLoading:loaddd, data:posterData } = useQuery(["posts",post._id], () =>
    makeRequest.get("/users/"+post.userId).then((res) => {
      return res.data;
    })
    );

    const deleteMutation = useMutation(
      (postid) => {
        return makeRequest.delete("/posts/"+ postid);
      },
      {
        onSuccess: () => {
          // Invalidate and refetch
          queryClient.invalidateQueries(["posts"]);
        },
      }
    );
    

    const queryClient = useQueryClient();
    const mutation = useMutation(
      () => {
        return makeRequest.post("/posts/like/"+post._id);
      },
      
      {
        onSuccess: () => {
          queryClient.invalidateQueries(["likes"]);
        },
      }
    );

    const handleLike = ()=>{
        mutation.mutate()
    }

    const handleDelete = ()=>{
      deleteMutation.mutate(post._id)
    }
  return (
    <div className='post'>
      <div className="container">
        <div className="user">
          <div className="userInfo">
            <Link to={'../profile/'+post.userId} style={{textDecoration:"none",color:"inherit"}}>
                <img src={posterData?.profilePic?"/upload/"+posterData?.profilePic:"/upload/profile.png"} alt="" />
            </Link>
            <div className="details">
              <Link to={'../profile/'+post.userId} style={{textDecoration:"none",color:"inherit"}}>
                <span>{posterData?.name}</span>
              </Link>
              <span className='date'>{moment(post.createdAt).fromNow()}</span>
            </div>
          </div>
          {post.userId===currentUser._id?
          <><MoreHorizOutlinedIcon onClick={()=>setMenueOpen(!menueOpen)} style={{cursor:"pointer"}}/>
          {menueOpen && <button onClick={handleDelete}>delete</button>}</>:"" } 
        </div>
        <div className="content">
          <p>{post.desc}</p>
          <img src={userid==="undefined"?"./upload/"+post.img:"../../upload/"+post.img} alt="" />
        </div>
        <div className="info">
          <div className="item">
            {data?.includes(currentUser._id)? <FavoriteOutlinedIcon style={{color:"red"}} onClick={handleLike}/>
            :<FavoriteBorderOutlinedIcon onClick={handleLike}/>}
            {data?.length} likes
          </div>
          <div className="item" onClick={()=>setCommentOpen(!commentOpen)}>
            <ChatOutlinedIcon />
            {post?.comments.length} comments
          </div>
          <div className="item">
            <ShareOutlinedIcon/>
            share
          </div>
        </div>
        {commentOpen && <Comment postid={post._id}/>}
      </div>
    </div>
  )
}

export default Post



