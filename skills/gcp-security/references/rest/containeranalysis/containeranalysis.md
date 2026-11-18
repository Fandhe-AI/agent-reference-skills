---
source: https://containeranalysis.googleapis.com/$discovery/rest?version=v1
---

# Container Analysis API REST API (containeranalysis)

## Signature / Usage

Base URL: `https://containeranalysis.googleapis.com`. Methods are listed by `id`; the `Versions` line shows which API versions define the method (preferred: v1).

### `containeranalysis.projects.locations.notes.batchCreate`

- Versions: v1, v1beta1
- `POST https://containeranalysis.googleapis.com/v1/{+parent}/notes:batchCreate`
- Creates new notes in batch.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `BatchCreateNotesRequest`; Response: `BatchCreateNotesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The name of the project in the form of `projects/[PROJECT_ID]`, under which the notes are to be created. |

### `containeranalysis.projects.locations.notes.create`

- Versions: v1, v1beta1
- `POST https://containeranalysis.googleapis.com/v1/{+parent}/notes`
- Creates a new note.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `Note`; Response: `Note`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The name of the project in the form of `projects/[PROJECT_ID]`, under which the note is to be created. |
| `noteId` | query | string | yes | Required. The ID to use for this note. |

### `containeranalysis.projects.locations.notes.delete`

- Versions: v1, v1beta1
- `DELETE https://containeranalysis.googleapis.com/v1/{+name}`
- Deletes the specified note.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the note in the form of `projects/[PROVIDER_ID]/notes/[NOTE_ID]`. |

### `containeranalysis.projects.locations.notes.get`

- Versions: v1, v1beta1
- `GET https://containeranalysis.googleapis.com/v1/{+name}`
- Gets the specified note.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Note`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the note in the form of `projects/[PROVIDER_ID]/notes/[NOTE_ID]`. |

### `containeranalysis.projects.locations.notes.getIamPolicy`

- Versions: v1, v1beta1
- `POST https://containeranalysis.googleapis.com/v1/{+resource}:getIamPolicy`
- Gets the access control policy for a note or an occurrence resource. Requires `containeranalysis.notes.setIamPolicy` or `containeranalysis.occurrences.setIamPolicy` permission if the resource is a note or occurrence, respectively. The resource takes the format `projects/[PROJECT_ID]/notes/[NOTE_ID]` for notes and `projects/[PROJECT_ID]/occurrences/[OCCURRENCE_ID]` for occurrences.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `GetIamPolicyRequest`; Response: `Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `containeranalysis.projects.locations.notes.list`

- Versions: v1, v1beta1
- `GET https://containeranalysis.googleapis.com/v1/{+parent}/notes`
- Lists notes for the specified project.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListNotesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The name of the project to list notes for in the form of `projects/[PROJECT_ID]`. |
| `filter` | query | string | no | The filter expression. |
| `pageSize` | query | integer (int32) | no | Number of notes to return in the list. Must be positive. Max allowed page size is 1000. If not specified, page size defaults to 20. |
| `pageToken` | query | string | no | Token to provide to skip to a particular spot in the list. |
| `returnPartialSuccess` | query | boolean | no | If set, the request will return all reachable Notes and report all unreachable regions in the `unreachable` field in the response. Only applicable for requests in the global region. |

### `containeranalysis.projects.locations.notes.occurrences.list`

- Versions: v1, v1beta1
- `GET https://containeranalysis.googleapis.com/v1/{+name}/occurrences`
- Lists occurrences referencing the specified note. Provider projects can use this method to get all occurrences across consumer projects referencing the specified note.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListNoteOccurrencesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the note to list occurrences for in the form of `projects/[PROVIDER_ID]/notes/[NOTE_ID]`. |
| `filter` | query | string | no | The filter expression. |
| `pageSize` | query | integer (int32) | no | Number of occurrences to return in the list. |
| `pageToken` | query | string | no | Token to provide to skip to a particular spot in the list. |

### `containeranalysis.projects.locations.notes.patch`

