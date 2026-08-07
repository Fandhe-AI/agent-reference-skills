<!-- source: https://code.claude.com/docs/en/agents / last verified: 2026-08-07 -->

# Run agents in parallel (overview)

Compares the four ways Claude Code takes on multiple tasks at once: subagents, agent view, agent teams, and dynamic workflows.

## Signature / Usage

```text
# Delegated worker inside one session
Use the code-reviewer subagent to review this PR

# Background, dispatched session
claude --bg "audit the auth module"

# Coordinated peer sessions (experimental)
Spawn three teammates to review PR #142 from different angles

# Script-orchestrated fan-out
ultracode: audit every API endpoint under src/routes/ for missing auth checks
```

## Options / Props

| Approach | What it gives you | Use it when |
|---|---|---|
| [Subagents](./sub-agents.md) | Delegated workers in one session, own context, return a summary | A side task would flood the main conversation |
| [Agent view](./agent-view.md) | One screen (`claude agents`) to dispatch/monitor background sessions | Several independent tasks to hand off and check later |
| [Agent teams](./agent-teams.md) | Coordinated sessions with shared task list + inter-agent messaging | Claude should split a project and keep workers in sync |
| [Dynamic workflows](./workflows.md) | A script running many subagents, cross-checking results | Work too big/too repeatable for turn-by-turn coordination |

## Notes

- Workers in every approach are Claude sessions; to involve a different tool, expose it via an MCP server.
- [Worktrees](https://code.claude.com/docs/en/worktrees) give each session a separate git checkout so parallel sessions don't collide; agent view moves each dispatched session into its own worktree automatically.
- `/batch` is a bundled skill that splits one large change into 5-30 worktree-isolated subagents, each opening a PR — a packaged use of subagents + worktrees, not a separate coordination style.
- A background bash command and a forked subagent (`/subtask`) are not separate "run agents" surfaces: the former runs one shell command without spawning an agent, the latter is a way to spawn a subagent.
- A [routine](./routines.md) runs a session on a schedule in Anthropic's cloud, not in parallel on your machine.
- Check running work: `claude agents` (agent view), `/tasks` (background items in the current session, including finished subagents), `/workflows` (dynamic workflow runs), `/agents` (prints subagent file locations, no longer opens a panel as of v2.1.198).

## Related

- [sub-agents.md](./sub-agents.md)
- [agent-view.md](./agent-view.md)
- [agent-teams.md](./agent-teams.md)
- [workflows.md](./workflows.md)
