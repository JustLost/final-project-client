import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function ProfilePage() {
    const [user, setUser] = useState('');

    const fetchUser = async () => {
        try {
            const storedToken = localStorage.getItem('authToken');

            let response = await axios.get(`${process.env.REACT_APP_API_URL}/user`, {
                headers: { Authorization: `Bearer ${storedToken}` },
            });
            console.log("dataaaaaaaa:", response.data);
            setUser(response.data);
        } catch (error) {
            console.log(error)
        }
    };
    useEffect(() => {
        fetchUser();
      }, []);

  return (
    <div>
        <h1>Profile Page</h1>
        {user && (
            <div>
                <h2>Hello, {user.username}</h2>
            </div>
        )}
    </div>
  )
}

export default ProfilePage