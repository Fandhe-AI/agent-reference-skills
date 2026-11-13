---
source: https://opencode.ai/docs/providers/
---

# Local Models (Ollama, LM Studio, vLLM)

Use locally served models; OpenCode discovers them without an account connection.

```bash
ollama serve
ollama pull qwen3:8b
```

Point OpenCode at a remote or proxied Ollama server:

```jsonc title="opencode.jsonc"
{
  "$schema": "https://opencode.ai/config.json",
  "providers": {
    "ollama": {
      "settings": {
        "baseURL": "https://ollama.example.com/v1",
        "apiKey": "{env:OLLAMA_API_KEY}",
      },
    },
  },
}
```

LM Studio and vLLM on another host:

```jsonc title="opencode.jsonc"
{
  "$schema": "https://opencode.ai/config.json",
  "providers": {
    "lmstudio": {
      "settings": { "baseURL": "http://gpu-host:1234/v1" },
    },
    "vllm": {
      "settings": { "baseURL": "http://gpu-host:8000/v1" },
    },
  },
}
```

## Notes

- Ollama is probed at `http://127.0.0.1:11434` by default; include `/v1` in a custom `baseURL`.
- Only models whose Ollama metadata includes the `completion` capability appear; embedding-only models do not.
- Discovered vLLM models start with tools disabled.
