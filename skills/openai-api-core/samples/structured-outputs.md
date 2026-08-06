# Structured Outputs with Pydantic

Force a model response to conform to a Pydantic schema using `responses.parse`, and read the typed result via `output_parsed`.

```python
from openai import OpenAI
from pydantic import BaseModel

client = OpenAI()


class CalendarEvent(BaseModel):
    name: str
    date: str
    participants: list[str]


response = client.responses.parse(
    model="gpt-5.6",
    input=[
        {"role": "system", "content": "Extract the event information."},
        {
            "role": "user",
            "content": "Alice and Bob are going to a science fair on Friday.",
        },
    ],
    text_format=CalendarEvent,
)

event = response.output_parsed
```

## Notes

- `responses.parse` (SDK-side helper) accepts a Pydantic model via `text_format`; the raw API equivalent is `text={"format": {"type": "json_schema", "name": ..., "schema": ..., "strict": True}}` with `response.output_text` parsed manually.
- All schema fields must be marked required and `additionalProperties: false` must be set on every object for `strict: True` to be accepted.
- Always check `output.content[i].type == "refusal"` before reading `parsed`/`text`, and check `response.status == "incomplete"` (e.g. `incomplete_details.reason == "max_output_tokens"`) to detect truncated JSON.
- Example from the OpenAI API (developers.openai.com) `guides/structured-outputs` page.
