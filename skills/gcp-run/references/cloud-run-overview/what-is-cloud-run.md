---
source: https://docs.cloud.google.com/run/docs/overview/what-is-cloud-run
---

# What is Cloud Run

Cloud Run is a fully managed application platform for running code, functions, or containers on Google's infrastructure. Code runs as a service, job, worker pool, or instance; all four run sandboxed container instances in the same execution environment.

## Signature / Usage

### Choosing a resource type

| Resource | Description |
|---|---|
| Service | Responds to HTTP requests sent to a unique and stable endpoint, using stateless container instances that support both dynamic autoscaling and manual scaling, also responds to events and functions. |
| Job | Executes parallelizable tasks that are executed manually, or on a schedule, and run to completion. |
| Worker pool | Handles always-on background workloads such as workloads from message queues (Kafka, Pub/Sub, RabbitMQ). |
| Instance | Runs long-lived workloads that need a singleton runtime environment. |

### Deploy from source in one command

Go, Node.js, Python, Java, .NET, Ruby, or a supported framework can use source-based deployment (Cloud Build + Google Cloud's buildpacks); building an image yourself is optional.

```bash
gcloud run deploy --source .
```

## Options / Props

### Services

| Feature | Detail |
|---|---|
| Endpoint | Unique HTTPS endpoint on a `*.run.app` subdomain; custom domains supported; TLS managed; WebSockets, HTTP/2 (end-to-end), gRPC (end-to-end) |
| Autoscaling | Scales on requests (or on CPU utilization outside requests with instance-based billing); scales out rapidly to one thousand instances, or more with a quota increase (the default maximum is 100 instances per revision, see the max instances page); limit with max instances |
| Scale to zero | Last idle instance is removed; new request creates an instance (cold start) |
| Keep warm | Minimum instances, or manual scaling |
| Billing | Request-based (per-request fee, no charge while idle) or instance-based (whole instance lifetime, no per-request fee); billed in 100 ms granularity |
| Traffic management | Gradual rollout, rollback, traffic splitting (for example 1% to a new revision) |
| Access control | IAM invoker policy, ingress settings, Identity-Aware Proxy (IAP); CDN (Firebase Hosting, Cloud CDN) can front cacheable assets |
| File system | In-memory, writable overlay that does not persist; persist via Cloud Storage or NFS (Filestore) mounts |

### Jobs

Run to completion; start from CLI, on a schedule, or from a workflow. Array jobs start many identical, independent instances in parallel. Examples: scripts/migrations, parallel processing of Cloud Storage files, scheduled jobs, batch AI inference/training (with or without GPU).

### Worker pools

- No automatic scaling by default: scale manually; at least one instance is needed, and minimum instances `0` means the worker won't start even if the deployment succeeds.
- Autoscale with Cloud Run External Metrics Autoscaling (CREMA) on Kafka consumer lag, Pub/Sub backlog, or Prometheus queries.
- Rollouts split instances between revisions (for example 25% = one of four instances), not traffic.
- Support Direct VPC egress and ingress; no load-balanced endpoint or URL; charged only while instances run.

### Instances (Preview)

Single, individually manageable and addressable (own URL), long-lived instance; runs for hours or days, restarts automatically after infrastructure updates (every 1 to 2 weeks); provisioned in about 20 seconds or less. Use for long-lived AI agents, VPS-like always-on servers, and remote debugging environments.

## Notes

- Services must listen on a TCP port and handle HTTP requests; to receive a warning before shutdown, trap `SIGTERM` (see the container contract).
- Source inconsistency: this page says request-based billing does not charge an instance that is not processing requests; the minimum instances page says idle minimum instances under request-based billing are "billed at a lower rate" (https://docs.cloud.google.com/run/docs/configuring/min-instances).
- Cloud Run instances are Preview (Pre-GA Offerings Terms apply).
- The overview page has no code block; the `gcloud run deploy --source .` snippet is taken from https://docs.cloud.google.com/run/docs/quickstarts/build-and-deploy/deploy-nodejs-service.
- Distance: Cloud Run is Google Cloud's serverless containers platform, distinct from Cloudflare Workers (`cloudflare-workers`), Vercel Functions (`vercel`), and HTTP frameworks (`hono`, `fastify`) that only run inside the container.
- Source: https://docs.cloud.google.com/run/docs/overview/what-is-cloud-run (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)

## Related

- [resource-model.md](./resource-model.md)
- [fit-for-run.md](./fit-for-run.md)
- [container-contract.md](./container-contract.md)
- [about-instance-autoscaling.md](./about-instance-autoscaling.md)
- [billing-settings.md](./billing-settings.md)
