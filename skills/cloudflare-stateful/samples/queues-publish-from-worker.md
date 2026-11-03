---
source: https://developers.cloudflare.com/queues/examples/publish-to-a-queue-via-workers/
---

# Publish to a Queue from a Worker

A Worker that validates a JSON body and publishes it to a queue through a producer binding.

## Signature / Usage

Producer binding in the Wrangler configuration:

```jsonc
{
	"$schema": "./node_modules/wrangler/config-schema.json",
	"name": "my-worker",
	"queues": {
		"producers": [
			{
				"queue": "my-queue",
				"binding": "YOUR_QUEUE"
			}
		]
	}
}
```

Adapted (not in the official docs): the official Worker accepts any caller; a constant-time bearer-token check that fails closed when the secret is unset was added, the POST-only restriction was made explicit, the body is capped at 128 KB before parsing, and send errors are no longer echoed to the client. Also, the body is read with `readTextWithLimit()`, which counts bytes while streaming and cancels past the limit, instead of `await req.text()` followed by a size check (which buffers the whole body first). See Notes.

```ts
interface Env {
	YOUR_QUEUE: Queue;
	PRODUCER_TOKEN: string;
}

// Reads the body while counting bytes; cancels and returns null past `limit`.
async function readTextWithLimit(
	req: Request,
	limit: number,
): Promise<string | null> {
	if (!req.body) return "";
	const reader = req.body.getReader();
	const chunks: Uint8Array[] = [];
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
	async fetch(req, env, ctx): Promise<Response> {
		if (req.method !== "POST") {
			return Response.json({ error: "method not allowed" }, { status: 405 });
		}

		// Fail closed: reject when the secret is not configured or does not match.
		const enc = new TextEncoder();
		const expected = env.PRODUCER_TOKEN;
		const provided = enc.encode(req.headers.get("Authorization") ?? "");
		const wanted = enc.encode(`Bearer ${expected ?? ""}`);
		if (
			!expected ||
			provided.byteLength !== wanted.byteLength ||
			!crypto.subtle.timingSafeEqual(provided, wanted)
		) {
			return Response.json({ error: "unauthorized" }, { status: 401 });
		}

		// Reject bodies larger than a single queue message can hold (128 KB).
		const raw = await readTextWithLimit(req, 128 * 1024);
		if (raw === null) {
			return Response.json({ error: "payload too large" }, { status: 413 });
		}

		// Validate the payload is JSON
		// In a production application, we may more robustly validate the payload
		// against a schema using a library like 'zod'
		let messages: unknown;
		try {
			messages = JSON.parse(raw);
		} catch {
			// Return a HTTP 400 (Bad Request) if the payload isn't JSON
			return Response.json({ error: "payload not valid JSON" }, { status: 400 });
		}

		// Publish to the Queue
		try {
			await env.YOUR_QUEUE.send(messages);
		} catch (e) {
			const message = e instanceof Error ? e.message : "Unknown error";
			console.error(`failed to send to the queue: ${message}`);
			// Return a HTTP 500 (Internal Error) if our publish operation fails;
			// the error detail stays in the logs.
			return Response.json({ error: "failed to send to the queue" }, { status: 500 });
		}

		// Return a HTTP 200 if the send succeeded!
		return Response.json({ success: true });
	},
} satisfies ExportedHandler<Env>;
```

Deploy, set the secret (prompted on stdin), and send a test message:

```sh
npx wrangler deploy
npx wrangler secret put PRODUCER_TOKEN
curl -XPOST "https://YOUR_WORKER.YOUR_ACCOUNT.workers.dev" -H "Authorization: Bearer ${PRODUCER_TOKEN}" --data '{"messages": [{"msg":"hello world"}]}'
```

Expected response:

```sh
{"success":true}
```

## Notes

- Adapted from the official docs: the request body is read with `readTextWithLimit()`, which counts bytes while reading the stream and cancels it once the limit is exceeded; `await req.text()` followed by a byte-length check would already have buffered an arbitrarily large body.
- Adapted from the official docs: the official Worker has no authentication even though its curl comment mentions a shared secret. Without a check, anyone who finds the URL can enqueue messages.
- Adapted from the official docs: bodies over 128 KB (the per-message limit) are rejected with HTTP 413 before `JSON.parse`, and the HTTP 500 response no longer includes the raw `send()` error message (it is logged instead).
- HTTP 400 means the body was not valid JSON; HTTP 500 means the message was not written to the queue.
- Create the queue first (`npx wrangler queues create my-queue`) so the producer binding resolves.
- Use `npx wrangler tail` to inspect `console.log` output.

## Related

- [Producer API](../references/queues/producer-api.md)
- [Configure queues](../references/queues/configure-queues.md)
- [Get started](../references/queues/get-started.md)
