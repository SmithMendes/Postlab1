// Post-Lab Exercise 1: Form Handling with Middleware
// Using Express.js with express.urlencoded() middleware

const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

// ─── Middleware ────────────────────────────────────────────
// 1. express.urlencoded() - parses incoming form data (URL-encoded)
app.use(express.urlencoded({ extended: true }));

// 2. Serve static files from the "public" folder
app.use(express.static(path.join(__dirname, "public")));

// ─── Routes ───────────────────────────────────────────────

// GET  /  → serves the HTML form (handled by express.static)

// POST /submit → handles form submission
app.post("/submit", (req, res) => {
  // Extract form data from req.body
  const { studentName, branch, year } = req.body;

  // Display the submitted information on the webpage
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Submitted Data</title>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }

        body {
          font-family: 'Inter', sans-serif;
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          background: #0a0a0a;
          padding: 20px;
          position: relative;
          overflow: hidden;
        }

        body::before {
          content: '';
          position: absolute;
          width: 600px;
          height: 600px;
          background: radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 70%);
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          pointer-events: none;
        }

        .card {
          background: #141414;
          border: 1px solid #222;
          border-radius: 16px;
          padding: 44px 40px;
          max-width: 460px;
          width: 100%;
          text-align: center;
          position: relative;
          z-index: 1;
          box-shadow: 0 0 80px rgba(0, 0, 0, 0.6);
        }

        .badge {
          display: inline-block;
          background: #1a1a1a;
          border: 1px solid #2a2a2a;
          color: #4ade80;
          font-size: 0.72rem;
          font-weight: 600;
          padding: 4px 12px;
          border-radius: 20px;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          margin-bottom: 16px;
        }

        .card h1 {
          font-size: 1.5rem;
          font-weight: 700;
          color: #f0f0f0;
          letter-spacing: -0.02em;
          margin-bottom: 4px;
        }

        .card p.subtitle {
          color: #555;
          font-size: 0.82rem;
          margin-bottom: 28px;
        }

        .info-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 15px 16px;
          background: #1a1a1a;
          border: 1px solid #222;
          border-radius: 10px;
          margin-bottom: 10px;
        }

        .info-row .label {
          font-weight: 500;
          color: #666;
          font-size: 0.85rem;
          text-transform: uppercase;
          letter-spacing: 0.04em;
        }

        .info-row .value {
          color: #e0e0e0;
          font-weight: 600;
          font-size: 0.95rem;
        }

        .divider {
          height: 1px;
          background: #1e1e1e;
          margin: 24px 0;
        }

        .back-link {
          display: inline-block;
          width: 100%;
          padding: 14px;
          background: #fff;
          color: #0a0a0a;
          text-decoration: none;
          border-radius: 10px;
          font-weight: 600;
          font-size: 0.95rem;
          letter-spacing: -0.01em;
          transition: background 0.2s ease, transform 0.15s ease;
        }

        .back-link:hover { background: #e0e0e0; }
        .back-link:active { transform: scale(0.98); }
      </style>
    </head>
    <body>
      <div class="card">
        <span class="badge">✓ Submitted</span>
        <h1>Submitted Information</h1>
        <p class="subtitle">The following data was received from the form</p>

        <div class="info-row">
          <span class="label">Student Name</span>
          <span class="value">${studentName}</span>
        </div>
        <div class="info-row">
          <span class="label">Branch</span>
          <span class="value">${branch}</span>
        </div>
        <div class="info-row">
          <span class="label">Year</span>
          <span class="value">${year}</span>
        </div>

        <div class="divider"></div>

        <a href="/" class="back-link">← Back to Form</a>
      </div>
    </body>
    </html>
  `);
});

// ─── Start Server ─────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
