<!-- source: https://code.claude.com/docs/en/channels-reference / last verified: 2026-08-07 -->
# Channels reference

The MCP server contract for building a custom channel: a subprocess Claude Code spawns over stdio, which declares the `claude/channel` capability, emits `notifications/claude/channel` events, and optionally exposes a reply tool and permission relay. Research preview; requires the [`@modelcontextprotocol/sdk`](https://www.npmjs.com/package/@modelcontextprotocol/sdk) package and a Node-compatible runtime (Bun/Node/Deno).

## Signature / Usage

```ts
import { Server } from '@modelcontextprotocol/sdk/server/index.js'
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js'

const mcp = new Server(
  { name: 'your-channel', version: '0.0.1' },
  {
    capabilities: {
      experimental: { 'claude/channel': {} },              // required: registers the listener
      // 'claude/channel/permission': {},                   // optional: opt in to permission relay
      // tools: {},                                          // two-way only: enables reply-tool discovery
    },
    instructions: 'Messages arrive as <channel source="your-channel" ...>. Reply with the reply tool.',
  },
)
await mcp.connect(new StdioServerTransport())

await mcp.notification({
  method: 'notifications/claude/channel',
  params: { content: 'build failed on main', meta: { severity: 'high', run_id: '1234' } },
})
```

```bash
claude --dangerously-load-development-channels server:webhook   # bare .mcp.json server
claude --dangerously-load-development-channels plugin:yourplugin@yourmarketplace
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `capabilities.experimental['claude/channel']` | `object` | Required, always `{}`. Presence registers the notification listener |
| `capabilities.experimental['claude/channel/permission']` | `object` | Optional, always `{}`. Opts in to receiving permission relay requests |
| `capabilities.tools` | `object` | Two-way only, always `{}`. Standard MCP tool capability for a reply tool |
| `instructions` | `string` | Added to Claude's system prompt; explains the `<channel>` tag attributes and reply routing |
| `notifications/claude/channel` params `content` | `string` | Event body, delivered as the `<channel>` tag's body |
| `notifications/claude/channel` params `meta` | `Record<string,string>` | Becomes `<channel>` tag attributes; keys must be identifiers (letters/digits/underscore only) |

## Notes

- Claude Code spawns your server as a subprocess over stdio — chat platforms poll the platform API locally, webhook channels listen on a local HTTP port.
- `mcp.notification()` resolving means the message reached the transport, not that Claude processed it; if the session hasn't loaded your server as a channel or org policy blocks it, events are dropped silently with no error to your server. For delivery confirmation, track state yourself and use a reply tool.
- Events queue and are delivered together on Claude's next turn if several arrive while busy; run separate sessions to process independent streams concurrently.
- **Reply tool** (two-way channels): add `tools: {}` to capabilities, register `ListToolsRequestSchema`/`CallToolRequestSchema` handlers, and tell Claude in `instructions` when/how to call it.
- **Gate inbound messages**: check the sender's identity (not the room/chat identity) against an allowlist before calling `mcp.notification()` — an ungated channel is a prompt injection vector.
- **Relay permission prompts**: declare `claude/channel/permission`, handle `notifications/claude/channel/permission_request` (fields `request_id` — 5 lowercase letters excluding `l`, `tool_name`, `description`, `input_preview`), and reply with `notifications/claude/channel/permission` (`request_id`, `behavior: 'allow'|'deny'`). The local terminal dialog stays open in parallel; whichever answer arrives first wins. Only declare this capability if your channel already authenticates the sender — anyone who can reply can approve or deny tool use.
- Custom channels aren't on the approved allowlist during the research preview; use `--dangerously-load-development-channels` to bypass it per-entry (org `channelsEnabled` policy still applies). Package as a plugin and publish to a marketplace to make it installable via `/plugin install`.

## Related

- [Channels](./channels.md): install and use the built-in Telegram, Discord, iMessage, and fakechat channels
- MCP: the underlying protocol channel servers implement (see the official Model Context Protocol documentation)
