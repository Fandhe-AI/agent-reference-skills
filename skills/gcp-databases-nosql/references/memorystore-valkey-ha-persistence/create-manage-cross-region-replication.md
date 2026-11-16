---
source: https://docs.cloud.google.com/memorystore/docs/valkey/create-manage-cross-region-replication
---

# Work with cross-region replication

Create, view, switch over, detach and delete secondary instances for Memorystore for Valkey cross-region replication. Requires gcloud CLI version 488.0.0 or later (`gcloud components update`) and a service connection policy in the secondary's region (the source's prerequisites say "service network policy"; its networking steps say "service connection policy").

## Signature / Usage

### Create a secondary instance

```bash
gcloud memorystore instances create INSTANCE_ID \
--project=PROJECT_ID \
--location=REGION_ID \
--cross-instance-replication-config-role=secondary \
--psc-auto-connections=network=NETWORK,projectId=PROJECT_ID \
--primary-instance=PRIMARY_INSTANCE_PATH
```

```bash
gcloud memorystore instances create my-secondary-instance \
--project=my-project \
--location=us-central1 \
--cross-instance-replication-config-role=secondary \
--psc-auto-connections=network=projects/my-project/global/networks/default,projectId=my-project \
--primary-instance=projects/my-project/locations/us-central1/instances/my-primary-instance
```

### View a secondary instance (shows the membership field)

```bash
gcloud memorystore instances describe INSTANCE_ID \
--project=PROJECT_ID \
--location=REGION_ID
```

### Perform a switchover (run against the secondary to promote)

Adapted (not in the official docs): the bracketed list value is single-quoted so zsh does not treat `[...]` as a glob pattern ("no matches found"); bash passes the same argument either way.

```bash
gcloud memorystore instances update INSTANCE_ID \
--project=PROJECT_ID \
--location=REGION_ID \
--clear-primary-instance \
--cross-instance-replication-config-role=primary \
--cross-instance-replication-config-secondary-instances='[instance=SECONDARY_INSTANCE_PATH]'
```

Example: make `instance-2` (asia-east1) the primary, with `instance-1` (us-east1) and `instance-3` (southamerica-east1) as secondaries.

Adapted (not in the official docs): the bracketed list value is single-quoted so zsh does not treat `[...]` as a glob pattern ("no matches found"); bash passes the same argument either way.

```bash
gcloud memorystore instances update instance-2 \
--project=my-project \
--location=asia-east1 \
--clear-primary-instance \
--cross-instance-replication-config-role=primary \
--cross-instance-replication-config-secondary-instances='[instance=projects/my-project/locations/us-east1/instances/instance-1,instance=projects/my-project/locations/southamerica-east1/instances/instance-3]'
```

### Detach a secondary instance

```bash
gcloud memorystore instances update INSTANCE_ID \
--project=PROJECT_ID \
--location=REGION_ID \
--cross-instance-replication-config-role=none \
--clear-primary-instance
```

### Detach multiple secondary instances

Adapted (not in the official docs): the bracketed list value is single-quoted so zsh does not treat `[...]` as a glob pattern ("no matches found"); bash passes the same argument either way.

```bash
gcloud memorystore instances update PRIMARY_INSTANCE_ID \
--project=PROJECT_ID \
--location=PRIMARY_INSTANCE_REGION_ID \
--remove-cross-instance-replication-config-secondary-instances='[instance=SECONDARY_INSTANCES]' \
--cross-instance-replication-config-role=none
```

Adapted (not in the official docs): added the missing line-continuation backslash after `--cross-instance-replication-config-secondary-instances=[]`, and single-quoted `[]` so zsh does not treat it as a glob pattern.

```bash
gcloud memorystore instances update my-primary-instance \
--project=my-project \
--location=us-central1 \
--cross-instance-replication-config-secondary-instances='[]' \
--cross-instance-replication-config-role=none
```

## Options / Props

| Name | Description |
|------|-------------|
| `INSTANCE_ID` | 1 to 63 characters, lowercase letters, numbers or hyphens; starts with a lowercase letter, ends with a lowercase letter or number; unique in its region. |
| `PROJECT_ID` | Project of the secondary (same as the primary's project). |
| `NETWORK` | `projects/NETWORK_PROJECT_ID/global/networks/NETWORK_ID`; must match the network of the service connection policy. |
| `PRIMARY_INSTANCE_PATH` | e.g. `projects/my-project/locations/us-central1/instances/my-primary-instance`; any instance that is not a secondary. |
| `SECONDARY_INSTANCE_PATH` | Secondary path; separate multiple with commas inside `[...]`. |
| `SECONDARY_INSTANCES` | Each as `projects/PROJECT_ID/locations/SECONDARY_INSTANCE_REGION_ID/instances/INSTANCE_ID`, comma-separated. |

## Notes

- A primary can have at most two secondaries; do not choose a secondary as parent (no cascading replicas).
- Console secondary creation offers zero, one, or two replicas, while elsewhere replicas per shard are 0-5 (Source inconsistency; both kept). Multi-zone spreads shards across three zones; single zone reduces network costs but has no failover.
- After a switchover you must reconnect applications to the new primary. Follow the switchover best practices in [about-cross-region-replication.md](./about-cross-region-replication.md) first.
- `--cross-instance-replication-config-role=none` is optional when detaching some secondaries; required to detach all so the primary becomes independent. Listing instances you do not want to detach detaches the rest.
- ACL policies are not replicated; update and delete each policy on primary and secondary separately, keeping rules consistent.
- This page's "Update settings on the primary instance" list says: "You must change the following settings on the primary instance. After you do, Memorystore for Valkey synchronizes the changes to the secondary instance" and lists capacity, configuration, deletion protection and persistence; zone distribution, replica count and maintenance windows are changed on each instance.
- Source inconsistency: the about page (see [about-cross-region-replication.md](./about-cross-region-replication.md)) lists deletion protection under "Configure local settings" (not synced). Check and set deletion protection on each secondary instance separately rather than relying on the primary's setting.
- Deleting a primary: detach or delete all secondaries first; primary and secondary cannot be deleted simultaneously. Switchover, detach and delete are destructive to the replication topology; try them on disposable instances first.
- The source also shows Console steps.
- Memorystore for Valkey is managed Valkey on Google Cloud, distinct from Upstash Redis (`upstash`) and Cloudflare Workers KV (`cloudflare-storage`).
- Source: https://docs.cloud.google.com/memorystore/docs/valkey/create-manage-cross-region-replication (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)
- Corrected from the official docs: the original example ended `--cross-instance-replication-config-secondary-instances=[]` with no trailing `\` before the `--cross-instance-replication-config-role=none` line; the source writes the `[instance=...]` and `[]` list values unquoted (`--cross-instance-replication-config-secondary-instances=[instance=SECONDARY_INSTANCE_PATH]`), which zsh rejects.
- `--psc-auto-connections` is marked "Deprecated: Use the endpoints.connections.psc_auto_connection value instead." in the gcloud help (SDK 593.0.0); the source still uses it for secondaries.

## Related

- [about-cross-region-replication.md](./about-cross-region-replication.md)
- [scale-replica-count.md](./scale-replica-count.md)
