---
source: https://docs.cloud.google.com/memorystore/docs/cluster/create-instances
---

# Create instances

How to create Memorystore for Redis Cluster instances (multi-zone and single-zone) with the Google Cloud console or gcloud, including prerequisites, networking and the options available at creation time.

## Signature / Usage

### Before you begin

Install and initialize the Google Cloud CLI (gcloud CLI version `440.0.0` or later is needed for the Memorystore for Redis Cluster commands; run `gcloud components update` to upgrade). Enable the Memorystore for Redis API (`redis.googleapis.com`), the Network Connectivity API (`networkconnectivity.googleapis.com`) and the Service Consumer Management API (`serviceconsumermanagement.googleapis.com`). Set up networking first: if no service connection policy exists for the network you will use, create it following the Networking page.

### Create a multi-zone instance

```bash
gcloud redis clusters create INSTANCE_ID \
--region=REGION_ID \
--network=NETWORK \
--replica-count=REPLICA_COUNT \
--node-type=NODE_TYPE \
--shard-count=SHARD_COUNT \
--acl-policy=ACL_POLICY_NAME
```

Example from the source:

Adapted (not in the official docs): `gcloud alpha redis clusters create` changed to the GA `gcloud redis clusters create`, matching the generic command above; the GA command accepts the same flags.

```bash
gcloud redis clusters create my-instance \
--region=us-central1 \
--network=projects/my-project-335118/global/networks/default \
--replica-count=2 \
--node-type=redis-highmem-medium \
--shard-count=8 \
--acl-policy=my-acl-policy
```

### Create a single-zone instance

```bash
gcloud redis clusters create INSTANCE_ID \
--region=REGION_ID \
--network=NETWORK \
--replica-count=REPLICA_COUNT \
--node-type=NODE_TYPE \
--shard-count=SHARD_COUNT \
--zone-distribution-mode=ZONE_DISTRIBUTION_MODE \
--zone=ZONE \
--acl-policy=ACL_POLICY_NAME
```

## Options / Props

| Flag / field | Description |
|---|---|
| `INSTANCE_ID` | 1 to 63 characters; lowercase letters, numbers or hyphens; must start with a lowercase letter and end with a lowercase letter or number. |
| `--region` | Region for the instance; only [supported regions](./locations.md) for Memorystore for Redis Cluster. |
| `--network` | Format `projects/NETWORK_PROJECT_ID/global/networks/NETWORK_ID`. The network ID must match the one used by the service connection policy, otherwise `create` fails. |
| `--replica-count` | Replicas per shard, `0`-`5` (console default 1). |
| `--node-type` | Node type; see [cluster-node-specification.md](./cluster-node-specification.md). `redis-shared-core-nano` has no SLA, for dev/test only. |
| `--shard-count` | Number of shards; determines total memory capacity. |
| `--zone-distribution-mode` | `single-zone` or `multi-zone` (default `multi-zone`). |
| `--zone` | Zone for the nodes; applies only when `--zone-distribution-mode=single-zone`. |
| `--acl-policy` | Name of the ACL policy to assign. Policy and cluster must be in the same region; a policy's region can't be changed after creation. |

Required IAM roles (one of): `roles/redis.admin` (Memorystore Admin), `roles/owner`, `roles/editor`.

Console-only creation options: Zonal availability (multi-zone / single zone), Security (IAM Auth, Token Auth, or Disabled; IAM Auth and Token Auth automatically enable in-transit encryption (TLS)), Certificate authority mode (Per-instance CA, Customer-managed CA with a CA pool, Shared CA), Encryption (Google-managed key or Cloud KMS CMEK), Data persistence (No persistence, AOF, RDB), automated daily backups (retain `1` to `365` days, default `35`; choose a time window), Maintenance (Default or Custom day and start hour).

## Notes

- With replicas, if one zone of the region is unavailable, the cluster is created in the available zones temporarily and rebalanced evenly later. Without replicas, creation fails if a single zone is unavailable.
- By default, in-transit encryption is disabled and the authorized network is `default`.
- `gcloud redis regions list` shows Memorystore for Redis regions, not Memorystore for Redis Cluster regions.
- Corrected from the official docs: the source's generic command uses `gcloud redis clusters create` but its example starts with `gcloud alpha redis clusters create my-instance`; the example is shown with the GA command, which parses the same flags in gcloud 593.0.0.
- Console steps, Terraform pointers (cloudnetworking-config-solutions) and per-field console paths are summarized only; the source also shows the full Console click-path twice.
- Memorystore pages here cover managed Valkey / Redis / Memcached on Google Cloud, distinct from Upstash Redis (`upstash`) and Cloudflare Workers KV (`cloudflare-storage`). IAM roles and org policy basics: `gcp-foundation`; gcloud install and auth: `gcp-cli`.
- Source: https://docs.cloud.google.com/memorystore/docs/cluster/create-instances (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [connect-cluster-instance.md](./connect-cluster-instance.md)
- [cluster-node-specification.md](./cluster-node-specification.md)
- [supported-instance-configurations.md](./supported-instance-configurations.md)
- [quotas.md](./quotas.md)
