const express = require("express");
const cors = require("cors");

const app = express();
const { Pool } = require("pg");
app.use(express.json());
import { send_email } from "./src/EmailSender.js";
require("dotenv").config({ path: __dirname + "/.env" });

const allowedOrigins = ["http://localhost:3000"];

app.use(
  cors({
    origin: allowedOrigins,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"], // Allow cookies if needed
  }),
);
const pool = new Pool({
  connectionString: process.env.DB_URL,
  ssl: { ca: process.env.DATABASE_CA },
});

app.get("/api/test-db", async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query("SELECT * FROM example.table");
    client.release();
    res.json({
      sucess: true,
      message: "Database connected",
      result: result.rows[0],
    });
  } catch (error) {
    console.log("Database connection failed: ", error);
    res.status(500).json({
      sucess: false,
      message: "database connection failed",
      error: error.message,
    });
  }
});

app.post("/api/add-lead", async (req, res) => {
  try {
    console.log(req.body);
    const client = await pool.connect();
    const result = await client.query(`INSERT INTO example.table VALUES()`, [
      req.body.firstName,
      req.body.lastName,
      req.body.email,
      req.body.phoneNumber,
      req.body.age,
      req.body.state,
    ]);
    const email_response = await send_email(req.body);
    console.log("Email Sent", email_response);

    res.status(201).json({ success: true, lead: result.rows[0] });
  } catch (error) {
    res.status(500).json({ sucess: false, error: error.message });
  }
});

app.get("/api/test", (req, res) => {
  res.json({ success: true, message: "API is working!" });
});

app.post("/api/user/create", (req, res) => {
  console.log(req.body);
  res.send({ body: req.body });
});

app.options("*", cors());
module.exports = app;
