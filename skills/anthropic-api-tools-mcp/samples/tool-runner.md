<!-- source: https://platform.claude.com/docs/en/agents-and-tools/tool-use/tool-runner / last verified: 2026-08-07 -->

# Tool Runner (SDK) Agentic Loop

Let the SDK's beta tool runner drive the agentic loop automatically instead of manually parsing `tool_use` blocks and appending `tool_result` messages.

```python
import json
from anthropic import Anthropic, beta_tool

client = Anthropic()


@beta_tool
def get_weather(location: str, unit: str = "fahrenheit") -> str:
    """Get the current weather in a given location.

    Args:
        location: The city and state, e.g. San Francisco, CA
        unit: Temperature unit, either 'celsius' or 'fahrenheit'
    """
    return json.dumps({"temperature": "20°C", "condition": "Sunny"})


@beta_tool
def calculate_sum(a: int, b: int) -> str:
    """Add two numbers together.

    Args:
        a: First number
        b: Second number
    """
    return str(a + b)


runner = client.beta.messages.tool_runner(
    model="claude-opus-5",
    max_tokens=1024,
    tools=[get_weather, calculate_sum],
    messages=[
        {
            "role": "user",
            "content": "What's the weather like in Paris? Also, what's 15 + 27?",
        }
    ],
)
final_message = runner.until_done()
for block in final_message.content:
    if block.type == "text":
        print(block.text)
```

```typescript
import Anthropic from "@anthropic-ai/sdk";
import { betaZodTool } from "@anthropic-ai/sdk/helpers/beta/zod";
import { z } from "zod";

const client = new Anthropic();

const getWeatherTool = betaZodTool({
  name: "get_weather",
  description: "Get the current weather in a given location",
  inputSchema: z.object({
    location: z.string().describe("The city and state, e.g. San Francisco, CA"),
    unit: z.enum(["celsius", "fahrenheit"]).default("fahrenheit").describe("Temperature unit")
  }),
  run: async (input) => {
    return JSON.stringify({ temperature: "20°C", condition: "Sunny" });
  }
});

const finalMessage = await client.beta.messages.toolRunner({
  model: "claude-opus-5",
  max_tokens: 1024,
  tools: [getWeatherTool],
  messages: [{ role: "user", content: "What's the weather like in Paris?" }]
});

for (const block of finalMessage.content) {
  if (block.type === "text") {
    console.log(block.text);
  }
}
```

## Notes

- The Python `@beta_tool` decorator derives the JSON Schema from function type hints and the docstring's `Args:` section.
- TypeScript's `betaZodTool()` (Zod-validated) and `betaTool()` (JSON Schema, unvalidated) are the two ways to define runner tools; use `client.beta.messages.toolRunner()` with either.
- `runner.until_done()` (Python) / `await runner` (TypeScript) returns the final message after all tool calls resolve; iterate the runner directly (`for message in runner`) to observe each turn.
- Tool exceptions are caught automatically and returned to Claude as `is_error: true` results; use the manual loop (`handle-tool-calls`) instead when you need human-in-the-loop approval or custom logging.
