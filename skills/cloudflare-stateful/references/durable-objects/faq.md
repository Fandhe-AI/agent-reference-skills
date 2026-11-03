---
source: https://developers.cloudflare.com/durable-objects/reference/faq/
---

# FAQs

Answers on Durable Objects pricing, limits, CPU, storage-full behavior and log identification.

## Signature / Usage

Raise the CPU limit per invocation:

```jsonc
{
	// ...rest of your configuration...
	"limits": {
		"cpu_ms": 300000, // 300,000 milliseconds = 5 minutes
	},
	// ...rest of your configuration...
}
```

Handle a full database (SQLite-backed):

```ts
try {
	this.ctx.storage.sql.exec(
		"INSERT INTO my_table (key, value) VALUES (?, ?)",
		key,
		value,
	);
} catch (e) {
	if (e.message.includes("SQLITE_FULL")) {
		// Storage limit reached — reads and deletes still work
		// Consider deleting old data or returning a meaningful error to the caller
	}
	throw e;
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `limits.cpu_ms` | `number` (ms) | 30,000 (30 s) | Max CPU time per Durable Object invocation (HTTP request, WebSocket message or alarm). Applies to all objects of the definition. |
| `$workers.durableObjectId` | log field | — | Instance ID in Durable Object request logs; filter on it to isolate an instance. |

## Notes

- Duration charges: incurred while actively executing JavaScript, or when idle but not meeting the hibernation conditions. An idle object that qualifies for hibernation does not incur duration charges, even in the brief window before hibernating. Evicted objects are recreated (constructor runs again).
- An empty SQLite database uses about 12 KB; empty tables use at least a few KB depending on width. Writes to a SQLite-backed object store nominal metadata in internal tables, counted as billable storage until `deleteAll()`.
- A single object has a soft limit of 1,000 requests per second; unlimited objects per namespace. Simple small `get()` calls reach higher throughput than large JSON (de)serialization or multiple `list()` calls. Excess requests are queued then fail with an overloaded error.
- No account-wide storage limit for SQLite-backed objects on Workers Paid; 10 GB per SQLite-backed object on Paid, 1 GB on Free.
- CPU limit is active processing time, excluding waiting on network, storage or other I/O. `limits.cpu_ms` is a Worker setting (see the cloudflare-wrangler skill).
- At the storage limit, writes (`INSERT`, `UPDATE`, `put()`, `sql.exec()` writes) fail with `database or disk is full: SQLITE_FULL`; reads and `DELETE` still work.

## Related

- [Limits](./limits.md)
- [Pricing](./pricing.md)
- [Troubleshooting](./troubleshooting.md)
- [Metrics and analytics](./metrics-and-analytics.md)
