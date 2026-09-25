import { Link } from "react-router-dom";
import "../styles/NotFound.css";

export default function NotFound() {
  return (
    <div className="not-found">
      <div className="not-found-card card">
        <span className="eyebrow">404</span>
        <h1>Page not found</h1>
        <p>The page you're looking for doesn't exist or may have moved.</p>
        <Link to="/" className="btn btn-accent">
          Back to home
        </Link>
      </div>
    </div>
  );
}
