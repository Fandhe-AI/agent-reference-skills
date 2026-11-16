---
source: https://docs.cloud.google.com/compute/docs/autoscaler/predictive-autoscaling
---

# Scaling based on predictions

Predictive autoscaling forecasts load from the MIG's history and scales out in advance of predicted load, so that new instances are ready when the load arrives. It combines forecasts with real-time data.

## Signature / Usage

Permissions required: `compute.autoscalers.update` on the group's autoscaler and `compute.instanceGroupManagers.use` on the group.

### gcloud

Include `--cpu-utilization-predictive-method` when setting or updating an autoscaler: `optimize-availability` enables the predictive algorithm, `none` (default) disables it. If CPU-based autoscaling is not yet enabled, configure it from scratch (here: target 75%, max 20 instances, initialization period of 5 minutes):

```bash
gcloud compute instance-groups managed set-autoscaling MIG_NAME \
  --cpu-utilization-predictive-method optimize-availability \
  --target-cpu-utilization 0.75 \
  --max-num-replicas 20 \
  --cool-down-period 300
```

If CPU-based autoscaling is already enabled:

```bash
gcloud compute instance-groups managed update-autoscaling MIG_NAME \
  --cpu-utilization-predictive-method=optimize-availability
```

### REST

Include the `predictiveMethod` field (`OPTIMIZE_AVAILABILITY` enables, `NONE` default disables). With no autoscaling configuration, call `regionAutoscalers.insert` (regional) or `autoscalers.insert` (zonal); with an existing one, call `regionAutoscalers.patch` or `autoscalers.patch`. Example patch of a regional autoscaler:

```http
PATCH https://compute.googleapis.com/compute/v1/projects/PROJECT_ID/regions/REGION/autoscalers?autoscaler=AUTOSCALER_NAME

{
  "target": "https://compute.googleapis.com/compute/v1/projects/PROJECT_ID/regions/REGION/instanceGroupManagers/MIG_NAME",
  "autoscalingPolicy": {
    "cpuUtilization": {
       "utilizationTarget": 0.75,
       "predictiveMethod": "OPTIMIZE_AVAILABILITY"
     },
    "maxNumReplicas": 20,
    "coolDownPeriodSec": 300
  }
}
```

## Options / Props

| Setting | gcloud | REST | Values |
| --- | --- | --- | --- |
| Predictive method | `--cpu-utilization-predictive-method` | `cpuUtilization.predictiveMethod` | `optimize-availability` / `OPTIMIZE_AVAILABILITY`; `none` / `NONE` (default) |
| Initialization period | `--cool-down-period` | `coolDownPeriodSec` | Seconds; informs how far in advance VMs are created (300 = 5 minutes ahead) |

### Limitations

- Works only with CPU utilization as the scaling metric. Cloud Load Balancing and Cloud Monitoring metrics are not supported.
- Requires 3 days of CPU-based autoscaling history before predictions; up to 3 weeks of history feed the machine learning model. Until then the group scales on real-time data only.
- Predictions are based on weekly and daily patterns. Monthly, annual, one-time events and patterns shorter than 10 minutes are not predicted; use schedule-based autoscaling for those.
- A new MIG (for example in a blue-green deployment) needs 3 days of load data again before forecasts start.

## Notes

- Predictive autoscaling is free, but it starts VMs earlier and may run them longer, so you pay for the Compute Engine resources used and costs might increase. Use it where you need to improve availability by keeping utilization below the target.
- Suitable workloads: long initialization (for example an initialization period of more than 2 minutes) and predictable daily or weekly cycles.
- Forecasts are recomputed every few minutes. If real-time utilization exceeds the prediction, the real-time value takes priority; short unpredictable spikes are handled reactively (VMs are not created in advance), and after sudden dips the forecast adjusts and the autoscaler scales in after the standard stabilization period.
- Factors in the calculation: predicted and current metric value, confidence in past trends (variability), and the initialization period.
- To check suitability without enabling it, use the Console: the CPU utilization signal links to a 7-day comparison of VMs used and overloaded per day, and the group's Monitoring tab shows a Predictive autoscaling chart that can simulate it. The source also shows the Console enable steps.
- The source mentions a private preview (contact mig-discuss@google.com) to preserve load history across MIGs.
- Source: https://docs.cloud.google.com/compute/docs/autoscaler/predictive-autoscaling (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [autoscaler.md](./autoscaler.md)
- [scaling-cpu.md](./scaling-cpu.md)
- [understanding-autoscaler-decisions.md](./understanding-autoscaler-decisions.md)
