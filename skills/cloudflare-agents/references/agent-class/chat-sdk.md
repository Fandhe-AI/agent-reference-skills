---
source: https://developers.cloudflare.com/agents/agent-class/communication-channels/chat-sdk/, https://developers.cloudflare.com/agents/agent-class/communication-channels/slack/
---

# Chat SDK state and Slack

`agents/chat-sdk` provides a Chat SDK `StateAdapter` that stores subscriptions, locks, queues, dedupe keys, thread/channel state and history in Durable Object SQLite via `ChatSdkStateAgent` sub-agents. Slack is a communication channel whose events reach the Worker through the Slack Events API.

## Signature / Usage

```ts
import { Agent } from "agents";
import { createChatSdkState } from "agents/chat-sdk";
import { Chat } from "chat";
import { createTelegramAdapter } from "@chat-adapter/telegram";

export { ChatSdkStateAgent } from "agents/chat-sdk";

export class MessengerAgent extends Agent<Env> {
	private chat!: Chat;

	onStart() {
		const telegram = createTelegramAdapter({
			botToken: this.env.TELEGRAM_BOT_TOKEN,
			mode: "webhook",
			userName: "my_bot",
		});

		this.chat = new Chat({
			adapters: { telegram },
			userName: "my_bot",
			state: createChatSdkState(),
			concurrency: { strategy: "burst", debounceMs: 600 },
		});
	}
}
```

Install: `npm i agents chat`. Custom sharding:

```ts
const state = createChatSdkState({
	shardKey(threadId) {
		return threadId.split(":").slice(0, 2).join(":");
	},
});

const state2 = createChatSdkState({
	keyShard(key) {
		if (!key.startsWith("dedupe:telegram:")) {
			return undefined;
		}

		const chatId = key.slice("dedupe:telegram:".length).split(":")[0];
		return chatId ? `telegram:${chatId}` : undefined;
	},
});
```

Wrangler:

```jsonc
{
  "$schema": "./node_modules/wrangler/config-schema.json",
  // Set this to today's date
  "compatibility_date": "2026-11-03",
  "compatibility_flags": [
    "nodejs_compat"
  ],
  "durable_objects": {
    "bindings": [
      {
        "class_name": "MessengerAgent",
        "name": "MessengerAgent"
      }
    ]
  },
  "migrations": [
    {
      "new_sqlite_classes": [
        "MessengerAgent"
      ],
      "tag": "v1"
    }
  ]
}
```

## Options / Props

`createChatSdkState(options)`:

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `agent` | subclass of `ChatSdkStateAgent` | `ChatSdkStateAgent` | Optional custom state agent |
| `parent` | Agent | current Agent from `getCurrentAgent()` | Parent that calls `subAgent()` for state shards |
| `name` | `string` | `default` | Default shard name for unmappable keys |
| `shardKey` | function | first two colon-separated segments | Maps thread IDs and lock keys to a shard |
| `keyShard` | function | — | Maps generic cache/list keys to a shard; `undefined` falls back to the built-in sharder |

Default recognized key prefixes: `thread-state:`, `channel-state:`, `msg-history:`, `transcripts:user:`.

Slack events: `message.im` (direct messages), `app_mention` (channel mentions).

## Notes

- Export `ChatSdkStateAgent` from the Worker entry so sub-agent routing resolves it. `ChatSdkStateAdapter` is the concrete implementation; most apps do not instantiate it.
- TTL reads are strict; physical cleanup is lazy via one scheduled callback for the earliest expiry.
- Works with any Chat SDK adapter (Telegram, Slack, Discord, Teams, Google Chat). Example: https://github.com/cloudflare/agents/tree/main/examples/chat-sdk-messenger.
- Slack (no code on its docs page): verify each request, identify the installed workspace and route by team or enterprise ID; each workspace can map to an isolated Agent. Build guide: https://developers.cloudflare.com/agents/examples/slack-agent/; Slack docs: https://api.slack.com/apis/events-api and https://api.slack.com/authentication. For signature verification see [webhooks.md](./webhooks.md).
- Sub-agent mechanics: [sub-agents.md](./sub-agents.md).

## Related

- [Sub-agents](./sub-agents.md)
- [Webhooks](./webhooks.md)
- [Chat agents](./chat-agents.md)
