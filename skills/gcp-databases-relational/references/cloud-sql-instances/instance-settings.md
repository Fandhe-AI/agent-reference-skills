---
source: https://docs.cloud.google.com/sql/docs/postgres/instance-settings
---

# Instance settings

Settings available for Cloud SQL for PostgreSQL instances, whether each can be modified after creation, the allowed values, and the impact of changing them.

## Signature / Usage

### Remove the automatic storage increase limit

Use `unlimited`; the `--storage-auto-increase-limit` flag does not accept `0`. In the Admin API, set `settings.storageAutoResizeLimit` to `0` (the default).

```bash
gcloud sql instances patch INSTANCE_NAME \
  --storage-auto-increase-limit=unlimited
```

To set a limit, use `--storage-auto-increase-limit=INTEGER_VALUE_OF_GB` at create time or with `gcloud sql instances patch`; the value must be at least the current storage size (minimum 10 GB) and not exceed the maximum capacity.

### Disable data cache on C4D (Enterprise Plus)

For C4D machine types with 8 vCPUs or larger, explicitly add `--no-enable-data-cache` (data cache is unavailable on 2 and 4 vCPU C4D types).

## Options / Props

### Automatic storage increase formulas

| Quantity | Formula (GB) | Rounding (per source) |
|---|---|---|
| Threshold, Hyperdisk Balanced | `MAX(5, (provisioned storage) * 5 / 100)` | Rounded up to the nearest whole number |
| Threshold, SSD or HDD | `MIN(5 + (provisioned storage)/25, 25)` | Rounded down to the nearest whole number |
| Amount added, Hyperdisk Balanced (15%, at least 5 GB) | `MAX(5, (provisioned storage) * 15 / 100)` | Rounded down to the nearest whole number |
| Amount added, SSD, HDD and other types | Equal to the threshold (at most 25 GB) | — |

Source examples for a 66 GB instance: Hyperdisk Balanced threshold `MAX(5, (66 * 0.05)) = MAX(5, 3.3) = 5 GB`; SSD or HDD threshold `MIN(5 + (66/25), 25) = MIN(5 + 2.6, 25) = MIN(7, 25) = 7 GB`.

### Settings

| Setting | Modifiable after creation? | Possible values |
|---|---|---|
| Instance ID | N | Lowercase letters, numbers, hyphens; must start with a letter; `project-ID:instance-ID` total length 98 characters or less |
| Region | N | See region availability by edition |
| Zone | Y | Depends on region; moving zones causes downtime scaling with disk size |
| Database version | N | Enterprise Plus: `POSTGRES_18` (default), `POSTGRES_17`, `POSTGRES_16`, `POSTGRES_15`, `POSTGRES_14`, `POSTGRES_13`, `POSTGRES_12`. Enterprise: the same plus `POSTGRES_11`, `POSTGRES_10`, `POSTGRES_9_6` |
| SSL mode | Y | `ALLOW_UNENCRYPTED_AND_ENCRYPTED` (default; client certificate not verified), `ENCRYPTED_ONLY`, `TRUSTED_CLIENT_CERTIFICATE_REQUIRED`; set `requireSsl` to a compatible value or unset it |
| Server CA mode | Y | `GOOGLE_MANAGED_INTERNAL_CA` (default), `GOOGLE_MANAGED_CAS_CA` (Auth Proxy 2.13.0+), `CUSTOMER_MANAGED_CAS_CA` (Auth Proxy 2.14.3+; CA pool in the same region) |
| Automatic server certificate rotation | Y | `AUTOMATIC_ROTATION_DURING_MAINTENANCE` to enable; only with the two CAS CA modes; rotates up to 180 days before expiry; disabled by default |
| Edition | Y | `ENTERPRISE` or `ENTERPRISE_PLUS`; default Enterprise Plus for PostgreSQL 16+, Enterprise for 15 and earlier |
| Password policy | Y | Configured or not (min length, complexity, reuse, disallow username, change interval) |
| Private IP | Cannot be deactivated once activated | Activated or deactivated |
| Public IP | Y | Activated or deactivated; deactivating releases the address and re-enabling gives a different IPv4 |
| Authorized networks | Y | IP addresses or CIDR ranges (public IP only) |
| Private path for Google Cloud services | Y | Needs private IP and an authorized network; `--enable-google-private-path` |
| Data API access | Y | Allowed or disallowed (default); `--data-api-access=ALLOW_DATA_API` |
| Data cache | Y | Activated (default on Enterprise Plus) or deactivated |
| Machine type | Y | Enterprise Plus: N2, C4A, C4, C4D predefined. Enterprise: shared core, dedicated core, N4 (predefined and custom) |
| Cores | Y | Enterprise Plus: 2 to 192 (predefined only). Enterprise: 1 to 96 (1 or even; up to 80 in select regions) |
| Memory | Y | Enterprise Plus: 6.75 to 8 GB per vCPU (`db-perf-optimized-N-128` 6.75; C4 7.5 to 7.75; C4D 7.5 to 7.875; others 8). Enterprise: 0.9 to 6.5 GB per vCPU, multiple of 256 MB, at least 3.75 GB |
| Storage type | N | SSD (default; N2 and general purpose), HDD (Enterprise only), Hyperdisk Balanced (C4, C4A, C4D, N4) |
| Storage capacity | Y (increase only; shrink is separate) | Up to 64 TB with an unshared vCPU; up to 3054 GB with a shared vCPU |
| Hyperdisk settings | Y | Provisioned IOPS 4,000 (default); throughput 170 MiB/s (default); C4/C4A/C4D (Enterprise Plus) and N4 (Enterprise) |
| Automatic storage increases | Y | On (default) / Off; checked every 30 seconds |
| Data encryption method | N | Google-owned and managed key (default) or Cloud KMS key (CMEK) |
| Automatic storage increase limit | Y | GB; `unlimited` (gcloud) or `0` (API) = no limit |
| Backups | Y | On (default) / Off; automated backups retained 1 to 365 (default 7) |
| Backup location | Y | Multi-region (default) or Region |
| Instance deletion protection | Y | Activated or deactivated; must be deactivated before deleting |
| Retain backups after instance deletion | Y | Activated or deactivated |
| Final backup at deletion | Y | Activated or deactivated; retention up to 365 days, default 30 |
| Point-in-time recovery | Y | On / Off; default varies; toggling restarts the instance and closes connections |
| Availability | Y | Zonal (default; no failover, test and dev only); High availability (regional) off by default, recommended for production |
| Maintenance window | Y | Any (default) or day of week and hour; none on read replicas |
| Maintenance timing | Y | Any (default), Canary (Week 1 / Preview), Stable (Week 2 / Production), Week 5 |
| Database flags | Y | See Cloud SQL database flags documentation |

