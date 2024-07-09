import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddEditTaskPage from "./pages/AddEditTask";
import NotFound from "./pages/NotFound";
import TaskDetailsPage from "./pages/TaskDetails";
import TaskListPage from "./pages/TaskListPage";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<TaskListPage />} />
          <Route path="/add" element={<AddEditTaskPage />} />
          <Route path="/edit/:id" element={<AddEditTaskPage />} />
          <Route path="/task/:id" element={<TaskDetailsPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
