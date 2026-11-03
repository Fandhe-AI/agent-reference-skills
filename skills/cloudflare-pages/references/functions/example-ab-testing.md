---
source: https://developers.cloudflare.com/pages/functions/examples/ab-testing/
---

# Example: A/B testing with middleware

Serve a test or control page based on a cookie, passing the request through to the origin assets.

## Signature / Usage

Adapted (not in the official docs): visitors already assigned `current` keep it; see Notes.

```js
const cookieName = "ab-test-cookie";
const newHomepagePathName = "/test";

const abTest = async (context) => {
	const url = new URL(context.request.url);
	// if homepage
	if (url.pathname === "/") {
		// if cookie ab-test-cookie=new then change the request to go to /test
		// if no cookie set, pass x% of traffic and set a cookie value to "current" or "new"

		let cookie = context.request.headers.get("cookie");
		// is cookie set?
		if (cookie && cookie.includes(`${cookieName}=new`)) {
			// pass the request to /test
			url.pathname = newHomepagePathName;
			return context.env.ASSETS.fetch(url);
		} else if (cookie && cookie.includes(`${cookieName}=current`)) {
			// already assigned to the current version
			return context.next();
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
			let response = new Response(asset.body, asset);
			response.headers.append("Set-Cookie", `${cookieName}=${version}; path=/`);
			return response;
		}
	}
	return context.next();
};

export const onRequest = [abTest];
```

## Notes

- Cloudflare recommends Workers (with static assets) for new projects — see the cloudflare-workers skill (static-assets, including migrate-from-pages).
- Corrected from the official docs: the official code re-rolled the 50/50 split on every visit for users whose cookie was `current` (only `new` was honored), so they could flip to the new page. The extra `else if` branch keeps them on the current version.
- Place as `functions/_middleware.js` so it runs in front of static files.
- The cookie holds no sensitive data; add `Secure; SameSite=Lax` if your site is HTTPS-only.

## Related

- [middleware.md](./middleware.md)
- [api-reference.md](./api-reference.md)
