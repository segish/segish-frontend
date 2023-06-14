import React from 'react'
import Stories from '../../components/stories/Stories';
import Posts from '../../components/posts/Posts';
import "./Home.scss"
import Share from "../../components/share/Share"


const Home = () => {
  return (
    <div className='Home'>
      <Stories/>
      <Share/>
      <Posts/>
    </div>
  )
}

export default Home
