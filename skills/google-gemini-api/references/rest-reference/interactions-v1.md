---
source: https://ai.google.dev/api/interactions-api-v1
---

# Interactions API (v1)

Stable (v1) REST reference for the Gemini Interactions API: create, cancel, retrieve, and delete an interaction, plus the Interaction, Content, Tool, Step, ResponseFormat, and SSE event data models.

## Signature / Usage

```text
POST   https://generativelanguage.googleapis.com/v1/interactions              Creates a new interaction.
POST   https://generativelanguage.googleapis.com/v1/interactions/{id}/cancel  Cancels an interaction by id. This only applies to background interactions that are still running.
GET    https://generativelanguage.googleapis.com/v1/interactions/{id}         Retrieves the full details of a single interaction based on its `Interaction.id`.
DELETE https://generativelanguage.googleapis.com/v1/interactions/{id}         Deletes the interaction by id.
```

Example response (Simple Request):

```json
{
  "created": "2025-11-26T12:25:15Z",
  "id": "v1_ChdPU0F4YWFtNkFwS2kxZThQZ05lbXdROBIXT1NBeGFhbTZBcEtpMWU4UGdOZW13UTg",
  "model": "gemini-3.6-flash",
  "object": "interaction",
  "status": "completed",
  "steps": [
    {
      "type": "model_output",
      "content": [
        {
          "type": "text",
          "text": "Hello! I'm functioning perfectly and ready to assist you.\n\nHow are you doing today?"
        }
      ]
    }
  ],
  "updated": "2025-11-26T12:25:15Z",
  "usage": {
    "input_tokens_by_modality": [
      {
        "modality": "text",
        "tokens": 7
      }
    ],
    "total_cached_tokens": 0,
    "total_input_tokens": 7,
    "total_output_tokens": 20,
    "total_thought_tokens": 22,
    "total_tokens": 49,
    "total_tool_use_tokens": 0
  }
}
```

## Options / Props

Create request body (`POST /v1/interactions`):

| Name | Type | Description |
|------|------|-------------|
| model | ModelOption (optional) | The name of the `Model` used for generating the interaction. Required if `agent` is not provided. Possible values: `models/gemini-2.5-flash-lite`, `models/gemini-2.5-flash-image`, `models/gemini-3.1-flash-lite`, `models/gemini-3.1-flash-image`, `models/gemini-3.5-flash`, `models/gemini-3.6-flash`, `models/gemini-3.7-flash` |
| agent | AgentOption (optional) | The name of the `Agent` used for generating the interaction. Required if `model` is not provided. Possible values: `deep-research-pro-preview-12-2025`, `deep-research-preview-04-2026`, `deep-research-max-preview-04-2026`, `antigravity-preview-05-2026` |
| input | Content or array (Content) or array (Step) or string (required) | The inputs for the interaction (common to both Model and Agent). |
| system_instruction | string (optional) | System instruction for the interaction. |
| tools | array (Tool) (optional) | A list of tool declarations the model may call during interaction. |
| response_format | ResponseFormat or array (ResponseFormat) (optional) | Enforces that the generated response is a JSON object that complies with the JSON schema specified in this field. |
| stream | boolean (optional) | Input only. Whether the interaction will be streamed. |
| store | boolean (optional) | Input only. Whether to store the response and request for later retrieval. |
| background | boolean (optional) | Input only. Whether to run the model interaction in the background. |
| generation_config | GenerationConfig (optional) | Model configuration. Alternative to `agent_config`. Only applicable when `model` is set. |
| agent_config | DynamicAgentConfig (optional) | Agent configuration. Alternative to `generation_config`. Only applicable when `agent` is set. `type` is always `"dynamic"`. |
| previous_interaction_id | string (optional) | The ID of the previous interaction, if any. |
| safety_settings | array (SafetySetting) (optional) | Safety settings for the interaction. |

`generation_config` fields:

| Name | Type | Description |
|------|------|-------------|
| max_output_tokens | integer | The maximum number of tokens to include in the response. |
| seed | integer | Seed used in decoding for reproducibility. |
| stop_sequences | array (string) | A list of character sequences that will stop output interaction. |
| thinking_level | ThinkingLevel | `minimal` (little to no thinking), `low`, `medium`, `high`. |
| thinking_summaries | ThinkingSummaries | `auto` or `none`. |
| tool_choice | ToolChoiceConfig or enum (string) | `auto`, `any`, `none`, `validated`. |

`safety_settings` item (SafetySetting):

| Name | Type | Description |
|------|------|-------------|
| method | enum (string) | `severity` (probability and severity scores) or `probability`. |
| threshold | enum (string) | `block_low_and_above`, `block_medium_and_above`, `block_only_high`, `off`. |
| type | HarmCategory | `hate_speech`, `dangerous_content`, `harassment`, `sexually_explicit`, `jailbreak`. |

Path / query parameters:

| Method | Name | Type | Description |
|------|------|------|-------------|
| cancel | api_version | string (required) | API version for request routing. |
| cancel | id | string (required) | The unique identifier of the interaction to cancel. |
| get | api_version | string (required) | API version for request routing. |
| get | id | string (required) | The unique identifier of the interaction to retrieve. |
| get | last_event_id | string (optional) | If set, resumes the interaction stream from the next chunk after the event marked by the event id. Can only be used if `stream` is true. |
| get | stream | boolean (optional) | If set to true, the generated content will be streamed incrementally. Defaults to `False`. |
| delete | api_version | string (required) | API version for request routing. |
| delete | id | string (required) | The unique identifier of the interaction to delete. |
| delete | interactionsId | string (required) | Required. The name of the interaction to delete. |

