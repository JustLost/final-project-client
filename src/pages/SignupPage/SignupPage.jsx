import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function SignupPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [role, setRole] = useState("");

  const navigate = useNavigate();

  const handlePassword = (e) => setPassword(e.target.value);
  const handleUsername = (e) => setUsername(e.target.value);
  const handleEmail = (e) => setEmail(e.target.value);
  const handleImageUrl = (e) => setImageUrl(e.target.value);
  const handleRole = (e) => setRole(e.target.value);

  console.log(role)

  const handleSubmit = (e) => {
    e.preventDefault();

    const body = { username, password, email, imageUrl, role };

    axios
      .post(`${process.env.REACT_APP_API_URL}/auth/signup`, body)
      .then((response) => {
        navigate("/login");
      })
      .catch((err) => console.log(err));
  };


  return (
    <div>
      <h1>Signup</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input type="email" name="email" value={email} onChange={handleEmail} />
        </div>
        <div>
          <label htmlFor="username">Username</label>
          <input type="text" name="username" value={username} onChange={handleUsername} />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="password" name="password" value={password} onChange={handlePassword} />
        </div>
        <div>
          <label htmlFor="imageUrl">Profile Pic</label>
          <input type="file" name="imageUrl" value={imageUrl} onChange={handleImageUrl} />
        </div>
        <div>
          <input type="radio" name="radio" value="Scrum Master" onChange={handleRole} />
          <label htmlFor="role">Scrum Master</label>

          <input type="radio" name="radio" value="Project Owner" onChange={handleRole} />
          <label htmlFor="role">Project Owner</label>

          <input type="radio" name="radio" value="Developer" onChange={handleRole} />
          <label htmlFor="role">Developer</label>
        </div>
        
        <button type="submit"> Create Account </button>

        <p>
          Already have an account? <a href="/login">Go to login.</a>
        </p>
      </form>
    </div>
  );
}



export default SignupPage;
