---
source: https://developers.cloudflare.com/r2/examples/cache-api/
---

# Use the Cache API with R2

Serve R2 objects from a Worker and store them in Cloudflare's cache with the Workers Cache API.

```js
export default {
  async fetch(request, env, context) {
    try {
      const url = new URL(request.url);

      // Construct the cache key from the cache URL
      const cacheKey = new Request(url.toString(), request);
      const cache = caches.default;

      // Check whether the value is already available in the cache
      // if not, you will need to fetch it from R2, and store it in the cache
      // for future access
      let response = await cache.match(cacheKey);

      if (response) {
        console.log(`Cache hit for: ${request.url}.`);
        return response;
      }

      console.log(
        `Response for request url: ${request.url} not present in cache. Fetching and caching request.`
      );

      // If not in cache, get it from R2
      const objectKey = url.pathname.slice(1);
      const object = await env.MY_BUCKET.get(objectKey);
      if (object === null) {
        return new Response('Object Not Found', { status: 404 });
      }

      // Set the appropriate object headers
      const headers = new Headers();
      object.writeHttpMetadata(headers);
      headers.set('etag', object.httpEtag);

      // Cache API respects Cache-Control headers. Setting s-max-age to 10
      // will limit the response to be in cache for 10 seconds max
      // Any changes made to the response here will be reflected in the cached value
      headers.append('Cache-Control', 's-maxage=10');

      response = new Response(object.body, {
        headers,
      });

      // Store the fetched response as cacheKey
      // Use waitUntil so you can return the response without blocking on
      // writing to cache
      context.waitUntil(cache.put(cacheKey, response.clone()));

      return response;
    } catch (e) {
      return new Response('Error thrown ' + e.message);
    }
  },
};
```

## Notes

- Needs an R2 binding named `MY_BUCKET`. The Cache API only works on a custom domain or route; it has no effect in the dashboard editor, Playground previews, or `*.workers.dev`.
- Cache API entries respect `Cache-Control` (`s-maxage=10` here) and are not replicated across data centers.
- Related: [workers-api-usage](../references/r2/workers-api-usage.md), [objects-download](../references/r2/objects-download.md).
