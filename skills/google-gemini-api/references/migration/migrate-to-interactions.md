---
source: https://ai.google.dev/gemini-api/docs/migrate-to-interactions
---

# Migrating to the Interactions API

Guide for migrating from the `generateContent` API to the Interactions API. `generateContent` remains fully supported, but the Interactions API is recommended for all new development.

## Signature / Usage

Before (`generateContent`, stateless; output wrapped in `candidates` / `content` / `parts`):

```python
from google import genai

client = genai.Client()

response = client.models.generate_content(
    model="gemini-2.5-flash-lite", contents="Tell me a joke."
)
print(response.text)
```

After (Interactions API; `.output_text` convenience property on the returned `Interaction`):

```python
from google import genai

client = genai.Client()

interaction = client.interactions.create(
    model="gemini-3.8-flash", input="Tell me a joke."
)
print(interaction.output_text)
```

Multi-turn: server-side state via `previous_interaction_id` instead of the `chats` helper or a manual `contents` array.

```python
interaction1 = client.interactions.create(
    model="gemini-3.8-flash", input="Hi, my name is Phil."
)
print("Response 1:", interaction1.output_text)

interaction2 = client.interactions.create(
    model="gemini-3.8-flash",
    previous_interaction_id=interaction1.id,
    input="What is my name?",
)
print("Response 2:", interaction2.output_text)
```

Structured output: `response_mime_type` / `response_schema` in `config` move to a top-level `response_format` array.

```python
from pydantic import BaseModel

class Recipe(BaseModel):
    recipe_name: str
    ingredients: list[str]

interaction = client.interactions.create(
    model="gemini-3.8-flash",
    input="Give me a recipe for chocolate chip cookies.",
    response_format=[
        {
            "type": "text",
            "mime_type": "application/json",
            "schema": Recipe.model_json_schema(),
        }
    ],
)

print(interaction.output_text)
```

Function calling: calls and results are distinct `steps`; the result is sent back with `previous_interaction_id` and a `function_result` input.

```python
weather_tool = {
    "type": "function",
    "name": "get_weather",
    "description": "Gets weather",
    "parameters": {
        "type": "object",
        "properties": {
            "location": {"type": "string"}
        },
    },
}

interaction = client.interactions.create(
    model="gemini-3.8-flash",
    input="What's the weather in Boston?",
    tools=[weather_tool],
)

function_results = []
for step in interaction.steps:
    if step.type == "function_call":
        print(f"Executing {step.name} for {step.arguments}")

        result = "52°F and rain"

        function_results.append(
            {
                "type": "function_result",
                "call_id": step.id,
                "name": step.name,
                "result": [{"type": "text", "text": result}],
            }
        )

if function_results:
    follow_up = client.interactions.create(
        model="gemini-3.8-flash",
        previous_interaction_id=interaction.id,
        tools=[weather_tool],
        input=function_results,
    )
    print(follow_up.output_text)
```

Streaming: same endpoint with `stream=True` (no dedicated `:streamGenerateContent`); events are `step.delta` / `interaction.completed` etc.

```python
stream = client.interactions.create(
    model="gemini-3.8-flash",
    input="Tell me a story",
    stream=True,
)

for event in stream:
    if event.event_type == "step.delta" and event.delta:
        if getattr(event.delta, "type", None) == "text" and getattr(event.delta, "text", None):
            print(event.delta.text, end="", flush=True)
    elif event.event_type == "interaction.completed":
        print(f"\n\n--- Stream Finished ---")
```

## Options / Props

Why migrate (from the source):

| Benefit | Description |
|---------|-------------|
| Server-side history management | Simplified multi-turn flows via `previous_interaction_id`. The server enables state by default (`store=true`); set `store=false` for stateless behavior. |
| Observable execution steps | Typed steps make it easy to debug complex flows and render UI for intermediate events (thoughts, search widgets). |
| Tool use and agentic workflows | Native support for multi-step tool use, orchestration, and complex reasoning via typed execution steps. |
| Long-running and background tasks | Offload time-intensive operations such as Deep Think and Deep Research with `background=true`. |

Mapping between the two APIs (as shown in the guide):

| Topic | `generateContent` | Interactions API |
|-------|-------------------|------------------|
| Single turn | `client.models.generate_content(model=, contents=)` / `response.text` | `client.interactions.create(model=, input=)` / `interaction.output_text` |
| Multi-turn | `client.chats.create(...)` + `send_message`, or manual `contents` history | `previous_interaction_id=<prev>.id` |
| Structured output | `config=types.GenerateContentConfig(response_mime_type=..., response_schema=...)` | `response_format=[{"type": "text", "mime_type": "application/json", "schema": ...}]` |
| Generated media | `inlineData` in `candidates[].content.parts` | `{"type": "image", "mime_type": ..., "data": ...}` items in the `content` array of a `model_output` step |
| Server-side tools (Google Search) | `google_search` grounding metadata | `google_search_call` / `google_search_result` steps; citations inline in `annotations` on the text item |
| Function calling | function call parts in candidates | `function_call` steps; reply with `function_result` input |
| Streaming | `generate_content_stream` / `:streamGenerateContent` | same endpoint, `stream=True`; SSE events `step.delta`, `interaction.completed` |

## Notes

- Availability: Interactions API (v1 and v1beta). The guide's "After" examples use model `gemini-3.8-flash`; "Before" examples use `gemini-2.5-flash-lite` (model IDs transcribed as in the source).
- `.output_text` extracts and joins consecutive `TextContent` blocks at the end of the model's response. It does not include earlier text blocks separated by non-text content (thoughts, images, audio, tool calls); for interleaved multimodal responses iterate over `steps` instead. Other convenience properties (`.output_image`, `.output_audio`) are described in the Interactions overview.
- Server-side tool citations are returned inline: the text item in the `model_output` step carries its own `annotations` array instead of a separate metadata object. The source Python sample reads `anno.uri`; the Interactions schema `UrlCitation` field is `url` (with `title`, `start_index`, `end_index`), as the May 2026 breaking-changes page shows with `type: url_citation`.
- The source omits `tools` on the function_result follow-up call; tools are interaction-scoped and not carried over by `previous_interaction_id`, so `tools=[weather_tool]` is re-specified here. The first `interactions.create` call and the `weather_tool` definition are restored from the source.
- The source sends one follow-up per function_call inside the loop; here all function_result items are collected and returned in a single request against the original interaction.id, matching get-started.md and the call/result count requirement.
- The schema of the Interactions API itself changed in May 2026 (`steps` replaces `outputs`, `response_format` is polymorphic). See `interactions-breaking-changes-may-2026.md` in this category.
- The source suggests automating the migration with a coding agent that supports skills by installing the Gemini API development skill (`/gemini-api/docs/coding-agents#gemini-api-dev`) and running `/gemini-api-dev migrate my app to the interactions api`. That skill is Gemini-side tooling, not a skill of this repository and not a Claude Code Agent Skill (see anthropic-claude-code-extend).
- Distance from other LLM APIs: the Interactions API is Gemini-specific; for OpenAI Responses API see openai-api-core, for Claude Messages API see anthropic-api-core.

## Related

- [interactions-breaking-changes-may-2026.md](./interactions-breaking-changes-may-2026.md)
- [api-versions.md](./api-versions.md)
- [migrate-genai-sdk.md](./migrate-genai-sdk.md)
