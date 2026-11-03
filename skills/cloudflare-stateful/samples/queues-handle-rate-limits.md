---
source: https://developers.cloudflare.com/queues/tutorials/handle-rate-limits/
---

# Handle External API Rate Limits with Queues

Send emails through Resend (default limit: two requests per second) by queuing requests and consuming them in batches of two with delayed retries.

## Signature / Usage

Wrangler configuration:

```jsonc
{
	"$schema": "./node_modules/wrangler/config-schema.json",
	"name": "resend-rate-limit-queue",
	"main": "src/index.ts",
	"upload_source_maps": true,
	// Set this to today's date
	"compatibility_date": "2026-11-03",
	"compatibility_flags": [
		"nodejs_compat"
	],
	"queues": {
		"producers": [
			{
				"binding": "EMAIL_QUEUE",
				"queue": "rate-limit-queue"
			}
		],
		"consumers": [
			{
				"queue": "rate-limit-queue",
				"max_batch_size": 2,
				"max_batch_timeout": 10,
				"max_retries": 3
			}
		]
	}
}
```

Adapted (not in the official docs): the official Worker lets any caller of any method trigger an email to an arbitrary address. A POST-only check, a fail-closed constant-time bearer-token check, and a length and shape check on the address were added, and the producer stores a `requestId` in each message that the consumer passes to Resend as an idempotency key, so a redelivered message does not send a second email. Also, the body is read with `readTextWithLimit()`, which counts bytes while streaming and cancels past the limit, instead of `await req.text()` followed by a size check (which buffers the whole body first). See Notes.

```ts
import { Resend } from "resend";

interface Message {
	email: string;
	// Generated once when the message is written; reused on every redelivery.
	requestId: string;
}

interface Env {
	EMAIL_QUEUE: Queue<Message>;
	RESEND_API_KEY: string;
	ENQUEUE_TOKEN: string;
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
			return new Response("Method not allowed", { status: 405 });
		}
		// Fail closed: reject when the secret is not configured or does not match.
		const enc = new TextEncoder();
		const expected = env.ENQUEUE_TOKEN;
		const provided = enc.encode(req.headers.get("Authorization") ?? "");
		const wanted = enc.encode(`Bearer ${expected ?? ""}`);
		if (
			!expected ||
			provided.byteLength !== wanted.byteLength ||
			!crypto.subtle.timingSafeEqual(provided, wanted)
		) {
			return new Response("Unauthorized", { status: 401 });
		}
		// Bound and shape-check the untrusted body before it is queued.
		const body = await readTextWithLimit(req, 1024);
		if (body === null) {
			return new Response("Payload too large", { status: 413 });
		}
		const email = body.trim();
		if (
			enc.encode(email).byteLength > 254 ||
			!/^[^\s@]+@[^\s@]+$/.test(email)
		) {
			return new Response("Invalid email address", { status: 400 });
		}
		try {
			await env.EMAIL_QUEUE.send(
				{ email, requestId: crypto.randomUUID() },
				{ delaySeconds: 1 },
			);
			return new Response("Success!");
		} catch (e) {
			return new Response("Error!", { status: 500 });
		}
	},
	async queue(batch, env, ctx): Promise<void> {
		// Initialize Resend
		const resend = new Resend(env.RESEND_API_KEY);
		for (const message of batch.messages) {
			try {
				// send email; requestId was fixed by the producer, so Resend can drop
				// a duplicate send when this message is delivered again.
				const sendEmail = await resend.emails.send(
					{
						from: "onboarding@resend.dev",
						to: [message.body.email],
						subject: "Hello World",
						html: "<strong>Sending an email from Worker!</strong>",
					},
					{ idempotencyKey: `queue-email/${message.body.requestId}` },
				);

				// check if the email failed
				if (sendEmail.error) {
					console.error(sendEmail.error);
					message.retry({ delaySeconds: 5 });
				} else {
					// if success, ack the message
					message.ack();
				}
			} catch (e) {
				console.error(e);
				message.retry({ delaySeconds: 5 });
			}
		}
	},
} satisfies ExportedHandler<Env, Message>;
```

Create the queue, install the dependency, and store secrets (prompted on stdin; use `.dev.vars` locally and keep it out of version control):

```sh
npx wrangler queues create rate-limit-queue
npm i resend
npx wrangler secret put RESEND_API_KEY
npx wrangler secret put ENQUEUE_TOKEN
npx wrangler deploy
```

Test:

```sh
curl -X POST -H "Authorization: Bearer ${ENQUEUE_TOKEN}" -d "delivered@resend.dev" "<YOUR_WORKER_URL>"
```

## Notes

- Adapted from the official docs: the request body is read with `readTextWithLimit()`, which counts bytes while reading the stream and cancels it once the limit is exceeded; `await req.text()` followed by a byte-length check would already have buffered an arbitrarily large body.
- Adapted from the official docs: added the method check, a constant-time token check, and validation of the request body (at most 254 bytes and a basic `local@domain` shape) before it is queued; the final tutorial script had no authentication and queued the raw body. The tutorial itself advises checking for `POST` and, in production, queuing a user identifier and looking up the address in a database instead of putting an email address in the message.
- `max_batch_size = 2` matches the two-requests-per-second limit; with fewer than two messages the consumer waits up to `max_batch_timeout` (10 s) before processing.
- The intermediate tutorial version called `message.ack()` again after the success/failure branch, which would acknowledge a message that was just retried; the final script (used here) acks only on success.
- Failed sends are retried with `delaySeconds: 5`, up to `max_retries` (3). No `dead_letter_queue` is configured, so a message that still fails after the last retry is deleted permanently; add a DLQ to keep it.
- Adapted from the official docs: Queues delivers at least once. If Resend accepts a send but the consumer still sees an error (for example, the response is lost), the message is retried, and an invocation failure redelivers the whole batch; the official consumer would then email the recipient again. Following the delivery-guarantees guidance (generate a unique ID when writing the message and use it as the idempotency key of the downstream email API), the producer adds `requestId: crypto.randomUUID()` to the body and the consumer passes `` idempotencyKey: `queue-email/${message.body.requestId}` `` to Resend, which deduplicates repeated keys for a limited window (see Resend's idempotency documentation). Two separate HTTP requests for the same address still produce two messages with different IDs; derive `requestId` from a business identifier (for example, a signup ID) if those must collapse too. Exactly-once email delivery is not guaranteed.

## Related

- [Consumer API](../references/queues/consumer-api.md)
- [Batching and retries](../references/queues/batching-retries.md)
- [Delivery guarantees](../references/queues/delivery-guarantees.md)
- [Producer API](../references/queues/producer-api.md)
- [Local development](../references/queues/local-development.md)
