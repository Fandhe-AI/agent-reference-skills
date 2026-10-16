<!-- source: https://code.claude.com/docs/en/goal.md / last verified: 2026-10-16 -->

# Keep Claude working toward a goal

`/goal` sets a completion condition and Claude keeps working across turns, without re-prompting, until an evaluator model confirms the condition is met.

## Signature / Usage

```text
/goal all tests in test/auth pass and the lint step is clean
/goal                 # check status
/goal clear           # remove active goal (aliases: stop, off, reset, none, cancel)
```

```bash
claude -p "/goal CHANGELOG.md has an entry for every PR merged this week"
```

## Options / Props

| Approach | Next turn starts when | Stops when |
|----------|-------------------------|-------------|
| `/goal` | Previous turn finishes | A model confirms the condition is met |
| `/loop` | A time interval elapses | You stop it, or Claude decides the work is done |
| Stop hook | Previous turn finishes | Your own script or prompt decides |

## Notes

- Requires Claude Code v2.1.139 or later. One goal active per session; setting a new one replaces the old.
- `/goal` doesn't change permissions; pair with auto mode for unattended runs. Condition max 4,000 characters; include a turn/time bound (e.g. "or stop after 20 turns") to bound runtime.
- Evaluator is a small fast model (Haiku by default on the Claude API) that judges only what Claude has surfaced in the conversation; it does not run commands or read files independently.
- Requires the trust dialog accepted for the workspace (it's part of the hooks system); unavailable when `disableAllHooks` or `allowManagedHooksOnly` is set.
- Resuming a session with an active goal restores the condition but resets turn count, timer, and token-spend baseline. Claude Code restores it on every resume route: `--continue`, `--resume` with a session ID, name, or transcript file path, and the session picker (before v2.1.239, every route except the `claude --resume` picker).
- Failures: a goal is cleared (warning starting `Goal cleared after an unrecoverable error`, ending `Run /goal again to continue`) after an authentication failure when Claude Code manages its own credentials (a host-managed session such as the desktop app or a cloud session keeps the goal active), an exhausted credit balance, a context overflow that auto-compaction couldn't clear, or a model that isn't available. After any other failure the goal stays set; in an interactive session on v2.1.269 or later Claude Code prints a line naming the cause and either retries on its own (`Goal still active`, showing the wait; after three automatic retries the goal pauses) or pauses (`Goal paused`, after a failure a retry would only repeat such as an API rate limit, a claude.ai usage limit, or a hook that ended the turn; if the session is waiting for a usage limit to reset, Claude resumes then). Send a message at any time to start the next turn immediately.
- Background work defers evaluation: if a subagent or background shell command is still running when a turn ends, evaluation is skipped for that turn and happens at the end of the next turn that finishes with no background work running. Once background work has kept the goal waiting for 30 minutes, a check-in is due (requires v2.1.234 or later): Claude Code lists the running tasks and asks Claude to read their output, keep waiting if progressing, and fix or stop any that are stuck. After the first check-in, it waits twice as long before each later check-in, up to four times the first interval (with the default, 1 hour after the first, then every 2 hours); before v2.1.239, only idle check-ins backed off this way. A check-in is delivered at the end of the next turn that finishes with the work still running (the only way in `-p` sessions) or, in an interactive session, by Claude Code starting a turn on its own while idle (v2.1.236 or later; at most three idle check-ins per goal between your prompts, then paused until you send another prompt; before v2.1.246 idle check-ins were uncapped). If background work stopped without reporting a result, Claude Code asks Claude to continue toward the goal.
- `CLAUDE_CODE_GOAL_CHECKIN_MINUTES` replaces the 30-minute first interval (later intervals scale with it); `0` turns off check-ins and automatic retries.

## Related

- [Best practices](./best-practices.md)
- [Common workflows](./common-workflows.md)
