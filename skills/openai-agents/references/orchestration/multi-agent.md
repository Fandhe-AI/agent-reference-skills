# Multi-agent (Responses API)

Hosted orchestration mode where a root agent spawns and coordinates subagents working in parallel, using six hosted orchestration actions on the Responses API. Beta; available with GPT-6.1 Sol and all GPT-5.6 models (check the model page before enabling). This is a different feature from the Agents API's multi-agent (see the `agents-api` category, `agents-api/multi-agent.md`).

## Signature / Usage

```typescript
import OpenAI from "openai";

const client = new OpenAI();

async function reviewPullRequest(diff: string) {
  const response = await client.beta.responses.create({
    model: "gpt-6.1-sol",
    input:
      "Review the pull-request diff below with three agents: one for " +
      "correctness, one for security, and one for missing tests. " +
      "Reconcile duplicate or conflicting findings, then return a " +
      "prioritized review with file and line references.\n\n" +
      `<diff>\n${diff}\n</diff>`,
    multi_agent: {
      enabled: true,
      max_concurrent_subagents: 3,
    },
    betas: ["responses_multi_agent=v1"],
  });

  return response.output
    .flatMap((item) =>
      item.type === "message" &&
      item.agent?.agent_name === "/root" &&
      item.phase === "final_answer"
        ? item.content
        : []
    )
    .filter((part) => part.type === "output_text")
    .map((part) => part.text)
    .join("");
}
```

```python
from openai import OpenAI

client = OpenAI()


def review_pull_request(diff: str) -> str:
    response = client.beta.responses.create(
        model="gpt-6.1-sol",
        input=(
            "Review the pull-request diff below with three agents: one for "
            "correctness, one for security, and one for missing tests. "
            "Reconcile duplicate or conflicting findings, then return a "
            "prioritized review with file and line references.\n\n"
            f"<diff>\n{diff}\n</diff>"
        ),
        multi_agent={
            "enabled": True,
            "max_concurrent_subagents": 3,
        },
        betas=["responses_multi_agent=v1"],
    )

    return "".join(
        part.text
        for item in response.output
        if (
            item.type == "message"
            and item.agent is not None
            and item.agent.agent_name == "/root"
            and item.phase == "final_answer"
        )
        for part in item.content
        if part.type == "output_text"
    )
```

WebSocket mode: send a `response.inject` event to add a function output to the active response.

```json
{
  "type": "response.inject",
  "response_id": "resp_123",
  "input": [
    {
      "type": "function_call_output",
      "call_id": "call_123",
      "output": "{\"temperature\":72}"
    }
  ]
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `multi_agent.enabled` | boolean | Turns on hosted multi-agent orchestration for the request. |
| `multi_agent.max_concurrent_subagents` | number | Limits simultaneously active subagents across the entire tree (default: 3). No fixed upper bound on total subagents or tree depth. |
| `betas` | string[] | Must include `"responses_multi_agent=v1"` to opt in to the beta. |

### Orchestration actions

| Action | Purpose |
|--------|---------|
| `spawn_agent` | Create a subagent and assign its initial task. |
| `send_message` | Queue a message for an existing agent without starting a new turn. |
| `followup_task` | Assign more work to an existing non-root agent and start or resume its turn. |
| `wait_agent` | Wait for an update in the calling agent's mailbox. |
| `interrupt_agent` | Interrupt another agent's active turn without deleting its context. |
| `list_agents` | Return the current agent tree, statuses, and each agent's `last_task_message`. |

### When to use Multi-agent

| Use Multi-agent when | Prefer one agent when |
|-----------------------|------------------------|
| Work can be split into independent, bounded tasks | Each step depends directly on the previous step |
| Separate context improves focus | The task is small enough to complete in one short run |
| Parallel exploration can reduce wall-clock time | Agents would contend over the same mutable resource |
| Comparing independent findings improves coverage | You require a fixed, deterministic execution graph |

## Notes

- Source: https://developers.openai.com/api/docs/guides/responses-multi-agent (fetched 2026-11-14).
- After `response.inject`, the server replies `response.inject.created` (input validated and accepted) or `response.inject.failed` (inspect `error.code`). Keep reading the WebSocket until the response has completed and every injection has produced one of these two events. Save the response ID from `response.created` and include it in every `response.inject`.
- Add a developer message to tune when the root model should spawn subagents (additive to the injected instructions). Official examples: "Do not spawn subagents unless the user explicitly asks for subagents, delegation, or parallel agent work." / "Proactive Multi-agent delegation is active. Use subagents when parallel work would materially improve speed or quality."
- When enabled, the system appends fixed instructions to the root agent (`/root`) and subagents as a developer message; they cannot be edited or removed, so frame your developer instructions as additive. The root prompt states `{max_concurrent_subagents + 1}` concurrency slots (including the root).
- `max_concurrent_subagents` counts all descendants (children, grandchildren, deeper) but excludes the root. Subagents share the request's model and tools; any agent in the tree may emit a `function_call`, which your application must execute and answer with a matching `function_call_output`.
- With HTTP, the official example loops: stream, collect pending `function_call` items, append `function_call_output` items, and call again until no calls remain (WebSocket instead injects outputs into the active response).
- Related official guides: Function calling, WebSocket mode, Compaction.
- Distinct from the `hermes-agent` skill and from generic "agent" terminology elsewhere in this repository — this page is the OpenAI Responses API's hosted `multi_agent` orchestration feature (`spawn_agent` / `send_message` / `followup_task` / `wait_agent` / `interrupt_agent` / `list_agents`), not a general multi-agent framework.
- Agents are addressed with hierarchical names, e.g. `/root/researcher/tester`.
- WebSocket is recommended for tool-heavy or long-running workflows because the persistent connection reduces latency; with HTTP, the response completes once all active agents finish or pause for a function call, and the application submits tool results in a new request.
- The `/responses/compact` endpoint is not supported when Multi-agent is enabled; `reasoning.summary` and `max_tool_calls` are also unavailable in this mode.
- Function-call results can be injected mid-stream over WebSocket via a `response.inject` event; injection can fail with `response_already_completed` if the response finished before the injection arrived (take the returned `input` and send it in a new `response.create` that continues from the completed response), or with `response_not_found` if the server cannot find the response identified by `response_id` (use the ID from `response.created`). A request that does not conform to the `response.inject` schema gets a generic `400` error and the WebSocket connection is closed.
- Beta SDK calls: use `client.beta.responses.create` with `betas=["responses_multi_agent=v1"]`. For raw HTTP and WebSocket, pass the header `OpenAI-Beta: responses_multi_agent=v1`; the WebSocket connectors do not yet accept the `betas` argument. WebSocket is exposed as `client.beta.responses.connect` (Python) and `ResponsesWS` (TypeScript). Item schemas may change while in beta.
- When `multi_agent.enabled` is `true`, automatic server-side compaction is enabled implicitly, even without `context_management`, and is applied independently to the root agent and each subagent. Override with an explicit `context_management.compact_threshold`.
- The `fork_turns` parameter (seen in `spawn_agent` arguments, e.g. `"fork_turns":"all"`) controls how much context the root or a parent agent propagates to a subagent.
- New output item types: `multi_agent_call` (a hosted action such as `spawn_agent`), `multi_agent_call_output` (its result, linked by `call_id`), and `agent_message` (an encrypted message from one agent to another; `author` / `recipient` give the direction). Do not execute `multi_agent_call` items or submit outputs for them; preserve them if you need replay or tracing.

## Related

- [Handoffs and agents as tools](./handoffs-and-agents-as-tools.md)
- [Background mode](./background-mode.md)
- [Tracing](./tracing.md)
