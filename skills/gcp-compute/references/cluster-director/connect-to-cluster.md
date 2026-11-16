---
source: https://docs.cloud.google.com/cluster-director/docs/manage/connect-to-cluster
---

# Connect to a cluster

Establish an SSH connection to login nodes (Slurm clusters) or compute nodes (Slurm and managed compute clusters). On Slurm clusters you can manage shared file systems, submit jobs, inspect logs or run a GPU health check; on managed compute clusters you configure the environment and launch distributed workloads. Compute Engine uses key-based SSH authentication (see Compute Engine "About SSH connections").

## Signature / Usage

### Connect to a login node (Slurm only)

In the console: Clusters page, click the cluster name, Nodes tab, Login nodes section, click SSH in the Connect column (SSH-in-browser opens; click Authorize if prompted; connecting can take up to a minute).

### Connect to a compute node (Slurm or managed compute)

Nodes tab, Compute nodes section, click SSH on the node row (or open the node and click SSH). To run a command across all compute nodes in a MIG, see https://docs.cloud.google.com/cluster-director/docs/workloads/configure-mig#run-command-mig.

### Run a command on all active instances of a managed instance group (CLI)

Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/cluster-director/clusters/ssh (gcloud 593.0.0 help; this command exists only in the `alpha` track in this release):

```bash
gcloud alpha cluster-director clusters ssh my-cluster \
    --location=us-central1-a --managed-instance-groups=mig1 \
    --command="hostname"
```

## Options / Props

| Task | Role | Permission |
|---|---|---|
| View clusters | Cluster Director Editor (`roles/hypercomputecluster.editor`) on project | `hypercomputecluster.clusters.list`, `hypercomputecluster.clusters.get` |
| Connect to a node | Compute OS Login (`roles/compute.osLogin`) on project; Service Account User (`roles/iam.serviceAccountUser`) on the Compute Engine default service account | `compute.instances.osLogin`, `iam.serviceAccounts.actAs` |
| Node secured by IAP | IAP-Secured Tunnel User (`roles/iap.tunnelResourceAccessor`) on project | `iap.tunnelInstances.accessViaIAP` |

## Notes

- No extra authentication setup is needed when using the Google Cloud console. Only the console path is shown in the source; the CLI snippet is borrowed.
- `gcloud alpha cluster-director clusters ssh` is an alpha command (not in the GA or beta `cluster-director clusters` group of gcloud 593.0.0) and may change; it runs the command on every active instance of the named managed instance group(s), so try it on a disposable cluster first.
- OS Login on Compute Engine VMs; IAM concepts in general are in `gcp-foundation`.
- For SSH errors see Compute Engine "Troubleshooting SSH errors": `https://docs.cloud.google.com/compute/docs/troubleshooting/troubleshooting-ssh-errors`.
- The Slurm controller node cannot be connected to (see [orchestration.md](./orchestration.md)).
- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/cluster-director/clusters/ssh (gcloud 593.0.0 help, alpha track).
- Source: https://docs.cloud.google.com/cluster-director/docs/manage/connect-to-cluster (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [quickstart.md](./quickstart.md)
- [orchestration.md](./orchestration.md)
- [networking.md](./networking.md)
