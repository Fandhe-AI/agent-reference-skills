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
| apiKey | string | Bearer token authentication, used instead of SigV4. Defaults to `AWS_BEARER_TOKEN_BEDROCK`. |
| baseURL | string | Custom endpoint / proxy. When omitted, the service-specific `AWS_ENDPOINT_URL_BEDROCK_RUNTIME` and `AWS_ENDPOINT_URL_BEDROCK_AGENT_RUNTIME` variables take precedence over `AWS_ENDPOINT_URL`. |
| headers | `Record<string, string>` | Custom headers. |
| fetch | `(input: RequestInfo, init?: RequestInit) => Promise<Response>` | Custom fetch implementation. |

Language model provider options (`providerOptions.amazonBedrock`, legacy key `providerOptions.bedrock` still supported; type `AmazonBedrockLanguageModelChatOptions`):

| Name | Type | Description |
| --- | --- | --- |
| structuredOutputMode | `"outputFormat" \| "jsonTool" \| "auto"` | For Anthropic models. `"auto"` (default) uses native structured output when supported, else the JSON tool; Claude Sonnet 4.6 and Claude Haiku 4.5 use the JSON tool fallback in `"auto"`. `providerOptions.anthropic.structuredOutputMode` is also honored; `amazonBedrock` / `bedrock` takes precedence. |
| guardrailConfig | object | `guardrailIdentifier`, `guardrailVersion`, `trace`, `streamProcessingMode`. Trace in `providerMetadata.bedrock.trace`. |
| reasoningConfig | object | Anthropic: `{ type: 'enabled', budgetTokens }` (min 1024, max 64000). Amazon Nova 2: `{ type: 'enabled', maxReasoningEffort: 'low' \| 'medium' \| 'high' }`. |
| serviceTier | `'reserved' \| 'priority' \| 'default' \| 'flex'` | Inference service tier per request. |
| anthropicBeta | string[] | Anthropic beta features, e.g. `['context-1m-2025-08-07']` (1M-token context for Claude Sonnet 4 models). |
| additionalModelRequestFields | object | Model-specific fields (for example `providerOptions.anthropic.additionalModelRequestFields: { top_k: 350 }`). |

Message-part `providerOptions.bedrock`: `cachePoint: { type: 'default', ttl?: '5m' | '1h' }` (1-hour TTL only for Claude Opus 4.5, Haiku 4.5 and Sonnet 4.5; longer TTL entries must come before shorter ones), `guardContent: true` with `guardContentQualifiers` (`'grounding_source'`, `'query'`, `'guard_content'`), `citations: { enabled: true }` on file parts.

Provider metadata `providerMetadata.bedrock`: `trace`, `performanceConfig` (e.g. `{ latency: 'optimized' }`), `serviceTier` (e.g. `{ type: 'on-demand' }`), `usage` (cache token usage: `cacheReadInputTokens`, `cacheWriteInputTokens`, `cacheDetails`), `stopSequence`.

## Capabilities

Embedding options (`AmazonBedrockEmbeddingModelOptions`, under `providerOptions.bedrock`):

| Model family | Options |
| --- | --- |
| Titan (`amazon.titan-embed-text-v2:0`) | `dimensions` (1024 default, 512, 256), `normalize` (default `true`). |
| Nova (`amazon.nova-embed-text-v2:0`) | `embeddingDimension` (256, 384, 1024 default, 3072), `embeddingPurpose` (`GENERIC_INDEX` default, `TEXT_RETRIEVAL`, `IMAGE_RETRIEVAL`, `VIDEO_RETRIEVAL`, `DOCUMENT_RETRIEVAL`, `AUDIO_RETRIEVAL`, `GENERIC_RETRIEVAL`, `CLASSIFICATION`, `CLUSTERING`), `truncate` (`NONE`, `START`, `END` default). |
| Cohere (`cohere.embed-english-v3`) | `inputType` (`search_document`, `search_query` default, `classification`, `clustering`), `truncate`. |

