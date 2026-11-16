---
source: https://docs.cloud.google.com/kubernetes-engine/docs/concepts/tpus
---

# About TPUs in GKE

How Cloud TPU works with GKE: terminology, single-host and multi-host TPU slice node pools, consumption options, topology, machine type naming, autoscaling, and collection scheduling. TPUs accelerate ML workloads using TensorFlow, PyTorch, and JAX.

## Signature / Usage

### Request TPU chips

Use the resource name `google.com/tpu`. The requested count must equal the total number of TPU chips on the TPU slice node.

```yaml
resources:
  requests:
    google.com/tpu: 4
  limits:
    google.com/tpu: 4
```

## Options / Props

### Terminology

| Term | Meaning |
| --- | --- |
| TPU cube | A `4x4x4` topology of interconnected chips (3-tuple topologies only). |
| TPU slice | Chips in the same TPU Pod connected by high-speed ICI. |
| TPU slice node | A Kubernetes node (one VM) with one or more interconnected chips. |
| TPU slice node pool | Nodes in a cluster with the same TPU configuration. |
| TPU topology | Number and physical arrangement of chips in a slice. |
| Atomic | GKE treats all interconnected nodes as one unit; scaling goes to 0 and recreates all nodes; a failed machine recreates the set. |
| Immutable | You cannot add nodes to an existing set; create a new node pool with the desired topology. |

### Node pool types

| Type | Description |
| --- | --- |
| Multi-host TPU slice | Two or more interconnected TPU VMs (ICI); cannot add nodes after creation; atomic (if one node cannot deploy none do; node repair shuts down all VMs and evicts Pods). Recommended for large-scale models. |
| Single-host TPU slice | One or more independent TPU VMs; TPUs are not interconnected (VMs communicate over the Data Center Network). Recommended for small-scale models. |

For large-scale training, Pathways lets one JAX client orchestrate workloads across multiple large TPU slices.

### Consumption options

| Option | Description |
| --- | --- |
| Flex-start | Flex-start VMs for up to seven days, best-effort allocation (see dws.md). |
| Spot VMs | Significant discounts; can be preempted at any time with a 30-second warning. |
| Future reservation (calendar mode) | TPU resources for up to 90 days for a specified period. |
| TPU reservations | Future reservation for one year or longer. |
| On-demand | Default if you specify no other option; requires enough on-demand quota; availability not guaranteed. |

### Topology rules

| Rule | Value |
| --- | --- |
| Topology format for v4, v5p, Ironwood (TPU7x) multi-host | 3-tuples `{A}x{B}x{C}`, for example `4x4x4`; product is the chip count. |
| Small topologies (fewer than 64 chips) | For example `2x2x2`, `2x2x4`, `2x4x4`. |
| Larger than 64 chips | {A}, {B}, {C} must be multiples of four and keep A <= B <= C (for example `4x4x8`, `8x8x8`). |
| Largest supported | v4: `12x16x16`; v5p: `16x16x24`. |

### Machine type naming

| Mode | How you select TPUs |
| --- | --- |
| Standard | A Compute Engine machine type, for example `ct6e-standard-1t` for TPU Trillium (v6e). |
| Autopilot | An accelerator type in the workload manifest, for example `tpu-v6e-slice` (v6e) or `tpu-v5-lite-podslice` (v5e). |

### Node pool auto-creation minimum GKE versions

| TPU | GKE version |
| --- | --- |
| TPU v3 | 1.31.0 and later |
| TPU v5 and v4 | 1.29.0 and later |
| TPU Trillium | 1.32.0 and later |
| Ironwood (TPU7x) | 1.34.1-gke.2541000 or later |

Other TPU types are supported in all GKE versions.

### Autoscaling

| Pool type | Behavior |
| --- | --- |
| Single-host | Adds or removes TPU nodes between zero and the pool maximum (`--max-nodes`, `--total-max-nodes`); all nodes share machine type and topology. |
| Multi-host | Atomically scales from zero to the nodes needed for the topology (for example `ct5lp-hightpu-4t` with `16x16` is 64 nodes or zero); scale-down evicts all Pods and removes all nodes. |

### Collection scheduling (TPU Trillium only)

Group TPU slice nodes for inference workloads. Multi-host: each node pool is a replica; create more pools with the same collection name and workload type. Single-host: the whole node pool is a collection; resize it to add slices. Limitations: only TPU Trillium; define collections only at node pool creation; Spot VMs not supported; multi-host collections must use the same machine type, topology, and version.

## Notes

- A VM can access up to 8 TPU chips. Any container that requests TPUs must consume all TPU chips on the node, otherwise the Deployment fails. Example: `ct5lp-hightpu-4t` with `2x4` has two nodes of four chips; you can run two Pods of four chips each but not one Pod of eight. TPU v5e `4x4` has 16 chips in four nodes; an Autopilot workload must request four chips per replica, one to four replicas.
- In Standard clusters multiple Pods can run on a VM but only one container per Pod can access the TPU chips. Each Standard cluster needs at least one non-TPU node pool for kube-system Pods such as kube-dns.
- TPU slice nodes have the `google.com/tpu` taint by default, which keeps non-TPU workloads off them (it does not guarantee full TPU utilization).
- GKE versions earlier than 1.28 require privileged mode (Standard) or special capabilities to access TPUs; 1.28 and later do not.
- GKE Sandbox works with TPU v4 and later. Kueue can manage multi-tenant queuing, preemption, and fair sharing.
- Ironwood (TPU7x) is Google's seventh-generation TPU; see "About Ironwood (TPU7x) in GKE".
- Other forms: this page has no gcloud commands; setup is in "Plan TPUs in GKE" and the Standard and Autopilot TPU how-to pages.
- Source: https://docs.cloud.google.com/kubernetes-engine/docs/concepts/tpus (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [dws.md](./dws.md)
- [gpus.md](./gpus.md)
- [autopilot-resource-requests.md](./autopilot-resource-requests.md)
