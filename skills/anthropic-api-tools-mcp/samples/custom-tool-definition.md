<!-- source: https://platform.claude.com/docs/en/agents-and-tools/tool-use/define-tools / last verified: 2026-08-07 -->

# Custom Tool Definition and Round Trip

Define a custom tool's JSON Schema, force its use with `tool_choice`, then parse the `tool_use` block and send back a `tool_result`.

```python
import anthropic

client = anthropic.Anthropic()

tools = [
    {
        "name": "get_weather",
        "description": "Get the current weather in a given location",
        "input_schema": {
            "type": "object",
            "properties": {
                "location": {
                    "type": "string",
                    "description": "The city and state, e.g. San Francisco, CA",
                }
            },
            "required": ["location"],
        },
    }
]

# Step 1: send the request, forcing this specific tool to be used
response = client.messages.create(
    model="claude-opus-5",
    max_tokens=1024,
    tools=tools,
    tool_choice={"type": "tool", "name": "get_weather"},
    messages=[{"role": "user", "content": "What's the weather like in San Francisco?"}],
)

# Step 2: extract the tool_use block (id, name, input)
tool_use_block = next(b for b in response.content if b.type == "tool_use")

# Step 3: run the tool in your codebase, then send a tool_result back
follow_up = client.messages.create(
    model="claude-opus-5",
    max_tokens=1024,
    tools=tools,
    messages=[
        {"role": "user", "content": "What's the weather like in San Francisco?"},
        {"role": "assistant", "content": response.content},
        {
            "role": "user",
            "content": [
                {
                    "type": "tool_result",
                    "tool_use_id": tool_use_block.id,
                    "content": "15 degrees",
                }
            ],
        },
    ],
)

for block in follow_up.content:
    if block.type == "text":
        print(block.text)
```

## Notes

- `name` must match `^[a-zA-Z0-9_-]{1,64}$`; `input_schema` is a standard JSON Schema object.
- `tool_choice: {"type": "tool", "name": "..."}` forces Claude to call that exact tool with no preceding natural-language text.
- The `tool_result` block's `tool_use_id` must match the `id` of the corresponding `tool_use` block, and it must immediately follow it in the message history.
- On error, return `{"content": "...", "is_error": true}` in the `tool_result` instead of raising — Claude retries with corrections 2-3 times.
