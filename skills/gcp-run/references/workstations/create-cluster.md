---
source: https://docs.cloud.google.com/workstations/docs/create-cluster
---

# Create a workstation cluster

A workstation cluster defines a group of workstations in a region, manages them through their lifecycle and provides configurable network connectivity. Cluster creation is generally needed only once. Clusters are unrelated to GKE clusters.

## Signature / Usage

### Optional: enable faster startup

Snippet taken from https://docs.cloud.google.com/workstations/docs/architecture (the source links to enabling the Container File System API for Image streaming):

```bash
gcloud services enable containerfilesystem.googleapis.com
```

### Console steps

1. **Cloud Workstations > Cluster management > Create**.
2. Enter a **Name** and select the **Region** closest to you.
3. Optional: a different **Workstation authorization URL** (unauthenticated users are redirected there to sign in).
4. Optional: **Network settings** (custom VPC): **Network** (for example `test-network`), **Subnetwork** (for example `test-subnetwork`), **Gateway type**.
5. Optional: **Workstation launcher URL** (default is the Google Cloud console launcher, which automatically starts stopped workstations); **Use Cloud Console launcher** resets it.
6. **Create**.

## Options / Props

| Setting | Description |
|---------|-------------|
| Public gateway | Makes workstations accessible from public networks. |
| Private gateway | For data residency of data in transit, and to allow ingress/egress to the workstations service from inside the selected network (see https://docs.cloud.google.com/workstations/docs/configure-vpc-service-controls-private-clusters). |

### Before you begin

- Enable the Cloud Workstations API (needs `serviceusage.services.enable`; Owner or Service Usage Admin `roles/serviceusage.serviceUsageAdmin`) and hold a Cloud Workstations Admin role on the project.
- Workstation VMs boot from Compute Engine public Container-Optimized OS (COS) images. If `constraints/compute.trustedimageProjects` is enforced, allow boot disks from `projects/cos-cloud` or all public images.
- Private Service Connect is used. If `constraints/compute.restrictPrivateServiceConnectProducer` is enforced, add Google as an allowed producer (`under:organizations/433637338589`).
- If `constraints/compute.disablePrivateServiceConnectCreationForConsumers` is enforced, allow Private Service Connect endpoints connecting to Google APIs (`GOOGLE_APIS`); for private clusters also allow published services (`SERVICE_PRODUCERS`).

## Notes

- Deleting a cluster (Console: select it, **More options > Delete**) is destructive; try it on a disposable resource first. See https://docs.cloud.google.com/workstations/docs/delete-resources.
- The source shows only Console steps.
- Source: https://docs.cloud.google.com/workstations/docs/create-cluster (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)

## Related

- [architecture.md](./architecture.md)
- [create-configuration.md](./create-configuration.md)
- [access-control.md](./access-control.md)
