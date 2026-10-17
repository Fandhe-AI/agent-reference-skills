---
source: https://ai-sdk.dev/docs/getting-started/coding-agents
---

# Coding Agents

Set up the AI SDK for use inside a coding agent (Claude Code, Codex, OpenCode, Cursor, etc.): official AI SDK skill, bundled docs in `node_modules`, and DevTools.

## Signature / Usage

Install the official AI SDK skill:

```bash
npx skills add vercel/ai
```

Bundled docs and source after installing `ai`:

```text
node_modules/ai/src/              # Full source code organized by module
node_modules/ai/docs/             # Official documentation with examples
```

Register DevTools telemetry (local development only):

```bash
npm i @ai-sdk/devtools
```

```ts
import { registerTelemetry } from 'ai';
import { DevToolsTelemetry } from '@ai-sdk/devtools';

registerTelemetry(DevToolsTelemetry());
```

Start the viewer in a separate terminal, then open `http://localhost:4983`:

```bash
npx @ai-sdk/devtools@latest
```

Log tool results during development:

```ts
import { streamText, tool, isStepCount } from 'ai';
import { z } from 'zod';

const result = streamText({
  model,
  prompt: "What's the weather in New York in celsius?",
  tools: {
    weather: tool({
      description: 'Get the weather in a location (fahrenheit)',
      inputSchema: z.object({
        location: z.string().describe('The location to get the weather for'),
      }),
      execute: async ({ location }) => ({
        location,
        temperature: Math.round(Math.random() * (90 - 32) + 32),
      }),
    }),
  },
  stopWhen: isStepCount(5),
  onStepEnd: async ({ toolResults }) => {
    if (toolResults.length) {
      console.log(JSON.stringify(toolResults, null, 2));
    }
  },
});
```

## Notes

- `npx skills add vercel/ai` installs into the agent's skills directory (e.g. `.claude/skills`, `.codex/skills`); with several agents the CLI creates symlinks. `-a` specifies agents directly (`-a amp` installs into the universal `.agents/skills` directory); `-y` is non-interactive.
- Agent Skills use progressive disclosure: only name and description are loaded at startup; full instructions are pulled in when the task calls for it.
- AI SDK DevTools is experimental and intended for local development only; do not use in production. It stores interactions in a local `.devtools/generations.json` and automatically adds `.devtools` to `.gitignore`.
- DevTools groups multi-step interactions into runs (complete interaction) and steps (each LLM call), capturing input parameters/prompts, output content and tool calls, token usage and timing, and raw provider data. Once an integration is registered, telemetry is enabled automatically for all AI SDK calls.
- Distance from this skill: the official skill installed by `npx skills add vercel/ai` is a different distribution path from this reference skill (which is installed from this repository). Do not confuse the two.
- "Skills" here are Agent Skills (SKILL.md) consumed by coding agents; for the Skills API see anthropic-api-tools-mcp and for Claude Code Agent Skills authoring see anthropic-claude-code-extend. Codex usage is covered by openai-codex.

## Related

- [Introduction](./introduction.md)
- [Tools](./tools.md)
