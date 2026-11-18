---
source: https://docs.cloud.google.com/pubsub/docs/validate-schema-message
---

# Validate a message for a schema

Check that a message adheres to a schema before or after you create the schema resource, so that messages sent through a topic associated with a schema match before the schema is applied. You can test a message against an existing schema (a specific revision in the console) or against an inline schema definition.

## Signature / Usage

### gcloud synopsis

Validate a message with `gcloud pubsub schemas validate-message`. The source shows this form:

```text
gcloud pubsub schemas validate-message --message=MESSAGE \
    --message-encoding=MESSAGE_ENCODING \
    (--schema-name=SCHEMA_NAME | \
    --type=TYPE \
    (--definition=DEFINITION | \
    --definition-file=DEFINITION_FILE))
```

### Validate against an inline Protocol Buffer schema

The example from the gcloud 593.0.0 help for `gcloud pubsub schemas validate-message`:

```bash
gcloud pubsub schemas validate-message --message="{\"key\": \
    \"my-key\"}" --message-encoding=JSON --definition="syntax = \
    'proto3'; message Message { optional string key = 1; \
    }" --type=PROTOCOL_BUFFER
```

### Validate against an inline Avro schema

Adapted (not in the official docs): the gcloud 593.0.0 help example for the Avro schema omits the required `--message` and `--message-encoding` flags; both are added (the message `{"key": "my-key"}` matches the `KeyMsg` schema).

```bash
gcloud pubsub schemas validate-message \
    --message='{"key": "my-key"}' \
    --message-encoding=json \
    --definition='{ "type": "record", "namespace": "my.ns", "name": "KeyMsg", "fields": [ { "name": "key", "type": "string" } ] }' \
    --type=AVRO
```

## Options / Props

### Flags

| Flag | Values | Description |
|------|--------|-------------|
| `--message` | string | Message to validate against the schema (required) |
| `--message-encoding` | `binary` or `json` | Encoding of the message (required) |
| `--schema-name` | name or full path | Name or full path of an existing schema (exactly one of this or the inline group) |
| `--type` | `avro` or `protocol-buffer` | Type of the inline schema; must be specified if any other inline-schema argument is specified |
| `--definition` | string | Inline schema definition (exactly one of `--definition` / `--definition-file`) |
| `--definition-file` | path | File containing the schema definition |

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

- In the console: open **Pub/Sub schemas**, click the **Schema ID**, click a revision in **Revisions**, click **Test message** in **Details**, select a **Message encoding**, enter the message body and click **Test**.
- The source grants `roles/pubsub.editor` on the project. A schema can be created in one project and attached to a topic in a different project; you need the required permissions for each project.
- The source gcloud block is a synopsis with placeholders: `MESSAGE_ENCODING` is `binary` or `json`; `TYPE` is `avro` or `protocol-buffer`.
- Corrected from the official docs: the gcloud 593.0.0 help example "To validate an equivalent AVRO schema" (`gcloud pubsub schemas validate-message --definition=... --type=AVRO`) has no `--message` or `--message-encoding`, which the synopsis marks as required.
- To validate a schema definition itself (without a message), the gcloud 593.0.0 help has `gcloud pubsub schemas validate-schema --type=TYPE (--definition=DEFINITION | --definition-file=PATH_TO_FILE)`.
- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/pubsub/schemas/validate-message (gcloud 593.0.0 help): both inline-schema examples.
- Source: https://docs.cloud.google.com/pubsub/docs/validate-schema-message (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [schemas.md](./schemas.md)
- [create-schemas.md](./create-schemas.md)
- [associate-schema-topic.md](./associate-schema-topic.md)
- gcloud: https://docs.cloud.google.com/sdk/gcloud/reference/pubsub/schemas/validate-message
