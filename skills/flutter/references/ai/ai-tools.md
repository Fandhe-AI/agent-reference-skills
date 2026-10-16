---
source: https://docs.flutter.dev/ai/tools
---

# How Flutter AI tools work

Flutter and Dart provide an integrated suite of tools that help AI coding assistants understand a codebase, follow best practices, and execute development tasks.

## Signature / Usage

The ecosystem has six components:

1. Agent skills: task-oriented blueprints for specific workflows.
2. Dart and Flutter MCP server: real-time SDK diagnostics, symbol resolution, and runtime introspection.
3. Developer Knowledge MCP server: cloud-hosted documentation search over official Flutter and Dart docs.
4. Package skills: skills published directly inside third-party `pub.dev` packages.
5. Specialized agents: dedicated agent personas with focused tools and system instructions.
6. Agent rules: persistent rules added to the context window every time a new session starts.

Discover and install package skills with the `skills` CLI:

```bash
dart run skills@ get
```

Invoke the accessibility agent in Antigravity:

```text
@flutter_a11y_agent Audit this screen for accessibility issues.
```

## Options / Props

| Mechanism | Scope and behavior | Best suited for |
| --- | --- | --- |
| Agent skill | On demand | Multi-step recipes, patterns |
| Dart MCP server | Local SDK tools | Diagnostics, tests, runtime |
| Developer Knowledge MCP | Online search | Live docs, API references |
| Package skill | From dependencies | Library APIs, code generation |
| Specialized agent | Isolated subagent | Accessibility audits |
| Agent rule | Persistent context | Project conventions, constraints |

## Notes

- Agent skills follow https://agentskills.io/. Skills use progressive disclosure: in the discovery phase the assistant reads only skill metadata (name and short description) from the `.agents/skills` directory; in the execution phase it loads the complete instructions (`SKILL.md`) and supporting reference scripts.
- Official skills repositories: `flutter/agent-plugins` (widget construction, declarative navigation, responsive design, state management) and `dart-lang/skills` (unit test authoring, dependency resolution, static analysis remediation).
- The Dart and Flutter MCP server (https://github.com/dart-lang/ai/tree/main/pkgs/dart_mcp_server) implements MCP over standard I/O (stdio). Capabilities listed: static analysis and diagnostics, symbol resolution, runtime introspection of a running Flutter app during debugging sessions, package management (search pub.dev, manage `pubspec.yaml`), and testing and formatting (unit and widget tests, `dart format`).
- The Developer Knowledge MCP server (https://developers.google.com/knowledge/mcp) covers docs.flutter.dev, dart.dev, and official API references.
- Specialized agents (called custom agents in platforms like Antigravity) run in isolated contexts. The Flutter Accessibility (`a11y`) agent audits widget trees: semantic label inspection (for example `IconButton` or `InkWell` without labels), touch target validation (hit test areas smaller than 48x48 logical pixels), contrast and focus-indicator checks, and automated code fixes (for example wrapping widgets in `Semantics`). It is currently available in Google Antigravity, selectable from the agent picker, by mentioning `@flutter_a11y_agent`, or by asking for an accessibility review.
- Official rules live in the `rules` directory of the flutter/agent-plugins repository.
- Distinction: these Flutter and Dart agent plugins, skills, and MCP servers are specific to Flutter development. They are not Claude Code Agent Skills or MCP as documented by the anthropic-claude-code-extend skill, nor the anthropic-api-tools-mcp, openai-agents, openai-apps-sdk, or hermes-agent skills.

## Related

- [Get started developing with AI](./get-started.md)
