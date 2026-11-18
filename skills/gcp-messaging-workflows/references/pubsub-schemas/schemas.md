---
source: https://docs.cloud.google.com/pubsub/docs/schemas
---

# Pub/Sub schemas

A Pub/Sub schema is an optional feature that enforces the format of the `data` field of a Pub/Sub message. A schema is a contract between publisher and subscriber: it defines the names and data types of the fields in a message. You associate a schema with a topic; a message that does not conform to the schema is not published. A schema can have additional revisions.

## Signature / Usage

### Apache Avro format

The schema below defines the inventory of a warehouse in Avro.

```json
{
 "type" : "record",
 "name" : "Avro",
 "fields" : [
   {
     "name" : "ProductName",
     "type" : "string",
     "default": ""
   },
   {
     "name" : "SKU",
     "type" : "int",
     "default": 0
   },
   {
     "name" : "InStock",
     "type" : "boolean",
     "default": false
   }
 ]
}
```

### Protocol Buffer format

The same schema in Protocol Buffer format.

```protobuf
syntax = "proto3";
message ProtocolBuffer {
  string product_name = 1;
  int32 SKU = 2;
  bool in_stock = 3;
}
```

## Options / Props

### Schema types

| Framework | Supported version |
|-----------|-------------------|
| Apache Avro | Avro version 1.11 |
| Protocol Buffer | proto2 and proto3 |

### Quotas and limits for schemas

| Limit | Value |
|-------|-------|
| Schema definition field size | Cannot exceed 300 KB |
| Schemas per project | Maximum 10,000 |
| Revisions per schema | A single schema cannot have more than 20 revisions |

## Notes

- A schema must define only one top-level type. Import statements that reference other types are not supported.
- The same schema can be associated with multiple topics.
- You can manually test whether a message validates against a schema.
- Do not include sensitive information such as personally identifiable information (PII) or security data in schema field names.
- Pub/Sub does not validate the default value of each field; follow the Apache Avro specification for default value rules.
- For other Pub/Sub limits, see the Pub/Sub quotas and limits page: https://docs.cloud.google.com/pubsub/quotas
- Source: https://docs.cloud.google.com/pubsub/docs/schemas (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [create-schemas.md](./create-schemas.md)
- [associate-schema-topic.md](./associate-schema-topic.md)
- [validate-schema-message.md](./validate-schema-message.md)
- Commit a schema revision: https://docs.cloud.google.com/pubsub/docs/commit-schema-revision
- Publish messages to a topic with a schema: https://docs.cloud.google.com/pubsub/docs/publish-topics-schema
