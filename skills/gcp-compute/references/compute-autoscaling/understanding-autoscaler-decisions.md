---
source: https://docs.cloud.google.com/compute/docs/autoscaler/understanding-autoscaler-decisions
---

# Understanding autoscaler decisions

Explains how an autoscaler derives a recommended size, applies it to the MIG's target size, handles scale-in controls, scaling to and from zero, and how to monitor and troubleshoot autoscaling.

## Signature / Usage

The page contains no code. Autoscaler mode changes the effect of the recommended size; the example below sets the mode with `update-autoscaling`.

Adapted (not in the official docs): added the required positional MIG name `MIG_NAME`, which the gcloud help example omits.

```bash
gcloud compute instance-groups managed update-autoscaling MIG_NAME \
  --mode=only-scale-out
```

## Options / Props

### Autoscaler mode and target size

| Mode | Effect on the MIG target size |
| --- | --- |
| `ON` | Target size is set to the recommended size |
| `ONLY_SCALE_OUT` | Target size only increases when the recommended size increases; it does not decrease |
| `OFF` | Target size unchanged; the autoscaler still calculates the recommended size in the background |

### Recommended size

Constraints on the recommended size: the minimum and maximum instances in the policy, and scale-in controls if configured. Read it from the Group size chart or the `recommendedSize` field of the autoscaler information. By default it handles peak load over the stabilization period; with predictive autoscaling it is based on the forecast. Deleting the autoscaler stops the calculation.

### Scale-in controls

| Property | Field | Meaning |
| --- | --- | --- |
| Maximum allowed reduction | `maxScaledInReplicas` (number or % of VMs) | VMs the workload can lose from the group's peak size within the trailing time window; lower means slower scale-in |
| Trailing time window | `timeWindowSec` (seconds) | Window in which the peak size is observed; the autoscaler won't resize below peak size minus the maximum allowed reduction |

Example from the source: a 20 VM maximum allowed reduction and a 30-minute window; if the peak was 70 VMs, the group can scale in to 50 VMs, and from a current size of 65 it can remove only 15. The maximum reduction can happen all at once. Scale-in controls work for zonal and regional MIGs and any group size.

| | Stabilization period | Scale-in controls: trailing time window |
| --- | --- | --- |
| Configurable | Yes | Yes |
| Monitors | Peak load over the stabilization period | Peak size of the group over the trailing time window |
| Purpose | Keep the size sufficient for observed peak load | Limit how many VMs are removed at once |

Scale-in controls do not switch off stabilization.

### Scaling to and from zero

| Direction | Conditions |
| --- | --- |
| Scale in to zero | `autoscalingPolicy.minNumReplicas` is `0`; no active schedule requiring more than zero instances; the policy has no average CPU utilization, HTTP load balancing serving capacity, or per-instance Cloud Monitoring metric signals |
| Scale out from zero | Only when a scaling signal or an active schedule requires more than zero instances; per-instance metric signals cannot scale out from zero, so set the MIG size manually |

### Common status messages

| Message | Meaning |
| --- | --- |
| `All instances in the instance group are unhealthy (not in RUNNING state). If this is an error, check the instances.` | All instances are in a state other than `RUNNING` |
| `The number of instances has reached the maxNumReplicas. The autoscaler cannot add more instances.` | Update `maxNumReplicas` to a larger number |
| `The monitoring metric that was specified does not exist or does not have the required labels. Check the metric.` | Metric missing, lacks labels, or not accessible to the Compute Engine Service Agent; verify it has `compute.serviceAgent` |
| `Quota for some resources is exceeded. Increase the quota or delete resources to free up more quota.` | Check the Quota page |
| `Autoscaling does not work with an HTTP/S load balancer configured for maxRate.` | Change the configuration or disable autoscaling |
| `The autoscaler is configured to scale based on a load balancing signal but the instance group has not received any queries from the load balancer. Check that the load balancing configuration is working.` | Idle service or misconfiguration (for example the group is the target of more than one load balancer, which is not supported) |

## Notes

- Gaps between target and actual utilization: the autoscaler rounds conservatively (for example, adding 1.5 VMs becomes 2), so small groups can sit far from the target; an active schedule can also keep utilization below target.
- Scale-out ignores data from initializing instances; an initialization period much longer than the real time can cause underestimating the group size. Scale-in uses peak load over the stabilization period, and a new instance runs for at least the stabilization period before it can be deleted; initialization periods are ignored for scale-in.
- Connection draining on the backend service can add up to 60 seconds after the draining period before the instance is removed or deleted.
- Turning the autoscaler OFF or restricting it keeps calculating (including scale-in controls); turning it ON again applies the latest calculation immediately, which can cause an abrupt scale-in (the source example goes from 80 to 40 VMs).
- Use a shutdown script (best-effort) to close connections, shut down apps or upload logs before an instance is stopped on scale-in; deletion priority is described in the MIG instance management page.
- The Monitoring tab shows Group size (instances, configured min and max, recommended size), Autoscaler utilization, CPU, disk and network charts and a Logs panel. The Group size events timeline is Preview (subject to the Pre-GA Offerings Terms); its data can lag up to 90 seconds.
- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/compute/instance-groups/managed/update-autoscaling (gcloud 593.0.0 help).
- Adapted from the official docs: the help example `$ gcloud compute instance-groups managed update-autoscaling \ --mode=only-scale-out` omits the required positional `NAME` argument (help: "Name of the managed instance group to operate on"); it was added as `MIG_NAME`, and the `$` prompt was dropped.
- Source: https://docs.cloud.google.com/compute/docs/autoscaler/understanding-autoscaler-decisions (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [autoscaler.md](./autoscaler.md)
- [predictive-autoscaling.md](./predictive-autoscaling.md)
- [multiple-signals.md](./multiple-signals.md)
