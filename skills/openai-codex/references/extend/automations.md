# Scheduled tasks

Schedule recurring tasks to run in the background (formerly "automations"). Review active, paused, and completed tasks and recent runs in **Scheduled**.

## Signature / Usage

Advanced schedules use an RFC 5545 recurrence rule (RRULE):

```text
RRULE:FREQ=MONTHLY;BYMONTHDAY=1;BYHOUR=9;BYMINUTE=0
```

Invoke a skill explicitly in a scheduled task prompt (desktop app):

```markdown
Check my commits from the last 24h and submit a $recent-code-bugfix.
```

### Task kinds

- Standalone scheduled task: starts a new chat per run and reports in **Scheduled**.
- Scheduled task in a chat: returns to the same chat with existing context; supports minute-based intervals, daily, and weekly schedules. Make the prompt durable (what to do each run, when to report, when to stop or ask).
- Event-triggered (eligible plans, web and mobile only): Gmail (new messages, filter by sender/subject), Slack (new messages in selected channels; add `@ChatGPT` to each channel; no reactions/edits/deletes/DMs), GitHub (pull request activity; filter by PR, author, title, label). One task can use multiple event triggers but cannot combine them with a time-based schedule. Admins control via the **Allow event-triggered scheduled tasks** permission.

## Options / Props

### Where tasks run

| Surface | Behavior |
|---------|----------|
| ChatGPT desktop app | Works with local projects; runs in the project directory or an isolated worktree (Git repos). Computer must be on and app running. Non-Git projects run directly in the project directory. |
| ChatGPT web | Created from Chat or ChatGPT Work; manage in **Scheduled**. Uses uploaded context and connected tools; no local folder or worktree between runs. |
| Codex CLI / IDE extension | No Scheduled management interface; use web or desktop app. Use CLI/IDE to prepare and test a prompt, skill, or script. |

## Notes

- Scheduled tasks run unattended with your default sandbox settings: read-only and workspace-write fail on out-of-scope writes, network, or app access; full access carries elevated risk. Start with the narrowest access.
- They use `approval_policy = "never"` when organization policy allows; if admin requirements disallow it, they fall back to the selected permission mode's approval behavior.
- Tasks created with ChatGPT Work (web) or ChatGPT Work / Codex (desktop) can use plugins and skills.
- Worktree option: frequent schedules can create many worktrees; archive runs you no longer need and avoid pinning runs unless you intend to keep their worktrees.
- Test the prompt in a regular chat first and review the first few runs.
- Source notes that GPT-5.5 retires from Codex with ChatGPT sign-in on October 14, 2026 (19:00 UTC); review scheduled tasks using it and choose `gpt-6.1-sol` if your plan provides access. API-key sessions are unaffected.
- Admins: team-shared recurring work is documented under Team Tasks (enterprise docs, outside this page).
- Source: https://learn.chatgpt.com/docs/automations (retrieved 2026-10).

## Related

- [Build skills](./build-skills.md)
- [Plugins](./plugins.md)
