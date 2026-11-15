---
source: https://policysimulator.googleapis.com/$discovery/rest?version=v1
---

# Policy Simulator API REST API (policysimulator)

## Signature / Usage

Base URL: `https://policysimulator.googleapis.com`. Methods are listed by `id`; the `Versions` line shows which API versions define the method (preferred: v1).

### `policysimulator.folders.locations.accessPolicySimulations.operations.get`

- Versions: v1, v1beta, v1alpha
- `GET https://policysimulator.googleapis.com/v1/{+name}`
- Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleLongrunningOperation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation resource. |

### `policysimulator.folders.locations.orgPolicyViolationsPreviews.operations.get`

- Versions: v1, v1beta, v1alpha
- `GET https://policysimulator.googleapis.com/v1/{+name}`
- Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleLongrunningOperation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation resource. |

### `policysimulator.folders.locations.replays.create`

- Versions: v1, v1beta
- `POST https://policysimulator.googleapis.com/v1/{+parent}/replays`
- Creates and starts a Replay using the given ReplayConfig.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `GoogleCloudPolicysimulatorV1Replay`; Response: `GoogleLongrunningOperation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent resource where this Replay will be created. This resource must be a project, folder, or organization with a location. Example: `projects/my-example-project/locations/global` |

### `policysimulator.folders.locations.replays.get`

- Versions: v1, v1beta
- `GET https://policysimulator.googleapis.com/v1/{+name}`
- Gets the specified Replay. Each `Replay` is available for at least 7 days.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleCloudPolicysimulatorV1Replay`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the Replay to retrieve, in the following format: `{projects\|folders\|organizations}/{resource-id}/locations/global/replays/{replay-id}`, where `{resource-id}` is the ID of the project, folder, or organization that owns the `Replay`. Example: `projects/my-example-project/locations/global/replays/506a5f7f-38ce-4d7d-8e03-479ce1833c36` |

### `policysimulator.folders.locations.replays.list`

- Versions: v1beta
- `GET https://policysimulator.googleapis.com/v1beta/{+parent}/replays`
- Lists each Replay in a project, folder, or organization. Each `Replay` is available for at least 7 days.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleCloudPolicysimulatorV1betaListReplaysResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent resource, in the following format: `{projects\|folders\|organizations}/{resource-id}/locations/global`, where `{resource-id}` is the ID of the project, folder, or organization that owns the Replay. Example: `projects/my-example-project/locations/global` Only `Replay` objects that are direct children of the provided parent are listed. In other words, `Replay` objects that are children of a project will not be included when the parent is a folder of that project. |
| `pageSize` | query | integer (int32) | no | The maximum number of Replay objects to return. Defaults to 50. The maximum value is 1000; values above 1000 are rounded down to 1000. |
| `pageToken` | query | string | no | A page token, received from a previous Simulator.ListReplays call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to Simulator.ListReplays must match the call that provided the page token. |

### `policysimulator.folders.locations.replays.operations.get`

- Versions: v1, v1beta, v1alpha
- `GET https://policysimulator.googleapis.com/v1/{+name}`
- Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleLongrunningOperation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation resource. |

### `policysimulator.folders.locations.replays.operations.list`

- Versions: v1, v1beta, v1alpha
- `GET https://policysimulator.googleapis.com/v1/{+name}`
- Lists operations that match the specified filter in the request. If the server doesn't support this method, it returns `UNIMPLEMENTED`.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleLongrunningListOperationsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation's parent resource. |
| `filter` | query | string | no | The standard list filter. |
| `pageSize` | query | integer (int32) | no | The standard list page size. |
| `pageToken` | query | string | no | The standard list page token. |
| `returnPartialSuccess` | query | boolean | no | When set to `true`, operations that are reachable are returned as normal, and those that are unreachable are returned in the ListOperationsResponse.unreachable field. This can only be `true` when reading across collections. For example, when `parent` is set to `"projects/example/locations/-"`. This field is not supported by default and will result in an `UNIMPLEMENTED` error if set unless explicitly documented otherwise in service or product specific documentation. |

### `policysimulator.folders.locations.replays.results.list`

