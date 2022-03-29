import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import AddSprintForm from '../../Components/AddSprintForm/AddSprintForm';
import "./ProjectDetailsPage.css"
import scrum from "../../images/scrum.png"

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

  

  return (
    <div> 
      <div className='detail-box'>
        <h1>{project && project.name} details:</h1>
        {project && (
          <>
            <p>Description:</p>
            <h4>{project.description}</h4>          
            {/* <p>{project.sprints}</p> */}
            <img src={scrum} alt="scrum" />
            <h3>Sprint Duration:</h3>
            <h4>{project.sprintDuration} weeks</h4>
            <h5>Created: {moment(project.createdAt).format('DD-MM-YYYY HH:MM A')}</h5>
            <h5>Last update: {moment(project.updatedAt).format('DD-MM-YYYY HH:MM A')}</h5>
            {/* <p>Users: {project.users[0].username}</p> */}
            {/* //TODO: map users bellow */}
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
        <br />
        <Link className='a' to="/projects"> Back to Project List</Link>
        <br />
        {project && <Link to={"/sprints"}><button className='btn-border'>Sprints</button></Link>}
        {project && <Link to={`/backlog/${project._id}`}><button className='btn-border'> Backlog </button></Link>}
            
      </div>
    </div>
  );
}

export default ProjectDetailsPage