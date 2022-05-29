import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./AddTaskModal.css"

function AddTaskModal(props) {
  const { projectId } = useParams();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [sprints, setSprints] = useState("");
  const [sprintDuration, setSprintDuration] = useState("");
  const [timestamps, setTimestamps] = useState("");
  const [users, setUsers] = useState([]);
  const [projectUsers, setProjectUsers] = useState([])
  const { user } = useContext(AuthContext);
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("");
  const [email, setEmail] = useState("");
  //const [creator, setCreator] = useState("");
  const [assignedTo, setAssinedTo] = useState("");
  const [tag, setTag] = useState("none");
  const [storyPoints, setStoryPoints] = useState(1)
  //const navigate = useNavigate();

  const storedToken = localStorage.getItem("authToken");

  //const handleTitle = (e) => setTitle(e.target.value);
  const handleStatus = (e) => setStatus(e.target.value);
  //const handleDescription = (e) => setDescription(e.target.value);
  //const handleCreator = (e) => setCreator(e.target.value);
  //const handleAssignedTo = (e) => setAssinedTo(e.target.value);

  const handleSubmit = (e) => {
    const creator = user;
    e.preventDefault();

    const body = {
      title,
      status,
      description,
      creator,
      assignedTo,
      tag,
      storyPoints
    };

    const storedToken = localStorage.getItem("authToken");

    axios
      .post(`${process.env.REACT_APP_API_URL}/backlog/${projectId}`, body, {headers: { Authorization: `Bearer ${storedToken}` }})
      .then((response) => {
        setTitle("");
        //TODO: outros
        //setSprints("");
        console.log("propssss", props)
        props.refresh();
      })
      .catch((err) => console.log(err));
  };

  const handleAddUser = (e) => {
    e.preventDefault();

    const body = { name, description, sprints, sprintDuration, timestamps, users, email: e.target.value };
    axios
      .put(`${process.env.REACT_APP_API_URL}/projects/${projectId}`, body, {headers: { Authorization: `Bearer ${storedToken}` }})
      .then((response) => {
        let { name, description, sprints, sprintDuration, timestamps, users: projectUsers } = response.data;
          //console.log("responseee:",response.data)
          setName(name);
          setDescription(description);
          setSprints(sprints);
          setSprintDuration(sprintDuration);
          setTimestamps(timestamps);
          setProjectUsers(projectUsers);
      })
      .catch((err) => console.log(err));
  };

  const removeUser = (userEmail) => {
    const body = { email: userEmail };
    axios
      .put(`${process.env.REACT_APP_API_URL}/projects/remove-user/${projectId}`, body, {headers: { Authorization: `Bearer ${storedToken}` }})
      .then(response => {
       setProjectUsers(response.data.users)})
      .catch((err) => console.log(err));       
  }

  const fetchUsers = async () => {
    try {
        let response = await axios.get(`${process.env.REACT_APP_API_URL}/users`, {headers: { Authorization: `Bearer ${storedToken}` }});
        //console.log("userss:", response.data)
        setUsers(response.data)
    } catch (error) {
        console.log(error);
    }
  };

  const closeOnEscapeKeyDown = (e) => {
    if((e.charCode || e.keyCode) === 27){
      props.onClose()
    }
  }

  useEffect(() => {
    fetchUsers();
    document.body.addEventListener("keydown", closeOnEscapeKeyDown)
    return function cleanup() {
      document.body.removeEventListener("keydown", closeOnEscapeKeyDown)
    }
  }, [])

  if(!props.show){
    return null
  };

  

  return (
    <div>
      <div id="task" className="modal" onClick={props.onClose}>
        <div className="modal-content" onClick={e => e.stopPropagation()}>
          <div className="modal-header">
            <h3 className="modal-title">Add Task</h3>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="title">Task title:</label>          
            <br />
            <input type="text" name="title" value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>
          <div>
            <label htmlFor="description">Description:</label>          
            <br />
            <textarea type="text" name="description" value={description} onChange={(e) => setDescription(e.target.value)} />
          </div>        

          <div className="users-list">
            <label htmlFor="projectUsers">Assigned to:</label>
            <ul className="ul-list">
              {projectUsers && projectUsers.map((user) => {              
              return(
                <div className="u-list">
                  <li>
                    {`${user.username} as ${user.role}`}                  
                  </li>
                  <button type="button" onClick = {function(){removeUser(user.email)}} id="x-button">X</button>
                </div>
              )
              })}
            </ul>
        </div>
        <div>
            <label htmlFor="username">Assign to:</label>
            <br />
            <select style={{"minWidth":"230px"}} name="email" onChange={(e) => {setEmail(e.target.value)
            handleAddUser(e)}}>
              <option>Select User</option>
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
              <button className="button-task" type="submit">Assign</button>
            </div>
                      
            {/* <input type="text" name="users" value={users} onChange={(e) => setUsers(e.target.value)} /> */}
          </div>

          <div>
            <h4>Task Tag:</h4>
            <input className="task-input" type="radio" name="myTagBox" value="none" onChange={(e) => setTag(e.target.value)} defaultChecked />
            <label htmlFor="tag">none</label>

            <input type="radio" name="myTagBox" value="User Story" onChange={(e) => setTag(e.target.value)} />
            <label htmlFor="tag">User Story</label>

            <input type="radio" name="myTagBox" value="Spike" onChange={(e) => setTag(e.target.value)} />
            <label htmlFor="tag">Spike</label>

            <input type="radio" name="myTagBox" value="Bug Fix" onChange={(e) => setTag(e.target.value)} />
            <label htmlFor="tag">Bug Fix</label>
        </div>
        <div>
          <h4>Story Points:</h4>
          <input type="radio" name="myPointsBox" value="1" onChange={(e) => setStoryPoints(e.target.value)} defaultChecked />
          <label htmlFor="storyPoints">1</label>

          <input type="radio" name="myPointsBox" value="2" onChange={(e) => setStoryPoints(e.target.value)} />
          <label htmlFor="storyPoints">2</label>

          <input type="radio" name="myPointsBox" value="3" onChange={(e) => setStoryPoints(e.target.value)} />
          <label htmlFor="storyPoints">3</label>

          <input type="radio" name="myPointsBox" value="5" onChange={(e) => setStoryPoints(e.target.value)} />
          <label htmlFor="storyPoints">5</label>

          <input type="radio" name="myPointsBox" value="8" onChange={(e) => setStoryPoints(e.target.value)} />
          <label htmlFor="storyPoints">8</label>
        </div>        
          <button className="button-task-add" type="submit">Add task</button>
        </form>
        </div>
          <div className="modal-footer">
            <button onClick={props.onClose} className="button-task">Cancel</button>
        </div>
      </div>
      
    </div>
  </div>
  )
}

export default AddTaskModal