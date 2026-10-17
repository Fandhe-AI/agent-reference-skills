---
source: https://ai.google.dev/gemini-api/docs/coding-agents
---

# Coding Agent Setup

Commands to connect an AI coding agent to the Gemini Docs MCP server and to install Gemini's own `gemini-api-dev` family of agent skills.

## Install Gemini agent skills

```sh
# List all available skills in the repository
npx skills add google-gemini/gemini-skills --list

# Install a specific skill globally with skills.sh
npx skills add google-gemini/gemini-skills --skill <skill-name> --global

# Or install with Context7
npx ctx7 skills install /google-gemini/gemini-skills <skill-name>
```

Available skill names on the official page: `gemini-api-dev`, `gemini-live-api-dev`, `gemini-omni-flash-api`.

```sh
npx skills add google-gemini/gemini-skills --skill gemini-api-dev --global
```

If a globally installed skill is ignored, install it in the project root without `--global`:

```sh
npx skills add google-gemini/gemini-skills --skill gemini-api-dev
```

## Connect the Gemini Docs MCP server (quick setup)

```sh
npx add-mcp "https://gemini-api-docs-mcp.dev"
```

Configures detected coding agents automatically.

## Claude Code

```sh
claude mcp add --transport http geminiDocs https://gemini-api-docs-mcp.dev
```

Verify with `/mcp` inside Claude Code.

## OpenAI Codex

```sh
codex mcp add geminiDocs --url https://gemini-api-docs-mcp.dev
```

Verify with `codex mcp list`.

## Antigravity plugin

```sh
agy plugin install https://github.com/google-gemini/gemini-skills
```

Bundles the Docs MCP server, the official Gemini skills, and API key tools.

## Notes

- These skills (`gemini-api-dev`, `gemini-live-api-dev`, `gemini-omni-flash-api`) and the Gemini Docs MCP server are Gemini-side distribution artifacts. They are not this repository's skills and not Claude Code Agent Skills (see anthropic-claude-code-extend for those). The `npx skills add` shown installs from `google-gemini/gemini-skills`, not from this repository.
- Cursor and VS Code (Copilot) are configured by editing JSON files (`.cursor/mcp.json`, `.vscode/mcp.json`) rather than by a command; see `references/getting-started/coding-agents.md`.
- `npx <pkg>` downloads and runs the latest published package without a version pin; review the package and pin a version (`npx <pkg>@<version>`) before running it outside a disposable environment.
- `--global` installs and `claude mcp add` / `codex mcp add` / `agy plugin install` modify your user-level agent configuration. Prefer a disposable or test environment first; restart the editor or terminal session afterward because agents load MCP servers and skills only at start.
