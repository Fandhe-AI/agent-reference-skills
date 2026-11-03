---
source: https://developers.cloudflare.com/d1/best-practices/read-replication/
---

# Global read replication

D1 read replication lowers read latency and scales read throughput by adding asynchronously replicated, read-only copies (read replicas) across regions. You must use the D1 Sessions API (`withSession`), otherwise all queries run on the primary database instance.

## Signature / Usage

```ts
export default {
  async fetch(request, env, ctx): Promise<Response> {
    const url = new URL(request.url);

    // A. Create the Session.
    // When we create a D1 Session, we can continue where we left off from a previous
    // Session if we have that Session's last bookmark or use a constraint.
    const bookmark =
      request.headers.get("x-d1-bookmark") ?? "first-unconstrained";
    const session = env.DB01.withSession(bookmark);

    try {
      // Use this Session for all our Workers' routes.
      const response = await withTablesInitialized(
        request,
        session,
        handleRequest,
      );

      // B. Return the bookmark so we can continue the Session in another request.
      response.headers.set("x-d1-bookmark", session.getBookmark() ?? "");

      return response;
    } catch (e) {
      console.error({
        message: "Failed to handle request",
        error: String(e),
        errorProps: e,
        url,
        bookmark,
      });
      return Response.json(
        { error: String(e), errorDetails: e },
        { status: 500 },
      );
    }
  },
} satisfies ExportedHandler<Env>;
```

Session start modes:

```ts
const session = env.DB.withSession() // synchronous
// query executes on either primary database or a read replica
const result = await session
	.prepare(`SELECT * FROM Customers WHERE CompanyName = 'Bs Beverages'`)
	.run()
```

```ts
const session = env.DB.withSession(`first-primary`) // synchronous
// query executes on primary database
```

```ts
// retrieve bookmark from previous session stored in HTTP header
const bookmark = request.headers.get('x-d1-bookmark') ?? 'first-unconstrained';

const session = env.DB.withSession(bookmark)
const result = await session
	.prepare(`SELECT * FROM Customers WHERE CompanyName = 'Bs Beverages'`)
	.run()
// store bookmark for a future session
response.headers.set('x-d1-bookmark', session.getBookmark() ?? "")
```

Check where a request was processed:

```ts
const result = await env.DB.withSession()
	.prepare(`SELECT * FROM Customers WHERE CompanyName = 'Bs Beverages'`)
	.run();
console.log({
  servedByRegion: result.meta.served_by_region ?? "",
  servedByPrimary: result.meta.served_by_primary ?? "",
});
```

Enable / disable / check via REST API (`D1:Edit` for PUT, `D1:Read` for GET):

```sh
curl -X PUT "https://api.cloudflare.com/client/v4/accounts/{account_id}/d1/database/{database_id}" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"read_replication": {"mode": "auto"}}'
```

Use `{"read_replication": {"mode": "disabled"}}` to disable. `GET` the same endpoint returns `read_replication.mode` (`auto` = enabled, `disabled` = disabled).

## Options / Props

| Instance type | Description | Write queries | Read queries |
| --- | --- | --- | --- |
| Primary database instance | Contains the "original" copy | Can serve write queries | Can serve read queries |
| Read replica database instance | Copy that asynchronously receives updates from the primary | Forwards write queries to the primary | Can serve read queries from its own copy |

Session starts: `withSession()` = `withSession("first-unconstrained")` (any instance; best when the latest version is not required); `withSession("first-primary")` (latest data, first query to primary); `withSession(bookmark)` (at least as up-to-date as the bookmark).

## Notes

- Enable in the dashboard: D1 > database > Settings > Enable Read Replication, or via REST (`read_replication.mode: auto`).
- All write queries are still forwarded to the primary. Read replication only improves read response time.
- Replicas are created in every supported region, including the primary's region: ENAM, WNAM, WEUR, EEUR, APAC, OC. Locations are subject to change.
- Sessions API gives sequential consistency using bookmarks (global order of operations; the replica waits until it is at least as up-to-date as the bookmark). Properties: monotonic reads, monotonic writes, writes follow reads, read my own writes.
- `served_by_region` and `served_by_primary` are present for all remote D1 requests (with or without replication or Sessions API); they are `undefined` under `wrangler dev`.
- Disabling takes up to 24 hours for replicas to stop processing requests. Sessions API works with databases without read replication, so it is safe to keep the code.
- Pricing: no extra storage or compute cost; billing is the same `rows_read` / `rows_written` usage.
- Known limitation: the Sessions API is only available via the D1 Worker Binding, not the REST API.
- To demo worst-case latency, set the location hint to a far region (e.g. create in WNAM if you are in Europe).

## Related

- [D1Database](./d1-database.md)
- [Time Travel and backups](./time-travel.md)
- [Data location](./data-location.md)
- [Return objects](./return-objects.md)
- [Pricing](./pricing.md)
