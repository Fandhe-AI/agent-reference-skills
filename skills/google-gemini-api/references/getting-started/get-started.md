---
source: https://ai.google.dev/gemini-api/docs/get-started
---

# Getting started (Interactions API)

Quickstart for the Gemini API using the Interactions API: API key, SDK install, first call, streaming, multi-turn, multimodal, structured output, tools, function calling, managed agents, and background execution.

## Signature / Usage

Install and first call (Python):

```bash
pip install -U google-genai
```

```python
from google import genai

client = genai.Client()

interaction = client.interactions.create(
    model="gemini-3.8-flash",
    input="Explain how AI works in a few words"
)
print(interaction.output_text)
```

JavaScript:

```bash
npm install @google/genai
```

```javascript
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({});

const interaction = await ai.interactions.create({
  model: "gemini-3.8-flash",
  input: "Explain how AI works in a few words",
});
console.log(interaction.output_text);
```

REST:

```bash
curl -X POST "https://generativelanguage.googleapis.com/v1beta/interactions" \
  -H "x-goog-api-key: $GEMINI_API_KEY" \
  -H 'Content-Type: application/json' \
  -d '{
    "model": "gemini-3.8-flash",
    "input": "Explain how AI works in a few words"
  }'
```

Response (REST returns the full `Interaction` resource):

```json
{
  "id": "v1_ChdpQUFvYXI...",
  "status": "completed",
  "usage": {
    "total_tokens": 197,
    "total_input_tokens": 8,
    "total_output_tokens": 12
  },
  "created": "2026-06-09T12:01:25Z",
  "steps": [
    {
      "type": "thought",
      "signature": "EvEFCu4FAQw..."
    },
    {
      "type": "model_output",
      "content": [
        {
          "type": "text",
          "text": "AI learns patterns from data, then uses those patterns to make predictions or decisions on new data."
        }
      ]
    }
  ],
  "object": "interaction",
  "model": "gemini-3.8-flash",
}
```

Set the key as an environment variable:

```bash
export GEMINI_API_KEY="YOUR_API_KEY"
```

Steps in the guide:

| Step | Topic | Key parameter / API |
|------|-------|---------------------|
| 1 | Get an API key | AI Studio, `GEMINI_API_KEY` |
| 2 | Install the SDK and first call | `client.interactions.create(model=..., input=...)` |
| 3 | Stream the response | `stream=True`, `step.delta` events |
| 4 | Multi-turn conversations | Stateful: `previous_interaction_id`; stateless: pass all previous turns |
| 5 | Multimodal understanding | `input=[{"type": "text"...}, {"type": "image", "data"/"uri", "mime_type"}...]` |
| 6 | Multimodal generation | `model="gemini-3.1-flash-image"`, `interaction.output_image` |
| 7 | Structured output | `response_format={"type": "text", "mime_type": "application/json", "schema": ...}` |
| 8 | Tools | `tools=[{"type": "google_search"}]`, `annotations` / `url_citation` |
| 9 | Function calling | `{"type": "function", "name", "description", "parameters"}`, `function_call` / `function_result` steps |
| 10 | Managed agent | `agent="antigravity-preview-09-2026"`, `environment="remote"` |
| 11 | Background execution | `background=True`, poll with `interactions.get()` |

Streaming (Python):

```python
stream = client.interactions.create(
    model="gemini-3.8-flash",
    input="Explain how AI works",
    stream=True
)
for event in stream:
    print(event)
```

Stateful multi-turn (Python):

```python
interaction1 = client.interactions.create(
    model="gemini-3.8-flash",
    input="I have 2 dogs in my house.",
)

interaction2 = client.interactions.create(
    model="gemini-3.8-flash",
    input="How many paws are in my house?",
    previous_interaction_id=interaction1.id,
)
print("Response 2:", interaction2.output_text)
```

Structured output with Pydantic (Python):

