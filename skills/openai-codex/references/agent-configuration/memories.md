# Memories

Memories let ChatGPT and Codex carry useful context from earlier work into future work. ChatGPT web uses ChatGPT memory, while local Codex clients use a separate local memory store and controls.

## Signature / Usage

```toml
# config.toml (local memories are off by default)
[features]
memories = true
```

Chat-level control: run `/memories` in the ChatGPT desktop app or Codex CLI (TUI) to choose whether the current chat can use existing memories and whether it can contribute to future memories. Chat-level choices don't change global memory settings.

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `memories.generate_memories` | config.toml | Controls whether newly created chats can be stored as memory-generation inputs. |
| `memories.use_memories` | config.toml | Controls whether Codex injects existing memories into future sessions. |
| `memories.disable_on_external_context` | boolean | When `true`, keeps chats that used external context (MCP tool calls, web search, tool search) out of memory generation. The older `memories.no_memories_if_mcp_or_web_search` key is still accepted as an alias. |
| `memories.min_rate_limit_remaining_percent` | config.toml | Minimum remaining Codex rate-limit percentage required before memory generation starts. |
| `memories.extract_model` | string | Overrides the model used for per-chat memory extraction. |
| `memories.consolidation_model` | string | Overrides the model used for global memory consolidation. |

Desktop app settings (**Settings > Personalization**): **Enable Codex memories** (on/off for the selected machine), **Allow memories from tool-assisted chats** (whether chats using MCP tools or web search can contribute), **Delete Codex memories** (resets the selected machine's memory store; on the local machine this also clears Computer History when available).

## Notes

- Keep required team guidance in `AGENTS.md` or checked-in documentation. Treat memories as a helpful recall layer, not the only source for rules that must always apply.
- Codex skips active or short-lived sessions, redacts secrets from generated memory fields, and updates memories in the background after a chat has been idle long enough; memories may not update right away. Generation can also skip a background pass when the rate-limit remaining percentage is below the configured threshold.
- Storage: under the Codex home directory (default `~/.codex`; see `CODEX_HOME`). Main files live under `~/.codex/memories/` and include summaries, durable entries, recent inputs, and supporting evidence. Treat them as generated state; inspect when troubleshooting or before sharing your Codex home directory, but don't rely on hand-editing.
- Don't store secrets in memories; review memory files before sharing generated artifacts.
- The IDE extension uses the connected Codex host's local memory store, with the same chat-level controls as Codex CLI.
- ChatGPT Work uses ChatGPT memory (managed in **Settings > Personalization**), not a local Codex memory store or local controls.
- Computer History is a macOS desktop feature that turns activity across allowed apps and websites into memories and a timeline ChatGPT and Codex can reference.
- Source: https://learn.chatgpt.com/docs/customization/memories (retrieved 2026-10).

## Related

- [AGENTS.md](./agents-md.md)
- [Import from another agent](./import.md)
