---
source: https://opencode.ai/docs/providers/
---

# Providers

OpenCode includes a provider and model catalog from [models.dev](https://models.dev). For most providers, connect an account first, then select a model.

## Signature / Usage

### Setup

Run `/connect`, choose a provider, and enter its credentials. Then run `/models` to select one of its models.

```text
/connect
/models
```

### Go

[OpenCode Go](https://opencode.ai/docs/console/go/) is an optional subscription for coding models tested by the OpenCode team. Subscribe in the [console](https://opencode.ai/console), copy your API key, then connect it as **OpenCode Go**.

```text
/connect
# Select OpenCode Go, then paste your API key.
/models
```

See the [Go guide](https://opencode.ai/docs/console/go/) for usage limits, endpoints, and privacy details.

### ChatGPT

Use a ChatGPT Plus or Pro plan instead of an OpenAI API key. Connect **OpenAI**, then choose **Sign in with ChatGPT** or one of the legacy **Codex** sign-in methods. Usage counts against your plan, so these models show no cost.

```text
/connect
/models
```

#### Context limits

By default, OpenCode caps the context window for these sign-ins below each model's real limit. The caps match the defaults in Codex, so your plan usage is consumed at a similar rate as it would be in other OpenAI products.

| Model | Input limit |
| --- | --- |
| GPT-6.1 Sol and newer | 500,000 |
| Older models | 272,000 |

To opt out, disable the cap plugin in your config. The `-` prefix turns off a built-in plugin; all other plugins stay enabled.

```jsonc
// opencode.jsonc
{
  "plugins": ["-opencode.provider.openai-context-caps"],
}
```

### Custom

Add a provider when its API is not already in the catalog. This OpenAI-compatible example defines the credential, runtime package, endpoint, and first model together.

```jsonc
// opencode.jsonc
{
  "$schema": "https://opencode.ai/config.json",
  "providers": {
    "acme": {
      "name": "Acme",
      "env": ["ACME_API_KEY"],
      "package": "@opencode/ai/providers/openai-compatible",
      "settings": {
        "baseURL": "https://llm.acme.example/v1",
      },
      "models": {
        "qwen3-coder": {
          "name": "Qwen 3 Coder",
        },
      },
    },
  },
}
```

The `providers` object is keyed by the provider ID used in model references, such as `acme/qwen3-coder`.

## Options / Props

| Field | Purpose |
| --- | --- |
| `name` | Display name. |
| `env` | Ordered environment variable names that can provide the credential. |
| `package` | Runtime provider package. |
| `canonical` | Built-in provider ID whose catalog defaults this provider inherits. |
| `compatibility` | API quirks shared by every model of this provider. See [Model compatibility](./model-compatibility.md). |
| `settings` | Typed OpenCode controls and JSON options passed to the runtime package. |
| `headers` | String-valued HTTP headers added to requests. |
| `body` | JSON fields merged into request bodies. |
| `models` | Models to add or override, keyed by the OpenCode model ID. |

## Notes

- Provider account management from the CLI is documented at https://opencode.ai/docs/cli/providers/ and belongs to the CLI category, not this one.
- Do not commit credentials; use `env` or `{env:NAME}` substitutions.

## Related

- [Provider requests](./provider-requests.md)
- [Provider packages and models](./provider-packages-models.md)
- [Azure](./provider-azure.md)
- [Bedrock and Vertex](./provider-bedrock-vertex.md)
- [Copilot, Ollama, runtimes, gateways](./provider-copilot-local-gateways.md)
- [Provider errors](./provider-errors.md)
- [Models](./models.md)
