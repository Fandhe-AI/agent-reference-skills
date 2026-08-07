# Results and State

The result of an agent run is more than the final answer: it's also the handoff boundary, the next-turn continuation surface, and the resumable snapshot when a run pauses for review.

## Signature / Usage

```typescript
import { Agent, run } from "@openai/agents";

const agent = new Agent({ name: "Tour guide", instructions: "Answer with compact travel facts." });
const result = await run(agent, "What city is the Golden Gate Bridge in?");

console.log(result.finalOutput);
console.log(result.lastAgent);
console.log(result.history);
```

```python
from agents import Agent, Runner

agent = Agent(name="Tour guide", instructions="Answer with compact travel facts.")
result = await Runner.run(agent, "What city is the Golden Gate Bridge in?")

print(result.final_output)
print(result.last_agent)
print(result.to_input_list())
```

## Options / Props

| If you need | Use |
|---|---|
| The final answer to show the user | `finalOutput` (TS) / `final_output` (Python) |
| Local replay-ready history | `history` (TS) / `to_input_list()` (Python) |
| The specialist that should usually own the next turn | `lastAgent` (TS) / `last_agent` (Python) |
| OpenAI-managed response chaining | `lastResponseId` (TS) / `last_response_id` (Python) |
| Pending approvals and a resumable snapshot | `interruptions` plus `state` (TS) / `to_state()` (Python) |

Richer run items, raw model responses, and detailed diagnostics belong to the SDK's deeper reference material (item-level tool/handoff records, guardrail results, usage details) — useful for audits and debugging, not the first thing to learn.

## What to carry into the next turn

- If your application owns full local history: reuse `history` (TS) / `to_input_list()` (Python).
- If using a session: keep passing the same session; the SDK loads/persists history for you.
- If using server-managed continuation: pass only the new user input and reuse the stored ID instead of replaying the full transcript.
- After handoffs: reuse `lastAgent` / `last_agent` when that specialist should stay in control for the next turn.

## Interrupted runs return state, not a final answer

Approval flows are the main case where a result is intentionally incomplete.

- `finalOutput` / `final_output` can stay empty because the run hasn't actually finished.
- `interruptions` tells you which pending tool calls need a decision.
- `state` (TS) / `to_state()` (Python) is the saved snapshot you pass back into the runtime after approving or rejecting those items.

That same `state` surface is what you serialize when a review might happen later rather than in the same request.

## Notes

- The SDK also exposes richer run items and diagnostics (item-level tool/handoff records, raw model responses, guardrail results, usage) for audits and custom interfaces — not required for basic usage.
- Guardrail/approval workflow design belongs to this skill's `orchestration` scope; this page covers only the result/state surfaces produced by a run.

## Related

- [Running agents](./running-agents.md)
- [Quickstart](./quickstart.md)
