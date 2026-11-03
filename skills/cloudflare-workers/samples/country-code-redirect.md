---
source: https://developers.cloudflare.com/workers/examples/country-code-redirect/
---

# Country code redirect

Redirect a response based on the visitor's country code from `request.cf`.

```js
export default {
	async fetch(request) {
		/**
		 * A map of the URLs to redirect to
		 * @param {Object} countryMap
		 */
		const countryMap = {
			US: "https://example.com/us",
			EU: "https://example.com/eu",
		};

		// Use the cf object to obtain the country of the request
		// more on the cf object: https://developers.cloudflare.com/workers/runtime-apis/request#incomingrequestcfproperties
		const country = request.cf.country;

		if (country != null && country in countryMap) {
			const url = countryMap[country];
			// Remove this logging statement from your final output.
			console.log(
				`Based on ${country}-based request, your user would go to ${url}.`,
			);
			return Response.redirect(url);
		} else {
			return fetch("https://example.com", request);
		}
	},
};
```

## Notes

- `request.cf` is populated by Cloudflare at the edge; it is not available in every local-dev context.
- `EU` is not an ISO country code, so it never matches `request.cf.country` in practice; the sample is illustrative.
- See [geolocation-hello-world.md](./geolocation-hello-world.md) for the full list of `request.cf` fields used.
- Request properties are documented in `../references/web-apis/request.md`.
