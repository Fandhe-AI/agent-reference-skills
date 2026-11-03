---
source: https://developers.cloudflare.com/agents/examples/slack-agent/
---

# Slack agent

Multi-tenant Slack bot: one Durable Object per Slack workspace, replying to DMs and channel mentions with an LLM.

## Signature / Usage

Create the project and install dependencies:

```sh
npm create cloudflare@latest -- my-slack-agent
cd my-slack-agent
npm install agents openai
```

Adapted (not in the official docs): migration uses `new_sqlite_classes` instead of the page's `new_classes` (see Notes).

```jsonc
{
	"$schema": "./node_modules/wrangler/config-schema.json",
	"name": "my-slack-agent",
	"main": "src/index.ts",
	"upload_source_maps": true,
	// Set this to today's date
	"compatibility_date": "2026-11-03",
	"compatibility_flags": [
		"nodejs_compat"
	],
	"durable_objects": {
		"bindings": [
			{
				"name": "MyAgent",
				"class_name": "MyAgent",
				"script_name": "my-slack-agent"
			}
		]
	},
	"migrations": [
		{
			"tag": "v1",
			"new_sqlite_classes": [
				"MyAgent"
			]
		}
	]
}
```

Local secrets go in an untracked file (add it to `.gitignore`); the values are placeholders:

```sh
SLACK_CLIENT_ID="your-slack-client-id"
SLACK_CLIENT_SECRET="your-slack-client-secret"
SLACK_SIGNING_SECRET="your-slack-signing-secret"
OPENAI_API_KEY="your-openai-api-key"
OPENAI_BASE_URL="https://gateway.ai.cloudflare.com/v1/YOUR_ACCOUNT_ID/YOUR_GATEWAY/openai"
```

`src/index.ts` (the base `SlackAgent` class in `src/slack.ts` is not reproduced on the docs page; see Notes):

Adapted (not in the official docs): message role types made explicit so the OpenAI client types check, and the OpenAI client is created per reply instead of at module scope (see Notes).

```ts
import { env } from "cloudflare:workers";
import { SlackAgent } from "./slack";
import { OpenAI } from "openai";
import type { ChatCompletionMessageParam } from "openai/resources/chat/completions";

type SlackMsg = {
	user?: string;
	text?: string;
	ts: string;
	thread_ts?: string;
	subtype?: string;
	bot_id?: string;
};

function normalizeForLLM(
	msgs: SlackMsg[],
	selfUserId: string,
): ChatCompletionMessageParam[] {
	return msgs.map((m) => {
		const role = m.user && m.user !== selfUserId ? "user" : "assistant";
		const text = (m.text ?? "").replace(/<@([A-Z0-9]+)>/g, "@$1");
		return { role, content: text };
	});
}

export class MyAgent extends SlackAgent {
	async generateAIReply(conversation: SlackMsg[]) {
		const selfId = await this.ensureAppUserId();
		const messages = normalizeForLLM(conversation, selfId);

		const system = `You are a helpful AI assistant in Slack.
Be brief, specific, and actionable. If you're unsure, ask a single clarifying question.`;

		const input: ChatCompletionMessageParam[] = [
			{ role: "system", content: system },
			...messages,
		];

		// Built per call from the current env rather than cached at module scope.
		const openai = new OpenAI({
			apiKey: env.OPENAI_API_KEY,
			baseURL: env.OPENAI_BASE_URL,
		});
		const response = await openai.chat.completions.create({
			model: "gpt-4o-mini",
			messages: input,
		});

		const msg = response.choices[0].message.content;
		if (!msg) throw new Error("No message from AI");

		return msg;
	}

	async onSlackEvent(event: { type: string } & Record<string, unknown>) {
		// Ignore bot messages and subtypes (edits, joins, etc.)
		if (event.bot_id || event.subtype) return;

		// Handle direct messages
		if (event.type === "message") {
			const e = event as unknown as SlackMsg & { channel: string };
			const isDM = (e.channel || "").startsWith("D");
			const mentioned = (e.text || "").includes(
				`<@${await this.ensureAppUserId()}>`,
			);

			if (!isDM && !mentioned) return;

			const conversation = await this.fetchConversation(e.channel);
			const content = await this.generateAIReply(conversation);
			await this.sendMessage(content, { channel: e.channel });
			return;
		}

		// Handle @mentions in channels
		if (event.type === "app_mention") {
			const e = event as unknown as SlackMsg & {
				channel: string;
				text?: string;
			};
			const thread = await this.fetchThread(e.channel, e.thread_ts || e.ts);
			const content = await this.generateAIReply(thread);
			await this.sendMessage(content, {
				channel: e.channel,
				thread_ts: e.thread_ts || e.ts,
			});
			return;
		}
	}
}

export default MyAgent.listen({
	clientId: env.SLACK_CLIENT_ID,
	clientSecret: env.SLACK_CLIENT_SECRET,
	slackSigningSecret: env.SLACK_SIGNING_SECRET,
	scopes: [
		"chat:write",
		"chat:write.public",
		"channels:history",
		"app_mentions:read",
		"im:write",
		"im:history",
	],
});
```

Test locally, then deploy. `wrangler secret put` reads the value from stdin; do not pass secrets as arguments:

```sh
npm run dev
npx cloudflared tunnel --url http://localhost:8787
```

```sh
npx wrangler secret put SLACK_CLIENT_ID
npx wrangler secret put SLACK_CLIENT_SECRET
npx wrangler secret put SLACK_SIGNING_SECRET
npx wrangler secret put OPENAI_API_KEY
npx wrangler secret put OPENAI_BASE_URL
npx wrangler deploy
```

## Notes

- Incomplete by design: the official page links the base `SlackAgent` class (OAuth, request-signature verification, event routing) at `https://github.com/cloudflare/awesome-agents/blob/69963298b359ddd66331e8b3b378bb9ae666629f/agents/slack/src/slack.ts` instead of inlining it. This sample does not run until `src/slack.ts` is taken from that repository.
- Corrected from the official docs: the page's migration declares `new_classes` (a legacy key-value-backed Durable Object), but Agents SDK classes need SQLite storage (`new_sqlite_classes`), which the page's own "Add conversation memory" snippet (`ctx.storage.kv`) also requires.
- Corrected from the official docs: `normalizeForLLM` returned `role` as a plain `string`, which does not satisfy the OpenAI client's message type; return and input types are now `ChatCompletionMessageParam[]`.
- Adapted from the official docs: the page constructs the `OpenAI` client once at module scope from `env.OPENAI_API_KEY` / `env.OPENAI_BASE_URL`, so one client built from secrets is cached in a module global and shared by every request in the isolate. The client is now built inside `generateAIReply()` from the current `env`.
- Set `SLACK_SIGNING_SECRET` before exposing `/slack`: events must only be accepted after the HMAC-SHA256 signature check described on the page. Subscribe only to `app_mention` and `message.im`.
- Quick Tunnel URLs are public and temporary; stop the tunnel after testing and update the Slack Request URL on each restart. Each workspace's `team_id` becomes its Durable Object ID.
- The model client is the plain `openai` package; this is not the OpenAI Agents SDK or the Claude Agent SDK.

## Related

- [Webhooks](../references/agent-class/webhooks.md)
- [Scheduling tasks](../references/agent-class/schedule-tasks.md)
