---
source: https://docs.cloud.google.com/managed-lustre/docs/create-instance
---

# Create a Managed Lustre instance

A Managed Lustre instance is a complete Lustre file system that can be mounted to a Compute Engine VM or a GKE cluster and accessed with POSIX semantics.

## Signature / Usage

### Create (gcloud)

```bash
gcloud lustre instances create INSTANCE_ID \
  --per-unit-storage-throughput=PER_UNIT_STORAGE_THROUGHPUT \
  --capacity-gib=CAPACITY_GIB \
  --filesystem=FILESYSTEM \
  --location=LOCATION \
  --network=NETWORK_PATH
```

Dynamic tier: set throughput to `0` and add `--dynamic-tier-options-mode=DEFAULT_CACHE` (fragment from the source; `...` stands for the other flags from the block above; `--capacity-gib`, `--filesystem` and `--network` are required):

```text
gcloud lustre instances create my-dynamic-tier-instance \
  --per-unit-storage-throughput=0 \
  --dynamic-tier-options-mode=DEFAULT_CACHE \
  ...
```

### Create (REST)

Request template from the source (field types are placeholders, not a runnable JSON body):

```text
POST https://lustre.googleapis.com/v1/projects/PROJECT_ID/locations/ZONE/instances?instanceId=INSTANCE_ID
Authorization: Bearer AUTH_TOKEN
{
  "filesystem": string,
  "perUnitStorageThroughput": int64,
  "capacityGib": int64,
  "network": string
}
```

Dynamic tier in REST (fields to add to the request body; a fragment, not a complete JSON document):

```text
"perUnitStorageThroughput": 0,
"dynamicTierOptions": {
  "mode": "DEFAULT_CACHE"
}
```

### Query creation status

```bash
gcloud lustre instances describe INSTANCE_NAME \
  --location=ZONE
```

```bash
gcloud lustre operations describe OPERATION_ID \
  --location=LOCATION
```

Instance `state` shows creation status; operation `done` shows completion. Note `mountPoint` (for example `10.115.0.3@tcp:/testfs`) and the file system name, needed when mounting.

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `INSTANCE_ID` | string | Lowercase letters, numbers, hyphens; starts with a letter; 1-63 chars; ends with a number or letter; unique within project and location |
| `--per-unit-storage-throughput` | int | MBps per TiB. Valid: `0`, `125`, `250`, `500`, `1000`. Affects min/max capacity. The create page says the performance tier cannot be changed after creation, but `gcloud lustre instances update` accepts this flag (see Notes) |
| `--capacity-gib` | int | 9,000 to 84,016,000 GiB; allowed values depend on tier. Can be increased later up to the tier maximum |
| `--filesystem` | string | Name used by `mount` and `lfs`. 8 characters or less, letters and/or numbers, case-sensitive. Recommended unique across instances in the VPC |
| `--location` | string | A supported zone; place in the same zone as clients |
| `--network` | string | `projects/PROJECT_ID/global/networks/NETWORK`; must be the same network as clients |
| `--dynamic-tier-options-mode` | enum | `default-cache` (Dynamic tier enabled) or `disabled` (gcloud help); `default-cache` with throughput `0` enables the Dynamic tier. REST value: `DEFAULT_CACHE` |
| `--kms-key` | string | Customer-managed encryption key: the full `projects/.../cryptoKeys/KEY` name, or the key ID together with `--key-ring` and `--location` |
| `--maintenance-policy-weekly-windows`, `--maintenance-policy-exclusion-window` | | Maintenance policies |
| `--async` | flag | Return an operation ID instead of waiting |

Tiers: four set-performance tiers (125 / 250 / 500 / 1000 MBps per TiB) plus a Dynamic tier with aggregate throughput of 25 MBps per TiB.

## Notes

- The source writes `--dynamic-tier-options-mode=DEFAULT_CACHE` (the REST enum value); the gcloud 593.0.0 help lists the choices as `default-cache` (Dynamic tier enabled) and `disabled`, and gcloud accepts either spelling.
- Source inconsistency: the create page says "You cannot change an instance's performance tier after it has been created", but `gcloud lustre instances update` (gcloud 593.0.0) accepts `--per-unit-storage-throughput` (valid values 0, 125, 250, 500, 1000; for a Dynamic-tier instance it "must not be set or must be set to zero").
- Required role: Managed Lustre Admin (`roles/lustre.admin`) and the Managed Lustre API enabled.
- Creation takes about 15 minutes for 9,000 GiB, up to several hours for 84,016,000 GiB. The gcloud section says 15 minutes to several hours; the Console section says 15 minutes to one hour (Source inconsistency).
- Do not put sensitive information in the instance name; names may be exposed to Google-internal systems outside your project.
- Quotas for throughput and capacity are consumed at creation; insufficient quota fails the request.
- Troubleshooting: `FAILED_PRECONDITION ... NETWORK_RANGES_NOT_AVAILABLE: IP address range exhausted` means the private services access range is exhausted; add ranges and use a prefix length of at least /20 (4096 addresses). `INVALID_ARGUMENT: the network has not been peered with Google managed services` means private services access peering is missing.
- Flag name differs from the source: the source's `--kms-key-name` is `--kms-key` (with optional `--key-ring`) in gcloud 593.0.0 `gcloud lustre instances create`; the table uses the 593.0.0 name.
- The source also shows Console tabs and the `--gke-support-enabled` references elsewhere (deprecated flag).
- Distinct from Cloud Storage buckets (object storage); this is POSIX file storage.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/lustre/instances/create (`--dynamic-tier-options-mode`; retrieved 2026-11-14)
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/lustre/instances/update (`--per-unit-storage-throughput`; retrieved 2026-11-14)
- Source: https://docs.cloud.google.com/managed-lustre/docs/create-instance (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)

## Related

- [managed-lustre-overview.md](./managed-lustre-overview.md)
- [managed-lustre-quotas.md](./managed-lustre-quotas.md)
- [managed-lustre-connect-from-compute-engine.md](./managed-lustre-connect-from-compute-engine.md)
