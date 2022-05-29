import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";
import "./Navbar.css"
import scrumImage from "../../images/scrumwa.png"
import SignupModal from "../SignupModal/SignupModal";
import LoginModal from "../LoginModal/LoginModal";

function Navbar() {
    const { loggedIn, user, logoutUser } = useContext(AuthContext);
    const [ show, setShow ] = useState(false)
    const [ show1, setShow1] = useState(false)

    const navigate = useNavigate()

    const logoutRedirect = () => {
      logoutUser()
      setShow(false)
      setShow1(false)
      navigate("/")
    }
    const toggle = () => {
      if (show) { 
        setShow(false)
        setShow1(true) }
      else if (show1) {
        setShow1(false)
        setShow(true)
      }
    }
    
    return (
      <nav>
        <div className="nav">
          <div className="home">
            <Link to="/"><img src={scrumImage} alt="white-logo" /></Link>
          </div>

          <div className="nav-left">

            {!loggedIn && (
            <div className="signIn">
              <button className="sign-nav-btn" onClick={() => setShow(true)}>Signup</button>
              <SignupModal toggle={toggle} onClose={() => setShow(false)} show={show} />

              <button className="log-nav-btn" onClick={() => setShow1(true)}>Login</button>
              <LoginModal toggle={toggle} onClose={() => setShow1(false)} show={show1} />              
            </div>
            )}
            {loggedIn && (
              
            <div className="nav-right">                            
              <p>Welcome, {user.username}</p>
              <Link className="links" to="/projects"> Projects </Link>
              <button onClick={logoutRedirect} className="log-nav-btn">Logout</button>
            </div>
            )}
          
            
          </div>
        </div>
      </nav>
    );
}

export default Navbar