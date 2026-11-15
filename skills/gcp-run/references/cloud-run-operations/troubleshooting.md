---
source: https://docs.cloud.google.com/run/docs/troubleshooting
---

# Troubleshoot Cloud Run issues

Errors you might hit while deploying and serving, grouped as deployment errors, serving errors, and connectivity and security errors. Cloud Run incidents from Google Cloud infrastructure are published to Personalized Service Health; unlisted errors are in Known issues (`https://docs.cloud.google.com/run/docs/known-issues`).

## Signature / Usage

### Diagnose a container that fails to start

Error: `Container failed to start. Failed to start and then listen on the port defined by the PORT environment variable.` Verify the image runs locally, the container listens on the `PORT` environment variable on all interfaces (`0.0.0.0`, not `127.0.0.1`), the image is compiled for 64-bit Linux (build on Cloud Build if you build on ARM), and check `stdout` / `stderr` logs and Error Reporting.

### Specify a service account when the default Compute Engine one is gone

```bash
gcloud run services update SERVICE_NAME --service-account SERVICE_ACCOUNT
```

The deployer needs `roles/iam.serviceAccountUser` on that service account. The source recommends per-service user-managed service accounts where several services access different resources.

### Python source deploys: set an entrypoint

```bash
gcloud run deploy SERVICE --source .  --set-build-env-vars GOOGLE_ENTRYPOINT="ENTRYPOINT"
```

Or list `gunicorn` (or `fastapi` and `uvicorn`) in `requirements.txt`, or use a Procfile. For Python 3.13+ the buildpack picks the entrypoint from your web server in `requirements.txt`; otherwise (and for 3.12 and earlier) the default is `gunicorn -b :8080 main:app`.

### Beta features through the Admin API

Add the launch stage when calling the API directly (a field of the request body, shown as a fragment):

```text
"launchStage": "BETA"
```

v1 REST annotation: `"run.googleapis.com/launch-stage": "BETA"`.

### Test a private service from a browser

```bash
gcloud run services proxy SERVICE --project PROJECT-ID
```

Proxies the service to `http://localhost:8080` (or `--port`) with your token; the source calls this the recommended way to test a private website or API in a browser. Alternatives: Identity-Aware Proxy, or allow public access only if your organization supports it and only for testing or an intentionally public API or website (see Notes).

### Spark IPv6 binding failure

Set in the Dockerfile (`RUN export SPARK_LOCAL_IP=...` is not recognized by Spark):

```dockerfile
ENV SPARK_LOCAL_IP="127.0.0.1"
```

### Check certificate expiry for a custom domain

```bash
echo | openssl s_client -servername 'ROOT_DOMAIN' -connect 'ROOT_DOMAIN:443' 2>/dev/null | openssl x509 -startdate -enddate -noout
```

### Fix orphaned traffic tags

```bash
gcloud run services update-traffic SERVICE_NAME --to-latest
```

## Options / Props

### Deployment errors

| Error | Cause and fix |
|-------|---------------|
| Container import error: `Resource readiness deadline exceeded.` | Remove non-UTF-8 characters from the file system; for Windows-based images with foreign layers set `--allow-nondistributable-artifacts` in the Docker daemon |
| `The feature is not supported in the declared launch stage` | Add launch stage annotation or `launchStage` field |
| `User "root" not found in /etc/passwd` (with `--key`) | Use `USER 0` instead of `USER root` in the Dockerfile |
| `iam.serviceaccounts.actAs denied` on `PROJECT_NUMBER-compute@developer.gserviceaccount.com` | Default Compute Engine service account missing or deployer lacks permission: pass `--service-account` and grant required permissions |
| `NOT_FOUND: Build failed` in source deploys | Cloud Build default service account change; opt out or grant `roles/run.builder` to the build service account |
| Service Agent cannot read the image (cross-project, `gcr.io` or `pkg.dev`) | Grant access per "deploying container images from other projects"; check VPC Service Controls (Logs Explorer: `protoPayload.status.details.violations.type="VPC_SERVICE_CONTROLS"` for principal `service-PROJECT_NUMBER@serverless-robot-prod.iam.gserviceaccount.com`) |
| `iam.serviceAccounts.getAccessToken` / `roles/run.serviceAgent` missing (source deploys) | Grant the deployer account `roles/iam.serviceAccountUser` (contains `iam.serviceAccounts.actAs`) on the service account used as the service identity |
| `storage.objects.create` denied in source deploy | Grant the deployer `roles/run.sourceDeveloper` and `roles/serviceusage.serviceUsageConsumer` on the project, and `roles/iam.serviceAccountUser` on the Cloud Run service identity |
| Cross-project deploy fails | Grant Service Account User on the service-identity service account in the target project; grant `roles/iam.serviceAccountTokenCreator` on that service-identity service account (not on the project) to the source project's Cloud Run service agent (`service-PROJECT_NUMBER@SERVICE_DOMAIN.iam.gserviceaccount.com`); turn off the `iam.disableCrossProjectServiceAccountUsage` organization policy |
| Python source deploy: revision not ready / HTTP 500 | See entrypoint fixes above |

