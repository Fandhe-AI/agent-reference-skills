# Model Provider Plugins

Model provider plugins declare an inference backend (OpenAI-compatible, Anthropic Messages, Codex-style Responses, Bedrock-native) that Hermes routes `AIAgent` calls through. Every built-in provider ships as one; third parties drop a directory under `$HERMES_HOME/plugins/model-providers/` with zero repo changes.

## Signature / Usage

```python
# plugins/model-providers/acme-inference/__init__.py
from providers import register_provider
from providers.base import ProviderProfile

acme = ProviderProfile(
    name="acme-inference",
    aliases=("acme",),
    display_name="Acme Inference",
    description="Acme — OpenAI-compatible direct API",
    signup_url="https://acme.example.com/keys",
    env_vars=("ACME_API_KEY", "ACME_BASE_URL"),
    base_url="https://api.acme.example.com/v1",
    auth_type="api_key",
    default_aux_model="acme-small-fast",
    fallback_models=("acme-large-v3", "acme-medium-v3", "acme-small-fast"),
)

register_provider(acme)
```

```yaml
# plugins/model-providers/acme-inference/plugin.yaml
name: acme-inference
kind: model-provider
version: 1.0.0
description: Acme Inference — OpenAI-compatible direct API
author: Your Name
```

Overridable hooks (subclass `ProviderProfile`):

```python
class AcmeProfile(ProviderProfile):
    def prepare_messages(self, messages): return messages
    def build_extra_body(self, *, session_id=None, **context) -> dict: return {}
    def build_api_kwargs_extras(self, *, reasoning_config=None, **context): return {}, {}
    def fetch_models(self, *, api_key=None, base_url=None, timeout=8.0) -> list[str] | None: ...
    def fetch_account_usage(self, *, api_key=None, base_url=None): return None
    def create_client(self, **client_kwargs): return None
```

## Options / Props

`ProviderProfile` fields (full definition in `providers/base.py`):

| Field | Type | Purpose |
|-------|------|---------|
| `name` | str | Canonical id; matches `model.provider` and `--provider` |
| `aliases` | tuple[str, ...] | Alternative names |
| `api_mode` | str | `chat_completions` \| `codex_responses` \| `anthropic_messages` \| `bedrock_converse` |
| `display_name`, `description`, `signup_url` | str | Picker and first-run setup text |
| `hidden` | bool | Pre-release: off discovery surfaces until `listed()` is true (resolution by name never gated) |
| `env_vars` | tuple[str, ...] | API-key env vars in priority order; final `*_BASE_URL` entry is the base-URL override |
| `base_url`, `models_url` | str | Default endpoint and optional catalog URL (falls back to `{base_url}/models`) |
| `auth_type` | str | `api_key` \| `oauth_device_code` \| `oauth_external` \| `copilot` \| `aws_sdk` \| `external_process` |
| `auth_handler`, `refresh_credential` | Callable \| None | Provider-owned `hermes auth add/status/logout/refresh` and pooled-token rotation |
| `classify_api_error` | Callable \| None | Provider-scoped error classification override |
| `fallback_models` | tuple[str, ...] | Curated list when live catalog fetch fails |
| `supports_vision` | bool | API accepts images inside tool-result messages |
| `model_capabilities` | dict[str, dict] | Per-model `supports_reasoning`, `supports_vision`, `supports_tools`, `context_window`, `model_family` |
| `default_headers` | dict[str, str] | Sent on every request |
| `fixed_temperature` | Any | `None` = caller's value; `OMIT_TEMPERATURE` = do not send |
| `default_max_tokens` | int \| None | Provider-level cap |
| `unsupported_response_formats` | tuple | `response_format` types omitted from auxiliary requests |
| `default_aux_model` | str | Cheap model for auxiliary tasks |
| `process_command`, `process_args`, `process_command_env_vars`, `process_args_env_var` | — | External-process (ACP) launch description |
| `native_reasoning_details_type` | str \| None | Namespaced `<provider>.native_assistant` carrier forwarded only to its declaring profile |

Auth types:

