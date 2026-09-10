import { useEffect, useState } from "react";
import api from "../api";
import { useAuth } from "../context/AuthContext";
import "../styles/CurrentStatus.css";

export default function CurrentStatus() {
  const { user, updateUser } = useAuth();
  const [baselineInput, setBaselineInput] = useState("");
  const [status, setStatus] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadStatus();
  }, []);

  function loadStatus() {
    api
      .get("/status")
      .then((res) => {
        setStatus(res.data);
        setBaselineInput(res.data.baselineIncome ? String(res.data.baselineIncome) : "");
      })
      .catch(() => setError("Could not load your status"));
  }

  async function handleBaselineSubmit(e) {
    e.preventDefault();
    setError("");
    setSuccess("");
    setSaving(true);

    try {
      const res = await api.put("/status/baseline", { baselineIncome: Number(baselineInput) });
      updateUser(res.data.user);
      setSuccess("Baseline updated");
      loadStatus();
    } catch (err) {
      setError(err.response?.data?.message || "Could not update baseline");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="status-page container">
      <div className="form-head">
        <span className="eyebrow">Current status</span>
        <h1>Where you stand today</h1>
        <p>Set your baseline once, and Uttoron works out the rest from your entries.</p>
      </div>

      <div className="status-layout">
        <form onSubmit={handleBaselineSubmit} className="card baseline-form">
          <h3>Pre-crisis baseline</h3>
          <p className="status-note">Your average monthly income before the disaster.</p>
          <div className="form-field">
            <label htmlFor="baseline">Monthly income (৳)</label>
            <input
              id="baseline"
              type="number"
              min="0"
              step="0.01"
              value={baselineInput}
              onChange={(e) => setBaselineInput(e.target.value)}
              required
            />
          </div>
          {error && <div className="auth-error">{error}</div>}
          {success && <div className="form-success">{success}</div>}
          <button type="submit" className="btn btn-accent btn-block" disabled={saving}>
            {saving ? "Saving..." : "Save baseline"}
          </button>
        </form>

	
	</div>
    </div>
  );
}
