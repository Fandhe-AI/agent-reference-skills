<!-- source: https://code.claude.com/docs/en/agent-sdk/quickstart.md / last verified: 2026-08-07 -->

# Minimal Agent

Run a single autonomous task through `query()` with pre-approved tools and stream the resulting messages.

```python
import asyncio
from claude_agent_sdk import query, ClaudeAgentOptions, AssistantMessage, ResultMessage


async def main():
    # Agentic loop: streams messages as Claude works
    async for message in query(
        prompt="Review utils.py for bugs that would cause crashes. Fix any issues you find.",
        options=ClaudeAgentOptions(
            allowed_tools=["Read", "Edit", "Glob"],  # Auto-approve these tools
            permission_mode="acceptEdits",  # Auto-approve file edits
        ),
    ):
        # Print human-readable output
        if isinstance(message, AssistantMessage):
            for block in message.content:
                if hasattr(block, "text"):
                    print(block.text)  # Claude's reasoning
                elif hasattr(block, "name"):
                    print(f"Tool: {block.name}")  # Tool being called
        elif isinstance(message, ResultMessage):
            print(f"Done: {message.subtype}")  # Final result


asyncio.run(main())
```

```typescript
import { query } from "@anthropic-ai/claude-agent-sdk";

// Agentic loop: streams messages as Claude works
for await (const message of query({
  prompt: "Review utils.py for bugs that would cause crashes. Fix any issues you find.",
  options: {
    allowedTools: ["Read", "Edit", "Glob"], // Auto-approve these tools
    permissionMode: "acceptEdits" // Auto-approve file edits
  }
})) {
  // Print human-readable output
  if (message.type === "assistant" && message.message?.content) {
    for (const block of message.message.content) {
      if ("text" in block) {
        console.log(block.text); // Claude's reasoning
      } else if ("name" in block) {
        console.log(`Tool: ${block.name}`); // Tool being called
      }
    }
  } else if (message.type === "result") {
    console.log(`Done: ${message.subtype}`); // Final result
  }
}
```

## Notes

- Prerequisites: Node.js 18+ or Python 3.10+, and an Anthropic account/API key from the Claude Console. Install with `npm install @anthropic-ai/claude-agent-sdk` (+ `tsx` for dev) or `uv add claude-agent-sdk` / `pip install claude-agent-sdk`.
- The SDK reads the key from the environment of the process that runs the agent; it doesn't load `.env` files automatically.
- `permissionMode: "acceptEdits"` auto-approves file edits; combine with a narrow `allowedTools` list to keep the run scoped (`Read`/`Glob`/`Grep` for read-only analysis, `Read`/`Edit`/`Glob` to also modify files, `Read`/`Edit`/`Bash`/`Glob`/`Grep` for full automation).
- `query` is the main entry point creating the agentic loop; it returns an async iterator. The loop ends when Claude finishes the task or hits an error.