- Versions: v1, v1beta1
- `PATCH https://containeranalysis.googleapis.com/v1/{+name}`
- Updates the specified note.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `Note`; Response: `Note`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the note in the form of `projects/[PROVIDER_ID]/notes/[NOTE_ID]`. |
| `updateMask` | query | string (google-fieldmask) | no | The fields to update. |

### `containeranalysis.projects.locations.notes.setIamPolicy`

- Versions: v1, v1beta1
- `POST https://containeranalysis.googleapis.com/v1/{+resource}:setIamPolicy`
- Sets the access control policy on the specified note or occurrence. Requires `containeranalysis.notes.setIamPolicy` or `containeranalysis.occurrences.setIamPolicy` permission if the resource is a note or an occurrence, respectively. The resource takes the format `projects/[PROJECT_ID]/notes/[NOTE_ID]` for notes and `projects/[PROJECT_ID]/occurrences/[OCCURRENCE_ID]` for occurrences.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `SetIamPolicyRequest`; Response: `Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being specified. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `containeranalysis.projects.locations.notes.testIamPermissions`

- Versions: v1, v1beta1
- `POST https://containeranalysis.googleapis.com/v1/{+resource}:testIamPermissions`
- Returns the permissions that a caller has on the specified note or occurrence. Requires list permission on the project (for example, `containeranalysis.notes.list`). The resource takes the format `projects/[PROJECT_ID]/notes/[NOTE_ID]` for notes and `projects/[PROJECT_ID]/occurrences/[OCCURRENCE_ID]` for occurrences.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `TestIamPermissionsRequest`; Response: `TestIamPermissionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy detail is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `containeranalysis.projects.locations.occurrences.batchCreate`

- Versions: v1, v1beta1
- `POST https://containeranalysis.googleapis.com/v1/{+parent}/occurrences:batchCreate`
- Creates new occurrences in batch.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `BatchCreateOccurrencesRequest`; Response: `BatchCreateOccurrencesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The name of the project in the form of `projects/[PROJECT_ID]`, under which the occurrences are to be created. |

### `containeranalysis.projects.locations.occurrences.create`

- Versions: v1, v1beta1
- `POST https://containeranalysis.googleapis.com/v1/{+parent}/occurrences`
- Creates a new occurrence.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `Occurrence`; Response: `Occurrence`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The name of the project in the form of `projects/[PROJECT_ID]`, under which the occurrence is to be created. |

### `containeranalysis.projects.locations.occurrences.delete`

- Versions: v1, v1beta1
- `DELETE https://containeranalysis.googleapis.com/v1/{+name}`
- Deletes the specified occurrence. For example, use this method to delete an occurrence when the occurrence is no longer applicable for the given resource.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the occurrence in the form of `projects/[PROJECT_ID]/occurrences/[OCCURRENCE_ID]`. |

### `containeranalysis.projects.locations.occurrences.get`

- Versions: v1, v1beta1
- `GET https://containeranalysis.googleapis.com/v1/{+name}`
- Gets the specified occurrence.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Occurrence`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the occurrence in the form of `projects/[PROJECT_ID]/occurrences/[OCCURRENCE_ID]`. |

### `containeranalysis.projects.locations.occurrences.getIamPolicy`

- Versions: v1, v1beta1
- `POST https://containeranalysis.googleapis.com/v1/{+resource}:getIamPolicy`
- Gets the access control policy for a note or an occurrence resource. Requires `containeranalysis.notes.setIamPolicy` or `containeranalysis.occurrences.setIamPolicy` permission if the resource is a note or occurrence, respectively. The resource takes the format `projects/[PROJECT_ID]/notes/[NOTE_ID]` for notes and `projects/[PROJECT_ID]/occurrences/[OCCURRENCE_ID]` for occurrences.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `GetIamPolicyRequest`; Response: `Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `containeranalysis.projects.locations.occurrences.getNotes`

- Versions: v1, v1beta1
- `GET https://containeranalysis.googleapis.com/v1/{+name}/notes`
- Gets the note attached to the specified occurrence. Consumer projects can use this method to get a note that belongs to a provider project.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Note`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the occurrence in the form of `projects/[PROJECT_ID]/occurrences/[OCCURRENCE_ID]`. |

### `containeranalysis.projects.locations.occurrences.getVulnerabilitySummary`

- Versions: v1, v1beta1
- `GET https://containeranalysis.googleapis.com/v1/{+parent}/occurrences:vulnerabilitySummary`
- Gets a summary of the number and severity of occurrences.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `VulnerabilityOccurrencesSummary`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The name of the project to get a vulnerability summary for in the form of `projects/[PROJECT_ID]`. |
| `filter` | query | string | no | The filter expression. |
| `returnPartialSuccess` | query | boolean | no | If set, the request will return all reachable occurrence summaries and report all unreachable regions in the `unreachable` field in the response. Only applicable for requests in the global region. |

