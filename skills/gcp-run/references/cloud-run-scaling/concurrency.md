---
source: https://docs.cloud.google.com/run/docs/configuring/concurrency
---

# Maximum concurrent requests per instance

Cloud Run concurrency settings define the maximum number of simultaneous requests a single instance processes. Tuning this value balances request throughput, memory usage, and cost.

## Signature / Usage

### Set concurrency

```bash
gcloud run services update SERVICE --concurrency CONCURRENCY
```

For example, a maximum of 1 concurrent request:

```bash
gcloud run services update SERVICE --concurrency 1
```

### Revert to the default (80)

```bash
gcloud run services update SERVICE --concurrency default
```

### Set concurrency in YAML

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
      name: REVISION
    spec:
      containerConcurrency: CONCURRENCY
```

```bash
gcloud run services replace service.yaml
```

### View the setting

```bash
gcloud run services describe SERVICE
```

## Options / Props

| Item | Value |
|---|---|
| Default | `80` |
| YAML field | `spec.template.spec.containerConcurrency` |
| Terraform field | `template.max_instance_request_concurrency` |
| gcloud flag | `--concurrency` (`default` reverts) |
| Below 1 vCPU | Maximum concurrency must be `1` (see the CPU page) |

`REVISION` in YAML: a new revision name, or delete the field. A new name must start with `SERVICE-`, contain only lowercase letters, numbers and `-`, not end with `-`, and not exceed 63 characters.

Required roles:

| Role | Scope |
|---|---|
| Cloud Run Developer (`roles/run.developer`) | the Cloud Run service |
| Service Account User (`roles/iam.serviceAccountUser`) | the service identity |

## Notes

- Any configuration change creates a new revision; later revisions inherit the setting unless changed.
- Concurrency affects autoscaling and instance behavior; see https://docs.cloud.google.com/run/docs/about-concurrency.
- A raised concurrency requires memory sized for peak usage (see the memory page).
- The WebSockets page states concurrent connections up to 1,000 per container; that figure is not on this page.
- Source inconsistency: the about-concurrency page (https://docs.cloud.google.com/run/docs/about-concurrency) gives the gcloud CLI / Terraform default for a new service as 80 times the number of vCPUs (console: 80); this page says the default is 80.
- The source also shows Console and Terraform forms (omitted).
- Source: https://docs.cloud.google.com/run/docs/configuring/concurrency (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/run/docs/triggering/websockets (retrieved 2026-11-15; CC BY 4.0) for the 1,000 figure

## Related

- [request-timeout.md](./request-timeout.md)
- [max-instances.md](./max-instances.md)
- [min-instances.md](./min-instances.md)
- Concept page: https://docs.cloud.google.com/run/docs/about-concurrency
