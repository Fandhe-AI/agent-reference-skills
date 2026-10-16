<!-- source: https://code.claude.com/docs/en/agent-sdk/configuration.md / last verified: 2026-10-17 -->

# Configure an Agent Session

Compose the `options` object (`model` / `allowedTools` / `maxTurns` / `cwd`) and switch model and permission mode mid-session.

```typescript
import { query } from "@anthropic-ai/claude-agent-sdk";

for await (const message of query({
  prompt: "Summarize the open TODOs in this repo",
  options: {
    model: "claude-sonnet-5",
    allowedTools: ["Read", "Glob", "Grep"],
    maxTurns: 8,
    cwd: "/path/to/repo",
  },
})) {
  if (message.type === "result" && message.subtype === "success" && !message.is_error) {
    console.log(message.result);
  }
}
```

```python
import asyncio

from claude_agent_sdk import ClaudeAgentOptions, ResultMessage, query

async def main():
    options = ClaudeAgentOptions(
        model="claude-sonnet-5",
        allowed_tools=["Read", "Glob", "Grep"],
        max_turns=8,
        cwd="/path/to/repo",
    )

    async for message in query(
        prompt="Summarize the open TODOs in this repo",
        options=options,
    ):
        if isinstance(message, ResultMessage) and not message.is_error:
            print(message.result)

asyncio.run(main())
```

Mid-session setters (Python: `ClaudeSDKClient` with `set_model()` / `set_permission_mode()`):

```typescript
import { query, type SDKUserMessage } from "@anthropic-ai/claude-agent-sdk";

function userMessage(text: string): SDKUserMessage {
  return { type: "user", message: { role: "user", content: text }, parent_tool_use_id: null };
}

// Hold the second prompt until the setters have run.
let startSecondTurn!: () => void;
const secondTurnReady = new Promise<void>((resolve) => {
  startSecondTurn = resolve;
});

async function* turnPrompts(): AsyncGenerator<SDKUserMessage, void> {
  yield userMessage("Reply with exactly: ready");
  await secondTurnReady;
  yield userMessage("Reply with exactly: done");
}

const session = query({
  prompt: turnPrompts(),
  options: {
    model: "claude-sonnet-5",
  },
});

let turnModel = "";
let completedTurns = 0;

for await (const message of session) {
  if (message.type === "assistant") {
    turnModel = message.message.model;
  } else if (message.type === "result") {
    completedTurns += 1;
    if (completedTurns === 1) {
      console.log(`First turn model: ${turnModel}`);
      await session.setModel("claude-opus-5");
      await session.setPermissionMode("acceptEdits");
      startSecondTurn();
    } else {
      console.log(`Second turn model: ${turnModel}`);
      break;
    }
  }
}
```

## Notes

- `allowedTools` / `allowed_tools` pre-approves the listed tools; tools outside the list stay available and the permission mode decides whether they run.
- `maxTurns` / `max_turns`: `0` runs without a turn limit, the same as leaving it unset. Hitting a cap ends the run with a result subtype `error_max_turns` (or `error_max_budget_usd` for `maxBudgetUsd`).
- The setters require streaming input. In TypeScript they are methods on the object `query()` returns; in Python they are methods on `ClaudeSDKClient`, since `query()` returns a plain iterator.
- `setModel()` with no model switches to Claude Code's default model, not the `model` passed in options.
