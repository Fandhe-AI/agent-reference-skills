---
source: https://ai-sdk.dev/docs/getting-started/navigating-the-library
---

# Navigating the Library

Guide to picking the right AI SDK part (Core, UI, RSC) for your environment and requirements.

## Signature / Usage

```text
AI SDK Core : generateText, streamText         (any JS environment: Node.js, Deno, Browser)
AI SDK UI   : useChat, useCompletion, useObject (React & Next.js, Vue & Nuxt, Svelte & SvelteKit)
AI SDK RSC  : streamUI                          (frameworks supporting React Server Components, e.g. Next.js)
```

## Options / Props

Environment compatibility (Check = supported):

| Environment | AI SDK Core | AI SDK UI | AI SDK RSC |
| --- | --- | --- | --- |
| None / Node.js / Deno | Check | Cross | Cross |
| Vue / Nuxt | Check | Check | Cross |
| Svelte / SvelteKit | Check | Check | Cross |
| Next.js Pages Router | Check | Check | Cross |
| Next.js App Router | Check | Check | Check |

AI SDK UI framework support:

| Function | React | Svelte | Vue.js |
| --- | --- | --- | --- |
| `useChat` | Check | Check | Check |
| `useChat` tool calling | Check | Check | Cross |
| `useCompletion` | Check | Check | Check |
| `useObject` | Check | Cross | Cross |
| MCP Apps | Check | Cross | Cross |

## Notes

- AI SDK RSC is experimental; AI SDK UI is recommended for production. Migration: see RSC "migrating to UI" guide.
- RSC limitations: no stream cancellation via Server Actions; `createStreamableUI` can lead to quadratic data transfer (use `createStreamableValue` and render client-side); components re-mount on `.done()` with `createStreamableUI`, causing flickering.
- AI SDK UI offers streaming chat and client-side generative UI, utilities for common interaction patterns (chat, completion, assistant), and supports React, Svelte and Vue.js; contributions welcome for missing non-React features.
- RSC here means React Server Components with Next.js; for Next.js itself use the nextjs-app skill.

## Related

- [Overview](./overview.md)
- [Streaming](./streaming.md)
- [Introduction](./introduction.md)
