---
source: https://docs.cloud.google.com/sql/docs/postgres/connect-auth-proxy
---

# Connect using the Cloud SQL Auth Proxy

How to download, start and use the Cloud SQL Auth Proxy (v2 binary `cloud-sql-proxy`, instance connection names as positional arguments) with a Cloud SQL for PostgreSQL instance over TCP, Unix sockets or Docker, and how to authenticate it. The proxy works with public and private IP, validates connections with user or service-account credentials and wraps them in TLS. Never put a database password on the command line; psql prompts for it.

## Signature / Usage

### Before you begin

Grant the principal the Cloud SQL Client role (`cloudsql.instances.connect`, optionally with an IAM condition limiting it to one instance), enable the Cloud SQL Admin API (needs `serviceusage.services.enable`, e.g. Service Usage Admin), and install the gcloud CLI.

### Download (Linux 64-bit)

Adapted (not in the official docs): added `-f` (fail on HTTP errors) and `-L` (follow redirects) to `curl` so an error page is never saved as the executable.

```bash
curl -fL -o cloud-sql-proxy https://storage.googleapis.com/cloud-sql-connectors/cloud-sql-proxy/v2.28.0/cloud-sql-proxy.linux.amd64
chmod +x cloud-sql-proxy
```

### Find the instance connection name

```bash
gcloud sql instances describe INSTANCE_NAME --format='value(connectionName)'
```

Format `PROJECT:REGION:INSTANCE`, for example `myproject:myregion:myinstance`.

### Start with TCP (listens on `127.0.0.1` by default)

```bash
./cloud-sql-proxy --port 5432 INSTANCE_CONNECTION_NAME
```

```bash
./cloud-sql-proxy \
--credentials-file PATH_TO_KEY_FILE INSTANCE_CONNECTION_NAME &
```

Adapted (not in the official docs): the source example binds `--address 0.0.0.0`; changed to the default loopback address so the listener is not exposed.

```bash
./cloud-sql-proxy --address 127.0.0.1 --port 1234 INSTANCE_CONNECTION_NAME
```

For an instance with both public and private IP, add `--private-ip` (the proxy defaults to the public IPv4 address).

### Start with a Unix socket (Linux and macOS only)

Adapted (not in the official docs): the source runs `sudo chmod 777 /cloudsql` (world-writable); changed to give ownership to the current user.

```bash
sudo mkdir /cloudsql; sudo chown "$(id -un)" /cloudsql
```

```bash
./cloud-sql-proxy --unix-socket /cloudsql INSTANCE_CONNECTION_NAME &
```

Adapted (not in the official docs): added the missing `\` line continuation to the service-account invocation.

```bash
./cloud-sql-proxy --unix-socket /cloudsql \
  --credentials-file PATH_TO_KEY_FILE INSTANCE_CONNECTION_NAME &
```

PostgreSQL requires the socket path suffix; some libraries add it, others need the full path `/cloudsql/INSTANCE_CONNECTION_NAME/.s.PGSQL.5432`.

### Start in Docker

TCP; always publish with the `127.0.0.1` prefix. `--address 0.0.0.0` is needed only so the port is reachable from outside the container.

```bash
docker run -d \
  -v PATH_TO_KEY_FILE:/path/to/service-account-key.json \
  -p 127.0.0.1:5432:5432 \
  gcr.io/cloud-sql-connectors/cloud-sql-proxy:2.28.0 \
  --address 0.0.0.0 --port 5432 \
  --credentials-file /path/to/service-account-key.json INSTANCE_CONNECTION_NAME
```

For a Unix socket in Docker, mount `-v /cloudsql:/cloudsql` and pass `--unix-socket /cloudsql`; the container runs as non-root UID 65532, so give it ownership of the host directory first (the source shows `sudo chown 65532:65532 /cloudsql`). On Compute Engine with the instance's credentials, drop `--credentials-file` and the `-v PATH_TO_KEY_FILE:...` line. On container-optimized images use a writable directory, e.g. `-v /mnt/stateful_partition/cloudsql:/cloudsql`.

### Connect with psql

```bash
psql "host=127.0.0.1 sslmode=disable dbname=DB_NAME user=USERNAME"
```

```bash
psql "sslmode=disable host=/cloudsql/INSTANCE_CONNECTION_NAME dbname=DB_NAME user=USERNAME"
```

### Multiple instances

```bash
      ./cloud-sql-proxy --unix-socket /cloudsql \
      myProject:us-central1:myInstance myProject:us-central1:myInstance2 &
      psql -U myUser -h /cloudsql/myProject:us-central1:myInstance2
  
