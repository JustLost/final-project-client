import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";
import "./Navbar.css"
import scrumImage from "../../images/scrumWhite.png"

function Navbar() {
    const { loggedIn, user, logoutUser } = useContext(AuthContext);
    return (
      <nav>
        <div className="nav">
          <div className="home">
            <Link to="/"><img src={scrumImage} alt="" />  Agilize </Link>
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
            <>
              <Link to="/signup"> Signup </Link>
              <Link to="/login"> Login </Link>
            </>
            )}
          </div>
        </div>
      </nav>
    );
}

export default Navbar