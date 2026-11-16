---
source: https://docs.cloud.google.com/compute/docs/autoscaler/scaling-load-balancing
---

# Scaling based on load balancing serving capacity

Scale a managed instance group (MIG) so that it maintains a configurable fraction of the serving capacity defined by the backend service's balancing mode. Supported only for external Application Load Balancers and internal Application Load Balancers; other load balancer types are not supported.

## Signature / Usage

Permissions required: `compute.autoscalers.create` and `compute.instanceGroupManagers.use` on the project.

### gcloud

`--max-num-replicas` is required along with `--target-load-balancing-utilization`.

```bash
gcloud compute instance-groups managed set-autoscaling example-managed-instance-group \
    --max-num-replicas 20 \
    --target-load-balancing-utilization 0.6 \
    --cool-down-period 90 \
    --stabilization-period 240
```

Verify:

```bash
gcloud compute instance-groups managed describe example-managed-instance-group
```

### REST

Use `autoscalers.insert` (zonal MIG) or `regionAutoscalers.insert` (regional MIG). Autoscaling is a separate API resource from the MIG.

```http
POST https://compute.googleapis.com/compute/v1/projects/PROJECT_ID/zones/ZONE/autoscalers
```

```json
{
  "name": "example-autoscaler",
  "target": "zones/us-central1-f/instanceGroupManagers/example-managed-instance-group",
  "autoscalingPolicy": {
    "maxNumReplicas": 20,
    "loadBalancingUtilization": {
      "utilizationTarget": 0.8
    },
    "coolDownPeriodSec": 90,
    "stabilizationPeriodSec": 240
  }
}
```

## Options / Props

| gcloud flag | REST field | Description |
| --- | --- | --- |
| `--max-num-replicas` | `autoscalingPolicy.maxNumReplicas` | Required |
| `--target-load-balancing-utilization` | `autoscalingPolicy.loadBalancingUtilization.utilizationTarget` | Required for this signal |
| `--cool-down-period` | `coolDownPeriodSec` | Initialization period; default 60 seconds |
| `--stabilization-period` | `stabilizationPeriodSec` | Between `0` and `3600` seconds; default `600` seconds |

### Applicable load balancing configurations

| Backend capacity setting | Works with autoscaling? |
| --- | --- |
| Maximum backend utilization (`UTILIZATION` mode) | Yes |
| Maximum requests per second per instance (`RATE` mode) | Yes |
| Maximum requests per second per group | No: the setting is independent of the number of instances, so the load balancer sends the same rate to the group whether it has 2 or 100 instances |

Only zonal instance groups support a maximum rate for the whole group; regional MIGs do not support a maximum rate per group.

## Notes

- Example from the source: with serving capacity of 100 RPS per instance and a target utilization of 0.8, the autoscaler maintains 80 RPS per instance.
- If autoscaling is already enabled, `set-autoscaling` updates the existing autoscaler.
- The VM-side autoscaler setting is described here; load balancers and backend services themselves are in the planned `gcp-networking`.
- The source also shows the Console steps (signal type "HTTP load balancing utilization").
- Source: https://docs.cloud.google.com/compute/docs/autoscaler/scaling-load-balancing (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [autoscaler.md](./autoscaler.md)
- [scaling-cpu.md](./scaling-cpu.md)
- [multiple-signals.md](./multiple-signals.md)