### `containeranalysis.projects.locations.occurrences.list`

- Versions: v1, v1beta1
- `GET https://containeranalysis.googleapis.com/v1/{+parent}/occurrences`
- Lists occurrences for the specified project.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListOccurrencesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The name of the project to list occurrences for in the form of `projects/[PROJECT_ID]`. |
| `filter` | query | string | no | The filter expression. |
| `pageSize` | query | integer (int32) | no | Number of occurrences to return in the list. Must be positive. Max allowed page size is 1000. If not specified, page size defaults to 20. |
| `pageToken` | query | string | no | Token to provide to skip to a particular spot in the list. |
| `returnPartialSuccess` | query | boolean | no | If set, the request will return all reachable Occurrences and report all unreachable regions in the `unreachable` field in the response. Only applicable for requests in the global region. |

### `containeranalysis.projects.locations.occurrences.patch`

- Versions: v1, v1beta1
- `PATCH https://containeranalysis.googleapis.com/v1/{+name}`
- Updates the specified occurrence.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `Occurrence`; Response: `Occurrence`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the occurrence in the form of `projects/[PROJECT_ID]/occurrences/[OCCURRENCE_ID]`. |
| `updateMask` | query | string (google-fieldmask) | no | The fields to update. |

### `containeranalysis.projects.locations.occurrences.setIamPolicy`

- Versions: v1, v1beta1
- `POST https://containeranalysis.googleapis.com/v1/{+resource}:setIamPolicy`
- Sets the access control policy on the specified note or occurrence. Requires `containeranalysis.notes.setIamPolicy` or `containeranalysis.occurrences.setIamPolicy` permission if the resource is a note or an occurrence, respectively. The resource takes the format `projects/[PROJECT_ID]/notes/[NOTE_ID]` for notes and `projects/[PROJECT_ID]/occurrences/[OCCURRENCE_ID]` for occurrences.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `SetIamPolicyRequest`; Response: `Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being specified. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `containeranalysis.projects.locations.occurrences.testIamPermissions`

- Versions: v1, v1beta1
- `POST https://containeranalysis.googleapis.com/v1/{+resource}:testIamPermissions`
- Returns the permissions that a caller has on the specified note or occurrence. Requires list permission on the project (for example, `containeranalysis.notes.list`). The resource takes the format `projects/[PROJECT_ID]/notes/[NOTE_ID]` for notes and `projects/[PROJECT_ID]/occurrences/[OCCURRENCE_ID]` for occurrences.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `TestIamPermissionsRequest`; Response: `TestIamPermissionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy detail is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `containeranalysis.projects.locations.resources.exportSBOM`

- Versions: v1, v1beta1
- `POST https://containeranalysis.googleapis.com/v1/{+name}:exportSBOM`
- Generates an SBOM for the given resource.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `ExportSBOMRequest`; Response: `ExportSBOMResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the resource in the form of `projects/[PROJECT_ID]/resources/[RESOURCE_URL]`. |

### `containeranalysis.projects.locations.resources.generatePackagesSummary`

- Versions: v1beta1
- `POST https://containeranalysis.googleapis.com/v1beta1/{+name}:generatePackagesSummary`
- Gets a summary of the packages within a given resource.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `GeneratePackagesSummaryRequest`; Response: `PackagesSummaryResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the resource to get a packages summary for in the form of `projects/[PROJECT_ID]/resources/[RESOURCE_URL]`. |

### `containeranalysis.projects.notes.batchCreate`

- Versions: v1, v1beta1
- `POST https://containeranalysis.googleapis.com/v1/{+parent}/notes:batchCreate`
- Creates new notes in batch.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `BatchCreateNotesRequest`; Response: `BatchCreateNotesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The name of the project in the form of `projects/[PROJECT_ID]`, under which the notes are to be created. |

### `containeranalysis.projects.notes.create`

- Versions: v1, v1beta1, v1alpha1
- `POST https://containeranalysis.googleapis.com/v1/{+parent}/notes`
- Creates a new note.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `Note`; Response: `Note`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The name of the project in the form of `projects/[PROJECT_ID]`, under which the note is to be created. |
| `noteId` | query | string | yes | Required. The ID to use for this note. |

