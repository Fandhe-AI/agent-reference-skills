---
source: https://docs.cloud.google.com/run/docs/about-concurrency
---

# About concurrency

Each Cloud Run service revision autoscales to the number of instances needed. The maximum concurrent requests per instance setting caps how many requests one instance processes simultaneously.

## Signature / Usage

The source page has no commands; the page only links to the setting procedure. Python (3.8+) source deployments should set the thread count equal to concurrency via a runtime environment variable, for example `THREADS=8`. Example of setting env vars on deploy (command from https://docs.cloud.google.com/run/docs/deploying, multi-container form shows `--set-env-vars`):

```bash
gcloud run deploy SERVICE \
  --container CONTAINER_1_NAME \
  --image='INGRESS_IMAGE' \
  --set-env-vars=KEY=VALUE \
  --port='CONTAINER_PORT' \
  --container SIDECAR_CONTAINER_NAME \
  --image='SIDECAR_IMAGE' \
  --set-env-vars=KEY_N=VALUE_N
```

## Options / Props

| Item | Value |
|---|---|
| Maximum concurrent requests per instance | Up to 1,000 |
| Default (gcloud CLI / Terraform) | 80 times the number of vCPUs; applies only when a new service is created, not to later revisions |
| Default (console) | 80 |
| Concurrency of 1 | Use when each request uses most CPU/memory, or the container relies on global state two requests cannot share; hurts scaling (many instances start for a spike) |
| Source deployments | Start low (for example 8) and move up; Cloud Run does not isolate concurrent requests in one instance, your code must be concurrency-safe |

### Tuning

- Lower concurrency: more instances for the same load; better responsiveness for apps not optimized for internal parallelism.
- Higher concurrency: fewer instances, lower cost; suits parallel I/O-bound work or code that uses multiple vCPUs.
- The value is a maximum: with high CPU utilization Cloud Run may send fewer requests to an instance, or scale out instead.
- Multi-vCPU with a single-threaded app creates vCPU hotspots: average CPU stays low so CPU-based scaling is ineffective; lowering max concurrency drives scaling by request throughput instead.
- Node.js is single-threaded: use asynchronous code to benefit from concurrency.
- Python 3.8+: set `THREADS` equal to the concurrency value.
- Case study (400 clients, 3 requests/s each): concurrency 80 needs far fewer instances than concurrency 1.

## Notes

- Snippet taken from https://docs.cloud.google.com/run/docs/deploying (source page has no code); this is a substitute command shape, not part of the concurrency page.
- Source inconsistency: this page gives the gcloud CLI / Terraform default for a new service as 80 times the number of vCPUs (console: 80); the configuring concurrency page (https://docs.cloud.google.com/run/docs/configuring/concurrency) says the default is 80.
- Higher concurrency can reduce cost because fewer instances allocate CPU and memory.
- Source: https://docs.cloud.google.com/run/docs/about-concurrency (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)

## Related

- [about-instance-autoscaling.md](./about-instance-autoscaling.md)
- [container-contract.md](./container-contract.md)
