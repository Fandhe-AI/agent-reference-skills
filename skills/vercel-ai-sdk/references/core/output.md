---
source: https://ai-sdk.dev/docs/reference/ai-sdk-core/output
---

# Output

The `Output` object provides output specifications for structured data generation with `generateText` and `streamText`. It specifies the expected shape of the generated data and handles validation automatically.

## Signature / Usage

```ts
import { generateText, Output } from 'ai';
import { z } from 'zod';

const { output } = await generateText({
  model,
  output: Output.object({
    schema: z.object({
      name: z.string(),
      age: z.number(),
    }),
  }),
  prompt: 'Generate a user profile.',
});
```

Import: `import { Output } from "ai"`

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `Output.text()` | `Output<string, string>` | Plain text generation; the default when no `output` is specified. No parameters. |
| `Output.object({ schema, name?, description? })` | `Output<OBJECT, DeepPartial<OBJECT>>` | Typed object generation. Complete output is fully validated; partial output (during streaming) is a deep partial of the schema type. |
| `Output.array({ element, minItems?, maxItems?, name?, description? })` | `Output<Array<ELEMENT>, Array<ELEMENT>>` | Arrays of typed elements. Complete output is validated against `minItems` / `maxItems`; partial output contains only fully validated elements. |
| `Output.choice({ options, name?, description? })` | `Output<CHOICE, CHOICE>` | One of a predefined set of string options (classification / fixed-enum answers). |
| `Output.json({ name?, description? })` | `Output<JSONValue, JSONValue>` | Unstructured JSON; validates only that the output is valid JSON. |

Parameters:

| Name | Type | Description |
| --- | --- | --- |
| schema (`Output.object`) | `FlexibleSchema<OBJECT>` | Structure of the object to generate. Supports Zod schemas, Standard JSON schemas, and custom JSON schemas. |
| element (`Output.array`) | `FlexibleSchema<ELEMENT>` | Structure of each array element. Supports Zod schemas, Valibot schemas, or JSON schemas. |
| minItems (`Output.array`) | `number` (Optional) | Minimum number of elements. Non-negative integer. |
| maxItems (`Output.array`) | `number` (Optional) | Maximum number of elements. Non-negative integer and greater than or equal to `minItems`. |
| options (`Output.choice`) | `Array<CHOICE>` | String options the model can choose from. The output is exactly one of these values. |
| name | `string` (Optional) | Name of the output. Used by some providers for additional LLM guidance, e.g. via tool or schema name. |
| description | `string` (Optional) | Description of the output. Used by some providers for additional LLM guidance. |

Streaming arrays with `elementStream`:

```ts
const { elementStream } = streamText({
  model,
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

Choice with literal types: `Output.choice({ options: ['sunny', 'rainy', 'snowy'] as const })` yields `'sunny' | 'rainy' | 'snowy'`.

## Notes

- Partial outputs streamed via `streamText` cannot be validated against the provided schema, as incomplete data may not yet conform.
- Set `minItems` and `maxItems` to the same value to require an exact number of elements. The bounds are included in the provider-facing schema when the provider supports them; the AI SDK also validates the completed output, so providers that ignore these schema keywords cannot return an out-of-bounds result.
- Each `elementStream` element is complete and validated. If the model generates more than `maxItems`, `elementStream` errors before emitting the first excess element; provider generation is not aborted automatically and the final `output` promise also rejects.
- With `Output.json()` the AI SDK only checks that the response is valid JSON; use `Output.object()` or `Output.array()` for schema validation.
- When `generateText` with structured output cannot generate a valid object, it throws `NoObjectGeneratedError` (check with `NoObjectGeneratedError.isInstance(error)`; has `cause`, `text`, `response`, `usage`).
- Zod itself is covered by the zod skill; this page documents only the AI SDK `Output` specification.

## Related

- [Generating Structured Data](./generating-structured-data.md)
- [generateText](./generate-text.md)
- [streamText](./stream-text.md)
