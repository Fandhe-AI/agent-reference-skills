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

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `agent.bot_mode_protocol` | bool (default on) | Master switch for injecting the bot-to-bot messaging protocol into canonical Bot Chat sessions |
| `bot_mode.envelope_ttl_seconds` | number | TTL applied to queued/re-offered cross-machine messages |
| `terminal.oneshot_completion_wait_seconds` | number | Bounds how long a delivery process stays alive waiting for a teammate's reply |
| `sessions.auto_archive` | config key | Idle-archive sweep; never retires a Bot Chat |
| Settings -> Advanced -> Warm Bot Backends | setting (default 3, ~60 MB each) | Max concurrently alive local Bot backends; idle reap after timeout (default 10 min); a Bot waits up to 30 s for a free slot |

## Notes

- Bots pane: one row per agent profile; each Bot has one canonical, persistent **Bot Chat** (title exactly `Bot Chat`). `/new` / `/reset` inside it is rerouted to `/compact`. Archiving it retires it and the next click starts a fresh canonical chat.
- Hide a Bot (right-click -> **Hide Bot**) is display-only; @mentions and group memberships keep working. Sections (folders) are stored in profile metadata `ui_meta`; deleting a section never deletes Bots.
- Creating a Bot: Name / Title / Description, plus Advanced (clone from profile, create empty, model and provider pin, custom SOUL.md, per-skill / toolset / MCP enablement, copy API keys). Single-use OAuth logins (Anthropic, OpenAI Codex, xAI) are not copied; run `hermes -p <name> auth add <provider>`. With several connections, a **Create on** picker creates the profile on the chosen machine.
- Avatars: blob faces (default, deterministic from name), geometric faces, uploaded image, AI-generated portrait, pixel pet (`hermes pets`). Voices use the Bot's own profile `tts.*` on its own gateway.
- Routines are plain Hermes cron jobs named `[bot:<name>] <routine>`; runs land in the Bot's chat history.
- Group chats: 2-6 Bots; one message triggers up to three serial rounds (hard caps: 10 messages per send, 3 rounds). Bots reply or pass; `@name` pulls a Bot in, `@user` escalates to you (a **needs you** badge), `@all` / `@everyone` addresses everyone. Stop words (`stop`, `halt`, `pause`) hold a member only next to its @mention; **Detect stop directives** can be turned off per room. Rooms keep running when Desktop closes if every member lives on one gateway (`groups.capabilities` reports `driver: true`). Room state lives in the install's root `shared-state.db`.
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
- Source: https://hermes-agent.nousresearch.com/docs/user-guide/bot-mode (pinned to v0.22.2)

## Related

- [profiles.md](./profiles.md)
- [desktop.md](./desktop.md)
- [multi-connection-desktop.md](./multi-connection-desktop.md)
