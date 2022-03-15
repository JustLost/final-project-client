import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

function ProjectDetailsPage() {
  
  const [project, setProject] = useState(null);
  const { projectId } = useParams();
  const storedToken = localStorage.getItem('authToken');
  
  const fetchProject = async () => {
    try {
      let response = await axios.get(`${process.env.REACT_APP_API_URL}/projects/${projectId}`, {headers: { Authorization: `Bearer ${storedToken}` }});
      setProject(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProject();
  }, []);

  return (
    <div>
      <h1>Project detail</h1>
      {project && (
        <>
          <h3>{project.name}</h3>
          <h4>Description:</h4>
          <p>{project.description}</p>          
          {/* <p>{project.sprints}</p> */}
          <h4>Sprint Duration:</h4>
          <p>{project.sprintDuration}</p>
          <h5>Created at: {project.createdAt}</h5>
          <h5>Last update: {project.updatedAt}</h5>
          <p>Users: {project.users}</p>
          
        </>
      )}
      {/* {project.tasks &&
        project.tasks.map((task) => (
          <li key={task._id}>
            <h3>{task.title}</h3>
            <h4>Description</h4>
            <p>{task.description}</p>
          </li>
        ))} */}

      <div>
        {project && <button><Link to={`/projects/edit/${project._id}`}>Edit Project</Link></button>}
        {project && <button><Link to={`/new/sprint/${project._id}`}>Add Sprint</Link></button>}
      </div>
      
      <Link to="/projects"> Back to Project List</Link>
    </div>
  );
}

export default ProjectDetailsPage