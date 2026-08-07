<!-- source: https://code.claude.com/docs/en/desktop-scheduled-tasks / last verified: 2026-08-07 -->

# Desktop scheduled tasks

Local recurring or one-off tasks configured from the Claude Code Desktop app's **Routines** page. A task starts a new session automatically on your machine, with direct access to local files and tools, but only fires while the Desktop app is open and the computer is awake.

## Signature / Usage

```text
# In the Desktop app: Routines sidebar → New routine → Local
# Or describe it in any session:
set up a daily code review that runs every morning at 9am
remind me at 3pm tomorrow to check the deploy   # one-time, self-disables after firing
```

```text
# Prompt lives on disk, editable directly:
~/.claude/scheduled-tasks/<task-name>/SKILL.md   # YAML frontmatter (name, description) + prompt body
```

## Options / Props

| Field | Description |
|---|---|
| Name | Task identifier; converted to lowercase kebab-case and used as the folder name; must be unique |
| Description | Short summary shown in the task list |
| Instructions | The prompt Claude runs; includes permission-mode and model pickers, working folder, and isolated-worktree toggle |
| Schedule | Manual, Hourly, Daily (default 9:00 AM local), Weekdays, Weekly — or ask Claude in plain language for finer-grained intervals |

| Comparison | Cloud (Routines) | Desktop | `/loop` |
|---|---|---|---|
| Runs on | Cloud, Anthropic-managed by default | Your machine | Your machine |
| Requires machine on | No | Yes | Yes |
| Requires open session | No | No | Yes |
| Persistent across restarts | Yes | Yes | Restored on `--resume` if unexpired |
| Access to local files | No (fresh clone) | Yes | Yes |
| MCP servers | Connectors per task | Config files and connectors | Inherits from session |
| Permission prompts | No (runs autonomously) | Configurable per task | Inherits from session |
| Minimum interval | 1 hour | 1 minute | 1 minute |

## Notes

- Desktop checks the schedule every minute while the app is open; each task fires with a small, deterministic per-task delay to stagger API traffic.
- By default a run uses the working directory's current state, including uncommitted changes; enable the worktree toggle to give each run its own isolated Git worktree.
- Missed runs: on app start or wake, Desktop starts exactly one catch-up run for the most recently missed time in the last 7 days and discards older misses; add prompt guardrails (e.g. time-of-day checks) if exact timing matters.
- Each task has its own permission mode; in Manual mode an unapproved tool call stalls the run until you approve it, and future runs of that task auto-approve the same tools.
- A running task can reschedule itself or edit its own prompt via the `update_scheduled_task` MCP tool.
- Deleting a task with **Also delete files on disk** removes its `SKILL.md` and data from `~/.claude/scheduled-tasks/`.
- Distinct from Anthropic's Agent Skills (`SKILL.md` in this repository's sense): the on-disk task prompt happens to reuse the `SKILL.md` filename/frontmatter format but is a Desktop scheduling artifact, not a discoverable skill.

## Related

- [routines.md](./routines.md)
- [scheduled-tasks.md](./scheduled-tasks.md)
