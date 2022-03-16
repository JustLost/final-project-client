import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { AuthContext } from '../../context/auth.context';
import AddTaskForm from '../../Components/AddTaskForm/AddTaskForm';
import "./BacklogPage.css"

function BacklogPage() {
    const [tasks, setTasks] = useState([]);
    const { projectId } = useParams();
    const storedToken = localStorage.getItem('authToken');
    const { user } = useContext(AuthContext);

    const fetchTasks = async () => {
        try { 
            let response = await axios
            .get(`${process.env.REACT_APP_API_URL}/backlog/${projectId}`, { headers: { Authorization: `Bearer ${storedToken}` }});
            setTasks(response.data);
            console.log('dataaaaaaaaaa: ', response.data)
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

  return (
    <div>
        <h1>Backlog</h1>
        <div className='tasks-box'>
            <div>
                <AddTaskForm refresh={fetchTasks} />
            </div>
            <div>
                <h3>Tasks list:</h3>
                {tasks && tasks.map((task) => {
                  return (
                    <div key={task._id}>
                        <Link to={`/tasks/${task._id}`}>
                            <h3>{task.title}</h3>
                        </Link>
                    </div>   
                )
                })}
            </div>
        </div>        
        
        <div>        
            {user.username}
        </div>
    </div>
  )
}

export default BacklogPage