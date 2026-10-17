---
source: https://ai-sdk.dev/providers/ai-sdk-providers/anthropic
---

# Anthropic

The `@ai-sdk/anthropic` provider: language model support for the Anthropic Messages API, plus provider-defined tools, Agent Skills container support, and decision models.

## Signature / Usage

```bash
npm i @ai-sdk/anthropic
```

```ts
import { anthropic } from '@ai-sdk/anthropic';
import { generateText } from 'ai';

const { text } = await generateText({
  model: anthropic('claude-haiku-5-5'),
  prompt: 'Write a vegetarian lasagna recipe for 4 people.',
});
```

Customized instance: `import { createAnthropic } from '@ai-sdk/anthropic'; const anthropic = createAnthropic({ /* custom settings */ });`. Aliases: `anthropic.languageModel(id)`, `anthropic.chat(id)`, `anthropic.messages(id)`. Other factories: `anthropic.files()`, `anthropic.skills()`, `anthropic.decisionModel(id)`, `anthropic.tools.*`.

## Options / Props

`createAnthropic` settings (all optional):

| Name | Type | Description |
| --- | --- | --- |
| batchResultDownloads | object | Settings for downloading JSON Lines batch results (`maxLineBytes`, default 64 MiB). |
| baseURL | string | URL prefix for API calls. Default `https://api.anthropic.com/v1`. |
| apiKey | string | Sent in the `x-api-key` header. Defaults to `ANTHROPIC_API_KEY`. Only one of `apiKey` or `authToken` is required. |
| authToken | string | Sent as `Authorization: Bearer`. Defaults to `ANTHROPIC_AUTH_TOKEN`. |
| headers | `Record<string,string>` | Custom headers. |
| fetch | `(input: RequestInfo, init?: RequestInit) => Promise<Response>` | Custom fetch implementation. |

Provider options (`providerOptions.anthropic`, validate with `AnthropicLanguageModelOptions`):

| Name | Type | Description |
| --- | --- | --- |
| disableParallelToolUse | boolean | Disable parallel tool calls. Defaults to `false`. |
| sendReasoning | boolean | Include reasoning content in requests. Defaults to `true`. |
| effort | `"low" \| "medium" \| "high" \| "xhigh" \| "max"` | Effort for thinking, text and function calls. Supported levels vary by model. |
| taskBudget | object | Advisory token budget for an agentic turn: `type: "tokens"`, `total` (minimum 20,000), `remaining` (0 to `total`, defaults to `total`). |
| speed | `"fast" \| "standard"` | Fast mode (documented for `claude-opus-4-6`, about 2.5x faster output). |
| inferenceGeo | `"us" \| "global"` | Where inference runs (`'us'` US-only infrastructure, `'global'` default). |
| thinking | object | `{ type: 'adaptive' \| 'enabled' \| 'disabled' \| 'between_tools', budgetTokens?, display?: 'summarized' \| 'updates' \| 'omitted', blockBinding? }` |
| toolStreaming | boolean | Tool streaming (and structured output streaming). Defaults to `true`. |
| structuredOutputMode | `"outputFormat" \| "jsonTool" \| "auto"` | How structured outputs are generated. `"auto"` (default) uses `outputFormat` when supported, else `jsonTool`. |
| metadata | object | `userId` (opaque identifier, must not contain PII). |
| contextManagement | object | `edits`: `clear_tool_uses_20250919` (`trigger`, `keep`, `clearAtLeast`, `clearToolInputs`, `excludeTools`), `clear_thinking_20251015` (`keep`), `compact_20260112` (`trigger`, `instructions`, `pauseAfterCompaction`). Applied edits in `providerMetadata.anthropic.contextManagement.appliedEdits`. |
| compaction | object | On-demand compaction `{ type: 'summarize', instructions }`; adds beta header `compact-2026-09-04`; check `rawFinishReason === 'compaction'`. |
| fallbacks | `'default' \| Array<{ model, max_tokens?, thinking?, output_config?, speed? }>` | Server-side retry on a fallback model when classifiers block a turn (Fable 5 family etc.); detect via `providerMetadata.anthropic.iterations` (`fallback_message`). |
| safeguards | array | e.g. `{ type: 'dangerous_tool_use', classifierContext: { v: 1, permission_mode: 'auto' } }`; verdicts in `providerMetadata.anthropic.safeguardResults`. |
| mcpServers | array | MCP connector: `{ type: 'url', name, url, authorizationToken?, toolConfiguration?: { enabled, allowedTools } }`. |
| container | object | Code execution container with `skills: [{ type: 'anthropic' \| 'custom', skillId, version? }]`. |
| cacheControl (on messages / parts / tools) | `{ type: 'ephemeral', ttl?: '1h' }` | Prompt cache breakpoint set in `providerOptions.anthropic` of a message, part or tool. |
| containerUpload (on file part) | boolean | Make an uploaded file available inside the code execution sandbox. |
| deferLoading / allowedCallers (on tool) | boolean / string[] | Tool search deferral; programmatic tool calling callers such as `['code_execution_20260120']`. |
| toolChanges / clearAt / effort (on system message) | array / `'next_user_message'` / string | Mid-conversation tool changes and system controls; require `allowSystemInMessages: true`. |

