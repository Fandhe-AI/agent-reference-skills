# Run Hermes Locally with Ollama — Zero API Cost

Run Hermes Agent entirely on your own machine with Ollama and open-weight models, with no cloud API keys.

## Signature / Usage

```bash
curl -fsSLo ollama-install.sh https://ollama.com/install.sh
less ollama-install.sh   # review before running
sh ollama-install.sh
ollama pull gemma4:31b
hermes setup     # Custom Endpoint: http://localhost:11434/v1, key empty or "no-key"
hermes
```

```yaml
model:
  default: "gemma4:31b"
  provider: "custom"
  base_url: "http://localhost:11434/v1"
```

Optional cloud fallback (only activates when the local model fails; sends conversations to OpenRouter and incurs paid API usage):

```yaml
fallback_providers:
  - provider: openrouter
    model: anthropic/claude-sonnet-4
```

Extend context (Hermes needs at least 64,000 tokens; Ollama defaults to 2048):

```bash
cat > ~/.hermes/cache/scratch/Modelfile << 'EOF'
FROM gemma4:31b
PARAMETER num_ctx 64000
EOF
ollama create gemma4-64k -f ~/.hermes/cache/scratch/Modelfile
```

Then update your Hermes config to use `gemma4-64k` as the model name and set a matching context length:

```yaml
model:
  default: "gemma4-64k"
  context_length: 64000
```

Keep the model loaded: `curl http://localhost:11434/api/generate -d '{"model": "gemma4:31b", "keep_alive": "24h"}'` or `Environment="OLLAMA_KEEP_ALIVE=24h"` in `/etc/systemd/system/ollama.service.d/override.conf`.

Provider alias fix when `provider ollama` has no endpoint:

```yaml
providers:
  ollama:
    base_url: "http://localhost:11434/v1"
```

## Options / Props

| Model | Size | RAM | Tool calling |
|-------|------|-----|:---:|
| `gemma4:31b` | ~20 GB | 24+ GB | Yes |
| `gemma2:27b` | ~16 GB | 20+ GB | No |
| `gemma2:9b` | ~5 GB | 8+ GB | No |
| `llama3.2:3b` | ~2 GB | 4+ GB | No |

| Component | Minimum | Recommended |
|-----------|---------|-------------|
| RAM | 8 GB (3B models) | 32+ GB (27B+) |
| Storage | 5 GB | 30+ GB |
| CPU | 4 cores | 8+ cores |
| GPU | Not required | NVIDIA 8+ GB VRAM |

## Notes

- Models without tool-call support can only chat; of the listed models only `gemma4:31b` has reliable tool calling. Hermes auto-repairs malformed tool calls and, only if `fallback_providers` is configured (optional, see above), falls back to a cloud provider after 3 local failures. Raw tool JSON in replies usually means the server is not parsing tool calls (llama.cpp needs `--jinja`, vLLM needs `--enable-auto-tool-choice --tool-call-parser hermes`).
- CPU-only: set `HERMES_API_TIMEOUT=1800` in `~/.hermes/.env` (it is an env var, not a `config.yaml` key).
- Slow first response is prefill of the system prompt plus tool schemas; mitigate with keep-alive, a wider timeout, `hermes prompt-size` plus `hermes tools` / `hermes skills` to trim, and GPU offload (`ollama ps`). Hermes raises the stream read timeout from 120s to 1800s for local endpoints (`HERMES_STREAM_READ_TIMEOUT`).
- "provider 'ollama' has no endpoint configured": Hermes refuses to fall back to OpenRouter with a stray cloud key; add the endpoint.
- "Connection refused": start Ollama with `sudo systemctl start ollama` or `ollama serve`.
- Gateway bots (Telegram / Discord) work with `platforms.telegram.enabled` / `token` config and `hermes gateway`.
- Desktop app: Settings -> Providers -> Local Models manages a local llama.cpp server instead.
- The guide's cost comparison (~$0.80 Claude Sonnet vs $0 local per ~100K-in / 20K-out session) is illustrative.
- Adapted: the official guide pipes the installer straight into sh; this page splits it into download, review and run steps.
- Adapted: context_length added because Ollama's /api/show reports the model maximum, not the custom num_ctx (see troubleshooting-agent-quality).
- Source: https://hermes-agent.nousresearch.com/docs/guides/local-ollama-setup (pinned to v0.22.2)

## Related

- [local-llm-on-mac](./local-llm-on-mac.md)
