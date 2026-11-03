---
source: https://developers.cloudflare.com/workers/examples/respond-with-another-site/
---

# Respond with another site

Answer GET requests with another site's response, rejecting other methods with 405.

```js
export default {
  async fetch(request) {
    function MethodNotAllowed(request) {
      return new Response(`Method ${request.method} not allowed.`, {
        status: 405,
        headers: {
          Allow: "GET",
        },
      });
    }
    // Only GET requests work with this proxy.
    if (request.method !== "GET") return MethodNotAllowed(request);
    return fetch(`https://example.com`);
  },
};
```

## Notes

- Returning the `fetch()` promise directly streams the upstream response through.
- Always send an `Allow` header with a 405.
