---
source: https://docs.cloud.google.com/batch/docs/create-run-example-job
---

# Create and run an example job

Tutorial that creates and runs a Batch job transcoding three videos from a Cloud Storage bucket mounted into the VMs, then monitors, deletes and cleans up.

## Signature / Usage

### Get the sample

```bash
git clone https://github.com/GoogleCloudPlatform/batch-samples.git
```

```bash
cd batch-samples/transcoding/
```

### Prepare job inputs

Replace `BUCKET_NAME` with a globally unique bucket name. Do not include sensitive information in the name; bucket names are global and publicly visible.

```bash
gcloud storage buckets create gs://BUCKET_NAME
```

```bash
gcloud storage cp -R transcode.sh input gs://BUCKET_NAME
```

### Create the job

Set `remotePath` in `job.json` to your bucket name:

```json
{
  "taskGroups": [
    {
      "taskSpec": {
        "runnables": [
          {
            "script": {
              "text": "bash /mnt/share/transcode.sh"
            }
          }
        ],
        "computeResource": {
          "cpuMilli": 2000,
          "memoryMib": 2048
        },
        "volumes": [
          {
            "gcs": {
              "remotePath": "BUCKET_NAME"
            },
            "mountPath": "/mnt/share"
          }
        ],
        "maxRetryCount": 2,
        "maxRunDuration": "600s"
      },
      "taskCount": 3,
      "parallelism": 3
    }
  ],
  "allocationPolicy": {
    "instances": [
      {
        "policy": {
          "machineType": "n2d-standard-4",
          "provisioningModel": "SPOT"
        }
      }
    ]
  },
  "labels": {
    "department": "creative",
    "env": "testing"
  },
  "logsPolicy": {
    "destination": "CLOUD_LOGGING"
  }
}
```

```bash
gcloud batch jobs submit transcode \
    --config=job.json \
    --location=us-central1
```

The job runs 3 tasks concurrently; each runs `transcode.sh`, encodes one of 3 video files and uploads it to the bucket (`output/`).

### Clean up (destructive)

```bash
gcloud batch jobs delete transcode \
    --location=us-central1
```

```bash
gcloud storage rm gs://BUCKET_NAME \
    --recursive
```

```bash
gcloud projects delete PROJECT_ID
```

## Options / Props

| Item | Value |
|---|---|
| User roles | Batch Job Editor (`roles/batch.jobsEditor`) on the project; Service Account User (`roles/iam.serviceAccountUser`) on the Compute Engine default service account; Storage Admin (`roles/storage.admin`) on the project (buckets); Logs Viewer (`roles/logging.viewer`) |
| Job service account roles | Batch Agent Reporter (`roles/batch.agentReporter`), Storage Admin (`roles/storage.admin`), Logs Writer (`roles/logging.logWriter`), all on the project; grant to the Compute Engine default service account, not to your user |
| Expected duration | About 5 minutes; job status should be `Succeeded` before viewing `output/` in the bucket |

## Notes

- New project: the creator gets Owner and the Compute Engine default service account gets Editor, which already cover the tutorial. Editor and Storage Admin are broad; use a disposable project or narrower roles, not for production.
- Destructive: `gcloud batch jobs delete` removes the job's details and history (logs follow Cloud Logging retention); `gcloud storage rm ... --recursive` deletes the bucket and all objects; `gcloud projects delete` deletes everything in the project and loses custom project IDs. Try them on disposable resources first.
- The source also shows Console monitoring steps, sample command output and a final `rm -rf batch-samples` local cleanup (omitted).
- Google Cloud Batch (`batch.googleapis.com`) — not the Claude / OpenAI batch APIs (`anthropic-api-core`, `openai-api-core`) and not Kubernetes Jobs (`gcp-gke`). Cloud Storage buckets themselves are in `gcp-storage`.
- Source: https://docs.cloud.google.com/batch/docs/create-run-example-job (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [get-started.md](./get-started.md)
- [create-run-job.md](./create-run-job.md)
