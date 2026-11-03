---
source: https://developers.cloudflare.com/agents/examples/email-agent/
---

# Email agent with secure reply routing

Agent that sends email through the `send_email` binding, receives inbound mail, and routes signed replies back to the same instance.

## Signature / Usage

Store the signing key as a secret (never in `vars`), and keep local secrets out of git:

```sh
npx wrangler secret put EMAIL_SECRET
```

Adapted (not in the official docs): the `send_email` binding is verbatim; `name`, `main`, `compatibility_date`, and the Durable Object binding and migration were added so the `src/index.ts` below is deployable (mirroring the chat-agent sample). See Notes.

```jsonc
{
  "$schema": "./node_modules/wrangler/config-schema.json",
  "name": "email-agent",
  "main": "src/index.ts",
  // Set this to today's date
  "compatibility_date": "2026-11-03",
  "compatibility_flags": ["nodejs_compat"],
  "send_email": [
    {
      "name": "EMAIL",
      "remote": true
    }
  ],
  "durable_objects": {
    "bindings": [{ "name": "EmailAgent", "class_name": "EmailAgent" }]
  },
  "migrations": [{ "tag": "v1", "new_sqlite_classes": ["EmailAgent"] }]
}
```

`src/index.ts` (parses inbound mail with the separate `postal-mime` npm package; install it with `npm i postal-mime`):

Adapted (not in the official docs): fail-closed when `EMAIL_SECRET` is unset, typed state, auto-reply loop check, and `sendWelcome` is not `@callable()` (see Notes).

```ts
import { Agent, routeAgentEmail } from "agents";
import {
	createAddressBasedEmailResolver,
	createSecureReplyEmailResolver,
	isAutoReplyEmail,
	type AgentEmail,
} from "agents/email";
import PostalMime from "postal-mime";

interface Env {
	EmailAgent: DurableObjectNamespace<EmailAgent>;
	EMAIL: SendEmail;
	EMAIL_SECRET: string;
}

type EmailState = {
	emails: { from: string; subject: string; receivedAt: string }[];
};

export class EmailAgent extends Agent<Env, EmailState> {
	initialState: EmailState = { emails: [] };

	// Not @callable(): a callable method is reachable by any connected client,
	// which would let them send mail to arbitrary recipients from your domain.
	async sendWelcome(to: string) {
		return this.sendEmail({
			binding: this.env.EMAIL,
			to,
			from: "support@yourdomain.com",
			subject: "Welcome!",
			text: "Thanks for signing up.",
			secret: this.env.EMAIL_SECRET,
		});
	}

	async onEmail(email: AgentEmail) {
		const raw = await email.getRaw();
		const parsed = await PostalMime.parse(raw);

		// Avoid mail loops with other auto-responders
		if (isAutoReplyEmail(parsed.headers)) return;

		const subject = parsed.subject ?? "";
		console.log(`Email from ${email.from}: ${subject}`);

		this.setState({
			emails: [
				...this.state.emails,
				{
					from: email.from,
					subject,
					receivedAt: new Date().toISOString(),
				},
			].slice(-100),
		});

		await this.replyToEmail(email, {
			fromName: "Support Bot",
			body: `Thanks for your email! We received: "${subject}"`,
			secret: this.env.EMAIL_SECRET,
		});
	}
}

export default {
	async email(message, env: Env) {
		if (!env.EMAIL_SECRET) {
			message.setReject("Service unavailable");
			return;
		}

		const secureReplyResolver = createSecureReplyEmailResolver(
			env.EMAIL_SECRET,
			{
				maxAge: 7 * 24 * 60 * 60, // 7 days
				onInvalidSignature: (email, reason) => {
					console.warn(`Invalid signature from ${email.from}: ${reason}`);
				},
			},
		);
		const addressResolver = createAddressBasedEmailResolver("EmailAgent");

		await routeAgentEmail(message, env, {
			resolver: async (email, env) => {
				const replyRouting = await secureReplyResolver(email, env);
				if (replyRouting) return replyRouting;
				return addressResolver(email, env);
			},
			onNoRoute: (email) => {
				console.warn(`No route found for email from ${email.from}`);
				email.setReject("Unknown recipient");
			},
		});
	},
} satisfies ExportedHandler<Env>;
```

## Notes

- Adapted from the official docs: the page's Wrangler snippet contains only the `send_email` binding; `name`, `main` (matching `src/index.ts`), `compatibility_date`, and the `EmailAgent` Durable Object binding with a SQLite migration were added, because `routeAgentEmail()` and `createAddressBasedEmailResolver("EmailAgent")` need that binding.
- Prerequisites: a domain onboarded to Cloudflare Email Service (SPF and DKIM DNS records), a `send_email` binding, and an Email Service routing rule that sends inbound mail to the Worker.
- Adapted from the official docs (safety hardening): the official example marks `sendWelcome` with `@callable()`, which exposes an email-sending primitive to every connected client; it is a plain method here. The `EMAIL_SECRET` presence check makes routing fail closed instead of building a resolver from an undefined secret.
- Corrected from the official docs: the page reads `this.state.emails || []` on an `Agent<Env>` with no state type (does not type-check) and mutates the array in place; state is now typed through the second generic with an `initialState`, and capped to the last 100 entries. The `isAutoReplyEmail` check is taken from the page's "Detecting auto-reply emails" section.
- `email.from` is the envelope sender and can be forged; treat it as untrusted when storing or acting on it. Only the signed `X-Agent-*` headers verified by `createSecureReplyEmailResolver` prove a message is a reply to your own outbound mail.
- If an email was routed by the secure resolver, `replyToEmail()` throws when `secret` is omitted; `null` opts out of signing and is not recommended.
- `replyToEmail()` needs the live `AgentEmail`, so it only works inside `onEmail()`; for deferred replies store the sender in state and call `sendEmail()` with `inReplyTo`.

## Related

- [Webhooks](../references/agent-class/webhooks.md)
- [State](../references/agent-class/state.md)
