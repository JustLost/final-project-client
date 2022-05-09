import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";
import "./Navbar.css"
import scrumImage from "../../images/scrumwa.png"
import SignupModal from "../SignupModal/SignupModal";
import LoginModal from "../LoginModal/LoginModal";

function Navbar() {
    const { loggedIn, user, logoutUser } = useContext(AuthContext);
    const [ show, setShow ] = useState(false)
    const [ show1, setShow1] = useState(false)
    return (
      <nav>
        <div className="nav">
          <div className="home">
            <Link to="/"><img src={scrumImage} alt="" /></Link>
          </div>

          <div className="nav-left">
            {loggedIn && (
              
            <div className="nav-right">
                            
              <p>Welcome, {user.username}</p>
              <Link className="links" to="/projects"> Projects </Link>
              <button onClick={logoutUser}>Logout</button>
            </div>
            )}
          
            {!loggedIn && (
            <div className="signIn">
              <button type="button" onClick={() => setShow(true)} >Signup</button>
              <SignupModal onClose={() => setShow(false)} show={show} />

              <button type="button" onClick={() => setShow1(true)} >Login</button>
              <LoginModal onClose={() => setShow1(false)} show={show1} />
              {/* <Link  to="/signup"> Signup </Link> */}
              
              {/* <Link to="/login"> Login </Link> */}
            </div>
            )}
          </div>
        </div>
      </nav>
    );
}

export default Navbar