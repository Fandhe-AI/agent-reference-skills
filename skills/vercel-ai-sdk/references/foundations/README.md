# foundations

| Name | Description | Path |
|------|-------------|------|
| Choosing a Provider | The AI SDK supports dozens of model providers through first-party, OpenAI-compatible, and community packages. The Vercel AI Gateway is the fastest way to start. | [choosing-a-provider.md](./choosing-a-provider.md) |
| Coding Agents | Set up the AI SDK for use inside a coding agent (Claude Code, Codex, OpenCode, Cursor, etc.): official AI SDK skill, bundled docs in `node_modules`, and DevTools. | [coding-agents.md](./coding-agents.md) |
| AI SDK by Vercel | The AI SDK is the TypeScript toolkit designed to help developers build AI-powered applications and agents with React, Next.js, Vue, Svelte, Node.js, and more. It standardizes integrating AI models across supported providers. | [introduction.md](./introduction.md) |
| Navigating the Library | Guide to picking the right AI SDK part (Core, UI, RSC) for your environment and requirements. | [navigating-the-library.md](./navigating-the-library.md) |
| Overview | Beginner-friendly introduction to the high-level AI concepts behind the AI SDK: generative AI, large language models, and embedding models. | [overview.md](./overview.md) |
| Prompts | The AI SDK supports text, message, and system prompts through `prompt`, `messages` and `instructions` on functions such as `generateText` and `streamText`. | [prompts.md](./prompts.md) |
| Provider Options | Provider options pass provider-specific configuration beyond the standard settings shared by all providers, via the `providerOptions` property on functions like `generateText` and `streamText`. | [provider-options.md](./provider-options.md) |
| Providers and Models | AI SDK Core offers a standardized approach to interacting with LLMs through a language model specification (`packages/provider/src/language-model/v4` in `vercel/ai`) that abstracts differences between providers, so you can switch providers while using the same API. | [providers-and-models.md](./providers-and-models.md) |
| Streaming | Why stream LLM output: blocking UIs can leave users on loading spinners for 5, 10, even up to 40s, while streaming UIs display parts of the response as they become available. | [streaming.md](./streaming.md) |
| Tools | Tools are actions that an LLM can invoke; results are reported back to the LLM for the next response. Pass tools via the `tools` parameter of `generateText` and `streamText`. | [tools.md](./tools.md) |
