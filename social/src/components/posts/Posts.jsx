import "./Posts.scss"
import Post from "../post/Post"
import {useQuery} from '@tanstack/react-query'
import {makeRequest} from '../../axios'

const Posts = ({userid}) => {
  const { isLoading, error, data } = useQuery(["posts"], () =>
  makeRequest.get("/posts?userid="+userid).then((res) => {
    return res.data;
  })
  );

  return (
    <div className="posts">
      {error 
        ? "some thing went wrong...." + error.message
        :isLoading ?
        "loading..."
        : data.map((post)=><Post post={post} userid={userid} key={post.key}/>)}
    </div>
  );
};

export default Posts
