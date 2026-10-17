# Local Models

Hermes can run open models entirely on your machine. It downloads and manages the inference engine (llama.cpp), picks the right model build for your hardware, and manages memory with no context-size, GPU-layer, or quantization settings to configure. No account or API key, and no network access after a model is downloaded.

## Signature / Usage

Desktop: Settings -> Providers -> Local Models (or **Run models locally** in onboarding) -> **Install runtime** -> pick a model -> **Download** -> **Use**. From a terminal, `hermes model` -> **Local models** runs the same setup.

```yaml
local_runtime:
  enabled: false     # true = start the managed server with Hermes.
                     # The desktop "Use" button sets this automatically.
  backend: auto      # auto | cuda | metal | vulkan | hip | cpu
  detect_ports: [8081]  # extra ports to probe for a llama-server you run
                        # yourself (the default probe is :8080 only)
```

Using your own llama-server on a fixed port:

```yaml
providers:
  llamacpp:
    base_url: http://127.0.0.1:8081/v1
    model: my-model
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `local_runtime.enabled` | bool | Start the managed server with Hermes |
| `local_runtime.backend` | `auto` / `cuda` / `metal` / `vulkan` / `hip` / `cpu` | Engine backend; `auto` prefers CUDA for NVIDIA and Vulkan for AMD/Intel, else CPU |
| `local_runtime.detect_ports` | list of ports | Extra ports probed for a self-run llama-server (default probe is :8080) |
| `model.provider: llamacpp` + `model.default` | settings | Selecting a local model as the main model |

## Notes

- Local Models is on by default in the desktop app on macOS, Windows, and Linux (x64 and arm64); on other platforms launch the app with `--local`.
- Backends: Windows CUDA (supported NVIDIA targets) / Vulkan (x64) / CPU; Linux CUDA (x64 and arm64 NVIDIA, needs a CUDA 13 driver) / Vulkan / CPU; macOS Metal / CPU; HIP/ROCm is an explicit choice on supported x64 targets. Unsupported backend/target pairs fail before any download.
- Every catalog model is priced against your machine: memory fit (green fits GPU, amber uses system RAM, red too big), context window, and download size. Hermes picks the highest-quality build that runs fully on the GPU and never offers builds below 4-bit. The recommendation is the highest-quality model that runs entirely in GPU/unified memory at a predicted 20 tokens/second or more.
- Memory management: models start at a context window that fully fits the GPU and grow toward their native maximum; every recommended model gets at least a 64K window; idle models are unloaded after 15 minutes and reload on the next message.
- Downloads use PM's pinned URLs and SHA-256 (`pm/lock.json`), can be paused/resumed, and partials live in PM's writable `cache/partials`. Engine versions come only from PM's lockfile (no `local_runtime.tag` override).
- **Find more models** searches Hugging Face; **Add model file** links an existing `.gguf` without copying. A running llama-server is detected and used instead of starting a new one; a custom endpoint accepts the server root or the full `/v1` URL.
- Models live in the machine-shared `models/` directory; `runtimes/llamacpp/` holds mutable presets and server state. A GPU with 8 GB+ runs the small catalog models; 16 GB+ runs the 27-35B models at high quality.
- Source: https://hermes-agent.nousresearch.com/docs/user-guide/local-models (pinned to v0.22.2)

## Related

- [desktop.md](./desktop.md)
