# Bot Mode

Bot Mode turns Hermes profiles into a roster of named Bots, each with its own role, model, memory, skills, and avatar. Bots run routines, share group chats, and message each other. It ships built into the desktop app and is on by default (a **Bots** tab next to Sessions in the left sidebar).

## Signature / Usage

A Bot is a Hermes profile (`~/.hermes/profiles/<name>/`), so every Bot Mode action has a CLI equivalent:

| In Bot Mode | From a shell |
| --- | --- |
| Chat with a Bot | `hermes -p <bot> chat` |
| A Bot's files, skills, memory | `~/.hermes/profiles/<bot>/` |
| Routines | `hermes cron list` (jobs named `[bot:<name>] ...`) |
| Create / inspect profiles | `hermes profile create`, `hermes profile list` |

```yaml
agent:
  bot_mode_protocol: true   # inject the bot-to-bot messaging protocol into canonical Bot Chats
```

Bot-to-bot loop guard:

```yaml
gateway:
  bot_loop_guard:
    max_hops: 4                       # bot-to-bot messages per exchange, Bot Mode and messaging platforms
    bot_replies_expect_reply: false   # true: a bot's reply to a bot may be answered
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `agent.bot_mode_protocol` | bool (default on) | Master switch for injecting the bot-to-bot messaging protocol into canonical Bot Chat sessions |
| `gateway.bot_loop_guard.max_hops` | number (default 4) | Bot-to-bot messages allowed per exchange since your last message; past it a further `message_agent` call is refused and nothing is sent |
| `gateway.bot_loop_guard.bot_replies_expect_reply` | bool (default false) | `true` lets Bots answer each other's replies (still capped by `max_hops`) |
| `gateway.bot_loop_guard.enabled` | bool | `false` turns every loop-guard rule off |
| `auxiliary.group_router` | auxiliary slot | Model for the automatic "Pick who answers" call in gateway-owned rooms (`hermes model` -> auxiliary -> Group router) |
| `gateway.room_link_url` | URL | Advertised endpoint of a member gateway; reached at `<room_link_url>/p/<profile>` for a named profile unless that profile sets its own |
| `bot_mode.envelope_ttl_seconds` | number | TTL applied to queued/re-offered cross-machine messages |
| `terminal.oneshot_completion_wait_seconds` | number | Bounds how long a delivery process stays alive waiting for a teammate's reply |
| `sessions.auto_archive` | config key | Idle-archive sweep; never retires a Bot Chat |

## Notes

- Bots pane: one row per agent profile; each Bot has one canonical, persistent **Bot Chat** (title exactly `Bot Chat`). `/new` / `/reset` inside it is rerouted to `/compact`. Archiving it retires it and the next click starts a fresh canonical chat.
- Hide a Bot (right-click -> **Hide Bot**) is display-only; @mentions and group memberships keep working. Sections (folders) are stored in profile metadata `ui_meta`; deleting a section never deletes Bots.
- Creating a Bot: Name / Title / Description, plus Advanced (clone from profile, create empty, model and provider pin, custom SOUL.md, per-skill / toolset / MCP enablement, copy API keys). Single-use OAuth logins (Anthropic, OpenAI Codex, xAI) are not copied; run `hermes -p <name> auth add <provider>` (see the profiles page, "OAuth logins are shared, not copied"). With several connections, a **Create on** picker creates the profile on the chosen machine.
- Avatars: blob faces (default, deterministic from name), geometric faces, uploaded image, AI-generated portrait, pixel pet (`hermes pets`). Voices use the Bot's own profile `tts.*` on its own gateway.
- Routines are plain Hermes cron jobs named `[bot:<name>] <routine>`; runs land in the Bot's chat history.
- Group chats: 2-6 Bots; one message triggers up to three serial rounds (hard caps: 10 messages per send, 3 rounds). Bots reply or pass; `@name` pulls a Bot in, `@user` escalates to you (a **needs you** badge), `@all` / `@everyone` addresses everyone. Stop words (`stop`, `halt`, `pause`) hold a member only next to its @mention; **Detect stop directives** can be turned off per room. Room state lives in the install's root `shared-state.db`. Every new group chat is run by a gateway (Desktop's own, or a `hermes serve` / `hermes dashboard` backend over SSH, URL or Cloud) through a durable driver, so it keeps running when Desktop closes (`groups.capabilities` reports `driver: true`) and Desktop catches up from the log on reopen. On a gateway-owned room the 10-message / 3-round cap pauses the discussion (**Paused after N messages** with **Continue**, up to 5 times, and **Stop**) instead of ending it. Who answers a message naming nobody is a Room setting: **Everyone** (default), a **lead**, or **Pick who answers automatically** (one short tool-less model call, routed by `auxiliary.group_router`; the room shows **Assigned to X**; failure falls back to everyone). @mentions, `@all` / `@everyone`, scheduled posts and in-thread replies never reach that call. A *classic group chat* is one an older version saved: Desktop runs its rounds, so it pauses while Desktop is closed; Desktop no longer creates them, and on a gateway connection it offers **Start new group** (a fresh group chat with the same bots, no earlier messages copied) at the migration gate.
- Bots on another gateway in a gateway-owned group chat: the home gateway (its `groups.capabilities` must report `driver: true`, `persistent_process: true` and list `groups.peer.register`) seats a bot whose turns run on a member gateway (its `groups.capabilities` must report `room_link.enabled: true` and list `groups.peer.invite`; needs the `api_server` platform with durable run storage, an advertised `gateway.room_link_url` reachable from the home, and approvals not off — `approvals.mode: off` is refused). Text only. Any profile the member gateway serves can join. Setup is three JSON-RPC steps below; until step 3 the member's turns fail with `peer room route is unavailable`. Grants: `ttl_seconds` 60 to 86,400 (default 3,600), optional `status_ttl_seconds` renewal horizon up to 30 days; an expired or past-horizon member reports `needs_reauthorization` under `driver_status.peer_routes` in `groups.state`; renew by inviting and registering again. Register errors: `peer_target_mismatch`, `peer_unreachable`, `room_reauthorization_required`. `groups.peer.revoke` (on the member gateway) revokes a member's access; Disband revokes retained grants and is refused until every member gateway confirms its turns ended. Turns use idempotency key `room:<task>:<generation>`, so a lost reply never runs a turn twice; **Retry** re-reads the same attempt, **Discard** asks the member gateway which run the key started and never starts it. Stop is recorded as cancelled only after the member gateway confirms.

```json
{"jsonrpc":"2.0","id":1,"method":"groups.create","params":{"room_id":"ROOM_ID","name":"Review","members":[
  {"member_id":"host","profile":"default","handle":"host"},
  {"member_id":"reviewer","profile":"default","handle":"reviewer","target":{
    "kind":"peer","peer_id":"spark","installation_id":"CATALOG_INSTALLATION_ID",
    "profile":"default","capability_digest":"CATALOG_DIGEST"}}]}}