### Serving errors

| Error | Cause and fix |
|-------|---------------|
| `Revision REVISION_NAME does not exist or is deleted` | Orphaned traffic tag; reassign traffic or run `update-traffic --to-latest` |
| `HTTP 404` | Wrong URL or app 404; ingress `Internal` / `Internal and Cloud Load Balancing` or disabled default `run.app` URL (no log entry); VPC Service Controls (filter `resource.labels.method="run.googleapis.com/HttpIngress"`); load balancer URL mask with Python |
| `HTTP 429` no available instance | Max instances reached or cannot scale; raise max instances or request quota |
| `HTTP 500` no available instance | Traffic spike, slow cold start, slow requests, transient factors; use exponential backoff and retries (spikes visible at 10-second zoom) |
| `HTTP 500` instance could not start | Often Secret Manager access: grant `roles/secretmanager.secretAccessor`, check secret path, allow egress to `secretmanager.googleapis.com` |
| `HTTP 501` Operation is not implemented | Wrong region when invoking a job |
| 5xx / jobs and worker pools fail to start | Billing account spend cap reached; lift it (up to 30 minutes to recover) |
| `HTTP 503` default credentials not found | Set up ADC (`gcloud auth application-default login`) or `GOOGLE_APPLICATION_CREDENTIALS` |
| Memory limit termination (500/503) | Local file system (including logs outside `/var/log/*` and `/dev/log`) counts toward memory; raise memory limit |
| `HTTP 503` max instance limit with high concurrency | Raise max instances; lower concurrency |
| Kernel errors (`mount.nfs: Operation not permitted`, `sysctl: permission denied`, `sudo: The "no new privileges" flag is set`) | Violation of container runtime contract restrictions |
| `SIGNATURE_REMOVED_BY_GOOGLE` | Expected for ID tokens generated with gcloud; invoke private services with a new ID token |
| High latency with low CPU | Single-threaded app on multiple vCPUs; use 1 vCPU or lower max concurrency (autoscaling target is typically 60% average CPU) |

### Connectivity and security errors

| Error | Cause and fix |
|-------|---------------|
| `HTTP 401` | Send an ID token (not access or refresh token) as `Authorization: Bearer ID_TOKEN` or `X-Serverless-Authorization: Bearer ID_TOKEN`; set `aud` to the service URL, IAP OAuth client ID, or custom audience; add `169.254.*` / `*.google.internal` to HTTP proxy exceptions |
| `HTTP 403` | Grant `run.routes.invoke` with `roles/run.invoker` on the service (least privilege; the source also names `roles/run.admin`, which contains `run.routes.invoke` but is far broader); service accounts need `roles/run.invoker`; no `cloud_run_revision` log entry may mean VPC Service Controls |
| `403 Forbidden` from a browser | Browser sends no token; use IAP or `gcloud run services proxy` (recommended for testing a private service), or allow public access only if your organization allows it and only for testing or an intentionally public API or website (see Notes) |
| `Connection reset by peer`, `ECONNRESET`, `UNAVAILABLE: io exception` | Use instance-based billing for background work; stay within outbound timeouts; `keepalive` is off by default; reconnect after infrastructure resets; validate/retry through HTTP proxies |
| Connection timeouts | Firewall rules must allow ingress from connectors or the Direct VPC egress subnet; check routes (peering, hybrid); proxy reachability |
| `HTTP 503` malformed response / connection issue | Check out-of-memory and liveness probe failures; set Node.js `server.setTimeout(0)` or Gunicorn timeout; connector throughput (red bars); above 800 requests per second per instance turn on HTTP/2 |
| `HTTP 504` | Request timeout reached; raise request timeout; instrument tracing; app-level OOM may not terminate the instance |
| Custom domain stuck provisioning | Wait up to 24 hours (usually about 15 minutes); verify DNS records and root-domain ownership |
| Client disconnect not propagated | HTTP/1.1 does not propagate disconnects; use WebSockets or HTTP/2 |

