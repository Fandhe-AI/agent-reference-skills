---
source: https://docs.cloud.google.com/infrastructure-manager/docs/deployments-revisions
---

# Deployments, revisions and previews

A deployment provisions resources, possibly in multiple projects and locations. Revisions are versions of a deployment; a preview describes the actions to actuate a Terraform configuration. This page defines resource names, ID rules and the artifact bucket layout.

## Signature / Usage

### Resource names

```text
projects/PROJECT_ID/locations/LOCATION/deployments/DEPLOYMENT_ID
```

```text
projects/my-project/locations/us-central1/deployments/my-deployment
```

```text
projects/my-project/locations/us-central1/deployments/my-deployment/revisions/r-1
```

```text
projects/PROJECT_ID/locations/LOCATION/previews/PREVIEW_ID
```

```text
projects/my-project/locations/us-central1/previews/my-preview
```

## Options / Props

### ID rules (`DEPLOYMENT_ID`, `PREVIEW_ID`)

| Rule |
|---|
| Only lowercase letters, numbers, or hyphens |
| Starts with a lowercase letter |
| Ends with a number or lowercase letter |
| Cannot be the string `archived-deployments` or `archived-previews` |
| Unique within the project and location where Infra Manager runs |

### Artifact bucket layout

| Item | Name / content |
|---|---|
| Bucket | `gs://PROJECT_NUMBER-LOCATION-blueprint-config`, created in the project and location where Infra Manager runs |
| Multi-region | Bucket is created with multi-regional redundancy (for example the `us` multi-region spans data centers in the United States) |
| Deployment artifacts | Cloud Build logs, Terraform logs, a copy of the Terraform configuration, and a copy of the Terraform state file |
| New-deployment preview artifacts | `gs://PROJECT_NUMBER-LOCATION-blueprint-config/new-previews/preview-name` |
| Update-preview artifacts | `gs://PROJECT_ID-LOCATION-blueprint-config/deployment-ID/previews/preview-ID` (same bucket as the deployment artifacts) |

### Revision IDs

| Revision | Identifier |
|---|---|
| Initial deployment | `r-0` |
| First update | `r-1`; the number increases by one per revision |

## Notes

- A deployment can provision resources to multiple locations and projects; the resources must be available in those locations, and the service account needs permissions in the target projects.
- The revision identifier can only be set by Infrastructure Manager.
- Revisions are versions of a deployment, so metadata (including the state file) is stored for each revision.
- Infra Manager uses the term *blueprint* for a Terraform configuration.
- Source inconsistency: the bucket is written `gs://PROJECT_NUMBER-LOCATION-blueprint-config` for deployments and new-deployment previews but `gs://PROJECT_ID-LOCATION-blueprint-config/deployment-ID/previews/preview-ID` for update previews, and the placeholder list defines only `PROJECT_ID`; both forms are copied as written.
- Source: https://docs.cloud.google.com/infrastructure-manager/docs/deployments-revisions (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [state-file.md](./state-file.md)
- [deploy-resources.md](./deploy-resources.md)
- [update-deployment.md](./update-deployment.md)
