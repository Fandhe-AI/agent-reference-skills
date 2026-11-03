---
source: https://developers.cloudflare.com/agents/runtime/observability/tracing/
---

# Tracing

Trace an agent's model calls, tool runs, and approvals as Workers traces, viewable in the Agents tab of the Cloudflare Dashboard.

## Signature / Usage

Enable tracing in your Wrangler configuration:

```jsonc
{
  "$schema": "./node_modules/wrangler/config-schema.json",
  "observability": {
    "traces": {
      "enabled": true
    }
  }
}
```

Trace direct AI SDK calls (v7 identity via telemetry fields) and store payloads:

Adapted (not in the official docs): `model` was undefined; a `declare const model` is added so the snippet type-checks.

```ts
import * as ai from "ai";
import type { LanguageModel } from "ai";
import { wrapAISDK } from "agents/observability/ai";

declare const model: LanguageModel;

const tracedAI = wrapAISDK(ai, {
	storeMessages: true,
	storeTools: true,
});

await tracedAI.generateText({
	model,
	prompt: "Find an available appointment",
	runtimeContext: {
		agentId: "booking-agent-production",
		conversationId: "conversation-123",
		tenantId: "tenant-42",
	},
	telemetry: {
		functionId: "booking-agent",
		includeRuntimeContext: {
			agentId: true,
			conversationId: true,
			tenantId: true,
		},
	},
});
```

AI SDK v6 identity:

```ts
await tracedAI.generateText({
	model,
	prompt: "Find an available appointment",
	experimental_telemetry: {
		functionId: "booking-agent",
		metadata: {
			agentId: "booking-agent-production",
			conversationId: "conversation-123",
			tenantId: "tenant-42",
		},
	},
});
```

Think payload storage and Flue payload exclusion:

```ts
import { Think } from "@cloudflare/think";

export class MyAgent extends Think<Env> {
	override storeMessages = true;
	override storeTools = true;
}
```

```ts
import { instrument } from "@flue/runtime";
import { createCloudflareTracing } from "@flue/runtime/cloudflare";

instrument(createCloudflareTracing({ content: false }));
```

## Options / Props

Span structure per turn:

```txt
invoke_agent {agent class}
├── chat {model}
└── execute_tool {tool}
    └── tool_approval {tool}
```

Agent identity (AI SDK telemetry mapping):

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `functionId` (v7 telemetry / v6 `experimental_telemetry`) | string | — | Maps to `gen_ai.agent.name`; use a shared name such as `booking-agent`. |
| `agentId` | string | — | Maps to `gen_ai.agent.id`; a stable instance, such as `booking-agent-production`. |
| `conversationId` | string | — | Maps to `gen_ai.conversation.id`. |
| other scalars | — | — | v7: `cloudflare.agents.runtime_context.*`; v6: `cloudflare.agents.metadata.*`. |

Payload controls:

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `storeMessages` (Think, `wrapAISDK()`) | boolean | not stored | Records input/output messages on `chat` spans. |
| `storeTools` (Think, `wrapAISDK()`) | boolean | not stored | Records arguments and results on `execute_tool` spans. |
| `content` (Flue `createCloudflareTracing`) | boolean | stored (true) | `false` stops recording messages, instructions, tool definitions, arguments, results. |

Custom harness span attributes (both `invoke_agent` and `chat` spans):

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `gen_ai.operation.name` | string | — | `invoke_agent` / `chat`. |
| `gen_ai.agent.name` | string | — | Shared agent name. |
| `gen_ai.agent.id` | string | — | Stable agent instance identifier. |
| `gen_ai.conversation.id` | string | — | Conversation, session, or thread identifier. |

## Notes

- Adapted from the official docs: added `declare const model: LanguageModel` (and its type import) because the page's `model` is not defined in the snippet; supply your own model.

- Think and Flue v2+ instrument turns automatically. The Lifecycle does not create agent spans by itself: on a Durable Object that installs it directly, use `wrapAISDK()` (supports AI SDK v6 and v7; instruments `generateText`, `streamText`, `generateObject`, `streamObject`) or the Workers custom spans API with `invoke_agent`, `chat`, `execute_tool`, and `tool_approval` spans.
- A direct AI SDK call has no Agent instance, so supply identity on each call. Do not derive the agent name from a request, conversation, or user identifier (too many distinct names). Only include context safe to store; no credentials, tokens, user input, or secrets.
- Payloads may contain PII; record only payloads safe to store. For custom spans add `gen_ai.input.messages`, `gen_ai.output.messages`, `gen_ai.system_instructions`, `gen_ai.tool.call.arguments`, `gen_ai.tool.call.result`; the custom spans API accepts scalar values, so serialize with `JSON.stringify()`. They are recorded whenever the invocation is sampled.
- Approval spans represent lifecycle events within a Worker invocation; they do not measure human wait time across invocations. Workers does not yet support the OpenTelemetry API directly.
- Session replay (messages, reasoning, tool calls, subagents) depends on payload settings and does not display images. Payloads may be truncated by span size limits; traces are not a complete or lossless record.
- Export: attributes follow the OpenTelemetry Generative AI semantic conventions; configure OpenTelemetry export in Workers Observability.
- Pricing: follows Workers Observability pricing. Beginning December 1, 2026, agent traces count toward account-level ingestion and storage under Cloudflare Observability pricing; retention is seven days.
- Workers traces and observability configuration themselves: cloudflare-workers / cloudflare-wrangler.

## Related

- [Diagnostics channels](./diagnostics-channels.md)
- [Lifecycle](./lifecycle.md)
