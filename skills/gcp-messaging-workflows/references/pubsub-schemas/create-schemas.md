---
source: https://docs.cloud.google.com/pubsub/docs/create-schemas
---

# Create a Pub/Sub schema

Create an Avro or Protocol Buffer schema with the gcloud CLI, the Pub/Sub API or the Cloud Client Libraries. A schema can be created in one project and attached to a topic in a different project. The source's console flow also offers Validate definition and Test message steps (the definition check does not check compatibility with the messages to be published).

## Signature / Usage

### gcloud

```bash
gcloud pubsub schemas create SCHEMA_ID \
        --type=SCHEMA_TYPE \
        --definition=SCHEMA_DEFINITION
```

The definition can also come from a file:

```bash
gcloud pubsub schemas create SCHEMA_ID \
        --type=SCHEMA_TYPE \
        --definition-file=SCHEMA_DEFINITION_FILE
```

### Sample Avro schema and test message

```json
{
  "type": "record",
  "name": "Avro",
  "fields": [
    {
      "name": "ProductName",
      "type": "string",
      "default": ""
    },
    {
      "name": "SKU",
      "type": "int",
      "default": 0
    },
    {
      "name": "InStock",
      "type": "boolean",
      "default": false
    }
  ]
}
```

A sample test message for this schema with **Message encoding** `JSON`:

```json
{"ProductName":"GreenOnions", "SKU":34543, "InStock":true}
```

### REST

Adapted (not in the official docs): the source request block is not a runnable call (`Content-Type: application/json --data @response-body.json` is a header line with a stray flag, the body is not JSON); it is rewritten as a `curl` call that sends the same method, URL, `schemaId` query parameter and body fields, with the definition as a JSON string.

```bash
curl -X POST "https://pubsub.googleapis.com/v1/projects/PROJECT_ID/schemas?schemaId=SCHEMA_ID" \
  -H "Authorization: Bearer $(gcloud auth application-default print-access-token)" \
  -H "Content-Type: application/json" \
  --data @request-body.json
```

Adapted (not in the official docs): `request-body.json`, valid JSON with quoted placeholders as in the source field list; in the REST body `SCHEMA_TYPE` is the `Schema.type` enum value `AVRO` or `PROTOCOL_BUFFER` (Pub/Sub v1 Discovery document), not the gcloud spelling.

```json
{
  "definition": "SCHEMA_DEFINITION",
  "type": "SCHEMA_TYPE"
}
```

The response is a schema resource (`name`, `type`, `definition`, `revisionId`, `revisionCreateTime`).

### Node.js (JavaScript)

```javascript
/**
 * TODO(developer): Uncomment these variables before running the sample.
 */
// const schemaNameOrId = 'YOUR_SCHEMA_NAME_OR_ID';
// const avscFile = 'path/to/an/avro/schema/file/(.avsc)/formatted/in/json';

// Imports the Google Cloud client library
const {PubSub, SchemaTypes} = require('@google-cloud/pubsub');

const fs = require('fs');

// Creates a client; cache this for further use
const pubSubClient = new PubSub();

async function createAvroSchema(schemaNameOrId, avscFile) {
  const definition = fs.readFileSync(avscFile).toString();
  const schema = await pubSubClient.createSchema(
    schemaNameOrId,
    SchemaTypes.Avro,
    definition,
  );

  const name = await schema.getName();
  console.log(`Schema ${name} created.`);
}
```

### Python (Avro)

Adapted (not in the official docs): the source ends the `try` block with a top-level `return result` (invalid outside a function) and the `except` only prints; `return result` is removed and the `except` re-raises so a failed create is not reported as success.

```python
from google.api_core.exceptions import AlreadyExists
from google.cloud.pubsub import SchemaServiceClient
from google.pubsub_v1.types import Schema

# TODO(developer): Replace these variables before running the sample.
# project_id = "your-project-id"
# schema_id = "your-schema-id"
# avsc_file = "path/to/an/avro/schema/file/(.avsc)/formatted/in/json"

project_path = f"projects/{project_id}"

# Read a JSON-formatted Avro schema file as a string.
with open(avsc_file, "rb") as f:
    avsc_source = f.read().decode("utf-8")

schema_client = SchemaServiceClient()
schema_path = schema_client.schema_path(project_id, schema_id)
schema = Schema(name=schema_path, type_=Schema.Type.AVRO, definition=avsc_source)

try:
    result = schema_client.create_schema(
        request={"parent": project_path, "schema": schema, "schema_id": schema_id}
    )
    print(f"Created a schema using an Avro schema file:\n{result}")
except AlreadyExists:
    print(f"{schema_id} already exists.")
    raise
```

