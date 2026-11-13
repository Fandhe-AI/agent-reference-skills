---
source: https://opencode.ai/docs/console/harnesses/codex/
---

# Codex via Console

Add Console as a Codex model provider (pay-as-you-go or Go), keep both with a profile, and add the Console MCP server.

```toml title="~/.codex/config.toml"
model = "gpt-6.1-sol"
model_provider = "opencode"

[model_providers.opencode]
name = "OpenCode Console"
base_url = "https://opencode.ai/inference/openai/v1"
env_key = "OPENCODE_API_KEY"
wire_api = "responses"
```

```bash
export OPENCODE_API_KEY="oc_sk_..."
codex
```

Go provider (key from a workspace with a Go subscription):

```toml title="~/.codex/config.toml"
model = "kimi-k3"
model_provider = "opencode-go"

[model_providers.opencode-go]
name = "OpenCode Go"
base_url = "https://opencode.ai/inference/go/openai/v1"
env_key = "OPENCODE_API_KEY"
wire_api = "responses"
```

Profile that switches to Go, and a per-run model override:

```toml title="~/.codex/go.config.toml"
model = "kimi-k3"
model_provider = "opencode-go"
```

```bash
codex --profile go
codex --model claude-sonnet-5-5
```

Console MCP:

```bash
codex mcp add opencode-console --url https://opencode.ai/console/mcp
codex mcp login opencode-console
```

## Notes

- Codex appends `/responses` to the base URL and reads the key from `env_key`.
- Codex only reads model providers from `~/.codex/config.toml`. A project's `.codex/config.toml` cannot set them.
- Codex warns about generic defaults for models outside its own catalog; the warning can be ignored.
- Run `codex mcp login` only if the sign-in does not start automatically after `codex mcp add`.
- Codex itself is covered by the openai-codex skill; this sample only covers pointing it at Console.
