---
source: https://ai-sdk.dev/docs/ai-sdk-core/middleware
---

# Language Model Middleware

Language model middleware enhances the behavior of language models by intercepting and modifying calls to the model (guardrails, RAG, caching, logging) in a model-agnostic way.

## Signature / Usage

```ts
import { wrapLanguageModel, streamText } from 'ai';

const wrappedLanguageModel = wrapLanguageModel({
  model: yourModel,
  middleware: yourLanguageModelMiddleware,
});

const result = streamText({
  model: wrappedLanguageModel,
  prompt: 'What cities are in the United States?',
});
```

Multiple middlewares are applied in the order provided:

```ts
const wrappedLanguageModel = wrapLanguageModel({
  model: yourModel,
  middleware: [firstMiddleware, secondMiddleware],
});

// applied as: firstMiddleware(secondMiddleware(yourModel))
```

## Built-in middleware

| Name | Description |
| --- | --- |
| `extractReasoningMiddleware` | Extracts reasoning information from the generated text and exposes it as a `reasoning` property on the result. Has a `startWithReasoning` option (prepends the reasoning tag; for models that do not include it at the beginning). |
| `extractJsonMiddleware` | Extracts JSON from text content by stripping markdown code fences. Useful when using `Output.object()` with models that wrap JSON in code blocks. Accepts a custom `transform`. |
| `simulateStreamingMiddleware` | Simulates streaming behavior with responses from non-streaming language models. |
| `defaultInstructionsMiddleware` | Applies default instructions when a call does not provide its own instructions. |
| `defaultSettingsMiddleware` | Applies default settings to a language model. |
| `addToolInputExamplesMiddleware` | Adds tool input examples to tool descriptions for providers that don't natively support the `inputExamples` property. |

```ts
import { wrapLanguageModel, extractReasoningMiddleware } from 'ai';

const model = wrapLanguageModel({
  model: yourModel,
  middleware: extractReasoningMiddleware({ tagName: 'think' }),
});
```

```ts
import { wrapLanguageModel, defaultSettingsMiddleware } from 'ai';

const model = wrapLanguageModel({
  model: yourModel,
  middleware: defaultSettingsMiddleware({
    settings: {
      temperature: 0.5,
      maxOutputTokens: 800,
      providerOptions: { openai: { store: false } },
    },
  }),
});
```

```ts
import { wrapLanguageModel, defaultInstructionsMiddleware } from 'ai';

const model = wrapLanguageModel({
  model: yourModel,
  middleware: defaultInstructionsMiddleware({
    instructions: 'You are a concise technical assistant.',
  }),
});
```

`defaultInstructionsMiddleware` applies instructions to calls that do not already contain a system message; instructions provided directly on a call take precedence. The `instructions` option also accepts a `SystemModelMessage` or an array of them.

`addToolInputExamplesMiddleware` options:

| Name | Type | Description |
| --- | --- | --- |
| `prefix` | string (optional) | Prefix text prepended before the examples. Default: `'Input Examples:'`. |
| `format` | function (optional) | Custom formatter for each example (receives the example object and its index). Default: `JSON.stringify(example.input)`. |
| `remove` | boolean (optional) | Whether to remove `inputExamples` from the tool after adding them to the description. Default: `true`. |

## Implementing language model middleware

Implement any of three functions; every `LanguageModelV4Middleware` object must set `specificationVersion: 'v4'`:

1. `transformParams`: transforms the parameters before they are passed to the model, for both `doGenerate` and `doStream`.
2. `wrapGenerate`: wraps `doGenerate`; modify parameters, call the model, modify the result.
3. `wrapStream`: wraps `doStream`; modify parameters, call the model, modify the result.

```ts
import type {
  LanguageModelV4Middleware,
  LanguageModelV4StreamPart,
} from '@ai-sdk/provider';

export const yourLogMiddleware: LanguageModelV4Middleware = {
  specificationVersion: 'v4',

  wrapGenerate: async ({ doGenerate, params }) => {
    console.log('doGenerate called');
    console.log(`params: ${JSON.stringify(params, null, 2)}`);

    const result = await doGenerate();
    const generatedText = result.content
      .filter(part => part.type === 'text')
      .map(part => part.text)
      .join('');

    console.log('doGenerate finished');
    console.log(`generated text: ${generatedText}`);

    return result;
  },
};
```

Caching example (`wrapGenerate` with `JSON.stringify(params)` as key):

```ts
const cache = new Map<string, any>();

export const yourCacheMiddleware: LanguageModelV4Middleware = {
  specificationVersion: 'v4',

  wrapGenerate: async ({ doGenerate, params }) => {
    const cacheKey = JSON.stringify(params);

    if (cache.has(cacheKey)) {
      return cache.get(cacheKey);
    }

    const result = await doGenerate();

    cache.set(cacheKey, result);

    return result;
  },

  // here you would implement the caching logic for streaming
};
```

Per-request custom metadata is passed through `providerOptions` and read in middleware:

```ts
export const yourLogMiddleware: LanguageModelV4Middleware = {
  specificationVersion: 'v4',

  wrapGenerate: async ({ doGenerate, params }) => {
    console.log('METADATA', params?.providerMetadata?.yourLogMiddleware);
    const result = await doGenerate();
    return result;
  },
};

// call: providerOptions: { yourLogMiddleware: { hello: 'world' } }
```

## Notes

- Implementing language model middleware is advanced functionality and requires a solid understanding of the language model specification (`packages/provider/src/language-model/v4/language-model-v4.ts`).
- The official examples (logging, caching, RAG, guardrails) are explicitly "not meant to be used in production". Helper functions in the RAG example (`getLastUserMessageText`, `findSources`) are not part of the AI SDK.
- Guardrails streaming example buffers each text block until `text-end` so matches split across `text-delta` chunks cannot leak; this delays output and uses memory proportional to the text block size. Do not redact each delta independently.
- `defaultInstructionsMiddleware` treats any system message in the normalized prompt as call-level instructions and does not add defaults; only enable `allowSystemInMessages` for trusted message histories.
- Stability: the `LanguageModelV4Middleware` reference page states "Language model middleware is an experimental feature."
- Community middleware listed on the page: `@ai-sdk-tool/parser` (`createToolMiddleware`, `hermesToolMiddleware`, `gemmaToolMiddleware`); it can degrade performance on models with native function calling.
- This is language-model wrapping, not HTTP middleware: distinct from hono / fastify / nextjs-app / go-echo middleware.

## Related

- [wrapLanguageModel](./wrap-language-model.md)
- [LanguageModelV4Middleware](./language-model-middleware.md)
- [extractReasoningMiddleware](./extract-reasoning-middleware.md)
- [extractJsonMiddleware](./extract-json-middleware.md)
- [simulateStreamingMiddleware](./simulate-streaming-middleware.md)
- [defaultInstructionsMiddleware](./default-instructions-middleware.md)
- [defaultSettingsMiddleware](./default-settings-middleware.md)
- [addToolInputExamplesMiddleware](./add-tool-input-examples-middleware.md)
