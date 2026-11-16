---
source: https://docs.cloud.google.com/kubernetes-engine/docs/concepts/custom-and-external-metrics
---

# Custom and external metrics for autoscaling

How to scale the replicas of a workload with custom, external, or Prometheus metrics, for example queue length against a task-processing SLO.

## Signature / Usage

```bash
kubectl get hpa
kubectl describe hpa HPA_NAME
```

## Options / Props

| Metric kind | Description |
|-------------|-------------|
| Custom | Reported by your application running in Kubernetes. Managed Service for Prometheus metrics count as custom metrics. Managed Service for Prometheus is recommended, queried with PromQL |
| External | Reported by an application or service outside the cluster (for example Pub/Sub or Dataflow); must be exported to a Monitoring instance the cluster can access |
| Import path | Managed Service for Prometheus (recommended) or the Cloud Monitoring API |

## Notes

- Exposing custom metrics so a Pod or workload sends metrics directly to the autoscaler is Preview.
- Snippet taken from https://docs.cloud.google.com/kubernetes-engine/docs/concepts/horizontalpodautoscaler (the source page has no code).
- Source: https://docs.cloud.google.com/kubernetes-engine/docs/concepts/custom-and-external-metrics (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [horizontalpodautoscaler.md](./horizontalpodautoscaler.md)
- [verticalpodautoscaler.md](./verticalpodautoscaler.md)
