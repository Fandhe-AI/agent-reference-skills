# Deprecations

Schedule of retired/retiring OpenAI API models, endpoints, and products, with recommended replacements.

## Options / Props

| Notice period | Applies to |
|----------------|------------|
| At least 6 months | Generally available (GA) models |
| At least 3 months | Specialized variants (chat variants, Codex models, deep research versions) |
| As short as 2 weeks | Preview models |

"Deprecation" refers to the process of retiring a model or endpoint; when OpenAI announces a model/endpoint is being deprecated, it immediately becomes deprecated (the shutdown date follows later per the notice periods above).

| Shutdown date | Item | Recommended replacement |
|----------------|------|---------------------------|
| August 10, 2026 | `gpt-5.2-chat-latest`, `gpt-5.3-chat-latest` | `gpt-5.6-sol` |
| August 26, 2026 | Assistants API | Responses API and Conversations API |
| September 24, 2026 | `sora-2`, `sora-2-pro`, Videos API | — |
| September 28, 2026 | `gpt-3.5-turbo-instruct`, `babbage-002`, `davinci-002`, `gpt-3.5-turbo-1106` | `gpt-5.6-terra` |
| October 23, 2026 | Legacy GPT snapshots: `gpt-3.5-turbo-0125`, `gpt-4-0613`, `gpt-4-1106-preview`, `gpt-4-turbo`, `gpt-4.1-nano-2025-04-14`, `gpt-4o-2024-05-13`, `gpt-image-1`, `o1`, `o1-pro`, `o3-mini`, `o4-mini` (and fine-tuned variants `ft-gpt-3.5-turbo`, `ft-gpt-4`, `ft-gpt-4.1-nano-2025-04-14`, `ft-babbage-002`, `ft-davinci-002`) | `gpt-5.6-sol` / `gpt-5.6-terra` / `gpt-5.6-luna` (per model) |
| November 30, 2026 | Reusable Prompts API (`/v1/prompts`) | Versioned prompts (see prompt-object migration guide) |
| November 30, 2026 | Evals platform (read-only from Oct 31, 2026) | (no direct replacement noted) |
| November 30, 2026 | Agent Builder | ChatGPT Workspace Agents / Agents SDK |
| December 1, 2026 | `gpt-image-1-mini`, `gpt-image-1.5`, `chatgpt-image-latest` | `gpt-image-2` |
| December 11, 2026 | `gpt-5-2025-08-07`, `gpt-5-mini-2025-08-07`, `gpt-5-nano-2025-08-07`, `gpt-5-pro-2025-10-06`, `o3-2025-04-16`, `o3-pro-2025-06-10` | `gpt-5.6-sol` / `gpt-5.6-terra` / `gpt-5.6-luna` (per model) |
| January 6, 2027 | Self-serve fine-tuning further restricted (inactive fine-tuned models disabled when base model is deprecated) | — |
| January 20, 2027 | Legacy audio/realtime/transcription: `gpt-realtime`, `gpt-audio`, `gpt-4o-audio`, `gpt-4o-realtime`, `gpt-realtime-mini`, `gpt-audio-mini`, `gpt-4o-mini-realtime`, `gpt-4o-mini-audio`, `gpt-4o-mini-transcribe-2025-03-20` | `gpt-realtime-2.1` / `gpt-audio-1.5` / `gpt-realtime-2.1-mini` (per model) |

Past shutdowns: Codex models (`code-davinci-002`, `code-cushman-002`) retired March 2023; legacy endpoints `/v1/engines` and `/v1/search` shut down December 2022.

## Notes

- Dates and the model list above are the state of the official deprecations page as of this writing (current as of Aug 2026); always re-check the live page before relying on a specific shutdown date.
- The Assistants API deprecation is the one most relevant to this category — see the dedicated migration path.
- The source page (`/api/docs/deprecations`) maintains a full dated archive back to 2022; older announcements (2022–mid 2026), including per-model legacy pricing tables, are not reproduced here to keep this reference current and concise.

## Related

- [Assistants to Responses migration](./assistants-to-responses-migration.md)
- [Migrate Chat Completions to Responses](./migrate-chat-completions-to-responses.md)
- [All models](../getting-started/models-all.md)
- [Models](../getting-started/models.md)
