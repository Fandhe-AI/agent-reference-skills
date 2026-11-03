---
source: https://developers.cloudflare.com/workers/versions-and-deployments/version-overrides/
---

# Version Overrides

Send a request to a specific version of a Worker in the current deployment, even one serving 0% of traffic, via the `Cloudflare-Workers-Version-Overrides` header.

## Signature / Usage

```sh
curl -s https://example.com -H 'Cloudflare-Workers-Version-Overrides: my-worker-name="dc8dcd28-271b-4367-9840-6c244f84cb40"'
```

Forward the override through a service binding by forwarding the request:

```js
// The override header from the inbound request is forwarded to the downstream Worker.
export default {
	async fetch(request, env) {
		return env.MY_SERVICE.fetch(request);
	},
};
```

Or set it explicitly:

```js
// Replace the version ID with the target version from `wrangler versions list`.
export default {
	async fetch(request, env) {
		const response = await env.MY_SERVICE.fetch("https://example.com/", {
			headers: {
				"Cloudflare-Workers-Version-Overrides":
					'my-downstream-worker="dc8dcd28-271b-4367-9840-6c244f84cb40"',
			},
		});
		return response;
	},
};
```

## Options / Props

Smoke-test deployment (new version at 0%, previous at 100%):

| Version ID | Percentage |
| --- | --- |
| dc8dcd28-271b-4367-9840-6c244f84cb40 | 0% |
| db7cd8d3-4425-4fe7-8c81-01bf963b6067 | 100% |

## Notes

- Header is a Dictionary Structured Header (RFC 8941): each key is a Worker name, each value a version ID as a String.
- The version must be in the current deployment (check with `wrangler deployments list` or the dashboard **Active Deployment**); a deployment holds at most two versions. Create a 0% deployment with `wrangler versions deploy`.
- If not applied (version not in deployment, may take a couple of seconds to propagate; invalid Dictionary), the request is routed by the configured percentages.
- Overrides only apply to `fetch()`-based service binding calls, not RPC.
- Observe the invoked version via Observability/Logpush or the Version metadata binding.

## Related

- [versions-gradual-deployments.md](./versions-gradual-deployments.md)
- [versions-version-affinity.md](./versions-version-affinity.md)
- [versions-version-urls.md](./versions-version-urls.md)
