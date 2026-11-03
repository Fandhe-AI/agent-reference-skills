---
source: https://developers.cloudflare.com/durable-objects/platform/known-issues/
---

# Known issues

Known issues with Durable Objects: global uniqueness guarantees, code updates, development tool limitations and local alarms.

## Signature / Usage

Snippet taken from https://developers.cloudflare.com/durable-objects/reference/faq/

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

## Notes

- Global uniqueness: only a single instance of a given class and ID runs at once worldwide, enforced when a new event starts and when storage is accessed. An event that runs long without touching storage may find the object no longer current; if it then accesses storage it receives an exception, and if it never does it may not realize. Objects can be replaced during network partitions or software updates (class code or the Workers system), and enabling `wrangler tail` or dashboard logs requires a software update.
- Code updates are released globally and eventually consistent: a request can reach the latest Worker, which calls an object still on an earlier version. A `deferred` strategy lets an active object run a previous version until it hibernates or hits `max_delay`; gradual deployments can extend the window, and deploying several versions before hibernation can skip intermediate versions. Keep Worker/object APIs forward and backward compatible.
- `wrangler tail` logs for requests upgraded to WebSockets are delayed until the WebSocket closes; do not attach it to a Worker with heavy traffic.
- Workers editor (dashboard): an object can only be reached by a preview request if the previewed Worker both exports the class and binds to it.
- Local development: current `wrangler dev` (local mode) persists Durable Object storage, like other local bindings, in `.wrangler/state` by default (`--persist-to` changes the path; see local-data in the cloudflare-wrangler skill). The upstream page's older statement, that `wrangler dev` writes are kept in memory and only persist with an explicit `script_name` (with a Wrangler warning), describes legacy remote-preview behaviour and should not be relied on for local development.
- Local alarms: alarm methods may fail after a hot reload; restart `wrangler dev` after editing code when using alarms. `wrangler` details are in the cloudflare-wrangler skill.

## Related

- [Code updates](./code-updates.md)
- [Troubleshooting](./troubleshooting.md)
- [Alarms](./alarms.md)
- [Durable Object lifecycle](./durable-object-lifecycle.md)
