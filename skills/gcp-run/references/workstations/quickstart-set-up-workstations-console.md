---
source: https://docs.cloud.google.com/workstations/docs/quickstart-set-up-workstations-console
---

# Set up workstations

Console quickstart: create a workstation cluster (`test-cluster`), a basic workstation configuration (`test-configuration`), then create and launch a workstation. This page also covers the "Create a workstation" guide.

## Signature / Usage

### Prerequisites

Enable the Cloud Workstations API (`workstations.googleapis.com`; needs `serviceusage.services.enable`, e.g. via Owner or Service Usage Admin `roles/serviceusage.serviceUsageAdmin`). Roles are listed under Options / Props.

### Steps (Console)

1. **Cloud Workstations > Cluster management > Create**: name `test-cluster`, region closest to you, skip Network settings, then **Create**. Cluster creation is generally needed only once.
2. **Workstation configurations > Create**: name `test-configuration`, same region, select `test-cluster`; **Machine preset** `Moderate`; **Quick start workstations** `Disabled` (lower cost); **Create**.
3. **Workstations > Create**: accept the default name (or choose your own, for example `test-workstation`, following Compute Engine naming conventions and unique within the cluster), pick the configuration, **Create**.
4. **Launch**: the workstation connects to port `80` by default; if stopped, **Launch** also starts it. The arrow next to **Launch** offers **Start** (start without launching), **Connect to port 80** (default), **Connect to web app on port**, **Port forwarding**, **Connect using SSH**, and **Launch with JetBrains Gateway** (JetBrains IDEs).

### Clean up

Delete the project (destructive):

```bash
gcloud projects delete PROJECT_ID
```

## Options / Props

| Task | Role | Granted on |
|------|------|------------|
| Create and manage clusters and configurations | Cloud Workstations Admin (`roles/workstations.admin`) | project |
| Create workstations using a configuration | Cloud Workstations Creator (`roles/workstations.workstationCreator`) | project or the workstation configuration |
| Use a workstation | Cloud Workstations User (`roles/workstations.user`) | the workstation (automatically granted on workstations you create) |

## Notes

- Caution from the source: deleting a project deletes everything in it and loses custom project IDs. This is destructive; try it on a disposable project first. To keep URLs that use the project ID, delete selected resources instead.
- If the workstation **Create** button is disabled, no workstation configuration exists in the project or you lack permission to view them; ask a Cloud Workstations Admin. With the **Retain** reclaim policy, the persistent disk stays after workstation deletion and an admin must delete it manually.
- Cluster, configuration and workstation deletion steps are on https://docs.cloud.google.com/workstations/docs/delete-resources. SSH details: https://docs.cloud.google.com/workstations/docs/ssh-support.
- The source also shows Console screenshots, and no `gcloud workstations` create commands.
- Source: https://docs.cloud.google.com/workstations/docs/quickstart-set-up-workstations-console (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/workstations/docs/create-workstation (retrieved 2026-11-15; merged here)

## Related

- [create-cluster.md](./create-cluster.md)
- [create-configuration.md](./create-configuration.md)
- [access-control.md](./access-control.md)
