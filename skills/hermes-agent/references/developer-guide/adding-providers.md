# Adding Providers

How to add a first-class inference provider to Hermes: auth, model catalog, runtime resolution, CLI flows, auxiliary models, adapters, tests and docs.

## Signature / Usage

Fast path for a simple API-key, OpenAI-compatible provider: a plugin directory `plugins/model-providers/<name>/` with `plugin.yaml` and an `__init__.py` calling `register_provider()` at module level.

```python
# plugins/model-providers/acme/__init__.py
from providers import register_provider
from providers.base import ProviderProfile

register_provider(ProviderProfile(
    name="acme",
    aliases=("acme-inference",),
    display_name="Acme Inference",
    env_vars=("ACME_API_KEY", "ACME_BASE_URL"),
    base_url="https://api.acme.example.com/v1",
    auth_type="api_key",
    default_aux_model="acme-small-fast",
    fallback_models=("acme-large-v3", "acme-medium-v3"),
))
```

`resolve_runtime_provider()` (`hermes_cli/runtime_provider.py`) must return at least:

```python
{
    "provider": "your-provider",
    "api_mode": "chat_completions",  # or your native mode
    "base_url": "https://...",
    "api_key": "...",
    "source": "env|portal|auth-store|explicit",
    "requested_provider": requested_provider,
}
```

Smoke test from a checkout:

```bash
source ./activate
python hermes chat -q "Say hello" --provider your-provider --model your-model
```

## Options / Props

`api_mode` values named in the guide:

| api_mode | Used by |
|----------|---------|
| `chat_completions` | Most providers (OpenAI-compatible) |
| `codex_responses` | OpenAI Codex, xAI Grok, Meta Model API (`api.meta.ai`, auto-sends `prompt_cache_retention: 24h`), Ramp Router (`api.router.com`) |
| `anthropic_messages` | Anthropic |

Files to touch for a full-path built-in provider:

| File | Change |
|------|--------|
| `hermes_cli/auth.py` | `ProviderConfig` in `PROVIDER_REGISTRY` (`id`, `name`, `auth_type`, `inference_base_url`, `api_key_env_vars`, optional `base_url_env_var`), `_PROVIDER_ALIASES` |
| `hermes_cli/models.py` | `_PROVIDER_MODELS`, `_PROVIDER_LABELS`, `_PROVIDER_ALIASES`, `list_available_providers()` order, `provider_model_ids()` for live `/models` |
| `hermes_cli/runtime_provider.py` | Runtime branch returning the dict above |
| `hermes_cli/main.py` | `provider_labels`, `providers` list in `select_provider_and_model()`, dispatch, `--provider` choices, login/logout, `_model_flow_<provider>()` |
| `agent/auxiliary_client.py` | Default aux model in `_API_KEY_PROVIDER_AUX_MODELS` |
| `agent/model_metadata.py` | Context lengths |
| `agent/<provider>_adapter.py`, `run_agent.py`, `pyproject.toml` | Native providers only |
| tests, `website/docs/` | Coverage and user docs |

## Notes

- Do not add a built-in provider unless you need first-class UX (provider-specific auth/refresh, curated catalog, menu entries, `provider:model` aliases, non-OpenAI API shape). A named custom provider may suffice for plain OpenAI-compatible endpoints.
- `hermes_cli/setup.py` needs no changes; the wizard delegates to `select_provider_and_model()` in `main.py`.
- Fast path: provider plugins auto-load on the first `get_provider_profile()` / `list_providers()` call; `register_provider()` wires `PROVIDER_REGISTRY`, `api_mode=chat_completions`, base URL, env vars, `fallback_models`, `--provider`, `hermes model`, `provider:model` aliases and fallback activation. User plugins in `$HERMES_HOME/plugins/model-providers/<name>/` override bundled ones by name. Templates: `plugins/model-providers/nvidia/`, `plugins/model-providers/gmi/`.
- Use one canonical provider id everywhere (`openai-codex`, `kimi-coding`, `minimax-cn` style); mismatches leave the provider half-wired.
- Internal history is in OpenAI chat-completions shape; other transports convert from it (`agent/transports/chat_completions.py` `convert_messages` / `convert_tools`).
- Native providers: audit every `api_mode` switch point and every `self.client.` use in `run_agent.py` (`__init__`, `_build_api_kwargs()`, `_interruptible_api_call()`, interrupt/rebuild, response validation, finish-reason and usage extraction, fallback, summary/memory flush). Send only fields the provider understands (e.g. OpenRouter routing fields).
- `config["model"]` can be a string or a dict.
- Test with `scripts/run_tests.sh tests/hermes_cli/test_runtime_provider_resolution.py tests/hermes_cli/test_cli_provider_resolution.py tests/hermes_cli/test_setup_model_provider.py tests/agent/test_provider_parity.py -q`.
- Source: https://hermes-agent.nousresearch.com/docs/developer-guide/adding-providers (pinned to v0.22.2)

## Related

- [Model Provider Plugins](./model-provider-plugin.md)
- [Build a Hermes Plugin](./plugins.md)
