<!-- source: https://code.claude.com/docs/en/agent-sdk/overview.md (+ https://code.claude.com/docs/en/headless.md for the CLI subprocess snippet) / last verified: 2026-11-14 -->

# Agent SDK overview

The Agent SDK gives you the same tools, agent loop, and context management that power Claude Code, programmable in Python and TypeScript. An agent plans its own steps and calls tools that read files, run commands, or edit code.

## Signature / Usage

The SDK is available as a library for Python and TypeScript only. To drive the same agent loop from another language, run the Claude Code CLI as a subprocess with `-p` and `--output-format json`:

```bash
claude -p "Summarize this project" --output-format json
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| Built-in tools | capability | Read, write, edit files, run commands, and search the web |
| Hooks | capability | Run custom code at key points in the agent lifecycle |
| Subagents | capability | Spawn specialized agents for focused subtasks |
| MCP | capability | Connect external tools and data sources via the Model Context Protocol |
| Permissions | capability | Control which tools run automatically, which need approval |
| Sessions | capability | Maintain context across exchanges, resume or fork later |
| Skills, commands, memory | capability | Load automatically from `.claude/` and `~/.claude/`, same as Claude Code |
| Plugins | capability | Package skills, agents, hooks, and MCP servers, load by local path |

## Notes

- The overview page itself carries no code examples; the command above is lifted verbatim from `/docs/en/headless.md`, which the overview page links to for this exact CLI-subprocess use case.
- Choose Agent SDK when building an agent without implementing the tool loop yourself. Use the Claude Code CLI for interactive/one-off terminal work, the Client SDK for direct Anthropic API access with your own tool loop, or Managed Agents for a hosted REST API where Anthropic runs the sandbox.
- Managed Agents can run sessions in an Anthropic-managed cloud sandbox or a self-hosted sandbox on your own infrastructure, usable from the SDK for your language, the `ant` CLI, or the REST API. The Client SDK lets you write the tool loop yourself or use its beta tool runner.
- Changelogs: https://github.com/anthropics/claude-agent-sdk-typescript/blob/main/CHANGELOG.md and https://github.com/anthropics/claude-agent-sdk-python/blob/main/CHANGELOG.md; bugs go to the issues pages of the same repositories.
- Source: https://code.claude.com/docs/en/agent-sdk/overview.md (fetched 2026-11-14)
- Unless previously approved, Anthropic does not allow third-party developers to offer claude.ai login or rate limits for products built on the Agent SDK; use API key authentication.
- Branding: allowed forms include "Claude Agent", "Claude" within an "Agents" menu, or "{YourAgentName} Powered by Claude". "Claude Code" or "Claude Code Agent" naming and Claude Code-mimicking visuals are not permitted.
- Use governed by Anthropic's Commercial Terms of Service.

## Related

- [Quickstart](./quickstart.md)
- [Agent loop](./agent-loop.md)
