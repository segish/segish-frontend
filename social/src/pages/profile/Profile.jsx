import { useContext, useState } from 'react'
import "./Profile.scss"
import PlaceIcon from '@mui/icons-material/Place';
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import PinterestIcon from '@mui/icons-material/Pinterest';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookTwoToneIcon from '@mui/icons-material/FacebookTwoTone';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import Posts from '../../components/posts/Posts'
import {useQuery,useQueryClient,useMutation} from '@tanstack/react-query'
import {makeRequest} from '../../axios'
import { useLocation } from 'react-router-dom';
import image from '../register/wp9549965.jpg'
import { AuthContext } from '../../context/authContext';
import Update from '../../components/update/Update';
const Profile = () => {
  const [openUpdate,setOpenUpdate] = useState(false)
  const {currentUser} = useContext(AuthContext); 

  const userid = useLocation().pathname.split("/")[2]
 
  const { isLoading, data } = useQuery(["profile"], () =>
    makeRequest.get("/users/"+userid).then((res) => {
      return res.data;
    })
  );

const queryClient = useQueryClient();

const mutation = useMutation(
  (following) => {
    if(following) return makeRequest.put("/users/"+userid+"/unfollow");
    return makeRequest.put("/users/"+userid+"/follow");
  },
  {
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries(["profile"]);
    },
  }
);

const handleFollow = ()=>{
    mutation.mutate(data?.followers.includes(currentUser._id))
}
  return (

    <div className='profile'>
      {isLoading?("loding..."):
      (<>
        <div className="images">
          <img src={data.coverpic?"/upload/"+data.coverpic:image} alt="" className="cover" />
          <img src={data.profilePic?"/upload/"+data.profilePic:"/upload/profile.png"} alt="" className="profilePic" />
        </div>
        <div className="profileContainer">
          <div className="uInfo">
            <div className="left">
              <a href="http://facebook.com">
                <FacebookTwoToneIcon fontSize='large'/>
              </a><a href="http://facebook.com">
                <InstagramIcon fontSize='large'/>
              </a><a href="http://facebook.com">
                <TwitterIcon fontSize='large'/>
              </a><a href="http://facebook.com">
                <LinkedInIcon fontSize='large'/>
              </a><a href="http://facebook.com">
                <PinterestIcon fontSize='large'/>
              </a>
            </div>
            <div className="center">
              <span>{data.name}</span>
              <div className="infoCont">
                <div className="item">
                  <PlaceIcon/>
                  <span>{data.city}</span>
                </div>
                <div className="item">
                  <LanguageOutlinedIcon/>
                  <span>{data.website}</span>
                </div>
              </div>
                {userid===currentUser._id ?(
                  <button onClick={()=>setOpenUpdate(true)}>update</button>
                  ): (
                  <button onClick={handleFollow}>
                    {data?.followers.includes(currentUser._id) 
                      ? "Following" 
                      : "follow"}
                  </button>
                )}
            </div>
            <div className="right">
              <EmailOutlinedIcon/>
              <MoreVertOutlinedIcon/>
            </div>
          </div>
          <Posts userid={userid}/>
        </div>
      </>)}
      {openUpdate && <Update setOpenUpdate={setOpenUpdate} user={data}/>}
    </div>
  )
}

export default Profile