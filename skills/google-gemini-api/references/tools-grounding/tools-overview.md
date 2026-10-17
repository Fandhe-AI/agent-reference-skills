---
source: https://ai.google.dev/gemini-api/docs/tools
---

# Using tools with Gemini API

Tools extend Gemini models so they can take action, access real-time information, and perform computation. The API offers fully managed built-in tools, or you can define custom tools with function calling. The page has no code samples; the tool table below is quoted from the source.

## Signature / Usage

```text
| Tool | Description | Use Cases |
|---|---|---|
| Google Search | Ground responses in current events and facts from the web to reduce hallucinations. | Answering questions about recent events, verifying facts with diverse sources. |
| Google Maps | Build location-aware assistants that can find places, get directions, and provide rich local context. | Planning travel itineraries with multiple stops, finding local businesses based on user criteria. |
| Code Execution | Allow the model to write and run Python code to solve math problems or process data accurately. | Solving complex mathematical equations, processing and analyzing text data precisely. |
| URL Context | Direct the model to read and analyze content from specific web pages or documents. | Answering questions based on specific URLs or documents, retrieving information across different web pages. |
| Computer Use (Preview) | Enable Gemini to view a screen and generate actions to interact with web browser UIs (Client-side execution). | Automating repetitive web-based workflows, testing web application user interfaces. |
| File Search | Index and search your own documents to enable Retrieval Augmented Generation (RAG). | Searching technical manuals, question answering over proprietary data. |
```

Example of a custom tool call returned by the model (function calling flow):

```json
{"name": "get_order_status", "args": {"order_id": "123"}}
```

## Notes

- Built-in tool flow (Google Search, Google Maps, URL Context, File Search, Code Execution): the whole process happens within one API call; Gemini runs the tools on Google's servers and returns the final grounded answer.
- Custom tool flow (function calling) and Computer Use: your application executes. Gemini returns structured JSON to call a function, always with a unique `id`; you return the result with the same `id`.
- Combining built-in and custom tools (Preview): Gemini 4 and Gemini 3 series models can combine built-in tools with custom tools in a single turn using tool context circulation; the response includes encrypted thought signatures. A flag turns on combination support (see tool-combination).
- In the Interactions API, combination is triggered by declaring built-in tools together with `function` tools (no flag appears in the Interactions tool-combination examples); the flag is the generateContent-side `toolConfig.includeServerSideToolInvocations` (`include_server_side_tool_invocations`).
- Preview: Gemini 3.1 Pro Preview has a separate endpoint for mixes of bash and custom tools, `gemini-3.1-pro-preview-customtools`.
- Function calling vs structured outputs: use function calling when the model needs an intermediate step connecting to your own tools or data; use Structured Outputs when the final response must adhere to a schema.
- Structured outputs with built-in tools (Preview): available only to Gemini 4 and Gemini 3 series models.
- Tools also work in Live API sessions (Live API tools page). Pricing for tools is on the Pricing page (`#pricing_for_tools`).
- Distinct from `anthropic-api-tools-mcp` (Claude API tool use / server tools) and `openai-agents` (OpenAI built-in tools / MCP); this is the Gemini API tool set.
- API surface: Interactions API guide tree (`/docs/tools`); a generateContent counterpart exists under `generate-content/`. Docs fetched 2026-10-16.

## Related

- [function-calling](./function-calling.md)
- [tool-combination](./tool-combination.md)
- [google-search](./google-search.md)
- [maps-grounding](./maps-grounding.md)
- [url-context](./url-context.md)
- [code-execution](./code-execution.md)
- [computer-use](./computer-use.md)
- [file-search](./file-search.md)