`Interaction` resource fields: `agent`, `agent_config`, `created`, `errors` (array of Error: `code`, `message`), `id`, `input`, `max_total_tokens`, `model`, `previous_interaction_id`, `response_format`, `safety_settings`, `status`, `steps` (array of Step), `system_instruction`, `tools`, `updated`, `usage`.

`status` values: `in_progress`, `requires_action`, `completed`, `failed`, `cancelled`, `incomplete` (completed, but contains incomplete results, e.g. hitting max_tokens).

`usage` fields: `cached_tokens_by_modality`, `grounding_tool_count` (`count`, `type`: `google_search` / `google_maps`), `input_tokens_by_modality`, `output_tokens_by_modality`, `tool_use_tokens_by_modality` (each item `modality`: `text` / `image` / `audio` / `video` / `document`, plus `tokens`), `total_cached_tokens`, `total_input_tokens`, `total_output_tokens`, `total_thought_tokens`, `total_tokens`, `total_tool_use_tokens`.

Data models:

| Model | Possible types |
|------|------|
| Content | `AudioContent`, `DocumentContent`, `ImageContent`, `TextContent` |
| Tool | `CodeExecution` (`code_execution`), `FileSearch` (`file_search`: `file_search_store_names`, `metadata_filter`, `top_k`), `Function` (`function`: `description`, `name`, `parameters`), `GoogleMaps` (`google_maps`: `enable_widget`, `latitude`, `longitude`), `GoogleSearch` (`google_search`: `search_types` = `web_search` / `image_search`), `UrlContext` (`url_context`) |
| InteractionSseEvent | `ErrorEvent`, `InteractionCompletedEvent`, `InteractionCreatedEvent`, interaction status update, step start / delta / stop events |
| ResponseFormat | `AudioResponseFormat`, `ImageResponseFormat`, `TextResponseFormat`, `VideoResponseFormat` |
| Step | `CodeExecutionCallStep`, `CodeExecutionResultStep`, `FileSearchCallStep`, `FileSearchResultStep`, `FunctionCallStep`, `FunctionResultStep`, `GoogleMapsCallStep`, `GoogleMapsResultStep`, `GoogleSearchCallStep`, `GoogleSearchResultStep`, `ModelOutputStep`, `ThoughtStep`, `UrlContextCallStep`, `UrlContextResultStep`, `UserInputStep` |

SSE event examples:

```json
{
  "event_id": "evt_123",
  "event_type": "interaction.created",
  "interaction": {
    "created": "2025-12-04T15:01:45Z",
    "id": "v1_ChdXS0l4YWZXTk9xbk0xZThQczhEcmlROBIXV0tJeGFmV05PcW5NMWU4UHM4RHJpUTg",
    "model": "gemini-3.6-flash",
    "status": "in_progress",
    "updated": "2025-12-04T15:01:45Z"
  }
}
```

```json
{
  "delta": {
    "type": "text",
    "text": "Hello"
  },
  "event_type": "step.delta",
  "index": 0
}
```

Other `event_type` values shown in the source: `interaction.completed`, `interaction.status_update`, `step.start`, `step.stop`, `error`.

Text output with a JSON Schema (`response_format`):

```json
{
  "type": "text",
  "mime_type": "application/json",
  "schema": {
    "type": "object",
    "properties": {
      "ingredients": {
        "type": "array",
        "items": {
          "type": "string"
        }
      },
      "recipe_name": {
        "type": "string"
      }
    },
    "required": [
      "ingredients",
      "recipe_name"
    ]
  }
}
```

## Notes

- Availability: Interactions API, stable `v1` (endpoints under `/v1/`). The beta surface under `/v1beta/` is documented in interactions-v1beta.md.
- v1 versus v1beta (differences read from the two fetched pages): v1 `model` values are `models/`-prefixed and fewer; v1 `agent_config` is only `DynamicAgentConfig`; v1 `generation_config` has no `speech_config`, `transcription_config`, or `video_config`; the v1 request body has no `agent_config`-adjacent `environment`, `labels`, `service_tier`, or `webhook_config`; the v1 `Tool` list has no `ComputerUse`, `McpServer`, or `Retrieval`; v1 `SafetySetting.threshold` has no `block_none`; v1 `HarmCategory` has no `image_*` values. Whether these are unsupported or merely undocumented in v1 is not stated.
- The "Create" code examples (Simple Request, Multi-turn, Image Input, Function Calling, Deep Research, Antigravity, Reuse Env, With Sources, Custom Agent) are embedded frames in the source and are not available in the stored text; only the JSON responses above are verbatim.
- Distinct from openai-api-core (Responses API) and anthropic-api-core (Messages API).
- Docs fetched 2026-10-16.

## Related

- [Interactions API (v1beta)](./interactions-v1beta.md)
- [Agents API](./agents.md)
- [Webhooks API](./webhooks.md)
- [Overview](./overview.md)
