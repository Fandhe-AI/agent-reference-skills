<!-- source: https://platform.claude.com/docs/en/managed-agents/self-hosted-sandboxes-reference / last verified: 2026-10-17 -->

# Self-hosted worker reference

Reference for the pre-built workers that serve a `self_hosted` environment: `ant` CLI commands and flags, environment variables, host requirements, filesystem paths, and SDK helper options.

## Signature / Usage

```bash
ant beta:worker poll --workdir /workspace          # claim work, run each session in process
ant beta:worker poll --on-work ./spawn.sh          # call a script per work item instead
ant beta:worker run                                # handle one claimed session and exit (per-session sandbox entrypoint)
```

```python
EnvironmentWorker(client, ..., tools=lambda env: [beta_bash_tool(env), my_custom_tool])
```

```python
from anthropic.lib.tools.agent_toolset import (
    AgentToolContext,
    beta_agent_toolset_20260401,
)

async with AgentToolContext(
    workdir="/workspace", client=client, session_id=work.data.id
) as env:
    # skills downloaded to /workspace/skills/<name>/
    tools = beta_agent_toolset_20260401(env)
```

## Options / Props

CLI flags:

| Flag | Description |
|------|-------------|
| `--environment-id` | Environment to poll. Also reads `ANTHROPIC_ENVIRONMENT_ID` |
| `--environment-key` | Authenticates the worker. Also reads `ANTHROPIC_ENVIRONMENT_KEY` |
| `--workdir` | Directory for skill download and tool file access. Defaults to `.` |
| `--on-work` | Script called per claimed work item (session details as env vars, work item JSON on stdin) |
| `--max-idle` | Wait after the session goes idle with an `end_turn` stop reason before shutting down. Defaults to `60s` |
| `--log-format` | `json` for structured log ingestion. Defaults to `text` |

Environment variables:

| Variable | Description | Set by |
|----------|-------------|--------|
| `ANTHROPIC_ENVIRONMENT_ID` | Environment whose queue the worker serves | You, on the worker host; poller passes it to `--on-work` |
| `ANTHROPIC_ENVIRONMENT_KEY` | Authenticates the worker to its queue | You, on the worker host; poller passes it to `--on-work` |
| `ANTHROPIC_SESSION_ID` | Session a claimed work item represents | The poller, for `--on-work` |
| `ANTHROPIC_WORK_ID` | The claimed work item | The poller, for `--on-work` |
| `ANTHROPIC_WORK_SECRET` | The work item's per-session secret | You; the poller does not set it |
| `ANTHROPIC_BASE_URL` | Overrides the default API endpoint (optional) | You, on the worker host |
| `ANTHROPIC_WEBHOOK_SIGNING_KEY` | Verifies incoming webhook payloads | You, on a webhook handler host |

Host requirements:

| Worker | Requirement |
|--------|-------------|
| All workers | Linux host with `/bin/bash` at that exact path (invoked directly, without `PATH`) |
| TypeScript SDK | `unzip` and `tar` on `PATH`, and Node.js 22 or later |
| Python and Go SDKs | No additional binaries |

Sandbox filesystem:

| Path | Contents |
|------|----------|
| `/workspace` | System default working directory for tool execution and skill download |
| `<workdir>/skills/<name>/` | The agent's downloaded skills |
| `/mnt/memory/<store>/` | One directory per attached memory store at its `mount_path`; created on claim, removed on session end |

SDK helpers (Python, TypeScript, Go):

| Helper | What it does |
|--------|--------------|
| `EnvironmentWorker` | Polling, setup, and execution end to end. Methods: `run()` (go: `Run()`) runs indefinitely; `handle_item()` (typescript: `handleItem()`; go: `HandleItem()`) handles one claimed item. Options: `tools` (go: `ToolsFunc`), `memory_sync_interval`, `memory_sync_deletions` |
| `work.poller()` (go: `environments.NewWorkPoller()`) | Polls the queue and yields each claimed session. Options: `drain`, `block_ms` (1-999; `None`/`null` for non-blocking; default 999 ms long-poll), `reclaim_older_than_ms`, `auto_stop` |
| `client.beta.sessions.events.tool_runner()` (typescript: `toolRunner()`; go: `NewToolRunner()`) | Runs tool calls for a single already-claimed session given the session ID and tool list |

`AgentToolContext` options:

| Option | Description |
|--------|-------------|
| `allowed_roots` (typescript: `allowedRoots`; go: `AllowedRoots`) | Directories, besides the working directory, that file tools (`read`, `write`, `edit`, `glob`, `grep`) can reach |
| `read_only_roots` (typescript: `readOnlyRoots`; go: `ReadOnlyRoots`) | Directories under which `write` and `edit` refuse paths |

## Notes

- On self-hosted environments the system prompt omits the `/mnt/session/outputs` instruction used on Anthropic-managed sandboxes; deliverables land wherever the agent writes them, typically under the working directory.
- If you use a different working directory than `/workspace`, update the agent's system prompt so Claude can locate skill files.
- The CLI and SDK workers preserve executable permissions from the skill bundle when extracting; manual skills download must set them yourself.
- `EnvironmentWorker` adds memory store directories to `allowed_roots` and read-only stores to `read_only_roots`. The confinement is a guardrail for the file tools only, not a sandbox; it does not constrain `bash`.
- `beta_agent_toolset_20260401(env)` (typescript: `betaAgentToolset20260401(ctx)`; go: `agenttoolset.BetaAgentToolset20260401(env)`) returns the standard tools (`bash`, `read`, `write`, `edit`, `glob`, `grep`). TypeScript uses `setupSkills(ctx)`, Go `env.SetupSkills(ctx, client, sessionID)`. C#, Java, PHP, Ruby have no `AgentToolContext`.
- Set `auto_stop` to `false` when whatever runs the work item posts the stop itself (`handle_item()` does, and so does a sandbox you launch that owns the stop call).
- Status: beta (`managed-agents-2026-04-01`).

## Related

- [Self-hosted sandboxes](./self-hosted-sandboxes.md)
- [Deploy self-hosted workers](./self-hosted-sandboxes-workers.md)
- [Custom tools in self-hosted sandboxes](./self-hosted-sandboxes-custom-tools.md)
- [Memory stores in self-hosted sandboxes](./self-hosted-sandboxes-memory.md)
- [Monitor and troubleshoot self-hosted workers](./self-hosted-sandboxes-operations.md)
