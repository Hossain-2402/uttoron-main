import { useEffect, useState } from "react";
import api from "../api";
import "../styles/History.css";

export default function History() {
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [filter, setFilter] = useState("all");
  const [error, setError] = useState("");

  useEffect(() => {
    Promise.all([api.get("/income"), api.get("/expense")])
      .then(([incomeRes, expenseRes]) => {
        setIncomes(incomeRes.data.incomes);
        setExpenses(expenseRes.data.expenses);
      })
      .catch(() => setError("Could not load your history"));
  }, []);

  const entries = [
    ...incomes.map((i) => ({
      id: i._id,
      kind: "income",
      label: i.isAid ? `${i.source} (aid)` : i.source,
      amount: i.amount,
      date: i.date,
    })),
    ...expenses.map((e) => ({
      id: e._id,
      kind: e.type,
      label: e.category,
      amount: e.amount,
      date: e.date,
    })),
  ].sort((a, b) => new Date(b.date) - new Date(a.date));

  const filtered = entries.filter((e) => filter === "all" || e.kind === filter);

  async function handleDelete(entry) {
    try {
      if (entry.kind === "income") {
        await api.delete(`/income/${entry.id}`);
        setIncomes((prev) => prev.filter((i) => i._id !== entry.id));
      } else {
        await api.delete(`/expense/${entry.id}`);
        setExpenses((prev) => prev.filter((e) => e._id !== entry.id));
      }
    } catch (err) {
      setError("Could not remove that entry");
    }
  }

  return (
    <div className="history-page container">
      <div className="form-head">
        <span className="eyebrow">Full record</span>
        <h1>History</h1>
        <p>Every income and expense entry you've logged, most recent first.</p>
      </div>

      <div className="history-filters">
        {["all", "income", "essential", "non-essential"].map((f) => (
          <button
            key={f}
            className={filter === f ? "filter-chip active" : "filter-chip"}
            onClick={() => setFilter(f)}
          >
            {f === "all" ? "All" : f === "income" ? "Income" : f === "essential" ? "Essential" : "Non-essential"}
          </button>
        ))}
      </div>

      {error && <div className="auth-error">{error}</div>}

      <div className="card history-table-card">
        {filtered.length === 0 ? (
          <div className="history-empty">Nothing logged here yet.</div>
        ) : (
          <table className="history-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Label</th>
                <th>Type</th>
                <th>Amount</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((entry) => (
                <tr key={`${entry.kind}-${entry.id}`}>
                  <td className="data">{new Date(entry.date).toLocaleDateString()}</td>
                  <td>{entry.label}</td>
                  <td>
                    <span className={`tag tag-${entry.kind}`}>
                      {entry.kind === "income" ? "Income" : entry.kind === "essential" ? "Essential" : "Non-essential"}
                    </span>
                  </td>
                  <td className={`data amount ${entry.kind === "income" ? "amount-pos" : "amount-neg"}`}>
                    {entry.kind === "income" ? "+" : "-"}৳{entry.amount.toLocaleString()}
                  </td>
                  <td>
                    <button className="row-delete" onClick={() => handleDelete(entry)} aria-label="Delete entry">
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
