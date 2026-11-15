---
source: https://docs.cloud.google.com/tasks/docs/creating-http-target-tasks
---

# Create HTTP target tasks

Create Cloud Tasks tasks that call any HTTP endpoint (Cloud Run, Cloud Run functions, GKE, Compute Engine, on-premises) with the client libraries, optionally authenticated by an OIDC (ID) or OAuth (access) token generated from a service account. Two creation methods exist: `CreateTask` (task-level routing, explicit task object) and `BufferTask` (queue must have queue-level routing; plain HTTP request).

## Signature / Usage

### CreateTask with schedule time and dispatch deadline (Python)

```python
import datetime
import json
from typing import Dict, Optional

from google.cloud import tasks_v2
from google.protobuf import duration_pb2, timestamp_pb2


def create_http_task(
    project: str,
    location: str,
    queue: str,
    url: str,
    json_payload: Dict,
    scheduled_seconds_from_now: Optional[int] = None,
    task_id: Optional[str] = None,
    deadline_in_seconds: Optional[int] = None,
) -> tasks_v2.Task:
    """Create an HTTP POST task with a JSON payload.
    Args:
        project: The project ID where the queue is located.
        location: The location where the queue is located.
        queue: The ID of the queue to add the task to.
        url: The target URL of the task.
        json_payload: The JSON payload to send.
        scheduled_seconds_from_now: Seconds from now to schedule the task for.
        task_id: ID to use for the newly created task.
        deadline_in_seconds: The deadline in seconds for task.
    Returns:
        The newly created task.
    """

    # Create a client.
    client = tasks_v2.CloudTasksClient()

    # Construct the task.
    task = tasks_v2.Task(
        http_request=tasks_v2.HttpRequest(
            http_method=tasks_v2.HttpMethod.POST,
            url=url,
            headers={"Content-type": "application/json"},
            body=json.dumps(json_payload).encode(),
        ),
        name=(
            client.task_path(project, location, queue, task_id)
            if task_id is not None
            else None
        ),
    )

    # Convert "seconds from now" to an absolute Protobuf Timestamp
    if scheduled_seconds_from_now is not None:
        timestamp = timestamp_pb2.Timestamp()
        timestamp.FromDatetime(
            datetime.datetime.utcnow()
            + datetime.timedelta(seconds=scheduled_seconds_from_now)
        )
        task.schedule_time = timestamp

    # Convert "deadline in seconds" to a Protobuf Duration
    if deadline_in_seconds is not None:
        duration = duration_pb2.Duration()
        duration.FromSeconds(deadline_in_seconds)
        task.dispatch_deadline = duration

    # Use the client to send a CreateTaskRequest.
    return client.create_task(
        tasks_v2.CreateTaskRequest(
            # The queue to add the task to
            parent=client.queue_path(project, location, queue),
            # The task itself
            task=task,
        )
    )

```

Dependency: `google-cloud-tasks==2.18.0`. To authenticate the request, the source's token variant (next section) adds `oidc_token=tasks_v2.OidcToken(service_account_email=..., audience=...)` to the `tasks_v2.HttpRequest`.

### CreateTask with an OIDC token (Python)

```python
from typing import Optional

from google.cloud import tasks_v2


def create_http_task_with_token(
    project: str,
    location: str,
    queue: str,
    url: str,
    payload: bytes,
    service_account_email: str,
    audience: Optional[str] = None,
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

Dependency: `google-cloud-tasks==2.18.0`.

### BufferTask (REST, queue-level routing required)

Adapted (not in the official docs): added the missing space before the line-continuation backslash after `-X HTTP_METHOD`, and replaced the dangling trailing backslash with the `Authorization: Bearer ACCESS_TOKEN` header from the source's authenticated BufferTask variant.

```bash
curl -X HTTP_METHOD \
  "https://cloudtasks.googleapis.com/v2/projects/PROJECT_ID/locations/LOCATION/queues/QUEUE_ID/tasks:buffer" \
  -H "Authorization: Bearer ACCESS_TOKEN"
