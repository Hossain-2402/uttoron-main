import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/Navbar.css";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/");
  }

  return (
    <header className="nav">
      <div className="container nav-inner">
        <Link to="/" className="nav-logo">
          <span className="nav-logo-mark">
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              <path d="M2 14 C6 8, 16 8, 20 14" stroke="#1c3a34" strokeWidth="2" strokeLinecap="round" fill="none" />
              <path d="M2 18 C6 12, 16 12, 20 18" stroke="#e1662f" strokeWidth="2" strokeLinecap="round" fill="none" />
            </svg>
          </span>
          Uttoron
        </Link>

        {user ? (
          <nav className="nav-links">
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/add-income">Add Income</Link>
            <Link to="/add-expense">Add Expense</Link>
            <Link to="/current-status">Current Status</Link>
            <Link to="/history">History</Link>
            <span className="nav-name">{user.name.split(" ")[0]}</span>
            <button className="btn btn-outline nav-logout" onClick={handleLogout}>
              Sign out
            </button>
          </nav>
        ) : (
          <nav className="nav-links">
            <Link to="/signin">Sign in</Link>
            <Link to="/signup" className="btn btn-accent">
              Get started
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
