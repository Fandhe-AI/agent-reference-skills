<!-- source: https://code.claude.com/docs/en/channels-reference.md / last verified: 2026-08-07 -->

# Channels reference

Build an MCP server that pushes webhooks, alerts, and chat messages into a Claude Code session. Covers the channel contract: capability declaration, notification format, reply tools, sender gating, and permission relay. To use an existing channel instead, see `channels.md`.

## Signature / Usage

```ts
import { Server } from '@modelcontextprotocol/sdk/server/index.js'
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js'

const mcp = new Server(
  { name: 'webhook', version: '0.0.1' },
  {
    // 'claude/channel' is what makes it a channel — Claude Code registers a listener
    capabilities: { experimental: { 'claude/channel': {} } },
    instructions: 'Events arrive as <channel source="webhook" ...>. One-way: read and act.',
  },
)
await mcp.connect(new StdioServerTransport())

// push an event
await mcp.notification({
  method: 'notifications/claude/channel',
  params: { content: 'build failed on main', meta: { severity: 'high' } },
})
```

```bash
# test a custom channel during the research preview (not on the approved allowlist)
claude --dangerously-load-development-channels server:webhook
claude --dangerously-load-development-channels plugin:yourplugin@yourmarketplace
```

## Options / Props

| Field | Type | Description |
| --- | --- | --- |
| `capabilities.experimental['claude/channel']` | `object` | Required, always `{}`. Presence registers the notification listener. |
| `capabilities.experimental['claude/channel/permission']` | `object` | Optional, always `{}`. Opts in to receiving permission-relay requests. |
| `capabilities.tools` | `object` | Two-way only, always `{}`. Standard MCP tool capability for a reply tool. |
| `instructions` | `string` | Recommended. Added to Claude's system prompt: what events to expect, `<channel>` tag attributes, whether/how to reply. |
| `notifications/claude/channel` params.`content` | `string` | Event body, delivered as the body of the `<channel>` tag. |
| `notifications/claude/channel` params.`meta` | `Record<string,string>` | Optional; each entry becomes a `<channel>` tag attribute. Keys must be letters/digits/underscores only (hyphenated keys silently dropped). |
| `notifications/claude/channel/permission_request` params | `request_id`, `tool_name`, `description`, `input_preview` | Outbound from Claude Code when a permission dialog opens; server formats these into an outgoing prompt. |
| `notifications/claude/channel/permission` params | `request_id`, `behavior` (`'allow'\|'deny'`) | Inbound verdict from the server; applied only if `request_id` matches an open request. |

## Notes

- Transport is standard MCP stdio; Claude Code spawns the channel server as a subprocess. Only `@modelcontextprotocol/sdk` + a Node-compatible runtime (Bun, Node, or Deno) is required.
- `mcp.notification()` resolves when the message is written to the transport, not when Claude has processed it — Claude Code does not acknowledge notifications, and drops events silently if the server isn't loaded as a channel or org policy blocks it. For delivery confirmation, expose a reply tool the server can use to report status.
- Events queue into the session and are delivered together on Claude's next turn if several arrive while busy; run separate sessions to process independent event streams concurrently.
- Gate inbound messages on sender identity (e.g. `message.from.id`), not room/chat identity — gating on the room lets anyone in an allowlisted group inject messages.
- Permission relay: `request_id` is five lowercase letters excluding `l` (never misread as `1`/`I`). Only declare the permission capability if the channel authenticates the sender, since anyone who can reply can approve/deny tool use. Relay covers tool-use approvals (`Bash`, `Write`, `Edit`, etc.); project-trust and MCP-server-consent dialogs never relay. The local terminal dialog stays open in parallel — whichever answer (local or remote) arrives first is applied.
- During the research preview, custom channels must use `--dangerously-load-development-channels` (bypasses only the allowlist, not the `channelsEnabled` org policy) since they aren't on the Anthropic-curated default allowlist.
- Package as a plugin (`/plugin install`) and publish to a marketplace to make a custom channel installable and shareable; still needs the development flag unless added to an org's `allowedChannelPlugins` or an official-marketplace listing.
- This is a Claude Code CLI research-preview extension of the standard MCP server contract described in `mcp.md`; the `claude/channel*` capabilities and `notifications/claude/channel*` methods are Claude Code-specific, not part of core MCP.
- Channels are a Claude Code CLI-only extension of MCP. This is distinct from the Claude API's MCP connector / MCP tunnels, covered in the anthropic-api-tools-mcp skill, and from the Agent SDK's own MCP server configuration, covered in the anthropic-agent-sdk skill.

## Related

- [Push events into a running session with channels](./channels.md)
- [Connect Claude Code to tools via MCP](../mcp/mcp.md)
- [Package a plugin](../plugins/plugins.md)
