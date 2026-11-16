---
source: https://docs.cloud.google.com/kubernetes-engine/docs/how-to/workload-separation
---

# Separate your workloads in GKE

Use taints and tolerations to tell GKE to place Pods together, apart, or on nodes that meet specific criteria. In Autopilot clusters and Standard clusters with node auto-provisioning, add a toleration and a matching `nodeSelector` for a key:value pair and GKE creates and taints the nodes. In Standard clusters without node auto-provisioning you create tainted node pools yourself.

## Signature / Usage

### Separate workloads in Autopilot clusters (also Standard with node auto-provisioning)

Save the first manifest as `web-server.yaml`.

Adapted (not in the official docs): the source's rendered YAML lost the indentation of the `tolerations` entries and `nodeSelector`; they are re-indented under `spec` so the manifest is valid.

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: web-server
spec:
  replicas: 6
  selector:
    matchLabels:
      pod: nginx-pod
  template:
    metadata:
      labels:
        pod: nginx-pod
    spec:
      tolerations:
      - key: group
        operator: Equal
        value: "servers"
        effect: NoSchedule
      nodeSelector:
        group: "servers"
      containers:
      - name: web-server
        image: nginx
```

`spec.tolerations` lets GKE place Pods on nodes with the `group=servers:NoSchedule` taint (Pods without the toleration cannot be scheduled there). `spec.nodeSelector` requires nodes with the `group: servers` label. GKE adds the matching labels and taints to the nodes it provisions.

Save the second manifest as `batch-job.yaml` (same indentation fix as above).

```yaml
apiVersion: batch/v1
kind: Job
metadata:
  name: batch-job
spec:
  completions: 5
  backoffLimit: 3
  ttlSecondsAfterFinished: 120
  template:
    metadata:
      labels:
        pod: pi-pod
    spec:
      restartPolicy: Never
      tolerations:
      - key: group
        operator: Equal
        value: "jobs"
        effect: NoSchedule
      nodeSelector:
        group: "jobs"
      containers:
      - name: pi
        image: perl
        command: ["perl",  "-Mbignum=bpi", "-wle", "print bpi(2000)"]
```

Adapted (not in the official docs): the source command `kubectl apply -f batch-job.yaml web-server.yaml` passes the second file as a positional argument; each file needs its own `-f`.

```bash
kubectl apply -f batch-job.yaml -f web-server.yaml
```

For each workload GKE first looks for existing nodes with the matching taint and label and schedules there if resources allow; otherwise it creates a new node with the corresponding taint and label. The `NoSchedule` effect keeps workloads without a toleration off those nodes.

### Verify the separation

```bash
kubectl get pods --output=wide
```

The `batch-job` Pods and the `web-server` Pods always run on different nodes.

### Create a Standard cluster with node taints

Taints apply to all nodes created with the cluster; node pools do not inherit them (use `--node-taints` on the node pool).

```bash
gcloud container clusters create CLUSTER_NAME \
    --node-taints KEY=VALUE:EFFECT
```

### Remove all taints from a node pool

```bash
gcloud beta container node-pools update POOL_NAME \
    --node-taints="" \
    --cluster=CLUSTER_NAME
```

## Options / Props

| Name | Description |
| --- | --- |
| `CLUSTER_NAME` | Name of the new cluster (or the cluster of the node pool). |
| `EFFECT` | `PreferNoSchedule`, `NoSchedule`, or `NoExecute`. |
| `KEY=VALUE` | Key-value pair associated with the `EFFECT`. |
| `POOL_NAME` | Node pool to change. |

### Configuration by cluster type

| Cluster configuration | Method |
| --- | --- |
| Autopilot; Standard with node auto-provisioning | Toleration + nodeSelector for a key:value pair; GKE creates tainted nodes. |
| Standard without node auto-provisioning | Create a node pool with a node taint and label, then add a toleration to the Pod spec. If tainted nodes lack resources the Pod stays Pending. |

### Limitations

- Do not use these key prefixes for workload separation: GKE and Kubernetes-specific keys, `*cloud.google.com/`, `*kubelet.kubernetes.io/`, `*node.kubernetes.io/`. Use your own unique keys.
- If you create a Standard cluster with `NoSchedule` or `NoExecute` node taints, GKE cannot schedule managed components such as `kube-dns` or `metrics-server` on the default node pool. Add a node pool that has no taints, a `PreferNoSchedule` taint, or the `components.gke.io/gke-managed-components=true:NoSchedule` taint.

## Notes

- Workload separation must never be used as a primary security boundary; it does not isolate untrusted workloads and does not mitigate all escalation paths.
- Autopilot bills requested resources; Pods that use workload separation have higher minimum resource requests enforced (see autopilot-resource-requests.md). Standard bills per node.
- The source's `gcloud` commands omit `--location`; add `--location=CONTROL_PLANE_LOCATION` unless a default `compute/region` or `compute/zone` property is set.
- Requires the GKE API enabled and an up-to-date gcloud CLI.
- The source also shows Console and API (`nodeConfig.nodeTaints`) forms for node taints; they are omitted here.
- Corrected from the official docs: `kubectl apply -f batch-job.yaml web-server.yaml` changed to use `-f` for each file; broken YAML indentation fixed.
- Removing taints with `gcloud beta container node-pools update` changes scheduling for running workloads; try it on a disposable cluster first.
- Source: https://docs.cloud.google.com/kubernetes-engine/docs/how-to/workload-separation (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [autopilot-resource-requests.md](./autopilot-resource-requests.md)
- [stateless-apps.md](./stateless-apps.md)
