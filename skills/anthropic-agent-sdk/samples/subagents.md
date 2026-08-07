<!-- source: https://code.claude.com/docs/en/agent-sdk/subagents.md / last verified: 2026-08-07 -->

# Define and Invoke a Subagent

Declare a specialized subagent programmatically via `options.agents` and let the main agent spawn it through the `Agent` tool.

```typescript
import { query } from "@anthropic-ai/claude-agent-sdk";

for await (const message of query({
  prompt: "Review the authentication module for security issues",
  options: {
    // Auto-approve these tools, including Agent for subagent invocation
    allowedTools: ["Read", "Grep", "Glob", "Agent"],
    agents: {
      "code-reviewer": {
        // description tells Claude when to use this subagent
        description:
          "Expert code review specialist. Use for quality, security, and maintainability reviews.",
        // prompt defines the subagent's behavior and expertise
        prompt: `You are a code review specialist with expertise in security, performance, and best practices.

When reviewing code:
- Identify security vulnerabilities
- Check for performance issues
- Verify adherence to coding standards
- Suggest specific improvements

Be thorough but concise in your feedback.`,
        // tools restricts what the subagent can do (read-only here)
        tools: ["Read", "Grep", "Glob"],
        // model overrides the default model for this subagent
        model: "sonnet"
      }
    }
  }
})) {
  if ("result" in message) console.log(message.result);
}
```

```python
import asyncio
from claude_agent_sdk import query, ClaudeAgentOptions, AgentDefinition


async def main():
    async for message in query(
        prompt="Review the authentication module for security issues",
        options=ClaudeAgentOptions(
            # Auto-approve these tools, including Agent for subagent invocation
            allowed_tools=["Read", "Grep", "Glob", "Agent"],
            agents={
                "code-reviewer": AgentDefinition(
                    # description tells Claude when to use this subagent
                    description="Expert code review specialist. Use for quality, security, and maintainability reviews.",
                    # prompt defines the subagent's behavior and expertise
                    prompt="""You are a code review specialist with expertise in security, performance, and best practices.

When reviewing code:
- Identify security vulnerabilities
- Check for performance issues
- Verify adherence to coding standards
- Suggest specific improvements

Be thorough but concise in your feedback.""",
                    # tools restricts what the subagent can do (read-only here)
                    tools=["Read", "Grep", "Glob"],
                    # model overrides the default model for this subagent
                    model="sonnet",
                ),
            },
        ),
    ):
        if hasattr(message, "result"):
            print(message.result)


asyncio.run(main())
```

## Notes

- Include `Agent` in `allowedTools` so subagent invocations auto-approve without a permission prompt (the tool was renamed from `"Task"` to `"Agent"` in Claude Code v2.1.63).
- A subagent's context starts fresh — only the `Agent` tool's prompt string, its own `prompt` (system prompt), and project CLAUDE.md; it does not receive the parent's conversation history or system prompt.
- Subagents can also be defined as filesystem markdown files under `.claude/agents/`; programmatic `agents` definitions take precedence over filesystem agents with the same name. By default subagents can spawn subagents up to three layers deep (`CLAUDE_CODE_MAX_SUBAGENT_SPAWN_DEPTH`).
- Programmatic `agents` definitions and `.claude/agents/` files are both Agent SDK subagent mechanisms. Invoking the same filesystem-format subagents from the Claude Code CLI terminal is documented under anthropic-claude-code-extend, as is the `skills` field's underlying Skills mechanism.
