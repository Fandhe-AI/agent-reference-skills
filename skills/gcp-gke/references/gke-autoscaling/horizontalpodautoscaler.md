---
source: https://docs.cloud.google.com/kubernetes-engine/docs/concepts/horizontalpodautoscaler
---

# Horizontal Pod autoscaling

The horizontal Pod autoscaler (HPA) changes the number of Pods of a workload based on CPU or memory consumption, custom metrics reported inside Kubernetes, or external metrics. It does not change the number of nodes; use the cluster autoscaler for that.

## Signature / Usage

Each HPA exists as a HorizontalPodAutoscaler object:

```bash
kubectl get hpa
kubectl describe hpa HPA_NAME
```

HPA objects can also be created with the `kubectl autoscale` command.

## Options / Props

| Topic | Behavior |
|-------|----------|
| Metric types | Resource usage (raw value or percentage of request), custom metrics, external metrics |
| Multiple metrics | Each metric evaluated separately; the largest scale wins. If a metric is unavailable, HPA still scales up but does not scale down |
| `scaleDown.stabilizationWindowSeconds` | Defaults to 300 seconds in GKE; HPA picks the largest recommendation in the window |
| Tolerance | 10%; no action if current/target ratio is within 10% of 1.0 |
| Scale to zero | GKE 1.37 or later. Tolerance check bypassed at 0 replicas; `scaleUp.stabilizationWindowSeconds` defaults to 0, scale-down to 300 |
| Conditions at zero | `ScaledToZero: True` with `ScalingActive: True`; manual `kubectl scale` to 0 sets `ScalingActive: False` |

| Scalability | Recalculation within 15 seconds |
|-------------|--------------------------------|
| GKE 1.31 or 1.32 with Performance HPA profile | Up to 1,000 HPA objects |
| GKE 1.33 or later with Performance HPA profile (default on clusters meeting requirements) | Up to 5,000 HPA objects |
| No Performance HPA profile | Up to 300 HPA objects |

## Notes

- Percentage utilization targets require resource requests on every container of every Pod in the workload; otherwise HPA takes no action for that metric.
- Do not use HPA with the standard vertical Pod autoscaler on CPU or memory, unless using HPA rightsizing with VPA (Preview) or multidimensional Pod autoscaling. Using them on other metrics is fine.
- Configure HPA on the Deployment, not on its ReplicaSet or Replication Controller. DaemonSets cannot be autoscaled.
- Metric names cannot contain uppercase letters or `/`; a metric adapter such as `prometheus-adapter` may rename them.
- Custom metric stack latency above about 50 ms and multiple metrics lengthen the recalculation period.
- Snippet commands are inline commands from the source page; the source has no manifest.
- Source: https://docs.cloud.google.com/kubernetes-engine/docs/concepts/horizontalpodautoscaler (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [custom-and-external-metrics.md](./custom-and-external-metrics.md)
- [verticalpodautoscaler.md](./verticalpodautoscaler.md)
- [cluster-autoscaler.md](./cluster-autoscaler.md)
