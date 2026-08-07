# FAQs about using AI in Windows apps

Official FAQ covering which Windows AI option to pick (Windows AI APIs, Foundry Local, Windows ML), hardware requirements, OpenAI-SDK compatibility with Foundry Local, offline behavior, data privacy, and platform/runtime questions (Windows ML, DirectML, SDK package naming).

## Signature / Usage

No API surface — this is an FAQ document. Example: check a device's GPU/NPU via Task Manager > Performance tab, or run `foundry model list` to see active execution providers.

## Options / Props

| Question | Answer summary |
|------|-------------|
| Which Windows AI option should I use? | Windows AI APIs for Copilot+ PC simplicity (no model management); Foundry Local for wider model catalog / non-Copilot+ hardware / OpenAI-compatible API; Windows ML for full ONNX/EP control. |
| Do I need a Copilot+ PC or NPU? | Windows AI APIs require a Copilot+ PC with NPU; Foundry Local runs on any DirectX 12 GPU (no NPU needed); Windows ML supports a broad CPU/GPU/NPU range. |
| Can I use Foundry Local with existing OpenAI SDK code? | Yes — it exposes an OpenAI-compatible REST API; start with `foundry service start` and point the client at the local endpoint. |
| Is Foundry Local production-ready? | Native SDKs (C#, Python, JS, Rust) are alpha/pre-release; the ONNX Runtime/model-serving core is production-grade — pin package versions. |
| Does Foundry Local work offline? | Yes, after the model is cached; only the initial download and optional catalog refresh need connectivity; check via `IsCachedAsync`/`is_cached`. |
| foundry-local-sdk vs foundry-local-sdk-winml? | `-winml` is the Windows-specific, hardware-accelerated package; `foundry-local-sdk` is cross-platform without acceleration — install only one (they pin conflicting `onnxruntime-core` versions). |

## Notes

- `foundry-local` (without `-sdk`) on PyPI is an unrelated third-party package — do not install it expecting Foundry Local.
- Windows AI APIs process data locally on the NPU; input is not sent to Microsoft servers.
- DirectML is a low-level GPU ML acceleration API on Direct3D 12; ONNX Runtime uses it as an execution provider when CUDA is unavailable.

## Related

- [Choose your Windows AI solution](./choose-your-windows-ai-solution.md)
- [Ready-to-use local LLMs on Windows](./local-llms.md)
- [Device requirements and fallback](./device-requirements.md)
- [Choose between cloud-based and local AI models](./faq-cloud-vs-local.md)
