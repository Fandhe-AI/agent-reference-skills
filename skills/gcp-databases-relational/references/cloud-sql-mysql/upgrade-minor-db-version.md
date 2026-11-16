---
source: https://docs.cloud.google.com/sql/docs/mysql/upgrade-minor-db-version
---

# Upgrade the database minor version (Cloud SQL for MySQL 8.0)

Cloud SQL for MySQL 8.0 supports multiple minor versions and provisions on the default minor version, one earlier than the latest. This page covers automatic minor version upgrade, manual upgrade, checking the installed version, and rollback. MySQL 8.0 doesn't support downgrading.

## Signature / Usage

### Enable automatic upgrade on an existing instance (8.0.35 or later)

This doesn't upgrade the instance; it upgrades during the next scheduled maintenance event.

```bash
gcloud sql instances patch INSTANCE_NAME \
   --enable-auto-upgrade-minor-version
```

Verify by describing the instance and checking that `DatabaseType` is `MYSQL_8_0`:

```bash
gcloud sql instances describe INSTANCE_NAME
```

### Check enablement

```bash
gcloud sql instances describe INSTANCE_NAME \
--project=PROJECT_ID
```

Look for `databaseVersion` (must be `MYSQL_8_0`) and `databaseInstalledVersion` (must be `MYSQL_8_0_35` or greater).

### List available minor versions, then upgrade manually

`gcloud sql instances describe INSTANCE_NAME` lists `upgradableDatabaseVersions` with a `name` per target (for example `MYSQL_8_0_36`). Then:

```bash
gcloud sql instances patch INSTANCE_NAME \
   --database-version=DATABASE_VERSION
```

REST v1 equivalent: save `{"databaseVersion": "DATABASE_VERSION"}` as `request.json`, then:

```bash
curl -X PATCH \
     -H "Authorization: Bearer $(gcloud auth print-access-token)" \
     -H "Content-Type: application/json; charset=utf-8" \
     -d @request.json \
     "https://sqladmin.googleapis.com/v1/projects/PROJECT_ID/instances/INSTANCE_ID"
```

## Options / Props

| Item | Detail |
|------|--------|
| Automatic upgrade requirement | Instance running 8.0.35 or later |
| Applied when | Regularly scheduled maintenance only, not self-service maintenance |
| Reversibility | Once enabled, can't be disabled for an instance |
| New instance, no minor version chosen | Automatic upgrade enabled by default |
| New instance, 8.0.35 or later chosen | Can enable during creation |
| New instance, 8.0.34 or earlier chosen | Can't enable; upgrade manually |
| Manual upgrade required | Instances on 8.0.34 or earlier; after reaching 8.0.35 you can enable automatic upgrade |
| Target version | Must be greater than the installed minor; installed higher than requested is rejected; can't revert to an unspecified minor |
| Concurrent updates | Disk size or memory changes aren't permitted during the upgrade |
| Downtime | Restart may cause downtime; Enterprise Plus edition is near-zero downtime |
| 5.6 / 5.7 | Cloud SQL manages the minor version automatically |

### Recommended steps before a manual upgrade

1. Choose the target minor version (`upgradableDatabaseVersions`).
2. Test on a clone of production: upgrade the clone, run workload tests.
3. Upgrade all read replicas to the target version first and verify the application.
4. Back up the primary instance.

### Roll back

1. Provision a recovery instance on the previous minor version.
2. Configure its settings to the pre-upgrade state.
3. Restore the pre-upgrade backup to it. A restore is rejected if the backup's installed version is greater than the target's.

Alternative: perform a point-in-time recovery into a new instance.

## Notes

- MySQL variant; Cloud SQL for PostgreSQL has no identical minor-upgrade page in this skill's sources, so no counterpart URL is given here.
- Enabling automatic upgrade is irreversible; the manual upgrade can't be downgraded. Try both on a clone or other disposable instance first. Restoring a backup onto an existing instance overwrites it, so use a new recovery instance as the source suggests.
- The existing instances initially created without a minor version (`databaseVersion=MYSQL_8_0`) and now on 8.0.35 or later already have automatic upgrade enabled.
- The source also shows Console steps, REST v1beta4 forms (`https://sqladmin.googleapis.com/sql/v1beta4/...`) and PowerShell. The v1beta4 PATCH example uses `PROJECT-ID` / `INSTANCE-ID` spellings inconsistent with the other placeholders (Source inconsistency).
- Source: https://docs.cloud.google.com/sql/docs/mysql/upgrade-minor-db-version (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [known-issues.md](./known-issues.md)
- [replication.md](./replication.md)
- [features.md](./features.md)
