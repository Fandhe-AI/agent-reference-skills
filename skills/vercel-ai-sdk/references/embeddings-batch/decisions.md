---
source: https://ai-sdk.dev/docs/ai-sdk-core/decisions
---

# Decisions

`experimental_decide` decides answers to named questions (Choice, Score, Boolean) against one shared state using a decision model. State can be a string, JSON object, or an array of ordered text, file, and JSON parts.

## Signature / Usage

```ts
import { experimental_decide, type Experimental_DecisionModel } from 'ai';

async function triage(model: Experimental_DecisionModel, message: string) {
  return experimental_decide({
    model,
    state: { message },
    questions: {
      department: {
        type: 'choice',
        instructions: 'Which team should handle this?',
        criteria: {
          billing: 'Payments and refunds',
          support: 'Other requests',
        },
      },
      severity: {
        type: 'score',
        instructions: 'How severe is the issue?',
        criteria: ['Cosmetic', 'Workaround exists', 'Blocking; no workaround'],
      },
      requestsRefund: {
        type: 'boolean',
        instructions: 'Is the customer requesting money back?',
      },
    },
  });
}
```

### Multimodal state

Combine text, structured data, and images in one state:

```ts
import { openai } from '@ai-sdk/openai';
import { experimental_decide } from 'ai';
import { readFile } from 'node:fs/promises';

const result = await experimental_decide({
  model: openai.decisionModel('gpt-6-luna'),
  state: [
    { type: 'text', text: 'Inspect this package for damage.' },
    { type: 'json', value: { product: 'glass vase', packaging: 'cardboard' } },
    {
      type: 'file',
      mediaType: 'image/png',
      data: await readFile('package.png'),
    },
  ],
  questions: {
    damaged: {
      type: 'boolean',
      instructions: 'Is the product visibly damaged?',
    },
  },
});
```

`Experimental_DecisionState` and `Experimental_DecisionStatePart` are exported from `ai`. A part has one of these shapes:

- `TextPart`: `{ type: 'text', text: string }`.
- `FilePart`: `{ type: 'file', mediaType: string, data: ... }`, using the SDK's file conventions. For images, use bytes, a base64 string, or a URL. Tagged file data is also supported. Remote URLs require `experimental_download` and are downloaded before the model call. Without that hook they throw `DownloadError`.

For untrusted file URLs, use `experimental_download: createDownload({ fetch })` with a transport that validates DNS at connection time, such as `guarded-fetch` on Node.js. The model's `fetch` does not cover core state downloads. See the Secure URL Fetching page (core file downloads section).
- JSON: `{ type: 'json', value: JSONValue }`.

Arrays passed directly as `state` contain parts. To send a JSON array, put it inside an object (`state: { records }`) or a JSON part (`state: [{ type: 'json', value: records }]`). An empty `state: []` contains zero parts. Question instructions and criteria still accept JSON arrays directly.

### Provider models

Use a provider's `decisionModel` factory:

| Provider | Example model |
| --- | --- |
| TypeSafe AI | `typeSafeAi.decisionModel('jev-latest')` |
| Perplexity | `perplexity.decisionModel('pplx-decider-latest')` |
| OpenAI | `openai.decisionModel('gpt-6-luna')` |
| Anthropic | `anthropic.decisionModel('claude-haiku-4-5-20251001')` |
| Google | `google.decisionModel('gemini-decision-1')` |
| HeyGen | `heygen.decisionModel('heygen-decision-1')` |

- TypeSafe AI's Jev, OpenAI's Decisions API, Perplexity's decision models, and Google's Decisions API supply native Choice, Score, and Boolean decisions. Answers are keyed by question ID, and Choice and Score answers include native probability distributions.
- Anthropic adapts structured language-model output for all three types, evaluating all questions in one prompt. Its Boolean answers contain prompted estimates of P(true), and Choice and Score answers omit probability distributions. Select a model that supports the provider's structured-output API and judge quality against your own labeled examples.
- The Anthropic language-model adapter requests `reasoning: 'none'` by default. Pass supported reasoning settings through `providerOptions` to override this default. OpenAI and Google decision models use native Decisions endpoints and do not accept language-model reasoning options. Google's endpoint requires Decisions EAP access and the `gemini-decision-1` model on `v1beta`.
- Language-model decision adapters accept image files only. The underlying model must support the file data form. Gateway forwards image files to the routed decision model, which must support image input. TypeSafe AI accepts text and JSON state only.

