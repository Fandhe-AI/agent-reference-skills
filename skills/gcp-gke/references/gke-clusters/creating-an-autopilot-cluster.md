---
source: https://docs.cloud.google.com/kubernetes-engine/docs/how-to/creating-an-autopilot-cluster
---

# Create an Autopilot cluster

How to create a Google Kubernetes Engine (GKE) cluster in Autopilot mode, where GKE provisions, configures and manages nodes and infrastructure as workloads are deployed. Covers node service account setup, release channel and version selection, connecting with kubectl, and verifying the cluster mode.

## Signature / Usage

### Prerequisites

Enable the Google Kubernetes Engine API, install and initialize the gcloud CLI (`gcloud components update` for the latest version), and link a billing account to a new project. Set the `compute/region` gcloud property (or `compute/zone` for mostly zonal use) to avoid `One of [--zone, --region] must be supplied: Please specify location`.

### Grant the node service account role

Nodes need `roles/container.defaultNodeServiceAccount` on the project. Find the project number, then grant the role to the node service account (by default the Compute Engine default service account):

```bash
gcloud projects describe PROJECT_ID \
    --format="value(projectNumber)"
```

Replace `PROJECT_ID` with your project ID.

```bash
gcloud projects add-iam-policy-binding PROJECT_ID \
    --member="serviceAccount:PROJECT_NUMBER-compute@developer.gserviceaccount.com" \
    --role="roles/container.defaultNodeServiceAccount"
```

Replace `PROJECT_NUMBER` with the project number from the previous step.

### Create the cluster

```bash
gcloud container clusters create-auto CLUSTER_NAME \
    --location=LOCATION \
    --project=PROJECT_ID
```

Replace `CLUSTER_NAME` with the cluster name, `LOCATION` with the region, `PROJECT_ID` with the project ID. To use a custom, minimally-privileged node service account add:

```text
--service-account=SERVICE_ACCOUNT_NAME@PROJECT_ID.iam.gserviceaccount.com
```

### Choose a release channel and version

```bash
gcloud container clusters create-auto CLUSTER_NAME \
    --location=LOCATION \
    --release-channel=RELEASE_CHANNEL
```

Optionally add `--cluster-version=CLUSTER_VERSION` (for example `1.29.4-gke.1043002`); it must be an available GKE version.

### Connect to the cluster

```bash
gcloud container clusters get-credentials CLUSTER_NAME \
    --location=LOCATION \
    --project=PROJECT_ID
```

### Verify the cluster mode

```bash
gcloud container clusters describe CLUSTER_NAME \
    --location=LOCATION
```

The output contains:

```yaml
autopilot:
  enabled: true
```

## Options / Props

| Item | Value / behavior |
|------|------------------|
| Minimum required input | Name, project, region |
| Default release channel | `Regular`, with the channel's default GKE version |
| `--cluster-version` | Applies until a newer version becomes the channel default; GKE then auto-upgrades the cluster |
| Minimum role to create clusters | Kubernetes Engine Cluster Admin |
| Node SA role (minimum) | `roles/container.defaultNodeServiceAccount` |
| Node service account | Cannot be modified on an existing Autopilot cluster |

## Notes

- Some settings cannot be changed after creation; review them before creating the cluster.
- Org policy `constraints/compute.vmExternalIpAccess` set to `Deny All` (or restricting external IPs to specific VMs) makes creation of a public Autopilot cluster fail.
- Best practice: use a custom, least-privilege node service account instead of the Compute Engine default service account; granting the role above to the default account is shown by the source but is not the recommended setup.
- To register the cluster to a fleet, the fleet APIs and permissions are required.
- The source also shows Console and Terraform forms (including a Terraform custom-service-account example); they are omitted here.
- Source: https://docs.cloud.google.com/kubernetes-engine/docs/how-to/creating-an-autopilot-cluster (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [configuration-overview.md](./configuration-overview.md)
- [creating-a-regional-cluster.md](./creating-a-regional-cluster.md)
- [cluster-access-for-kubectl.md](./cluster-access-for-kubectl.md)
- [managing-clusters.md](./managing-clusters.md)
- Reference: https://docs.cloud.google.com/sdk/gcloud/reference/container/clusters/create-auto