### Impact of changing settings

| Change | Impact |
|---|---|
| Most settings | Applied immediately; connectivity unaffected |
| Enterprise: CPU count or memory | Offline under 60 seconds; total change can take several minutes |
| Private IP configuration, network change, enabling HA | Offline for several minutes |
| Enterprise Plus: scale up vCPUs, toggle data cache | Near-zero downtime |
| Moving to a different zone | Downtime scales with disk size |
| Primary memory change with smaller replicas | Replicas may go offline under 60 seconds because `max_connections` must be at least as large on replicas |

## Notes

- Source inconsistency: the settings table lists `POSTGRES_18` as the default database version, but the Database version description says to accept the default "PostgreSQL 16".
- Source inconsistency: the table says to disable automatic certificate rotation by setting `serverCertificationRotationMode` to `NO_AUTOMATIC_ROTATION_DURING_MAINTENANCE`, while the gcloud flag is `--server-certificate-rotation-mode` with `NO_AUTOMATIC_ROTATION` (see create-instance).
- Source inconsistency: the table lists "Data Api Access" (Activated or deactivated) and "Data API access" (Allowed or disallowed, default) as two rows for the same setting.
- `db-f1-micro` and `db-g1-small` are shared-core, excluded from the Cloud SQL SLA, and meant for test and development only. A machine with insufficient vCPUs or too little storage without automatic increases can lose SLA coverage.
- Automatic storage increases are permanent unless you manually shrink storage (https://docs.cloud.google.com/sql/docs/postgres/about-storage-shrink), and raise cost; if storage runs out the instance goes offline (it is stopped when nearly full). Cloud SQL may override the increase settings for critical maintenance. For large disks (500 GB or more on SSD/HDD) threshold and increment are 25 GB; resize manually before a large import. Hyperdisk Balanced increases within 4 hours may be throttled. Read replica storage must be at least the primary's and the increase settings apply from the primary.
- Maintenance downtime: Enterprise Plus primary typically under 1 second; others typically 60 seconds or less. Moving a zone and enabling HA are disruptive; try changes on a disposable instance first.
- Source inconsistency: this page (https://docs.cloud.google.com/sql/docs/postgres/instance-settings) gives maintenance downtime for non-Enterprise-Plus instances as typically 60 seconds or less; https://docs.cloud.google.com/sql/docs/postgres/editions-intro gives Enterprise maintenance downtime as < 30 seconds.
- Source inconsistency: this page gives the shared-vCPU storage cap as up to 3054 GB; https://docs.cloud.google.com/sql/docs/quotas gives shared core up to 3 TB.
- The third formula's source block says "The threshold size is rounded down" although it describes the amount added; kept as rounding down.
- Managed PostgreSQL on Google Cloud; distinct from Supabase Postgres (`supabase`), Cloudflare D1 / Hyperdrive (`cloudflare-storage`), and the Node.js client `mssql` / ORM `drizzle`.
- The source also shows only prose and the table for the other settings; no Console, Terraform or REST samples.
- Source: https://docs.cloud.google.com/sql/docs/postgres/instance-settings (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [create-instance.md](./create-instance.md)
- [managed-connection-pooling.md](./managed-connection-pooling.md)
- Edit an instance: https://docs.cloud.google.com/sql/docs/postgres/edit-instance
- Database flags: https://docs.cloud.google.com/sql/docs/postgres/flags
