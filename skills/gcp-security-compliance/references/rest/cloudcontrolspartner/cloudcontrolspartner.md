---
source: https://cloudcontrolspartner.googleapis.com/$discovery/rest?version=v1
---

# Cloud Controls Partner API REST API (cloudcontrolspartner)

## Signature / Usage

Base URL: `https://cloudcontrolspartner.googleapis.com`. Methods are listed by `id`; the `Versions` line shows which API versions define the method (preferred: v1).

### `cloudcontrolspartner.organizations.locations.customers.create`

- Versions: v1, v1beta
- `POST https://cloudcontrolspartner.googleapis.com/v1/{+parent}/customers`
- Creates a new customer.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `Customer`; Response: `Customer`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. Parent resource Format: `organizations/{organization}/locations/{location}` |
| `customerId` | query | string | yes | Required. The customer id to use for the customer, which will become the final component of the customer's resource name. The specified value must be a valid Google cloud organization id. |

### `cloudcontrolspartner.organizations.locations.customers.delete`

- Versions: v1, v1beta
- `DELETE https://cloudcontrolspartner.googleapis.com/v1/{+name}`
- Delete details of a single customer
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. name of the resource to be deleted format: name=organizations/\*/locations/\*/customers/\* |

### `cloudcontrolspartner.organizations.locations.customers.get`

- Versions: v1, v1beta
- `GET https://cloudcontrolspartner.googleapis.com/v1/{+name}`
- Gets details of a single customer
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Customer`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Format: `organizations/{organization}/locations/{location}/customers/{customer}` |

### `cloudcontrolspartner.organizations.locations.customers.list`

- Versions: v1, v1beta
- `GET https://cloudcontrolspartner.googleapis.com/v1/{+parent}/customers`
- Lists customers of a partner identified by its Google Cloud organization ID
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListCustomersResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. Parent resource Format: `organizations/{organization}/locations/{location}` |
| `filter` | query | string | no | Optional. Filtering results |
| `orderBy` | query | string | no | Optional. Hint for how to order the results |
| `pageSize` | query | integer (int32) | no | The maximum number of Customers to return. The service may return fewer than this value. If unspecified, at most 500 Customers will be returned. |
| `pageToken` | query | string | no | A page token, received from a previous `ListCustomers` call. Provide this to retrieve the subsequent page. |

### `cloudcontrolspartner.organizations.locations.customers.patch`

- Versions: v1, v1beta
- `PATCH https://cloudcontrolspartner.googleapis.com/v1/{+name}`
- Update details of a single customer
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `Customer`; Response: `Customer`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Identifier. Format: `organizations/{organization}/locations/{location}/customers/{customer}` |
| `updateMask` | query | string (google-fieldmask) | no | Optional. The list of fields to update |

### `cloudcontrolspartner.organizations.locations.customers.workloads.accessApprovalRequests.list`

- Versions: v1, v1beta
- `GET https://cloudcontrolspartner.googleapis.com/v1/{+parent}/accessApprovalRequests`
- Deprecated: Only returns access approval requests directly associated with an assured workload folder.
- Deprecated: `deprecated: true` in the Discovery document
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListAccessApprovalRequestsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. Parent resource Format: `organizations/{organization}/locations/{location}/customers/{customer}/workloads/{workload}` |
| `filter` | query | string | no | Optional. Filtering results. |
| `orderBy` | query | string | no | Optional. Hint for how to order the results. |
| `pageSize` | query | integer (int32) | no | Optional. The maximum number of access requests to return. The service may return fewer than this value. If unspecified, at most 500 access requests will be returned. |
| `pageToken` | query | string | no | Optional. A page token, received from a previous `ListAccessApprovalRequests` call. Provide this to retrieve the subsequent page. |

### `cloudcontrolspartner.organizations.locations.customers.workloads.get`

- Versions: v1, v1beta
- `GET https://cloudcontrolspartner.googleapis.com/v1/{+name}`
- Gets details of a single workload
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Workload`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Format: `organizations/{organization}/locations/{location}/customers/{customer}/workloads/{workload}` |

### `cloudcontrolspartner.organizations.locations.customers.workloads.getEkmConnections`

- Versions: v1, v1beta
- `GET https://cloudcontrolspartner.googleapis.com/v1/{+name}`
- Gets the EKM connections associated with a workload
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `EkmConnections`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Format: `organizations/{organization}/locations/{location}/customers/{customer}/workloads/{workload}/ekmConnections` |

