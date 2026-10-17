# Gateway Internals

The messaging gateway is the long-running process that connects Hermes to 20+ messaging platforms: boot, authorization, session routing, slash command dispatch and delivery.

## Signature / Usage

Session key format (never construct manually; use `build_session_key()` from `gateway/session.py`):

```text
agent:{namespace}:{platform}:{chat_type}:{chat_id}
```

Example: `agent:main:telegram:private:123456789` (default profile) or `agent:work:telegram:private:123456789` when the multiplexer routes the chat to profile `work`. A profile literally named `main` is marked `main~`.

Message flow: platform adapter normalizes the event into a `MessageEvent` -> base adapter active-session guard -> `GatewayRunner._handle_message()` (session key, authorization, slash command check, running-agent check, else create `AIAgent`) -> response via adapter.

## Options / Props

Key files:

| File | Purpose |
|------|---------|
| `gateway/run.py` | `GatewayRunner` facade composing `gateway/run_*.py` mixins and `gateway/slash_commands_*.py` handlers |
| `gateway/session.py` | `SessionStore`, session key construction |
| `gateway/delivery.py` | Outbound delivery |
| `gateway/pairing.py` | DM pairing flow |
| `gateway/channel_directory.py` | Chat ID -> name mapping for cron delivery |
| `gateway/hooks.py` | Hook discovery and lifecycle dispatch |
| `gateway/mirror.py` | Cross-session mirroring for `send_message` |
| `gateway/status.py` | Token lock management |
| `gateway/platform_registry.py` | Adapter registry, factories, deferred loaders |

Authorization order:

| # | Check |
|---|-------|
| 1 | Per-platform allow-all flag (e.g. `TELEGRAM_ALLOW_ALL_USERS`) |
| 2 | Platform allowlist (e.g. `TELEGRAM_ALLOWED_USERS`) |
| 3 | DM pairing |
| 4 | Global allow-all (`GATEWAY_ALLOW_ALL_USERS` or `gateway.allow_all_users`) |
| 5 | Default: deny |

Gateway hook events:

| Event | When fired |
|-------|-----------|
| `gateway:startup` | Gateway process starts |
| `session:start` | New conversation session begins |
| `session:end` | Session completes or times out |
| `session:reset` | User resets session with `/new` |
| `agent:start` | Agent begins processing a message |
| `agent:step` | Agent completes one tool-calling iteration |
| `agent:end` | Agent finishes and returns response |
| `command:*` | Any slash command is executed |

Hooks are directories with `HOOK.yaml` and `handler.py`, discovered from `gateway/builtin_hooks/` (empty) and `<profile home>/hooks/`.

DM pairing flow (developer-guide example; see Notes for the owner-approval flow):

```text
Admin: /pair
Gateway: "Pairing code: ABC123. Share with the user."
New user: ABC123
Gateway: "Paired! You're now authorized."
```

## Notes

- Source: https://hermes-agent.nousresearch.com/docs/developer-guide/gateway-internals (pinned to v0.22.2)
- The DM pairing example above is verbatim from the developer guide (gateway-internals). The user-facing flow in the User Guide security page differs: an unknown user DMs the bot, the bot replies with an 8-character pairing code, and the bot owner approves it with `hermes pairing approve <platform> <code>` (see security/security.md and messaging/messaging.md). Source: https://hermes-agent.nousresearch.com/docs/user-guide/security
- Two-level message guard: Level 1 base adapter (`_active_sessions` -> queue in `_pending_messages` + interrupt event); Level 2 gateway runner (`_running_agents`; intercepts `/stop`, `/new`, `/queue`, `/status`, `/approve`, `/deny`, everything else triggers `running_agent.interrupt()`). `/approve` etc. dispatch inline to avoid races.
- Slash commands resolve via `resolve_command()` (`hermes_cli/commands.py`), `GATEWAY_KNOWN_COMMANDS`, and handler lookup `_handle_<name>_command`; busy handling via `CommandDef.busy_policy` / `busy_handler`.
- Config sources: `~/.hermes/.env`, `~/.hermes/config.yaml`, environment variables. The gateway reads `config.yaml` directly, unlike the CLI's `load_cli_config()` defaults.
- Platform adapters mostly live in `plugins/platforms/<name>/adapter.py`; legacy ones in `gateway/platforms/`. All extend `BasePlatformAdapter` and implement `connect()` / `disconnect()` / `send()`; inbound goes through `handle_message()`. Bundled platform plugins use deferred loading (`register_deferred`).
- Experimental relay platform (`gateway/relay/`) activates with `GATEWAY_RELAY_URL` or `gateway.relay_url`.
- Token locks: `acquire_scoped_lock()` / `release_scoped_lock()`; at startup a live foreign holder parks the platform fatal and, with nothing else connected, the gateway exits `78` (`EX_CONFIG`).
- Delivery: direct reply, home channel, explicit target (`telegram:-1001234567890`), cross-platform. Cron deliveries are not mirrored into gateway session history by default.
- Memory flush: `/new`, `/reset`, `/resume` finalize the outgoing session; TTL/LRU/memory-pressure eviction commits the transcript to providers but does not close the conversation.
- Process management: `hermes gateway start|stop`, `systemctl` / `launchctl`, profile-scoped PID file `~/.hermes/gateway.pid`. Under multiplexing there is one gateway process per host; `hermes -p x gateway stop` for a served secondary refuses with exit 78, and a redundant `gateway run` exits 75 under a supervisor. `hermes gateway stop --all` kills all gateway processes.
- Background process notifications: `terminal(background=true, notify_on_complete=true)`; verbosity `display.background_process_notifications` (or `HERMES_BACKGROUND_NOTIFICATIONS`): `concise` (default), `all`, `result`, `error`, `off`. Internal wakes use `gateway.wake.admit_internal_event` as the acceptance receipt.
- `/login` is off-turn and refused outside a paired DM; it binds the whole install (`providers.nous`). Set `allow_admin_from` on shared gateways.
- Multiplexed profiles: `gateway.multiplex_profiles: true` serves the default profile plus every live directory under `profiles/`; secret reads fail closed (`UnscopedSecretError`) once `set_multiplex_active(True)`.
- Mid-run plugin loading re-wires platform handlers without restart (`gateway/run_plugin_rewire.py`; `reload-plugins` control verb); tools and system-prompt sections wait for the next session, MCP servers for `mcp.reload`.

## Related

- [Gateway Session Lifecycle](./gateway-session-lifecycle.md)
- [Multiplexing Gateway Internals](./multiplexing-gateway.md)
- [Gateway Monitoring](./gateway-monitoring.md)
- [Session Storage](./session-storage.md)
- [Cron Internals](./cron-internals.md)
- [ACP Internals](./acp-internals.md)
- [Agent Loop](./agent-loop.md)
