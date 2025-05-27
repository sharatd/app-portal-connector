const fs = require("fs");
const path = require("path");
//const fetch = require("node-fetch");

// --- 1. Load job configs ---
const configPath = path.join(__dirname, "configs", "hello-world.json");
const jobConfig = JSON.parse(fs.readFileSync(configPath, "utf-8"));

// --- 2. Define policy middleware ---
const policies = [
  (job) =>
    (job.payload && job.payload.jobName !== "") || "Job name cannot be empty",
  (job) =>
    job.payload.jobName.length <= 50 || "Job name too long (max 50 characters)",
];

function applyPolicies(job) {
  for (const policy of policies) {
    const result = policy(job);
    if (result !== true && typeof result === "string") {
      throw new Error(`Policy violation: ${result}`);
    }
  }
}

// --- 3. Submit job ---
(async () => {
  try {
    applyPolicies(jobConfig);

    const response = await fetch("http://localhost:3000/submit-job", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jobConfig),
    });

    const data = await response.json();
    console.log("Job submission response:", data);
  } catch (err) {
    console.error("Error submitting job:", err.message);
  }
})();
