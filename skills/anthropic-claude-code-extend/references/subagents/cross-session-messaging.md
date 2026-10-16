<!-- source: https://code.claude.com/docs/en/cross-session-messaging / last verified: 2026-10-17 -->

# Message your other Claude Code sessions

Let Claude list and message your other Claude Code sessions on this machine, and reach your sessions on other machines or in the cloud. A message is plain text one Claude writes to another, never the sender's conversation history or files. Requires Claude Code v2.1.224+ on macOS / Linux (including WSL 2), v2.1.234+ on native Windows. When a session meets the requirements, messaging is on with nothing to enable.

## Signature / Usage

Claude discovers targets with the `ListAgents` tool and sends with `SendMessage`; you never call either yourself. Prompt in natural language, or @-mention a session (v2.1.232+):

```text
Ask the session running in my other terminal whether the migration finished
Let @api-worker know the schema migration finished
Tell me when the migration session finishes what it's working on
```

- `/list-agents` (alias `/peers`): shows the sessions Claude can reach (subagents, teammates, other local sessions including background sessions, cloud sessions and Remote Control sessions while connected to Remote Control). `/status` shows a `Peer address` row (`uds:` prefixed path).
- Idle notice: `SendMessage` `notify_when_idle` input asks a same-machine session for one notice when it next goes idle or exits (v2.1.236+ in both sessions). Subscription is dropped after 12 hours without a notice. Only the main-conversation Claude can subscribe, and only to local sessions.
- Names with spaces or characters outside letters, digits, hyphens, underscores: `@"release notes"`. Session names come from `/rename` or `--name`.

## Options / Props

How a message travels:

| Where the other session runs | How the message travels |
| :- | :- |
| On this machine | Per-session socket (macOS/Linux) or named pipe (native Windows), never through Anthropic servers |
| On another of your machines | Through Anthropic servers, over that machine's Remote Control connection (v2.1.225+) |
| In the cloud | Through Anthropic servers, straight to the cloud session |

`crossSessionInbound` setting (also `/config` row "Messages from your other sessions", v2.1.232+):

| Value | Behavior |
| :- | :- |
| `accept` | Claude Code delivers each message to Claude |
| `hold` | Shows a notice for each message and doesn't deliver it; released if an `accept` later applies |
| `refuse` | Drops each message without delivering it |

Other settings and environment variables:

| Name | Description |
| --- | --- |
| `isolatePeerMachines` | `true` requires your approval before any `SendMessage` reaches a session beyond this machine, even in `bypassPermissions` mode; a `true` from any scope applies |
| `dialogExpiry` | Deadline for the approval dialog of a held message; defaults to five minutes; `"never"` keeps default-held messages until the session ends |
| `CLAUDE_CODE_MESSAGING_SOCKET` | Exported to hooks and Bash commands: path of the session's inbox socket |
| `CLAUDE_CODE_MESSAGING_TOKEN` | Per-session token; send `{"type":"auth","token":"<token>"}` as the first line of a socket connection (optional on macOS/Linux, required on native Windows) |

## Notes

- Messages arrive as plain text: a mid-turn message is read between tool calls; an idle session starts a new turn. `@` file or MCP-resource mentions inside a message are not attached; commands like `/compact` are never executed.
- A message can't approve anything, can't change configuration, and the receiving session's own permission prompts and rules still apply.
- Receiving session outcome per message: delivered, held (until approved or a later mode/settings change allows it), or refused. At most 100 held messages (oldest dropped); at most 50 accepted messages queued; repeated messages are rate-limited per sender.
- When no `crossSessionInbound` value applies, delivery is decided per message from permission-mode classes: a prompting receiver delivers (holds only if the sender bypasses prompts); a bypassing receiver holds (delivers only if the sender also bypasses). Own-child messages (hook or Bash posting to its own session socket) are delivered if verified.
- Refusals: message over about a million characters (same-machine), rapid bursts to one session, target listed as `can't receive cross-session messages (off in that session)` (result begins `Not sent`), failed safety checks such as symlinked target.
- `claude -p` sessions bind an inbox socket and can receive messages; bare mode sessions do not. A `-p` worker needs `crossSessionInbound` `accept` in its `--settings` to take messages unattended.
- Containers and hosts can't reach each other; WSL 2 and native Windows sessions can't reach each other. Cross-machine / cloud sessions need Remote Control with a claude.ai sign-in (not API key, Bedrock, Claude Platform on AWS, Google Cloud's Agent Platform, or Microsoft Foundry). Same-machine messaging on those providers, or with feature-flag fetching off, requires v2.1.248+.
- While connected to Remote Control, `/list-agents` withholds working directories and unattributable session names.
- Turning off: `crossSessionInbound: "refuse"` to stop receiving; permission deny rules `SendMessage` and `ListAgents` to stop sending and listing. Denying `SendMessage` also removes messaging to subagents and agent-team teammates.
- Different from subagent / agent-team messaging, which stays within a single session or team; to move a whole conversation, resume the session instead.

Managed settings example turning both sides off:

```json
{
  "permissions": {
    "deny": ["SendMessage", "ListAgents"]
  },
  "crossSessionInbound": "refuse"
}
```

## Related

- [sub-agents.md](./sub-agents.md)
- [agent-teams.md](./agent-teams.md)
- [agent-view.md](./agent-view.md)
- [agents.md](./agents.md)
