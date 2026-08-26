import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../api";
import "../styles/Forms.css";

const CATEGORIES = ["Food", "Shelter", "Medicine", "Transport", "Utilities", "Clothing", "Other"];

export default function AddExpense() {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [type, setType] = useState("essential");
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
      await api.post("/expense", { amount: Number(amount), category, type, date });
      setSuccess("Expense logged");
      setAmount("");
    } catch (err) {
      setError(err.response?.data?.message || "Could not add expense");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="form-page container">
      <div className="form-head">
        <span className="eyebrow">Log spending</span>
        <h1>Add expense</h1>
        <p>Tag each expense so your dashboard can separate needs from extras.</p>
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
              <label htmlFor="category">Category</label>
              <select id="category" value={category} onChange={(e) => setCategory(e.target.value)}>
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-field">
              <label htmlFor="date">Date</label>
              <input id="date" type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
            </div>
          </div>

          <div className="form-field">
            <label>Type</label>
            <div className="type-toggle">
              <button
                type="button"
                className={type === "essential" ? "type-btn active" : "type-btn"}
                onClick={() => setType("essential")}
              >
                Essential
              </button>
              <button
                type="button"
                className={type === "non-essential" ? "type-btn active" : "type-btn"}
                onClick={() => setType("non-essential")}
              >
                Non-essential
              </button>
            </div>
          </div>

          <button type="submit" className="btn btn-accent btn-block" disabled={loading}>
            {loading ? "Saving..." : "Save expense"}
          </button>
        </form>

        <div className="form-side card">
          <h4>Need to log income instead?</h4>
          <p>Income and aid received are tracked separately from spending.</p>
          <Link to="/add-income" className="btn btn-outline btn-block">
            Add income
          </Link>
        </div>
      </div>
    </div>
  );
}
