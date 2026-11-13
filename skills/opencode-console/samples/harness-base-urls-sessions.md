---
source: https://opencode.ai/docs/console/harnesses/
---

# Harness Base URLs and Sessions

Choose the Console base URL for your plan, append the API path your harness speaks, and send a stable session header.

```text
https://opencode.ai/inference/go/openai/v1/chat/completions
```

| Plan          | Base URL                           |
| ------------- | ---------------------------------- |
| Pay-as-you-go | `https://opencode.ai/inference`    |
| Go            | `https://opencode.ai/inference/go` |

| API                     | Path                                            |
| ----------------------- | ----------------------------------------------- |
| OpenAI Responses        | `/openai/v1/responses`                          |
| OpenAI Chat Completions | `/openai/v1/chat/completions`                   |
| Anthropic Messages      | `/anthropic/v1/messages`                        |
| Gemini                  | `/google/v1beta/models/<model>:generateContent` |

```text
x-opencode-session: ses_...
```

## Notes

- Every API serves every paid and Go text model; Console translates when the model's own endpoint speaks another API.
- Go requires a session ID. Console recognizes the native session headers of Claude Code, Codex, Hermes, and Pi.
- Free-tier chat models are only available from within OpenCode; other harnesses get HTTP `403` even with an API key.
- The Console MCP server URL is `https://opencode.ai/console/mcp` (OAuth with dynamic client registration). MCP protocol itself is covered by the mcp-spec skill.
