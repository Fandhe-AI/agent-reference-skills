---
source: https://docs.cloud.google.com/cluster-director/docs/overview
---

# Cluster Director overview

Cluster Director is a Google Cloud product that automates setup and configuration of clusters for AI, ML, or HPC workloads. It configures compute, networking and storage to maximize performance and minimize downtime. It targets IT administrators and AI researchers who want to avoid cluster-management overhead.

## Signature / Usage

### List clusters

Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/cluster-director/clusters/list (gcloud 593.0.0 help):

```bash
gcloud cluster-director clusters list --location=us-central1-a
```

## Options / Props

### Key features

| Feature | Description |
|---|---|
| Automated lifecycle management | Unified control plane with its own API and UI in the Google Cloud console; deploy, manage and scale clusters with their compute, networking and storage. |
| Flexible orchestration and scaling | Managed Slurm environment (job queuing, dynamic scaling) or managed compute clusters backed by Compute Engine managed instance groups (MIGs), where you run workloads on MIGs or bring your own orchestrator. |
| Resilient, performance-optimized infrastructure | CPU-based, GPU-accelerated and TPU-accelerated machines; topology-aware scheduling colocates instances to minimize network latency; autohealing detects and replaces unhealthy instances. |
| Integrated observability | Console dashboard for health, topology and performance of cluster components. |

### Use cases

| Use case | Example workloads |
|---|---|
| Large-scale AI workloads | Generative AI and LLM training, fraud detection, recommendation models |
| HPC workloads | Complex simulations; drug discovery, protein folding, genomic analysis; risk analysis and quantitative trading |

## Notes

- Supported machine series are listed in [compute.md](./compute.md); choosing between Slurm and MIG-based clusters is in [orchestration.md](./orchestration.md).
- The source page shows no commands; the `gcloud cluster-director` snippet is borrowed.
- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/cluster-director/clusters/list (gcloud 593.0.0 help).
- Source inconsistency: the gcloud 593.0.0 `clusters create` examples (and compute.md, networking.md, storage.md) use `--location=us-central1`, while the `clusters list`, `describe`, `update` and `delete` examples use `--location=us-central1-a` ("To list all clusters in particular location us-central1-a"). The help gives the cluster resource format `projects/{project}/locations/{locations}/clusters/{cluster}`, so pass the location the cluster was created in.
- Source (`--location` in the cluster examples): `gcloud cluster-director clusters create --help`, `gcloud cluster-director clusters list --help`, `gcloud cluster-director clusters describe --help`, `gcloud cluster-director clusters update --help`, `gcloud cluster-director clusters delete --help` (gcloud 593.0.0, retrieved 2026-11-14)
- Source: https://docs.cloud.google.com/cluster-director/docs/overview (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [compute.md](./compute.md)
- [orchestration.md](./orchestration.md)
- [quickstart.md](./quickstart.md)
- [process-overview.md](./process-overview.md)
