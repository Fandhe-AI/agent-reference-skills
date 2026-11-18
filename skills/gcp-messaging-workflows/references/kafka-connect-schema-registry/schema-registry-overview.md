---
source: https://docs.cloud.google.com/managed-service-for-apache-kafka/docs/schema-registry/schema-registry-overview
---

# Schema Registry overview (Managed Service for Apache Kafka)

The schema registry provides repositories of schemas shared by multiple applications, ensuring consistent message encoding and decoding. The feature is in Preview ("Pre-GA Offerings Terms" apply; pre-GA features are available "as is" and might have limited support). It implements the Confluent Schema Registry REST API and is compatible with existing Apache Kafka applications and common client libraries. Supported schema formats: Apache Avro and Protocol Buffers; JSON is not supported.

## Signature / Usage

### Avro schema for an order message

```json
{
  "type": "record",
  "name": "Order",
  "namespace": "com.example",
  "fields": [
    {"name": "orderId", "type": "string"},
    {"name": "customerName", "type": "string"},
    {"name": "productName", "type": "string"},
    {"name": "quantity", "type": "int"},
    {"name": "price", "type": "double"}
  ]
}
```

### The same schema in Protocol Buffer format

```protobuf
syntax = "proto3";

package com.example;

option java_multiple_files = true; // Optional: Recommended for Java users
option java_package = "com.example"; // Optional: Explicit Java package

message Order {
  string orderId = 1;
  string customerName = 2;
  string productName = 3;
  int32 quantity = 4; // Avro int maps to Protobuf int32
  double price = 5;
}
```

## Options / Props

### Registry organization

| Level | Description |
|-------|-------------|
| Registry | Top-level container storing all schemas, subjects, versions and contexts. |
| Context | Namespace for subjects, so teams can reuse a subject name without conflicts. A registry can have multiple contexts and always has a default context identified as `.`, used when no other context is specified. A context can contain multiple subjects. |
| Subject | Logical container for the versions of a schema; compatibility rules govern evolution. Typically corresponds to a Kafka topic or record object. |
| Version | A new version is registered under a subject when the message structure changes. Versions of different subjects can reference the same schema. |
| Schema | Structure and data types of a message, identified by a schema ID that applications use to retrieve it. |

### Workflow

| Step | Description |
|------|-------------|
| 1 | Initialize the producer with a specific schema (Avro-generated class) and configure the schema registry and serializer library. |
| 2 | Configure the consumer with the corresponding deserializer and the same registry. |
| 3 | `producer.send` hands the record to the serializer, which produces Avro-encoded bytes. |
| 4 | The serializer derives the subject name from the configured subject name strategy and requests the schema ID from the registry. |
| 5 | If the schema doesn't exist under that subject, the client can be configured to register it; avoid this configuration in production environments. |
| 6-8 | The producer sends the serialized message with the schema ID to the topic; the broker stores the bytes; the consumer receives the message. |
| 9-10 | The deserializer retrieves the schema by ID from the registry and parses the message. |

### Not supported

| Category | Unsupported |
|----------|-------------|
| Schema formats | JSON schema format. |
| Schema modes | `READONLY_OVERRIDE`. |
| Schema configuration values | `Normalize` and `Alias`. |
| API methods | `ModifySchemaTags` (`/subjects/{subject}/versions/{version}/tags`); `GetLatestWithMetadata` (`/subjects/{subject}/metadata`); `ListSchemas` (`/schemas`); `DeleteSchemaMode`. |
| API method parameters | `GetVersion`: `format`, `deleted`, `findTags`. `CreateVersion`: `metadata`, `ruleSet`, `schemaTagsToAdd`, `schemaTagsToRemove`. `UpdateSchemaMode`: `force`. `GetSchemaMode`: `defaultToGlobal`. `GetSchema`: `WorkspaceMaxId`, `findTags`. `ListVersions`: `deletedOnly`. `ListSubjects`: `deletedOnly`. |

## Notes

- Example registry layout from the source: registry `schema_registry_test`, context `customer_support`, subject `order`, version `V1` (orderId, customerName, productName, quantity, price) and `V2` (adds `orderDate`). Adding a field is a forwards-compatible change: consumers on older versions ignore the new field. Backwards compatibility means a consumer configured with the new version can read data produced with a previous schema.
- Kafka Connect does not support validation against a remote schema by using Schema Registry (see the Kafka Connect overview page).
- Release track: gcloud 593.0.0 has `gcloud managed-kafka schema-registries` (create, delete, describe, list; `subjects` describe / update and `update` in alpha) only under `beta` and `alpha`, not in GA; the source shows no gcloud commands. Because the feature is Preview, check the track before scripting it.
- Google Cloud Managed Service for Apache Kafka runs Apache Kafka; serializer / client properties follow upstream Apache Kafka and the Confluent client libraries.
- Source: https://docs.cloud.google.com/managed-service-for-apache-kafka/docs/schema-registry/schema-registry-overview (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [kafka-connect-overview.md](./kafka-connect-overview.md)
- Schema lifecycle management: https://docs.cloud.google.com/managed-service-for-apache-kafka/docs/schema-registry/schema-lifecycle
- Create a schema registry: https://docs.cloud.google.com/managed-service-for-apache-kafka/docs/schema-registry/create-schema-registry
- Produce Avro messages quickstart: https://docs.cloud.google.com/managed-service-for-apache-kafka/docs/quickstart-avro
