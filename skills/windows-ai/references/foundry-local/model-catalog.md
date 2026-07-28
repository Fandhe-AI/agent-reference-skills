# Model Catalog and Hardware Variants

The Foundry Catalog is a cloud-hosted, curated registry of models pre-compiled to ONNX and optimized for on-device use. Each alias (for example `qwen2.5-0.5b`) maps to multiple hardware-specific variants (CPU, GPU, NPU); Foundry Local automatically picks the best one for the current device.

## Signature / Usage

```bash
foundry model list
foundry model list --filter device=GPU
foundry model list --filter alias=qwen*
foundry model run qwen2.5-0.5b-instruct-generic-cpu   # force a specific CPU variant
```

## Options / Props

`foundry model list --filter <key>=<value>` keys:

| Key | Values | Description |
|---|---|---|
| `device` | `CPU`, `GPU`, `NPU` | Hardware device type the model variant targets. |
| `provider` | `CPUExecutionProvider`, `CUDAExecutionProvider`, `WebGpuExecutionProvider`, `QNNExecutionProvider`, `OpenVINOExecutionProvider`, `NvTensorRTRTXExecutionProvider`, `VitisAIExecutionProvider` | Execution provider/runtime. |
| `task` | `chat-completion`, `text-generation`, (audio: `automatic-speech-recognition`) | Model's intended task. |
| `alias` | e.g. `phi4-cpu`, `qwen2.5-coder-0.5b-instruct-generic-cpu` | Filters by alias; supports `*` prefix wildcard. |

Model metadata fields (`GET /foundry/list`, `FoundryModelInfo`/`ModelInfo`): `name`/`id`, `displayName`, `alias`, `providerType`/`publisher`, `uri`, `version`, `modelType` (e.g. ONNX), `promptTemplate` (`system`/`user`/`assistant`/`prompt`), `task`, `runtime.deviceType`, `runtime.executionProvider`, `fileSizeMb`, `supportsToolCalling`, `license`, `licenseDescription`, `parentModelUri`.

## Notes

- Using a model **alias** selects the best-performing variant for the device automatically (for example a CUDA build when an NVIDIA GPU is present, an NPU build when a supported NPU is present, otherwise CPU). Use a specific **model ID** to pin an exact variant regardless of hardware.
- Filter negation: prefix a value with `!` to exclude it, for example `--filter device=!GPU`. Only one filter key per command; comparisons are case-insensitive; unrecognized keys error.
- On first `foundry model list` run after install, Foundry Local downloads the execution providers matching the local hardware before showing the model list.
- Catalog covers chat completion models (GPT OSS, Qwen, DeepSeek, Mistral, Phi) and audio transcription models (Whisper: `whisper-tiny`, `whisper-base`, `whisper-small`). Models outside the catalog can be compiled to ONNX and used the same way.
- Execution provider hardware requirements (Windows plugin EPs, auto-downloaded on first use): NVIDIA GeForce RTX 30-series+ for `NvTensorRTRTXExecutionProvider`/CUDA; Intel 11th Gen+ CPU / 12th Gen+ GPU / 15th Gen+ NPU for `OpenVINOExecutionProvider`; Qualcomm Snapdragon X Elite/Plus for `QNNExecutionProvider`; supported AMD Adrenalin driver range for `VitisAIExecutionProvider`. CPU (via MLAS) and WebGPU (via Dawn) are always-available fallbacks.

## Related

- [Foundry Local CLI](./installation-and-cli.md)
- [Foundry Local Architecture](./architecture.md)
- [Cache Management](./cache-management.md)
