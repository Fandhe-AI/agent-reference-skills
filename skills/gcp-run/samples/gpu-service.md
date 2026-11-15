---
source: https://docs.cloud.google.com/run/docs/configuring/services/gpu
---

# Run a Service with a GPU

Deploy a Cloud Run service with one GPU per instance for AI inference, cap its instances below the GPU quota, set concurrency for the workload, and remove the GPU.

## Signature / Usage

### 1. Create a service with a GPU

A GPU service must use instance-based billing (`--no-cpu-throttling`) and at least 4 CPU and 16 GiB of memory for L4 (20 CPU and 80 GiB for RTX PRO 6000). These minimal commands omit those settings; for a new service add `--cpu`, `--memory` and `--no-cpu-throttling` as in the step 2 command.

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

### 2. Update the GPU configuration

Set `GPU_TYPE` to `nvidia-l4` (lowercase L) or `nvidia-rtx-pro-6000`. Use `--no-gpu-zonal-redundancy` (off) or `--gpu-zonal-redundancy` (on).

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

### 3. Set the maximum concurrency for the GPU workload

```bash
gcloud run services update SERVICE --concurrency CONCURRENCY
```

Revert to the default (80) with:

```bash
gcloud run services update SERVICE --concurrency default
```

### 4. Check and remove

```bash
gcloud run services describe SERVICE
```

```bash
gcloud run services update SERVICE --gpu 0
```

## Options / Props

| Item | NVIDIA RTX PRO 6000 Blackwell | L4 |
|---|---|---|
| `--gpu-type` | `nvidia-rtx-pro-6000` | `nvidia-l4` |
| GPU memory | 96 GB | 24 GB |
| Minimum CPU | 20 | 4 (8 recommended) |
| Minimum memory | `80Gi` | `16Gi` (32 GiB recommended) |
| Initial quota | 3,000 milliGPU (3 GPUs), zonal redundancy off | 3 GPUs, zonal redundancy off |

Requirements: one GPU per instance, instance-based billing, `--max-instances` below the project's regional GPU quota (GPU instances are limited by both the per-service maximum and the quota per project per region), an optimal maximum concurrency, and the Cloud Run API enabled. Required roles: `roles/run.developer` on the service and `roles/iam.serviceAccountUser` on the service identity.

## Notes

- The step 1 create commands come from the source without `--cpu`, `--memory` or `--no-cpu-throttling`; the minimums in the table still apply, so add those flags (see step 1) when the service does not already have them.
- Corrected from the official docs: the update command `--max-instances MAX_INSTANCE` followed by `--GPU_ZONAL_REDUNDANCY` on the next line had no `\` continuation and used a placeholder in place of a flag; added the `\` and wrote `--no-gpu-zonal-redundancy`.
- Zonal redundancy on (default) reserves capacity across zones at a higher cost per GPU second; off is best effort at a lower cost with quota increases more likely.
- GPU is billed for the entire instance lifecycle; minimum instances are charged at the full rate even when idle. Any configuration change creates a new revision.
- Run the GPU service as a dedicated user-managed service account like any other service.
- The `gcloud run` commands that omit `--region` follow the source; pass `--region=REGION` or set the `run/region` property (for example `gcloud config set run/region REGION`), otherwise gcloud prompts for a region or, in non-interactive runs, fails.
- Source: https://docs.cloud.google.com/run/docs/configuring/services/gpu (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/run/docs/configuring/concurrency (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/run/docs/configuring/max-instances (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)

## Related

- [deploy-service-from-source.md](./deploy-service-from-source.md)
- [gradual-rollout-with-tags.md](./gradual-rollout-with-tags.md)
- LLM serving: https://docs.cloud.google.com/run/docs/configuring/services/gpu-best-practices
