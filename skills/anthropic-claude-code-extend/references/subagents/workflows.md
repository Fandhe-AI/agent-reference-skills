<!-- source: https://code.claude.com/docs/en/workflows / last verified: 2026-08-07 -->

# Dynamic workflows

A JavaScript script, written by Claude, that orchestrates subagents at scale (dozens to hundreds per run) via a runtime executing in the background while the session stays responsive. Requires Claude Code v2.1.154+.

## Signature / Usage

```text
ultracode: audit every API endpoint under src/routes/ for missing auth checks
```

```javascript title=".claude/workflows/audit-routes.js"
export const meta = {
  name: 'audit-routes',
  description: 'Audit every route handler for missing auth checks',
}

const found = await agent('List every .ts file under src/routes/.', {
  schema: { type: 'object', required: ['files'], properties: { files: { type: 'array', items: { type: 'string' } } } },
})

const audits = await pipeline(found.files, file =>
  agent(`Audit ${file} for missing authentication checks.`, { label: file }),
)

return audits.filter(Boolean)
```

`agent()` spawns one subagent; `pipeline()` runs one per item in a list; a stopped/errored `agent()` call resolves to `null`.

## Options / Props

|  | Subagents | Skills | Agent teams | Workflows |
|---|---|---|---|---|
| Who decides what runs next | Claude, turn by turn | Claude | Lead agent, turn by turn | The script |
| Intermediate results | Context window | Context window | Shared task list | Script variables |
| Scale | A few per turn | Same as subagents | A handful of long-running peers | Dozens to hundreds per run |
| Interruption | Restarts the turn | Restarts the turn | Teammates keep running | Resumable in same session |

| Key (in `/workflows` progress view) | Action |
|---|---|
| `↑`/`↓` | Select phase/agent |
| `Enter`/`→` | Drill in |
| `Esc`/`←` | Back out |
| `f` | Filter agent list by status |
| `p` | Pause/resume run |
| `x` | Stop selected agent or whole run |
| `r` | Restart selected running agent |
| `s` | Save run's script as a command |

| Size guideline (`/config` → Dynamic workflow size, or `workflowSizeGuideline`) | Agent count |
|---|---|
| `unrestricted` | No cap, sized to task |
| `small` | < 5 |
| `medium` (default) | < 15 |
| `large` | < 50 |

| Constraint | Value |
|---|---|
| Max concurrent agents | 16 (fewer on limited-CPU machines) |
| Max agents per run | 1,000 |
| Large-workflow warning threshold | > 25 agents or > 1.5M projected tokens |

## Notes

- Trigger a workflow with the `ultracode` keyword in a prompt (or natural language like "use a workflow"), with `/effort ultracode` (turns on for every substantive task in the session), or by running an existing command like the bundled `/deep-research`.
- Save a run's script as a reusable command via `/workflows` → select run → `s`, to `.claude/workflows/` (project, shared) or `~/.claude/workflows/` (personal). Runs as `/<name>`. Accepts input via `args` global.
- Workflow subagents always run in `acceptEdits` mode regardless of session permission mode; file edits auto-approve. Shell/web/MCP tools outside your allowlist can still prompt mid-run.
- No mid-run user input and no direct filesystem/shell access from the script itself — only spawned agents touch the filesystem.
- Resume rule: an agent still running when stopped restarts; replay follows start order, so every agent that started after the first unfinished one re-runs even if it had completed — fan-out into many small agents preserves more progress than one long agent.
- Turn off: `/config` toggle, `"disableWorkflows": true` in settings, or `CLAUDE_CODE_DISABLE_WORKFLOWS=1`; org-wide via managed settings.
- Distribute via plugin `workflows/` directory; namespaced as `/plugin-name:workflow-name`.

## Related

- [agents.md](./agents.md)
- [sub-agents.md](./sub-agents.md)
- [agent-teams.md](./agent-teams.md)
