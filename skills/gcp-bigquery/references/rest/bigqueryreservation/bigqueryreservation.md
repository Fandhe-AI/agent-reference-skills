---
source: https://bigqueryreservation.googleapis.com/$discovery/rest?version=v1
---

# BigQuery Reservation API REST API (bigqueryreservation)

## Signature / Usage

Base URL: `https://bigqueryreservation.googleapis.com`. Methods are listed by `id`; the `Versions` line shows which API versions define the method (preferred: v1). The URL and parameters shown for a method come from the first version on its `Versions` line; a request or response type marked with a version, such as `Type` (v1), applies to that version and links to the definition of that version, a type marked "same fields in ..." has one definition for those versions, but the types it references differ by version, and an unmarked type is the same in every listed version, including the types it references. For the URL and parameters of another version, see the Discovery document of that version under Source in Notes.

### `bigqueryreservation.projects.locations.capacityCommitments.create`

- Versions: v1
- `POST https://bigqueryreservation.googleapis.com/v1/{+parent}/capacityCommitments`
- Creates a new capacity commitment resource.
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`
- Request: `CapacityCommitment`; Response: `CapacityCommitment`

### `bigqueryreservation.projects.locations.capacityCommitments.delete`

- Versions: v1
- `DELETE https://bigqueryreservation.googleapis.com/v1/{+name}`
- Deletes a capacity commitment. Attempting to delete capacity commitment before its commitment_end_time will fail with the error code `google.rpc.Code.FAILED_PRECONDITION`.
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Empty`

### `bigqueryreservation.projects.locations.capacityCommitments.get`

- Versions: v1
- `GET https://bigqueryreservation.googleapis.com/v1/{+name}`
- Returns information about the capacity commitment.
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `CapacityCommitment`

### `bigqueryreservation.projects.locations.capacityCommitments.list`

- Versions: v1
- `GET https://bigqueryreservation.googleapis.com/v1/{+parent}/capacityCommitments`
- Lists all the capacity commitments for the admin project, in the parent `projects/{projectsId}/locations/{locationsId}`. (Corrected from the Discovery document; the original description is quoted in Notes.)
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListCapacityCommitmentsResponse`

### `bigqueryreservation.projects.locations.capacityCommitments.merge`

- Versions: v1
- `POST https://bigqueryreservation.googleapis.com/v1/{+parent}/capacityCommitments:merge`
- Merges capacity commitments of the same plan into a single commitment. The resulting capacity commitment has the greater commitment_end_time out of the to-be-merged capacity commitments. Attempting to merge capacity commitments of different plan will fail with the error code `google.rpc.Code.FAILED_PRECONDITION`.
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`
- Request: `MergeCapacityCommitmentsRequest`; Response: `CapacityCommitment`

### `bigqueryreservation.projects.locations.capacityCommitments.patch`

- Versions: v1
- `PATCH https://bigqueryreservation.googleapis.com/v1/{+name}`
- Updates an existing capacity commitment. Only `plan` and `renewal_plan` fields can be updated. Plan can only be changed to a plan of a longer commitment period. Attempting to change to a plan with shorter commitment period will fail with the error code `google.rpc.Code.FAILED_PRECONDITION`.
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`
- Request: `CapacityCommitment`; Response: `CapacityCommitment`

### `bigqueryreservation.projects.locations.capacityCommitments.split`

- Versions: v1
- `POST https://bigqueryreservation.googleapis.com/v1/{+name}:split`
- Splits capacity commitment to two commitments of the same plan and `commitment_end_time`. A common use case is to enable downgrading commitments. For example, in order to downgrade from 10000 slots to 8000, you might split a 10000 capacity commitment into commitments of 2000 and 8000. Then, you delete the first one after the commitment end time passes.
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`
- Request: `SplitCapacityCommitmentRequest`; Response: `SplitCapacityCommitmentResponse`

### `bigqueryreservation.projects.locations.getBiReservation`

- Versions: v1
- `GET https://bigqueryreservation.googleapis.com/v1/{+name}`
- Retrieves a BI reservation.
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `BiReservation`

### `bigqueryreservation.projects.locations.reservationGroups.create`