### Model aliases and registries

Use `customProvider` to give models application-specific names, then register providers with `createProviderRegistry`:

```ts
import { typeSafeAi } from '@ai-sdk/typesafe-ai';
import { openai } from '@ai-sdk/openai';
import {
  customProvider,
  createProviderRegistry,
  experimental_decide,
} from 'ai';

const registry = createProviderRegistry({
  triage: customProvider({
    decisionModels: {
      native: typeSafeAi.decisionModel('jev-latest'),
      compact: openai.decisionModel('gpt-6-luna'),
    },
    fallbackProvider: typeSafeAi,
  }),
  openai,
});

const result = await experimental_decide({
  model: registry.decisionModel('triage:native'),
  state: 'I was charged twice.',
  questions: {
    department: {
      type: 'choice',
      instructions: 'Which team should handle this?',
      criteria: { billing: 'Charges and refunds', support: 'Other requests' },
    },
  },
});

result.answers.department.choice; // 'billing' | 'support'
```

- Registry IDs use `providerId:modelId`; the `separator` option changes the separator. Only the first separator is used, so model IDs can contain it.
- Custom aliases take precedence over a fallback provider. A fallback only resolves unknown model IDs; it does not retry failed decisions or substitute a model when a question type is unsupported. Registered providers keep their own credentials and settings. Registry language/image middleware does not wrap decision models.

#### Default-provider strings

String IDs use Vercel AI Gateway by default. Configure Gateway authentication with `AI_GATEWAY_API_KEY` or Vercel OIDC, then pass a Gateway model ID:

```ts
const result = await experimental_decide({
  model: 'typesafe-ai/jev',
  state: 'I was charged twice. Please refund the extra charge.',
  questions: {
    refund: {
      type: 'boolean',
      instructions: 'Is the customer asking for a refund?',
    },
  },
});
```

To resolve strings through your own provider or aliases, configure the default provider once at application startup:

```ts
globalThis.AI_SDK_DEFAULT_PROVIDER = customProvider({
  decisionModels: { native: registry.decisionModel('triage:native') },
});

const result = await experimental_decide({
  model: 'native',
  state: 'I was charged twice.',
  questions: {
    refund: {
      type: 'boolean',
      instructions: 'Is the customer asking for a refund?',
    },
  },
});
```

- A direct provider such as `typeSafeAi` can also be the default; then use its unprefixed model ID, such as `'jev-latest'`. String values in `decisionModels` also resolve through this global default. Prefer model instances in aliases to avoid resolution cycles. Global configuration affects other AI SDK functions too; avoid changing it per request in a shared process.
- An explicitly configured default provider must expose a `decisionModel` method; Gateway is used only when no default provider is configured.
- Missing registry providers throw `NoSuchProviderError`; missing models or decision capabilities throw `NoSuchModelError` with `modelType: 'decisionModel'`. Unsupported model versions throw `UnsupportedModelVersionError`, including models returned by registries.
- The stable `ProviderV4` and `ProviderRegistryProvider` interfaces are unchanged; keep the inferred registry type, or use `Experimental_DecisionProviderRegistry`, to retain its experimental `decisionModel` method.

### Question types

| Type | Criteria | Answer |
| --- | --- | --- |
| `choice` | A nonempty map of options to descriptions | `choice`, inferred as a union of option keys; optional `probabilities` |
| `score` | A nonempty array of ordered level descriptions | Fractional `score` in `[0, levels.length - 1]`; optional `probabilities` |
| `box` | None | `box` with normalized `top`, `bottom`, `left`, and `right` image edges |
| `boolean` | Optional `true` and `false` descriptions | Required `probability`, the model-estimated probability of true |

`Experimental_DecisionQuestion` is exported from `ai`. Instructions and descriptions can be strings, JSON objects, or JSON arrays. Descriptions can also be `null` when the provider supports it.

For every question type, `instructions` may be omitted or `null` when supported by the provider. Boolean `criteria` may also be `null`. A Boolean question without instructions must describe at least one of its `true` or `false` criteria. Provider APIs can impose additional requirements; see the provider's documentation.

