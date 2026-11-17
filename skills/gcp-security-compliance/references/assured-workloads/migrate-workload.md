---
source: https://docs.cloud.google.com/assured-workloads/docs/migrate-workload
---

# Migrate a workload

Before moving an existing project into an Assured Workloads folder, run a compliance analysis (`analyzeWorkloadMove`) that compares the source project with the destination folder and returns warnings and blockers. Moving the project itself is a normal Resource Manager project move.

## Signature / Usage

### Analyze moving a project

The method `analyzeWorkloadMove` analyzes moving the source project to the destination Assured Workloads folder. The endpoint must match the location of the destination workload, for example `https://us-west1-assuredworkloads.googleapis.com` for a regionalized workload in `us-west1` and `https://us-assuredworkloads.googleapis.com` for a multi-region workload in the US.

Adapted (not in the official docs): the source writes `https://[ENDPOINT_URI]/v1/...` although `ENDPOINT_URI` already includes the scheme, and uses snake_case query parameters; this form uses `ENDPOINT_URI` directly and the Discovery parameter names `pageSize` and `pageToken`.

```text
GET ENDPOINT_URI/v1/organizations/DESTINATION_ORGANIZATION_ID/locations/DESTINATION_LOCATION_ID/workloads/DESTINATION_WORKLOAD_ID:analyzeWorkloadMove?project=projects/SOURCE_PROJECT_ID&pageSize=PAGE_SIZE&pageToken=PAGE_TOKEN
```

### Filter findings by asset type

Adapted (not in the official docs): the source example sends the filtered request to the global `https://assuredworkloads.googleapis.com` endpoint although the text requires the endpoint matching the destination location; the regional endpoint and the Discovery names `assetTypes` and `pageSize` are used here, and the example page token is dropped because it only applies to later pages. Repeat `assetTypes` to filter by more than one type (for example also `serviceusage.googleapis.com/Service`).

```text
GET https://us-west1-assuredworkloads.googleapis.com/v1/organizations/919698298765/locations/us-west1/workloads/00-701ea036-7152-4781-a867-9f5:analyzeWorkloadMove?project=projects/my-project-123&assetTypes=cloudresourcemanager.googleapis.com/Project&pageSize=5
```

The results contain only findings of the specified type (`cloudresourcemanager.googleapis.com/Project`):

```json
{
  "assetMoveAnalyses": [
    {
      "asset": "//cloudresourcemanager.googleapis.com/projects/my-project-123",
      "assetType": "cloudresourcemanager.googleapis.com/Project",
      "analysisGroups": [
        {
          "displayName": "ORG_POLICIES",
          "analysisResult": {
            "warnings": [
              {
                "detail": "constraints/gcp.resourceLocations: Target applies/inherits this custom policy and it is not applied by the source. Upon moving, this policy will get inherited from the target."
              },
              {
                "detail": "constraints/compute.disableInstanceDataAccessApis: Source applies this custom policy and it is not applied by the target."
              }
            ],
            "blockers": [
              {
                "detail": "constraints/gcp.resourceLocations: The value applied at the source is not compliant with the target compliance program. The expected allowed values are [us-west4, us-west1, us-west2, us-west3, us-central1, us-east1, us-east4, us-south1, us-central2, us-east5]."
              }
            ]
          }
        }
      ]
    }
  ],
  "nextPageToken": "Ch8wLDc0MzY3NTExNCwzMzg4ODM1NTM2NDQ0NTg4MDMy"
}
```

## Options / Props

### Request placeholders and query parameters

| Name | Description |
|---|---|
| `ENDPOINT_URI` | The Assured Workloads service endpoint URI matching the location of the destination workload. |
| `DESTINATION_ORGANIZATION_ID` | Organization ID of the destination workload, for example `919698201234`. |
| `DESTINATION_LOCATION_ID` | Location of the destination workload, for example `us-west1` or `us`; corresponds to the workload's data region. |
| `DESTINATION_WORKLOAD_ID` | ID of the destination Assured Workloads folder, for example `00-701ea036-7152-4780-a867-9f5`. |
| `project` (query) | Source project to analyze, `projects/SOURCE_PROJECT_ID` (a project number is also accepted by the API). |
| `assetTypes` (query, repeatable, optional) | One asset type per parameter to filter findings, for example `cloudresourcemanager.googleapis.com/Project`. If empty, all assets are analyzed. |
| `pageSize` (query, optional) | Results per page; the API default is 10 and the maximum is 50. |
| `pageToken` (query, optional) | Token to continue paginated results. |

