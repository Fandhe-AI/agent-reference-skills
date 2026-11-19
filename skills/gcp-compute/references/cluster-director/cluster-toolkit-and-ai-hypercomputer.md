---
source: https://docs.cloud.google.com/cluster-toolkit/docs/overview
---

# Cluster Toolkit and AI Hypercomputer overviews

Short overviews of two neighboring products. Cluster Toolkit is an open-source tool that deploys HPC, AI and ML clusters from YAML blueprints (Terraform and Packer under the hood). AI Hypercomputer is Google Cloud's unified AI infrastructure portfolio; its documentation lists Cluster Director as one of the orchestration options.

## Signature / Usage

### Cluster Toolkit telemetry (opt out or in)

Turn telemetry off:

```bash
./gcluster telemetry off
```

Turn telemetry back on:

```bash
./gcluster telemetry on
```

## Options / Props

### Cluster Toolkit components

| Component | Description |
|---|---|
| Cluster blueprint | YAML file defining the architecture: which modules and how configured. |
| Modules | Reusable building blocks (schedulers, storage, compute nodes). |
| `gcluster` tool | CLI that compiles blueprint and modules into a deployment folder (`gcluster create`). |
| Deployment folder | Generated Terraform and Packer configurations to deploy, or customize first. |

Workflow: set up Cloud Shell or a local Linux/macOS terminal (install dependencies), clone the repository (`gcluster` binary, modules, example blueprints), write a blueprint, run `gcluster create`, run the commands `gcluster` prints (Terraform or Packer deploys the cluster), then submit jobs and monitor with Cloud Monitoring.

Limitations: specific configurations of an active cluster can be updated (resize a Slurm partition, update a GKE node pool). Fundamental changes (new VPC, different scheduler) need a redeploy: delete the cluster, update the blueprint, create the deployment folder, deploy.

Telemetry is on by default (command names, exit codes, latency, standard blueprint and module names, machine types, toolkit version; unrecognized blueprint or path names are masked as "Custom"; no PII); opt out with `./gcluster telemetry off`.

### AI Hypercomputer architecture

| Layer | Contents |
|---|---|
| Performance-optimized infrastructure | NVIDIA GPUs (general GPUs: independent units with asynchronous maintenance; clustered GPUs: tightly coupled systems with synchronized maintenance), Google Cloud TPUs (slices), networking, storage. |
| Open software | Optimized PyTorch, JAX, TensorFlow; orchestration via Google Kubernetes Engine, Cluster Director (Slurm or managed compute clusters), or Cluster Toolkit blueprints. |
| Consumption options | Flex-start VMs, Spot VMs, reservations; Dynamic Workload Scheduler for atomic provisioning of interconnected node blocks. |

Use cases: large-scale AI/ML (distributed training and inference for generative AI, fraud detection, recommendation models), inference and model serving (real-time), prototyping and development.

## Notes

- Relation to Cluster Director, as the twins state: AI Hypercomputer lists Cluster Director (managed Slurm or managed compute clusters) and Cluster Toolkit blueprints as ways to deploy and manage accelerators; Cluster Director is the managed, console/API-driven service, while Cluster Toolkit is an open-source, blueprint-driven tool that generates Terraform and Packer you deploy yourself. Cluster Director's A4X Max pages also point to AI Hypercomputer for reserving capacity.
- Terraform (`gcp-iac`), Packer and GKE (`gcp-gke`) are outside this skill's detail. Cluster Toolkit repository: https://github.com/GoogleCloudPlatform/cluster-toolkit.
- Source: https://docs.cloud.google.com/cluster-toolkit/docs/overview (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/ai-hypercomputer/docs/overview (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [overview.md](./overview.md)
- [orchestration.md](./orchestration.md)
- [choose-consumption-option.md](./choose-consumption-option.md)
