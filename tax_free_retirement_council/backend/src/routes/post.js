const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Posts");
});

router.post("/", (req, res) => {
  res.send("Posts");
});

router.put("/", (req, res) => {
  res.send("Posts");
});

router.delete("/", (req, res) => {
  res.send("Posts");
});

module.exports = router;
