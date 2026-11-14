<!-- source: https://code.claude.com/docs/en/desktop-scheduled-tasks / last verified: 2026-11-14 -->

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
| Schedule | Manual, Hourly, Daily (default 9:00 AM local), Weekdays, Weekly, or Custom (cron expression in local time, weekdays and months as numbers, Sunday is `0`, not more often than hourly) — or ask Claude in plain language for finer-grained intervals or a single future run |

| Comparison | Cloud (Routines) | Desktop | `/loop` |
|---|---|---|---|
| Runs on | Cloud, Anthropic-managed by default | Your machine | Your machine |
| Requires machine on | No | Yes | Yes |
| Requires open session | No | No | Yes |
| Persistent across restarts | Yes | Yes | Restored on `--resume`, with exceptions |
| Access to local files | No (fresh clone) | Yes | Yes |
| MCP servers | Connectors per task | Config files and connectors | Inherits from session |
| Permission prompts | Auto mode by default | Configurable per task | Inherits from session |
| Minimum interval | 1 hour | 1 minute when Claude sets it, 1 hour in the forms | 1 minute |
| Customizable schedule | Via `/schedule` in the CLI | Yes | Yes |

## Notes

- Desktop checks the schedule every minute while the app is open; each task fires with a small, deterministic per-task delay to stagger API traffic.
- By default a run uses the working directory's current state, including uncommitted changes; enable the worktree toggle to give each run its own isolated Git worktree.
- Missed runs: on app start or wake, Desktop starts exactly one catch-up run for the most recently missed time in the last 7 days and discards older misses; add prompt guardrails (e.g. time-of-day checks) if exact timing matters.
- Each task has its own permission mode; in Manual mode an unapproved tool call stalls the run until you approve it, and future runs of that task auto-approve the same tools.
- A running task can reschedule itself or edit its own prompt via the `update_scheduled_task` MCP tool.
- MCP tools marked `requiresUserInteraction` prompt on every call and don't offer an always-allow option, so a run that calls them stalls each time.
- The on-disk path moves under `CLAUDE_CONFIG_DIR` when it is set (`$CLAUDE_CONFIG_DIR/scheduled-tasks/<task-name>/SKILL.md`). Schedule, folder, model, and enabled state are not in that file; change them through the Edit form or ask Claude.
- Deleting a task with **Also delete files on disk** removes its `SKILL.md` and data from `~/.claude/scheduled-tasks/`.
- Naming: the current official page calls the Desktop page **Scheduled tasks** (sidebar **Scheduled**, **New task**), with the earlier **Routines** / **New routine** names still shown in some apps; it lists both local and cloud tasks. Local tasks require Claude Desktop 1.1.5368 or later. When **Only on this computer** is on (Advanced settings) the task runs in a local folder; the worktree checkbox is available when the folder is a Git repository.
- A run that would sleep through its time is skipped unless the app starts or the computer wakes within the 7-day catch-up window; turn on **Keep computer awake** to prevent idle sleep (closing the lid still sleeps). The History list shows skipped runs with the reason (computer asleep, previous run still in progress, other scheduled tasks already running); the sidebar can show a **Scheduled** group.
- "Always allow" on a file edit in the task's folder moves only that session to Accept edits, so set the task's permission mode to Accept edits. Deleting a task archives its sessions and leaves `~/.claude/scheduled-tasks/<task-name>/` on disk (as the page states, you remove the folder yourself).
- 2.1.325: "Always allow" in Desktop, IDE and SDK hosts offers a rule alone only when saving it would allow that command again, so a scheduled task that relied on one can now wait for you.
- Source: https://code.claude.com/docs/en/desktop-scheduled-tasks.md (retrieved 2026-11-14)
- Source: https://code.claude.com/docs/en/changelog.md (2.1.325, retrieved 2026-11-14)
- Distinct from Anthropic's Agent Skills (`SKILL.md` in this repository's sense): the on-disk task prompt happens to reuse the `SKILL.md` filename/frontmatter format but is a Desktop scheduling artifact, not a discoverable skill.

## Related

- [routines.md](./routines.md)
- [scheduled-tasks.md](./scheduled-tasks.md)
