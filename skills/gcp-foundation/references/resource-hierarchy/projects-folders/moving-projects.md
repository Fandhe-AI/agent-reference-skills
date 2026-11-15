---
source: https://docs.cloud.google.com/resource-manager/docs/moving-projects-folders
---

# Moving Projects and Analyzing a Move

Move a project within an organization (or between folders), and use the Cloud Asset Analyze Move API to find policy warnings and blockers before moving.

## Signature / Usage

Move a project:

```bash
gcloud beta projects move PROJECT_ID \
   --DESTINATION_TYPE DESTINATION_ID
```

`DESTINATION_TYPE` is `organization` or `folder`. REST (v3 `projects.move`):

```
POST https://cloudresourcemanager.googleapis.com/v3/{name=PROJECT_NAME}:move
{
  "destinationParent": DESTINATION_PARENT
}
```

`PROJECT_NAME` example `projects/415104041262`; `DESTINATION_PARENT` example `organizations/12345678901`. Returns an Operation.

Analyze the move first (needs the Cloud Asset API enabled in a consumer project):

```
gcloud asset analyze-move --project=PROJECT_ID \
  (--destination-folder=FOLDER_ID \
    | --destination-organization=ORGANIZATION_ID)
```

```
gcloud asset analyze-move --project=PROJECT_ID \
  --destination-folder=FOLDER_ID
```

```
gcloud asset analyze-move --project=PROJECT_ID \
  --destination-organization=ORGANIZATION_ID
```

REST:

```
GET https://cloudasset.googleapis.com/v1/{resource=*/*}: \
  analyzeMove?destinationParent=DESTINATION_NAME
```

`resource` is `projects/my-project-id` or `projects/12345`; `DESTINATION_NAME` is `folders/123` or `organizations/123`.

Permission error example:

```json
{
  "error": {
  "code": 403,
  "message": "Failed to fetch Project: projects/test-project-service-3 to perform
              move analysis.",
  "status": "PERMISSION_DENIED"}
}
```

Per-service analysis error (Hierarchical Firewall, missing permission):

```json
{
  "moveAnalysis": [{
    "displayName": "name hidden",
    "analysis": {
      "warnings": [{
        "detail": "details hidden"
      }]
    }
  }, {
    "displayName": "name hidden",
    "analysis": {
      "warnings": [{
        "detail": "details hidden"
      }]
    }
  }, {
    "displayName": "Hierarchical Firewall",
    "error": {
      "code": 7,
      "message": "Failed to retrieve inherited security policies to perform
                  analysis. Required 'compute.organizations.setSecurityPolicy'
                  permission for {resource ID}"
     }}]
}
```

## Options / Props

Permissions for the analysis (`cloudasset.assets.analyzeMove`, in Cloud Asset Viewer or Viewer, on the project or its parent):

| To view | Permission |
|---------|-----------|
| Inherited allow policies from the parent organization | `resourcemanager.organizations.getIamPolicy` on the organization |
| Inherited allow policies from the parent folder | `resourcemanager.folders.getIamPolicy` on the folder |
| Allow policies on the project | `resourcemanager.projects.getIamPolicy` on the project |
| Inherited deny policies | `iam.denypolicies.get` on the organization |
| Inherited organization policies | `orgpolicy.policy.get` on the project |
| Inherited Compute Engine firewall policies | `compute.organizations.setSecurityPolicy` on the source folder or organization (despite "set", needed to view) |
| Inherited tags | `resourcemanager.hierarchyNodes.listEffectiveTags` on the project or ancestors |

Analyze Move error codes:

| Error | Code | Meaning |
|-------|------|---------|
| Invalid argument | 3 | Invalid argument such as an incorrect resource name |
| Permission denied | 7 | Missing permission, or the source project does not exist |
| Internal | 13 | Problem calling a policy system (IAM, organization policy); retry after checking for an outage |
| Unavailable | 14 | Internal system out of sync; retry |
| Unauthenticated | 16 | Incorrect credentials |

## Notes

- Required role for moving: Project Mover (`roles/resourcemanager.projectMover`) on both source and destination folders (or the organization if the project is not in a folder), giving `resourcemanager.projects.update` on the project and `resourcemanager.projects.move` on source and destination.
- Policies attached directly to the project move with it; inherited IAM and organization policies change with the new parent. Example: a service account with Storage Object Creator bound at Folder A loses upload access if the project moves to Folder B without the same inheritance (service outage). Keep organization policies consistent between source and destination.
- Analyze Move groups results by service; any blocker will block the real move. It performs no checks on the destination organization (it does not even need to exist) and may omit Preview features.
- Moving between organizations is a separate process (project migration).
- Source: https://docs.cloud.google.com/resource-manager/docs/moving-projects-folders
- Source: https://docs.cloud.google.com/resource-manager/docs/analyze-move
- Retrieved 2026-11-14. Content is CC BY 4.0; code examples are Apache 2.0.

## Related

- [projects.md](./projects.md)
- [folders.md](./folders.md)
- [../organization-policy/overview.md](../organization-policy/overview.md)