```

```json
{"jsonrpc":"2.0","id":2,"method":"groups.peer.invite","params":{"room_id":"ROOM_ID","member_id":"reviewer",
  "home_install_id":"HOME_GATEWAY_ID","authority_gateway_id":"HOME_GATEWAY_ID","authority_epoch":1}}
```

```json
{"jsonrpc":"2.0","id":3,"method":"groups.peer.register","params":{"room_id":"ROOM_ID","member_id":"reviewer",
  "target_url":"CATALOG_ENDPOINT_URL","target_profile":"default",
  "grant":"GRANT","catalog":{"...":"the catalog from the member gateway"}}}
```

- Local Bots and the gateway: one gateway process per host owns every local profile's sessions; opening a local Bot runs `hermes gateway ensure --json` for that profile (attach or start) and dials `/api/ws` with a one-use ticket. Closing Desktop never stops the gateway (`hermes gateway stop` does); a profile with `gateway.standalone: true` keeps its own gateway. Remote gateways, SSH hosts and Hermes Cloud connections are separate hosts whose Bots run there.
- Loop guard: a message a Bot sends back to the Bot that messaged it goes notify-only automatically (`[no reply needed]`), on every route; the receiver cannot message that sender back in the same turn. Past `gateway.bot_loop_guard.max_hops` (default 4) a further `message_agent` call is refused; sending the same message to the same teammate twice in one exchange is refused as a repeat (a send that never left does not count). Your next message starts a fresh exchange. `message_agent` also accepts `constraints` / `expecting` (shown to the teammate as `Constraints:` / `Reply needed:` lines); each completion leads with one `outcome` sentence, and a recipient that ends silent on a request expecting an answer has its last words relayed once, marked `[no final reply; their last message this turn:]`.
- Bot-to-bot: `@researcher ...` in any chat, or the `message_agent(target="researcher", message="...")` tool. Delivery is fire-and-forget (`status: queued` plus `delivery_id` is a dispatch acknowledgement, not delivery); do not resend a delivery whose outcome is unknown. Failed deliveries carry a typed `reason` code (for example `provider_auth_or_access`, `provider_rate_limit`, `context_overflow`, `runtime_offline`, `delivery_timeout`, `target_busy`, `unknown`). A failed turn retries at most once; auth, quota, and config failures never auto-retry.
- `message_agent` and the protocol section exist only when the session is titled exactly `Bot Chat` and at least one profile has `ui_meta: { hermes-bots: ... }` in `profile.yaml`. On a headless install, satisfy both by hand:

```bash
# the canonical forever-chat, created once per Bot (later runs resume it)
hermes -p <bot> chat -c "Bot Chat" --create-if-missing
```

```yaml
# ~/.hermes/profiles/<any-bot>/profile.yaml — an empty block is enough to mark the install
ui_meta:
  hermes-bots: {}
