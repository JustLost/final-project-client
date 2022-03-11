import './App.css';
import { Routes, Route } from "react-router-dom";
import Navbar from './Components/Navbar/Navbar';
import HomePage from './pages/HomePage/HomePage';
import SignupPage from './pages/SignupPage/SignupPage';
import LoginPage from './pages/LoginPage/LoginPage';
import AddProjectForm from './Components/AddProjectForm/AddProjectForm';
import AddSprintForm from './Components/AddSprintForm/AddSprintForm';
import AddTaskForm from './Components/AddTaskForm/AddTaskForm';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/new/project" element={<AddProjectForm />} />
        <Route path="/new/sprint" element={<AddSprintForm />} />
        <Route path="/new/task" element={<AddTaskForm />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/" element={<HomePage />} />
      </Routes>
    </div>
  );
}

export default App;
