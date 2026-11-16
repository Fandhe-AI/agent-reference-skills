---
source: https://docs.cloud.google.com/batch/docs/vm-os-environment-overview
---

# VM OS environment overview

Concepts for the OS environment (boot disks and OS image) of the Compute Engine VMs that run Batch jobs: when to configure it, the defaults, supported VM OS images and their restrictions, and boot disk type and size options.

## Signature / Usage

The twin for this page has no code. Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/batch/jobs/submit (gcloud 593.0.0 help); the OS image and boot disk are set in the submitted job config (`allocationPolicy.instances[].policy`):

```bash
gcloud batch jobs submit \
    projects/foo/locations/us-central1/jobs/bar --config=config.json
```

## Options / Props

### Defaults

| Property | Default |
|---|---|
| VM OS image | Only container runnables: latest Batch Container-Optimized OS (COS) image. Otherwise: latest Batch Debian image. |
| Boot disk type | Persistent Disk `pd-balanced` |
| Boot disk size | `defaultBootDiskSize = reservedSize + (taskSize * parallelTasksPerVm)`; rounded to at least 30 GB and at most 10,000 GB |
| `reservedSize` | 10 GB reserved for required software such as the VM OS image |
| `taskSize` | Boot disk per task, from the `bootDiskMib` field |
| Interface | Automatically NVMe or SCSI depending on the machine type; cannot be chosen directly |

### Supported VM OS images

| Type | Details |
|---|---|
| Batch images (project `batch-custom-image`, recommended) | `batch-debian` prefix (default for jobs with any script runnable); `batch-cos` prefix (Container-Optimized OS based, default for container-only jobs); `batch-hpc-rocky` prefix (HPC Rocky Linux based, for HPC workloads) |
| Compute Engine public images | Only generally available (GA) images of Debian and Rocky Linux |
| Custom images | Can be used but might not be supported; build on a public image Batch supports. See the `build-custom-image` samples in `GoogleCloudPlatform/batch-samples`. |

### Restrictions for VM OS images

| Restriction | Detail |
|---|---|
| Deprecated Batch images | Might not be supported. Minimum lifetime is the earlier of 60 days after the image start date (in the name, e.g. `batch-cos-stable-official-20230719-00-p00` = 2023-07-19) and the deprecation date of the base Compute Engine OS version. |
| No external access (no Cloud NAT / Private Google Access) | GPU jobs with only container runnables: only the default latest Batch COS image. Otherwise: only Batch images. |
| Trusted images policy | If `compute.trustedImageProjects` is enabled, any image not allowed by the policy cannot be used. |
| Drivers | The image must have drivers for the boot disk interface and for any persistent disk storage volumes (NVMe and SCSI are installed in most public images, including all Batch images). |
| Non-Batch images | If the image is neither a Batch image nor a custom image based on one, Batch installs required packages after the VMs start; they vary and change over time. |

### Boot disk options

- Type: all Persistent Disk types.
- Size: all persistent disk sizes and increments, minimum 30 GB for Batch jobs, and large enough for the OS image plus the tasks running on each VM.

## Notes

- Configure the VM OS image when the trusted images constraint blocks the default image, or when your runnables need software the default image does not support. Configure the boot disk when you need more space.
- Known issue: some Compute Engine images with outdated kernels make jobs fail; use a newer image version (see the Batch known issues page).
- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/batch/jobs/submit (gcloud 593.0.0 help).
- Compute Engine images, disks and machine types themselves are in this skill's other categories; the Batch-side setting is here. Google Cloud Batch (`batch.googleapis.com`) — not the Claude / OpenAI batch APIs (`anthropic-api-core`, `openai-api-core`) and not Kubernetes Jobs (`gcp-gke`).
- Source: https://docs.cloud.google.com/batch/docs/vm-os-environment-overview (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [create-run-job.md](./create-run-job.md)
- [networking-overview.md](./networking-overview.md)
