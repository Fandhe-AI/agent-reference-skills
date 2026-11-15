---
source: https://docs.cloud.google.com/scheduler/docs/configuring/cron-job-schedules
---

# Cron job format and time zone

Schedules use the unix-cron format (five fields), evaluated in a configurable time zone (default `UTC`). A human-readable groc format is also supported through gcloud or the API.

## Signature / Usage

### Field order

```text
|--- Minute (0-59)
|     |--- Hour (0-23)
|     |     |--- Day of the month (1-31)
|     |     |     |--- Month (1-12; or JAN to DEC)
|     |     |     |     |--- Day of the week (0-6; or SUN to SAT; or 7 for Sunday)
|     |     |     |     |
|     |     |     |     |
*     *     *     *     *
```

### Alternative (groc) format

```text
03 of month 12:34
1,3,4,7,11,18,29 of jan,jul 12:34
1st friday of quarter 9:00
1st,third monday of month 04:00
2nd,3rd tue,wed,thu of feb,aug 13:50
every 336 hours
every 48 hours
every 5 minutes
every 60 minutes on mon,wed
every day 09:00
every minute
every sun,tue,thu 9:00
every wed of december 00:00
first sunday of month 12:00
second,4th tue,thursday of 3rd month of quarter 18:30
```

## Options / Props

### Fields

| Field | Valid values |
|---|---|
| Minute | 0-59 |
| Hour | 0-23 |
| Day of the month | 1-31 (`L` for last day is not supported) |
| Month | 1-12 or JAN to DEC (uppercase) |
| Day of the week | 0-6 or SUN to SAT; 7 is Sunday |

Day of month and day of week are evaluated as an inclusive OR unless one is `*` (unrestricted): day of month `1` and day of week `SAT` runs on the 1st and on every Saturday; with day of week `*` it runs only on the 1st.

### Operators

| Operator | Meaning | Example |
|---|---|---|
| `*` | All valid values | `* * * * *` every minute |
| `-` | Inclusive range, no spaces, first less than second | `0 0 * * 1-5`, `0 0 * * MON-FRI` |
| `,` | List, no spaces | `0 0,12 * * *` midnight and noon |
| `/` | Step; cannot exceed the field's largest value; default 1 | `*/2 * * * *` every two minutes; `0 0-12/2 * * *` every two hours midnight to noon |

With `*` the first value is 0 for minute, hour and day of week, and 1 for day of month and month.

### Sample schedules

| Schedule | Cron format |
|---|---|
| Every minute | `* * * * *` |
| Every hour | `0 * * * *` |
| Every day | `0 0 * * *` |
| Every weekday (Mon-Fri) | `0 0 * * 1-5` or `0 0 * * MON-FRI` |
| Every week | `0 0 * * 0`, `0 0 * * 7` or `0 0 * * SUN` |
| Every month | `0 0 1 * *` |
| Every quarter | `0 0 1 1,4,7,10 *` or `0 0 1 JAN,APR,JUL,OCT *` |
| Every year | `0 0 1 1 *` or `0 0 1 JAN *` |

### Time zone

| Item | Rule |
|---|---|
| Console | Choose **Timezone** on the Create a job page |
| gcloud | `--time-zone` flag when creating the job |
| Value | tz database time zone name |
| Default | `UTC` |

The value is a time zone name from the tz database (https://en.wikipedia.org/wiki/List_of_tz_database_time_zones), for example `--time-zone=America/Los_Angeles` as used in the Cloud Run manual-scaling guide; the `gcloud scheduler jobs create http` help lists the flag as `--time-zone=TIME_ZONE; default="Etc/UTC"`.

## Notes

- Cloud Scheduler runs on wall clock time, so daylight saving time can make jobs run or not run unexpectedly; for an exact cadence use a zone without DST. UTC is recommended.
- If the Cloud Scheduler API is disabled and re-enabled, jobs that failed to run in the interim run immediately, not at the next scheduled time.
- groc schedules require gcloud or the API (not the Console), and Cloud Scheduler does not send the `X-CloudScheduler-ScheduleTime` header for them; use unix-cron if your handler deduplicates with that header.
- A `cron.yaml` file is still supported for existing jobs but no longer recommended.
- The source's gcloud `--time-zone` link points to `gcloud scheduler jobs create http`; no full command is shown on this page.
- Source inconsistency: this page calls the value "the time zone abbreviation used in the tz database" with default `UTC`; the gcloud help says it "must be a time zone name from the tz database", shows `default="Etc/UTC"` in the synopsis, and also says `For UTC use the string "utc". Default is "utc".`
- Source: https://docs.cloud.google.com/scheduler/docs/configuring/cron-job-schedules (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/scheduler/jobs/create/http (`--time-zone` flag; gcloud CLI help, retrieved 2026-11-15)
- Source: https://docs.cloud.google.com/run/docs/configuring/services/manual-scaling (`America/Los_Angeles` example; retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)

## Related

- [creating.md](./creating.md)
- [retry-jobs.md](./retry-jobs.md)
- [troubleshooting.md](./troubleshooting.md)
