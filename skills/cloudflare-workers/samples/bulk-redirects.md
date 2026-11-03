---
source: https://developers.cloudflare.com/workers/examples/bulk-redirects/
---

# Bulk redirects

Redirect requests to certain URLs based on a path-to-URL map and pass everything else through.

```js
export default {
	async fetch(request) {
		const externalHostname = "examples.cloudflareworkers.com";

		const redirectMap = new Map([
			["/bulk1", "https://" + externalHostname + "/redirect2"],
			["/bulk2", "https://" + externalHostname + "/redirect3"],
			["/bulk3", "https://" + externalHostname + "/redirect4"],
			["/bulk4", "https://google.com"],
		]);

		const requestURL = new URL(request.url);
		const path = requestURL.pathname;
		const location = redirectMap.get(path);

		if (location) {
			return Response.redirect(location, 301);
		}
		// If request not in map, return the original request
		return fetch(request);
	},
};
```

## Notes

- Unmatched paths fall through to `fetch(request)`, i.e. the origin.
- The map is rebuilt on each request in this sample; hoist it to module scope for larger tables.
