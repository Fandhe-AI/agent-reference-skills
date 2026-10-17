---
source: https://ai-sdk.dev/docs/reference/ai-sdk-core/json-schema
---

# jsonSchema

Creates a JSON schema object compatible with the AI SDK from a JSON schema and an optional validation function. An alternative to Zod for dynamic situations (e.g. OpenAPI definitions) or other validation libraries; usable for structured data generation and tools.

## Signature / Usage

```ts
import { jsonSchema } from 'ai';

const mySchema = jsonSchema<{
  recipe: {
    name: string;
    ingredients: { name: string; amount: string }[];
    steps: string[];
  };
}>({
  type: 'object',
  properties: {
    recipe: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        ingredients: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              name: { type: 'string' },
              amount: { type: 'string' },
            },
            required: ['name', 'amount'],
          },
        },
        steps: {
          type: 'array',
          items: { type: 'string' },
        },
      },
      required: ['name', 'ingredients', 'steps'],
    },
  },
  required: ['recipe'],
});
```

Import: `import { jsonSchema } from "ai"`. Returns a JSON schema object compatible with the AI SDK.

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| schema | JSONSchema7 | The JSON schema definition. |
| options | SchemaOptions | Additional options. |
| options.validate | `(value: unknown) => { success: true; value: OBJECT } \| { success: false; error: Error }` | Optional. Validates the value against the schema; return `success: true` with `value`, or `success: false` with `error`. |

## Related

- [tool](./tool.md)
- [zodSchema](./zod-schema.md)
- [valibotSchema](./valibot-schema.md)
- [Generating Structured Data](../core/generating-structured-data.md)