### Provider-defined tools

```ts
const result = await generateText({
  model: anthropic('claude-opus-5-5'),
  prompt: 'What are the latest developments in AI?',
  tools: {
    web_search: anthropic.tools.webSearch_20260318({
      maxUses: 5,
      responseInclusion: 'excluded',
    }),
  },
});
```

| Tool | Notes |
| --- | --- |
| `anthropic.tools.bash_20250124()` (also `bash_20241022`) | Runs through the `experimental_sandbox` passed to `generateText` / `streamText`, or a custom `execute`. Params `command`, `restart`. |
| `anthropic.tools.memory_20250818({ execute })` | Local memory tool. |
| `anthropic.tools.textEditor_20250728({ maxCharacters?, execute })` | Also `textEditor_20250124`, `textEditor_20241022`; `textEditor_20250429` is deprecated. |
| `anthropic.tools.computer_20251124({ displayWidthPx, displayHeightPx, displayNumber?, enableZoom?, execute })` | Use `computerToolset_20260801` for Claude Sonnet 5.5 and Opus 5.5 (required), Opus 5, Sonnet 5, Fable 5, Fable 5.1, Opus 4.8; `computer_20251124` for Opus 4.5 through 4.7; `computer_20250124` for older models. Toolset takes `configs` (per-action `enabled`, `deferLoading`); no display size params. |
| `anthropic.tools.webSearch_20260318` | Options `maxUses`, `allowedDomains`, `blockedDomains`, `userLocation`, `responseInclusion` (`'full' \| 'excluded'`). Older `webSearch_20260209` / `webSearch_20250305` remain. Citations on `text.citations`; typed `AnthropicTextProviderMetadata` / `AnthropicCitation`. |
| `anthropic.tools.webFetch_20260318` | Options `maxUses`, `allowedDomains`, `blockedDomains`, `citations`, `maxContentTokens`, `useCache` (default `true`), `responseInclusion`. |
| `anthropic.tools.advisor_20260301({ model, maxUses?, maxTokens?, caching? })` | Provider-executed; advisor model at least as capable as the executor; `maxTokens` minimum 1024; beta header `advisor-tool-2026-03-01` sent automatically; advisor calls do not stream. |
| `anthropic.tools.toolSearchBm25_20251119()` / `toolSearchRegex_20251119()` | Tool search; mark tools with `providerOptions.anthropic.deferLoading: true`. Custom search via `toModelOutput` returning `tool-reference` content. |
| `anthropic.tools.codeExecution_20260120()` | Recommended; also `codeExecution_20250825` (Python and Bash) and `codeExecution_20250522` (Bash only). Files via `uploadFile({ api: anthropic.files() })` + `containerUpload: true`. |

Programmatic tool calling: set `providerOptions.anthropic.allowedCallers: ['code_execution_20260120']` on tools and pass `prepareStep: forwardAnthropicContainerIdFromLastStep` to keep the container ID (`providerMetadata.anthropic.container.id`) across steps. Requires `claude-sonnet-4-6`, `claude-sonnet-4-5`, `claude-opus-4-6` or `claude-opus-4-5`.

Agent Skills container usage:

```ts
const result = await generateText({
  model: anthropic('claude-sonnet-4-5'),
  tools: {
    code_execution: anthropic.tools.codeExecution_20260120(),
  },
  prompt: 'Create a presentation about renewable energy with 5 slides',
  providerOptions: {
    anthropic: {
      container: {
        skills: [
          {
            type: 'anthropic',
            skillId: 'pptx',
            version: 'latest', // optional
          },
        ],
      },
    } satisfies AnthropicLanguageModelOptions,
  },
});
```

Built-in skills: `pptx`, `docx`, `pdf`, `xlsx`; custom skills use `type: 'custom'`.

