---
source: https://docs.cloud.google.com/resource-manager/docs/creating-managing-folders
---

# Creating and Managing Folders

Folders group projects and other folders under an organization to delegate administration, apply IAM / deny / organization policies, and manage cost. Folders require an organization resource (Google Workspace or Cloud Identity).

## Signature / Usage

Grant Folder Admin on the organization:

```bash
gcloud organizations add-iam-policy-binding ORGANIZATION_ID \
--member=user:USER_ID \
--role=roles/resourcemanager.folderAdmin
```

REST (policy shape and request):

Adapted (not in the official docs): the shell assignment has no space after `=`, the JSON keys are quoted with no trailing commas, the role IDs use the full `roles/resourcemanager.folder*` names, and the body is a read-modify-write. `setIamPolicy` replaces the whole policy, so first read the current policy (`getIamPolicy` with `"options": {"requestedPolicyVersion": 3}`), keep every existing binding, condition and the `etag`, and add only the bindings below. `CURRENT_BINDINGS...` and `ETAG_FROM_GETIAMPOLICY` are placeholders for that existing content.

```bash
request_json='{
  "policy": {
    "version": 3,
    "bindings": [
      CURRENT_BINDINGS_FROM_GETIAMPOLICY,
      {
        "role": "roles/resourcemanager.folderAdmin",
        "members": ["user:admin@myorganization.com"]
      },
      {
        "role": "roles/resourcemanager.folderCreator",
        "members": ["user:admin@myorganization.com"]
      },
      {
        "role": "roles/resourcemanager.folderMover",
        "members": ["user:admin@myorganization.com"]
      }
    ],
    "etag": "ETAG_FROM_GETIAMPOLICY"
  }
}'
```

```restructuredtext
curl -X POST -H "Content-Type: application/json" \
-H "Authorization: Bearer ${bearer_token}" \
-d "$request_json" \
https://cloudresourcemanager.googleapis.com/v3/ORGANIZATION_NAME:setIamPolicy
```

Create folders:

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

REST:

Adapted (not in the official docs): valid shell assignment and JSON (quoted keys and values).

```bash
request_json='{
  "display_name": "DISPLAY_NAME",
  "parent": "ORGANIZATION_NAME"
}'
```

```console
curl -X POST -H "Content-Type: application/json" \
-H "Authorization: Bearer ${bearer_token}" \
-d "$request_json" \
https://cloudresourcemanager.googleapis.com/v3/folders
```

Operation response and completion:

```json
{
  "name": "operations/fc.123456789",
  "metadata": {
    "@type": "type.googleapis.com/google.cloud.resourcemanager.v3.FolderOperation",
    "displayName": "DISPLAY_NAME",
    "operationType": "CREATE"
  }
}
```

```console
curl -H "Authorization: Bearer ${bearer_token}" \
https://cloudresourcemanager.googleapis.com/v3/operations/fc.123456789
```

```json
{
  "name": "operations/fc.123456789",
  "metadata": {
    "@type": "type.googleapis.com/google.cloud.resourcemanager.v3.FolderOperation",
    "displayName": "DISPLAY_NAME",
    "operationType": "CREATE"
  },
  "done": true,
  "response": {
    "@type": "type.googleapis.com/google.cloud.resourcemanager.v3.Folder",
    "name": "folders/12345",
    "parent": "organizations/123",
    "displayName": "DISPLAY_NAME",
    "lifecycleState": "ACTIVE",
    "createTime": "2017-07-19T23:29:26.018Z",
    "updateTime": "2017-07-19T23:29:26.046Z"
  }
}
```

Tags at creation (Preview; requires Tag User role):

Adapted (not in the official docs): added the missing space before the line-continuation backslash after `--organization=ORGANIZATION_ID`.

```bash
gcloud resource-manager folders create \
    --display-name=DISPLAY_NAME \
    --organization=ORGANIZATION_ID \
    --tags=KEY_VALUE_PAIRS
```

```restructuredtext
POST https://cloudresourcemanager.googleapis.com/v3/folders/
Authorization: *************
Content-Type: application/json

{
  "display_name": "our-folder-456",
  "parent": "organizations/123",
  "tags": {
    "123/environment": "production",
    "123/costCenter": "marketing"
  }
}
```

Find a folder ID:

```bash
gcloud resource-manager folders list --organization=ORGANIZATION_ID
```

Configure access:

