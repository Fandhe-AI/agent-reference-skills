---
source: https://developers.cloudflare.com/workers/observability/metrics-and-analytics/
---

# Metrics and analytics

Two graphical sources of Workers traffic information: per-Worker Workers metrics and zone-based Workers analytics. Metrics are powered by GraphQL.

## Signature / Usage

Snippet taken from https://developers.cloudflare.com/workers/observability/logs/tail-workers/#use-analytics-engine-for-aggregated-metrics (writing custom analytics to Workers Analytics Engine, referenced by this page for custom metrics).

```js
export default {
	async tail(events, env) {
		for (const event of events) {
			env.ANALYTICS.writeDataPoint({
				blobs: [event.scriptName, event.outcome],
				doubles: [1],
				indexes: [event.event?.request?.cf?.colo ?? "unknown"],
			});
		}
	},
};
```

## Options / Props

Invocation statuses (**Workers & Pages** > your Worker > **Summary** graph in **Metrics** > **Errors**):

| Invocation status | Definition | Workers error code | GraphQL field |
| --- | --- | --- | --- |
| Success | Worker executed successfully |  | `success` |
| Client disconnected | HTTP client (that is, the browser) disconnected before the request completed |  | `clientDisconnected` |
| Worker threw exception | Worker threw an unhandled JavaScript exception | 1101 | `scriptThrewException` |
| Exceeded resources | Worker exceeded runtime limits | 1102, 1027 | `exceededResources` |
| Internal error | Workers runtime encountered an error |  | `internalError` |

## Notes

- Workers metrics aggregate request data for an individual Worker (across all its domains and `*.workers.dev`). View: **Workers & Pages** > **Overview** > select your Worker.
- Requests graph: Total (all incoming requests; requests blocked by WAF or other security features are not counted), Success (Success or Client Disconnected status), Errors (Script Threw Exception, Exceeded Resources, or Internal Error). Data may drop off near the last few minutes for ranges under six hours because of aggregation delay.
- Subrequests: requests triggered by `fetch` from within a Worker; an uncaught-error subrequest is not counted. Total / Cached / Uncached.
- Wall time per execution: elapsed ms from invocation start until the runtime determines no more JavaScript needs to run, including I/O wait and `waitUntil()` time. Not the same as time to send the final byte. Quantiles use reservoir sampling.
- CPU Time per execution: quantiles via reservoir sampling; higher quantiles may appear to exceed CPU time limits without errors because of rollover CPU time for requests below the limit.
- Execution duration (GB-seconds): duration per Worker invocation, shown in quantiles.
- Memory usage: V8 isolate memory at each invocation (P50, P90, P99, P999). Isolates have a 128 MB limit shared across concurrent requests; deployment markers help detect regressions. Upward trend may indicate a leak; use DevTools memory profiling locally.
- Exceeded Resources is most commonly excessive CPU time, but also exceeding startup time or free tier limits. Internal Error is a runtime failure not caused by Worker code or limits, not counted towards billing; check https://www.cloudflarestatus.com if elevated.
- Investigate exceptions with `wrangler tail`.
- Request duration chart: only available with Smart Placement enabled; compares requests with Smart Placement enabled vs disabled (by default 1% are routed with it disabled), from entering a data center until response delivery.
- Metrics retention: up to three months in the past, in maximum increments of one week.
- Zone analytics aggregate request data for all Workers on routes defined for a zone (dashboard: zone **Workers Analytics** page; last 30 days): Subrequests by cache status, Bandwidth by cache status, Status codes, Total requests (200-level successful, 400 to 500-level failed).
- GraphQL: see the "Querying Workers Metrics with GraphQL" tutorial (https://developers.cloudflare.com/analytics/graphql-api/tutorials/querying-workers-metrics/).
- Custom analytics: use Workers Analytics Engine (https://developers.cloudflare.com/analytics/analytics-engine/) for custom business metrics, per-customer analytics, usage-based billing and performance tracking. Writes are non-blocking; query via the SQL API or Grafana. Example: https://developers.cloudflare.com/workers/examples/analytics-engine/.

## Related

- [errors.md](./errors.md)
- [devtools.md](./devtools.md)
- [memory-profiling.md](./memory-profiling.md)
- [tail-workers.md](./tail-workers.md)
