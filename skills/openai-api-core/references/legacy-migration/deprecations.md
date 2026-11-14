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
| Dec 1, 2026 | `gpt-image-1-mini` | `gpt-image-2.6-sunburst` or `gpt-image-2.6-flare` |
| Dec 1, 2026 | `gpt-image-1.5`, `gpt-image-1.5-2025-12-16` | `gpt-image-2.6-sunburst` or `gpt-image-2.6-flare` |
| Dec 1, 2026 | `chatgpt-image-latest` | `gpt-image-2.6-sunburst` or `gpt-image-2.6-flare` |
| Dec 11, 2026 | `gpt-5`, `gpt-5-2025-08-07` | `gpt-6.1-sol` |
| Dec 11, 2026 | `gpt-5-mini`, `gpt-5-mini-2025-08-07` | `gpt-6.1-terra` |
| Dec 11, 2026 | `gpt-5-nano`, `gpt-5-nano-2025-08-07` | `gpt-6-luna` |
| Dec 11, 2026 | `gpt-5-pro`, `gpt-5-pro-2025-10-06` | `gpt-6.1-sol` (`reasoning.mode: pro`) in the Responses API |
| Dec 11, 2026 | `o3`, `o3-2025-04-16` | `gpt-6.1-sol` |
| Dec 11, 2026 | `o3-pro`, `o3-pro-2025-06-10` | `gpt-6.1-sol` (`reasoning.mode: pro`) in the Responses API |
| Jan 6, 2027 | `tts-1` | `gpt-realtime-2.1-mini` |
| Jan 6, 2027 | `tts-1-hd` | `gpt-realtime-2.1-mini` |
| Jan 6, 2027 | `gpt-4o-mini-tts`, `gpt-4o-mini-tts-2025-03-20`, `gpt-4o-mini-tts-2025-12-15` | `gpt-realtime-2.1-mini` |
| Jan 14, 2027 | GPT-4o (`gpt-4o-2024-08-06`, `gpt-4o-2024-11-20`) | `gpt-6-luna` |
| Jan 14, 2027 | GPT-4o mini (`gpt-4o-mini-2024-07-18`) | `gpt-6-luna` |
| Jan 14, 2027 | GPT-4.1 (`gpt-4.1-2025-04-14`) | `gpt-6-luna` |
| Jan 14, 2027 | GPT-4.1 mini (`gpt-4.1-mini-2025-04-14`) | `gpt-6-luna` |
| Jan 20, 2027 | `gpt-realtime`, `gpt-realtime-2025-08-28` | `gpt-realtime-2.1` |
| Jan 20, 2027 | `gpt-audio`, `gpt-audio-2025-08-28` | `gpt-audio-1.5` |
| Jan 20, 2027 | `gpt-4o-audio` | `gpt-audio-1.5` |
| Jan 20, 2027 | `gpt-4o-realtime` | `gpt-realtime-2.1` |
| Jan 20, 2027 | `gpt-realtime-mini`, `gpt-realtime-mini-2025-12-15` | `gpt-realtime-2.1-mini` |
| Jan 20, 2027 | `gpt-audio-mini`, `gpt-audio-mini-2025-12-15` | `gpt-audio-1.5` |
| Jan 20, 2027 | `gpt-4o-mini-realtime` | `gpt-realtime-2.1-mini` |
| Jan 20, 2027 | `gpt-4o-mini-audio` | `gpt-audio-1.5` |
| Jan 20, 2027 | `gpt-4o-mini-transcribe-2025-03-20` | `gpt-4o-mini-transcribe-2025-12-15` |
| Feb 1, 2027 | `gpt-5.5-cyber-preview` | The most capable cyber model available to you. |
| Feb 10, 2027 | `gpt-image-2`, `gpt-image-2-2026-04-21` | `gpt-image-2.6-sunburst` or `gpt-image-2.6-flare` |
| Feb 26, 2027 | `whisper-1` | `gpt-live-transcribe` or `gpt-transcribe` |
| Feb 26, 2027 | `gpt-4o-transcribe` | `gpt-live-transcribe` or `gpt-transcribe` |
| Feb 26, 2027 | `gpt-4o-mini-transcribe`, `gpt-4o-mini-transcribe-2025-12-15` | `gpt-live-transcribe` or `gpt-transcribe` |
| Feb 26, 2027 | `gpt-4o-transcribe-diarize` | `gpt-live-transcribe` or `gpt-transcribe` |
| Apr 1, 2027 | `gpt-5.3-codex` | `gpt-6-sol` |
| Apr 1, 2027 | `gpt-5.4-nano`, `gpt-5.4-nano-2026-03-17` | `gpt-6-luna` |
| Apr 1, 2027 | `gpt-5.1`, `gpt-5.1-2025-11-13` | `gpt-6-sol` |

Feature and endpoint deprecations:

