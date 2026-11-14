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
- The version must be in the deployment at the location handling the request (check with `wrangler deployments list` or the dashboard **Active Deployment**); a deployment holds at most two versions. Create a 0% deployment with `wrangler versions deploy`. Its traffic percentage can be 0%.
- Versions in the deployment (A and B uploaded):

| Deployment at the location handling the request | Traffic by default | With a version override |
| --- | --- | --- |
| Only A; B has been uploaded | A | An override for B is ignored because B is outside the deployment. The request uses A. |
| A at 100%, B at 0% | A | An override can select B and its assets. |
| A at 0%, B at 100% | B | An override can still select A. |
| Only B | B | An override for A is ignored, even if A remains in version history. The request uses B. |

- You can also turn on a Version URL to access an uploaded version; this does not require adding it to the production deployment.
- If not applied (the deployment at the location handling the request does not include the version, which can happen while a deployment change spreads across the network; invalid Dictionary), the request is routed by the configured percentages. A location ignores an override if its deployment does not yet include the requested version. An ignored override can still return a successful response, so check the version as well as the status code.
- Overrides only apply to `fetch()`-based service binding calls, not RPC.
- Observe the invoked version via Observability/Logpush or the Version metadata binding (return the version ID in the response).

### Use version overrides for asset requests

To keep HTML and asset requests on the same version, include the HTML's Worker version ID in each asset URL and use a Request Header Transform Rule to turn that ID into a version override. This requires a proxied hostname on your Cloudflare zone; the Transform Rule does not run on `workers.dev`. Steps: (1) include the serving version's ID in asset URLs (version metadata binding `CF_VERSION_METADATA` plus an assets binding with `run_worker_first: ["/"]`; each version reads its own ID, so older HTML keeps requesting that version's assets); (2) set the override before Cloudflare selects the Worker version (a query parameter alone does not select a version; setting the header inside the selected Worker's handler does not change which version handles that request); (3) keep both versions in the deployment (add B at 0% with a gradual deployment, then promote B while keeping A at 0%). Apply the version ID to every related asset URL, including imported JavaScript chunks, stylesheets, and URLs within CSS; a script's query string does not carry over to files it imports. Keep the Transform Rule's allowed version IDs in sync with your deployment; when you later replace A with C, pages loaded from A can no longer select their version.

Transform Rule filter expression (replace the hostname and the two version IDs):

```txt
(http.host eq "example.com"
  and starts_with(http.request.uri.path, "/assets/")
  and http.request.uri.args["__worker_version"][0] in {
    "db7cd8d3-4425-4fe7-8c81-01bf963b6067"
    "dc8dcd28-271b-4367-9840-6c244f84cb40"
  })
```

Header value expression (**Set dynamic** for `Cloudflare-Workers-Version-Overrides`; replace `my-worker` with your Worker name):

```txt
concat("my-worker=\"", http.request.uri.args["__worker_version"][0], "\"")
```

- Source: https://developers.cloudflare.com/workers/versions-and-deployments/version-overrides/ (cloudflare-docs production `34d908a`, fetched 2026-11-14)

## Related

- [versions-gradual-deployments.md](./versions-gradual-deployments.md)
- [versions-version-affinity.md](./versions-version-affinity.md)
- [versions-version-urls.md](./versions-version-urls.md)
- [versions-version-skew.md](./versions-version-skew.md)
