---
source: https://developers.cloudflare.com/workers/examples/turnstile-html-rewriter/
---

# Turnstile with Workers

Inject the Turnstile script and widget into HTML elements with HTMLRewriter.

```js
export default {
	async fetch(request, env) {
		const SITE_KEY = env.SITE_KEY; // The Turnstile Sitekey of your widget (pass as env or secret)
		const TURNSTILE_ATTR_NAME = "your_id_to_replace"; // The id of the element to put a Turnstile widget in
		let res = await fetch(request);

		// Instantiate the API to run on specific elements, for example, `head`, `div`
		let newRes = new HTMLRewriter()

			// `.on` attaches the element handler and this allows you to match on element/attributes or to use the specific methods per the API
			.on("head", {
				element(element) {
					// In this case, you are using `append` to add a new script to the `head` element
					element.append(
						`<script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer></script>`,
						{ html: true },
					);
				},
			})
			.on("div", {
				element(element) {
					// Add a turnstile widget element into if an element with the id of TURNSTILE_ATTR_NAME is found
					if (element.getAttribute("id") === TURNSTILE_ATTR_NAME) {
						element.append(
							`<div class="cf-turnstile" data-sitekey="${SITE_KEY}"></div>`,
							{ html: true },
						);
					}
				},
			})
			.transform(res);
		return newRes;
	},
};
```

## Notes

- Pass `{ html: true }` to `append` so the string is inserted as markup, not escaped text.
- This only renders the widget; server-side token verification is a separate step. Turnstile docs: https://developers.cloudflare.com/turnstile/
- `SITE_KEY` is a public key and may be a plain variable.
