<!-- source: https://platform.claude.com/docs/en/managed-agents/self-hosted/upgrade / last verified: 2026-11-14 -->

# Upgrade self-hosted Claude Managed Agents

How to upgrade a self-hosted Claude Managed Agents deployment on Kubernetes or Docker Compose, back up and restore the database, and roll back if the new release does not work.

## Signature / Usage

Create an age key pair once (keep the private key away from backups; the dump holds every conversation in plain text):

```bash
age-keygen -o cma-backup.agekey
age-keygen -y cma-backup.agekey > cma-backup.agepub
```

### Kubernetes

Set the server Deployment name variable in each terminal:

```bash
server=$(kubectl -n cma-server get deployment -l anthropic.com/role=server -o jsonpath='{.items[*].metadata.name}')
echo "$server"
```

Stop every server (only if the upgrade needs it):

```bash
kubectl -n cma-server scale deployment/$server --replicas=0
kubectl -n cma-server wait --for=delete pod -l anthropic.com/role=server --timeout=90s
```

Back up the database:

```bash
set -o pipefail
PGSSLMODE=require pg_dump -h <database-host> -U <role> -d <database> -Fc \
  | age -r "$(cat cma-backup.agepub)" -o cma_server-<old-version>.dump.age
```

Upgrade the server, then the sandboxes (from the new archive's top directory):

```bash
helm upgrade cma-server kubernetes/server/chart --namespace cma-server -f cma-server-values.yaml --wait
helm upgrade cma kubernetes/chart --namespace cma -f cma-values.yaml --wait
```

### Docker Compose

Back up (from the old release's Compose directory):

```bash
set -o pipefail
docker compose exec -T postgres sh -c 'pg_dump -U "$POSTGRES_USER" -d "$POSTGRES_DB" -Fc' \
  | age -r "$(cat cma-backup.agepub)" -o cma_server-<old-version>.dump.age
```

Extract the new archive and carry over `.env` and `compose.config.yaml`:

```bash
releases="<directory>"
tar -xzf "$releases/<archive>.tar.gz" -C "$releases" && cp .env compose.config.yaml "$releases/<archive>/compose/"
```

Stop the old stack and start the new one:

```bash
ls "$releases/<archive>/compose/.env" && docker compose down
cd "$releases/<archive>/compose" && docker compose up --build -d
```

### Roll back: restore on Kubernetes

```sql
CREATE DATABASE <database>_restored OWNER <role>;
```

```bash
age -d -i cma-backup.agekey cma_server-<old-version>.dump.age \
  | PGSSLMODE=require pg_restore -h <database-host> -U <role> -d <database>_restored --no-owner --exit-on-error
```

```bash
kubectl -n cma-server scale deployment/$server --replicas=0
kubectl -n cma-server wait --for=delete pod -l anthropic.com/role=server --timeout=90s
```

```sql
ALTER DATABASE <database> RENAME TO <database>_upgraded;
ALTER DATABASE <database>_restored RENAME TO <database>;
```

Then deploy the old release (the two `helm upgrade` commands from the old archive), and when it works:

```sql
DROP DATABASE <database>_upgraded;
```

### Roll back: restore on Docker Compose

```bash
docker compose exec -T postgres sh -c 'psql -U "$POSTGRES_USER" -d postgres \
    -c "DROP DATABASE IF EXISTS ${POSTGRES_DB}_restored" -c "CREATE DATABASE ${POSTGRES_DB}_restored"' \
  && age -d -i cma-backup.agekey cma_server-<old-version>.dump.age \
  | docker compose exec -T postgres sh -c 'pg_restore -U "$POSTGRES_USER" -d "${POSTGRES_DB}_restored" --no-owner --exit-on-error'
```

```bash
docker compose exec -T postgres sh -c 'psql -U "$POSTGRES_USER" -d postgres \
    -c "ALTER DATABASE $POSTGRES_DB RENAME TO ${POSTGRES_DB}_upgraded" \
    -c "ALTER DATABASE ${POSTGRES_DB}_restored RENAME TO $POSTGRES_DB"'
```

```bash
docker compose exec -T postgres sh -c 'psql -U "$POSTGRES_USER" -d postgres -c "DROP DATABASE ${POSTGRES_DB}_upgraded"'
```

Preceded by `docker compose down` in the new release's directory and `docker compose up -d --wait postgres` in the old one; followed by `docker compose up --build -d` in the old one.

### List environment keys after a restore

```bash
echo "$ANTHROPIC_API_KEY" | ./cma-server-admin list-keys \
  -base-url http://127.0.0.1:8400 -env env_01595EKxaaTTGwwY3kyXdtbs \
  -key-file - -all
```

### Kubernetes object names (`earlierNames`)

```yaml
egress:
  gateway:
    serverService: cma-onprem
    serverEgressService: cma-onprem-egress
```

## Options / Props

### Upgrade kinds

| Upgrade | Back up first | Downtime on Kubernetes |
|---------|---------------|------------------------|
| Patch: only the third number changes | No (same schema) | None |
| Minor: second number up by one, such as `1.2.0` to `1.3.0` | Yes (schema changes) | None, unless a `CHANGELOG.md` section says the servers must stop |
| Skips a minor release (`1.1.0` to `1.3.0`) or changes the first number | Yes (schema changes) | From stopping the old servers until the new ones are ready |

A Docker Compose stack is down while it restarts, for every kind of upgrade.

### If the upgrade fails

| Log shows | Meaning | Action |
|-----------|---------|--------|
| `refusing to migrate: servers of another release are still running against this database` | Upgrade needs every server stopped first; migration changed nothing | Stop every server and run `helm upgrade` again; if a server did not shut down cleanly wait 20 seconds first |
| `cannot downgrade` (deploying the old release again) | Old release cannot run on the changed schema | Restore the backup |
| Another migration error | No rollback needed; on Kubernetes the servers stay as they were until the migration succeeds | Fix the cause and rerun `helm upgrade` or `docker compose up --build -d` |

### `earlierNames` and object names

| Deployment name | Line in `cma-server-values.yaml` |
|-----------------|----------------------------------|
| `cma-onprem` | `earlierNames: true` |
| `cma-server` | `earlierNames: false` |

| Object | Name on these pages | Name with `earlierNames: true` |
|--------|---------------------|--------------------------------|
| The server's Deployment and Service | `cma-server` | `cma-onprem` |
| The migration Job | `cma-server-migrate` | `cma-onprem-migrate` |
| The Job of each environment | `cma-server-environment-<name>` | `cma-onprem-environment-<name>` |
| The Secret with the database password | `cma-server-db` | `cma-onprem-db` |
| The Secret with the inference provider's credential | `cma-server-upstream` | `cma-onprem-upstream` |
| The Secret with the server API key and the encryption key | `cma-server-keys` | `cma-onprem-server` |

## Notes

- This is the self-hosted Claude Managed Agents server (you host the whole service). It is not a `self_hosted` environment / self-hosted sandbox (see `../environments/self-hosted-sandboxes.md` and the `../environments/self-hosted-sandboxes*.md` pages): there Anthropic hosts the service and you host only the tool-execution worker.
- Access to self-hosted Claude Managed Agents requires contacting your Anthropic account team.
- Before upgrading, read the new release's section of `CHANGELOG.md` at the top of the extracted archive; if you skip releases, follow every newer section, oldest first. Minor or major upgrades include an encrypted database backup (use `pg_dump` of the same PostgreSQL major version; if either command prints an error the file left behind is not a backup).
- Kubernetes steps: build and push the three new images under the new version (plus the egress gateway image if used, and rebuild any custom sandbox image, comparing with `kubernetes/sandbox/Dockerfile`); set `image.tag` in values files if used; stop every server only if a server is more than one minor release behind, the major version goes up, or a newer `CHANGELOG.md` section requires it (plan a maintenance window); back up; then upgrade the server chart and each sandbox release (for several environments run the second command per release). Helm starts each new server before stopping an old one; an open event stream on a replaced server ends cleanly, so clients following a stream must reconnect.
- Docker Compose: run from a release's `compose` directory with `ANTHROPIC_BASE_URL`, `ANTHROPIC_API_KEY`, and `ANTHROPIC_AUTH_TOKEN` unset in the shell (Compose passes them to the server). Only `.env` and `compose.config.yaml` carry over; repeat other changes (added files, edits to shipped files, copy `agent-identity` with `cp -a`, own Compose files). `docker compose down` keeps the database; never add `-v`. The `migrate` container updates the schema before the server starts. Run `umask 022` first if your umask is stricter.
- Diagnosis: Kubernetes migration failure: `helm upgrade` waits a few minutes while the Job retries; read `kubectl -n cma-server logs job/$server-migrate` in a second terminal (the log is deleted when the Job stops retrying). Compose: `docker compose logs`. If migration succeeds but servers do not become ready: `kubectl -n cma-server logs -l anthropic.com/role=server --prefix --tail=20` or `docker compose logs cma-server`; a line containing `has invalid keys` names a setting under `server.config` the new release rejects. Fix and rerun before considering a restore.
- Rollback: after a patch upgrade just deploy the old release again. After a minor or major upgrade read `CHANGELOG.md` for every release after the one you return to: if a section says the old release cannot start on the migrated database, restore the backup; otherwise redeploy the old release and restore only if it fails with `cannot downgrade`. A restore loses everything clients wrote after the backup began. On Compose, `stored value is encrypted but no encryption key is configured` means the old release's `.env` lacks `CMA_STORE__CREDENTIALS_ENCRYPTION_KEY`; copy that line from the new release's `.env`.
- Kubernetes restore, key check failure: if the first `helm upgrade` fails while the old servers are ready, the sandboxes' key from the `cma-environment` Secret in namespace `cma` is newer than the backup. Confirm with `kubectl -n cma-server logs job/$server-environment-default` (use your environment's name) and look for `Secret cma/cma-environment records key`; then run `kubectl -n cma delete secret cma-environment`, rerun the first command, then the second.
- After a restore, environment keys return to backup time: a key revoked after the backup works again (revoke it again); a key created after the backup is gone (create a new key for the workers that used it, see the Kubernetes page's "Replace an environment key for your own workers"). Sandboxes started by the Compose stack need no action. For `list-keys`, use the terminal from the call-the-api page; on Kubernetes first run `kubectl -n cma-server port-forward svc/$server 8400:8400`; run once per environment from the archive's top directory.
- Test a backup by running only the "Restore the backup into a new database" step, then drop the new database (on Compose, the database name plus `_restored`).
- Settings and paths to check before upgrading: (1) if the settings file has no `web_tools` section or sets no keys, `web_search` and `web_fetch` are off after upgrade (an agent whose toolset turns either on cannot start a session); (2) on Kubernetes each sandbox values file must set `egress.mode` (add `mode: publicInternet` under `egress` to keep public internet access; without it the chart default `closed` makes `helm upgrade` fail with `egress.mode is closed and egress.closed.hosts is empty`); (3) `sandbox.idleTimeout`: unset, a session's pod goes away about 5 minutes after the turn ends (files in `/workspace` stay by default); add `idleTimeout: 30m` under `sandbox` for 30 minutes; (4) delete `inference.attribution` and `CMA_INFERENCE__ATTRIBUTION` if present, because the new release's server does not start if either is set; (5) with the Claude API as inference provider, each model call carries the IDs of its session, agent, and environment.
- `earlierNames` must be in `cma-server-values.yaml` (find the Deployment name with `kubectl -n cma-server get deployment -l anthropic.com/role=server`); keep it for every later upgrade, otherwise the server chart's `helm upgrade` errors naming `earlierNames` and changes nothing. The namespace is always `cma-server` and the image `cma-server-image`. Sandbox values files with `egress.mode: gateway` must name the server's two Services under `egress.gateway`.
- Docker Compose layout: if the old release has no `compose` directory, its `docker-compose.yml` was at the archive top beside `bin`; in your own Compose files change paths such as `./bin` to `../bin` and rename the `cma-onprem` service to `cma-server`. Change paths under `/etc/cma-onprem/` or `/run/cma-onprem/` to `/etc/cma-server/` or `/run/cma-server/` (in `volumes:` lines only the part after the first colon).
- Source: https://platform.claude.com/docs/en/managed-agents/self-hosted/upgrade.md (fetched 2026-11-14)

## Related

- [Kubernetes](./kubernetes.md)
- [Call the API](./call-the-api.md)
- [Configuration reference](./configuration-reference.md)
- [Differences](./differences.md)
- [Agent identity and credentials](./agent-identity.md)
- [Data and access](./data-and-access.md)
- [Self-hosted sandboxes](../environments/self-hosted-sandboxes.md)