### `containeranalysis.projects.notes.delete`

- Versions: v1, v1beta1, v1alpha1
- `DELETE https://containeranalysis.googleapis.com/v1/{+name}`
- Deletes the specified note.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the note in the form of `projects/[PROVIDER_ID]/notes/[NOTE_ID]`. |

### `containeranalysis.projects.notes.get`

- Versions: v1, v1beta1, v1alpha1
- `GET https://containeranalysis.googleapis.com/v1/{+name}`
- Gets the specified note.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Note`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the note in the form of `projects/[PROVIDER_ID]/notes/[NOTE_ID]`. |

### `containeranalysis.projects.notes.getIamPolicy`

- Versions: v1, v1beta1, v1alpha1
- `POST https://containeranalysis.googleapis.com/v1/{+resource}:getIamPolicy`
- Gets the access control policy for a note or an occurrence resource. Requires `containeranalysis.notes.setIamPolicy` or `containeranalysis.occurrences.setIamPolicy` permission if the resource is a note or occurrence, respectively. The resource takes the format `projects/[PROJECT_ID]/notes/[NOTE_ID]` for notes and `projects/[PROJECT_ID]/occurrences/[OCCURRENCE_ID]` for occurrences.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `GetIamPolicyRequest`; Response: `Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `containeranalysis.projects.notes.list`

- Versions: v1, v1beta1, v1alpha1
- `GET https://containeranalysis.googleapis.com/v1/{+parent}/notes`
- Lists notes for the specified project.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListNotesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The name of the project to list notes for in the form of `projects/[PROJECT_ID]`. |
| `filter` | query | string | no | The filter expression. |
| `pageSize` | query | integer (int32) | no | Number of notes to return in the list. Must be positive. Max allowed page size is 1000. If not specified, page size defaults to 20. |
| `pageToken` | query | string | no | Token to provide to skip to a particular spot in the list. |
| `returnPartialSuccess` | query | boolean | no | If set, the request will return all reachable Notes and report all unreachable regions in the `unreachable` field in the response. Only applicable for requests in the global region. |

### `containeranalysis.projects.notes.occurrences.list`

- Versions: v1, v1beta1, v1alpha1
- `GET https://containeranalysis.googleapis.com/v1/{+name}/occurrences`
- Lists occurrences referencing the specified note. Provider projects can use this method to get all occurrences across consumer projects referencing the specified note.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListNoteOccurrencesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the note to list occurrences for in the form of `projects/[PROVIDER_ID]/notes/[NOTE_ID]`. |
| `filter` | query | string | no | The filter expression. |
| `pageSize` | query | integer (int32) | no | Number of occurrences to return in the list. |
| `pageToken` | query | string | no | Token to provide to skip to a particular spot in the list. |

### `containeranalysis.projects.notes.patch`

- Versions: v1, v1beta1, v1alpha1
- `PATCH https://containeranalysis.googleapis.com/v1/{+name}`
- Updates the specified note.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `Note`; Response: `Note`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the note in the form of `projects/[PROVIDER_ID]/notes/[NOTE_ID]`. |
| `updateMask` | query | string (google-fieldmask) | no | The fields to update. |

### `containeranalysis.projects.notes.setIamPolicy`

