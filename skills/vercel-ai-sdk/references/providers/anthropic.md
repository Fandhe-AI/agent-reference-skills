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

Customized instance: `import { createAnthropic } from '@ai-sdk/anthropic'; const anthropic = createAnthropic({ /* custom settings */ });`. Aliases: `anthropic.languageModel(id)`, `anthropic.chat(id)`, `anthropic.messages(id)`. Other factories: `anthropic.files()`, `anthropic.skills()`, `anthropic.decisionModel(id)`, `anthropic.extractionModel(id)`, `anthropic.tools.*`.

## Options / Props

`createAnthropic` settings (all optional):

| Name | Type | Description |
| --- | --- | --- |
| batchResultDownloads | object | Settings for downloading JSON Lines batch results (`maxLineBytes`, default 64 MiB). |
| baseURL | string | URL prefix for API calls. Default `https://api.anthropic.com/v1`. |
| apiKey | string | Sent in the `x-api-key` header. Defaults to `ANTHROPIC_API_KEY`. Only one of `apiKey` or `authToken` is required. |
| authToken | `string \| PromiseLike<string> \| (() => string \| PromiseLike<string>)` | Sent as `Authorization: Bearer`. Defaults to `ANTHROPIC_AUTH_TOKEN`. Pass a function to resolve a token for each request, including short-lived tokens managed by an external credential provider. This setting does not enable OAuth beta headers; configure any required headers explicitly. |
| headers | `Record<string,string>` | Custom headers. |
| fetch | `(input: RequestInfo, init?: RequestInit) => Promise<Response>` | Custom fetch implementation. |

Provider options (`providerOptions.anthropic`, validate with `AnthropicLanguageModelOptions`):

| Name | Type | Description |
| --- | --- | --- |
| thread | object | `{ type: 'create' }` creates a short-lived server-side message thread; `{ type: 'continue', previousMessageId: string }` continues one. The beta header `message-threads-2026-08-12` is added automatically (see Message Threads below). |
| includePings | boolean | Emit typed `ping` parts during streaming without enabling raw chunks. Defaults to `false`; handled locally and not sent in the request body. |
| disableParallelToolUse | boolean | Disable parallel tool calls. Defaults to `false`. |
| sendReasoning | boolean | Include reasoning content in requests. Defaults to `true`. |
| effort | `"low" \| "medium" \| "high" \| "xhigh" \| "max"` | Effort for thinking, text and function calls. Supported levels vary by model. |
| taskBudget | object | Advisory token budget for an agentic turn: `type: "tokens"`, `total` (minimum 20,000), `remaining` (0 to `total`, defaults to `total`). |
| speed | `"fast" \| "standard"` | Fast mode (documented for `claude-opus-4-6`, about 2.5x faster output). |
| serviceTier | `"auto" \| "standard_only"` | Use priority capacity when available (`"auto"`) or standard capacity only (`"standard_only"`); sent as `service_tier`. MiniMax uses its own `"standard"` and `"priority"` values; a tier belonging to another known provider is omitted with an unsupported-setting warning. The applied tier, when returned, is `providerMetadata.anthropic.serviceTier` for generation, streaming and batch results. |
| inferenceGeo | `"us" \| "global"` | Where inference runs (`'us'` US-only infrastructure, `'global'` default). |
| thinking | object | `{ type: 'adaptive' \| 'enabled' \| 'disabled' \| 'between_tools', budgetTokens?, display?: 'summarized' \| 'updates' \| 'omitted', blockBinding? }` |
| toolStreaming | boolean | Tool streaming (and structured output streaming). Defaults to `true`. |
| structuredOutputMode | `"outputFormat" \| "jsonTool" \| "auto"` | How structured outputs are generated. `"auto"` (default) uses `outputFormat` when the model and schema support it, else `jsonTool`; schemas with recursive references, open objects, or more than ten optional properties use the JSON-tool fallback to avoid rejected requests or lost data. |
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
| toolChanges / clearAt / effort (on system message) | array / `'next_user_message'` / string | Mid-conversation tool changes and system controls; require `allowSystemInMessages: true`. A `tool_addition` can add a tool by reference (`toolName`) or define it by value with `tool` (same shape as a `tools` entry; replaces an earlier definition under the same name; beta header `inline-tools-2026-09-15` added automatically). |

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
| `anthropic.tools.computer_20251124({ displayWidthPx, displayHeightPx, displayNumber?, enableZoom?, execute })` | Use `computerToolset_20260801` for Claude Sonnet 5.5 and Opus 5.5 (required), Opus 5, Sonnet 5, Fable 5, Fable 5.1, Fable 5.2, Opus 4.8; `computer_20251124` for Opus 4.5 through 4.7; `computer_20250124` for older models. Toolset takes `configs` (per-action `enabled`, `deferLoading`); no display size params. The SDK preserves the returned member name as `action` and rejects disabled or unavailable members before emitting tool calls, including during streaming; disabled members are also rejected by the tool's local input schema. |
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

