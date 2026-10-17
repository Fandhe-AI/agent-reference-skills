# samples

| Name | Description | Path |
| --- | --- | --- |
| AI Metadata Quickstart | Have Inngest extract model, token, and latency metadata from OpenTelemetry `gen_ai.*` spans and attach it to the step as `inngest.ai` metadata. | [ai-metadata-quickstart.md](./ai-metadata-quickstart.md) |
| AI Workflow | Make LLM calls durable and observable using step.ai — automatic retries, memoization, and inference tracking included. | [ai-workflow.md](./ai-workflow.md) |
| Background Job | Trigger an async background job on an event and run work reliably with automatic retries. | [background-job.md](./background-job.md) |
| Cleanup after Function Cancellation | Run post-cancellation code by triggering a function from the `inngest/function.cancelled` system event. | [cleanup-after-function-cancellation.md](./cleanup-after-function-cancellation.md) |
| Cloudflare Workers Environment Variables | Pass the Workers `env` bindings into Inngest function handlers with middleware. | [cloudflare-workers-environment-variables.md](./cloudflare-workers-environment-variables.md) |
| Durable Endpoints | Make a regular HTTP handler durable with `inngest.endpoint()` and inline `step.run()`, without separate function definitions or event triggers. | [durable-endpoints.md](./durable-endpoints.md) |
| Email Sequence | Build a behavior-based drip campaign: welcome email, wait for a click, then send tips or a trial offer. | [email-sequence.md](./email-sequence.md) |
| Fan-out Pattern | Trigger multiple independent functions from a single event, each running in parallel. | [fan-out.md](./fan-out.md) |
| Fetch Run Status and Output | Trigger a function, then fetch its run status and output through the Inngest REST API. | [fetch-run-status-and-output.md](./fetch-run-status-and-output.md) |
| Human-in-the-Loop | Pause a workflow and wait for a human approval event before continuing. | [human-in-the-loop.md](./human-in-the-loop.md) |
| OpenTelemetry | Set up OpenTelemetry and enable Extended Traces so spans from inside a function run appear in Inngest Traces, including custom spans via `tracer`. | [open-telemetry.md](./open-telemetry.md) |
| Realtime Publish/Subscribe | Push live progress updates from a running function to a React client using channels, topics, and `useRealtime` — no polling or custom WebSocket server needed. | [realtime-publish-subscribe.md](./realtime-publish-subscribe.md) |
| Scheduled Task | Run a function on a recurring schedule using a cron trigger. | [scheduled-task.md](./scheduled-task.md) |
| Scheduling a One-off Function | Delay a function run to a specific future time by setting the event payload's `ts` field. | [scheduling-one-off-function.md](./scheduling-one-off-function.md) |
| Singleton Function | Ensure only one run of a function is active per key at a time, so overlapping triggers are skipped or the active run is cancelled and replaced. | [singleton-function.md](./singleton-function.md) |
| Step Workflow | Compose a multi-step workflow where each step is independently retried and data flows between steps. | [step-workflow.md](./step-workflow.md) |
| Track Failures in Datadog | Handle every failed function in one place by triggering on the `inngest/function.failed` system event and forwarding it to Datadog. | [track-failures-in-datadog.md](./track-failures-in-datadog.md) |
