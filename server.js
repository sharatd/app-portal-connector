const express = require("express");
const app = express();

app.use(express.json());

// In-memory store for submitted jobs
const submittedJobs = [];

app.post("/submit-job", (req, res) => {
  const job = {
    jobId: `mock-job-${submittedJobs.length + 1}`,
    status: "submitted",
    receivedAt: new Date().toISOString(),
    payload: req.body,
  };

  submittedJobs.push(job);

  console.log("Job received:", job);
  res.json(job);
});

app.get("/", (req, res) => {
  res.send("Hello from the mock App Connector!");
});

// New route: Get all submitted jobs
app.get("/jobs", (req, res) => {
  res.json(submittedJobs);
});

app.listen(3000, () => {
  console.log("Mock Connector server running on http://localhost:3000");
});