### Finding types

| Finding | Description |
|---|---|
| Warning | The source project is potentially incompatible with the destination and may cause a compliance violation. Investigate to confirm the incompatibility is acceptable or address it before the move. |
| Blocker | A compliance violation was detected between the source project and the destination. Blockers must be addressed before proceeding with a move. |

### Reported analysis groups

| Group | What it reports | How to resolve |
|---|---|---|
| Resource locations (`RESOURCE_LOCATIONS`) | Resources in a location the control package disallows. | Move the resources to allowed locations, delete them, or modify the target's `gcp.resourceLocations` constraint. |
| Unsupported products/services (`DISALLOWED_SERVICES`) | Services unsupported by the destination folder's control package. | Disable them before migrating; see Notes for the risk of allowing them. |
| Organization Policy constraints (`ORG_POLICIES`) | Constraint values that differ from the destination folder's effective policy or are not compliant with the target control package (only constraints relevant to the control package are evaluated). For a blocker, the response includes the expected compliant values. | Determine which constraint needs to change and make the change. |

### Required IAM permissions

| Permission | On |
|---|---|
| `assuredworkloads.workload.get` | The destination workload |
| `cloudasset.assets.searchAllResources` | The source project |
| `orgpolicy.policy.get` | The source project and the destination Assured Workloads folder |

## Notes

- Findings do not prevent the move, but unaddressed warnings and blockers may produce compliance violations in the destination folder. After resolving them, run the analysis again and then move the project (see "Moving a project" in the Resource Manager documentation).
- Migrate Assured Workloads folders or projects only to a folder that uses the same control package; otherwise you can incur additional billing fees and undermine your compliance status.
- Not analyzed: resource-level incompatibilities for organization policy constraints other than `gcp.resourceLocations` (for example `gcp.restrictCmekCryptoKeyProjects`, `compute.disableNestedVirtualization`), and service-specific features disabled for a control package (for example Cloud Monitoring uptime checks for IL4 folders and BigQuery remote functions for ITAR folders).
- Permissive and risky: allowing an unsupported service by changing the folder's resource usage restriction organization policy (or disabling it on the destination folder) lets non-compliant services be deployed; the service and its resources are then ignored by background compliance checks, so you accept the risk that the workload falls out of compliance. The source recommends not migrating a project that uses unsupported services without first disabling them.
- Corrected from the official docs: the source request template is `GET https://[ENDPOINT_URI]/v1/organizations/[DESTINATION_ORGANIZATION_ID]/locations/[DESTINATION_LOCATION_ID]/workloads/[DESTINATION_WORKLOAD_ID]:analyzeWorkloadMove?project=projects/SOURCE_PROJECT_ID&page_size=PAGE_SIZE&page_token=PAGE_TOKEN`, although the source defines `ENDPOINT_URI` with the scheme (for example `https://us-west1-assuredworkloads.googleapis.com`). Its filtered example is `GET https://assuredworkloads.googleapis.com/v1/organizations/919698298765/locations/us-west1/workloads/00-701ea036-7152-4781-a867-9f5:analyzeWorkloadMove?project=projects/my-project-123&asset_types=cloudresourcemanager.googleapis.com/Project&page_size=5&page_token=CiAKGjBpNDd2Nmp2Zml2cXRwYjBpOXA`, which uses the global endpoint although the source requires the endpoint matching the destination location. The query names follow the assuredworkloads v1 Discovery document (`assetTypes` repeated, `pageSize` with default 10 and maximum 50, `pageToken`, `project`).
- The source also shows a full unfiltered JSON response and a two-asset-type request; they are omitted here.
- Source: https://docs.cloud.google.com/assured-workloads/docs/migrate-workload (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [key-concepts.md](./key-concepts.md)
- [monitor-folder.md](./monitor-folder.md)
- [control-packages.md](./control-packages.md)
