---
source: https://docs.cloud.google.com/model-armor/best-practices
---

# Best practices for scaling and high traffic

Guidance for running Model Armor in demanding environments: quotas, resilience, performance, and monitoring.

## Signature / Usage

The following Logs Explorer query lists Model Armor audit logs, useful for the log analysis the source recommends.

```text
protoPayload.serviceName="modelarmor.googleapis.com"
```

## Options / Props

| Area | Practice |
|---|---|
| Quotas and system limits | Contact Cloud Customer Care to request a Model Armor API quota adjustment before higher traffic; design the application to handle system limits gracefully, for example by chunking larger inputs. |
| Retries | Client-side retries with exponential backoff for retryable errors (rate limits, server errors). |
| Caching | If applicable, cache Model Armor responses for identical prompts, especially for common or less sensitive interactions; watch data freshness and security implications. |
| Asynchronous processing | For non-interactive workloads, queue requests and process them at a rate that respects API limits. |
| Graceful degradation | Handle Model Armor unavailability or errors with a fallback, or temporarily bypass certain checks while logging the failure. |
| Payload size | Send only the necessary data; avoid unnecessarily large prompts or files. |
| Template configuration | Include only the filters essential for your use case; unnecessary detectors can increase latency. |
| Region | Keep the application, data and requests in the same region to minimize latency. |
| Monitoring | Set up Cloud Monitoring alerts for approaching quota limits or high error rates; analyze Cloud Logging for usage patterns, errors and performance. |

## Notes

- Bypassing checks on failure (graceful degradation) is a trade-off: skipped screening means unscreened prompts or responses; log every bypass.
- Cached responses must not be shared across users or contexts when prompts or responses can contain sensitive data.
- The source page has no code. Snippet taken from https://docs.cloud.google.com/model-armor/configure-logging
- Source: https://docs.cloud.google.com/model-armor/best-practices (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [integrations.md](./integrations.md)
- [configure-logging.md](./configure-logging.md)
- [overview.md](./overview.md)
