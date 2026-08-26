import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../api";
import "../styles/Forms.css";

export default function AddIncome() {
  const [amount, setAmount] = useState("");
  const [source, setSource] = useState("");
  const [isAid, setIsAid] = useState(false);
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      await api.post("/income", { amount: Number(amount), source, isAid, date });
      setSuccess("Income logged");
      setAmount("");
      setSource("");
    } catch (err) {
      setError(err.response?.data?.message || "Could not add income");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="form-page container">
      <div className="form-head">
        <span className="eyebrow">Log income</span>
        <h1>Add income</h1>
        <p>Include wages, remittances, and any aid received so it counts toward your recovery.</p>
      </div>

      <div className="form-layout">
        <form onSubmit={handleSubmit} className="card entry-form">
          {error && <div className="auth-error">{error}</div>}
          {success && <div className="form-success">{success}</div>}

          <div className="form-field">
            <label htmlFor="amount">Amount (৳)</label>
            <input
              id="amount"
              type="number"
              min="0"
              step="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>

          <div className="form-row">
            <div className="form-field">
              <label htmlFor="source">Source</label>
              <input
                id="source"
                type="text"
                placeholder="e.g. Daily wage, NGO relief fund"
                value={source}
                onChange={(e) => setSource(e.target.value)}
                required
              />
            </div>

            <div className="form-field">
              <label htmlFor="date">Date</label>
              <input id="date" type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
            </div>
          </div>

          <label className="checkbox-field">
            <input type="checkbox" checked={isAid} onChange={(e) => setIsAid(e.target.checked)} />
            This is aid or relief support, not regular income
          </label>

          <button type="submit" className="btn btn-accent btn-block" disabled={loading}>
            {loading ? "Saving..." : "Save income"}
          </button>
        </form>

        <div className="form-side card">
          <h4>Tracking spending instead?</h4>
          <p>Log expenses separately and tag them as essential or non-essential.</p>
          <Link to="/add-expense" className="btn btn-outline btn-block">
            Add expense
          </Link>
        </div>
      </div>
    </div>
  );
}