Score rubrics require at least one level in Core. TypeSafe and Perplexity accept a single level, which returns score `0` with probability `1`; other providers may require more levels.

Functions, class instances, cycles, undefined values inside JSON content, and nonfinite numbers are not JSON-compatible.

Answers retain question IDs and have the same `type` as their question. When a Choice distribution is supplied, it includes every option and the selected choice has maximal probability. Score distributions use string keys for zero-based level indices, and the score equals the probability-weighted mean. Without a distribution, a score is the model's estimated position on the rubric.

Distributions must sum to one, and weighted scores must agree with their distributions. The default absolute tolerance is `0.000001`. Providers that round their output can declare `rounding.probabilityDecimals` and `rounding.scoreDecimals` (integers from 0 to 15). Validation then also allows half a unit in the last decimal place per rounded probability or score, accumulated over the sum or weighted mean. The result includes this `rounding` information. Invalid output is rejected; native values are preserved, never silently normalized.

### Probabilities and confidence

Choice and Score distributions are optional. Boolean probability is required: `0.98` means a strong yes and `0.02` means a strong no. It is not confidence in either outcome. The SDK does not promise calibration across providers. Provider-specific confidence statistics belong in `providerMetadata`. TypeSafe exposes its separate Choice/Score/Box confidence statistic at `result.providerMetadata?.typesafe?.confidence`, keyed by question ID. TypeSafe Score legends are available at `result.providerMetadata?.typesafe?.legend`, also keyed by question ID, with structured descriptions preserved. Perplexity exposes Choice/Score confidence at `result.providerMetadata?.perplexity?.confidence` and Score legends at `result.providerMetadata?.perplexity?.legend`, also keyed by question ID. Google exposes confidence for all three question types at `result.providerMetadata?.google?.confidence` and Score legends at `result.providerMetadata?.google?.legend`, also keyed by question ID. HeyGen exposes Choice/Score confidence at `result.providerMetadata?.heygen?.confidence` and Score legends at `result.providerMetadata?.heygen?.legend`, also keyed by question ID.

```ts
const answer = result.answers.department;
const selectedProbability = answer.probabilities?.[answer.choice];
if (selectedProbability != null && selectedProbability >= 0.9) {
  // Route automatically; otherwise use the application's review path.
}
```

Choose Boolean thresholds in application code, using labeled data from the task rather than assuming the same threshold behaves identically across providers:

```ts
if (result.answers.requestsRefund.probability >= 0.8) {
  // Route to the refunds queue.
}
```

### Errors and cancellation

- The model's `supportedQuestionTypes` are checked before calling the provider. Any unsupported question fails the entire call with `Experimental_DecisionUnsupportedQuestionTypeError`. Successful calls return an answer for every question; there is no partial success, and Core does not substitute models automatically.
- Invalid inputs throw `InvalidArgumentError`. Missing answers, mismatched answer types, invalid options, scores, or probabilities throw `InvalidResponseDataError`.
- If the model refuses any question, the call throws `Experimental_DecisionRefusalError` with the refused question IDs, and is not retried.
- Transient provider failures use the normal retry policy (`maxRetries: 2` by default). Use `abortSignal` to cancel, `headers` for request headers, and `providerOptions` for provider-specific settings.
- The result includes `usage`, `warnings`, `providerMetadata`, and `response`. Unknown token counts stay `undefined`; `totalTokens` is available only when both input and output counts are known.
- For tests, use `Experimental_DecisionMockModelV4` from `ai/test`.

## Notes

- Stability: this API and the decision model specification are experimental and may change in patch releases.
- Scope: `experimental_decide` currently returns one complete result for one shared state. It does not stream answers, perform multilabel classification, or batch unrelated states. Run separate calls for separate states.
- Core does not choose another model, but a provider can implement routing through its provider options. For example, AI Gateway supports conditional decision fallbacks under `providerOptions.gateway.models`.
- Runnable examples: `examples/ai-functions/src/decide` in the `vercel/ai` repository.

- Source: https://ai-sdk.dev/docs/ai-sdk-core/decisions (ai@7.0.173)
- Official example change: the multimodal image now uses `await readFile('package.png')` because remote URLs need `experimental_download` (without it `DownloadError` is thrown).

## Related

- [experimental_decide](./decide.md)
