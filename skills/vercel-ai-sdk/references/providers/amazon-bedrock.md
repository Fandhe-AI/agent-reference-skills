---
source: https://ai-sdk.dev/providers/ai-sdk-providers/amazon-bedrock
---

# Amazon Bedrock

The `@ai-sdk/amazon-bedrock` provider: Bedrock language models (Converse API), embedding, reranking and image models, plus the Bedrock Anthropic provider (InvokeModel API) and the Bedrock Mantle provider (OpenAI-compatible API).

## Signature / Usage

```bash
npm i @ai-sdk/amazon-bedrock
```

```ts
import { amazonBedrock } from '@ai-sdk/amazon-bedrock';
import { generateText } from 'ai';

const { text } = await generateText({
  model: amazonBedrock('meta.llama3-70b-instruct-v1:0'),
  prompt: 'Write a vegetarian lasagna recipe for 4 people.',
});
```

Customized instance with an API key (takes precedence over SigV4):

```ts
import { createAmazonBedrock } from '@ai-sdk/amazon-bedrock';

const amazonBedrock = createAmazonBedrock({
  apiKey: 'your-api-key-here',
  region: 'us-east-1',
});
```

AWS SDK credential chain:

```ts
import { createAmazonBedrock } from '@ai-sdk/amazon-bedrock';
import { fromNodeProviderChain } from '@aws-sdk/credential-providers';

const amazonBedrock = createAmazonBedrock({
  region: 'us-east-1',
  credentialProvider: fromNodeProviderChain(),
});
```

Factories: `amazonBedrock(id)`, `amazonBedrock.embedding(id)`, `amazonBedrock.reranking(id)`, `amazonBedrock.image(id)`; separate entry points `bedrockAnthropic` / `createBedrockAnthropic` (`@ai-sdk/amazon-bedrock/anthropic`) and `bedrockMantle` / `createBedrockMantle` (`@ai-sdk/amazon-bedrock/mantle`).

## Options / Props

`createAmazonBedrock` settings (all optional):

| Name | Type | Description |
| --- | --- | --- |
| region | string | AWS region. Defaults to `AWS_REGION`. |
| accessKeyId | string | Defaults to `AWS_ACCESS_KEY_ID`. |
| secretAccessKey | string | Defaults to `AWS_SECRET_ACCESS_KEY`. |
| sessionToken | string | Temporary credentials. With both access keys set as strings, `AWS_SESSION_TOKEN` from the environment is not used; only a `sessionToken` you pass. |
| credentialProvider | `() => Promise<{ accessKeyId; secretAccessKey; sessionToken? }>` | AWS credential provider chain. |
| apiKey | `string \| PromiseLike<string> \| (() => string \| PromiseLike<string>)` | Bearer token authentication, used instead of SigV4. Defaults to `AWS_BEARER_TOKEN_BEDROCK`. Pass a callback to resolve the API key before each request; it can return a string or a promise, and token caching and renewal are handled by the caller. A callback or promise selects API key authentication and must resolve to a non-empty string; lookup failures do not switch authentication methods. The same `apiKey` type applies to `createBedrockAnthropic` and `createBedrockMantle`. |
| baseURL | string | Custom endpoint / proxy. When omitted, the service-specific `AWS_ENDPOINT_URL_BEDROCK_RUNTIME` and `AWS_ENDPOINT_URL_BEDROCK_AGENT_RUNTIME` variables take precedence over `AWS_ENDPOINT_URL`. |
| headers | `Record<string, string>` | Custom headers. |
| fetch | `(input: RequestInfo, init?: RequestInit) => Promise<Response>` | Custom fetch implementation. |

Language model provider options (`providerOptions.amazonBedrock`, legacy key `providerOptions.bedrock` still supported; type `AmazonBedrockLanguageModelChatOptions`):

| Name | Type | Description |
| --- | --- | --- |
| structuredOutputMode | `"outputFormat" \| "jsonTool" \| "auto"` | For Anthropic models. `"auto"` (default) uses native structured output when supported, else the JSON tool; Claude Sonnet 4.6 and Claude Haiku 4.5 use the JSON tool fallback in `"auto"`. In `"auto"` mode, supported Claude 5 models use native output for compatible schemas; recursive references, open objects, and schemas with more than ten optional properties fall back to the JSON tool, or JSON instructions for models that reject forced tool use. `providerOptions.anthropic.structuredOutputMode` is also honored; `amazonBedrock` / `bedrock` takes precedence. |
| guardrailConfig | object | `guardrailIdentifier`, `guardrailVersion`, `trace`, `streamProcessingMode`. Trace in `providerMetadata.bedrock.trace`. |
| reasoningConfig | object | Anthropic: `{ type: 'enabled', budgetTokens }` (min 1024, max 64000). Amazon Nova 2: `{ type: 'enabled', maxReasoningEffort: 'low' \| 'medium' \| 'high' }`. |
| serviceTier | `'reserved' \| 'priority' \| 'default' \| 'flex'` | Inference service tier per request. |
| anthropicBeta | string[] | Anthropic beta features, e.g. `['context-1m-2025-08-07']` (1M-token context for Claude Sonnet 4 models). |
| additionalModelRequestFields | object | Model-specific fields (for example `providerOptions.anthropic.additionalModelRequestFields: { top_k: 350 }`). |

