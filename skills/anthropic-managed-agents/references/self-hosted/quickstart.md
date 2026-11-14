<!-- source: https://platform.claude.com/docs/en/managed-agents/self-hosted/quickstart / last verified: 2026-11-14 -->

# Get started with self-hosted Claude Managed Agents

Start self-hosted Claude Managed Agents on one machine with Docker Compose (server, PostgreSQL, and workers that run each session in its own sandbox container), then chat with an agent from your terminal.

## Signature / Usage

Extract the archive and work from its `compose` directory (replace `<archive>` with the archive name without `.tar.gz`):

```bash
tar -xzf <archive>.tar.gz && cd <archive>/compose
```

Create the `.env` file, then replace `sk-ant-...` with your Claude API key:

```bash
cat > .env <<EOF
CMA_PG_PASSWORD=$(openssl rand -hex 32)
ANTHROPIC_API_KEY=sk-ant-...
CMA_SERVER__API_KEY=$(openssl rand -hex 32)
CMA_STORE__CREDENTIALS_ENCRYPTION_KEY=$(openssl rand -base64 32)
EOF
chmod 600 .env
```

Start the stack and follow the server log (wait for `msg="cma-server listening"`):

```bash
docker compose up --build -d
docker compose logs -f cma-server
```

Check readiness (a ready server answers `"status":"ready"`):

```bash
curl -s http://127.0.0.1:8400/cma-server/readyz
```

Point the CLI at your server (in a second terminal; `ANTHROPIC_API_KEY` is the server API key, not the Claude API key):

```bash
export ANTHROPIC_BASE_URL=http://127.0.0.1:8400
export ANTHROPIC_API_KEY=$(grep '^CMA_SERVER__API_KEY=' .env | cut -d= -f2)
```

Create an agent from `quickstart-agent.md`:

```bash
ant apply --yes quickstart-agent.md
```

```markdown
---
name: Quickstart agent
model: claude-opus-5-5
tools:
  - type: agent_toolset_20260401
---

You are a helpful assistant.
```

Start a session (the stack names its environment `compose-sandbox`):

```bash
AGENT_ID=$(ant beta:agents list --format raw \
  --transform 'data.#(name=="Quickstart agent").id' --raw-output)
ENVIRONMENT_ID=$(ant beta:environments list --format raw \
  --transform 'data.#(name=="compose-sandbox").id' --raw-output)
SESSION_ID=$(ant beta:sessions create --agent "$AGENT_ID" \
  --environment-id "$ENVIRONMENT_ID" --transform id --raw-output)
```

Connect and send a message:

```bash
ant beta:sessions connect "$SESSION_ID"
```

```text wrap
Run `hostname` with the bash tool and tell me the output.
```

The agent replies with a hostname starting with `cma-sandbox-`. List the sandbox containers from the first terminal:

```bash
docker ps --filter label=cma-server.sandbox
```

Optional console with the mock sign-in provider (throwaway data only):

```bash
export COMPOSE_FILE=docker-compose.yml:docker-compose.oidc.yml
docker compose up --build -d
```

Stop the stack:

```bash
docker compose down --remove-orphans
```

## Options / Props

Prerequisites:

| Item | Detail |
|------|--------|
| Release archive | Request access to the download from your Anthropic account team |
| Claude API key | Used by the server for model calls |
| Docker | Latest Docker Engine with the Compose plugin (`docker compose`, not `docker-compose`) |
| Host | At least two CPUs (x86-64 or Arm); on a smaller host set `CMA_SANDBOX_CPUS` to its CPU count when you create `.env` |
| Network | First build pulls from Docker Hub, the Alpine package repositories, and GitHub releases |
| Tools | `openssl` and the `ant` CLI on the machine running Docker |

## Notes

- The Compose stack is for development, not production. It serves plain HTTP and by default publishes port 8400 only on `127.0.0.1`; under some Docker Engine releases before 28.3.3 machines on the host's local network can reach that port. For production Anthropic recommends the release's two Helm charts (Deploy on Kubernetes).
- `ant apply` first prints a warning that it `could not determine the organization and workspace` (a `404`); that is expected on your own server.
- Keep `docker compose` commands in the first terminal. If `ANTHROPIC_BASE_URL` is set in the terminal where you run `docker compose up`, Compose passes it to the server and the server calls itself instead of the Claude API.
- If your umask is stricter than `022`, binaries lose execute permission for other users and the server container can't start them; set it to `022` and extract again.
- The mock sign-in provider gives an administrator's token to anyone who reaches it (on Docker Desktop, including sandbox containers). Port 8080 must be free. Edit `compose.config.oidc.yaml`, not `compose.config.yaml`, then `docker compose restart cma-server`. In the browser open `http://127.0.0.1:8400/`, click **Continue with SSO**, select **alice**.
- `docker compose down --remove-orphans` keeps the database; add `-v` to also delete every agent, session, and history.
- The stack starts 10 workers, each running one session's container at a time. A session that never gets a message keeps its worker up to an hour; archive unused sessions with `ant beta:sessions archive --session-id <session-id>`.
- Troubleshooting: no `compose` directory means an earlier release; `docker compose logs migrate` for a server that never comes up (the `migrate` container must exit `0`); readiness `not_ready` with failed check `upstream` means the Claude API rejected the key, `database` means login or connection failure; a tool call that never finishes with `docker compose logs sandbox` naming `CMA_DOCKER_SOCKET` means set that variable in `.env` to your Docker daemon's socket path.
- For agents running these steps for a person: don't ask for or print the API key (the person edits `.env`); put `env -u ANTHROPIC_BASE_URL -u ANTHROPIC_API_KEY -u ANTHROPIC_AUTH_TOKEN` before each `docker compose` command; without an interactive terminal use `ant beta:sessions:events send` and `ant beta:sessions:events list` instead of `connect`.
- Distinct from `self_hosted` environments / self-hosted sandboxes (workers; `../environments/self-hosted-sandboxes*.md`): here you host the whole service; with self-hosted sandboxes Anthropic hosts the service and you host only the tool-execution worker. Access to self-hosted Claude Managed Agents is requested through your Anthropic account team.
- Source: https://platform.claude.com/docs/en/managed-agents/self-hosted/quickstart.md (fetched 2026-11-14).

## Related

- [Overview](./overview.md)
- [Console on your server](./console.md)
- [Data and access](./data-and-access.md)
- [Self-hosted sandboxes](../environments/self-hosted-sandboxes.md)
