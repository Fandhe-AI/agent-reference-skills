---
source: https://docs.cloud.google.com/alloydb/docs/auth-proxy/connect
---

# Connect using the AlloyDB Auth Proxy

One-time setup (download client, prepare an IAM principal, gather instance connection URIs), then start the Auth Proxy client and connect with `psql` or an application driver.

## Signature / Usage

### Download the client (v1.17.2 in the source)

Linux 64-bit (AMD):

```bash
wget https://storage.googleapis.com/alloydb-auth-proxy/v1.17.2/alloydb-auth-proxy.linux.amd64 -O alloydb-auth-proxy
```

```bash
chmod +x alloydb-auth-proxy
```

```bash
mkdir -p ~/.local/bin
mv alloydb-auth-proxy ~/.local/bin/
export PATH="$HOME/.local/bin:$PATH"
```

macOS (ARM64); then run the same `chmod` and PATH steps:

Adapted (not in the official docs): added `-f` and `-L` to the source's `curl -o` so an HTTP error is not saved as the binary.

```bash
curl -fL -o alloydb-auth-proxy https://storage.googleapis.com/alloydb-auth-proxy/v1.17.2/alloydb-auth-proxy.darwin.arm64
```

Docker image:

```bash
docker pull gcr.io/alloydb-connectors/alloydb-auth-proxy:latest
```

### Credentials

```bash
gcloud auth application-default login
```

A service account key (`GOOGLE_APPLICATION_CREDENTIALS` or `--credentials-file`) and an access token (`--token`) are the alternatives; see Options.

### List instance connection URIs

Connection URI format: `projects/PROJECT_ID/locations/REGION_ID/clusters/CLUSTER_ID/instances/INSTANCE_ID`

```bash
gcloud alloydb instances list \
    --region=REGION_ID \
    --cluster=CLUSTER_ID \
    --project=PROJECT_ID
```

Replace `REGION_ID` (instance region), `CLUSTER_ID` and `PROJECT_ID`.

### Start the client

Usage synopsis; see Startup examples below for runnable commands.

```text
alloydb-auth-proxy INSTANCE_URI... \
    [ --credentials-file PATH_TO_KEY_FILE \ ]
    [ --token OAUTH_ACCESS_TOKEN \ ]
    [ --port INITIAL_PORT_NUMBER \ ]
    [ --address LOCAL_LISTENER_ADDRESS \ ]
    [ --auto-iam-authn \ ]
    [ --psc \ ]
    [ --public-ip \ ]
    [ --disable-built-in-telemetry ]
```

Docker (the `127.0.0.1` prefix in `--publish` keeps the listener off external interfaces; `--address 0.0.0.0` is needed inside the container):

```bash
docker run \
  --publish 127.0.0.1:PORT:PORT \
  gcr.io/alloydb-connectors/alloydb-auth-proxy:latest \
  --address 0.0.0.0 \
  --port PORT \
  INSTANCE_URI
```

With a key file:

```bash
docker run \
  --volume PATH_TO_KEY_FILE:/key.json \
  --publish 127.0.0.1:PORT:PORT \
  gcr.io/alloydb-connectors/alloydb-auth-proxy:latest \
  --address 0.0.0.0 \
  --port PORT \
  --credentials-file=/key.json \
  INSTANCE_URI
```

### Startup examples

Basic (listens on `127.0.0.1:5432`):

```bash
alloydb-auth-proxy \
  "projects/myproject/locations/us-central1/clusters/mycluster/instances/myprimary"
```

Multiple instances (`myprimary` on `127.0.0.1:5432`, `myreadpool` on `127.0.0.1:5433`):

```bash
alloydb-auth-proxy \
  "projects/myproject/locations/us-central1/clusters/mycluster/instances/myprimary" \
  "projects/myproject/locations/us-central1/clusters/mycluster/instances/myreadpool"
```

Custom ports (per-URI `port` query parameter, or `--port` for sequential ports):

```bash
alloydb-auth-proxy \
  "projects/myproject/locations/us-central1/clusters/mycluster/instances/myprimary?port=5000" \
  "projects/myproject/locations/us-central1/clusters/mycluster/instances/myreadpool?port=5001"
```

```bash
alloydb-auth-proxy \
  "projects/myproject/locations/us-central1/clusters/mycluster/instances/myprimary" \
  "projects/myproject/locations/us-central1/clusters/mycluster/instances/myreadpool" \
  --port 5000
```

User-managed service account key:

```bash
alloydb-auth-proxy \
  "projects/myproject/locations/us-central1/clusters/mycluster/instances/myprimary" \
  --credentials-file "myappaccount/key.json"
```

### Connect

```bash
psql -h 127.0.0.1 -p 5432 -U DB_USER
```

Replace `DB_USER` with the database user (for example `postgres`). `psql` prompts for the password.

Node.js (Knex + pg):

```javascript
const Knex = require('knex');
const fs = require('fs');

// createTcpPool initializes a TCP connection pool for an AlloyDB cluster.
const createTcpPool = async config => {
  // Note: Saving credentials in environment variables is convenient, but not
  // secure - consider a more secure solution such as
  // Cloud Secret Manager (https://cloud.google.com/secret-manager) to help
  // keep secrets safe.
  const dbConfig = {
    client: 'pg',
    connection: {
      host: process.env.INSTANCE_HOST, // e.g. '127.0.0.1'
      port: process.env.DB_PORT, // e.g. '5432'
      user: process.env.DB_USER, // e.g. 'my-user'
      password: process.env.DB_PASS, // e.g. 'my-user-password'
      database: process.env.DB_NAME, // e.g. 'my-database'
    },
    // ... Specify additional properties here.
    ...config,
  };
  // Establish a connection to the database.
  return Knex(dbConfig);
};
```

