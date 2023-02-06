import React, { useState } from 'react';
import {AnimatedOnScroll} from "react-animated-css-onscroll";
import './LandingPage.css';
import Navbar from './Navbar/Navbar';
import girl from '../Assets/girl.svg'
import LandingButton from '../Components/LandingButton';
import Footer from '../Components/Footer';
import dashboard from '../Assets/dashboard.png';
import ccw from '../Assets/dollar bag.png';
import cart from '../Assets/cart.png';
import chat from '../Assets/phone.png';
import SignUp from '../Components/SignUp';


function LandingPage() {
  const [blurred, setBlurred] = useState("blur(0px)")
  const [modalDisplay, setModalDisplay] = useState("none")
   
  const removeBlur = () => {setBlurred("blur(0px)")}
  const addBlur = () => {setBlurred("blur(5px)")}
  
  const openModal = () => {
     setModalDisplay("initial")
  }

  const closeModal = () => {
    setModalDisplay("none")
 }
 
  const pageWidth = '1120px';

  const mainst = {
    filter: blurred,
  }

  const innerMainst = {
    width: pageWidth
  }
   
  const winstyle = {
    display: modalDisplay
  }
 
  const scrollTo = (sectionname) => {
    const element = document.querySelector(sectionname);
      element.scrollIntoView({ behavior: 'smooth' });
    }

  return (
    <>
    <div style={winstyle}><SignUp close={()=>{removeBlur(); closeModal()}} /></div>
    <div id='mainmain' style={mainst}>
    <div id='main' style={innerMainst}>
      <div className='nav na' id='nav'><Navbar width={pageWidth}/></div>
      <section id='welcome'>
        <div className='description'>
          <h1>The Leading platform for InterTrading Currency & Updates</h1>
          <p>Xchange offers you a platform to stay in the know about current currency exchange rates</p>
          <br />
          <div className='buttonsections'>
            <LandingButton text="How it works" background="#0378cd" color="white" onclick={()=>{scrollTo('#howitworks')}} />
            <LandingButton text="Get Started" background="transparent" color="#0378cd" onclick={() => {addBlur(); openModal()}}/>
          </div>
        </div>
        <div className='girlpicture'>
          <img src={girl} alt="A girl"></img>
        </div>
      </section>
      <AnimatedOnScroll animationIn="bounceInUp" animationOut="none"> 
      <section id='features'>
        <div className='card bluecard'>
          <div className='innercard'>
            <h3>Gives You Control</h3>
          </div>
          <p>Gives you full control over your funds</p>
        </div>
        <div className='card whitecard'>
          <div className='innercard'>
            <h3>Seamless</h3>
          </div>
          <p>Navigate with ease, Built in a seamless manner</p>
        </div>
        <div className='card bluecard'>
          <div className='innercard'>
            <h3>All Currencies</h3>
          </div>
          <p>Wide range of available exchange Currencies</p>
        </div>
      </section>
      </AnimatedOnScroll>
      <section id='facts'>
        <div className='fact'>
          <img src={dashboard} alt="" className='dash' />
          <div>Friendly User Dashboard</div>
        </div>
        <div className='fact'>
          <img src={ccw} alt="" />
          <div>Custom Currency Wallet</div>
        </div>
        <div className='fact'>
          <img src={cart} alt="" />
          <div>Market Place</div>
        </div>
        <div className='fact'>
          <img src={chat} alt="" />
          <div>24/7 User Support</div>
        </div>
      </section>
      <section id='howitworks'> 
        <h1>How It Works</h1>
        <p>This is a currency exchange app that can exchange between XAF, Dollars, and Euros.
          This app can handle different currencies (USD, EUR, XAF) and exchange them with each other.
          E.g. John Doe's wallet (Default currency = USD)
          USD balance: 100 USD
          EUR balance: 500 EUR
          XAF balance: 10000 XAF
          Totalized value in USD = 736.667 USD
          Users will be able to exchange from one currency to the other one. Hence, John can decide to exchange his 100 USD to his Euro account. After the conversion, he will end up having: Considering 1 EUR = 1.24 USD
          USD balance: 0 USD
          EUR balance: 580.42 EUR
          XAF balance: 10000
          CHF Totalised value in USD = 736.38 USD</p>
      </section>
      <div className="begin"><LandingButton text="Begin Your Journey With us" background="#0378cd" color="white" onclick={() => {addBlur(); openModal()}} /></div>
      <Footer />
    </div>
    </div>
    </>
  )
}

export default LandingPage
