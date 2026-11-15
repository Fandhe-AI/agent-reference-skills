---
source: https://docs.cloud.google.com/run/docs/configuring/services/memory-limits
---

# Configure memory limits for services

Sets the memory available to each Cloud Run instance. Instances that exceed their memory limit are terminated.

## Signature / Usage

### Set the memory limit

```bash
gcloud run services update SERVICE --memory SIZE
```

```bash
gcloud run deploy --image IMAGE_URL --memory SIZE
```

`SIZE` is a fixed or floating point number followed by `G` or `M` (gigabyte, megabyte) or the power-of-two units `Gi` or `Mi`.

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
            memory: SIZE
```

Export with `gcloud run services describe SERVICE --format export > service.yaml`; apply with `gcloud run services replace service.yaml`.

### View the setting

```bash
gcloud run services describe SERVICE
```

## Options / Props

| Item | Value |
|---|---|
| Default | 512 MiB per instance of a revision |
| Maximum | 32 Gi (can be enforced lower with custom organization policies) |
| Minimum, first generation | 128 MiB |
| Minimum, second generation | 512 MiB |
| Terraform field | `template.containers.resources.limits.memory` (for example `"512Mi"`) |

Memory required for a CPU value:

| CPUs | Memory required |
|---|---|
| .08 vCPU | Up to 512 MiB |
| .5 vCPU | Up to 1 GiB |
| 1 vCPU | Up to 4 GiB |
| 2 vCPU | Up to 8 GiB |
| 4 vCPU | 2 to 16 GiB |
| 6 vCPU | 4 to 24 GiB |
| 8 vCPU | 4 to 32 GiB |

Required roles: Cloud Run Developer (`roles/run.developer`) on the service; Service Account User (`roles/iam.serviceAccountUser`) on the service identity.

## Notes

- Memory must cover the service executable loaded into memory, memory allocated by the process, and files written to the file system. The deployed image size does not affect available instance memory.
- Peak memory estimate: (Standing Memory) + (Memory per Request) * (Service Concurrency). Raise memory when raising concurrency; consider lowering it when lowering concurrency.
- If you use less than 512 MiB of memory, use the first generation execution environment.
- Single-threaded applications that need 2 or more vCPUs because of memory can create "vCPU hotspots" and inefficient CPU-based autoscaling; tune concurrency.
- Out of Memory (OOM) errors: increase memory or fix leaks. Monitor utilization in Cloud Monitoring.
- Source inconsistency: the maximum here is 32 Gi, while the GPU page requires at least 80 GiB for the RTX PRO 6000.
- When deploying from source with gcloud, use `--source` instead of `--image` (and add `--function` for functions) and make sure the required roles are granted.
- Any configuration change creates a new revision.
- The source also shows Console, Terraform, and Compose forms (omitted).
- The revision name in the template (`spec.template.metadata.name`, `REVISION` in the YAML above) must be new and unique for each change, or remove the line; revision names are immutable, so reusing an existing revision name with a changed configuration is rejected.
- Source: https://docs.cloud.google.com/run/docs/configuring/services/memory-limits (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)

## Related

- [cpu.md](./cpu.md)
- [execution-environments.md](./execution-environments.md)
- Concurrency: https://docs.cloud.google.com/run/docs/configuring/concurrency
