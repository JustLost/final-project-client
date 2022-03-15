import './App.css';
import { Routes, Route } from "react-router-dom";

import Navbar from './Components/Navbar/Navbar';
import HomePage from './pages/HomePage/HomePage';
import SignupPage from './pages/SignupPage/SignupPage';
import LoginPage from './pages/LoginPage/LoginPage';
import AddProjectForm from './Components/AddProjectForm/AddProjectForm';
import AddSprintForm from './Components/AddSprintForm/AddSprintForm';
import AddTaskForm from './Components/AddTaskForm/AddTaskForm';
import ProjectsPage from './pages/ProjectsPage/ProjectsPage';
import ProjectDetailsPage from './pages/ProjectDetailsPage/ProjectDetailsPage'
import EditProjectPage from './pages/EditProjectPage/EditProjectPage';
import SprintPage from './pages/SprintPage/SprintPage';
import Footer from './Components/Footer/Footer';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/new/project" element={<AddProjectForm />} />
        <Route path="/new/sprint/:projectId" element={<AddSprintForm />} />
        <Route path="/new/task" element={<AddTaskForm />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/projects/:projectId" element={<ProjectDetailsPage />} />
        <Route path="/projects/edit/:projectId" element={<EditProjectPage />} /> 
        <Route path="/sprint/:projectId" element={<SprintPage />} />
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
