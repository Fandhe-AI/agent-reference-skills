---
source: https://ai-sdk.dev/docs/ai-sdk-harnesses/harness-adapters
---

# Harness Adapters

Harness adapters connect `HarnessAgent` to a specific agent runtime. They are the harness equivalent of AI SDK model providers: each wraps one runtime and normalizes sessions, stream events, tools, usage, lifecycle state, and configuration into the harness contract.

## Signature / Usage

```ts
import { HarnessAgent } from '@ai-sdk/harness/agent';
import { claudeCode } from '@ai-sdk/harness-claude-code';

const agent = new HarnessAgent({ harness: claudeCode });
```

Adapters included in the AI SDK:

| Adapter | Package |
| --- | --- |
| Claude Code | `@ai-sdk/harness-claude-code` |
| Cline | `@ai-sdk/harness-cline` |
| Codex | `@ai-sdk/harness-codex` |
| Cursor | `@ai-sdk/harness-cursor` |
| Deep Agents | `@ai-sdk/harness-deepagents` |
| fx | `@ai-sdk/harness-fx` |
| GitHub Copilot | `@ai-sdk/harness-github-copilot` |
| Grok Build | `@ai-sdk/harness-grok-build` |
| OpenCode | `@ai-sdk/harness-opencode` |
| Pi | `@ai-sdk/harness-pi` |

Coming soon: Amp (`@ai-sdk/harness-amp`), Goose (`@ai-sdk/harness-goose`), Mastra (`@ai-sdk/harness-mastra`).

## Options / Props

Adapter capabilities:

| Adapter | Runtime location | Custom tools | Custom skills | Structured output | Built-in tool approval | Built-in tool filtering | History access |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Claude Code | Sandbox bridge | Yes | Yes | Yes | Yes | Yes | No |
| Cline | Host process | Yes | Yes | Yes | Yes | Yes | No |
| Codex | Sandbox bridge | Yes | Yes | Yes | No | No | No |
| Cursor | Sandbox via ACP | Yes | Yes | No | No | No | No |
| Deep Agents | Sandbox bridge | Yes | Yes | Yes | Yes | Yes (via auto-rejection) | No |
| fx | Sandbox via ACP | Yes | Yes | No | Yes | No | No |
| GitHub Copilot | Sandbox via ACP | Yes | Yes | No | No | No | No |
| Grok Build | Sandbox via ACP | Yes | Yes | Yes | No | No | No |
| OpenCode | Sandbox bridge | Yes | Yes | Yes | Yes | Yes | No |
| Pi | Host process | Yes | Yes | No | Yes | Yes | No |

## Notes

- Stability: harness packages are experimental.
- The capability table above renders check / cross marks from the official page as Yes / No.
- The Codex row's "Built-in tool filtering: No" follows the official table; the Codex adapter page itself describes activeTools / inactiveTools filtering for bash, webSearch, apply_patch and view_image (see [codex-harness.md](./codex-harness.md)).
- Only Claude Code and Codex have dedicated pages in this skill (`claude-code-harness.md`, `codex-harness.md`); other adapter pages on ai-sdk.dev are not captured here.
- Distance: adapters drive Claude Code / Codex / similar runtimes through the AI SDK; for those products' own docs see anthropic-claude-code*, anthropic-agent-sdk and openai-codex.

## Related

- [HarnessAgent](./harness-agent.md)
- [Harness providers](./harness-providers.md)
- [Claude Code harness](./claude-code-harness.md)
- [Codex harness](./codex-harness.md)