- Versions: v1, v1beta1, v1alpha1
- `POST https://containeranalysis.googleapis.com/v1/{+resource}:setIamPolicy`
- Sets the access control policy on the specified note or occurrence. Requires `containeranalysis.notes.setIamPolicy` or `containeranalysis.occurrences.setIamPolicy` permission if the resource is a note or an occurrence, respectively. The resource takes the format `projects/[PROJECT_ID]/notes/[NOTE_ID]` for notes and `projects/[PROJECT_ID]/occurrences/[OCCURRENCE_ID]` for occurrences.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `SetIamPolicyRequest`; Response: `Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being specified. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `containeranalysis.projects.notes.testIamPermissions`

- Versions: v1, v1beta1, v1alpha1
- `POST https://containeranalysis.googleapis.com/v1/{+resource}:testIamPermissions`
- Returns the permissions that a caller has on the specified note or occurrence. Requires list permission on the project (for example, `containeranalysis.notes.list`). The resource takes the format `projects/[PROJECT_ID]/notes/[NOTE_ID]` for notes and `projects/[PROJECT_ID]/occurrences/[OCCURRENCE_ID]` for occurrences.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `TestIamPermissionsRequest`; Response: `TestIamPermissionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy detail is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `containeranalysis.projects.occurrences.batchCreate`

- Versions: v1, v1beta1
- `POST https://containeranalysis.googleapis.com/v1/{+parent}/occurrences:batchCreate`
- Creates new occurrences in batch.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `BatchCreateOccurrencesRequest`; Response: `BatchCreateOccurrencesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The name of the project in the form of `projects/[PROJECT_ID]`, under which the occurrences are to be created. |

### `containeranalysis.projects.occurrences.create`

- Versions: v1, v1beta1, v1alpha1
- `POST https://containeranalysis.googleapis.com/v1/{+parent}/occurrences`
- Creates a new occurrence.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `Occurrence`; Response: `Occurrence`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The name of the project in the form of `projects/[PROJECT_ID]`, under which the occurrence is to be created. |

### `containeranalysis.projects.occurrences.delete`

- Versions: v1, v1beta1, v1alpha1
- `DELETE https://containeranalysis.googleapis.com/v1/{+name}`
- Deletes the specified occurrence. For example, use this method to delete an occurrence when the occurrence is no longer applicable for the given resource.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the occurrence in the form of `projects/[PROJECT_ID]/occurrences/[OCCURRENCE_ID]`. |

### `containeranalysis.projects.occurrences.get`

- Versions: v1, v1beta1, v1alpha1
- `GET https://containeranalysis.googleapis.com/v1/{+name}`
- Gets the specified occurrence.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Occurrence`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the occurrence in the form of `projects/[PROJECT_ID]/occurrences/[OCCURRENCE_ID]`. |

### `containeranalysis.projects.occurrences.getIamPolicy`

- Versions: v1, v1beta1, v1alpha1
- `POST https://containeranalysis.googleapis.com/v1/{+resource}:getIamPolicy`
- Gets the access control policy for a note or an occurrence resource. Requires `containeranalysis.notes.setIamPolicy` or `containeranalysis.occurrences.setIamPolicy` permission if the resource is a note or occurrence, respectively. The resource takes the format `projects/[PROJECT_ID]/notes/[NOTE_ID]` for notes and `projects/[PROJECT_ID]/occurrences/[OCCURRENCE_ID]` for occurrences.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `GetIamPolicyRequest`; Response: `Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `containeranalysis.projects.occurrences.getNotes`

- Versions: v1, v1beta1, v1alpha1
- `GET https://containeranalysis.googleapis.com/v1/{+name}/notes`
- Gets the note attached to the specified occurrence. Consumer projects can use this method to get a note that belongs to a provider project.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Note`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the occurrence in the form of `projects/[PROJECT_ID]/occurrences/[OCCURRENCE_ID]`. |

### `containeranalysis.projects.occurrences.getVulnerabilitySummary`

- Versions: v1, v1beta1, v1alpha1
- `GET https://containeranalysis.googleapis.com/v1/{+parent}/occurrences:vulnerabilitySummary`
- Gets a summary of the number and severity of occurrences.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `VulnerabilityOccurrencesSummary`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The name of the project to get a vulnerability summary for in the form of `projects/[PROJECT_ID]`. |
| `filter` | query | string | no | The filter expression. |
| `returnPartialSuccess` | query | boolean | no | If set, the request will return all reachable occurrence summaries and report all unreachable regions in the `unreachable` field in the response. Only applicable for requests in the global region. |

