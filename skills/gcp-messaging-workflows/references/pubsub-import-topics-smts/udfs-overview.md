---
source: https://docs.cloud.google.com/pubsub/docs/smts/udfs-overview
---

# JavaScript User-Defined Functions (UDF SMTs)

A JavaScript user-defined function (UDF) is a type of Single Message Transform (SMT) that applies custom logic to one message on a topic or subscription. A UDF has code (the JavaScript) and a function name (the function Pub/Sub applies). It receives a message and metadata, and returns a transformed message or `null` to filter it.

## Signature / Usage

### Function signature

Adapted (not in the official docs): the source's placeholder `<function_name>` is written as `FUNCTION_NAME` so the signature is valid JavaScript.

```javascript
  /**
  * Transforms a Pub/Sub message.
  * @return {(Object<string, (string | Object<string, string>)>|* null)} - To
  * filter a message, return `null`. To transform a message, return a map with
  * the following keys:
  *   - (required) 'data' : {string}
  *   - (optional) 'attributes' : {Object<string, string>}
  * Returning empty `attributes` will remove all attributes from the message.
  *
  * @param  {(Object<string, (string | Object<string, string>)>} - Pub/Sub
  * message. Keys:
  *   - (required) 'data' : {string}
  *   - (required) 'attributes' : {Object<string, string>}
  *
  * @param  {Object<string, any>} metadata - Pub/Sub message metadata.
  * Keys:
  *   - (optional) 'message_id'  : {string}
  *   - (optional) 'publish_time': {string} YYYY-MM-DDTHH:MM:SSZ format
  *   - (optional) 'ordering_key': {string}
  */
  function FUNCTION_NAME(message, metadata) {
    // Perform custom transformation logic
    return message; // to filter a message instead, return `null`
  }
```

### Definition file for gcloud

