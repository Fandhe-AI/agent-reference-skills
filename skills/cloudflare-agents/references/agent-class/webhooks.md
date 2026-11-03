---
source: https://developers.cloudflare.com/agents/agent-class/communication-channels/webhooks/
---

# Webhooks

Receive webhook events from external services and route each source (repository, customer, device) to a dedicated Agent instance with isolated state.

## Signature / Usage

Adapted (not in the official docs): `verifyGitHubWebhook` fails closed when the secret is unset, the Agent checks that the signed repository maps to `this.name`, and agent names are collision-free (see Notes).

```ts
import { Agent, getAgentByName, routeAgentRequest } from "agents";

export class WebhookAgent extends Agent<Env> {
	async onRequest(request: Request): Promise<Response> {
		if (request.method !== "POST") {
			return new Response("Method not allowed", { status: 405 });
		}

		const rawBody = await request.text();
		const signature = request.headers.get("X-Hub-Signature-256");
		if (
			!(await verifyGitHubWebhook(
				rawBody,
				signature,
				this.env.WEBHOOK_SECRET,
			))
		) {
			return new Response("Invalid signature", { status: 401 });
		}

		let payload: { repository?: { full_name?: string } };
		try {
			payload = JSON.parse(rawBody);
		} catch {
			return new Response("Invalid payload", { status: 400 });
		}

		// A valid signature is not enough: the signed repository must map to THIS
		// agent, otherwise an event for repo A could be replayed to /agents/webhook-agent/<B>.
		const repository = payload.repository?.full_name;
		if (!repository || agentNameFor(repository) !== this.name) {
			return new Response("Wrong agent", { status: 403 });
		}

		await this.processEvent(payload);
		return new Response("OK");
	}

	private async processEvent(payload: unknown) {
		// Store event, update state, trigger actions...
	}
}

// encodeURIComponent keeps "a-b/c" and "a/b-c" distinct ("a-b%2Fc" vs "a%2Fb-c").
// GitHub also sends a numeric repository.id, which is stable across renames.
function agentNameFor(fullName: string): string {
	return encodeURIComponent(fullName.toLowerCase());
}

async function verifyGitHubWebhook(
	rawBody: string,
	signature: string | null,
	secret: string | undefined,
): Promise<boolean> {
	if (!secret) return false;
	if (!signature || !/^sha256=[0-9a-f]{64}$/i.test(signature)) return false;

	const encoder = new TextEncoder();
	const key = await crypto.subtle.importKey(
		"raw",
		encoder.encode(secret),
		{ name: "HMAC", hash: "SHA-256" },
		false,
		["verify"],
	);
	const signatureBytes = Uint8Array.from(
		signature.slice("sha256=".length).match(/.{2}/g) ?? [],
		(byte) => Number.parseInt(byte, 16),
	);

	return crypto.subtle.verify(
		"HMAC",
		key,
		signatureBytes,
		encoder.encode(rawBody),
	);
}

export default {
	async fetch(request: Request, env: Env): Promise<Response> {
		const url = new URL(request.url);

		if (url.pathname === "/webhooks/github" && request.method === "POST") {
			const rawBody = await request.clone().text();
			const signature = request.headers.get("X-Hub-Signature-256");
			if (
				!(await verifyGitHubWebhook(
					rawBody,
					signature,
					env.WEBHOOK_SECRET,
				))
			) {
				return new Response("Invalid signature", { status: 401 });
			}

			let payload: { repository?: { full_name?: string } };
			try {
				payload = JSON.parse(rawBody);
			} catch {
				return new Response("Invalid payload", { status: 400 });
			}

			const repository = payload.repository?.full_name;
			if (!repository) {
				return new Response("Missing repository", { status: 400 });
			}

			const agentName = agentNameFor(repository);
			const agent = await getAgentByName(env.WebhookAgent, agentName);
			return agent.fetch(request);
		}

		return (
			(await routeAgentRequest(request, env)) ||
			new Response("Not found", { status: 404 })
		);
	},
} satisfies ExportedHandler<Env>;
```

Respond quickly, process later:

Adapted (not in the official docs): a comment is added that the signature must be verified over the raw body first (see Notes).

