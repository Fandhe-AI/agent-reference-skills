---
source: https://docs.cloud.google.com/cluster-director/docs/create/quickstart
---

# Create a Slurm cluster

Quickstart that creates and connects to a Slurm cluster with three `n2-standard-2` VMs (2 vCPUs, 8 GB): one login node and two compute nodes, so no capacity reservation is needed. After the login node is created you connect and run sample Slurm jobs.

## Signature / Usage

### Create the cluster (Console)

In the Google Cloud console open Cluster Director, click Create a cluster, choose Step-by-step configuration, name it `cluster000`, under Compute click Configure resources, choose General purpose, enter `2` instances, Region `us-central1`, Zone `us-central1-a`, click Done, then Create. Creation time depends on VM count and zone availability; if resources are unavailable Cluster Director keeps the request until they become available. Wait until the cluster's Compute Status is Ready.

### Connect and run sample jobs

On the cluster's Nodes tab, click SSH on the `cluster000-login-001` row (opens SSH-in-browser; click Authorize if prompted), then run:

Verify that Slurm is running:

```bash
sinfo
```

Submit a test job that returns the hostname of the node:

```bash
srun hostname
```

Submit a batch job that sleeps for 10 seconds:

```bash
sbatch --wrap="sleep 10"
```

Check the status of jobs in the queue:

```bash
squeue
```

View accounting data for jobs:

```bash
sacct
```

## Options / Props

### Before you begin

| Requirement | Detail |
|---|---|
| APIs to enable | Hypercompute Cluster API, Compute Engine API, Filestore API, Google Cloud Managed Lustre API, Cloud Logging API, Cloud Monitoring API |
| Cluster Director Editor (`roles/hypercomputecluster.editor`) on project | Create and manage a cluster |
| Compute Instance Admin (v1) (`roles/compute.instanceAdmin.v1`) on project | Create and manage VMs in a cluster |
| Compute OS Login (`roles/compute.osLogin`) on project | Connect to the login node |
| IAP-Secured Tunnel User (`roles/iap.tunnelResourceAccessor`) on project | Connect to the login node |
| Service Account User (`roles/iam.serviceAccountUser`) on the Compute Engine default service account | Connect to the login node |
| Compute Engine default service account roles | Logs Writer (`roles/logging.logWriter`), Monitoring Metric Writer (`roles/monitoring.metricWriter`), Storage Object Viewer (`roles/storage.objectViewer`) on the project |
| Trusted image policy | If the organization sets `constraints/compute.trustedImageProjects`, the `clusterdirector-public-images` project must be allowed. |

### Costs

Compute Engine: three `n2-standard-2` VMs. Filestore: a 1 TiB instance, the default storage for `/home`. Use the pricing calculator for an estimate.

## Notes

- Clean up is destructive: deleting the cluster (Delete, then type `cluster000`) removes it and its resources; deleting the project removes everything in it and loses custom project IDs. Try this on a disposable project first.
- Console steps are summarized; the source also offers a Guide me walkthrough. gcloud or REST forms are not shown on this page.
- SSH errors: see Compute Engine "Troubleshooting SSH errors". OS Login on Compute Engine VMs; IAM concepts in general are in `gcp-foundation`.
- The source asks to grant these three roles to the Compute Engine default service account; "Depending on your organization policy configuration, the default service account might automatically be granted the Editor role on your project" (Compute Engine service accounts page), which recommends enforcing the `iam.automaticIamGrantsForDefaultServiceAccounts` organization policy constraint.
- Source (Compute Engine default service account): https://docs.cloud.google.com/compute/docs/access/service-accounts (retrieved 2026-11-17)
- Source: https://docs.cloud.google.com/cluster-director/docs/create/quickstart (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [connect-to-cluster.md](./connect-to-cluster.md)
- [process-overview.md](./process-overview.md)
- [choose-consumption-option.md](./choose-consumption-option.md)
- [os-images.md](./os-images.md)
