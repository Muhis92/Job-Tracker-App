import { useAuth } from "../context/AuthContext";

function Dashboard() {
  const { user } = useAuth();

  const jobs = JSON.parse(localStorage.getItem(`jobs_${user.id}`)) || [];

  const pendingJobs = jobs.filter((job) => job.status === "pending").length;
  const interviewJobs = jobs.filter((job) => job.status === "interview").length;
  const declinedJobs = jobs.filter((job) => job.status === "declined").length;

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome back, {user.name}</p>

      <div className="stats-grid">
        <div className="card">
          <h3>Total Jobs</h3>
          <p>{jobs.length}</p>
        </div>

        <div className="card">
          <h3>Pending</h3>
          <p>{pendingJobs}</p>
        </div>

        <div className="card">
          <h3>Interview</h3>
          <p>{interviewJobs}</p>
        </div>

        <div className="card">
          <h3>Declined</h3>
          <p>{declinedJobs}</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
