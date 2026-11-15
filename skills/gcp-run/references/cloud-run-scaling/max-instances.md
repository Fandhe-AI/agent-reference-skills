---
source: https://docs.cloud.google.com/run/docs/configuring/max-instances
---

# Maximum instances

Maximum instances limits how far Cloud Run scales a service in response to requests, to control cost or limit connections to a backing service such as a database. It applies to default autoscaling and can be set at the service level or revision level. The limit can be exceeded briefly, for example during traffic spikes.

## Signature / Usage

### Service-level maximum instances

```bash
gcloud run services update SERVICE --max MAX-VALUE
```

```bash
gcloud run deploy --image IMAGE_URL --max MAX-VALUE
```

```yaml
apiVersion: serving.knative.dev/v1
kind: Service
metadata:
  name: SERVICE
  annotations:
    run.googleapis.com/maxScale: 'MAX-INSTANCE'
```

Export with `gcloud run services describe SERVICE --format export > service.yaml`, edit, then apply:

```bash
gcloud run services replace service.yaml
```

### Revision-level maximum instances

```bash
gcloud run services update SERVICE --max-instances MAX-VALUE
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
        autoscaling.knative.dev/maxScale: 'MAX-INSTANCE'
      name: REVISION
```

### View settings

```bash
gcloud run services describe SERVICE
```

Service level: locate **Scaling: Auto (Min: MIN_VALUE, Max: MAX_VALUE)**. Revision level: locate **Max instances:**.

## Options / Props

| Item | Service level | Revision level |
|---|---|---|
| gcloud flag | `--max` | `--max-instances` |
| YAML | `run.googleapis.com/maxScale` (service metadata annotation) | `autoscaling.knative.dev/maxScale` (template annotation) |
| Terraform | `scaling.max_instance_count` | — |
| Value | Integer from `1` to the service's maximum limit; delete the value to revert to the default | Integer from `1` to the maximum limit |
| Default | — | 100 instances per revision |
| Takes effect | Immediately | On deployment of the revision |

Revision-level scaling is only available for services that previously had the feature configured.

Combining with revision-level settings:

| Service-level | Revision-level | Behavior |
|---|---|---|
| Max set | Max set | Effective maximum is the lesser of the two |
| Max set | Min set | If service max is lower than revision min, the revision starts instances up to the service max and does not reach the revision min |

Traffic splitting: service-level maximum is divided across revisions by traffic proportion (service max 100 with 10% / 10% / 80% gives revision maximums 10 / 10 / 80). A revision can hit its effective maximum and return the `No available container instances` error (see https://docs.cloud.google.com/run/docs/troubleshooting#429-max-instances) even if the service as a whole is below its service-level maximum.

Required roles: Cloud Run Developer (`roles/run.developer`) on the service; Service Account User (`roles/iam.serviceAccountUser`) on the service identity.

## Notes

- Cost safeguard: configure the maximum at the service level when you first deploy; the source suggests starting with a maximum of 3 to protect the budget from unexpected spikes. A higher maximum prioritizes availability but adds billing risk.
- Google recommends service-level maximum unless you need to limit instances at the revision level. Raise the default of 100 per revision to let a service scale further.
- Tagged revisions start but count toward the service-level maximum only if they are part of a traffic split.
- A GPU service's maximum must stay below the project's regional GPU quota (see the GPU page).
- Limits that can apply to your service: https://docs.cloud.google.com/run/docs/configuring/max-instances-limits
- The source also shows Console and Terraform forms (omitted).
- Source: https://docs.cloud.google.com/run/docs/configuring/max-instances (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)

## Related

- [min-instances.md](./min-instances.md)
- [manual-scaling.md](./manual-scaling.md)
- [gpu.md](./gpu.md)
- Cloud Run quotas: https://docs.cloud.google.com/run/quotas
