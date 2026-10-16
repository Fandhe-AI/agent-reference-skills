# Stripe CLI

Command-line tool for building, testing, and managing Stripe integrations in a sandbox environment. Supports API calls, webhook testing, event triggering, and log streaming.

## Signature / Usage

```bash
# Install (macOS)
brew install stripe

# Install (npm, cross-platform; Node.js >= 18)
npm install -g @stripe/cli
# docs page form: npm i -g @stripe/cli@latest

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

### Other commands

| Command | Description |
|---------|-------------|
| `stripe agent setup` | Detect AI coding clients (Claude Code, Codex, Cursor) and install the Stripe plugin, skills and MCP server. Flags: `--client`, `--force`, `--json`, `--skills`, `--skills-scope local\|global`, `--status`, `-y` |
| `stripe docs <path>` | Read a docs.stripe.com page (for example `/payments`). Flags: `--no-pager`, `--non-interactive` |
| `stripe docs api <resource\|METHOD path\|event>` | Look up API reference by resource, HTTP method and path, or event type |
| `stripe docs search <query>` | Search docs.stripe.com by keyword or phrase |
| `stripe sandbox create` / `stripe sandbox claim` | Provision a temporary sandbox with test keys (`--email` or `--from-git`); claim it within 7 days |

## Notes

- Script installs auto-update within the same major version; disable with `STRIPE_NO_AUTO_UPDATE=1` or `auto_update = false` in `~/.config/stripe/config.toml`.
- Running `stripe listen` outputs a **webhook signing secret** to use for local signature verification.
- `stripe listen` forwards all sandbox events by default; use `--events` to filter.
- Shell in Stripe Workbench is built on the same commands as Stripe CLI but cannot forward events to a local endpoint.
- Windows antivirus scanners may flag the binary as a false positive; this is a known issue.
- Use `stripe <command> --help` to view options for any specific command.

## Related

- [testing.md](./testing.md)
