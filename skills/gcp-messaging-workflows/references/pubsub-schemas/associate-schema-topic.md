---
source: https://docs.cloud.google.com/pubsub/docs/associate-schema-topic
---

# Associate a schema with a topic

Associate a schema with a topic when you create or edit the topic. After the association, every message the topic receives from publishers must follow the schema. You choose the message encoding (`BINARY` or `JSON`) and, for schemas with revisions, an optional range of revisions to validate against.

## Signature / Usage

### Create a topic with a schema (gcloud)

Adapted (not in the official docs): the source command ends with a trailing `\` after the last flag, which continues into the next line; the trailing backslash is removed.

```bash
gcloud pubsub topics create TOPIC_ID \
        --message-encoding=ENCODING_TYPE \
        --schema=SCHEMA_ID \
        --first-revision-id=FIRST_REVISION_ID \
        --last-revision-id=LAST_REVISION_ID
```

Assign a schema from a different Google Cloud project:

```bash
gcloud pubsub topics create TOPIC_ID \
        --message-encoding=ENCODING_TYPE \
        --schema=SCHEMA_ID \
        --schema-project=SCHEMA_PROJECT \
        --project=TOPIC_PROJECT
```

### Create a topic with a schema (REST)

Request to `projects.topics.create`, authenticated with an access token from `gcloud auth application-default print-access-token`:

```text
PUT https://pubsub.googleapis.com/v1/projects/PROJECT_ID/topics/TOPIC_ID
Authorization: Bearer ACCESS_TOKEN
```

Adapted (not in the official docs): the source request body is missing the commas between members, so it is not valid JSON; commas are added.

```json
{
  "schemaSettings": {
    "schema": "SCHEMA_NAME",
    "encoding": "ENCODING_TYPE",
    "firstRevisionId": "FIRST_REVISION_ID",
    "lastRevisionId": "LAST_REVISION_ID"
  }
}
```

### Create a topic with a schema (Node.js, TypeScript)

```typescript
/**
 * TODO(developer): Uncomment these variables before running the sample.
 */
// const topicNameOrId = 'YOUR_TOPIC_NAME_OR_ID';
// const schemaName = 'YOUR_SCHEMA_NAME_OR_ID';
// const encodingType = 'BINARY';

// Imports the Google Cloud client library
import {PubSub} from '@google-cloud/pubsub';

// Creates a client; cache this for further use
const pubSubClient = new PubSub();

async function createTopicWithSchema(
  topicNameOrId: string,
  schemaNameOrId: string,
  encodingType: 'BINARY' | 'JSON',
) {
  // Get the fully qualified schema name.
  const schema = pubSubClient.schema(schemaNameOrId);
  const fullName = await schema.getName();

  // Creates a new topic with a schema. Note that you might also
  // pass Encodings.Json or Encodings.Binary here.
  await pubSubClient.createTopic({
    name: topicNameOrId,
    schemaSettings: {
      schema: fullName,
      encoding: encodingType,
    },
  });
  console.log(`Topic ${topicNameOrId} created with schema ${fullName}.`);
}
```

### Create a topic with a schema (Python)

Adapted (not in the official docs): each `except` branch printed a message and then let the script finish as if it had succeeded; a bare `raise` is added after each `print` so failures are not reported as success.

```python
from google.api_core.exceptions import AlreadyExists, InvalidArgument
from google.cloud.pubsub import PublisherClient, SchemaServiceClient
from google.pubsub_v1.types import Encoding

# TODO(developer): Replace these variables before running the sample.
# project_id = "your-project-id"
# topic_id = "your-topic-id"
# schema_id = "your-schema-id"
# first_revision_id = "your-revision-id"
# last_revision_id = "your-revision-id"
# Choose either BINARY or JSON as valid message encoding in this topic.
# message_encoding = "BINARY"

publisher_client = PublisherClient()
topic_path = publisher_client.topic_path(project_id, topic_id)

schema_client = SchemaServiceClient()
schema_path = schema_client.schema_path(project_id, schema_id)

if message_encoding == "BINARY":
    encoding = Encoding.BINARY
elif message_encoding == "JSON":
    encoding = Encoding.JSON
else:
    encoding = Encoding.ENCODING_UNSPECIFIED

try:
    response = publisher_client.create_topic(
        request={
            "name": topic_path,
            "schema_settings": {
                "schema": schema_path,
                "encoding": encoding,
                "first_revision_id": first_revision_id,
                "last_revision_id": last_revision_id,
            },
        }
    )
    print(f"Created a topic:\n{response}")

except AlreadyExists:
    print(f"{topic_id} already exists.")
    raise
except InvalidArgument:
    print("Please choose either BINARY or JSON as a valid message encoding type.")
    raise
```

### Edit the schema of a topic (gcloud)

Changing the schema or encoding of a topic, or removing the schema, might break publishers that are actively publishing. Changes can take a few minutes to take effect.

Adapted (not in the official docs): trailing `\` after the last flag removed, as above.

```bash
gcloud pubsub topics update TOPIC_ID \
        --message-encoding=ENCODING_TYPE \
        --schema=SCHEMA_NAME \
        --first-revision-id=FIRST_REVISION_ID \
        --last-revision-id=LAST_REVISION_ID
