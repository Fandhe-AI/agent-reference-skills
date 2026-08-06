# Code Interpreter

Hosted `code_interpreter` tool: lets the model write and run Python in a sandboxed container to solve data analysis, coding, and math problems, and to boost visual intelligence for reasoning models by cropping/zooming/rotating images. Internally the model refers to this as the "python tool".

## Signature / Usage

```python
from openai import OpenAI

client = OpenAI()

instructions = """
You are a personal math tutor. When asked a math question,
write and run code using the python tool to answer the question.
"""

resp = client.responses.create(
    model="gpt-5.6",
    tools=[
        {
            "type": "code_interpreter",
            "container": {"type": "auto", "memory_limit": "4g"},
        }
    ],
    instructions=instructions,
    input="I need to solve the equation 3x + 11 = 14. Can you help me?",
)

print(resp.output)
```

Explicit container creation:

```bash
curl https://api.openai.com/v1/containers \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
        "name": "My Container",
        "memory_limit": "4g"
      }'
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `container` | `{type: "auto", memory_limit?, file_ids?}` \| `string` | Auto-creates/reuses a container, or pass an explicit container `id` created via `/v1/containers` |
| `memory_limit` | `"1g" \| "4g" \| "16g" \| "64g"` | Default `1g`; applies for the container's entire lifetime; billed per built-in-tools pricing |

## Notes

- A container is a fully sandboxed VM. It expires after 20 minutes of inactivity; expired containers cannot be reactivated — create a new one and re-upload files. Treat containers as ephemeral; download needed files while active.
- Model-generated files (plots, CSVs) appear as `container_file_citation` annotations (`container_id`, `file_id`, `filename`) on the next message; download via the container files content endpoint.
- Files included in model input are auto-uploaded to the container.
- Supports 30+ file formats (`.py`, `.csv`, `.json`, `.pdf`, `.xlsx`, images, `.zip`, etc.) with documented MIME types.
- Available via Responses, Chat Completions, and Assistants (legacy) APIs; rate limit 100 RPM per org.

## Related

- [Shell](./shell.md)
