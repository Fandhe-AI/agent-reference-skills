<!-- source: https://platform.claude.com/docs/en/managed-agents/workflow-runs / last verified: 2026-10-17 -->

# Follow a Dynamic Workflow Run

Enable dynamic workflows on an agent, then follow each workflow run from its `workflow_run.created` to its `workflow_run.status_ended` on the session's event stream.

Enable `workflows` on the agent (with `multiagent_20261001`, `subagents` is also on by default; add `"subagents": {"type": "disabled"}` for workflows only):

```python
agent = client.beta.agents.create(
    name="Contract Reviewer",
    model="claude-opus-5-5",
    system="You review contracts. When you're asked to review more than a few contracts, start a workflow run that reads them in parallel and combines the findings. Review one or two contracts yourself, without a run.",
    tools=[{"type": "agent_toolset_20260401"}],
    multiagent={"type": "multiagent_20261001", "workflows": {"type": "enabled"}},
)
```

Open the stream, send a message, and track runs until the work is done (`call_tool` is your own tool dispatcher):

```python
import anthropic

open_runs: dict[str, str] = {}  # workflow_run_id -> run name
phase_names: dict[tuple[str, str], str] = {}  # (run ID, phase ID) -> phase name

# Open the stream first, then send the user message
with client.beta.sessions.events.stream(session_id) as stream:
    client.beta.sessions.events.send(
        session_id,
        events=[
            {
                "type": "user.message",
                "content": [
                    {
                        "type": "text",
                        "text": "Which contracts in /contracts have a change-of-control clause?",
                    },
                ],
            },
        ],
    )

    for event in stream:
        match event.type:
            case "workflow_run.created":
                open_runs[event.workflow_run_id] = event.name
                for phase in event.phases:
                    phase_names[event.workflow_run_id, phase.id] = phase.name
                print(f"Run started: {event.name}")
            case "workflow_run.phase_started":
                phase_id = event.workflow_run_phase_id
                key = (event.workflow_run_id, phase_id)
                print(f"  Phase: {phase_names.get(key, phase_id)}")
            case "workflow_run.status_ended":
                name = open_runs.pop(event.workflow_run_id, event.workflow_run_id)
                print(f"Run ended: {name} ({event.result.type})")
            case "agent.custom_tool_use":
                # Answer when the event arrives. A run's thread can wait on your
                # client while the session stays running.
                result = call_tool(event.name, event.input)
                try:
                    client.beta.sessions.events.send(
                        session_id,
                        events=[
                            {
                                "type": "user.custom_tool_result",
                                "custom_tool_use_id": event.id,
                                "content": [{"type": "text", "text": result}],
                            },
                        ],
                    )
                except anthropic.BadRequestError as error:
                    # The server refuses a result that comes too late, after it
                    # archived the call's thread. Keep following the run.
                    print(f"  Answer to {event.name} refused: {error.message}")
            case "session.status_idle":
                # Done when every run has ended and the agent has finished its turn
                if not open_runs and event.stop_reason.type == "end_turn":
                    break
                # An idle with requires_action waits on your client, so keep reading.
                # On any other stop reason, print it and stop.
                if event.stop_reason.type not in ("end_turn", "requires_action"):
                    print(f"Session idle: {event.stop_reason.type}")
                    break
            case "session.status_terminated":
                break
```

## Notes

- A run is open from `workflow_run.created` until `workflow_run.status_ended` (running or idle). `session.status_idle` with `end_turn` alone does not mean the work is done: also require that every run you saw created has ended.
- `result.type` is `completed` even when work on a run's threads failed; the other results are `stopped` and `error` (`timeout_error`, `program_error`, `thread_limit_error`, `unknown_error`). Treat an unrecognized value as a run that ended some other way.
- The sample has no tool-confirmation branch on purpose: a branch allowing every call would turn `always_ask` into always allow. Add one for `agent.tool_use` / `agent.mcp_tool_use` events whose `evaluated_permission` is `ask` if your tools require confirmation.
- Run events arrive only on the stream and the events list (no webhooks) and the stream does not replay missed events; to recover after reconnecting, list events with a `types` filter. A paused run (for example at a session budget) emits `workflow_run.status_idle`; see the session-budget sample.
- Example from the Claude API (platform.claude.com) `managed-agents/workflow-runs` and `managed-agents/multiagent-orchestration` pages.