### Message threads, heartbeats and workload identity federation

Message threads reduce request upload size and time to first token in long conversations: the first request sends the full conversation and subsequent requests send only new messages. Token usage, pricing and rate limits are unchanged; prompt caching is separate.

```ts
import { anthropic } from '@ai-sdk/anthropic';
import { generateText } from 'ai';

const model = anthropic('claude-sonnet-4-6');
const first = await generateText({
  model,
  system: 'Keep replies brief.',
  prompt: 'Remember that my favorite color is cobalt blue.',
  providerOptions: { anthropic: { thread: { type: 'create' } } },
});

if (first.response.id == null) throw new Error('Missing message ID.');

const second = await generateText({
  model,
  prompt: 'What is my favorite color?',
  providerOptions: {
    anthropic: {
      thread: { type: 'continue', previousMessageId: first.response.id },
    },
  },
});
```

Multi-step agent with an existing client-side `weather` tool (use `prepareStep` to select only new messages):

Adapted (not in the official docs): the official example uses `stepCountIs`, which v7 renamed to `isStepCount`; the import and call below use the v7 name.

```ts
import { ToolLoopAgent, isStepCount } from 'ai';

const agent = new ToolLoopAgent({
  model,
  tools: { weather },
  stopWhen: isStepCount(5),
  prepareStep: ({ steps }) => {
    const previous = steps.at(-1);
    if (previous == null) {
      return { providerOptions: { anthropic: { thread: { type: 'create' } } } };
    }
    const previousMessageId = previous.response.id;
    if (previousMessageId == null) throw new Error('Missing message ID.');
    return {
      messages: previous.response.messages.filter(m => m.role === 'tool'),
      providerOptions: {
        anthropic: { thread: { type: 'continue', previousMessageId } },
      },
    };
  },
});
```

Streaming heartbeats: set `providerOptions.anthropic.includePings: true` to receive typed `ping` stream parts.

```ts
const result = streamText({
  model: anthropic('claude-haiku-4-5'),
  prompt: 'Explain how rainbows form.',
  providerOptions: { anthropic: { includePings: true } },
});

for await (const part of result.stream) {
  if (part.type === 'ping') console.log('Provider is still connected.');
}
```

Workload identity federation: use an `authToken` callback to connect the Anthropic SDK's token exchange and cache helpers (`@anthropic-ai/sdk@0.129.0`) to the AI SDK. Configure your service account and federation rule first (see Anthropic's workload identity federation guide).