```bash
gcloud resource-manager folders \
    add-iam-policy-binding FOLDER_ID \
    --member=user:email1@example.com \
    --role=roles/resourcemanager.folderEditor
```

```bash
gcloud resource-manager folders \
    add-iam-policy-binding FOLDER_ID \
    --member=user:email1@example.com \
    --role=roles/resourcemanager.folderViewer
```

```bash
gcloud resource-manager folders \
    set-iam-policy FOLDER_ID POLICY_FILE
```

Adapted (not in the official docs): valid shell assignment and JSON (quoted keys); the URL includes the `folders/` collection (`FOLDER_ID` is the numeric ID); and the body is a read-modify-write. `setIamPolicy` replaces the whole policy, so first read the current policy (`getIamPolicy` with `"options": {"requestedPolicyVersion": 3}`), keep existing bindings, conditions and the `etag`, and change only the binding you need. The placeholders stand for that existing content.

```bash
request_json='{
  "policy": {
    "version": 3,
    "bindings": [
      CURRENT_BINDINGS_FROM_GETIAMPOLICY,
      {
        "role": "roles/resourcemanager.folderEditor",
        "members": [
          "user:email1@example.com",
          "user:email2@example.com"
        ]
      }
    ],
    "etag": "ETAG_FROM_GETIAMPOLICY"
  }
}'
```

```console
curl -X POST -H "Content-Type: application/json" \
-H "Authorization: Bearer ${bearer_token}" \
-d "$request_json" \
https://cloudresourcemanager.googleapis.com/v3/folders/FOLDER_ID:setIamPolicy
```

Long-running operations with `--async` (supported only for `folders create` and `folders move`):

```bash
gcloud resource-manager folders create \
    --display-name="Test Async Folder" \
    --organization=2518 \
    --async
```

```yaml
name: operations/fc.8572
metadata:
operation_type: CREATE
display_name: Awe-Inspiring Async Folder
destination_parent: organizations/2518
done: false
```

```bash
gcloud beta resource-manager operations describe fc.8572
```

```yaml
name: operations/fc.8572
done: true
response:
  name: folders/6428
  display_name: Awe-Inspiring Async Folder
  lifecycle_state: ACTIVE
  create_time: '2024-03-20T10:00:00Z'
```

## Options / Props

| Limit / rule | Value |
|--------------|-------|
| Nesting depth | Up to 10 levels |
| Direct child folders per parent | At most 300 |
| Display name | 3-30 characters; letters, digits, spaces, hyphens, underscores; starts and ends with a letter or digit; unique among siblings |
| Roles to create | Folder Admin or Folder Creator at the parent |
| Roles to delete | Folder Admin (`roles/resourcemanager.folderAdmin`) or Folder Editor (`roles/resourcemanager.folderEditor`); folder must be empty |
| Roles to configure access | Folder IAM Administrator or Folder Admin at the parent level |

## Notes

- Folder Admin can create, edit, delete, move folders, change IAM on folders, and move projects between folders; initially only the Organization Admin can assign it for the organization. To let users see the structure, grant Organization Viewer and Folder Viewer at the organization; to limit visibility, grant Folder Viewer on specific folders.
- Adapted from the official docs: the setIamPolicy examples are read-modify-write (existing bindings and `etag` preserved, version 3), the folder setIamPolicy URL is `/v3/folders/FOLDER_ID:setIamPolicy`, and the tagged `folders create` command has a space before its line-continuation backslash.
- Adapted from the official docs: the REST `request_json` examples are corrected to valid shell and JSON, and the folder role IDs use `roles/resourcemanager.folderAdmin` / `folderCreator` / `folderMover` (the official sample's `roles/folderAdmin` etc. are not valid role IDs).
- Start with a single sandbox folder to experiment; model departments, applications, or environments with nested folders.
- Console offers Standard folders and Compliant (Assured Workloads) folders.
- New folders can take minutes to appear in the console (propagation delay); verify immediately with gcloud or the API.
- Folder-level allow / deny policies apply to every project in the folder (for example Compute Instance Admin on a folder applies to all projects in it).
- Source: https://docs.cloud.google.com/resource-manager/docs/creating-managing-folders
- Retrieved 2026-11-14. Content is CC BY 4.0; code examples are Apache 2.0.

## Related

- [resource-hierarchy.md](./resource-hierarchy.md)
- [access-control.md](./access-control.md)
- [moving-projects.md](./moving-projects.md)
