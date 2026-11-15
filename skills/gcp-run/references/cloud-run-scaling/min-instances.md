---
source: https://docs.cloud.google.com/run/docs/configuring/min-instances
---

# Minimum instances

Minimum instances keep a number of container instances warm and idle to avoid slow cold starts and reduce latency, using default Cloud Run autoscaling. It can be set at the service level or the revision level. For fixed instance counts, see manual scaling.

## Signature / Usage

### Service-level minimum instances

```bash
gcloud run services update SERVICE --min MIN-VALUE
```

```bash
gcloud run deploy --image IMAGE_URL --min MIN-VALUE
```

`MIN-VALUE` is the number of instances kept warm; `default` clears the setting.

```yaml
apiVersion: serving.knative.dev/v1
kind: Service
metadata:
  name: SERVICE
  annotations:
    run.googleapis.com/minScale: 'MIN_INSTANCE'
```

Export first with `gcloud run services describe SERVICE --format export > service.yaml`, edit, then:

```bash
gcloud run services replace service.yaml
```

REST (service-level):

Adapted (not in the official docs): the request URL is wrapped in double quotes so the `?` query string is not treated as a glob (zsh aborts with "no matches found").

```bash
curl -H "Content-Type: application/json" \
-H "Authorization: Bearer ACCESS_TOKEN" \
-X PATCH \
-d '{ "scaling": { "minInstanceCount": MIN-VALUE }}' \
"https://run.googleapis.com/v2/projects/PROJECT_ID/locations/REGION/services/SERVICE?update_mask=scaling.minInstanceCount"
```

### Revision-level minimum instances

```bash
gcloud run services update SERVICE --min-instances MIN-VALUE
```

```bash
gcloud run deploy --image IMAGE_URL --min-instances MIN-VALUE
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
        autoscaling.knative.dev/minScale: 'MIN-INSTANCE'
      name: REVISION
```

### View settings

```bash
gcloud run services describe SERVICE
```

Service level: locate **Scaling: Auto (Min: MIN_VALUE, Max: MAX_VALUE)**. Revision level: locate **Min instances:**.

## Options / Props

| Item | Service level | Revision level |
|---|---|---|
| gcloud flag | `--min` | `--min-instances` |
| YAML | `run.googleapis.com/minScale` (service metadata annotation) | `autoscaling.knative.dev/minScale` (template annotation) |
| REST | `scaling.minInstanceCount` | — |
| Terraform | — | `template.scaling.min_instance_count` |
| Default | `0` (off) | `0` (off) |
| Takes effect | Without deploying a new revision | On deployment of the revision |

Revision-level scaling is only available for services that previously had the feature configured.

Combining service-level and revision-level min/max (Google recommends service level and avoiding combinations):

| Service | Revision | Resolution | Result |
|---|---|---|---|
| Min | Min | Highest min wins | Service min 10, revision min 5: revision runs 10 |
| Min | Max | Revision max overrides service min | Service min 10, revision max 5: capped at 5 |
| Max | Min | Service max overrides revision min | Service max 5, revision min 10: capped at 5 |
| Max | Max | Lowest max wins | Service max 5, revision max 10: capped at 5 |

Rules: maximum limits always cap minimum limits; for minimums the largest wins. Cloud Run computes the effective maximum (smaller of service and revision maximums), then the effective minimum (larger of revision minimum and allocated service minimum), capped at the effective maximum. Unset defaults: 0 for service-level and revision-level minimum, 100 for revision-level maximum.

Service-level minimum with traffic splitting (divided proportionally; example service min 10):

| Scenario | Service min | Revision A | Revision B | Split | Result |
|---|---|---|---|---|---|
| No revision settings | 10 | Min 0 | Min 0 | 60/40 | A gets 6, B gets 4 |
| Revision min above share | 10 | Min 6 | Min 0 | 50/50 | A gets 6 (revision min), B gets 5; exceeds service min, intended |
| Revision max below share | 10 | Min 0, Max 3 | Min 0 | 50/50 | A capped at 3, B gets 5: 8 total |
| Fractional share | 3 | Min 0 | Min 0 | 50/50 | 1.5 each rounded; first-listed revision in the traffic section gets the rounded-up value (B 2, A 1) |

Billing:

| Billing setting | Idle min instances |
|---|---|
| Request-based | Billed at a lower rate while idle; if min instances is `0`, not billed when idle |
| Instance-based | Billed the default rate for the entire instance lifecycle (processing or idle), even if min instances is `0` |

Required roles: Cloud Run Developer (`roles/run.developer`) on the service; Service Account User (`roles/iam.serviceAccountUser`) on the service identity.

## Notes

- Best practice for high availability: configure at least 3 minimum instances.
- Minimum instances are a best-effort target and can drop temporarily because of zone or region capacity, infrastructure rebalancing, application crashes (startup crash or failing health checks), and quota or billing limits (including billing disabled). They can be restarted at any time.
- Active instances above the minimum might become idle if they are not receiving requests; the active instances metric can show no active instances for a service that has not recently served traffic, even when a minimum is set.
- Source inconsistency: this page bills idle minimum instances "at a lower rate" under request-based billing; the container runtime contract says that with minimum instances "you must use instance-based billing so that CPU is allocated outside of requests" (https://docs.cloud.google.com/run/docs/container-contract), and the billing settings and overview pages say request-based billing charges only while processing requests, starting and shutting down, with no charge while idle (https://docs.cloud.google.com/run/docs/configuring/billing-settings, https://docs.cloud.google.com/run/docs/overview/what-is-cloud-run).
- Minimum instances incur billing costs. Google recommends a committed use discount because the charges are predictable.
- Service-level minimum: requests are distributed to all revisions serving traffic proportionally to the traffic split. Revision-level minimum: instances start whenever the revision is referenced in a traffic split or has a traffic tag, so all tagged revisions stay active and billed; prefer service-level minimum or remove unneeded tags.
- With minimum instances, Cloud Run distributes requests evenly across all provisioned instances; set the value close to the instances needed for typical traffic (for example, peak need 200 with min 600 spreads load over 600 instances). Autoscaled instances above the minimum are used after the configured minimum instances.
- A tagged revision counts toward service-level minimum instances if it is part of a traffic split.
- Adapted from the official docs: the REST URL `https://run.googleapis.com/v2/projects/PROJECT_ID/locations/REGION/services/SERVICE?update_mask=scaling.minInstanceCount` is quoted (unquoted `?` is a glob character in zsh; bash behavior is unchanged).
- The source also shows Console, Terraform, and client-library forms (omitted).
- Source: https://docs.cloud.google.com/run/docs/configuring/min-instances (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)

## Related

- [max-instances.md](./max-instances.md)
- [manual-scaling.md](./manual-scaling.md)
- [concurrency.md](./concurrency.md)
- Instance autoscaling: https://docs.cloud.google.com/run/docs/about-instance-autoscaling
