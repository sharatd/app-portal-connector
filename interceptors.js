const { registerInterceptor } = require("./interceptorEngine");

registerInterceptor((ctx) =>
  ctx.job.payload?.jobName ? true : "Missing jobName"
);

registerInterceptor((ctx) =>
  ctx.job.payload.jobName.length <= 50
    ? true
    : "Job name too long (max 50 characters)"
);

// Optional: logging interceptor
registerInterceptor((ctx) => {
  console.log(`[Interceptor] Submitting job: ${ctx.job.payload.jobName}`);
  return true;
});
