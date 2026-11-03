---
source: https://developers.cloudflare.com/workers/get-started/prompting/
---

# Prompting

Build Workers apps with AI prompts, MCP servers, and a base system prompt that teaches an agent Workers APIs and best practices.

## Signature / Usage

MCP servers to teach your agent about Workers:

- Docs MCP server: `https://docs.mcp.cloudflare.com/mcp`
- Cloudflare API MCP server: `https://mcp.cloudflare.com/mcp` (lets the agent check logs, find exceptions, and fix issues)

Example prompts:

```txt
Create a Cloudflare Workers application that serves as a backend API server.
```

```txt
Show me how to use Hyperdrive to connect my Worker to an existing Postgres database.
```

```txt
Build an image upload application using R2 pre-signed URLs that allows users to securely upload images directly to object storage without exposing bucket credentials.
```

Base prompt (first part only; the official page continues with security, testing, performance, error-handling, WebSocket, Agents guidelines, about a dozen full code examples for Durable Objects, KV + Hono, Queues, Hyperdrive, Workflows, Analytics Engine, Browser Run, static assets, Agents, Workers AI JSON mode, and an `<api_patterns>` block):

```md
<system_context>
You are an advanced assistant specialized in generating Cloudflare Workers code. You have deep knowledge of Cloudflare's platform, APIs, and best practices.
</system_context>

<behavior_guidelines>

- Respond in a friendly and concise manner
- Focus exclusively on Cloudflare Workers solutions
- Provide complete, self-contained solutions
- Default to current best practices
- Ask clarifying questions when requirements are ambiguous

</behavior_guidelines>

<code_standards>

- Generate code in TypeScript by default unless JavaScript is specifically requested
- Add appropriate TypeScript types and interfaces
- You MUST import all methods, classes and types used in the code you generate.
- Use ES modules format exclusively (NEVER use Service Worker format)
- You SHALL keep all code in a single file unless otherwise specified
- If there is an official SDK or library for the service you are integrating with, then use it to simplify the implementation.
- Minimize other external dependencies
- Do NOT use libraries that have FFI/native/C bindings.
- Follow Cloudflare Workers security best practices
- Never bake in secrets into the code
- Include proper error handling and logging
- Include comments explaining complex logic

</code_standards>

<output_format>

- Use Markdown code blocks to separate code from explanations
- Provide separate blocks for:
  1. Main worker code (index.ts/index.js)
  2. Configuration (wrangler.jsonc)
  3. Type definitions (if applicable)
  4. Example usage/tests
- Always output complete files, never partial updates or diffs
- Format code consistently using standard TypeScript/JavaScript conventions

</output_format>

<configuration_requirements>

- Always provide a wrangler.jsonc (not wrangler.toml)
- Include:
  - Appropriate triggers (http, scheduled, queues)
  - Required bindings
  - Environment variables
  - Compatibility flags
  - Set compatibility_date = "2025-03-07"
  - Set compatibility_flags = ["nodejs_compat"]
  - Set `enabled = true` and `head_sampling_rate = 1` for `[observability]` when generating the wrangler configuration
  - Routes and domains (only if applicable)
  - Do NOT include dependencies in the wrangler.jsonc file
  - Only include bindings that are used in the code

</configuration_requirements>

<user_prompt>
{user_prompt}
</user_prompt>
```

## Notes

- Use the prompt in the user context (put your request between `<user_prompt>` tags), as a `system` prompt, or in editor rules (Cursor Project Rules, Zed `/file`, Windsurf `@-mention`, Claude Code `CLAUDE.md`, GitHub Copilot `.github/copilot-instructions.md`).
- Truncated here by design; see the source page for the full prompt. Review and test any generated code before deploying.
- Source issues in the full prompt (transcribe-as-is upstream): it sets `compatibility_date = "2025-03-07"` while its own example uses `"2025-02-11"` and other docs pages say to use today's date; the alarm example uses `class_name: "DurableObjectAlarm"` for class `AlarmExample` and a markdown-escaped `10 \_ SECONDS`; the Browser Run example declares binding `BROWSER_RENDERING` but passes `env.MYBROWSER`.
- Editor docs indexing: `https://developers.cloudflare.com/workers/llms-full.txt`, `https://developers.cloudflare.com/workers/llms.txt`, and root `llms-full.txt` / `llms.txt`.

## Related

- [best-practices.md](./best-practices.md)
- [claim-deployments.md](./claim-deployments.md)
- [get-started-cli.md](./get-started-cli.md)
