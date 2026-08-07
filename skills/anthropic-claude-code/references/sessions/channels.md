<!-- source: https://code.claude.com/docs/en/channels / last verified: 2026-08-07 -->
# Channels

A channel is an MCP server that pushes events (webhooks, chat messages, alerts) into a running Claude Code session so Claude can react while you're away. Channels can be two-way — Claude reads an event and replies through the same channel, like a chat bridge. Research preview; requires Anthropic authentication via claude.ai or a Console API key, not available on Bedrock/Google Cloud's Agent Platform/Microsoft Foundry, and Team/Enterprise orgs must explicitly enable it.

## Signature / Usage

```bash
/plugin install telegram@claude-plugins-official
/telegram:configure <token>
claude --channels plugin:telegram@claude-plugins-official

# Bare .mcp.json server, or multiple plugins space-separated:
claude --channels plugin:fakechat@claude-plugins-official plugin:discord@claude-plugins-official
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `--channels <entry...>` | flag | Space-separated list of `plugin:<name>@<marketplace>` entries to enable for this session |
| `channelsEnabled` | managed setting | Master switch; must be `true` for any channel to deliver messages |
| `allowedChannelPlugins` | managed setting | Replaces the Anthropic-maintained allowlist with an org-specific one |

## Notes

- Supported out of the box: Telegram, Discord, iMessage (chat bridges), and fakechat (a localhost demo with no auth). Each requires [Bun](https://bun.sh).
- Every approved channel maintains a sender allowlist; unlisted senders are silently dropped. Telegram/Discord bootstrap via a pairing code; iMessage lets your own address through automatically and others by handle.
- A channel with the [permission relay capability](./channels-reference.md#relay-permission-prompts) can forward tool-approval prompts to a remote device so you can approve/deny while away from the terminal.
- During the research preview, only plugins on the Anthropic-curated (or org's `allowedChannelPlugins`) allowlist can register via `--channels`; use `--dangerously-load-development-channels` to test a channel you're building.
- Comparison: Claude Code on the web runs in cloud sandboxes; Claude in Slack spawns a web session from an `@Claude` mention; a standard MCP server is pulled on demand, nothing is pushed; Remote Control lets *you* drive a local session, channels push *external* events into it.

## Related

- [Channels reference](./channels-reference.md): build your own channel (MCP server contract, reply tools, permission relay)
- [Remote Control](./remote-control.md): drive a running session from another device
