---
source: https://docs.cloud.google.com/alloydb/docs/maintenance-windows
---

# View and set maintenance times

Set, view or clear maintenance windows, monitor upcoming maintenance, opt in to email notifications, and configure or remove deny maintenance periods on AlloyDB for PostgreSQL primary and secondary clusters.

## Signature / Usage

### Set a maintenance window

Changes made while the cluster is under or scheduled for maintenance take effect only after that maintenance completes. On a new cluster, add the same two flags to `gcloud alloydb clusters create`.

```bash
gcloud alloydb clusters update CLUSTER_ID \
  --region LOCATION_ID \
  --maintenance-window-day DAY_OF_WEEK \
  --maintenance-window-hour HOUR_OF_DAY
```

### Clear a maintenance window

```bash
gcloud alloydb clusters update CLUSTER_ID \
  --region LOCATION_ID \
  --maintenance-window-any
```

### View the maintenance window

```bash
gcloud alloydb clusters describe CLUSTER_ID \
  --region LOCATION_ID
```

With a window set, the output includes the following; without a `maintenanceUpdatePolicy` section, no window is set.

```yaml
maintenanceUpdatePolicy:
  maintenanceWindows:
  - day: TUESDAY
    startTime:
      hours: 23
```

### View upcoming maintenance

Run the same `gcloud alloydb clusters describe` command. If maintenance is planned, the output includes the UTC time at which AlloyDB plans to start updating all nodes:

```yaml
maintenanceSchedule:
  startTime: 2024-07-03T09:46:40Z
```

### Add a deny maintenance period (gcloud)

```bash
gcloud alloydb clusters update CLUSTER_ID \
   --region LOCATION_ID \
   --deny-maintenance-period-start-date START_DATE \
   --deny-maintenance-period-end-date END_DATE \
   --deny-maintenance-period-time TIME
```

### Add a deny maintenance period (REST v1)

```text
PATCH https://alloydb.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION_ID/clusters/CLUSTER_ID?update_mask=maintenance_update_policy.deny_maintenance_periods
```

```json
{
 "maintenanceUpdatePolicy": {
   "denyMaintenancePeriods": [
     {
       "startDate": {
         "year": START_YEAR,
         "month": START_MONTH,
         "day": START_DAY
       },
       "endDate": {
         "year": END_YEAR,
         "month": END_MONTH,
         "day": END_DAY
       },
       "time": {
         "hours": HOURS,
         "minutes": MINUTES
       }
     }
   ]
 }
}
```

### Remove a deny maintenance period

```bash
gcloud alloydb clusters update CLUSTER_ID --region LOCATION_ID  --remove-deny-maintenance-period
```

REST v1: send the same `PATCH` URL as above with an empty body `{}`.

```json
{}
```

## Options / Props

| Placeholder | Description |
|---|---|
| `CLUSTER_ID` | The cluster. |
| `LOCATION_ID` | Region of the cluster, e.g. `us-central1`. |
| `DAY_OF_WEEK` | UTC day: `MONDAY`, `TUESDAY`, `WEDNESDAY`, `THURSDAY`, `FRIDAY`, `SATURDAY`, `SUNDAY`. Default is **Any window**, assigned at cluster creation. |
| `HOUR_OF_DAY` | Integer `0` to `23`, UTC. |
| `START_DATE` / `END_DATE` | `YYYY-MM-DD`, UTC. |
| `TIME` | `HH:MM` UTC, 24-hour, `00:00` to `23:59`, e.g. `16:45`. |
| `START_YEAR`, `START_MONTH`, `START_DAY`, `END_YEAR`, `END_MONTH`, `END_DAY` | REST date parts (`YYYY`, `MM`, `DD`); leading zeros optional. |
| `HOURS` / `MINUTES` | REST time of day; hours 24-hour (leading zero optional), minutes `0` to `59`. |
| `PROJECT_ID` | Project of the cluster (REST). |

### Deny maintenance periods

- A period spans one to 30 days; start date, end date and time of day are UTC.
- Requires a cluster running the latest AlloyDB version; older clusters can use self-service maintenance (https://docs.cloud.google.com/alloydb/docs/self-service-maintenance) first. Existing deny periods don't block self-service maintenance.
- Deny periods take precedence over scheduled maintenance. A conflicting deny period doesn't immediately clear the schedule; the event stays listed as upcoming but is canceled when its scheduled time starts.
- The system typically doesn't allow a deny period to skip more than one maintenance event and may in rare cases apply emergency maintenance outside configured preferences.

### Email notifications

Disabled by default. Opt in through the console (Overview > Maintenance > Notifications row > Edit > Communication > AlloyDB, Maintenance window, Email toggle). You get a notification when an event is scheduled or canceled for a cluster with a window; events are scheduled at least one week ahead. Enabled per Google Cloud project (can't choose a subset of clusters) and per user.

## Notes

- Before you begin: for maintenance and updates to create temporary replication slots, the total number of replication slots must be at least one less than the `max_wal_senders` limit (https://docs.cloud.google.com/alloydb/docs/cluster-upgrade#configure-source-instances).
- The source also shows Console steps for set / clear / view / upcoming maintenance.
- Managed PostgreSQL-compatible database on Google Cloud, distinct from Supabase Postgres (`supabase`), Cloudflare D1 / Hyperdrive (`cloudflare-storage`), and the Node.js client `mssql` / ORM `drizzle` (those skills cover client code, not the managed service).
- Source: https://docs.cloud.google.com/alloydb/docs/maintenance-windows (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [maintenance.md](./maintenance.md)
- [instance-configure-database-flags.md](./instance-configure-database-flags.md)
- gcloud alloydb clusters update: https://docs.cloud.google.com/sdk/gcloud/reference/alloydb/clusters/update
- Staging cluster: https://docs.cloud.google.com/alloydb/docs/manage-maintenance-updates-staging-cluster
