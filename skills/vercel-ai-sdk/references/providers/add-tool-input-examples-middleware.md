---
source: https://ai-sdk.dev/docs/reference/ai-sdk-core/add-tool-input-examples-middleware
---

# addToolInputExamplesMiddleware

Appends tool `inputExamples` to tool descriptions, for providers that do not natively support the `inputExamples` property.

## Signature / Usage

```ts
function addToolInputExamplesMiddleware(options?: {
  prefix?: string;
  format?: (example: { input: JSONObject }, index: number) => string;
  remove?: boolean;
}): LanguageModelMiddleware;
```

```ts
import {
  generateText,
  tool,
  wrapLanguageModel,
  addToolInputExamplesMiddleware,
} from 'ai';
import { z } from 'zod';

const model = wrapLanguageModel({
  model: yourModel,
  middleware: addToolInputExamplesMiddleware({
    prefix: 'Input Examples:',
    format: (example, index) =>
      `${index + 1}. ${JSON.stringify(example.input)}`,
  }),
});

const result = await generateText({
  model,
  tools: {
    weather: tool({
      description: 'Get the weather in a location',
      inputSchema: z.object({ location: z.string() }),
      inputExamples: [
        { input: { location: 'San Francisco' } },
        { input: { location: 'London' } },
      ],
    }),
  },
  prompt: 'What is the weather in Tokyo?',
});
```

Import: `import { addToolInputExamplesMiddleware } from "ai"`

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| prefix | string (optional) | `'Input Examples:'` | A prefix prepended before the input examples section. |
| format | `(example: { input: JSONObject }, index: number) => string` (optional) | `JSON.stringify(example.input)` | Custom formatter for each example. |
| remove | boolean (optional) | `true` | Whether to remove the `inputExamples` property from the tool after adding them to the description. |

## Notes

- Locates function tools with `inputExamples`, appends a formatted section at the end of the tool description, removes `inputExamples` unless `remove: false`, and passes through all other tools unchanged (including non-function tools).
- With defaults the description becomes `Get the weather in a location` followed by a blank line, `Input Examples:`, and one JSON line per example.
- The official tip says it is especially useful with providers such as OpenAI or Anthropic, where native support for `inputExamples` is not available.

## Related

- [Language Model Middleware](./middleware.md)
- [wrapLanguageModel](./wrap-language-model.md)
