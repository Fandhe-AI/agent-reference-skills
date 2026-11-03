---
source: https://developers.cloudflare.com/workers/observability/logs/real-time-logs/
---

# Real-time logs

Real-time logs give access to log events in near real-time for events happening globally, useful for immediate feedback such as the status of a new deployment. They capture invocation logs, custom logs, errors, and uncaught exceptions.

## Signature / Usage

View logs with `wrangler tail`; each log is a structured JSON object:

```json
{
	"outcome": "ok",
	"scriptName": null,
	"exceptions": [],
	"logs": [],
	"eventTimestamp": 1590680082349,
	"event": {
		"request": {
			"url": "https://www.bytesized.xyz/",
			"method": "GET",
			"headers": {},
			"cf": {}
		}
	}
}
```

Pipe the output to `jq`:

```sh
npx wrangler tail | jq .event.request.url
```

```sh
"https://www.bytesized.xyz/"
"https://www.bytesized.xyz/component---src-pages-index-js-a77e385e3bde5b78dbf6.js"
"https://www.bytesized.xyz/page-data/app-data.json"
```

## Notes

- Dashboard: **Workers & Pages** > your Worker > **Logs** > select **Live** in the right-hand navigation bar. CLI: run `npx wrangler tail` in the Worker project directory.
- Not available for zones on the Cloudflare China Network.
- Real-time logs do not store logs; use Workers Logs to persist them.
- High-traffic Workers may enter sampling mode: some messages are dropped and a warning appears. Filtering (dashboard or `wrangler tail`) helps mitigate drops.
- Logs from Durable Objects used by the Worker show up in the dashboard.
- A maximum of 10 clients can view a Worker's logs at one time (dashboard sessions and `wrangler tail` calls combined).
- With `wrangler tail` and WebSocket event handlers, `console.log` statements inside those handlers are hidden until the WebSocket client closes the connection, then all messages flush at once.
- To send logs to a third party use Workers Logpush or Tail Workers.

## Related

- [workers-logs.md](./workers-logs.md)
- [logpush.md](./logpush.md)
- [tail-workers.md](./tail-workers.md)
- [errors.md](./errors.md)
- [source-maps.md](./source-maps.md)
- [../commands/workers.md](../commands/workers.md)