Message-part `providerOptions.bedrock`: `cachePoint: { type: 'default', ttl?: '5m' | '1h' }` (1-hour TTL only for Claude Opus 4.5, Haiku 4.5 and Sonnet 4.5; longer TTL entries must come before shorter ones), `guardContent: true` with `guardContentQualifiers` (`'grounding_source'`, `'query'`, `'guard_content'`), `citations: { enabled: true }` on file parts.

Provider metadata `providerMetadata.bedrock`: `trace`, `performanceConfig` (e.g. `{ latency: 'optimized' }`), `serviceTier` (e.g. `{ type: 'on-demand' }`), `usage` (cache token usage: `cacheReadInputTokens`, `cacheWriteInputTokens`, `cacheDetails`), `stopSequence`.

### Capabilities

Embedding options (`AmazonBedrockEmbeddingModelOptions`, under `providerOptions.bedrock`):

| Model family | Options |
| --- | --- |
| Titan (`amazon.titan-embed-text-v2:0`) | `dimensions` (1024 default, 512, 256), `normalize` (default `true`). |
| Nova (`amazon.nova-embed-text-v2:0`) | `embeddingDimension` (256, 384, 1024 default, 3072), `embeddingPurpose` (`GENERIC_INDEX` default, `TEXT_RETRIEVAL`, `IMAGE_RETRIEVAL`, `VIDEO_RETRIEVAL`, `DOCUMENT_RETRIEVAL`, `AUDIO_RETRIEVAL`, `GENERIC_RETRIEVAL`, `CLASSIFICATION`, `CLUSTERING`), `truncate` (`NONE`, `START`, `END` default). |
| Cohere (`cohere.embed-english-v3`) | `inputType` (`search_document`, `search_query` default, `classification`, `clustering`), `truncate`. |
| Cohere v4 (`cohere.embed-v4:0`, 1536 default dimensions, custom dimensions supported) | `outputDimension` (Cohere v4 output dimensions). |

Application inference profile ARNs do not identify their model: pass `{ modelFamily: 'cohere' }` (embedding, `AmazonBedrockEmbeddingModelSettings`) or `{ modelFamily: 'anthropic' }` (language, `AmazonBedrockChatModelSettings`) so the provider selects the right request format.

```ts
import { bedrockAnthropic } from '@ai-sdk/amazon-bedrock/anthropic';

const profileArn =
  'arn:aws:bedrock:us-east-1:123456789012:application-inference-profile/qibm5eutlkcy';

const model = bedrockAnthropic(profileArn);
```

- Reranking: `amazonBedrock.reranking('cohere.rerank-v3-5:0')` with `rerank` (Bedrock Rerank API); `amazon.rerank-v1:0` and `cohere.rerank-v3-5:0` both support text documents, object documents and `topN`; options `nextToken` (pagination) and `additionalModelRequestFields`.
- Image models (`amazonBedrock.image(...)`): generation plus editing (image variation, inpainting, outpainting, background removal); see the official page for image model settings and options. `amazon.nova-canvas-v1:0`: 320-4096 pixels per side divisible by 16, aspect ratio 1:4 to 4:1, fewer than 4,194,304 pixels, supports image editing and mask input, max 5 images per call. Image provider options: `quality`, `negativeText`, `cfgScale`, `style`, `taskType`, `maskPrompt`, `outPaintingMode`, `similarityStrength`.
- Computer use via Anthropic: Bash, Text Editor and Computer provider-defined tools are available on Bedrock.
- Response headers: `result.response.headers` (for example `x-amzn-requestid` for correlating Bedrock API calls).
- Bedrock Anthropic provider (`createBedrockAnthropic`): Anthropic's Messages API through Bedrock's native InvokeModel API for feature parity with the Anthropic API (for example `stop_sequence` in streaming); accepts application inference profile ARNs; settings `region`, `accessKeyId`, `secretAccessKey`, `sessionToken`, `apiKey`, `baseURL`, `headers`, `fetch`, `credentialProvider`; option `metadata.userId`; cache control via `providerOptions.anthropic.cacheControl`.
- Bedrock Mantle provider (`createBedrockMantle`): OpenAI-compatible Mantle API; `bedrockMantle('openai.gpt-oss-120b')` defaults to Chat Completions, `.chat(id)` / `.responses(id)` select explicitly (`openai.gpt-oss-safeguard-*` do not support the Responses API); provider options go under the `openai` namespace; default base URL `https://bedrock-mantle.{region}.api.aws/v1` or `/openai/v1` chosen per model.

