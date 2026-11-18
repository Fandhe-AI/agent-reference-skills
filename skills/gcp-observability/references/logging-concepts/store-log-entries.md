---
source: https://docs.cloud.google.com/logging/docs/store-log-entries
---

# Store log entries: log buckets

Cloud Logging stores and organizes log data in log buckets. Log buckets are regional resources with a fixed location, encrypted with either a customer-managed encryption key (CMEK) or a Google-owned and Google-managed key; after creation you can't change the location or how the key is managed. Data is encrypted at rest with key-encryption keys (envelope encryption).

## Signature / Usage

Snippet taken from https://docs.cloud.google.com/logging/docs/default-settings

```bash
gcloud logging settings describe --organization=ORGANIZATION_ID
```

(Use `--folder=FOLDER_ID` for a folder.) This shows the default resource settings that control the location and CMEK of new system-created buckets.

## Options / Props

### Log bucket types

| Bucket | Created by | Retention | Delete | Contents |
|---|---|---|---|---|
| `_Required` | System, with each project, billing account, folder, organization | 400 days; can't be changed | No | Admin Activity audit logs; System Event audit logs; Google Workspace Admin Audit logs; Enterprise Groups Audit logs; Login Audit logs; Access Transparency logs. Only entries that originate in that resource; you can't modify which entries are stored. |
| `_Default` | System, same as above | 30 days unless custom retention is configured | No | Entries not stored in `_Required`: for example Data Access audit logs, Policy Denied audit logs, logs of applications and Google Cloud services. You can modify which entries are stored. |
| User-defined | You, in any project | You set it at creation | Yes (unless locked) | You select location and retention; CMEK optional. |

### Roles for reading

| Role | Access |
|---|---|
| Logs Viewer (`roles/logging.viewer`) | All entries in `_Required` and the default log view on `_Default` (which excludes Data Access audit logs) |
| Private Logs Viewer (`roles/logging.privateLogViewer`) | All logs in `_Required` and `_Default`, including Data Access audit logs |

### Organization and folder support

| Mechanism | Effect |
|---|---|
| Default resource settings for Cloud Logging | Control the location of new system-created buckets; specify a CMEK applying to new system-created and user-defined buckets |
| Organization policies | Can restrict the location of new user-defined log buckets (regions where buckets can, or can't, be created) |

## Notes

- System-created buckets: location is selected by Cloud Logging unless default resource settings are configured; they use Google-owned keys unless the settings specify a CMEK. Neither can be changed after creation. They can be upgraded to use analytics (Observability Analytics, SQL).
- Log views: every bucket gets an `_AllLogs` view with every entry; you control access to a view with IAM. Every bucket also has a default log view.
- Logs Explorer has a scope setting (project, log bucket, or log view); Observability Analytics queries log views and analytics views of buckets upgraded to use analytics.
- Locking a user-defined log bucket against updates is irreversible; a locked bucket can't be deleted.
- Access can also be controlled with tags (grant edit access by group, prevent deletion), field-level access on a bucket, and log views.
- Regions: see region-support.md. Global, `eu`, and `us` buckets are not redundantly spread across zones; other regions are.
- Data loss: deleting a bucket or shortening retention removes stored entries; try on a disposable project first.
- Source: https://docs.cloud.google.com/logging/docs/store-log-entries (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [region-support.md](./region-support.md)
- [default-settings.md](./default-settings.md)
- [access-control.md](./access-control.md)
- [log-entry-data-model.md](./log-entry-data-model.md)
