---
source: https://docs.cloud.google.com/sdk/gcloud/reference/projects
---

# Projects, Folders and Organizations

Copy-paste gcloud commands for the resource hierarchy: organizations, folders, projects, labels, liens and moves.

## Signature / Usage

### Find the organization ID

```bash
gcloud organizations list
```

### Organization IAM

```bash
gcloud organizations get-iam-policy \
ORGANIZATION_ID --format json > \
FILENAME.JSON
```

```bash
gcloud organizations set-iam-policy \
ORGANIZATION_ID policy.json
```

```bash
gcloud organizations add-iam-policy-binding ORGANIZATION_ID \
    --member="user:EMAIL_ADDRESS" \
    --role="roles/resourcemanager.organizationAdmin"
```

```bash
gcloud organizations add-iam-policy-binding ORGANIZATION_ID \
--member=user:USER_ID \
--role=roles/resourcemanager.folderAdmin
```

### Create folders

```bash
gcloud resource-manager folders create \
   --display-name=DISPLAY_NAME \
   --organization=ORGANIZATION_ID
```

```bash
gcloud resource-manager folders create \
   --display-name=DISPLAY_NAME \
   --folder=FOLDER_ID
```

```bash
gcloud resource-manager folders create \
    --display-name="Test Async Folder" \
    --organization=2518 \
    --async
```

```bash
gcloud beta resource-manager operations describe fc.8572
```

`--async` is supported only for `folders create` and `folders move`.

### List folders and grant folder access

```bash
gcloud resource-manager folders list --organization=ORGANIZATION_ID
```

```bash
gcloud resource-manager folders \
    add-iam-policy-binding FOLDER_ID \
    --member=user:email1@example.com \
    --role=roles/resourcemanager.folderEditor
```

```bash
gcloud resource-manager folders \
    set-iam-policy FOLDER_ID POLICY_FILE
```

### Create projects

```bash
gcloud projects create PROJECT_ID
```

```bash
gcloud projects create PROJECT_ID --organization=ORGANIZATION_ID
```

```bash
gcloud projects create PROJECT_ID --folder=FOLDER_ID
```

```bash
gcloud projects create PROJECT_ID --organization=ORGANIZATION_ID --tags=KEY_VALUE_PAIRS
```

Tags at creation are Preview and require the Tag User role.

### Project labels

```bash
gcloud projects create PROJECT_ID \
    --labels=KEY1=VALUE1,KEY2=VALUE2
```

```bash
gcloud projects update PROJECT_ID \
    --update-labels=KEY1=VALUE1,KEY2=VALUE2
```

```bash
gcloud projects update PROJECT_ID \
    --remove-labels=KEY1,KEY2
```

```bash
gcloud projects update PROJECT_ID \
    --clear-labels
```

### Project IAM

```bash
gcloud projects get-iam-policy project-id --format json > file-path
```

```bash
gcloud projects set-iam-policy project-id file-path
```

### Move a project

```bash
gcloud asset analyze-move --project=PROJECT_ID \
  --destination-folder=FOLDER_ID
```

```bash
gcloud asset analyze-move --project=PROJECT_ID \
  --destination-organization=ORGANIZATION_ID
```

```bash
gcloud beta projects move PROJECT_ID \
   --DESTINATION_TYPE DESTINATION_ID
```

`DESTINATION_TYPE` is `organization` or `folder`. Run `analyze-move` first to find policy warnings and blockers.

### Project liens (alpha)

```bash
gcloud alpha resource-manager liens create \
    --project=PROJECT_ID \
    --restrictions=resourcemanager.projects.delete \
    --reason=LIEN_REASON \
    --origin=LIEN_ORIGIN
```

```bash
gcloud alpha resource-manager liens list
```

```bash
gcloud alpha resource-manager liens delete LIEN_NAME
```

### Delete a project

```bash
gcloud projects delete PROJECT_ID
```

### Clear a folder management project blocker

```bash
gcloud resource-manager capabilities update folders/FOLDER_ID/capabilities/app-management --no-enable
```

## Options / Props

| Flag | Command | Meaning |
| --- | --- | --- |
| `--organization` / `--folder` | `projects create`, `folders create` | Parent of the new resource (only one per command) |
| `--display-name` | `folders create` | Folder display name |
| `--async` | `folders create`, `folders move` | Return a long-running operation immediately |
| `--restrictions` | `liens create` | `resourcemanager.projects.delete` |
| `--origin` | `liens create` | Origin of the lien; defaults to the user's email if omitted |

## Notes

- Warning: use a disposable project and folder for `gcloud projects delete`, `liens delete` and `projects move`; always pass the exact `PROJECT_ID` and never omit the target.
- Adapted from the official transcript, which shows `gcloud projects delete $project`: the command above uses `PROJECT_ID`.
- `gcloud projects delete` can fail with `FAILED_PRECONDITION` when Cloud Endpoints services, a lien, or a folder management project block deletion.
- Project labels apply to projects only and do not propagate to child resources; use tags for policy conditions.
- `gcloud projects create` does not link a billing account; link one with `gcloud billing projects link PROJECT_ID --billing-account=ACCOUNT_ID` (per `gcloud billing projects link --help`; see also https://docs.cloud.google.com/billing/docs/how-to/modify-project).
- Source: https://docs.cloud.google.com/resource-manager/docs/creating-managing-projects (retrieved 2026-11-14)
- Source: https://docs.cloud.google.com/resource-manager/docs/creating-managing-folders (retrieved 2026-11-14)
- Source: https://docs.cloud.google.com/resource-manager/docs/creating-managing-organization (retrieved 2026-11-14)
- Source: https://docs.cloud.google.com/resource-manager/docs/access-control-folders (retrieved 2026-11-14)
- Source: https://docs.cloud.google.com/resource-manager/docs/creating-managing-labels (retrieved 2026-11-14)
- Source: https://docs.cloud.google.com/resource-manager/docs/moving-projects-folders (retrieved 2026-11-14)
- Source: https://docs.cloud.google.com/resource-manager/docs/project-liens (retrieved 2026-11-14)

## Related

- [projects.md](../references/resource-hierarchy/projects-folders/projects.md)
- [folders.md](../references/resource-hierarchy/projects-folders/folders.md)
- [moving-projects.md](../references/resource-hierarchy/projects-folders/moving-projects.md)
- [project-lifecycle.md](../references/resource-hierarchy/projects-folders/project-lifecycle.md)
- [access-control.md](../references/resource-hierarchy/projects-folders/access-control.md)
- [organization-resource.md](../references/resource-hierarchy/organization-admin/organization-resource.md)
- [labels.md](../references/resource-hierarchy/labels/labels.md)
