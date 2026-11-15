---
source: https://docs.cloud.google.com/run/docs/configuring/request-timeout
---

# Request timeout

The Cloud Run request timeout is the maximum time a service has to return a response. If the service does not respond within this limit, Cloud Run closes the network connection and returns an HTTP 504 error. Closing the connection does not terminate the container instance, which might keep processing the aborted request.

## Signature / Usage

### Set the timeout on an existing service

```bash
gcloud run services update SERVICE --timeout=TIMEOUT
```

Replace `SERVICE` with the service name and `TIMEOUT` with an integer (seconds) or a duration such as `1m20s`.

### Set the timeout at deploy time

```bash
gcloud run deploy --image IMAGE_URL --timeout=TIMEOUT
```

`IMAGE_URL` is a container image reference, for example `us-docker.pkg.dev/cloudrun/container/hello:latest` (format `LOCATION-docker.pkg.dev/PROJECT_ID/REPO_NAME/PATH:TAG`; the Artifact Registry repository must already exist).

### Set the timeout in YAML

```bash
gcloud run services describe SERVICE --format export > service.yaml
```

```yaml
apiVersion: serving.knative.dev/v1
kind: Service
metadata:
  name: SERVICE
spec:
  template:
    spec:
      containers:
      - image: IMAGE
      timeoutSeconds: VALUE
```

```bash
gcloud run services replace service.yaml
```

### View the setting

```bash
gcloud run services describe SERVICE
```

Locate the request timeout setting in the returned configuration.

## Options / Props

| Item | Value |
|---|---|
| Default timeout | 5 minutes (300 seconds) |
| Maximum timeout | 60 minutes (3600 seconds) |
| Console range | `1` to `3600` seconds |
| On timeout | Connection closed, HTTP 504 returned; container instance is not terminated |
| YAML field | `spec.template.spec.timeoutSeconds` |
| Terraform field | `template.timeout` (for example `"300s"`) |
| Longer than 15 minutes | Implement retries and make the service tolerant of client reconnects (idempotent requests, or handlers that can resume where they left off) |

Timeouts of triggering services apply when they invoke Cloud Run:

| Trigger | Timeout |
|---|---|
| Pub/Sub push subscriptions (direct and Eventarc triggers) | Acknowledgment deadline default 10 seconds, maximum 10 minutes (600 seconds) |
| Cloud Scheduler HTTP targets | 3-minute default; maximum 30 minutes (1,800 seconds) |
| Cloud Tasks HTTP targets | 10-minute default; maximum 30 minutes (1,800 seconds) |
| Synchronous Workflows HTTP requests | 5-minute default; maximum 30 minutes (1,800 seconds) |

Required roles:

| Role | Scope |
|---|---|
| Cloud Run Developer (`roles/run.developer`) | the Cloud Run service |
| Service Account User (`roles/iam.serviceAccountUser`) | the service identity |

Deploying from source (service or function) needs additional roles on the project and the Cloud Build service account.

## Notes

- Any configuration change creates a new revision; later revisions inherit the setting unless changed.
- To prevent timeouts, set a timeout higher than the expected execution time, or track the remaining execution time to clean up and return early.
- Source inconsistency: the page says the timeout "can be extended up to 60 minutes (3600 seconds)" and the Console accepts `1` to `3600`, but the gcloud text says "The value you specify must be less than 60 minutes."
- Check the language framework for its own request timeout setting; some clients of the service also impose a more restrictive timeout.
- For Workflows-invoked workloads running longer than 30 minutes, use Cloud Run jobs or callback endpoints.
- The WebSockets page repeats the same figures: requests are subject to the timeout, currently up to 60 minutes, default 5 minutes.
- The source also shows Console and Terraform forms (omitted).
- Cloud Run / Cloud Run functions are Google Cloud's serverless containers/functions, distinct from Cloudflare Workers (`cloudflare-workers`), Vercel Functions (`vercel`), and HTTP frameworks (`hono`, `fastify`) that run only inside the container.
- If the exported file has `spec.template.metadata.name` (a revision name), delete it or set a new revision name before applying; revision names are immutable, so reusing the existing name with a changed configuration is rejected.
- Source: https://docs.cloud.google.com/run/docs/configuring/request-timeout (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)

## Related

- [concurrency.md](./concurrency.md)
- [max-instances.md](./max-instances.md)
- Cloud Run request timeout quotas: https://docs.cloud.google.com/run/quotas
- WebSockets (timeouts apply to streams): https://docs.cloud.google.com/run/docs/triggering/websockets