```

Over TCP, give each instance a unique local port with the `?port=` query, e.g. `./cloud-sql-proxy "myProject:us-central1:myInstance?port=5432" "myProject:us-central1:myInstance2?port=1234"`, then connect with `psql -U myUser -h 127.0.0.1 --port 5432` (or `1234`) from another terminal.

### Enforce use of Cloud SQL connectors

```bash
    gcloud sql instances patch INSTANCE_NAME \
    --connector-enforcement REQUIRED
  
```

Use `--connector-enforcement NOT_REQUIRED` to disable. The update does not restart the instance. REST equivalent: PATCH `https://sqladmin.googleapis.com/v1/projects/PROJECT_ID/instances/INSTANCE_ID` with body `{"settings": {"connectorEnforcement": "REQUIRED"}}` (also on `/sql/v1beta4/`).

## Options / Props

### Authentication order (first match wins)

| # | Source | How |
|---|---|---|
| 1 | Credentials file | `--credentials-file PATH_TO_KEY_FILE` (absolute or relative path to service-account JSON) |
| 2 | Access token | `--token ACCESS_TOKEN` (OAuth 2.0 token; a token on the command line is visible in the process list, prefer the other options) |
| 3 | Environment variable | `GOOGLE_APPLICATION_CREDENTIALS` pointing at the JSON file |
| 4 | gcloud CLI user | `gcloud auth application-default login` (good for development) |
| 5 | Compute Engine instance service account | Needs the proxy roles; across projects, add the account to the instance's project |
| 6 | Environment default service account | Application Default Credentials logic; needs the same permissions |

### Selected startup flags

| Flag | Meaning |
|---|---|
| `--port PORT_NUMBER` | Local TCP port (must be free); one unique port per instance, or `INSTANCE?port=N` |
| `--address` | Listen address; default `127.0.0.1` |
| `--unix-socket DIR` | Directory for sockets (not on Windows; path limit about 91 to 108, 108 on Linux) |
| `--private-ip` | Use the private IP address |
| `--credentials-file`, `--token` | Authentication, see above |
| `--quiet` | Reduce log output |
| `--help` | Full list of options |

### Service account setup

Roles with `cloudsql.instances.connect`: Cloud SQL Client (`roles/cloudsql.client`), Cloud SQL Editor, Cloud SQL Admin; legacy roles need at least Editor. Separate permissions apply to each step: creating the service account needs `iam.serviceAccounts.create` (for example Service Account Admin), granting it a role on the project needs `resourcemanager.projects.setIamPolicy` (Project Owner, Project IAM Admin or Organization Administrator), and creating a JSON key needs `iam.serviceAccountKeys.create`. The source's note names only `resourcemanager.projects.setIamPolicy` "to create a service account with the required permissions", which covers the role grant. The JSON key is created under Manage keys and must be kept secure. On Compute Engine prefer the attached service account (set the VM scope to `cloud-platform`) with Cloud SQL Client, plus Cloud SQL Instance User (`roles/cloudsql.instanceUser`) for IAM database authentication.

### Troubleshooting

| Symptom | Cause / fix |
|---|---|
| `403 notAuthorized` | Service account lacks `cloudsql.instances.connect`; on App Engine check `cloud_sql_instances` spelling and the Cloud SQL Client role in the database's project |
| `Error 403: Access Not Configured` | Cloud SQL Admin API not enabled |
| `Error 403: Request had insufficient authentication scopes` / `ACCESS_TOKEN_SCOPE_INSUFFICIENT` | Run `gcloud auth application-default login` |
| `Error 429 ... rateLimitExceeded` | Admin API quota exceeded; fix the source or request a quota increase; redeploy to restart the proxy if the error appears on startup |
| Connection hangs | Outbound firewall must allow port 3307 to the instance (5432 is the direct-connection port) |