## Notes

- Access to Bedrock foundation models is not granted by default; request model access in the AWS console. API key authentication (`AWS_BEARER_TOKEN_BEDROCK`) is the recommended path; static IAM user keys need the `AmazonBedrockFullAccess` policy and do not require `sessionToken`.
- Reasoning: the top-level `reasoning` parameter also works (the ai@7.0.142 docs stated that Amazon Nova 2 maps `'xhigh'` and `'max'` to `'high'` with a compatibility warning and that Anthropic and OpenAI effort mappings preserve `'max'`; that sentence was removed from the ai@7.0.173 page, so the mapping is not re-confirmed here). For Anthropic models Bedrock's `maxTokens` includes thinking, so `budgetTokens` is added to `maxOutputTokens` (to the default `4096` when omitted). Explicit `reasoningConfig` values are preserved and portable reasoning fills missing fields.
- Effort-based Anthropic models can combine portable effort with an explicit thinking configuration. A disabled type prevents effort/budget derivation; portable `reasoning: 'none'` requests disabled thinking on Anthropic models even when an enabled type or budget is supplied. Omitting portable reasoning or using `'provider-default'` uses the provider configuration. The legacy `bedrock` provider options key follows the same rules.
- Both `reasoning: 'none'` and `reasoningConfig: { type: 'disabled' }` explicitly send `thinking: { type: 'disabled' }` for Anthropic models that support it; for Claude 3.5 and earlier the provider omits `thinking` because these models do not support the field. Models that require thinking use `between_tools` when supported, or adaptive thinking otherwise; for the adaptive fallback, portable `reasoning: 'none'` uses explicit `maxReasoningEffort`, then raw `output_config.effort`, and defaults to low effort when neither is supplied. Unsupported disabled settings produce warnings. If a model rejects disabled or `between_tools` thinking at `xhigh` or `max` effort, the provider lowers the effort to `high` with a warning.
- The JSON-tool fallback limits which application tools are available: `toolChoice: 'none'` sends only the internal JSON response tool, and a named tool choice sends only that application tool alongside the JSON response tool; the fallback can produce a JSON response without calling the named application tool, so verify the selected call if your application requires it.
- Use AI Gateway for models in its catalog (recommended; the AI SDK uses it by default for model strings) and the direct provider for AWS authentication, account-specific inference profiles, or Bedrock-specific APIs. Gateway and Bedrock use different model IDs, and Gateway model and feature availability can differ.
- Model capability tables in the 7.0.173 official page: the language-model table now also lists `anthropic.claude-v2`, `anthropic.claude-v2:1` and `anthropic.claude-instant-v1` without feature support, and the Bedrock Anthropic table adds `us.anthropic.claude-fable-5-2` (Image Input, Object Generation, Tool Usage, Computer Use and Reasoning supported; also listed under the reasoning-capable models). Other `us.` Bedrock IDs are unchanged apart from ordering.
- Source: https://ai-sdk.dev/providers/ai-sdk-providers/amazon-bedrock (ai@7.0.173)
- Prompt caching on Bedrock is described as a preview release; cache points have model-specific token minimums and limits.
- Citations: the AI SDK does not return citation data in results yet.
- File inputs are supported in combination with specific models (for example `anthropic.claude-3-haiku-20240307-v1:0`).
- Migration (2.x): the provider was rewritten to remove the `@aws-sdk/client-bedrock-runtime` dependency; the `bedrockOptions` setting was removed, use `region`, `accessKeyId`, `secretAccessKey`, `sessionToken` directly.
- Model IDs and capability tables are copied as written in the source (not exhaustive; any provider model ID string is accepted). Package version at the pinned tag: `@ai-sdk/amazon-bedrock` 5.0.142.
- This is the AI SDK provider package; the raw Claude API is covered by anthropic-api-core and anthropic-api-tools-mcp, and the raw OpenAI APIs by openai-api-core. No dedicated AWS Bedrock API skill exists in this repository.

## Related

- [Anthropic](./anthropic.md)
- [OpenAI](./openai.md)
- [AI SDK Providers](./ai-sdk-providers.md)
- [Provider & Model Management](./provider-management.md)
