---
source: https://docs.cloud.google.com/memorystore/docs/valkey/self-service-maintenance
---

# Self-service maintenance

Accept a newer maintenance version on an instance outside the normal scheduled maintenance flow, and view the current and available maintenance versions.

## Signature / Usage

### View maintenance versions

Adapted (not in the official docs): the source shows `/` instead of `\` as the line continuation and `PROJECT_NAME` for the project; this uses `\` and `PROJECT_ID` (project ID or number) so the command runs.

```bash
gcloud memorystore instances describe INSTANCE_ID \
--location=REGION_NAME \
--project=PROJECT_ID
```

The current version is in `effectiveMaintenanceVersion`; the list of newer versions is in `availableMaintenanceVersions`. If no versions appear, the instance has the latest version.

### Update to a new maintenance version

Adapted (not in the official docs): the source uses `/` line continuations and omits the continuation before `--maintenance-version`, which would drop that flag; this uses `\` and `PROJECT_ID`.

```bash
gcloud memorystore instances update INSTANCE_ID \
--location=REGION_NAME \
--project=PROJECT_ID \
--maintenance-version=MAINTENANCE_VERSION
```

Console: instance page, **Maintenance** card, **Self-service maintenance** > **View and apply**, choose the version, **Apply**.

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| INSTANCE_ID | string | ID of the instance |
| REGION_NAME | string | Region of the instance |
| PROJECT_ID | string | Project ID or number of the project that contains the instance |
| MAINTENANCE_VERSION | string | Version to update to; find it via `availableMaintenanceVersions` |

## Notes

- Corrected from the official docs: the original shows `gcloud memorystore instances describe INSTANCE_ID /` / `--location=REGION_NAME /` / `--project=PROJECT_NAME` and, for update, `--project=PROJECT_NAME` followed by `--maintenance-version=MAINTENANCE_VERSION` without a continuation.
- Use it when you need an update sooner than the next scheduled event (scheduled maintenance happens once every few months) or to stay current with CVE patches needed for FedRAMP compliance. It is optional; the next scheduled maintenance updates the version automatically.
- You can only move to a newer maintenance version.
- Impact on applications is the same as standard maintenance; see [about-maintenance.md](./about-maintenance.md). Fixed vulnerabilities per version: https://docs.cloud.google.com/memorystore/docs/valkey/maintenance-changelog
- The source also shows Console steps.
- Source: https://docs.cloud.google.com/memorystore/docs/valkey/self-service-maintenance (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [about-maintenance.md](./about-maintenance.md)
- [find-and-set-maintenance-windows.md](./find-and-set-maintenance-windows.md)
