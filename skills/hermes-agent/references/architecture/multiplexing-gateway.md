# Multiplexing Gateway Internals

Design of the one-gateway-for-all-profiles mode: one gateway process serves the default profile plus every served named profile with isolated adapters, secrets, sessions and cron ticks.

## Signature / Usage

Scope composition for every inbound event:

```text
platform event
   |
   v
profile_routes match --> served-set check --> SessionSource.profile stamped
   |                                           (gateway/profile_routing.py)
   v
_profile_runtime_scope(profile_home)           (gateway/run.py)
   |-- set_hermes_home_override(home)          config / state.db / skills /
   |                                           memory / sessions resolve here
   '-- set_secret_scope(profile .env + secret sources)
   |                                           provider keys, platform tokens
   v
agent turn (worker thread via copy_context())
   |
   v
scope unwound in finally
```

Both scopes are `contextvars` (propagated to executor threads via `copy_context()`); nothing is written to `os.environ`.

## Options / Props

| Setting | Description |
|---------|-------------|
| `gateway.multiplex_profiles` | Mode flag (also accepted at top level); default `true`. Precedence: env > config > unset. An unset flag is resolved at boot by `resolve_multiplex_mode` |
| `GATEWAY_MULTIPLEX_PROFILES` | Env override; accepts explicit truthy/falsy tokens only, blank/unrecognized means no override |
| `gateway.profile_routes` | Maps `(platform, user_id, guild_id, chat_id, thread_id)` to a profile; conjunctive, most-specific-first, parent-chain matching for threads |

Intake vs delivery adapters:

| Topology | Runtime | Intake | Delivery |
| --- | --- | --- | --- |
| Per-credential bot, no route | The bot's own profile | Owner adapter | Owner adapter |
| Shared credential -> satellite via `profile_routes` | Routed profile | Receiving (shared) adapter | Receiving adapter |
| Shared bot -> a profile that owns its own bot | Routed profile | Receiving adapter | Receiving adapter |
| Secondary-owned bot -> `default` (`bot_profile: <secondary>`) | `default` | Receiving (secondary) adapter | Receiving adapter |
| Restored / synthetic source, no live provenance | Stored `source.profile` | None (fail closed) | Unique owner of `(platform, runtime)`, else `None` |

Control-plane RPC methods (`tui_gateway/methods_profiles.py`): `profiles.list`, `profiles.create`, `profiles.describe`, `profiles.configure`, `profiles.set_asset`, `profiles.get_asset`.

## Notes

- Secret scope (`agent/secret_scope.py`): `build_profile_secret_scope(home)`, `set_secret_scope(mapping)`, `get_secret(name)` resolves global allowlist -> active scope -> fallback. Fallback with multiplexing off reads `os.environ`; with multiplexing on and no scope it raises `UnscopedSecretError`. Allowlist (`HERMES_HOME`, `HERMES_PROFILE`, proxy settings, `API_SERVER_*` listener settings except `API_SERVER_KEY`) stays global.
- `GatewayRunner.__init__` calls `agent.secret_scope.set_multiplex_active(...)` once; `_MULTIPLEX_ACTIVE` is a module global.
- The HERMES_HOME override is context-local in `hermes_constants.py`; `get_process_hermes_home()` is for machine-level assets; `hermes_home_key()` gives per-home registry keys.
- Served set: `profiles_to_serve(multiplex, profile_allowlist)` in `hermes_cli/profiles.py`; a malformed allowlist fails safe to default-only.
- Session keys are namespaced by profile (`agent:main` default, `agent:<name>` named). Each inbound event carries one frozen `RoutingIdentity` (`gateway/session_identity.py`) with `transport_profile` and `runtime_profile`. Copy a source with `session_identity.replace_source`, not `dataclasses.replace`.
- `SessionStore` binds no DB handle at construction; handles resolve at call time per `profiles/<name>/state.db`.
- Failure modes: fatal at startup for multiplex config errors and a secondary enabling a port-binding platform (`MultiplexConfigError`, `SecondaryPortBindingConfigError`); a misconfigured secondary adapter is skipped; unserved route targets are dropped; an external `cron.provider` falls back to the built-in ticker.
- Known process-global state: MCP discovery/tool registration, terminal env (`TERMINAL_*`), built-in tool registry, provider/capability registries, HTTP listener / relay ingress / process lock.
- Non-goal: multiplexing isolates profiles, it does not authenticate or authorize end users.

## Related

- [Gateway Internals](./gateway-internals.md)
- [Gateway Session Lifecycle](./gateway-session-lifecycle.md)