```

`ACCESS_TOKEN` from `gcloud auth application-default login` then `gcloud auth application-default print-access-token`; `PROJECT_ID` from `gcloud config get-value project`.

## Options / Props

| Item | Value |
| --- | --- |
| Handler timeout | default 10 minutes, maximum 30 minutes |
| Token type | ID token (OIDC) for handlers on Google Cloud (Cloud Run, Cloud Run functions); access token (OAuth) for Google APIs on `*.googleapis.com` |
| Token fields | task: `httpRequest.oidcToken` / `oauthToken` with `serviceAccountEmail` (and optional `audience`, default: the task's target URL; for Cloud Run set it to the service URL without a path or a custom audience); queue: `httpTarget` override |
| Service account | must be in the same project as the queue |
| Roles | Cloud Tasks Enqueuer (`roles/cloudtasks.enqueuer`, Beta) on the account that creates tasks, plus `iam.serviceAccounts.actAs` (for example Service Account User) for that account on the token service account; the handler role (for example Cloud Run Invoker); the source's setup also grants Service Account User (`roles/iam.serviceAccountUser`) to the Cloud Tasks service agent `service-PROJECT_NUMBER@gcp-sa-cloudtasks.iam.gserviceaccount.com` on that service account only (token minting itself comes from the service agent role below; see Notes) |
| Service agent role | Cloud Tasks Service Agent (`roles/cloudtasks.serviceAgent`); automatic unless the API was enabled before March 19, 2019 |

| Request header | Description |
| --- | --- |
| `X-CloudTasks-QueueName` | Queue name |
| `X-CloudTasks-TaskName` | Short task name (or system-generated id) |
| `X-CloudTasks-TaskRetryCount` | Retries so far; 0 on first attempt (includes 5XX attempts) |
| `X-CloudTasks-TaskExecutionCount` | Times the handler responded (excludes 5XX failures) |
| `X-CloudTasks-TaskETA` | Scheduled time, seconds since 1970; not for deduplication |
| `X-CloudTasks-TaskPreviousResponse` | Previous retry HTTP code (may be present) |
| `X-CloudTasks-TaskRetryReason` | Reason for retry (may be present) |

## Notes

- Queue-level authentication overrides task-level authentication; for example a queue-level OIDC override dispatches tasks created with OAuth tokens using the OIDC token. If your own handler validates the token, use an ID token (https://developers.google.com/identity/protocols/OpenIDConnect).
- Cloud Run handlers: if `audience` is omitted, Cloud Tasks uses the task's target URL ("If not specified, the URI specified in target will be used", Cloud Tasks v2 `OidcToken.audience`, https://docs.cloud.google.com/tasks/docs/reference/rest/v2/OidcToken). Cloud Run requires the `aud` claim to be the URL of the receiving service or a configured custom audience (https://docs.cloud.google.com/run/docs/authenticating/service-to-service), so when the task URL has a handler path, pass `audience` with the service URL. The token sample above is kept verbatim because `audience` is optional for other HTTP targets.
- The Cloud Tasks headers provide information only and must not be used as a source of identity.
- A task that sets `oidcToken.serviceAccountEmail` or `oauthToken.serviceAccountEmail` can only be created by a caller with `iam.serviceAccounts.actAs` on that service account (Cloud Tasks v2 API reference, `OidcToken.serviceAccountEmail` / `OAuthToken.serviceAccountEmail`; task resource: https://docs.cloud.google.com/tasks/docs/reference/rest/v2/projects.locations.queues.tasks#Task). This page lists only the Service Account User grant for the Cloud Tasks service agent, not this caller grant.
- `BufferTask` is not supported in client libraries or the RPC API, and has no task-level routing or scheduling. Scheduling a future time works only with `CreateTask`.
- Tasks with a payload must use POST or PUT. Setting a task name enables deduplication at some latency cost.
- To grant the service agent role manually (only if the API was enabled before March 19, 2019): `gcloud projects add-iam-policy-binding PROJECT_ID --member serviceAccount:service-PROJECT_NUMBER@gcp-sa-cloudtasks.iam.gserviceaccount.com --role roles/cloudtasks.serviceAgent` (replace `PROJECT_NUMBER` with the project number, not the ID; it can take a few minutes).
- Corrected from the official docs: the source's `curl -X HTTP_METHOD\` (no space) and trailing `\` in the BufferTask example; the `-H "Authorization: Bearer ACCESS_TOKEN"` line is not in the first BufferTask example; it is taken from the source's second BufferTask curl example, which authenticates with application default credentials.
- Omitted: C#, Go, Java, PHP, Ruby samples, the Node.js `CreateTask` sample (`@google-cloud/tasks` `^6.0.0`, Node.js >= 20; POST with a base64 text payload and `scheduleTime`), the Node.js token variant (adds `oidcToken: {serviceAccountEmail}` to `httpRequest`, without `audience`), the Python `BufferTask` sample (mutable default argument), and Console steps.
- The schedule-time Python sample uses `datetime.datetime.utcnow()`, which still yields the correct UTC timestamp but is deprecated since Python 3.12; it is kept verbatim.
- Service agent permissions: the Cloud Tasks Service Agent role includes `iam.serviceAccounts.getOpenIdToken` and `iam.serviceAccounts.getAccessToken` (see access-control.md), which is what lets Cloud Tasks mint the header token; `iam.serviceAccounts.actAs` is a requirement on the principal that creates the task. The source's extra Service Account User grant to the service agent is kept as published; if you make it, scope it to the token service account, not the project.
- Source: https://docs.cloud.google.com/tasks/docs/creating-http-target-tasks (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/run/docs/authenticating/service-to-service (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)

## Related

- [configuring-queues.md](./configuring-queues.md)
- [access-control.md](./access-control.md)
- [dual-overview.md](./dual-overview.md)
- [quotas.md](./quotas.md)
