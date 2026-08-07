# Run code migrations

Migrate legacy stacks in controlled checkpoints.

```text
Migrate this codebase from [legacy stack or system] to [target stack or system].

Requirements:
- Start by inventorying the legacy assumptions: routing, data models, auth, configuration, build tooling, tests, deployment, and external contracts.
- Map the old stack to the new one and call out anything that has no direct equivalent.
- Propose an incremental migration plan with compatibility layers or checkpoints instead of one big rewrite.
- Keep behavior unchanged unless the migration explicitly requires a user-visible change.
- Work in milestones and run lint, type-check, and focused tests after each milestone.
- Keep rollback or fallback options visible until the transition is complete.
- If validation fails, fix it before continuing.
- Start by mapping the migration surface and proposing the checkpoint plan.
```

## Notes

- Source: OpenAI Codex use-case (learn.chatgpt.com). Can be paired with `$security-best-practices`, `$gh-fix-ci`, and framework-specific skills such as `$aspnet-core`
- Best for: legacy-to-modern stack moves where frameworks, runtimes, build systems, or platform conventions change; teams needing compatibility layers and checkpoint validation
- Combine with Follow a goal (`follow-goals.md`) and Git worktrees (https://learn.chatgpt.com/codex/environments/git-worktrees) for long-running, milestone-based execution
