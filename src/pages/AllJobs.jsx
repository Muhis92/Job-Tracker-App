import { useState } from "react"

const AllJobs = ({ jobs, deleteJob, startEdit }) => {
  const [filterStatus, setFilterStatus] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")

  const filteredJobs = jobs.filter((job) => {
    const matchesStatus =
      filterStatus === "all" || job.status === filterStatus

    const matchesSearch =
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.position.toLowerCase().includes(searchTerm.toLowerCase())

    return matchesStatus && matchesSearch
  })

  return (
    <div>
      <h1 className="page-title">All Jobs</h1>

      <div className="form-group" style={{ maxWidth: "300px" }}>
        <label className="form-label">Search</label>
        <input
          className="form-input"
          type="text"
          placeholder="Search by company or position"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="form-group" style={{ maxWidth: "250px" }}>
        <label className="form-label">Filter by status</label>
        <select
          className="form-select"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="interview">Interview</option>
          <option value="declined">Declined</option>
        </select>
      </div>

      {filteredJobs.length === 0 ? (
        <p className="empty-text">No jobs found</p>
      ) : (
        <div className="jobs-grid">
          {filteredJobs.map((job) => (
            <div className="job-card" key={job.id}>
              <h3>{job.company}</h3>
              <p><strong>Position:</strong> {job.position}</p>
              <p><strong>Location:</strong> {job.location}</p>
              <p><strong>Status:</strong> {job.status}</p>

              <button
                className="btn btn-danger"
                onClick={() => deleteJob(job.id)}
              >
                Delete
              </button>

              <button
                className="btn btn-secondary"
                onClick={() => startEdit(job)}
              >
                Edit
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default AllJobs