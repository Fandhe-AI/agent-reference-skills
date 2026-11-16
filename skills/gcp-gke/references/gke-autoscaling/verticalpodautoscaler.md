---
source: https://docs.cloud.google.com/kubernetes-engine/docs/concepts/verticalpodautoscaler
---

# About vertical Pod autoscaling

Vertical Pod autoscaling (VPA) analyzes historical usage and recommends or automatically applies CPU and memory requests and limits for containers. It is enabled by default in Autopilot clusters and is based on the open source VerticalPodAutoscaler API (`autoscaling.k8s.io/v1`) with a GKE-specific recommender.

## Signature / Usage

The source page has no code. Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/container/clusters/update (the flag that enables vertical Pod autoscaling on a Standard cluster):

```text
--enable-vertical-pod-autoscaling
   Enable vertical pod autoscaling for a cluster.
```

Key fields named in the source text: `spec.updatePolicy.updateMode` (for example `InPlaceOrRecreate`), `spec.updatePolicy.minReplicas`, and `spec.resourcePolicy.containerPolicies[]` with `minAllowed`, `maxAllowed`, `controlledResources` and `controlledValues`.

## Options / Props

| `updateMode` | Behavior |
|--------------|----------|
| `Off` | Recommendations only, nothing applied |
| `Initial` | Requests assigned on Pod creation only |
| `Recreate` | Applies by evicting and re-creating the Pod |
| `Auto` | Default when unspecified; same as `Recreate` |
| `InPlaceOrRecreate` | Preview. Kubernetes 1.34.0-gke.2201000 and later. Resizes in place, falls back to re-creation |

| Field | Description |
|-------|-------------|
| `targetRef` | Controller with a Scale subresource (Deployment, StatefulSet, ...) |
| `updatePolicy.minReplicas` | Min live replicas to attempt eviction; default 1 in GKE 1.35.2+, 2 in 1.35.1 and earlier; overridable from 1.22 |
| `resourcePolicy.containerPolicies[]` | At most one per container plus optional wildcard `containerName = '*'` |
| `containerPolicies[].mode` | `Off` or `Auto` (default `Auto`) |
| `minAllowed` / `maxAllowed` | Bounds for recommendations; none by default |
| `controlledResources` | Default `[ResourceCPU, ResourceMemory]` |
| `controlledValues` | `RequestsAndLimits` (default) or `RequestsOnly` |
| `recommenders` | Empty for the GKE default; one entry for a custom recommender (GKE 1.22+) |
| Status `target` / `lowerBound` / `upperBound` / `uncappedTarget` | Recommended requests per container |
| Condition types | `RecommendationProvided`, `LowConfidence`, `NoPodsMatched`, `FetchingHistory` |

CPU startup boost: `type` is `Factor` (base x factor) or `Quantity` (base + quantity); unboost after Pod `Ready` and `durationSeconds` (one-minute granularity).

## Notes

- Fallback from in-place to re-creation: insufficient node capacity, QoS class change, `resizePolicy: RestartContainer`, or timeouts. After an OOM kill the recommendation gains about 20% memory or 100 MB, whichever is larger.
- Limitations: not ready for JVM workloads; needs a managing controller (no standalone Pods); only container-level `spec.containers[].resources` (no Pod-level `spec.resources`); keep VPA objects per cluster under 1,000; best for long-running (24 h+) homogeneous workloads.
- Do not combine with HPA on CPU/memory unless using HPA rightsizing with VPA (Preview) or multidimensional Pod autoscaling.
- Autopilot boost: capped by CPU:memory ratio and minimums (for example 50m); Scale-Out ComputeClass (1:4) may ignore boosts.
- The code block quotes the flag description from https://docs.cloud.google.com/sdk/gcloud/reference/container/clusters/update; the concept page itself has no manifest.
- Source: https://docs.cloud.google.com/kubernetes-engine/docs/concepts/verticalpodautoscaler (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [horizontalpodautoscaler.md](./horizontalpodautoscaler.md)
- [cluster-autoscaler.md](./cluster-autoscaler.md)
