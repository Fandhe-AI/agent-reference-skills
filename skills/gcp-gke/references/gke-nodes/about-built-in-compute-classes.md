---
source: https://docs.cloud.google.com/kubernetes-engine/docs/concepts/about-built-in-compute-classes
---

# About built-in ComputeClasses in GKE

Built-in ComputeClasses are installed by GKE for general-purpose workloads that need no specialized hardware (such as GPUs) or node settings (such as sysctl flags). Use a custom ComputeClass for specialized needs.

## Signature / Usage

Inspect a built-in class:

```bash
kubectl get computeclass COMPUTECLASS_NAME -o yaml
```

Select a class (built-in or custom) in a workload. You cannot select more than one ComputeClass per workload.

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

## Options / Props

| ComputeClass | Description | Availability |
|--------------|-------------|--------------|
| `autopilot` | On-demand x86 nodes on the Autopilot container-optimized compute platform; default for Autopilot clusters; GKE manages nodes even in Standard | Autopilot clusters, and Standard clusters on GKE 1.34.1-gke.1829001 or later |
| `autopilot-spot` | Spot VMs on the Autopilot platform; applied by default to Autopilot Pods that select Spot VMs | Autopilot clusters, and Standard clusters on GKE 1.34.1-gke.1829001 or later |
| `autopilot-arm` | On-demand Arm nodes on a generation-less Autopilot platform (not tied to C4A / N4A / T2A); recommended for general-purpose Arm workloads | Autopilot GKE 1.35.3-gke.1389000 or later; Standard with Autopilot ComputeClasses GKE 1.36.0-gke.3302001 or later; regions `us-east1`, `us-west1`, `europe-west1`, `europe-west2`, `europe-west4`, `asia-southeast1`, `us-central1` |
| `autopilot-arm-spot` | Spot VMs on the Autopilot Arm platform; recommended for fault-tolerant or batch Arm workloads | Autopilot and Standard with Autopilot ComputeClasses, GKE 1.36.0-gke.3302001 or later; same regions as `autopilot-arm` |

## Notes

- Setting a built-in class as default: for a namespace, add the ComputeClass label to the namespace; for the cluster, create a ComputeClass named `default` with the same priority rules as the built-in class. A Standard cluster whose default imitates `autopilot` runs general-purpose Pods on the Autopilot platform with no workload changes.
- Autopilot billing depends on the ComputeClass requested; see GKE pricing at https://cloud.google.com/kubernetes-engine/pricing.
- Selecting `autopilot` runs Pods in Autopilot mode (https://docs.cloud.google.com/kubernetes-engine/docs/how-to/autopilot-classes-standard-clusters).
- Source: https://docs.cloud.google.com/kubernetes-engine/docs/concepts/about-built-in-compute-classes (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)
- Corrected from the official docs: the Deployment `nodeSelector:` lines had lost their indentation.

## Related

- [about-compute-classes.md](./about-compute-classes.md)
- [arm-on-gke.md](./arm-on-gke.md)
- [spot-vms.md](./spot-vms.md)
