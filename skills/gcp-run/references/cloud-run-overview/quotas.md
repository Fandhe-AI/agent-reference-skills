---
source: https://docs.cloud.google.com/run/quotas
---

# Cloud Run quotas and limits

Usage quotas and limits for resources, networking, and Cloud Run Admin API call rates. There is no direct limit on container image size or aggregate concurrent requests served by a service. Available quota does not guarantee resource availability in a region.

## Signature / Usage

Inspect a service's configuration (command from https://docs.cloud.google.com/run/docs/configuring/billing-settings); quota increases are requested in the console under IAM & Admin > Quotas & System Limits, or via Cloud Customer Care:

```bash
gcloud run services describe SERVICE --format=yaml
```

## Options / Props

### Resource limits

| Resource | Limit | Scope | Can be increased |
|---|---|---|---|
| Services | 1000 | per project and region | Yes |
| Jobs | 1000 | per project and region | Yes |
| Worker pools | 1000 | per project and region | Yes |
| Instances | 100 | per project and region | Yes |
| Instance max continuous execution before automatic restart (needs `always` or `on-failure` restart policy) | 7 days | per instance | No |
| Instance baseline CPU outside burst budget (shared CPU) | 6.25% | per instance | No |
| Running job executions | 1000 | per project and region | Yes |
| Revisions kept before non-addressable ones are auto-deleted (historical order) | 1000 | per service | No |
| Revisions serving traffic | 4000 | per project and region | Yes |
| Revision tags (excess: untargeted tags auto-deleted in historical order) | 2000 | per project and region | Yes |
| Retained completed job executions (older auto-deleted) | 1,000 | per job | No |
| Tasks running in parallel | Depends on region, CPU, memory; view in Quotas console | per job execution | Yes |
| Task timeout | 168 hours (7 days); 12 hours with GPUs | per job execution | No |
| Tasks in a single job | 10,000 | per job execution | No |
| Task retries in a job | 10 | per job execution | No |
| Environment variables per container | 1000 | per job or service | No |
| Command arguments per container | 1000 | per job or service | No |
| Container instances using Direct VPC egress | 100-200, depending on region | per revision and region | Yes |
| Startup timeout | 4 minutes | per container instance | No |
| Memory | 32 GiB | per container instance | No |
| vCPU | 8 | per container instance | No |
| Total CPU (milli vCPU) across instances over 1 minute | Depends on region | per project and region | Yes |
| Total memory (bytes) across instances over 1 minute | Depends on region | per project and region | Yes |
| GPU instances (with or without zonal redundancy) | 0 by default | per project per region | Yes |
| Writable in-memory file system (limited by instance memory) | 32 GiB | per container instance | No |
| Environment variable length | 32 Kb | per variable | No |
| Domain mapping SSL certificates | 50 | per top domain per week | No |
| Duplicate SSL certificates | 5 | per top domain per week | No |
| Unique access tokens generated | 50 | per container instance per second | No |
| Unique identity tokens generated | 50 | per container instance per second | No |
| Open files (`/proc/sys/fs/file-max`) | 25000 | per container instance | No |

Regional quotas (CPU, memory, GPU) also control the maximum `max-instances` for a revision and the maximum parallelism of a job once granted in a region. The Direct VPC egress regional quota does the same for revisions/jobs using Direct VPC egress. New projects creating services with L4 GPUs are granted 3 `NvidiaL4GpuAllocNoZonalRedundancyPerProjectRegion`; you can also request `NvidiaL4GpuAllocPerProjectRegion`. If peak GPU usage is far below quota, Google might decrease it.

### Request limits

| Resource | Limit | Scope | Notes |
|---|---|---|---|
| Services concurrent requests | 1,000 | per instance |  |
| Instances concurrent requests | 80 | per instance |  |
| Concurrent streams | 100 | per HTTP/2 client connection |  |
| Request timeout (services) | 60 minutes | per request |  |
| HTTP/1 request size | 32 MiB | per request | HTTP/1 server only; no limit with HTTP/2 server |
| HTTP/1 response size | 32 MiB | per response | Applies if not `Transfer-Encoding: chunked` or streaming |
| Open connections | 50,000 | per instance per egress type | Not Direct VPC egress |
| Outbound connections | 700 per second; 5,000 per minute | per instance | Not Direct VPC egress to the VPC network |
| Outbound DNS resolutions | 1,000 | per second per instance |  |
| Inbound requests | 800 | per second to an HTTP/1 container port per instance | Not HTTP/2 ports |

### Bandwidth limits (services and instances)

| Limit | Value | Notes |
|---|---|---|
| Egress over Direct VPC | 1 Gbps per instance | To destinations on the VPC network |
| Bits excluding Direct VPC egress | 600 Mbps per instance | Sum of ingress and egress |
| Packet rate excluding Direct VPC egress | 64,000 packets per second per instance | Sum of ingress and egress |

### Cloud Run Admin API rate limits

These do not apply to requests reaching deployed services.

| Quota | Limit | Can be increased | Scope |
|---|---|---|---|
| Admin API read requests | 3,000 per 60 seconds | Yes | per project and region |
| Admin API write requests | 180 per 60 seconds | Yes | per project and region |
| Job Run (executions of a job) | 180 per 60 seconds | Yes | per project and region |

## Notes

- To exceed a non-increasable per-project limit, create resources in another project or region.
- Source inconsistency: this page caps memory at 32 GiB and vCPU at 8 per container instance, while the GPU page requires at least 20 CPU and 80 GiB for NVIDIA RTX PRO 6000 instances (https://docs.cloud.google.com/run/docs/configuring/services/gpu).
- Source inconsistency: this page lists "Files opened" (`/proc/sys/fs/file-max`) as 25000 per container instance; the container runtime contract sets 25000 file descriptors per process and says second-generation `file-max` uses the default of about 10% of memory (https://docs.cloud.google.com/run/docs/container-contract).
- Source inconsistency: the "Tasks running in parallel" limit depends on region, CPU and memory here, while the resource model page says tasks run in parallel up to a maximum of 100 by default (https://docs.cloud.google.com/run/docs/resource-model).
- Quota adjustment requests are reviewed; batch requests by product and area to shorten review.
- Source: https://docs.cloud.google.com/run/quotas (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)
- The source page has no code block; the snippet is taken from https://docs.cloud.google.com/run/docs/configuring/billing-settings.

## Related

- [locations.md](./locations.md)
- [container-contract.md](./container-contract.md)
- [about-concurrency.md](./about-concurrency.md)
