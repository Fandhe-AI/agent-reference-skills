---
source: https://ai.google.dev/gemini-api/docs/interactions-breaking-changes-may-2026
---

# Interactions API breaking changes (May 2026)

The `v1beta` Interactions API restructured its shape to support capabilities such as mid-flight steering and asynchronous tool calls. Two categories of changes: a new `steps` array replaces `outputs`, and a polymorphic `response_format` replaces `response_mime_type` and consolidates output format controls.

## Signature / Usage

Before (legacy) and after (new schema), basic text:

```python
# Request
interaction = client.interactions.create(
    model="gemini-3.8-flash", input="Tell me a joke."
)

# Legacy response access
print(interaction.outputs[-1].text)

# New schema response access (Recommended sugar)
print(interaction.output_text)
```

REST opt-in with the `Api-Revision` header:

```bash
# Opt-in needed before May 26th
curl -X POST "https://generativelanguage.googleapis.com/v1beta/interactions" \
  -H "x-goog-api-key: ${GEMINI_API_KEY}" \
  -H "Content-Type: application/json" \
  -H "Api-Revision: 2026-05-20" \
  -d '{
    "model": "gemini-3.8-flash",
    "input": "Tell me a joke."
  }'
```

New schema response (`POST` returns only output steps; `GET /v1beta/interactions/{id}` returns the full timeline including the initial `user_input` step):

```json
{
  "id": "int_123",
  "steps": [
    {
      "type": "model_output",
      "content": [
        { "type": "text", "text": "Why did the chicken cross the road?" }
      ]
    }
  ]
}
```

Function calls and server-side tool calls are now `steps`:

```python
# Accessing function call in new steps schema
for step in interaction.steps:
    if step.type == "function_call":
        print(f"Calling {step.name} with {step.arguments}")

# Accessing search results in new steps schema
for step in interaction.steps:
    if step.type == "google_search_call":
        print(f"Searched for: {step.arguments.queries}")
    elif step.type == "google_search_result":
        print(f"Found results: {step.result[0].search_suggestions}")
```

Streaming consumer:

```python
# Consuming stream and handling new event types
for event in client.interactions.create(
    model="gemini-3.8-flash",
    input="Tell me a story.",
    stream=True,
):
    if event.event_type == "step.delta":  # CHANGED: step.delta instead of content.delta
        if event.delta.type == "text":
            print(event.delta.text, end="")
```

Structured output (`response_mime_type` removed; MIME type goes inside `response_format`):

```python
interaction = client.interactions.create(
    model="gemini-3.8-flash",
    input="Summarize this article.",
    # response_mime_type is removed --- specify mime_type inside response_format
    response_format={
        "type": "text",
        "mime_type": "application/json",
        "schema": {
            "type": "object",
            "properties": {
                "summary": {"type": "string"}
            }
        }
    },
)

# Print response
print(interaction.output_text)
```

Image and audio output configuration:

```python
# image_config is removed from generation_config --- use response_format
response_format={
    "type": "image",
    "mime_type": "image/jpeg",
    "aspect_ratio": "1:1",
    "image_size": "1K"
},

# response_modalities is removed --- use response_format
response_format={
    "type": "audio"
},
```

## Options / Props

Schema changes:

| Area | Legacy | New schema |
|------|--------|------------|
| Response content | flat `outputs` array (model content only); `role` field | `steps` array with `type` discriminators (`user_input`, `model_output`, `thought`, `function_call`, `google_search_call`, `google_search_result`, ...) |
| Text access (SDK) | `interaction.outputs[-1].text` | `interaction.output_text` (also `.output_image`, `.output_audio`) |
| Thought | `{"type": "thought", "signature": ...}` | adds `summary` array alongside `signature` |
| Server-side tool results | `google_search_result.result.rendered_content` / `url` in `outputs` | `google_search_result` step with `result.search_suggestions`; `signature` on tool steps |
| Citations | `annotations` entries with `start_index` / `end_index` / `source` | `annotations` entries with `type: "url_citation"`, `url`, `title`, `start_index`, `end_index` inside `model_output` content |
| JSON output | `response_mime_type` + `response_format` holding the schema | `response_format: {"type": "text", "mime_type": ..., "schema": ...}` |
| Image output | `generation_config.image_config` (`aspect_ratio`, `image_size`) | `response_format` entry `{"type": "image", ...}` |
| Audio output | `response_modalities: ["audio"]` | `response_format` entry `{"type": "audio"}`; `generation_config.speech_config` stays |
| Multiple modalities | n/a | pass an array of `response_format` entries |
| Stateless history | send back collected `outputs` in `input` | collect `steps` and pass them in `input` of the next request, appending your new user turn as a `user_input` step |

