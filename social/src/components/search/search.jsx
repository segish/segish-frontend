import { Link } from 'react-router-dom';
import './search.scss'
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';

const Search1 = ({setOpenSerach,searchdata}) => {

  return (
    <div className='searcha'>
        <div className="results">
        {searchdata?.map(search=>(
            <div className="item">
              <Link to={'profile/'+search?._id} onClick={() => {window.location.href="/profile/"+search?._id}} style={{textDecoration:"none",color:"inherit"}}>
                <span onClick={()=>setOpenSerach(false)}>{search.name}</span>
              </Link>
              <Link to={'profile/'+search?.id} onClick={() => {window.location.href="/profile/"+search?.id}}>
                <img onClick={()=>setOpenSerach(false)} 
                src={search.profilePic?"/upload/"+search.profilePic:"/upload/profile.png"}
                alt="" /> 
              </Link>
            </div>
        ))}
        </div>
        <div className="cancele">
            <CancelOutlinedIcon fontSize='large' onClick={()=>setOpenSerach(false)}/>
        </div>
    </div>
  )
}

export default Search1
