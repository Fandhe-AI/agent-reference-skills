<!-- source: https://code.claude.com/docs/en/desktop-scheduled-tasks.md / last verified: 2026-08-07 -->

# Schedule recurring tasks in Claude Code Desktop

Set up scheduled tasks in Claude Code Desktop to run Claude automatically on a recurring basis for daily code reviews, dependency audits, or morning briefings. Local tasks run on your machine and only fire while the app is open and the computer is awake.

## Signature / Usage

```text
Click Routines in the sidebar -> New routine -> Local
Fields: Name, Description, Instructions, Schedule
```

You can also create a task by describing it in any session, e.g. "set up a daily code review that runs every morning at 9am".

## Options / Props

### Scheduling options comparison

| | Cloud (routines) | Desktop (local tasks) | `/loop` |
|------|------|------|------|
| Runs on | Anthropic cloud | Your machine | Your machine |
| Requires machine on | No | Yes | Yes |
| Requires open session | No | No | Yes |
| Access to local files | No (fresh clone) | Yes | Yes |
| Minimum interval | 1 hour | 1 minute | 1 minute |

### Task fields

| Field | Description |
|------|-------------|
| Name | Converted to lowercase kebab-case; used as the folder name; must be unique |
| Description | Short summary shown in the task list |
| Instructions | What Claude does when the task runs; includes permission mode/model pickers and working folder/worktree toggle |
| Schedule | Manual / Hourly / Daily / Weekdays / Weekly presets, or ask Claude for a custom interval |

## Notes

- A task's prompt is stored at `~/.claude/scheduled-tasks/<task-name>/SKILL.md` (YAML frontmatter for `name`/`description`, prompt as body); schedule, folder, model, and enabled state are not in this file
- Missed runs: on app start or wake, Desktop starts exactly one catch-up run for the most recently missed time within the last 7 days and discards older misses
- Each task has its own permission mode; stalled Manual-mode runs wait in the sidebar for approval; connector tools set to `ask` and MCP tools marked `requiresUserInteraction` prompt on every call
- A running task can reschedule or edit its own prompt via the `update_scheduled_task` MCP tool
- CLI-side scheduled tasks / routines (`/loop`, remote routines) are covered by the anthropic-claude-code-extend skill, not this page.

## Related

- [Desktop application](./desktop.md)
- [Get started with the desktop app](./desktop-quickstart.md)
