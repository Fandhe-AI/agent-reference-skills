---
source: https://docs.cloud.google.com/sql/docs/postgres/use-secret-manager
---

# Use Secret Manager with Cloud SQL

Store sensitive Cloud SQL information (usernames and passwords, the instance connection name, TLS certificates and keys) as secrets in Secret Manager instead of in code or plain environment configuration. Secrets can be versioned and shared across a team.

## Signature / Usage

### Four use cases

- Usernames and passwords: create the Cloud SQL user (a username and password are required), then store them in a Secret Manager secret so they aren't lost.
- Cloud SQL instances: after connecting from your local computer, keep sensitive environment-variable values (such as the instance connection name) as secrets. The application reads them at startup and configures its connection; if a secret is updated, you may have to restart the application.
- SSL/TLS certificates: for public or private IP connections, save the TLS certificate, public key certificate and private key as secrets.
- Disaster recovery: after promoting a read replica, update the secret holding the instance connection name so connectors point at the new primary.

### Restart the Auth Proxy when the instance-name secret changes

The source's bash wrapper polls the secret and restarts the proxy when the instance connection name changes.

Adapted (not in the official docs): the v1 `cloud_sql_proxy -instances=...` calls are replaced by the v2 `cloud-sql-proxy --port "$PORT" "$INSTANCE"` form, the restart is skipped when the secret read returns an empty value, and the proxy is started again when it has exited (for example after a failed start).

```bash
#!/bin/bash

SECRET_ID="my-secret-id" # TODO(developer): replace this value
REFRESH_INTERVAL=5
PORT=5432                # TODO(developer): change this port as needed

# Get the latest version of the secret and start the proxy
INSTANCE=$(gcloud secrets versions access "latest" --secret="$SECRET_ID")
cloud-sql-proxy --port "$PORT" "$INSTANCE" &
PID=$!

# Every 5s, get the latest version of the secret. If it's changed, restart the
# proxy with the new value.
while true; do
    sleep $REFRESH_INTERVAL
    NEW=$(gcloud secrets versions access "latest" --secret="$SECRET_ID")
    if [ -n "$NEW" ] && [ "$INSTANCE" != "$NEW" ]; then
        INSTANCE=$NEW
        kill $PID
        wait $PID
        cloud-sql-proxy --port "$PORT" "$INSTANCE" &
        PID=$!
    elif ! kill -0 "$PID" 2>/dev/null; then
        cloud-sql-proxy --port "$PORT" "$INSTANCE" &
        PID=$!
    fi
done
```

## Options / Props

| Variable | Value in the example | Description |
|----------|----------------------|-------------|
| `SECRET_ID` | `my-secret-id` | Secret holding the primary instance's connection name (replace) |
| `REFRESH_INTERVAL` | `5` | Seconds between secret checks |
| `PORT` | `5432` | Local TCP port the proxy listens on (change as needed) |

## Notes

- Adapted from the official docs: v1 `cloud_sql_proxy -instances="$INSTANCE"=tcp:"$PORT" &` replaced by v2 `cloud-sql-proxy --port "$PORT" "$INSTANCE" &` (form from https://docs.cloud.google.com/sql/docs/postgres/connect-auth-proxy), and `if [ "$INSTANCE" != "$NEW" ]; then` guarded with `[ -n "$NEW" ]` so a failed `gcloud secrets versions access` (expired token, network error) does not kill the running proxy and restart it with an empty instance name; an `elif ! kill -0 "$PID"` branch restarts the proxy if it has exited, because the source loop only restarts on a secret change and would otherwise leave the proxy stopped after a transient start failure.
- The source script used Cloud SQL Auth Proxy v1 (`cloud_sql_proxy`, `-instances=`) without labelling it; the IAM login page says v1 is legacy and should be migrated to v2 (`cloud-sql-proxy`, instance connection name as a positional argument). Keep the proxy listener on the default `127.0.0.1`.
- Never put a database password in a command line, URL or connection string; read it from Secret Manager at runtime. The only value this script reads from Secret Manager is the instance connection name.
- Secret Manager integrates with other products such as Cloud Run (see the Secret Manager docs on using secrets in container environments).
- Promoting a read replica is a failover-type operation; try it on a disposable instance first.
- Cloud SQL is managed PostgreSQL on Google Cloud, distinct from Supabase Postgres (`supabase`). Secret Manager and IAM fundamentals: `gcp-foundation`.
- Source: https://docs.cloud.google.com/sql/docs/postgres/use-secret-manager (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/sql/docs/postgres/connect-auth-proxy (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [connect-connectors.md](./connect-connectors.md)
- [iam-logins.md](./iam-logins.md)
