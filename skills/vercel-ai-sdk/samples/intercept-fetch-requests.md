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
    console.log('Headers', JSON.stringify(options!.headers, null, 2));
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
- The wrapper logs request headers, which may contain credentials; do not log them in production.
- Provider setup: `references/providers/ai-gateway.md`.
