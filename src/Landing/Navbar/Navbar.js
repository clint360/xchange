import React from 'react';
import mylogo from '../../Assets/image.svg';
import './Navbar.css';
import LandingButton from '../../Components/LandingButton';

function Navbar({width}) {
  const scrollTo = (sectionname) => {
    const element = document.querySelector(sectionname);
      element.scrollIntoView({ behavior: 'smooth' });
    }
    
    const navwidth = {
      width: width,
    }

  return (
    <>
    <div id="mainnav" style={navwidth}>
       <div className='logodiv'>
      <img src={mylogo} draggable='false' alt="my logo" />
      </div>
      <div className='pageslists'>
        <ul type="none">
           <li onClick={()=>{scrollTo('#main')}}>Home</li> 
           <li onClick={()=>{scrollTo('#howitworks')}}>How?</li> 
           <li onClick={()=>{scrollTo('#features')}}>Features</li> 
        </ul>
      </div>
      <div className='login_and_signup'>
      <LandingButton text="SIGN IN" background="#0378cd" color="white"/>
      <LandingButton text="SIGN UP" background="transparent" color="#0378cd"/>
      </div>
      </div>
    </>
  )
}

export default Navbar
