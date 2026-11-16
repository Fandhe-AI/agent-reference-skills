---
source: https://docs.cloud.google.com/bare-metal/docs/bms-iam
---

# Configure IAM for Bare Metal Solution

Grant predefined `roles/baremetalsolution.*` roles to principals (users, groups, service accounts) following least privilege.

## Signature / Usage

Grant a role at project level (you need Owner, Project IAM Admin or Security Admin):

```bash
gcloud projects add-iam-policy-binding PROJECT_ID \
 --member=user:username@example.com \
 --role=roles/baremetalsolution.admin
```

Output lists the updated bindings, `etag` and `version`.

## Options / Props

| Role | Description / main permissions |
|---|---|
| `roles/baremetalsolution.admin` | Administrator of all resources: instances (`attachNetwork`, `attachVolume`, `create`, `detachLun`, `detachNetwork`, `detachVolume`, `disableInteractiveSerialConsole`, `enableInteractiveSerialConsole`, `get`, `list`, `rename`, `reset`, `start`, `stop`, `update`), LUNs, maintenance events (`addProposal`, `approve`, `get`, `list`), networks, NFS shares, procurements, snapshot schedule policies, sshKeys (`create`, `delete`, `list`), volumes (incl. `evict`, `resize`), volume snapshots (incl. `restore`), quotas and list permissions, `resourcemanager.projects.get/list` |
| `roles/baremetalsolution.editor` | Editor; same permission list as admin in the source |
| `roles/baremetalsolution.viewer` | Read-only `get` / `list` on instances, LUNs, maintenance events, networks, NFS shares, procurements, snapshot policies, volumes, snapshots; `sshKeys.list`, quotas, OS images, pods, SKUs, aggregate pools, `operations.get`, `resourcemanager.projects.get/list` |
| `roles/baremetalsolution.instancesadmin` | Admin of instances (all `instances.*`), `operations.get`, `osimages.list`, `pods.list`, `resourcemanager.projects.get/list` |
| `roles/baremetalsolution.instancesviewer` | `instancequotas.list`, `instances.get/list`, `operations.get`, `resourcemanager.projects.get/list` |
| `roles/baremetalsolution.lunsadmin` | `luns.get`, `luns.list`, `operations.get` |
| `roles/baremetalsolution.lunsviewer` | `luns.get`, `luns.list`, `operations.get` |
| `roles/baremetalsolution.maintenanceeventsadmin` | `maintenanceevents.*` (`addProposal`, `approve`, `get`, `list`) |
| `roles/baremetalsolution.maintenanceeventseditor` | `maintenanceevents.*` (`addProposal`, `approve`, `get`, `list`) |
| `roles/baremetalsolution.maintenanceeventsviewer` | `maintenanceevents.get`, `maintenanceevents.list` |
| `roles/baremetalsolution.networksadmin` | `networks.*` (`create`, `delete`, `get`, `list`, `rename`, `update`), `networkquotas.list`, `operations.get`, `pods.list` |
| `roles/baremetalsolution.nfssharesadmin` | `nfsshares.*` (`create`, `delete`, `get`, `list`, `rename`, `update`), `operations.get`, `pods.list` |
| `roles/baremetalsolution.nfsshareseditor` | same as `nfssharesadmin` |
| `roles/baremetalsolution.nfssharesviewer` | `nfsshares.get`, `nfsshares.list`, `operations.get` |
| `roles/baremetalsolution.osimagesviewer` | `osimages.list` |
| `roles/baremetalsolution.procurementsadmin` | `procurements.*` (`create`, `get`, `list`), `pods.list`, `skus.list` |
| `roles/baremetalsolution.procurementseditor` | same as `procurementsadmin` |
| `roles/baremetalsolution.procurementsviewer` | `procurements.get`, `procurements.list`, `skus.list` |
| `roles/baremetalsolution.storageadmin` | LUNs (`create`, `delete`, `evict`, `get`, `list`, `update`), NFS shares, snapshot schedule policies, volumes, volume snapshots, `storageaggregatepools.list`, `volumequotas.list`, `operations.get`, `pods.list`, `resourcemanager.projects.get/list` |
| `roles/baremetalsolution.volumesadmin` | volumes (`create`, `delete`, `evict`, `get`, `list`, `rename`, `resize`, `update`), `operations.get`, `pods.list` |
| `roles/baremetalsolution.volumeseditor` | volumes (`create`, `delete`, `get`, `list`, `rename`, `resize`, `update`; no `evict`), `volumequotas.list`, `operations.get`, `pods.list` |
| `roles/baremetalsolution.volumessviewer` | `volumes.get`, `volumes.list`, `operations.get` |
| `roles/baremetalsolution.volumesnapshotsadmin` | `volumesnapshots.*` (`create`, `delete`, `get`, `list`, `restore`), `operations.get` |
| `roles/baremetalsolution.volumesnapshotseditor` | `volumesnapshots.create/delete/get/list` (no `restore`), `operations.get` |
| `roles/baremetalsolution.volumesnapshotsviewer` | `volumesnapshots.get/list`, `operations.get` |
| `roles/baremetalsolution.serviceAgent` | Service agent role: `compute.interconnectAttachments.get/list`, `compute.interconnects.get/list`, `compute.networks.get/list`, `compute.projects.get`, `resourcemanager.projects.get` |

Recommended role per task:

| Task | Bare Metal Solution roles | Basic roles |
|---|---|---|
| Filling out an intake form | Admin, Editor, or Instances Admin AND Compute Network Viewer | Owner or Editor |
| Restarting a server | Admin or Editor | Owner or Editor |
| Listing servers or requesting status | Viewer or Instances Viewer | Viewer |
| Managing storage components | Admin, Editor, or Storage Admin | Owner or Editor |
| Managing networking components | Admin, Editor, or Networks Admin | Owner or Editor |

## Notes

- Warning from the source: grant service agent roles (`roles/baremetalsolution.serviceAgent`) only to service agents, never to other principals.
- Permission lists for the Admin and Editor roles are abbreviated here; the full list is at https://cloud.google.com/iam/docs/roles-permissions (search `baremetalsolution.`).
- The `add-iam-policy-binding` example adds a plain (non-conditional) binding; use `--condition` only with the read-modify-write rules in IAM docs. IAM in general is in `gcp-foundation`.
- The source also shows Console steps.
- Source: https://docs.cloud.google.com/bare-metal/docs/bms-iam (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [bms-setup.md](./bms-setup.md)
- [bms-security.md](./bms-security.md)
