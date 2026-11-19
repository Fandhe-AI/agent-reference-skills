---
source: https://docs.cloud.google.com/bigquery/docs/default-configuration
---

# Manage default configuration settings

Organization-level and project-level default settings (location, time zone, KMS key, query timeouts and queue timeouts, time travel window, storage billing model, and more), set with `ALTER ORGANIZATION SET OPTIONS` / `ALTER PROJECT SET OPTIONS` and read from `INFORMATION_SCHEMA` option views. Session and job settings can override them.

## Signature / Usage

### Global setting: `default_location` (organization)

Set (run in the query editor, or pass as the query to `bq query --use_legacy_sql=false`, or send as `query` in `jobs.query`):

```sql
ALTER ORGANIZATION
SET OPTIONS (
`default_location` = 'LOCATION'
);
```

Remove:

```sql
ALTER ORGANIZATION
SET OPTIONS (
`default_location` = NULL
);
```

### Global setting: `default_location` (project)

`PROJECT_ID` is optional; without it the statement applies to the project where it runs.

```sql
ALTER PROJECT PROJECT_ID
SET OPTIONS (
`default_location` = 'LOCATION'
);
```

```sql
ALTER PROJECT PROJECT_ID
SET OPTIONS (
`default_location` = NULL
);
```

Removing it falls back to the organization-level default, if one exists, or the system default.

### Regional organization settings

Every option carries a `region-REGION.` prefix; one region per statement, the same `REGION` for each option. The doc example uses time zone `America/Chicago`, query timeout 30 minutes, interactive queue timeout 10 minutes, batch queue timeout 20 minutes:

```sql
ALTER ORGANIZATION
SET OPTIONS (
`region-REGION.default_time_zone`= 'America/Chicago',
-- Ensure all service accounts under the organization have permission to KMS_KEY
`region-REGION.default_kms_key_name` = KMS_KEY,
`region-REGION.default_query_job_timeout_ms` = 1800000,
`region-REGION.default_interactive_query_queue_timeout_ms` = 600000,
`region-REGION.default_batch_query_queue_timeout_ms` = 1200000,
`region-REGION.enable_info_schema_storage` = true);
```

Remove:

```sql
ALTER ORGANIZATION
SET OPTIONS (
`region-REGION.default_time_zone` = NULL,
`region-REGION.default_kms_key_name` = NULL,
`region-REGION.default_query_job_timeout_ms` = NULL,
`region-REGION.default_interactive_query_queue_timeout_ms` = NULL,
`region-REGION.default_batch_query_queue_timeout_ms` = NULL,
`region-REGION.enable_info_schema_storage` = NULL);
```

### Regional project settings

The doc example uses time zone `America/Los_Angeles`, query timeout 1 hour, interactive queue timeout 10 minutes, batch queue timeout 20 minutes, reservation-based fairness and global queries enabled:

```sql
ALTER PROJECT PROJECT_ID
SET OPTIONS (
`region-REGION.default_time_zone` = 'America/Los_Angeles',
-- Ensure all service accounts under the project have permission to KMS_KEY
`region-REGION.default_kms_key_name` = KMS_KEY,
`region-REGION.default_query_job_timeout_ms` = 3600000,
`region-REGION.default_interactive_query_queue_timeout_ms` = 600000,
`region-REGION.default_batch_query_queue_timeout_ms` = 1200000,
`region-REGION.enable_reservation_based_fairness` = true,
`region-REGION.enable_global_queries_execution` = true,
`region-REGION.enable_global_queries_data_access` = true,
`region-REGION.enable_info_schema_storage` = true);
```

Remove:

```sql
ALTER PROJECT PROJECT_ID
SET OPTIONS (
`region-REGION.default_time_zone` = NULL,
`region-REGION.default_kms_key_name` = NULL,
`region-REGION.default_query_job_timeout_ms` = NULL,
`region-REGION.default_interactive_query_queue_timeout_ms` = NULL,
`region-REGION.default_batch_query_queue_timeout_ms` = NULL,
`region-REGION.enable_reservation_based_fairness` = false,
`region-REGION.enable_global_queries_execution` = NULL,
`region-REGION.enable_global_queries_data_access` = NULL,
`region-REGION.enable_info_schema_storage` = NULL);
```

