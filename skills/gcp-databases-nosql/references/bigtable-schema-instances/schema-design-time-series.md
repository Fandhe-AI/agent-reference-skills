---
source: https://docs.cloud.google.com/bigtable/docs/schema-design-time-series
---

# Schema design for time series data

Patterns for storing time series (measurements plus the times they were recorded) in Bigtable. No single design fits all use cases; your dataset and queries matter most. The examples use weather balloon measurements (pressure, temperature, humidity, altitude, balloon ID, location, timestamp) taken once per minute; an event is one request that writes one or more cells at the same time.

## Signature / Usage

### Time bucket: new columns for new events (data in the column qualifier)

Row key: location, balloon ID, metric, week. Each cell has the column family, qualifier (the measurement) and timestamp, but no value.

| Row key | 94558 | 94122 | 95992 |
|---|---|---|---|
| us-west2#3698#pressure#week1 | "" (t2021-03-05-1200) | "" (t2021-03-05-1201) | "" (t2021-03-05-1202) |

### Time bucket: new cells for new events

One column family `measurements` with columns `pressure`, `temperature`, `humidity`, `altitude`; row key `<location>#<balloon ID>#<week>`; each write adds timestamped cells (10,080 cells per column per week if GC allows).

| Row key | pressure | temp |
|---|---|---|
| asia-south2#3698#week1 | 94558 (t2021-03-05-1200) | 9.5 (t2021-03-05-1200) |
| asia-south2#3698#week1 | 94122 (t2021-03-05-1201) | 9.4 (t2021-03-05-1201) |
| asia-south2#3698#week1 | 95992 (t2021-03-05-1202) | 9.2 (t2021-03-05-1202) |

Garbage collection rules matter with this pattern. A column family whose data expires after 864,000 seconds (example from the gcloud reference):

```bash
gcloud bigtable instances tables create my-table \
    --instance=my-instance \
    --column-families="my-family:maxage=864000s" --splits=car,key
```

### Single-timestamp rows (unserialized)

| Row key | pressure | temperature | humidity | altitude |
|---|---|---|---|---|
| us-west2#3698#2021-03-05-1200 | 94558 | 9.6 | 61 | 612 |
| us-west2#3698#2021-03-05-1201 | 94122 | 9.7 | 62 | 611 |
| us-west2#3698#2021-03-05-1202 | 95992 | 9.5 | 58 | 602 |
| us-west2#3698#2021-03-05-1203 | 96025 | 9.5 | 66 | 598 |
| us-west2#3698#2021-03-05-1204 | 96021 | 9.6 | 63 | 624 |

## Options / Props

| Pattern | Advantages | Disadvantages | Use when |
|---------|-----------|---------------|----------|
| Time bucket, new columns | Better performance, better compression | More complex to develop | You do not need to measure changes; save space with qualifiers as data |
| Time bucket, new cells | Same as above; set garbage collection rules | More complex to develop | You want to measure change over time |
| Single timestamp, serialized (JSON / protobuf in one column) | Storage efficiency, speed | Cannot read only specific fields without SQL; must deserialize | You almost always read all measurements of an event; events so large that multiple columns could exceed 100 MB per row |
| Single timestamp, unserialized | Easier to implement; less schema refinement | Less performant, less compression, can still hotspot | Always read all columns for a timestamp range; unbounded number of events |

## Notes

- Bucket size (minute, hour, day) depends on queries and data size limits; if an hour of data exceeds the recommended 100 MB per row, use a half hour or a minute.
- To avoid hotspots never use a timestamp as a row key prefix.
- High event rates can produce several events in the same millisecond and lose data through timestamp collisions in the new-cells pattern; configure the table for microsecond timestamp granularity (Enterprise Plus edition only).
- To serve several different queries on the same data, store it in multiple tables, each with a row key designed for one query. Patterns can be combined (for example serialized data in time-bucket rows) as long as rows do not get too big.
- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/bigtable/instances/tables/create (the time series page has no code block; its row example tables are copied verbatim). Microsecond timestamp granularity is set at table creation with `--timestamp-granularity` on the same command.
- Bigtable: wide-column NoSQL database, not a relational database; its SQL (GoogleSQL for Bigtable) is not Cloud SQL / Spanner (`gcp-databases-relational`).
- Source: https://docs.cloud.google.com/bigtable/docs/schema-design-time-series (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [schema-design.md](./schema-design.md)
- [schema-design-steps.md](./schema-design-steps.md)
- [data-types.md](./data-types.md)
- [garbage-collection.md](./garbage-collection.md)
