# Platform card - Phi Silica

Responsible-AI transparency card for Phi Silica, the NPU-optimized small language model that powers `LanguageModel` and the Text Intelligence Skills (summarize, rewrite, text-to-table), including its speculative-decoding technique, LoRA fine-tuning support, and context-window limits.

## Signature / Usage

No API surface — this is a Responsible AI transparency document; see `LanguageModel` for the actual developer API.

## Options / Props

| Capability | Description |
|------|-------------|
| Text generation | Local generation of coherent text from a prompt via the NPU. |
| Summarize / Rewrite / Text-to-table | Built-in Text Intelligence Skills producing structured, formatted outputs. |
| LoRA fine-tuning | Loads a Low-Rank Adaptation adapter to customize model behavior without full retraining. |
| Speculative decoding | A smaller draft model proposes tokens that the main model validates in parallel, speeding up generation. |

## Notes

- This is a **Platform Card** (an AI platform service), distinct from **Application Cards** for features that consume Phi Silica (e.g. Click to Do, Paint).
- Context window is small (~3.5K tokens) — long documents, multi-turn chat, or large RAG context can be truncated.
- Requires the Limited Access Feature (LAF) unlock token; runs only on Windows Copilot+ PCs with an NPU (GPU fallback also available per `LanguageModel` device requirements).
- Content moderation severity is configurable via `ContentFilterOptions`; both input and output are evaluated.
- Not available in China.

## Related

- [LanguageModel](./language-model.md)
- [Phi Silica LoRA fine-tuning](./phi-silica-lora.md)
- [Text Intelligence Skills](./text-intelligence-skills.md)
- [Responsible AI guidelines](./responsible-ai.md)
