---
source: https://developers.cloudflare.com/agents/harnesses/
---

# Harnesses overview

A harness is the loop that makes an agent behave like an agent instead of a single model call: prompt building, memory, tool selection, tool results, streaming, message persistence, and the continue/stop decision.

## Signature / Usage

Snippet taken from https://developers.cloudflare.com/agents/harnesses/pi/

```ts
harness = new PiHarness({
	harness: ({ storage, context, onWake }) => {
		const models = createModels();
		models.setProvider(this.ai.provider);
		return Harness.open(
			storage,
			{ models, registry: this.registry, onWake },
			context,
		);
	},
	defaults: { model: this.ai("@cf/zai-org/glm-5.3-flash") },
});

lifecycle = Lifecycle.install(this).use(this.harness);
```

## Options / Props

### Harnesses available

| Name | Type | Default | Description |
|------|------|---------|-------------|
| Pi (`PiHarness`) | Lifecycle capability on a plain Durable Object | — | Recommended starting point for a new agent. Pi Durable owns the loop, transcript, and recovery. You choose the transport. See [pi.md](./pi.md). |
| OpenCode (`OpenCodeHarness`, experimental) | Lifecycle capability on a plain Durable Object | — | OpenCode 2.0 sessions, tools, plugin system. See [opencode.md](./opencode.md). |
| Think (`@cloudflare/think`) | Base class extending `Agent` | — | Opinionated chat-agent framework. See [think-overview.md](./think-overview.md). |
| Build your own | Agents SDK runtime APIs | — | Full control over model call, message format, tool loop, UI protocol. |

### What a harness usually owns

| Concern | Description |
|---------|-------------|
| Prompt construction | System prompts, memory, retrieved context, per-turn instructions. |
| Model execution | The call to Workers AI, OpenAI, Anthropic, Gemini, or another provider. |
| Tool orchestration | Server tools, client tools, MCP tools, approval flows, continuation after tool results. |
| Message persistence | How user, assistant, and tool messages are saved and replayed. |
| Streaming and recovery | How responses stream and resume after disconnects or Durable Object eviction. |
| Extension points | Hooks before and after turns, steps, tool calls, and recovery events. |

## Notes

- Division of labor: the Agents SDK runtime answers "where does this agent live and how does it stay durable" (startup/durable jobs, routing, installed capabilities such as WebSockets, shared state, scheduling, MCP connections); the harness answers "what does this agent do on each turn".
- Conversation storage depends on the harness: Pi and OpenCode manage their own transcripts; Think and `AIChatAgent` install the SDK's `Sessions` capability.
- Distinction: the underlying `Agent` base class and its APIs belong to the sibling agent-class category of this skill. Model providers: Workers AI belongs to the cloudflare-ai skill (workers-ai; https://developers.cloudflare.com/workers-ai/); OpenAI / Anthropic / Gemini SDKs belong to their provider skills (by name, e.g. `openai-api-core`, `anthropic-api-core`, `google-gemini-api`). Code-execution isolation through Sandbox belongs to the cloudflare-sandbox-containers skill (sandbox; https://developers.cloudflare.com/sandbox/).

## Related

- [pi.md](./pi.md)
- [opencode.md](./opencode.md)
- [think-overview.md](./think-overview.md)