- Versions: v1, v1beta
- `GET https://policysimulator.googleapis.com/v1/{+parent}/results`
- Lists the results of running a Replay.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleCloudPolicysimulatorV1ListReplayResultsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The Replay whose results are listed, in the following format: `{projects\|folders\|organizations}/{resource-id}/locations/global/replays/{replay-id}` Example: `projects/my-project/locations/global/replays/506a5f7f-38ce-4d7d-8e03-479ce1833c36` |
| `pageSize` | query | integer (int32) | no | The maximum number of ReplayResult objects to return. Defaults to 5000. The maximum value is 5000; values above 5000 are rounded down to 5000. |
| `pageToken` | query | string | no | A page token, received from a previous Simulator.ListReplayResults call. Provide this token to retrieve the next page of results. When paginating, all other parameters provided to \[Simulator.ListReplayResults\[\] must match the call that provided the page token. |

### `policysimulator.operations.get`

- Versions: v1, v1beta, v1alpha
- `GET https://policysimulator.googleapis.com/v1/{+name}`
- Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleLongrunningOperation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation resource. |

### `policysimulator.operations.list`

- Versions: v1, v1beta, v1alpha
- `GET https://policysimulator.googleapis.com/v1/{+name}`
- Lists operations that match the specified filter in the request. If the server doesn't support this method, it returns `UNIMPLEMENTED`.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleLongrunningListOperationsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation's parent resource. |
| `filter` | query | string | no | The standard list filter. |
| `pageSize` | query | integer (int32) | no | The standard list page size. |
| `pageToken` | query | string | no | The standard list page token. |
| `returnPartialSuccess` | query | boolean | no | When set to `true`, operations that are reachable are returned as normal, and those that are unreachable are returned in the ListOperationsResponse.unreachable field. This can only be `true` when reading across collections. For example, when `parent` is set to `"projects/example/locations/-"`. This field is not supported by default and will result in an `UNIMPLEMENTED` error if set unless explicitly documented otherwise in service or product specific documentation. |

### `policysimulator.organizations.locations.accessPolicySimulations.operations.get`

- Versions: v1, v1beta, v1alpha
- `GET https://policysimulator.googleapis.com/v1/{+name}`
- Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleLongrunningOperation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation resource. |

### `policysimulator.organizations.locations.orgPolicyViolationsPreviews.create`

- Versions: v1, v1beta
- `POST https://policysimulator.googleapis.com/v1/{+parent}/orgPolicyViolationsPreviews`
- CreateOrgPolicyViolationsPreview creates an OrgPolicyViolationsPreview for the proposed changes in the provided OrgPolicyViolationsPreview.OrgPolicyOverlay. The changes to OrgPolicy are specified by this `OrgPolicyOverlay`. The resources to scan are inferred from these specified changes.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `GoogleCloudPolicysimulatorV1OrgPolicyViolationsPreview`; Response: `GoogleLongrunningOperation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The organization under which this OrgPolicyViolationsPreview will be created. Example: `organizations/my-example-org/locations/global` |
| `orgPolicyViolationsPreviewId` | query | string | no | Optional. An optional user-specified ID for the OrgPolicyViolationsPreview. If not provided, a random ID will be generated. |

### `policysimulator.organizations.locations.orgPolicyViolationsPreviews.generate`

- Versions: v1beta
- `POST https://policysimulator.googleapis.com/v1beta/{+parent}/orgPolicyViolationsPreviews:generate`
- GenerateOrgPolicyViolationsPreview generates an OrgPolicyViolationsPreview for the proposed changes in the provided OrgPolicyViolationsPreview.OrgPolicyOverlay. The changes to OrgPolicy are specified by this `OrgPolicyOverlay`. The resources to scan are inferred from these specified changes.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `GoogleCloudPolicysimulatorV1betaOrgPolicyViolationsPreview`; Response: `GoogleLongrunningOperation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The organization under which this OrgPolicyViolationsPreview will be created. Example: `organizations/my-example-org/locations/global` |

### `policysimulator.organizations.locations.orgPolicyViolationsPreviews.get`

- Versions: v1, v1beta
- `GET https://policysimulator.googleapis.com/v1/{+name}`
- GetOrgPolicyViolationsPreview gets the specified OrgPolicyViolationsPreview. Each OrgPolicyViolationsPreview is available for at least 7 days.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleCloudPolicysimulatorV1OrgPolicyViolationsPreview`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the OrgPolicyViolationsPreview to get. |

### `policysimulator.organizations.locations.orgPolicyViolationsPreviews.list`

- Versions: v1, v1beta
- `GET https://policysimulator.googleapis.com/v1/{+parent}/orgPolicyViolationsPreviews`
- ListOrgPolicyViolationsPreviews lists each OrgPolicyViolationsPreview in an organization. Each OrgPolicyViolationsPreview is available for at least 7 days.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleCloudPolicysimulatorV1ListOrgPolicyViolationsPreviewsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent the violations are scoped to. Format: `organizations/{organization}/locations/{location}` Example: `organizations/my-example-org/locations/global` |
| `pageSize` | query | integer (int32) | no | Optional. The maximum number of items to return. The service may return fewer than this value. If unspecified, at most 5 items will be returned. The maximum value is 10; values above 10 will be coerced to 10. |
| `pageToken` | query | string | no | Optional. A page token, received from a previous call. Provide this to retrieve the subsequent page. When paginating, all other parameters must match the call that provided the page token. |

### `policysimulator.organizations.locations.orgPolicyViolationsPreviews.operations.get`

- Versions: v1, v1beta, v1alpha
- `GET https://policysimulator.googleapis.com/v1/{+name}`
- Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleLongrunningOperation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation resource. |

### `policysimulator.organizations.locations.orgPolicyViolationsPreviews.orgPolicyViolations.list`

- Versions: v1, v1beta
- `GET https://policysimulator.googleapis.com/v1/{+parent}/orgPolicyViolations`
- ListOrgPolicyViolations lists the OrgPolicyViolations that are present in an OrgPolicyViolationsPreview.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleCloudPolicysimulatorV1ListOrgPolicyViolationsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The OrgPolicyViolationsPreview to get OrgPolicyViolations from. Format: organizations/{organization}/locations/{location}/orgPolicyViolationsPreviews/{orgPolicyViolationsPreview} |
| `pageSize` | query | integer (int32) | no | Optional. The maximum number of items to return. The service may return fewer than this value. If unspecified, at most 1000 items will be returned. The maximum value is 1000; values above 1000 will be coerced to 1000. |
| `pageToken` | query | string | no | Optional. A page token, received from a previous call. Provide this to retrieve the subsequent page. When paginating, all other parameters must match the call that provided the page token. |

### `policysimulator.organizations.locations.replays.create`

- Versions: v1, v1beta
- `POST https://policysimulator.googleapis.com/v1/{+parent}/replays`
- Creates and starts a Replay using the given ReplayConfig.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `GoogleCloudPolicysimulatorV1Replay`; Response: `GoogleLongrunningOperation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent resource where this Replay will be created. This resource must be a project, folder, or organization with a location. Example: `projects/my-example-project/locations/global` |

### `policysimulator.organizations.locations.replays.get`

- Versions: v1, v1beta
- `GET https://policysimulator.googleapis.com/v1/{+name}`
- Gets the specified Replay. Each `Replay` is available for at least 7 days.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleCloudPolicysimulatorV1Replay`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the Replay to retrieve, in the following format: `{projects\|folders\|organizations}/{resource-id}/locations/global/replays/{replay-id}`, where `{resource-id}` is the ID of the project, folder, or organization that owns the `Replay`. Example: `projects/my-example-project/locations/global/replays/506a5f7f-38ce-4d7d-8e03-479ce1833c36` |

### `policysimulator.organizations.locations.replays.list`

- Versions: v1beta
- `GET https://policysimulator.googleapis.com/v1beta/{+parent}/replays`
- Lists each Replay in a project, folder, or organization. Each `Replay` is available for at least 7 days.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleCloudPolicysimulatorV1betaListReplaysResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent resource, in the following format: `{projects\|folders\|organizations}/{resource-id}/locations/global`, where `{resource-id}` is the ID of the project, folder, or organization that owns the Replay. Example: `projects/my-example-project/locations/global` Only `Replay` objects that are direct children of the provided parent are listed. In other words, `Replay` objects that are children of a project will not be included when the parent is a folder of that project. |
| `pageSize` | query | integer (int32) | no | The maximum number of Replay objects to return. Defaults to 50. The maximum value is 1000; values above 1000 are rounded down to 1000. |
| `pageToken` | query | string | no | A page token, received from a previous Simulator.ListReplays call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to Simulator.ListReplays must match the call that provided the page token. |

### `policysimulator.organizations.locations.replays.operations.get`

- Versions: v1, v1beta, v1alpha
- `GET https://policysimulator.googleapis.com/v1/{+name}`
- Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleLongrunningOperation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation resource. |

### `policysimulator.organizations.locations.replays.operations.list`

- Versions: v1, v1beta, v1alpha
- `GET https://policysimulator.googleapis.com/v1/{+name}`
- Lists operations that match the specified filter in the request. If the server doesn't support this method, it returns `UNIMPLEMENTED`.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleLongrunningListOperationsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation's parent resource. |
| `filter` | query | string | no | The standard list filter. |
| `pageSize` | query | integer (int32) | no | The standard list page size. |
| `pageToken` | query | string | no | The standard list page token. |
| `returnPartialSuccess` | query | boolean | no | When set to `true`, operations that are reachable are returned as normal, and those that are unreachable are returned in the ListOperationsResponse.unreachable field. This can only be `true` when reading across collections. For example, when `parent` is set to `"projects/example/locations/-"`. This field is not supported by default and will result in an `UNIMPLEMENTED` error if set unless explicitly documented otherwise in service or product specific documentation. |

### `policysimulator.organizations.locations.replays.results.list`

- Versions: v1, v1beta
- `GET https://policysimulator.googleapis.com/v1/{+parent}/results`
- Lists the results of running a Replay.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleCloudPolicysimulatorV1ListReplayResultsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The Replay whose results are listed, in the following format: `{projects\|folders\|organizations}/{resource-id}/locations/global/replays/{replay-id}` Example: `projects/my-project/locations/global/replays/506a5f7f-38ce-4d7d-8e03-479ce1833c36` |
| `pageSize` | query | integer (int32) | no | The maximum number of ReplayResult objects to return. Defaults to 5000. The maximum value is 5000; values above 5000 are rounded down to 5000. |
| `pageToken` | query | string | no | A page token, received from a previous Simulator.ListReplayResults call. Provide this token to retrieve the next page of results. When paginating, all other parameters provided to \[Simulator.ListReplayResults\[\] must match the call that provided the page token. |

### `policysimulator.projects.locations.accessPolicySimulations.operations.get`

- Versions: v1, v1beta, v1alpha
- `GET https://policysimulator.googleapis.com/v1/{+name}`
- Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleLongrunningOperation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation resource. |

### `policysimulator.projects.locations.orgPolicyViolationsPreviews.operations.get`

- Versions: v1, v1beta, v1alpha
- `GET https://policysimulator.googleapis.com/v1/{+name}`
- Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleLongrunningOperation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation resource. |

### `policysimulator.projects.locations.replays.create`

- Versions: v1, v1beta
- `POST https://policysimulator.googleapis.com/v1/{+parent}/replays`
- Creates and starts a Replay using the given ReplayConfig.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `GoogleCloudPolicysimulatorV1Replay`; Response: `GoogleLongrunningOperation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent resource where this Replay will be created. This resource must be a project, folder, or organization with a location. Example: `projects/my-example-project/locations/global` |

### `policysimulator.projects.locations.replays.get`

- Versions: v1, v1beta
- `GET https://policysimulator.googleapis.com/v1/{+name}`
- Gets the specified Replay. Each `Replay` is available for at least 7 days.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleCloudPolicysimulatorV1Replay`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the Replay to retrieve, in the following format: `{projects\|folders\|organizations}/{resource-id}/locations/global/replays/{replay-id}`, where `{resource-id}` is the ID of the project, folder, or organization that owns the `Replay`. Example: `projects/my-example-project/locations/global/replays/506a5f7f-38ce-4d7d-8e03-479ce1833c36` |

### `policysimulator.projects.locations.replays.list`

- Versions: v1beta
- `GET https://policysimulator.googleapis.com/v1beta/{+parent}/replays`
- Lists each Replay in a project, folder, or organization. Each `Replay` is available for at least 7 days.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleCloudPolicysimulatorV1betaListReplaysResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent resource, in the following format: `{projects\|folders\|organizations}/{resource-id}/locations/global`, where `{resource-id}` is the ID of the project, folder, or organization that owns the Replay. Example: `projects/my-example-project/locations/global` Only `Replay` objects that are direct children of the provided parent are listed. In other words, `Replay` objects that are children of a project will not be included when the parent is a folder of that project. |
| `pageSize` | query | integer (int32) | no | The maximum number of Replay objects to return. Defaults to 50. The maximum value is 1000; values above 1000 are rounded down to 1000. |
| `pageToken` | query | string | no | A page token, received from a previous Simulator.ListReplays call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to Simulator.ListReplays must match the call that provided the page token. |

### `policysimulator.projects.locations.replays.operations.get`

- Versions: v1, v1beta, v1alpha
- `GET https://policysimulator.googleapis.com/v1/{+name}`
- Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleLongrunningOperation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation resource. |

### `policysimulator.projects.locations.replays.operations.list`

- Versions: v1, v1beta, v1alpha
- `GET https://policysimulator.googleapis.com/v1/{+name}`
- Lists operations that match the specified filter in the request. If the server doesn't support this method, it returns `UNIMPLEMENTED`.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleLongrunningListOperationsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation's parent resource. |
| `filter` | query | string | no | The standard list filter. |
| `pageSize` | query | integer (int32) | no | The standard list page size. |
| `pageToken` | query | string | no | The standard list page token. |
| `returnPartialSuccess` | query | boolean | no | When set to `true`, operations that are reachable are returned as normal, and those that are unreachable are returned in the ListOperationsResponse.unreachable field. This can only be `true` when reading across collections. For example, when `parent` is set to `"projects/example/locations/-"`. This field is not supported by default and will result in an `UNIMPLEMENTED` error if set unless explicitly documented otherwise in service or product specific documentation. |

### `policysimulator.projects.locations.replays.results.list`

- Versions: v1, v1beta
- `GET https://policysimulator.googleapis.com/v1/{+parent}/results`
- Lists the results of running a Replay.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleCloudPolicysimulatorV1ListReplayResultsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The Replay whose results are listed, in the following format: `{projects\|folders\|organizations}/{resource-id}/locations/global/replays/{replay-id}` Example: `projects/my-project/locations/global/replays/506a5f7f-38ce-4d7d-8e03-479ce1833c36` |
| `pageSize` | query | integer (int32) | no | The maximum number of ReplayResult objects to return. Defaults to 5000. The maximum value is 5000; values above 5000 are rounded down to 5000. |
| `pageToken` | query | string | no | A page token, received from a previous Simulator.ListReplayResults call. Provide this token to retrieve the next page of results. When paginating, all other parameters provided to \[Simulator.ListReplayResults\[\] must match the call that provided the page token. |

### Example request skeleton

Generated from the Discovery entry of `policysimulator.folders.locations.accessPolicySimulations.operations.get` (not in the official docs); replace the `{...}` path variables (URL-encode query values):

```bash
curl -X GET \
  -H "Authorization: Bearer $(gcloud auth print-access-token)" \
  "https://policysimulator.googleapis.com/v1/{+name}"
```

## Notes

- Generated from the Discovery document(s) v1, v1beta, v1alpha of `policysimulator` (retrieved 2026-11-14). Resources on this page: folders, operations, organizations, projects.
- The Required column is `yes` for path variables and required parameters, and `conditional` when the description says "Required if ..." (mutually exclusive alternatives), when a `parent.child` parameter is required only inside an optional parent message or one branch of a oneof. Path variables are always `yes`.
- Message schemas (the request and response types named above) are listed under `references/rest-schemas/policysimulator/`; they are the `schemas` section of the Discovery documents in Source.
- Source: https://policysimulator.googleapis.com/$discovery/rest?version=v1, https://policysimulator.googleapis.com/$discovery/rest?version=v1beta, https://policysimulator.googleapis.com/$discovery/rest?version=v1alpha (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
