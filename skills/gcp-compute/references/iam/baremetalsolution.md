---
source: https://docs.cloud.google.com/iam/docs/roles-permissions/baremetalsolution
---

# Bare Metal Solution IAM roles and permissions

## Signature / Usage

Predefined roles of `baremetalsolution` (role ID, description, included permissions) and, for each permission, the roles that contain it.

### Roles

#### Bare Metal Solution Admin (`roles/baremetalsolution.admin`)

- Administrator of Bare Metal Solution resources
- Permissions (71): `baremetalsolution.instancequotas.list`, `baremetalsolution.instances.attachNetwork`, `baremetalsolution.instances.attachVolume`, `baremetalsolution.instances.create`, `baremetalsolution.instances.detachLun`, `baremetalsolution.instances.detachNetwork`, `baremetalsolution.instances.detachVolume`, `baremetalsolution.instances.disableInteractiveSerialConsole`, `baremetalsolution.instances.enableInteractiveSerialConsole`, `baremetalsolution.instances.get`, `baremetalsolution.instances.list`, `baremetalsolution.instances.rename`, `baremetalsolution.instances.reset`, `baremetalsolution.instances.start`, `baremetalsolution.instances.stop`, `baremetalsolution.instances.update`, `baremetalsolution.luns.create`, `baremetalsolution.luns.delete`, `baremetalsolution.luns.evict`, `baremetalsolution.luns.get`, `baremetalsolution.luns.list`, `baremetalsolution.luns.update`, `baremetalsolution.maintenanceevents.addProposal`, `baremetalsolution.maintenanceevents.approve`, `baremetalsolution.maintenanceevents.get`, `baremetalsolution.maintenanceevents.list`, `baremetalsolution.networkquotas.list`, `baremetalsolution.networks.create`, `baremetalsolution.networks.delete`, `baremetalsolution.networks.get`, `baremetalsolution.networks.list`, `baremetalsolution.networks.rename`, `baremetalsolution.networks.update`, `baremetalsolution.nfsshares.create`, `baremetalsolution.nfsshares.delete`, `baremetalsolution.nfsshares.get`, `baremetalsolution.nfsshares.list`, `baremetalsolution.nfsshares.rename`, `baremetalsolution.nfsshares.update`, `baremetalsolution.operations.get`, `baremetalsolution.osimages.list`, `baremetalsolution.pods.list`, `baremetalsolution.procurements.create`, `baremetalsolution.procurements.get`, `baremetalsolution.procurements.list`, `baremetalsolution.skus.list`, `baremetalsolution.snapshotschedulepolicies.create`, `baremetalsolution.snapshotschedulepolicies.delete`, `baremetalsolution.snapshotschedulepolicies.get`, `baremetalsolution.snapshotschedulepolicies.list`, `baremetalsolution.snapshotschedulepolicies.update`, `baremetalsolution.sshKeys.create`, `baremetalsolution.sshKeys.delete`, `baremetalsolution.sshKeys.list`, `baremetalsolution.storageaggregatepools.list`, `baremetalsolution.volumequotas.list`, `baremetalsolution.volumes.create`, `baremetalsolution.volumes.delete`, `baremetalsolution.volumes.evict`, `baremetalsolution.volumes.get`, `baremetalsolution.volumes.list`, `baremetalsolution.volumes.rename`, `baremetalsolution.volumes.resize`, `baremetalsolution.volumes.update`, `baremetalsolution.volumesnapshots.create`, `baremetalsolution.volumesnapshots.delete`, `baremetalsolution.volumesnapshots.get`, `baremetalsolution.volumesnapshots.list`, `baremetalsolution.volumesnapshots.restore`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### Bare Metal Solution Editor (`roles/baremetalsolution.editor`)