```

- Cross-machine: the Desktop relays between registered connections (Settings -> Connections). `hermes peer` registers a gateway peer (API server URL + `API_SERVER_KEY`) for Desktop-less messaging:

```bash
hermes peer add spark --url http://spark.lan:8377 --key <API_SERVER_KEY>
hermes peer list
hermes peer dm spark < ~/.hermes/cache/scratch/dm.txt
hermes peer run spark --idempotency-key ticket-123 < ~/.hermes/cache/scratch/long-task.txt
hermes peer status spark run_abc123
hermes peer stop spark run_abc123
```

  Peer key lives in `~/.hermes/.env` as `HERMES_PEER_<NAME>_KEY`; names/URLs in `config.yaml` under `bot_peers`. A gateway behind NAT can dial out but not be dialed in.
- Hosted room authority takeover is an operator recovery procedure using JSON-RPC `groups.promote` (requires `room_id` and `confirm: true`) and `groups.demote` (requires `room_id`, `observed_gateway_id`, `observed_epoch`); fence the old writer first or histories diverge.
- Turning off: Capabilities -> Plugins -> Bots -> **Desktop** switch; data is untouched.
- A failed member turn names its cause (`builder hit an error — <first line of the error>`, secret-shaped tokens redacted); the v0.22.2 `couldn't start — too many bots running` message is no longer documented. **Manage groups** on gateway-managed rooms offers only Bots on the active connection; older Desktop rooms can retain mixed-connection members.
- Source: https://hermes-agent.nousresearch.com/docs/user-guide/bot-mode (pinned to v0.23.1)

### Migration (v0.22 -> v0.23)

- Migration (v0.22 -> v0.23): Settings -> Advanced -> **Warm Bot Backends** (default 3, ~60 MB each, idle reap 10 min, 30 s wait for a free slot) is removed from the docs; Desktop now uses one gateway per host with no backend pool, limit setting or idle reaper (v0.22.2 documented the pool).
- Migration (v0.22 -> v0.23): Desktop-driven group chats ("rooms keep running only if every member lives on one gateway") are replaced by gateway-owned group chats for every new group chat, including cross-machine ones; older Desktop-driven ones are "classic group chats" kept as-is, not converted.

## Related

- [profiles.md](./profiles.md)
- [desktop.md](./desktop.md)
- [multi-connection-desktop.md](./multi-connection-desktop.md)