```ts
import { createAnthropic } from '@ai-sdk/anthropic';
import { identityTokenFromFile } from '@anthropic-ai/sdk/lib/credentials/identity-token';
import { oidcFederationProvider } from '@anthropic-ai/sdk/lib/credentials/oidc-federation';
import { TokenCache } from '@anthropic-ai/sdk/lib/credentials/token-cache';
import { generateText } from 'ai';

// Create the cache and provider once, then reuse them across requests.
const tokenCache = new TokenCache(
  oidcFederationProvider({
    identityTokenProvider: identityTokenFromFile(
      '/var/run/secrets/anthropic.com/token',
    ),
    federationRuleId: process.env.ANTHROPIC_FEDERATION_RULE_ID!,
    organizationId: process.env.ANTHROPIC_ORGANIZATION_ID!,
    serviceAccountId: process.env.ANTHROPIC_SERVICE_ACCOUNT_ID!,
    // Set this when your rule requires a workspace or to select a specific one.
    workspaceId: process.env.ANTHROPIC_WORKSPACE_ID,
    baseURL: 'https://api.anthropic.com',
    fetch: globalThis.fetch,
  }),
);

const anthropic = createAnthropic({
  authToken: () => tokenCache.getToken(),
  headers: { 'anthropic-beta': 'oauth-2025-04-20' },
});

const { text } = await generateText({
  model: anthropic('claude-opus-5-5'),
  prompt: 'Explain workload identity federation in one sentence.',
});
```

Tool changes can also define a tool by value (`tool_addition` with `tool`):

```ts
import { anthropic } from '@ai-sdk/anthropic';
import { generateText } from 'ai';

const result = await generateText({
  model: anthropic('claude-opus-4-8'),
  // required for system messages inside `messages`:
  allowSystemInMessages: true,
  messages: [
    { role: 'user', content: 'What is the weather forecast for Paris?' },
    {
      role: 'system',
      content: '',
      providerOptions: {
        anthropic: {
          toolChanges: [
            {
              type: 'tool_addition',
              tool: {
                type: 'function',
                name: 'get_forecast',
                description: 'Get 5-day forecast',
                inputSchema: {
                  type: 'object',
                  properties: { city: { type: 'string' } },
                  required: ['city'],
                },
              },
            },
          ],
        },
      },
    },
  ],
});
```

Files API management: `anthropic.files()` also supports `getFileMetadata`, `downloadFile` and `deleteFile` (optional FilesV4 methods; all accept `abortSignal` and per-call `headers`).

```ts
import { anthropic } from '@ai-sdk/anthropic';
import { uploadFile } from 'ai';

const files = anthropic.files();
const { providerReference } = await uploadFile({
  api: files,
  data: { type: 'text', text: 'Notes for Claude.' },
  filename: 'notes.txt',
});

try {
  // These optional FilesV4 operations are supported by Anthropic.
  const metadata = await files.getFileMetadata!({ file: providerReference });
  console.log(metadata.filename, metadata.mediaType, metadata.byteSize);
} finally {
  await files.deleteFile!({ file: providerReference });
}
```

Extraction models (experimental): `anthropic.extractionModel(modelId)` wraps an Anthropic language model and uses the Messages API's structured output to extract typed fields in one call.

```ts
import { anthropic } from '@ai-sdk/anthropic';
import { experimental_extract } from 'ai';

const { answers } = await experimental_extract({
  model: anthropic.extractionModel('claude-sonnet-5-5'),
  referenceDate: '2026-11-11',
  state: 'Invoice INV-2041. Total due $1,250.00 by March 3.',
  fields: {
    invoiceNumber: { type: 'text', instructions: 'The invoice number' },
    total: { type: 'number', instructions: 'Total due', decimals: 2 },
    dueDate: { type: 'date', instructions: 'Payment due date' },
  },
});
```

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

