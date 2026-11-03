---
source: https://developers.cloudflare.com/pages/how-to/use-worker-for-ab-testing-in-pages/
---

# Use Pages Functions for A/B testing

Split traffic between `/` and `/test` with a Pages Functions middleware and a sticky cookie.

## Signature / Usage

Create `functions/_middleware.js` (runs for all routes). It exports `onRequest` as an array of handlers.

Adapted (not in the official docs): the official final version only honors the `new` cookie, so a visitor with `ab-test-cookie=current` is re-randomized on each visit; this version keeps both groups sticky. See Notes.

```js
const cookieName = "ab-test-cookie";
const newHomepagePathName = "/test";

const abTest = async (context) => {
	const url = new URL(context.request.url);
	// if homepage
	if (url.pathname === "/") {
		// if cookie ab-test-cookie=new then change the request to go to /test
		// if cookie ab-test-cookie=current serve the normal homepage
		// if no cookie set, pass x% of traffic and set a cookie value to "current" or "new"

		const cookie = context.request.headers.get("cookie") ?? "";
		if (cookie.includes(`${cookieName}=new`)) {
			// pass the request to /test
			url.pathname = newHomepagePathName;
			return context.env.ASSETS.fetch(url);
		} else if (cookie.includes(`${cookieName}=current`)) {
			return context.env.ASSETS.fetch(url);
		} else {
			const percentage = Math.floor(Math.random() * 100);
			let version = "current"; // default version
			// change pathname and version name for 50% of traffic
			if (percentage < 50) {
				url.pathname = newHomepagePathName;
				version = "new";
			}
			// get the static file from ASSETS, and attach a cookie
			const asset = await context.env.ASSETS.fetch(url);
			const response = new Response(asset.body, asset);
			response.headers.append("Set-Cookie", `${cookieName}=${version}; path=/`);
			return response;
		}
	}
	return context.next();
};

export const onRequest = [abTest];
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `cookieName` | string | `"ab-test-cookie"` | Cookie that stores the group. |
| `newHomepagePathName` | string | `"/test"` | Path served to the `new` group. |
| `context.env.ASSETS` | binding | — | Default Functions binding to the Pages asset-serving resource; `fetch()` returns the asset. |
| `context.next()` | function | — | Passes the request on to Pages. |

## Notes

- Cloudflare's Pages landing page says "Start new projects with Workers" (Workers + static assets supports most Pages use cases); see the cloudflare-workers skill (static-assets/migrate-from-pages).
- Corrected from the official docs: the final example checked only `ab-test-cookie=new`; any visitor whose cookie was `current` fell into the random branch again and could be switched to `/test`. A `current` branch was added.
- The cookie is set without `Secure` or `SameSite` attributes in the source; add them if appropriate for your site.
- `env.ASSETS.fetch(url)` serves the modified path. In Workers static assets the equivalent binding must be configured explicitly (`assets.binding`, see the cloudflare-workers skill).
- Review deployed functions at **Settings** > **Functions** > **Configuration**.

## Related

- [Refactor a Worker to a Pages Function](./refactor-a-worker-to-pages-functions.md)
