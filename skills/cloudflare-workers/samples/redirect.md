---
source: https://developers.cloudflare.com/workers/examples/redirect/
---

# Redirect

Redirect requests from one domain to another while keeping the path and query string.

```js
export default {
	async fetch(request) {
		const base = "https://example.com";
		const statusCode = 301;

		const url = new URL(request.url);
		const { pathname, search } = url;

		const destinationURL = `${base}${pathname}${search}`;
		console.log(destinationURL);

		return Response.redirect(destinationURL, statusCode);
	},
};
```

## Notes

- `Response.redirect(url, status)` needs an absolute URL; build it from `new URL(request.url)` parts.
- The official page also shows the one-liner form that redirects every request to a single fixed URL.
- For many static redirects, see [bulk-redirects.md](./bulk-redirects.md); for static-asset redirect files, see `../references/static-assets/README.md`.
