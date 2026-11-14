# Adding Platform Adapters

How to add a messaging platform to the Hermes gateway, either as a plugin (recommended, no core changes) or built in (20+ files). Every adapter extends `BasePlatformAdapter` from `gateway/platforms/base.py`.

## Signature / Usage

```
User <-> Messaging Platform <-> Platform Adapter <-> Gateway Runner <-> AIAgent
```

Plugin layout:

```
~/.hermes/plugins/my-platform/
  plugin.yaml      # Plugin metadata (kind: platform)
  adapter.py       # Adapter class + register() entry point
```

```yaml
# plugin.yaml
name: my-platform
label: My Platform
kind: platform
version: 1.0.0
description: My custom messaging platform adapter
requires_env:
  - MY_PLATFORM_TOKEN
optional_env:
  - name: MY_PLATFORM_HOME_CHANNEL
    description: "Default channel for cron delivery"
    password: false
```

```python
# adapter.py
from gateway.platforms._shared import extra_or_secret, get_scoped_secret
from gateway.platforms.base import BasePlatformAdapter, SendResult
from gateway.config import Platform, PlatformConfig

class MyPlatformAdapter(BasePlatformAdapter):
    def __init__(self, config: PlatformConfig):
        super().__init__(config, Platform("my_platform"))
        self.token = extra_or_secret(config.extra, "token", "MY_PLATFORM_TOKEN")

    async def connect(self, *, is_reconnect: bool = False) -> bool:
        self._mark_connected()
        return True

    async def disconnect(self) -> None:
        self._mark_disconnected()

    async def send(self, chat_id, content, reply_to=None, metadata=None):
        return SendResult(success=True, message_id="...")

    async def get_chat_info(self, chat_id):
        return {"name": chat_id, "type": "dm"}

def check_requirements() -> bool:
    return bool(get_scoped_secret("MY_PLATFORM_TOKEN"))

def register(ctx):
    ctx.register_platform(
        name="my_platform",
        label="My Platform",
        adapter_factory=MyPlatformAdapter,
        check_fn=check_requirements,
        required_env=["MY_PLATFORM_TOKEN"],
        cron_deliver_env_var="MY_PLATFORM_HOME_CHANNEL",
        allowed_users_env="MY_PLATFORM_ALLOWED_USERS",
        allow_all_env="MY_PLATFORM_ALLOW_ALL_USERS",
        max_message_length=4000,
        platform_hint="You are chatting via My Platform. It supports markdown formatting.",
        emoji="💬",
    )
```

Inbound messages: build a `MessageEvent` and call `self.handle_message(event)`:

```python
source = self.build_source(chat_id=chat_id, chat_name=name, chat_type="dm",
                           user_id=user_id, user_name=user_name)
event = MessageEvent(text=content, message_type=MessageType.TEXT, source=source, message_id=msg_id)
await self.handle_message(event)
```

## Options / Props

`BasePlatformAdapter` methods:

| Method | Kind | Description |
|--------|------|-------------|
| `connect()` | abstract | Establish connection (WebSocket, long-poll, HTTP server) |
| `disconnect()` | abstract | Clean shutdown |
| `send()` | abstract | Send a text message to a chat |
| `send_typing()` | optional | Typing indicator |
| `get_chat_info()` | optional | Chat metadata |

`ctx.register_platform(...)` fields shown in the guide:

| Field | Description |
|-------|-------------|
| `name`, `label`, `adapter_factory` | Identity and adapter constructor |
| `check_fn` | Passive probe (deps/config present); must never pip-install |
| `ensure_deps_fn` | Optional active installer called when `check_fn` is false |
| `validate_config` | Config validation for connected-platform detection |
| `required_env`, `install_hint` | Env requirements and hint text |
| `env_enablement_fn` | Seeds `PlatformConfig.extra` (+ `home_channel`) from env before construction |
| `apply_yaml_config_fn` | Translates `config.yaml` platform keys into env vars / extras |
| `cron_deliver_env_var` | Makes `deliver=<name>` a cron target (home channel env var) |
| `standalone_sender_fn` | Out-of-process cron send: `async (pconfig, chat_id, message, *, thread_id=None, media_files=None, force_document=False)` returning `{"success": True, "message_id": ...}` or `{"error": ...}` |
| `send_message_handler`, `parse_target_ref_fn`, `validate_target_ref_fn` | Host-driven send path (`hermes send --to ...`, cron `deliver=platform:...`) |
| `allowed_users_env`, `allow_all_env` | Per-platform user authorization env vars |
| `group_allowed_chats_env` (str, default `''`) | Env var holding comma-separated group/forum chat IDs; any message from a listed chat is authorized even without a `user_id` (anonymous admins, channel posts). Telegram declares `TELEGRAM_GROUP_ALLOWED_CHATS`, QQ Bot `QQ_GROUP_ALLOWED_USERS` |
| `allowlist_suppresses_pairing` (bool, default False) | When `allowed_users_env` (or `group_allowed_chats_env`) is set, unknown DM senders are ignored rather than sent a pairing code. Most bundled chat platforms set it |
| `max_message_length` | Smart chunking limit (0 = none) |
| `platform_hint` | LLM guidance injected into the system prompt (declare on the registry entry; keep the text in a light sibling such as `adapter_hint.py`) |
| `platform_hint_tool_notes` | `{tool: sentence}` appended to the hint only when the session has that tool |
| `emoji`, `allow_update_command`, `pii_safe` | Display and policy flags |
| `trusted_inbound` (bool, default False) | Inbound events come from an authenticated service, not a human; skips user allowlists and DM pairing. Never set for chat platforms |
| `display_tier` (str, default '') | `'high'`, `'medium'`, `'low'`, `'minimal'` display defaults tier |
| `shared_env_prefixes` (tuple) | Env prefixes shared with non-channel capability; kept on profile clone when adapter not in use |