### `containeranalysis.projects.occurrences.list`

- Versions: v1, v1beta1, v1alpha1
- `GET https://containeranalysis.googleapis.com/v1/{+parent}/occurrences`
- Lists occurrences for the specified project.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListOccurrencesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The name of the project to list occurrences for in the form of `projects/[PROJECT_ID]`. |
| `filter` | query | string | no | The filter expression. |
| `pageSize` | query | integer (int32) | no | Number of occurrences to return in the list. Must be positive. Max allowed page size is 1000. If not specified, page size defaults to 20. |
| `pageToken` | query | string | no | Token to provide to skip to a particular spot in the list. |
| `returnPartialSuccess` | query | boolean | no | If set, the request will return all reachable Occurrences and report all unreachable regions in the `unreachable` field in the response. Only applicable for requests in the global region. |

### `containeranalysis.projects.occurrences.patch`

- Versions: v1, v1beta1, v1alpha1
- `PATCH https://containeranalysis.googleapis.com/v1/{+name}`
- Updates the specified occurrence.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `Occurrence`; Response: `Occurrence`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the occurrence in the form of `projects/[PROJECT_ID]/occurrences/[OCCURRENCE_ID]`. |
| `updateMask` | query | string (google-fieldmask) | no | The fields to update. |

### `containeranalysis.projects.occurrences.setIamPolicy`

- Versions: v1, v1beta1, v1alpha1
- `POST https://containeranalysis.googleapis.com/v1/{+resource}:setIamPolicy`
- Sets the access control policy on the specified note or occurrence. Requires `containeranalysis.notes.setIamPolicy` or `containeranalysis.occurrences.setIamPolicy` permission if the resource is a note or an occurrence, respectively. The resource takes the format `projects/[PROJECT_ID]/notes/[NOTE_ID]` for notes and `projects/[PROJECT_ID]/occurrences/[OCCURRENCE_ID]` for occurrences.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `SetIamPolicyRequest`; Response: `Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being specified. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `containeranalysis.projects.occurrences.testIamPermissions`

- Versions: v1, v1beta1, v1alpha1
- `POST https://containeranalysis.googleapis.com/v1/{+resource}:testIamPermissions`
- Returns the permissions that a caller has on the specified note or occurrence. Requires list permission on the project (for example, `containeranalysis.notes.list`). The resource takes the format `projects/[PROJECT_ID]/notes/[NOTE_ID]` for notes and `projects/[PROJECT_ID]/occurrences/[OCCURRENCE_ID]` for occurrences.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `TestIamPermissionsRequest`; Response: `TestIamPermissionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy detail is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `containeranalysis.projects.operations.create`

- Versions: v1alpha1
- `POST https://containeranalysis.googleapis.com/v1alpha1/{+parent}/operations`
- Creates a new `Operation`.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `CreateOperationRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | The project Id that this operation should be created under. |

### `containeranalysis.projects.operations.patch`

- Versions: v1alpha1
- `PATCH https://containeranalysis.googleapis.com/v1alpha1/{+name}`
- Updates an existing operation returns an error if operation does not exist. The only valid operations are to update mark the done bit change the result.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `UpdateOperationRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the Operation. Should be of the form "projects/{provider_id}/operations/{operation_id}". |

### `containeranalysis.projects.resources.exportSBOM`

- Versions: v1, v1beta1
- `POST https://containeranalysis.googleapis.com/v1/{+name}:exportSBOM`
- Generates an SBOM for the given resource.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `ExportSBOMRequest`; Response: `ExportSBOMResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the resource in the form of `projects/[PROJECT_ID]/resources/[RESOURCE_URL]`. |

### `containeranalysis.projects.resources.generatePackagesSummary`

- Versions: v1beta1
- `POST https://containeranalysis.googleapis.com/v1beta1/{+name}:generatePackagesSummary`
- Gets a summary of the packages within a given resource.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `GeneratePackagesSummaryRequest`; Response: `PackagesSummaryResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the resource to get a packages summary for in the form of `projects/[PROJECT_ID]/resources/[RESOURCE_URL]`. |

### `containeranalysis.projects.scanConfigs.get`

- Versions: v1alpha1
- `GET https://containeranalysis.googleapis.com/v1alpha1/{+name}`
- Gets a specific scan configuration for a project.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ScanConfig`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the ScanConfig in the form projects/{project_id}/scanConfigs/{scan_config_id} |

### `containeranalysis.projects.scanConfigs.list`

- Versions: v1alpha1
- `GET https://containeranalysis.googleapis.com/v1alpha1/{+parent}/scanConfigs`
- Lists scan configurations for a project.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListScanConfigsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | This containers the project Id i.e.: projects/{project_id} |
| `filter` | query | string | no | The filter expression. |
| `pageSize` | query | integer (int32) | no | The number of items to return. |
| `pageToken` | query | string | no | The page token to use for the next request. |

