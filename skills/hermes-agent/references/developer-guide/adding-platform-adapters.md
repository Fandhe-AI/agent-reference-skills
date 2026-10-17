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
| `max_message_length` | Smart chunking limit (0 = none) |
| `platform_hint` | LLM guidance injected into the system prompt |
| `emoji`, `allow_update_command`, `pii_safe` | Display and policy flags |
| `trusted_inbound` (bool, default False) | Inbound events come from an authenticated service, not a human; skips user allowlists and DM pairing. Never set for chat platforms |
| `display_tier` (str, default '') | `'high'`, `'medium'`, `'low'`, `'minimal'` display defaults tier |
| `shared_env_prefixes` (tuple) | Env prefixes shared with non-channel capability; kept on profile clone when adapter not in use |

`plugin.yaml` env entries accept `name` (required), `description`, `prompt`, `url`, `password` (auto-detected from `*_TOKEN` / `*_SECRET` / `*_KEY` / `*_PASSWORD` / `*_JSON` when omitted), `category` (default `"messaging"`). `provides_tools` lists outbound client tools loaded from `tools.py` (`register_tools(ctx)`) while the adapter stays deferred.

Built-in path checklist (core contributors): `Platform` enum in `gateway/config.py`; adapter file; `get_connected_platforms()` / `load_gateway_config()` / `_apply_env_overrides()`; `_BUILTIN_ADAPTERS` table in `gateway/run.py`, authorization maps, `gateway/run_startup.py` `_ALLOWLIST_ENV_PLATFORMS`, `_UPDATE_ALLOWED_PLATFORMS`; webhook and `cron/scheduler_delivery.py` `_KNOWN_DELIVERY_PLATFORMS`; CLI integration (`hermes_cli/config.py`, `gateway.py`, `platforms.py`, `setup.py`, `status.py`, `dump.py`); `tools/send_message_tool.py`, `tools/cronjob_tools.py`; `toolsets.py` (`hermes-newplat` in `hermes-gateway`); optional `PLATFORM_HINTS` in `agent/prompt_builder.py`; tests and docs.

Reference implementations:

| Adapter | Pattern | Good reference for |
|---------|---------|--------------------|
| `bluebubbles.py` | REST + webhook | Simple REST API integration |
| `weixin.py` | Long-poll + CDN | Media handling, encryption |
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
- Source: developer-guide/adding-platform-adapters (v0.22.2 snapshot).

## Related

- [Build a Hermes Plugin](./plugins.md)
- [Adding Providers](./adding-providers.md)
