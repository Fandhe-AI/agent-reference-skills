---
source: https://ai-sdk.dev/cookbook/node/repair-json-with-jsonrepair
---

# Repair Malformed JSON with jsonrepair

Generate text, repair truncated or malformed JSON with `jsonrepair`, then parse and validate it with a schema.

```bash
pnpm add jsonrepair
```

```ts
import { generateText, Output } from 'ai';
import { safeParseJSON } from '@ai-sdk/provider-utils';
__PROVIDER_IMPORT__;
import { jsonrepair } from 'jsonrepair';
import { z } from 'zod';

const recipeSchema = z.object({
  recipe: z.object({
    name: z.string(),
    ingredients: z.array(
      z.object({
        name: z.string(),
        amount: z.string(),
      }),
    ),
    steps: z.array(z.string()),
  }),
});

const result = await generateText({
  model: __MODEL__,
  output: Output.text(),
  prompt:
    'Generate a lasagna recipe. Respond with JSON only (no prose, no code fences) in the shape {"recipe":{"name":string,"ingredients":[{"name":string,"amount":string}],"steps":string[]}}.',
});

const repairedText = jsonrepair(result.text);
const parseResult = await safeParseJSON({ text: repairedText });

if (!parseResult.success) {
  throw parseResult.error;
}

const output = recipeSchema.parse(parseResult.value);
console.log(output.recipe);
```

## Notes

- `__PROVIDER_IMPORT__` and `__MODEL__` are placeholders on the official page; replace them with your provider import and model.
- Flow: generate plain text (`Output.text()`), repair with `jsonrepair`, parse with `safeParseJSON` (from `@ai-sdk/provider-utils`), validate with your schema. Repair is best-effort and cannot fix structurally wrong data; for truncation consider raising `maxOutputTokens` or simplifying the schema.
- The official page's prompt does not specify a JSON format, so an instruction to return JSON only and the schema shape were added.
- The cookbook text omits `await` before `safeParseJSON`; it returns a Promise (other docs pages call `await safeParseJSON(...)`).
- The page describes this as a pattern for AI SDK v6. Native structured output is in `references/core/generating-structured-data.md`; schema validation with Zod belongs to the zod skill.