```ts
class WebhookAgent extends Agent {
	async onRequest(request: Request): Promise<Response> {
		// Verify the signature over the raw body first (see the helper above)
		// before parsing or queueing anything.
		const payload = await request.json();

		// Quick validation
		if (!this.isValid(payload)) {
			return new Response("Invalid", { status: 400 });
		}

		// Queue heavy processing
		await this.queue("processWebhook", payload);

		// Respond immediately
		return new Response("Accepted", { status: 202 });
	}

	async processWebhook(payload: WebhookPayload) {
		// Heavy processing happens here, after response sent
		await this.enrichData(payload);
	}
}
```

Think durable submission:

```ts
const submission = await this.submitMessages(messages, {
	idempotencyKey: payload.id,
});

return Response.json(
	{ submissionId: submission.submissionId },
	{ status: 202 },
);
```

Outgoing webhook (note: validate `url` before use):

```ts
export class NotificationAgent extends Agent {
	async notifySlack(message: string) {
		const response = await fetch(this.env.SLACK_WEBHOOK_URL, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ text: message }),
		});

		if (!response.ok) {
			throw new Error(`Slack notification failed: ${response.status}`);
		}
	}
}
```

Secrets:

Adapted (not in the official docs): the secret name is `WEBHOOK_SECRET`, matching the verification code above; see Notes.

```ts
// Store secrets securely (the name must match the code above)
// wrangler secret put WEBHOOK_SECRET

// Access in agent
const secret = this.env.WEBHOOK_SECRET;
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| GitHub | `X-Hub-Signature-256` | — | HMAC-SHA256 |
| Stripe | `Stripe-Signature` | — | HMAC-SHA256 with timestamp |
| Twilio | `X-Twilio-Signature` | — | HMAC-SHA1 |
| Slack | `X-Slack-Signature` | — | HMAC-SHA256 with timestamp |
| Shopify | `X-Shopify-Hmac-Sha256` | — | HMAC-SHA256 (base64) |

## Notes

- Adapted from the official docs: the quick-start helper would have called `encoder.encode(secret)` with an unset secret; it now returns `false` when `secret` is falsy, so a missing `WEBHOOK_SECRET` rejects every request (fail closed). Also the Agent re-verifies in `onRequest`, because Agents are reachable via `routeAgentRequest` too.
- Adapted from the official docs: (1) `replace(/\//g, "-")` mapped `a-b/c` and `a/b-c` to the same Agent, so names now use `encodeURIComponent(full_name.toLowerCase())` (or use the numeric `repository.id`); (2) `/agents/webhook-agent/<name>` reaches `onRequest()` through `routeAgentRequest`, so `onRequest()` verifies the signature over the raw body and compares the signed `repository.full_name` with `this.name` (403 otherwise); (3) the secret is `WEBHOOK_SECRET` everywhere, the official snippet used `GITHUB_WEBHOOK_SECRET` for the `wrangler secret put` step only.
- Verify signatures over the raw body before trusting the payload. The GitHub `sha256=<hex>` helper is GitHub-specific; other providers differ in encoding, signed input, timestamps and replay protection.
- A body signature does not authenticate the webhook URL: if the URL contains an entity ID, compare it with the identity in the verified payload before `getAgentByName()`. Slack sends no authenticated `X-Slack-Team-Id`; validate the timestamped signature and replay window, then read `team_id` from the verified body.
- Respond with 200/202 within seconds; store secrets with `wrangler secret put`; use HTTPS; log rejections. The source also has a `sendSignedWebhook(url, payload)` example (omitted here) that posts to a caller-supplied URL; only send to allow-listed destinations to avoid SSRF.
- For a Think chat turn, `submitMessages()` returns a durable ID and dedupes on `idempotencyKey`; for application side effects around a turn use `startFiber()` ([durable-execution.md](./durable-execution.md)).
- Provider docs: GitHub https://docs.github.com/en/webhooks, Stripe https://stripe.com/docs/webhooks/signatures, Twilio https://www.twilio.com/docs/usage/webhooks/webhooks-security, Slack https://api.slack.com/authentication/verifying-requests-from-slack, Shopify https://shopify.dev/docs/apps/webhooks/configuration/https#step-5-verify-the-webhook.

## Related

- [Queue tasks](./queue-tasks.md)
- [Email](./email.md)
- [Push notifications](./push-notifications.md)
- [Chat SDK and Slack](./chat-sdk.md)
