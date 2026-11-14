---
source: https://developers.cloudflare.com/pages/functions/debugging-and-logging/
---

# Debugging and logging

Stream Functions logs with `wrangler pages deployment tail` or the Cloudflare dashboard.

## Signature / Usage

```js
export async function onRequest(context) {
	console.log(
		`[LOGGING FROM /hello]: Request came from ${context.request.url}`,
	);

	return new Response("Hello, world!");
}
```

After deploying, run `wrangler pages deployment tail` in the project directory, then hit the route. Each log entry is structured JSON:

```js
{
  "outcome": "ok",
  "scriptName": null,
  "exceptions": [
    {
      "stack": "    at src/routes/index.tsx17:4\n    at new Promise (<anonymous>)\n",
      "name": "Error",
      "message": "An error has occurred",
      "timestamp": 1668542036110
    }
  ],
  "logs": [],
  "eventTimestamp": 1668542036104,
  "event": {
    "request": {
      "url": "https://pages-fns.pages.dev",
      "method": "GET",
      "headers": {},
      "cf": {}
    },
    "response": {
      "status": 200
    }
  },
  "id": 0
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| Limit: persistence | — | — | Logs are not stored; streams can be started and stopped but do not persist. |
| Limit: request rate | — | — | Logs do not display if the Function's requests per second are over 100 for the last five minutes. |
| Limit: viewers | — | — | At most 10 clients (dashboard sessions plus `wrangler pages deployment tail` calls) per deployment. |

## Notes

- Cloudflare recommends Workers (with static assets) for new projects — see the cloudflare-workers skill (static-assets, including migrate-from-pages). `pages deployment tail` options are in the cloudflare-wrangler skill (commands/pages.md).
- Dashboard: **Workers & Pages** > project > deployment > **View details** > **Functions**. Available on Free, Paid and Enterprise.
- Debugging canceled requests to a bound Worker (Client Disconnected): log the same request ID in the Pages Function and the Worker (pass a self-created ID to the Worker in a request header); start live log streams for both the Pages deployment and the Worker before reproducing; save the JSON output of both (Pages logs are not stored); find the request in both logs by ID and UTC time and compare `outcome`, HTTP status and `exceptions`, keeping the Pages deployment and Worker version with the saved logs. Seeing Client Disconnected in both logs does not tell you which service canceled first. If an entry is missing, check the logging limits before assuming the request never arrived. The Workers-side procedure is "Find out why a request was canceled" under service bindings (cloudflare-workers skill).
- Source: https://developers.cloudflare.com/pages/functions/debugging-and-logging/ (fetched 2026-11-14, cloudflare-docs 34d908a)
- Logs from bound Durable Objects show up in the dashboard.
- Logs help with failed requests, uncaught exceptions, custom `console.log`s and production issues.
- Source maps give stack traces matching original source. Build tools often emit source maps for both client and server: emit only server source maps or strip client ones, since public source maps may expose application source.

## Related

- [source-maps.md](./source-maps.md)
- [metrics.md](./metrics.md)
- [local-development.md](./local-development.md)
