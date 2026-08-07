<!-- source: https://code.claude.com/docs/en/platforms.md / last verified: 2026-08-07 -->

# Platforms and integrations

Choose where to run Claude Code and what to connect it to. Compare the CLI, Desktop, VS Code, JetBrains, web, mobile, and integrations like Chrome, Slack, and CI/CD.

## Signature / Usage

Choose a platform: CLI (`quickstart`), Desktop, VS Code, JetBrains, Web (`claude-code-on-the-web`), Mobile.

Connect tools: Chrome, GitHub Actions, GitLab CI/CD, Code Review, Slack, Claude Tag, or MCP servers/connectors for anything else.

## Options / Props

| Platform | Best for | What you get |
| --- | --- | --- |
| CLI | Terminal workflows, scripting, remote servers | Full feature set, Agent SDK, computer use (macOS Pro/Max), third-party providers |
| Desktop | Visual review, parallel sessions, managed setup | Diff viewer, app preview, computer use, Dispatch |
| VS Code | Working inside VS Code | Inline diffs, integrated terminal, file context |
| JetBrains | IntelliJ, PyCharm, WebStorm, etc. | Diff viewer, selection sharing, terminal session |
| Web | Long-running tasks, offline continuation | Anthropic-managed cloud |
| Mobile | Starting/monitoring tasks away from computer | Cloud sessions, Remote Control, Dispatch to Desktop |

## Notes

- The CLI is the most complete surface for terminal-native work: scripting and the Agent SDK are CLI-only.
- Enterprise Desktop deployments support Google Cloud's Agent Platform and gateway providers; for Amazon Bedrock or Microsoft Foundry, use the CLI, VS Code, or Claude Desktop on 3P.
- Away-from-terminal work options differ by trigger and execution location: Dispatch (mobile app → Desktop), Remote Control (claude.ai/code or mobile → local CLI/VS Code session), Channels (external events → local CLI), Slack (`@Claude` mention → Anthropic cloud), Scheduled tasks (CLI/Desktop/cloud).
- Configuration, project memory, and MCP servers are shared across local surfaces when mixing platforms on the same project.

## Related

- [third-party-integrations](./third-party-integrations.md)
- [admin-setup](./admin-setup.md)
