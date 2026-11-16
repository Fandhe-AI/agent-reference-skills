---
source: https://docs.cloud.google.com/tpu/docs/regions-zones
---

# TPU regions and zones

The zones in which you can create TPU VMs, by TPU version and region. You specify the zone when you create a TPU VM. Google Cloud also offers AI zones (specialized zones for AI/ML training and inference with significant GPU/TPU capacity, typically within a 5 ms radius of standard zones).

## Signature / Usage

Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/compute/tpus/locations/list (gcloud 593.0.0 help; this command belongs to the legacy Cloud TPU API CLI, see Notes):

```bash
gcloud compute tpus locations list
```

## Options / Props

### North America

| TPU type | TPU cores | Supported zones |
|---|---|---|
| TPU7x (all configurations) | Varies by slice size | `us-central1-ai1a`, `us-central1-c` |
| v6e (all configurations) | Varies by slice size | `us-central1-b`, `us-east1-d`, `us-east5-a`, `us-east5-b`, `us-south1-ai1b` |
| v5p (all configurations) | Varies by slice size | `us-central1-a`, `us-east5-a` |
| v5e (all configurations) | Varies by slice size | `us-central1-a`, `us-south1-a`, `us-west1-c`, `us-west4-a` |
| v4 (all configurations) | Varies by slice size | `us-central2-b` |
| v3-8 | 8 | `us-central1-a`, `us-central1-b` |
| v2-8 | 8 | `us-central1-b`, `us-central1-c` |
| v2-32 | 32 | `us-central1-a` |
| v2-128 | 128 | `us-central1-a` |
| v2-256 | 256 | `us-central1-a` |
| v2-512 | 512 | `us-central1-a` |

### Europe

| TPU type | TPU cores | Supported zones |
|---|---|---|
| v6e (all configurations) | Varies by slice size | `europe-west4-a` |
| v5p (all configurations) | Varies by slice size | `europe-west4-b` |
| v5e (all configurations) | Varies by slice size | `europe-west4-b` |
| v3-8, v3-32, v3-64, v3-128, v3-256, v3-512, v3-1024, v3-2048 | 8, 32, 64, 128, 256, 512, 1024, 2048 | `europe-west4-a` (each) |
| v2-8, v2-32, v2-128, v2-256, v2-512 | 8, 32, 128, 256, 512 | `europe-west4-a` (each) |

### Asia Pacific

| TPU type | TPU cores | Supported zones |
|---|---|---|
| v6e (all configurations) | Varies by slice size | `asia-northeast1-b` |
| v2-8 | 8 | `asia-east1-c` |

### South America

| TPU type | TPU cores | Supported zones |
|---|---|---|
| v6e (all configurations) | Varies by slice size | `southamerica-west1-a` |

## Notes

- TPU types with higher numbers of chips or cores are available only in limited quantities; lower counts are more likely to be available.
- The Cloud TPU pricing page might show pricing for regions where public TPU zones aren't generally available; use the tables on this page to verify which regions and zones currently support each version.
- Condition: this page lists v5e, v4, v3 and v2, but Compute Engine supports only v5p, v6e and TPU7x (see [tpus-in-compute-engine.md](./tpus-in-compute-engine.md)).
- Legacy CLI: `gcloud compute tpus ...` commands belong to the Cloud TPU API, which is no longer under active development (bug fixes and security updates only) and does not cover new hardware generations starting with TPU7x; for Compute Engine use the zones from the tables above with `gcloud compute instances create` (see [create-tpu-vm-instance.md](./create-tpu-vm-instance.md)). The help text lists the zones where the legacy API offers TPUs.
- Distance line: Compute Engine TPU VMs; GPUs and TPUs on GKE nodes are in `gcp-gke`.
- The source has no code block; the snippet above is borrowed.
- Source: https://docs.cloud.google.com/tpu/docs/regions-zones (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)
- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/compute/tpus/locations/list (gcloud 593.0.0 help).

## Related

- [create-tpu-vm-instance.md](./create-tpu-vm-instance.md)
- [tpu-machines.md](./tpu-machines.md)
- [plan-tpus.md](./plan-tpus.md)
