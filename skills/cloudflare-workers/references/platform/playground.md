---
source: https://developers.cloudflare.com/workers/playground/
---

# Playground

A browser-based sandbox to preview, test, share, and deploy Workers code without setup or authentication.

## Signature / Usage

Default code shown on arrival:

```js
import welcome from "welcome.html";

/**
 * @typedef {Object} Env
 */

export default {
	/**
	 * @param {Request} request
	 * @param {Env} env
	 * @param {ExecutionContext} ctx
	 * @returns {Response}
	 */
	fetch(request, env, ctx) {
		console.log("Hello Cloudflare Workers!");

		return new Response(welcome, {
			headers: {
				"content-type": "text/html",
			},
		});
	},
};
```

## Notes

- Supported only in Firefox and Chrome desktop; Safari shows a `PreviewRequestFailed` error.
- Auto-updating preview; URL paths can be entered in the preview input. Type-checking via JSDoc and `workers-types`; pretty error pages. The **HTTP** tab sends raw requests (e.g. `POST`) with editable headers and body.
- Log viewer (also in the dashboard quick editor): shows `console.log` of primitives, objects, arrays; supports clearing; does not log class instances or their properties (e.g. `request.url`).
- Share: **Copy Link** creates a non-expiring URL. Deploy: gives the Worker a unique URL on the global network; afterwards add Custom Domains and storage resources.
- For full debugging use Wrangler locally; `wrangler init --from-dash` clones a deployed Worker (see the cloudflare-wrangler skill).

## Related

- [get-started-dashboard.md](./get-started-dashboard.md)
- [get-started-cli.md](./get-started-cli.md)
- [../handlers-context/README.md](../handlers-context/README.md)
