---
source: https://developers.cloudflare.com/agents/harnesses/think/configuration/
---

# Think configuration

Think is configured by overriding methods and properties on your `Think` subclass. Most agents only override `getModel()`.

## Signature / Usage

Adapted (not in the official docs): the tier lookup falls back to `"fast"` for any stored value that is not a known tier, instead of indexing the model map with it. See Notes.

```ts
type MyConfig = { modelTier: "fast" | "capable"; theme: string };

const MODELS = {
	fast: "@cf/moonshotai/kimi-k2.6",
	capable: "@cf/meta/llama-4-scout-17b-16e-instruct",
} as const;

export class MyAgent extends Think<Env> {
	getModel() {
		const stored = this.getConfig<MyConfig>()?.modelTier;
		const tier = stored === "capable" ? "capable" : "fast";
		return createAI({ binding: this.env.AI })(MODELS[tier]);
	}

	configureSession(session: Session) {
		return session
			.withContext("soul", {
				provider: { get: async () => "You are a helpful coding assistant." },
			})
			.withContext("memory", {
				description: "Important facts learned during conversation.",
				maxTokens: 2000,
			})
			.withCachedPrompt();
	}
}
```

Expose configuration to the client with `@callable`:

Adapted (not in the official docs): the callable validates the client-supplied object and stores only the known fields. See Notes.

```ts
import { callable } from "agents";

export class MyAgent extends Think<Env> {
	@callable()
	updateConfig(config: unknown) {
		const { modelTier, theme } = (config ?? {}) as Record<string, unknown>;
		if (
			(modelTier !== "fast" && modelTier !== "capable") ||
			typeof theme !== "string" ||
			theme.length > 64
		) {
			throw new Error("Invalid configuration");
		}
		this.configure<MyConfig>({ modelTier, theme });
	}
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `getModel()` | `LanguageModel` | throws | Return the model to use. |
| `getSystemPrompt()` | `string` | `"You are a helpful assistant."` | Top of the system prompt, above context blocks. Default used only with no context blocks. |
| `getTools()` | `ToolSet` | `{}` | AI SDK tool set for the agentic loop. |
| `getScheduledTasks()` | map | `{}` | Code-declared recurring prompts or handlers. |
| `getDefaultTimezone()` | `string` | `undefined` | Default timezone for wall-clock scheduled tasks. |
| `getMessengers()` | map | `{}` | Messenger ingress and delivery declarations. |
| `maxSteps` | `number` | `10` | Max tool-call rounds per turn. |
| `sendReasoning` | `boolean` | `true` | Send reasoning chunks to chat clients. |
| `configureSession()` | `Session` | identity | Add context blocks, compaction, search, skills. |
| `getSkills()` | sources | `[]` | Agent Skills sources for on-demand activation. |
| `getSkillScriptRunner()` | runner | `null` | Enables the experimental `run_skill_script` tool. |
| `messageConcurrency` | strategy | `"queue"` | How overlapping submits behave. |
| `includeMcpTools` | `boolean` | `true` | Convert connected MCP tools to AI SDK tools and add them to model turns. |
| `waitForMcpConnections` | `boolean \| { timeout }` | `false` | Wait for MCP servers before inference. |
| `chatRecovery` | object | always on | Durable recovery configuration. |
| `chatStreamStallTimeoutMs` | `number` | `0` (off) | Abort a turn whose model stream produces no chunk for this long (gap between chunks, including tool execution); routes into bounded recovery. |
| `contextOverflow` | object | `undefined` | Opt-in mid-turn context-overflow handling (`reactive`, `maxRetries`, `proactive`). Needs `classifyChatError` plus a session compaction function. |
| `configure<T>(config)` | method | — | Persist a typed configuration object (SQLite; survives hibernation and restarts). |
| `getConfig<T>()` | `T \| null` | — | Read persisted configuration; `null` if never configured. |

### Package exports

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `@cloudflare/think` | module | — | `Think`, `Session`, `skills` namespace. |
| `@cloudflare/think/messengers` | module | — | Messenger contracts, Chat SDK bridge, state agent, delivery. |
| `@cloudflare/think/messengers/telegram` | module | — | Telegram messenger provider and delivery helpers. |
| `@cloudflare/think/workflows` | module | — | `ThinkWorkflow`, `step.prompt()`. |
| `@cloudflare/think/tools/execute` | module | — | `createExecuteTool()` (deprecated Code Mode execution tool). |
| `@cloudflare/think/tools/browser` | module | — | `createBrowserTools()` (Chrome DevTools Protocol tools). |
| `@cloudflare/think/tools/extensions` | module | — | `createExtensionTools()` (LLM-driven extension loading). |
| `@cloudflare/think/extensions` | module | — | `ExtensionManager`, `HostBridgeLoopback`. |

### Peer dependencies

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `agents` | required | — | Cloudflare Agents SDK. |
| `ai` | required | — | AI SDK (this page says v6; see think-overview.md for the v6/v7 pairing). |
| `zod` | required | — | Schema validation (v4). |
| `@cloudflare/computer` | required | — | Workspace and workspace tools. |
| `@chat-adapter/telegram` | optional | — | Required for Telegram messengers. |

## Notes

- Class generics match `Agent<Env, State, Props>`; persisted configuration is typed at the `configure<T>()` and `getConfig<T>()` call sites.
- When `configureSession` adds context blocks, the system prompt is an overridden `getSystemPrompt()` followed by those blocks; Think's `this.messages` getter reads directly from Session's tree-structured storage. Context blocks are labelled system-prompt sections the model can read and update; compaction summarizes older messages to stay within the context window. Full Session API is in the Sessions runtime capability documentation.
- `@cloudflare/codemode` is bundled with `@cloudflare/think`. The Agent Skills parser, sources, and script runner live in `agents/skills` (the script runner pulls `just-bash` through `agents`).
- Adapted from the official docs: `@callable()` methods are reachable by every connected client and receive untyped JSON at runtime, whatever the TypeScript parameter type says. The source persisted the client object as-is and indexed the model map with the stored `modelTier`, so a value such as `"constructor"` would select an inherited `Object` property instead of a model id. The fences validate the fields before `configure()` and choose the tier with an explicit comparison. Authenticate connections before exposing configuration (routing-authentication reference).
- Adapted from the official docs: the source shows `@callable()` in both JS and TS variants; decorators require a TypeScript/bundler transform, so only the TS form is shown. A `getModel()` body is shown in full instead of `/* ... */` placeholders. `createAI` is imported from `agents/models/ai-sdk`.
- Distinction: `Agent` state and `@callable` are documented in the sibling agent-class category; model selection for Workers AI is in the cloudflare-ai skill (workers-ai; https://developers.cloudflare.com/workers-ai/).

## Related

- [think-overview.md](./think-overview.md)
- [think-lifecycle-hooks.md](./think-lifecycle-hooks.md)
- [think-recovery.md](./think-recovery.md)
- [think-client-tools.md](./think-client-tools.md)
