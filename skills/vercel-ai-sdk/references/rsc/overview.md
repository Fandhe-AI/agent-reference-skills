---
source: https://ai-sdk.dev/docs/ai-sdk-rsc/overview
---

# AI SDK RSC Overview

AI SDK RSC (`@ai-sdk/rsc`) lets a large language model generate and stream UI from the server to the client using React Server Components and Server Actions. It is currently experimental.

## Signature / Usage

```tsx
import {
  streamUI,
  createAI,
  useUIState,
  useAIState,
  useActions,
  createStreamableValue,
  readStreamableValue,
  createStreamableUI,
  useStreamableValue,
} from '@ai-sdk/rsc';
```

## Functions

| Group | Function | Description |
| --- | --- | --- |
| Generative UI | `streamUI` | Calls a model and allows it to respond with React Server Components. |
| Generative UI | `useUIState` | Returns the current UI state and a function to update it (like React's `useState`). UI State is the visual representation of the AI state. |
| Generative UI | `useAIState` | Returns the current AI state and a function to update it. The AI state contains context shared with the model, such as system messages and function responses. |
| Generative UI | `useActions` | Provides access to your Server Actions from the client. |
| Generative UI | `createAI` | Creates a client-server context provider that wraps parts of the application tree to manage both UI and AI states. |
| Streamable values | `createStreamableValue` | Creates a stream that sends values (any serializable data) from the server to the client. |
| Streamable values | `readStreamableValue` | Reads, on the client, a streamable value created with `createStreamableValue`. |
| Streamable values | `createStreamableUI` | Creates a stream that sends UI from the server to the client. |
| Streamable values | `useStreamableValue` | Accepts a streamable value and returns the current value, error, and pending state. |

## Notes

- AI SDK RSC is currently experimental. The docs recommend AI SDK UI for production; see [migrating-to-ui.md](./migrating-to-ui.md).
- The `@ai-sdk/rsc` package is compatible with frameworks that support React Server Components.
- Distinction: this page covers the AI SDK RSC package only. The nextjs-app skill covers Next.js App Router, React Server Components and Server Actions themselves.

## Related

- [Migrating from RSC to UI](./migrating-to-ui.md)
- [streamUI](./stream-ui.md)
- [createAI](./create-ai.md)
