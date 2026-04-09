import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function AddJob() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const editId = searchParams.get("edit");

  const [jobs, setJobs] = useState(() => {
    return JSON.parse(localStorage.getItem(`jobs_${user.id}`)) || [];
  });

  const [form, setForm] = useState({
    company: "",
    position: "",
    location: "",
    status: "pending",
    type: "full-time",
  });

  const [error, setError] = useState("");

  useEffect(() => {
    if (editId) {
      const jobToEdit = jobs.find((job) => String(job.id) === editId);

      if (jobToEdit) {
        setForm({
          company: jobToEdit.company,
          position: jobToEdit.position,
          location: jobToEdit.location,
          status: jobToEdit.status,
          type: jobToEdit.type,
        });
      }
    }
  }, [editId, jobs]);

  useEffect(() => {
    localStorage.setItem(`jobs_${user.id}`, JSON.stringify(jobs));
  }, [jobs, user.id]);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!form.company || !form.position || !form.location) {
      setError("Please fill in all fields");
      return;
    }

    if (editId) {
      const updatedJobs = jobs.map((job) =>
        String(job.id) === editId ? { ...job, ...form } : job,
      );
      setJobs(updatedJobs);
    } else {
      const newJob = {
        id: Date.now(),
        ...form,
        createdAt: new Date().toLocaleDateString(),
      };
      setJobs([...jobs, newJob]);
    }

    navigate("/all-jobs");
  };

  return (
    <div>
      <h1>{editId ? "Edit Job" : "Add Job"}</h1>

      <form className="job-form" onSubmit={handleSubmit}>
        {error && <p className="error">{error}</p>}

        <input
          type="text"
          name="company"
          placeholder="Company"
          value={form.company}
          onChange={handleChange}
        />

        <input
          type="text"
          name="position"
          placeholder="Position"
          value={form.position}
          onChange={handleChange}
        />

        <input
          type="text"
          name="location"
          placeholder="Location"
          value={form.location}
          onChange={handleChange}
        />

        <select name="status" value={form.status} onChange={handleChange}>
          <option value="pending">Pending</option>
          <option value="interview">Interview</option>
          <option value="declined">Declined</option>
        </select>

        <select name="type" value={form.type} onChange={handleChange}>
          <option value="full-time">Full-time</option>
          <option value="part-time">Part-time</option>
          <option value="remote">Remote</option>
        </select>

        <button type="submit">{editId ? "Update Job" : "Add Job"}</button>
      </form>
    </div>
  );
}

export default AddJob;
