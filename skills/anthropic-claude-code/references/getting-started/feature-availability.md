<!-- source: https://code.claude.com/docs/en/feature-availability.md / last verified: 2026-10-16 -->

# Feature availability

Compares which Claude Code features are available across Anthropic subscription plans, Anthropic Console, Amazon Bedrock, Claude Platform on AWS, Google Cloud's Agent Platform, and Microsoft Foundry.

## Signature / Usage

Environment variable that changes provider-dependent behavior (see Notes):

```bash
export ANTHROPIC_BASE_URL=<gateway-or-provider-host>
```

## Options / Props

| Requires a Claude subscription (not available via Console API key or 3rd-party provider) |
|---|
| Claude Code on the web, mobile, Slack, Desktop, Routines (`/schedule`), Ultrareview, Code Review (Team/Enterprise), Remote Control, Chrome extension, Computer use (Pro/Max), Artifacts, Voice dictation |

| CLI capability | Claude subscription | Console | Bedrock | Claude Platform on AWS | Google Cloud's Agent Platform | Microsoft Foundry |
|---|---|---|---|---|---|---|
| Web search | v | v | x | v | see note (fn1) | v |
| Fast mode | v (Owner-enabled on Team and Enterprise) | v (provisioned organizations) | x | x | x | x |
| Auto mode | v | v | see note (fn2) | v | see note (fn2) | see note (fn2) |
| Advisor | v | v | x | x | x | x |
| Cross-session messaging | v (fn5) | v, same machine (fn5) | v, same machine (fn5) | v, same machine (fn5) | v, same machine (fn5) | v, same machine (fn5) |
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
- fn1: on Google Cloud's Agent Platform, web search is available for Opus 4, Sonnet 4, Haiku 4.5, and later models.
- fn2: on Amazon Bedrock, Google Cloud's Agent Platform, and Microsoft Foundry, auto mode supports only Claude Sonnet 5 or later, Opus 4.7 or later, Haiku 5.5, and the Fable models.
- fn5 (cross-session messaging): requires Claude Code v2.1.224 or later on macOS and Linux (including Linux inside WSL 2); on native Windows, v2.1.234 or later. With API key authentication, messaging is same-machine only. On Amazon Bedrock, Claude Platform on AWS, Google Cloud's Agent Platform, and Microsoft Foundry, messaging is same-machine only and requires v2.1.248 or later. Claude can find your cloud sessions and your sessions on other machines only from a session connected to Remote Control (claude.ai sign-in and the other Remote Control requirements).
- Provider-specific differences among features that work everywhere: claude.ai connectors load only when your claude.ai subscription is the active authentication method; MCP tool search is off by default when `ANTHROPIC_BASE_URL` points to a non-first-party host; when the main conversation runs Fable, the built-in Explore subagent runs on Opus with a Claude subscription, an Anthropic Console account, or an LLM gateway reached through `ANTHROPIC_BASE_URL`, and on Fable on other providers (including Claude Platform on AWS); `/design-sync` and `/import` (with `claude import`) are unavailable on Bedrock, Agent Platform, Foundry, Claude Platform on AWS, and through a Claude apps gateway; `/voice` requires a claude.ai account.
- If authenticating through an LLM gateway, feature availability matches the underlying provider the gateway forwards to; Anthropic-only features like Advisor work only if the gateway forwards requests intact to the Anthropic API.

## Related

- [Overview](./overview.md)
- [Advanced setup](./setup.md)
