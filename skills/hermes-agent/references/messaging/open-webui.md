# Open WebUI

Use Open WebUI as a web frontend for Hermes Agent through the built-in OpenAI-compatible API server (`POST /v1/chat/completions`, SSE streaming; optional `/v1/responses`).

## Signature / Usage

```bash
hermes config set API_SERVER_ENABLED true
hermes config set API_SERVER_KEY your-secret-key
hermes gateway
curl -s -H "Authorization: Bearer your-secret-key" http://127.0.0.1:8642/v1/models
```

```bash
docker run -d -p 3000:8080 \
  -e OPENAI_API_BASE_URL=http://host.docker.internal:8642/v1 \
  -e OPENAI_API_KEY=your-secret-key \
  -e ENABLE_OLLAMA_API=false \
  --add-host=host.docker.internal:host-gateway \
  -v open-webui:/app/backend/data \
  --name open-webui --restart always \
  ghcr.io/open-webui/open-webui:main
```

## Options / Props

| Variable | Default | Description |
|----------|---------|-------------|
| `API_SERVER_ENABLED` | `false` | Enable the API server |
| `API_SERVER_PORT` | `8642` | HTTP port |
| `API_SERVER_HOST` | `127.0.0.1` | Bind address |
| `API_SERVER_KEY` | required | Bearer token; must match Open WebUI's `OPENAI_API_KEY` |
| `API_SERVER_MODEL_NAME` | profile name | Model name shown in the picker |
| Open WebUI `OPENAI_API_BASE_URL` | — | Hermes API URL, must include `/v1` |
| Open WebUI `OPENAI_API_KEY` | — | Must be non-empty and match `API_SERVER_KEY` |

## Notes

- The API server is a Hermes agent runtime, not an LLM proxy: each request creates a server-side `AIAgent`, and tool calls run on the API-server host (remote host means remote `pwd`, file and browser tools).
- Open WebUI talks server-to-server, so `API_SERVER_CORS_ORIGINS` is not needed.
- Open WebUI env vars apply only on first launch; later change connections in Admin Settings -> Connections (or reset the data volume).
- API Type: Chat Completions (default, recommended) or Responses (experimental, structured `function_call` / `function_call_output` SSE items; Open WebUI still sends full history client-side).
- Multi-user: one profile per user with its own `.env` (`API_SERVER_ENABLED=true`, `API_SERVER_PORT=8650+`, `API_SERVER_KEY`), ports outside 8644 (webhook), 8645 (wecom-callback), 8646 (msgraph-webhook); add one connection per profile.
- "No models": check the `/v1` suffix and Docker networking (`host.docker.internal`, `--network=host`, or `172.17.0.1` on Linux).
- Adapted: On Linux without Docker Desktop, `host-gateway` resolves to the bridge address, so the default loopback bind (`API_SERVER_HOST=127.0.0.1`) is not reachable from the container. Use the upstream Option 2 (`docker run --network=host -e OPENAI_API_BASE_URL=http://localhost:8642/v1 ...`), or bind `API_SERVER_HOST` to an address the container can reach and restrict access (firewall), keeping `API_SERVER_KEY` set (required for every deployment).
- Source: https://hermes-agent.nousresearch.com/docs/user-guide/messaging/open-webui (pinned to v0.22.2)

## Related

- [Messaging Gateway](./messaging.md)
