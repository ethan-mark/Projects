const { Pool } = require("pg");
require("dotenv").config();

// Create a PostgreSQL connection pool
const pool = new Pool({
  connectionString: process.env.DB_URL,
  ssl: { rejectUnauthorized: false }, // Required for Supabase
});

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { first_name, last_name, email, phone_number } = req.body;

  if (!first_name || !last_name || !email || !phone_number) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const result = await pool.query(
      "INSERT INTO table (first_name, last_name, email, phone_number) VALUES ($1, $2, $3, $4) RETURNING *",
      [first_name, last_name, email, phone_number],
    );
    res.status(201).json({ message: "Lead added!", lead: result.rows[0] });
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ error: "Database error" });
  }
};
