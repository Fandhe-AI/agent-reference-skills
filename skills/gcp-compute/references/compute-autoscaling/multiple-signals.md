---
source: https://docs.cloud.google.com/compute/docs/autoscaler/multiple-signals
---

# Scaling based on multiple signals

An autoscaling policy can combine several signals. The autoscaler calculates the recommended number of VMs for each signal and sets the MIG's recommended size to the largest.

## Signature / Usage

Permissions required: to create an autoscaler for an existing MIG, `compute.autoscalers.create` on the project and `compute.instanceGroupManagers.use` on the MIG; to edit an existing autoscaler, `compute.autoscalers.update` on the project.

### gcloud

Replace `MIG_NAME` with the name of a MIG, and `PATH_TO_CUSTOM_METRIC_1` / `PATH_TO_CUSTOM_METRIC_2` (optional) with custom metric paths such as `custom.cloudmonitoring.googleapis.com/path/to/metric1`.

```bash
gcloud compute instance-groups managed set-autoscaling MIG_NAME \
   --target-cpu-utilization=0.8 \
   --target-load-balancing-utilization=0.6 \
   --custom-metric-utilization metric=PATH_TO_CUSTOM_METRIC_1,utilization-target=1000.0,utilization-target-type=GAUGE \
   --custom-metric-utilization metric=PATH_TO_CUSTOM_METRIC_2,utilization-target=2000.0,utilization-target-type=DELTA_PER_SECOND \
   --set-schedule=workday-capacity \
   --schedule-cron="30 8 * * Mon-Fri" \
   --schedule-duration-sec=30600 \
   --schedule-min-required-replicas=10 \
   --schedule-description="Have at least 10 VMs every Monday through Friday from 8:30 AM to 5 PM UTC" \
   --min-num-replicas=1 \
   --max-num-replicas=50
```

### REST

Use `autoscalers.insert` (zonal MIG) or `regionAutoscalers.insert` (regional MIG). Replace `PROJECT` (project ID), `ZONE`, `MIG_NAME`, and the optional `PATH_TO_CUSTOM_METRIC_1` / `PATH_TO_CUSTOM_METRIC_2`.

```http
POST https://compute.googleapis.com/compute/v1/projects/PROJECT/zones/ZONE/autoscalers

{
  "autoscalingPolicy" : {
    "cpuUtilization":{
      "utilizationTarget": 0.8
    },
    "loadBalancingUtilization":{
      "utilizationTarget": 0.6
    },
    "customMetricUtilizations":[
      {
        "metric": "PATH_TO_CUSTOM_METRIC_1",
        "utilizationTarget": 1000,
        "utilizationTargetType":"GAUGE"
      },
      {
        "metric": "PATH_TO_CUSTOM_METRIC_2",
        "utilizationTarget": 2000,
        "utilizationTargetType": "DELTA_PER_SECOND"
      }
    ],
    "scalingSchedules": {
      "workday-capacity": {
        "minRequiredReplicas": 10,
        "schedule": "30 8 * * Mon-Fri",
        "durationSec": 30600,
        "description": "Have at least 10 VMs every Monday through Friday from 8:30 AM to 5 PM UTC"
      },
      "january-30-2030-schedule": {
        "minRequiredReplicas": 30,
        "schedule": "0 0 30 1 * 2030",
        "timeZone": "America/New_York",
        "durationSec": 86400,
        "description": "Schedule a minimum of 30 VMs all day for January 30, 2030"
      }
    },
    "maxNumReplicas": 50,
    "minNumReplicas": 1
  },
  "target": "https://www.googleapis.com/compute/v1/projects/myproject/zones/us-central1-a/instanceGroupManagers/MIG_NAME",
  "name": "MIG_NAME"
}
```

## Options / Props

| Signal | Limit per autoscaler | gcloud flag | REST field |
| --- | --- | --- | --- |
| CPU utilization | 1 | `--target-cpu-utilization` | `cpuUtilization.utilizationTarget` |
| Load balancing utilization | 1 | `--target-load-balancing-utilization` | `loadBalancingUtilization.utilizationTarget` |
| Cloud Monitoring metrics | up to 5 | `--custom-metric-utilization` (repeat the flag) | `customMetricUtilizations[]` |
| Scaling schedules | up to 128 per MIG | `--set-schedule`, `--schedule-cron`, `--schedule-duration-sec`, `--schedule-min-required-replicas`, `--schedule-description` | `scalingSchedules` |

### Worked example from the source

Signals: CPU 0.8, load balancing 0.6, metric1 target 1000, metric2 target 2000, a schedule of at least 6 VMs every Saturday and Sunday at 12:00 AM for 24 hours, and a schedule of at least 15 VMs Monday through Friday at 9:00 AM for 8 hours. For a 10-VM MIG measured at CPU 0.5, load balancing 0.4, metric1 1100, metric2 2700, the recommendations are:

| Signal | Recommended VMs |
| --- | --- |
| CPU utilization | 7 |
| Load balancing utilization | 7 |
| metric1 | 11 |
| metric2 | 14 |
| Weekend schedule | 6 |
| Weekday schedule (9:00 AM to 5:00 PM) | 15 |

The autoscaler resizes the MIG to 15 VMs if the second schedule is active, otherwise 14 VMs.

## Notes

- One signal per metric type is allowed, except Cloud Monitoring metrics (up to 5) and scaling schedules (up to 128 per MIG). Except for custom metric flags, pass at most one flag per metric type per `gcloud` command.
- The minimum size of the MIG is always maintained regardless of its signals; the maximum is never exceeded regardless of the recommended size.
- The source also shows the Console steps (Add a signal, Autoscaling schedules, Initialization period, scale-in controls).
- Source: https://docs.cloud.google.com/compute/docs/autoscaler/multiple-signals (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [autoscaler.md](./autoscaler.md)
- [scaling-cpu.md](./scaling-cpu.md)
- [scaling-load-balancing.md](./scaling-load-balancing.md)
- [understanding-autoscaler-decisions.md](./understanding-autoscaler-decisions.md)
