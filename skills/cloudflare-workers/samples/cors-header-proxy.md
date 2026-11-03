---
source: https://developers.cloudflare.com/workers/examples/cors-header-proxy/
---

# CORS header proxy

Add the necessary CORS headers (including preflight handling) to a third party API response.

Adapted (not in the official docs): proxies only to the fixed `API_URL` (no `?apiurl=`), strips caller credentials, does not follow redirects, and answers `Access-Control-Allow-Origin: *`; see Notes.

```js
export default {
	async fetch(request) {
		const corsHeaders = {
			"Access-Control-Allow-Origin": "*",
			"Access-Control-Allow-Methods": "GET,HEAD,POST,OPTIONS",
			"Access-Control-Max-Age": "86400",
		};

		// The URL for the remote third party API you want to fetch from
		// but does not implement CORS
		const API_URL = "https://examples.cloudflareworkers.com/demos/demoapi";

		// The endpoint you want the CORS reverse proxy to be on
		const PROXY_ENDPOINT = "/corsproxy/";

		// The rest of this snippet for the demo page
		function rawHtmlResponse(html) {
			return new Response(html, {
				headers: {
					"content-type": "text/html;charset=UTF-8",
				},
			});
		}

		const DEMO_PAGE = `
      <!DOCTYPE html>
      <html>
      <body>
        <h1>API GET without CORS Proxy</h1>
        <a target="_blank" href="https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch#Checking_that_the_fetch_was_successful">Shows TypeError: Failed to fetch since CORS is misconfigured</a>
        <p id="noproxy-status"/>
        <code id="noproxy">Waiting</code>
        <h1>API GET with CORS Proxy</h1>
        <p id="proxy-status"/>
        <code id="proxy">Waiting</code>
        <h1>API POST with CORS Proxy + Preflight</h1>
        <p id="proxypreflight-status"/>
        <code id="proxypreflight">Waiting</code>
        <script>
        let reqs = {};
        reqs.noproxy = () => {
          return fetch("${API_URL}").then(r => r.json())
        }
        reqs.proxy = async () => {
          let href = "${PROXY_ENDPOINT}"
          return fetch(window.location.origin + href).then(r => r.json())
        }
        reqs.proxypreflight = async () => {
          let href = "${PROXY_ENDPOINT}"
          let response = await fetch(window.location.origin + href, {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              msg: "Hello world!"
            })
          })
          return response.json()
        }
        (async () => {
        for (const [reqName, req] of Object.entries(reqs)) {
          try {
            let data = await req()
            document.getElementById(reqName).innerHTML = JSON.stringify(data)
          } catch (e) {
            document.getElementById(reqName).innerHTML = e
          }
        }
      })()
        </script>
      </body>
      </html>
    `;

		async function handleRequest(request) {
			// Rewrite request to point to the fixed API URL (never a caller-supplied URL).
			// This also makes the request mutable so you can add the correct Origin
			// header to make the API server think that this request is not cross-site.
			request = new Request(API_URL, request);
			request.headers.set("Origin", new URL(API_URL).origin);
			// Do not forward the caller's credentials to the third party
			request.headers.delete("Cookie");
			request.headers.delete("Authorization");
			// Do not follow redirects: they could lead outside the fixed API
			let response = await fetch(request, { redirect: "manual" });
			// Recreate the response so you can modify the headers

			response = new Response(response.body, response);
			// Set CORS headers: "*" is correct for a public, credential-less API
			response.headers.set("Access-Control-Allow-Origin", "*");

			return response;
		}

		async function handleOptions(request) {
			if (
				request.headers.get("Origin") !== null &&
				request.headers.get("Access-Control-Request-Method") !== null &&
				request.headers.get("Access-Control-Request-Headers") !== null
			) {
				// Handle CORS preflight requests.
				return new Response(null, {
					headers: {
						...corsHeaders,
						"Access-Control-Allow-Headers": request.headers.get(
							"Access-Control-Request-Headers",
						),
					},
				});
			} else {
				// Handle standard OPTIONS request.
				return new Response(null, {
					headers: {
						Allow: "GET, HEAD, POST, OPTIONS",
					},
				});
			}
		}

		const url = new URL(request.url);
		if (url.pathname.startsWith(PROXY_ENDPOINT)) {
			if (request.method === "OPTIONS") {
				// Handle CORS preflight requests
				return handleOptions(request);
			} else if (
				request.method === "GET" ||
				request.method === "HEAD" ||
				request.method === "POST"
			) {
				// Handle requests to the API server
				return handleRequest(request);
			} else {
				return new Response(null, {
					status: 405,
					statusText: "Method Not Allowed",
				});
			}
		} else {
			return rawHtmlResponse(DEMO_PAGE);
		}
	},
};
```

## Notes

- Only `handleRequest` / `handleOptions` matter for real use; `DEMO_PAGE` and `rawHtmlResponse` exist to demo the proxy in a browser.
- `new Response(response.body, response)` makes a fetched response's headers mutable; a plain fetch result is immutable.
- Adapted from the official docs: the official sample forwards to whatever `?apiurl=` the caller supplies (an open proxy) and sets `Access-Control-Allow-Origin` to the proxy's own origin, which does not match a cross-origin caller. This version proxies only to the fixed `API_URL`, removes `Cookie` / `Authorization` from the forwarded request, uses `redirect: "manual"`, and responds with `Access-Control-Allow-Origin: *`, which is only appropriate for a public API that needs no credentials.
- To restrict callers instead, compare the request `Origin` against an allowlist, echo only a matching value in `Access-Control-Allow-Origin`, and append `Vary: Origin`.
- For Hono apps, use the `hono` skill's CORS middleware instead of hand-rolling this.
