<!-- source: https://code.claude.com/docs/en/goal.md / last verified: 2026-08-07 -->

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
- Resuming a session with an active goal restores the condition but resets turn count, timer, and token-spend baseline.

## Related

- [Best practices](./best-practices.md)
- [Common workflows](./common-workflows.md)
