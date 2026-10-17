---
source: https://ai-sdk.dev/docs/migration-guides/migration-guide-6-0
---

# Migrate AI SDK 5.x to 6.0

Breaking-change guide, codemod list and before/after snippets for upgrading from AI SDK 5.x to 6.0.

## Signature / Usage

Recommended process: back up the project, upgrade to AI SDK 6.0, follow the breaking changes, verify, commit.

```sh
pnpm install ai@^6 @ai-sdk/react@^3 @ai-sdk/openai@^3
npx @ai-sdk/codemod v6
npx @ai-sdk/codemod v6/rename-text-embedding-to-embedding src/
```

Experimental_Agent -> ToolLoopAgent:

```tsx
import { ToolLoopAgent } from 'ai';

const agent = new ToolLoopAgent({
  model: __MODEL__,
  instructions: 'You are a helpful assistant.',
  tools: {
    // your tools here
  },
  // stopWhen defaults to stepCountIs(20)
});

const result = await agent.generate({
  prompt: 'What is the weather in San Francisco?',
});
```

`generateObject` / `streamObject` -> `generateText` / `streamText` with `output`:

```tsx
import { generateText, Output } from 'ai';
import { z } from 'zod';

const { output } = await generateText({
  model: __MODEL__,
  output: Output.object({
    schema: z.object({
      recipe: z.object({
        name: z.string(),
        steps: z.array(z.string()),
      }),
    }),
  }),
  prompt: 'Generate a lasagna recipe.',
});
```

## Options / Props

Package versions to install:

| Package | Version |
| --- | --- |
| `ai` | `^6.0.0` |
| `@ai-sdk/provider` | `^3.0.0` |
| `@ai-sdk/provider-utils` | `^4.0.0` |
| `@ai-sdk/*` | `^3.0.0` |

Codemods (`npx @ai-sdk/codemod v6` runs all v5 -> v6 codemods; `npx @ai-sdk/codemod upgrade` runs all codemods from all versions v4, v5 and v6, so use `v6` when upgrading from v5):

| Codemod | Description |
| --- | --- |
| `rename-text-embedding-to-embedding` | `textEmbeddingModel` -> `embeddingModel`, `textEmbedding` -> `embedding` on providers |
| `rename-mock-v2-to-v3` | V2 mock classes from `ai/test` -> V3 (e.g. `MockLanguageModelV2` -> `MockLanguageModelV3`) |
| `rename-tool-call-options-to-tool-execution-options` | `ToolCallOptions` type -> `ToolExecutionOptions` |
| `rename-core-message-to-model-message` | `CoreMessage` type -> `ModelMessage` |
| `rename-converttocoremessages-to-converttomodelmessages` | `convertToCoreMessages` -> `convertToModelMessages` |
| `rename-vertex-provider-metadata-key` | `google` -> `vertex` in `providerMetadata` / `providerOptions` for Google Vertex files |
| `wrap-tomodeloutput-parameter` | wraps `toModelOutput` parameter in object destructuring (`output` -> `{ output }`) |
| `add-await-converttomodelmessages` | adds `await` to `convertToModelMessages` calls (now async) |

AI SDK Core changes:

