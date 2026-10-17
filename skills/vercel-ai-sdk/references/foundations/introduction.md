---
source: https://ai-sdk.dev/docs/introduction
---

# AI SDK by Vercel

The AI SDK is the TypeScript toolkit designed to help developers build AI-powered applications and agents with React, Next.js, Vue, Svelte, Node.js, and more. It standardizes integrating AI models across supported providers.

## Signature / Usage

Primary surfaces:

- **AI SDK Core**: A unified API for generating text, structured objects, tool calls, and building agents with LLMs.
- **AI SDK UI**: A set of framework-agnostic hooks for quickly building chat and generative user interfaces.
- **AI SDK Harnesses**: A uniform API for running established agent harnesses with `HarnessAgent`.

Prompting an LLM with the full documentation (`llms.txt`):

```prompt
Documentation:
{paste documentation here}
---
Based on the above documentation, answer the following:
{your question}
```

## Notes

- The AI SDK includes a harness abstraction for using established agent harnesses such as Claude Code, Codex, and Pi through `HarnessAgent`. Harnesses are decoupled from model providers, but use compatible stream and response primitives so AI SDK UI and agent surfaces can consume them in the same way.
- The whole documentation is available as Markdown at `ai-sdk.dev/llms.txt`, usable with Cursor, Windsurf, Copilot, Claude etc. (needs a big context window).
- Templates (starter kits, feature exploration, frameworks, generative UI, security) are listed at `vercel.com/templates?type=ai`; community Q&A is on the Vercel Community.

## Related

- [Overview](./overview.md)
- [Providers and Models](./providers-and-models.md)
- [Navigating the Library](./navigating-the-library.md)
