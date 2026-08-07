<!-- source: https://code.claude.com/docs/en/agent-teams / last verified: 2026-08-07 -->

# Agent teams

Coordinate multiple Claude Code instances working together: one session acts as team lead, teammates work independently in their own context windows and communicate directly with each other. Experimental, disabled by default.

## Signature / Usage

```json title="settings.json"
{
  "env": {
    "CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS": "1"
  }
}
```

```text
I'm designing a CLI tool that tracks TODO comments across the codebase.
Spawn three teammates to explore this from different angles:
one on UX, one on technical architecture, one playing devil's advocate.
```

## Options / Props

| Setting | Values | Description |
|---|---|---|
| `teammateMode` (`settings.json`) / `--teammate-mode` | `in-process` (default) \| `auto` \| `tmux` \| `iterm2` | Display mode: single terminal vs split panes (requires tmux or iTerm2 `it2` CLI) |
| Default teammate model (`/config`) | model name \| "Default (leader's model)" | Model used when a spawn prompt doesn't specify one |

| Component | Role |
|---|---|
| Team lead | Main session; spawns teammates, coordinates work |
| Teammates | Separate Claude Code instances working assigned tasks |
| Task list | Shared work items teammates claim/complete (`~/.claude/tasks/{team-name}/`) |
| Mailbox | Per-agent JSON message queue (`~/.claude/teams/{team-name}/inboxes/{agent-name}.json`) |

| vs Subagents | Subagents | Agent teams |
|---|---|---|
| Context | Own window; results return to caller | Own window; fully independent |
| Communication | Report to main agent only | Teammates message each other directly |
| Coordination | Main agent manages all work | Shared task list, self-coordination |
| Token cost | Lower | Higher |

## Notes

- Enable via `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1`; without it no team is set up and Claude never spawns teammates.
- Reference a [subagent](./sub-agents.md) definition by name when spawning a teammate to reuse a role; `skills`/`mcpServers` frontmatter fields don't apply when the definition runs as a teammate (teammates load skills/MCP from project/user settings normally).
- Teammates start with the lead's permission mode; `bypassPermissions` propagates, per-teammate mode can be changed after spawn but not set at spawn time. Plan approval requests route to the lead.
- Task claiming uses file locking; tasks can depend on other tasks and unblock automatically on completion.
- Limitations: no session resumption for in-process teammates (`/resume`/`/rewind`), task status can lag, one team per session, no nested teams (teammates can't spawn teammates), split panes require tmux/iTerm2.
- Best for research/review, new independent modules, competing-hypothesis debugging, cross-layer coordination; not for sequential/same-file work (use a single session or [subagents](./sub-agents.md) instead).

## Related

- [sub-agents.md](./sub-agents.md)
- [agents.md](./agents.md)
- [workflows.md](./workflows.md)