- Editor of Bare Metal Solution resources
- Permissions (71): `baremetalsolution.instancequotas.list`, `baremetalsolution.instances.attachNetwork`, `baremetalsolution.instances.attachVolume`, `baremetalsolution.instances.create`, `baremetalsolution.instances.detachLun`, `baremetalsolution.instances.detachNetwork`, `baremetalsolution.instances.detachVolume`, `baremetalsolution.instances.disableInteractiveSerialConsole`, `baremetalsolution.instances.enableInteractiveSerialConsole`, `baremetalsolution.instances.get`, `baremetalsolution.instances.list`, `baremetalsolution.instances.rename`, `baremetalsolution.instances.reset`, `baremetalsolution.instances.start`, `baremetalsolution.instances.stop`, `baremetalsolution.instances.update`, `baremetalsolution.luns.create`, `baremetalsolution.luns.delete`, `baremetalsolution.luns.evict`, `baremetalsolution.luns.get`, `baremetalsolution.luns.list`, `baremetalsolution.luns.update`, `baremetalsolution.maintenanceevents.addProposal`, `baremetalsolution.maintenanceevents.approve`, `baremetalsolution.maintenanceevents.get`, `baremetalsolution.maintenanceevents.list`, `baremetalsolution.networkquotas.list`, `baremetalsolution.networks.create`, `baremetalsolution.networks.delete`, `baremetalsolution.networks.get`, `baremetalsolution.networks.list`, `baremetalsolution.networks.rename`, `baremetalsolution.networks.update`, `baremetalsolution.nfsshares.create`, `baremetalsolution.nfsshares.delete`, `baremetalsolution.nfsshares.get`, `baremetalsolution.nfsshares.list`, `baremetalsolution.nfsshares.rename`, `baremetalsolution.nfsshares.update`, `baremetalsolution.operations.get`, `baremetalsolution.osimages.list`, `baremetalsolution.pods.list`, `baremetalsolution.procurements.create`, `baremetalsolution.procurements.get`, `baremetalsolution.procurements.list`, `baremetalsolution.skus.list`, `baremetalsolution.snapshotschedulepolicies.create`, `baremetalsolution.snapshotschedulepolicies.delete`, `baremetalsolution.snapshotschedulepolicies.get`, `baremetalsolution.snapshotschedulepolicies.list`, `baremetalsolution.snapshotschedulepolicies.update`, `baremetalsolution.sshKeys.create`, `baremetalsolution.sshKeys.delete`, `baremetalsolution.sshKeys.list`, `baremetalsolution.storageaggregatepools.list`, `baremetalsolution.volumequotas.list`, `baremetalsolution.volumes.create`, `baremetalsolution.volumes.delete`, `baremetalsolution.volumes.evict`, `baremetalsolution.volumes.get`, `baremetalsolution.volumes.list`, `baremetalsolution.volumes.rename`, `baremetalsolution.volumes.resize`, `baremetalsolution.volumes.update`, `baremetalsolution.volumesnapshots.create`, `baremetalsolution.volumesnapshots.delete`, `baremetalsolution.volumesnapshots.get`, `baremetalsolution.volumesnapshots.list`, `baremetalsolution.volumesnapshots.restore`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### Bare Metal Solution Viewer (`roles/baremetalsolution.viewer`)

- Viewer of Bare Metal Solution resources
- Permissions (29): `baremetalsolution.instancequotas.list`, `baremetalsolution.instances.get`, `baremetalsolution.instances.list`, `baremetalsolution.luns.get`, `baremetalsolution.luns.list`, `baremetalsolution.maintenanceevents.get`, `baremetalsolution.maintenanceevents.list`, `baremetalsolution.networkquotas.list`, `baremetalsolution.networks.get`, `baremetalsolution.networks.list`, `baremetalsolution.nfsshares.get`, `baremetalsolution.nfsshares.list`, `baremetalsolution.operations.get`, `baremetalsolution.osimages.list`, `baremetalsolution.pods.list`, `baremetalsolution.procurements.get`, `baremetalsolution.procurements.list`, `baremetalsolution.skus.list`, `baremetalsolution.snapshotschedulepolicies.get`, `baremetalsolution.snapshotschedulepolicies.list`, `baremetalsolution.sshKeys.list`, `baremetalsolution.storageaggregatepools.list`, `baremetalsolution.volumequotas.list`, `baremetalsolution.volumes.get`, `baremetalsolution.volumes.list`, `baremetalsolution.volumesnapshots.get`, `baremetalsolution.volumesnapshots.list`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### Bare Metal Solution Instances Admin (`roles/baremetalsolution.instancesadmin`)

- Admin of Bare Metal Solution Instance resources
- Permissions (20): `baremetalsolution.instances.attachNetwork`, `baremetalsolution.instances.attachVolume`, `baremetalsolution.instances.create`, `baremetalsolution.instances.detachLun`, `baremetalsolution.instances.detachNetwork`, `baremetalsolution.instances.detachVolume`, `baremetalsolution.instances.disableInteractiveSerialConsole`, `baremetalsolution.instances.enableInteractiveSerialConsole`, `baremetalsolution.instances.get`, `baremetalsolution.instances.list`, `baremetalsolution.instances.rename`, `baremetalsolution.instances.reset`, `baremetalsolution.instances.start`, `baremetalsolution.instances.stop`, `baremetalsolution.instances.update`, `baremetalsolution.operations.get`, `baremetalsolution.osimages.list`, `baremetalsolution.pods.list`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### Bare Metal Solution Instances Viewer (`roles/baremetalsolution.instancesviewer`)