- Versions: v1
- `POST https://bigqueryreservation.googleapis.com/v1/{+parent}/reservationGroups`
- Creates a new reservation group.
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`
- Request: `ReservationGroup`; Response: `ReservationGroup`

### `bigqueryreservation.projects.locations.reservationGroups.delete`

- Versions: v1
- `DELETE https://bigqueryreservation.googleapis.com/v1/{+name}`
- Deletes the reservation group that `name` names (`projects/{project}/locations/{location}/reservationGroups/{reservationGroup}`, from the path pattern). For a reservation, use `bigqueryreservation.projects.locations.reservations.delete`. The failure conditions of deleting a reservation group are not documented in the Discovery document or the proto (see Notes). (Corrected from the Discovery document; the original description is quoted in Notes.)
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Empty`

### `bigqueryreservation.projects.locations.reservationGroups.get`

- Versions: v1
- `GET https://bigqueryreservation.googleapis.com/v1/{+name}`
- Returns information about the reservation group.
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ReservationGroup`

### `bigqueryreservation.projects.locations.reservationGroups.list`

- Versions: v1
- `GET https://bigqueryreservation.googleapis.com/v1/{+parent}/reservationGroups`
- Lists all the reservation groups for the project in the specified location.
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListReservationGroupsResponse`

### `bigqueryreservation.projects.locations.reservationGroups.patch`

- Versions: v1
- `PATCH https://bigqueryreservation.googleapis.com/v1/{+name}`
- Updates an existing reservation group resource.
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`
- Request: `ReservationGroup`; Response: `ReservationGroup`

### `bigqueryreservation.projects.locations.reservations.assignments.create`

- Versions: v1
- `POST https://bigqueryreservation.googleapis.com/v1/{+parent}/assignments`
- Creates an assignment object which allows the given project to submit jobs of a certain type using slots from the specified reservation. Currently a resource (project, folder, organization) can only have one assignment per each (job_type, location) combination, and that reservation will be used for all jobs of the matching type. Different assignments can be created on different levels of the projects, folders or organization hierarchy. During query execution, the assignment is looked up at the project, folder and organization levels in that order. The first assignment found is applied to the query. When creating assignments, it does not matter if other assignments exist at higher levels. Example: \* The organization `organizationA` contains two projects, `project1` and `project2`. \* Assignments for all three entities (`organizationA`, `project1`, and `project2`) could all be created and mapped to the same or different reservations. "None" assignments represent an absence of the assignment. Projects assigned to None use on-demand pricing. To create a "None" assignment, use "none" as a reservation_id in the parent. Example parent: `projects/myproject/locations/US/reservations/none`. Returns `google.rpc.Code.PERMISSION_DENIED` if user does not have 'bigquery.admin' permissions on the project using the reservation and the project that owns this reservation. Returns `google.rpc.Code.INVALID_ARGUMENT` when location of the assignment does not match location of the reservation.
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`
- Request: `Assignment`; Response: `Assignment`

### `bigqueryreservation.projects.locations.reservations.assignments.delete`

- Versions: v1
- `DELETE https://bigqueryreservation.googleapis.com/v1/{+name}`
- Deletes a assignment. No expansion will happen. Example: \* Organization `organizationA` contains two projects, `project1` and `project2`. \* Reservation `res1` exists and was created previously. \* CreateAssignment was used previously to define the following associations between entities and reservations: `<organizationA, res1>` and `<project1, res1>` In this example, deletion of the `<organizationA, res1>` assignment won't affect the other assignment `<project1, res1>`. After said deletion, queries from `project1` will still use `res1` while queries from `project2` will switch to use on-demand mode.
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Empty`

### `bigqueryreservation.projects.locations.reservations.assignments.getIamPolicy`

- Versions: v1
- `GET https://bigqueryreservation.googleapis.com/v1/{+resource}:getIamPolicy`
- Gets the access control policy of the reservation assignment that `resource` names (`projects/{project}/locations/{location}/reservations/{reservation}/assignments/{assignment}`, from the path pattern). May return: a `NOT_FOUND` error if the resource doesn't exist or you don't have the permission to view it; an empty policy if the resource exists but doesn't have a set policy. For the reservation itself, use `bigqueryreservation.projects.locations.reservations.getIamPolicy`. The IAM roles reference lists no `getIamPolicy` permission for reservation assignments (see Notes). (Corrected from the Discovery document; the original description is quoted in Notes.)
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Policy`

### `bigqueryreservation.projects.locations.reservations.assignments.list`

- Versions: v1
- `GET https://bigqueryreservation.googleapis.com/v1/{+parent}/assignments`
- Lists assignments. Only explicitly created assignments will be returned. Example: \* Organization `organizationA` contains two projects, `project1` and `project2`. \* Reservation `res1` exists and was created previously. \* CreateAssignment was used previously to define the following associations between entities and reservations: `<organizationA, res1>` and `<project1, res1>` In this example, ListAssignments will just return the above two assignments for reservation `res1`, and no expansion/merge will happen. The wildcard "-" can be used for reservations in the request. In that case all assignments belongs to the specified project and location will be listed. \*\*Note\*\* "-" cannot be used for projects nor locations.
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListAssignmentsResponse`

### `bigqueryreservation.projects.locations.reservations.assignments.move`

- Versions: v1
- `POST https://bigqueryreservation.googleapis.com/v1/{+name}:move`
- Moves an assignment under a new reservation. This differs from removing an existing assignment and recreating a new one by providing a transactional change that ensures an assignee always has an associated reservation.
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`
- Request: `MoveAssignmentRequest`; Response: `Assignment`

### `bigqueryreservation.projects.locations.reservations.assignments.patch`

- Versions: v1
- `PATCH https://bigqueryreservation.googleapis.com/v1/{+name}`
- Updates an existing assignment. Only the `priority` field can be updated.
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`
- Request: `Assignment`; Response: `Assignment`

### `bigqueryreservation.projects.locations.reservations.assignments.setIamPolicy`

- Versions: v1
- `POST https://bigqueryreservation.googleapis.com/v1/{+resource}:setIamPolicy`
- Route for the reservation assignment that `resource` names (`projects/{project}/locations/{location}/reservations/{reservation}/assignments/{assignment}`, from the path pattern; the proto declares it as an additional HTTP binding of `SetIamPolicy`). Replaces any existing policy. The method description lists only Reservations as supported resources, so neither the Discovery document nor the proto confirms that the service accepts a reservation assignment on this route; for the reservation itself, use `bigqueryreservation.projects.locations.reservations.setIamPolicy`. The IAM roles reference lists no `setIamPolicy` permission for reservation assignments (see Notes). (Corrected from the Discovery document; the original description is quoted in Notes.)
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`
- Request: `SetIamPolicyRequest`; Response: `Policy`

### `bigqueryreservation.projects.locations.reservations.assignments.testIamPermissions`

- Versions: v1
- `POST https://bigqueryreservation.googleapis.com/v1/{+resource}:testIamPermissions`
- Route for the reservation assignment that `resource` names (`projects/{project}/locations/{location}/reservations/{reservation}/assignments/{assignment}`, from the path pattern; the proto declares it as an additional HTTP binding of `TestIamPermissions`). Returns an empty set of permissions if the resource doesn't exist. No Google IAM permissions are required to call this method. The method description lists only Reservations as supported resources, so neither the Discovery document nor the proto confirms that the service accepts a reservation assignment on this route; for the reservation itself, use `bigqueryreservation.projects.locations.reservations.testIamPermissions`. (Corrected from the Discovery document; the original description is quoted in Notes.)
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`
- Request: `TestIamPermissionsRequest`; Response: `TestIamPermissionsResponse`

### `bigqueryreservation.projects.locations.reservations.create`

- Versions: v1
- `POST https://bigqueryreservation.googleapis.com/v1/{+parent}/reservations`
- Creates a new reservation resource.
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`
- Request: `Reservation`; Response: `Reservation`

### `bigqueryreservation.projects.locations.reservations.delete`

- Versions: v1
- `DELETE https://bigqueryreservation.googleapis.com/v1/{+name}`
- Deletes a reservation. Returns `google.rpc.Code.FAILED_PRECONDITION` when reservation has assignments.
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Empty`

### `bigqueryreservation.projects.locations.reservations.failoverReservation`

- Versions: v1
- `POST https://bigqueryreservation.googleapis.com/v1/{+name}:failoverReservation`
- Fail over a reservation to the secondary location. The operation should be done in the current secondary location, which will be promoted to the new primary location for the reservation. Attempting to failover a reservation in the current primary location will fail with the error code `google.rpc.Code.FAILED_PRECONDITION`.
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`
- Request: `FailoverReservationRequest`; Response: `Reservation`

### `bigqueryreservation.projects.locations.reservations.get`

- Versions: v1
- `GET https://bigqueryreservation.googleapis.com/v1/{+name}`
- Returns information about the reservation.
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Reservation`

### `bigqueryreservation.projects.locations.reservations.getIamPolicy`

- Versions: v1
- `GET https://bigqueryreservation.googleapis.com/v1/{+resource}:getIamPolicy`
- Gets the access control policy of the reservation that `resource` names (`projects/{project}/locations/{location}/reservations/{reservation}`, from the path pattern). May return: a `NOT_FOUND` error if the resource doesn't exist or you don't have the permission to view it; an empty policy if the resource exists but doesn't have a set policy. IAM permission: `bigquery.reservations.getIamPolicy`. (Corrected from the Discovery document; the original description is quoted in Notes.)
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Policy`

### `bigqueryreservation.projects.locations.reservations.list`

- Versions: v1
- `GET https://bigqueryreservation.googleapis.com/v1/{+parent}/reservations`
- Lists all the reservations for the project in the specified location.
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListReservationsResponse`

### `bigqueryreservation.projects.locations.reservations.patch`

- Versions: v1
- `PATCH https://bigqueryreservation.googleapis.com/v1/{+name}`
- Updates an existing reservation resource.
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`
- Request: `Reservation`; Response: `Reservation`

### `bigqueryreservation.projects.locations.reservations.setIamPolicy`

- Versions: v1
- `POST https://bigqueryreservation.googleapis.com/v1/{+resource}:setIamPolicy`
- Sets the access control policy of the reservation that `resource` names (`projects/{project}/locations/{location}/reservations/{reservation}`, from the path pattern). Replaces any existing policy. IAM permission: `bigquery.reservations.setIamPolicy`. (Corrected from the Discovery document; the original description is quoted in Notes.)
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`
- Request: `SetIamPolicyRequest`; Response: `Policy`

### `bigqueryreservation.projects.locations.reservations.testIamPermissions`

- Versions: v1
- `POST https://bigqueryreservation.googleapis.com/v1/{+resource}:testIamPermissions`
- Gets your permissions on a resource. Returns an empty set of permissions if the resource doesn't exist. Supported resources are: - Reservations No Google IAM permissions are required to call this method.
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`
- Request: `TestIamPermissionsRequest`; Response: `TestIamPermissionsResponse`

### `bigqueryreservation.projects.locations.searchAllAssignments`

- Versions: v1
- `GET https://bigqueryreservation.googleapis.com/v1/{+parent}:searchAllAssignments`
- Looks up assignments for a specified resource for a particular region. If the request is about a project: 1. Assignments created on the project will be returned if they exist. 2. Otherwise assignments created on the closest ancestor will be returned. 3. Assignments for different JobTypes will all be returned. The same logic applies if the request is about a folder. If the request is about an organization, then assignments created on the organization will be returned (organization doesn't have ancestors). Comparing to ListAssignments, there are some behavior differences: 1. permission on the assignee will be verified in this API. 2. Hierarchy lookup (project->folder->organization) happens in this API. 3. Parent here is `projects/*/locations/*`, instead of `projects/*/locations/*/reservations/*`.
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `SearchAllAssignmentsResponse`

### `bigqueryreservation.projects.locations.searchAssignments`

- Versions: v1
- `GET https://bigqueryreservation.googleapis.com/v1/{+parent}:searchAssignments`
- Deprecated: Looks up assignments for a specified resource for a particular region. If the request is about a project: 1. Assignments created on the project will be returned if they exist. 2. Otherwise assignments created on the closest ancestor will be returned. 3. Assignments for different JobTypes will all be returned. The same logic applies if the request is about a folder. If the request is about an organization, then assignments created on the organization will be returned (organization doesn't have ancestors). Comparing to ListAssignments, there are some behavior differences: 1. permission on the assignee will be verified in this API. 2. Hierarchy lookup (project->folder->organization) happens in this API. 3. Parent here is `projects/*/locations/*`, instead of `projects/*/locations/*/reservations/*`. \*\*Note\*\* "-" cannot be used for projects nor locations.
- Deprecated: `deprecated: true` in the Discovery document
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `SearchAssignmentsResponse`

### `bigqueryreservation.projects.locations.updateBiReservation`

- Versions: v1
- `PATCH https://bigqueryreservation.googleapis.com/v1/{+name}`
- Updates a BI reservation. Only fields specified in the `field_mask` are updated. A singleton BI reservation always exists with default size 0. In order to reserve BI capacity it needs to be updated to an amount greater than 0. In order to release BI capacity reservation size must be set to 0.
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`
- Request: `BiReservation`; Response: `BiReservation`

### `bigqueryreservation.projects.locations.upgradeEdition`

- Versions: v1
- `POST https://bigqueryreservation.googleapis.com/v1/{+parent}:upgradeEdition`
- Upgrades the edition for a list of reservations and capacity commitments. You can only upgrade to a higher edition (from `STANDARD` to `ENTERPRISE` or `ENTERPRISE_PLUS`, from `ENTERPRISE` to `ENTERPRISE_PLUS`, or from `EDITION_UNSPECIFIED` to `ENTERPRISE` or `ENTERPRISE_PLUS`). You can't downgrade an edition. The upgrade must not cause an overall flexible slot increase across the original and target editions (for example, by upgrading a reservation without upgrading its corresponding capacity commitment). Otherwise, the method fails with a `google.rpc.Code.FAILED_PRECONDITION` error. Before the upgrade, the service validates that the resources meet the requirements of the target edition (for example, all reservations within a reservation group must be upgraded together).
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`
- Request: `UpgradeEditionRequest`; Response: `UpgradeEditionResponse`

### Example request

Generated from the Discovery entry of `bigqueryreservation.projects.locations.capacityCommitments.get` (not in the official docs); replace the upper-case placeholders (path variables from the method's `flatPath`; URL-encode query values) and `ACCESS_TOKEN`. `ACCESS_TOKEN` is an OAuth 2.0 access token for a principal allowed to call the method; the Google Cloud client libraries (the gcp-client-libraries skill) obtain and send it:

```http
GET /v1/projects/PROJECT/locations/LOCATION/capacityCommitments/CAPACITY_COMMITMENT HTTP/1.1
Host: bigqueryreservation.googleapis.com
Authorization: Bearer ACCESS_TOKEN
```

## Options / Props

### `bigqueryreservation.projects.locations.capacityCommitments.create` parameters

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The admin project and location of the capacity commitments (`projects/{project}/locations/{location}`, from the path pattern). E.g., `projects/myproject/locations/US`. (Corrected from the Discovery document; the original description is quoted in Notes.) |
| `capacityCommitmentId` | query | string | no | The optional capacity commitment ID. Capacity commitment name will be generated automatically if this field is empty. This field must only contain lower case alphanumeric characters or dashes. The first and last character cannot be a dash. Max length is 64 characters. NOTE: this ID won't be kept if the capacity commitment is split or merged. |
| `enforceSingleAdminProjectPerOrg` | query | boolean | no | If true, fail the request if another project in the organization has a capacity commitment. |

### `bigqueryreservation.projects.locations.capacityCommitments.delete` parameters

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Resource name of the capacity commitment to delete. E.g., `projects/myproject/locations/US/capacityCommitments/123` Format for this method (from its `flatPath`): `projects/{projectsId}/locations/{locationsId}/capacityCommitments/{capacityCommitmentsId}`. |
| `force` | query | boolean | no | Can be used to force delete commitments even if assignments exist. Deleting commitments with assignments may cause queries to fail if they no longer have access to slots. |

### `bigqueryreservation.projects.locations.capacityCommitments.get` parameters

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Resource name of the capacity commitment to retrieve. E.g., `projects/myproject/locations/US/capacityCommitments/123` Format for this method (from its `flatPath`): `projects/{projectsId}/locations/{locationsId}/capacityCommitments/{capacityCommitmentsId}`. |

### `bigqueryreservation.projects.locations.capacityCommitments.list` parameters

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The admin project and location of the capacity commitments (`projects/{project}/locations/{location}`, from the path pattern). E.g., `projects/myproject/locations/US`. (Corrected from the Discovery document; the original description is quoted in Notes.) |
| `pageSize` | query | integer (int32) | no | The maximum number of items to return. |
| `pageToken` | query | string | no | The next_page_token value returned from a previous List request, if any. |

### `bigqueryreservation.projects.locations.capacityCommitments.merge` parameters

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Parent resource that identifies admin project and location e.g., `projects/myproject/locations/us` |

### `bigqueryreservation.projects.locations.capacityCommitments.patch` parameters

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required in the URL: names the resource that this method acts on. The resource name of the capacity commitment, e.g., `projects/myproject/locations/US/capacityCommitments/123` The commitment_id must only contain lower case alphanumeric characters or dashes. It must start with a letter and must not end with a dash. Its maximum length is 64 characters. Format for this method (from its `flatPath`): `projects/{projectsId}/locations/{locationsId}/capacityCommitments/{capacityCommitmentsId}`. |
| `updateMask` | query | string (google-fieldmask) | no | Standard field mask for the set of fields to be updated. |

### `bigqueryreservation.projects.locations.capacityCommitments.split` parameters

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name e.g.,: `projects/myproject/locations/US/capacityCommitments/123` |

### `bigqueryreservation.projects.locations.getBiReservation` parameters

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the requested reservation, for example: `projects/{project_id}/locations/{location_id}/biReservation` Format for this method (from its `flatPath`): `projects/{projectsId}/locations/{locationsId}/biReservation`. |

### `bigqueryreservation.projects.locations.reservationGroups.create` parameters

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. Project, location. E.g., `projects/myproject/locations/US` |
| `reservationGroupId` | query | string | yes | Required. The reservation group ID. It must only contain lower case alphanumeric characters or dashes. It must start with a letter and must not end with a dash. Its maximum length is 64 characters. |

### `bigqueryreservation.projects.locations.reservationGroups.delete` parameters

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Resource name of the reservation group to delete. E.g., `projects/myproject/locations/US/reservationGroups/team1-prod`. (Corrected from the Discovery document; the original description is quoted in Notes.) |

### `bigqueryreservation.projects.locations.reservationGroups.get` parameters

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Resource name of the reservation group to retrieve. E.g., `projects/myproject/locations/US/reservationGroups/team1-prod` Format for this method (from its `flatPath`): `projects/{projectsId}/locations/{locationsId}/reservationGroups/{reservationGroupsId}`. |

### `bigqueryreservation.projects.locations.reservationGroups.list` parameters

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent resource name containing project and location, e.g.: `projects/myproject/locations/US` |
| `pageSize` | query | integer (int32) | no | The maximum number of items to return per page. |
| `pageToken` | query | string | no | The next_page_token value returned from a previous List request, if any. |

### `bigqueryreservation.projects.locations.reservationGroups.patch` parameters

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Identifier. The resource name of the reservation group, e.g., `projects/*/locations/*/reservationGroups/team1-prod`. The reservation_group_id must only contain lower case alphanumeric characters or dashes. It must start with a letter and must not end with a dash. Its maximum length is 64 characters. Format for this method (from its `flatPath`): `projects/{projectsId}/locations/{locationsId}/reservationGroups/{reservationGroupsId}`. |
| `updateMask` | query | string (google-fieldmask) | no | Optional. Standard field mask for the set of fields to be updated. |

### `bigqueryreservation.projects.locations.reservations.assignments.create` parameters

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent resource name of the assignment E.g. `projects/myproject/locations/US/reservations/team1-prod` |
| `assignmentId` | query | string | no | The optional assignment ID. Assignment name will be generated automatically if this field is empty. This field must only contain lower case alphanumeric characters or dashes. Max length is 64 characters. |

### `bigqueryreservation.projects.locations.reservations.assignments.delete` parameters

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the resource, e.g. `projects/myproject/locations/US/reservations/team1-prod/assignments/123` Format for this method (from its `flatPath`): `projects/{projectsId}/locations/{locationsId}/reservations/{reservationsId}/assignments/{assignmentsId}`. |

### `bigqueryreservation.projects.locations.reservations.assignments.getIamPolicy` parameters

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. Format for this method (from its `flatPath`): `projects/{projectsId}/locations/{locationsId}/reservations/{reservationsId}/assignments/{assignmentsId}`. |
| `options.requestedPolicyVersion` | query | integer (int32) | conditional | Optional. The maximum policy version that will be used to format the policy. Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected. Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset. The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1. To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). |

### `bigqueryreservation.projects.locations.reservations.assignments.list` parameters

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent resource name e.g.: `projects/myproject/locations/US/reservations/team1-prod` Or: `projects/myproject/locations/US/reservations/-` |
| `pageSize` | query | integer (int32) | no | The maximum number of items to return per page. |
| `pageToken` | query | string | no | The next_page_token value returned from a previous List request, if any. |

### `bigqueryreservation.projects.locations.reservations.assignments.move` parameters

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of the assignment, e.g. `projects/myproject/locations/US/reservations/team1-prod/assignments/123` |

### `bigqueryreservation.projects.locations.reservations.assignments.patch` parameters

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required in the URL: names the resource that this method acts on. Name of the resource. E.g.: `projects/myproject/locations/US/reservations/team1-prod/assignments/123`. The assignment_id must only contain lower case alphanumeric characters or dashes and the max length is 64 characters. Format for this method (from its `flatPath`): `projects/{projectsId}/locations/{locationsId}/reservations/{reservationsId}/assignments/{assignmentsId}`. |
| `updateMask` | query | string (google-fieldmask) | no | Standard field mask for the set of fields to be updated. |

### `bigqueryreservation.projects.locations.reservations.assignments.setIamPolicy` parameters

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being specified. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. Format for this method (from its `flatPath`): `projects/{projectsId}/locations/{locationsId}/reservations/{reservationsId}/assignments/{assignmentsId}`. |

### `bigqueryreservation.projects.locations.reservations.assignments.testIamPermissions` parameters

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy detail is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. Format for this method (from its `flatPath`): `projects/{projectsId}/locations/{locationsId}/reservations/{reservationsId}/assignments/{assignmentsId}`. |

### `bigqueryreservation.projects.locations.reservations.create` parameters

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. Project, location. E.g., `projects/myproject/locations/US` |
| `reservationId` | query | string | no | The reservation ID. It must only contain lower case alphanumeric characters or dashes. It must start with a letter and must not end with a dash. Its maximum length is 64 characters. |

### `bigqueryreservation.projects.locations.reservations.delete` parameters

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Resource name of the reservation to delete. E.g., `projects/myproject/locations/US/reservations/team1-prod`. (Corrected from the Discovery document; the original description is quoted in Notes.) |

### `bigqueryreservation.projects.locations.reservations.failoverReservation` parameters

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Resource name of the reservation to failover. E.g., `projects/myproject/locations/US/reservations/team1-prod` |

### `bigqueryreservation.projects.locations.reservations.get` parameters

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Resource name of the reservation to retrieve. E.g., `projects/myproject/locations/US/reservations/team1-prod` Format for this method (from its `flatPath`): `projects/{projectsId}/locations/{locationsId}/reservations/{reservationsId}`. |

### `bigqueryreservation.projects.locations.reservations.getIamPolicy` parameters

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. Format for this method (from its `flatPath`): `projects/{projectsId}/locations/{locationsId}/reservations/{reservationsId}`. |
| `options.requestedPolicyVersion` | query | integer (int32) | conditional | Optional. The maximum policy version that will be used to format the policy. Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected. Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset. The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1. To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). |

### `bigqueryreservation.projects.locations.reservations.list` parameters

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent resource name containing project and location, e.g.: `projects/myproject/locations/US` |
| `pageSize` | query | integer (int32) | no | The maximum number of items to return per page. |
| `pageToken` | query | string | no | The next_page_token value returned from a previous List request, if any. |

### `bigqueryreservation.projects.locations.reservations.patch` parameters

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Identifier. The resource name of the reservation, e.g., `projects/*/locations/*/reservations/team1-prod`. The reservation_id must only contain lower case alphanumeric characters or dashes. It must start with a letter and must not end with a dash. Its maximum length is 64 characters. Format for this method (from its `flatPath`): `projects/{projectsId}/locations/{locationsId}/reservations/{reservationsId}`. |
| `updateMask` | query | string (google-fieldmask) | no | Standard field mask for the set of fields to be updated. |

### `bigqueryreservation.projects.locations.reservations.setIamPolicy` parameters

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being specified. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. Format for this method (from its `flatPath`): `projects/{projectsId}/locations/{locationsId}/reservations/{reservationsId}`. |

### `bigqueryreservation.projects.locations.reservations.testIamPermissions` parameters

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy detail is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. Format for this method (from its `flatPath`): `projects/{projectsId}/locations/{locationsId}/reservations/{reservationsId}`. |

### `bigqueryreservation.projects.locations.searchAllAssignments` parameters

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The resource name with location (project name could be the wildcard '-'), e.g.: `projects/-/locations/US`. |
| `pageSize` | query | integer (int32) | no | The maximum number of items to return per page. |
| `pageToken` | query | string | no | The next_page_token value returned from a previous List request, if any. |
| `query` | query | string | no | Please specify resource name as assignee in the query. Examples: \* `assignee=projects/myproject` \* `assignee=folders/123` \* `assignee=organizations/456` |

### `bigqueryreservation.projects.locations.searchAssignments` parameters

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The resource name of the admin project(containing project and location), e.g.: `projects/myproject/locations/US`. |
| `pageSize` | query | integer (int32) | no | The maximum number of items to return per page. |
| `pageToken` | query | string | no | The next_page_token value returned from a previous List request, if any. |
| `query` | query | string | no | Please specify resource name as assignee in the query. Examples: \* `assignee=projects/myproject` \* `assignee=folders/123` \* `assignee=organizations/456` |

### `bigqueryreservation.projects.locations.updateBiReservation` parameters

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Identifier. The resource name of the singleton BI reservation. Reservation names have the form `projects/{project_id}/locations/{location_id}/biReservation`. Format for this method (from its `flatPath`): `projects/{projectsId}/locations/{locationsId}/biReservation`. |
| `updateMask` | query | string (google-fieldmask) | no | A list of fields to be updated in this request. |

### `bigqueryreservation.projects.locations.upgradeEdition` parameters

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | The parent resource name that identifies the admin project and location, in the format `projects/{project}/locations/{location}`. For example, `projects/myproject/locations/us-west1`. |

## Notes

- Generated from the Discovery document(s) v1 of `bigqueryreservation` (retrieved 2026-11-14). Resources on this page: projects.
- The Required column is `yes` for path variables and required parameters, and `conditional` when the description says "Required if ..." (mutually exclusive alternatives), when a `parent.child` parameter is required only inside an optional parent message or one branch of a oneof, or when the description says that some requests must specify it (for example, `options.requestedPolicyVersion` must be 3 to get a policy with conditional role bindings). Path variables are `yes` unless a note below names an alternative route without them.
- Message schemas (the request and response types named above) are listed under `references/rest-schemas/bigqueryreservation/`; they are the `schemas` section of the Discovery documents in Source.
- Deprecated methods (`deprecated: true` in Discovery): `bigqueryreservation.projects.locations.searchAssignments`. Avoid them in new code.
- Corrected from the Discovery document: the description of `bigqueryreservation.projects.locations.capacityCommitments.list` is "Lists all the capacity commitments for the admin project.", but the path pattern of `parent` is `^projects/[^/]+/locations/[^/]+$`, so a call covers only that parent; the summary of this method on this page names that parent.
- Path variables whose description starts with "Output only" are still required in the URL: they name the resource that the method acts on, so they are `yes` in the Required column: `name` in `bigqueryreservation.projects.locations.capacityCommitments.patch`, `name` in `bigqueryreservation.projects.locations.reservations.assignments.patch`. The Discovery document gives them the description of the resource field of the same name, and "Output only" applies to that field of the resource, not to the URL. In the parameter tables their description starts with "Required in the URL" in place of the leading "Output only".
- Regional endpoints: the Discovery document (`bigqueryreservation` v1, revision 20261102) also lists 25 endpoints of the form `https://bigqueryreservation.LOCATION.rep.googleapis.com/` (Regional Endpoint), for LOCATION in `asia-south1`, `asia-south2`, `europe-west1`, `europe-west10`, `europe-west2`, `europe-west3`, `europe-west4`, `europe-west6`, `europe-west8`, `europe-west9`, `me-central2`, `northamerica-northeast1`, `northamerica-northeast2`, `us-central1`, `us-central2`, `us-east1`, `us-east4`, `us-east5`, `us-east7`, `us-south1`, `us-west1`, `us-west2`, `us-west3`, `us-west4`, `us-west8`. The method URLs above use the global host `https://bigqueryreservation.googleapis.com/`; to send a request through one of these endpoints, replace the host with the endpoint for the resource's location (for example `https://bigqueryreservation.asia-south1.rep.googleapis.com/`) and keep the path.
- Corrected from the Discovery document: the `name` description of `bigqueryreservation.projects.locations.reservations.delete` reads "Required. Resource name of the reservation to retrieve. E.g., `projects/myproject/locations/US/reservations/team1-prod`", the text of `reservations.get`; the table describes the reservation to delete.
- Corrected from the Discovery document: the `bigqueryreservation.projects.locations.reservationGroups.delete` description reads "Deletes a reservation. Returns `google.rpc.Code.FAILED_PRECONDITION` when reservation has assignments." and its `name` description reads "Required. Resource name of the reservation group to retrieve. E.g., `projects/myproject/locations/US/reservationGroups/team1-prod`"; the same text is in the proto (`DeleteReservationGroup`, `DeleteReservationGroupRequest`), where the description is the one of `DeleteReservation`. The path pattern `^projects/[^/]+/locations/[^/]+/reservationGroups/[^/]+$` names a reservation group, so the summary and the table describe deleting a reservation group; the `FAILED_PRECONDITION` condition of the original is stated for reservations and is not repeated for reservation groups (`google/cloud/bigquery/reservation/v1/reservation.proto`, https://github.com/googleapis/googleapis/blob/5ce024537af135bb2a0d3228072dd660047956aa/google/cloud/bigquery/reservation/v1/reservation.proto, commit `5ce0245`, retrieved 2026-11-19).
- Corrected from the Discovery document: the `getIamPolicy`, `setIamPolicy` and `testIamPermissions` methods of reservations and of reservation assignments share the descriptions "Supported resources are: - Reservations - ReservationAssignments" (getIamPolicy) or "Supported resources are: - Reservations" (setIamPolicy, testIamPermissions), and name the permissions `bigqueryreservation.reservations.getIamPolicy` and `bigqueryreservation.reservations.setIamPolicy`; the IAM roles reference lists these permissions as `bigquery.reservations.getIamPolicy` and `bigquery.reservations.setIamPolicy`, and lists no IAM-policy permissions for reservation assignments (`bigquery.reservationAssignments.*` has only create, delete, list and search). The summaries above name the resource that each route takes (from its path pattern).
- Corrected from the Discovery document: the `parent` description of `capacityCommitments.create` and `.list` reads "Required. Resource name of the parent reservation. E.g., `projects/myproject/locations/US`"; the path pattern `^projects/[^/]+/locations/[^/]+$` and the example name a project and location, not a reservation, so the table describes the admin project and location.
- Restored from the source proto: in the `assignments.delete` and `assignments.list` descriptions, the Discovery document shows the assignments as empty code spans because it drops angle-bracket pairs; this page shows them as the proto comments read: "associations between entities and reservations: `<organizationA, res1>` and `<project1, res1>`" and, for DeleteAssignment, "In this example, deletion of the `<organizationA, res1>` assignment won't affect the other assignment `<project1, res1>`." (`google/cloud/bigquery/reservation/v1/reservation.proto`, https://github.com/googleapis/googleapis/blob/5ce024537af135bb2a0d3228072dd660047956aa/google/cloud/bigquery/reservation/v1/reservation.proto, commit `5ce0245`, retrieved 2026-11-19).
- Corrected from the Discovery document: the `searchAssignments` and `searchAllAssignments` descriptions write the `ListAssignments` parent as `projects/*/locations/*reservations/*` (no `/` before `reservations`); this page shows `projects/*/locations/*/reservations/*`, the format of the reservation resource name.
- Source: https://bigqueryreservation.googleapis.com/$discovery/rest?version=v1 (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
