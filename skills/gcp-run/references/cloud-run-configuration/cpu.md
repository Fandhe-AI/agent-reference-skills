---
source: https://docs.cloud.google.com/run/docs/configuring/services/cpu
---

# Configure CPU limits for services

Sets the vCPU limit per instance and enables startup CPU boost, which temporarily raises vCPU during instance startup. Whether vCPU is allocated for the instance lifetime or only during request processing is set in billing settings.

## Signature / Usage

### Set the CPU limit

```bash
gcloud run services update SERVICE --cpu CPU
```

```bash
gcloud run deploy --image IMAGE_URL --cpu CPU
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
      containers:
      - image: IMAGE
        resources:
          limits:
            cpu: CPU
```

Export with `gcloud run services describe SERVICE --format export > service.yaml`; apply with `gcloud run services replace service.yaml`.

### Startup CPU boost

```bash
gcloud run services update SERVICE --cpu-boost
```

```bash
gcloud run services update SERVICE --no-cpu-boost
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
        run.googleapis.com/startup-cpu-boost: 'true'
```

`--cpu-boost` / `--no-cpu-boost` also work with `gcloud run deploy --image IMAGE_URL`.

### View CPU settings

```bash
gcloud run services describe SERVICE
```

## Options / Props

| Item | Value |
|---|---|
| Default | 1 vCPU per instance |
| Maximum | 8 vCPU |
| Minimum | 0.08 vCPU |
| Allowed values | `1`, `2`, `4`, `6`, `8`; or 0.08 to less than 1.00 for fractional CPU. Values greater than 1 must be integers |

vCPU and memory:

| CPUs | Memory required |
|---|---|
| .08 vCPU | Up to 512 MiB |
| .5 vCPU | Up to 1 GiB |
| 1 vCPU | Up to 4 GiB |
| 2 vCPU | Up to 8 GiB |
| 4 vCPU | 2 to 16 GiB |
| 6 vCPU | 4 to 24 GiB |
| 8 vCPU | 4 to 32 GiB |

If you use less than 1 vCPU:

| Setting | Requirement |
|---|---|
| Memory | Minimum 0.5 vCPU for a memory limit above 512 MiB; minimum 1 vCPU for a limit above 1 GiB |
| Concurrency | Maximum concurrency must be `1` |
| Billing | Request-based billing |
| Execution environment | First generation |

Startup CPU boost (extra CPU during startup and for 10 seconds after the instance has started):

| CPU limit | Boosted CPU |
|---|---|
| 0-1 | 2 |
| 2 | 4 |
| 4 | 8 |
| 6 | 8 |
| 8 | 8 |

Required roles: Cloud Run Developer (`roles/run.developer`) on the service; Service Account User (`roles/iam.serviceAccountUser`) on the service identity.

## Notes

- Source inconsistency: fractional CPU increments are given as "increments of 0.001" (minimum vCPU section) and "increments of 0.01" (Console and gcloud instructions).
- Source inconsistency: the maximum is 8 vCPU here, while the GPU page requires at least 20 CPU for the RTX PRO 6000.
- Boost billing: you are charged for the boosted CPU for the startup duration. Example: 15 s startup with 2 CPU is billed 4 CPU during startup (including the 10 s after start) and 2 CPU for the rest of the lifecycle. With sidecars every container receives the boost, sized by its own CPU limit.
- Autoscaling uses average CPU utilization across all allocated CPUs; a single-threaded app on more than 1 vCPU can show low utilization and block CPU-based scaling. Start with 1 vCPU if memory allows, otherwise tune concurrency.
- Cost: monitor CPU utilization in Cloud Monitoring under load; reduce vCPU if consistently low at peak, raise it if latency is high.
- Any configuration change creates a new revision.
- The source also shows Console, Terraform, and Compose (`cpus`) forms (omitted).
- Source: https://docs.cloud.google.com/run/docs/configuring/services/cpu (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)

## Related

- [memory-limits.md](./memory-limits.md)
- [execution-environments.md](./execution-environments.md)
- Concurrency: https://docs.cloud.google.com/run/docs/configuring/concurrency
- Billing settings: https://docs.cloud.google.com/run/docs/configuring/billing-settings
