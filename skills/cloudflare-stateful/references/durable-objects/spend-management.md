---
source: https://developers.cloudflare.com/durable-objects/platform/spend-management/
---

# Spending limits

An account-wide spending limit for Durable Objects. It applies across the account, not to one namespace or object. Configuration happens in the Cloudflare dashboard or the `cf` CLI (Billing > Spend Management), not in Wrangler configuration.

## Signature / Usage

The page has no code. Adapted (not in the official docs): the following handler reacts to the documented error message by treating it as a non-retryable failure.

```js
export default {
	async fetch(request, env) {
		const stub = env.MY_DURABLE_OBJECT.getByName("foo");
		try {
			return new Response(await stub.sayHello());
		} catch (e) {
			// Do not retry while the spending limit blocks the account.
			if (String(e?.message).includes("spending cap for Durable Objects")) {
				return new Response("Temporarily unavailable", { status: 503 });
			}
			throw e;
		}
	},
};
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| Requests and duration | counted charge | — | Usage charges after included usage count toward the limit. |
| SQLite rows read and written | counted charge | — | Counted. |
| Key-value storage reads, writes, deletes | counted charge | — | Counted. |
| Stored data and the shared Workers Paid fee | excluded | — | Not counted; stored data can keep incurring charges during a pause. |
| New requests through a stub | blocked | — | Rejected at the limit. |
| SQL queries (reads and writes) | blocked | — | Rejected. |
| SQLite storage growth | blocked | — | Rejected. |
| New alarms through `setAlarm()` | blocked | — | Rejected. |
| Pending alarms | held | — | Held until the block ends, subject to the seven-day limit. |

## Notes

- An affected operation can return `Exceeded the account's spending cap for Durable Objects.` A limit does not delete objects or stored data.
- Operations that can continue: requests already running (duration charges still accrue), messages on already-open WebSocket connections, key-value operations in legacy key-value-backed objects (counted but not blocked), and storage charges for existing data. Usage reporting and enforcement lag, so a limit does not guarantee a maximum invoice.
- Alarm recovery: held alarms do not use the normal retry budget. An alarm scheduled more than seven days ago is deleted while held; after service resumes, schedule it again if the work is still needed. Make alarm handlers idempotent and re-derive pending work from storage rather than assuming every alarm fires.
- Resume by raising the limit above current spend, turning it off, or removing it (changes take a few minutes). The block also expires at the next subscription billing period; the limit stays configured. Workers have a separate limit; restore a blocked calling Worker before retrying.
- Adapted (not in the official docs): the snippet only shows handling the documented error message; it matches on message text, which is not a stable error code.
- Source: https://developers.cloudflare.com/durable-objects/platform/spend-management/index.md (cloudflare-docs production 34d908a, fetched 2026-11-14)

## Related

- [Pricing](./pricing.md)
- [Limits](./limits.md)
- [Troubleshooting](./troubleshooting.md)
- [Alarms](./alarms.md)