Adapted (not in the official docs): the source's YAML and JSON templates use the unquoted placeholders `{ FUNCTION_CODE }` and `FUNCTION_NAME` (and the JSON lacks a comma between the keys). Both are written as valid files using the source's `redactSSN` example, and the JSON is a list like the YAML (the source's JSON is a single object, which gcloud rejects; see Notes).

```yaml
- javascriptUdf:
    code: |
      function redactSSN(message, metadata) {
        const data = JSON.parse(message.data);
        delete data['ssn'];
        message.data = JSON.stringify(data);
        return message;
      }
    functionName: redactSSN
```

Adapted (not in the official docs): the JSON form of the same file, with the source's placeholders filled in from its `redactSSN` example, the missing comma added, and the object wrapped in a list.

```json
[
  {
    "javascriptUdf": {
      "code": "function redactSSN(message, metadata) {\n  const data = JSON.parse(message.data);\n  delete data['ssn'];\n  message.data = JSON.stringify(data);\n  return message;\n}\n",
      "functionName": "redactSSN"
    }
  }
]
```

### Create a topic or subscription with the UDF SMT

```bash
gcloud pubsub topics create TOPIC_ID \
  --message-transforms-file=TRANSFORMS_FILE
```

```bash
gcloud pubsub subscriptions create SUBSCRIPTION_ID \
  --topic=projects/PROJECT_ID/topics/TOPIC_ID \
  --message-transforms-file=TRANSFORMS_FILE
```

### Sample UDFs

Convert a day-of-week integer to a string.

Adapted (not in the official docs): the source's `switch(`data["dayOfWeek"]`)` switches on a template-literal string, so no case ever matches and the field is always `Unknown`; it is changed to `switch (data["dayOfWeek"])`.

```javascript
function intToString(message, metadata) {
  const data = JSON.parse(message.data);
  switch (data["dayOfWeek"]) {
    case 0:
      data["dayOfWeek"] = "Sunday";
      break;
    case 1:
      data["dayOfWeek"] = "Monday";
      break;
    case 2:
      data["dayOfWeek"] = "Tuesday";
      break;
    case 3:
      data["dayOfWeek"] = "Wednesday";
      break;
    case 4:
      data["dayOfWeek"] = "Thursday";
      break;
    case 5:
      data["dayOfWeek"] = "Friday";
      break;
    case 6:
      data["dayOfWeek"] = "Saturday";
      break;
    default:
      data["dayOfWeek"] = "Unknown";
  }
  message.data = JSON.stringify(data);
  return message;
}
```

Filter out and auto-ack messages whose `region` is not `US`.

```javascript
function filterForUSRegion(message, metadata) {
  const data = JSON.parse(message.data);
  if (data["region"] !== "US") {
    return null;
  }
  return message;
}
```

Validate that `amount` is not greater than 100 (throws an error otherwise).

```javascript
function validateAmount(message, metadata) {
  const data = JSON.parse(message.data);
  if (data["amount"] > 100) {
    throw new Error("Amount is invalid");
  }
  return message;
}
```

## Options / Props

### Limitations

| Limit | Value |
|-------|-------|
| Code size | Maximum 20 KB of code per UDF |
| Execution time | Maximum 500 ms per message |
| Language features | Only ECMAScript standard built-ins |
| External calls | No calls to external APIs |
| Libraries | No imports of external libraries |
| SMTs per topic or subscription | Up to 5 (see `smts-overview.md`) |

### Inputs and outputs

| Item | Description |
|------|-------------|
| `message.data` | `String`, required. The message payload. |
| `message.attributes` | `Object<String, String>`, optional. Message attributes. |
| `metadata.message_id` | `String`, optional. Unique message ID. |
| `metadata.publish_time` | `String`, optional. RFC 3339 format `YYYY-MM-DDTHH:mm:ssZ`. |
| `metadata.ordering_key` | `String`, optional. Ordering key, if applicable. |
| Return | The altered `message` object to transform, or `null` to filter. |
| Encoding | If the UDF transforms the payload, input and output must be UTF-8 strings; if not, any encoding. Attribute keys and values must be UTF-8 strings. |

### Result of running a UDF

| Outcome | Topic SMT | Subscription SMT |
|---------|-----------|------------------|
| Transforms the message | Transformed message is stored and delivered to all subscribers | Transformed message is delivered to that subscription only |
| Returns `null` | Success and a message ID returned to the publisher; the message is not stored or sent | Delivery is acknowledged without sending to a subscriber |
| Throws an error | Error returned to the publisher; none of the messages are published | Message is negatively acknowledged |

## Notes

- Topic SMTs run before Pub/Sub stores the message and the results are visible to all subscribers; subscription SMTs run before delivery and apply only to that subscription.
- The `metadata` argument is immutable. Returning empty `attributes` removes all attributes from the message.
- The SMT can be created disabled (Console option **Disable transform**) and enabled later by editing the topic.
- Corrected from the official docs: `switch(`data["dayOfWeek"]`)` was changed to `switch (data["dayOfWeek"])`; the `<function_name>` placeholder was changed to `FUNCTION_NAME`; the YAML / JSON definition templates (`code: { FUNCTION_CODE }`, missing comma in the JSON) were replaced by valid files built from the source's `redactSSN` example.
- Corrected from the official docs: the source's JSON template is a single object, but gcloud reads `--message-transforms-file` as a list of transforms. `GetMessageTransformsFromFile` in gcloud 593.0.0 (`lib/googlecloudsdk/api_lib/pubsub/utils.py`) loads the file with a YAML parser that also accepts JSON and raises `MessageTransformsInvalidFormatError` when the top level is not a list. Both files are therefore lists, one element per transform, applied in order; the REST field `messageTransforms` is likewise an array of `MessageTransform` objects with `javascriptUdf` (`code`, `functionName`) and `disabled`.
- Every sample UDF throws if the payload is not JSON (it calls `JSON.parse`).
- The source also shows the Console steps (including generating UDF code with Gemini Enterprise) and more samples in the UDF library at https://github.com/GoogleCloudPlatform/pubsub/tree/master/udfs.
- Source: https://docs.cloud.google.com/pubsub/docs/smts/udfs-overview (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [smts-overview.md](./smts-overview.md)
- [create-cloud-storage-import-topic.md](./create-cloud-storage-import-topic.md)
