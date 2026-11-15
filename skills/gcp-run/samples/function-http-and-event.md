---
source: https://docs.cloud.google.com/run/docs/write-functions
---

# Write and Deploy Cloud Run Functions (HTTP and Event-Driven)

Write an HTTP function and a CloudEvent function with the Functions Framework in Node.js and Python, deploy them from source, and add an Eventarc trigger for the event-driven one.

## Signature / Usage

### 1. Enable APIs and grant Cloud Run Builder

```bash
gcloud services enable artifactregistry.googleapis.com \
    cloudbuild.googleapis.com \
    run.googleapis.com \
    logging.googleapis.com
```

```bash
gcloud services enable eventarc.googleapis.com
```

Replace `PROJECT_NUMBER` with the project number and `PROJECT_ID` with the project ID; allow a couple of minutes for propagation.

```bash
  gcloud projects add-iam-policy-binding PROJECT_ID \
      --member=serviceAccount:PROJECT_NUMBER-compute@developer.gserviceaccount.com \
      --role=roles/run.builder
```

### 2. Node.js layout and HTTP function (ES module)

```text
.
├── index.js
└── package.json
```

If you write CommonJS (`require`) instead, remove the `"type": "module"` entry together with the comma before it.

```json
{
  "main": "index.js",
  "dependencies": {
    "@google-cloud/functions-framework": "^3.0.0"
  },
  "type": "module"
}
```

```javascript
import { http } from '@google-cloud/functions-framework';
// Register an HTTP function with the Functions Framework that executes
// when you make an HTTP request to the deployed function's endpoint.
http('helloGET', (req, res) => {
  res.send('Hello World!');
});
```

### 3. Node.js CloudEvent function (ES module)

```javascript
  import { cloudEvent } from "@google-cloud/functions-framework";
  cloudEvent('myCloudEventFunction', cloudEvent => {
    // Your code here
    // Access the CloudEvent data payload using cloudEvent.data
  });
```

### 4. Python layout, HTTP function and CloudEvent function

```text
.
├── main.py
└── requirements.txt
```

Contents of `requirements.txt`:

```text
functions-framework==3.*
```

```python
import functions_framework

# Register an HTTP function with the Functions Framework
@functions_framework.http
def my_http_function(request):
  # Your code here

  # Return an HTTP response
  return 'OK'
```

Adapted (not in the official docs): added a `pass` statement; the source's function body is only comments, which is an `IndentationError`.

```python
import functions_framework

# Register a CloudEvent function with the Functions Framework
@functions_framework.cloud_event
def my_cloudevent_function(cloud_event):
  # Your code here
  # Access the CloudEvent data payload via cloud_event.data
  pass
```

### 5. Deploy

`FUNCTION_ENTRYPOINT` is the name registered with the framework (for example `helloGET`). `BASE_IMAGE` examples: `nodejs24`, `python314`.

```bash
gcloud run deploy FUNCTION \
       --source . \
       --function FUNCTION_ENTRYPOINT \
       --base-image BASE_IMAGE \
       --region REGION
```

### 6. Add an Eventarc trigger (event-driven function only)

```bash
gcloud eventarc triggers create EVENTARC_TRIGGER_NAME \
    --location=EVENTARC_TRIGGER_LOCATION \
    --destination-run-service=FUNCTION \
    --destination-run-region=REGION \
    --event-filters="type=EVENTARC_FILTER_TYPE" \
    --event-filters="EVENTARC_EVENT_FILTER" \
    --service-account=EVENTARC_TRIGGER_SERVICE_ACCOUNT
```

## Options / Props

| Runtime | Main file / layout | Framework dependency |
|---|---|---|
| Node.js | `index.js` at root (override with `main` in `package.json`) | `@google-cloud/functions-framework` |
| Python | `main.py` at root (must be named `main.py`) | `functions-framework==3.*` in `requirements.txt` |

| Signature type | Use |
|---|---|
| HTTP | Needs a URL endpoint, for example webhooks |
| CloudEvent | Triggered directly by events such as Pub/Sub messages or Cloud Storage changes (through Eventarc) |

## Notes

- The sample deploy does not pass `--allow-unauthenticated`, so the function stays private. Public HTTP functions such as webhooks make the service publicly accessible and are only for intentionally public content.
- Corrected from the official docs: the CloudEvent Python sample `def my_cloudevent_function(cloud_event):` has a body of only comments (IndentationError); added `pass`.
- The source's only `package.json` sets `"type": "module"`, but the source also has CommonJS samples (not copied here) that use `require(...)`, which fails under it; remove the entry for CommonJS code.
- Terminate or resolve background work (threads, Promises, callbacks) before the function responds or returns. The trigger-overview page says a function cannot be bound to more than one trigger at a time; that reads as the deploy-time trigger of Cloud Functions v2 API (`gcloud functions`) functions, while functions deployed with `gcloud run deploy` get triggers as separate Eventarc trigger resources (a service can have "one or more Eventarc triggers", https://docs.cloud.google.com/run/docs/managing/services). An Eventarc trigger's event type can't be changed after creation; create a new trigger and delete the old one.
- Use a dedicated user-managed service account for the Eventarc trigger rather than the default compute one; grant it `roles/run.invoker` on the function, plus any trigger-specific roles listed in Roles and permissions for Cloud Run targets (https://docs.cloud.google.com/eventarc/docs/roles-permissions). Do not give a trigger identity broad deployer roles such as `roles/resourcemanager.projectIamAdmin`.
- Eventarc uses Pub/Sub transport with a default retry policy; consider a dead-letter topic.
- Cloud Run / Cloud Run functions are Google Cloud's serverless containers/functions, distinct from Cloudflare Workers (`cloudflare-workers`), Vercel Functions (`vercel`), and HTTP frameworks (`hono`, `fastify`) that only run inside the container.
- Source: https://docs.cloud.google.com/run/docs/write-functions (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/run/docs/deploy-functions (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/run/docs/function-triggers (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/run/docs/managing/services (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)

## Related

- [pubsub-push-and-eventarc-trigger.md](./pubsub-push-and-eventarc-trigger.md)
- [upgrade-functions-gen1.md](./upgrade-functions-gen1.md)
- Triggers: https://docs.cloud.google.com/run/docs/function-triggers
