---
source: https://docs.cloud.google.com/run/docs/configuring/workerpools/manual-scaling
---

# Manually scale worker pools

Manual scaling sets a specific instance count without redeploying, so you can write your own scaling logic with an external system (see https://docs.cloud.google.com/run/docs/configuring/workerpools/crema-autoscaling). Changing the scaling mode or manual instance count does not create a new revision.

## Signature / Usage

### gcloud

```bash
gcloud run worker-pools deploy WORKER_POOL \
    --instances=INSTANCE_COUNT \
    --image IMAGE_URL
```

```bash
gcloud run worker-pools update WORKER_POOL \
   --instances=INSTANCE_COUNT
```

### YAML

```bash
gcloud run worker-pools describe WORKER_POOL --format export > worker-pool.yaml
```

Adapted (not in the official docs): quoted the annotation value; the source writes it in backticks, which is not valid YAML.

```yaml
apiVersion: run.googleapis.com/v1
kind: WorkerPool
metadata:
  name: WORKER_POOL
  annotations:
    run.googleapis.com/manualInstanceCount: "INSTANCE_COUNT"
```

```bash
gcloud run worker-pools replace worker-pool.yaml
```

### REST

Adapted (not in the official docs): quoted the URL (the `?` is otherwise subject to shell globbing) and removed the stray leading indentation.

```bash
curl -H "Content-Type: application/json" \
-H "Authorization: Bearer ACCESS_TOKEN" \
-X PATCH \
-d '{"scaling":{"manualInstanceCount":INSTANCE_COUNT }}' \
"https://run.googleapis.com/v2/projects/PROJECT_ID/locations/REGION/workerPools/WORKER_POOL?update_mask=scaling.manualInstanceCount"
```

### Disable a worker pool

```bash
gcloud run worker-pools update WORKER_POOL --instances=0
```

## Options / Props

| Name | Description |
| --- | --- |
| `--instances` | Number of instances; setting it switches the pool to manual scaling; `0` disables the pool |
| `run.googleapis.com/manualInstanceCount` | YAML annotation holding the instance count |
| `scaling.manualInstanceCount` | REST field (use `update_mask=scaling.manualInstanceCount`) |
| `scaling_mode = "MANUAL"` / `manual_instance_count` | Terraform fields |

| Role | Scope |
| --- | --- |
| Cloud Run Developer (`roles/run.developer`) | the Cloud Run service (as stated in the source) |
| Service Account User (`roles/iam.serviceAccountUser`) | the service identity |
| Artifact Registry Reader (`roles/artifactregistry.reader`) | the image repository (if applicable) |

## Notes

- Billing: with manual scaling every requested instance is billed as an active instance, even if idle. Pricing: https://cloud.google.com/run/pricing
- Setting 0 shuts down all instances; the console shows the setting as "Scaling: Manual (Instances: )".
- Source inconsistency: this page uses `--instances=0` to disable the worker pool; the gcloud help for `gcloud run worker-pools update` / `gcloud run worker-pools deploy` says the `--instances` value should be a positive integer.
- Corrected from the official docs: YAML annotation `` `INSTANCE_COUNT` `` (backticks) and the unquoted `update_mask` URL.
- The source also shows Console and Terraform forms, omitted here.
- If the exported file has `spec.template.metadata.name` (a revision name), delete it or set a new revision name before applying; revision names are immutable, so reusing the existing name with a changed configuration is rejected.
- Source: https://docs.cloud.google.com/run/docs/configuring/workerpools/manual-scaling (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)

## Related

- [deploy-worker-pools.md](./deploy-worker-pools.md)
- [managing-workerpools.md](./managing-workerpools.md)
