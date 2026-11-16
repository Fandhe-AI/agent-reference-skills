---
source: https://docs.cloud.google.com/sql/docs/postgres/maintenance
---

# About maintenance on Cloud SQL instances

How Cloud SQL maintenance updates the database engine and sometimes the operating system, how long it takes, and how to control timing with maintenance timing, maintenance windows, deny maintenance periods, rescheduling and self-service maintenance. Enterprise Plus edition instances get near-zero downtime planned maintenance.

## Signature / Usage

### Simulate near-zero downtime planned maintenance (Enterprise Plus, primary only)

The simulation results in an instance update operation to the same maintenance version. It can run while a maintenance update is pending.

```bash
gcloud sql instances patch INSTANCE_NAME --simulate-maintenance-event
```

Replace `INSTANCE_NAME` with the name of the instance where you want to run the simulated maintenance event.

### Maintenance workflow (maintenance failover)

1. Set up an updated VM with the new software.
2. Stop the database on the original VM (ongoing transactions get a few seconds to commit, then open or long-running transactions are rolled back and connections dropped).
3. Switch over the disk and static IP to the updated VM (database cache is cleared).
4. Start the database on the updated VM (crash recovery runs if needed).

## Options / Props

### Maintenance impact

| Item | Value |
|------|-------|
| Frequency | Typically once every few months |
| Duration | Approximately 5 to 10 minutes per instance (longer overall with read replicas) |
| Connectivity loss, Enterprise edition | Less than 30 seconds on average |
| Connectivity loss, Enterprise Plus near-zero downtime | Typically less than 1 second |
| Skipped when | Disk usage is higher than 97% |
| Canceled when | An instance operation (for example an export) is ongoing at the scheduled start |

### Maintenance settings

| Setting | Values / limits |
|---------|-----------------|
| Maintenance timing (previously Order of update) | `Any` (typically Week 1); `Week 1` = 7 to 14 days after the notification; `Week 2` = 15 to 21 days; `Week 5` = 35 to 42 days |
| Maintenance window | Day of week and hour; lasts one hour |
| Deny maintenance period | 1 to 90 days; recurs yearly if the year is omitted from start and end dates |

Default windows (instance time zone) when none is set: weekday Monday to Friday 10 PM to 6 AM; weekend Friday 10 PM to Monday 6 AM.

### Near-zero downtime constraints

- Read replicas aren't supported.
- Update Cloud SQL Auth Proxy and Language Connectors to the latest version.
- Unlogged tables are empty after planned maintenance.
- Logs contain messages from two different VMs; DDL during maintenance can have timestamps after the maintenance timestamp.

### Rescheduling

- Allowed up to 24 hours before the scheduled maintenance; one instance at a time (no bulk).
- Maximum postponement: 28 days for Week 1 or Week 2 timing, 7 days for Week 5 timing. Can reschedule multiple times within that limit.
- Options: apply updates immediately (generally starts within five minutes), next available window (typically one week later), or a specific time within the limit.
- Rescheduling can land inside a deny period or outside the window; if a maintenance operation is in progress, rescheduling waits for it.

### Deny maintenance period rules

- From August 15, 2025 you can't set one if the instance maintenance version is older than 12 months (find it with `gcloud sql instances describe`; a name like `POSTGRES_16_9.R20250302.00_31` means March 2, 2025). Update first via self-service maintenance or the next window.
- It overrides the maintenance window, applies to all read replicas of the primary (including other regions), and is independent of maintenance timing.
- Setting it after maintenance is scheduled skips an overlapping update; it persists across stop, start and restart; it doesn't affect user-triggered operations such as self-service maintenance.

### Notifications

Opt-in only (not sent by default); requires a maintenance window; sent at least one week ahead to the Google Account email, one per instance, none for read replicas. Events: upcoming, started, completed, canceled. Also visible in the console Maintenance column and Logs Explorer log name `maintenance-events`.

### FAQ highlights

| Question | Answer |
|----------|--------|
| SLA | Normal maintenance downtime doesn't count; time-sensitive maintenance does |
| Read replicas | Maintained before the primary; share the primary's window and deny period; some may update simultaneously |
| Cancel scheduled maintenance | Not possible; reschedule or overlap a deny period |
| Cumulative | Yes; the latest version is applied at the next update |
| Instance stopped during maintenance | Update skipped, applied automatically at next start |
| Self-service on a single replica | Allowed, but keep replicas and primary on the same version |

## Notes

- Minimize impact with connection pools, fewer long-running transactions, and retry logic with exponential back-off.
- Maintenance interrupts the instance; test planned maintenance on a disposable or staging instance first.
- Cloud SQL / AlloyDB here means managed PostgreSQL on Google Cloud — distinct from Supabase Postgres (`supabase`), Cloudflare D1 / Hyperdrive (`cloudflare-storage`), and the `mssql` / `drizzle` client skills.
- The source also shows a Console flow, diagrams and the FAQ anchors (omitted).
- Source inconsistency: this page gives less than 30 seconds of connectivity loss on average (Enterprise edition), while https://docs.cloud.google.com/sql/docs/postgres/use-system-insights says an instance under maintenance is typically unavailable 1 to 3 minutes.
- Source: https://docs.cloud.google.com/sql/docs/postgres/maintenance (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [known-issues.md](./known-issues.md)
- [troubleshooting.md](./troubleshooting.md)
