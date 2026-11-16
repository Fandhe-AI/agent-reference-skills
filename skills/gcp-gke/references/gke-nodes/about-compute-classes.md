---
source: https://docs.cloud.google.com/kubernetes-engine/docs/concepts/about-compute-classes
---

# About GKE ComputeClasses

A ComputeClass is a Kubernetes custom resource (`cloud.google.com/v1`, kind `ComputeClass`) that defines node attributes and autoscaling settings. GKE cluster autoscaling uses it to create nodes for workloads that select it.

## Signature / Usage

### Define a ComputeClass

```yaml
apiVersion: cloud.google.com/v1
kind: ComputeClass
metadata:
  name: n4
spec:
  nodePoolAutoCreation:
    enabled: true
  priorities:
  - machineFamily: n4
  - machineFamily: n2
  whenUnsatisfiable: DoNotScaleUp
```

GKE tries N4 first, falls back to N2, and otherwise waits for resources before scheduling the Pod.

### Select a ComputeClass in a workload

Adapted (not in the official docs): restored the YAML indentation of the `nodeSelector` block and its comment, which was flattened in the source.

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: helloweb
  labels:
    app: hello
spec:
  selector:
    matchLabels:
      app: hello
  template:
    metadata:
      labels:
        app: hello
    spec:
      nodeSelector:
        # Replace with the name of a compute class
        cloud.google.com/compute-class: COMPUTE_CLASS
      containers:
      - name: hello-app
        image: us-docker.pkg.dev/google-samples/containers/gke/hello-app:1.0
        ports:
        - containerPort: 8080
        resources:
          requests:
            cpu: "250m"
            memory: "1Gi"
```

Replace `COMPUTE_CLASS` with a ComputeClass in the cluster, such as `n4` or the built-in `autopilot`.

### Implicit cluster-level default

If a cluster-level default is enabled and no ComputeClass named `default` exists, GKE behaves as if these rules applied:

```yaml
spec:
  whenUnsatisfiable: ScaleUpAnyway
  nodePoolAutoCreation:
    enabled: true
```

## Options / Props

| Capability | Description |
|------------|-------------|
| Fallback compute priorities | Ordered infrastructure configurations; GKE falls back to the next if the preferred one is unavailable |
| Active migration | Replaces nodes lower in the priority list with higher-priority nodes over time (`activeMigration.optimizeRulePriority: true`) |
| Autopilot in GKE Standard | Run workloads in Autopilot mode (container-optimized compute platform, Pod-based billing) in Standard clusters |
| `spec.whenUnsatisfiable` | `ScaleUpAnyway` lets GKE create nodes outside the priority rules (avoids Pending Pods); `DoNotScaleUp` forces the listed machine families |
| `spec.autoscalingPolicy` | Node consolidation parameters; in the cluster-level default class these apply to all nodes |

### Default ComputeClass effects

| Level | Effects |
|-------|---------|
| Namespace | Applies to Pods in that namespace; GKE adds a node selector to the Pods and labels/taints to created nodes; active migration is not triggered because only new Pods get the selector |
| Cluster | Applies to Pods in any namespace without an existing ComputeClass selector; no Pod modification; created nodes get label `cloud.google.com/compute-class: default` and no taint; active migration may trigger and increase disruption |

## Notes

- Use either ComputeClasses or individual node selectors for node attributes, not both; mixing causes unexpected scaling and scheduling.
- A namespace-level default prevents the cluster-level default from applying to that Pod.
- A cluster-level default named `default` that already exists is used as-is. Restrict create / update / patch / delete on it with an RBAC ClusterRole.
- If you switch an Autopilot cluster to a custom cluster-level default, Pods no longer use the Autopilot compute platform by default; in GKE 1.34.1-gke.1829001 and later add the node selector `cloud.google.com/compute-class: autopilot` per Pod.
- Source: https://docs.cloud.google.com/kubernetes-engine/docs/concepts/about-compute-classes (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)
- Corrected from the official docs: the Deployment `nodeSelector:` / `cloud.google.com/compute-class: COMPUTE_CLASS` lines had lost their indentation.

## Related

- [about-built-in-compute-classes.md](./about-built-in-compute-classes.md)
- [node-pools.md](./node-pools.md)
- [spot-vms.md](./spot-vms.md)
