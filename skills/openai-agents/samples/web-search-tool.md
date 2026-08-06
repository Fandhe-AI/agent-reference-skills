# Web Search Built-in Tool

Let the model search the web for current information via the `web_search` built-in tool.

```python
from openai import OpenAI

client = OpenAI()

response = client.responses.create(
    model="gpt-5.6",
    tools=[{"type": "web_search"}],
    input="What was a positive news story from today?",
)

print(response.output_text)
```

## Notes

- `web_search` is a hosted tool executed by OpenAI infrastructure; no local tool implementation is required.
- The model chooses whether to search based on the prompt; set `tool_choice: "required"` to force a search on every call.
- Responses include inline citations pointing to the source pages used.
