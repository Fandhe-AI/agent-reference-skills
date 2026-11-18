---
source: https://docs.cloud.google.com/pubsub/docs/bigquery
---

# BigQuery Subscriptions Overview

A BigQuery subscription is an export subscription that writes Pub/Sub messages to an existing BigQuery table as they are received, with no separate subscriber client. It writes through the BigQuery Storage Write API (gRPC), supports only at-least-once delivery, and can map a topic schema (Avro or Protocol Buffer) or a JSON message onto table columns. For lightweight changes attach a Single Message Transform (SMT); use a Dataflow pipeline for complex transformation, windowing or aggregation.

## Signature / Usage

### Create a BigQuery subscription (basic form)

```bash
gcloud pubsub subscriptions create SUBSCRIPTION_ID \
    --topic=TOPIC_ID \
    --bigquery-table=PROJECT_ID.DATASET_ID.TABLE_ID
```

### Workflow

1. Pub/Sub uses the BigQuery Storage Write API (gRPC) to send data to the BigQuery table.
2. The messages are sent in batches to the BigQuery table.
3. After a successful write, the API returns an OK response.
4. If the write fails, the Pub/Sub message is negatively acknowledged and re-sent. If it fails enough times and a dead letter topic is configured on the subscription, the message is moved to the dead letter topic.

### Failure handling

- A message that cannot be written to BigQuery is not acknowledged. Configure a dead-letter topic on the subscription to forward it.
- The forwarded message carries the attribute `CloudPubSubDeadLetterSourceDeliveryErrorMessage` with the reason the write failed.
- Pub/Sub backs off delivery in a way similar to push backoff behavior. If the subscription has a dead-letter topic, Pub/Sub does not back off when failures are caused by schema compatibility errors.

## Options / Props

### Schema compatibility rules (only when "Use topic schema" is selected)

| Rule | Detail |
|------|--------|
| Improperly formatted field | The message is not written to BigQuery. |
| BigQuery aliases | `INT`, `SMALLINT`, `INTEGER`, `BIGINT`, `TINYINT`, `BYTEINT` are aliases for `INTEGER`; `DECIMAL` for `NUMERIC`; `BIGDECIMAL` for `BIGNUMERIC`. |
| `string` topic type to BigQuery `JSON`, `TIMESTAMP`, `DATETIME`, `DATE`, `TIME`, `NUMERIC`, `BIGNUMERIC` | The value must adhere to the format of that BigQuery data type. |
| Avro logical types | Only those in the logical types table below are supported; any other logical type matches only the Avro type it annotates. |

### Avro types

| Avro Type | BigQuery Data Type |
|-----------|--------------------|
| `null` | `Any NULLABLE` |
| `boolean` | `BOOLEAN` |
| `int` | `INTEGER`, `NUMERIC`, or `BIGNUMERIC` |
| `long` | `INTEGER`, `NUMERIC`, or `BIGNUMERIC` |
| `float` | `FLOAT64`, `NUMERIC`, or `BIGNUMERIC` |
| `double` | `FLOAT64`, `NUMERIC`, or `BIGNUMERIC` |
| `bytes` | `BYTES`, `NUMERIC`, or `BIGNUMERIC` |
| `string` | `STRING`, `JSON`, `TIMESTAMP`, `DATETIME`, `DATE`, `TIME`, `NUMERIC`, or `BIGNUMERIC` |
| `record` | `RECORD/STRUCT` |
| `array` of `Type` | `REPEATED Type` |
| `map` with value type `ValueType` | `REPEATED STRUCT <key STRING, value ValueType>` |
| `union` with two types, one that is `null` and the other `Type` | `NULLABLE Type` |
| other `union`s | Unmappable |
| `fixed` | `BYTES`, `NUMERIC`, or `BIGNUMERIC` |
| `enum` | `INTEGER` |

### Avro logical types

| Avro Logical Type | BigQuery Data Type |
|-------------------|--------------------|
| `timestamp-micros` | `TIMESTAMP` |
| `timestamp-millis` | `TIMESTAMP` |
| `date` | `DATE` |
| `time-micros` | `TIME` |
| `time-millis` | `TIME` |
| `duration` | `INTERVAL` |
| `decimal` | `NUMERIC` or `BIGNUMERIC` |

### Protocol Buffer types

