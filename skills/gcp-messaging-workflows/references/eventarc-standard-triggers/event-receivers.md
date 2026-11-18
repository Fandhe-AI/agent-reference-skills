---
source: https://docs.cloud.google.com/eventarc/standard/docs/run/event-receivers
---

# Create an Event Receiver Service

An Eventarc Standard target service receives HTTP requests that carry the event in CloudEvents format (CNCF's event format; Eventarc is the Google Cloud router). The page shows receiver samples for services deployed to Cloud Run (covered by the `gcp-run` skill) for Cloud Audit Logs and Pub/Sub events.

## Signature / Usage

### Cloud Audit Logs receiver (Cloud Storage events)

Python:

```python
@app.route("/", methods=["POST"])
def index():
    # Create a CloudEvent object from the incoming request
    event = from_http(request.headers, request.data)
    # Gets the GCS bucket name from the CloudEvent
    # Example: "storage.googleapis.com/projects/_/buckets/my-bucket"
    bucket = event.get("subject")

    print(f"Detected change in Cloud Storage bucket: {bucket}")
    return (f"Detected change in Cloud Storage bucket: {bucket}", 200)
```

Node.js:

```javascript
const express = require('express');
const app = express();

app.use(express.json());
app.post('/', (req, res) => {
  if (!req.header('ce-subject')) {
    return res
      .status(400)
      .send('Bad Request: missing required header: ce-subject');
  }

  console.log(
    `Detected change in Cloud Storage bucket: ${req.header('ce-subject')}`
  );
  return res
    .status(200)
    .send(
      `Detected change in Cloud Storage bucket: ${req.header('ce-subject')}`
    );
});

module.exports = app;
```

### Pub/Sub receiver

Python:

```python
@app.route("/", methods=["POST"])
def index():
    data = request.get_json()
    if not data:
        msg = "no Pub/Sub message received"
        print(f"error: {msg}")
        return f"Bad Request: {msg}", 400

    if not isinstance(data, dict) or "message" not in data:
        msg = "invalid Pub/Sub message format"
        print(f"error: {msg}")
        return f"Bad Request: {msg}", 400

    pubsub_message = data["message"]

    name = "World"
    if isinstance(pubsub_message, dict) and "data" in pubsub_message:
        name = base64.b64decode(pubsub_message["data"]).decode("utf-8").strip()

    resp = f"Hello, {name}! ID: {request.headers.get('ce-id')}"
    print(resp)

    return (resp, 200)
```

Node.js:

```javascript
const express = require('express');
const {
  toMessagePublishedData,
} = require('@google/events/cloud/pubsub/v1/MessagePublishedData');
const app = express();

app.use(express.json());
app.post('/', (req, res) => {
  if (!req.body) {
    const errorMessage = 'no Pub/Sub message received';
    res.status(400).send(`Bad Request: ${errorMessage}`);
    console.log(`Bad Request: ${errorMessage}`);
    return;
  }
  if (!req.body.message) {
    const errorMessage = 'invalid Pub/Sub message format';
    res.status(400).send(`Bad Request: ${errorMessage}`);
    console.log(`Bad Request: ${errorMessage}`);
    return;
  }
  // Cast to MessagePublishedEvent for IDE autocompletion
  const pubSubMessage = toMessagePublishedData(req.body);
  const name =
    pubSubMessage.message && pubSubMessage.message.data
      ? Buffer.from(pubSubMessage.message.data, 'base64').toString().trim()
      : 'World';

  const result = `Hello, ${name}! ID: ${req.get('ce-id') || ''}`;
  console.log(result);
  res.send(result);
});

module.exports = app;
```

## Options / Props

| Item | Description |
|---|---|
| Success response | Send an HTTP `2xx` response to signal successful receipt. The router treats all other HTTP responses as delivery failures and resends the event. |
| Event sources | Directly from a Google Cloud source, or using Cloud Audit Logs. |
| CloudEvents SDKs | C#, Go, Java, JavaScript, Python, Ruby (open source; transform the HTTP request into a language-idiomatic CloudEvents object). |
| Open source repository | `googleapis/google-cloudevents`: Protocol Buffers for CloudEvents data payloads, generated JSON schemas, a public JSON schema catalog, and client library links. |

## Notes

- Because non-`2xx` responses are retried, receivers should be idempotent; the samples return `400` for malformed requests, which also triggers a resend.
- The samples do not verify any token themselves. Keep the Cloud Run service authenticated and grant `roles/run.invoker` to the trigger service account (see `roles-permissions.md`); if the service allows unauthenticated access, anyone with its URL can post requests to it.
- The Python samples are fragments: the source omits the Flask `app`, imports such as `from_http` (from the CloudEvents SDK) and `base64`.
- The source also shows Java, Go and C# receivers, which are omitted here.
- Source: https://docs.cloud.google.com/eventarc/standard/docs/run/event-receivers (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [create-trigger-pub-sub-gcloud.md](./create-trigger-pub-sub-gcloud.md)
- [create-trigger-cloud-audit-logs-gcloud.md](./create-trigger-cloud-audit-logs-gcloud.md)
- [roles-permissions.md](./roles-permissions.md)
