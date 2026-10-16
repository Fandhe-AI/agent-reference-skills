---
source: https://docs.flutter.dev/ai/get-started
---

# Get started developing with AI

Set up and use AI agent plugins for Flutter and Dart with your preferred coding assistant. An agent plugin bundles the tools and knowledge an AI assistant needs to understand and modify a Flutter codebase.

## Signature / Usage

An official Flutter agent plugin connects the assistant to four core capabilities:

- Agent skills: on-demand procedural guides from the official Flutter and Dart repositories (for example creating responsive layouts, managing state, writing widget tests).
- Agent rules: persistent instructions that guide the assistant's responses (for example proactively triggering stateful hot reload when editing Flutter widgets).
- Dart and Flutter MCP server: a Model Context Protocol (MCP) server that connects the assistant to the Dart SDK (analyzer diagnostics, symbol resolution, test runners, runtime inspection).
- Specialized agents: focused assistant personas for dedicated workflows, such as the Flutter Accessibility (`a11y`) agent.

Configure the Dart and Flutter MCP server (standard JSON form used by most MCP-compatible clients):

```json
{
  "mcpServers": {
    "dart": {
      "command": "dart",
      "args": ["mcp-server"]
    }
  }
}
```

Install official skills into the workspace with the `skills` CLI:

```bash
# Install Flutter skills
npx skills add flutter/agent-plugins --skill '*' --agent universal --yes

# Install Dart skills
npx skills add dart-lang/skills --skill '*' --agent universal --yes
```

## Options / Props

Per-assistant setup (all use the `flutter/agent-plugins` repository; rules come from its `rules` directory):

| Assistant | Plugin / MCP setup | Rules location |
| --- | --- | --- |
| Antigravity IDE and extensions | Settings > Customizations > Build with Google Plugins > Customize > Download next to Dart and Flutter | n/a in source |
| Antigravity CLI (`agy`) | MCP config in `.agents/mcp_config.json` (or globally `~/.gemini/config/mcp_config.json`); skills via `npx skills add` | n/a in source |
| Claude Code | `claude plugin marketplace add flutter/agent-plugins`, then `claude plugin install dart-flutter@dart-flutter` | Add the rules you want to the project's `CLAUDE.md` (plugin rules are not loaded automatically) |
| Cursor | Cursor Marketplace "Dart and Flutter" plugin, Customize > search "Dart and Flutter", or `/add-plugin dart-flutter` in chat | Download `.mdc` files into `.cursor/rules/` |
| Codex | `codex plugin marketplace add flutter/agent-plugins`, then `codex plugin add dart-flutter@dart-flutter` | Download `.md` rule files into `.agent/rules/`, or append to `CODEX.md` |
| GitHub Copilot (VS Code) | `.vscode/mcp.json` with a `servers.dart` entry (`command: dart`, `args: ["mcp-server"]`); skills via `npx skills add` | Add rules to `.github/copilot-instructions.md` |
| Other (Windsurf, Zed, Cline, ...) | Manual MCP config; skills via `npx skills add` into `.agents/skills` | Copy into the assistant's own rules file (for example `.windsurfrules`, `.clinerules`) |

Verification commands from the source:

```bash
claude plugin marketplace list
codex plugin list
```

For Antigravity, open the Agent panel and ask: `Summarize the Dart and Flutter tools and skills available in this project.`

## Notes

- Claude Code plugins discover skills and MCP servers but do not automatically load plugin rules; Codex plugins install skills and MCP servers but do not automatically bundle rules.
- Third-party `pub.dev` packages can ship their own skills (package skills); see https://dart.dev/ai/package-skills.
- Next steps listed in the source: Package skills, Ship skills with packages (https://dart.dev/tools/pub/package-skills), the Developer Knowledge MCP server (https://developers.google.com/knowledge/mcp), and the https://github.com/flutter/agent-plugins repository.
- Distinction: these are Flutter and Dart agent plugins (skills, rules, MCP server, specialized agents) for working on Flutter code. They are not the Claude Code Agent Skills (SKILL.md authoring) documented by the anthropic-claude-code-extend skill, nor MCP concepts of anthropic-api-tools-mcp, openai-agents, openai-apps-sdk or hermes-agent.

## Related

- [How Flutter AI tools work](./ai-tools.md)