| Protocol Buffer Type | BigQuery Data Type |
|----------------------|--------------------|
| `double` | `FLOAT64`, `NUMERIC`, or `BIGNUMERIC` |
| `float` | `FLOAT64`, `NUMERIC`, or `BIGNUMERIC` |
| `int32` | `INTEGER`, `NUMERIC`, `BIGNUMERIC`, or `DATE` |
| `int64` | `INTEGER`, `NUMERIC`, `BIGNUMERIC`, `DATE`, `DATETIME`, or `TIMESTAMP` |
| `uint32` | `INTEGER`, `NUMERIC`, `BIGNUMERIC`, or `DATE` |
| `uint64` | `NUMERIC` or `BIGNUMERIC` |
| `sint32` | `INTEGER`, `NUMERIC`, or `BIGNUMERIC` |
| `sint64` | `INTEGER`, `NUMERIC`, `BIGNUMERIC`, `DATE`, `DATETIME`, or `TIMESTAMP` |
| `fixed32` | `INTEGER`, `NUMERIC`, `BIGNUMERIC`, or `DATE` |
| `fixed64` | `NUMERIC` or `BIGNUMERIC` |
| `sfixed32` | `INTEGER`, `NUMERIC`, `BIGNUMERIC`, or `DATE` |
| `sfixed64` | `INTEGER`, `NUMERIC`, `BIGNUMERIC`, `DATE`, `DATETIME`, or `TIMESTAMP` |
| `bool` | `BOOLEAN` |
| `string` | `STRING`, `JSON`, `TIMESTAMP`, `DATETIME`, `DATE`, `TIME`, `NUMERIC`, or `BIGNUMERIC` |
| `bytes` | `BYTES`, `NUMERIC`, or `BIGNUMERIC` |
| `enum` | `INTEGER` |
| `message` | `RECORD/STRUCT` |
| `oneof` | Unmappable |
| `map<KeyType, ValueType>` | `REPEATED RECORD<key KeyType, value ValueType>` |
| `repeated/array of Type` | `REPEATED Type` |

### Integer representation of date and time types

| BigQuery Data Type | Integer Representation |
|--------------------|------------------------|
| `DATE` | The number of days since the Unix epoch, January 1, 1970 |
| `DATETIME` | The date and time in microseconds expressed as civil time using the CivilTimeEncoder |
| `TIME` | The time in microseconds expressed as civil time using the CivilTimeEncoder |
| `TIMESTAMP` | The number of microseconds since the Unix epoch, January 1, 1970 00:00:00 UTC |

### Change data capture (CDC) fields

| Field | Required | Description |
|-------|----------|-------------|
| `_CHANGE_TYPE` | Yes | `string` set to `UPSERT` (update the row with the same key, or insert it) or `DELETE` (delete the row with the same key if it exists). |
| `_CHANGE_SEQUENCE_NUMBER` | No | `string` that orders updates and deletes. Messages for the same row key must carry a monotonically increasing value; a message with a number lower than the highest already processed for that row has no effect. Must follow the BigQuery `_CHANGE_SEQUENCE_NUMBER` format. |

## Notes

- CDC ingestion works when `use_topic_schema` or `use_table_schema` is `true`. With `use_topic_schema`, define these fields in the topic schema; with `use_table_schema`, include them in the JSON message. The BigQuery table must have a primary key.
- BigQuery subscriptions can be used with Apache Iceberg tables managed by BigQuery (Iceberg managed tables store data in customer-owned buckets as Parquet) with no additional changes.
- Delivery is at-least-once only. The Dataflow "Pub/Sub subscription to BigQuery" template enforces exactly-once delivery by default; with a BigQuery subscription handle potential duplicates downstream in BigQuery if exact deduplication matters.
- Quotas: BigQuery subscriber throughput is limited per region (see Pub/Sub quotas and limits). Only the Storage Write API (gRPC) throughput quota is consumed; other Storage Write API quota considerations can be ignored.
- Pricing is not copied; see https://cloud.google.com/pubsub/pricing#pubsub.
- Snippet taken from https://docs.cloud.google.com/pubsub/docs/create-bigquery-subscription (the basic create command; the source page of this overview has no code).
- BigQuery itself (tables, datasets, CDC prerequisites) is outside this skill; it belongs to the planned `gcp-bigquery`.
- Source: https://docs.cloud.google.com/pubsub/docs/bigquery (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [create-bigquery-subscription.md](./create-bigquery-subscription.md)
- [cloudstorage.md](./cloudstorage.md)
- [bigtable-subscriptions.md](./bigtable-subscriptions.md)
