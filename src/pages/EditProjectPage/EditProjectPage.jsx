import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function EditProjectPage() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [sprints, setSprints] = useState('');
  const [sprintDuration, setSprintDuration] = useState('');
  const [timestamps, setTimestamps] = useState('');
  const [users, setUsers] = useState('');

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

          let response = await axios.get(`${process.env.REACT_APP_API_URL}/projects/${projectId}`, {headers: { Authorization: `Bearer ${storedToken}` }});
          let { name, description, sprints, sprintDuration, timestamps, users } = response.data;
          console.log(response.data)
          setName(name);
          setDescription(description);
          setSprints(sprints);
          setSprintDuration(sprintDuration);
          setTimestamps(timestamps);
          setUsers(users[0].email);
      } catch (error) {
          console.log(error);
      }
  };

  useEffect(() => {
    fetchProject();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const body = { name, description, sprints, sprintDuration, timestamps, users };

    axios
      .put(`${process.env.REACT_APP_API_URL}/projects/${projectId}`, body, {headers: { Authorization: `Bearer ${storedToken}` }})
      .then((response) => {
        setName('');
        setDescription('');
        setSprints([]);
        setSprintDuration(0);
        setTimestamps(true);
        setUsers('');
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
          <br />
          <input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        
        {/* <div>
          <label htmlFor="sprints">Sprints</label>
          <input type="text" name="sprints" value={sprints} onChange={(e) => setSprints(e.target.value)} />
        </div> */}
        
        <div>
          <label htmlFor="description">Description</label>
          <br />
          <input type="text" name="description" value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>
        
        <div>
          <label htmlFor="sprintDuration">Sprint Duration</label>
          <br />
          <input type="text" name="sprintDuration" value={sprintDuration} onChange={(e) => setSprintDuration(e.target.value)} />
        </div>
        
        {/* <div>
          <label htmlFor="timestamps">Created at</label>
          <br />
          <input type="text" name="timestamps" value={timestamps} onChange={(e) => setTimestamps(e.target.value)} />
        </div> */}

        <div>
          <label htmlFor="users">Add Developers</label>
          <br />
          <input type="text" name="users" value={users} onChange={(e) => setUsers(e.target.value)} />
        </div>       
        
        <button type="submit">Save</button>
      </form>
      <button onClick={deleteProject}> Delete Project</button>
    </div>
  );
}

export default EditProjectPage