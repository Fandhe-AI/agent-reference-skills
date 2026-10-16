# Persistent Goals

`/goal` gives Hermes a standing objective that survives across turns. After each turn a lightweight judge model checks whether the goal is satisfied; if not, Hermes feeds a continuation prompt back into the same session until the goal is achieved, you pause or clear it, or the turn budget runs out. Hermes' take on the Ralph loop (inspired by Codex CLI 0.128.0's `/goal`).

## Signature / Usage

```text
/goal Fix every failing test in tests/hermes_cli/ and make sure scripts/run_tests.sh passes for that directory
```

Flow: `Goal set (20-turn budget)` -> turn runs -> judge returns `done` / `continue` / `blocked` (plus `wait`) -> `Continuing toward goal (1/20)` ... -> `Goal achieved` or `Goal paused - N/20 turns used`.

## Options / Props

| Command | What it does |
|---------|--------------|
| `/goal <text>` | Set (or replace) the goal; starts the first turn immediately. |
| `/goal -- <text>` | Goal text beginning with a control word (e.g. `/goal -- pause the nightly cron`). |
| `/goal draft <text>` | Draft a structured completion contract from a plain-language objective, then set it. |
| `/goal show` | Print the active completion contract. |
| `/goal` / `/goal status` | Show goal, status, turns used. |
| `/goal pause` | Stop auto-continuation without clearing. |
| `/goal resume` | Resume (resets turn counter to zero). |
| `/goal clear` | Drop the goal. |
| `/goal wait <pid> [reason]` | Park the loop until a live host PID exits. |
| `/goal unwait` | Drop the wait barrier and resume. |
| `/goal gate add <command>` | Add a quality gate (shell command that must exit 0 before done). |
| `/goal gate` / `/goal gate list` | List gates and state. |
| `/goal gate remove <N>` | Remove the Nth gate (1-based). |
| `/goal gate clear` | Remove all gates. |
| `/subgoal <text>` | Append an acceptance criterion to the active goal. |
| `/subgoal` | Show subgoal list. |
| `/subgoal remove <N>` / `/subgoal clear` | Remove one / all subgoals. |

Completion contract fields (all optional): `outcome`, `verification`, `constraints`, `boundaries`, `stop_when`. Inline form:

```text
/goal Migrate auth to JWT
verify: pytest tests/auth passes
constraints: keep the /login response shape unchanged
boundaries: only touch services/auth and its tests
stop when: a DB schema migration is required
```

Recognized prefixes include `verify:`, `verified by:`, `constraints:`, `preserve:`, `boundaries:`, `scope:`, `stop when:`, `blocked:`.

Configuration:

```yaml
goals:
  max_turns: 20

auxiliary:
  goal_judge:
    provider: openrouter
    model: google/gemini-3-flash-preview
```

## Notes

- Judge sees the goal text, the agent's last final response (last ~4 KB) and live background processes; replies with one-line JSON `{"verdict": "done" | "blocked" | "continue" | "wait", "reason": "..."}` (wait verdicts add `wait_on_session` / `wait_on_pid` / `wait_for_seconds`; legacy `{"done": <bool>, "reason": "..."}` still accepted). `blocked` pauses the goal with the reason. Judge errors are treated as `continue` (fail-open); the turn budget (`goals.max_turns`, default 20) is the backstop.
- Wait barriers: pid/session waits capped at 30 minutes; persisted with the goal; cleared by pause / resume / clear.
- Quality gates run before the judge; a failing gate skips the judge and its exit code plus output tail (~3 KB) become the continuation prompt. Defaults: 3 retries and 5-minute timeout per gate; exhausted gate auto-pauses the goal. On messaging platforms `/goal gate add` requires an explicitly configured gateway admin.
- Goal, contract, subgoals and gates persist in `SessionDB.state_meta` (`goal:<session_id>`), surviving `/resume` and compression. A new `/goal <text>` replaces the goal and clears subgoals.
- Single-session only: never creates kanban cards. A kanban card created with `--goal` borrows the same continuation engine inside that card's worker session.
- User messages always preempt continuation. Gateway mid-run: `status` / `pause` / `clear` / `wait` / `unwait` are safe; setting a new goal mid-run is rejected (use `/stop` first). ACP does not advertise `/goal`.
- Continuation is a plain user-role message (prompt cache intact).

## Related

- [Recurring Loops](./loops.md)
- [Kanban Multi-Agent](./kanban.md)
- [Cron Jobs](./cron.md)
