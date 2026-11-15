---
source: https://docs.cloud.google.com/run/docs/configuring/services/gpu
---

# Configure GPU for services

Cloud Run services can attach one GPU per instance (NVIDIA RTX PRO 6000 Blackwell with 96 GB VRAM, or NVIDIA L4 with 24 GB VRAM) for AI inference or compute-heavy work such as video transcoding. The GPU is fully managed with drivers pre-installed, starts in about 5 seconds, and instances can scale to zero.

## Signature / Usage

### Create a service with a GPU

```bash
  gcloud run deploy SERVICE \
      --image IMAGE_URL \
      --gpu 1
```

From source code:

```bash
  gcloud run deploy SERVICE \
      --source . \
      --gpu 1
```

### Update GPU configuration

Adapted (not in the official docs): the source command has no line continuation after `--max-instances MAX_INSTANCE` and ends with the placeholder `--GPU_ZONAL_REDUNDANCY` (not a real flag); a trailing `\` is added and the placeholder is written as the real flag `--no-gpu-zonal-redundancy`.

```bash
gcloud run services update SERVICE \
    --image IMAGE_URL \
    --cpu CPU \
    --memory MEMORY \
    --no-cpu-throttling \
    --gpu GPU_NUMBER \
    --gpu-type GPU_TYPE \
    --max-instances MAX_INSTANCE \
    --no-gpu-zonal-redundancy
```

Use `--no-gpu-zonal-redundancy` (off) or `--gpu-zonal-redundancy` (on).

### YAML

```yaml
apiVersion: serving.knative.dev/v1
kind: Service
metadata:
  name: SERVICE
spec:
  template:
    metadata:
      annotations:
        autoscaling.knative.dev/maxScale: 'MAX_INSTANCE'
        run.googleapis.com/cpu-throttling: 'false'
        run.googleapis.com/gpu-zonal-redundancy-disabled: 'GPU_ZONAL_REDUNDANCY'
    spec:
      containers:
      - image: IMAGE_URL
        ports:
        - containerPort: CONTAINER_PORT
          name: http1
        resources:
          limits:
            cpu: 'CPU'
            memory: 'MEMORY'
            nvidia.com/gpu: '1'
        # Optional: use a longer startup probe to allow long starting containers
        startupProbe:
          failureThreshold: 1800
          periodSeconds: 1
          tcpSocket:
            port: CONTAINER_PORT
          timeoutSeconds: 1
      nodeSelector:
        run.googleapis.com/accelerator: GPU_TYPE
```

In YAML, `GPU_ZONAL_REDUNDANCY` is `false` to turn zonal redundancy on, `true` to turn it off. Apply with `gcloud run services replace service.yaml`.

### Remove the GPU

```bash
gcloud run services update SERVICE --gpu 0
```

### View GPU settings

```bash
gcloud run services describe SERVICE
```

## Options / Props

| Item | NVIDIA RTX PRO 6000 Blackwell | L4 |
|---|---|---|
| `--gpu-type` / `nodeSelector` value | `nvidia-rtx-pro-6000` | `nvidia-l4` (lowercase L, not fourteen) |
| GPU memory | 96 GB | 24 GB |
| Driver | NVIDIA 580.x.x (13.0) | NVIDIA 580.x.x (13.0) |
| Minimum CPU | 20 | 4 (8 recommended) |
| Minimum memory | 80 GiB (`80Gi`) | 16 GiB (`16Gi`), 32 GiB recommended |
| Initial quota (first use per region) | 3,000 milliGPU (3 GPUs), zonal redundancy off | 3 GPUs, zonal redundancy off |
| Regions | `asia-southeast1`, `asia-south2`, `europe-west4`, `us-central1` | `asia-southeast1`, `asia-south1` (invitation only), `europe-west1`, `europe-west4`, `us-central1`, `us-east4` |

GPUs per instance: 1 (`GPU_NUMBER` defaults to `1` if a GPU type is given). With sidecars the GPU attaches to one container only.

Requirements:

- Instance-based billing (services can still scale to zero; minimum instances are charged at the full rate even when idle). No per-request fees.
- Maximum instances must be set below the project's regional GPU quota; GPU instances are limited both by the per-service maximum and by the quota per project per region across services.
- Set an optimal maximum concurrency for the GPU workload.
- Enable the Cloud Run API (`serviceusage.services.enable`, for example via Service Usage Admin `roles/serviceusage.serviceUsageAdmin`).

GPU zonal redundancy:

| Option | Behavior |
|---|---|
| On (default) | GPU capacity is reserved across multiple zones; higher reliability and higher cost per GPU second |
| Off | Best-effort failover only if capacity exists; lower cost per GPU second; quota increases are more likely and faster |

Required roles: Cloud Run Developer (`roles/run.developer`) on the service; Service Account User (`roles/iam.serviceAccountUser`) on the service identity.

## Notes

- Driver libraries are mounted under `/usr/local/nvidia/lib64` and appended to `LD_LIBRARY_PATH`; values you put earlier in `LD_LIBRARY_PATH` take precedence. For CUDA above 13.0, use a newer NVIDIA base image with forward compatibility packages or install them and add them to `LD_LIBRARY_PATH`.
- Source inconsistency: the CPU page states a maximum of 8 vCPU and the memory page a maximum of 32 Gi (as do the quotas page, https://docs.cloud.google.com/run/quotas, and the fit-for-run page, https://docs.cloud.google.com/run/docs/fit-for-run), but the RTX PRO 6000 requires at least 20 CPU and 80 GiB.
- Source-built GPU deployments use the `e2-highcpu-8` Cloud Build machine type instead of `e2-standard-2`. GPU is billed for the entire instance lifecycle.
- Quota is requested per GPU type and redundancy option (metrics such as `run.googleapis.com/nvidia_l4_gpu_allocation_no_zonal_redundancy`); see https://docs.cloud.google.com/run/quotas#increase. The SLA depends on whether zonal redundancy is on (https://cloud.google.com/run/sla).
- If you use an LLM with GPUs, also read https://docs.cloud.google.com/run/docs/configuring/services/gpu-best-practices.
- Any configuration change creates a new revision.
- For a new service, `--gpu 1` also needs `--cpu 4` or more and `--memory 16Gi` or more (`gcloud run deploy --gpu` help: "1 gpu also requires a minimum 4 --cpu value and a minimum 16Gi --memory value"; RTX PRO 6000 needs at least 20 CPU and `80Gi`) and instance-based billing (`--no-cpu-throttling`); the source's minimal create commands above omit them, so add those flags when the service does not already have them.
- Corrected from the official docs: the update command `--max-instances MAX_INSTANCE` followed by `--GPU_ZONAL_REDUNDANCY` on the next line had no `\` continuation and used a placeholder in place of a flag; added the `\` and wrote `--no-gpu-zonal-redundancy`.
- The source also shows Console and Terraform forms (omitted).
- Source: https://docs.cloud.google.com/run/docs/configuring/services/gpu (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)

## Related

- [max-instances.md](./max-instances.md)
- [concurrency.md](./concurrency.md)
- CPU limits: https://docs.cloud.google.com/run/docs/configuring/services/cpu
- Memory limits: https://docs.cloud.google.com/run/docs/configuring/services/memory-limits
