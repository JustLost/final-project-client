import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css"
import gitImage from "../../images/gith.png"
import linkImage from "../../images/lkin.png"
import scrumWhite from "../../images/scrumWhite.png"

function Footer() {
  return (
    <div className="footer">
      <div>
        <h2>ritaCunha®</h2>
      </div>
      <div >
        <a target="_blank" rel="noreferrer" href="https://github.com/JustLost"><img className="footer-images" src={gitImage} alt="github logo" /></a>
        <a target="_blank" rel="noreferrer" href="https://www.linkedin.com/in/a-rita-cunha"><img className="footer-images" src={linkImage} alt="linkdin logo" /></a>
       
      </div>
      
    </div>
  )
}

export default Footer