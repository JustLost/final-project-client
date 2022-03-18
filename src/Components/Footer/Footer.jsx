import React from 'react';
import { Link } from 'react-router-dom';
import "./Footer.css"
import gitImage from "../../images/gith.png"
import linkImage from "../../images/lkin.png"
import scrumWhite from "../../images/scrumWhite.png"

function Footer() {
  return (
    <div className='footer'>
      <div>
       <h2>ritaCunha®</h2>
      </div>
      <div >
      <Link className="footer-images" target="_blank" to={{pathname:"https://github.com/JustLost"}}> <img className='footer-images' src={gitImage} alt="github logo" /></Link>
      <Link className="footer-images" target="_blank" to={{pathname:"https://www.linkedin.com/in/a-rita-cunha/"}}><img className='footer-images' src={linkImage} alt="linkdin logo" /></Link>  
      
      </div>
      
    </div>
  )
}

export default Footer