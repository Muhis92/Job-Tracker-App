import { useState, useEffect } from "react";

const AddJob = ({
  jobs,
  setJobs,
  isEditing,
  setIsEditing,
  editJobId,
  setEditJobId,
  jobToEdit,
  setJobToEdit,
}) => {
  const [job, setJob] = useState({
    company: "",
    position: "",
    location: "",
    status: "pending",
  });

  const [error, setError] = useState("");

  useEffect(() => {
    if (!jobToEdit) return;

    setJob({
      company: jobToEdit.company,
      position: jobToEdit.position,
      location: jobToEdit.location,
      status: jobToEdit.status,
    });
  }, [jobToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!job.company.trim() || !job.position.trim() || !job.location.trim()) {
      setError("Please fill in all fields");
      return;
    }

    setError("");

    if (isEditing) {
      const updatedJobs = jobs.map((item) =>
        item.id === editJobId ? { ...job, id: editJobId } : item,
      );

      setJobs(updatedJobs);
      setIsEditing(false);
      setEditJobId(null);
      setJobToEdit(null);
    } else {
      const newJob = {
        ...job,
        id: Date.now(),
      };

      setJobs([...jobs, newJob]);
    }

    setJob({
      company: "",
      position: "",
      location: "",
      status: "pending",
    });
  };

  return (
    <div>
      <h1 className="page-title">{isEditing ? "Edit Job" : "Add Job"}</h1>

      <div className="form-container">
        <form onSubmit={handleSubmit}>
          {error && <p style={{ color: "tomato" }}>{error}</p>}

          <div className="form-group">
            <label className="form-label">Company</label>
            <input
              className="form-input"
              type="text"
              value={job.company}
              onChange={(e) => setJob({ ...job, company: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Position</label>
            <input
              className="form-input"
              type="text"
              value={job.position}
              onChange={(e) => setJob({ ...job, position: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Location</label>
            <input
              className="form-input"
              type="text"
              value={job.location}
              onChange={(e) => setJob({ ...job, location: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Status</label>
            <select
              className="form-select"
              value={job.status}
              onChange={(e) => setJob({ ...job, status: e.target.value })}
            >
              <option value="pending">Pending</option>
              <option value="interview">Interview</option>
              <option value="declined">Declined</option>
            </select>
          </div>

          <button className="btn btn-primary" type="submit">
            {isEditing ? "Update Job" : "Add Job"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddJob;
