import React from 'react'
import mylogo from '../../Assets/image.svg'
import LandingButton from '../../Components/LandingButton'
import './UserNav.css';
import { Link } from 'react-router-dom';



function UserNav({username}) {
  const navStyle = {
    width: '1120px'
  }
  const scrollTo = (sectionname) => {
    const element = document.querySelector(sectionname);
      element.scrollIntoView({ behavior: 'smooth' });
    }

  return (
    <>
    <div id="mainnav" style={navStyle}>
       <div className='logodiv'>
      <img src={mylogo} alt="my logo" title='Account' />
      </div>
      <div className='pageslists'>
        <ul type="none">
           <li onClick={()=>{scrollTo('#main')}}>Home</li> 
           <li onClick={()=>{scrollTo('#market')}}>Market</li> 
           <li onClick={()=>{scrollTo('#mainfooter')}}>Contact</li> 
        </ul>
      </div>
      <div className='accountinfo'>
     <img src='https://lyricstranslate.com/files/styles/artist/public/wizkid.png' alt=''/>
     <div className='username'><h2>{username}</h2></div>
   <Link to='/'><LandingButton text="SIGN OUT" background="transparent" color="#0378cd"/></Link>  
      </div>
      </div>
    </>
  )
}

export default UserNav
