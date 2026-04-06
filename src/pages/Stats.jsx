const Stats = ({ jobs }) => {
  const totalJobs = jobs.length;
  const pendingJobs = jobs.filter((job) => job.status === "pending").length;
  const interviewJobs = jobs.filter((job) => job.status === "interview").length;
  const declinedJobs = jobs.filter((job) => job.status === "declined").length;

  return (
    <div>
      <h1 className="page-title">Stats</h1>

      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Jobs</h3>
          <p>{totalJobs}</p>
        </div>

        <div className="stat-card">
          <h3>Pending Jobs</h3>
          <p>{pendingJobs}</p>
        </div>

        <div className="stat-card">
          <h3>Interview Jobs</h3>
          <p>{interviewJobs}</p>
        </div>

        <div className="stat-card">
          <h3>Declined Jobs</h3>
          <p>{declinedJobs}</p>
        </div>
      </div>
    </div>
  );
};

export default Stats;
