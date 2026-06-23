# Stripe CLI

Command-line tool for building, testing, and managing Stripe integrations in a sandbox environment. Supports API calls, webhook testing, event triggering, and log streaming.

## Signature / Usage

```bash
# Install (macOS)
brew install stripe

# Install (npm, cross-platform)
npm i -g @stripe/cli

# Authenticate
stripe login

# Forward webhook events to a local endpoint
stripe listen --forward-to localhost:4242/webhooks

# Trigger a test event
stripe trigger payment_intent.succeeded

# Stream API request logs
stripe logs tail
```

## Options / Props

### `stripe listen`

| Flag | Description |
|------|-------------|
| `--forward-to <url>` | Forward snapshot events to a local endpoint |
| `--forward-thin-to <url>` | Forward thin events to a local endpoint |
| `--events <list>` | Comma-separated list of event types to filter |
| `--thin-events <list>` | Thin event types to forward |
| `--skip-verify` | Disable HTTPS certificate verification (for local self-signed certs) |
| `--load-from-webhooks-api` | Load registered webhook endpoints and forward events to local endpoint |

### `stripe login`

| Flag | Description |
|------|-------------|
| `--interactive` | Authenticate without opening a browser |
| `--api-key <key>` | Authenticate inline with a secret API key |

### `stripe trigger`

| Argument | Description |
|----------|-------------|
| `<event>` | Event name to trigger (e.g., `payment_intent.succeeded`, `checkout.session.completed`) |

### Global API version flags

| Flag | Description |
|------|-------------|
| `--stripe-version <version>` | Use a specific API version |
| `--latest` | Use the latest API version |

## Notes

- Running `stripe listen` outputs a **webhook signing secret** to use for local signature verification.
- `stripe listen` forwards all sandbox events by default; use `--events` to filter.
- Shell in Stripe Workbench is built on the same commands as Stripe CLI but cannot forward events to a local endpoint.
- Windows antivirus scanners may flag the binary as a false positive; this is a known issue.
- Use `stripe <command> --help` to view options for any specific command.

## Related

- [testing.md](./testing.md)
