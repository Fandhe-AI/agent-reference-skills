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

Hooks are directories with `HOOK.yaml` and `handler.py`, discovered from `<profile home>/hooks/` (the `gateway/builtin_hooks/` extension point is gone).

DM pairing flow (developer-guide example; see Notes for the owner-approval flow):

```text
Admin: /pair
Gateway: "Pairing code: ABC123. Share with the user."
New user: ABC123
Gateway: "Paired! You're now authorized."
```

## Notes

- Source: https://hermes-agent.nousresearch.com/docs/developer-guide/gateway-internals (pinned to v0.23.1)
- v0.23 adds a large canonical-session (session authority) section to this page; the items below are condensed.
- Canonical groups / profile discovery: authenticated canonical WebSocket exposes `groups.capabilities`, `groups.list`, `groups.state`, `groups.log` (`session:read`) and `groups.create`, `groups.rename`, `groups.disband` (`session:control`); metadata management only (reports `driver: false`, no send/retry/approval/peer-grant). `profiles.list` (`session:read`) returns the authenticated profile first, then served siblings and hosted-room destinations; `include_sessions` defaults true (`canonical_session` = exact `Bot Chat` title, `last_session` = newest visible local conversation); discovery never creates, restores or unarchives sessions or runs inference.
- Canonical ancillary reads: `session.control.read`, `process.list`, `subagent.list`, `subagent.tail` (with `session_id`, `session:read`) never restore a cold session (use `session.resume` first); a retired route binding returns `stale_generation`; subagent tails are bounded to 16 KiB, `subagent.list` rows carry `child_session_id`; managed-worker policies return `unsupported_projection`; these are reads, not steering or stop controls.
- Pending-input snapshots: `session.resume` returns each pending admission with its original `input_id`, committed public `text`, `admission_id`, sequence and status; use `admission_id` (not the input ID) for cancellation and receipt queries; queue admission/claim/cancel/settle publish `session.info` before `message.complete`. A turn `started` when its gateway died is recovered as `unknown` (never replayed; followers wait); `prompt.resolve_unknown` (`session:control`; `session_id`, `admission_id`, `execution_generation`) settles it as `interrupted` and resumes the FIFO (stale generation -> `stale_generation`); Desktop shows "Turn lost during restart" with **Discard**, gateway CLI `/discard <admission_id>`. Messaging users on a paused session are told once per pause episode that `/reset` starts a fresh conversation.
- Prompt attachments: `prompt.submit` accepts `attachments: [{path, mime}]` (image types png/jpeg/gif/webp, max 10, each under `gateway.max_inbound_media_bytes`, files directly in the profile `cache/images/`); the authority copies bytes into its immutable `native-inputs` store at admission (sha256-checked), so later cache cleanup cannot change what executes. ACP uses this for image blocks; Ink and Desktop still use legacy `image.attach` / `file.attach`.
- Native admission startup recovery: only never-started queued work is recovered after adapter connection, route publication and the restore gate (sender authorization and connector/profile binding rechecked; rows stay queued if unavailable); started admissions become `unknown` and pause the FIFO. Under `gateway.multiplex_profiles` one session authority per served profile home, so recovery, FIFO order and exactly-once settlement hold per profile.
- Local slash commands: `slash.exec({session_id, command})` and `command.dispatch({session_id, name, arg})` on authenticated local sessions; read commands `/help`, `/commands`, `/status`, `/context`, `/version`, `/whoami` (`session:read`), `/title` (`session:control`); skill / quick-command resolution needs `session:submit` and returns `{type: "skill", name, message, display}`; `type: exec` quick commands and plugin slash commands need `session:control`; anything else returns `unsupported_command`.
- Busy input and corrections: `config.get` / `config.set` with `key: "busy"` (`interrupt` | `steer` | `queue`, per live session only); `session.steer` and `session.redirect` need `session_id`, `text` and the current `execution_generation` (replies `queued` / `redirected` are not crash-durable; `rejected` = correction window missed; `stale_generation`; managed workers return `unsupported_control`). Setup readiness: `setup.status` / `setup.runtime_check` (`session:create`, own profile only). Clarification: `clarify.request` events and `session.resume` `prompts`; respond with `clarify.respond` (`session_id`, `execution_generation`, `prompt_id`, `answer`; needs `session:respond`; first response wins; `clarify.settled`).
- Revision-checked metadata: `session.mutate` (`session_id`, `request_id`, `expected_revision`, `operation`, `payload`; `session:control`): `rename` `{"title"}`, `archive` `{"archived": bool}`; edit and retry receipt commit together; same request replays the original result, reused ID with different contents -> `admission_conflict`, stale revision -> `revision_conflict`. Canonical reset, delete, rewind, model, branch (optional `title`, `through_message_id`) and compression use the same receipt boundary. Wire models live in `tui_gateway/contracts/canonical*.py` (generate `CanonicalRpcMethods` and OpenRPC `x-canonical-methods`).
- Private control socket: the POSIX listener uses two executors of its own (hosted producer requests vs everything else); a `hosted-producer` operation calls back through `hosted-attest` and `identify`. Private native HTTP auth: fresh one-use 30 s `session-ticket` (`profile_id`, `instance_id`, `purpose: "native-http"`, carries only `http:owner`) sent in `X-Hermes-Gateway-Ticket`; needs a loopback socket peer and no `Origin` header at all; invalid/replayed/wrong-purpose returns 401 without falling back to static token or OAuth cookie; cross-profile targets return 403 `profile_scope_mismatch`; `purpose: "native-profile-create"` (`profiles:create`) is accepted only by `POST /api/profiles` (optional `soul` written in the staged profile, `soul_set` confirms). Frozen local launch credentials: `session.create` receipts keep the launch policy, not plaintext keys; missing or changed credentials fail closed; ad-hoc `--api-key` is authority-lifetime-only; CLI cost/data-training consent runs before gateway discovery.
- Optional service installation: `hermes gateway run` works without an OS service; `hermes setup`, quick setup and `hermes gateway setup` ask once; the profile's `gateway.service_install_choice` is `null` | `install` | `decline` (an unset value is not permission to install; reset with `hermes config set gateway.service_install_choice null`); noninteractive setup and imports never install a missing service; `hermes gateway install` records the choice after success; setup orchestration in `hermes_cli/gateway_setup_service.py`.
- `hermes gateway ensure --json --timeout 60` (finite positive deadline, default 60): waits for an existing reservation/starting owner, prefers an existing service over an unmanaged process, never installs or rewrites service definitions; refuses with `profile_mismatch`, `service_account_mismatch`, `service_identity_unverified`, or `inaccessible / unsafe_control_permissions` (world-write always, group-write unless the owner's private group; fix with `chmod o-w,g-w`). Exit codes: `0` ready, `2` invalid invocation, `3` incompatible protocol/capabilities, `4` authorization or profile mismatch, `5` deadline reached (startup may be pending; not permission to replace the owner), `6` draining or update in progress, `7` inaccessible runtime, conflicting supervisor or startup failure.
- Local control socket (public client contract): three public verbs `identify`, `resolve-profile`, public `session-ticket`; one request per connection (UTF-8 JSON + `\n`, max 64 KiB request / 512 KiB reply; `{"protocol": 1, "id": ..., "verb": ..., "params": {...}}`). `resolve-profile` takes `{"home": "<absolute home>"}` and returns `state`, `reason_code`, `attachable`, `update_fenced`, `control` (`self` | `host` | `null`), `endpoint`, `install_code_sha`. `session-ticket` public form: `{"profile_id", "instance_id", "purpose": "interactive"}` (+ `"restart_wait": "refuse"` for pollers); ticket is single-use, 30 s, 256 random bits, authenticates `/api/ws` only (dial `ws_url` from loopback with no `Origin`, subprotocols `[ws_protocol, ticket_protocol_prefix + ticket]`). Pinned by `apps/shared/src/node/control-socket.vectors.json`.
- `hermes gateway attach --json`: public attach step (`hermes_cli/gateway_runtime_attach.py::attach_gateway`, same as the Ink TUI bootstrap). Flags: none (discover only, never start), `--start` (ensure the owner), `--recover` (discover, ensure when not ready), `--timeout S` (default 60; `--start` and `--recover` are mutually exclusive). Unmanaged gateways started this way use the idle exit; an installed service keeps running. Success prints one JSON line with `url`, `protocol` (`hermes-gateway-v1`), `protocols`, `ticket` plus `ensure`'s fields; no owner -> `message` and no `url` / `ticket`; ticket not mintable -> `inaccessible` / `ticket_unavailable` (exit 7). Restart the gateway (`hermes gateway restart`) when `client_code_sha` and `endpoint.code_sha` differ.
- Background-completion folding: completions landing while the session is busy fold into one queued turn (`session_automation.py::_admit_folded_completion`) when the route already has a completion at the tail of the FIFO; only the tail folds.
- `/login`: the handler drains `anon_auth.run_sign_in` on a private single-worker executor (`_login_executor`); the same identity's second `/login` cancels the first (the cancelled copy is pushed to its chat), a different identity is refused, a cancelled attempt saves nothing, and the completion copy carries what the free tier's handoff moved. The link and code are never posted in broadcast-like `dm` chats (ntfy, raft, a2a).- The DM pairing example above is verbatim from the developer guide (gateway-internals). The user-facing flow in the User Guide security page differs: an unknown user DMs the bot, the bot replies with an 8-character pairing code, and the bot owner approves it with `hermes pairing approve <platform> <code>` (see security/security.md and messaging/messaging.md). Source: https://hermes-agent.nousresearch.com/docs/user-guide/security
- Two-level message guard: Level 1 base adapter (`_active_sessions` -> queue in `_pending_messages` + interrupt event); Level 2 gateway runner (`_running_agents`; intercepts `/stop`, `/new`, `/queue`, `/status`, `/approve`, `/deny`, everything else triggers `running_agent.interrupt()`). `/approve` etc. dispatch inline to avoid races.
- Slash commands resolve via `resolve_command()` (`hermes_cli/commands.py`), `GATEWAY_KNOWN_COMMANDS`, and handler lookup `_handle_<name>_command`; busy handling via `CommandDef.busy_policy` / `busy_handler`.
- Config sources: `~/.hermes/.env`, `~/.hermes/config.yaml`, environment variables. The gateway reads `config.yaml` directly, unlike the CLI's `load_cli_config()` defaults.
- Every messaging platform ships as a plugin adapter under `plugins/platforms/<name>/` (now including whatsapp_cloud, signal, bluebubbles, weixin, qqbot; WhatsApp = local Baileys bridge, `whatsapp_cloud` = Business Cloud API); `gateway/platforms/` keeps `base.py` and the HTTP ingress adapters (`api_server`, `webhook`, `msgraph_webhook`). All extend `BasePlatformAdapter` and implement `connect()` / `disconnect()` / `send()`; inbound goes through `handle_message()`. Bundled platform plugins use deferred loading (`register_deferred`).
- Experimental relay platform (`gateway/relay/`) activates with `GATEWAY_RELAY_URL` or `gateway.relay_url`.
- Token locks: `acquire_scoped_lock()` / `release_scoped_lock()`; at startup a live foreign holder parks the platform fatal and, with nothing else connected, the gateway exits `78` (`EX_CONFIG`).
- Delivery: direct reply, home channel, explicit target (`telegram:-1001234567890`), cross-platform. Cron deliveries are not mirrored into gateway session history by default.
- Memory flush: `/new`, `/reset`, `/resume` finalize the outgoing session; TTL/LRU/memory-pressure eviction commits the transcript to providers but does not close the conversation.
- Process management: `hermes gateway start|stop`, `systemctl` / `launchctl`, profile-scoped PID file `~/.hermes/gateway.pid`. Under multiplexing there is one gateway process per host; `hermes -p x gateway stop` for a served secondary refuses with exit 78, and a redundant `gateway run` exits 75 under a supervisor. `hermes gateway stop --all` kills all gateway processes.
- Background process notifications: `terminal(background=true, notify_on_complete=true)`; verbosity `display.background_process_notifications` (or `HERMES_BACKGROUND_NOTIFICATIONS`): `concise` (default), `all`, `result`, `error`, `off`. Internal wakes use `gateway.wake.admit_internal_event` as the acceptance receipt.
- `/login` is off-turn and refused outside a paired DM; it binds the whole install (`providers.nous`). Set `allow_admin_from` on shared gateways.
- Multiplexed profiles: `gateway.multiplex_profiles: true` serves the default profile plus every live directory under `profiles/`; secret reads fail closed (`UnscopedSecretError`) once `set_multiplex_active(True)`.
- Mid-run plugin loading re-wires platform handlers without restart (`gateway/run_plugin_rewire.py`; `reload-plugins` control verb); tools and system-prompt sections wait for the next session, MCP servers for `mcp.reload`.

### Migration (v0.22 -> v0.23)

- `gateway/builtin_hooks/` removed; `gateway/platforms/signal.py`, `weixin.py`, `bluebubbles.py`, `qqbot/` and `yuanbao.py` are no longer there (moved to plugins; Yuanbao is the `yuanbao` Hermes Labs plugin).
- `/login` no longer "supersedes" via `wait_for_promotion`; the same identity's second `/login` cancels the first and the token poll checks `attempt.cancelled` on a <=1 s tick (a shutdown-cancelled attempt no longer persists an already-completed transfer).

## Related

- [Gateway Session Lifecycle](./gateway-session-lifecycle.md)
- [Multiplexing Gateway Internals](./multiplexing-gateway.md)
- [Gateway Monitoring](./gateway-monitoring.md)
- [Session Storage](./session-storage.md)
- [Cron Internals](./cron-internals.md)
- [ACP Internals](./acp-internals.md)
- [Agent Loop](./agent-loop.md)
