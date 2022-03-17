import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router } from "react-router-dom";
//import { ThemeProviderWrapper } from "./context/theme.context";
import { AuthProviderWrapper } from "./context/auth.context";
import {HTML5Backend} from "react-dnd-html5-backend"
import {DndProvider} from "react-dnd"

ReactDOM.render(
  <React.StrictMode>
    <AuthProviderWrapper>
      <DndProvider backend={HTML5Backend}>
      {/* <ThemeProviderWrapper> */}
        <Router>
            <App />
        </Router>
      {/* </ThemeProviderWrapper> */}
      </DndProvider>
    </AuthProviderWrapper>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