### `containeranalysis.projects.scanConfigs.patch`

- Versions: v1alpha1
- `PATCH https://containeranalysis.googleapis.com/v1alpha1/{+name}`
- Updates the scan configuration to a new value.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `ScanConfig`; Response: `ScanConfig`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The scan config to update of the form projects/{project_id}/scanConfigs/{scan_config_id}. |
| `updateMask` | query | string (google-fieldmask) | no | The fields to update. |

### `containeranalysis.providers.notes.create`

- Versions: v1alpha1
- `POST https://containeranalysis.googleapis.com/v1alpha1/{+name}/notes`
- Creates a new `Note`.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `Note`; Response: `Note`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the project. Should be of the form "providers/{provider_id}". @Deprecated |
| `noteId` | query | string | no | The ID to use for this note. |
| `parent` | query | string | no | This field contains the project Id for example: "projects/{project_id} |

### `containeranalysis.providers.notes.delete`

- Versions: v1alpha1
- `DELETE https://containeranalysis.googleapis.com/v1alpha1/{+name}`
- Deletes the given `Note` from the system.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the note in the form of "providers/{provider_id}/notes/{NOTE_ID}" |

### `containeranalysis.providers.notes.get`

- Versions: v1alpha1
- `GET https://containeranalysis.googleapis.com/v1alpha1/{+name}`
- Returns the requested `Note`.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Note`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the note in the form of "providers/{provider_id}/notes/{NOTE_ID}" |

### `containeranalysis.providers.notes.getIamPolicy`

- Versions: v1alpha1
- `POST https://containeranalysis.googleapis.com/v1alpha1/{+resource}:getIamPolicy`
- Gets the access control policy for a note or an `Occurrence` resource. Requires `containeranalysis.notes.setIamPolicy` or `containeranalysis.occurrences.setIamPolicy` permission if the resource is a note or occurrence, respectively. Attempting to call this method on a resource without the required permission will result in a `PERMISSION_DENIED` error. Attempting to call this method on a non-existent resource will result in a `NOT_FOUND` error if the user has list permission on the project, or a `PERMISSION_DENIED` error otherwise. The resource takes the following formats: `projects/{PROJECT_ID}/occurrences/{OCCURRENCE_ID}` for occurrences and projects/{PROJECT_ID}/notes/{NOTE_ID} for notes
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `GetIamPolicyRequest`; Response: `Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `containeranalysis.providers.notes.list`

- Versions: v1alpha1
- `GET https://containeranalysis.googleapis.com/v1alpha1/{+name}/notes`
- Lists all `Notes` for a given project.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListNotesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name field will contain the project Id for example: "providers/{provider_id} @Deprecated |
| `filter` | query | string | no | The filter expression. |
| `pageSize` | query | integer (int32) | no | Number of notes to return in the list. |
| `pageToken` | query | string | no | Token to provide to skip to a particular spot in the list. |
| `parent` | query | string | no | This field contains the project Id for example: "projects/{PROJECT_ID}". |

