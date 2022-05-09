import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";
import axios from "axios";
import "./LoginModal.css"

function LoginModal(props) {
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

    if (!props.show) {
        return null
    }

    return (
        <div className="modal" onClick={props.onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <h3 className="modal-title">Login</h3>
                </div>
                <div className="modal-body log-modal">
                <form onSubmit={handleSubmit}>
                    <div className="log-modal">
                        <label htmlFor="username">Username:</label>
                        <input type="text" name="username" value={username} onChange={handleUsername} />
                    </div>
                    <div className="log-modal">
                        <label htmlFor="password">Password:</label>
                        <input type="password" name="password" value={password} onChange={handlePassword} />
                    </div>
                    <button className="log-button" type="submit"> Login</button>

                    <p className="log-p">You don't have an account yet? <a href="/signup">Create one here.</a></p>
                </form>
                </div>
                <div className="modal-footer">
                    <button onClick={props.onClose} className="c-button">Cancel</button>
                </div>
            </div>
        </div>
    )
}

export default LoginModal