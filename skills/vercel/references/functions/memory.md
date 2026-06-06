# Configuring Memory and CPU

Determines how much memory and CPU a function can use. Configurable via the dashboard (Pro/Enterprise only); not configurable in `vercel.json`.

## Memory / CPU Types

| Type | Memory / CPU | Use Case |
|------|-------------|----------|
| Standard | 2 GB / 1 vCPU | Default; predictable performance for production |
| Performance | 4 GB / 2 vCPUs | Latency-sensitive apps, CPU-intensive SSR workloads |

## Limits by Plan

| Plan | Default | Maximum |
|------|---------|---------|
| Hobby | 2 GB / 1 vCPU | 2 GB / 1 vCPU (not configurable) |
| Pro | 2 GB / 1 vCPU | 4 GB / 2 vCPUs |
| Enterprise | 2 GB / 1 vCPU | 4 GB / 2 vCPUs |

## How to Configure

1. Dashboard: **Project Settings → Functions → Advanced Settings → Function CPU**
2. Select memory size (Standard or Performance)
3. Save — changes apply to all **future** deployments; must redeploy to take effect

## Notes

- Memory size **cannot** be set in `vercel.json`; attempting to do so produces a build-time warning
- Hobby users always use 2 GB / 1 vCPU (managed by Vercel on fluid compute, minimum 1 vCPU)
- Increasing memory also increases CPU allocation, which can reduce execution time for CPU-intensive tasks
- Projects created before 2019-11-08 have legacy defaults: 1024 MB / 0.6 vCPU (Hobby) or 3008 MB / 1.67 vCPU (Pro/Enterprise)
- Memory is not directly billed; it affects Provisioned Memory billing (GB × instance lifetime hours)

## Related

- [limitations.md](./limitations.md)
- [usage-and-pricing.md](./usage-and-pricing.md)
- [fluid-compute.md](./fluid-compute.md)
