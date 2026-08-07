<!-- source: https://code.claude.com/docs/en/channels.md / last verified: 2026-08-07 -->

# Push events into a running session with channels

Use channels to push messages, alerts, and webhooks into a running Claude Code session from an MCP server. Forward CI results, chat messages, and monitoring events so Claude can react while you're away. Research preview: requires Anthropic authentication (claude.ai or Console API key), not available on Amazon Bedrock, Google Cloud's Agent Platform, or Microsoft Foundry, and Team/Enterprise orgs must explicitly enable it.

## Signature / Usage

```bash
# install a channel plugin, configure credentials, then enable it per session
/plugin install telegram@claude-plugins-official
/telegram:configure <token>
claude --channels plugin:telegram@claude-plugins-official

# several plugins, space-separated
claude --channels plugin:telegram@claude-plugins-official plugin:discord@claude-plugins-official

# fakechat quickstart (no external service, http://localhost:8787)
/plugin install fakechat@claude-plugins-official
claude --channels plugin:fakechat@claude-plugins-official
```

## Options / Props

| Item | Description |
| --- | --- |
| `--channels <entry> [<entry> ...]` | Opts channel servers into the session; entries are `plugin:<name>@<marketplace>`, space-separated for multiple |
| Supported plugins (research preview) | `telegram`, `discord`, `imessage` (macOS only, reads `~/Library/Messages/chat.db`), `fakechat` (local demo) |
| Requires | [Bun](https://bun.sh) runtime for the pre-built plugins |
| `channelsEnabled` | Org managed setting; master switch, must be `true` for any channel to deliver messages |
| `allowedChannelPlugins` | Org managed setting; replaces the Anthropic-maintained plugin allowlist when set |
| Credential storage | Saved to `~/.claude/channels/<plugin>/.env`; or set `TELEGRAM_BOT_TOKEN` / `DISCORD_BOT_TOKEN` in the shell before launching Claude Code |
| Sender allowlist commands | `/telegram:access pair <code>`, `/telegram:access policy allowlist`, `/discord:access pair <code>`, `/discord:access policy allowlist`, `/imessage:access allow <handle>` |

## Notes

- A channel is an MCP server that pushes events into the running session (inverts the normal "Claude queries the server" MCP model). Two-way channels (chat bridges) let Claude reply back through the same tool call.
- Events only arrive while the session is open; run Claude in a background process or persistent terminal for always-on delivery.
- Every approved channel plugin maintains a sender allowlist — only paired/allowlisted senders can push messages, others are silently dropped. Telegram/Discord bootstrap via a pairing code; iMessage self-chat bypasses the gate automatically.
- Being listed in `.mcp.json` is not enough to push messages — the server also has to be named in `--channels` for the session.
- Channel servers that declare the permission-relay capability can forward tool-approval prompts to a remote device (e.g. phone) so you can approve/deny while away from the terminal; see `channels-reference.md`.
- In non-interactive `-p` mode, tools that need terminal input (multiple-choice questions, plan mode approval) are disabled so a channel-driven session never stalls.
- This is a Claude Code CLI research-preview feature, distinct from the standard MCP server model in `mcp.md` (Claude queries on demand; nothing is pushed) and from `Remote Control` (you drive an existing session from claude.ai/mobile) — see "How channels compare" in the official docs for the full comparison table.
- Channels are a Claude Code CLI-only extension of the MCP server contract (`claude/channel` experimental capability). This is distinct from the Claude API's MCP connector / MCP tunnels, covered in the anthropic-api-tools-mcp skill, and from the Agent SDK's own MCP server configuration, covered in the anthropic-agent-sdk skill.

## Related

- [Channels reference (build your own channel)](./channels-reference.md)
- [Connect Claude Code to tools via MCP](../mcp/mcp.md)
- [Discover plugins](../plugins/discover-plugins.md)
