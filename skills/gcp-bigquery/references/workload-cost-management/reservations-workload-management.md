---
source: https://docs.cloud.google.com/bigquery/docs/reservations-workload-management
---

# Understand reservations

Reservations group slots into isolated pools to manage capacity and isolate workloads. This page covers assignments, job types, administration projects, project caps, commitments and renewal, limitations, reservation predictability, reservation groups, and troubleshooting.

## Signature / Usage

### Assign a project to a reservation

Snippet taken from https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/data-definition-language (the page shows no code). Set `reservation_id` to `none` to use on-demand billing for a project.

```sql
CREATE ASSIGNMENT `admin_project.region-us.prod.my_assignment`
OPTIONS (
  assignee = 'projects/my_project',
  job_type = 'QUERY');
```

### Purchase a capacity commitment

Snippet taken from the same page. Commitments cannot be deleted once created; set the renewal plan to `NONE` and the commitment is deleted after it expires.

```sql
CREATE CAPACITY `admin_project.region-us.my-commitment`
OPTIONS (
  slot_count = 100,
  plan = 'ANNUAL');
```

## Options / Props

### Assignment job types

| Job type | Used for | Edition note |
|---|---|---|
| `QUERY` | Non-continuous query jobs: SQL, DDL, DML, BigQuery ML (built-in models) | All |
| `AUTOMATIC_MATERIALIZED_VIEW_REFRESH` | Automatic materialized view refresh | — |
| `BACKGROUND_CHANGE_DATA_CAPTURE` | Own-reservation BigQuery CDC ingestion background jobs | Not in Standard |
| `BACKGROUND_COLUMN_METADATA_INDEX` | Own-reservation BigLake metadata caching background jobs; Datastream background apply | Not in Standard |
| `BACKGROUND_SEARCH_INDEX_REFRESH` | Own-reservation search index management background jobs | Not in Standard |
| `BACKGROUND` | Datastream background apply; fallback for the three background types above | Not in Standard |
| `CONTINUOUS` | Continuous query jobs | — |
| `ML_EXTERNAL` | BigQuery ML `CREATE MODEL` queries using external services | Not in Standard |
| `PIPELINE` | Load and extract jobs (leaves the free shared pool when assigned) | — |

### Project caps (scheduling policies)

| Cap | Behavior |
|---|---|
| Maximum slots | Approximate cap on slot consumption of the assignee project within the reservation; minimum value 100 |
| Maximum concurrency | Limits simultaneous queries admitted; applied only at admission, running queries are not canceled |

### Commitment plans and renewal

| Item | Value |
|---|---|
| Increment | 50 slots, up to the regional slot quota |
| Annual | 365 days |
| Three-year | 3 years (1,095 days) |
| Renewal plans | `None` (commitment removed after term), Annual, Three-Year; changeable until expiry |
| Renewal delay | Renewed record can take up to roughly one hour to appear; no on-demand charges in that period |

### Reservation predictability (`scaling_mode`)

| Capacity combination | Slot capacity | `scaling_mode` |
|---|---|---|
| Baseline + idle | > 0 | `IDLE_SLOTS_ONLY` |
| Baseline + idle + autoscaling | > 0 | `ALL_SLOTS` |
| Baseline + autoscaling | > 0 | `AUTOSCALE_ONLY` |
| Idle + autoscaling | 0 | `ALL_SLOTS` |
| Idle | 0 | `IDLE_SLOTS_ONLY` |

### Reservation limitations

| Limit |
|---|
| Maximum 10 administration projects with active reservations per organization in a single location |
| Reservation groups: up to 10 per administration project per location (increase via Cloud Customer Care) |
| Idle capacity cannot be shared across organizations, administration projects, regions, or editions |
| Commitments and reservations are regional; a commitment in `EU` cannot back a reservation in `europe-west4` |
| Commitments and reservations cannot be moved between regions or administration projects; commitments of one edition cannot be used by another edition |
| Autoscaled slots are not shareable |

## Notes

- Projects use the single most specific reservation: a project assignment overrides a folder assignment, which overrides an organization assignment. Without an assigned or inherited reservation, jobs use on-demand pricing. Assigning to `None` always uses on-demand pricing.
- Flexible assignment: specify a reservation at query runtime (CLI, UI, SQL, or API) in the same region; requires the `bigquery.reservations.use` permission (included in `roles/bigquery.resourceAdmin` and `roles/bigquery.resourceEditor`); an Enterprise Plus default can be overridden only with an Enterprise Plus reservation. IAM conditions on the administration project can restrict `bigquery.reservations.use` by reservation name.
- Create a dedicated administration project (for example `bq-COMPANY_NAME-admin`); only projects in the same Organization can be assigned; reservations and commitments cannot move to another administration project. The administration project is billed for committed slots.
- `PIPELINE` assignment removes load and extract jobs from the free shared pool (shown as `default-pipeline`); monitor capacity. Without `BACKGROUND` assignments, CDC background jobs (job ID contains `queueworker_cdc_background_merge_coalesce`) use on-demand pricing.
- Project cap changes take up to one minute; modifying a per-project maximum slots override needs a new query to start.
- Warning from the source: canceling or letting a commitment expire does not delete reservations or assignments; reservations with baseline slots keep incurring pay-as-you-go slot-hour charges until you delete all reservations and assignments. Commitment financial obligations cannot be canceled monthly. Try deletions on a disposable setup first.
- Reservation predictability requires reservation fairness; it is available only with Enterprise and Enterprise Plus unless `AUTOSCALE_ONLY`; it is best-effort. `max_slots` must be positive and greater than baseline, and you cannot set `autoscale_max_slots` together with it. `ignore_idle_slots` must be false for `ALL_SLOTS` / `IDLE_SLOTS_ONLY` and true for `AUTOSCALE_ONLY`.
- Reservation groups require reservation-based fairness, same project, region, and edition, and a consistent managed disaster recovery configuration (same primary / secondary regions). Idle sharing order: own baseline, within-group idle, project-level idle pool, then autoscaled slots. Autoscaled slots are never shared.
- On-demand soft slot cap: 2,000 slots. Use the slot estimator after at least seven days of running workloads.
- Troubleshooting: allocation errors such as `Failed to allocate slots for reservation in the current system state` are usually transient (retry with fewer slots, wait 15 minutes, contact Cloud Customer Care after 30 minutes); `There is insufficient quota to complete this request` means the regional quota is exceeded. A job may not use a reservation if the table and reservation regions differ, if it queries BigQuery Omni tables with a reservation in the colocated BigQuery region, if no assignment exists, if the job type mismatches (for example `PIPELINE` for queries), for multi-statement parent jobs (check child jobs), for cached results, or for `ML_EXTERNAL` models without an `ML_EXTERNAL` assignment.
- The official `CREATE CAPACITY` example omits `edition`, which is optional in the DDL and REST references; commitments are edition-specific, so set `edition` (for example `edition = 'ENTERPRISE'`) in `OPTIONS` to bind the commitment to an edition.
- The source writes the permission as `reservations.use`; its full IAM name is `bigquery.reservations.use`.
- Source: https://docs.cloud.google.com/bigquery/docs/reservations-workload-management (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)
- Snippets taken from https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/data-definition-language (retrieved 2026-11-19).

## Related

- [slots.md](./slots.md)
- [editions-intro.md](./editions-intro.md)
- [best-practices-costs.md](./best-practices-costs.md)
