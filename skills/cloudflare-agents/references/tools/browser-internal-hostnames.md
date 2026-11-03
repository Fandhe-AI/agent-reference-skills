---
source: https://developers.cloudflare.com/agents/tools/browser/
---

# Browser internal hostnames

Let the agent's browser open sites that only the agent serves (R2 assets, a workspace folder, a sandbox dev server, another Worker) through reserved hostnames that never leave Cloudflare.

## Signature / Usage

Requires Agents SDK v0.31.0 or later. Pass `internalHosts` to `browserRun()`:

```ts
import { DurableObject } from "cloudflare:workers";
import { Browser, browserRun, type InternalHostMessage } from "agents/browser";
import { Lifecycle } from "agents/lifecycle";
import { z } from "zod";
// Your own code: serve a workspace folder's files, and reach a port on your
// sandbox. Each returns a Response.
import { fetchSandboxPort, serveWorkspaceFolder } from "./hosts";

// Browser Run calls back into your Worker through this entrypoint.
export { InternalHostRouter } from "agents/browser";

export class BrowserAssistant extends DurableObject<Env> {
	browser = new Browser({
		provider: browserRun(this.env.BROWSER, {
			guardrails: { allowedDomains: [] }, // internal hosts only
			internalHosts: {
				router: this.ctx.exports.InternalHostRouter,
				hosts: {
					"assets.internal": {
						description: "Your app's static assets, served from an R2 bucket",
						fetch: async (request) => {
							const { pathname } = new URL(request.url);
							const file = await this.env.ASSETS_BUCKET.get(
								decodeURIComponent(pathname.slice(1)),
							);
							if (!file) return new Response("Not found", { status: 404 });
							const headers = new Headers();
							file.writeHttpMetadata(headers); // its Content-Type
							return new Response(file.body, { headers });
						},
					},
					"site.internal": {
						description: "A workspace folder, such as a production build",
						target: z.object({
							folder: z
								.string()
								.startsWith("/workspace/")
								.refine((path) => !path.split("/").includes("..")),
						}),
						fetch: (request, { folder }) =>
							serveWorkspaceFolder(folder, request),
					},
					"preview.internal": {
						description: "Your dev servers",
						target: z.object({ port: z.number().int().min(1024) }),
						fetch: (request, { port }) => fetchSandboxPort(port, request),
					},
					"api.internal": { worker: this.env.API },
				},
			},
		}),
	});

	lifecycle = Lifecycle.install(this).use(this.browser);

	// InternalHostRouter calls this method to reach your Browser.
	fetchInternalHost(message: InternalHostMessage) {
		return this.browser.fetchInternalHost(message);
	}
}
```

The model assigns a target to an assignable host, then navigates to the returned URL:

```js
const { url } = await browser.assignHost({
	host: "preview.internal",
	target: { port: 5173 },
});
await browser.cdp({
	method: "Page.navigate",
	params: { url },
	sessionId: "active",
});
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `internalHosts.router` | entrypoint | — | `this.ctx.exports.InternalHostRouter`; required for `fetch` hosts. |
| `internalHosts.hosts[name].description` | string | — | Text the model reads (listed in the tool description). |
| `internalHosts.hosts[name].fetch` | `(request, target) => Response` | — | Runs in your Durable Object for each request. |
| `internalHosts.hosts[name].worker` | service binding or `ctx.exports` entrypoint | — | Sends requests straight to that Worker, bypassing your Durable Object. |
| `internalHosts.hosts[name].target` | Standard JSON Schema or plain JSON Schema object | — | Makes the host assignable; validated, stored, and passed as `fetch`'s second argument (typed with a Standard Schema such as Zod 4.2+, ArkType, Valibot; `unknown` with plain JSON Schema). |
| `this.browser.internalHosts.assign(host, target)` / `.clear(host)` / `.list()` | methods | — | Manage assignments from your own code. |

## Notes

- Each host has either `fetch` or `worker`. The `Agent` class has `fetchInternalHost()` built in; leave it out on an Agent. With several `Browser`s on one Durable Object use `message.browser` to pick one.
- Limits: at most eight internal hostnames; bare lowercase names ending `.internal`, `.test`, `.example`, or `.invalid` (not `http://preview.internal:5173`); plain HTTP on port 80 only (no HTTPS or WebSockets, so hot reload fails); the hostname set is fixed when the browser starts (changing it replaces the browser on next use; changing a `fetch` function or repointing a `worker` host does not, so call `browser.close()` after that); guardrails do not apply to internal hosts; a throwing `fetch` yields a `502` and the page does not see the message; only works when deployed (local dev starts without them and warns); install on a top-level Durable Object or Agent, not sub-agents.
- Assignments persist until cleared (across browser replacement, eviction, redeploys). An assignable host returns `502` until it has a target.
- Security: any page open over plain HTTP can send requests to internal hosts, including a page on another internal host (Chrome blocks them from HTTPS pages as mixed content). Set `allowedDomains: []` unless the model needs the public Internet, and if requests have side effects check their `Origin` header names that host.
- The model picks the target; if any part becomes a path, URL, or command in `fetch`, restrict it in the schema (enum, pattern, range) as `site.internal` does with its folder. Do not pass secrets in targets.
- Requests route through outbound Workers (https://developers.cloudflare.com/browser-run/features/outbound-workers/); guardrails: https://developers.cloudflare.com/browser-run/features/guardrails/. For R2 bindings see the cloudflare-storage skill; sandbox dev servers see the cloudflare-sandbox-containers skill (sandbox; https://developers.cloudflare.com/sandbox/).

## Related

- [Browser](./browser.md)
- [Sandbox](./sandbox.md)
