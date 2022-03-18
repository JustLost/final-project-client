import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";
import "./Navbar.css"
import scrumImage from "../../images/scrumwa.png"

function Navbar() {
    const { loggedIn, user, logoutUser } = useContext(AuthContext);
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
              <Link  to="/signup"> Signup </Link>
              
              <Link to="/login"> Login </Link>
            </div>
            )}
          </div>
        </div>
      </nav>
    );
}

export default Navbar