`plugin.yaml` env entries accept `name` (required), `description`, `prompt`, `url`, `password` (auto-detected from `*_TOKEN` / `*_SECRET` / `*_KEY` / `*_PASSWORD` / `*_JSON` when omitted), `category` (default `"messaging"`). `provides_tools` lists outbound client tools loaded from `tools.py` (`register_tools(ctx)`) while the adapter stays deferred.

Built-in path checklist (core contributors): `Platform` enum in `gateway/config.py`; adapter file; `get_connected_platforms()` / `load_gateway_config()` / `_apply_env_overrides()`; `_BUILTIN_ADAPTERS` table in `gateway/run.py`, authorization maps, `gateway/run_startup.py` `_ALLOWLIST_ENV_PLATFORMS`, `_UPDATE_ALLOWED_PLATFORMS`; webhook and `cron/scheduler_delivery.py` `_KNOWN_DELIVERY_PLATFORMS`; CLI integration (`hermes_cli/config.py`, `gateway.py`, `platforms.py`, `setup.py`, `status.py`, `dump.py`); `tools/send_message_tool.py`, `tools/cronjob_tools.py`; `toolsets.py` (`hermes-newplat` in `hermes-gateway`); tests and docs. (Platform hints: v0.23.1 declares them with `platform_hint=` on the registry entry; `agent/prompt_builder.py::PLATFORM_HINTS` now holds only core surfaces.)

Reference implementations:

| Adapter | Pattern | Good reference for |
|---------|---------|--------------------|
| `plugins/platforms/bluebubbles/adapter.py` | REST + webhook | Simple REST API integration |
| `plugins/platforms/weixin/adapter.py` | Long-poll + CDN | Media handling, encryption |
| `plugins/platforms/wecom/callback_adapter.py` | Callback/webhook | HTTP server, AES crypto, multi-app |
| `plugins/platforms/irc/adapter.py` | Long-poll + IRC protocol | Full-featured plugin adapter with scoped token lock |

## Notes

