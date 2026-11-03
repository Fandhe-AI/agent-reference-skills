---
source: https://developers.cloudflare.com/r2/tutorials/upload-logs-event-notifications/
---

# Log and store upload events in R2 with event notifications

Consume R2 event notifications from a queue in a Worker and write each batch as a JSON log object to a second bucket.

```sh
npx wrangler r2 bucket create example-upload-bucket
npx wrangler r2 bucket create example-log-sink-bucket
```

```sh
npx wrangler queues create example-event-notification-queue
```

```jsonc
{
	"$schema": "./node_modules/wrangler/config-schema.json",
	"name": "event-notification-writer",
	"main": "src/index.ts",
	"upload_source_maps": true,
	// Set this to today's date
	"compatibility_date": "2026-11-03",
	"compatibility_flags": [
		"nodejs_compat"
	],
	"queues": {
		"consumers": [
			{
				"queue": "example-event-notification-queue",
				"max_batch_size": 100,
				"max_batch_timeout": 5
			}
		]
	},
	"r2_buckets": [
		{
			"binding": "LOG_SINK",
			"bucket_name": "example-log-sink-bucket"
		}
	]
}
```

```ts
export interface Env {
	LOG_SINK: R2Bucket;
}

export default {
	async queue(batch, env): Promise<void> {
		const batchId = new Date().toISOString().replace(/[:.]/g, "-");
		const fileName = `upload-logs-${batchId}.json`;

		// Serialize the entire batch of messages to JSON
		const fileContent = new TextEncoder().encode(
			JSON.stringify(batch.messages),
		);

		// Write the batch of messages to R2
		await env.LOG_SINK.put(fileName, fileContent, {
			httpMetadata: {
				contentType: "application/json",
			},
		});
	},
} satisfies ExportedHandler<Env>;
```

```sh
npx wrangler r2 bucket notification create example-upload-bucket --event-type object-create --queue example-event-notification-queue
```

## Notes

- Deploy the consumer Worker (`npx wrangler deploy`) before enabling notifications. Queues documentation: https://developers.cloudflare.com/queues/
- The consumer Worker has only a `queue` handler (no `fetch`). Test by uploading an object to `example-upload-bucket` and checking `example-log-sink-bucket`.
- Related: [R2 README](../references/r2/README.md), [workers-api-usage](../references/r2/workers-api-usage.md).
