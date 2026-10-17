---
source: https://ai.google.dev/api/interactions-api
---

# Interactions API (v1beta)

Beta REST reference for the Gemini Interactions API (endpoints under `/v1beta/`); the SDKs default to `v1beta` (see the api-versions table).

## Signature / Usage

```text
POST   https://generativelanguage.googleapis.com/v1beta/interactions                              Creates a new interaction.
POST   https://generativelanguage.googleapis.com/v1beta/interactions/{interactionsId}/cancel      Cancels an interaction by id. This only applies to background interactions that are still running.
GET    https://generativelanguage.googleapis.com/v1beta/interactions/{interactionsId}             Retrieves the full details of a single interaction based on its `Interaction.id`.
DELETE https://generativelanguage.googleapis.com/v1beta/interactions/{interactionsId}             Deletes the interaction by id.
```

Example response (Get Interaction):

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
          "text": "I'm doing great, thank you for asking! How can I help you today?"
        }
      ]
    }
  ],
  "updated": "2025-11-26T12:25:15Z"
}
```

## Options / Props

Create request body (`POST /v1beta/interactions`):

| Name | Type | Description |
|------|------|-------------|
| model | ModelOption (optional) | The name of the `Model` used for generating the interaction. Required if `agent` is not provided. Values include `gemini-flash-latest`, `gemini-flash-lite-latest`, `gemini-pro-latest`, `gemini-2.5-flash`, `gemini-2.5-pro`, `gemini-2.5-flash-lite`, `gemini-3-flash-preview`, `gemini-3.1-pro-preview`, `gemini-3.5-flash`, `gemini-3.6-flash`, `gemini-3.7-flash`, `gemini-3.8-flash`, `gemini-4-argon`, `gemma-4-26b-a4b-it`, `gemma-4-31b-it`, image / TTS / Lyria / robotics / Omni models (e.g. `gemini-3.1-flash-image`, `gemini-3.8-flash-tts`, `lyria-3.5`, `gemini-robotics-er-2-preview`, `gemini-omni-1.1-flash`); see the source for the full enumeration with descriptions. |
| agent | AgentOption (optional) | The name of the `Agent` used for generating the interaction. Required if `model` is not provided. Values: `deep-research-pro-preview-12-2025`, `deep-research-preview-04-2026`, `deep-research-max-preview-04-2026`, `antigravity-preview-05-2026`. |
| input | Content or array (Content) or array (Step) or string (optional) | The inputs for the interaction (common to both Model and Agent). |
| system_instruction | string (optional) | System instruction for the interaction. |
| tools | array (Tool) (optional) | A list of tool declarations the model may call during interaction. |
| response_format | ResponseFormat or array (ResponseFormat) (optional) | Enforces that the generated response is a JSON object that complies with the JSON schema specified in this field. |
| stream | boolean (optional) | Input only. Whether the interaction will be streamed. |
| store | boolean (optional) | Input only. Whether to store the response and request for later retrieval. |
| background | boolean (optional) | Input only. Whether to run the model interaction in the background. |
| generation_config | GenerationConfig (optional) | Model configuration. Alternative to `agent_config`. Only applicable when `model` is set. |
| agent_config | AntigravityAgentConfig or CodeMenderAgentConfig or DeepResearchAgentConfig or DynamicAgentConfig (optional) | Agent configuration. Alternative to `generation_config`. Only applicable when `agent` is set. |
| environment | EnvironmentConfig or string (optional) | The environment configuration for the interaction. Can be an object specifying remote environment sources or a string referencing an existing environment ID. |
| labels | object (optional) | User-defined metadata. Label keys and values can be no longer than 63 characters (Unicode codepoints) and can only contain lowercase letters, numeric characters, underscores, and dashes. Label keys must start with a letter. |
| previous_interaction_id | string (optional) | The ID of the previous interaction, if any. |
| safety_settings | array (SafetySetting) (optional) | Safety settings for the interaction. |
| service_tier | ServiceTier (optional) | `flex`, `standard`, `priority`, `deferred`. |
| webhook_config | WebhookConfig (optional) | Webhook configuration for receiving notifications when the interaction completes: `uris` (array of string; used instead of the registered webhooks) and `user_metadata` (object returned on each event emission). |

`generation_config` fields:

| Name | Type | Description |
|------|------|-------------|
| max_output_tokens | integer | The maximum number of tokens to include in the response. |
| seed | integer | Seed used in decoding for reproducibility. |
| speech_config | SpeakerConfig or array (SpeechConfig) | Speech and multi-speaker configuration. `speakers` items: `language`, `speaker`, `voice`. |
| stop_sequences | array (string) | A list of character sequences that will stop output interaction. |
| thinking_level | ThinkingLevel | `minimal`, `low`, `medium`, `high`. |
| thinking_summaries | ThinkingSummaries | `auto`, `none`. |
| tool_choice | ToolChoiceConfig or enum (string) | `auto`, `any`, `none`, `validated`. |
| transcription_config | TranscriptionConfig | Speech recognition. `custom_vocabulary`, `language_codes`, `mode` (`smart` or `verbatim`; verbatim has `diarization_mode` = "speaker" and `timestamp_granularities` = "word"). |
| video_config | VideoConfig | `task`: `text_to_video`, `image_to_video`, `reference_to_video`, `edit`, `extend`. |

`SafetySetting`: `method` (`severity` / `probability`), `threshold` (`block_low_and_above`, `block_medium_and_above`, `block_only_high`, `block_none`, `off`), `type` (`hate_speech`, `dangerous_content`, `harassment`, `sexually_explicit`, `image_hate`, `image_dangerous_content`, `image_harassment`, `image_sexually_explicit`, `jailbreak`).

Path / query parameters:

| Method | Name | Type | Description |
|------|------|------|-------------|
| cancel | interactionsId | string (required) | Required. The name of the interaction to cancel. |
| get | interactionsId | string (required) | Required. The name of the interaction to retrieve. |
| get | include_input | boolean (optional) | If true, includes the input in the response. |
| get | last_event_id | string (optional) | If set, resumes the interaction stream from the chunk after the event marked by the event id. Can only be used if `stream` is true. |
| get | stream | boolean (optional) | If true, streams the interaction events as Server-Sent Events. |
| delete | interactionsId | string (required) | Required. The name of the interaction to delete. |

`Tool` types (v1beta): `CodeExecution` (`code_execution`), `ComputerUse` (`computer_use`: `disabled_safety_policies`, `enable_prompt_injection_detection`, `environment` = `browser` / `mobile` / `desktop`, `excluded_predefined_functions`), `FileSearch` (`file_search`), `Function` (`function`), `GoogleMaps` (`google_maps`), `GoogleSearch` (`google_search`: `search_types` = `web_search` / `image_search` / `enterprise_web_search`), `McpServer` (`mcp_server`: `allowed_tools`, `headers`, `name`, `url`), `Retrieval` (`retrieval`: `exa_ai_search_config`, `parallel_ai_search_config`, `rag_store_config`, `retrieval_types` = `rag_store` / `exa_ai_search` / `parallel_ai_search`), `UrlContext` (`url_context`).

`Step` types (v1beta) add to the v1 list: `McpServerToolCallStep`, `McpServerToolResultStep`, `ProcessingCallStep`, `ProcessingResultStep`, `RetrievalCallStep`, `RetrievalResultStep`. `Content` types add `VideoContent`; `ResponseFormat` has a Video Output example. `EnvironmentConfig` (inline sources, external sources, network allowlist, proxy credentials) and `EnvironmentNetworkEgressAllowlist` are v1beta data models.

## Notes

- Availability: Interactions API, `v1beta` (beta). The source page states: "Beta: You are viewing the beta version of the Interactions API. Endpoints are under `/v1beta/`. The stable v1 version is also available."
- The `Retrieval` tool's `exa_ai_search_config.api_key` is described as "Required. The API key for ExaAiSearch." Never hard-code such keys; use placeholders.
- The Create examples (Simple Request, Multi-turn, Image Input, Function Calling, Deep Research, Antigravity Agent, Reuse Environment, With Sources, Custom Agent) are embedded frames not present in the stored text; only the JSON responses are verbatim.
- Distinct from openai-api-core (Responses API) and anthropic-api-core (Messages API); the `mcp_server` tool here is the Gemini-side MCP connector (compare anthropic-api-tools-mcp and openai-agents).
- Docs fetched 2026-10-16.

## Related

- [Interactions API (v1)](./interactions-v1.md)
- [Agents API](./agents.md)
- [Environments API](./environments.md)
- [Credentials API](./credentials.md)
- [Webhooks API](./webhooks.md)