| Change | AI SDK 5 | AI SDK 6 |
| --- | --- | --- |
| Agent class | `Experimental_Agent` (`system`, default `stopWhen` of one step) | `ToolLoopAgent` (`instructions`, `stopWhen` defaults to `stepCountIs(20)`) |
| Core messages | `CoreMessage`, `convertToCoreMessages` | removed; use `ModelMessage`, `await convertToModelMessages(...)` |
| Structured output | `generateObject`, `streamObject` (`partialObjectStream`) | deprecated, will be removed; use `generateText` / `streamText` with `output: Output.object({ schema })` (`output`, `partialOutputStream`) |
| `convertToModelMessages` | sync | async (supports async `Tool.toModelOutput()`) |
| `Tool.toModelOutput` | `toModelOutput: output => ...` | `toModelOutput: ({ output }) => ...` |
| Tool `name` | accepted by types but did not set the name | no longer accepted in `tool()`; the tool name is the key in the `tools` object |
| `LanguageModelUsage` | `cachedInputTokens`, `reasoningTokens` | deprecated; use `inputTokenDetails.cacheReadTokens`, `outputTokenDetails.reasoningTokens` |
| `ToolCallOptions` | | renamed `ToolExecutionOptions` (and deprecated) |
| Strict tool mode | `providerOptions.openai.strictJsonSchema` applied to all tools | per-tool `strict: true` on `tool()` |
| Tool output content | | more flexible tool output / result content support |
| `ToolCallRepairFunction` | `system: string \| undefined` | `system: string \| SystemModelMessage \| undefined` |
| Embedding methods | `textEmbeddingModel`, `textEmbedding` (with generics on `EmbeddingModel`, `embed`, `embedMany`) | `embeddingModel`, `embedding` (generics removed) |
| Warnings | `CallWarning`, `ImageModelCallWarning`, `SpeechWarning`, `TranscriptionWarning` | single `Warning` type exported from `ai` |
| Warning logger | | new; disable with `AI_SDK_LOG_WARNINGS=false` |
| Finish reason | `unknown` | merged into `other` |

AI SDK UI changes:

| Change | AI SDK 5 | AI SDK 6 |
| --- | --- | --- |
| Tool UI part approval states | | `approval-requested`, `approval-responded`, `output-denied` added to the tool UI part `state` union (update exhaustive `switch`) |
| Static tool part check | `isToolUIPart` | `isStaticToolUIPart` |
| Static or dynamic tool part check | `isToolOrDynamicToolUIPart` | `isToolUIPart` (old name deprecated, still available) |
| Static tool name | `getToolName` | `getStaticToolName` |
| Static or dynamic tool name | `getToolOrDynamicToolName` | `getToolName` (old name deprecated, still available) |

Provider changes:

| Provider | Change |
| --- | --- |
| OpenAI | `strictJsonSchema` now defaults to true for JSON outputs and tool calls (use `null` instead of `undefined`, or set `strictJsonSchema: false`); `structuredOutputs` provider option removed from chat models (use `strictJsonSchema`). |
| Azure | `azure()` uses the Responses API by default (`azure.chat()` for Chat Completions, `azure.responses()` explicit). Responses API `providerMetadata` / `providerOptions` key is `azure` instead of `openai` (`openai` still accepted for input, output metadata uses `azure`). |
| Anthropic | New `structuredOutputMode` option: `'outputFormat'`, `'jsonTool'`, `'auto'` (default; `outputFormat` when supported by the model, otherwise `jsonTool`). |
| Google Vertex | `providerMetadata` / `providerOptions` key is `vertex` instead of `google` (`google` still accepted for input). |
| `ai/test` | V2 mock classes removed; use `MockEmbeddingModelV3`, `MockImageModelV3`, `MockLanguageModelV3`, `MockProviderV3`, `MockSpeechModelV3`, `MockTranscriptionModelV3`. |

## Notes

- The published page at tag `ai@7.0.142` shows `isStepCount` in its AI SDK 5 / 6 example snippets; the 7.0 guide states `stepCountIs` -> `isStepCount` is a 7.0 rename, so this page uses the 6.x name `stepCountIs`.
- The page's snippets use the placeholders `__PROVIDER_IMPORT__` and `__MODEL__`.
- `generateObject` / `streamObject` are deprecated in 6.0; their later status is covered by `migration-guide-7-0.md` (still listed there for `system` -> `instructions`).
- Codemods may not cover all changes; manual edits may be required.
- `Experimental_Agent` replaced by `ToolLoopAgent` (agent classes are covered in the agents category; for other vendors' agent SDKs see openai-agents, anthropic-agent-sdk).
- The official install command uses `@latest`; this skill's latest is v7, so the command here pins the target major (`ai@^6`, `@ai-sdk/*@^3` per the package versions table above).

## Related

- [Migrate AI SDK 6.x to 7.0](./migration-guide-7-0.md)
- [Migrate AI SDK 4.x to 5.0](./migration-guide-5-0.md)
- [Versioning](./versioning.md)
