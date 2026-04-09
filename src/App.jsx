import { NavLink, Route, Routes, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import AddJob from "./pages/AddJob";
import AllJobs from "./pages/AllJobs";
import Stats from "./pages/Stats";
import Login from "./pages/Login";
import Register from "./pages/Register";
import "./App.css";

function App() {
  const { user, logout } = useAuth();

  return (
    <div className="app-layout">
      {user && (
        <aside className="sidebar">
          <h2>Job Tracker</h2>
          <p className="welcome">Hi, {user.name}</p>

          <nav>
            <NavLink to="/">Dashboard</NavLink>
            <NavLink to="/add-job">Add Job</NavLink>
            <NavLink to="/all-jobs">All Jobs</NavLink>
            <NavLink to="/stats">Stats</NavLink>
          </nav>

          <button className="logout-btn" onClick={logout}>
            Logout
          </button>
        </aside>
      )}

      <main className="main-content">
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/add-job"
            element={
              <ProtectedRoute>
                <AddJob />
              </ProtectedRoute>
            }
          />
          <Route
            path="/all-jobs"
            element={
              <ProtectedRoute>
                <AllJobs />
              </ProtectedRoute>
            }
          />
          <Route
            path="/stats"
            element={
              <ProtectedRoute>
                <Stats />
              </ProtectedRoute>
            }
          />
          <Route
            path="/login"
            element={!user ? <Login /> : <Navigate to="/" replace />}
          />
          <Route
            path="/register"
            element={!user ? <Register /> : <Navigate to="/" replace />}
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;