- Read credentials with `gateway.platforms._shared.get_scoped_secret` / `extra_or_secret` / `seed_extra_from_env`, never `os.getenv`: under `gateway.multiplex_profiles` a raw read could enable the platform for the wrong profile.
- `apply_yaml_bridge` writes each env var only when unset and never while a multiplexed secondary profile's config loads; exceptions in the hook are swallowed and logged at debug level.
- Without `standalone_sender_fn`, cron-side sends from a separate process fail with `No live adapter for platform '<name>'`.
- `send_message` is intentionally not an agent-callable model tool; plugins must not register an equivalent surface that lets the agent initiate outbound messages.
- Feature-detect newer `PlatformEntry` fields with `dataclasses.fields(PlatformEntry)` so the plugin loads on older cores.
- Slow-LLM UX (e.g. LINE reply-token expiry, WhatsApp 24h session): override `_keep_typing` while always awaiting `super()._keep_typing(...)`, tear down side tasks in `finally`; route `send` through a cache only for pending postbacks and let system busy-ack prefixes pass through visibly.
- Deduplicate inbound redelivery with `gateway.platforms.helpers.MessageDeduplicator(ttl_seconds=600)`; the reconnect watcher copies its live IDs to the replacement adapter.
- Use `acquire_scoped_lock(platform, token)` / `release_scoped_lock` from `gateway.status` to prevent two profiles from sharing a credential.
- For platforms with tight callback deadlines, acknowledge immediately and deliver the reply proactively via API.
- Run a parity audit against an established platform (search for files mentioning the reference platform vs the new one) before completing a new platform PR.
- Optional keywords added to the standalone sender later are forwarded only to a sender that declares them (by name or through `**kwargs`), so a sender written to the older signature keeps working: `notify=True` (cron's `cron.delivery.notify`: this delivery should ring even under a quiet notification mode) is one; Telegram's sender takes it. The bundled platforms use this same hook: Telegram's out-of-process sender is `plugins/platforms/telegram/standalone.py::standalone_send` and Signal's is `plugins/platforms/signal/standalone.py`; core reaches them only through the platform registry.
- Source: https://hermes-agent.nousresearch.com/docs/developer-guide/adding-platform-adapters (pinned to v0.23.1)

### Authorization fields for chat platforms

Feature-detect them with `dataclasses.fields(PlatformEntry)` so the plugin stays loadable on older cores.

```python
kwargs = dict(name="my_chat", label="My Chat", adapter_factory=MyChatAdapter, check_fn=check_requirements,
              allowed_users_env="MY_CHAT_ALLOWED_USERS", allow_all_env="MY_CHAT_ALLOW_ALL_USERS")
known = {f.name for f in dataclasses.fields(PlatformEntry)}
for key, value in (("group_allowed_chats_env", "MY_CHAT_GROUP_ALLOWED_CHATS"),
                   ("allowlist_suppresses_pairing", True)):
    if key in known:  # older cores reject unknown kwargs
        kwargs[key] = value
ctx.register_platform(**kwargs)
```

### Public helpers for platform plugins

These names are public: `hermes plugins validate` raises no private-import warning for them, and they keep their names and signatures across releases. Anything else under `gateway.*`, `tools.*` or `hermes_cli.*` is internal, and the validator lists each import of it.

| Need | Import |
|---|---|
| Adapter base class, send results, media cache helpers | `gateway.platforms.base` (public names) |
| SSRF-safe HTTP client: connect-time IP validation, per-redirect re-check, shared keepalive limits | `from gateway.platforms.helpers import platform_http_client` |
| The pieces of that client, to build your own | `gateway.platforms.base.ssrf_redirect_guard` (httpx `response` hook), `tools.url_safety.create_ssrf_safe_async_client`, `tools.url_safety.is_safe_url`, `gateway.platforms._http_client_limits.platform_httpx_limits` |
| Own DM/group policy (`dm_policy` / `group_policy` / allowlists) | `from gateway.platforms.access_policy_mixin import OwnAccessPolicyMixin` |
| Resolve an approval from a native button | `from tools.approval import resolve_gateway_approval_card` (pass the card's request id; a call without one resolves nothing. Every request starts Deny-only: render through `_send_exec_approval_prompt` so the base `send_exec_approval` can lift the mark once the card shows the whole command. `resolve_gateway_approval` answers the oldest pending request) |
| Refuse a click from someone other than the approval's requester (when `approvals.approvers` is narrowed) | `from gateway.approval_actor import approval_refusal, refusal_text`: call `approval_refusal(session_key, clicker_id, extra=self.config.extra, request_id=...)` before resolving; a non-`None` result is the requester's name, reply privately with `refusal_text(name)` and leave the approval pending. Then settle with `resolve_gateway_approval_card(session_key, choice, request_id, actor_id=clicker_id, extra=self.config.extra)`, which rechecks the clicker against the entry it settles in the same critical section |
| Native clarify buttons | `tools.clarify_gateway`: `get_pending(clarify_id)` (the pending entry or `None`; read `session_key`, `choices`, `multi_select`), `resolve_gateway_clarify(clarify_id, text)`, `mark_awaiting_text(clarify_id)`, `SKIPPED` |
| `setup_fn` wizard steps | `hermes_cli.gateway_setup_wizard`: `print_setup_header(title)`, `confirm_reconfigure(label, *env_vars)`, `offer_home_channel(home_var, user_id, what)`, `save_env_values(**values)`, `prompt_csv(text, default)`; prompts from `hermes_cli.setup` (`prompt`, `prompt_choice`, `prompt_yes_no`); output from `hermes_cli.cli_output` (`print_info`, `print_success`, `print_warning`, `print_error`); `.env` access through `hermes_cli.config` (`save_env_value`, `get_env_value`) |

```python
from gateway.platforms.helpers import platform_http_client

async def connect(self) -> bool:
    # timeout=30.0 and follow_redirects=True by default; any other httpx.AsyncClient kwarg passes through.
    self._http = platform_http_client(headers={"User-Agent": "my-chat-bot/1.0"})
    ...
```

`get_pending()` returns `None` once the clarify was answered, timed out or cleared, so compare the result by identity with the entry your card was rendered for before acting on a click.

### Platform hint declaration (changed since v0.22.2)

The v0.22.2 step "add an entry to `PLATFORM_HINTS` in `agent/prompt_builder.py`" is replaced by declaring the hint on the registry entry (`platform_hint=` on `ctx.register_platform`):

```python
PLATFORM_HINT = (
    "You are chatting via NewPlat. It supports markdown formatting "
    "but has a 4000-character message limit."
)
```

## Related

- [Build a Hermes Plugin](./plugins.md)
- [Adding Providers](./adding-providers.md)
