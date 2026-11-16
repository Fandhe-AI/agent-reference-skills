---
source: https://docs.cloud.google.com/kubernetes-engine/docs/concepts/node-auto-provisioning
---

# About node pool auto-creation

GKE can automatically create, manage and delete node pools in Standard clusters to fit pending workloads. It extends the cluster autoscaler and is enabled per ComputeClass (recommended) or cluster-wide with node auto-provisioning. Autopilot always manages nodes for you.

## Signature / Usage

### Workload-level enablement (GKE 1.33.3-gke.1136000 and later)

Adapted (not in the official docs): the source shows `enabled: true` unindented under `nodePoolAutoCreation:`, which is invalid YAML; it is indented here.

```yaml
apiVersion: cloud.google.com/v1
kind: ComputeClass
metadata:
  name: example-computeclass
spec:
  priorities:
  - machineFamily: n4
  - machineFamily: c4
  whenUnsatisfiable: ScaleUpAnyway
  nodePoolAutoCreation:
    enabled: true
```

### Cluster-level default settings (configuration file)

```yaml
management:
  autoRepair: true
  autoUpgrade: true
```

```yaml
resourceLimits:
  - resourceType: 'cpu'
    minimum: 4
    maximum: 10
  - resourceType: 'memory'
    maximum: 64
  - resourceType: 'nvidia-tesla-t4'
    maximum: 4
management:
  autoRepair: true
  autoUpgrade: true
shieldedInstanceConfig:
  enableSecureBoot: true
  enableIntegrityMonitoring: true
diskSizeGb: 100
```

### TPU request in a Deployment

The source states `privileged: true` is "Required for GKE versions earlier than 1.28 to access TPUs".

Adapted (not in the official docs): the duplicate `ports` key in the container was removed (the 8431 entry is kept).

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: tpu-workload
  labels:
    app: tpu-workload
spec:
  replicas: 2
  template:
    spec:
      nodeSelector:
        cloud.google.com/gke-tpu-accelerator: tpu-v4-podslice
        cloud.google.com/gke-tpu-topology: 2x2x2
      containers:
      - name: tpu-job
        image: us-docker.pkg.dev/cloud-tpu-images/jax-ai-image/tpu:latest
        ports:
        - containerPort: 8431 # Port to export TPU runtime metrics, if supported.
        securityContext:
          privileged: true # Required for GKE versions earlier than 1.28 to access TPUs.
        command:
        - bash
        - -c
        - |
          python -c 'import jax; print("Total TPU chips:", jax.device_count())'
        resources:
          requests:
            google.com/tpu: 4
          limits:
            google.com/tpu: 4
```

## Options / Props

| Enablement | Details |
|------------|---------|
| Workload-level (recommended) | ComputeClass `nodePoolAutoCreation` or `autopilot`; no cluster-level NAP from 1.33.3-gke.1136000 |
| Cluster-level | Node auto-provisioning; requires cluster-wide limits (CPU, memory, GPU, TPU) and is required before 1.33.3-gke.1136000 |

Setting precedence: ComputeClass / Pod spec, then cluster NAP default, then Google Cloud cluster default.

| Machine series | Supported GKE versions |
|----------------|------------------------|
| C4 (no Local SSD) | 1.28.15-gke.1159000+, 1.29.10-gke.1227000+, 1.30.3-gke.1225000+; `-lssd`: 1.33.1-gke.1545000+; `-metal`: not supported |
| C4A VMs | 1.30.7-gke.1136000+, 1.31.3-gke.1056000+ |
| C4A `c4a-highmem-96-metal` | 1.35.3-gke.1389000+ (`c4a-standard-96-metal` not supported) |
| C4D VMs / bare metal | 1.32.3-gke.1717000+ / 1.37.0-gke.4713000+ |
| C4N (no Local SSD) | 1.36.0-gke.3009002+; `-lssd` not supported |
| H4D | 1.33.2-gke.4731000+ |
| M4 `megamem` / `ultramem` | 1.33.4-gke.1013000+; `m4-hypermem` not supported |
| N4 / N4A | 1.29.3+ / 1.34.1-gke.3403001+ |
| N4D | 1.33.12-gke.1208000+, 1.34.1-gke.2037000+ |
| Z3 / Z4D / Z4M | 1.29+ (`z3-highmem-192-highlssd-metal` unsupported) / 1.36.3-gke.1244000+ (`z4d-*-metal` unsupported) / 1.37.0-gke.4713000+ |

| GPU / TPU | Minimum GKE version |
|-----------|---------------------|
| G4 (1+ GPU, `g4-standard-48`..`384`) / fractional (`-6`,`-12`,`-24`) | 1.34.1-gke.1829001 / 1.35.2-gke.1485000 |
| A4X / A4 / A3 Ultra | 1.33.4-gke.1036000 / 1.32.2-gke.1422000 / 1.31.4-gke.1183000 |
| TPU v3 / v5 and v4 / Trillium / Ironwood (TPU7x) | 1.31.0 / 1.29.0 / 1.32.0 / 1.34.1-gke.2541000 |

## Notes

- You cannot set a minimum node count on auto-created node pools; empty pools are deleted. Manually created pools are never deleted. Use a manually created autoscaled pool if you need a minimum.
- Default machine series is E2 unless hardware needs another. Default boot disk is `pd-balanced`, 100 GiB; ephemeral storage requests above allocatable keep Pods pending.
- Workload separation needs a custom node label selector plus a matching toleration (`NoSchedule`, `NoExecute` or unspecified); system labels cannot be used.
- Limitations: over 200 node pools can raise latency; ComputeClasses do not support surge/blue-green upgrades or node integrity/secure boot; not supported: GKE Sandbox, Windows, local PersistentVolumes, Local SSD ephemeral storage, altered scheduler Filters, SMT, PMU. Cluster-wide NAP limits can cause stuck Pods at scale (use quota adjustments instead).
- The TPU example sets `privileged: true`, which the source marks as required only for GKE versions earlier than 1.28; a privileged container has full access to the node, so omit it on GKE 1.28 and later.
- Corrected from the official docs: `enabled: true` was unindented in the ComputeClass example, and the TPU Deployment listed `ports` twice.
- The source also shows Console and some inline settings omitted here.
- The TPU example uses the unpinned image tag `:latest`; pin a specific tag or digest for production use.
- Source: https://docs.cloud.google.com/kubernetes-engine/docs/concepts/node-auto-provisioning (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [cluster-autoscaler.md](./cluster-autoscaler.md)
- [cluster-autoscaler-how-to.md](./cluster-autoscaler-how-to.md)
- [capacity-buffer.md](./capacity-buffer.md)
