import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import AddProjectForm from "../../Components/AddProjectForm/AddProjectForm";
import "./ProjectsPage.css"
//import { ThemeContext } from "../../context/theme.context";

function ProjectsPage() {
  const [projects, setProjects] = useState([]);

  //const { theme } = useContext(ThemeContext);

  const fetchProjects = async () => {
    try {
      const storedToken = localStorage.getItem("authToken");

      let response = await 
        axios.get(`${process.env.REACT_APP_API_URL}/projects`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      });
      setProjects(response.data);
      //console.log("responseeeeee:", response.data[0].users[0])
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div className={"ProjectsPage"}>
      
      <div>
        <h1>Projects list:</h1>      
        {projects.map((project) => {
          return (
            <div className="projects-box" key={project._id}>
              <Link to={`/projects/${project._id}`}>  
                <div>
                  <p>Name: </p>
                  <h4>{project.name}</h4>
                </div>              
                <div>
                  <p>Description:</p>
                  <h5>{project.description}</h5> 
                </div>
                               
              </Link>
              
              
            </div>
          );
        })}
      </div>

      <div>
        <AddProjectForm refreshProjects={fetchProjects} />
      </div>
      
    </div>
  );
}

export default ProjectsPage;