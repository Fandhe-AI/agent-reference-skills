# What is Foundry Local?

Foundry Local is an end-to-end local AI solution for shipping applications that run entirely on the user's device. It provides an SDK (C#, JavaScript, Python, Rust), a curated catalog of optimized models, and automatic hardware acceleration in a lightweight package (~20 MB added to the app).

## Signature / Usage

```bash
winget install Microsoft.FoundryLocal
foundry model run qwen2.5-0.5b
```

## Options / Props

| Feature | Description |
|---|---|
| Lightweight runtime | Handles model acquisition, hardware acceleration, model management, and inference via ONNX Runtime. |
| Curated model catalog | Chat completion models (GPT OSS, Qwen, DeepSeek, Mistral, Phi) and audio transcription (Whisper), versioned and hardware-optimized. |
| Automatic hardware acceleration | Detects available hardware, selects the best execution provider (GPU/NPU), falls back to CPU. |
| Smart model management | Downloads on first use, caches locally, selects the best-performing variant per device. |
| OpenAI-compatible API | Point an existing OpenAI SDK client at a Foundry Local endpoint with minimal code changes. |
| Optional local server | OpenAI-compatible REST server for multi-process/tool integrations (LangChain, Open WebUI); most embedded scenarios use the SDK directly in-process instead. |

## Notes

- Runs entirely on-device. Prompts and model outputs never leave the device during inference; the network is only used to download models/execution providers and for optional diagnostics.
- Supported platforms: Windows, macOS (Apple silicon), and Linux. No Azure subscription is required.
- Not designed as a multi-user server inference stack (no request queuing, continuous batching, or GPU sharing across concurrent clients). For that, use a dedicated server framework (for example vLLM, Triton).
- **Foundry Local vs Azure AI Foundry**: use Foundry Local to embed AI directly in client applications on end-user devices (offline-capable, no per-token cost, no Azure subscription). Use Azure AI Foundry (cloud) for hosted, multi-user, enterprise-scale AI development and deployment. For on-premises, Kubernetes-native, multi-user inference with Azure Arc management, see Foundry Local on Azure Local (a separate product, out of scope here).
- Namespace/package: `foundry-local-sdk` (npm/PyPI/crates.io), `Microsoft.AI.Foundry.Local` (NuGet). Distinct from the cloud Azure AI Foundry SDKs.

## Related

- [Foundry Local Architecture](./architecture.md)
- [Installation and CLI](./installation-and-cli.md)
- [Model Catalog and Hardware Variants](./model-catalog.md)
