# Streaming Responses

Set `stream=True` on `responses.create` to receive server-sent events incrementally instead of waiting for the full response.

```python
from openai import OpenAI

client = OpenAI()

stream = client.responses.create(
    model="gpt-5.6",
    input=[
        {
            "role": "user",
            "content": "Say 'double bubble bath' ten times fast.",
        },
    ],
    stream=True,
)

for event in stream:
    print(event)
```

## Notes

- Each `event.type` corresponds to a distinct lifecycle stage: `response.created`, `response.output_text.delta`, `response.function_call_arguments.delta`, `response.completed`, `response.failed`, etc. Branch on `event.type` rather than assuming a fixed shape.
- For structured-output streaming, use `client.responses.stream(..., text_format=SomeModel)` as a context manager and call `stream.get_final_response()` after the loop to get the fully parsed result.
- When streaming tool calls, accumulate `response.function_call_arguments.delta` events per `output_index` until `response.completed` before parsing the JSON arguments.
- Example from the OpenAI API (developers.openai.com) `guides/streaming-responses` page.
