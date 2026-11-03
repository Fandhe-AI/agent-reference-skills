---
source: https://developers.cloudflare.com/agents/agent-class/communication-channels/email/
---

# Email (onEmail / replyToEmail / routeAgentEmail)

Agents can send outbound email through a `send_email` binding, receive inbound mail via Email Service routing rules, and route replies back to an existing agent instance.

## Signature / Usage

```ts
import { Agent, callable, routeAgentEmail } from "agents";
import { createAddressBasedEmailResolver, type AgentEmail } from "agents/email";

export class EmailAgent extends Agent {
	@callable()
	async sendWelcomeEmail(to: string) {
		await this.sendEmail({
			binding: this.env.EMAIL,
			to,
			from: "support@yourdomain.com",
			replyTo: "support@yourdomain.com",
			subject: "Welcome",
			text: "Thanks for signing up. Reply to this email if you need help.",
		});
	}

	async onEmail(email: AgentEmail) {
		await this.replyToEmail(email, {
			fromName: "Support Agent",
			body: "Thanks for your email. We received it.",
		});
	}
}

export default {
	async email(message, env) {
		await routeAgentEmail(message, env, {
			resolver: createAddressBasedEmailResolver("EmailAgent"),
		});
	},
} satisfies ExportedHandler<Env>;
```

Wrangler binding:

```jsonc
{
  "$schema": "./node_modules/wrangler/config-schema.json",
  "send_email": [
    {
      "name": "EMAIL",
      "remote": true
    }
  ]
}
```

```toml
[[send_email]]
name = "EMAIL"
remote = true
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `onEmail(email)` | method | — | Handle inbound mail routed to the instance |
| `sendEmail({ binding, to, from, replyTo, subject, text })` | method | — | Send outbound mail through the binding |
| `replyToEmail(email, { fromName, body, subject?, contentType? })` | method | — | Reply to an inbound email |
| `routeAgentEmail(message, env, { resolver })` | function | — | Worker `email` handler helper |
| `createAddressBasedEmailResolver(agentName)` | function | — | Resolver from `agents/email` |
| `send_email[].remote` | `boolean` | — | `true` lets `wrangler dev` call the real Email Service API |

## Notes

- Inbound email uses an Email Service routing rule that sends messages to your Worker. For reply handling include a stable identifier in the reply address, metadata or headers so follow-ups reach the right instance.
- The `from` address `support@yourdomain.com` is a placeholder for a domain you have onboarded.
- Complete walkthrough: https://developers.cloudflare.com/agents/examples/email-agent/. Email Service: https://developers.cloudflare.com/email-service/ and Workers send API https://developers.cloudflare.com/email-service/api/send-emails/workers-api/.
- `email.headers.get("subject")`, `email.getRaw()` and `email.from` are available on `AgentEmail` (see [internals.md](./internals.md)).
- Placeholders: `this.env.EMAIL` is the `send_email` binding named in the wrangler config; `yourdomain.com` addresses and the `"EmailAgent"` resolver name must match your own onboarded domain and DO binding. `message`/`env` in the `email` handler are typed by `ExportedHandler<Env>`.
- `@callable()` needs decorator setup: [callable-methods.md](./callable-methods.md).

## Related

- [Webhooks](./webhooks.md)
- [Autonomous responses](./autonomous-responses.md)
- [Callable methods](./callable-methods.md)
