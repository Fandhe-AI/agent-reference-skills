# Install and Use NVIDIA PAIR with llama.cpp

NVIDIA PAIR (Personal AI Router) 1.0.0 connects computers on a local network and exposes Ollama-compatible and OpenAI-compatible proxy endpoints, routing each independent inference request to one eligible system (llama.cpp, Ollama, or LM Studio).

## Signature / Usage

```bash
# Debian/Ubuntu (DGX Spark: arm64 package)
sudo apt install "./NVPAIR-Setup-VERSION-ARCH.deb"

# Terminal interface (headless / SSH)
nvpair --version
nvpair

# Test through PAIR's llama.cpp proxy (default port 8080)
curl <PAIR_BASE_URL>/v1/models
curl <PAIR_BASE_URL>/v1/chat/completions \
  -H "Content-Type: application/json" \
  -d '{"model": "<MODEL_NAME>", "messages": [{"role": "user", "content": "Hello"}]}'
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `--broker-path <path>` | flag | Use a PAIR service binary not beside the terminal-interface binary |
| `--log-level <level>` | flag | `debug`, `info`, `warn`, `error` (also `NVPAIR_LOG_LEVEL`) |
| `--appearance <mode>` | flag | `auto`, `light`, `dark` |
| `--version` | flag | Print terminal-interface component version |

Default ports:

| Service | Default port |
| --- | --- |
| Ollama-compatible proxy / engine behind PAIR | `11434` / `11435` and upward |
| LM Studio / OpenAI-compatible proxy / engine behind PAIR | `1234` / `1235` and upward |
| llama.cpp / OpenAI-compatible proxy / managed server behind PAIR | `8080` / `8081` |
| Cluster: mDNS discovery | `5353/udp` |
| Cluster: inventory / errors / workload / pairing / model list / engine control | `14318` / `14319` / `14320` / `14321` / `14322` / `14323` |

## Notes

- PAIR sends each request to one system; it does not combine GPU memory or split a model or request across systems
- Package filenames: `NVPAIR-Setup-1.0.0-arm64.deb` (DGX Spark / Debian-Ubuntu ARM64), `-amd64.deb`, `-arm64.exe` / `-x64.exe` (Windows), `-arm64.dmg` / `-x64.dmg` (macOS 13+)
- Endpoints accept loopback traffic only (`403` from another machine); install PAIR on the system running the client and use the URL shown under **Endpoints** (or **Jobs** tab in the terminal interface)
- llama.cpp model IDs are `owner/repository:quantization` (for example `ggml-org/gemma-3-1b-it-GGUF:Q4_K_M`); use the exact ID from `/v1/models`. Keep managed llama.cpp in router mode; do not add `-m` or `-hf` arguments. Idle models sleep after five minutes
- Ollama's `/api/chat` works only on the Ollama endpoint; all three engines accept OpenAI-style `/v1/chat/completions`
- Pairing uses a six-digit short-lived PIN on a trusted local network. Run only one PAIR interface (desktop app or terminal interface) per system
- Terminal interface keys: tabs `1`-`5` (Nodes, Jobs, Service, Errors, Logs); on Nodes press `p` to pair, `a` to accept; Jobs `t` generates synthetic traffic; `q` quits and shuts down the PAIR service tree. Use `tmux` to keep it running after SSH disconnect
- Duration: about 10 minutes plus engine and model downloads; Risk: Low to medium. Last updated 10/06/2026
- Source: https://build.nvidia.com/spark/pair (dgx-spark-playbooks commit c035e0ac7d21)

## Related

- [llama.cpp](./llama-cpp.md)
- [Ollama](./ollama.md)
- [LM Studio](./lm-studio.md)
