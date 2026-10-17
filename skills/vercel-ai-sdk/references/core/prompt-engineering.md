---
source: https://ai-sdk.dev/docs/ai-sdk-core/prompt-engineering
---

# Prompt Engineering

Tips for prompts that include tools or structured data schemas, and ways to debug what the provider actually received.

## Signature / Usage

```ts
const result = await generateText({
  model,
  prompt: 'Hello, world!',
  include: { requestMessages: true },
});

console.log(result.warnings);
console.log(result.finalStep.request.messages);
console.log(result.finalStep.request.body);
```

### Tips for tools

1. Use a model that is strong at tool calling, such as `gpt-6-astra` or `claude-sonnet-5-5`. Weaker models will often struggle to call tools effectively and flawlessly.
2. Keep the number of tools low, e.g. to 5 or less.
3. Keep the complexity of the tool parameters low. Complex Zod schemas with many nested and optional elements, unions, etc. can be challenging for the model.
4. Use semantically meaningful names for tools, parameters, parameter properties, etc.
5. Add `.describe("...")` to Zod schema properties to hint at what a property is for.
6. When the output of a tool might be unclear to the model and there are dependencies between tools, use the tool `description` field to describe the output of the tool execution.
7. Include example input/outputs of tool calls in your prompt. Tools work with JSON objects, so the examples should use JSON.

### Schemas

Zod dates: Zod expects JavaScript Date objects, but models return dates as strings. Validate the date format with `z.string().datetime()` or `z.string().date()`, then use a Zod transformer to convert to a Date:

```ts
const result = await generateText({
  model,
  output: Output.object({
    schema: z.object({
      events: z.array(
        z.object({
          event: z.string(),
          date: z
            .string()
            .date()
            .transform(value => new Date(value)),
        }),
      ),
    }),
  }),
  prompt: 'List 5 important events from the year 2000.',
});
```

Optional parameters: for maximum compatibility with providers that use strict schema validation, use `.nullable()` instead of `.optional()`:

```ts
// This works with strict schema validation
const workingTool = tool({
  description: 'Execute a command',
  inputSchema: z.object({
    command: z.string(),
    workdir: z.string().nullable(), // Use nullable instead
    timeout: z.string().nullable(),
  }),
});
```

Temperature: for tool calls and object generation, `temperature: 0` is recommended for deterministic and consistent results (structured data with specific formats, precise tool calls, strict schemas).

### Debugging

- `result.warnings`: providers either throw exceptions or return warnings when they do not support a feature.
- `request.messages`: input messages sent to the model for the final step; set `include.requestMessages` to `true` to include them in step results.
- `finalStep.request.body`: raw HTTP request bodies for models that expose them (e.g. OpenAI).

## Notes

- Optional-parameter incompatibility is particularly relevant for OpenAI models with structured outputs (strict mode).

## Related

- [Generating Structured Data](./generating-structured-data.md)
- [Settings](./settings.md)
