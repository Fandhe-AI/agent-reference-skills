---
source: https://docs.cloud.google.com/run/docs/triggering/using-tasks
---

# Run services asynchronously with Cloud Tasks

Use Cloud Tasks to enqueue tasks that are pushed over HTTPS to a private Cloud Run service. Use cases: preserving requests through incidents, smoothing traffic spikes, delegating slow background work, and limiting the call rate to backing services.

## Signature / Usage

### Create the queue

Adapted (not in the official docs): added `--location=REGION`; without it gcloud falls back to the location of the project's App Engine app.

```bash
gcloud tasks queues create QUEUE-ID \
    --location=REGION
```

`QUEUE-ID` must be unique in the project. Use the same location as your Cloud Run service for `REGION`. The source runs the command without `--location` and says that if you are prompted to create an App Engine app, respond `y` and choose the same location as your Cloud Run service.

### Create a service account for the tasks and allow it to invoke the service

```bash
gcloud iam service-accounts create SERVICE_ACCOUNT_NAME \
   --display-name "DISPLAYED_SERVICE_ACCOUNT_NAME"
```

```bash
gcloud run services add-iam-policy-binding SERVICE \
   --member=serviceAccount:SERVICE_ACCOUNT_NAME@PROJECT_ID.iam.gserviceaccount.com \
   --role=roles/run.invoker
```

### Create an HTTP task with an OIDC token (Python)

Pass `url` as the Cloud Run service URL plus the handler path, and `audience` as the service URL without a path (or a configured custom audience).

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

### Create an HTTP task with an OIDC token (Node.js)

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

## Options / Props

| Item | Detail |
|---|---|
| API to enable | Cloud Tasks API |
| Handler contract | The Cloud Run service must return HTTP `200` to confirm success after the task is processed; tasks arrive as HTTPS requests |
| Timeout | The response must occur within the queue's configured timeout; for work longer than the maximum Cloud Tasks timeout, use Cloud Run jobs |
| Task service account | Needs the Cloud Run Invoker role (`roles/run.invoker`) on the service |
| Enqueuing code | Must have permission to create tasks, such as the Cloud Tasks Enqueuer role (`roles/cloudtasks.enqueuer`), plus `iam.serviceAccounts.actAs` (for example Service Account User, `roles/iam.serviceAccountUser`) on the task service account `SERVICE_ACCOUNT_NAME` |
| Payload requests | Tasks with data payloads must use HTTP `PUT` or `POST` |
| OIDC `audience` | The Cloud Run service URL (no path) or a configured custom audience; if omitted, Cloud Tasks uses the task's target URL (Cloud Tasks v2 `OidcToken.audience`) |
| Queue defaults | Defaults usually work; rate limits and retry parameters are configurable |

## Notes

- The source's Console step also shows a project-level grant (`gcloud projects add-iam-policy-binding RESOURCE_ID --member=PRINCIPAL --role=roles/run.invoker`). It is omitted here because it would let the principal invoke every Cloud Run service in the project; the per-service binding is sufficient.
- Project ID, location, and service account email can be retrieved dynamically from the Cloud Run metadata server instead of being hardcoded. The metadata server returns the calling service's own runtime service account; if you use a dedicated task service account, pass its email explicitly.
- A task that sets `oidcToken.serviceAccountEmail` (or `oauthToken.serviceAccountEmail`) can only be created by a caller with `iam.serviceAccounts.actAs` on that service account, which must be in the same project as the queue (Cloud Tasks v2 API reference, `OidcToken.serviceAccountEmail`; task resource: https://docs.cloud.google.com/tasks/docs/reference/rest/v2/projects.locations.queues.tasks#Task). This page names only the Enqueuer role; it says the default Cloud Run service account already has the needed permissions.
- Source inconsistency: this page says the service must return HTTP `200` to confirm success; https://docs.cloud.google.com/tasks/docs/dual-overview says any HTTP response code from 200 to 299 is success.
- To use an OAuth token instead of OIDC, replace the OIDC parameter with the language-appropriate OAuth parameter. The source also shows Terraform, Java, and Go samples (not reproduced) and a `package.json`.
- Keep the service private (require authentication); use a dedicated user-managed service account for the task identity.
- Adapted from the official docs: the queue was created with `gcloud tasks queues create QUEUE-ID` (no `--location`); `--location=REGION` was added, since the flag otherwise defaults to the App Engine app's location "if there is an associated app" (https://docs.cloud.google.com/sdk/gcloud/reference/tasks/queues/create).
- Source inconsistency: this page says to respond `y` when prompted to create an App Engine app, because "Cloud Tasks uses this for the queue"; https://docs.cloud.google.com/tasks/docs/creating-queues says "Using HTTP target tasks doesn't require an App Engine app. You select a Google Cloud location when you create your queue." Tasks to a Cloud Run service are HTTP target tasks; after you set a region for an App Engine app you can't change it (https://docs.cloud.google.com/scheduler/docs/setup), so pass `--location` instead of creating one.
- Corrected from the official docs: the Python sample declares `audience: Optional[str] = None` (with `from typing import Optional`), so the audience can be omitted. When `audience` is omitted, "the URI specified in target will be used" (Cloud Tasks v2 `OidcToken.audience`, https://docs.cloud.google.com/tasks/docs/reference/rest/v2/OidcToken), but Cloud Run requires the `aud` claim to be "the URL of the receiving service or a configured custom audience" (https://docs.cloud.google.com/run/docs/authenticating/service-to-service), so a token whose audience is a URL with a handler path is rejected. `audience` is now a required argument, passed separately from the request `url`.
- Corrected from the official docs: the Node.js sample sends `oidcToken: {serviceAccountEmail}` (no `audience`) with `url` `'https://example.com/taskhandler'`, so the token audience defaults to the full task URL including `/taskhandler`. `oidcToken` now also carries `audience` (the service URL), and the example values are `https://my-cloud-run-service.run.app/taskhandler` / `https://my-cloud-run-service.run.app/`; that URL form is taken from the service-to-service page.
- Source: https://docs.cloud.google.com/run/docs/triggering/using-tasks (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/run/docs/authenticating/service-to-service (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)
- Distance: Cloud Tasks and Cloud Run are Google Cloud services, distinct from Cloudflare Queues (`cloudflare-stateful`) and Vercel Functions (`vercel`).

## Related

- [using-scheduler.md](./using-scheduler.md)
- [pubsub-triggers.md](./pubsub-triggers.md)