### Retrieve settings

```sql
SELECT * FROM INFORMATION_SCHEMA.ORGANIZATION_OPTIONS;
```

```sql
SELECT
    option_value
FROM INFORMATION_SCHEMA.ORGANIZATION_OPTIONS
WHERE option_name = 'default_location'
```

```sql
SELECT * FROM INFORMATION_SCHEMA.EFFECTIVE_PROJECT_OPTIONS;
```

```sql
SELECT
    option_value
FROM INFORMATION_SCHEMA.EFFECTIVE_PROJECT_OPTIONS
WHERE option_name = 'default_location'
```

```sql
SELECT * FROM INFORMATION_SCHEMA.PROJECT_OPTIONS;
```

```sql
SELECT
    option_value
FROM INFORMATION_SCHEMA.PROJECT_OPTIONS
WHERE option_name = 'default_location'
```

Regional views:

```sql
SELECT * FROM region-us.INFORMATION_SCHEMA.ORGANIZATION_OPTIONS;
```

```sql
SELECT * FROM region-us.INFORMATION_SCHEMA.EFFECTIVE_PROJECT_OPTIONS;
```

```sql
SELECT * FROM region-us.INFORMATION_SCHEMA.PROJECT_OPTIONS;
```

## Options / Props

Placeholders: `REGION` is a BigQuery region such as `us` or `europe-west6`; `KMS_KEY` is a user-defined Cloud KMS key; `LOCATION` is a region or multi-region used when the job location cannot be inferred.

### Query and job execution settings

| Name | Description |
|------|-------------|
| `default_batch_query_queue_timeout_ms` | Time a batch query waits in a query queue. Default 24 hours if unset; min 1 ms; max 48 hours; `-1` turns batch queueing off. |
| `default_interactive_query_queue_timeout_ms` | Time an interactive query waits in a query queue. Default 6 hours if unset; min 1 ms; max 48 hours; `-1` turns interactive queueing off. |
| `default_query_job_timeout_ms` | Time after which a query job times out, including queued and running time. Between 5 minutes and 48 hours. Applies to individual query jobs and child jobs of scripts; for script jobs use `jobs.insert` with `jobTimeoutMs`. Also applies to continuous queries (override with a job timeout on the continuous query; maximum runtimes still apply). |
| `default_location` | Location for jobs when none is set or determinable. If unset, the `US` multi-region. Global setting (no `region-` prefix). |
| `enable_reservation_based_fairness` | How idle slots are shared. Enabled (`TRUE`) by default for administration projects created after October 10, 2026; `FALSE` for projects created before, meaning idle slots are distributed equally across all query projects. When enabled, idle slots are shared equally across reservations first, then across projects within each reservation. Project level only; not at organization or job level. |
| `default_time_zone` | Default time zone for time zone-dependent GoogleSQL functions when none is passed. Does not apply to time-unit column partitioned tables (UTC), Storage Transfer Service schedule transfers, or loading with the bq tool. |
| `default_query_optimizer_options` | History-based query optimizations: `'adaptive=on'`, `'adaptive=off'`, or `NULL` (default, equivalent to `'adaptive=on'`). |
| `default_sql_dialect_option` | Default dialect for query jobs via bq tool or API (console unaffected): `'default_legacy_sql'` (default), `'default_google_sql'`, `'only_google_sql'` (rejects jobs set to legacy SQL), or `NULL` (equivalent to `'default_legacy_sql'`). |
| `enable_global_queries_execution` | Whether global queries can run. Default `FALSE`. |
| `enable_global_queries_data_access` | Whether global queries can access data stored in the region. Default `FALSE`: global queries cannot copy data from this region regardless of the running project. |
| `reusable_column_aliases_mode` | Whether reusable column aliases are enabled. Default `off`. |

### Data management settings

