---
source: https://docs.cloud.google.com/run/docs/about-instance-autoscaling
---

# About instance autoscaling in Cloud Run services

Cloud Run autoscaling adjusts the number of container instances per service revision to match requests, events, and CPU utilization, and scales to zero when idle. It combines metrics-based scaling and on-demand scaling.

## Signature / Usage

Page has no commands. To keep the CPU allocated for background work, use instance-based billing (command from https://docs.cloud.google.com/run/docs/configuring/billing-settings):

```bash
gcloud run services update SERVICE --no-cpu-throttling 
```

## Options / Props

### Scaling drivers (metrics-based)

The autoscaler computes the recommended count per driver independently and takes the maximum.

| Driver | Calculation |
|---|---|
| CPU utilization | Average CPU usage per second over 1 minute, divided by CPUs per instance, divided by the CPU target (rounded up) |
| Request concurrency | max(average concurrent requests over 1 minute, over 10 minutes) divided by maximum concurrency, divided by the concurrency target (rounded up) |
| Adaptive concurrency tuning (ACT) | Uses each instance's ACT value instead of the configured maximum concurrency, based on 1-minute average concurrency |

- Memory utilization is not a scaling driver.
- Default CPU and concurrency target: 60%. Custom targets via scaling controls.
- Scale up: instance count unchanged while utilization stays within 10% (relative) of target (54-66% at the 60% default); otherwise recalculated and rounded up (a need for 4.1 instances runs 5).
- Scale down: only when utilization drops more than 10% below target. Recommended instances get traffic first; deprioritized instances shut down in order: group one when utilization over a 1-minute window is below 10%; group two after a 15-minute idle timeout.
- Set minimum instances to at least 1 if the service uses CPU outside request processing (background threads, async tasks).

### On-demand scaling

Used when no instance is available for a request; the only driver for scaling from zero. A request pends for up to 10 seconds or 3.5 times the predicted cold start time (whichever is higher) before a new instance starts.

### ACT

- Each time CPU utilization over the past second exceeds 90%, ACT lowers the instance's max concurrent requests by 1.
- If the instance hits its limit and CPU stays under 70% for 1 second, ACT raises it by 1.
- Values are computed per deployment and not persisted. The `scaling_driver` field in the console shows when ACT drives scaling.

### Instance-based billing

- Scaling from zero can only be triggered by a request; set min instances > 0 or add a wake-up request.
- Scale to zero is decided by whether the instance is processing a request.

### Maximum instances

- All services get a default maximum instances limit; set and monitor it for cost and backing-service protection.
- When the limit is hit, requests pend up to 3.5 times average startup time or 10 seconds (greater), then fail with `429`.
- The limit is per revision and an upper bound, not a guarantee of reaching it; Cloud Run may throttle scaling in exceptional circumstances.
- It can be exceeded briefly (a few times per week) during traffic spikes or maintenance: grace period usually up to 15 minutes or the request timeout; extra instances destroyed within 15 minutes of idle; usually under twice the limit. Load tests exceed it more. Set a safety margin if that is unacceptable.
- Traffic splits and deployments can exceed the per-revision limit in total instance count (new revision instances start before traffic shifts).

### Idle instances

Instances may stay idle up to 15 minutes (10 minutes for GPUs) to reduce cold starts; use `min-instance` to keep them permanently (incurs cost). Default billing is request-based.

### Other

- Backing services (for example Cloud SQL API quota) may hit limits as instances grow; set max instances.
- Pub/Sub: Google recommends push subscriptions, which are received as HTTP requests and trigger the same autoscaling.
- Sidecars: instance CPU allocation is the sum of container CPU limits; utilization is the percentage of allocated CPU in use.

## Notes

- Source: https://docs.cloud.google.com/run/docs/about-instance-autoscaling (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)
- Snippet taken from https://docs.cloud.google.com/run/docs/configuring/billing-settings (source page has no code).

## Related

- [about-concurrency.md](./about-concurrency.md)
- [billing-settings.md](./billing-settings.md)
- [container-contract.md](./container-contract.md)
