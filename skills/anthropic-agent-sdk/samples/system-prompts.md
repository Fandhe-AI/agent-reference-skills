<!-- source: https://code.claude.com/docs/en/agent-sdk/modifying-system-prompts.md / last verified: 2026-08-07 -->

# Use the claude_code Preset with an Appended Instruction

Select the built-in `claude_code` system prompt preset and layer a custom instruction on top with `append`, instead of writing a fully custom prompt.

```typescript
import { query } from "@anthropic-ai/claude-agent-sdk";

const messages = [];

for await (const message of query({
  prompt: "Help me write a Python function to calculate fibonacci numbers",
  options: {
    systemPrompt: {
      type: "preset",
      preset: "claude_code",
      append: "Always include detailed docstrings and type hints in Python code."
    }
  }
})) {
  messages.push(message);
  if (message.type === "assistant") {
    console.log(message.message.content);
  }
}
```

```python
import asyncio

from claude_agent_sdk import query, ClaudeAgentOptions, AssistantMessage

messages = []


async def main():
    async for message in query(
        prompt="Help me write a Python function to calculate fibonacci numbers",
        options=ClaudeAgentOptions(
            system_prompt={
                "type": "preset",
                "preset": "claude_code",
                "append": "Always include detailed docstrings and type hints in Python code.",
            }
        ),
    ):
        messages.append(message)
        if isinstance(message, AssistantMessage):
            print(message.content)


asyncio.run(main())
```

## Notes

- Omitting `systemPrompt` uses a minimal prompt (tool calling only) — this differs from `claude -p`, which defaults to the full Claude Code prompt.
- Decision guide: CLI/IDE-like coding tool → `claude_code` preset; same plus product rules → preset + `append`; different surface/identity/permission model or non-coding agent → custom string; thin tool-calling loop → no `systemPrompt` option.
- CLAUDE.md is injected into the conversation as project context regardless of which system prompt is chosen (not loaded when `settingSources` is `[]`); it is independent from `systemPrompt`.
- `excludeDynamicSections`/`exclude_dynamic_sections: true` moves per-session context (cwd, git flag, platform, shell, OS, memory paths) out of the system prompt into the first user message, enabling cross-session/cross-machine prompt cache reuse; requires SDK v0.2.98+ (TS) / v0.1.58+ (Python) and the preset-object form only.
