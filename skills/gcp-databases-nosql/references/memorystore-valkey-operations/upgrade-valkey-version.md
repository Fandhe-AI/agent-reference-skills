---
source: https://docs.cloud.google.com/memorystore/docs/valkey/upgrade-valkey-version
---

# Upgrade the Valkey version of an instance

Upgrade a Memorystore for Valkey instance to a newer Valkey version with the console or gcloud, plus best practices and behavior during the upgrade (merged from "About upgrading version").

## Signature / Usage

### Upgrade with gcloud

```bash
gcloud memorystore instances update INSTANCE_ID \
--project=PROJECT_ID \
--location=REGION_ID \
--engine-version=ENGINE_VERSION
```

For example:

```bash
gcloud memorystore instances update my-instance \
--project=my-project \
--location=us-central1 \
--engine-version=VALKEY_9_1
```

Console: instance page, **Configurations** section, next to **Valkey version** click **Upgrade**, choose the version in the **Upgrade version** dialog, **Update instance**.

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| INSTANCE_ID | string | ID of the instance |
| PROJECT_ID | string | Project ID or number of the project where the instance is located |
| REGION_ID | string | Region of the instance |
| ENGINE_VERSION | enum | `VALKEY_7_2`, `VALKEY_8_0`, `VALKEY_9_0`, `VALKEY_9_1` |

## Notes

- Upgrading is irreversible: you can upgrade to any newer version (for example 7.2 to 9.1) but cannot downgrade. Try it on a disposable or test instance first.
- Best practices: create a backup first (https://docs.cloud.google.com/memorystore/docs/valkey/manage-backups#create-on-demand-backup); upgrade during low traffic; follow the memory management best practices; review the supported versions (https://docs.cloud.google.com/memorystore/docs/valkey/supported-versions).
- Behavior: the service updates all nodes of the instance, similar to a maintenance operation using the create-before-destroy lifecycle strategy (see [about-maintenance.md](./about-maintenance.md)).
- The source also shows Console steps.
- Source: https://docs.cloud.google.com/memorystore/docs/valkey/upgrade-valkey-version (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/memorystore/docs/valkey/about-upgrading-version (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [about-maintenance.md](./about-maintenance.md)
- [general-best-practices.md](./general-best-practices.md)
- [self-service-maintenance.md](./self-service-maintenance.md)
