import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api";
import { useAuth } from "../context/AuthContext";
import "../styles/Dashboard.css";

export default function Dashboard() {
  const { user } = useAuth();
  const [status, setStatus] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .get("/status")
      .then((res) => setStatus(res.data))
      .catch(() => setError("Could not load your recovery status"));
  }, []);

  const hasBaseline = status && status.baselineIncome > 0;

  return (
    <div className="dashboard container">
      <div className="dashboard-head">
        <div>
          <span className="eyebrow">Recovery dashboard</span>
          <h1>Welcome back, {user?.name?.split(" ")[0]}</h1>
        </div>
      </div>

      {error && <div className="dash-error">{error}</div>}

      {!status ? (
        <p className="dash-loading">Loading your status...</p>
      ) : !hasBaseline ? (
        <div className="empty-card card">
          <h3>Set your baseline to see recovery progress</h3>
          <p>
            Uttoron measures recovery against your pre-crisis monthly income. Add it once on the
            Current Status page to unlock your dashboard.
          </p>
          <Link to="/current-status" className="btn btn-primary">
            Set baseline
          </Link>
        </div>
      ) : (
        <div className="dash-grid">
          <div className="card recovery-card">
            <span className="eyebrow">Recovery progress</span>
            <div className="recovery-track">
              <div className="recovery-fill" style={{ width: `${status.recoveryPercent}%` }} />
            </div>
            <div className="recovery-meta">
              <span className="data recovery-percent">{status.recoveryPercent}%</span>
              <span>
                of your ৳{status.baselineIncome.toLocaleString()} pre-crisis baseline recovered so
                far
              </span>
            </div>
          </div>

          <div className="stat-card card">
            <span className="eyebrow">Remaining resources</span>
            <span className="data stat-value">৳{status.remainingResources.toLocaleString()}</span>
            <span className="stat-note">Income and aid minus everything spent</span>
          </div>

          <div className="stat-card card">
            <span className="eyebrow">Total aid received</span>
            <span className="data stat-value">৳{status.totalAid.toLocaleString()}</span>
            <span className="stat-note">Logged from your income entries</span>
          </div>

          <div className="stat-card card">
            <span className="eyebrow">Essential spending</span>
            <span className="data stat-value">৳{status.totalEssential.toLocaleString()}</span>
            <span className="stat-note">Food, shelter, medicine, and other needs</span>
          </div>

          <div className="stat-card card">
            <span className="eyebrow">Non-essential spending</span>
            <span className="data stat-value">৳{status.totalNonEssential.toLocaleString()}</span>
            <span className="stat-note">Everything outside core survival needs</span>
          </div>

          <div className="stat-card card">
            <span className="eyebrow">Days funds will last</span>
            <span className="data stat-value">
        	- 
            </span>
            <span className="stat-note">Based on your recent essential spending</span>
          </div>
        </div>
      )}
    </div>
  );
}
