---
source: https://ai-sdk.dev/cookbook/node/intercept-fetch-requests
---

# Intercept Fetch Requests

Pass a custom `fetch` to a provider factory (`createGateway`) to log or modify requests and responses.

```ts
import { generateText, createGateway } from 'ai';

const gateway = createGateway({
  // example fetch wrapper that logs the input to the API call:
  fetch: async (url, options) => {
    console.log('URL', url);
    // omit credential headers before logging
    const { authorization, 'x-api-key': apiKey, ...safeHeaders } =
      Object.fromEntries(new Headers(options?.headers));
    console.log('Headers', JSON.stringify(safeHeaders, null, 2));
    console.log(
      `Body ${JSON.stringify(JSON.parse(options!.body! as string), null, 2)}`,
    );
    return await fetch(url, options);
  },
});

const { text } = await generateText({
  model: gateway('openai/gpt-6-astra'),
  prompt: 'Why is the sky blue?',
});
```

## Notes

- Many providers accept a `fetch` argument in their factory function. Uses on the page: logging requests and responses, adding authentication headers, modifying request bodies, caching responses, and using a custom HTTP client.
- Modified from the official example: the official wrapper logs all request headers, which include credentials (e.g. the AI Gateway `authorization` header). This version excludes `authorization` and `x-api-key` before logging.
- Provider setup: `references/providers/ai-gateway.md`.
