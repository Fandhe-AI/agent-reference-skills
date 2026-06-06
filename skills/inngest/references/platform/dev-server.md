# Dev Server

Local development environment (`inngest dev`) that replicates the production execution model, flow control, and observability at `http://localhost:8288`.

## Signature / Usage

```bash
# Start dev server, pointing at your local app
npx --ignore-scripts=false inngest-cli@latest dev -u http://localhost:3000/api/inngest

# Or via curl installer
curl -sSfL https://cli.inngest.com/install.sh | sh
inngest dev -u http://localhost:3000/api/inngest

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

## Notes

- Set `INNGEST_DEV=1` in your app's environment to route SDK calls to the local dev server instead of Inngest Cloud
- Auto-discovery scans common ports (3000–3010, 5000, 5173, 8000, 8080, 8787) and paths like `/api/inngest` and `/.netlify/functions/inngest`
- Use `--no-discovery` plus explicit `-u` flags or an `inngest.json` config file for deterministic multi-app setups
- Any dummy value works for `INNGEST_EVENT_KEY` during local development — signature verification is disabled
- Cron functions are supported locally and can be manually triggered via the "Invoke" button in the dashboard UI
- The Dev Server is not intended for production use
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
