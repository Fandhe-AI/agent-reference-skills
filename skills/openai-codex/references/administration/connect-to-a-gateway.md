# Use API/provider credentials through a gateway

Configure Codex on a developer machine to reach an LLM gateway using the gateway URL, model alias, and credential or token resolver your organization provides.

## Signature / Usage

Edit `~/.codex/config.toml` (macOS/Linux) or `%USERPROFILE%\.codex\config.toml` (Windows). Keep `model`, `model_provider`, `model_catalog_json`, and `web_search` before the first TOML table.

```toml
model = "gpt-6-sol"
model_provider = "enterprise-gateway"
web_search = "disabled"

[model_providers.enterprise-gateway]
name = "Organization Gateway"
base_url = "https://gateway.example.com/v1"
wire_api = "responses"
env_key = "CODEX_GATEWAY_API_KEY"
```

Remote model catalog (add to the provider table):

```toml
model_catalog_url = "https://gateway.example.com/codex/models.json"
```

Local catalog (top level, absolute path):

```toml
model_catalog_json = "/etc/codex/gateway-models.json"
```

Custom auth header instead of `env_key`:

```toml
env_http_headers = { "X-API-Key" = "CODEX_GATEWAY_API_KEY" }
```

Command-backed credential helper (do not combine with `env_key`):

```toml
[model_providers.enterprise-gateway.auth]
command = "/usr/local/bin/fetch-codex-gateway-token"
args = ["print-token"]
timeout_ms = 30000
refresh_interval_ms = 300000
```

Windows helper (single-quoted literal string preserves backslashes):

```toml
[model_providers.enterprise-gateway.auth]
command = 'C:\Program Files\OpenAI\Codex\fetch-codex-gateway-token.exe'
args = ["print-token"]
timeout_ms = 30000
refresh_interval_ms = 300000
```

Verify with a new task:

```text
Reply with exactly: gateway-ok
```

## Troubleshooting

| Symptom | What to check |
|---------|---------------|
| The expected provider isn't active. | Check the selected profile and configuration precedence; confirm top-level keys aren't inside a provider table. |
| Authentication fails. | Check that the credential variable reaches the client process, or that the helper can retrieve a current token; distinguish gateway from upstream authentication. |
| The model isn't found. | Confirm the supplied model name; ask the administrator to check its route. |
| The model uses unexpected capabilities. | Check that catalog metadata matches the model behind the alias. |
| Streaming stalls or follow-ups fail. | Check proxy buffering, the terminal `response.completed` event, and gateway compatibility. |
| A catalog or helper path fails. | Confirm the file exists at the configured absolute path in the environment running Codex. |

## Notes

- Values to obtain from the gateway team: HTTPS base URL including its API path (for example `https://gateway.example.com/v1`), model name and provider ID, scoped credential and its environment variable (or token resolver), and any catalog URL or file.
- Check for an existing configuration first: in the CLI inspect the selected profile, run `codex doctor`, and use `/status` after startup.
- `enterprise-gateway` is an illustrative provider ID; use the same ID in `model_provider`, `[model_providers.<id>]`, and `[model_providers.<id>.auth]`. The example disables web search for the initial test.
- Remove any effective `model_catalog_json`; it takes precedence over `model_catalog_url`. If a custom header is your only authentication mechanism, use `model_catalog_json`; remote catalog discovery won't run.
- Custom aliases need matching catalog metadata. Use `gpt-6-sol` without a custom catalog only if the administrator confirms your Codex version recognizes it.
- Don't put credentials in TOML or a repository. A variable set in a terminal may not reach an app launched from the desktop; restart the app after changing configuration. Inside WSL, use the Linux configuration unless `CODEX_HOME` points elsewhere.
- Codex doesn't install the helper executable. Use resolved absolute paths for helpers and catalog files.
- A response doesn't prove which route handled it; ask the administrator to confirm gateway records show your user, model alias, and upstream route. Don't ask the model its name.
- MCP servers and plugins are configured separately; a gateway credential doesn't authorize access to them.
- For ChatGPT sign-in with a gateway see the sign-in page; for direct Bedrock without a gateway see Amazon Bedrock docs.
- Source: https://learn.chatgpt.com/docs/enterprise/connect-to-a-gateway (retrieved 2026-10).

## Related

- [Roll out a gateway](./roll-out-a-gateway.md)
- [Gateway compatibility requirements](./gateway-compatibility.md)
- [Sign in with ChatGPT through a gateway](./sign-in-with-chatgpt-through-a-gateway.md)
- [Bedrock through LiteLLM](./bedrock-through-litellm.md)
