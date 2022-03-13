import React from "react";
import axios from "axios";
import { useState } from 'react'

import { GoogleLogin } from "react-google-login";

function HomePage() {

  const responseGoogle = response => {
    console.log(response)
    const { code } = response
    const storedToken = localStorage.getItem('authToken');
    axios
      .post("/create-tokens", { code }, {headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then(response => {
        console.log(response.data)
        setSignedIn(true)
      })
      .catch(error => console.log(error.message))
  };

  const responseError = error => {
    console.log(error)
  }

  const storedToken = localStorage.getItem('authToken');

  const handleSubmit = (e) => {
    e.preventDefault()
    //console.log(summary, description, location, startDateTime, endDateTime)
    axios
      .post("/create-event", {
        summary,
        description,
        location,
        startDateTime,
        endDateTime,
      }, {headers: { Authorization: `Bearer ${storedToken}` }})
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => console.log(error.message));
  }

  const [summary, setSummary] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [startDateTime, setStartDateTime] = useState("");
  const [endDateTime, setEndDateTime] = useState("");
  const [signedIn, setSignedIn] = useState(false);

  return (
    <div>
      <h1>Homepage</h1>
      <div>
        {
          !signedIn ? (<div>
        <GoogleLogin
          clientId={process.env.REACT_APP_CLIENT_ID}
          buttonText="Sign in & Authorize Calendar"
          onSuccess={responseGoogle}
          onFailure={responseError}
          cookiePolicy={"single_host_origin"}
          responseType="code"
          accessType="offline"
          scope="openid email profile https://www.googleapis.com/auth/calendar"
        />
      </div>) : (<div>
        <form onSubmit={handleSubmit} >
          <label htmlFor="summary">Summary</label>
          <br />
          <input type="text" id="summary" value={summary} onChange={e => setSummary(e.target.value)} />

          <label htmlFor="description">Description</label>
          <br />
          <input type="textarea" id="description" value={description} onChange={e => setDescription(e.target.value)} />

          <label htmlFor="location">Location</label>
          <br />
          <input type="text" id="summary" value={location} onChange={e => setLocation(e.target.value)} />

          <label htmlFor="startDateTime">Start Date Time</label>
          <br />
          <input type="datetime-local" id="startDateTime" value={startDateTime} onChange={e => setStartDateTime(e.target.value)} />

          <label htmlFor="endDateTime">End Date Time</label>
          <br />
          <input type="datetime-local" id="endDateTime" value={endDateTime} onChange={e => setEndDateTime(e.target.value)} />
          <br />
          <button type="submit">Create Event</button>
        </form>
      </div>)
        }
      </div>
      
      
    </div>
  );
}

export default HomePage;
