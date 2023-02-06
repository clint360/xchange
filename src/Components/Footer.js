import React from 'react';
import './Footer.css';
import facebook from '../Assets/facebook.png'
import instagram from '../Assets/instagram.png'
import youtube from '../Assets/youtube.png'


function Footer() {
    const space = "   "
  return (
    <div id='mainfooter'>
      Contact us:
      <br />
      <br />
      <div className='contactlogos'> 
      <img src={facebook} alt="" />
      <img src={instagram} alt="" />
      <img src={youtube} alt="" />
      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/1200px-WhatsApp.svg.png" alt="" />
      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Gmail_icon_%282020%29.svg/2560px-Gmail_icon_%282020%29.svg.png" alt="" />
      </div>
      <br />
      <div>
        Built by <strong>@clint360</strong>
        <br />
        <i class="fa-brands fa-github"></i> {space}
        <i class="fa-brands fa-instagram"></i> {space}
        <i class="fa-brands fa-linkedin"></i> {space}   
        <i class="fa-brands fa-facebook"></i> {space}
      </div>
    </div>
  )
}

export default Footer
