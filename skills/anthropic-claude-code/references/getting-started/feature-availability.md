<!-- source: https://code.claude.com/docs/en/feature-availability.md / last verified: 2026-08-07 -->

# Feature availability

Compares which Claude Code features are available across Anthropic subscription plans, Anthropic Console, Amazon Bedrock, Claude Platform on AWS, Google Cloud's Agent Platform, and Microsoft Foundry.

## Options / Props

| Requires a Claude subscription (not available via Console API key or 3rd-party provider) |
|---|
| Claude Code on the web, mobile, Slack, Desktop, Routines (`/schedule`), Ultrareview, Code Review (Team/Enterprise), Remote Control, Chrome extension, Computer use (Pro/Max), Artifacts, Voice dictation |

| CLI capability | Claude subscription | Console | Bedrock | Claude Platform on AWS | Google Cloud's Agent Platform | Microsoft Foundry |
|---|---|---|---|---|---|---|
| Web search | v | v | x | v | see note | v (Anthropic-hosted) |
| Fast mode | v | v | x | x | x | x |
| Auto mode | v | v | see note | v | see note | see note |
| Advisor | v | v | x | x | x | x |
| Channels | v | v | x | x | x | x |
| GitHub Actions | v | v | v | x | v | v |
| GitLab CI/CD | v | v | v | v | v | x |

| Plan feature | Pro | Max | Team | Enterprise |
|---|---|---|---|---|
| Claude Code on the web | v | v | v | v (premium/Chat+Code seat) |
| Routines | v | v | v | v |
| Computer use | v | v | x | x |
| Code Review | x | x | v | v |
| Analytics dashboard | x | x | v | v |
| Server-managed settings | x | x | v | v |
| SSO | x | x | v | v |
| Zero Data Retention | x | x | x | v (separate enablement) |

## Notes

- Features that work on every provider: CLI, Agent SDK, VS Code/JetBrains extensions, subagents, hooks, commands, skills, CLAUDE.md memory, plugins, MCP servers, checkpoints, sandboxing, Workflows, OpenTelemetry metrics, managed settings file.
- If authenticating through an LLM gateway, feature availability matches the underlying provider the gateway forwards to; Anthropic-only features like Advisor work only if the gateway forwards requests intact to the Anthropic API.

## Related

- [Overview](./overview.md)
- [Advanced setup](./setup.md)
