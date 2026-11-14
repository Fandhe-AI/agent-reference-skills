<!-- source: https://code.claude.com/docs/en/workflows / last verified: 2026-11-14 -->

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
| `j` / `k` | Scroll within the agent detail when it overflows |

| Size guideline (`/config` → Dynamic workflow size, or `workflowSizeGuideline`) | Agent count Claude aims for (advice, not a cap) |
|---|---|
| `unrestricted` | No guideline, sized to task |
| `small` | < 5 |
| `medium` | < 10 |
| `large` | < 50 |

Default is `medium`, or `small` on a Pro plan with v2.1.271+. The setting requires v2.1.219+ (earlier versions are unrestricted). A `workflowSizeGuideline` key in any settings file takes precedence over `/config`.

| Constraint | Value |
|---|---|
| Max concurrent agents | Default 16 (fewer on limited-CPU machines, including CPU-limited containers); `CLAUDE_CODE_WORKFLOW_MAX_CONCURRENT_AGENTS` sets 1–256 (v2.1.269+) |
| Max agents per run | 1,000 |
| Max items in one `parallel()` / `pipeline()` call | 4,096 (a longer list is rejected with an error) |
| Large-workflow warning threshold | > 25 agents or > 1.5M projected tokens |
| Module loading | None: a script containing `import()` fails before the run starts |
| Fan-out prompt-cache prefix | Agents sharing the first agent's prefix start up to 5 seconds after it by default |

## Notes

- Trigger a workflow with the `ultracode` keyword in a prompt (or natural language like "use a workflow"), with `/effort ultracode` (turns on for every substantive task in the session; `/effort ultracode on|off`, v2.1.284+ per the commands page), or by running an existing command like the bundled `/deep-research`. `claude --effort ultracode` starts a session with it on (also sets effort to `xhigh`); the `ultracode` settings key makes every session start with it; `Tab` on the `/effort` slider flips the toggle. Turning workflows off also makes ultracode unavailable.
- `/workflow-authoring` bundled skill (v2.1.248+) loads the script-writing reference; run it before editing a saved workflow or asking Claude to change one.
- Usage limits: when an agent hits the claude.ai usage limit, the run pauses (agents wait for the reset, no new agents start) and continues on its own, provided `autoContinueAtUsageLimit` is on (v2.1.271+; earlier the affected agents fail).
- Usage-limit pause conditions: pauses only for a claude.ai subscription without usage-based billing in an interactive terminal session (v2.1.271+) or a local Desktop Code tab session (v2.1.319+; progress line reads `Paused at usage limit · continues after <time> if the app stays open`, keep the app open). It doesn't pause in `claude -p` / Agent SDK, background sessions, Remote Control, agent-team teammate, SSH / WSL / Dispatch / scheduled-task sessions, or with `CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC`. Also needs `autoContinueAtUsageLimit` on (and the **Auto-continue when limits reset** checkbox in the Code tab), a reset within 24 hours, and no more than two earlier waits (the third limit hit fails the agent). After a failed run, ask Claude to relaunch the workflow once the limit has reset.
- Resume: relaunching replays agents in start order; a completed agent returns its saved result until the first agent whose prompt differs (or that failed), after which every later agent runs again. An agent failed at a usage limit on v2.1.318+ runs again while completed ones return saved results (unless a later agent returned a result after the failure). Before v2.1.305 completed agents could also rerun when `pipeline()` items or `parallel()` tasks ran more than one agent each. Relaunch is refused while the stopped run's agents haven't exited. If the saved results can't be found the relaunch fails with `nothing to resume` and Claude should start a new run; a run doesn't continue on its own after you background the session or exit.
- Stalls: an agent whose output stops arriving restarts from the same prompt (name gains `(retry 1)`), at most five restarts; then `agent stalled on all 6 attempts`, `agent lost its reply on all 6 attempts` or `agent abandoned after 6 attempts`. Raise the window per agent with `stallMs` on `agent()` or globally with `CLAUDE_ASYNC_AGENT_STALL_TIMEOUT_MS`. Inside `parallel()` / `pipeline()` a failed agent yields `null`; awaited directly it ends the run. `Date.now()`, `Math.random()` and no-argument `new Date()` throw inside the script (pass a timestamp via `args`).
- `/deep-research <question>` is the only bundled workflow; it needs the WebSearch tool, and claims the verifiers can't check are listed as unverified instead of refuted. A fan-out in the Workflow tool is also described in the Agent SDK reference.
- 2.1.323: workflows in the desktop app's Code tab pause at a usage limit and continue after it resets. After safeguards stop a workflow agent (or a forked skill), Claude is told to retry with a narrower prompt or tell you instead of doing the work itself.
- 2.1.318: fixed workflows re-running finished agents when resumed after a usage limit.
- Source: https://code.claude.com/docs/en/workflows.md (retrieved 2026-11-14)
- Source: https://code.claude.com/docs/en/changelog.md (2.1.318, 2.1.323, retrieved 2026-11-14)
- When `availableModels` blocks a model a script requests for an agent, that agent runs on a substituted model under the same rules as subagents.
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
