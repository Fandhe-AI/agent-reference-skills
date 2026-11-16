---
source: https://docs.cloud.google.com/memorystore/docs/valkey/manage-in-transit-encryption
---

# Manage in-transit encryption (per-instance CA)

Create an instance that uses a per-instance CA with TLS, download the CAs, install them on a client, and configure the client.

## Signature / Usage

### Create an instance with a per-instance CA

```bash
gcloud memorystore instances create INSTANCE_ID \
--location=REGION_ID \
--endpoints='[{"connections": [{"pscAutoConnection": {"network": "projects/PROJECT_ID/global/networks/NETWORK_ID", "projectId": "PROJECT_ID"}}]}]' \
--replica-count=REPLICA_COUNT \
--node-type=NODE_TYPE \
--shard-count=SHARD_COUNT \
--engine-version=ENGINE_VERSION \
--mode=MODE \
--transit-encryption-mode=server-authentication \
--server-ca-mode=google-managed-per-instance-ca
```

Adapted (not in the official docs): the official example is missing the closing single quote after the `--endpoints` JSON, which breaks the shell command; the quote was added.

```bash
gcloud memorystore instances create my-instance \
--location=us-central1 \
--endpoints='[{"connections": [{"pscAutoConnection": {"network": "projects/my-project/global/networks/my-network", "projectId": "my-project"}}]}]' \
--replica-count=1 \
--node-type=highmem-medium \
--shard-count=3 \
--engine-version=VALKEY_9_1 \
--mode=CLUSTER \
--transit-encryption-mode=server-authentication \
--server-ca-mode=google-managed-per-instance-ca
```

### Download the CAs

Adapted (not in the official docs): added `--location=REGION_ID`; without it gcloud fails with "Error parsing [instance]" (the source shows only the instance ID).

```bash
gcloud memorystore instances get-certificate-authority INSTANCE_ID \
--location=REGION_ID
```

### Install the CA on a Compute Engine Linux VM

Create `/tmp/server_ca.pem` on the client (the source uses `sudo vim /tmp/server_ca.pem`) and paste the CAs. Copy each entire CA including its BEGIN and END CERTIFICATE lines, keep text left-justified with no leading spaces, put each CA on a new line, and leave no blank lines between CAs.

## Options / Props

| Flag / value | Description |
|--------------|-------------|
| `--transit-encryption-mode=server-authentication` | enables TLS with server authentication |
| `--server-ca-mode=google-managed-per-instance-ca` | per-instance CA; also the default if the flag is omitted |
| `--engine-version` | `VALKEY_7_2`, `VALKEY_8_0`, `VALKEY_9_0`, `VALKEY_9_1` (default `VALKEY_9_1`); cannot downgrade |
| `--replica-count` | `0`-`5` per shard |
| `--mode` | Cluster Mode Enabled or Disabled; defaults to Cluster Mode Enabled |
| INSTANCE_ID | 1 to 63 characters, lowercase letters, numbers, hyphens; starts with a lowercase letter, ends with a letter or number |

## Notes

- Corrected from the official docs: `gcloud memorystore instances get-certificate-authority INSTANCE_ID` (no `--location`). Replace INSTANCE_ID with the instance ID and REGION_ID with the region where the instance is located.
- Corrected from the official docs: the example `--endpoints='[{...}}]}] \` lacked the closing `'`; the example above ends the JSON with `]}]'`.
- A service connection policy must exist for your network before creating the instance. With a per-instance CA you cannot change the CA mode or deactivate in-transit encryption.
- `shared-core-nano` has no SLA; use it only for development or testing.
- CAs are valid for ten years; new CAs are available about five years before expiry. Install all downloadable CAs on clients so rotation (existing and new CAs both active) does not break connections. TLS 1.2 and later.
- Clients connect to the instance IP, port 6379, and the CA file. The source also shows a Console path and a sample PEM block (omitted).
- Managed Valkey on Google Cloud; distinct from Upstash Redis (`upstash`). Client library patterns: `gcp-client-libraries`.
- The source's example writes `--mode=CLUSTER` while the gcloud help lists lower-case choices (`cluster`, `cluster-disabled`); gcloud 593.0.0 accepts both spellings (checked locally: `--mode=CLUSTER` and `--mode=cluster` both pass argument parsing, while an invalid value is rejected with `Invalid choice`). The example is kept verbatim.
- Source: https://docs.cloud.google.com/memorystore/docs/valkey/manage-in-transit-encryption (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [about-in-transit-encryption.md](./about-in-transit-encryption.md)
- [manage-iam-auth.md](./manage-iam-auth.md)
- [manage-basic-auth.md](./manage-basic-auth.md)
