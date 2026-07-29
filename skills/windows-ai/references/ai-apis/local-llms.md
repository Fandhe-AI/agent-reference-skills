# Ready-to-use local LLMs on Windows

Decision guide for integrating a local LLM into a Windows app, comparing the three paths Microsoft Foundry on Windows offers: ready-to-use Phi Silica, 20+ open-source LLMs via Foundry Local, and bring-your-own Hugging Face (or other) models via Windows ML.

## Signature / Usage

No API surface — this page is a decision guide linking to the API/CLI surfaces of each option below.

## Options / Props

| Option | What it is | Supported devices |
|------|-------------|------|
| Phi Silica | The same on-device LLM used by inbox Windows experiences; ready-to-use in a handful of lines of code, zero ML expertise needed | Copilot+ PCs (NPU) |
| 20+ open-source LLMs (Foundry Local) | Choose from 20+ available OSS LLM models, distributed and shared across apps by Microsoft | Windows 10+ (performance varies; not all models available on all devices) |
| Hugging Face / other models (Windows ML) | Bring-your-own ONNX-compatible model, run locally via Windows ML | Windows 10+ (model compatibility and performance vary by hardware) |

## Notes

- If the ready-to-use LLMs don't fit a scenario, Phi Silica supports LoRA fine-tuning on a custom training dataset — less work than training a model from scratch.
- The Hugging Face / Windows ML path is more complex and takes more time than the ready-to-use options; use it when no ready-to-use or fine-tuned model covers the scenario.

## Related

- [LanguageModel](./language-model.md)
- [Phi Silica LoRA fine-tuning](./phi-silica-lora.md)
- [Choose your Windows AI solution](./choose-your-windows-ai-solution.md)
