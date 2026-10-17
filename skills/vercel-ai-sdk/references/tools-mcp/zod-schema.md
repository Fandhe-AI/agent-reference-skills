---
source: https://ai-sdk.dev/docs/reference/ai-sdk-core/zod-schema
---

# zodSchema

Converts a Zod schema into a JSON schema object compatible with the AI SDK; takes a Zod schema and optional configuration and returns a typed schema. Usable for structured data generation and tools.

## Signature / Usage

```ts
import { zodSchema } from 'ai';
import { z } from 'zod';

// Define a base category schema
const baseCategorySchema = z.object({
  name: z.string(),
});

// Define the recursive Category type
type Category = z.infer<typeof baseCategorySchema> & {
  subcategories: Category[];
};

// Create the recursive schema using z.lazy
const categorySchema: z.ZodType<Category> = baseCategorySchema.extend({
  subcategories: z.lazy(() => categorySchema.array()),
});

// Create the final schema with useReferences enabled for recursive support
const mySchema = zodSchema(
  z.object({
    category: categorySchema,
  }),
  { useReferences: true },
);
```

Import: `import { zodSchema } from "ai"`. Returns a Schema object containing both the JSON schema representation and validation functionality.

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| zodSchema | z.Schema | — | The Zod schema definition. |
| options | object | — | Additional options for the schema conversion. |
| options.useReferences | boolean | `false` | Optional. Enables references in the schema; required for recursive schemas (e.g. `z.lazy`), but not all models and providers support references. |

## Notes

- Zod objects can be passed directly to AI SDK functions; they are converted internally with `zodSchema()`. Pass the helper explicitly only for options such as `useReferences`.
- Call `.meta()` / `.describe()` **at the end** of the Zod chain: other methods (`.min()`, `.optional()`, `.extend()`) return a new instance that does not inherit metadata.

```ts
// Metadata will be lost - .min() returns a new instance without metadata
z.string().meta({ describe: 'first name' }).min(1);

// Metadata is preserved - .meta() is the final method
z.string().min(1).meta({ describe: 'first name' });
```

- Distinct from the zod skill: that skill covers the Zod library itself (schemas, parsing, refinements); this page covers only the AI SDK `zodSchema()` conversion helper.

## Related

- [jsonSchema](./json-schema.md)
- [valibotSchema](./valibot-schema.md)
- [tool](./tool.md)
- [Generating Structured Data](../core/generating-structured-data.md)
