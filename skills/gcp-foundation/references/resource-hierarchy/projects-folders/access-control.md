---
source: https://docs.cloud.google.com/resource-manager/docs/access-control-folders
---

# Access Control for Organizations, Folders, and Projects (Resource Manager IAM)

Which IAM roles and permissions control the hierarchy: who can administer folders, create / move / delete projects, and manage organization-level allow policies. Detailed IAM mechanics (grant / revoke, deny policies) belong to IAM documentation.

## Signature / Usage

View the organization allow policy:

```bash
gcloud organizations get-iam-policy \
ORGANIZATION_ID --format json > \
FILENAME.JSON
```

Adapted (not in the official docs): the official output is shown without indentation and with a stray quote; the YAML below is the same policy with valid structure.

```yaml
bindings:
- members:
  - user:testuser1@gcp-test.com
  role: roles/editor
- members:
  - user:admin@gcp-test.com
  role: roles/resourcemanager.organizationAdmin
- members:
  - user:testuser2@gcp-test.com
  role: roles/resourcemanager.projectCreator
etag: BwU1aRxWk30=
```

REST get / set (v3):

```bash
POST
https://cloudresourcemanager.googleapis.com/v3/organizations/12345:getIamPolicy
```

Adapted (not in the official docs): added the missing comma before `etag`.

```json
{
    "bindings": [
    {
        "role": "roles/resourcemanager.organizationAdmin",
        "members": [
        "user:email1@gmail.com"
    ]
    },
    {
        "role": "roles/resourcemanager.projectCreator",
        "members": [
            "user:email2@gmail.com",
            "user:email3@gmail.com",
            "serviceAccount:my-other-app@appspot.gserviceaccount.com"
        ]
    }
    ],
    "etag": "BwUjHYKHHiQ="
}
```

Grant a role by editing the policy file and setting it (the read-modify-write cycle; keep the `etag`):

Adapted (not in the official docs): trailing commas removed so the JSON is valid.

```json
{
    "bindings": [
    {
        "members": [
            "user:testuser1@gcp-test.com"
        ],
        "role": "roles/editor"
    },
    {
        "members": [
            "user:admin@gcp-test.com",
            "user:anotheradmin@gcp-test.com"
        ],
        "role": "roles/resourcemanager.organizationAdmin"
    },
    {
        "members": [
            "user:testuser20@gcp-test.com"
        ],
        "role": "roles/resourcemanager.projectCreator"
    }
    ],
    "etag": "BwU1aRxWk30="
}
```

```bash
gcloud organizations set-iam-policy \
ORGANIZATION_ID policy.json
```

REST set:

The official page's REST example is truncated in the retrieved copy. Adapted (not in the official docs): the body below is completed using the bindings and `etag` from the getIamPolicy example above.

```text
POST https://cloudresourcemanager.googleapis.com/v3/organizations/12345:setIamPolicy
```

```json
{
  "policy": {
    "version": 1,
    "bindings": [
      {
        "role": "roles/resourcemanager.organizationAdmin",
        "members": [
          "user:email1@gmail.com"
        ]
      },
      {
        "role": "roles/resourcemanager.projectCreator",
        "members": [
          "user:email2@gmail.com",
          "user:email3@gmail.com",
          "serviceAccount:my-other-app@appspot.gserviceaccount.com"
        ]
      }
    ],
    "etag": "BwUjHYKHHiQ="
  }
}
```

## Options / Props

Folder roles:

| Action | Role | Level |
|--------|------|-------|
| Administer folders across the organization | Folder Admin (`roles/resourcemanager.folderAdmin`) | Organization |
| Administer a folder and everything in it | Folder Admin | Folder |
| Administer a folder's allow policies | Folder IAM Admin (`roles/resourcemanager.folderIamAdmin`) | Folder |
| Create folders | Folder Creator (`roles/resourcemanager.folderCreator`) | Parent of the new folder |
| Move folders and projects | Folder Mover (`roles/resourcemanager.folderMover`) | Parents of both original and new locations (or a common ancestor) |
| Move a project into a folder | Project Editor or Owner on the project, plus Project Mover on source and destination parents | Project / parents |
| Delete a folder | Folder Editor (`roles/resourcemanager.folderEditor`) or Folder Admin | Folder |
| Browse folders | Folder Viewer (`roles/resourcemanager.folderViewer`) (`folders.list`); `projects.list` via Viewer or Browser | Folder / organization |

Organization roles:

| Role | Purpose |
|------|---------|
| Organization Administrator (`roles/resourcemanager.organizationAdmin`) | Manage IAM policies and view organization policies for organizations, folders, projects; `resourcemanager.organizations.*`, `*.setIamPolicy` on org / folders / projects |
| Organization Viewer (`roles/resourcemanager.organizationViewer`) | `resourcemanager.organizations.get` |
| Organization Policy Administrator (`roles/orgpolicy.policyAdmin`) | `orgpolicy.*` permissions, custom constraint management, policy simulator, Cloud Asset org policy analysis |
| Browser (`roles/browser`) | Browse the hierarchy of a project (folders, organization, allow policy) without access to resources in the project |

Project management permissions (granted on the containing organization or folder):

| Method | Permission |
|--------|-----------|
| `projects.create` / `delete` / `get` / `list` / `undelete` / `move` | `resourcemanager.projects.create` / `.delete` / `.get` / `.list` / `.undelete` / `projects.move` |
| `projects.getIamPolicy` / `setIamPolicy` | `resourcemanager.projects.getIamPolicy` / `.setIamPolicy` |
| `projects.search` | `resourcemanager.projects.get` |
| `projects.patch` | `resourcemanager.projects.update` for metadata; `resourcemanager.projects.create` on the organization to move a project into it |
| `projects.testIamPermissions` | none |

## Notes

- Adapted from the official docs: the policy YAML structure and the missing comma before `etag` are corrected, and the truncated `setIamPolicy` body is completed.
- Allow policies are additive and inherited: moving a resource into a folder can grant extra roles; moving it out can remove roles. Plan and test the hierarchy first (use a test folder).
- Use groups; avoid basic roles (owner / editor / viewer); a role granted on a folder applies to every resource underneath (for example `roles/compute.admin` on a folder gives full control of Compute Engine in all its projects).
- Creating a folder automatically grants the creator Folder Admin and Folder Editor. Folder Creator alone cannot delete.
- Custom roles: always grant `get` and `list` as a pair; if you include `folders.list` / `folders.get`, include `projects.list` / `projects.get`. `setIamPolicy` on organization, folder, or project lets the holder grant any permission: assign with care.
- To let a user create projects only inside one folder: grant Organization Viewer at the organization, create the folder, and grant Folder Viewer and Project Creator on that folder.
- Moving a non-organization project into the organization requires Project Editor / Owner on the project and Project Creator on the organization.
- `resourcemanager.projects.get` also exposes the associated billing account name through `billing.projects.getBillingInfo`.
- Source: https://docs.cloud.google.com/resource-manager/docs/access-control-folders
- Source: https://docs.cloud.google.com/resource-manager/docs/access-control-org
- Source: https://docs.cloud.google.com/resource-manager/docs/access-control-proj
- Retrieved 2026-11-14. Content is CC BY 4.0; code examples are Apache 2.0. Full permission lists per role are in the IAM roles reference.

## Related

- [folders.md](./folders.md)
- [moving-projects.md](./moving-projects.md)
- [../organization-admin/organization-resource.md](../organization-admin/organization-resource.md)
