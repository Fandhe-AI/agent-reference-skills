<!-- source: https://code.claude.com/docs/en/agent-teams / last verified: 2026-10-17 -->

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
- `teammateDefaultModel` was removed in v2.1.234 (a leftover value is ignored); name the model in your prompt instead.
- Teammate model resolution order: (1) the model your spawn prompt names; (2) for a teammate spawned from a subagent definition, the definition's `model` (`inherit` selects the lead's model); (3) `CLAUDE_CODE_SUBAGENT_MODEL` when set to anything other than `inherit`; (4) the lead's current model. Before v2.1.251, `CLAUDE_CODE_SUBAGENT_MODEL` came first. `CLAUDE_CODE_SUBAGENT_MODEL_FORCE=1` (v2.1.257+) skips the first two sources. A mod's `agent.spawn` hook model takes the place of the first source. A model blocked by `availableModels` is substituted (newest permitted version of a family alias on the Anthropic API / Claude Platform on AWS; otherwise the lead's model).
- Applying a subagent definition to a teammate: `tools` limits the teammate (in-process also gets `SendMessage`, plus the Task tools where available); `model` applies in either mode; in-process only: `disallowedTools`, `effort`, `autoCompactWindow` (v2.1.296+; split-pane ignores it), and the body is appended to the default system prompt (split-pane uses the body in place of it); `mcpServers` applies to split-pane only (in-process ignores it); `skills` is never applied.
- Hooks: `TeammateIdle` (exit code 2 sends feedback and keeps the teammate working) and `TaskCompleted` (exit code 2 prevents completion).
- An in-process teammate's cache holds for five minutes by default (including on a subscription); set `subagentPromptCacheTtl` to `1h` to keep it for an hour (1-hour cache writes bill at a higher rate).
- Teammates start with the lead's permission mode; `bypassPermissions` propagates, per-teammate mode can be changed after spawn but not set at spawn time. Plan approval requests route to the lead.
- Task claiming uses file locking; tasks can depend on other tasks and unblock automatically on completion.
- Limitations: no session resumption for in-process teammates (`/resume`/`/rewind`), task status can lag, one team per session, no nested teams (teammates can't spawn teammates), in-process teammates cannot run background subagents (their subagents run in the foreground; a subagent with `background: true` errors), split panes require tmux/iTerm2 and are unsupported in VS Code's integrated terminal, Windows Terminal and Ghostty.
- Best for research/review, new independent modules, competing-hypothesis debugging, cross-layer coordination; not for sequential/same-file work (use a single session or [subagents](./sub-agents.md) instead).

## Related

- [sub-agents.md](./sub-agents.md)
- [agents.md](./agents.md)
- [workflows.md](./workflows.md)
