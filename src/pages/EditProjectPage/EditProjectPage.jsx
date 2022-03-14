import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function EditProjectPage() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [sprints, setSprints] = useState('');
  const [sprintDuration, setSprintDuration] = useState('');
  const [timestamps, setTimestamps] = useState('');

  const { projectId } = useParams();

  const navigate = useNavigate();
  const storedToken = localStorage.getItem('authToken');

  const deleteProject = () => {
    axios
      .delete(`${process.env.REACT_APP_API_URL}/projects/${projectId}`, {headers: { Authorization: `Bearer ${storedToken}` },
    })
      .then(() => navigate('/projects'));
  };

  const fetchProject = async () => {
    try {
      let response = await axios.get(`${process.env.REACT_APP_API_URL}/projects/${projectId}`);
      let { name, description, sprints, sprintDuration, timestamps } = response.data;
      setName(name);
      setDescription(description);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProject();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const body = { name, description };

    axios
      .put(`${process.env.REACT_APP_API_URL}/projects/${projectId}`, body, {headers: { Authorization: `Bearer ${storedToken}` }})
      .then((response) => {
        setName('');
        setDescription('');
        navigate(`/projects/${projectId}`);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <h3>Edit Project </h3>
      <form onSubmit={handleSubmit}>

        <div>
          <label htmlFor="name">Name</label>
          <input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        
        {/* <div>
          <label htmlFor="sprints">Sprints</label>
          <input type="text" name="sprints" value={sprints} onChange={(e) => setSprints(e.target.value)} />
        </div> */}
        
        <div>
          <label htmlFor="description">Description</label>
          <input type="text" name="description" value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>
        
        <div>
          <label htmlFor="sprintDuration">Sprint Duration</label>
          <input type="text" name="sprintDuration" value={sprintDuration} onChange={(e) => setSprintDuration(e.target.value)} />
        </div>
        
        <div>
          <label htmlFor="timestamps">Created at</label>
          <input type="text" name="timestamps" value={timestamps} onChange={(e) => setTimestamps(e.target.value)} />
        </div>      
        
        <button type="submit">Edit Project</button>
      </form>
      <button onClick={deleteProject}> Delete Project</button>
    </div>
  );
}

export default EditProjectPage