- Viewer of Bare Metal Solution Instance resources
- Permissions (6): `baremetalsolution.instancequotas.list`, `baremetalsolution.instances.get`, `baremetalsolution.instances.list`, `baremetalsolution.operations.get`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### Luns Admin (`roles/baremetalsolution.lunsadmin`)

- Administrator of Bare Metal Solution Lun resources
- Permissions (3): `baremetalsolution.luns.get`, `baremetalsolution.luns.list`, `baremetalsolution.operations.get`

#### Luns Viewer (`roles/baremetalsolution.lunsviewer`)

- Viewer of Bare Metal Solution Lun resources
- Permissions (3): `baremetalsolution.luns.get`, `baremetalsolution.luns.list`, `baremetalsolution.operations.get`

#### Maintenance Events Admin (`roles/baremetalsolution.maintenanceeventsadmin`)

- Administrator of Bare Metal Solution maintenance events resources
- Permissions (4): `baremetalsolution.maintenanceevents.addProposal`, `baremetalsolution.maintenanceevents.approve`, `baremetalsolution.maintenanceevents.get`, `baremetalsolution.maintenanceevents.list`

#### Maintenance Events Editor (`roles/baremetalsolution.maintenanceeventseditor`)

- Editor of Bare Metal Solution maintenance events resources
- Permissions (4): `baremetalsolution.maintenanceevents.addProposal`, `baremetalsolution.maintenanceevents.approve`, `baremetalsolution.maintenanceevents.get`, `baremetalsolution.maintenanceevents.list`

#### Maintenance Events Viewer (`roles/baremetalsolution.maintenanceeventsviewer`)

- Viewer of Bare Metal Solution maintenance events resources
- Permissions (2): `baremetalsolution.maintenanceevents.get`, `baremetalsolution.maintenanceevents.list`

#### Networks Admin (`roles/baremetalsolution.networksadmin`)

- Admin of Bare Metal Solution networks resources
- Permissions (9): `baremetalsolution.networkquotas.list`, `baremetalsolution.networks.create`, `baremetalsolution.networks.delete`, `baremetalsolution.networks.get`, `baremetalsolution.networks.list`, `baremetalsolution.networks.rename`, `baremetalsolution.networks.update`, `baremetalsolution.operations.get`, `baremetalsolution.pods.list`

#### NFS Shares Admin (`roles/baremetalsolution.nfssharesadmin`)

- Administrator of Bare Metal Solution NFS Share resources
- Permissions (8): `baremetalsolution.nfsshares.create`, `baremetalsolution.nfsshares.delete`, `baremetalsolution.nfsshares.get`, `baremetalsolution.nfsshares.list`, `baremetalsolution.nfsshares.rename`, `baremetalsolution.nfsshares.update`, `baremetalsolution.operations.get`, `baremetalsolution.pods.list`

#### NFS Shares Editor (`roles/baremetalsolution.nfsshareseditor`)

- Editor of Bare Metal Solution NFS Share resources
- Permissions (8): `baremetalsolution.nfsshares.create`, `baremetalsolution.nfsshares.delete`, `baremetalsolution.nfsshares.get`, `baremetalsolution.nfsshares.list`, `baremetalsolution.nfsshares.rename`, `baremetalsolution.nfsshares.update`, `baremetalsolution.operations.get`, `baremetalsolution.pods.list`

#### NFS Shares Viewer (`roles/baremetalsolution.nfssharesviewer`)

- Viewer of Bare Metal Solution NFS Share resources
- Permissions (3): `baremetalsolution.nfsshares.get`, `baremetalsolution.nfsshares.list`, `baremetalsolution.operations.get`

#### OS Images Viewer (`roles/baremetalsolution.osimagesviewer`)

- Viewer of Bare Metal Solution OS images resources
- Permissions (1): `baremetalsolution.osimages.list`

#### Bare Metal Solution Procurements Admin (`roles/baremetalsolution.procurementsadmin`)

- Administrator of Bare Metal Solution Procurements
- Permissions (5): `baremetalsolution.pods.list`, `baremetalsolution.procurements.create`, `baremetalsolution.procurements.get`, `baremetalsolution.procurements.list`, `baremetalsolution.skus.list`

#### Bare Metal Solution Procurements Editor (`roles/baremetalsolution.procurementseditor`)

- Editor of Bare Metal Solution Procurements
- Permissions (5): `baremetalsolution.pods.list`, `baremetalsolution.procurements.create`, `baremetalsolution.procurements.get`, `baremetalsolution.procurements.list`, `baremetalsolution.skus.list`

#### Bare Metal Solution Procurements Viewer (`roles/baremetalsolution.procurementsviewer`)

