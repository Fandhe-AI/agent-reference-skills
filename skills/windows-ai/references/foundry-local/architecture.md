# Foundry Local Architecture

Foundry Local ships as a single native library inside your application. Application code loads the Foundry Local Core API in-process and calls it through language SDKs (C#, JavaScript, Python, Rust) instead of connecting to a separate service or daemon.

## Signature / Usage

```text
App code (C#/JS/Python/Rust)
  -> Language SDK
    -> Foundry Local Core API (native lib: .dll / .so / .dylib)
      -> ONNX Runtime (inference, execution providers)
      -> Foundry Catalog (cloud-hosted model registry, download on first use)
      -> WinML (Windows only: execution provider registration)
      -> optional REST endpoint (OpenAI-compatible, in-process web server)
```

## Options / Props

| Component | Role |
|---|---|
| Foundry Local Core API | Central native library. Handles model lifecycle (download/load/run/unload), hardware abstraction, thread-safe session-based inference. |
| ONNX Runtime | Inference engine. Graph optimization, plugin execution providers (GPU/NPU), CPU fallback, quantized model support. |
| Foundry Catalog | Cloud-hosted model registry. Hardware-optimized variants (CPU/GPU/NPU), download-on-first-use, local caching, version-aware updates. |
| WinML (Windows only) | Sources hardware-matched execution provider plugins from the OS/Windows Update, registers them with ONNX Runtime, negotiates driver compatibility. |
| Optional REST API | OpenAI-compatible HTTP endpoint started in-process by the SDK, for tools that need HTTP (LangChain, Open WebUI). Not required for native SDK usage. |

Execution providers and device types:

| Execution provider | Device type | Platform |
|---|---|---|
| NVIDIA CUDA | GPU | Windows, Linux |
| WebGPU (via Dawn) | GPU | Windows, Linux, macOS |
| AMD Vitis | NPU | Windows |
| Qualcomm (QNN) | NPU | Windows |
| Intel OpenVino | GPU | Windows |
| CPU | CPU | Windows, Linux, macOS (always available fallback) |

## Notes

- Model lifecycle phases: **Download** (from Foundry Catalog to local cache) → **Load** (into memory, ONNX Runtime session + execution provider selection) → **Inference** (sync or streaming) → **Unload** (frees memory; cached files remain on disk).
- On macOS Apple Silicon, GPU acceleration goes through WebGPU via Dawn, which compiles WebGPU compute shaders to Metal Shading Language and runs on Apple's Metal framework (no dedicated Metal execution provider needed).
- Foundry Local uses the network only to download models and execution provider plugins from the Foundry Catalog; after the initial download, inference runs entirely offline.
- Namespace: Windows-specific integration is via `WinML` (`windows/ai/new-windows-ml`). Distinct from the Android/Apple ML runtimes.

## Related

- [What is Foundry Local?](./overview.md)
- [Model Catalog and Hardware Variants](./model-catalog.md)
- [Foundry Local SDK](./sdk.md)
