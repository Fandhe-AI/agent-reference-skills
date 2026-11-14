---
source: https://opencode.ai/docs/models/#local
---

# Local Models

OpenCode automatically discovers models from Ollama, LM Studio, and vLLM at their default local addresses. You can also configure any OpenAI-compatible server manually.

## Signature / Usage

```text
ollama/gemma3:4b
lmstudio/google/gemma-4-26b-a4b
vllm/Qwen/Qwen3-Coder-30B-A3B-Instruct
```

### Ollama

With Ollama listening at `http://127.0.0.1:11434`, select a discovered model with the `ollama` provider ID:

```jsonc
// opencode.jsonc
{
  "$schema": "https://opencode.ai/config.json",
  "model": "ollama/gemma3:4b",
}
```

OpenCode refreshes the inventory in the background and reads context, vision, and tool-use capabilities from Ollama. Embedding-only models are excluded.

For another host or port, set Ollama's OpenAI-compatible URL. Discovery still uses the native Ollama API at the same path prefix:

```jsonc
// opencode.jsonc
{
  "providers": {
    "ollama": {
      "settings": {
        "baseURL": "http://127.0.0.1:5678/v1",
        "apiKey": "{env:OLLAMA_API_KEY}",
      },
    },
  },
}
```

- Omit `apiKey` when the endpoint does not require bearer authentication.
- Disable discovery with `"plugins": ["-opencode.provider.ollama"]`.

### LM Studio

With an unauthenticated LM Studio server at `http://127.0.0.1:1234`, select a discovered model with the `lmstudio` provider ID:

```jsonc
// opencode.jsonc
{
  "$schema": "https://opencode.ai/config.json",
  "model": "lmstudio/google/gemma-4-26b-a4b",
}
```

OpenCode refreshes the inventory in the background and reads context, vision, and tool-use capabilities from LM Studio. Embedding models are excluded.

For another host or port, set the OpenAI-compatible URL. Models are still discovered automatically:

```jsonc
// opencode.jsonc
{
  "providers": {
    "lmstudio": {
      "settings": {
        "baseURL": "http://127.0.0.1:5678/v1",
        "apiKey": "{env:LMSTUDIO_API_KEY}",
      },
    },
  },
}
```

- Omit `apiKey` when LM Studio authentication is disabled.
- Disable discovery with `"plugins": ["-opencode.provider.lmstudio"]`.

### vLLM

With vLLM listening at `http://127.0.0.1:8000`, select a discovered model with the `vllm` provider ID:

```jsonc
// opencode.jsonc
{
  "$schema": "https://opencode.ai/config.json",
  "model": "vllm/Qwen/Qwen3-Coder-30B-A3B-Instruct",
}
```

OpenCode checks `/health`, refreshes `/v1/models` in the background, uses the reported `max_model_len` as the context limit, and includes only model cards owned by `vllm`.

Discovered models advertise text input and output, but not vision or tools. vLLM enables tool calling with server flags such as `--enable-auto-tool-choice` and `--tool-call-parser`, which discovery does not report.

For another endpoint or an authenticated server, set its OpenAI-compatible URL:

```jsonc
// opencode.jsonc
{
  "providers": {
    "vllm": {
      "settings": {
        "baseURL": "http://127.0.0.1:9000/v1",
        "apiKey": "{env:VLLM_API_KEY}",
      },
    },
  },
}
```

- Omit `apiKey` when authentication is disabled.
- Disable discovery with `"plugins": ["-opencode.provider.vllm"]`.
- Path-prefixed proxies are supported. For example, `https://example.com/vllm/v1` checks `/vllm/health` and discovers `/vllm/v1/models`.

### Compatible

For another OpenAI-compatible server, define its provider package, endpoint, and at least one model:

```jsonc
// opencode.jsonc
{
  "$schema": "https://opencode.ai/config.json",
  "model": "local/coder",
  "providers": {
    "local": {
      "name": "Local server",
      "package": "@opencode/ai/providers/openai-compatible",
      "settings": {
        "baseURL": "http://127.0.0.1:1234/v1",
      },
      "models": {
        "coder": {
          "modelID": "model-name-on-server",
          "capabilities": {
            "tools": true,
            "input": ["text"],
            "output": ["text"],
          },
          "limit": {
            "context": 32768,
            "output": 8192,
          },
        },
      },
    },
  },
}
```

Use the server's real model name, limits, input and output types, and tool support. OpenCode cannot detect whether the custom-model fallback values are accurate. If the endpoint requires a key, add `apiKey` to `settings` with an environment substitution such as `"apiKey": "{env:LOCAL_API_KEY}"`; do not commit secrets.

## Related

- [Models](./models.md)
- [Provider: Copilot, Ollama, runtimes, gateways](./provider-copilot-local-gateways.md)
- [Provider model entries](./provider-packages-models.md)
