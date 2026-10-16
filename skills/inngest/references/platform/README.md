# Platform

| Name | Description | Path |
|------|-------------|------|
| API Keys | Authentication credentials for the Inngest v2 REST API — used for CI/CD automation, scripted investigation, and custom tooling (distinct from event keys and signing keys). | [api-keys.md](./api-keys.md) |
| Bulk Cancellation | Dashboard UI for cancelling multiple function runs at once by date range, complementing SDK-based cancellation and the REST cancellation endpoint. | [bulk-cancellation.md](./bulk-cancellation.md) |
| Connect (Workers) | Persistent outbound WebSocket connections from worker processes to Inngest, enabling horizontal scaling without inbound HTTP routing — optimized for containers (Kubernetes, ECS). | [connect.md](./connect.md) |
| Datadog Integration | Native integration that publishes Inngest environment metrics to Datadog, enabling monitoring and alerting without any Datadog agent configuration. | [datadog-integration.md](./datadog-integration.md) |
| Deploy: Cloudflare Pages | Deploying Inngest functions on Cloudflare Pages. | [deploy-cloudflare.md](./deploy-cloudflare.md) |
| Deploy: DigitalOcean | Deploying Inngest functions on DigitalOcean Functions, App Platform, or Droplets. | [deploy-digitalocean.md](./deploy-digitalocean.md) |
| Deploy: Netlify | Deploying Inngest functions on Netlify using the `netlify-plugin-inngest` build plugin for automatic app synchronization. | [deploy-netlify.md](./deploy-netlify.md) |
| Deploy: Render | Deploying Inngest functions on Render for both production and branch preview environments. | [deploy-render.md](./deploy-render.md) |
| Syncing an Inngest App | Registering or re-registering your Inngest app with Inngest Cloud after deployment so the platform knows the current function configurations. | [deploy-syncing.md](./deploy-syncing.md) |
| Deploy: Vercel | Deploying Inngest functions on Vercel using the native integration or manual environment variable configuration. | [deploy-vercel.md](./deploy-vercel.md) |
| Dev Server | Local development environment (`inngest dev`) that replicates the production execution model, flow control, and observability at `http://localhost:8288`. | [dev-server.md](./dev-server.md) |
| Environment Variables | All environment variables recognized by the Inngest SDK for configuration and authentication. | [environment-variables.md](./environment-variables.md) |
| Environments | Isolated execution contexts for the full development lifecycle — production, branch, custom, and local. | [environments.md](./environments.md) |
| Event Keys | Unique credentials that authenticate applications when publishing events to Inngest. | [event-keys.md](./event-keys.md) |
| Insights | SQL-based query and analytics platform within the Inngest dashboard for analyzing events, function runs, steps, trace spans, and metadata. | [insights.md](./insights.md) |
| Inspecting Function Runs | Viewing, searching, and analyzing individual function run details in the Inngest Cloud dashboard. | [inspecting-function-runs.md](./inspecting-function-runs.md) |
| Observability & Metrics | Built-in observability for durable function execution — metrics dashboards, event logs, and per-step timing data without code instrumentation. | [observability-metrics.md](./observability-metrics.md) |
| Pause and Resume Functions | Stop new runs during maintenance and resume the function when you are ready. Inngest still receives and stores events sent during the pause, but skips the paused function. | [pause-and-resume-functions.md](./pause-and-resume-functions.md) |
| Prometheus Metrics Export | Scraping Inngest function run metrics via a Prometheus-compatible endpoint, compatible with Prometheus, Grafana, and New Relic. | [prometheus-metrics.md](./prometheus-metrics.md) |
| Function Replay | Bulk recovery from function failures by reprocessing runs from a selected time window directly from the Inngest dashboard. | [replay.md](./replay.md) |
| Rerun a Run | Recover one failed run after fixing its cause, using the original trigger data. Inngest creates a new run and trace using the function code available when that run starts. | [rerun-a-run.md](./rerun-a-run.md) |
| Rotating Keys | Zero-downtime procedure for rotating an environment's signing key and event keys via the Inngest dashboard. | [rotating-keys.md](./rotating-keys.md) |
| Self-Hosting | Running the Inngest server on your own infrastructure using the Inngest CLI binary with SQLite/PostgreSQL and in-memory/external Redis. | [self-hosting.md](./self-hosting.md) |
| Signing Keys | Secret pre-shared keys unique to each environment that secure bidirectional communication between Inngest and your application servers. | [signing-keys.md](./signing-keys.md) |
| Traces | Detailed interactive execution timeline for every function run — queue delays, step execution, HTTP connection phases, retries, and optional OpenTelemetry spans. | [traces.md](./traces.md) |
| Webhooks | Receiving HTTP POST webhook payloads from external providers and converting them into Inngest events via transform functions. | [webhooks.md](./webhooks.md) |
