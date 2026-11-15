---
source: https://docs.cloud.google.com/run/docs/configuring/execution-environments
---

# Execution environments

All Cloud Run instances are sandboxed; the sandbox technology and features depend on the execution environment. First generation is based on gVisor with fast cold starts and emulation of most (not all) system calls. Second generation is a microVM with full Linux compatibility. Both have the same pricing.

## Signature / Usage

### Set the execution environment

```bash
gcloud run services update SERVICE --execution-environment ENVIRONMENT
```

```bash
gcloud run deploy --image IMAGE_URL --execution-environment ENVIRONMENT
```

`ENVIRONMENT` is `gen1` or `gen2`.

```yaml
apiVersion: serving.knative.dev/v1
kind: Service
metadata:
  name: SERVICE
spec:
  template:
    metadata:
      annotations:
        run.googleapis.com/execution-environment: ENVIRONMENT
```

Export with `gcloud run services describe SERVICE --format export > service.yaml`; apply with `gcloud run services replace service.yaml`. Remove the annotation for the default behavior.

### View the setting

```bash
gcloud run services describe SERVICE
```

## Options / Props

| Item | First generation (`gen1`) | Second generation (`gen2`) |
|---|---|---|
| Technology | gVisor | microVM |
| Cold start | Fast | Longer for some services |
| Sustained CPU / network performance | Lower | Faster CPU and network (especially with packet loss) |
| Linux compatibility | Emulates most, not all, system calls | Full: all system calls, namespaces, cgroups |
| Network file systems (NFS) | No | Yes |
| Minimum memory | 128 MiB | 512 MiB |
| Terraform value | `EXECUTION_ENVIRONMENT_GEN1` | `EXECUTION_ENVIRONMENT_GEN2` |

Default for services: unspecified; Cloud Run selects first or second generation based on the features used. Cloud Run jobs and worker pools only use second generation and this cannot be changed.

Choose first generation for bursty traffic that must scale out fast, cold-start sensitivity, infrequent traffic with frequent scale-from-zero, or less than 512 MiB memory.

Choose second generation for NFS, steady traffic tolerant of slower cold starts, CPU-intensive workloads, faster network (including best Direct VPC egress performance), software needing unimplemented system calls, Linux cgroups, or third-party container security infrastructure.

Graceful shutdown: an instance being shut down receives `SIGTERM`, with 10 seconds to shut down.

Required roles: Cloud Run Developer (`roles/run.developer`) on the service; Service Account User (`roles/iam.serviceAccountUser`) on the service identity.

## Notes

- Second generation requires at least 512 MiB of memory.
- Handle `SIGTERM`, especially with request-based billing, to flush logs and clean up. If the container does not catch `SIGTERM` it still gets 10 seconds, and those 10 seconds are billed.
- Source inconsistency: this page says a container that does not catch `SIGTERM` still gets 10 seconds; the container runtime contract (https://docs.cloud.google.com/run/docs/container-contract) says a first-generation instance that does not trap `SIGTERM` shuts down immediately.
- To check for a SIGTERM handler locally: run `docker run IMAGE_URL`, find the ID with `docker container ls`, then `docker kill -s SIGTERM CONTAINER_ID`; if the container exits it handles SIGTERM. To add one without code changes, wrap the service with `tini` as init process.
- Any configuration change creates a new revision.
- The source also shows Console and Terraform forms (omitted).
- Source: https://docs.cloud.google.com/run/docs/configuring/execution-environments (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)

## Related

- [cpu.md](./cpu.md)
- [memory-limits.md](./memory-limits.md)
- Container contract (instance shutdown): https://docs.cloud.google.com/run/docs/container-contract#instance-shutdown
