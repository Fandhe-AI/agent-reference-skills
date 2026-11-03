---
source: https://developers.cloudflare.com/agents/harnesses/think/channels/, https://developers.cloudflare.com/agents/harnesses/think/messengers/
---

# Think channels (experimental) and messengers

A channel is a surface a Think agent talks over: the browser WebSocket, a messenger webhook (Telegram, Slack, and so on), voice, or a custom transport. Channels generalize messengers so you can apply per-channel policy and deliver out-of-band notices. Messengers let a Think agent receive and reply to Chat SDK webhooks directly; Think owns the webhook route, durable reply fiber, conversation routing, and streamed delivery.

## Signature / Usage

```ts
import { Think, messengerChannel } from "@cloudflare/think";
import { telegram } from "@chat-adapter/telegram";

export class Assistant extends Think<Env> {
	configureChannels() {
		return {
			// Override policy for the built-in web channel.
			web: {
				kind: "web",
				ingress: { transport: "websocket" },
				instructions: "You are chatting in a web app. Use markdown freely.",
			},
			// A voice channel with tighter limits.
			voice: {
				kind: "voice",
				ingress: { transport: "voice" },
				instructions: "Keep replies short and speakable. No markdown.",
				maxTurns: 3,
			},
			// A messenger channel (Chat SDK webhook).
			telegram: messengerChannel(
				telegram({
					/* adapter config */
				}),
			),
		};
	}
}
```

Telegram messenger (install `npm install @cloudflare/think agents ai @chat-adapter/telegram`):

```ts
import { Think } from "@cloudflare/think";
import {
	defineMessengers,
	ThinkMessengerStateAgent,
} from "@cloudflare/think/messengers";
import telegramMessenger from "@cloudflare/think/messengers/telegram";

export { ThinkMessengerStateAgent };

export class SupportAgent extends Think<Env> {
	getMessengers() {
		return defineMessengers({
			telegram: telegramMessenger({
				token: this.env.TELEGRAM_BOT_TOKEN,
				userName: "support_bot",
				secretToken: this.env.TELEGRAM_WEBHOOK_SECRET_TOKEN,
			}),
		});
	}
}
```

With the default `telegram` key, register the webhook at `https://<your-worker>/messengers/telegram/webhook`. Store `TELEGRAM_BOT_TOKEN` and `TELEGRAM_WEBHOOK_SECRET_TOKEN` as Worker secrets (and local `.dev.vars`, gitignored), not in source.

## Options / Props

### `ChannelDefinition`

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `kind` | `"web" \| "messenger" \| "voice" \| "custom"` | — | Surface category. |
| `ingress` | `{ transport: "websocket" \| "voice" }` or webhook messenger spec | — | How turns arrive; `messengerChannel()` builds the webhook form. |
| `instructions` | `string \| (ctx: ChannelContext) => string \| Promise<string>` | — | Prepended to the system prompt for turns on this channel. |
| `tools` | `(all: ToolSet) => ToolSet` | — | Narrow the assembled tool set (filter only; cannot add tools). |
| `maxTurns` | `number` | — | Per-channel cap on model steps for a turn. |
| `capabilities` | `ChannelCapabilities` | defaulted for `web` | Surface capabilities (streaming, message editing). |
| `conversation` | mode or resolver | — | Messenger thread routing. |
| `delivery` | delivery policy | — | Messenger delivery policy. |

### Members

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `configureChannels()` | method | `{}` (implicit `web` only) | Return the channel map. |
| `deliverNotice(text, options?)` | method | — | Out-of-band message to a channel, no model turn. |
| `activeChannel` | `ChannelContext \| undefined` | — | In-flight turn's channel (`channelId`, `kind`, messenger details). |
| `renderAttachment(attachment)` | method | — | Map a reply attachment to notice text, or `undefined` to skip. |
| `defineChannels(channels)` | helper | — | Identity helper for type inference. |
| `messengerChannel(definition)` | helper | — | Wrap a Chat SDK adapter as `kind: "messenger"`. |

### `deliverNotice` options

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `channel` | `string` | active turn's channel, else `"web"` | Target channel. |
| `informModel` | `boolean` | `false` | Also write to the model-visible transcript. |
| `kind` | `"final" \| "interim" \| "notice" \| "command"` | `"notice"` | Wire tag. |
| `thread` | `string` | — | Required for out-of-turn delivery to a multi-thread messenger. |

### Messenger options (`telegramMessenger`)

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `token` | `string` | — | Bot token. |
| `userName` | `string` | — | Bot username. |
| `secretToken` | `string` | — | Webhook secret; required in webhook mode unless a custom `verifyWebhook` is passed or `verifyWebhook: false` is explicit. |
| `adapterName` | `string` | — | Distinct Chat SDK adapter name per bot when one agent owns several; duplicates fail at startup. |
| `respondTo` | array of `"direct-message" \| "mention" \| "subscribed-thread" \| "action"` | direct messages and mentions | Events that trigger replies. |
| `conversation` | `"self"` or resolver `(event) => { target: "subagent", name }` | one Think sub-agent per Chat SDK thread | Conversation target. |

## Notes

