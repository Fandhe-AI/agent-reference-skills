---
source: https://docs.cloud.google.com/memorystore/docs/valkey/manage-basic-auth
---

# Secure access by using basic token-based authentication

Basic token-based authentication is a lightweight alternative to IAM authentication. Modes: simple (`default` user with a token) and multi-user (named users, each with up to two tokens). It eases migration from Memorystore for Redis or on-premises apps.

## Signature / Usage

### Client commands

```text
AUTH TOKEN
```

```text
AUTH USERNAME TOKEN
```

### Create or enable (gcloud)

```bash
gcloud memorystore instances create INSTANCE_ID \
--location=REGION \
--authorization-mode=token-auth
```

```bash
gcloud memorystore instances update INSTANCE_ID \
--location=REGION \
--authorization-mode=token-auth
```

### Users

```bash
gcloud memorystore instances create-token-auth-user INSTANCE_ID \
--location=REGION \
--token-auth-user=USERNAME
```

```bash
gcloud memorystore instances token-auth-users list \
--instance=INSTANCE_ID \
--location=REGION
```

```bash
gcloud memorystore instances token-auth-users describe USERNAME \
--instance=INSTANCE_ID \
--location=REGION
```

```bash
gcloud memorystore instances token-auth-users delete USERNAME \
--instance=INSTANCE_ID \
--location=REGION
```

### Tokens

```bash
gcloud memorystore instances token-auth-users create-auth-token USERNAME \
--instance=INSTANCE_ID \
--location=REGION
```

```bash
gcloud memorystore instances token-auth-users auth-tokens list \
--token-auth-user=USERNAME \
--instance=INSTANCE_ID \
--location=REGION
```

```bash
gcloud memorystore instances token-auth-users auth-tokens describe AUTH_TOKEN \
--instance=INSTANCE_ID \
--location=REGION \
--token-auth-user=USERNAME
```

```bash
gcloud memorystore instances token-auth-users auth-tokens delete AUTH_TOKEN \
--instance=INSTANCE_ID \
--location=REGION \
--token-auth-user=USERNAME
```

### Connect

Adapted (not in the official docs): the source passes the token on the command line (`valkey-cli -u redis://USERNAME:TOKEN@IP_ADDRESS:PORT`, split over two lines, or `--user USERNAME -a TOKEN`). These connect without credentials and then authenticate with the `AUTH USERNAME TOKEN` command from the "Client commands" section above, so the token is not in shell history or the process list. `-c` (follow cluster redirections) is added for Cluster Mode Enabled instances, as on the connect-instance page; omit it for Cluster Mode Disabled instances.

```bash
valkey-cli -h IP_ADDRESS -p PORT -c
```

With in-transit encryption enabled, append the TLS flags:

Adapted (not in the official docs): same changes as above (no token on the command line, `-c` for Cluster Mode Enabled), keeping the source's TLS flags.

```bash
valkey-cli -h IP_ADDRESS -p PORT -c --tls --cacert /tmp/server_ca.pem
```

Then, at the `valkey-cli` prompt, run `AUTH USERNAME TOKEN` (the `default` user uses `AUTH TOKEN`), as in "Client commands" above.

After deleting a user, existing connections are not ended; run on all nodes:

```text
CLIENT KILL USER USERNAME
```

### Rotate a token with zero downtime

1. Create an additional token for the user (both are valid).
2. Update applications to use the new token.
3. Delete the old token.

## Options / Props

| Item | Detail |
|------|--------|
| Required role | `roles/memorystore.admin` to configure or view tokens |
| Minimum gcloud version | `489.0.0` for Memorystore for Valkey commands |
| Local users | up to 1,000 per instance |
| Tokens per user | up to two; the only token cannot be deleted |
| `default` user | created automatically with a token; cannot be deleted |
| Auth mode | once enabled, cannot be deactivated or changed |
| Required APIs | Memorystore for Valkey, Network Connectivity, Service Consumer Management |
| TLS URI scheme | `rediss://` when in-transit encryption is enabled |

## Notes

- Enabling token auth may cause downtime for apps creating new connections; existing connections are unaffected until clients are updated.
- Deleting a user or token revokes access; `token-auth-users delete` and `token-auth-users auth-tokens delete` are destructive, so try them on a disposable instance first.
- Corrected from the official docs: the connect examples `valkey-cli -u` / `redis://USERNAME:TOKEN@IP_ADDRESS:PORT` (the URI on a separate line, so the shell runs it as a second command), `rediss://USERNAME:TOKEN@IP_ADDRESS:PORT --tls --cacert /tmp/server_ca.pem` and `valkey-cli --user USERNAME -a TOKEN -h IP_ADDRESS -p PORT` (with and without `--tls --cacert /tmp/server_ca.pem`) put the token on the command line, which exposes it in shell history and the process list. Never print tokens. Combine with in-transit encryption so tokens are not sent in plain text; with TLS the source uses the `rediss://` scheme. The source's connect examples also omit `-c`; without it, a Cluster Mode Enabled instance returns `MOVED` for keys on other shards, so the examples add `-c` (as `memorystore-valkey-overview/connect-instance.md` does).
- Store tokens in Secret Manager and rotate them; do not hardcode them. Failed attempts with invalid tokens are recorded in Data Access audit logs, and Admin Activity logs cover user and token operations.
- The source also shows Console steps.
- Managed Valkey on Google Cloud; distinct from Upstash Redis (`upstash`). gcloud install and auth are in `gcp-cli`.
- Source: https://docs.cloud.google.com/memorystore/docs/valkey/manage-basic-auth (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [about-iam-auth.md](./about-iam-auth.md)
- [about-in-transit-encryption.md](./about-in-transit-encryption.md)
- [access-control.md](./access-control.md)
