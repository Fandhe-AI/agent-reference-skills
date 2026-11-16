---
source: https://docs.cloud.google.com/batch/docs/networking-overview
---

# Batch networking overview

Networking concepts for Batch: the job network, blocking external connections for VMs or containers, protecting resources with VPC Service Controls, and the default networking configuration.

## Signature / Usage

The twin for this page has no code. Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/batch/jobs/submit (gcloud 593.0.0 help); network settings live in the submitted job config:

```bash
gcloud batch jobs submit \
    projects/foo/locations/us-central1/jobs/bar --config=config.json
```

## Options / Props

### When networking must be configured

| Situation | Required action |
|---|---|
| VPC Service Controls restrict Batch | Follow "Use VPC Service Controls with Batch" |
| `compute.vmExternalIpAccess` requires VMs without external IPs, or the network uses Private Google Access | Create jobs that block external access for all VMs |
| Cannot or do not want to use the default network | Specify the network for jobs |

The default network can be used if it exists (new projects have it unless the `compute.skipDefaultNetworkCreation` constraint is enabled) and supports your requirements.

### Options

| Option | Detail |
|---|---|
| Job network | Every job's VMs belong to a VPC network and a subnet of it (regional IP ranges). Each VM has an internal IP and an optional external IP. Implied firewall rules block all incoming and allow all outgoing connections. Shared VPC allows one network across projects. |
| Block external access for all VMs | Runs on VMs without external IPs; access to APIs needs Cloud NAT or Private Google Access (Batch and Compute Engine APIs, very often Cloud Logging). |
| Block external access for specific containers | Optional, for jobs that use containers and do not already block external access for all VMs. |
| VPC Service Controls | Perimeters protect the resources and data of selected services, blocking connections to services outside the perimeter and internet connections not explicitly allowed. |
| Default networking | Network `default` (auto mode, one subnet per region) and the subnet of the VM's location, with pre-populated firewall rules. |

## Notes

- Use at most one of the external-connection blocking options (all VMs, or specific containers) for a job.
- VMs without external IPs can only be reached through internal IPs from another node on the same network; see the Compute Engine page on connecting to internal-only VMs.
- The VM-side setting is here; VPC networks, firewall policies and Cloud Load Balancing themselves are in the planned `gcp-networking`.
- Modifying the default network may cause issues for jobs that rely on it.
- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/batch/jobs/submit (gcloud 593.0.0 help).
- Google Cloud Batch (`batch.googleapis.com`) — not the Claude / OpenAI batch APIs (`anthropic-api-core`, `openai-api-core`) and not Kubernetes Jobs (`gcp-gke`).
- Source inconsistency: this page says "Every network has implied firewall rules that block all incoming connections and allow all outgoing connections", while global-regional-zonal-resources.md (compute-overview) says "instances in one zone can communicate with instances in another zone if both instances belong to the same VPC network". Same-network membership does not by itself allow a connection; the network's VPC firewall rules still control it.
- Source: https://docs.cloud.google.com/batch/docs/networking-overview (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [create-run-job.md](./create-run-job.md)
- [vm-os-environment-overview.md](./vm-os-environment-overview.md)
- [authentication.md](./authentication.md)
