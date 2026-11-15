---
source: https://docs.cloud.google.com/workstations/docs/architecture
---

# Cloud Workstations architecture

Cloud Workstations manages Compute Engine VMs and persistent disks in your project. Each workstation cluster has a Google-managed controller and gateway; VMs, containers and a `/home` persistent disk are created per workstation session.

## Signature / Usage

### Enable Image streaming

Image streaming reduces container image pull time from minutes to seconds. Enable the Container File System API in the workstations host project:

```bash
gcloud services enable containerfilesystem.googleapis.com
```

### Keep a workstation alive

The base images ship `/google/scripts/keep_alive.sh` to prevent idle timeouts. Alternatively, trigger the `workstations.Start` API call from the background process, for example with the `gcloud workstations start` command (reference: https://docs.cloud.google.com/sdk/gcloud/reference/workstations/start).

## Options / Props

### Cluster components

| Component | Role |
|-----------|------|
| Controller | Manages the lifecycle of VM instances and other workstation resources in your project via the Compute Engine API; uses Private Service Connect to route traffic to the VMs. |
| Gateway | Receives client traffic for a workstation and forwards it to the VM. Each workstation is reachable at `$WORKSTATION_ID.$CLUSTER_ID.cloudworkstations.dev`. |
| VM Gateway | On the VM; pulls client traffic from the cluster gateway, authenticates and authorizes it, forwards it to the container. |
| Container | Tools pre-installed per the workstation configuration (base image or custom image). |
| Persistent Disk | Mounted at `/home` in the container; kept after the session ends. |

### Image streaming requirements

- Container File System API enabled in the workstations host project.
- Container images stored in Artifact Registry.
- A service account specified in the workstation configuration. Tip: you can use the Compute Engine default service account (`$WORKSTATION_CLUSTER_HOST_PROJECT_NUMBER-compute@developer.gserviceaccount.com`) (the source's tip; prefer a dedicated user-managed service account, see Notes). Warning: you cannot use the default workstations VM service account (`service-$WORKSTATION_CLUSTER_HOST_PROJECT_NUMBER@gcp-sa-workstationsvm.iam.gserviceaccount.com`).
- Inside a VPC Service Controls perimeter: add an egress rule allowing the service account to access the Container File System API on the project hosting the image. With a preconfigured IDE, add the `cloud-workstations-images` project (project number `662288601415`) to the allowlist.

### Timing and pooling facts

| Item | Value |
|------|-------|
| Workstation clusters per region | at least one required in each cloud region used |
| Pooled (unassigned) VMs and disks | automatically deleted and recreated every 12 hours |
| Idle timeout reset | every incoming network request and every `workstations.Start` call; preconfigured IDEs also reset it on mouse click / key press |

## Notes

- The Compute Engine default service account can hold the broad Editor role (automatic grant, unless the `iam.automaticIamGrantsForDefaultServiceAccounts` constraint is enforced), and every workstation of the configuration runs as it; prefer a dedicated user-managed service account granted only the roles it needs (to pull the image, Artifact Registry Reader `roles/artifactregistry.reader` on the image repository) (service accounts: `gcp-foundation`).
- Resource lifecycle on start: create VM, pull the container image, create the persistent disk on first start (the `/home` directory), attach it, start the container with the disk mounted at `/home`. At session end the VM is deleted and the disk detached and retained until the workstation is deleted, unless the reclaim policy is configured to retain it.
- Resource pooling: the `pool_size` configuration option pools VMs and disks and pre-pulls the image. Image updates under the same tag are not picked up until pooled VMs are assigned or deleted after 12 hours. To force a refresh set `pool_size` to `0` and back, disable and re-enable **Quick start workstations** in the console, or change the tag in `container.image`.
- A fully private gateway can be enabled so only endpoints inside your private network reach Cloud Workstations. Clusters are unrelated to GKE clusters; the connection uses Private Service Connect and has no impact on VPC peering limits.
- Image streaming limitations: the first pull of an eligible image may not benefit; other GKE Image streaming limitations apply.
- Long-running background work with no interaction can hit the idle timeout and shut the workstation down.
- Source: https://docs.cloud.google.com/workstations/docs/architecture (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)

## Related

- [overview.md](./overview.md)
- [create-cluster.md](./create-cluster.md)
- [create-configuration.md](./create-configuration.md)
- [preconfigured-base-images.md](./preconfigured-base-images.md)
