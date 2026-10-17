---
source: https://ai-sdk.dev/docs/ai-sdk-core/generating-structured-data
---

# Generating Structured Data

The AI SDK standardises structured object generation across model providers using the `output` property on `generateText` and `streamText`. Zod schemas, Valibot, or JSON schemas specify the shape of the data; the schema is also used to validate the generated data.

## Signature / Usage

```ts
import { generateText, Output } from 'ai';
import { z } from 'zod';

const { output } = await generateText({
  model,
  output: Output.object({
    schema: z.object({
      recipe: z.object({
        name: z.string(),
        ingredients: z.array(
          z.object({ name: z.string(), amount: z.string() }),
        ),
        steps: z.array(z.string()),
      }),
    }),
  }),
  prompt: 'Generate a lasagna recipe.',
});
```

Streaming with `streamText` and `partialOutputStream`:

```ts
import { streamText, Output } from 'ai';

const { partialOutputStream } = streamText({
  model,
  output: Output.object({ schema }),
  prompt: 'Generate a lasagna recipe.',
});

for await (const partialObject of partialOutputStream) {
  console.log(partialObject);
}
```

### Output types

| Output | Description |
| --- | --- |
| `Output.text()` | Plain text, no schema enforced. Default when no `output` is specified. |
| `Output.object({ schema })` | Structured object validated against the schema. |
| `Output.array({ element, minItems, maxItems })` | Array of typed objects. Each element must conform to `element`; optional bounds constrain the number of elements. |
| `Output.choice({ options })` | One of a set of string options (classification / fixed-enum answers). Throws if the model returns something invalid. |
| `Output.json()` | Unstructured JSON; only checks that the response is valid JSON. |

`minItems` and `maxItems` must be non-negative integers, and `minItems` cannot be greater than `maxItems`. Use the same value for both to require an exact length. The bounds are sent to providers as part of the structured output schema when supported, and the AI SDK independently validates the final output.

Streaming arrays: `elementStream` receives each completed element.

```ts
const { elementStream } = streamText({
  // ...
  output: Output.array({
    element: z.object({
      name: z.string(),
      class: z.string(),
      description: z.string(),
    }),
  }),
  prompt: 'Generate 3 hero descriptions for a fantasy role playing game.',
});

for await (const hero of elementStream) {
  console.log(hero); // Each hero is complete and validated
}
```

Optional `name` and `description` are used by some providers for additional LLM guidance (e.g. via tool or schema name) and work with `Output.object`, `Output.array`, `Output.choice`, `Output.json`:

```ts
output: Output.object({
  name: 'Recipe',
  description: 'A recipe for a dish.',
  schema: z.object({ /* ... */ }),
}),
```

### Combining with tools

```ts
import { generateText, Output, tool, isStepCount } from 'ai';

const { output } = await generateText({
  model,
  tools: {
    weather: tool({
      description: 'Get the weather for a location',
      inputSchema: z.object({ location: z.string() }),
      execute: async ({ location }) => {
        return { temperature: 72, condition: 'sunny' };
      },
    }),
  },
  output: Output.object({
    schema: z.object({
      summary: z.string(),
      recommendation: z.string(),
    }),
  }),
  stopWhen: isStepCount(5),
  prompt: 'What should I wear in San Francisco today?',
});
```

### Reasoning and response

- `result.reasoningText` contains the model's thought process (must be a reasoning model).
- Raw response headers and body: `result.response.headers` / `result.response.body`.

### Error handling

- If the model response cannot be parsed or validated against the schema, `generateText` rejects with `AI_NoObjectGeneratedError`.
- If `generateText` returns a result without an output, accessing `result.output` throws `AI_NoOutputGeneratedError` (e.g. the final step finished with `tool-calls` rather than `stop`). `output` is a getter, so destructuring it also triggers this access.
- `NoObjectGeneratedError` preserves `text`, `response`, `usage`, and `cause`.

```ts
import {
  generateText,
  NoObjectGeneratedError,
  NoOutputGeneratedError,
  Output,
} from 'ai';

try {
  const result = await generateText({
    model,
    output: Output.object({ schema }),
    prompt,
  });

  console.log(result.output);
} catch (error) {
  if (NoObjectGeneratedError.isInstance(error)) {
    console.log('Cause:', error.cause);
    console.log('Text:', error.text);
    console.log('Response:', error.response);
    console.log('Usage:', error.usage);
  } else if (NoOutputGeneratedError.isInstance(error)) {
    console.log('NoOutputGeneratedError');
  }
}
```

## Notes

- Structured output generation is part of the `generateText` / `streamText` flow and can be combined with tool calling in the same request. It counts as a step in the multi-turn execution model; account for this in `stopWhen`.
- Partial outputs streamed via `streamText` cannot be validated against the provided schema, because incomplete data may not yet conform.
- Each `elementStream` element is complete and validated; `elementStream` emits each validated element once as it completes, while `partialOutputStream` emits the growing array snapshot. The official guide states partialOutputStream includes incomplete elements, but at ai@7.0.142 `Output.array().parsePartialOutput` ([packages/ai/src/generate-text/output.ts](https://github.com/vercel/ai/blob/ai@7.0.142/packages/ai/src/generate-text/output.ts)) drops the trailing possibly-incomplete element and keeps only schema-validated elements, matching the [Output reference](./output.md). If the model generates more than `maxItems`, `elementStream` errors before emitting the first excess element; this does not automatically abort provider generation, and the final `output` promise rejects.
- `streamText` starts streaming immediately; errors become part of the stream. Provide `onError` to handle them.
- Add `.describe("...")` to individual schema properties to hint at what each is for (clarify ambiguous names, specify formats, give context for nested structures).
- Schemas here use Zod only as one supported schema library (the AI SDK also accepts Valibot and JSON Schema); this page does not cover Zod itself, which is covered by the zod skill. In this repository the zod skill documents Zod APIs; this skill documents only how the AI SDK consumes schemas.
- The `useObject` hook consumes structured output on the client.

## Related

- [Output](./output.md)
- [generateText](./generate-text.md)
- [streamText](./stream-text.md)
- [Prompt Engineering](./prompt-engineering.md)
