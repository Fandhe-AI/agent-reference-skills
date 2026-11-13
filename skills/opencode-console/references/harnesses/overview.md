---
source: https://opencode.ai/docs/console/harnesses/
---

# Harnesses

Console works with coding agents other than OpenCode. Point a harness at the Console gateway with an API key to use any paid or Go model, and usage is billed to your workspace like any other request.

## Signature / Usage

```text
https://opencode.ai/inference/go/openai/v1/chat/completions
```

| Harness | Pay-as-you-go | Go | MCP |
| --- | --- | --- | --- |
| [Claude Code](./claude-code.md) | Yes | Yes | Yes |
| [Codex](./codex.md) | Yes | Yes | Yes |
| [Hermes](./hermes.md) | Built in | Built in | Yes |
| [Pi](./pi.md) | Built in | Built in | Yes |
| [Raycast](./raycast.md) | Extension | Extension | Yes |

Free-tier chat models are only available from within OpenCode. Other harnesses receive HTTP `403` for those models, even with a Console API key. Use paid models or a Go subscription.

### Get an API key

Harnesses authenticate with a Console API key. The quickest option is a [personal API key](../api/overview.md), which calls models as you.

1. Open **Account** from the account menu in the [Console](https://opencode.ai/console).
2. Under **Personal API keys**, click **Add API key**.
3. Choose the workspace, name the key, and click **Create**.
4. Copy the key. It is shown only once.

```text
oc_sk_1a2b3c4d5e6f_...
```

Usage counts toward your [member budget](https://opencode.ai/docs/console/budgets/#member-budgets). Use a key from a workspace with credits for pay-as-you-go, or from a workspace subscribed to [Go](https://opencode.ai/docs/console/go/) for Go.

For shared machines or CI, owners and admins can create a [service account](../api/overview.md) key instead, so usage isn't tied to one person.

### Base URLs

Pay-as-you-go and Go are served from different base URLs. Use the one that matches your plan.

| Plan | Base URL |
| --- | --- |
| Pay-as-you-go | `https://opencode.ai/inference` |
| Go | `https://opencode.ai/inference/go` |

Append the path for the API your harness speaks. Every API serves every paid and Go text model: Console sends a request to the model's own endpoint when it speaks that API, and translates it otherwise.

| API | Path |
| --- | --- |
| OpenAI Responses | `/openai/v1/responses` |
| OpenAI Chat Completions | `/openai/v1/chat/completions` |
| Anthropic Messages | `/anthropic/v1/messages` |
| Gemini | `/google/v1beta/models/<model>:generateContent` |

### Sessions

Send a stable session ID with every request so Console can route a conversation consistently and reuse its prompt cache. Go [requires it](https://opencode.ai/docs/console/go/#where-can-i-use-it).

```text
x-opencode-session: ses_...
```

Console also recognizes the native session headers sent by Claude Code, Codex, Hermes, and Pi, so they need no extra configuration.

### Console MCP

Harnesses with MCP support can manage your workspace through the Console MCP server. It uses OAuth with dynamic client registration, so you sign in from the browser instead of pasting a key.

```text
https://opencode.ai/console/mcp
```

Each harness page shows how to add it. OpenCode adds the server automatically as `opencode_console` when your workspace enables it, and asks you to sign in from the browser the first time it uses it.

## Notes

- Distinct from the OpenCode server HTTP API covered by opencode-build.
- The harness applications themselves are covered by anthropic-claude-code (Claude Code), openai-codex (Codex) and hermes-agent (Hermes); this page covers only pointing them at the Console gateway.
- The Console MCP server is a workspace-management endpoint; the protocol spec is mcp-spec, and Claude Code / Codex MCP configuration is covered by their own skills.

## Related

- [Claude Code](./claude-code.md)
- [Codex](./codex.md)
- [Hermes](./hermes.md)
- [Pi](./pi.md)
- [Raycast](./raycast.md)
- [API Overview](../api/overview.md)
