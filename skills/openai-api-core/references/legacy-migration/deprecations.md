# Deprecations

Schedule of retired/retiring OpenAI API models, endpoints, and products, with recommended replacements.

## Options / Props

| Notice period | Applies to |
|----------------|------------|
| At least 6 months | Generally available (GA) models |
| At least 3 months | Specialized variants of GA models (chat variants such as `gpt-5.1-chat-latest`, Codex variants such as `gpt-5.3-codex`, deep research variants such as `o3-deep-research`) |
| As short as 2 weeks | Preview models (`preview` in the model name, e.g. `computer-use-preview`, `gpt-4o-audio-preview`) |

"Deprecation" refers to the process of retiring a model or endpoint; when OpenAI announces a model/endpoint is being deprecated, it immediately becomes deprecated (the shutdown date follows later per the notice periods above). Shorter notice is possible if safety or compliance concerns require it.

### Upcoming

| Shutdown date | Item | Recommended replacement |
|----------------|------|---------------------------|
| October 23, 2026 | `gpt-3.5-turbo-0125` (`gpt-3.5-turbo`, `gpt-3.5-turbo-completions`), `ft-gpt-3.5-turbo`, `ft-babbage-002`, `ft-davinci-002`, `o4-mini-2025-04-16` (`o4-mini`), `ft-o4-mini-2025-04-16` | `gpt-5.6-terra` |
| October 23, 2026 | `gpt-4-0613` (`gpt-4`), `gpt-4-1106-preview`, `gpt-4-turbo`, `gpt-4o-2024-05-13`, `o1-2024-12-17` (`o1`), `o3-mini-2025-01-31` (`o3-mini`), `ft-gpt-4` | `gpt-5.6-sol` |
| October 23, 2026 | `o1-pro-2025-03-19` (`o1-pro`) | `gpt-5.6-sol` (`reasoning.mode: pro`) |
| October 23, 2026 | `gpt-4.1-nano-2025-04-14` (`gpt-4.1-nano`), `ft-gpt-4.1-nano-2025-04-14` | `gpt-5.6-luna` |
| October 23, 2026 | `gpt-image-1` | `gpt-image-2.5-sunburst` or `gpt-image-2.5-flare` |
| November 30, 2026 | Reusable prompts (`/v1/prompts`, prompt objects; announced 2026-06-03) | Move prompt content into application code (see prompt-object migration guide) |
| November 30, 2026 | Evals platform (existing evals read-only from Oct 31, 2026) | Moving from OpenAI Evals to Promptfoo (cookbook) |
| November 30, 2026 | Agent Builder (ChatKit remains available) | Agents SDK / ChatGPT Workspace Agents |
| December 1, 2026 | `gpt-image-1-mini`, `gpt-image-1.5`, `chatgpt-image-latest` | `gpt-image-2.5-sunburst` or `gpt-image-2.5-flare` |
| December 11, 2026 | `gpt-5-2025-08-07`, `o3-2025-04-16` | `gpt-5.6-sol` |
| December 11, 2026 | `gpt-5-mini-2025-08-07` | `gpt-5.6-terra` |
| December 11, 2026 | `gpt-5-nano-2025-08-07` | `gpt-5.6-luna` |
| December 11, 2026 | `gpt-5-pro-2025-10-06`, `o3-pro-2025-06-10` | `gpt-5.6-sol` (`reasoning.mode: pro`) |
| January 6, 2027 | Self-serve fine-tuning: active existing customers can no longer create new fine-tuning jobs (inference on fine-tuned models is disabled only when the base model is deprecated) | — |
| January 6, 2027 | Text-to-speech: `tts-1`, `tts-1-hd`, `gpt-4o-mini-tts-2025-03-20`, `gpt-4o-mini-tts-2025-12-15` | `gpt-realtime-2.1-mini` |
| January 14, 2027 | `gpt-4o-2024-08-06`, `gpt-4o-2024-11-20`, `gpt-4o-mini-2024-07-18`, `gpt-4.1-2025-04-14`, `gpt-4.1-mini-2025-04-14` (fine-tuned versions follow the same schedule as their base models) | `gpt-6-luna` |
| January 20, 2027 | `gpt-realtime`, `gpt-4o-realtime` | `gpt-realtime-2.1` |
| January 20, 2027 | `gpt-realtime-mini`, `gpt-4o-mini-realtime` | `gpt-realtime-2.1-mini` |
| January 20, 2027 | `gpt-audio`, `gpt-4o-audio`, `gpt-audio-mini`, `gpt-4o-mini-audio` | `gpt-audio-1.5` |
| January 20, 2027 | `gpt-4o-mini-transcribe-2025-03-20` | `gpt-4o-mini-transcribe-2025-12-15` |
| February 26, 2027 | `whisper-1`, `gpt-4o-transcribe`, `gpt-4o-mini-transcribe`, `gpt-4o-transcribe-diarize` | `gpt-live-transcribe` or `gpt-transcribe` |
| February 26, 2027 | `/v1/audio/translations` | `v1/realtime/translations` |
| April 1, 2027 | `gpt-5.3-codex`, `gpt-5.1` | `gpt-6-sol` |
| April 1, 2027 | `gpt-5.4-nano` | `gpt-6-luna` |

### Past (as of 2026-10-17)

| Shutdown date | Item | Recommended replacement |
|----------------|------|---------------------------|
| August 10, 2026 | `gpt-5.2-chat-latest`, `gpt-5.3-chat-latest` | `gpt-5.6-sol` |
| August 26, 2026 | Assistants API (shut down; no longer available) | Responses API and Conversations API |
| September 24, 2026 | Videos API, `sora-2`, `sora-2-pro`, `sora-2-2025-10-06`, `sora-2-2025-12-08`, `sora-2-pro-2025-10-06` | — |
| September 28, 2026 | `gpt-3.5-turbo-instruct`, `babbage-002`, `davinci-002`, `gpt-3.5-turbo-1106` | `gpt-5.6-terra` |
| October 1, 2026 | `gpt-5.4-cyber` (announced 2026-09-11) | The most capable cyber model available to you |

Earlier shutdowns: Codex models (`code-davinci-002`, `code-cushman-002`) retired March 2023; legacy endpoints `/v1/engines` and `/v1/search` shut down December 2022.

## Notes

- Dates and the model list above reflect the official deprecations page as retrieved on 2026-10-17; always re-check the live page before relying on a specific shutdown date.
- To monitor shutdowns programmatically, call `GET /v1/models` (List models) or Retrieve model and read each model's optional `shutdown_date` field: a `YYYY-MM-DD` string, or `null` if no shutdown date has been announced.
- In some cases developers may be able to provision dedicated capacity for continued access after a model's shutdown date (contact sales).
- Sora 2 / Videos API ended 2026-09-24, and the Assistants API ended 2026-08-26 — see the dedicated migration path for the latter.
- The source page (`/api/docs/deprecations`) maintains a full dated archive back to 2022; older announcements, including per-model legacy pricing tables, are not reproduced here to keep this reference concise.

## Related

- [Assistants to Responses migration](./assistants-to-responses-migration.md)
- [Migrate Chat Completions to Responses](./migrate-chat-completions-to-responses.md)
- [All models](../getting-started/models-all.md)
- [Models](../getting-started/models.md)
