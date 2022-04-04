import React from "react";
import axios from "axios";
import { useState } from "react"
import logo from "../../images/LOGO.png"
import { StyledEngineProvider } from "@mui/material/styles";
import Toggle from "../../Components/Toggle/Toggle"
import "./HomePage.css"

function HomePage() {

  return (
    <div className="home-box">
      <div>
        <div>
          <img src={logo} alt="agilize logo" />
        </div>
        <div className="boxes">
          <div className="h2-box">
            <h1>Agile processes promote development. The sponsors, developers, and users should be able to maintain a constant pace indefinitely.</h1>
          </div>
          <div className="togle-box">
            <StyledEngineProvider injectFirst>
              <Toggle />
            </StyledEngineProvider>
          </div>
        </div>
        
      </div>
    </div>
    
  );
}

export default HomePage;
