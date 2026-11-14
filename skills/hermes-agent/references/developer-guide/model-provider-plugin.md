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
| `supports_streaming` | bool \| None | `None` (default) preserves transport defaults; `True` opts streaming-capable `external_process` clients into host streaming; `False` disables provider streaming. ACP URLs and session-level streaming disables still take precedence. Only opt in when the client implements the selected API mode's streaming contract, including cancellation and cleanup |
| `auth_type` | str | `api_key` \| `oauth_device_code` \| `oauth_external` \| `aws_sdk` \| `external_process` \| any plugin-defined value (login is then provider-owned) |
| `auth_handler`, `refresh_credential` | Callable \| None | Provider-owned `hermes auth add/status/logout/refresh` and pooled-token rotation |
| `classify_api_error` | Callable \| None | Provider-scoped error classification override |
| `fallback_models` | tuple[str, ...] | Curated list when live catalog fetch fails |
| `supports_vision` | bool | API accepts images inside tool-result messages |
| `model_capabilities` | dict[str, dict] | Per-model `supports_reasoning`, `supports_vision`, `supports_tools`, `context_window`, `model_family` |
| `default_headers` | dict[str, str] | Sent on every request (e.g. an `Editor-Version` header an IDE-subscription API requires); also forwarded by the default `fetch_models()` catalog request. A value costly to compute at import (a User-Agent carrying the release) can be deferred with `providers.base.LazyHeaders({"User-Agent": lambda: hermes_user_agent("MyAgent")})`, a `dict` whose callable values run on first read (`hermes_user_agent` is in `hermes_cli.version_info`) |
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
| *plugin-defined* | Any other value: login and refresh are provider-owned (`auth_handler`, `refresh_credential`, the credential hooks); `registry_auth_type` names the auth-registry row when it differs. E.g. `copilot` in the `github-copilot` labs plugin (https://github.com/NousResearch/hermes-labs-plugins/tree/main/github-copilot) |
| `aws_sdk` | AWS SDK credential chain (`bedrock` plugin only) |
| `external_process` | Auth handled by a subprocess the agent spawns (ACP); out-of-tree ACP plugins (e.g. `copilot-acp` in the `github-copilot` labs plugin) |

Declarative PKCE: `OAuthPKCEConfig(client_id, authorize_url, token_url, scopes, redirect_port, ...)` from `hermes_cli.auth_oauth_pkce_plugin` with `pkce_auth_handler(cfg)` / `pkce_refresh_credential(cfg)`; optional `audience`, `extra_authorize_params`, `extra_token_params`, `redirect_path`, `timeout_seconds`, `label`, `allowed_hosts`, `token_request`.

## Notes

- Discovery (lazy on first `get_provider_profile()` / `list_providers()`): bundled `plugins/model-providers/<name>/`, then user `$HERMES_HOME/plugins/model-providers/<name>/` (picked up without restart), then installed plugins declaring `kind: model-provider`, then legacy `providers/<name>.py`. `register_provider()` is last-writer-wins, so user plugins override bundled ones; user plugins are per profile home.
- A simple `api_key` profile auto-wires credential resolution, `--provider`, `/model`, the `hermes model` picker, `hermes doctor`, `hermes setup`, URL reverse-mapping, auxiliary model, runtime resolution and the chat-completions transport.
- A user override of a built-in name also rewrites the `PROVIDER_REGISTRY` row (`base_url` to `inference_base_url`, non-URL `env_vars` to `api_key_env_vars`, final `*_BASE_URL` to `base_url_env_var`); `kimi-coding`, `kimi-coding-cn`, `zai` keep bespoke resolution (`copilot` removed from this list in v0.23.1).
- `model_capabilities` precedence: user `model_overrides.<provider>.<model>` > plugin declaration > catalog > `_default`; restart Hermes after editing.
- `api_mode` selection order: user `model.api_mode`, OpenCode per-model dispatch, URL auto-detection, profile `api_mode`, default `chat_completions`. Register your own dialect with `agent.transports.register_transport("mydialect", MyDialectTransport)`.
- `fetch_account_usage` runs under a 10 s deadline (`PLUGIN_USAGE_HOOK_DEADLINE_S`); built-in usage fetchers always take precedence. Return `agent.account_usage.AccountUsageSnapshot`.
- `auth_handler(action, args)` with actions `add` / `status` / `logout` / `refresh`: truthy = handled, falsy = built-in path; a non-api-key profile without `auth_handler` makes `hermes auth add <name>` fail with "ships no auth_handler". `refresh_credential(entry)` returns rotated values or `None`; raise `AuthError(..., relogin_required=True)` for a dead grant (row marked DEAD); other exceptions are transient. It runs under the shared `auth.json` lock and a peer's rotation is adopted first.
- `classify_api_error(error, *, status_code, error_code, message, body, model)` returns `{"reason": ..., "retryable", "should_compress", "should_rotate_credential", "should_fallback", "error_context"}` or `None`.
- Multiplexed processes: steps 2 and 3 of discovery are per profile home; one process serving several profiles (the multiplex gateway a local Desktop attaches to, a `hermes serve` backend) resolves the plugins of whichever profile's `$HERMES_HOME` is bound at lookup time, so install the plugin in every profile that should use it (`hermes -p <profile> plugins install ...`).
- External-process (ACP) providers: the `copilot-acp` provider in the `github-copilot` labs plugin (https://github.com/NousResearch/hermes-labs-plugins/tree/main/github-copilot) is an out-of-tree worked example (v0.23.1; it was in-tree at `plugins/model-providers/copilot-acp/` in v0.22.2). Optional hooks `setup_status(**kwargs)`, `discover_models(**kwargs)`, `cancel(self)`, `model_aliases`, `get_model_context_length(model)`, `get_usage_cost(model, usage)`; `HERMES_SKIP_TRANSPORT_WRAP` / `HERMES_SKIP_ASYNC_WRAP` class attributes for complete async-safe clients.
- Pip distribution: entry point group `hermes_agent.plugins`; opt-in via `plugins.enabled`; lowest precedence (bundled and `$HERMES_HOME` profiles of the same name win).
- Testing: point `HERMES_HOME` at a scratch directory, then `hermes -z "hello" --provider my-provider -m some-model`; verify via `hermes doctor`.
- Reference plugins: `openrouter`, `gemini`, `kimi-coding`, `qwen-oauth`, `nous`, `custom`, `bedrock`.
- Source: https://hermes-agent.nousresearch.com/docs/developer-guide/model-provider-plugin (pinned to v0.23.1)

### Migration (v0.22 -> v0.23)

- `auth_type="copilot"` is no longer a built-in value; GitHub Copilot moved out of tree to the `github-copilot` labs plugin (`copilot` plugin-defined auth type, `copilot-acp` provider). Any non-built-in `auth_type` is now plugin-defined and provider-owned.
- `agent.copilot_acp_client.CopilotACPClient` is a deprecated alias of `agent.acp_client.ACPClient` with the old GitHub Copilot launch defaults. The module keeps its whole former surface for listed catalog plugins pinned to it (`ACP_MARKER_BASE_URL`, its former private helpers, `subprocess` for `Popen` patching); the first access of any of its names warns once per process. Subclass `ACPClient` instead (set `placeholder_model` to your own placeholder id). The alias stays for at least two minor releases.
- `copilot` was removed from the list of built-in providers with bespoke credential resolution and registry mirroring exclusions (`kimi-coding`, `kimi-coding-cn`, `zai` remain).

### Public ACP client: `agent.acp_client.ACPClient`

For an agent CLI that speaks the Agent Client Protocol on stdio, return an `ACPClient` (or a subclass) from `create_client` instead of writing your own shim. It is an OpenAI-client facade (`client.chat.completions.create(...)`, streaming included) that starts one short-lived ACP session per request, applies the requested model over ACP (`session/set_config_option`, else `session/set_model`), forwards Hermes' tools as a prompt-level bridge, answers `fs/read_text_file` / `fs/write_text_file` inside the session cwd with Hermes' file-safety rules, cancels permission requests, and lists the session's models with `list_models(timeout_seconds=...)`. It already declares both `HERMES_SKIP_*` attributes.

```python
from agent.acp_client import ACPClient

class MyAgentClient(ACPClient):
    default_command = "myagent"            # used only when the caller passes no command/args
    default_args = ("--acp",)
    command_env_vars = ("MYAGENT_ACP_COMMAND",)
    args_env_var = "MYAGENT_ACP_ARGS"
    marker_base_url = "acp://myagent"
    placeholder_model = "myagent-acp"      # "session default": never sent as a model selection
    label = "MyAgent ACP"                  # product name in errors and logs
    auth_required_hint = "Run `myagent login`, then retry."  # optional: added to ACP's auth-required error (-32000)

    def model_entry_disabled(self, entry):  # optional: vendor _meta marking a model unavailable
        return False

    def early_exit_error(self, stderr_text):  # optional: friendlier error for a known crash banner
        return None

class MyAgentProfile(ProviderProfile):
    def create_client(self, **client_kwargs):
        return MyAgentClient(**client_kwargs)
```

Keep the class attributes in step with the profile's `process_*` fields. Override `_handle_server_message(msg, *, process, cwd, text_parts, reasoning_parts, allow_file_requests=True)` to render extra `session/update` kinds (call `super()` for the rest). `hermes_cli.auth.resolve_external_process_provider_credentials(name)` returns the resolved `command`/`args`/`base_url` for a `fetch_models()` probe. The `process_command_env_vars` and `process_args_env_var` names are executable authority: Hermes' generic env writers (dashboard, MCP and connector installs, `save_env_value`) refuse them, so set them in `.env` or the shell.

### Public helpers for a `model_setup_flow`

| Helper | What it does |
|---|---|
| `hermes_cli.model_setup.persist_model_selection(model, provider, *, base_url=None, api_mode=None)` | Writes the `model:` section (`provider`, then `base_url` / `api_mode` when given), scrubs inline endpoint credentials, saves `config.yaml` and deactivates the previously active OAuth provider. Returns the saved section. |
| `hermes_cli.model_setup.note_setup_failure(failure_class)` | Records why the flow ended without a pick (`"auth"`, `"no_models"`, ...) for the opt-in provider-setup metric; a no-op outside a tracked flow. |
| `agent.secret_scope.secret_source_label(name)` | `" (from Bitwarden)"`-style suffix naming the secret-source plugin that supplied env var `name`; `""` for `.env` / shell values. |

### ProviderProfile fields and hooks (complete list, v0.23.1)

Every field and hook `providers/base.py` declares, in declaration order. Names ending in `()` are methods to override in a subclass; the rest are dataclass fields (a few, such as `picker_catalog` and the device-login callables, take a callable). Endpoint-keyed hooks (`client_headers`, `request_headers`, `max_tokens_param`) receive the request's `base_url` and return `None` / `{}` for an endpoint that is not yours; the `responses_*` and `message_carrier_*` fields and the reasoning-replay hooks apply only on hosts the profile lists in `hostnames`. Hot-path hooks must be pure and cheap (no I/O) unless the meaning says otherwise.

| Name | Meaning | Default |
|---|---|---|
| `name` | Canonical provider id (`model.provider`, `--provider`) | required |
| `api_mode` | Static wire protocol; `api_mode_for_model()` can vary it per model | `"chat_completions"` |
| `aliases` | Alternative names `get_provider_profile()` resolves | `()` |
| `display_name` | Human label in pickers | `""` |
| `description` | Picker subtitle | `""` |
| `signup_url` | Shown during setup | `""` |
| `hidden` | Pre-release: kept off discovery surfaces until `listed()` is true; resolution by name still works | `False` |
| `env_vars` | API-key env vars in priority order; a final `*_BASE_URL` entry is the base-URL override | `()` |
| `base_url` | Default inference endpoint | `""` |
| `models_url` | Explicit models endpoint (else `{base_url}/models`) | `""` |
| `auth_type` | `api_key` \| `oauth_device_code` \| `oauth_external` \| `external_process` \| `aws_sdk` \| plugin-defined | `"api_key"` |
| `supports_streaming` | `None` keeps transport defaults, `True` opts a process client into streaming, `False` disables it | `None` |
| `supports_health_check` | `False`: `hermes doctor` skips the `/models` probe | `True` |
| `supports_model_listing` | `False`: `fetch_models()` returns `None` without a network call | `True` |
| `auth_handler` | Provider-owned `hermes auth add\|status\|logout\|refresh <name>`; truthy return = handled | `None` |
| `refresh_credential` | Rotates a pooled OAuth row and returns the rotated fields | `None` |
| `classify_api_error` | Error classification for this provider's failures, before the built-in pipeline | `None` |
| `supports_vision` | API accepts images inside tool-result messages | `False` |
| `supports_vision_tool_messages` | API accepts list-type (multipart) tool message content | `True` |
| `supports_prompt_cache_key` | Chat Completions endpoint documents `prompt_cache_key` | `False` |
| `native_reasoning_details_type` | Namespaced `<provider>.native_assistant` reasoning carrier only this profile receives | `None` |
| `process_command` | External-process default binary | `""` |
| `process_args` | External-process default argv tail | `()` |
| `process_command_env_vars` | Env vars overriding the binary, in priority order | `()` |
| `process_args_env_var` | Env var overriding argv (shlex-split) | `""` |
| `fallback_models` | Curated picker list when the live fetch fails | `()` |
| `model_aliases` | Short name → model id; `/model <alias>` resolves here first | `{}` |
| `hostname` | Base hostname for URL → provider reverse mapping (derived from `base_url` when empty) | `""` |
| `default_headers` | Headers on every request and on the default catalog fetch | `{}` |
| `fixed_temperature` | `None` = caller's value; `OMIT_TEMPERATURE` = never send temperature | `None` |
| `default_max_tokens` | Provider-level max_tokens cap | `None` |
| `unsupported_response_formats` | `response_format` types auxiliary requests omit | `()` |
| `default_aux_model` | Cheap model for auxiliary tasks; empty = main model | `""` |
| `model_capabilities` | Per-model metadata in the `model_overrides` schema | `{}` |
| `account_card` | Accounts-tab card overrides `{name, flow, cli_command, docs_url}` (Desktop/dashboard) | `{}` |
| `account_status` | Live status for that card; subprocess- and network-free | `None` (`auth.get_auth_status(name)`) |
| `start_device_login` | In-app device-code sign-in: returns `{user_code, verification_url, expires_in, interval, state}` | `None` |
| `poll_device_login` | One poll of that login: `{status, interval?, credential?, message?}` | `None` |
| `save_device_login` | Persists the approved credential (core calls it in the session's profile scope) | `None` |
| `model_setup_flow` | The provider's own `hermes model` step (credential prompt, catalog, persist) | `None` (generic flow for `auth_type`) |
| `setup_reasoning_efforts` | Effort levels the setup picker offers for a model; `()` = no reasoning control | `None` (generic ladder) |
| `fetch_account_usage()` | `/usage` snapshot when no built-in usage fetcher owns the provider | `None` |
| `resolve_aux_model()` | Live cheap-model id for auxiliary tasks; cached, never raises | `""` (use `default_aux_model`) |
| `get_hostname()` | Provider hostname for URL detection | `hostname`, else from `base_url` |
| `prepare_messages()` | Message preprocessing after codex sanitization, before the developer-role swap | pass-through |
| `build_extra_body()` | Provider-specific `extra_body` fields | `{}` |
| `default_reasoning_config()` | Reasoning config sent when `agent.reasoning_effort` is unset | `None` |
| `build_api_kwargs_extras()` | `(extra_body_additions, top_level_kwargs)` split | `({}, {})` |
| `build_client_kwargs_extras()` | OpenAI-client kwargs defaults (explicit settings win; no I/O) | `{}` |
| `default_vision_model()` | Provider's default vision model id | `None` |
| `get_model_context_length()` | Provider-qualified context bound; explicit user overrides win | `None` |
| `get_usage_cost()` | `CostResult` from canonical usage (estimates are never `actual`) | `None` |
| `get_max_tokens()` | Per-model max_tokens cap when the user set none | `default_max_tokens` |
| `supported_reasoning_efforts()` | Effort vocabulary for a model: `None` unknown, `()` none, tuple = clamp; no I/O | `None` |
| `api_mode_for_model()` | Wire this provider serves a model on; `api_key` given only at resolution time | `None` (static `api_mode`) |
| `client_headers()` | Default headers for a client built for `base_url` (`has_images` for image requests) | `None` (static `default_headers`) |
| `request_headers()` | Per-request `extra_headers` for `base_url`; `user_initiated` on a turn's first call | `{}` |
| `max_tokens_param()` | `"max_completion_tokens"` or `"max_tokens"` for `base_url` | `None` (core heuristic) |
| `listed()` | Whether discovery surfaces may offer the provider | `True` unless `hidden` with no pool row |
| `create_client()` | Provider-specific client object (ACP shim, native SDK) | `None` (standard client) |
| `setup_status()` | External-process login state `{available, logged_in, plan, detail, login_command}` | `None` |
| `discover_models()` | External-process live picker `[{id, label, note}]` without inference | `None` (`fallback_models`) |
| `fetch_models()` | Live model ids | GET `{models_url or base_url}/models` |
| `hostnames` | Hosts (and subdomains) serving this API, so a `custom` endpoint or aux client there is recognised | `()` |
| `metadata_hostnames` | Hosts identifying this catalog for model metadata only (other credentials) | `()` |
| `models_dev_id` | models.dev provider id when it differs from `name` | `""` |
| `live_context_length()` | Context window from the live, credentialed catalog; after the persistent cache | `None` |
| `normalize_model_id()` | Provider-native id for a model (aliases, catalog repair) | `None` (generic normalization) |
| `ambient_credentials` | Credentials are ambient: never auto-detected; aux fallback skips unless configured | `False` |
| `resolve_api_key_secret()` | Provider-owned `(runtime_api_key, source)` | `None` (env/pool ladder) |
| `runtime_base_url()` | Base URL derived from the credential | `None` (env or default) |
| `prepare_pool_entry()` | Turns the selected pool row's secret into the runtime key | the secret as-is |
| `seed_pool_credentials(suppressed_sources, explicitly_configured)` | Pool rows `{source, access_token, base_url, label}` the provider seeds itself, skipping sources in `suppressed_sources` (plain values, so it works under `plugins.isolation: host`); overriding it replaces generic env seeding (return `[]` for none) | not overridden = generic env seeding |
| `remove_credential_source()` | `hermes auth remove`: `(sources_to_suppress, hints)` | `None` (generic removal) |
| `refresh_runtime_credentials()` | Re-mints `(api_key, base_url)` on `unauthorized` \| `stale` \| `auxiliary_unauthorized`; error path only | `None` |
| `is_stale_credential_error()` | A non-auth error really means the credential went stale (pure) | `False` |
| `credential_refresh_notice()` | Status line after a successful runtime refresh | `""` (generic wording) |
| `request_rejection_hint()` | User-facing lines for an endpoint's hard rejection of any route | `()` |
| `external_auth_evidence()` | Subprocess-free `(verified, source)` login evidence for an external CLI | `None` (binary resolves) |
| `missing_credentials_hint()` | One sentence appended to every "No usable credentials found" message (runtime resolution, CLI and Desktop readiness), e.g. the provider's sign-in command | `None` |
| `responses_replay_item_ids` | Replayed Responses `message` items keep their `id` | `True` |
| `responses_prompt_cache_key` | The Responses body carries `prompt_cache_key` | `True` |
| `responses_issuer_kind` | Persisted issuer stamp for encrypted reasoning minted here | `""` (URL-derived) |
| `responses_trusts_completed_status` | `False`: a reasoning-only `completed` response continues | `True` |
| `responses_native_compaction` | `False`: never send `context_management` | `True` |
| `responses_profile_reasoning` | `True`: `reasoning` = `reasoning_payload()` + summary, no `include` | `False` |
| `message_carrier_opaque` | Top-level assistant key of an opaque reasoning blob (latest streamed wins) | `""` |
| `message_carrier_text` | Top-level assistant key of readable reasoning text (streamed parts concatenate) | `""` |
| `replays_tool_call_signatures` | Tool calls keep Gemini `extra_content` signatures | `False` |
| `reasoning_payload()` | Verbatim `reasoning` object for a model (catalog-clamped) | `None` |
| `replay_message_carriers()` | Captured `message_carrier_*` values to put back on a replayed assistant message | `{}` |
| `replays_function_thought_signature()` | Replayed tool calls keep `function.thought_signature` | `False` |
| `picker_catalog` | `(force_refresh) -> list`: the provider's own model-picker catalog, tried before the generic fetch | `None` |
| `static_models` | Curated ids answered as this provider's row of the static catalog (looked up per profile home, never copied into the shared table) | `()` |
| `catalog_credential_files` | Credential files whose mtime joins every cached catalog's fingerprint | `()` |
| `probe_models()` | `(ids or None, probed_url, resolved_base_url)` for a `/models` probe this provider answers | `None` (generic HTTP probe) |
| `invalidate_catalog_cache()` | Drops in-process catalog memos (`/model --refresh`) | no-op |
| `picker_after` | Provider slug this row follows in the provider list | `""` (appended) |
| `picker_group` | `(group_id, label, description)`: folds same-group rows in interactive pickers | `()` |
| `catalog_aliases` | `aliases` also normalize in the model catalog | `False` |
| `aggregator` | Catalog re-exposes many vendors' models | `False` |
| `provider_overlay` | HermesOverlay fields for the models.dev-keyed definition | `{}` |
| `overlay_aliases` | Extra names normalizing to the `provider_overlay` definition | `()` |
| `registry_auth_type` | Auth-registry row `auth_type` when credential resolution differs from the setup flow | `""` (`auth_type`) |
| `base_url_env_var` | Env var overriding `base_url` on the registry row when not in `env_vars` | `""` |
| `registry_after` | Registry id this row follows in priority-ordered scans | `""` (appended) |

## Related

- [Adding Providers](./adding-providers.md)
- [Memory Provider Plugins](./memory-provider-plugin.md)
- [Context Engine Plugins](./context-engine-plugin.md)
- [Build a Hermes Plugin](./plugins.md)
