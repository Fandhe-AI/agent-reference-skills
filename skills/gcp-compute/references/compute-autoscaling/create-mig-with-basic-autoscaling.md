---
source: https://docs.cloud.google.com/compute/docs/instance-groups/create-mig-with-basic-autoscaling
---

# Create a MIG with basic autoscaling

Create an autoscaled managed instance group (MIG) that adds and removes VMs based on average CPU utilization across the group. An instance template is required first.

## Signature / Usage

Permissions required: `compute.autoscalers.create` on the project and `compute.instanceGroupManagers.use` on the project.

### gcloud

Create the MIG first (zonal or regional), then enable autoscaling with `set-autoscaling`. `--max-num-replicas` is required along with `--target-cpu-utilization`.

```bash
gcloud compute instance-groups managed set-autoscaling example-managed-instance-group \
  --max-num-replicas 20 \
  --target-cpu-utilization 0.60 \
  --cool-down-period 90
```

Verify that autoscaling is enabled:

```bash
gcloud compute instance-groups managed describe example-managed-instance-group
```

### REST

Autoscaling is a separate API resource from the MIG. For a zonal MIG, `POST` to `autoscalers.insert`; for a regional MIG use `regionAutoscalers.insert`.

```http
POST https://compute.googleapis.com/compute/v1/projects/PROJECT_ID/zones/ZONE/autoscalers/
```

```json
{
  "name": "example-autoscaler",
  "target": "https://www.googleapis.com/compute/v1/projects/myproject/zones/us-central1-f/instanceGroupManagers/example-managed-instance-group",
  "autoscalingPolicy": {
    "maxNumReplicas": 10,
    "cpuUtilization": {
      "utilizationTarget": 0.6
    },
    "coolDownPeriodSec": 90
  }
}
```

## Options / Props

| gcloud flag | REST field | Description |
| --- | --- | --- |
| `--max-num-replicas` | `autoscalingPolicy.maxNumReplicas` | Required |
| `--target-cpu-utilization` | `autoscalingPolicy.cpuUtilization.utilizationTarget` | Required; fraction (0.60 = 60%) |
| `--min-num-replicas` | `autoscalingPolicy.minNumReplicas` | Optional; if not set, MIG sets it to 2 |
| `--cool-down-period` | `autoscalingPolicy.coolDownPeriodSec` | Initialization period; default 60 seconds |

The request body must contain `name`, `target` and `autoscalingPolicy`; `autoscalingPolicy` must define the target `cpuUtilization` and `maxNumReplicas`.

## Notes

- If autoscaling is already enabled for the MIG, `set-autoscaling` overwrites the existing autoscaler with the new specifications (the CPU and load-balancing pages of the same source say it "updates" it).
- Predictive autoscaling can optionally be enabled to scale out ahead of predicted load.
- The source also shows the Console steps (Instance groups page, Autoscaling mode "On: add and remove instances to the group", Target CPU utilization as a percentage such as `75`) and a Terraform sample (`google_compute_autoscaler`).
- Source: https://docs.cloud.google.com/compute/docs/instance-groups/create-mig-with-basic-autoscaling (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [autoscaler.md](./autoscaler.md)
- [scaling-cpu.md](./scaling-cpu.md)
- [predictive-autoscaling.md](./predictive-autoscaling.md)
