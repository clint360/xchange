import React, { useState, useRef, useContext } from 'react'
import LandingButton from './LandingButton';
import './SignUp.css';
import { Link } from 'react-router-dom';
import { MainContext } from '../Hooks/Context';



function SignUp({close}) {
  const nameInput = useRef(null);
  const {setUserName} = useContext(MainContext);
  const setUserNameF = () => {
    setUserName(nameInput.current.value)
  }
  const [ nameche, setNameChe ] = useState('');


  return (
    <div className='thewindow'>
       <div className='closebutton' onClick={()=>{close()}}><i class="fa-solid fa-x"></i></div>
       <div className='inputs'>
        <h2>BEGIN YOUR JOURNEY WITH US</h2>
      <form><div className='inputurname'><>Input your name: </><input type="text" required='true' maxLength={8} ref={nameInput} onChange={()=>{setNameChe(nameInput.current.value)}}/></div>
{ (nameche === '') ?
  <LandingButton text="GO" background="#0378cd" color="#fff" onclick={()=>{setUserNameF();}}/>
  : 
  <Link to="/app"><LandingButton text="GO" background="#0378cd" color="#fff" onclick={()=>{setUserNameF()}}/></Link>
  }
   </form>  
       </div>
    </div>
  )
}

export default SignUp
