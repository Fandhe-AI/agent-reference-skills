---
source: https://ai-sdk.dev/docs/ai-sdk-core/devtools
---

# DevTools

AI SDK DevTools (`@ai-sdk/devtools`) captures runs and steps from `generateText`, `streamText`, and `ToolLoopAgent` through the telemetry system and serves a local web viewer to inspect LLM requests, responses, tool calls, and multi-step interactions.

## Signature / Usage

Install:

```bash
pnpm add @ai-sdk/devtools
```

Register `DevToolsTelemetry` globally (telemetry is enabled automatically once an integration is registered):

```ts
import { registerTelemetry } from 'ai';
import { DevToolsTelemetry } from '@ai-sdk/devtools';

registerTelemetry(DevToolsTelemetry());
```

Or pass it to an individual call:

```ts
const result = streamText({
  model,
  prompt: 'Hello!',
  telemetry: {
    integrations: [DevToolsTelemetry()],
  },
});
```

Launch the viewer (opens at `http://localhost:4983`):

```bash
npx @ai-sdk/devtools@latest
```

Monorepo: start DevTools from the same workspace where your AI SDK code runs.

```bash
cd apps/api
npx @ai-sdk/devtools@latest
```

Enable raw request / response body retention for `generateText` (AI SDK 7 excludes bodies from step results by default):

```ts
const result = await generateText({
  model,
  prompt: 'Hello!',
  include: {
    requestBody: true,
    responseBody: true,
  },
});
```

## Notes

- Warning: DevTools is intended for local development only. Do not use it in production environments.
- Requirements: AI SDK v7 (`ai@latest`) and a Node.js compatible runtime. Stability: local dev tool (experimental per the library's versioning policy).
- Two parts: a telemetry integration that captures runs and steps, and a web viewer. Captured data is stored locally in `.devtools/generations.json` and served by a UI built with Hono and React.
- The explicit `@latest` tag ensures `npx` installs an executable copy instead of selecting a transitive dependency whose binary is not linked into the workspace.
- `ToolLoopAgent` accepts the same `include` setting in its constructor. For `streamText` and `ToolLoopAgent.stream()`, only the request body can be retained: `include: { requestBody: true }`.
- Runs and steps: a run is a complete multi-step interaction grouped by the initial prompt; a step is a single LLM call within a run. Nested sub-agent calls are linked to their parent run.
- Captured data: input parameters and prompts; output content and tool calls; media previews; token usage and timing; raw provider data when body retention is enabled.
- Media previews: recognizes current `file` content parts and the deprecated `image-*`, `file-*`, and `media` tool-result aliases. At most 8 previews per value, at most 12 nested levels, inline previews up to 5 MiB. Remote `http` / `https` media is not loaded automatically (use "Load preview" in the viewer); URLs with embedded credentials are rejected.
- The viewer uses a dark theme by default; the theme button switches between dark and light and is stored per origin in the browser.
- The integration automatically adds `.devtools` to `.gitignore`. Verify it is ignored so sensitive AI interaction data is not committed.
- Security: DevTools stores all AI interactions locally in plain text (prompts, responses, tool call arguments and results, and request / response data when body retention is enabled). Only use it in local development and not with sensitive data.

## Related

- [Telemetry](./telemetry.md)
- [generateText](../core/generate-text.md)
- [streamText](../core/stream-text.md)
- [ToolLoopAgent](../agents/tool-loop-agent.md)
