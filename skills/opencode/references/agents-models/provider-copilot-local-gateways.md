---
source: https://opencode.ai/docs/providers/#copilot
---

# Provider: Copilot, Ollama, Runtimes, Gateways

GitHub Copilot device OAuth, Ollama discovery, LM Studio and vLLM runtimes, and OpenRouter or custom gateways.

## Signature / Usage

### Copilot

GitHub Copilot supports device OAuth rather than manual API-key entry. Connect **GitHub Copilot**, choose GitHub.com or GitHub Enterprise, finish the device flow, then open `/models`.

```text
/connect
# Select GitHub Copilot, then Login with GitHub Copilot.
/models
```

For GitHub Enterprise, enter the deployment URL or domain when prompted. OpenCode uses a Copilot API endpoint returned by GitHub when available; otherwise it derives the endpoint from the enterprise domain.

```text
company.ghe.com
```

The connected account needs Copilot Chat access. If GitHub reports no entitlement, sign up for Copilot Free or ask the organization to assign a Copilot seat, then connect again. OpenCode fetches the account's current model list after login and whenever the active Copilot account changes.

### Ollama

Start Ollama and pull a model. OpenCode probes `http://127.0.0.1:11434`, discovers completion models, and adds them to `/models` without an account connection.

```bash
ollama serve
ollama pull qwen3:8b
```

Point OpenCode at a remote or proxied Ollama server with `settings.baseURL`. Include `/v1`; OpenCode derives the native `/api/tags` and `/api/show` discovery paths from it. `apiKey` is optional and is sent as a bearer token to discovery and model requests.

```jsonc
// opencode.jsonc
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

Discovery refreshes periodically and keeps the last successful inventory during a temporary outage. Embedding-only models do not appear because OpenCode only adds models whose Ollama metadata includes the `completion` capability.

### Runtimes

LM Studio and vLLM also have built-in local discovery. Their default endpoints are `http://127.0.0.1:1234/v1` and `http://127.0.0.1:8000/v1`.

```jsonc
// opencode.jsonc
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

LM Studio discovers language models from `/api/v1/models`. vLLM checks `/health` before reading `/v1/models`; its discovery cannot infer tool support, so discovered vLLM models start with tools disabled. For another OpenAI-compatible runtime, use the [custom provider](./providers.md) recipe and list its models explicitly.

### Gateways

OpenRouter uses its native runtime and catalog. Provide `OPENROUTER_API_KEY` to the OpenCode server or connect an OpenRouter account, then refer to models with the full OpenRouter model ID after the provider prefix.

```jsonc
// opencode.jsonc
{
  "$schema": "https://opencode.ai/config.json",
  "model": "openrouter/anthropic/claude-sonnet-5.5",
}
```

Keep the native OpenRouter package when overriding its endpoint or routing through an OpenRouter-compatible gateway. This preserves OpenRouter request and reasoning behavior.

```jsonc
// opencode.jsonc
{
  "$schema": "https://opencode.ai/config.json",
  "providers": {
    "openrouter": {
      "settings": {
        "baseURL": "https://openrouter-gateway.example.com/api/v1",
      },
      "headers": {
        "X-Gateway-Tenant": "engineering",
      },
    },
  },
}
```

For a gateway that exposes an OpenAI-compatible API but has its own model inventory, define a custom provider instead. The configuration key becomes the provider prefix and each `models` key becomes a selectable model ID.

```jsonc
// opencode.jsonc
{
  "$schema": "https://opencode.ai/config.json",
  "model": "company/coder",
  "providers": {
    "company": {
      "env": ["COMPANY_GATEWAY_KEY"],
      "package": "@opencode/ai/providers/openai-compatible",
      "settings": {
        "baseURL": "https://gateway.example.com/v1",
      },
      "models": {
        "coder": { "modelID": "upstream/coder-v2" },
      },
    },
  },
}
```

## Related

- [Local models](./local-models.md)
- [Providers](./providers.md)
- [Provider errors](./provider-errors.md)
