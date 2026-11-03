---
source: https://developers.cloudflare.com/kv/examples/distributed-configuration-with-workers-kv/
---

# Build a distributed configuration store

Sync per-user configuration from Postgres into Workers KV through the REST API (bulk update), then read it in a Worker.

```js
const postgres = require('postgres');
const { Cloudflare } = require('cloudflare');
const { backOff } = require('exponential-backoff');

if(!process.env.DATABASE_CONNECTION_STRING || !process.env.CLOUDFLARE_EMAIL || !process.env.CLOUDFLARE_API_KEY || !process.env.CLOUDFLARE_WORKERS_KV_NAMESPACE_ID || !process.env.CLOUDFLARE_ACCOUNT_ID) {
console.error('Missing required environment variables.');
process.exit(1);
}

// Setup Postgres connection
const sql = postgres(process.env.DATABASE_CONNECTION_STRING);

// Setup Cloudflare REST API client
const client = new Cloudflare({
apiEmail: process.env.CLOUDFLARE_EMAIL,
apiKey: process.env.CLOUDFLARE_API_KEY,
});

// Function to sync Postgres data to Workers KV
async function syncPreviewStatus() {
console.log('Starting sync of user preview status...');

    try {
    	// Get all users and their preview status
    	const users = await sql`SELECT id, preview_features_enabled FROM users`;

    	console.log(users);

    	// Create the bulk update body
    	const bulkUpdateBody = users.map(user => ({
    		key: user.id,
    		value: JSON.stringify({
    			preview_features_enabled: user.preview_features_enabled
    		})
    	}));

    	const response = await backOff(async () => {
    		console.log("trying to update")
    		try{
    			const response = await client.kv.namespaces.bulkUpdate(process.env.CLOUDFLARE_WORKERS_KV_NAMESPACE_ID, {
    				account_id: process.env.CLOUDFLARE_ACCOUNT_ID,
    				body: bulkUpdateBody
    			});
    		}
    		catch(e){
    			// Implement your error handling and logging here
    			console.log(e);
    			throw e; // Rethrow the error to retry
    		}
    	});

    	console.log(`Sync complete. Updated ${users.length} users.`);
    } catch (error) {
    	console.error('Error syncing preview status:', error);
    }

}

// Run the sync function
syncPreviewStatus()
.catch(console.error)
.finally(() => process.exit(0));
```

```ts
// Example configuration data stored in Workers KV:
// Key: "user-id-abc" | Value: {"preview_features_enabled": false}
// Key: "user-id-def" | Value: {"preview_features_enabled": true}

interface Env {
  USER_CONFIGURATION: KVNamespace;
}

export default {
  async fetch(request, env) {
    // Get user ID from query parameter
    const url = new URL(request.url);
    const userId = url.searchParams.get('userId');

    if (!userId) {
      return new Response('Please provide a userId query parameter', {
        status: 400,
        headers: { 'Content-Type': 'text/plain' }
      });
    }

		const userConfiguration = await env.USER_CONFIGURATION.get<{
			preview_features_enabled: boolean;
		}>(userId, {type: "json"});

		console.log(userConfiguration);

    // Build HTML response
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>My App</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              max-width: 800px;
              margin: 0 auto;
              padding: 20px;
            }
            .preview-banner {
              background-color: #ffeb3b;
              padding: 10px;
              text-align: center;
              margin-bottom: 20px;
              border-radius: 4px;
            }
          </style>
        </head>
        <body>
          ${userConfiguration?.preview_features_enabled ? `
            <div class="preview-banner">
              🎉 You have early access to preview features! 🎉
            </div>
          ` : ''}
          <h1>Welcome to My App</h1>
          <p>This is the regular content everyone sees.</p>
        </body>
      </html>
    `;

    return new Response(html, {
			headers: { "Content-Type": "text/html; charset=utf-8" }
    });
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
			"binding": "USER_CONFIGURATION",
			"id": "<YOUR_BINDING_ID>"
		}
	]
}
```

## Notes

- Transcribed verbatim from the official page (the source's emoji in the HTML template is kept as written). The first fence is an external Node.js script (needs `DATABASE_CONNECTION_STRING`, `CLOUDFLARE_EMAIL`, `CLOUDFLARE_API_KEY`, `CLOUDFLARE_ACCOUNT_ID`, `CLOUDFLARE_WORKERS_KV_NAMESPACE_ID` env vars; the official page also ships `.env` and `db.sql` fences).
- Known page defect: the paragraph after the Worker snippet ("uses `arrayBuffer`... MIME type") is pasted from the static-assets example and does not describe this code.
- The page suggests consolidating many small keys into fewer key-value pairs for better cache efficiency (value size limit 25 MiB).
- Related: [KV README](../references/kv/README.md), [api-read](../references/kv/api-read.md), [kv-bindings](../references/kv/kv-bindings.md).