- Viewer of Bare Metal Solution Procurements
- Permissions (3): `baremetalsolution.procurements.get`, `baremetalsolution.procurements.list`, `baremetalsolution.skus.list`

#### Bare Metal Solution Storage Admin (`roles/baremetalsolution.storageadmin`)

- Administrator of Bare Metal Solution storage resources
- Permissions (36): `baremetalsolution.luns.create`, `baremetalsolution.luns.delete`, `baremetalsolution.luns.evict`, `baremetalsolution.luns.get`, `baremetalsolution.luns.list`, `baremetalsolution.luns.update`, `baremetalsolution.nfsshares.create`, `baremetalsolution.nfsshares.delete`, `baremetalsolution.nfsshares.get`, `baremetalsolution.nfsshares.list`, `baremetalsolution.nfsshares.rename`, `baremetalsolution.nfsshares.update`, `baremetalsolution.operations.get`, `baremetalsolution.pods.list`, `baremetalsolution.snapshotschedulepolicies.create`, `baremetalsolution.snapshotschedulepolicies.delete`, `baremetalsolution.snapshotschedulepolicies.get`, `baremetalsolution.snapshotschedulepolicies.list`, `baremetalsolution.snapshotschedulepolicies.update`, `baremetalsolution.storageaggregatepools.list`, `baremetalsolution.volumequotas.list`, `baremetalsolution.volumes.create`, `baremetalsolution.volumes.delete`, `baremetalsolution.volumes.evict`, `baremetalsolution.volumes.get`, `baremetalsolution.volumes.list`, `baremetalsolution.volumes.rename`, `baremetalsolution.volumes.resize`, `baremetalsolution.volumes.update`, `baremetalsolution.volumesnapshots.create`, `baremetalsolution.volumesnapshots.delete`, `baremetalsolution.volumesnapshots.get`, `baremetalsolution.volumesnapshots.list`, `baremetalsolution.volumesnapshots.restore`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### Volume Admin (`roles/baremetalsolution.volumesadmin`)

- Administrator of Bare Metal Solution volume resources
- Permissions (10): `baremetalsolution.operations.get`, `baremetalsolution.pods.list`, `baremetalsolution.volumes.create`, `baremetalsolution.volumes.delete`, `baremetalsolution.volumes.evict`, `baremetalsolution.volumes.get`, `baremetalsolution.volumes.list`, `baremetalsolution.volumes.rename`, `baremetalsolution.volumes.resize`, `baremetalsolution.volumes.update`

#### Volumes Editor (`roles/baremetalsolution.volumeseditor`)

- Editor of Bare Metal Solution volumes resources
- Permissions (10): `baremetalsolution.operations.get`, `baremetalsolution.pods.list`, `baremetalsolution.volumequotas.list`, `baremetalsolution.volumes.create`, `baremetalsolution.volumes.delete`, `baremetalsolution.volumes.get`, `baremetalsolution.volumes.list`, `baremetalsolution.volumes.rename`, `baremetalsolution.volumes.resize`, `baremetalsolution.volumes.update`

#### Snapshots Admin (`roles/baremetalsolution.volumesnapshotsadmin`)

- Administrator of Bare Metal Solution snapshots resources
- Permissions (6): `baremetalsolution.operations.get`, `baremetalsolution.volumesnapshots.create`, `baremetalsolution.volumesnapshots.delete`, `baremetalsolution.volumesnapshots.get`, `baremetalsolution.volumesnapshots.list`, `baremetalsolution.volumesnapshots.restore`

#### Snapshots Editor (`roles/baremetalsolution.volumesnapshotseditor`)

- Editor of Bare Metal Solution snapshots resources
- Permissions (5): `baremetalsolution.operations.get`, `baremetalsolution.volumesnapshots.create`, `baremetalsolution.volumesnapshots.delete`, `baremetalsolution.volumesnapshots.get`, `baremetalsolution.volumesnapshots.list`

#### Snapshots Viewer (`roles/baremetalsolution.volumesnapshotsviewer`)

- Viewer of Bare Metal Solution snapshots resources
- Permissions (3): `baremetalsolution.operations.get`, `baremetalsolution.volumesnapshots.get`, `baremetalsolution.volumesnapshots.list`

#### Volumes Viewer (`roles/baremetalsolution.volumessviewer`)

- Viewer of Bare Metal Solution volumes resources
- Permissions (3): `baremetalsolution.operations.get`, `baremetalsolution.volumes.get`, `baremetalsolution.volumes.list`

#### Bare Metal Solution Service Agent (`roles/baremetalsolution.serviceAgent`)