Application inference profile ARNs do not identify their model: pass `{ modelFamily: 'cohere' }` (embedding, `AmazonBedrockEmbeddingModelSettings`) or `{ modelFamily: 'anthropic' }` (language, `AmazonBedrockChatModelSettings`) so the provider selects the right request format.

```ts
import { bedrockAnthropic } from '@ai-sdk/amazon-bedrock/anthropic';

const profileArn =
  'arn:aws:bedrock:us-east-1:123456789012:application-inference-profile/qibm5eutlkcy';

const model = bedrockAnthropic(profileArn);
```

- Reranking: `amazonBedrock.reranking('cohere.rerank-v3-5:0')` with `rerank` (Bedrock Rerank API).
- Image models (`amazonBedrock.image(...)`): generation plus editing (image variation, inpainting, outpainting, background removal); see the official page for image model settings and options.
- Computer use via Anthropic: Bash, Text Editor and Computer provider-defined tools are available on Bedrock.
- Response headers: `result.response.headers` (for example `x-amzn-requestid` for correlating Bedrock API calls).
- Bedrock Anthropic provider (`createBedrockAnthropic`): Anthropic's Messages API through Bedrock's native InvokeModel API for feature parity with the Anthropic API (for example `stop_sequence` in streaming); accepts application inference profile ARNs; settings `region`, `accessKeyId`, `secretAccessKey`, `sessionToken`, `apiKey`, `baseURL`, `headers`, `fetch`, `credentialProvider`; option `metadata.userId`; cache control via `providerOptions.anthropic.cacheControl`.
- Bedrock Mantle provider (`createBedrockMantle`): OpenAI-compatible Mantle API; `bedrockMantle('openai.gpt-oss-120b')` defaults to Chat Completions, `.chat(id)` / `.responses(id)` select explicitly (`openai.gpt-oss-safeguard-*` do not support the Responses API); provider options go under the `openai` namespace; default base URL `https://bedrock-mantle.{region}.api.aws/v1` or `/openai/v1` chosen per model.

## Notes

- Access to Bedrock foundation models is not granted by default; request model access in the AWS console. API key authentication (`AWS_BEARER_TOKEN_BEDROCK`) is the recommended path; static IAM user keys need the `AmazonBedrockFullAccess` policy and do not require `sessionToken`.
- Reasoning: the top-level `reasoning` parameter also works; for Amazon Nova 2 `'xhigh'` and `'max'` map to `'high'` with a warning. For Anthropic models Bedrock's `maxTokens` includes thinking, so `budgetTokens` is added to `maxOutputTokens` (to the default `4096` when omitted). Explicit `reasoningConfig` values are preserved and portable reasoning fills missing fields.
- Prompt caching on Bedrock is described as a preview release; cache points have model-specific token minimums and limits.
- Citations: the AI SDK does not return citation data in results yet.
- File inputs are supported in combination with specific models (for example `anthropic.claude-3-haiku-20240307-v1:0`).
- Migration (2.x): the provider was rewritten to remove the `@aws-sdk/client-bedrock-runtime` dependency; the `bedrockOptions` setting was removed, use `region`, `accessKeyId`, `secretAccessKey`, `sessionToken` directly.
- Model IDs and capability tables are copied as written in the source (not exhaustive; any provider model ID string is accepted). Package version at the pinned tag: `@ai-sdk/amazon-bedrock` 5.0.117.
- This is the AI SDK provider package; the raw Claude API is covered by anthropic-api-core and anthropic-api-tools-mcp, and the raw OpenAI APIs by openai-api-core. No dedicated AWS Bedrock API skill exists in this repository.

## Related

- [Anthropic](./anthropic.md)
- [OpenAI](./openai.md)
- [AI SDK Providers](./ai-sdk-providers.md)
- [Provider & Model Management](./provider-management.md)
