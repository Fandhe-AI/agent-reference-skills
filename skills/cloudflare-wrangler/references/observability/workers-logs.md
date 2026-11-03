---
source: https://developers.cloudflare.com/workers/observability/logs/workers-logs/
---

# Workers Logs

Workers Logs automatically collects, stores, filters, and analyzes logging data emitted from Workers. Data is written to your Cloudflare account and queried in the dashboard. All newly created Workers come with the observability setting enabled by default.

## Signature / Usage

Minimum required Wrangler version: 3.78.6. Add the observability setting to the Worker's Wrangler file and redeploy.

```jsonc
{
  "observability": {
    "enabled": true,
    "head_sampling_rate": 1 // optional. default = 1.
  }
}
```

```toml
[observability]
enabled = true
head_sampling_rate = 1
```

Enabling with environments (e.g. `staging`), then deploy with `npx wrangler deploy -e staging` and repeat for each environment:

```jsonc
{
  "env": {
    "staging": {
      "observability": {
        "enabled": true,
        "head_sampling_rate": 1 // optional
      }
    }
  }
}
```

```toml
[env.staging.observability]
enabled = true
head_sampling_rate = 1
```

Invocation logs can be disabled with `invocation_logs = false`:

```jsonc
{
	"observability": {
		"logs": {
			"invocation_logs": false
		}
	}
}
```

```toml
[observability.logs]
invocation_logs = false
```

Custom logs: any `console.log` statement is visible in Workers Logs.

```js
export default {
	async fetch(request) {
		const { cf } = request;
		const { city, country } = cf;

		console.log(`Request came from city: ${city} in country: ${country}`);

		return new Response("Hello worker!", {
			headers: { "content-type": "text/plain" },
		});
	},
};
```

Head-based sampling (valid range 0 to 1; default 1):

```jsonc
{
	"observability": {
		"enabled": true,
		"head_sampling_rate": 0.01 // 1% sampling rate
	}
}
```

```toml
[observability]
enabled = true
head_sampling_rate = 0.01
```

## Options / Props

Invocation log messages by handler (invocation logs are identified by `$cloudflare.$metadata.type = "cf-worker-event"`):

| Invocation Handler | Invocation Message |
| --- | --- |
| Alarm | \<Scheduled Time> |
| Email | \<Email Recipient> |
| Fetch | \<Method> \<URL> |
| Queue | \<Queue Name> |
| Cron | \<UNIX-cron schedule> |
| Tail | tail |
| RPC | \<RPC method> |
| WebSocket | \<WebSocket Event Type> |

Limits:

| Description | Limit |
| --- | --- |
| Maximum log retention period | 7 Days |
| Maximum logs per account per day | 5 Billion |
| Maximum log size | 256 KB |

Pricing (included in both Free and Paid Workers plans):

|  | Log Events Written | Retention |
| --- | --- | --- |
| **Workers Free** | 200,000 per day | 3 Days |
| **Workers Paid** | 20 million included per month <br> +$0.60 per additional million | 7 Days |

## Notes

- Logs include invocation logs, custom logs, errors, and uncaught exceptions. View them in the dashboard: **Workers & Pages** > your Worker > **Observability**.
- Log in JSON: `console.log({user_id: 123})` indexes the key `user_id` (filterable), whereas `console.log("user_id: " + 123)` yields only `{message: "user_id: 123"}` requiring text match. `console.log({user_id: 123, user_email: "a@example.com"})` indexes both keys.
- Daily limit of 5 billion logs per account: after exceeding it, a 1% head-based sample applies for the rest of the day. Logs over 256 KB are truncated and `$cloudflare.truncated` is set to true.
- Beginning December 1, 2026, Workers Logs will use Cloudflare Observability pricing (https://developers.cloudflare.com/observability/pricing/); until then the pricing above applies.
- Pricing example: 15 million requests/month with 1 invocation log + 1 `console.log` each at `head_sampling_rate` 1 costs $6.00 (((15,000,000 * 2 * 100%) - 20,000,000 included) / 1,000,000 * $0.60). 1 billion requests/month at 0.1 costs $108.00.
- To send logs to a third party, use OpenTelemetry export (recommended), Workers Logpush, or Tail Workers. To group exceptions and failed invocations, use Workers Issues.
- Service Workers syntax is deprecated; use Module Workers.

## Related

- [real-time-logs.md](./real-time-logs.md)
- [opentelemetry-export.md](./opentelemetry-export.md)
- [logpush.md](./logpush.md)
- [tail-workers.md](./tail-workers.md)
- [source-maps.md](./source-maps.md)
- [issues.md](./issues.md)
- [query-builder.md](./query-builder.md)
- [../configuration/observability.md](../configuration/observability.md)
- [../configuration/environments.md](../configuration/environments.md)
