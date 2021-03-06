import "./App.css";
import { Routes, Route } from "react-router-dom";

import Navbar from "./Components/Navbar/Navbar";
import HomePage from "./pages/HomePage/HomePage";
import AddProjectForm from "./Components/AddProjectForm/AddProjectForm";
import AddSprintForm from "./Components/AddSprintForm/AddSprintForm";
import AddTaskForm from "./Components/AddTaskForm/AddTaskForm";
import ProjectsPage from "./pages/ProjectsPage/ProjectsPage";
import ProjectDetailsPage from "./pages/ProjectDetailsPage/ProjectDetailsPage"
import EditProjectPage from "./pages/EditProjectPage/EditProjectPage";
import Footer from "./Components/Footer/Footer";
import BacklogPage from "./pages/BacklogPage/BacklogPage";
import SprintsPage from "./pages/SprintsPage/SprintsPage";
import SprintDetailPage from "./pages/SprintDetailPage/SprintDetailPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import TaskPage from "./pages/TaskPage/TaskPage";
// import SideBar from "./Components/SideBar/SideBar";


function App() {
  return (
    <div id="app" className="App">
      <Navbar />
      
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/new/project" element={<AddProjectForm />} />
        <Route path="/new/sprint/:projectId" element={<AddSprintForm />} />
        <Route path="/new/task" element={<AddTaskForm />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/projects/:projectId" element={<ProjectDetailsPage />} />
        <Route path="/projects/edit/:projectId" element={<EditProjectPage />} /> 
        <Route path="/backlog/:projectId" element={<BacklogPage />} />
        <Route path="/sprints" element={<SprintsPage />} />

        <Route path="/sprints/:sprintId" element={<SprintDetailPage />} />    

        <Route path="/tasks/:taskId" element={<TaskPage />} />        

        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
      
      {/* <SideBar/> */}
      <Footer/>
    </div>
  );
}

export default App;