### `containeranalysis.providers.notes.occurrences.list`

- Versions: v1alpha1
- `GET https://containeranalysis.googleapis.com/v1alpha1/{+name}/occurrences`
- Lists `Occurrences` referencing the specified `Note`. Use this method to get all occurrences referencing your `Note` across all your customer projects.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListNoteOccurrencesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name field will contain the note name for example: "provider/{provider_id}/notes/{note_id}" |
| `filter` | query | string | no | The filter expression. |
| `pageSize` | query | integer (int32) | no | Number of notes to return in the list. |
| `pageToken` | query | string | no | Token to provide to skip to a particular spot in the list. |

### `containeranalysis.providers.notes.patch`

- Versions: v1alpha1
- `PATCH https://containeranalysis.googleapis.com/v1alpha1/{+name}`
- Updates an existing `Note`.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `Note`; Response: `Note`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the note. Should be of the form "projects/{provider_id}/notes/{note_id}". |
| `updateMask` | query | string (google-fieldmask) | no | The fields to update. |

### `containeranalysis.providers.notes.setIamPolicy`

- Versions: v1alpha1
- `POST https://containeranalysis.googleapis.com/v1alpha1/{+resource}:setIamPolicy`
- Sets the access control policy on the specified `Note` or `Occurrence`. Requires `containeranalysis.notes.setIamPolicy` or `containeranalysis.occurrences.setIamPolicy` permission if the resource is a `Note` or an `Occurrence`, respectively. Attempting to call this method without these permissions will result in a ` `PERMISSION_DENIED` error. Attempting to call this method on a non-existent resource will result in a `NOT_FOUND` error if the user has `containeranalysis.notes.list` permission on a `Note` or `containeranalysis.occurrences.list` on an `Occurrence`, or a `PERMISSION_DENIED` error otherwise. The resource takes the following formats: `projects/{projectid}/occurrences/{occurrenceid}\` for occurrences and projects/{projectid}/notes/{noteid} for notes
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `SetIamPolicyRequest`; Response: `Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being specified. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `containeranalysis.providers.notes.testIamPermissions`

- Versions: v1alpha1
- `POST https://containeranalysis.googleapis.com/v1alpha1/{+resource}:testIamPermissions`
- Returns the permissions that a caller has on the specified note or occurrence resource. Requires list permission on the project (for example, "storage.objects.list" on the containing bucket for testing permission of an object). Attempting to call this method on a non-existent resource will result in a `NOT_FOUND` error if the user has list permission on the project, or a `PERMISSION_DENIED` error otherwise. The resource takes the following formats: `projects/{PROJECT_ID}/occurrences/{OCCURRENCE_ID}` for `Occurrences` and `projects/{PROJECT_ID}/notes/{NOTE_ID}` for `Notes`
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `TestIamPermissionsRequest`; Response: `TestIamPermissionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy detail is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### Example request skeleton

Generated from the Discovery entry of `containeranalysis.projects.locations.notes.get` (not in the official docs); replace the `{...}` path variables (URL-encode query values):

```bash
curl -X GET \
  -H "Authorization: Bearer $(gcloud auth print-access-token)" \
  "https://containeranalysis.googleapis.com/v1/{+name}"
```

## Notes

- Generated from the Discovery document(s) v1, v1beta1, v1alpha1 of `containeranalysis` (retrieved 2026-11-14). Resources on this page: projects, providers.
- The Required column is `yes` for path variables and required parameters, and `conditional` when the description says "Required if ..." (mutually exclusive alternatives), when a `parent.child` parameter is required only inside an optional parent message or one branch of a oneof. Path variables are `yes` unless a note below names an alternative route without them.
- Message schemas (the request and response types named above) are listed under `references/rest-schemas/containeranalysis/`; they are the `schemas` section of the Discovery documents in Source.
- Source: https://containeranalysis.googleapis.com/$discovery/rest?version=v1, https://containeranalysis.googleapis.com/$discovery/rest?version=v1beta1, https://containeranalysis.googleapis.com/$discovery/rest?version=v1alpha1 (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
