# samples

| Name | Description | Path |
| --- | --- | --- |
| A/B testing with same-URL direct access | Serve control or test content by cookie, assigning new visitors randomly and allowing direct access to either variant. | [ab-testing.md](./ab-testing.md) |
| Alter headers | Add, change, or delete response headers on an upstream response. | [alter-headers.md](./alter-headers.md) |
| HTTP Basic Authentication | Restrict a route with the HTTP Basic scheme, comparing credentials with `crypto.subtle.timingSafeEqual`. | [basic-auth.md](./basic-auth.md) |
| Bulk redirects | Redirect requests to certain URLs based on a path-to-URL map and pass everything else through. | [bulk-redirects.md](./bulk-redirects.md) |
| Using the Cache API | Store and reuse responses in Cloudflare's cache with `caches.default`. | [cache-api.md](./cache-api.md) |
| Cache POST requests | Cache POST responses by hashing the request body into a GET-shaped cache key. | [cache-post-request.md](./cache-post-request.md) |
| Cache using fetch | Control caching of an origin fetch with `cf` options (TTL, cache everything, custom cache key) and set browser cache headers. | [cache-using-fetch.md](./cache-using-fetch.md) |
| CORS header proxy | Add the necessary CORS headers (including preflight handling) to a third party API response. | [cors-header-proxy.md](./cors-header-proxy.md) |
| Country code redirect | Redirect a response based on the visitor's country code from `request.cf`. | [country-code-redirect.md](./country-code-redirect.md) |
| Setting Cron Triggers | Handle a Cron Trigger with the `scheduled` handler. | [cron-trigger.md](./cron-trigger.md) |
| Cookie parsing | Read the value of a named cookie from the request. | [extract-cookie-value.md](./extract-cookie-value.md) |
| Fetch JSON | Send a GET request to an external API and relay the body with its content type. | [fetch-json.md](./fetch-json.md) |
| Geolocation: Hello World | Read all geolocation fields from `request.cf` and render them in an HTML page. | [geolocation-hello-world.md](./geolocation-hello-world.md) |
| Hot-link protection | Block other sites from embedding your images by checking the `Referer` header. | [hot-link-protection.md](./hot-link-protection.md) |
| Multiple Cron Triggers | Run different work for each of several cron schedules by switching on `controller.cron`. | [multiple-cron-triggers.md](./multiple-cron-triggers.md) |
| Post JSON | Send a POST request with a JSON body to an external server. | [post-json.md](./post-json.md) |
| Redirect | Redirect requests from one domain to another while keeping the path and query string. | [redirect.md](./redirect.md) |
| Respond with another site | Answer GET requests with another site's response, rejecting other methods with 405. | [respond-with-another-site.md](./respond-with-another-site.md) |
| Return JSON | Return JSON directly from a Worker, e.g. for APIs and middleware. | [return-json.md](./return-json.md) |
| Rewrite links | Rewrite URLs in `href` and `src` attributes of an HTML response with HTMLRewriter. | [rewrite-links.md](./rewrite-links.md) |
| Set security headers | Add common security headers to HTML responses and strip headers that leak server details. | [security-headers.md](./security-headers.md) |
| Sign requests | Generate and verify HMAC SHA-256 signed, expiring URLs with Web Crypto. | [signing-requests.md](./signing-requests.md) |
| Stream large JSON | Parse a large JSON request body incrementally to stay within the Worker memory limit. | [streaming-json.md](./streaming-json.md) |
| Turnstile with Workers | Inject the Turnstile script and widget into HTML elements with HTMLRewriter. | [turnstile-html-rewriter.md](./turnstile-html-rewriter.md) |
| Using the WebSockets API | Accept a WebSocket upgrade with `WebSocketPair` and listen for messages on the server side. | [websockets.md](./websockets.md) |