```

### Edit the revision range (REST)

Request to `projects.topics.patch`:

```text
PATCH https://pubsub.googleapis.com/v1/projects/PROJECT_ID/topics/TOPIC_ID
Authorization: Bearer ACCESS_TOKEN
```

Adapted (not in the official docs): the source body places a bare `"update_mask":` inside `schemaSettings` and lacks commas, so it is not valid JSON. The `UpdateTopicRequest` in the Pub/Sub v1 Discovery document takes `topic` and a required `updateMask`; the body is rewritten that way, with the mask value `schemaSettings.firstRevisionId,schemaSettings.lastRevisionId` as the source's Python sample writes it.

```json
{
  "topic": {
    "name": "projects/PROJECT_ID/topics/TOPIC_ID",
    "schemaSettings": {
      "schema": "SCHEMA_NAME",
      "encoding": "ENCODING_TYPE",
      "firstRevisionId": "FIRST_REVISION_ID",
      "lastRevisionId": "LAST_REVISION_ID"
    }
  },
  "updateMask": "schemaSettings.firstRevisionId,schemaSettings.lastRevisionId"
}
```

## Options / Props

### Parameters

| Name | Values | Description |
|------|--------|-------------|
| `--message-encoding` / `encoding` | `JSON` or `BINARY` | Encoding of messages validated against the schema (required with a schema) |
| `--schema` / `schema` | schema ID; REST: `projects/PROJECT_ID/schemas/SCHEMA_ID` | The schema to validate against |
| `--first-revision-id` / `firstRevisionId` | revision ID | ID of the oldest revision to validate against; optional |
| `--last-revision-id` / `lastRevisionId` | revision ID | ID of the newest revision to validate against; optional |
| `--schema-project` | project ID | Project of the schema when it differs from the topic's project |
| `--project` | project ID | Project of the topic (`TOPIC_PROJECT`) |

### Revision-range validation (schema `S`, revisions `A`, `B`, `C`, `D` created in order, none identical or a rollback of another)

| Setting | Accepted | Rejected |
|---------|----------|----------|
| Only first revision allowed = `B` | `B`, `C`, `D` | `A` |
| Only last revision allowed = `C` | `A`, `B`, `C` | `D` |
| First = `B` and last = `C` | `B`, `C` | `A`, `D` |
| First = last = one revision ID | only that revision | all others |

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
| Configure the IAM policy for a schema | `pubsub.schemas.setIamPolicy` (not in `roles/pubsub.editor`; in `roles/pubsub.admin`, see Notes) |

## Notes

- Source inconsistency: the source lists `pubsub.schemas.setIamPolicy` among the permissions of the Pub/Sub Editor role (`roles/pubsub.editor`), but the IAM roles reference (`references/iam/pubsub.md`, retrieved 2026-11-14) lists only `pubsub.schemas.getIamPolicy` for that role. `pubsub.schemas.setIamPolicy` is in Pub/Sub Admin (`roles/pubsub.admin`); grant it, or a custom role with that permission, to the principal that changes a schema's IAM policy.
- A schema can be associated with one or more topics. Associate a schema when you create or edit a topic. A schema can be in a different project from the topic; you need the permissions in each project.
- If a schema associated with a topic has revisions, messages must match the encoding and validate against a revision within the available range. Revisions are tried in reverse chronological order based on creation time. If they do not validate, the message fails to publish.
- If you do not specify a first revision, the oldest existing revision is used; if you do not specify a last revision, the newest existing revision is used. If you do not specify a range, the entire range is used.
- With the `JSON` encoding and an Avro schema, pay close attention to the Avro encoding rules for unions: https://avro.apache.org/docs/1.11.1/specification/#json-encoding
- Both `--first-revision-id` and `--last-revision-id` (REST: `firstRevisionId`, `lastRevisionId`) are optional; they are omitted from the response if not provided. After a patch that does not provide them, they are not set.
- gcloud 593.0.0 help for `gcloud pubsub topics update`: "When updating SchemaSettings flags, all SchemaSettings flags must be specified. Otherwise, any omitted SchemaSettings flags revert to their default value." The same help lists a `--clear-schema-settings` flag ("clear the Schema Settings from the topic"). The help lists the encoding choices as `json, binary`.
- Corrected from the official docs: the REST patch body's bare `"update_mask":` became a top-level `"updateMask"` with the value from the source's Python sample (`schemaSettings.firstRevisionId,schemaSettings.lastRevisionId`); the Python create sample's `except` branches printed and continued, and now re-raise. The gcloud examples ended with a trailing `\` after the last flag; the REST create / patch bodies lacked commas, and the patch body had a bare `"update_mask":` inside `schemaSettings`. The source tags its Python revision-range update sample as `java`; that sample is omitted here (see the REST form and the mask above).
- Irreversible / disruptive: editing or removing the schema association can break publishers that are actively publishing; try it on a disposable project or topic first.
- The source also shows Console, C++, C#, Go, Java, PHP and Ruby forms, and a JavaScript variant of the Node.js create sample.
- Source: https://docs.cloud.google.com/pubsub/docs/associate-schema-topic (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [schemas.md](./schemas.md)
- [create-schemas.md](./create-schemas.md)
- [validate-schema-message.md](./validate-schema-message.md)
- Commit a schema revision: https://docs.cloud.google.com/pubsub/docs/commit-schema-revision
- Publish messages to a topic with a schema: https://docs.cloud.google.com/pubsub/docs/publish-topics-schema
- Validate a schema definition: https://docs.cloud.google.com/pubsub/docs/validate-schema-definition
- gcloud: https://docs.cloud.google.com/sdk/gcloud/reference/pubsub/topics/create
