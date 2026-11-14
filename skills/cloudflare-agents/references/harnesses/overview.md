---
source: https://developers.cloudflare.com/agents/harnesses/
---

# Harnesses overview

A harness is the loop that makes an agent behave like an agent instead of a single model call: prompt building, memory, tool selection, tool results, streaming, message persistence, and the continue/stop decision. For what a harness does and how to choose one, refer to [Harness](../concepts/harness.md) in Concepts.

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

### Compare harnesses

**Durability** means the harness saves agent progress and can resume work after a crash, restart, or deployment. For SDK integrations, [Lifecycle](../runtime/lifecycle.md) coordinates startup and recovery jobs. [Cloudflare Computer](../tools/filesystem.md) provides persistent files and file tools for agents. Agents can return to files they created or edited across turns, even after a restart.

| Harness | Runs in | Durability | Cloudflare Computer |
|---------|---------|------------|---------------------|
| Pi ([pi.md](./pi.md)) | Durable Objects via the Agents SDK | 🟢 Automatically resumes interrupted work | 🟢 Supported |
| [Flue](https://flueframework.com/) | Durable Objects via the Agents SDK | 🟢 Automatically resumes interrupted work | 🟢 Supported |
| OpenCode ([opencode.md](./opencode.md)) | Durable Objects via the Agents SDK | 🟡 Resumes interrupted work | 🟡 Example plugin |
| Claude Code ([claude-code.md](./claude-code.md)) (Experimental) | Linux container driven by a Durable Object via the Agents SDK | 🟡 Reattaches after object restart; container loss fails or retries the turn | 🔴 No built-in integration |
| Codex ([codex.md](./codex.md)) (Experimental) | Linux container driven by a Durable Object via the Agents SDK | 🟡 Reattaches after object restart; container loss fails or retries the turn | 🔴 No built-in integration |
| Think ([think-overview.md](./think-overview.md)) (Experimental) | Durable Objects via the Agents SDK | 🟡 Continues from saved output | 🟢 Supported |
| Nanocode ([nanocode.md](./nanocode.md)) (Pre-1.0) | Wasm in its own Durable Object host | 🟡 Resumes turns; some tools cannot recover | 🟡 Custom adapter needed |
| Exo ([exo.md](./exo.md)) (Pre-1.0) | Wasm in Durable Objects + Linux sandbox | 🟡 Resumes turns; interrupted tools may fail | 🔴 No integration |
| Self-modifying ([self-modifying.md](./self-modifying.md)) (Experimental) | Durable Objects via the Agents SDK + Dynamic Workers | 🟡 Resumes turns; custom tools may rerun | 🟡 Workspace in example |
| [Coding agent CLIs without a harness](https://developers.cloudflare.com/sandbox/coding-agents/) | Linux sandbox | 🔴 No automatic recovery in these examples | 🔴 No integration |

### Choose an approach

Use [Pi](./pi.md) when you want Pi Durable to own the loop, transcript, and recovery. Use [OpenCode](./opencode.md) for OpenCode's sessions, tools, and plugins, or [Think](./think-overview.md) for an AI SDK chat agent with built-in Workspace tools.

Use [Flue](https://flueframework.com/) for a TypeScript hooks API built on Pi, with automatic recovery and a [Cloudflare target](https://flueframework.com/docs/guide/cloudflare-target/) that uses the Agents SDK.

Use [Claude Code](./claude-code.md) or [Codex](./codex.md) to run those CLIs with their native tools, plugins, and settings in a Linux container. A Durable Object stores sessions and coordinates recovery. Container loss fails the interrupted turn by default. Optional retry reruns it. Workspace recovery uses filesystem snapshots, so edits since the last snapshot can be lost.

[Build your own harness](./build-your-own.md) when you need control over model calls, message formats, or tool execution. Compose it from the Agents SDK runtime capabilities (see the runtime category of this skill).

Explore the experimental [self-modifying](./self-modifying.md) example for an agent that edits its own TypeScript harness.

[Nanocode](./nanocode.md) and [Exo](./exo.md) provide their own runtimes for running agents on Cloudflare.

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
- Conversation storage depends on the harness: Pi and OpenCode manage their own transcripts; Claude Code and Codex keep their records in a SQLite-backed `HarnessStore`; Think and `AIChatAgent` install the SDK's `Sessions` capability.
- Distinction: the underlying `Agent` base class and its APIs belong to the sibling agent-class category of this skill. Model providers: Workers AI belongs to the cloudflare-ai skill (workers-ai; https://developers.cloudflare.com/workers-ai/); OpenAI / Anthropic / Gemini SDKs belong to their provider skills (by name, e.g. `openai-api-core`, `anthropic-api-core`, `google-gemini-api`). Code-execution isolation through Sandbox belongs to the cloudflare-sandbox-containers skill (sandbox; https://developers.cloudflare.com/sandbox/).

## Related

- [pi.md](./pi.md)
- [opencode.md](./opencode.md)
- [think-overview.md](./think-overview.md)
- [Harness (concept)](../concepts/harness.md)
- [claude-code.md](./claude-code.md)
- [codex.md](./codex.md)
- [nanocode.md](./nanocode.md)
- [exo.md](./exo.md)
- [self-modifying.md](./self-modifying.md)
- [build-your-own.md](./build-your-own.md)
