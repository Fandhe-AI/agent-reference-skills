---
source: https://docs.cloud.google.com/stackdriver/docs/solutions/slo-monitoring/sli-metrics/overview
---

# Creating SLIs from Metrics: Overview

Reviews what a service-level indicator (SLI) is, what makes a good one, how SLI specifications differ from implementations, and when to use multiple SLIs (bucketing). It points to the service-specific SLI examples (load balancing, platform metrics, logs-based metrics, Prometheus, OpenCensus).

## Signature / Usage

### Example basic availability SLI

This page has no code block. The block below is a verbatim basic availability SLI from the SLO API structures page.

```json
{
  "basicSli": {
    "availability": {},
    "location": [
      "us-central1-c"
    ]
  }
}
```

## Options / Props

### Properties of a good SLI

| Property | Meaning |
|----------|---------|
| Good proxy for user happiness | The SLI changes when an event affects user happiness and does not change otherwise. |
| Monotonic and linear scaling | If the SLI improves, user happiness improves by a corresponding amount. |
| Ranges from 0% to 100% | 100% means everything works, 0% nothing works; an SLO is then a percentage target such as 99.9%. |

### SLI implementation trade-offs

| Characteristic | Meaning |
|----------------|---------|
| Fidelity | How accurately it captures user experience |
| Coverage | What proportion of user interactions are measured |
| Cost | Money and engineering time to build and maintain |

### Example implementations of a page-loading SLI

| Implementation |
|----------------|
| Latency field of the application server's request log |
| Metrics exported by the application server |
| Metrics exported by a load balancer in front of the application servers |
| Black-box monitoring service sending artificial requests |
| Application-specific code in the customer's browser |

## Notes

- Recommended starting measurement window: 28 days (balance between tactical and strategic use). Alerting policies typically use the most recent hour.
- Promises (basis for SLIs and error budgets): for example an HTTP `200` response, a gRPC response in under 100 ms, serving data refreshed within the past 10 minutes.
- Bucketing: use multiple SLIs when a service handles different tasks (read vs write requests) or one task with different outcomes (fast errors vs slow errors vs slow successes); the SLI metric usually has a label to classify values.
- Browser-based measurement improves fidelity but also includes the user's connection latency, which may not be actionable.
- Next pages named in the source: Cloud Load Balancing metrics, Google Cloud platform and service metrics (data storage and retrieval, data-processing), logs-based metrics, Prometheus, OpenCensus (URLs under `https://docs.cloud.google.com/stackdriver/docs/solutions/slo-monitoring/sli-metrics/`).
- Source: https://docs.cloud.google.com/stackdriver/docs/solutions/slo-monitoring/sli-metrics/overview (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)
- Snippet taken from https://docs.cloud.google.com/stackdriver/docs/solutions/slo-monitoring/api/api-structures

## Related

- [slo-monitoring.md](./slo-monitoring.md)
- [api-structures.md](./api-structures.md)
