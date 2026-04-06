const Dashboard = ({ jobs }) => {
  return (
    <div>
      <h1 className="page-title">Dashboard</h1>
      <p>Welcome to your Job Tracker App.</p>
      <p>You currently have {jobs.length} saved job applications.</p>
    </div>
  );
};

export default Dashboard;
