---
source: https://developers.cloudflare.com/workers/observability/logs/tail-workers/
---

# Tail Workers

A Tail Worker receives information about the execution of other Workers (producer Workers), such as HTTP statuses, data passed to `console.log()` or uncaught exceptions, for alerts, debugging, or analytics.

## Signature / Usage

Tail Worker with a `tail()` handler that sends data to an HTTP endpoint:

```js
export default {
	async tail(events) {
		fetch("https://example.com/endpoint", {
			method: "POST",
			body: JSON.stringify(events),
		});
	},
};
```

Add to the producer Worker's Wrangler file:

```jsonc
{
	"tail_consumers": [
		{
			"service": "<TAIL_WORKER_NAME>"
		}
	]
}
```

```toml
[[tail_consumers]]
service = "<TAIL_WORKER_NAME>"
```

Example of what the `events` object may look like:

```json
[
	{
		"scriptName": "Example script",
		"outcome": "exception",
		"eventTimestamp": 1587058642005,
		"event": {
			"request": {
				"url": "https://example.com/some/requested/url",
				"method": "GET",
				"headers": {
					"cf-ray": "57d55f210d7b95f3",
					"x-custom-header-name": "my-header-value"
				},
				"cf": {
					"colo": "SJC"
				}
			}
		},
		"logs": [
			{
				"message": ["string passed to console.log()"],
				"level": "log",
				"timestamp": 1587058642005
			}
		],
		"exceptions": [
			{
				"name": "Error",
				"message": "Threw a sample exception",
				"timestamp": 1587058642005
			}
		],
		"diagnosticsChannelEvents": [
			{
				"channel": "foo",
				"message": "The diagnostic channel message",
				"timestamp": 1587058642005
			}
		]
	}
]
```

Aggregated metrics with Workers Analytics Engine from a Tail Worker:

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

## Notes

- Available to all customers on the Workers Paid and Enterprise tiers. Billed by CPU time, not by number of requests.
- A Tail Worker is invoked automatically after the producer Worker finishes executing. Events across the request lifecycle, including sub-requests via Service Bindings and Dynamic Dispatch, are included. Events can be filtered, reformatted and sent to any HTTP endpoint (or KV / a database).
- Workers listed in `tail_consumers` must have a `tail()` handler defined.
- If you only export logs and errors to Sentry, Grafana, Honeycomb and the like, you may not need Tail Workers: use OpenTelemetry export instead (a destination receives batches rather than events after each invocation). Tail Workers are the advanced-mode option for custom processing.
- Tail handler API details (`tail()`) are covered by the cloudflare-workers skill.

## Related

- [opentelemetry-export.md](./opentelemetry-export.md)
- [workers-logs.md](./workers-logs.md)
- [real-time-logs.md](./real-time-logs.md)
- [source-maps.md](./source-maps.md)
- [errors.md](./errors.md)
- [../configuration/bindings-services-dispatch.md](../configuration/bindings-services-dispatch.md)