### `cloudcontrolspartner.organizations.locations.customers.workloads.getPartnerPermissions`

- Versions: v1, v1beta
- `GET https://cloudcontrolspartner.googleapis.com/v1/{+name}`
- Gets the partner permissions granted for a workload
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `PartnerPermissions`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the resource to get in the format: `organizations/{organization}/locations/{location}/customers/{customer}/workloads/{workload}/partnerPermissions` |

### `cloudcontrolspartner.organizations.locations.customers.workloads.list`

- Versions: v1, v1beta
- `GET https://cloudcontrolspartner.googleapis.com/v1/{+parent}/workloads`
- Lists customer workloads for a given customer org id
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListWorkloadsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. Parent resource Format: `organizations/{organization}/locations/{location}/customers/{customer}` |
| `filter` | query | string | no | Optional. Filtering results. |
| `orderBy` | query | string | no | Optional. Hint for how to order the results. |
| `pageSize` | query | integer (int32) | no | The maximum number of workloads to return. The service may return fewer than this value. If unspecified, at most 500 workloads will be returned. |
| `pageToken` | query | string | no | A page token, received from a previous `ListWorkloads` call. Provide this to retrieve the subsequent page. |

### `cloudcontrolspartner.organizations.locations.customers.workloads.violations.get`

- Versions: v1, v1beta
- `GET https://cloudcontrolspartner.googleapis.com/v1/{+name}`
- Gets details of a single Violation.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Violation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Format: `organizations/{organization}/locations/{location}/customers/{customer}/workloads/{workload}/violations/{violation}` |

### `cloudcontrolspartner.organizations.locations.customers.workloads.violations.list`

- Versions: v1, v1beta
- `GET https://cloudcontrolspartner.googleapis.com/v1/{+parent}/violations`
- Lists Violations for a workload Callers may also choose to read across multiple Customers or for a single customer as per AIP-159 (https://google.aip.dev/159) by using '-' (the hyphen or dash character) as a wildcard character instead of {customer} & {workload}. Format: `organizations/{organization}/locations/{location}/customers/{customer}/workloads/{workload}`
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListViolationsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. Parent resource Format `organizations/{organization}/locations/{location}/customers/{customer}/workloads/{workload}` |
| `filter` | query | string | no | Optional. Filtering results |
| `interval.endTime` | query | string (google-datetime) | no | Optional. Exclusive end of the interval. If specified, a Timestamp matching this interval will have to be before the end. |
| `interval.startTime` | query | string (google-datetime) | no | Optional. Inclusive start of the interval. If specified, a Timestamp matching this interval will have to be the same or after the start. |
| `orderBy` | query | string | no | Optional. Hint for how to order the results |
| `pageSize` | query | integer (int32) | no | Optional. The maximum number of customers row to return. The service may return fewer than this value. If unspecified, at most 10 customers will be returned. |
| `pageToken` | query | string | no | Optional. A page token, received from a previous `ListViolations` call. Provide this to retrieve the subsequent page. |

### `cloudcontrolspartner.organizations.locations.getPartner`

- Versions: v1, v1beta
- `GET https://cloudcontrolspartner.googleapis.com/v1/{+name}`
- Get details of a Partner.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Partner`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Format: `organizations/{organization}/locations/{location}/partner` |

### Example request skeleton

Generated from the Discovery entry of `cloudcontrolspartner.organizations.locations.customers.get` (not in the official docs); replace the `{...}` path variables (URL-encode query values):

```bash
curl -X GET \
  -H "Authorization: Bearer $(gcloud auth print-access-token)" \
  "https://cloudcontrolspartner.googleapis.com/v1/{+name}"
```

## Notes

- Generated from the Discovery document(s) v1, v1beta of `cloudcontrolspartner` (retrieved 2026-11-14). Resources on this page: organizations.
- The Required column is `yes` for path variables and required parameters, and `conditional` when the description says "Required if ..." (mutually exclusive alternatives), when a `parent.child` parameter is required only inside an optional parent message or one branch of a oneof. Path variables are `yes` unless a note below names an alternative route without them.
- Message schemas (the request and response types named above) are defined in the `schemas` section of the Discovery documents in Source.
- Deprecated methods (`deprecated: true` in Discovery): `cloudcontrolspartner.organizations.locations.customers.workloads.accessApprovalRequests.list`. Avoid them in new code.
- Source: https://cloudcontrolspartner.googleapis.com/$discovery/rest?version=v1, https://cloudcontrolspartner.googleapis.com/$discovery/rest?version=v1beta (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
