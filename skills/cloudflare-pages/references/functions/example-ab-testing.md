---
source: https://developers.cloudflare.com/pages/functions/examples/ab-testing/
---

# Example: A/B testing with middleware

Serve a test or control page based on a cookie, passing the request through to the origin assets.

## Signature / Usage

Adapted (not in the official docs): visitors already assigned `current` keep it, and the Cookie header is parsed so the cookie name and value are compared exactly instead of by substring; see Notes.

```js
const cookieName = "ab-test-cookie";
const newHomepagePathName = "/test";

const getCookie = (header, name) => {
	for (const part of header.split(";")) {
		const trimmed = part.trim();
		const eq = trimmed.indexOf("=");
		if (eq === -1) continue;
		if (trimmed.slice(0, eq) === name) return trimmed.slice(eq + 1);
	}
	return null;
};

const abTest = async (context) => {
	const url = new URL(context.request.url);
	// if homepage
	if (url.pathname === "/") {
		// if cookie ab-test-cookie=new then change the request to go to /test
		// if no cookie set, pass x% of traffic and set a cookie value to "current" or "new"

		const group = getCookie(context.request.headers.get("cookie") ?? "", cookieName);
		// is cookie set?
		if (group === "new") {
			// pass the request to /test
			url.pathname = newHomepagePathName;
			return context.env.ASSETS.fetch(url);
		} else if (group === "current") {
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
- Adapted from the official docs: the source uses `cookie.includes(...)` on the whole Cookie header, which also matches `other-ab-test-cookie=new` or `ab-test-cookie=newer`. This page splits the header on `;`, splits each pair at the first `=`, and compares name and value exactly.
- Place as `functions/_middleware.js` so it runs in front of static files.
- The cookie holds no sensitive data; add `Secure; SameSite=Lax` if your site is HTTPS-only.

## Related

- [middleware.md](./middleware.md)
- [api-reference.md](./api-reference.md)
