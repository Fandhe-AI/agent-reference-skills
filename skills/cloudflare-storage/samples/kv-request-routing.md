---
source: https://developers.cloudflare.com/kv/examples/routing-with-workers-kv/
---

# Route requests across various web servers

Look up a per-tenant origin URL in Workers KV and proxy the request to that origin.

Adapted (not in the official docs): the proxied request forwards an allowlist of headers instead of `request.headers`; see Notes.

```ts
// Example routing data stored in Workers KV:
// Key: "storefrontA" | Value: {"origin": "https://storefrontA-server.example.com"}
// Key: "storefrontB" | Value: {"origin": "https://storefrontB-server.example.com"}

interface Env {
ROUTING_CONFIG: KVNamespace;
}

export default {
  async fetch(request, env, ctx) {

    // Parse the URL to extract the storefront ID from the path
    const url = new URL(request.url);
    const pathParts = url.pathname.split('/').filter(part => part !== '');

    // Check if a storefront ID is provided in the path, otherwise return 400
    if (pathParts.length === 0) {
      return new Response('Welcome to our multi-tenant platform. Please specify a storefront ID in the URL path.', {
        status: 400,
        headers: { 'Content-Type': 'text/plain' }
      });
    }

    // Extract the storefront ID from the first path segment
    const storefrontId = pathParts[0];

    try {
      // Look up the storefront configuration in KV using env.ROUTING_CONFIG
      const storefrontConfig = await env.ROUTING_CONFIG.get<{
    			origin: string;
    		}>(storefrontId, {type: "json"});

      // If no configuration is found, return a 404
      if (!storefrontConfig) {
        return new Response(`Storefront "${storefrontId}" not found.`, {
          status: 404,
          headers: { 'Content-Type': 'text/plain' }
        });
      }

      // Construct the new URL for the origin server
      // Remove the storefront ID from the path when forwarding
      const newPathname = '/' + pathParts.slice(1).join('/');
      const originUrl = new URL(newPathname, storefrontConfig.origin);
      originUrl.search = url.search;

      // Forward only an allowlist of headers; never pass Authorization, Cookie
      // or other platform credentials on to a tenant origin
      const forwardedHeaders = new Headers();
      for (const name of ['Accept', 'Accept-Language', 'Content-Type', 'User-Agent']) {
        const value = request.headers.get(name);
        if (value !== null) forwardedHeaders.set(name, value);
      }

      // Create a new request to the origin server
      const originRequest = new Request(originUrl, {
        method: request.method,
        headers: forwardedHeaders,
        body: request.body,
        redirect: 'follow'
      });

      // Send the request to the origin server
      const response = await fetch(originRequest);

    		console.log(response.status)

      // Clone the response and add a custom header
      const modifiedResponse = new Response(response.body, response);
      modifiedResponse.headers.set('X-Served-By', 'Cloudflare Worker');
      modifiedResponse.headers.set('X-Storefront-ID', storefrontId);

      return modifiedResponse;

    } catch (error) {
      // Handle any errors
      console.error(`Error processing request for storefront ${storefrontId}:`, error);
      return new Response('An error occurred while processing your request.', {
        status: 500,
        headers: { 'Content-Type': 'text/plain' }
      });
    }

}
} satisfies ExportedHandler<Env>;
```

```json
{
	"$schema": "node_modules/wrangler/config-schema.json",
	"name": "<ENTER_WORKER_NAME>",
	"main": "src/index.ts",
	"upload_source_maps": true,
	"compatibility_date": "2025-03-03",
	"observability": {
		"enabled": true
	},
	"kv_namespaces": [
		{
			"binding": "ROUTING_CONFIG",
			"id": "<YOUR_BINDING_ID>"
		}
	]
}
```

## Notes

- Adapted from the official docs: the official example passes `request.headers` to every tenant origin, which would leak `Authorization`, `Cookie` and similar credentials to third-party servers. The sample builds the outgoing headers from an allowlist; if an origin needs authentication, use a credential scoped to that origin.
- Routing data is read-heavy, which suits KV's low-latency reads; the same pattern fits A/B tests and blue-green rollouts of external origins.
- Known page defect: the frontmatter description of the official page is copied from the distributed-configuration example; the body is correct.
- Related: [KV README](../references/kv/README.md), [api-read](../references/kv/api-read.md).
