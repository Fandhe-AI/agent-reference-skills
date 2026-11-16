---
source: https://docs.cloud.google.com/compute/docs/autoscaler
---

# Autoscaling groups of instances

Autoscaling for managed instance groups (MIGs) automatically adds VMs (scale out) and deletes VMs (scale in) based on load, using an autoscaling policy made of one or more scaling signals. Only managed instance groups can be used with an autoscaler.

## Signature / Usage

### Restore the Compute Engine Service Agent binding

The autoscaler uses the Compute Engine Service Agent to add and remove instances. Google Cloud creates this service account and its binding to the Compute Engine Service Agent role (`roles/compute.serviceAgent`) when the Compute Engine API is enabled. If the account was removed from your project, add it back (the source also shows the Console steps):

```bash
gcloud projects add-iam-policy-binding PROJECT_ID \
   --member serviceAccount:service-PROJECT_NUMBER@compute-system.iam.gserviceaccount.com \
   --role roles/compute.serviceAgent
```

## Options / Props

### Autoscaling policy signals

| Signal | Details |
| --- | --- |
| Target utilization metrics | Average CPU utilization, HTTP load balancing serving capacity, Cloud Monitoring metrics |
| Schedules | Up to 128 scaling schedules per instance group; each has a capacity (minimum required VMs) and a schedule (start time, duration, recurrence: once, daily, weekly, monthly) |

- A policy must always have at least one signal. Turning on autoscaling adds a CPU utilization signal by default; you can edit or remove it.
- With multiple signals, the autoscaler computes the recommended number of VMs for each signal and uses the largest.
- A schedule is active from its start time for its duration; the group is scaled to at least the schedule's instance count.

### Scaling in to zero instances

| Case | Rule |
| --- | --- |
| Metric signals | A MIG cannot scale in to zero when autoscaling on average CPU utilization, HTTP load balancing serving capacity, or Monitoring metrics that come from each instance in the MIG |
| Other Monitoring metrics | Can scale in to zero if `autoscalingPolicy.minNumReplicas` is `0` |
| Schedules | Scale in to zero only if `minNumReplicas` is `0`, no schedule is active, and no signal prevents it |

### Periods and controls

| Setting | Behavior |
| --- | --- |
| Initialization period (formerly cool down period) | Default 60 seconds. Scale-in decisions use data from all instances, even ones still initializing; scale-out decisions ignore data from instances still initializing. With predictive mode, it makes the autoscaler scale out earlier (300 seconds means VMs are created 5 minutes ahead of forecasted load). A value much longer than the real initialization time can make the autoscaler ignore legitimate data and underestimate the group size |
| Stabilization period | Used only for scale-in. Default `10` minutes; configurable from `0` to `3600` seconds. `0` allows immediate scale-in |
| Autoscaling mode | Temporarily turn off or restrict autoscaling; the configuration persists and resumes when you turn it on again |
| Scale-in controls | Autoscaling policy properties: maximum allowed reduction (VMs the workload can lose from its peak size within the trailing time window) and trailing time window (history in which the peak size is observed) |
| Recommended size | Number of VMs the autoscaler recommends, based on peak load observed during the last 10 minutes (the stabilization period); constrained by scale-in controls if set |

Predictive autoscaling works best when the application takes a long time to initialize (for example, an initialization period of more than 2 minutes) and the workload varies predictably with daily or weekly cycles.

## Notes

- Limitations: autoscaling cannot be used with unmanaged instance groups, MIGs with stateful configuration, or MIGs with VM repairs turned off. You cannot create VM instances with specific names while autoscaling is on.
- Do not use Compute Engine autoscaling with MIGs owned by Google Kubernetes Engine (look for the `gke` prefix in the MIG name, for example `gke-test-1-3-default-pool-eadji9ah`); use GKE cluster autoscaling instead (`gcp-gke`).
- Autoscaling works independently from autohealing. While a MIG recreates a failed instance, the running count can be lower than `autoscalingPolicy.minNumReplicas`.
- There is no additional charge for configuring an autoscaling policy; you pay for the resources the MIG uses. See https://cloud.google.com/compute/all-pricing for pricing.
- The source also shows the Console steps for restoring the service agent binding.
- Source: https://docs.cloud.google.com/compute/docs/autoscaler (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [create-mig-with-basic-autoscaling.md](./create-mig-with-basic-autoscaling.md)
- [scaling-cpu.md](./scaling-cpu.md)
- [scaling-load-balancing.md](./scaling-load-balancing.md)
- [multiple-signals.md](./multiple-signals.md)
- [predictive-autoscaling.md](./predictive-autoscaling.md)
- [understanding-autoscaler-decisions.md](./understanding-autoscaler-decisions.md)