| `auth_type` | Meaning |
|-------------|---------|
| `api_key` | Static API key in env var (most providers) |
| `oauth_device_code` | Device-code OAuth flow |
| `oauth_external` | User signs in elsewhere, tokens land in `auth.json` |
| `copilot` | GitHub Copilot token refresh (`copilot` plugin only) |
| `aws_sdk` | AWS SDK credential chain (`bedrock` plugin only) |
| `external_process` | Auth handled by a subprocess the agent spawns (ACP) |

Declarative PKCE: `OAuthPKCEConfig(client_id, authorize_url, token_url, scopes, redirect_port, ...)` from `hermes_cli.auth_oauth_pkce_plugin` with `pkce_auth_handler(cfg)` / `pkce_refresh_credential(cfg)`; optional `audience`, `extra_authorize_params`, `extra_token_params`, `redirect_path`, `timeout_seconds`, `label`, `allowed_hosts`, `token_request`.

## Notes

- Discovery (lazy on first `get_provider_profile()` / `list_providers()`): bundled `plugins/model-providers/<name>/`, then user `$HERMES_HOME/plugins/model-providers/<name>/` (picked up without restart), then installed plugins declaring `kind: model-provider`, then legacy `providers/<name>.py`. `register_provider()` is last-writer-wins, so user plugins override bundled ones; user plugins are per profile home.
- A simple `api_key` profile auto-wires credential resolution, `--provider`, `/model`, the `hermes model` picker, `hermes doctor`, `hermes setup`, URL reverse-mapping, auxiliary model, runtime resolution and the chat-completions transport.
- A user override of a built-in name also rewrites the `PROVIDER_REGISTRY` row (`base_url` to `inference_base_url`, non-URL `env_vars` to `api_key_env_vars`, final `*_BASE_URL` to `base_url_env_var`); `copilot`, `kimi-coding`, `kimi-coding-cn`, `zai` keep bespoke resolution.
- `model_capabilities` precedence: user `model_overrides.<provider>.<model>` > plugin declaration > catalog > `_default`; restart Hermes after editing.
- `api_mode` selection order: user `model.api_mode`, OpenCode per-model dispatch, URL auto-detection, profile `api_mode`, default `chat_completions`. Register your own dialect with `agent.transports.register_transport("mydialect", MyDialectTransport)`.
- `fetch_account_usage` runs under a 10 s deadline (`PLUGIN_USAGE_HOOK_DEADLINE_S`); built-in usage fetchers always take precedence. Return `agent.account_usage.AccountUsageSnapshot`.
- `auth_handler(action, args)` with actions `add` / `status` / `logout` / `refresh`: truthy = handled, falsy = built-in path; a non-api-key profile without `auth_handler` makes `hermes auth add <name>` fail with "ships no auth_handler". `refresh_credential(entry)` returns rotated values or `None`; raise `AuthError(..., relogin_required=True)` for a dead grant (row marked DEAD); other exceptions are transient. It runs under the shared `auth.json` lock and a peer's rotation is adopted first.
- `classify_api_error(error, *, status_code, error_code, message, body, model)` returns `{"reason": ..., "retryable", "should_compress", "should_rotate_credential", "should_fallback", "error_context"}` or `None`.
- External-process (ACP) providers: `plugins/model-providers/copilot-acp/` is the in-tree example; optional hooks `setup_status(**kwargs)`, `discover_models(**kwargs)`, `cancel(self)`, `model_aliases`, `get_model_context_length(model)`, `get_usage_cost(model, usage)`; `HERMES_SKIP_TRANSPORT_WRAP` / `HERMES_SKIP_ASYNC_WRAP` class attributes for complete async-safe clients.
- Pip distribution: entry point group `hermes_agent.plugins`; opt-in via `plugins.enabled`; lowest precedence (bundled and `$HERMES_HOME` profiles of the same name win).
- Testing: point `HERMES_HOME` at a scratch directory, then `hermes -z "hello" --provider my-provider -m some-model`; verify via `hermes doctor`.
- Reference plugins: `openrouter`, `gemini`, `kimi-coding`, `qwen-oauth`, `nous`, `custom`, `bedrock`.
- Source: developer-guide/model-provider-plugin (v0.22.2 snapshot).

## Related

- [Adding Providers](./adding-providers.md)
- [Memory Provider Plugins](./memory-provider-plugin.md)
- [Context Engine Plugins](./context-engine-plugin.md)
- [Build a Hermes Plugin](./plugins.md)
