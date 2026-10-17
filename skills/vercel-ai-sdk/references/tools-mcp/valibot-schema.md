---
source: https://ai-sdk.dev/docs/reference/ai-sdk-core/valibot-schema
---

# valibotSchema

Converts a Valibot schema into a JSON schema object compatible with the AI SDK; returns a typed schema. Usable for structured data generation and tools.

## Signature / Usage

```ts
import { valibotSchema } from '@ai-sdk/valibot';
import { object, string, array } from 'valibot';

const recipeSchema = valibotSchema(
  object({
    name: string(),
    ingredients: array(
      object({
        name: string(),
        amount: string(),
      }),
    ),
    steps: array(string()),
  }),
);
```

Import: `import { valibotSchema } from "@ai-sdk/valibot"`. Returns a Schema object containing both the JSON schema representation and validation functionality.

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| valibotSchema | `GenericSchema<unknown, T>` | The Valibot schema definition. |

## Notes

- Imported from the separate `@ai-sdk/valibot` package, not from `ai`.

## Related

- [zodSchema](./zod-schema.md)
- [jsonSchema](./json-schema.md)
- [tool](./tool.md)
