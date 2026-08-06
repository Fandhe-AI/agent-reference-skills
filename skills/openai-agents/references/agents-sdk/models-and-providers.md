# Models and Providers

Every SDK run resolves a model and a transport. Choose models explicitly, use the standard OpenAI provider path by default, and reach for provider/transport overrides only when needed.

## Signature / Usage

```typescript
import { Agent, Runner } from "@openai/agents";

const fastAgent = new Agent({
  name: "Fast support agent",
  instructions: "Handle routine support questions.",
  model: "gpt-5.6-terra",
});

const generalAgent = new Agent({
  name: "General support agent",
  instructions: "Handle support questions carefully.",
});

const runner = new Runner({ model: "gpt-5.6" });

await runner.run(fastAgent, "Summarize ticket 123.");
const result = await runner.run(generalAgent, "Investigate the billing issue on account 456.");
```

```python
from agents import Agent, RunConfig, Runner

fast_agent = Agent(
    name="Fast support agent",
    instructions="Handle routine support questions.",
    model="gpt-5.6-terra",
)
general_agent = Agent(
    name="General support agent",
    instructions="Handle support questions carefully.",
)

await Runner.run(fast_agent, "Summarize ticket 123.")
result = await Runner.run(
    general_agent,
    "Investigate the billing issue on account 456.",
    run_config=RunConfig(model="gpt-5.6"),
)
```

## Choose the simplest default strategy

| If you need | Start with | Why |
|---|---|---|
| One explicit model per specialist | Set `model` on each agent | Stays readable in code and traces |
| One fallback across a whole process | `OPENAI_DEFAULT_MODEL` env var | Agents that omit `model` still resolve predictably |
| One workflow-level override | A run-level default (`Runner`/`RunConfig`) | Swap models for a script/worker/environment without editing every agent |
| Different model sizes across a workflow | Mix per-agent models | A fast triage agent and a slower deep specialist can coexist |

Start with `gpt-5.6` for most new workflows, moving to a smaller variant only when latency or cost justifies it.

## Providers and transport

| Need | Start with |
|---|---|
| Standard SDK runs on OpenAI | The default OpenAI provider path |
| Many repeated Responses model round trips over a socket | Responses WebSocket transport in the SDK |
| Non-OpenAI models or a mixed-provider stack | The provider/adapter surface in the language-specific SDK docs |

- The Responses WebSocket transport still uses the normal text-and-tools agent loop; it is separate from the voice session path.
- Live audio sessions over WebRTC/WebSocket are for low-latency voice/image interactions (see Voice agents / realtime API guides, out of this skill's scope).

## Model settings, prompts, and feature support

- Use `modelSettings` (TS) / `model_settings` (Python) for tuning: reasoning effort, verbosity, tool behavior.
- Use `prompt` to reference a stored prompt configuration instead of embedding the full system prompt in code.
- Some SDK features depend on the OpenAI Responses path rather than older compatibility surfaces.

## Notes

- Keep the model contract close to the agent definition when intrinsic to that specialist; move it to a workflow-level default only when a group of agents should share the same runtime choice.
- Provider/transport detail beyond the OpenAI default path is language-specific SDK material, not duplicated here.

## Related

- [Agent definitions](./define-agents.md)
- [Running agents](./running-agents.md)
