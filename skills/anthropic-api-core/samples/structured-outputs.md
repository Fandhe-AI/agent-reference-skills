<!-- source: https://platform.claude.com/docs/en/build-with-claude/structured-outputs / last verified: 2026-08-07 -->

# JSON Outputs with output_config.format

Force Claude's response to conform to a JSON Schema using `output_config.format`, and read the guaranteed-valid JSON from the response's text content block.

```python
client = anthropic.Anthropic()

response = client.messages.create(
    model="claude-opus-5",
    max_tokens=1024,
    messages=[
        {
            "role": "user",
            "content": "Extract the key information from this email: John Smith (john@example.com) is interested in our Enterprise plan and wants to schedule a demo for next Tuesday at 2pm.",
        }
    ],
    output_config={
        "format": {
            "type": "json_schema",
            "schema": {
                "type": "object",
                "properties": {
                    "name": {"type": "string"},
                    "email": {"type": "string"},
                    "plan_interest": {"type": "string"},
                    "demo_requested": {"type": "boolean"},
                },
                "required": ["name", "email", "plan_interest", "demo_requested"],
                "additionalProperties": False,
            },
        }
    },
)
print(next(block.text for block in response.content if block.type == "text"))
```

```typescript
const client = new Anthropic();

const response = await client.messages.create({
  model: "claude-opus-5",
  max_tokens: 1024,
  messages: [
    {
      role: "user",
      content:
        "Extract the key information from this email: John Smith (john@example.com) is interested in our Enterprise plan and wants to schedule a demo for next Tuesday at 2pm."
    }
  ],
  output_config: {
    format: {
      type: "json_schema",
      schema: {
        type: "object",
        properties: {
          name: { type: "string" },
          email: { type: "string" },
          plan_interest: { type: "string" },
          demo_requested: { type: "boolean" }
        },
        required: ["name", "email", "plan_interest", "demo_requested"],
        additionalProperties: false
      }
    }
  }
});

for (const block of response.content) {
  if (block.type === "text") {
    console.log(block.text);
  }
}
```

Response text block content:

```json
{
  "name": "John Smith",
  "email": "john@example.com",
  "plan_interest": "Enterprise",
  "demo_requested": true
}
```

## Notes

- `output_config.format` with `type: "json_schema"` controls the shape of Claude's own text response; it is independent of tool calling — the response still arrives as a normal `text` content block, just guaranteed to match the schema.
- Combining structured outputs with strict tool use (`tools[].strict: true`) is possible in the same request but is a tool-use topic; see the `anthropic-api-tools-mcp` skill for tool definitions and the agentic tool-call loop.
- Example from the Claude API (platform.claude.com) `build-with-claude/structured-outputs` page.
