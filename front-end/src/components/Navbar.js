import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/Navbar.css";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  // lock body scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

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

        <button
          className={menuOpen ? "nav-toggle open" : "nav-toggle"}
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <div className={menuOpen ? "nav-mobile open" : "nav-mobile"}>
        {user ? (
          <nav className="nav-mobile-links">
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/add-income">Add Income</Link>
            <Link to="/add-expense">Add Expense</Link>
            <Link to="/current-status">Current Status</Link>
            <div className="nav-mobile-foot">
              <span className="nav-name">{user.name.split(" ")[0]}</span>
              <button className="btn btn-outline btn-block" onClick={handleLogout}>
                Sign out
              </button>
            </div>
          </nav>
        ) : (
          <nav className="nav-mobile-links">
            <Link to="/signin">Sign in</Link>
            <Link to="/signup" className="btn btn-accent btn-block">
              Get started
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
