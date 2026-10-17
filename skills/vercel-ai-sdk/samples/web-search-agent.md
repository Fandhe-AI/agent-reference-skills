---
source: https://ai-sdk.dev/cookbook/node/web-search-agent
---

# Web Search Agent

Give a model web access either through provider-native search tools or a custom search tool with multi-step `stopWhen`.

```ts
// Native: OpenAI Responses web search
import { openai } from '@ai-sdk/openai';
import { generateText } from 'ai';

const { text, sources } = await generateText({
  model: 'openai/gpt-6-luna',
  prompt: 'What happened in San Francisco last week?',
  tools: {
    web_search: openai.tools.webSearch({}),
  },
});

console.log(text);
console.log(sources);
```

```ts
// Native: Gemini search grounding
import { google } from '@ai-sdk/google';
import { generateText } from 'ai';

const { text, sources, providerMetadata } = await generateText({
  model: 'google/gemini-3.8-flash',
  tools: {
    google_search: google.tools.googleSearch({}),
  },
  prompt:
    'List the top 5 San Francisco news from the past week.' +
    'You must include the date of each article.',
});

console.log(text);
console.log(sources);

// access the grounding metadata.
const metadata = providerMetadata?.google;
const groundingMetadata = metadata?.groundingMetadata;
const safetyRatings = metadata?.safetyRatings;
```

```ts
// Custom tool: Exa search with multi-step generation
import { generateText, tool, isStepCount } from 'ai';
__PROVIDER_IMPORT__;
import { z } from 'zod';
import Exa from 'exa-js';

export const exa = new Exa(process.env.EXA_API_KEY);

export const webSearch = tool({
  description: 'Search the web for up-to-date information',
  inputSchema: z.object({
    query: z.string().min(1).max(100).describe('The search query'),
  }),
  execute: async ({ query }) => {
    const { results } = await exa.searchAndContents(query, {
      livecrawl: 'always',
      numResults: 3,
    });
    return results.map(result => ({
      title: result.title,
      url: result.url,
      content: result.text.slice(0, 1000), // take just the first 1000 characters
      publishedDate: result.publishedDate,
    }));
  },
});

const { text } = await generateText({
  model: __MODEL__, // can be any model that supports tools
  prompt: 'What happened in San Francisco last week?',
  tools: {
    webSearch,
  },
  stopWhen: isStepCount(5),
});
```

## Notes

- `__PROVIDER_IMPORT__` and `__MODEL__` in the custom-tool block are placeholders on the official page; replace them with your provider import and model.
- Native search runs on the provider's infrastructure and returns `sources`; controls and pricing vary by provider and can incur extra tool charges. Custom tools give more control and work with any tool-calling model, at the cost of the search API.
- Tool-based search needs `stopWhen: isStepCount(n)` with n > 1 so tool results are sent back for the second generation.
- The page also covers a `ToolLoopAgent` variant, Perplexity (`perplexity('fast')`), ready-made tools (`@exalabs/ai-sdk`, `@parallel-web/ai-sdk-tools`, `@perplexity-ai/ai-sdk`, `@tavily/ai-sdk`, `@youdotcom-oss/ai-sdk-plugin`) and a Firecrawl scrape tool. Raw OpenAI / Anthropic search APIs belong to openai-api-core / anthropic-api-core; here only the AI SDK wrappers (`references/providers/openai.md`, `references/providers/google.md`).
