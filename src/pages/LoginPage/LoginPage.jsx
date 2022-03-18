import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../context/auth.context";
import "./LoginPage.css"


function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { storeToken, authenticateUser } = useContext(AuthContext);

  const navigate = useNavigate();

  const handlePassword = (e) => setPassword(e.target.value);
  const handleUsername = (e) => setUsername(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();

    const body = { username, password };

    axios
      .post(`${process.env.REACT_APP_API_URL}/auth/login`, body)
      .then((response) => {
        console.log("res.data", response.data);
        storeToken(response.data.authToken);
        authenticateUser();
        navigate("/");
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="log-box">
      <div className="box-log">
        <h1>Login</h1>
          <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username</label>
          <input type="text" name="username" value={username} onChange={handleUsername} />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="password" name="password" value={password} onChange={handlePassword} />
        </div>
        <button type="submit"> Login</button>

        <p>You don't have an account yet? <a href="/signup">Create one here.</a></p>
      </form>
      </div>
      
    </div>
  );
}

export default LoginPage;
