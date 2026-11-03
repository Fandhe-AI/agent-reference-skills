---
source: https://developers.cloudflare.com/workers/testing/miniflare/developing/live-reload/
---

# Live Reload (Miniflare)

With `liveReload: true`, Miniflare refreshes the browser automatically when the Worker script changes.

## Signature / Usage

```js
const mf = new Miniflare({
	liveReload: true,
});
```

```js
export default {
	fetch() {
		const body = `
      <!DOCTYPE html>
      <html>
      <body>
        <p>Try update me!</p>
      </body>
      </html>
    `;

		return new Response(body, {
			headers: { "Content-Type": "text/html; charset=utf-8" },
		});
	},
};
```

## Notes

- The live-reload `<script>` tag is only injected at the end of responses with `Content-Type: text/html`.

## Related

- [get-started.md](./get-started.md)
- [debugger.md](./debugger.md)
