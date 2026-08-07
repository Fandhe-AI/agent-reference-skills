# Basic Text Generation

Call the Responses API with a single input string or a message list with `developer`/`user` roles, and read the output via `output_text`.

```python
from openai import OpenAI

client = OpenAI()

response = client.responses.create(
    model="gpt-5.6",
    reasoning={"effort": "low"},
    input=[
        {"role": "developer", "content": "Talk like a pirate."},
        {"role": "user", "content": "Are semicolons optional in JavaScript?"},
    ],
)

print(response.output_text)
```

## Notes

- `input` accepts a plain string or a list of `{role, content}` messages; `instructions` is a shorthand for a single top-level developer message and takes priority over any `developer` message inside `input`.
- `response.output_text` is a convenience accessor; the raw `response.output` array can also contain tool calls and reasoning items, so do not assume text is always at a fixed index.
- Pin `model` to a specific snapshot in production since outputs are non-deterministic across model updates.
- Example from the OpenAI API (developers.openai.com) `guides/text` page.
