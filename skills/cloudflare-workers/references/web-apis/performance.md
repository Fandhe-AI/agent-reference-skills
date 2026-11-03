---
source: https://developers.cloudflare.com/workers/runtime-apis/performance/
---

# Performance and timers

The Workers runtime supports a subset of the `Performance` API, used to measure timing and performance, including timing of subrequests and other operations.

## Signature / Usage

Time advances because a subrequest has occurred between start and end:

```typescript
const start = performance.now();
const response = await fetch("https://developers.cloudflare.com/");
const end = performance.now();
const timing = end - start; // duration of the subrequest to developers.cloudflare.com
```

Time is frozen (start has the exact same value as end):

```typescript
const start = performance.now();
for (let i = 0; i < 1e6; i++) {
  // do expensive work
}
const end = performance.now();
const timing = end - start; // 0
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `performance.now()` | number | Timestamp in milliseconds, the time elapsed since `performance.timeOrigin`. |
| `performance.timeOrigin` | number (read-only) | A baseline timestamp to base other measurements off of. In the Workers runtime it returns 0. |

## Notes

- When deployed to Cloudflare, as a Spectre mitigation, timer APIs including `performance.now()` and `Date.now()` only advance after I/O occurs. Wrapping a subrequest, a KV fetch, an R2 get or other I/O in these calls measures its timing.
- In local development timers increment regardless of I/O. To measure CPU-intensive code without I/O, run the Worker locally via Wrangler (workerd, the same runtime used when deployed).
- To measure CPU time of a deployed Worker, use Profiling in production rather than these timer APIs.

## Related

- [Scheduler](./scheduler.md)
- [Web standards](./web-standards.md)
