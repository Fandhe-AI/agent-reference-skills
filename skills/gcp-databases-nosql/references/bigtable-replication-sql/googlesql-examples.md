---
source: https://docs.cloud.google.com/bigtable/docs/googlesql-examples
---

# GoogleSQL for Bigtable query pattern examples

Common and advanced GoogleSQL query patterns for Bigtable, run in Bigtable Studio or the Java client library, plus Data Boost patterns for Enterprise Plus. Examples use IDs and values like those in the "Data for examples" section of https://docs.cloud.google.com/bigtable/docs/using-filters.

## Signature / Usage

### Common patterns

```sql
SELECT * FROM myTable WHERE _key = 'r1'
```

```sql
SELECT * FROM myTable(with_history => TRUE) WHERE _key = 'r1'
```

```sql
SELECT
  _key,
  stats_summary['os_build'] AS os,
  stats_summary['user_agent'] AS agent
FROM analytics
WHERE _key >= 'phone#4c410523#20190501' AND _key < 'phone#4c410523#201906201'
```

```sql
SELECT *
FROM analytics(with_history => TRUE)
WHERE
  (_key >= 'phone#4c410523#20190501' AND _key < 'phone#4c410523#201906201')
  OR (_key >= 'phone#5c10102#20190501' AND _key < 'phone#5c10102#20190601')
LIMIT 10
```

```sql
SELECT stats_summary
FROM analytics
WHERE _key LIKE 'phone#%'
```

```sql
SELECT _key, MAP_KEYS(cell_plan) AS keys
FROM analytics
WHERE _key >= 'phone#4c410523#20190501' AND _key < 'phone#4c410523#201906201'
```

```sql
SELECT
  FORMAT_TIMESTAMP('%M', _timestamp) AS minute,
  COUNT(clicks) AS total_clicks
FROM
  UNPACK((
    SELECT engagement['clicks'] as clicks
    FROM metrics(with_history => true, after => TIMESTAMP_SUB(CURRENT_TIMESTAMP(), INTERVAL 1 HOUR))
    WHERE _key = @campaign_id
  ))
GROUP BY
  minute;
```

### Advanced patterns

```sql
SELECT
  _key AS userid,
  session['total_minutes'] / session['count'] AS avg_session_length
FROM analytics
```

```sql
SELECT *
FROM analytics
WHERE
  _key LIKE 'com.abc%'
  AND ARRAY_INCLUDES_ANY(MAP_KEYS(session), ['referrer', 'origin', 'server'])
```

```sql
SELECT
  _key AS sensorid,
  ARRAY_FILTER(
    CAST(
      sensor['temperature']
      AS ARRAY<STRUCT<timestamp TIMESTAMP, value STRING>>),
    e -> CAST(e.value AS FLOAT32) > 70) AS high_temperature
FROM weather(with_history => TRUE, latest_n => 7)
```

### Data Boost (Enterprise Plus)

```sql
SELECT _key, metrics
FROM myTable(with_history => TRUE, after => TIMESTAMP_SUB(CURRENT_TIMESTAMP(), INTERVAL 24 HOUR))
```

```sql
SELECT *
FROM analytics
WHERE _key >= 'user#000000' AND _key < 'user#999999'
```

## Notes

- Full table scans are not recommended for low-latency, high-throughput access: `_key` regex (`REGEXP_CONTAINS(_key, '.*#20190501$')`) without a prefix or range predicate, and `analytics(with_history => TRUE, latest_n => 3)` over all rows.
- Counter comparisons like `counterFamily['counter'] > 123` need no cast because Bigtable aggregates are numeric (https://docs.cloud.google.com/bigtable/docs/aggregates#aggregate-column-families).
- Temporal order: `latest_n` is applied last. To make `latest_n` take precedence, pass only `latest_n` and apply the other time filters with `ARRAY_FILTER` over a `CAST(... AS ARRAY<STRUCT<timestamp TIMESTAMP, value STRING>>)`. Per-column-family filters use `ARRAY_FILTER` with `(e, i) -> i <= N`, and `ARRAY_REVERSE` for oldest versions.
- Other patterns in the source (omitted): `LIKE 'com.mysite%'` with a column predicate, `CASE` labeling, `IS IN` multiple keys (Source inconsistency: the twin writes `_key IS IN (...)`; the `OR` form of the same query is also shown), `ARRAY_INCLUDES_ALL`, `ARRAY_INCLUDES_ANY(MAP_VALUES(...))`, `MAP_ENTRIES` key-value matching, `JSON_VALUE`.
- Data Boost queries require an app profile configured for Data Boost, so heavy scans do not consume cluster node CPU.
- Omitted: the Data Boost aggregation example (`SELECT _key AS device_id, COUNT(events['event_type']) AS total_events FROM UNPACK((SELECT events['event_type'] FROM sensor_data(...))) GROUP BY Device_id;`). Its `UNPACK` subquery selects neither `_key` nor a named `events` column although the outer query uses both (the GoogleSQL overview says the columns must be selected in the subquery), and it groups by `Device_id` while the alias is `device_id`.
- Wide-column NoSQL database; GoogleSQL for Bigtable is not Cloud SQL or Spanner (`gcp-databases-relational`).
- Source: https://docs.cloud.google.com/bigtable/docs/googlesql-examples (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [googlesql-overview.md](./googlesql-overview.md)
- [app-profiles.md](./app-profiles.md)
