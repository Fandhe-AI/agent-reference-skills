---
source: https://developers.cloudflare.com/durable-objects/examples/alarms-api/
---

# Durable Object Alarm Batching

Batch requests to one Durable Object and flush them from an `alarm()` handler 10 seconds after the first request.

## Signature / Usage

Adapted (not in the official docs): the official example uses numeric storage keys (keys must be strings; unpadded numeric order breaks the `reverse` lookup), does not await `setAlarm`, and passes an array directly as the `fetch` body. Also, the body is read with `readTextWithLimit()`, which counts bytes while streaming and rejects bodies over 64 KiB, instead of storing an unbounded `await request.text()`. The body is read before the storage key is allocated and before the alarm is set. See Notes.

```js
import { DurableObject } from "cloudflare:workers";

// Worker

// Reads the body while counting bytes; cancels and returns null past `limit`.
async function readTextWithLimit(req, limit) {
	if (!req.body) return "";
	const reader = req.body.getReader();
	const chunks = [];
	let total = 0;
	for (;;) {
		const { done, value } = await reader.read();
		if (done) break;
		total += value.byteLength;
		if (total > limit) {
			await reader.cancel();
			return null;
		}
		chunks.push(value);
	}
	const bytes = new Uint8Array(total);
	let offset = 0;
	for (const chunk of chunks) {
		bytes.set(chunk, offset);
		offset += chunk.byteLength;
	}
	return new TextDecoder().decode(bytes);
}

export default {
	async fetch(request, env) {
		return await env.BATCHER.getByName("foo").fetch(request);
	},
};

// Durable Object
export class Batcher extends DurableObject {
	constructor(ctx, env) {
		super(ctx, env);
		this.storage = ctx.storage;
		this.ctx.blockConcurrencyWhile(async () => {
			// Keys are zero-padded strings so lexicographic order matches numeric order.
			let vals = await this.storage.list({ reverse: true, limit: 1 });
			this.count = vals.size == 0 ? 0 : parseInt(vals.keys().next().value, 10);
		});
	}

	async fetch(request) {
		// Read and validate the body first. Awaiting the stream opens the input gate, so
		// other requests can run here; nothing about this request's key is decided yet.
		const body = await readTextWithLimit(request, 64 * 1024);
		if (body === null) {
			return new Response("Payload too large", { status: 413 });
		}

		// Allocate the key synchronously (no await between the increment and the read),
		// so two requests can never get the same key.
		const id = ++this.count;
		const key = String(id).padStart(10, "0");

		// Add the request to the batch.
		await this.storage.put(key, body);

		// Ensure an alarm exists only after the entry is stored, so alarm() never runs
		// before this entry is visible. If there is no alarm currently set, set one for
		// 10 seconds from now; further POSTs in the next 10 seconds join this batch.
		let currentAlarm = await this.storage.getAlarm();
		if (currentAlarm == null) {
			await this.storage.setAlarm(Date.now() + 1000 * 10);
		}
		return new Response(JSON.stringify({ queued: id }), {
			headers: {
				"content-type": "application/json;charset=UTF-8",
			},
		});
	}

	async alarm() {
		// Snapshot the batch. Requests that arrive while the upstream call below is in
		// flight add new keys; only the keys captured here are deleted afterwards.
		let vals = await this.storage.list();
		if (vals.size === 0) return;
		let keys = Array.from(vals.keys());
		let res = await fetch("https://example.com/some-upstream-service", {
			method: "POST",
			headers: { "content-type": "application/json" },
			body: JSON.stringify(Array.from(vals.values())),
		});
		if (!res.ok) {
			// Throwing makes the runtime retry the alarm; the batch stays in storage.
			throw new Error(`upstream failed: ${res.status}`);
		}
		// delete() accepts at most 128 keys per call. Do not reset this.count: that could
		// reuse the keys of entries added during the upstream call.
		for (let i = 0; i < keys.length; i += 128) {
			await this.storage.delete(keys.slice(i, i + 128));
		}
	}
}
```

Wrangler configuration:

Adapted (not in the official docs): `main` points to `src/index.js` because the code above is the JavaScript variant (the official file uses `src/index.ts`), and a `compatibility_date` is added. See Notes.

```jsonc
{
	"$schema": "./node_modules/wrangler/config-schema.json",
	"name": "durable-object-alarm",
	"main": "src/index.js",
	"upload_source_maps": true,
	// Set this to today's date
	"compatibility_date": "2026-11-03",
	"durable_objects": {
		"bindings": [
			{
				"name": "BATCHER",
				"class_name": "Batcher"
			}
		]
	},
	"migrations": [
		{
			"tag": "v1",
			"new_sqlite_classes": [
				"Batcher"
			]
		}
	]
}
```

## Notes

- Adapted from the official docs: the Wrangler `main` is `src/index.js` to match the JavaScript code shown; the official configuration names `src/index.ts`, which belongs to the TypeScript variant. A `compatibility_date` was added because the official snippet omits it; Wrangler needs one to deploy.
- Adapted from the official docs: the request body is read with `readTextWithLimit()`, which counts bytes while reading the stream and cancels it past 64 KiB (an example cap below the storage value size limit); the official example stored `await request.text()` without any bound.
- Corrected from the official docs: the page stores values under numeric keys (`put(this.count, ...)`); storage keys must be strings, and unpadded keys sort lexicographically, so `"10"` sorts before `"9"` and the restored count would be wrong. Keys are now zero-padded.
- Corrected from the official docs: `setAlarm` is now awaited, and the upstream `fetch` body is `JSON.stringify(...)` of the values (an array is not a valid `fetch` body); the upstream URL uses `https`.
- Adapted from the official docs: the official `fetch()` increments `this.count` and sets the alarm before reading the body, then stores the body under `this.count`. Awaiting the body opens the Durable Object input gate, so a concurrent request could increment the counter in between and both bodies would be stored under the same key; and if reading took longer than 10 seconds, `alarm()` could run against empty storage and return, leaving the later-stored body with no alarm. The handler now reads and validates the body first, allocates the key into a local variable (`const id = ++this.count`) with no `await` before it is used, stores the body, and only then calls `getAlarm()` / `setAlarm()`. While `alarm()` is running, `getAlarm()` returns `null`, so a request stored during an in-flight flush schedules the next alarm.
- Adapted from the official docs: a non-OK upstream response throws so the alarm is retried instead of silently deleting the batch.
- Adapted from the official docs: the official `alarm()` reads the batch, awaits the upstream `fetch`, then calls `deleteAll()` and resets the counter. Entries stored by requests that arrived during the `fetch` were deleted unsent, and the reset counter could reuse keys. The handler now deletes only the keys it sent. Delivery is at-least-once (a retry after a partial failure resends the batch), so the upstream should deduplicate.
- An alarm that fails with an uncaught exception is retried; see the Alarms reference for retry limits. Only the JavaScript variant is shown.

## Related

- [Alarms](../references/durable-objects/alarms.md)
- [State](../references/durable-objects/state.md)
- [SQLite storage API](../references/durable-objects/sqlite-storage-api.md)
