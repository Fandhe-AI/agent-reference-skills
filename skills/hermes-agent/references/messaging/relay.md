# Hermes Relay

Hermes Relay is an experimental connector system: your gateway dials out over one authenticated WebSocket to a connector service that owns the platform bot tokens (Discord, Telegram, Slack, WhatsApp, ...), so the gateway holds no platform credentials and opens no inbound port.

## Signature / Usage

```bash
hermes gateway enroll \
  --token <enrollment-token> \
  --connector-url wss://connector.example.com/relay
```

`enroll` redeems the single-use token for per-gateway credentials and writes `GATEWAY_RELAY_ID`, `GATEWAY_RELAY_SECRET`, `GATEWAY_RELAY_DELIVERY_KEY` (plus `GATEWAY_RELAY_URL` / `GATEWAY_RELAY_WAKE_URL` when supplied) into `~/.hermes/.env`. Restart the gateway afterwards.

To keep a profile off the relay:

```yaml
platforms:
  relay:
    enabled: false
```

## Options / Props

| Flag | Description |
|------|-------------|
| `--token` | Single-use enrollment token (or `GATEWAY_RELAY_ENROLL_TOKEN`) |
| `--connector-url` | `wss://.../relay` or `https://...` (or `GATEWAY_RELAY_URL` / `gateway.relay_url`) |
| `--gateway-id` | Stable instance id; defaults to `gw-<hostname>` |
| `--wake-url` | Optional payload-free GET target to wake an idle gateway (`GATEWAY_RELAY_WAKE_URL`) |

| Setting | Where | Meaning |
|---------|-------|---------|
| `GATEWAY_RELAY_URL` / `gateway.relay_url` | env / `config.yaml` | Connector WebSocket URL; enables relay unless explicitly disabled |
| `GATEWAY_RELAY_ID` / `GATEWAY_RELAY_SECRET` / `GATEWAY_RELAY_DELIVERY_KEY` | env | Written by `enroll` |
| `GATEWAY_RELAY_WAKE_URL` / `gateway.relay_wake_url` | env / `config.yaml` | Wake-poke target |
| `GATEWAY_RELAY_PLATFORMS` | env | Platforms fronted over one connection (e.g. `discord,telegram`) |
| `GATEWAY_RELAY_BOT_IDS` | env | JSON map of per-platform bot identities |
| `gateway.idp.token_url` (+ `client_id` / `client_secret`) | `config.yaml` | Own IdP instead of Nous Portal (OAuth2 client credentials, or ambient token endpoint) |

## Notes

- Experimental: wire contract, auth scheme and configuration may change without a deprecation cycle. Formal contract: `docs/relay-connector-contract.md` in the repository.
- Capabilities are negotiated at handshake via `supported_ops`; unsupported operations silently degrade to text. Supports text/streaming, media (25 MB re-host cap, ~1 hour expiry), native interactive prompts, reaction acks, thread create/rename, typing, `get_chat_info`, buffered delivery with wake.
- `enroll` refuses to run in managed/hosted installs. Explicit `enabled: false` wins over any relay URL.
- 401 at enroll: re-login (`hermes auth add nous`); 403: token invalid / expired / used / other tenant. WebSocket close 4401 after a successful handshake means the secret was revoked and relay is disabled.
- Use native adapters (Telegram, Discord, ...) if you run your own bots directly.

## Related

- [Messaging Gateway](./messaging.md)
- [Telegram](./telegram.md)
- [Discord](./discord.md)
