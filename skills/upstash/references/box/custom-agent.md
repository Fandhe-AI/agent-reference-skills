# Custom Agent (Agent.Custom / customHarness / runCustomHarness)

Bring your own agent process to a box. The box still provides sandbox, filesystem, shell, git, logs, streaming, and console; your code decides how to call the model and produce output. Use when built-in Claude Code, Codex, OpenCode, or Cursor agents do not fit.

## Signature / Usage

```typescript
import { Agent, Box } from "@upstash/box"

const box = await Box.create({
  apiKey: process.env.UPSTASH_BOX_API_KEY!,
  runtime: "node",
  agent: {
    harness: Agent.Custom,
    model: "claude-haiku-4-5-20251001",
    customHarness: {
      command: "node",
      args: ["/workspace/home/custom-anthropic-agent.mjs"],
      protocol: "box-sse-v1",
    },
  },
  env: { ANTHROPIC_API_KEY: process.env.ANTHROPIC_API_KEY! },
})

await box.files.write({ path: "custom-anthropic-agent.mjs", content: agentSource })
const result = await box.agent.run({ prompt: "Say hello from my custom agent" })
console.log(result.result)

// update the command on an existing custom box
await box.configureCustomHarness({
  command: "node",
  args: ["/workspace/home/another-agent.mjs"],
  protocol: "box-sse-v1",
})
```

SDK helper (inside the harness process):

```typescript
import { runCustomHarness } from "@upstash/box"

await runCustomHarness(async ({ prompt, model, sessionId }, emit) => {
  emit.tool({ name: "my_agent", input: { model } })
  const output = `received: ${prompt}`
  emit.text(output)
  return {
    output,
    inputTokens: prompt.split(/\s+/).length,
    outputTokens: output.split(/\s+/).length,
    sessionId,
  }
})
```

```python
box = Box.create(
    runtime="node",
    agent={
        "harness": Agent.CUSTOM,
        "model": "claude-haiku-4-5-20251001",
        "custom_harness": {"command": "node", "args": ["/workspace/home/custom-anthropic-agent.mjs"], "protocol": "box-sse-v1"},
    },
    env={"ANTHROPIC_API_KEY": os.environ["ANTHROPIC_API_KEY"]},
)
box.configure_custom_harness({
    "command": "node",
    "args": ["/workspace/home/another-agent.mjs"],
    "protocol": "box-sse-v1",
})
# harness side: from upstash_box import run_custom_harness, CustomHarnessDone
```

## Options / Props

For each `box.agent.run()` / `box.agent.stream()` the box executes the command and appends:

```bash
-p "<prompt>" --model "<model>" --stream --session "<session-id>"
```

`--session` is only included when a prior session exists. The process writes Server-Sent Events to stdout using the `box-sse-v1` protocol:

```txt
event: text
data: {"text":"Hello"}

event: done
data: {"output":"Hello","input_tokens":10,"output_tokens":4,"total_cost_usd":0.0001,"session_id":"session-1"}
```

| Event | Description |
|---|---|
| `text` | Adds text to the visible response |
| `thinking` | Emits reasoning/thinking text |
| `tool` | Shows a tool call in logs |
| `tool_result` | Shows a tool result in logs |
| `done` | Finishes the run successfully |
| `error` | Finishes the run with an error |

## Notes

- Custom agents do not use managed provider keys; pass secrets through `env` on `Box.create()` or configure them inside the box
- The command must be a binary name from `PATH` or an absolute path under `/workspace/home/` or `/home/boxuser/`; it runs as `boxuser` inside the existing sandbox
- `configureCustomHarness` only works for boxes created with `agent.harness: Agent.Custom`
- Ready-to-run examples for Pi, Gemini, Copilot CLI, Aider, Goose, Amp, CrewAI, Pydantic AI are summarized in the Custom Harness Examples page
- Source: https://upstash.com/docs/box/overall/custom-agent (fetched 2026-10-17; no version pin on the site).

## Related

- [Custom Harness Examples](./custom-harness-examples.md)
- [Agent](./agent.md)