- Gives permission to manage network resources such as interconnect pairing keys, required for Bare Metal Solution. > \[!WARNING\] > \*\*Warning:\*\* Do not grant service agent roles to any principals except service agents (https://docs.cloud.google.com/iam/docs/service-agents).
- Permissions (8): `compute.interconnectAttachments.get`, `compute.interconnectAttachments.list`, `compute.interconnects.get`, `compute.interconnects.list`, `compute.networks.get`, `compute.networks.list`, `compute.projects.get`, `resourcemanager.projects.get`

### Example: grant a role

Generated example (not in the official docs) granting the first role on this page at its lowest-level resource (Project):

```bash
gcloud projects add-iam-policy-binding PROJECT_ID \
  --member="user:EMAIL_ADDRESS" \
  --role="roles/baremetalsolution.admin"
```

### Permissions and the roles that contain them

| Permission | Roles |
|---|---|
| `baremetalsolution.instancequotas.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/baremetalsolution.admin`, `roles/baremetalsolution.editor`, `roles/baremetalsolution.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/baremetalsolution.instancesviewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `baremetalsolution.instances.attachNetwork` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/baremetalsolution.admin`, `roles/baremetalsolution.editor`, `roles/baremetalsolution.instancesadmin` |
| `baremetalsolution.instances.attachVolume` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/baremetalsolution.admin`, `roles/baremetalsolution.editor`, `roles/baremetalsolution.instancesadmin` |
| `baremetalsolution.instances.create` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/baremetalsolution.admin`, `roles/baremetalsolution.editor`, `roles/baremetalsolution.instancesadmin` |
| `baremetalsolution.instances.detachLun` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/baremetalsolution.admin`, `roles/baremetalsolution.editor`, `roles/baremetalsolution.instancesadmin` |
| `baremetalsolution.instances.detachNetwork` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/baremetalsolution.admin`, `roles/baremetalsolution.editor`, `roles/baremetalsolution.instancesadmin` |
| `baremetalsolution.instances.detachVolume` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/baremetalsolution.admin`, `roles/baremetalsolution.editor`, `roles/baremetalsolution.instancesadmin` |
| `baremetalsolution.instances.disableInteractiveSerialConsole` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/baremetalsolution.admin`, `roles/baremetalsolution.editor`, `roles/baremetalsolution.instancesadmin` |
| `baremetalsolution.instances.enableInteractiveSerialConsole` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/baremetalsolution.admin`, `roles/baremetalsolution.editor`, `roles/baremetalsolution.instancesadmin` |
| `baremetalsolution.instances.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/baremetalsolution.admin`, `roles/baremetalsolution.editor`, `roles/baremetalsolution.viewer`, `roles/baremetalsolution.instancesadmin`, `roles/baremetalsolution.instancesviewer`, `roles/iam.supportUser` |
| `baremetalsolution.instances.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/baremetalsolution.admin`, `roles/baremetalsolution.editor`, `roles/baremetalsolution.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/baremetalsolution.instancesadmin`, `roles/baremetalsolution.instancesviewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser`, `roles/wiz.cloudInventoryViewer` |
| `baremetalsolution.instances.rename` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/baremetalsolution.admin`, `roles/baremetalsolution.editor`, `roles/baremetalsolution.instancesadmin` |
| `baremetalsolution.instances.reset` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/baremetalsolution.admin`, `roles/baremetalsolution.editor`, `roles/baremetalsolution.instancesadmin` |
| `baremetalsolution.instances.start` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/baremetalsolution.admin`, `roles/baremetalsolution.editor`, `roles/baremetalsolution.instancesadmin` |
| `baremetalsolution.instances.stop` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/baremetalsolution.admin`, `roles/baremetalsolution.editor`, `roles/baremetalsolution.instancesadmin` |
| `baremetalsolution.instances.update` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/baremetalsolution.admin`, `roles/baremetalsolution.editor`, `roles/baremetalsolution.instancesadmin` |
| `baremetalsolution.luns.create` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/baremetalsolution.admin`, `roles/baremetalsolution.editor`, `roles/baremetalsolution.storageadmin` |
| `baremetalsolution.luns.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/baremetalsolution.admin`, `roles/baremetalsolution.editor`, `roles/baremetalsolution.storageadmin` |
| `baremetalsolution.luns.evict` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/baremetalsolution.admin`, `roles/baremetalsolution.editor`, `roles/baremetalsolution.storageadmin` |
| `baremetalsolution.luns.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/baremetalsolution.admin`, `roles/baremetalsolution.editor`, `roles/baremetalsolution.viewer`, `roles/baremetalsolution.lunsadmin`, `roles/baremetalsolution.lunsviewer`, `roles/baremetalsolution.storageadmin`, `roles/iam.supportUser` |
| `baremetalsolution.luns.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/baremetalsolution.admin`, `roles/baremetalsolution.editor`, `roles/baremetalsolution.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/baremetalsolution.lunsadmin`, `roles/baremetalsolution.lunsviewer`, `roles/baremetalsolution.storageadmin`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `baremetalsolution.luns.onDemandEvict` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor` |
| `baremetalsolution.luns.update` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/baremetalsolution.admin`, `roles/baremetalsolution.editor`, `roles/baremetalsolution.storageadmin` |
| `baremetalsolution.maintenanceevents.addProposal` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/baremetalsolution.admin`, `roles/baremetalsolution.editor`, `roles/baremetalsolution.maintenanceeventsadmin`, `roles/baremetalsolution.maintenanceeventseditor` |
| `baremetalsolution.maintenanceevents.approve` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/baremetalsolution.admin`, `roles/baremetalsolution.editor`, `roles/baremetalsolution.maintenanceeventsadmin`, `roles/baremetalsolution.maintenanceeventseditor` |
| `baremetalsolution.maintenanceevents.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/baremetalsolution.admin`, `roles/baremetalsolution.editor`, `roles/baremetalsolution.viewer`, `roles/baremetalsolution.maintenanceeventsadmin`, `roles/baremetalsolution.maintenanceeventseditor`, `roles/baremetalsolution.maintenanceeventsviewer`, `roles/iam.supportUser` |
| `baremetalsolution.maintenanceevents.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/baremetalsolution.admin`, `roles/baremetalsolution.editor`, `roles/baremetalsolution.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/baremetalsolution.maintenanceeventsadmin`, `roles/baremetalsolution.maintenanceeventseditor`, `roles/baremetalsolution.maintenanceeventsviewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `baremetalsolution.networkquotas.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/baremetalsolution.admin`, `roles/baremetalsolution.editor`, `roles/baremetalsolution.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/baremetalsolution.networksadmin`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `baremetalsolution.networks.create` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/baremetalsolution.admin`, `roles/baremetalsolution.editor`, `roles/baremetalsolution.networksadmin` |
| `baremetalsolution.networks.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/baremetalsolution.admin`, `roles/baremetalsolution.editor`, `roles/baremetalsolution.networksadmin` |
| `baremetalsolution.networks.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/baremetalsolution.admin`, `roles/baremetalsolution.editor`, `roles/baremetalsolution.viewer`, `roles/baremetalsolution.networksadmin`, `roles/iam.supportUser` |
| `baremetalsolution.networks.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/baremetalsolution.admin`, `roles/baremetalsolution.editor`, `roles/baremetalsolution.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/baremetalsolution.networksadmin`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `baremetalsolution.networks.rename` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/baremetalsolution.admin`, `roles/baremetalsolution.editor`, `roles/baremetalsolution.networksadmin` |
| `baremetalsolution.networks.update` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/baremetalsolution.admin`, `roles/baremetalsolution.editor`, `roles/baremetalsolution.networksadmin` |
| `baremetalsolution.nfsshares.create` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/baremetalsolution.admin`, `roles/baremetalsolution.editor`, `roles/baremetalsolution.nfssharesadmin`, `roles/baremetalsolution.nfsshareseditor`, `roles/baremetalsolution.storageadmin` |
| `baremetalsolution.nfsshares.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/baremetalsolution.admin`, `roles/baremetalsolution.editor`, `roles/baremetalsolution.nfssharesadmin`, `roles/baremetalsolution.nfsshareseditor`, `roles/baremetalsolution.storageadmin` |
| `baremetalsolution.nfsshares.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/baremetalsolution.admin`, `roles/baremetalsolution.editor`, `roles/baremetalsolution.viewer`, `roles/baremetalsolution.nfssharesadmin`, `roles/baremetalsolution.nfsshareseditor`, `roles/baremetalsolution.nfssharesviewer`, `roles/baremetalsolution.storageadmin`, `roles/iam.supportUser` |
| `baremetalsolution.nfsshares.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/baremetalsolution.admin`, `roles/baremetalsolution.editor`, `roles/baremetalsolution.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/baremetalsolution.nfssharesadmin`, `roles/baremetalsolution.nfsshareseditor`, `roles/baremetalsolution.nfssharesviewer`, `roles/baremetalsolution.storageadmin`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `baremetalsolution.nfsshares.rename` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/baremetalsolution.admin`, `roles/baremetalsolution.editor`, `roles/baremetalsolution.nfssharesadmin`, `roles/baremetalsolution.nfsshareseditor`, `roles/baremetalsolution.storageadmin` |
| `baremetalsolution.nfsshares.update` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/baremetalsolution.admin`, `roles/baremetalsolution.editor`, `roles/baremetalsolution.nfssharesadmin`, `roles/baremetalsolution.nfsshareseditor`, `roles/baremetalsolution.storageadmin` |
| `baremetalsolution.operations.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/baremetalsolution.admin`, `roles/baremetalsolution.editor`, `roles/baremetalsolution.viewer`, `roles/baremetalsolution.instancesadmin`, `roles/baremetalsolution.instancesviewer`, `roles/baremetalsolution.lunsadmin`, `roles/baremetalsolution.lunsviewer`, `roles/baremetalsolution.networksadmin`, `roles/baremetalsolution.nfssharesadmin`, `roles/baremetalsolution.nfsshareseditor`, `roles/baremetalsolution.nfssharesviewer`, `roles/baremetalsolution.storageadmin`, `roles/baremetalsolution.volumesadmin`, `roles/baremetalsolution.volumeseditor`, `roles/baremetalsolution.volumesnapshotsadmin`, `roles/baremetalsolution.volumesnapshotseditor`, `roles/baremetalsolution.volumesnapshotsviewer`, `roles/baremetalsolution.volumessviewer`, `roles/iam.supportUser` |
| `baremetalsolution.osimages.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/baremetalsolution.admin`, `roles/baremetalsolution.editor`, `roles/baremetalsolution.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/baremetalsolution.instancesadmin`, `roles/baremetalsolution.osimagesviewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `baremetalsolution.pods.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/baremetalsolution.admin`, `roles/baremetalsolution.editor`, `roles/baremetalsolution.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/baremetalsolution.instancesadmin`, `roles/baremetalsolution.networksadmin`, `roles/baremetalsolution.nfssharesadmin`, `roles/baremetalsolution.nfsshareseditor`, `roles/baremetalsolution.procurementsadmin`, `roles/baremetalsolution.procurementseditor`, `roles/baremetalsolution.storageadmin`, `roles/baremetalsolution.volumesadmin`, `roles/baremetalsolution.volumeseditor`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `baremetalsolution.procurements.create` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/baremetalsolution.admin`, `roles/baremetalsolution.editor`, `roles/baremetalsolution.procurementsadmin`, `roles/baremetalsolution.procurementseditor` |
| `baremetalsolution.procurements.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/baremetalsolution.admin`, `roles/baremetalsolution.editor`, `roles/baremetalsolution.viewer`, `roles/baremetalsolution.procurementsadmin`, `roles/baremetalsolution.procurementseditor`, `roles/baremetalsolution.procurementsviewer`, `roles/iam.supportUser` |
| `baremetalsolution.procurements.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/baremetalsolution.admin`, `roles/baremetalsolution.editor`, `roles/baremetalsolution.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/baremetalsolution.procurementsadmin`, `roles/baremetalsolution.procurementseditor`, `roles/baremetalsolution.procurementsviewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `baremetalsolution.skus.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/baremetalsolution.admin`, `roles/baremetalsolution.editor`, `roles/baremetalsolution.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/baremetalsolution.procurementsadmin`, `roles/baremetalsolution.procurementseditor`, `roles/baremetalsolution.procurementsviewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `baremetalsolution.snapshotschedulepolicies.create` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/baremetalsolution.admin`, `roles/baremetalsolution.editor`, `roles/baremetalsolution.storageadmin` |
| `baremetalsolution.snapshotschedulepolicies.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/baremetalsolution.admin`, `roles/baremetalsolution.editor`, `roles/baremetalsolution.storageadmin` |
| `baremetalsolution.snapshotschedulepolicies.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/baremetalsolution.admin`, `roles/baremetalsolution.editor`, `roles/baremetalsolution.viewer`, `roles/baremetalsolution.storageadmin`, `roles/iam.supportUser` |
| `baremetalsolution.snapshotschedulepolicies.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/baremetalsolution.admin`, `roles/baremetalsolution.editor`, `roles/baremetalsolution.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/baremetalsolution.storageadmin`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `baremetalsolution.snapshotschedulepolicies.update` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/baremetalsolution.admin`, `roles/baremetalsolution.editor`, `roles/baremetalsolution.storageadmin` |
| `baremetalsolution.sshKeys.create` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/baremetalsolution.admin`, `roles/baremetalsolution.editor` |
| `baremetalsolution.sshKeys.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/baremetalsolution.admin`, `roles/baremetalsolution.editor` |
| `baremetalsolution.sshKeys.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/baremetalsolution.admin`, `roles/baremetalsolution.editor`, `roles/baremetalsolution.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `baremetalsolution.storageaggregatepools.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/baremetalsolution.admin`, `roles/baremetalsolution.editor`, `roles/baremetalsolution.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/baremetalsolution.storageadmin`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `baremetalsolution.volumequotas.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/baremetalsolution.admin`, `roles/baremetalsolution.editor`, `roles/baremetalsolution.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/baremetalsolution.storageadmin`, `roles/baremetalsolution.volumeseditor`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `baremetalsolution.volumes.create` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/baremetalsolution.admin`, `roles/baremetalsolution.editor`, `roles/baremetalsolution.storageadmin`, `roles/baremetalsolution.volumesadmin`, `roles/baremetalsolution.volumeseditor` |
| `baremetalsolution.volumes.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/baremetalsolution.admin`, `roles/baremetalsolution.editor`, `roles/baremetalsolution.storageadmin`, `roles/baremetalsolution.volumesadmin`, `roles/baremetalsolution.volumeseditor` |
| `baremetalsolution.volumes.evict` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/baremetalsolution.admin`, `roles/baremetalsolution.editor`, `roles/baremetalsolution.storageadmin`, `roles/baremetalsolution.volumesadmin` |
| `baremetalsolution.volumes.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/baremetalsolution.admin`, `roles/baremetalsolution.editor`, `roles/baremetalsolution.viewer`, `roles/baremetalsolution.storageadmin`, `roles/baremetalsolution.volumesadmin`, `roles/baremetalsolution.volumeseditor`, `roles/baremetalsolution.volumessviewer`, `roles/iam.supportUser` |
| `baremetalsolution.volumes.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/baremetalsolution.admin`, `roles/baremetalsolution.editor`, `roles/baremetalsolution.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/baremetalsolution.storageadmin`, `roles/baremetalsolution.volumesadmin`, `roles/baremetalsolution.volumeseditor`, `roles/baremetalsolution.volumessviewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `baremetalsolution.volumes.onDemandEvict` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor` |
| `baremetalsolution.volumes.rename` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/baremetalsolution.admin`, `roles/baremetalsolution.editor`, `roles/baremetalsolution.storageadmin`, `roles/baremetalsolution.volumesadmin`, `roles/baremetalsolution.volumeseditor` |
| `baremetalsolution.volumes.resize` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/baremetalsolution.admin`, `roles/baremetalsolution.editor`, `roles/baremetalsolution.storageadmin`, `roles/baremetalsolution.volumesadmin`, `roles/baremetalsolution.volumeseditor` |
| `baremetalsolution.volumes.update` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/baremetalsolution.admin`, `roles/baremetalsolution.editor`, `roles/baremetalsolution.storageadmin`, `roles/baremetalsolution.volumesadmin`, `roles/baremetalsolution.volumeseditor` |
| `baremetalsolution.volumesnapshots.create` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/baremetalsolution.admin`, `roles/baremetalsolution.editor`, `roles/baremetalsolution.storageadmin`, `roles/baremetalsolution.volumesnapshotsadmin`, `roles/baremetalsolution.volumesnapshotseditor` |
| `baremetalsolution.volumesnapshots.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/baremetalsolution.admin`, `roles/baremetalsolution.editor`, `roles/baremetalsolution.storageadmin`, `roles/baremetalsolution.volumesnapshotsadmin`, `roles/baremetalsolution.volumesnapshotseditor` |
| `baremetalsolution.volumesnapshots.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/baremetalsolution.admin`, `roles/baremetalsolution.editor`, `roles/baremetalsolution.viewer`, `roles/baremetalsolution.storageadmin`, `roles/baremetalsolution.volumesnapshotsadmin`, `roles/baremetalsolution.volumesnapshotseditor`, `roles/baremetalsolution.volumesnapshotsviewer`, `roles/iam.supportUser` |
| `baremetalsolution.volumesnapshots.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/baremetalsolution.admin`, `roles/baremetalsolution.editor`, `roles/baremetalsolution.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/baremetalsolution.storageadmin`, `roles/baremetalsolution.volumesnapshotsadmin`, `roles/baremetalsolution.volumesnapshotseditor`, `roles/baremetalsolution.volumesnapshotsviewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `baremetalsolution.volumesnapshots.restore` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/baremetalsolution.admin`, `roles/baremetalsolution.editor`, `roles/baremetalsolution.storageadmin`, `roles/baremetalsolution.volumesnapshotsadmin` |

## Notes

- Roles and permissions of the `baremetalsolution` service from the IAM roles and permissions reference (retrieved 2026-11-14); role names, descriptions and permission lists are verbatim, regrouped per role. The `service.resource.*` group headings of the official page are omitted from the per-role lists and counts, because they are collapsible headings, not permissions.
- The permissions table lists role IDs only (role names and links are on the official page) and gives service agent roles as a count; service agent roles must not be granted to principals other than service agents.
- Source: https://docs.cloud.google.com/iam/docs/roles-permissions/baremetalsolution (CC BY 4.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