Streaming event mapping:

| Legacy event | New event |
|--------------|-----------|
| `interaction.start` | `interaction.created` |
| `content.start` | `step.start` |
| `content.delta` | `step.delta` |
| `content.stop` | `step.stop` |
| `interaction.complete` | `interaction.completed` |
| `interaction.status_update` | replaced by `interaction.in_progress`, `interaction.requires_action`, etc. |

New event types: `interaction.created`, `interaction.completed`, `interaction.in_progress`, `interaction.requires_action`, `step.start`, `step.delta`, `step.stop`.

Timeline:

| Date | Phase | SDK users | REST API users |
|------|-------|-----------|----------------|
| May 7 | Opt-in | New SDK version available (Python >=2.0.0, JS >=2.0.0). Upgrade to get the new schema automatically. | Add `Api-Revision: 2026-05-20` header to opt in. Default remains legacy. |
| May 26 | Default flip | No action needed if already upgraded. Older SDKs (Python 1.x.x, JS 1.x.x) still work but return legacy responses. | New schema is now the default. Send `Api-Revision: 2026-05-07` header to opt out. |
| June 8 | Sunset | Python 1.x.x and JS 1.x.x SDK versions will break for Interactions API calls. | Legacy schema removed for Interactions API. `Api-Revision` header ignored. |

## Notes

- The source passes the key as a `?key=` query parameter; this page uses the `x-goog-api-key` header (as other official samples do) to keep the key out of URLs and logs.
- Availability: Interactions API (`v1beta` per the source; the legacy schema is stated to be removed on June 8, 2026).
- SDK users: upgrade to the latest SDK version (Python >=2.0.0, JavaScript >=2.0.0); the SDK opts in to the new schema automatically and only the new schema is supported in those versions.
- Streaming function calls: `step.start` delivers the function name, and `step.delta` events stream the arguments as partial JSON strings (`arguments_delta`); accumulate the deltas to get the full arguments. This differs from unary calls, which return the complete function call object.
- New features shipped after May 7 appear only in `steps` responses; users on the legacy `outputs` schema do not receive new capabilities.
- Image `response_format` examples in the source use `mime_type: "image/jpeg"`; audio uses `{"type": "audio"}` only.
- `image_config` is removed from `generation_config`, which stays focused on model behavior (temperature, top_p, thinking).
- Migration checklist (steps): read from `steps` not `outputs`; handle `user_input` and `model_output` step types; (function calling) find `function_call` steps; (server-side tools) handle tool-specific steps such as `google_search_call` / `google_search_result`; (stateless history) pass `steps` in `input`; (streaming) listen for `interaction.created`, `step.delta`, etc.
- Migration checklist (`response_format`): replace `response_mime_type` with `mime_type` inside `response_format`; wrap the JSON schema in `{"type": "text", "schema": ...}`; move `image_config` to a `{"type": "image", ...}` entry; replace `response_modalities=["audio"]` with `{"type": "audio"}`; convert `response_format` to an array for multiple output modalities.
- For OpenAI Responses API / Claude Messages API equivalents see openai-api-core and anthropic-api-core; these are separate APIs.

## Related

- [migrate-to-interactions.md](./migrate-to-interactions.md)
- [api-versions.md](./api-versions.md)
- [deprecations.md](./deprecations.md)
