---
source: https://docs.cloud.google.com/compute/docs/autoscaler/scaling-cpu
---

# Scaling based on CPU utilization

Autoscale a managed instance group (MIG) on the average CPU utilization of its instances. The autoscaler treats the target as a fraction of the average use of all vCPUs over time in the group (a 0.75 target keeps average vCPU utilization at 75%).

## Signature / Usage

Permissions required: `compute.autoscalers.create` and `compute.instanceGroupManagers.use` on the project. To configure a stabilization period you must use the gcloud CLI or REST.

### gcloud

`--max-num-replicas` is required along with `--target-cpu-utilization`.

```bash
gcloud compute instance-groups managed set-autoscaling example-managed-instance-group \
    --max-num-replicas 20 \
    --target-cpu-utilization 0.60 \
    --cool-down-period 90 \
    --stabilization-period 240
```

Verify:

```bash
gcloud compute instance-groups managed describe example-managed-instance-group
```

### REST

Use `autoscalers.insert` for a zonal MIG or `regionAutoscalers.insert` for a regional MIG. Autoscaling is a separate API resource from the MIG.

```http
POST https://compute.googleapis.com/compute/v1/projects/PROJECT_ID/zones/ZONE/autoscalers
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
    "coolDownPeriodSec": 90,
    "stabilizationPeriodSec": 240
  }
}
```

## Options / Props

| gcloud flag | REST field | Description |
| --- | --- | --- |
| `--max-num-replicas` | `autoscalingPolicy.maxNumReplicas` | Required |
| `--target-cpu-utilization` | `autoscalingPolicy.cpuUtilization.utilizationTarget` | Required for this signal |
| `--cool-down-period` | `coolDownPeriodSec` | Initialization period; default 60 seconds. Scale-out ignores data from VMs still initializing |
| `--stabilization-period` | `stabilizationPeriodSec` | Scale-in duration; a shorter value deletes VMs sooner. Between `0` and `3600` seconds; default `600` seconds |

The request body must contain `name`, `target` and `autoscalingPolicy`; `autoscalingPolicy` must define `cpuUtilization` and `maxNumReplicas`.

## Notes

- The autoscaler uses the `compute.googleapis.com/instance/cpu/utilization` metric, which reports CPU utilization as measured by the hypervisor. It does not use values reported inside the guest OS by `top`, Task Manager or the Ops Agent; these can differ.
- Caution from the source: if the application takes a long time to initialize on new VMs, do not set a target CPU utilization of 85% or higher, or the CPUs may be overloaded while new VMs initialize.
- If `set-autoscaling` is used on a MIG that already has autoscaling, it updates the existing autoscaler to the new specifications.
- Heavy CPU: when utilization is close to 100%, the autoscaler increases the number of VMs by 50% at most. The source says this behavior might change and recommends not relying on it.
- Predictive autoscaling can be enabled for CPU-based autoscaling (see predictive-autoscaling.md).
- The source also shows the Console steps (a CPU utilization signal is added by default).
- Source: https://docs.cloud.google.com/compute/docs/autoscaler/scaling-cpu (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [autoscaler.md](./autoscaler.md)
- [predictive-autoscaling.md](./predictive-autoscaling.md)
- [multiple-signals.md](./multiple-signals.md)
- [understanding-autoscaler-decisions.md](./understanding-autoscaler-decisions.md)
