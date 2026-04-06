import { useState, useEffect } from "react";
import { Routes, Route, NavLink, useNavigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import AddJob from "./pages/AddJob";
import AllJobs from "./pages/AllJobs";
import Stats from "./pages/Stats";

function App() {
  const navigate = useNavigate();

  const [jobs, setJobs] = useState(() => {
    const savedJobs = localStorage.getItem("jobs");
    return savedJobs ? JSON.parse(savedJobs) : [];
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editJobId, setEditJobId] = useState(null);
  const [jobToEdit, setJobToEdit] = useState(null);

  useEffect(() => {
    localStorage.setItem("jobs", JSON.stringify(jobs));
  }, [jobs]);

  const deleteJob = (id) => {
    const updatedJobs = jobs.filter((job) => job.id !== id);
    setJobs(updatedJobs);
  };

  const startEdit = (job) => {
    setIsEditing(true);
    setEditJobId(job.id);
    setJobToEdit(job);
    navigate("/add-job");
  };

  return (
    <div className="app-layout">
      <div className="sidebar">
        <h2 className="sidebar-title">Job Tracker</h2>

        <NavLink to="/" className="nav-link">
          Dashboard
        </NavLink>

        <NavLink to="/add-job" className="nav-link">
          Add Job
        </NavLink>

        <NavLink to="/all-jobs" className="nav-link">
          All Jobs
        </NavLink>

        <NavLink to="/stats" className="nav-link">
          Stats
        </NavLink>
      </div>

      <div className="page-content">
        <Routes>
          <Route path="/" element={<Dashboard jobs={jobs} />} />
          <Route
            path="/add-job"
            element={
              <AddJob
                jobs={jobs}
                setJobs={setJobs}
                isEditing={isEditing}
                setIsEditing={setIsEditing}
                editJobId={editJobId}
                setEditJobId={setEditJobId}
                jobToEdit={jobToEdit}
                setJobToEdit={setJobToEdit}
              />
            }
          />
          <Route
            path="/all-jobs"
            element={
              <AllJobs
                jobs={jobs}
                deleteJob={deleteJob}
                startEdit={startEdit}
              />
            }
          />
          <Route path="/stats" element={<Stats jobs={jobs} />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
