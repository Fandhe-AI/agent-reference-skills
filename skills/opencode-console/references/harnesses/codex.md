---
source: https://opencode.ai/docs/console/harnesses/codex/
---

# Codex

Codex speaks the OpenAI Responses API. Point it at Console and use any paid or Go model, including Claude, Gemini, and open models. Console translates the request for models that don't accept Responses.

## Signature / Usage

Add Console as a model provider in `~/.codex/config.toml` and make it the default.

```toml
model = "gpt-6.1-sol"
model_provider = "opencode"

[model_providers.opencode]
name = "OpenCode Console"
base_url = "https://opencode.ai/inference/openai/v1"
env_key = "OPENCODE_API_KEY"
wire_api = "responses"
```

Codex appends `/responses` to the base URL and reads the key from `env_key`. Create a [personal API key](./overview.md), then export it.

```bash
export OPENCODE_API_KEY="oc_sk_..."
codex
```

### Go

Use the Go base URL and a key from a workspace with a [Go](https://opencode.ai/docs/console/go/) subscription.

```toml
model = "kimi-k3"
model_provider = "opencode-go"

[model_providers.opencode-go]
name = "OpenCode Go"
base_url = "https://opencode.ai/inference/go/openai/v1"
env_key = "OPENCODE_API_KEY"
wire_api = "responses"
```

### Models

Set `model` to any model ID from the [Console](https://opencode.ai/docs/console/models/#endpoints) or [Go](https://opencode.ai/docs/console/go/#endpoints) table. Override it for one run with `--model`.

```bash
codex --model claude-sonnet-5-5
```

Codex doesn't know the context window or reasoning settings of models outside its own catalog. It uses generic defaults for them and prints a warning, which you can ignore.

### Profiles

Keep pay-as-you-go and Go side by side with a profile. Define both providers in `~/.codex/config.toml`, then add a profile file that switches to Go (`~/.codex/go.config.toml`).

```toml
model = "kimi-k3"
model_provider = "opencode-go"
```

```bash
codex --profile go
```

### Console MCP

Add the [Console MCP](./overview.md) server and sign in from the browser.

```bash
codex mcp add opencode-console --url https://opencode.ai/console/mcp
```

If the sign-in doesn't start automatically, run it yourself.

```bash
codex mcp login opencode-console
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `model_provider` | string | `opencode` (pay-as-you-go) or `opencode-go` (Go), as defined under `[model_providers.*]` |
| `base_url` | string | `https://opencode.ai/inference/openai/v1` or `https://opencode.ai/inference/go/openai/v1` |
| `env_key` | string | Name of the env var holding the Console API key (`OPENCODE_API_KEY`) |
| `wire_api` | string | `responses` |

## Notes

- Codex only reads model providers from `~/.codex/config.toml`. A project's `.codex/config.toml` cannot set them.
- Codex itself (CLI, config.toml, AGENTS.md, MCP) is covered by openai-codex; this page covers only routing it through the OpenCode Console gateway.
- Distinct from the OpenCode server HTTP API covered by opencode-build.

## Related

- [Harnesses](./overview.md)
- [Inference API](../api/inference.md)
