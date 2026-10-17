# Dev Server

Local development environment (`inngest dev`) that replicates the production execution model, flow control, and observability at `http://localhost:8288`.

## Signature / Usage

```bash
# Start dev server, pointing at your local app
npx --ignore-scripts=false inngest-cli@latest dev -u http://localhost:3000/api/inngest

# Or via curl installer
curl -sSfL https://cli.inngest.com/install.sh | sh
inngest dev -u http://localhost:3000/api/inngest

# Or via Homebrew
brew install inngest/tap/inngest
inngest dev -u http://localhost:3000/api/inngest

# If Homebrew blocks the tap as untrusted, then retry the install
brew trust --cask inngest/tap/inngest

# Or via Docker
docker run -p 8288:8288 -p 8289:8289 inngest/inngest \
  inngest dev -u http://host.docker.internal:3000/api/inngest
```

```bash
# In your app, tell the SDK to use the local dev server
INNGEST_DEV=1
```

## Options / Props

| Flag | Short | Type | Default | Description |
|------|-------|------|---------|-------------|
| `--config` | — | string | — | Path to `inngest.json` configuration file |
| `--host` | — | string | `http://localhost` | Dev server host |
| `--port` | `-p` | int | `8288` | Dev server port |
| `--sdk-url` | `-u` | strings | `http://localhost:3000/api/inngest` | App serve URLs to connect to |
| `--no-discovery` | — | boolean | `false` | Disable automatic port scanning |
| `--no-poll` | — | boolean | `false` | Disable polling for function updates |
| `--help` | `-h` | — | — | Output the help information |

## Notes

- Set `INNGEST_DEV=1` in your app's environment to route SDK calls to the local dev server instead of Inngest Cloud
- Auto-discovery scans common ports (3000–3010, 5000, 5173, 8000, 8080, 8787) and paths like `/api/inngest` and `/.netlify/functions/inngest`
- Use `--no-discovery` plus explicit `-u` flags or an `inngest.json` config file for deterministic multi-app setups
- Any dummy value works for `INNGEST_EVENT_KEY` during local development — signature verification is disabled
- Cron functions are supported locally and can be manually triggered via the "Invoke" button in the dashboard UI
- The Dev Server is not intended for production use
- Local Connect worker: if your app uses `connect()` instead of an HTTP `serve()` endpoint, start the Dev Server and run the worker process with `INNGEST_DEV=1`. The worker connects and syncs its functions automatically; do not pass an HTTP `-u` URL for it. Local Connect requires no signing or event key. Keep the worker running while you test.
- If events go to Inngest Cloud: set `INNGEST_DEV=1` on the app process and restart it (the TypeScript SDK defaults to cloud mode when no mode is set). If the Dev Server uses a different host or port, set `INNGEST_BASE_URL` in the app to its full URL, such as `http://localhost:8290`. In a container, `INNGEST_DEV` can be the Dev Server URL (e.g. `http://127.0.0.1:8288`).
- If functions do not appear: check the app is running and `-u` uses the app's actual port and path (the app's `serve()` URL, not `http://localhost:8288`); a GET to the `serve()` URL returns a diagnostic response including `functionsFound`.
- The Dev Server also exposes a local MCP endpoint at `http://127.0.0.1:8288/mcp`.
- Docker Compose tip: set `INNGEST_BASE_URL=http://inngest:8288` in the app service and reference the inngest service by name

### inngest.json example

```json
{
  "sdk-url": [
    "http://localhost:3000/api/inngest",
    "http://localhost:3030/api/inngest"
  ],
  "no-discovery": true
}
```

## Related

- [Environment Variables](./environment-variables.md)
- [Self-Hosting](./self-hosting.md)
