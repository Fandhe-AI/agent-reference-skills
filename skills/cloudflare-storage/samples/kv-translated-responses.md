---
source: https://developers.cloudflare.com/kv/examples/workers-kv-to-serve-assets/
---

# Generate dynamic responses from key-value pairs

Store a JSON translations file in Workers KV and return a localized HTML page based on the `Accept-Language` header.

```sh
npx wrangler kv key put hello-world.json --path hello-world.json --namespace-id=<ENTER_NAMESPACE_ID_HERE>
```

```ts
import mime from 'mime';
import parser from 'accept-language-parser'

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

    	// Add handler for translation path (with early return)
    	if(key === 'hello-world'){
    		// Retrieve the language header from the request and the translations from Workers KV
    		const languageHeader = request.headers.get('Accept-Language') || 'en' // Default to English
    		const translations : {
    			"language_code": string,
    			"message": string
    		}[] = await env.assets.get('hello-world.json', 'json') || [];

    		// Extract the requested language
    		const supportedLanguageCodes = translations.map(item => item.language_code)
    		const languageCode = parser.pick(supportedLanguageCodes, languageHeader, {
    			loose: true
    		})

    		// Get the message for the selected language
    		let selectedTranslation = translations.find(item => item.language_code === languageCode)
    		if(!selectedTranslation) selectedTranslation = translations.find(item => item.language_code === "en")
    		const helloWorldTranslated = selectedTranslation!['message'];

    		// Generate and return the translated html
    		const html = `<!DOCTYPE html>
    		<html>
    			<head>
    				<title>Hello World translation</title>
    			</head>
    			<body>
    				<h1>${helloWorldTranslated}</h1>
    			</body>
    		</html>
    		`
    		return new Response(html, {
    			status: 200,
    			headers: {
    				'Content-Type': 'text/html; charset=utf-8'
    			}
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

## Notes

- Transcribed verbatim from the second Worker snippet of the same official page as `kv-serve-static-assets`. Requires `mime` and `accept-language-parser` and a `hello-world.json` array of `{ "language_code", "message" }` objects (see the official page for the full eight-language file).
- Uses the same `assets` KV binding configuration as `kv-serve-static-assets`.
- Related: [KV README](../references/kv/README.md), [api-read](../references/kv/api-read.md).
