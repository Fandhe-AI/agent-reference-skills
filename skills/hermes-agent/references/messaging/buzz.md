# Buzz

The Buzz adapter connects Hermes to a Buzz community (Block's open-source human+agent collaboration platform on Nostr). Outbound traffic shells out to the `buzz` CLI; inbound uses a NIP-42-authenticated Nostr WebSocket subscription with CLI polling as fallback. No extra Python packages.

## Signature / Usage

```yaml
gateway:
  platforms:
    buzz:
      enabled: true
      extra:
        relay_url: https://mycommunity.communities.buzz.xyz
        channels:
          - ccc2bc1a-7a82-5a8f-8c4e-57a070cbe7cd
        home_channel: ccc2bc1a-7a82-5a8f-8c4e-57a070cbe7cd
        poll_interval: 4
        allowed_users: []
```

```bash
# ~/.hermes/.env
BUZZ_PRIVATE_KEY=nsec1...
hermes gateway start
```

## Options / Props

| Variable | Required | Description |
|----------|:--------:|-------------|
| `BUZZ_RELAY_URL` | yes | Community relay base URL |
| `BUZZ_PRIVATE_KEY` | yes | Nostr private key (nsec or hex); the only secret |
| `BUZZ_CHANNELS` | no | Channel UUIDs to watch (default all joined) |
| `BUZZ_HOME_CHANNEL` | no | Channel UUID for cron / notifications (defaults to first watched) |
| `BUZZ_ALLOWED_USERS` | no | npubs or hex pubkeys allowed |
| `BUZZ_ALLOW_ALL_USERS` | no | Allow any community member |
| `BUZZ_POLL_INTERVAL` | no | Seconds between poll sweeps (default 4) |
| `BUZZ_CLI_PATH` | no | `buzz` binary path (default PATH, then `~/bin/buzz`) |
| `BUZZ_CREDENTIALS_FILE` | no | JSON file holding the nsec when `BUZZ_PRIVATE_KEY` is unset |
| `BUZZ_TRANSPORT` / `transport` | no | `auto` (default), `websocket`, `poll` |
| `BUZZ_AUTH_TAG` | no | Four-string NIP-OA auth tag JSON |
| `BUZZ_REPLY_IN_THREAD` / `extra.reply_in_thread` / `reply_to_mode: off` | no | `false` posts flat replies |
| `extra.attachment_hosts` | list | Extra exact HTTPS `host[:port]` origins for inbound files |
| `extra.require_mention` | bool | In channels respond only when addressed (DMs always dispatch) |
| `extra.allow_all_users` | bool | Community mode vs private mode |

## Notes

- Prerequisite: the `buzz` CLI (build with `cargo build --release -p buzz-cli`) and a Nostr identity that is already a community member.
- Recommended: `display.platforms.buzz.interim_assistant_messages: false` and `tool_progress: off` so only final answers reach the channel.
- Replies are threaded (NIP-10 aware: reply to the thread root); inbound attachments (NIP-94 `imeta`) are downloaded only after authorization, must be HTTPS with declared size and SHA-256, and redirects / URL credentials are rejected.
- WebSocket watchdog reconnects after five quiet minutes; gateway health reports `retrying` meanwhile. Channel history is not replayed on reconnect; the private key never appears in argv or logs.
- `BUZZ_*` env vars are passed to terminal subprocesses only for Buzz sessions or Buzz Desktop managed agents.

## Related

- [Messaging Gateway](./messaging.md)