## Notes

- Binding the proxy to an external interface lets anyone with access to that interface and port connect to your instance; the connection from application to proxy is not encrypted, so only trusted users should reach the listener.
- Corrected from the official docs: `./cloud-sql-proxy --address 0.0.0.0 --port 1234 INSTANCE_CONNECTION_NAME` changed to `--address 127.0.0.1`.
- Corrected from the official docs: `sudo mkdir /cloudsql; sudo chmod 777 /cloudsql` changed to `sudo chown "$(id -un)" /cloudsql`; the Docker section mentions the source's `chown 65532:65532` alternative and omits its `chmod 777` variant.
- Corrected from the official docs: `curl -o cloud-sql-proxy ...` changed to `curl -fL -o cloud-sql-proxy ...`.
- Corrected from the official docs: the service-account Unix-socket invocation `./cloud-sql-proxy --unix-socket /cloudsql` / `--credentials-file PATH_TO_KEY_FILE INSTANCE_CONNECTION_NAME &` was missing its `\` continuation.
- Mac M1 download: the source uses the same `curl -o` command with `cloud-sql-proxy.darwin.arm64` instead of `cloud-sql-proxy.linux.amd64`; apply the same `-fL` fix.
- Not from the source (standard shell behaviour): running the proxy in the foreground blocks the shell; append `&` (as in the Unix-socket examples) or start it in its own terminal before running `psql`.
- `sslmode=disable` is used only for the local hop to the proxy, which encrypts traffic to the instance.
- Source inconsistency: the troubleshooting list says to separate multiple instances with "a comma as a delimiter, with no spaces", which is v1-era syntax (`-instances=`); every v2 example on the same page passes space-separated positional arguments. The v1 binary (`cloud_sql_proxy`) is not documented on this page, and the "1.12 or later for private IP" remark in the sibling page is v1-era.
- Connector enforcement rejects direct database connections; confirm clients use the proxy or a connector first. On Private Service Connect instances, enforcement and read replicas cannot coexist. Port 3307 egress and shared / customer-managed CA proxy versions (2.13.0 / 2.14.3) are in [sql-proxy.md](./sql-proxy.md).
- Private Service Connect instances need a DNS record matching the recommended DNS name. For a write endpoint, the proxy follows DNS changes after switchover or replica failover.
- For GKE the source recommends the sidecar pattern; Cloud Run and App Engine use an embedded proxy. The proxy has no built-in Windows service support (third-party managers such as NSSM can wrap it).
- Docker images come from the `gcr.io` domain, served from Artifact Registry per the source (Container Registry is shut down; the source's "Google Container Registry" wording is legacy). Default image is distroless (no shell); `alpine` and `buster` variants exist.
- Exposes the instance on a public IP only when the instance has one; prefer private IP, PSC or the Auth Proxy / connectors with IAM authentication when the source offers them.
- The source also shows Linux 32-bit, macOS 64-bit and Windows downloads, PowerShell, REST curl and PowerShell requests, a Node.js Knex TCP pool sample, Python / Java / Go / C# / Ruby / PHP samples and Unix-socket application samples, the Docker Unix-socket `docker run` block, separate `--credentials-file` / `gcloud auth application-default login` blocks (see the authentication table), and Console service-account steps; omitted.
- Managed PostgreSQL on Google Cloud, distinct from Supabase Postgres (`supabase`), Cloudflare D1 / Hyperdrive (`cloudflare-storage`), and the Node.js client `mssql` / ORM `drizzle` (those skills cover client code, not the managed service). ADC and service accounts are in `gcp-foundation`; gcloud setup in `gcp-cli`; Dockerfile basics in `docker`.
- Source: https://docs.cloud.google.com/sql/docs/postgres/connect-auth-proxy (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [sql-proxy.md](./sql-proxy.md)
- [connection-options.md](./connection-options.md)
