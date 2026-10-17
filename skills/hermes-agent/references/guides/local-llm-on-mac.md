# Local LLMs on Mac

Run a local OpenAI-compatible LLM server on macOS (Apple Silicon) with llama.cpp or MLX (omlx), then point Hermes at it.

## Signature / Usage

| Backend | Install | Best at | Format |
|---------|---------|---------|--------|
| llama.cpp | `brew install llama.cpp` | Fastest time-to-first-token, quantized KV cache for low memory | GGUF |
| omlx | omlx.ai | Fastest token generation, native Metal optimization | MLX (safetensors) |

Both expose `/v1/chat/completions`; Hermes points at `http://localhost:8080` (llama.cpp) or `http://localhost:8000` (omlx).

```bash
brew install llama.cpp
brew install huggingface-cli
huggingface-cli download unsloth/Qwen3.5-9B-GGUF Qwen3.5-9B-Q4_K_M.gguf --local-dir ~/models

llama-server -m ~/models/Qwen3.5-9B-Q4_K_M.gguf \
  -ngl 99 \
  -c 131072 \
  -np 1 \
  -fa on \
  --cache-type-k q4_0 \
  --cache-type-v q4_0 \
  --host 127.0.0.1
```

Connect to Hermes:

```bash
hermes model
```

Select **Custom endpoint** and enter the base URL and model name.

## Options / Props

llama-server flags:

| Name | Type | Description |
|------|------|-------------|
| `-ngl 99` | int | Offload all layers to GPU (Metal) |
| `-c 131072` | int | Context window (128K tokens); reduce if low on memory |
| `-np 1` | int | Parallel slots; keep 1 for single-user use |
| `-fa on` | flag | Flash attention |
| `--cache-type-k q4_0` | string | Quantize key cache to 4-bit (big memory saver) |
| `--cache-type-v q4_0` | string | Quantize value cache to 4-bit |
| `--host 127.0.0.1` | string | Listen on loopback only (Hermes on the same machine). The official guide uses `0.0.0.0` (all interfaces); expose it only behind authentication / firewall rules |

KV cache memory at 128K context, 9B model:

| KV cache type | Memory |
|---------------|--------|
| f16 (default) | ~16 GB |
| q8_0 | ~8 GB |
| q4_0 | ~4 GB |

Timeouts:

| Timeout | Default | Local auto-adjustment | Env var override |
|---------|---------|----------------------|------------------|
| Stream read (socket-level) | 120s | Raised to 1800s | `HERMES_STREAM_READ_TIMEOUT` |
| Stale stream detection | 180s | Disabled entirely | `HERMES_STREAM_STALE_TIMEOUT` |
| API call (non-streaming) | 1800s | No change needed | `HERMES_API_TIMEOUT` |

## Notes

- Targets Apple Silicon (M1+). Intel Macs work with llama.cpp but without GPU acceleration.
- Recommended starter model: Qwen3.5-9B (Q4_K_M GGUF 5.3 GB, ~10 GB RAM at 128K context with quantized KV cache; MLX mxfp4 ~5 GB, ~12 GB RAM). Larger models (27B, 35B) need 32 GB+.
- Keep context at or above Hermes' 64K minimum; if memory is still short, use a smaller model or quantization (Q3_K_M).
- Benchmark (Apple M5 Max, 128 GB, Qwen3.5-9B): llama.cpp TTFT avg 67 ms, 70 tok/s; MLX TTFT avg 289 ms, 96 tok/s; 512 tokens total 7.3s vs 5.5s.
- Desktop app: Settings -> Providers -> Local Models installs and manages a local llama.cpp server (this guide is for manual setup).
- Hermes auto-detects local endpoints and relaxes streaming timeouts. A silent first turn is usually prefill (system prompt and tool schemas sent each call), not a hang.
- The official example binds `--host 0.0.0.0`; this page defaults to `127.0.0.1` because llama-server has no authentication by default.
- Gated Hugging Face models need `huggingface-cli login` first.
- Source: https://hermes-agent.nousresearch.com/docs/guides/local-llm-on-mac (pinned to v0.22.2)

## Related

- [local-ollama-setup](./local-ollama-setup.md)