- Adaptive-only models (`claude-sonnet-5-5`, `claude-opus-5-5`, `claude-fable-5`, `claude-fable-5-1`, `claude-fable-5-2`): the provider removes `thinking: { type: 'disabled' }`, converts budget-based `thinking: { type: 'enabled', budgetTokens }` to `{ type: 'adaptive' }` and maps `reasoning: 'none'` to `effort: 'low'`, each with a warning. On `claude-sonnet-5-5` it uses `thinking: { type: 'between_tools' }` instead (accepted only at `low`, `medium`, `high` effort).
- Thinking content is omitted by default from `claude-opus-4-7` onward (`display: 'omitted'`); set `display: 'summarized'` to get reasoning text; `display: 'updates'` (Sonnet 5.5, Opus 5.5, Fable 5.1, Fable 5.2) streams summaries between tool calls.
- Budget-based thinking (`thinking: { type: 'enabled', budgetTokens: 12000 }`) for earlier models; the provider adds `budgetTokens` to `maxOutputTokens`, capped at the model maximum. With manual thinking, `required` / named `toolChoice` falls back to `auto` with a warning.
- Cache usage: `usage.inputTokenDetails.cacheReadTokens` / `cacheWriteTokens`. Minimum cacheable prompt length: 4096 tokens for Claude Opus 4.5 and Haiku 4.5; 1024 for Opus 4.1, Opus 4, Sonnet 4.5, Sonnet 4, Sonnet 3.7, Opus 3; 2048 for Haiku 3.5 and Haiku 3.
- `claude-fable-5-2`: thinking is always adaptive and cannot be disabled; supports `low`, `medium`, `high` (the API default), `xhigh` and `max` effort (`xhigh` is also supported on `claude-opus-4-7`, `claude-opus-4-8`, `claude-opus-5`, `claude-opus-5-5`, `claude-fable-5`, `claude-fable-5-1`, `claude-sonnet-5`, `claude-sonnet-5-5`, `claude-haiku-5-5`). `medium` and `xhigh` behave differently than on `claude-fable-5-1`: start at `high`, re-test `medium` and your current setting rather than carrying over tuned effort, and reserve `xhigh` for the hardest long-running work where you have measured a gain. With `claude-sonnet-5-5`, `claude-opus-5-5`, `claude-fable-5-1` and `claude-fable-5-2`, an empty system message changes effort from the next user turn.
- Preserved thinking (Fable 5.2, Fable 5.1, Opus 5.5, Sonnet 5.5): each earlier thinking block is bound to the request content before it (system prompt, tools, earlier messages); if that content changes between requests, the later thinking blocks become invalid and by default the API rejects the request with a 400 error ("The block is bound to a different conversation"). Keep the message history append-only and the system prompt and tools stable. This also applies inside one multi-step `generateText` / `streamText` call when `prepareStep` returns a different `system`, `activeTools` or `messages`, and when UI message streams redact tool errors (`redactToolErrors`, which defaults to `true` when you pass `onError`) so that `convertToModelMessages` produces a different tool result than the model received. If your application changes this content, set `blockBinding.prefixMismatchBehavior` to `drop_block` so the API drops the invalid thinking blocks instead of rejecting the request; the model thinks again for the dropped context, which can increase output token usage.
- Streaming exposes `anthropic.message_start` custom parts (`part.type === 'custom' && part.kind === 'anthropic.message_start'`).

## Notes

