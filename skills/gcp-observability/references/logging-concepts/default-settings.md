---
source: https://docs.cloud.google.com/logging/docs/default-settings
---

# Default resource settings for Cloud Logging

For organizations and folders, default resource settings control where new system-created log buckets are stored, whether they require CMEK, and how the `_Default` log sink routes logs. Child resources inherit them. Settings apply only to resources created after the configuration; existing resources are unchanged. They don't apply to observability buckets (see "Set defaults for observability buckets" in the Observability docs).

## Signature / Usage

Required permissions on the organization or folder: `logging.settings.get` and `logging.settings.update`. Configure with the gcloud CLI (or the API methods `getSettings` / `updateSettings`).

### View the settings

```none
gcloud logging settings describe --folder=FOLDER_ID
```

```none
gcloud logging settings describe --organization=ORGANIZATION_ID
```

```text
name: organizations/ORGANIZATION_ID/settings
kmsKeyName: KMS_KEY_NAME
kmsServiceAccountId: SERVICE_ACCT_NAME@gcp-sa-logging.iam.gserviceaccount.com
storageLocation: europe-west1
disableDefaultSink: false
```

### Set the storage location for new `_Default` / `_Required` buckets

```none
gcloud logging settings update --folder=FOLDER_ID --storage-location=LOCATION
```

```none
gcloud logging settings update --organization=ORGANIZATION_ID --storage-location=LOCATION
```

### Disable and re-enable the `_Default` sink for new resources

```none
gcloud logging settings update --folder=FOLDER_ID --disable-default-sink
```

```none
gcloud logging settings update --organization=ORGANIZATION_ID --disable-default-sink
```

```none
gcloud logging settings update --folder=FOLDER_ID --no-disable-default-sink
```

```none
gcloud logging settings update --organization=ORGANIZATION_ID --no-disable-default-sink
```

### Configure the filters of new `_Default` sinks (`updateSettings`)

Call `updateSettings` with name `organizations/ORGANIZATION_ID/settings` and updateMask `default_sink_config`.

Adapted (not in the official docs): the source's request body is not valid JSON (stray braces, missing commas, split string literals, unquoted `OVERWRITE`); rewritten as a valid `Settings` body with the same filter, exclusion, and mode.

```json
{
  "defaultSinkConfig": {
    "filter": "NOT LOG_ID(\"externalaudit.googleapis.com/activity\") AND NOT LOG_ID(\"cloudaudit.googleapis.com/system_event\") AND NOT LOG_ID(\"externalaudit.googleapis.com/system_event\") AND NOT LOG_ID(\"cloudaudit.googleapis.com/access_transparency\") AND NOT LOG_ID(\"externalaudit.googleapis.com/access_transparency\")",
    "exclusions": [
      {
        "name": "exclude-data-access",
        "description": "Prevents Data Access audit logs from being routed",
        "filter": "log_id(\"cloudaudit.googleapis.com/data_access\")"
      }
    ],
    "mode": "OVERWRITE"
  }
}
```

## Options / Props

### What the settings control

| Setting | Behavior |
|---|---|
| CMEK (`kmsKeyName`) | Whether new log buckets are encrypted with a customer-managed key and which Cloud KMS key. Can't be changed after bucket creation. If a CMEK is set, the settings must also set the storage location, matching the Cloud KMS key location. |
| `storageLocation` | Location of new `_Default` and `_Required` buckets and of queries saved by Logs Explorer / Observability Analytics (including recent queries). Can't be changed after creation. A location without CMEK means new buckets don't require CMEK. Doesn't apply to user-defined buckets or queries saved through the Logging API. |
| `disableDefaultSink` | Whether the `_Default` sink is disabled for new resources. |
| `defaultSinkConfig` | Inclusion filter and exclusion filters applied to new `_Default` sinks. |

### `defaultSinkConfig.mode` values

| Value | Meaning |
|---|---|
| `OVERWRITE` | `filter` overwrites the built-in `_Default` sink filter (filter can't be empty). |
| `APPEND` | `filter` is appended to the built-in filter; an empty filter keeps it unchanged. |

## Notes

- Disabling `_Default` sinks removes log storage: logs that would have gone to `_Default` are excluded from storage unless included by another user-defined sink. Exclusion filters likewise stop storing matching logs. Try on a disposable project first. The `disable-default-sink` flag affects only the sink routing into the `_Default` bucket.
- Organization policy: if `constraints/gcp.resourceLocations` exists, its values must include the location set here; review it before updating settings.
- You can't use this process to change the filter of an existing `_Default` sink.
- Name each exclusion filter if you want the `_Default` sink shown on the Logs Router page; otherwise view the sink via API or CLI.
- The built-in inclusion filter contains `AND NOT LOG_ID("externalaudit.googleapis.com/activity")`, which keeps Admin Activity audit logs out of `_Default`; the example removes that clause so they are routed, and excludes Data Access audit logs.
- Corrected from the official docs: the original body read `"defaultSinkConfig": { { "filter": "NOT LOG_ID(...) " "AND NOT LOG_ID(...)", ... "mode": OVERWRITE } }`, which is not valid JSON.
- `kmsServiceAccountId` may look like `cmek-12345` or `service-12345@...`. CMEK setup is in "Configure CMEK for Logging".
- Example in the source: an organization sets a location and a folder sets a different one; new projects in the folder use the folder's location, other projects use the organization's. A folder that sets only a location (no CMEK) yields new buckets that aren't CMEK-encrypted even if the organization sets a location and CMEK.
- The source also shows Cloud Shell activation and Console steps for Organization Policies.
- Source: https://docs.cloud.google.com/logging/docs/default-settings (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [store-log-entries.md](./store-log-entries.md)
- [region-support.md](./region-support.md)
- [access-control.md](./access-control.md)
