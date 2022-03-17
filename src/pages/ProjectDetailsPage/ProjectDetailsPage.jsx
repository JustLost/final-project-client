import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import AddSprintForm from '../../Components/AddSprintForm/AddSprintForm';
import "./ProjectDetailsPage.css"

const moment = require('moment');

function ProjectDetailsPage() {
  
  const [project, setProject] = useState(null);
  const { projectId } = useParams();
  const storedToken = localStorage.getItem('authToken');

  const [show, setShow] = useState(false)
  
  const fetchProject = async () => {
    try {
      let response = await 
      axios
      .get(`${process.env.REACT_APP_API_URL}/projects/${projectId}`, {headers: { Authorization: `Bearer ${storedToken}` }});
      setProject(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProject();
  }, []);

  //TODO: map users bellow

  return (
    <div className='detail-box'>
      <h1>Project detail</h1>
      {project && (
        <>
          <h3>{project.name}</h3>
          <h4>Description:</h4>
          <p>{project.description}</p>          
          {/* <p>{project.sprints}</p> */}
          <h4>Sprint Duration:</h4>
          <p>{project.sprintDuration} weeks</p>
          <h5>Created: {moment(project.createdAt).format('YYYY-MM-DD HH:MM')}</h5>
          <h5>Last update: {moment(project.updatedAt).format('YYYY-MM-DD HH:MM')}</h5>
          <p>Users: {project.users[0].username}</p>
          {/* <p>backp:{project.backlog</p>           */}
        </>
      )}
      {/* {project.backlog &&
        project.backlog.map((task) => (
          <li key={task._id}>
            <h3>{task.title}</h3>
            <h4>Description</h4>
            <p>{task.description}</p>
          </li>
        ))} */}

      <div>
        {project && <Link to={`/projects/edit/${project._id}`}><button>Edit Project</button></Link>}

        <button onClick={() => setShow(true)}>Add Sprint </button>
        <AddSprintForm onClose={() => setShow(false)} show={show}/>
               
      </div>
      {project && <Link to={"/sprints"}><button>Sprints</button></Link>}
      {project && <Link to={`/backlog/${project._id}`}><button> Backlog </button></Link>}
      <br />
      <Link to="/projects"> Back to Project List</Link>
    </div>
  );
}

export default ProjectDetailsPage