## Options / Props

| Flag / setting | Description |
|----------------|-------------|
| `INSTANCE_URI...` | One or more connection URIs. Append `?port=PORT` (URI in quotes) to override that instance's local port. |
| `--credentials-file PATH_TO_KEY_FILE` | JSON key of a user-managed service account. |
| `--token OAUTH_ACCESS_TOKEN` | OAuth 2.0 access token for authorization. |
| `--port INITIAL_PORT_NUMBER` | Starting local port; default `5432`, incremented by one per additional instance. |
| `--address LOCAL_LISTENER_ADDRESS` | Listener address; default `127.0.0.1`. |
| `--auto-iam-authn` | Authenticate automatically; works only for the database user matching the IAM account running the proxy. |
| `--psc` | Connect to a Private Service Connect instance (needs endpoint and private DNS record). |
| `--public-ip` | Connect to the instance's public IP (Public IP must be enabled; no authorized network entry needed). |
| `--disable-built-in-telemetry` | Opt out of connection and network health metrics reported to the `alloydb.googleapis.com` metric prefix. |
| `--gcloud-auth` | Use `gcloud auth login` credentials; not recommended. |

Other platform binaries (v1.17.2): `alloydb-auth-proxy.linux.386`, `.linux.arm64`, `.linux.arm`, `.darwin.amd64`; Windows `alloydb-auth-proxy-x64.exe` and `alloydb-auth-proxy-x86.exe` under `https://storage.googleapis.com/alloydb-auth-proxy/v1.17.2/`.

Requirements:

| Requirement | Detail |
|-------------|--------|
| Network path | Private services access: VPC visibility (in-VPC host, or external network via Cloud VPN / Dedicated Interconnect / Partner Interconnect). PSC: endpoint + matching private DNS record + `--psc`. Public IP: enabled + `--public-ip`. |
| Outbound firewall | Port `5433` to instance IPs and port `443` to all IP addresses. |
| Compute Engine host | Needs access scope `https://www.googleapis.com/auth/cloud-platform`. |
| IAM roles | `roles/alloydb.client` and `roles/serviceusage.serviceUsageConsumer` (`roles/alloydb.admin` also provides the permissions). |
| Granting the roles | Cloud Resource Manager API enabled; caller has `roles/owner` or permissions `resourcemanager.projects.get`, `resourcemanager.projects.getIamPolicy`, `resourcemanager.projects.setIamPolicy` (least privilege: `roles/resourcemanager.projectIamAdmin`). |

## Notes

- Warning from the source: be careful when binding the client to an external interface; anyone with access to that interface or port is authorized to connect. Keep the default `127.0.0.1`. `--address 0.0.0.0` exposes the proxy on all interfaces; the Docker examples use it only inside the container, with `--publish 127.0.0.1:PORT:PORT` on the host.
- Use the latest client; releases are monthly (https://github.com/GoogleCloudPlatform/alloydb-auth-proxy/releases). Run it as a persistent service in production.
- Preferred IAM principal in production: an attached service account (no key). Your user account suits development. A user-managed service account fits hosts outside Google Cloud. Service account keys are a security risk; consider alternatives (https://docs.cloud.google.com/iam/docs/migrate-from-service-account-keys). Prefer ADC over `--gcloud-auth`.
- Adapted from the official docs: the macOS download was `curl -o alloydb-auth-proxy https://storage.googleapis.com/...darwin.arm64` (no `-f`, so an HTTP error page could be saved as the binary).
- Database passwords come from `DB_PASS` (Node.js sample); the source notes environment variables are not secure and suggests Secret Manager. Never put a real password in a command. `psql` without a password in the command prompts for it.
- The `gcr.io/alloydb-connectors/...` image path is the source's; Container Registry was shut down March 18, 2025 (https://docs.cloud.google.com/artifact-registry/docs/transition/transition-from-gcr), so check the Artifact Registry listing the source links if a pull fails.
- The proxy encrypts traffic, so drivers connect to the local listener without enabling TLS themselves.
- Language samples are identical to those for Cloud SQL for PostgreSQL via the Cloud SQL Auth Proxy. The source also shows Linux 32-bit / ARM, macOS AMD64, Windows, Python, Java, Go, C#, Ruby and PHP variants and a custom `--address "0.0.0.0"` startup example (omitted).
- AlloyDB is managed PostgreSQL on Google Cloud, distinct from Supabase Postgres (`supabase`), Cloudflare D1 / Hyperdrive (`cloudflare-storage`), and the Node.js client `mssql` / ORM `drizzle`. For Dockerfile / image build in general see `docker`; for ADC see `gcp-foundation`.
- Source: https://docs.cloud.google.com/alloydb/docs/auth-proxy/connect (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [auth-proxy-overview.md](./auth-proxy-overview.md)
- [connect-iam.md](./connect-iam.md)
- [about-private-service-connect.md](./about-private-service-connect.md)
- [language-connectors-overview.md](./language-connectors-overview.md)
