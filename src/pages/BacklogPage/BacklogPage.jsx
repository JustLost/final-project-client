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
    <div className='backlog'>
        <h1>Backlog</h1>
        <div className='tasks-box'>
            <div>
                <AddTaskForm refresh={fetchTasks} />
            </div>
            <div>
                <h2>Tasks list:</h2>
                {tasks && tasks.map((task) => {
                  return (
                    <div className='sprints' key={task._id}>
                        <Link to={`/tasks/${task._id}`}>
                            {task.title}
                        </Link>
                    </div>   
                )
                })}
            </div>
        </div>        
        
    </div>
  )
}

export default BacklogPage