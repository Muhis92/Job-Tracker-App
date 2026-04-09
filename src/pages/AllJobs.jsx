import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function AllJobs() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [jobs, setJobs] = useState(() => {
    return JSON.parse(localStorage.getItem(`jobs_${user.id}`)) || [];
  });

  // ✅ الجديد
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    localStorage.setItem(`jobs_${user.id}`, JSON.stringify(jobs));
  }, [jobs, user.id]);

  const deleteJob = (id) => {
    const updatedJobs = jobs.filter((job) => job.id !== id);
    setJobs(updatedJobs);
  };

  const editJob = (id) => {
    navigate(`/add-job?edit=${id}`);
  };

  // ✅ الجديد (الفلترة)
  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.company.toLowerCase().includes(search.toLowerCase()) ||
      job.position.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "all" ? true : job.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div>
      <h1>All Jobs</h1>

      {/* ✅ UI للبحث والفلترة */}
      <div className="filters">
        <input
          type="text"
          placeholder="Search by company or position"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="interview">Interview</option>
          <option value="declined">Declined</option>
        </select>
      </div>

      {/* ✅ عرض النتائج */}
      {filteredJobs.length === 0 ? (
        <p>No jobs found.</p>
      ) : (
        <div className="jobs-grid">
          {filteredJobs.map((job) => (
            <div className="job-card" key={job.id}>
              <h3>{job.position}</h3>
              <p><strong>Company:</strong> {job.company}</p>
              <p><strong>Location:</strong> {job.location}</p>
              <p><strong>Status:</strong> {job.status}</p>
              <p><strong>Type:</strong> {job.type}</p>
              <p><strong>Created:</strong> {job.createdAt}</p>

              <div className="job-actions">
                <button onClick={() => editJob(job.id)}>Edit</button>
                <button onClick={() => deleteJob(job.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AllJobs;