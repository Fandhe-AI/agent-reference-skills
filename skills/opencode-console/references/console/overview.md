---
source: https://opencode.ai/docs/console/
---

# Intro

The OpenCode Console is an optional service that provides additional benefits to using OpenCode, on your own or as a team.

## Signature / Usage

You don't need a team to use the Console. Every account starts with a **Personal** workspace where you are the only member.

1. Sign in to the [Console](https://opencode.ai/console).
2. Subscribe to [Go](./go-overview.md), add [credits](../workspace/billing.md), or connect a [provider](./providers.md).
3. Run `/connect` in OpenCode and choose the workspace.
4. Optionally, [invite](../workspace/members.md) your team.

```text
/connect
```

What the Console provides:

- [Workspaces](../workspace/workspaces.md) for sharing access with your [team](../workspace/members.md)
- [Inference](./models-overview.md) for both proprietary and open source models
- [Providers](./providers.md) for connecting your own provider accounts through the Console gateway
- Usage tracking and [budget](../workspace/budgets.md) controls
- Deploy team-wide policies to control OpenCode behavior
- [Web search](./websearch.md)
- [Harnesses](../harnesses/overview.md) for using Console models from Claude Code, Codex, and other agents
- [OpenCode Go, Go Plus, and Go Teams](./go-overview.md), $10, $40, and $20/member monthly subscriptions for open source model access

### Policies

Providers and Tools rules from the Policies page apply to every OpenCode client connected to the workspace. They are delivered as [policy](https://opencode.ai/docs/policies/#console) statements that outrank the member's user and project configuration and take effect within about a minute. Managed preferences and the system configuration file still outrank the workspace; see [precedence](https://opencode.ai/docs/policies/#precedence).

## Notes

- Harness clients named here (Claude Code, Codex) are covered by the anthropic-claude-code and openai-codex skills; this skill only covers connecting them to Console.
- OpenCode policies and permissions are distinct from Claude Code settings (anthropic-claude-code / anthropic-claude-code-admin).
- OpenCode Go is a Console subscription name, not the Go programming language (see go-echo for the Go web framework).

## Related

- [Models](./models-overview.md)
- [Providers](./providers.md)
- [OpenCode Go](./go-overview.md)
- [Workspaces](../workspace/workspaces.md)
