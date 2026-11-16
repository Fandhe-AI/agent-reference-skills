---
source: https://docs.cloud.google.com/kubernetes-engine/docs/how-to/node-auto-repair
---

# Node auto-repair

Node auto-repair periodically checks node health and, if a node fails consecutive checks over an extended period, repairs it. Autopilot always repairs nodes and this cannot be disabled; in Standard it is on by default for new node pools and is configured per node pool.

## Signature / Usage

Enable on an existing Standard node pool:

```bash
gcloud container node-pools update POOL_NAME \
    --cluster CLUSTER_NAME \
    --location=CONTROL_PLANE_LOCATION \
    --enable-autorepair
```

Verify (output contains `management: ... autoRepair: true` when enabled):

Adapted (not in the official docs): added `--location=CONTROL_PLANE_LOCATION`, which the source omits.

```bash
gcloud container node-pools describe NODE_POOL_NAME \
--cluster=CLUSTER_NAME \
--location=CONTROL_PLANE_LOCATION
```

Disable (not recommended):

```bash
gcloud container node-pools update POOL_NAME \
    --cluster CLUSTER_NAME \
    --location=CONTROL_PLANE_LOCATION \
    --no-enable-autorepair
```

Inspect repair events: list operations, then describe one and read `operationReason`:

```bash
gcloud container operations list --location=CONTROL_PLANE_LOCATION
```

```bash
gcloud container operations describe OPERATION_NAME --location=CONTROL_PLANE_LOCATION
```

## Options / Props

| Unhealthy condition | Threshold |
|---------------------|-----------|
| `NotReady` status on consecutive checks | About 10 minutes |
| No status reported | About 10 minutes |
| Boot disk out of space | About 30 minutes |
| Autopilot node cordoned | About 10 minutes |

| Repair process | Behavior |
|----------------|----------|
| Drain and recreate | Node name preserved; GKE waits 1 hour for drain, then shuts the node down and creates a new one |
| Parallelism | More nodes repaired in parallel on larger clusters, fewer as unhealthy nodes grow |
| Disabling mid-repair | In-progress repairs continue |
| Multi-host TPU slice node pool | If one slice node needs repair, the entire node pool is recreated |
| Example `operationReason` | `AUTO_REPAIR_LONG_UNHEALTHY` (unhealthy for 10 minutes) |

## Notes

- Disabling auto-repair has side effects: deleting an unhealthy node with `kubectl` can orphan the VM and keep billing you; resize the node pool instead.
- Repair signals include Node Problem Detector, enabled by default on Container-Optimized OS and Ubuntu images.
- Boot disk modifications do not persist across node recreation; use a DaemonSet.
- Check health at any time with `kubectl get nodes`.
- The source also shows Console steps.
- Source inconsistency: the introduction says that in Standard auto-repair "is on by default for new node pools", while dws.md says nodes using Flex-start VMs or queued provisioning "disable node auto-repair (not supported for these nodes)". Follow dws.md for those nodes.
- Corrected from the official docs: the source's `gcloud container node-pools describe` command has no location, which works only when a default `compute/zone` or `compute/region` is configured; the example now passes `--location=CONTROL_PLANE_LOCATION`.
- Source: https://docs.cloud.google.com/kubernetes-engine/docs/how-to/node-auto-repair (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [node-pools.md](./node-pools.md)
- [node-pools-how-to.md](./node-pools-how-to.md)
