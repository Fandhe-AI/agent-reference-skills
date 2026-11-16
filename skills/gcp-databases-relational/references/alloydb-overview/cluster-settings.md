---
source: https://docs.cloud.google.com/alloydb/docs/cluster-settings
---

# AlloyDB cluster and instance settings

Settings for AlloyDB for PostgreSQL clusters and instances, whether they can be modified after creation, and their allowed values. The source page shows the table for the Primary cluster view; its toggle also offers Primary instance, Secondary cluster, Secondary instance and Read pool instance, whose tables are not in the retrieved twin.

## Signature / Usage

Snippet taken from https://docs.cloud.google.com/alloydb/docs/cluster-create:

```bash
gcloud alloydb clusters create CLUSTER_ID \
    --database-version=POSTGRES_VERSION \
    --password=PASSWORD \
    --region=REGION_ID \
    --project=PROJECT_ID \
    --enable-private-service-connect
```

## Options / Props

### Primary cluster settings

| Setting | Modifiable after creation | Values |
|---|---|---|
| Cluster ID | N | Letters, numbers and hyphens; must start with a letter. Length 8 to 128 characters. |
| Password | Y | Password for the default `postgres` user. Lowercase letters, numbers and hyphens, 128 characters or less. Update from the Users tab in the console. |
| Database version | N | A supported PostgreSQL version. |
| Region | N | Region where the cluster is created. |
| Private networking: private services access or Private Service Connect | N | Private services access: select Network: Private IP in the console (default there). Private Service Connect: create with the gcloud CLI flag `--enable-private-service-connect`. Cannot be changed after creation. |
| Private services access settings | N | Network (a VPC already configured for private services access); Allocated IP range (optional specific private range instead of letting AlloyDB choose). |
| Data protection: continuous backups | Y | Default point-in-time recovery window is the previous 14 days; resizable from 1 to 35 days. |
| Data protection: automated backups | Y | Enabling sets a daily schedule by default; backups are encrypted with Google-managed encryption and retained 14 days. Enable or disable in the console; change the schedule (days, start time, retention, number retained up to one year) with the gcloud CLI. |
| Maintenance window | Y | `Any (default value)` or `Day of the week and hour of the day`. HA primary and basic instances see under one second of downtime; read pool instances have zero downtime. |
| Data protection: backup encryption | Y | Google-managed by default; optionally a Cloud KMS key. Applies only to new backups; existing backups keep their original encryption. |
| Encryption: cluster encryption | N | Google-managed by default; optionally a Cloud KMS key. Cannot be updated after creation. |

## Notes

- Storage is auto scaled, so there is no storage limit to set; you are charged only for storage used.
- Source inconsistency: the cluster ID row says "lowercase and uppercase letters" while the create-cluster page says the ID must begin with a lowercase letter and use lowercase letters, numbers and hyphens. The password row lists only lowercase letters, numbers and hyphens. Verify against the official page.
- Example KMS key path in the source: `projects/project-name>/locations/location-name/keyRings/keyring-name/cryptoKeys/key-name` (the stray `>` is in the source).
- The borrowed `gcloud alloydb clusters create` snippet puts the password on the command line: gcloud 593.0.0 has no prompt option (`--password` is required), so use a throwaway initial password and change it afterwards, or prefer IAM database authentication (see the cluster creation page's Notes). `POSTGRES_VERSION` takes the gcloud enum `POSTGRES_14`–`POSTGRES_18`.
- Source: https://docs.cloud.google.com/alloydb/docs/cluster-settings (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/alloydb/docs/cluster-create (borrowed snippet; retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [cluster-create.md](./cluster-create.md)
- [instance-primary-create.md](./instance-primary-create.md)
- [instance-read-pool-create.md](./instance-read-pool-create.md)
- [db-version-policies.md](./db-version-policies.md)
- [locations.md](./locations.md)
