---
source: https://docs.cloud.google.com/filestore/docs/iam
---

# Filestore IAM roles and permissions

IAM roles control Filestore operations such as creating an instance. Access to files on a share (read, execute) is controlled by POSIX file permissions, not IAM.

## Signature / Usage

The source page has no commands. Operations that require `file.instances.create` (Filestore Editor), for example (snippet from the creating-instances page):

```bash
gcloud filestore instances create INSTANCE_ID \
    --tier=TIER \
    --file-share=name="FILE_SHARE_NAME",capacity=FILE_SHARE_SIZE \
    --network=name="VPC-NETWORK"
```

## Options / Props

Predefined roles: Filestore Editor (`roles/file.editor`), Filestore Viewer (`roles/file.viewer`). Basic roles (Owner, Editor, Viewer) also carry these permissions.

| Permission | Action | Editor | Viewer |
|---|---|---|---|
| `file.locations.get`, `file.locations.list` | Get / list supported locations | yes | yes |
| `file.instances.create`, `file.instances.update`, `file.instances.delete` | Create / update / delete instances | yes | no |
| `file.instances.get`, `file.instances.list` | Get / list instances | yes | yes |
| `file.operations.get`, `file.operations.list` | Get / list operations | yes | yes |
| `file.operations.cancel`, `file.operations.delete` | Cancel / delete operations | yes | no |
| `file.backups.create`, `file.backups.update`, `file.backups.delete` | Create / update / delete backups | yes | no |
| `file.backups.get`, `file.backups.list` | Get / list backups | yes | yes |
| `file.instances.restore`, `file.instances.revert` | Restore an instance from a backup / revert an instance to a snapshot (from the IAM roles reference) | yes | no |

Basic roles: Project Owner and Project Editor have all of the above; Project Viewer has only the get / list permissions (locations, instances, operations, backups).

## Notes

- Source inconsistency: the Filestore IAM page lists snapshot permissions `file.snapshots.create`, `file.snapshots.update`, `file.snapshots.delete` (Editor) and `file.snapshots.get`, `file.snapshots.list` (Editor and Viewer), but the IAM roles reference for Filestore lists none of them; `roles/file.editor` and `roles/file.viewer` contain only snapshot tag permissions (`file.snapshots.createTagBinding`, `file.snapshots.deleteTagBinding`, `file.snapshots.listEffectiveTags`, `file.snapshots.listTagBindings`), and reverting to a snapshot uses `file.instances.revert`. The table above keeps only permissions present in the IAM roles reference; do not build custom roles from the `file.snapshots.*` names on the Filestore IAM page without checking them.
- Custom roles for Filestore must include `resourcemanager.projects.get` and `resourcemanager.projects.list` to query project resources.
- Viewing performance metrics needs Monitoring Viewer or Monitoring Editor (https://docs.cloud.google.com/monitoring/access-control#grant-monitoring-access).
- For IAM concepts, service accounts and least privilege see the `gcp-foundation` skill.
- Snippet taken from https://docs.cloud.google.com/filestore/docs/creating-instances.
- Source: https://docs.cloud.google.com/iam/docs/roles-permissions/file (IAM roles reference for Filestore; retrieved 2026-11-14)
- Source: https://docs.cloud.google.com/filestore/docs/iam (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)

## Related

- [creating-instances.md](./creating-instances.md)
- [backups.md](./backups.md)
- [snapshots.md](./snapshots.md)
