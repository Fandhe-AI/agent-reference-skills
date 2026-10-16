---
source: https://ai.google.dev/gemini-api/docs/coding-agents
---

# Coding agent setup & developer resources

How to give an AI coding agent access to current Gemini API documentation and rules: Gemini agent skills, the Gemini Docs MCP server, the Gemini API plugin for Antigravity, machine-readable docs, and project rules.

## Signature / Usage

Install Gemini skills (skills.sh or Context7):

```bash
# List all available skills in the repository
npx skills add google-gemini/gemini-skills --list

# Install a specific skill globally with skills.sh
npx skills add google-gemini/gemini-skills --skill <skill-name> --global

# Or install with Context7
npx ctx7 skills install /google-gemini/gemini-skills <skill-name>
```

Connect the Gemini Docs MCP server:

```bash
npx add-mcp "https://gemini-api-docs-mcp.dev"
```

```bash
claude mcp add --transport http geminiDocs https://gemini-api-docs-mcp.dev
```

```json
{
  "mcpServers": {
    "geminiDocs": {
      "url": "https://gemini-api-docs-mcp.dev"
    }
  }
}
```

Mount the skills repository in a managed agent:

```python
from google import genai

client = genai.Client()

interaction = client.interactions.create(
    agent="antigravity-preview-09-2026",
    input="Build a script that generates a 5-second video of a neon cityscape.",
    environment={
        "type": "remote",
        "sources": [
            {
                "type": "repository",
                "source": "https://github.com/google-gemini/gemini-skills",
                "target": ".agents",
            }
        ],
    },
)
```

Recommended `AGENTS.md` rules:

```text
# Gemini API Guidelines

- Before writing Gemini API code, consult the `geminiDocs` MCP server (`gemini_search_docs` / `gemini_get_doc`) or `https://ai.google.dev/gemini-api/docs/llms.txt`.
- Always use the current Gemini API SDK (`google-genai` for Python, `@google/genai` for TypeScript/JavaScript). Never use legacy SDKs (`google-generativeai` or `@google/generative-ai`).
- Use the Interactions API (`client.interactions.create`) for new applications unless a specific feature requires `generateContent`.
- Use current recommended models (see https://ai.google.dev/gemini-api/docs/models) and avoid deprecated models.
```

## Options / Props

| Resource | What it provides | Availability |
|----------|------------------|--------------|
| Gemini Agent Skills | Rules, SDK patterns, helper scripts: `gemini-api-dev`, `gemini-live-api-dev`, `gemini-omni-flash-api` | Pre-installed in AI Studio Build; install with `skills.sh`, Context7, or Managed Agents |
| Gemini Docs MCP Server | `gemini_search_docs` (search) and `gemini_get_doc` (full page read) | Claude Code, Cursor, OpenAI Codex, VS Code |
| Gemini API Plugin | Official Gemini skills, Docs MCP server, API key tools | Antigravity |
| Machine-Readable Docs | Markdown pages and `llms.txt` indexes | All pages on `ai.google.dev/gemini-api/docs` |

Status commands:

| Environment | MCP verification | Skills verification |
|---|---|---|
| Claude Code | Run `/mcp` | Run `/skills` |
| Cursor | Open Settings > Features > MCP | Open Settings > Rules |
| OpenAI Codex | Run `codex mcp list` | Check `.codex/skills/` or `~/.codex/skills/` |
| Antigravity | Open Customizations > Connections | Open Customizations > Rules or run `/skills list` |
| VS Code (Copilot) | Open Extensions > MCP or Output panel | Click Select Tools in Copilot Chat |

## Notes

- Skills described here: `gemini-api-dev` (Interactions API, `google-genai` / `@google/genai`; text, chat, streaming, structured outputs, function calling, image generation, TTS, multimodal input, server-side state, background execution, Deep Research, managed agents), `gemini-live-api-dev` (Live API: WebSocket sessions, ephemeral client tokens, session resumption, VAD, barge-in, transcription, live translation), `gemini-omni-flash-api` (video generation/editing with Gemini Omni Flash via Interactions API, helper scripts `upload_file.py`, `generate_video.py`, `prep_video.py`, `inspect_video.py`).
- Machine-readable docs: `https://ai.google.dev/gemini-api/docs/llms.txt` lists all pages; append `.md.txt` to any documentation URL to get Markdown.
- Antigravity plugin install: Settings > Customizations > Build with Google Plugins > Gemini API, or `agy plugin install https://github.com/google-gemini/gemini-skills`.
- Troubleshooting: restart the editor or terminal session after installing; if a global skill is ignored, install it in the project root without `--global`; `AGENTS.md`, `.cursorrules`, or `CLAUDE.md` must be in the project root.
- Docs fetched 2026-10-16.
- Distinct from this repository: the `gemini-api-dev` skill and the Gemini Docs MCP are Gemini-side distributions for coding agents. They are not this repository's skills and not Claude Code Agent Skills (see anthropic-claude-code-extend skill). The `claude mcp add` command is Claude Code's MCP client (see anthropic-claude-code-extend).

## Related

- [get-started](./get-started.md)
- [libraries](./libraries.md)
- [interactions-overview](./interactions-overview.md)