### Rust (Protocol Buffer)

```rust
use google_cloud_pubsub::client::SchemaService;
use google_cloud_pubsub::model::{Schema, schema::Type};

pub async fn sample(client: &SchemaService, project: &str, schema_id: &str) -> anyhow::Result<()> {
    const PROTO_SCHEMA: &str = r#"syntax = "proto3";
message User {
  string name = 1;
}"#;
    let schema = client
        .create_schema()
        .set_parent(format!("projects/{project}"))
        .set_schema_id(schema_id)
        .set_schema(
            Schema::new()
                .set_type(Type::ProtocolBuffer)
                .set_definition(PROTO_SCHEMA),
        )
        .send()
        .await?;

    println!("successfully created schema {schema:?}");
    Ok(())
}
```

## Options / Props

### Flags and fields

| Name | Values | Description |
|------|--------|-------------|
| `SCHEMA_TYPE` / `type` | `avro` or `protocol-buffer` (gcloud); `AVRO` or `PROTOCOL_BUFFER` (REST / client libraries) | Schema framework |
| `--definition` | string | Inline schema definition formatted for the chosen type |
| `--definition-file` | path | File containing the schema definition |
| `schemaId` (REST query parameter) | string | ID of the schema to create |
| `revisionId` (response) | string | Server-generated ID for the revision |
| `revisionCreateTime` (response) | ISO 8601 timestamp | When the revision was created |

### Required permissions (Pub/Sub Editor, `roles/pubsub.editor`)

| Action | Permission |
|--------|------------|
| Create schema | `pubsub.schemas.create` |
| Attach schema to topic | `pubsub.schemas.attach` |
| Commit a schema revision | `pubsub.schemas.commit` |
| Delete a schema or a schema revision | `pubsub.schemas.delete` |
| Get a schema or schema revisions | `pubsub.schemas.get` |
| List schemas | `pubsub.schemas.list` |
| List schema revisions | `pubsub.schemas.listRevisions` |
| Rollback a schema | `pubsub.schemas.rollback` |
| Validate a message | `pubsub.schemas.validate` |
| Get the IAM policy for a schema | `pubsub.schemas.getIamPolicy` |
| Configure the IAM policy for a schema | `pubsub.schemas.setIamPolicy` |

## Notes

- Corrected from the official docs: the REST section showed `Content-Type: application/json --data @response-body.json` and a body with unquoted placeholders (`"definition": SCHEMA_DEFINITION`); both were rewritten as shown above. The source also says the REST `SCHEMA_TYPE` "is either `avro` or `protocol-buffer`" (the gcloud spelling); the Discovery enum for `Schema.type` is `AVRO` / `PROTOCOL_BUFFER`.
- The source grants `roles/pubsub.editor` on the project. You can create a schema in one project and attach it to a topic in a different project; you need the required permissions in each project.
- Prerequisites in the source: understand how Pub/Sub schemas work, learn about topics and the publishing workflow, and create a topic. Read the schema limits first (300 KB definition, 10,000 schemas per project, 20 revisions per schema; see schemas.md). Schema field names must not contain sensitive information.
- The source also shows Console, C++, C#, Go, Java, PHP and Ruby, and Avro / Protocol Buffer variants for each client library; this page keeps Node.js (JavaScript, Avro), Python (Avro) and Rust (Protocol Buffer); the TypeScript Protocol Buffer sample is omitted.
- Corrected from the official docs: the Python sample's top-level `return result` was removed and its `except AlreadyExists:` (print only) now re-raises.
- Source: https://docs.cloud.google.com/pubsub/docs/create-schemas (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [schemas.md](./schemas.md)
- [associate-schema-topic.md](./associate-schema-topic.md)
- [validate-schema-message.md](./validate-schema-message.md)
- View schema details: https://docs.cloud.google.com/pubsub/docs/view-schema-details
- Commit a schema revision: https://docs.cloud.google.com/pubsub/docs/commit-schema-revision
- gcloud: https://docs.cloud.google.com/sdk/gcloud/reference/pubsub/schemas/create