| Name | Description |
|------|-------------|
| `default_column_name_character_map` | Default scope and handling of characters in column names. If unset, load jobs with unsupported characters fail; some older tables may replace them. |
| `default_data_policy_projects` | Projects whose data policies are evaluated for columns protected by data governance tags. By default only the table's project is evaluated; with this set at organization level both are evaluated and the table project's policies win on conflict. Organization level only, e.g. `region-us.default_data_policy_projects = ["my_default_project"]`. |
| `default_kms_key_name` | Default Cloud KMS key for encrypting table data, including temporary or anonymous tables. |
| `default_max_time_travel_hours` | Default time travel window in hours for new datasets. Range 48 to 168 inclusive, divisible by 24. Does not affect existing datasets. |
| `enable_info_schema_storage` | Enables `INFORMATION_SCHEMA.TABLE_STORAGE` and `SEARCH_INDEXES` views and variants. Off by default; first query without it fails with instructions. After enabling, data is generated from that point forward; full historical backfill takes about one day. Already enabled if you used these views before the setting existed. |

### Cost and resource settings

| Name | Description |
|------|-------------|
| `default_storage_billing_model` | Default storage billing model for new datasets: `PHYSICAL` or `LOGICAL`. Does not affect existing datasets. |
| `default_cloud_resource_connection_id` | Default connection for creating tables and models; give only the connection ID or name, without project ID and region prefixes. BigQuery might update the connection service account's permissions depending on the table or model type. |
| `reservation_override_mode` (Preview) | How query reservations can be overridden in the region, e.g. `'ALLOW_ANY_OVERRIDE'`. Regional project setting. |
| `disable_on_demand_billing` (Preview) | If `true`, all queries in the region must use an assigned reservation or fail. Regional project setting. |
| `preflight_fluid_autoscaling_reservations` | Reservations opted in to fluid scaling (per-second billing, no minimum duration). |

### Required roles and permissions

| Action | Role | Permission |
|--------|------|------------|
| Specify settings | BigQuery Admin (`roles/bigquery.admin`) on the organization or project | `bigquery.config.update` on the organization or project |
| Retrieve settings | BigQuery Job User (`roles/bigquery.jobUser`) on the project | `bigquery.config.get` on the project |

## Notes

- Global settings apply across all locations and use no `region-REGION.` prefix; `default_location` is the only global setting, at organization or project level. Regional settings need the prefix and one region per statement.
- Location resolution when none is given: location of referenced datasets, then the region of a referenced connection, then the destination table location; otherwise `default_location`; otherwise `US`.
- Limitations: global settings are not supported in BigQuery Omni locations (cannot set `default_location` to one, or configure or view global settings there); global and regional settings cannot be mixed in one `ALTER ORGANIZATION` / `ALTER PROJECT SET OPTIONS` statement; a `default_location` change can take up to 10 minutes to propagate, during which jobs may go to the previous default.
- Precedence: project overrides organization; session overrides project; job overrides session. `ALTER ORGANIZATION` applies to the organization of the current project.
- Setting `default_kms_key_name` requires granting the Encrypter/Decrypter role to every BigQuery service account used in the project or organization, otherwise all queries from those service accounts fail. If set before granting, remove it by setting `NULL`.
- Before setting `default_time_zone`, make sure existing queries with `DATETIME` literals (explicit `DATETIME` keyword, implicit string conversion such as `DATETIME_DIFF('2022-10-01', ...)`, `PARSE_DATETIME()`) are not affected; safer to set only on new projects.
- New settings can take a few minutes to take effect and appear in the `INFORMATION_SCHEMA` views (`PROJECT_OPTIONS`: project configurations; `EFFECTIVE_PROJECT_OPTIONS`: project settings plus those inherited from the organization; `ORGANIZATION_OPTIONS`: organization configurations).
- The console and bq tab examples in the source use the same DDL; the console steps are omitted. No additional charge for the configuration service.
- Source: https://docs.cloud.google.com/bigquery/docs/default-configuration (retrieved 2026-11-19)

## Related

- [time-travel.md](./time-travel.md)
- [datasets-intro.md](./datasets-intro.md)
- [datasets.md](./datasets.md)
- [information-schema-intro.md](./information-schema-intro.md)
