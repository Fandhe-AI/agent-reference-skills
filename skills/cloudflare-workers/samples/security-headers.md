---
source: https://developers.cloudflare.com/workers/examples/security-headers/
---

# Set security headers

Add common security headers to HTML responses and strip headers that leak server details.

Adapted (not in the official docs): `Cross-Origin-Opener-Policy` uses a valid value; see Notes.

```js
export default {
	async fetch(request) {
		const DEFAULT_SECURITY_HEADERS = {
			/*
    Secure your application with Content-Security-Policy headers.
    Enabling these headers will permit content from a trusted domain and all its subdomains.
    @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Security-Policy
    "Content-Security-Policy": "default-src 'self' example.com *.example.com",
    */
			/*
    You can also set Strict-Transport-Security headers.
    These are not automatically set because your website might get added to Chrome's HSTS preload list.
    Here's the code if you want to apply it:
    "Strict-Transport-Security" : "max-age=63072000; includeSubDomains; preload",
    */
			/*
    Permissions-Policy header provides the ability to allow or deny the use of browser features, such as opting out of FLoC - which you can use below:
    "Permissions-Policy": "interest-cohort=()",
    */
			/*
    X-XSS-Protection header prevents a page from loading if an XSS attack is detected.
    @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/X-XSS-Protection
    */
			"X-XSS-Protection": "0",
			/*
    X-Frame-Options header prevents click-jacking attacks.
    @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/X-Frame-Options
    */
			"X-Frame-Options": "DENY",
			/*
    X-Content-Type-Options header prevents MIME-sniffing.
    @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/X-Content-Type-Options
    */
			"X-Content-Type-Options": "nosniff",
			"Referrer-Policy": "strict-origin-when-cross-origin",
			"Cross-Origin-Embedder-Policy": 'require-corp; report-to="default";',
			"Cross-Origin-Opener-Policy": 'same-origin; report-to="default";',
			"Cross-Origin-Resource-Policy": "same-site",
		};
		const BLOCKED_HEADERS = [
			"Public-Key-Pins",
			"X-Powered-By",
			"X-AspNet-Version",
		];

		let response = await fetch(request);
		let newHeaders = new Headers(response.headers);

		const tlsVersion = request.cf.tlsVersion;
		console.log(tlsVersion);
		// This sets the headers for HTML responses:
		if (
			newHeaders.has("Content-Type") &&
			!newHeaders.get("Content-Type").includes("text/html")
		) {
			return new Response(response.body, {
				status: response.status,
				statusText: response.statusText,
				headers: newHeaders,
			});
		}

		Object.keys(DEFAULT_SECURITY_HEADERS).map((name) => {
			newHeaders.set(name, DEFAULT_SECURITY_HEADERS[name]);
		});

		BLOCKED_HEADERS.forEach((name) => {
			newHeaders.delete(name);
		});

		if (tlsVersion !== "TLSv1.2" && tlsVersion !== "TLSv1.3") {
			return new Response("You need to use TLS version 1.2 or higher.", {
				status: 400,
			});
		} else {
			return new Response(response.body, {
				status: response.status,
				statusText: response.statusText,
				headers: newHeaders,
			});
		}
	},
};
```

## Notes

- CSP and HSTS lines are commented out in the official sample on purpose (HSTS may trigger preload-list inclusion); enable them deliberately.
- `Cross-Origin-Embedder-Policy: require-corp` can break third-party embeds; test before shipping.
- Corrected from the official docs: the official sample sets `Cross-Origin-Opener-Policy: same-site; report-to="default";`, but `same-site` is not a valid COOP value (valid: `unsafe-none`, `same-origin-allow-popups`, `same-origin`, `noopener-allow-popups`), so browsers ignore the header. Changed to `same-origin`, which can break cross-origin popup flows (OAuth); relax if needed.
- `Cross-Origin-Resource-Policy: same-site` blocks cross-site embedding of these HTML responses.
- Non-HTML responses are returned with original headers only.
