# Sessions

| Name | Description | Path |
|------|-------------|------|
| Channels | MCP servers push events (webhooks, chat messages, alerts) into a running session; two-way channels enable chat bridges | [channels.md](./channels.md) |
| Channels reference | MCP server contract for custom channels: `claude/channel` capability and notifications over stdio | [channels-reference.md](./channels-reference.md) |
| Checkpointing | Claude Code captures code state before each user prompt; `/rewind` reverts code and conversation | [checkpointing.md](./checkpointing.md) |
| Deep links | `claude-cli://` URLs open a terminal with a working directory and a prefilled prompt | [deep-links.md](./deep-links.md) |
| Remote Control | Connect claude.ai/code or the mobile app to a local session and drive it remotely | [remote-control.md](./remote-control.md) |
| Manage sessions | Saved conversations tied to a project directory, stored locally as JSONL; resume, branch, and switch | [sessions.md](./sessions.md) |
| Worktrees | git worktrees as separate working directories; run each session in its own worktree to avoid edit conflicts | [worktrees.md](./worktrees.md) |
