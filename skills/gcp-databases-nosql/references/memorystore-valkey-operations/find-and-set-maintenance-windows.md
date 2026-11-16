---
source: https://docs.cloud.google.com/memorystore/docs/valkey/find-and-set-maintenance-windows
---

# Find and set maintenance windows

Create an instance with a maintenance window, set or remove a preferred window, turn on maintenance notifications, find scheduled maintenance, and reschedule it, with the Google Cloud console or gcloud.

## Signature / Usage

### Create an instance with a maintenance window

Complete "Before you begin" and "Set up networking" in https://docs.cloud.google.com/memorystore/docs/valkey/create-instances first.

```bash
gcloud memorystore instances create INSTANCE_ID \
--project=PROJECT_ID \
--location=REGION_ID \
--psc-auto-connections=network=projects/PROJECT_ID/global/networks/NETWORK_ID \
--shard-count=SHARD_COUNT \
--maintenance-policy-weekly-window=day=DAY,startTime=hours=HOUR
```

For example:

```bash
gcloud memorystore instances create my-instance \
--project=my-project \
--location=us-central1 \
--psc-auto-connections=network=projects/my-project/global/networks/default \
--shard-count=8 \
--maintenance-policy-weekly-window=day=MONDAY,startTime=hours=9
```

### Set a preferred maintenance window

```bash
gcloud memorystore instances update INSTANCE_ID \
--project=PROJECT_ID \
--location=REGION_ID \
--maintenance-policy-weekly-window=day=DAY,startTime=hours=HOUR
```

### Find the scheduled maintenance

```bash
gcloud memorystore instances describe INSTANCE_ID \
--project=PROJECT_ID \
--location=REGION_ID
```

Output for scheduled maintenance:

```yaml
maintenancePolicy:
  weeklyMaintenanceWindow:
  - day: DAY
      duration: 3600 seconds
  - startTime
       hour: HOUR
maintenanceSchedule:
  endTime: 'END_DATE_AND_TIME_STAMP'
  scheduleDeadlineTime: 'SCHEDULED_DATE_AND_TIME_STAMP'
  startTime: 'START_DATE_AND_TIME_STAMP'
```

### Reschedule maintenance

Adapted (not in the official docs): the source writes `--reschedule-type=RESCHEDULE_TYPE [--schedule-time=RESCHEDULE_TIME]`, and gcloud rejects the bracketed template as an unrecognized argument; it is split into one command per reschedule type. Start the update immediately:

```bash
gcloud memorystore instances reschedule-maintenance INSTANCE_ID \
--project=PROJECT_ID \
--location=REGION_ID \
--reschedule-type=IMMEDIATE
```

Adapted (not in the official docs): the optional `--schedule-time` from the same template, used with `SPECIFIC_TIME`.

```bash
gcloud memorystore instances reschedule-maintenance INSTANCE_ID \
--project=PROJECT_ID \
--location=REGION_ID \
--reschedule-type=SPECIFIC_TIME \
--schedule-time=RESCHEDULE_TIME
```

### Remove a maintenance policy (revert to the service default)

```bash
gcloud memorystore instances update INSTANCE_ID \
--project=PROJECT_ID \
--location=REGION_ID \
--clear-maintenance-policy-weekly-window
```

### Turn on maintenance notifications

Console only: instance page, **Maintenance** card, **Edit notification preferences**, **Product Notifications**, select the project, toggle the email button to **ON** in the Memorystore row.

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| INSTANCE_ID | string | Instance ID: 1 to 63 characters, lowercase letters, numbers or hyphens; starts with a lowercase letter, ends with a lowercase letter or number |
| PROJECT_ID | string | Project ID or number |
| REGION_ID | string | Region; only supported regions for Memorystore for Valkey |
| NETWORK_ID | string | Network used to create the instance |
| SHARD_COUNT | integer | Number of shards; determines total memory capacity |
| DAY | enum | `MONDAY` - `SUNDAY` |
| HOUR | integer | Hour of day in UTC when the window starts: `0` - `23` |
| RESCHEDULE_TYPE | enum | `IMMEDIATE`: start the update immediately. `SPECIFIC_TIME`: no more than 14 days from the original maintenance window |
| RESCHEDULE_TIME | ISO 8601 | Only with `SPECIFIC_TIME`, UTC, for example `2025-02-16T16:56:00.000Z` |

Output fields: `weeklyMaintenanceWindow` (`DAY`, `HOUR` in UTC), `maintenanceSchedule` (`startTime`, `endTime`, `scheduleDeadlineTime`).

## Notes

- By default, an instance created with maintenance windows has in-transit encryption deactivated and authorized network `default`.
- Notifications are set at the project level, not on instances; each email address that needs them must opt in separately; they go to the Google Account email (no custom alias). The link is deactivated if no maintenance is scheduled.
- Reschedule up to two weeks from the original time. Bulk rescheduling is possible programmatically only; batch at most 100 instances per request and wait between requests, otherwise rescheduling events might fail.
- Corrected from the official docs: `--reschedule-type=RESCHEDULE_TYPE [--schedule-time=RESCHEDULE_TIME]` (square-bracket optional-flag template inside the command).
- `--psc-auto-connections` is marked "Deprecated: Use the endpoints.connections.psc_auto_connection value instead." in the gcloud help (SDK 593.0.0); the create-instances page (https://docs.cloud.google.com/memorystore/docs/valkey/create-instances) uses `--endpoints`.
- Rescheduling with `IMMEDIATE` starts the maintenance update right away; try it on a disposable instance first.
- The source also shows Console steps for every task.
- Source: https://docs.cloud.google.com/memorystore/docs/valkey/find-and-set-maintenance-windows (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [about-maintenance.md](./about-maintenance.md)
- [self-service-maintenance.md](./self-service-maintenance.md)
