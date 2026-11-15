---
source: https://docs.cloud.google.com/run/docs/triggering/using-tasks
---

# Cloud Tasks Queue with an HTTP Target Task to Cloud Run

Create a Cloud Tasks queue, give a dedicated service account `roles/run.invoker` on a private Cloud Run service, and enqueue an HTTP task that carries an OIDC token for that account.

## Signature / Usage

Enable the Cloud Tasks API. The service stays private (authentication required) and must return HTTP `200` after it processes a task.

### 1. Create the queue

Use the same location as the Cloud Run service for `LOCATION`. The queue name has three parts: project ID, location and queue ID.

```bash
gcloud tasks queues create QUEUE_ID \
    --location=LOCATION
```

### 2. Create the task service account and allow it to invoke the service

```bash
gcloud iam service-accounts create SERVICE_ACCOUNT_NAME \
   --display-name "DISPLAYED_SERVICE_ACCOUNT_NAME"
```

```bash
gcloud run services add-iam-policy-binding SERVICE \
   --member=serviceAccount:SERVICE_ACCOUNT_NAME@PROJECT_ID.iam.gserviceaccount.com \
   --role=roles/run.invoker
```

### 3a. Enqueue an HTTP task with an OIDC token (Python)

The code that creates tasks needs permission to enqueue (Cloud Tasks Enqueuer) and `iam.serviceAccounts.actAs` (for example Service Account User) on `SERVICE_ACCOUNT_NAME`, the account named in the OIDC token.

Pass `url` as the Cloud Run service URL plus the handler path, and `audience` as the service URL without a path (or a configured custom audience). If `audience` is omitted, Cloud Tasks uses the full task URL, and Cloud Run rejects the token when that URL has a path.

Adapted (not in the official docs): `audience` is a required argument instead of `Optional[str] = None`, and the unused `Optional` import is removed, so the token audience is always the Cloud Run service URL.

```python
from google.cloud import tasks_v2


def create_http_task_with_token(
    project: str,
    location: str,
    queue: str,
    url: str,
    payload: bytes,
    service_account_email: str,
    audience: str,
) -> tasks_v2.Task:
    """Create an HTTP POST task with an OIDC token and an arbitrary payload.
    Args:
        project: The project ID where the queue is located.
        location: The location where the queue is located.
        queue: The ID of the queue to add the task to.
        url: The target URL of the task.
        payload: The payload to send.
        service_account_email: The service account to use for generating the OIDC token.
        audience: Audience to use when generating the OIDC token.
    Returns:
        The newly created task.
    """

    # Create a client.
    client = tasks_v2.CloudTasksClient()

    # Construct the request body.
    task = tasks_v2.Task(
        http_request=tasks_v2.HttpRequest(
            http_method=tasks_v2.HttpMethod.POST,
            url=url,
            oidc_token=tasks_v2.OidcToken(
                service_account_email=service_account_email,
                audience=audience,
            ),
            body=payload,
        ),
    )

    # Use the client to build and send the task.
    return client.create_task(
        tasks_v2.CreateTaskRequest(
            parent=client.queue_path(project, location, queue),
            task=task,
        )
    )
```

`requirements.txt`:

```text
google-cloud-tasks==2.18.0
```

### 3b. Or enqueue with Node.js

Adapted (not in the official docs): added `audience` (the Cloud Run service URL, no path) to `oidcToken` and a Cloud Run URL with a handler path as the example `url`; the source's `oidcToken` has only `serviceAccountEmail`.

```javascript
// Imports the Google Cloud Tasks library.
const {CloudTasksClient} = require('@google-cloud/tasks');

// Instantiates a client.
const client = new CloudTasksClient();

async function createHttpTaskWithToken() {
  // TODO(developer): Uncomment these lines and replace with your values.
  // const project = 'my-project-id';
  // const queue = 'my-queue';
  // const location = 'us-central1';
  // const url = 'https://my-cloud-run-service.run.app/taskhandler';
  // const audience = 'https://my-cloud-run-service.run.app/';
  // const serviceAccountEmail = 'client@<project-id>.iam.gserviceaccount.com';
  // const payload = 'Hello, World!';

  // Construct the fully qualified queue name.
  const parent = client.queuePath(project, location, queue);

  const task = {
    httpRequest: {
      headers: {
        'Content-Type': 'text/plain', // Set content type to ensure compatibility your application's request parsing
      },
      httpMethod: 'POST',
      url,
      oidcToken: {
        serviceAccountEmail,
        audience,
      },
    },
  };

  if (payload) {
    task.httpRequest.body = Buffer.from(payload).toString('base64');
  }

  console.log('Sending task:');
  console.log(task);
  // Send create task request.
  const request = {parent: parent, task: task};
  const [response] = await client.createTask(request);
  const name = response.name;
  console.log(`Created task ${name}`);
}
createHttpTaskWithToken();
```

### 4. Inspect the queue

```bash
gcloud tasks queues describe QUEUE_ID \
    --location=LOCATION
```

