---
source: https://ai-sdk.dev/docs/getting-started/choosing-a-provider
---

# Choosing a Provider

The AI SDK supports dozens of model providers through first-party, OpenAI-compatible, and community packages. The Vercel AI Gateway is the fastest way to start.

## Signature / Usage

AI Gateway via model string (default global provider):

```ts
import { generateText } from 'ai';

const { text } = await generateText({
  model: 'anthropic/claude-sonnet-5.5',
  prompt: 'What is love?',
});
```

Environment variable:

```env
AI_GATEWAY_API_KEY=your_api_key_here
```

Explicit gateway provider:

```ts
// Option 1: Import from 'ai' package (included by default)
import { gateway } from 'ai';
model: gateway('anthropic/claude-sonnet-5.5');

// Option 2: Install and import from '@ai-sdk/gateway' package
import { gateway } from '@ai-sdk/gateway';
model: gateway('anthropic/claude-sonnet-5.5');
```

Dedicated provider package:

```bash
npm i @ai-sdk/anthropic
```

```ts
import { anthropic } from '@ai-sdk/anthropic';

model: anthropic('claude-sonnet-5-5');
```

Custom provider:

```ts
import { generateText } from 'ai';
import { yourProvider } from 'your-custom-provider';

const { text } = await generateText({
  model: yourProvider('your-model-id'),
  prompt: 'What is love?',
});
```

## Notes

- AI Gateway access to models from OpenAI, Anthropic, Google and others; authenticate with OIDC or an AI Gateway API key. It is the default global provider, so string model references like `'anthropic/claude-sonnet-5.5'` work.
- The default global provider can be changed so string model references use a preferred provider (see provider management).
- The AI SDK provides a Language Model Specification that ensures compatibility across providers for custom providers.
- AI Gateway is Vercel's product; platform-side setup (API keys, dashboard) belongs to the vercel skill.

## Related

- [Providers and Models](./providers-and-models.md)
- [Provider Options](./provider-options.md)
- [Navigating the Library](./navigating-the-library.md)
