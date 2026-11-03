---
source: https://developers.cloudflare.com/durable-objects/observability/metrics-and-analytics/
---

# Metrics and analytics

Namespace-level and request-level Durable Object metrics, logs and analytics via the dashboard or the GraphQL Analytics API.

## Signature / Usage

Enable Durable Object logging in the Worker that defines the class:

```jsonc
{
    "observability": {
        "enabled": true
    }
}
```

```toml
[observability]
enabled = true
```

Adapted (not in the official docs): the official example is GraphQL shown in a `js` fence with `//` comments and no `query` wrapper; it is rewritten as a valid GraphQL document with `#` comments. See Notes.

```graphql
query {
  viewer {
    # Replace with your account tag, the 32 hex character id visible at the beginning of any url
    # when logged in to dash.cloudflare.com or under "Account ID" on the sidebar of the Workers & Pages Overview
    accounts(filter: {accountTag: "your account tag here"}) {
      # Replace dates with a recent date
      durableObjectsInvocationsAdaptiveGroups(filter: {date_gt: "2023-05-23"}, limit: 1000) {
        sum {
          # Any other fields found through introspection can be added here
          requests
          responseBodySize
        }
      }
      durableObjectsPeriodicGroups(filter: {date_gt: "2023-05-23"}, limit: 1000) {
        sum {
          cpuTime
        }
      }
      durableObjectsStorageGroups(filter: {date_gt: "2023-05-23"}, limit: 1000) {
        max {
          storedBytes
        }
      }
    }
  }
}
```

## Options / Props

### GraphQL datasets

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `durableObjectsInvocationsAdaptiveGroups` | dataset | — | Invocations; also WebSocket connection metrics once the connection closes, and incoming messages for Hibernation API sockets. |
| `durableObjectsPeriodicGroups` | dataset | — | Periodic metrics; incoming/outgoing WebSocket messages (non-hibernating) and `memoryUsageBytes`. |
| `durableObjectsStorageGroups` | dataset | — | Storage metrics such as `storedBytes`. |
| `durableObjectsSubrequestsAdaptiveGroups` | dataset | — | Subrequest metrics. |

### Memory usage fields

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `memoryUsageBytes` | metric | — | V8 isolate memory in bytes (dataset `durableObjectsPeriodicGroups`). |
| `quantiles.memoryUsageBytesP50` through `quantiles.memoryUsageBytesP999` | metric | — | Percentiles P50, P90, P99, P999, in bytes. |

## Notes

- Corrected from the official docs: the GraphQL example was labelled JavaScript, used `//` comments (invalid in GraphQL) and lacked the `query` operation wrapper.
- Dashboard: Durable Objects page, select a namespace, Metrics tab; time window defaults to 24 hours; filter to one object by ID or name. Metrics come from the GraphQL Analytics API (see https://developers.cloudflare.com/analytics/graphql-api/ and the Workers metrics tutorial for authentication). Use GraphQL introspection to discover fields.
- Memory usage chart: sampled periodically while objects are active; each isolate has a 128 MB limit. It is measured per isolate (which can host multiple objects of the same class plus Worker code), never per object. Unfiltered: percentiles across samples of all objects in the namespace; filtered: percentiles of samples reported for that object, still reflecting the whole isolate. Rising memory may indicate a leak; use DevTools memory profiling locally or a production Heap profile.
- Logs: set `observability.enabled` in the Worker defining the class, deploy, then use the namespace's Observability tab. Logs are aggregated by script name and class name. Retention and other limits follow Workers Logs.
- WebSockets span several datasets: connection in `durableObjectsInvocationsAdaptiveGroups` once it closes (long-lived connections often close only when the object terminates); messages in `durableObjectsPeriodicGroups`, or in `durableObjectsInvocationsAdaptiveGroups` when Hibernation is used.
- To identify a log entry's instance, filter on `$workers.durableObjectId`.
- Community Grafana starter: https://github.com/TimoWilhelm/grafana-do-dashboard

## Related

- [Troubleshooting](./troubleshooting.md)
- [In-memory state](./in-memory-state.md)
- [Data Studio](./data-studio.md)
- [Pricing](./pricing.md)
