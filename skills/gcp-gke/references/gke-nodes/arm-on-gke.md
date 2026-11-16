---
source: https://docs.cloud.google.com/kubernetes-engine/docs/concepts/arm-on-gke
---

# Arm workloads on GKE

Arm workloads run on GKE Autopilot (the container-optimized compute platform with the `autopilot-arm` ComputeClass) or on GKE Standard using the C4A, N4A or Tau T2A machine series. You can run single-architecture Arm images or multi-arch images.

## Signature / Usage

The source has no code. Snippet taken from https://docs.cloud.google.com/kubernetes-engine/docs/concepts/about-built-in-compute-classes: inspect a built-in ComputeClass (replace `COMPUTECLASS_NAME` with the class name, for example the Arm class).

```bash
kubectl get computeclass COMPUTECLASS_NAME -o yaml
```

## Options / Props

### Choosing hardware

| Option | Use |
|--------|-----|
| Autopilot platform (`autopilot-arm`) | General-purpose Arm workloads; Pod-based billing, no machine type management |
| C4A | Consistently high performance for performance-sensitive workloads |
| N4A | Balance of price and performance |
| T2A | Flexible or horizontally scaled workloads |

### Requirements and limitations

| Scope | Requirement or limitation |
|-------|---------------------------|
| Regions | Locations that support Arm; `general-purpose-arm` pod family and `autopilot-arm` only in `us-east1`, `us-west1`, `europe-west1`, `europe-west2`, `europe-west4`, `asia-southeast1`, `us-central1` |
| All Arm node pools | Config Connector and Config Controller not supported |
| C4A VMs, Autopilot / cluster autoscaling / node auto-provisioning / ComputeClasses that auto-create pools | GKE 1.30.7-gke.1136000 or 1.31.3-gke.1056000 or later |
| C4A VMs, Standard cluster | GKE 1.30.4-gke.1213000 or later |
| C4A VMs, Local SSDs | GKE 1.30.12-gke.1033000, 1.31.8-gke.1045000 or 1.32.1-gke.1357000 or later |
| C4A VMs, unsupported | Confidential GKE Nodes, compact placement, SMT, persistent disks (use Hyperdisk), nested virtualization, GPUs |
| C4A bare metal (`c4a-standard-96-metal`, `c4a-highmem-96-metal`) | Standard node pool: GKE 1.35.0-gke.2232000 or later; additionally unsupported: Local SSDs, provisioning via Autopilot Pod machine series selection, live migration |
| `c4a-highmem-96-metal` with Autopilot / autoscaling / NAP / ComputeClasses | GKE 1.35.3-gke.1389000 or later; `c4a-standard-96-metal` not supported; must specify the machine type explicitly (C4A series alone gives VMs, not bare metal) |
| N4A | Autopilot needs GKE 1.34.1-gke.3403001 or later; unsupported: Local SSDs, Confidential GKE Nodes, GPUs, compact placement, SMT, persistent disks (use Hyperdisk), nested virtualization, 1 GB hugepages (only 2 MB) |
| T2A unsupported | Confidential GKE Nodes, GPUs, GKE Windows, Local SSDs, Policy Controller, Config Sync, Config Controller |

## Notes

- Use node affinity and node selectors so Arm-compatible images land on Arm nodes; build multi-arch images per the GKE guide "Build multi-architecture images for Arm workloads".
- For specific Autopilot hardware use the `Performance` or `Scale-Out` compute classes.
- Source: https://docs.cloud.google.com/kubernetes-engine/docs/concepts/arm-on-gke (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [about-built-in-compute-classes.md](./about-built-in-compute-classes.md)
- [node-pools.md](./node-pools.md)
