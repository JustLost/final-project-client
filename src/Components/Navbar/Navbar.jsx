import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";
import "./Navbar.css"

function Navbar() {
    const { loggedIn, user, logoutUser } = useContext(AuthContext);
    return (
      <nav>
        <div className="nav">
          <div className="home">
            <Link to="/"> Homepage</Link>
          </div>

          <div className="nav-left">
            {loggedIn && (
            <>
              <Link to="/projects"> Projects</Link>
              {user.username}
              {/* photo */}
              <button onClick={logoutUser}>Logout</button>
            </>
            )}
          
            {!loggedIn && (
            <>
              <Link to="/signup"> Signup</Link>
              <Link to="/login"> Login</Link>
            </>
            )}
          </div>
      </div>
        
        
      </nav>
    );
}

export default Navbar