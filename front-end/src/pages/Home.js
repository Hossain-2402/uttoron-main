import { Link } from "react-router-dom";
import "../styles/Home.css";

export default function Home() {
  return (
    <div className="home">
      <section className="hero">
        <div className="container hero-inner">
          <div className="hero-copy">
            <span className="eyebrow">Built for recovery, not routine budgeting</span>
            <h1>
              Find your footing again, <em>one entry at a time.</em>
            </h1>
            <p className="hero-sub">
              After a flood, cyclone, or income shock, your old budget is gone. Uttoron helps you
              rebuild a clear financial picture from scratch and track exactly how far you are
              from getting back on your feet.
            </p>
            <div className="hero-actions">
              <Link to="/signup" className="btn btn-accent">
                Start rebuilding
              </Link>
              <Link to="/signin" className="btn btn-outline">
                I already have an account
              </Link>
            </div>
          </div>

          <div className="hero-visual">
            <div className="waterline-card card">
              <div className="waterline-label">
                <span className="eyebrow">Recovery</span>
                <span className="waterline-percent data">64%</span>
              </div>
              <div className="waterline-track">
                <div className="waterline-baseline">
                  <span>Pre-crisis baseline</span>
                </div>
                <div className="waterline-fill" style={{ height: "64%" }} />
              </div>
              <div className="waterline-foot">
                <span>Remaining resources</span>
                <span className="data">৳ 18,400</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="before-after">
        <div className="container">
          <div className="ba-grid">
            <div className="ba-col">
              <span className="eyebrow">Before Uttoron</span>
              <h3>Guessing from memory</h3>
              <p>
                Records are gone. Aid arrives in pieces. Spending happens without a way to tell
                what's essential and what isn't, and there's no target to measure against.
              </p>
            </div>
            <div className="ba-divider" aria-hidden="true" />
            <div className="ba-col">
              <span className="eyebrow">With Uttoron</span>
              <h3>A rebuilt financial picture</h3>
              <p>
                Every taka logged has a place. Your pre-crisis income becomes a real target, and
                the dashboard shows exactly how close you are to reaching it.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="feature-section">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">What it does</span>
            <h2>Four simple tools, one recovery picture</h2>
          </div>

          <div className="feature-grid">
            <div className="feature-card card">
              <h4>Add income</h4>
              <p>Log income and aid received, with amount, source, and date.</p>
            </div>
            <div className="feature-card card">
              <h4>Add expense</h4>
              <p>Tag every expense as essential or non-essential as you spend.</p>
            </div>
            <div className="feature-card card">
              <h4>Set your baseline</h4>
              <p>Enter your pre-crisis monthly income as the target for recovery.</p>
            </div>
            <div className="feature-card card">
              <h4>Track recovery</h4>
              <p>See your progress, spending split, and survival runway in one view.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="dashboard-preview">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Inside the app</span>
            <h2>A dashboard built around one question</h2>
            <p className="section-sub">How close am I to getting back on my feet?</p>
          </div>

          <div className="preview-frame card">
            <div className="preview-toolbar">
              <span className="preview-dot" />
              <span className="preview-dot" />
              <span className="preview-dot" />
            </div>
            <div className="preview-body">
              <div className="preview-stat">
                <span className="eyebrow">Recovery progress</span>
                <div className="preview-bar">
                  <div className="preview-bar-fill" style={{ width: "64%" }} />
                </div>
                <span className="data">64% of ৳ 32,000 baseline</span>
              </div>
              <div className="preview-row">
                <div className="preview-mini">
                  <span className="eyebrow">Essential</span>
                  <span className="data">৳ 9,200</span>
                </div>
                <div className="preview-mini">
                  <span className="eyebrow">Non-essential</span>
                  <span className="data">৳ 2,100</span>
                </div>
                <div className="preview-mini">
                  <span className="eyebrow">Aid received</span>
                  <span className="data">৳ 6,000</span>
                </div>
                <div className="preview-mini">
                  <span className="eyebrow">Days left</span>
                  <span className="data">58</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="trust-section">
        <div className="container">
          <span className="eyebrow">Who this is built for</span>
          <div className="trust-grid">
            <div className="trust-item">
              <h4>Flood-affected families</h4>
              <p>Rebuilding a household budget after losing records and income for weeks.</p>
            </div>
            <div className="trust-item">
              <h4>Cyclone recovery groups</h4>
              <p>Coordinating aid tracking so households can see what they've actually received.</p>
            </div>
            <div className="trust-item">
              <h4>NGO field teams</h4>
              <p>Giving households a simple tool to self-track recovery between visits.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container cta-inner">
          <h2>Start with what you have left.</h2>
          <p>No bank linking, no spreadsheets. Just a clear, honest picture of where you stand.</p>
          <Link to="/signup" className="btn btn-accent">
            Create your account
          </Link>
        </div>
      </section>

      <footer className="home-footer">
        <div className="container footer-inner">
          <span>Uttoron — a financial recovery planner</span>
          <span className="footer-muted">Built for post-disaster recovery in Bangladesh</span>
        </div>
      </footer>
    </div>
  );
}


/* mongodb+srv://hossainieofficial_db_user:<db_password>@datacluster.mhn9tma.mongodb.net/?appName=DataCluster */
