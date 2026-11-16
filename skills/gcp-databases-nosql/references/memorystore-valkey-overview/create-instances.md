---
source: https://docs.cloud.google.com/memorystore/docs/valkey/create-instances
---

# Create instances

Create multi-zone (default) and single-zone Memorystore for Valkey instances with `gcloud memorystore instances create`.

## Signature / Usage

### Before you begin

- Use a project with billing enabled; install and initialize the gcloud CLI (version `489.0.0` or later is required for the Memorystore for Valkey commands; update with `gcloud components update`).
- Enable the Memorystore for Valkey API (`memorystore.googleapis.com`), the Network Connectivity API (`networkconnectivity.googleapis.com`) and the Service Consumer Management API (`serviceconsumermanagement.googleapis.com`).
- Required IAM role in the project: `roles/memorystore.admin`, `roles/owner` or `roles/editor`.
- Networking: check the Networking page and create a service connection policy for the network if none exists.

### Create a multi-zone instance

```bash
gcloud memorystore instances create INSTANCE \
--location=REGION_ID \
--endpoints='[{"connections": [{"pscAutoConnection": {"network": "projects/PROJECT_ID/global/networks/NETWORK_ID", "projectId": "PROJECT_ID"}}]}]' \
--replica-count=REPLICA_COUNT \
--node-type=NODE_TYPE \
--engine-version=ENGINE_VERSION \
--shard-count=SHARD_COUNT \
--acl-policy=ACL_POLICY_NAME \
--mode=MODE
```

Cluster Mode Enabled example:

```bash
gcloud memorystore instances create my-instance \
--location=us-central1 \
--endpoints='[{"connections": [{"pscAutoConnection": {"network": "projects/my-project/global/networks/default", "projectId": "my-project"}}]}]' \
--replica-count=2 \
--node-type=highmem-medium \
--shard-count=8 \
--acl-policy=my-acl-policy \
--mode=cluster
```

Cluster Mode Disabled example:

```bash
gcloud memorystore instances create my-instance \
--location=us-central1 \
--endpoints='[{"connections": [{"pscAutoConnection": {"network": "projects/my-project/global/networks/default", "projectId": "my-project"}}]}]' \
--shard-count=1 \
--replica-count=2 \
--node-type=highmem-medium \
--acl-policy=my-acl-policy \
--mode=cluster-disabled
```

### Create a single-zone instance

```bash
gcloud memorystore instances create INSTANCE \
--location=REGION_ID \
--endpoints='[{"connections": [{"pscAutoConnection": {"network": "projects/PROJECT_ID/global/networks/NETWORK_ID", "projectId": "PROJECT_ID"}}]}]' \
--replica-count=REPLICA_COUNT \
--node-type=NODE_TYPE \
--engine-version=ENGINE_VERSION \
--shard-count=SHARD_COUNT \
--zone-distribution-config-mode=ZONE_DISTRIBUTION_CONFIG_MODE \
--zone-distribution-config=ZONE \
--acl-policy=ACL_POLICY_NAME \
--mode=MODE
```

## Options / Props

| Flag / value | Description |
|---|---|
| `INSTANCE` | Instance ID, 1 to 63 characters; lowercase letters, numbers or hyphens; starts with a lowercase letter and ends with a lowercase letter or number. |
| `--location` (`REGION_ID`) | Region; only supported regions are allowed. |
| `--endpoints` | PSC auto connection JSON with `network` (`projects/PROJECT_ID/global/networks/NETWORK_ID`) and `projectId`. |
| `--replica-count` | Replicas per shard, `0`-`5`. |
| `--node-type` | Node type. `shared-core-nano` is for development or testing only (no SLA). |
| `--engine-version` | `VALKEY_7_2`, `VALKEY_8_0`, `VALKEY_9_0`, `VALKEY_9_1`; default `VALKEY_9_1`. No downgrade after setting. |
| `--shard-count` | Number of shards; Cluster Mode Disabled supports only one. |
| `--acl-policy` | ACL policy name; the policy must be in the same region as the instance and its region cannot be changed. |
| `--mode` | `cluster` or `cluster-disabled`; defaults to Cluster Mode Enabled when omitted; cannot be changed later. |
| `--zone-distribution-config-mode` | `single-zone` or `multi-zone` (default `multi-zone`). |
| `--zone-distribution-config` (`ZONE`) | Zone for the nodes; applies only with `single-zone`. |

Console options (same for both zone types): replicas default 1 (0-5); Security: IAM Auth, Token Auth or Disabled (IAM/Token Auth turns on in-transit encryption TLS automatically); CA mode: Per-instance CA, Customer-managed CA (requires a CA pool) or Shared CA; Encryption: Google-managed key or Cloud KMS CMEK; data persistence: No persistence, AOF or Memory Snapshot; automated daily backups retained `1` to `365` days (default `35`); maintenance Default or Custom; version default 9.1.

## Notes

- By default in-transit encryption is disabled and the authorized network is `default`. Keep TLS and IAM / token authentication enabled for production where the source offers it.
- If you create an instance with replicas and one zone is unavailable, Memorystore creates it in the available zones and redistributes nodes evenly later. Without replicas, creation fails when a zone is unavailable.
- Cluster mode cannot be changed after creation ("you can't change the instance to the other mode"); Google recommends Cluster Mode Enabled. The Valkey version can be upgraded after creation but not downgraded (see `memorystore-valkey-operations/upgrade-valkey-version.md`).
- The source also shows Console steps (summarized above).
- Memorystore for Valkey is managed Valkey / Redis / Memcached on Google Cloud, distinct from Upstash Redis (`upstash`) and Cloudflare Workers KV (`cloudflare-storage`). IAM and service accounts: `gcp-foundation`.
- Source: https://docs.cloud.google.com/memorystore/docs/valkey/create-instances (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [instance-node-specification.md](./instance-node-specification.md)
- [cluster-mode-enabled-and-disabled.md](./cluster-mode-enabled-and-disabled.md)
- [deletion-protection.md](./deletion-protection.md)
- [configure-instances.md](./configure-instances.md)
- [connect-instance.md](./connect-instance.md)