| Shutdown date | Item | Status | Recommended replacement |
|---|---|---|---|
| Nov 30, 2026 | `/v1/prompts` and reusable prompt objects | Deprecated | Move prompt content into your application code. [Migration guide](https://developers.openai.com/api/docs/guides/prompting/migrate-from-prompt-object) |
| Nov 30, 2026 | Evals dashboard, API, and graders for eval workflows | Read-only | [Migrate to Promptfoo](https://developers.openai.com/cookbook/examples/evaluation/moving-from-openai-evals-to-promptfoo). For fine-tuning graders, see the [fine-tuning timeline](https://developers.openai.com/api/docs/deprecations#update-to-openais-self-serve-fine-tuning). |
| Nov 30, 2026 | Agent Builder | Deprecated | Agents SDK or ChatGPT Workspace Agents. [Migration guide](https://developers.openai.com/api/docs/guides/agent-builder/migrate-from-agent-builder). ChatKit remains available. |
| Jan 6, 2027 | Self-serve fine-tuning job creation | Restricted access | See the [fine-tuning timeline](https://developers.openai.com/api/docs/deprecations#update-to-openais-self-serve-fine-tuning). |
| Feb 26, 2027 | `/v1/audio/translations` | Deprecated | [`/v1/realtime/translations`](https://developers.openai.com/api/docs/guides/realtime-translation) |

Fine-tuned versions of the models listed above follow the same shutdown schedule as their underlying base models. Self-serve fine-tuning: from Jan 6, 2027 active existing customers can no longer create new fine-tuning jobs (inference on fine-tuned models is disabled only when the underlying base model is deprecated).

### Past (as of 2026-11-14)

| Shutdown date | Item | Recommended replacement |
|----------------|------|---------------------------|
| August 10, 2026 | `gpt-5.2-chat-latest`, `gpt-5.3-chat-latest` | `gpt-5.6-sol` |
| August 26, 2026 | Assistants API (shut down; no longer available) | Responses API and Conversations API |
| September 24, 2026 | Videos API, `sora-2`, `sora-2-pro`, `sora-2-2025-10-06`, `sora-2-2025-12-08`, `sora-2-pro-2025-10-06` | — |
| September 28, 2026 | `gpt-3.5-turbo-instruct`, `babbage-002`, `davinci-002`, `gpt-3.5-turbo-1106` | `gpt-5.6-terra` |
| October 1, 2026 | `gpt-5.4-cyber` (announced 2026-09-11) | The most capable cyber model available to you |
| October 23, 2026 | `gpt-3.5-turbo-0125` (`gpt-3.5-turbo`, `gpt-3.5-turbo-completions`), `o4-mini-2025-04-16` (`o4-mini`), `ft-o4-mini-2025-04-16` | `gpt-5.6-terra` |
| October 23, 2026 | `gpt-4-0613` (`gpt-4`, `gpt-4-0613-completions`, `gpt-4-completions`), `gpt-4-1106-preview`, `gpt-4-turbo` (`gpt-4-turbo-2024-04-09`, `gpt-4-turbo-completions`), `gpt-4o-2024-05-13`, `o1-2024-12-17` (`o1`), `o3-mini-2025-01-31` (`o3-mini`) | `gpt-5.6-sol` |
| October 23, 2026 | `o1-pro-2025-03-19` (`o1-pro`) | `gpt-5.6-sol` (`reasoning.mode: pro`) |
| October 23, 2026 | `gpt-4.1-nano`, `gpt-4.1-nano-2025-04-14` | `gpt-5.6-luna` |
| October 23, 2026 | `gpt-image-1` | `gpt-image-2.5-sunburst` or `gpt-image-2.5-flare` |

Earlier shutdowns: Codex models (`code-davinci-002`, `code-cushman-002`) retired March 2023; legacy endpoints `/v1/engines` and `/v1/search` shut down December 2022.

## Notes

- Dates and the model list above reflect the official deprecations page as retrieved on 2026-11-14; always re-check the live page before relying on a specific shutdown date.
- To monitor shutdowns programmatically, call `GET /v1/models` (List models) or Retrieve model and read each model's optional `shutdown_date` field: a `YYYY-MM-DD` string, or `null` if no shutdown date has been announced.
- In some cases developers may be able to provision dedicated capacity for continued access after a model's shutdown date (contact sales).
- Sora 2 / Videos API ended 2026-09-24, and the Assistants API ended 2026-08-26 — see the dedicated migration path for the latter.
- The source page (`/api/docs/deprecations`) maintains a full dated archive back to 2022; older announcements, including per-model legacy pricing tables, are not reproduced here to keep this reference concise.

## Related

- [Assistants to Responses migration](./assistants-to-responses-migration.md)
- [Migrate Chat Completions to Responses](./migrate-chat-completions-to-responses.md)
- [All models](../getting-started/models-all.md)
- [Models](../getting-started/models.md)
