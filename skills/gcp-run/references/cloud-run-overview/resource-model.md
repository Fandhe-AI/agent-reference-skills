---
source: https://docs.cloud.google.com/run/docs/resource-model
---

# Cloud Run resource model

How Cloud Run handles deployments: deployment types (what you bring), resources (what it runs as: service, job, worker pool, instance), and deployment methods (console, gcloud, YAML, Terraform). Revisions are immutable snapshots of a service or worker pool.

## Signature / Usage

Download a service's YAML (the service/revision model in YAML form) and re-apply it:

```bash
gcloud run services describe SERVICE --format export > service.yaml
```

```bash
gcloud run services replace service.yaml
```

## Options / Props

### Deployment options per resource

| Deployment option | Services | Jobs | Worker pools | Instances |
|---|---|---|---|---|
| Deploy container images | Supported | Supported | Supported | Supported |
| Deploy from source code | Supported | Supported | Supported | --- |
| Deploy functions (specialized source deployment for single-purpose, event-driven code; creates a service) | Supported | --- | --- | --- |
| Continuous deployment from git | Supported (jobs: configure manually in Cloud Build) | --- | --- | --- |

Source deployments: Cloud Build builds the code into an image stored in Artifact Registry, from a `Dockerfile` or a supported language runtime.

### Resource comparison

| Feature | Services | Jobs | Worker Pools | Instances |
|---|---|---|---|---|
| Primary use case | Request-driven (websites, APIs, microservices) | Task-driven (scripts, data processing, migrations) | Event/pull-driven (Kafka/Pub/Sub consumers) | Managed singleton (agentic workloads) |
| Trigger | HTTP/gRPC requests, Eventarc | Manual, Scheduler, Workflows; execution modes standard (immediate) or delayed | Always-on or autoscaled pull-based work | None |
| Scaling | Automatic/manual; scales to zero or on requests | Scales to N independent tasks, sequential or parallel | Manual fixed count, or built-in autoscaling on CPU or Pub/Sub backlog (KEDA based external autoscaler) | None; individually managed |
| Lifecycle | Ephemeral, scales down when idle | Runs to completion, up to 7 days | Always-on or ephemeral autoscaled instances | Long-lived (days/weeks), restarts automatically |
| Addressing | Stable service URL (load balanced) | No public endpoint; internal URL for triggers | No public endpoint; private Direct VPC IP ingress | Individual URL per instance |
| Inbound traffic | Public/internal HTTP/gRPC | None | IP-based L4 ingress with Direct VPC | Public/internal per-instance URL |
| Billing | Request-based or instance-based | Per-execution duration | Per-instance duration | Per-instance duration |

### Services, revisions, instances

- A service is regional; Cloud Run replicates it across zones in the region. A project can run many services in different regions.
- Each deployment creates a revision (one or more container images plus settings such as env vars, memory limits, concurrency). A revision cannot be modified after creation; an env var change creates a new revision. Unused revisions are eventually removed. Requests are routed as soon as possible to the latest healthy revision.
- Each revision scales to as many instances as needed; instances can handle many concurrent requests (max set by concurrency). An instance runs one ingress container plus optional sidecars.

### Jobs

- A job has one or more tasks that run containers to completion; tasks are independent and can run in parallel in one execution.
- All tasks in an execution must succeed. Set a task timeout and retries (`maxRetries`); a task exceeding max retries fails the job.
- Tasks run in parallel up to 100 by default; set a lower maximum if a backing resource requires it.

### Worker pools

No endpoint/URL, no requirement to listen on a port, no automatic scaling (manual, or CREMA with external metrics). Deploying or updating creates a new revision. With VPC connectivity each instance gets a VPC IP address.

### Instances (Preview)

Top-level singleton resource with a dedicated URL (can be disabled), restart policies `always`, `on-failure`, `never`, and a shared CPU model: burst budget, throttled to a 6.25% baseline outside it.

## Notes

- Source: https://docs.cloud.google.com/run/docs/resource-model (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)
- The resource-model page has no code block; the two gcloud commands are taken from https://docs.cloud.google.com/run/docs/deploying.
- `gcloud run services replace` replaces the whole service configuration with the YAML.
- If the exported file has `spec.template.metadata.name` (a revision name), delete it or set a new revision name before applying; revision names are immutable, so reusing the existing name with a changed configuration is rejected.
- The 7 days in the jobs "Lifecycle" row is the maximum task timeout per attempt (168 hours; 12 hours with GPUs); the create-jobs and task-timeout pages say there is no explicit timeout on the job execution itself (https://docs.cloud.google.com/run/docs/configuring/task-timeout).
- Source inconsistency: this page says tasks run in parallel "up to a maximum of 100" by default; the parallelism page says the maximum "varies depending on how many CPUs you are using" (https://docs.cloud.google.com/run/docs/configuring/parallelism) and the quotas page says it depends on region, CPU and memory (https://docs.cloud.google.com/run/quotas).
- Source inconsistency: this page's comparison table says worker pools scale manually or with "built-in autoscaling based on CPU utilization or Pub/Sub message backlog" (KEDA based external autoscaler); the container runtime contract says "Worker pools don't automatically scale" (https://docs.cloud.google.com/run/docs/container-contract), and the overview page points to the separate CREMA autoscaler (https://docs.cloud.google.com/run/docs/overview/what-is-cloud-run).
- Source inconsistency: this page says a task exceeding its maximum retries marks "the job as failed"; the create-jobs overview says the execution is marked failed "after Cloud Run has tried all of the tasks" (https://docs.cloud.google.com/run/docs/create-jobs).

## Related

- [what-is-cloud-run.md](./what-is-cloud-run.md)
- [container-contract.md](./container-contract.md)
- [quotas.md](./quotas.md)
