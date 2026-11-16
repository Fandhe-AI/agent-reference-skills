---
source: https://docs.cloud.google.com/confidential-computing/docs/confidential-computing-overview
---

# Confidential Computing overview

Confidential Computing helps protect data in use by keeping it encrypted in memory during processing, using a hardware-based trusted execution environment (TEE). Combined with encryption at rest and in transit, Confidential VM helps protect data throughout its lifecycle. The TEE standard is defined by the Confidential Computing Consortium.

## Signature / Usage

Enabling Confidential VM is done when a VM is created, with `--confidential-compute-type`:

```bash
gcloud compute instances create my-instance \
    --machine-type=n2d-standard-2 \
    --min-cpu-platform="AMD Milan" \
    --zone=us-central1-a \
    --confidential-compute-type=SEV_SNP \
    --maintenance-policy=TERMINATE \
    --image-project=ubuntu-os-cloud \
    --image-family=ubuntu-2404-lts-amd64
```

## Options / Props

### Properties of a confidential computing environment

| Property | Description |
|----------|-------------|
| Runtime encryption | Processor keeps all environment data encrypted in memory. For supported GPU machine types, runtime encryption extends from the CPU to attached GPUs through NVIDIA Confidential Computing using encrypted PCIe channels. |
| Isolation | Host OS, hypervisor and other applications can't read or modify the environment. |
| Attestation | Remote attestation checks trustworthiness by verifying hardware and software integrity. |
| Data lifecycle security | For supported machine types, hardware-backed protection isolates inputs, intermediate states and temporary variables from ingestion to destruction in memory. |
| Confidential live migration | For supported machine types, active Confidential VM instances or nodes migrate to new hosts without interruption; memory stays encrypted and keys are exchanged only after verifying an authorized, attested TEE on the destination. |

### Products

- Confidential VM, Confidential Space, Google Cloud Attestation, Split-trust encryption tool.
- Confidential VM is also available in Dataflow, Managed Service for Apache Spark, Google Kubernetes Engine, and Gemini Enterprise Agent Platform Workbench.

### Trust boundary

| Elements | Within trust boundary without Confidential VM | With Confidential VM | With Confidential Space |
|---|---|---|---|
| Cloud stack and administrators | Yes | No | No |
| BIOS and firmware | Yes | No | No |
| Host OS and hypervisor | Yes | No | No |
| VM guest administrator | Yes | Yes | No |
| VM guest OS | Yes | Yes | Yes, measured and attested |
| Applications, models, and AI agents | Yes | Yes | Yes, measured and attested |
| Proprietary model weights and algorithms | Yes | Yes | Yes |
| Confidential data and prompts | Yes | Yes | Yes |

## Notes

- Source: https://docs.cloud.google.com/confidential-computing/docs/confidential-computing-overview (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)
- Snippet taken from https://docs.cloud.google.com/confidential-computing/confidential-vm/docs/create-a-confidential-vm-instance (the overview page itself has no code).
- Confidential VM / Confidential Space on Google Cloud; not Apple Private Cloud Compute (`apple-intelligence`).
- Use cases listed by the source: enhanced privacy (including generative AI prompts), secure collaboration (joint ML training, federated learning), improved data security (HIPAA / GDPR / digital sovereignty), verifiable trust through attestation, and intellectual property protection.
- GKE nodes using Confidential VM are in `gcp-gke`.

## Related

- [confidential-vm-overview.md](./confidential-vm-overview.md)
- [confidential-space-overview.md](./confidential-space-overview.md)
- [attestation.md](./attestation.md)
