<!-- source: https://code.claude.com/docs/en/desktop-scheduled-tasks.md / last verified: 2026-11-14 -->

# Schedule recurring tasks in Claude Code Desktop

Set up scheduled tasks in Claude Code Desktop to run Claude automatically on a recurring basis for daily code reviews, dependency audits, or morning briefings. Local tasks run on your machine and only fire while the app is open and the computer is awake.

## Signature / Usage

```text
Code tab -> Scheduled (sidebar or More menu) -> New task -> Set up manually
Fields: Name, instructions, Only on this computer (Advanced settings), Local folder, Trigger
```

If your app shows the feature under its earlier name, click **Routines** where this page says **Scheduled** and **New routine** where it says **New task**. You can also create a task by describing it in any session, e.g. "set up a daily code review that runs every morning at 9am"; "remind me at 3pm tomorrow to check the deploy" creates a one-time task that disables itself after it fires.

## Options / Props

### Scheduling options comparison

| | Cloud | Desktop (local tasks) | `/loop` |
|------|------|------|------|
| Runs on | Cloud, Anthropic-managed by default | Your machine | Your machine |
| Requires machine on | No | Yes | Yes |
| Requires open session | No | No | Yes |
| Persistent across restarts | Yes | Yes | Restored on `--resume`, with exceptions |
| Access to local files | No (fresh clone) | Yes | Yes |
| Permission prompts | Auto mode by default | Configurable per task | Inherits from session |
| Minimum interval | 1 hour | 1 minute when Claude sets it, 1 hour in the forms | 1 minute |

### Task fields

| Field | Description |
|------|-------------|
| Name | Converted to lowercase kebab-case; used as the task's folder name on disk; must be unique across your tasks |
| Description | Shown in the task list; filled in from your instructions in the **Edit** form; required (**Create** stays unavailable without it) in the dialog with **Only on this computer** at the top and in the full-page form |
| Instructions | What Claude does when the task runs; the box toolbar holds the permission mode and model pickers (and, in the full-page form, the folder) |
| Only on this computer | In **Advanced settings** on the **General** tab; makes the task local, which requires a **Local folder**. Unavailable while a repository, GitHub event, or API trigger is set (those make it a cloud task) |
| Trigger / Schedule | Hourly, Daily, Weekdays, Weekly in the **Trigger** card; **Manual** and **Custom** via the **Edit** form (or the other two forms) |

### Schedule options

| Option | Behavior |
|------|-------------|
| Hourly | Every hour |
| Daily | Every day at the local time you pick |
| Weekdays | Daily, skipping Saturday and Sunday |
| Weekly | Time picker and day picker |
| Manual | No schedule; runs only on **Run now** |
| Custom | Cron expression in local time, e.g. `0 9 * * *`; days of week and months must be numbers (names not accepted), Sunday is `0` not `7`; the form rejects expressions that run more often than once per hour |

Asking Claude in any Desktop session to set the schedule isn't held to the once-per-hour limit and can set a single run at a future time (for example "run the test suite every 30 minutes").

## Notes

- Local scheduled tasks require Claude Desktop 1.1.5368 or later
- By default, local tasks run against whatever state the working directory is in, including uncommitted changes; to give each run its own isolated Git worktree, select **Worktree** in the task's **Edit** form (available when the folder is a Git repository)
- Desktop checks the schedule every minute while the app is open and starts a fresh session when a task is due; each task gets a deterministic delay of a few minutes after the scheduled time to stagger API traffic. If the computer sleeps through a scheduled time, the run is skipped; turn on **Keep computer awake** in **Settings > Desktop app** or **Settings > This computer > System** to prevent idle sleep (closing the lid still sleeps)
- Missed runs: on app start or wake, Desktop starts exactly one catch-up run for the most recently missed time within the last 7 days and discards older misses, with a notification. A catch-up run that starts as the app opens can use the runtime default model for your account instead of the model your organization set in managed settings
- Model: if the menu reads **Default · Set by admin** and you don't pick another, runs use the model set in managed settings; **Run now** then opening the run's session shows the model name
- Find a run's session: click the run's row in the **History** list on the task's detail page. The sidebar can also show a **Scheduled** group (current layout: **Group and sort** menu, **Show**, **Scheduled**, listed only when at least one task is **Active**; earlier layout: always present)
- Permissions: each task has its own permission mode (if unchanged, runs use your Claude Code settings); allow rules in `~/.claude/settings.json` also apply. To avoid stalls, click **Run now** after creating a task and select "always allow" on each prompt; review or revoke these in the **Always allowed** panel. "Always allow" on a file edit moves only that session to **Accept edits**, so set the task's permission mode to **Accept edits**. MCP tools marked `requiresUserInteraction` prompt on every call with no always-allow, so those runs stall each time
- Task detail page: **Run now**, **Status** (Active / Paused), **Edit**, history (including skipped runs, with reasons such as computer asleep, previous run still in progress, or other tasks already running; **Show more** loads older entries), **Always allowed**, and **Delete** (sessions the task created are archived; the task folder stays on disk at `~/.claude/scheduled-tasks/<task-name>/`, or `scheduled-tasks/<task-name>/` under `CLAUDE_CONFIG_DIR`, until you delete it)
- A task's prompt is stored at `~/.claude/scheduled-tasks/<task-name>/SKILL.md` (YAML frontmatter for `name`/`description`, prompt as body; changes apply on the next run); schedule, folder, and enabled state are not in this file. Ask Claude in any Desktop session to list, create, edit, or pause tasks (deleting needs the **Delete** button). For a task to change its own schedule or prompt with the `update_scheduled_task` MCP tool, click **Run now** and approve the call each time
- Cloud scheduled tasks (formerly routines) run even when the computer is off and can start on API calls or GitHub events; CLI-side `/loop` and remote routines are covered by the anthropic-claude-code-extend skill, not this page
- Source: https://code.claude.com/docs/en/desktop-scheduled-tasks.md (fetched 2026-11-14)

## Related

- [Desktop application](./desktop.md)
- [Get started with the desktop app](./desktop-quickstart.md)
