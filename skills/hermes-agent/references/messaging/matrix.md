# Matrix

Hermes Agent connects to any Matrix homeserver (Synapse, Conduit, Dendrite, matrix.org) via the `mautrix` Python SDK, with threads, reactions-based approvals, native voice messages and optional end-to-end encryption.

## Signature / Usage

```bash
# ~/.hermes/.env  (access-token login)
MATRIX_HOMESERVER=https://matrix.example.org
MATRIX_ACCESS_TOKEN=***
MATRIX_ALLOWED_USERS=@alice:matrix.example.org
MATRIX_ALLOWED_ROOMS=!abc123:matrix.example.org

# or password login
# MATRIX_USER_ID=@hermes:matrix.example.org
# MATRIX_PASSWORD=***
```

```bash
hermes gateway setup    # select Matrix
hermes gateway
```

## Options / Props

| Name | Default | Description |
|------|---------|-------------|
| `MATRIX_HOMESERVER` | required | Homeserver URL (with `https://`, no trailing slash) |
| `MATRIX_ACCESS_TOKEN` / `MATRIX_USER_ID` + `MATRIX_PASSWORD` | required (one form) | Authentication |
| `MATRIX_ALLOWED_USERS` / `matrix.allowed_users` | — | Allowed `@user:server` IDs |
| `MATRIX_ALLOWED_ROOMS` / `matrix.allowed_rooms` | — | Allowed room internal IDs (`!...`); DMs exempt |
| `MATRIX_REQUIRE_MENTION` | `true` | Require @mention in rooms |
| `MATRIX_FREE_RESPONSE_ROOMS` | — | Rooms exempt from mention requirement |
| `MATRIX_IGNORE_USER_PATTERNS` | — | Regexes for bridge ghost users (e.g. `^@telegram_`) |
| `MATRIX_PROCESS_NOTICES` | `false` | Process `m.notice` events |
| `MATRIX_SESSION_SCOPE` | `auto` | `auto` / `room` / `thread` |
| `MATRIX_AUTO_THREAD` | `true` | Auto-create thread per response in rooms |
| `MATRIX_DM_AUTO_THREAD` | `false` | Auto-thread DM messages |
| `MATRIX_DM_MENTION_THREADS` | `false` | Thread when @mentioned in a DM |
| `MATRIX_REACTIONS` | `true` | Lifecycle reactions 👀 / ✅ / ❌ |
| `MATRIX_ALLOW_ROOM_MENTIONS` | `false` | Permit `@room` notifications |
| `matrix.max_message_length` | `15000` | Outbound chunk size in UTF-8 bytes (also max) |
| `MATRIX_E2EE_MODE` | — | `off` / `optional` / `required` (`MATRIX_ENCRYPTION=true` still means required) |
| `MATRIX_RECOVERY_KEY` / `MATRIX_RECOVERY_KEY_OUTPUT_FILE` | — | Cross-signing self-sign on startup / write generated key once (mode 0600) |
| `MATRIX_MAX_MEDIA_BYTES` | `104857600` | Media size cap; only `mxc://` URIs accepted |
| `MATRIX_APPROVAL_REQUIRE_SENDER` | requester-bound | `false` lets any authorized user operate approval / model pickers |
| `MATRIX_HOME_ROOM` | — | Home room (`/sethome`) |
| `GATEWAY_PROXY_URL` / `GATEWAY_PROXY_KEY` / `gateway.proxy_url` | — | Proxy mode: forward to a remote Hermes API server |

## Notes

- Rooms with 2 or fewer joined members are classified as DMs and bypass `MATRIX_ALLOWED_ROOMS`, `MATRIX_REQUIRE_MENTION` and `MATRIX_FREE_RESPONSE_ROOMS`.
- If your client reserves `/`, use `!command` (e.g. `!model`, `!stop`); only known commands are normalized.
- Reaction controls: ✅ approve once, ♾️ approve always, ❌ deny, number reactions for `/model`. LaTeX `$...$` / `$$...$$` sent as `data-mx-maths`.
- E2EE needs `libolm` plus the `matrix` extra (Linux only); crypto store in `~/.hermes/platforms/matrix/store/`. Deleting `crypto.db` leaves stale one-time keys server-side: generate a new access token (fresh device ID), clear the store, set `MATRIX_RECOVERY_KEY`, then `/discardsession` in Element.
- On macOS/Windows run the adapter in a Linux container in proxy mode: host enables `API_SERVER_ENABLED=true`, `API_SERVER_KEY`, `API_SERVER_HOST=0.0.0.0` (port 8642); container sets `GATEWAY_PROXY_URL` + `GATEWAY_PROXY_KEY`. v1 limitations: tool progress and approval prompts are not relayed.
- A host clock ahead of real time causes all events to be dropped as "too old" (5-second startup-grace filter); sync with NTP.
- `/resume` will not resume a named session from another room unless `/resume --cross-room <session name>`.
- Outgoing voice is tagged `org.matrix.msc3245.voice`; an audio file attached via `MEDIA:` without `[[audio_as_voice]]` is sent as a plain `m.audio`.
- Set both user and room allowlists for private deployments; without them anyone reaching the bot in a joined room can trigger an agent turn.
- Source: https://hermes-agent.nousresearch.com/docs/user-guide/messaging/matrix (pinned to v0.22.2)

## Related

- [Messaging Gateway](./messaging.md)
- [Mattermost](./mattermost.md)
