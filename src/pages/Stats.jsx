import { useAuth } from "../context/AuthContext";

function Stats() {
  const { user } = useAuth();
  const jobs = JSON.parse(localStorage.getItem(`jobs_${user.id}`)) || [];

  const pending = jobs.filter((job) => job.status === "pending").length;
  const interview = jobs.filter((job) => job.status === "interview").length;
  const declined = jobs.filter((job) => job.status === "declined").length;

  return (
    <div>
      <h1>Stats</h1>

      <div className="stats-grid">
        <div className="card">
          <h3>Pending Jobs</h3>
          <p>{pending}</p>
        </div>

        <div className="card">
          <h3>Interview Jobs</h3>
          <p>{interview}</p>
        </div>

        <div className="card">
          <h3>Declined Jobs</h3>
          <p>{declined}</p>
        </div>
      </div>
    </div>
  );
}

export default Stats;