## Options / Props

| Item | Detail |
|---|---|
| Handler timeout | Default 10 minutes, maximum 30 minutes; use Cloud Run jobs for longer work |
| Payload requests | Tasks with a payload must use `POST` or `PUT` |
| Service account | Must be in the same project as the queue. Task creator: Cloud Tasks Enqueuer plus `iam.serviceAccounts.actAs` on it. Cloud Tasks service agent: the Cloud Tasks Service Agent role (`roles/cloudtasks.serviceAgent`, which includes `iam.serviceAccounts.getOpenIdToken`) is what lets it mint the token; it is granted automatically unless the API was enabled before March 19, 2019, so check it and re-grant it if missing (see Notes for the source's extra Service Account User step) |
| OIDC `audience` | The Cloud Run service URL (no path) or a configured custom audience; if omitted, Cloud Tasks uses the task's target URL |
| Queue defaults | `maxDispatchesPerSecond` 500, `maxBurstSize` 100, `maxConcurrentDispatches` 1000, `maxAttempts` 100, `minBackoff` 0.100s, `maxBackoff` 3600s, `maxDoublings` 16 |

## Notes

- Use a dedicated user-managed service account for the task identity, not the default compute service account; keep the service private.
- A task that sets `oidcToken.serviceAccountEmail` can only be created by a caller with `iam.serviceAccounts.actAs` on that service account (Cloud Tasks v2 API reference, `OidcToken.serviceAccountEmail`; task resource: https://docs.cloud.google.com/tasks/docs/reference/rest/v2/projects.locations.queues.tasks#Task).
- Source inconsistency: https://docs.cloud.google.com/run/docs/triggering/using-tasks says the service must return HTTP `200` to confirm success; https://docs.cloud.google.com/tasks/docs/dual-overview says any HTTP response code from 200 to 299 is success.
- The source's Console step also shows a project-level `roles/run.invoker` grant; the per-service binding in step 2 is enough and safer.
- Source inconsistency: https://docs.cloud.google.com/run/docs/triggering/using-tasks says to create an App Engine app if prompted, while https://docs.cloud.google.com/tasks/docs/creating-queues says HTTP target tasks do not need one. Pass `--location` instead of creating an App Engine app (its region cannot be changed later).
- A new queue can take a few minutes to become available. Tasks created with a name are deduplicated at some latency cost.
- Cloud Run / Cloud Run functions are Google Cloud's serverless containers/functions, distinct from Cloudflare Workers (`cloudflare-workers`), Vercel Functions (`vercel`), and HTTP frameworks (`hono`, `fastify`) that only run inside the container. Client libraries in general: the `gcp-client-libraries` skill (planned).
- The `gcloud run` commands that omit `--region` follow the source; pass `--region=REGION` or set the `run/region` property (for example `gcloud config set run/region REGION`), otherwise gcloud prompts for a region or, in non-interactive runs, fails.
- Corrected from the official docs: the Python sample declares `audience: Optional[str] = None` (with `from typing import Optional`), so the audience can be omitted. When `audience` is omitted, "the URI specified in target will be used" (Cloud Tasks v2 `OidcToken.audience`, https://docs.cloud.google.com/tasks/docs/reference/rest/v2/OidcToken), but Cloud Run requires the `aud` claim to be "the URL of the receiving service or a configured custom audience" (https://docs.cloud.google.com/run/docs/authenticating/service-to-service), so a token whose audience is a URL with a handler path is rejected. `audience` is now a required argument, passed separately from the request `url`.
- Corrected from the official docs: the Node.js sample sends `oidcToken: {serviceAccountEmail}` (no `audience`) with `url` `'https://example.com/taskhandler'`, so the token audience defaults to the full task URL including `/taskhandler`. `oidcToken` now also carries `audience` (the service URL), and the example values are `https://my-cloud-run-service.run.app/taskhandler` / `https://my-cloud-run-service.run.app/`; that URL form is taken from the service-to-service page.
- Service agent permissions: the source's setup steps also grant Service Account User (`roles/iam.serviceAccountUser`) to the Cloud Tasks service agent (`service-PROJECT_NUMBER@gcp-sa-cloudtasks.iam.gserviceaccount.com`) on the token service account. The token-minting permission (`iam.serviceAccounts.getOpenIdToken`) comes from the Cloud Tasks Service Agent role; `iam.serviceAccounts.actAs` is required of the principal that creates the task. If you follow the source's extra step, grant it only on that one service account, never at project level.
- Source: https://docs.cloud.google.com/run/docs/authenticating/service-to-service (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/run/docs/triggering/using-tasks (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/tasks/docs/creating-queues (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/tasks/docs/creating-http-target-tasks (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)

## Related

- [scheduler-oidc-private-service.md](./scheduler-oidc-private-service.md)
- [service-to-service-id-token.md](./service-to-service-id-token.md)
- Queue configuration: https://docs.cloud.google.com/tasks/docs/configuring-queues
