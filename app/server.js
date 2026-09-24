const express = require("express");
const { Pool } = require("pg");

const app = express();
const port = Number(process.env.PORT || 3000);

const pool = new Pool({
  host: process.env.DB_HOST || "db",
  port: Number(process.env.DB_PORT || 5432),
  database: process.env.DB_NAME || "gymdb",
  user: process.env.DB_USER || "appuser",
  password: process.env.DB_PASSWORD || "apppassword"
});

app.use(express.json());
app.use(express.static("public"));

app.get("/health", async (_req, res) => {
  try {
    await pool.query("SELECT 1");
    res.json({ status: "ok", database: "connected" });
  } catch (error) {
    res.status(503).json({ status: "degraded", database: "unavailable" });
  }
});

app.get("/api/members", async (_req, res) => {
  try {
    const result = await pool.query(
      "SELECT id, name, goal, created_at FROM members ORDER BY id DESC"
    );
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Database query failed" });
  }
});

app.post("/api/members", async (req, res) => {
  const { name, goal } = req.body;

  if (!name || !goal) {
    return res.status(400).json({ error: "name and goal are required" });
  }

  try {
    const result = await pool.query(
      "INSERT INTO members (name, goal) VALUES ($1, $2) RETURNING id, name, goal, created_at",
      [name.trim(), goal.trim()]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Database insert failed" });
  }
});

app.listen(port, "0.0.0.0", () => {
  console.log(`Compose app listening on port ${port}`);
});
