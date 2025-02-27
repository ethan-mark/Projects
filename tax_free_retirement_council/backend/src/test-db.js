const { Pool } = require("pg");
require("dotenv").config();

// Create a PostgreSQL connection pool
console.log(process.env.DB_URL);
const pool = new Pool({
  connectionString: process.env.DB_URL,

  ssl: { rejectUnauthorized: false }, // Required for Supabase
});

pool.connect((err, client, release) => {
  if (err) {
    console.error("❌ Database connection error:", err.stack);
  } else {
    console.log("✅ Connected to Supabase PostgreSQL!");
    release();
  }
});
