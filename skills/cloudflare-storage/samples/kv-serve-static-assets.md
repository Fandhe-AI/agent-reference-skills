---
source: https://developers.cloudflare.com/kv/examples/workers-kv-to-serve-assets/
---

# Store and retrieve static assets

Upload a file to Workers KV with Wrangler and serve any key as an HTTP path from a Worker.

Adapted (not in the official docs): the local/remote flags are added because `wrangler kv key put` writes to local storage by default; see Notes.

```sh
# Local storage (default; used by wrangler dev)
npx wrangler kv key put index.html --path index.html --namespace-id=<ENTER_NAMESPACE_ID_HERE>

# Production namespace on Cloudflare (overwrites an existing key of the same name)
npx wrangler kv key put index.html --path index.html --namespace-id=<ENTER_NAMESPACE_ID_HERE> --remote
```

Adapted (not in the official docs): rejects keys over 512 bytes with 414 before calling `get()`; see Notes.

```ts
import mime from "mime";

interface Env {
assets: KVNamespace;
}

export default {
	async fetch(request, env, ctx): Promise<Response> {
		// Return error if not a get request
		if(request.method !== 'GET'){
			return new Response('Method Not Allowed', {
				status: 405,
			})
		}

    	// Get the key from the url & return error if key missing
    	const parsedUrl = new URL(request.url)
    	const key = parsedUrl.pathname.replace(/^\/+/, '') // Strip any preceding /'s
    	if(!key){
    		return new Response('Missing path in URL', {
    			status: 400
    		})
    	}

    	// KV keys are limited to 512 bytes; longer keys make get() throw
    	if(new TextEncoder().encode(key).length > 512){
    		return new Response('Key too long', {
    			status: 414
    		})
    	}

    	// Get the mimetype from the key path
    	const extension = key.split('.').pop();
    	let mimeType = mime.getType(extension) || "text/plain";
    	if (mimeType.startsWith("text") || mimeType === "application/javascript") {
    		mimeType += "; charset=utf-8";
    	}

    	// Get the value from the Workers KV store and return it if found
    	const value = await env.assets.get(key, 'arrayBuffer')
    	if(!value){
    		return new Response("Not found", {
    			status: 404
    		})
    	}

    	// Return the response from the Workers application with the value from the KV store
    	return new Response(value, {
    		status: 200,
    		headers: new Headers({
    			"Content-Type": mimeType
    		})
    	});
    },

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
			"binding": "assets",
			"id": "<YOUR_BINDING_ID>"
		}
	]
}
```

## Notes

- Transcribed from the official page apart from the key-length guard. `get(key, 'arrayBuffer')` keeps binary assets (images, audio, video) intact. Requires the `mime` npm package.
- Every key in the bound namespace is publicly readable through this Worker (the URL path is the key); do not store non-public values in the same namespace.
- Adapted from the official docs: the key is derived from the URL path, and KV keys are limited to 512 bytes (see limits); the official code lets a longer path make `get()` throw, so the sample returns 414 first.
- For hosting a whole front-end or full-stack app, the official page recommends Workers static assets or Pages instead of KV.
- The official page's `wrangler kv key put` text says it writes to production and preview namespaces, but the command only takes `--namespace-id`.
- Adapted from the official docs: `wrangler kv key put` (and `kv bulk put`) writes to local storage by default, so a deployed Worker would not see the file; add `--remote` to upload to the production namespace (see the cloudflare-storage `scripts/kv.md`, "Local versus remote storage").
- Related: [KV README](../references/kv/README.md), [kv-commands](../references/kv/kv-commands.md), [kv-bindings](../references/kv/kv-bindings.md).