- Every Think agent has an implicit `web` channel; declare it only to set policy (it cannot be removed). Channel kinds: `messenger` is equivalent to a `getMessengers()` entry; `voice` applies policy and turn context but out-of-band delivery is not yet wired; `custom` is app-defined with the same delivery limits as voice.
- Channel policy is an overridable default applied before `beforeTurn`, so a `beforeTurn` override wins. `maxSteps` precedence: `beforeTurn`'s `maxSteps`, then channel `maxTurns`, then the instance `maxSteps`.
- Select a channel with `runTurn({ input, channel: "voice" })` (or `chat()`); the channel id is stamped on the user message so continued/recovered turns re-apply the same policy. A turn without `channel` applies no channel policy.
- `deliverNotice` does not run inference or enter the turn queue, so it is safe inside a tool's `execute`. `web`: always appended to the transcript (`informModel` only changes phrasing). `messenger`: posted to the provider; pass `thread` out of turn. `voice`/`custom`: out-of-turn delivery throws. `renderAttachment()` output is delivered as a trailing `interim` notice at turn end.
- `configureChannels()` wraps `getMessengers()` and does not replace it; an id collision between them is an error. Observability: `subscribe("channel", cb)` from `agents/observability` emits `channel:resolved`, `channel:delivered`, `notice:delivered`, `notice:failed`.
- Messenger routes are root-only (defining `getMessengers()` on a sub-agent creates none) and are handled after framework sub-agent routing and Think internal routes, before user `onRequest`. Action events become Think user messages (action id, value, source message id, user); read details with `getMessengerContext()?.action`. Actions are opt-in.
- Export `ThinkMessengerStateAgent` from the Worker module (messenger state is backed by `agents/chat-sdk`); production needs no separate Durable Object binding or migration for it, but test harnesses may.
- Delivery: replies use the streamed `chat()` path inside an idempotent managed fiber. If a restart happens before streaming starts Think replays the answer; after streaming starts it posts the configured interruption message to avoid duplicate partial answers. Delivery errors use a generic user-facing message by default; override `delivery.errorResponseText`.
- Every custom `chatSdkMessenger()` must provide `verifyWebhook` or explicitly use `verifyWebhook: false`; disabling verification lets anyone post events to your webhook route, so do not do so in production.
- Adapted from the official docs: the custom `verifyWebhook` example compared a header with `===`; it now fails closed when the header or expected value is missing and compares in constant time. `expectedSignature` is your own value (for example computed from the request body with your provider's scheme).
- Examples: `examples/think-chat-sdk` (Think-native `getMessengers()`) and `examples/chat-sdk-messenger` (manual ingress) in https://github.com/cloudflare/agents. Chat SDK state adapter: Chat SDK communication-channel documentation in the sibling agent-class category.
- Distinction: Slack/Telegram bot platforms themselves are external; voice agents are covered in the agent-class category.

### Per-turn channel and out-of-band notices

```ts
export class Assistant extends Think<Env> {
	async speak() {
		await this.runTurn({ input: "Read this out loud", channel: "voice" });
	}

	async notify() {
		await this.deliverNotice("Your export is ready to download.");

		await this.deliverNotice("Background research finished.", {
			informModel: true, // also record it in the transcript so the next turn knows
		});
	}
}
```

### Multiple bots, respondTo, conversation targets

```ts
defineMessengers({
	support: telegramMessenger({
		adapterName: "support-telegram",
		token: this.env.SUPPORT_TELEGRAM_BOT_TOKEN,
		userName: "support_bot",
		secretToken: this.env.SUPPORT_TELEGRAM_WEBHOOK_SECRET_TOKEN,
		respondTo: ["direct-message", "mention", "subscribed-thread", "action"],
	}),
	sales: telegramMessenger({
		adapterName: "sales-telegram",
		token: this.env.SALES_TELEGRAM_BOT_TOKEN,
		userName: "sales_bot",
		secretToken: this.env.SALES_TELEGRAM_WEBHOOK_SECRET_TOKEN,
		conversation: "self",
	}),
});
```

```ts
telegramMessenger({
	token: this.env.TELEGRAM_BOT_TOKEN,
	userName: "support_bot",
	secretToken: this.env.TELEGRAM_WEBHOOK_SECRET_TOKEN,
	conversation(event) {
		return {
			target: "subagent",
			name: `tenant:${event.thread.channelId ?? event.thread.id}`,
		};
	},
});

const messenger = this.getMessengerContext();
if (messenger?.thread.isDirectMessage === false) {
	// Adjust behavior for group chats.
}
```

### Custom Chat SDK adapter

Adapted (not in the official docs): fail-closed, constant-time signature check; see Notes.

```ts
chatSdkMessenger({
	adapter,
	provider: "custom",
	userName: "custom_bot",
	verifyWebhook(request) {
		const provided = request.headers.get("x-custom-signature");
		if (!provided || !expectedSignature) return false; // fail closed
		const enc = new TextEncoder();
		const a = enc.encode(provided);
		const b = enc.encode(expectedSignature);
		return a.byteLength === b.byteLength && crypto.subtle.timingSafeEqual(a, b);
	},
});
```

### Channel observability

```ts
import { subscribe } from "agents/observability";

const unsubscribe = subscribe("channel", (event) => {
	// event.type is one of:
	//   "channel:resolved"  — a turn resolved a registered channel
	//   "channel:delivered" — a turn's final reply was delivered
	//   "notice:delivered"  — deliverNotice() succeeded
	//   "notice:failed"     — deliverNotice() threw
});
```

## Related

- [think-actions.md](./think-actions.md)
- [think-lifecycle-hooks.md](./think-lifecycle-hooks.md)
- [think-sub-agents-submissions.md](./think-sub-agents-submissions.md)
