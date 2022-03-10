import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";

function Navbar() {
    const { loggedIn, user, logoutUser } = useContext(AuthContext);
    return (
      <nav>
        <Link to="/"> Homepage</Link>
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
      </nav>
    );
}

export default Navbar