- Adapted from the official docs: the thread multi-step example uses `isStepCount` (v7 name) instead of the official `stepCountIs`; see the migration guide in this skill.
- Message threads: the provider adds the `message-threads-2026-08-12` beta header. On continuation it omits `system` and tool definitions from the request, even if supplied (Anthropic retains them from the create request), and emits a compatibility warning; if the create request used tools you must still supply identical tool definitions on continuation for tool name mapping, execution, tool choice and tool beta headers. Start a new thread to change instructions, tools, model, thinking, tool choice, output format, context management, top-level cache control or beta headers, and after a fallback model responded (`fallback_message` in `providerMetadata.anthropic.iterations`) or a refusal (`finishReason === 'content-filter'` or `rawFinishReason === 'refusal'`). Conversation management is explicit: keep a full local copy of the history, and on continuation send only new messages (for tool calls, only the new tool results); passing the entire history can duplicate messages or cause an API error. Continue only from the latest response ID, which can be continued once; with `streamText` fully consume the stream, then use `await result.response`, and check `await result.finishReason` is not `'interrupted'`. Pin content-dependent beta headers (for example `anthropicBeta: ['pdfs-2024-09-25']`) on the create request and every continuation. Threads expire five minutes after their last request; inspect `APICallError.data.error.details.error_code` and, on `thread_not_found`, `thread_already_continued` or `thread_continue_in_flight`, replay the full conversation once with `thread: { type: 'create' }` (do not treat every 404 as an expired thread; remove cache breakpoints from older replayed messages to stay within the four-breakpoint limit). `generateText` / `streamText` currently reject empty `messages`, so `pause_turn` continuations (`rawFinishReason === 'pause_turn'`) need the provider-level `doGenerate` / `doStream`. Supported on the native Claude API and compatible Anthropic-managed endpoints and by the `@ai-sdk/anthropic-aws` provider (with SigV4 use the same IAM role or user throughout); `@ai-sdk/amazon-bedrock/anthropic` and `@ai-sdk/google-vertex/anthropic` do not support threads. Threads do not support Message Batches, compaction, or context editing other than `clear_thinking_20251015` with `keep: 'all'`, are not eligible for zero data retention or HIPAA readiness, are encrypted in memory and deleted within one hour of last use, and cannot be listed, read or deleted.
- Streaming heartbeats: pings are transient stream events (no generated output, usage change, model-output timeout reset or response content), omitted from text projections and UI message streams; raw pings remain available through `include.rawChunks`; workflow durable streams record them. Applies to the Anthropic Messages implementation (including wrappers using it); Amazon Bedrock Converse does not emit typed Anthropic pings. Enable only when all normalized stream consumers support the `ping` part (a Gateway server must negotiate support before forwarding to older SDK clients); it does not add transport keepalives to UI responses.
- Workload identity federation: the AI SDK resolves `authToken` before each request and sends it as a bearer credential; set the `oauth-2025-04-20` beta explicitly (a bearer token or callback alone does not imply federation). The example covers Messages API inference only, not the Files, Skills or Batch APIs. In the pinned helper version, `getToken()` starts a background exchange when at most two minutes remain and waits for one when at most 30 seconds remain; concurrent requests share the pending exchange; federation renews by exchanging another identity token (no refresh token). Your identity provider must supply fresh identity tokens (the file helper rereads the file but does not rotate it; Anthropic rejects `jti` reuse by default). This does not enable automatic credential discovery or retry on HTTP 401; keep the helper version pinned.
- Native structured outputs now also apply to `claude-fable-5-2`. The same fallback to `"outputFormat"` applies when these models are served through the Amazon Bedrock Anthropic and Google Vertex Anthropic providers; there, schemas that native structured outputs cannot represent keep the JSON tool (self-referencing schemas, more than 10 optional properties, open objects such as maps). When a named `toolChoice` falls back to `auto`, inline tool additions must use the selected tool's name and conflicting additions (including definitions replayed from history) throw `InvalidArgumentError` before the request is sent; `toolChoice: 'none'` sends only the internal JSON response tool and rejects all inline additions; with the JSON-tool fallback a named tool choice sends only that application tool alongside the JSON response tool and a JSON response can be produced without calling it. When the JSON tool cannot be forced (for example manual thinking) and the model answers in text without calling it, the text of its final answer is returned (text before a tool call is still dropped).
- Tools defined by value (`tool_addition` with `tool`) are only known to the model, not part of `tools`, so `generateText` cannot execute their calls; handle those calls yourself or declare the tool in `tools` and add it by `toolName`. `inputSchema` is a plain JSON Schema object. Computer use tools cannot be defined in a message (declare in `tools` and add by `toolName`; otherwise the addition is ignored with a warning); a `tool_removal` always references the tool by `toolName`.
- Files API management: downloads return a `ReadableStream<Uint8Array>` and the response media type when available; Anthropic only allows downloads when `providerMetadata.anthropic.downloadable` is `true` (downloading a file you uploaded returns an API error); metadata and deletion work for uploaded and generated files; standard metadata includes `filename`, `mediaType`, `byteSize`, `createdAt` and `expiresAt` when available. The provider retains its existing Files beta header by default and per-call headers can override it.
- Extraction models: returns `null` when the state has no value for a field and does not return `pNull`, `confidence`, `guess` or `source`; image and PDF files are passed to the language model, which must support them; requests `reasoning: 'none'` by default and forwards `providerOptions.anthropic`. Anthropic's structured output allows at most 16 nullable properties per schema, so field maps with more than 16 fields are sent as parallel calls of up to 16 fields each and merged (usage summed, response and provider metadata from the first call; if any call fails the extraction fails and the others are cancelled).
- The AI SDK uses AI Gateway by default for model strings (`AI_GATEWAY_API_KEY`); AI Gateway does not expose every API in `@ai-sdk/anthropic`, so use the direct provider for provider-specific APIs or custom connection settings.
- Capability table update (ai@7.0.173): `claude-fable-5-2` added with all capabilities; Compaction is now marked supported for `claude-sonnet-4-6` and not supported for `claude-opus-4-5`, `claude-haiku-4-5`, `claude-sonnet-4-5`, `claude-opus-4-1`, `claude-opus-4-0`, `claude-sonnet-4-0`; Tool Search is now marked not supported for `claude-opus-4-1`, `claude-opus-4-0`, `claude-sonnet-4-0` and supported for `claude-haiku-4-5`.
- Source: https://ai-sdk.dev/providers/ai-sdk-providers/anthropic (ai@7.0.173)
- Batch support is experimental. Anthropic Message Batches support different text models within one batch but do not support the `speed` option or completion webhooks (`webhookUrl` returns an unsupported warning); explicit `anthropicBeta` values must be set when starting the batch.
- Structured outputs: for `claude-sonnet-5-5`, `claude-opus-5-5` and `claude-fable-5-1`, `"auto"` uses native `output_config.format`; these models reject forced tool use, so `"jsonTool"` falls back to `"outputFormat"` with a warning, and `required` / named `toolChoice` is downgraded to `auto` with a warning.
- Classifier blocks (Fable 5, Haiku 5.5, Sonnet 5.5 safeguards): a `200` response with `refusal` stop reason surfaces as finish reason `content-filter`, details on `providerMetadata.anthropic.stopDetails`; branch on the finish reason, not on `stop_details`.
- `safeguards` (`dangerous_tool_use`) uses beta header `dangerous-tool-use-2026-09-03`; the official page states Anthropic's platform reference does not document the beta yet.
- On-demand compaction: send exactly one signed compaction block, first in `messages`, replayed unchanged; do not combine `compaction` with `contextManagement`, `stopSequences`, structured output, required/named `toolChoice`, or `taskBudget.remaining`.
- `UIMessage` does not support `providerOptions`; use `convertToModelMessages` first.
- Web search must be enabled in the organization's Console settings. Errors: non-streaming throws, streaming delivers error parts; code execution errors arrive as `tool-error` content parts or stream error parts.
- Model IDs, beta header names and the capability table (Image Input / Object Generation / Tool Usage / Computer Use / Web Search / Tool Search / Compaction) are copied as written in the source; any model ID string is accepted. Package version at the pinned tag: `@ai-sdk/anthropic` 4.0.105.
- Decision models (experimental): `anthropic.decisionModel('claude-haiku-4-5-20251001')` with `experimental_decide`; no probability distributions for Choice / Score; Boolean P(true) is a prompted estimate not guaranteed to be calibrated.
- This is the AI SDK provider package; the raw Claude API is covered by anthropic-api-core and anthropic-api-tools-mcp. The `container.skills` option here is the Claude API Agent Skills feature (Skills API / SKILL.md bundles are covered by anthropic-api-tools-mcp and anthropic-claude-code-extend).

## Related

- [AI SDK Providers](./ai-sdk-providers.md)
- [AI Gateway](./ai-gateway.md)
- [Provider & Model Management](./provider-management.md)
- [defaultSettingsMiddleware](./default-settings-middleware.md)
