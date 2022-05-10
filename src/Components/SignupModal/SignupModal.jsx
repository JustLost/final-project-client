import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./SignupModa.css"

function SignupModal(props) {
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

    const closeOnEscapeKeyDown = (e) => {
        if((e.charCode || e.keyCode) === 27){
          props.onClose()
        }
      }
    
      useEffect(() => {
        document.body.addEventListener("keydown", closeOnEscapeKeyDown)
        return function cleanup() {
          document.body.removeEventListener("keydown", closeOnEscapeKeyDown)
        }
      }, [])

    if (!props.show) {
        return null
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const body = { username, password, email, imageUrl, role };

        axios
        .post(`${process.env.REACT_APP_API_URL}/auth/signup`, body)
        .then((response) => {
            props.onClose()
        })
        .catch((err) => console.log(err));
    };
    return (
        <div className="modal" onClick={props.onClose}>
                <div className="modal-content" onClick={e => e.stopPropagation()}>
                    <div className="modal-header">
                        <h3 className="modal-title">Signup</h3>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={handleSubmit}>
                            <div className="sign-modal">
                                <label htmlFor="username">Username</label>
                                <input type="text" name="username" value={username} onChange={handleUsername} />
                            </div>
                            <div className="sign-modal">
                                <label htmlFor="email">Email</label>
                                <input type="email" name="email" value={email} onChange={handleEmail} />
                            </div>        
                            <div className="sign-modal">
                                <label htmlFor="password">Password</label>
                                <input type="password" name="password" value={password} onChange={handlePassword} />
                            </div>
                            {/* <div>
                                <label htmlFor="imageUrl">Profile Pic</label>
                                <input type="file" name="imageUrl" value={imageUrl} onChange={handleImageUrl} />
                            </div> */}
                            <div className="radio-modal">
                                <div>
                                    <input type="radio" name="radio" value="Scrum Master" onChange={handleRole} />
                                    <label htmlFor="role">Scrum Master</label>
                                </div>
                                <div>
                                    <input type="radio" name="radio" value="Project Owner" onChange={handleRole} />
                                    <label htmlFor="role">Project Owner</label>
                                </div>
                                <div>
                                    <input type="radio" name="radio" value="Developer" onChange={handleRole} />
                                    <label htmlFor="role">Developer</label>
                                </div>                                
                            </div>
                            
                            <button className="log-nav-btn log-button" type="submit"> Create Account </button>

                            <p className="log-p">
                                Already have an account? <a href="/login">Go to login.</a>
                            </p>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button onClick={props.onClose} className="c-button">Cancel</button>
                    </div>
                </div>
            </div>
    )
}

export default SignupModal