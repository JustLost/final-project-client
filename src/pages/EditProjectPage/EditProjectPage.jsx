import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import "./EditProjectPage.css"

function EditProjectPage() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [sprints, setSprints] = useState('');
  const [sprintDuration, setSprintDuration] = useState('');
  const [timestamps, setTimestamps] = useState('');
  const [users, setUsers] = useState([]);
  const [projectUsers, setProjectUsers] = useState([])
  // const [username, setUsername] = useState;
  const [email, setEmail] = useState('');

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
          let { name, description, sprints, sprintDuration, timestamps, users: projectUsers } = response.data;
          console.log(response.data)
          setName(name);
          setDescription(description);
          setSprints(sprints);
          setSprintDuration(sprintDuration);
          setTimestamps(timestamps);
          setProjectUsers(projectUsers);
          //console.log(projectUsers)
      } catch (error) {
          console.log(error);
      }
  };
 
  const fetchUsers = async () => {
    try {
        let response = await axios.get(`${process.env.REACT_APP_API_URL}/users`, {headers: { Authorization: `Bearer ${storedToken}` }});
        console.log("userss:", response.data)
        setUsers(response.data)
    } catch (error) {
        console.log(error);
    }
};

  useEffect(() => {
    fetchProject();
    fetchUsers();

  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const body = { name, description, sprints, sprintDuration, timestamps, users, email };
    console.log(email)
    axios
      .put(`${process.env.REACT_APP_API_URL}/projects/${projectId}`, body, {headers: { Authorization: `Bearer ${storedToken}` }})
      .then((response) => {
        setName('');
        setDescription('');
        setSprints([]);
        setSprintDuration(0);
        setTimestamps(true);
        setUsers('');
        setEmail(null)
        navigate(`/projects/${projectId}`);
      })
      .catch((err) => console.log(err));
  };

  return (
    
    <div className='edit-project'>
      <h1>Edit Project </h1>
      <form onSubmit={handleSubmit}>
        <div className='proj-inputs'>
            <div >
              <label htmlFor="name">Name:</label>
              <br />
              <input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
          
          {/* <div>
            <label htmlFor="sprints">Sprints</label>
            <input type="text" name="sprints" value={sprints} onChange={(e) => setSprints(e.target.value)} />
          </div> */}
          
          <div>
            <label htmlFor="description">Description:</label>
            <br />
            <input type="text" name="description" value={description} onChange={(e) => setDescription(e.target.value)} />
          </div>
          
          <div>
            <label htmlFor="sprintDuration">Sprint Duration:</label>
            <br />
            <input type="text" name="sprintDuration" value={sprintDuration} onChange={(e) => setSprintDuration(e.target.value)} />
          </div>
          
          {/* <div>
            <label htmlFor="timestamps">Created at</label>
            <br />
            <input type="text" name="timestamps" value={timestamps} onChange={(e) => setTimestamps(e.target.value)} />
          </div> */}

          <div>
            <label htmlFor="projectUsers">Project users:</label>
            <ul>
            <p>{projectUsers && projectUsers.map((user) => {              
              return(
                <li>{`${user.username} as ${user.role}`}</li>
              )
            })}</p>
            </ul>
          </div>

          <div>
            <label htmlFor="username">Add Developers:</label>
            <br />
            <select name="email" onChange={(e) => setEmail(e.target.value)}>
            {users && users.map((user) => {
              if (projectUsers.some(u => u.username === user.username)){
                return("")
              }
              //console.log("hi", user.username)
              return (             
              <option value={user.email}>{user.username}</option>
              
              )
            })}
            </select>
            <div>
              <button type="submit">Save</button>
            </div>
                      
            {/* <input type="text" name="users" value={users} onChange={(e) => setUsers(e.target.value)} /> */}
          </div> 
        </div>
              
      </form>
      <button className='del' onClick={deleteProject}> Delete Project</button>
    </div>
  );
}

export default EditProjectPage;