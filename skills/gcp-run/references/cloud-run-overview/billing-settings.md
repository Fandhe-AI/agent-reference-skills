---
source: https://docs.cloud.google.com/run/docs/configuring/billing-settings
---

# Billing settings (services)

Cloud Run services have two billing settings: request-based (default, previously "CPU only allocated during request processing") and instance-based (previously "CPU always allocated"). Jobs always use instance-based billing; worker pools and instances are billed for the whole instance lifecycle with their own SKUs.

## Signature / Usage

### Set billing with gcloud

Instance-based billing for an existing service:

```bash
gcloud run services update SERVICE --no-cpu-throttling 
```

Request-based billing:

```bash
gcloud run services update SERVICE --cpu-throttling 
```

During deployment:

```bash
gcloud run deploy --image IMAGE_URL --no-cpu-throttling
```

```bash
gcloud run deploy --image IMAGE_URL --cpu-throttling
```

`IMAGE_URL` example: `us-docker.pkg.dev/cloudrun/container/hello:latest`; Artifact Registry URL format is `LOCATION-docker.pkg.dev/PROJECT_ID/REPO_NAME/PATH:TAG` and the repository must exist.

### Set billing with YAML

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
    metadata:
      annotations:
        run.googleapis.com/cpu-throttling: 'BOOLEAN'
      name: REVISION
```

`BOOLEAN`: `true` = request-based, `false` = instance-based. A new `REVISION` name must start with `SERVICE-`, contain only lowercase letters, numbers and `-`, not end with `-`, and be at most 63 characters (or delete it).

```bash
gcloud run services replace service.yaml
```

### View billing setting

```bash
gcloud run services describe SERVICE --format=yaml
```

In the YAML, `run.googleapis.com/cpu-throttling: false` = instance-based; a missing setting = request-based.

## Options / Props

| Item | Request-based (default) | Instance-based |
|---|---|---|
| Charged | Only while processing requests, and at start and shutdown; plus per-request fee | Entire instance lifetime; no per-request fee |
| CPU allocation | During request processing | Whole instance lifecycle |
| Autoscaling | CPU utilization during request processing only | CPU over the lifecycle, except scaling to/from zero (requests only) |
| Good for | Sporadic, bursty, spiky traffic | Steady, slowly varying traffic; background tasks after the response (goroutines, Node.js async, Java threads, Kotlin coroutines, OpenTelemetry agents) |

- Instance-based billing requires at least 512 MiB memory.
- Any configuration change creates a new revision; later revisions inherit the setting.
- Health check probes are billed like instance-based billing (CPU and memory for every probe, no request-based charge); see the healthchecks billing section (https://docs.cloud.google.com/run/docs/configuring/healthchecks#billing). The source words this as "you must use instance-based billing for every probe".
- Required roles: Cloud Run Developer (`roles/run.developer`) on the service; Service Account User (`roles/iam.serviceAccountUser`) on the service identity; source/function deployments need extra roles.
- Spend caps (Cloud Billing Budget) apply to all Cloud Run resource types: services return `5xx`, jobs fail to start/complete, worker pools stop processing, instances shut down. Caps reset on the first day of the next billing cycle; Compute Engine bills VPC connector VMs so caps ignore them (use Direct VPC egress).
- Idle instances (including min instances) can be shut down any time; trap `SIGTERM` for 10 seconds grace. An instance never stays idle longer than 15 minutes unless kept by min instances.
- Instance-based + min instances: use for background/agentic loads that must autoscale past one instance. Single long-lived workload: Cloud Run instance (up to 7 days, restart policies). Non-HTTP pull workloads: worker pool.
- Cloud Tasks retries failed tasks and supports running times up to 30 minutes.
- Recommender recommends instance-based when cheaper.

## Notes

- Source inconsistency: this page says request-based billing charges instances only when they process requests, start and shut down; the minimum instances page says idle minimum instances under request-based billing are "billed at a lower rate" (https://docs.cloud.google.com/run/docs/configuring/min-instances).
- The source also shows Console and Terraform (`cpu_idle = false` in `google_cloud_run_v2_service`) forms.
- Source: https://docs.cloud.google.com/run/docs/configuring/billing-settings (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)

## Related

- [about-instance-autoscaling.md](./about-instance-autoscaling.md)
- [container-contract.md](./container-contract.md)
- [what-is-cloud-run.md](./what-is-cloud-run.md)