```python
from pydantic import BaseModel, Field
from typing import List, Optional

class Recipe(BaseModel):
    recipe_name: str = Field(description="Name of the recipe.")
    ingredients: List[str] = Field(description="List of ingredients.")
    prep_time_minutes: Optional[int] = Field(description="Prep time in minutes.")

interaction = client.interactions.create(
    model="gemini-3.8-flash",
    input="Give me a recipe for banana bread",
    response_format={
        "type": "text",
        "mime_type": "application/json",
        "schema": Recipe.model_json_schema()
    },
)

recipe = Recipe.model_validate_json(interaction.output_text)
```

Google Search grounding (Python):

```python
interaction = client.interactions.create(
    model="gemini-3.8-flash",
    input="Who won the euro 2024?",
    tools=[{"type": "google_search"}]
)
print(interaction.output_text)
```

Function calling loop, stateful (Python):

```python
while True:
    interaction = client.interactions.create(
        model="gemini-3.8-flash",
        input=user_input,
        tools=[weather_tool],
        previous_interaction_id=previous_id,
    )

    function_results = []
    for step in interaction.steps:
        if step.type == "function_call":
            result = available_functions[step.name](**step.arguments)
            function_results.append({
                "type": "function_result",
                "name": step.name,
                "call_id": step.id,
                "result": [{"type": "text", "text": json.dumps(result)}],
            })

    if not function_results:
        break

    user_input = function_results
    previous_id = interaction.id
```

Managed agent (Python):

```python
interaction = client.interactions.create(
    agent="antigravity-preview-09-2026",
    input="Write a Python script that generates the first 20 Fibonacci numbers and saves them to fibonacci.txt. Then read the file and print its contents.",
    environment="remote",
)
print(f"Environment: {interaction.environment_id}")
```

Background execution (Python):

```python
interaction = client.interactions.create(
    model="gemini-3.8-flash",
    input="Write a detailed analysis of the impact of artificial intelligence on modern healthcare.",
    background=True,
)

while True:
    result = client.interactions.get(interaction.id)
    if result.status == "completed":
        print(result.output_text)
        break
    elif result.status == "failed":
        print(f"Failed: {result.error}")
        break
    time.sleep(5)
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| model | string | Model ID, for example `gemini-3.8-flash`, `gemini-3.1-flash-image` |
| agent | string | Agent ID instead of `model`, for example `antigravity-preview-09-2026` |
| input | string or list | Text, or a list of typed content parts (text / image / audio) |
| previous_interaction_id | string | Continue a conversation server-side from an earlier `interaction.id` |
| stream | boolean | Stream events as they are generated |
| tools | list | Tool declarations, for example `{"type": "google_search"}` or `{"type": "function", ...}` |
| response_format | object | JSON schema output constraint |
| environment | string | `"remote"` for managed agents |
| background | boolean | Run asynchronously; poll with `interactions.get()` |

## Notes

- Upgrading to the paid tier "increases your rate limits and requires setting up Cloud Billing"; the guide says to prepay a minimum of $5 (or currency equivalent) in paid credits. View usage in Google AI Studio under Dashboard > Usage.
- The guide states the Interactions API is available through the Python and JavaScript SDKs, as well as REST. Java and Go tabs are also shown on the page.
- SDK convenience properties: `interaction.output_text` and `interaction.output_image`.
- Stateful multi-turn is "recommended"; stateless mode requires passing all previous turns, including intermediate model thought and tool steps, in each request.
- Docs fetched 2026-10-16. Examples use the `v1beta` REST path.
- API availability: Interactions API. The legacy `generateContent` guide is a separate tree (see the generate-content category).
- Building with an AI coding agent: the page suggests `npx skills add google-gemini/gemini-skills --skill gemini-api-dev`. This is Gemini's own distribution, not this repository's skills.
- Distinct from OpenAI Responses API (openai-api-core skill) and Anthropic Messages API (anthropic-api-core skill).

## Related

- [overview](./overview.md)
- [interactions-overview](./interactions-overview.md)
- [api-key](./api-key.md)
- [libraries](./libraries.md)