NFS mount errors: `mount.nfs: Protocol not supported` (missing nfs dependency in base image), `Connection timed out` (check Filestore IP), `access denied by server` (check file share name), `mount system call failed` (NFS-Ganesha 3.x or earlier rejects an NFSv4.2 attribute; upgrade to 4.0+ or limit to NFSv4.1).

### HTTP proxy exceptions (`NO_PROXY` / `no_proxy`)

Minimum non-proxied hosts: `127.0.0.1`, `169.254.*` or `169.254.0.0/16`, `localhost`, `*.google.internal`, `*.googleapis.com`. Optional: `*.appspot.com`, `*.run.app`, `*.cloudfunctions.net`, `*.gateway.dev`, `*.googleusercontent.com`, `*.pkg.dev`, `*.gcr.io`. Python `urllib` / `requests` do not support `*` wildcards; use a leading dot (`.googleapis.com`). The JVM flag `http.nonProxyHosts` does not support CIDR notation.

## Notes

- Related error text in the source mentions the `gcr.io` domain; Container Registry is deprecated; effective March 18, 2025, it is shut down and writing images to it is unavailable (App Engine standard quotas page, https://docs.cloud.google.com/appengine/docs/standard/quotas), so prefer Artifact Registry `REGION-docker.pkg.dev`.
- Public access (for a `403` or browser test): the source offers it "if this is supported by your organization" and as "helpful for testing, or when your service is a public API or website". There are two mechanisms (https://docs.cloud.google.com/run/docs/authenticating/public): disable the Invoker IAM check (`--no-invoker-iam-check`; revert with `--invoker-iam-check`), or grant `roles/run.invoker` to `allUsers` (revert by removing the `allUsers` binding). Either makes the service publicly accessible; revert after testing.
- OpenBLAS warning `could not determine the L2 cache size` is harmless on the first generation execution environment; switch to second generation to avoid it.
- The source also shows Gemini Cloud Assist chat, Cloud Storage FUSE pointers, and extra Python entrypoint details.
- Source inconsistency: this page sets `GOOGLE_ENTRYPOINT` with `--set-build-env-vars` on `gcloud run deploy --source`, and the Python quickstart (https://docs.cloud.google.com/run/docs/quickstarts/build-and-deploy/deploy-python-service) deploys from source with no `Procfile`; https://docs.cloud.google.com/appengine/migration-center/run/compare-gae-with-run says that with `gcloud run deploy --source` only the `Procfile` method works for the entrypoint.
- Cloud Run is Google Cloud's serverless container platform, distinct from Cloudflare Workers (`cloudflare-workers`) and Vercel Functions (`vercel`).
- Source: https://docs.cloud.google.com/run/docs/troubleshooting (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/run/docs/quickstarts/build-and-deploy/deploy-python-service (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/appengine/migration-center/run/compare-gae-with-run (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/appengine/docs/standard/quotas (retrieved 2026-11-15; Container Registry caution)
- Source: https://docs.cloud.google.com/run/docs/authenticating/public (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)

## Related

- [logging.md](./logging.md)
- [monitoring.md](./monitoring.md)
- [testing-local.md](./testing-local.md)