### Reasoning, effort and caching

```ts
const { text, reasoningText } = await generateText({
  model: anthropic('claude-opus-4-8'),
  prompt: 'How many people will live in the world in 2040?',
  providerOptions: {
    anthropic: {
      thinking: { type: 'adaptive', display: 'summarized' },
    } satisfies AnthropicLanguageModelOptions,
  },
});
```

- Adaptive-only models (`claude-sonnet-5-5`, `claude-opus-5-5`, `claude-fable-5`, `claude-fable-5-1`): the provider removes `thinking: { type: 'disabled' }`, converts budget-based `thinking: { type: 'enabled', budgetTokens }` to `{ type: 'adaptive' }` and maps `reasoning: 'none'` to `effort: 'low'`, each with a warning. On `claude-sonnet-5-5` it uses `thinking: { type: 'between_tools' }` instead (accepted only at `low`, `medium`, `high` effort).
- Thinking content is omitted by default from `claude-opus-4-7` onward (`display: 'omitted'`); set `display: 'summarized'` to get reasoning text; `display: 'updates'` (Sonnet 5.5, Opus 5.5, Fable 5.1) streams summaries between tool calls.
- Budget-based thinking (`thinking: { type: 'enabled', budgetTokens: 12000 }`) for earlier models; the provider adds `budgetTokens` to `maxOutputTokens`, capped at the model maximum. With manual thinking, `required` / named `toolChoice` falls back to `auto` with a warning.
- Cache usage: `usage.inputTokenDetails.cacheReadTokens` / `cacheWriteTokens`. Minimum cacheable prompt length: 4096 tokens for Claude Opus 4.5 and Haiku 4.5; 1024 for Opus 4.1, Opus 4, Sonnet 4.5, Sonnet 4, Sonnet 3.7, Opus 3; 2048 for Haiku 3.5 and Haiku 3.
- Streaming exposes `anthropic.message_start` custom parts (`part.type === 'custom' && part.kind === 'anthropic.message_start'`).

## Notes

- Batch support is experimental. Anthropic Message Batches support different text models within one batch but do not support the `speed` option or completion webhooks (`webhookUrl` returns an unsupported warning); explicit `anthropicBeta` values must be set when starting the batch.
- Structured outputs: for `claude-sonnet-5-5`, `claude-opus-5-5` and `claude-fable-5-1`, `"auto"` uses native `output_config.format`; these models reject forced tool use, so `"jsonTool"` falls back to `"outputFormat"` with a warning, and `required` / named `toolChoice` is downgraded to `auto` with a warning.
- Classifier blocks (Fable 5, Haiku 5.5, Sonnet 5.5 safeguards): a `200` response with `refusal` stop reason surfaces as finish reason `content-filter`, details on `providerMetadata.anthropic.stopDetails`; branch on the finish reason, not on `stop_details`.
- `safeguards` (`dangerous_tool_use`) uses beta header `dangerous-tool-use-2026-09-03`; the official page states Anthropic's platform reference does not document the beta yet.
- On-demand compaction: send exactly one signed compaction block, first in `messages`, replayed unchanged; do not combine `compaction` with `contextManagement`, `stopSequences`, structured output, required/named `toolChoice`, or `taskBudget.remaining`.
- `UIMessage` does not support `providerOptions`; use `convertToModelMessages` first.
- Web search must be enabled in the organization's Console settings. Errors: non-streaming throws, streaming delivers error parts; code execution errors arrive as `tool-error` content parts or stream error parts.
- Model IDs, beta header names and the capability table (Image Input / Object Generation / Tool Usage / Computer Use / Web Search / Tool Search / Compaction) are copied as written in the source; any model ID string is accepted. Package version at the pinned tag: `@ai-sdk/anthropic` 4.0.81.
- Decision models (experimental): `anthropic.decisionModel('claude-haiku-4-5-20251001')` with `experimental_decide`; no probability distributions for Choice / Score; Boolean P(true) is a prompted estimate not guaranteed to be calibrated.
- This is the AI SDK provider package; the raw Claude API is covered by anthropic-api-core and anthropic-api-tools-mcp. The `container.skills` option here is the Claude API Agent Skills feature (Skills API / SKILL.md bundles are covered by anthropic-api-tools-mcp and anthropic-claude-code-extend).

## Related

- [AI SDK Providers](./ai-sdk-providers.md)
- [AI Gateway](./ai-gateway.md)
- [Provider & Model Management](./provider-management.md)
- [defaultSettingsMiddleware](./default-settings-middleware.md)
