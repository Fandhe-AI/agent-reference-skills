# Photon iMessage

Connect Hermes to iMessage through Photon, a managed service handling Apple line allocation. It is a persistent-connection channel (gRPC stream via the `spectrum-ts` SDK in a supervised Node sidecar): no webhook, public URL or signing secret.

## Signature / Usage

```bash
hermes gateway setup                              # pick Photon iMessage
hermes photon setup --phone +15551234567          # device login + project + user + sidecar deps
hermes gateway start
hermes photon status
hermes pairing approve photon <CODE>
```

## Options / Props

| Variable | Default | Notes |
|----------|---------|-------|
| `PHOTON_PROJECT_ID` | from `.env` | Spectrum project id; set by setup |
| `PHOTON_PROJECT_SECRET` | from `.env` | Project secret; set by setup |
| `PHOTON_SIDECAR_PORT` | `8789` | Loopback sidecar port |
| `PHOTON_SIDECAR_AUTOSTART` | `true` | Whether the adapter spawns the sidecar |
| `PHOTON_SIDECAR_DIR` | — | Pin an explicit sidecar location |
| `PHOTON_HOME_CHANNEL` / `PHOTON_HOME_CHANNEL_NAME` | unset | Default space id for cron / notifications |
| `PHOTON_ALLOWED_USERS` | unset | Comma-separated E.164 allowlist (unknown senders then silently ignored) |
| `PHOTON_ALLOW_ALL_USERS` | `false` | Dev only |
| `PHOTON_REQUIRE_MENTION` | `false` | Require a wake word in groups (`gateway.platforms.photon.require_mention`) |
| `PHOTON_MENTION_PATTERNS` | Hermes wake words | JSON list / comma / newline regexes |
| `PHOTON_READ_RECEIPTS` | on | `false` keeps messages at `Delivered` |
| `PHOTON_DASHBOARD_HOST` / `PHOTON_SPECTRUM_HOST` | `app.photon.codes` / `spectrum.photon.codes` | Host overrides |

## Notes

- Free tier uses a shared iMessage line pool (5,000 messages per server per day, 50 new-conversation initiations per shared line per day); a shared line cannot message a number that has not texted it first.
- Requires a Photon account, Node.js 18.17+ (`hermes pm install node`) and a phone number that can receive iMessage. Credentials go to `~/.hermes/.env`; management metadata to `~/.hermes/auth.json`.
- Inbound attachments are metadata-only; outbound images, voice, video, documents, native polls and message effects are supported.
- Cron / `hermes send` reuse the gateway's sidecar via `<hermes-home>/runtime/photon-sidecar.json`, so the gateway must be running.
- Same mention-gating model as BlueBubbles; the iMessage alternative that needs your own Mac is the BlueBubbles page.

## Related

- [BlueBubbles (iMessage)](./bluebubbles.md)
- [Messaging Gateway](./messaging.md)
