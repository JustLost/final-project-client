import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import AddProjectForm from "../../Components/AddProjectForm/AddProjectForm";
//import { ThemeContext } from '../../context/theme.context';

function ProjectsPage() {
  const [projects, setProjects] = useState([]);

  //const { theme } = useContext(ThemeContext);

  const fetchProjects = async () => {
    try {
      const storedToken = localStorage.getItem('authToken');

      let response = await axios.get(`${process.env.REACT_APP_API_URL}/projects`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      });
      setProjects(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div className={"ProjectsPage "}>
      <AddProjectForm refreshProjects={fetchProjects} />
      {projects.map((project) => {
        return (
          <div key={project._id}>
            <Link to={`/projects/${project._id}`}>
              <h3>{project.name}</h3>
            </Link>
          </div>
        );
      })}
    </div>
  );
}

export default ProjectsPage;