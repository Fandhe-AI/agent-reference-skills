---
source: https://ai-sdk.dev/docs/foundations/tools
---

# Tools

Tools are actions that an LLM can invoke; results are reported back to the LLM for the next response. Pass tools via the `tools` parameter of `generateText` and `streamText`.

## Signature / Usage

```ts
import { tool } from 'ai';
import { z } from 'zod';

const weatherTool = tool({
  description: 'Get the weather in a location',
  inputSchema: z.object({
    location: z.string().describe('The location to get the weather for'),
  }),
  execute: async ({ location }) => {
    // Your implementation
    return { temperature: 72, conditions: 'sunny' };
  },
});
```

Dynamic tool:

```ts
import { dynamicTool } from 'ai';
import { z } from 'zod';

const runtimeTool = dynamicTool({
  description: 'Execute a tool loaded at runtime',
  inputSchema: z.object({}),
  execute: async input => {
    // input is typed as unknown
    return runRuntimeTool(input);
  },
});
```

Provider-defined tool (Anthropic `bash`):

```ts
import { anthropic } from '@ai-sdk/anthropic';
import { generateText } from 'ai';

const result = await generateText({
  model: anthropic('claude-opus-4-5'),
  tools: {
    bash: anthropic.tools.bash_20250124({
      execute: async ({ command }) => {
        // Your implementation to run the command
        return runCommand(command);
      },
    }),
  },
  prompt: 'List files in the current directory',
});
```

Provider-executed tool (OpenAI web search):

```ts
import { openai } from '@ai-sdk/openai';
import { generateText } from 'ai';

const result = await generateText({
  model: openai('gpt-6-astra'),
  tools: {
    web_search: openai.tools.webSearch(),
  },
  prompt: 'What happened in the news today?',
});
```

Refining tool inputs (experimental):

```ts
import { generateText, tool } from 'ai';
import { z } from 'zod';

const result = await generateText({
  model: 'openai/gpt-6-luna',
  tools: {
    search: tool({
      inputSchema: z.object({
        query: z.string(),
        category: z.string().nullable(),
      }),
      execute: async ({ query, category }) => {
        return search({ query, category });
      },
    }),
  },
  experimental_refineToolInput: {
    search: input => ({
      ...input,
      category: input.category === '' ? null : input.category,
    }),
  },
  prompt: 'Search for ski jackets with no category.',
});
```

Using a tool package with multi-step loop:

```ts
import { generateText, isStepCount } from 'ai';
import { searchTool } from 'some-tool-package';

const { text } = await generateText({
  model: 'anthropic/claude-haiku-5.5',
  prompt: 'When was Vercel Ship AI?',
  tools: {
    webSearch: searchTool,
  },
  stopWhen: isStepCount(10),
});
```

## Options / Props

A tool consists of three properties:

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `description` | string or function | — | Optional description that can influence when the tool is picked. Function and dynamic tools can use a string or a function that derives the description from the tool's context and experimental sandbox |
| `inputSchema` | Zod schema or JSON schema | — | Defines the input required for the tool to run; consumed by the LLM and used to validate tool calls |
| `execute` | async function | — | Optional; called with the arguments from the tool call |

Four tool types:

| Aspect | Function Tools | Dynamic Tools | Provider-Defined Tools | Provider-Executed Tools |
| --- | --- | --- | --- | --- |
| Execution | Your code | Your code | Your code | Provider's servers |
| Schema | You define | Runtime-defined | Provider defines | Provider defines |
| Portability | Works with any provider | Works with any provider | Provider-specific | Provider-specific |
| Model Training | General tool use | General tool use | Optimized for the tool | Optimized for the tool |
| Setup | You implement everything | You load or generate the tool | You implement execute | Configuration only |

## Notes

- Tools with an `execute` function are run automatically when the model generates tool calls; tool results can be passed back automatically using multi-step calls with `stopWhen`.
- Supported schemas: Zod v3 and v4 directly or via `zodSchema()`; Valibot via `valibotSchema()` from `@ai-sdk/valibot`; Standard JSON Schema compatible schemas; raw JSON schemas via `jsonSchema()`. Schemas are also usable for structured output via the `output` setting.
- `experimental_refineToolInput` is experimental. It normalizes a parsed tool input before execution and before it appears in outputs, lifecycle callbacks, and telemetry; functions are typed per tool and must return the same type shape.
- `streamUI` uses UI generator tools with a `generate` function that can return React components.
- Dynamic tools: input and output types are not known at development time (e.g. tools loaded from MCP servers, user-defined functions, databases).
- Provider-defined tools are also called "client tools"; provider-executed tools are also called "server-side tools". Both are documented on each provider's page.
- Tools are JavaScript objects and can be published to npm; a template exists at `vercel-labs/ai-sdk-tool-as-package-template`.
- The page also lists community toolsets (web search packages, Stripe agent tools, StackOne, Composio, bash-tool, MCP marketplaces such as Smithery / Pipedream / Apify); see the source page.

## Related

- [Prompts](./prompts.md)
- [Streaming](./streaming.md)
- [Provider Options](./provider-options.md)
