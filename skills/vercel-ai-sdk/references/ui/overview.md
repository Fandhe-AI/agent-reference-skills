---
source: https://ai-sdk.dev/docs/ai-sdk-ui/overview
---

# AI SDK UI

AI SDK UI is a framework-agnostic toolkit for building interactive chat, completion, and assistant applications. It manages chat streams and UI updates on the frontend through three main hooks: `useChat`, `useCompletion`, and `useObject`.

## Signature / Usage

```tsx
import { useChat } from '@ai-sdk/react';

const { messages, sendMessage } = useChat();
```

### Hooks

| Name | Description |
| --- | --- |
| `useChat` | Real-time streaming of chat messages; manages message, loading, and error state. Input state is managed in your component. |
| `useCompletion` | Handles text completions; manages the prompt input and updates the UI as new completions are streamed. |
| `useObject` | Consumes streamed JSON objects to handle and display structured data. |

### UI Framework Support

| Framework | useChat | useCompletion | useObject | MCP Apps |
| --- | --- | --- | --- | --- |
| React `@ai-sdk/react` | Yes | Yes | Yes | Yes |
| Vue.js `@ai-sdk/vue` | Yes | Yes | Yes | No |
| Svelte `@ai-sdk/svelte` | Yes (`Chat`) | Yes (`Completion`) | Yes (`StructuredObject`) | No |
| Angular `@ai-sdk/angular` | Yes (`Chat`) | Yes (`Completion`) | Yes (`StructuredObject`) | No |
| SolidJS (community, `kodehort/ai-sdk-solid`) | Yes | Yes | Yes | No |

## Notes

- Official framework examples live in `vercel/ai` under `examples/`: `ai-e2e-next` (Next.js), `nuxt-openai` (Nuxt), `sveltekit-openai` (SvelteKit), `angular` (Angular).
- This skill documents the React hooks (`@ai-sdk/react`).

## Related

- [useChat](./use-chat.md)
- [useCompletion](./use-completion.md)
- [useObject](./use-object.md)
- [Transport](./transport.md)
- [Stream Protocols](./stream-protocol.md)
