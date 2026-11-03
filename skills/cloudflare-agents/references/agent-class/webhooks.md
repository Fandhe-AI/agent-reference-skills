---
source: https://developers.cloudflare.com/agents/agent-class/communication-channels/webhooks/
---

# Webhooks

Receive webhook events from external services and route each source (repository, customer, device) to a dedicated Agent instance with isolated state.

## Signature / Usage

Adapted (not in the official docs): `verifyGitHubWebhook` now fails closed when the secret is unset (see Notes).

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

		let payload: unknown;
		try {
			payload = JSON.parse(rawBody);
		} catch {
			return new Response("Invalid payload", { status: 400 });
		}

		await this.processEvent(payload);
		return new Response("OK");
	}

	private async processEvent(payload: unknown) {
		// Store event, update state, trigger actions...
	}
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

			const agentName = repository.toLowerCase().replace(/\//g, "-");
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

```ts
class WebhookAgent extends Agent {
	async onRequest(request: Request): Promise<Response> {
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

```ts
// Store secrets securely
// wrangler secret put GITHUB_WEBHOOK_SECRET

// Access in agent
const secret = this.env.GITHUB_WEBHOOK_SECRET;
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
