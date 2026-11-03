---
source: https://developers.cloudflare.com/kv/examples/cache-data-with-workers-kv/
---

# Cache data with Workers KV

Read-through cache in a Worker: return JSON from Workers KV if present, otherwise fetch it and store it with an expiration TTL.

Adapted (not in the official docs): the markdown-escape artifact `(.\*?)` in the two helper regexes is restored to `(.*?)`; see Notes.

```ts
interface Env {
  CACHE_KV: KVNamespace;
}

export default {
  async fetch(request, env, ctx): Promise<Response> {

     const EXPIRATION_TTL = 30; // Cache expiration in seconds
    const url = 'https://example.com';
    const cacheKey = "cache-json-example";

    // Try to get data from KV cache first
    let data = await env.CACHE_KV.get(cacheKey, { type: 'json' });
    let fromCache = true;

    // If data is not in cache, fetch it from example.com
    if (!data) {
      console.log('Cache miss. Fetching fresh data from example.com');
      fromCache = false;

    		// In this example, we are fetching HTML content but it can also be API responses or any other data
      const response = await fetch(url);
    		const htmlData = await response.text();

    		// In this example, we are converting HTML to JSON to demonstrate caching JSON data with Workers KV
    		// You could cache any type of data, or even cache the HTML data directly
    		data = helperConvertToJSON(htmlData);
    		// The expirationTtl option is used to set the expiration time for the cache entry (in seconds), otherwise it will be stored indefinitely
    		await env.CACHE_KV.put(cacheKey, JSON.stringify(data), { expirationTtl: EXPIRATION_TTL });
    }

    // Return the appropriate response format
    	return new Response(JSON.stringify({
    		data,
    		fromCache
    	}), {
    		headers: { 'Content-Type': 'application/json' }
    	});

}
} satisfies ExportedHandler<Env>;

// Helper function to convert HTML to JSON
function helperConvertToJSON(html: string) {
// Parse HTML and extract relevant data
const title = helperExtractTitle(html);
const content = helperExtractContent(html);
const lastUpdated = new Date().toISOString();

    return { title, content, lastUpdated };

}

// Helper function to extract title from HTML
function helperExtractTitle(html: string) {
const titleMatch = html.match(/<title>(.*?)<\/title>/i);
return titleMatch ? titleMatch[1] : 'No title found';
}

// Helper function to extract content from HTML
function helperExtractContent(html: string) {
const bodyMatch = html.match(/<body>(.*?)<\/body>/is);
if (!bodyMatch) return 'No content found';

    // Strip HTML tags for a simple text representation
    const textContent = bodyMatch[1].replace(/<[^>]*>/g, ' ')
    	.replace(/\s+/g, ' ')
    	.trim();

    return textContent;

}
```

```jsonc
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
			"binding": "CACHE_KV",
			"id": "<YOUR_BINDING_ID>"
		}
	]
}
```

## Notes

- Corrected from the official docs: the official helper regexes carry a markdown-escape artifact (`(.\*?)`, which matches a literal `*`); they are `(.*?)`. The fetched response is cached without checking `response.ok`, so an error page would be cached for `EXPIRATION_TTL` seconds; check it before `put` in real code.
- `expirationTtl` is in seconds; without it the entry persists until deleted. Contrast with the Workers Cache API (ephemeral, not replicated outside the originating data center).
- Related: [KV README](../references/kv/README.md), [api-write](../references/kv/api-write.md), [api-read](../references/kv/api-read.md).
