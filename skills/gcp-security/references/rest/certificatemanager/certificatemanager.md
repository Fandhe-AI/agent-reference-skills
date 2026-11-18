---
source: https://certificatemanager.googleapis.com/$discovery/rest?version=v1
---

# Certificate Manager API REST API (certificatemanager)

## Signature / Usage

Base URL: `https://certificatemanager.googleapis.com`. Methods are listed by `id`; the `Versions` line shows which API versions define the method (preferred: v1).

### `certificatemanager.projects.locations.certificateIssuanceConfigs.create`

- Versions: v1
- `POST https://certificatemanager.googleapis.com/v1/{+parent}/certificateIssuanceConfigs`
- Creates a new CertificateIssuanceConfig in a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `CertificateIssuanceConfig`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent resource of the certificate issuance config. Must be in the format `projects/*/locations/*`. |
| `certificateIssuanceConfigId` | query | string | yes | Required. A user-provided name of the certificate config. |

### `certificatemanager.projects.locations.certificateIssuanceConfigs.delete`

- Versions: v1
- `DELETE https://certificatemanager.googleapis.com/v1/{+name}`
- Deletes a single CertificateIssuanceConfig.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. A name of the certificate issuance config to delete. Must be in the format `projects/*/locations/*/certificateIssuanceConfigs/*`. |

### `certificatemanager.projects.locations.certificateIssuanceConfigs.get`

- Versions: v1
- `GET https://certificatemanager.googleapis.com/v1/{+name}`
- Gets details of a single CertificateIssuanceConfig.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `CertificateIssuanceConfig`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. A name of the certificate issuance config to describe. Must be in the format `projects/*/locations/*/certificateIssuanceConfigs/*`. |

### `certificatemanager.projects.locations.certificateIssuanceConfigs.list`

- Versions: v1
- `GET https://certificatemanager.googleapis.com/v1/{+parent}/certificateIssuanceConfigs`
- Lists CertificateIssuanceConfigs in a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListCertificateIssuanceConfigsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The project and location from which the certificate should be listed, specified in the format `projects/*/locations/*`. |
| `filter` | query | string | no | Optional. Filter expression to restrict the Certificates Configs returned. |
| `orderBy` | query | string | no | Optional. A list of Certificate Config field names used to specify the order of the returned results. The default sorting order is ascending. To specify descending order for a field, add a suffix `" desc"`. |
| `pageSize` | query | integer (int32) | no | Optional. Maximum number of certificate configs to return per call. |
| `pageToken` | query | string | no | Optional. The value returned by the last `ListCertificateIssuanceConfigsResponse`. Indicates that this is a continuation of a prior `ListCertificateIssuanceConfigs` call, and that the system should return the next page of data. |

### `certificatemanager.projects.locations.certificateIssuanceConfigs.patch`

- Versions: v1
- `PATCH https://certificatemanager.googleapis.com/v1/{+name}`
- Updates a CertificateIssuanceConfig.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `CertificateIssuanceConfig`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Identifier. A user-defined name of the certificate issuance config. CertificateIssuanceConfig names must be unique globally and match pattern `projects/*/locations/*/certificateIssuanceConfigs/*`. |
| `updateMask` | query | string (google-fieldmask) | yes | Required. The update mask applies to the resource. For the `FieldMask` definition, see https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#fieldmask. |

### `certificatemanager.projects.locations.certificateMaps.certificateMapEntries.create`

- Versions: v1
- `POST https://certificatemanager.googleapis.com/v1/{+parent}/certificateMapEntries`
- Creates a new CertificateMapEntry in a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `CertificateMapEntry`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent resource of the certificate map entry. Must be in the format `projects/*/locations/*/certificateMaps/*`. |
| `certificateMapEntryId` | query | string | yes | Required. A user-provided name of the certificate map entry. |

### `certificatemanager.projects.locations.certificateMaps.certificateMapEntries.delete`

- Versions: v1
- `DELETE https://certificatemanager.googleapis.com/v1/{+name}`
- Deletes a single CertificateMapEntry.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. A name of the certificate map entry to delete. Must be in the format `projects/*/locations/*/certificateMaps/*/certificateMapEntries/*`. |

### `certificatemanager.projects.locations.certificateMaps.certificateMapEntries.get`

- Versions: v1
- `GET https://certificatemanager.googleapis.com/v1/{+name}`
- Gets details of a single CertificateMapEntry.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `CertificateMapEntry`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. A name of the certificate map entry to describe. Must be in the format `projects/*/locations/*/certificateMaps/*/certificateMapEntries/*`. |

### `certificatemanager.projects.locations.certificateMaps.certificateMapEntries.list`

- Versions: v1
- `GET https://certificatemanager.googleapis.com/v1/{+parent}/certificateMapEntries`
- Lists CertificateMapEntries in a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListCertificateMapEntriesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The project, location and certificate map from which the certificate map entries should be listed, specified in the format `projects/*/locations/*/certificateMaps/*`. |
| `filter` | query | string | no | Optional. Filter expression to restrict the returned Certificate Map Entries. |
| `orderBy` | query | string | no | Optional. A list of Certificate Map Entry field names used to specify the order of the returned results. The default sorting order is ascending. To specify descending order for a field, add a suffix `" desc"`. |
| `pageSize` | query | integer (int32) | no | Optional. Maximum number of certificate map entries to return. The service may return fewer than this value. If unspecified, at most 50 certificate map entries will be returned. The maximum value is 1000; values above 1000 will be coerced to 1000. |
| `pageToken` | query | string | no | Optional. The value returned by the last `ListCertificateMapEntriesResponse`. Indicates that this is a continuation of a prior `ListCertificateMapEntries` call, and that the system should return the next page of data. |

### `certificatemanager.projects.locations.certificateMaps.certificateMapEntries.patch`

- Versions: v1
- `PATCH https://certificatemanager.googleapis.com/v1/{+name}`
- Updates a CertificateMapEntry.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `CertificateMapEntry`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Identifier. A user-defined name of the Certificate Map Entry. Certificate Map Entry names must be unique globally and match pattern `projects/*/locations/*/certificateMaps/*/certificateMapEntries/*`. |
| `updateMask` | query | string (google-fieldmask) | yes | Required. The update mask applies to the resource. For the `FieldMask` definition, see https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#fieldmask. |

### `certificatemanager.projects.locations.certificateMaps.create`

- Versions: v1
- `POST https://certificatemanager.googleapis.com/v1/{+parent}/certificateMaps`
- Creates a new CertificateMap in a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `CertificateMap`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent resource of the certificate map. Must be in the format `projects/*/locations/*`. |
| `certificateMapId` | query | string | yes | Required. A user-provided name of the certificate map. |

### `certificatemanager.projects.locations.certificateMaps.delete`

- Versions: v1
- `DELETE https://certificatemanager.googleapis.com/v1/{+name}`
- Deletes a single CertificateMap. A Certificate Map can't be deleted if it contains Certificate Map Entries. Remove all the entries from the map before calling this method.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. A name of the certificate map to delete. Must be in the format `projects/*/locations/*/certificateMaps/*`. |

### `certificatemanager.projects.locations.certificateMaps.get`

- Versions: v1
- `GET https://certificatemanager.googleapis.com/v1/{+name}`
- Gets details of a single CertificateMap.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `CertificateMap`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. A name of the certificate map to describe. Must be in the format `projects/*/locations/*/certificateMaps/*`. |

### `certificatemanager.projects.locations.certificateMaps.list`

- Versions: v1
- `GET https://certificatemanager.googleapis.com/v1/{+parent}/certificateMaps`
- Lists CertificateMaps in a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListCertificateMapsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The project and location from which the certificate maps should be listed, specified in the format `projects/*/locations/*`. |
| `filter` | query | string | no | Optional. Filter expression to restrict the Certificates Maps returned. |
| `orderBy` | query | string | no | Optional. A list of Certificate Map field names used to specify the order of the returned results. The default sorting order is ascending. To specify descending order for a field, add a suffix `" desc"`. |
| `pageSize` | query | integer (int32) | no | Optional. Maximum number of certificate maps to return per call. |
| `pageToken` | query | string | no | Optional. The value returned by the last `ListCertificateMapsResponse`. Indicates that this is a continuation of a prior `ListCertificateMaps` call, and that the system should return the next page of data. |

### `certificatemanager.projects.locations.certificateMaps.patch`

- Versions: v1
- `PATCH https://certificatemanager.googleapis.com/v1/{+name}`
- Updates a CertificateMap.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `CertificateMap`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Identifier. A user-defined name of the Certificate Map. Certificate Map names must be unique globally and match pattern `projects/*/locations/*/certificateMaps/*`. |
| `updateMask` | query | string (google-fieldmask) | yes | Required. The update mask applies to the resource. For the `FieldMask` definition, see https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#fieldmask. |

### `certificatemanager.projects.locations.certificates.create`

- Versions: v1
- `POST https://certificatemanager.googleapis.com/v1/{+parent}/certificates`
- Creates a new Certificate in a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `Certificate`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent resource of the certificate. Must be in the format `projects/*/locations/*`. |
| `certificateId` | query | string | yes | Required. A user-provided name of the certificate. |

### `certificatemanager.projects.locations.certificates.delete`

- Versions: v1
- `DELETE https://certificatemanager.googleapis.com/v1/{+name}`
- Deletes a single Certificate.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. A name of the certificate to delete. Must be in the format `projects/*/locations/*/certificates/*`. |

### `certificatemanager.projects.locations.certificates.get`

- Versions: v1
- `GET https://certificatemanager.googleapis.com/v1/{+name}`
- Gets details of a single Certificate.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Certificate`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. A name of the certificate to describe. Must be in the format `projects/*/locations/*/certificates/*`. |

### `certificatemanager.projects.locations.certificates.list`

- Versions: v1
- `GET https://certificatemanager.googleapis.com/v1/{+parent}/certificates`
- Lists Certificates in a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListCertificatesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The project and location from which the certificate should be listed, specified in the format `projects/*/locations/*`. |
| `filter` | query | string | no | Optional. Filter expression to restrict the Certificates returned. |
| `orderBy` | query | string | no | Optional. A list of Certificate field names used to specify the order of the returned results. The default sorting order is ascending. To specify descending order for a field, add a suffix `" desc"`. |
| `pageSize` | query | integer (int32) | no | Optional. Maximum number of certificates to return per call. |
| `pageToken` | query | string | no | Optional. The value returned by the last `ListCertificatesResponse`. Indicates that this is a continuation of a prior `ListCertificates` call, and that the system should return the next page of data. |

### `certificatemanager.projects.locations.certificates.patch`

- Versions: v1
- `PATCH https://certificatemanager.googleapis.com/v1/{+name}`
- Updates a Certificate.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `Certificate`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Identifier. A user-defined name of the certificate. Certificate names must be unique globally and match pattern `projects/*/locations/*/certificates/*`. |
| `updateMask` | query | string (google-fieldmask) | yes | Required. The update mask applies to the resource. For the `FieldMask` definition, see https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#fieldmask. |

### `certificatemanager.projects.locations.dnsAuthorizations.create`

- Versions: v1
- `POST https://certificatemanager.googleapis.com/v1/{+parent}/dnsAuthorizations`
- Creates a new DnsAuthorization in a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `DnsAuthorization`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent resource of the dns authorization. Must be in the format `projects/*/locations/*`. |
| `dnsAuthorizationId` | query | string | yes | Required. A user-provided name of the dns authorization. |

### `certificatemanager.projects.locations.dnsAuthorizations.delete`

- Versions: v1
- `DELETE https://certificatemanager.googleapis.com/v1/{+name}`
- Deletes a single DnsAuthorization.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. A name of the dns authorization to delete. Must be in the format `projects/*/locations/*/dnsAuthorizations/*`. |

### `certificatemanager.projects.locations.dnsAuthorizations.get`

- Versions: v1
- `GET https://certificatemanager.googleapis.com/v1/{+name}`
- Gets details of a single DnsAuthorization.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `DnsAuthorization`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. A name of the dns authorization to describe. Must be in the format `projects/*/locations/*/dnsAuthorizations/*`. |

### `certificatemanager.projects.locations.dnsAuthorizations.list`

- Versions: v1
- `GET https://certificatemanager.googleapis.com/v1/{+parent}/dnsAuthorizations`
- Lists DnsAuthorizations in a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListDnsAuthorizationsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The project and location from which the dns authorizations should be listed, specified in the format `projects/*/locations/*`. |
| `filter` | query | string | no | Optional. Filter expression to restrict the Dns Authorizations returned. |
| `orderBy` | query | string | no | Optional. A list of Dns Authorization field names used to specify the order of the returned results. The default sorting order is ascending. To specify descending order for a field, add a suffix `" desc"`. |
| `pageSize` | query | integer (int32) | no | Optional. Maximum number of dns authorizations to return per call. |
| `pageToken` | query | string | no | Optional. The value returned by the last `ListDnsAuthorizationsResponse`. Indicates that this is a continuation of a prior `ListDnsAuthorizations` call, and that the system should return the next page of data. |

### `certificatemanager.projects.locations.dnsAuthorizations.patch`

- Versions: v1
- `PATCH https://certificatemanager.googleapis.com/v1/{+name}`
- Updates a DnsAuthorization.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `DnsAuthorization`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Identifier. A user-defined name of the dns authorization. DnsAuthorization names must be unique globally and match pattern `projects/*/locations/*/dnsAuthorizations/*`. |
| `updateMask` | query | string (google-fieldmask) | yes | Required. The update mask applies to the resource. For the `FieldMask` definition, see https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#fieldmask. |

### `certificatemanager.projects.locations.get`

- Versions: v1
- `GET https://certificatemanager.googleapis.com/v1/{+name}`
- Gets information about a location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Location`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Resource name for the location. |

### `certificatemanager.projects.locations.list`

- Versions: v1
- `GET https://certificatemanager.googleapis.com/v1/{+name}/locations`
- Lists information about the supported locations for this service. This method lists locations based on the resource scope provided in the ListLocationsRequest.name field: \* \*\*Global locations\*\*: If `name` is empty, the method lists the public locations available to all projects. \* \*\*Project-specific locations\*\*: If `name` follows the format `projects/{project}`, the method lists locations visible to that specific project. This includes public, private, or other project-specific locations enabled for the project. For gRPC and client library implementations, the resource name is passed as the `name` field. For direct service calls, the resource name is incorporated into the request path based on the specific service implementation and version.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListLocationsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The resource that owns the locations collection, if applicable. |
| `extraLocationTypes` | query | repeated string | no | Optional. Do not use this field unless explicitly documented otherwise. This is primarily for internal usage. |
| `filter` | query | string | no | A filter to narrow down results to a preferred subset. The filtering language accepts strings like `"displayName=tokyo"`, and is documented in more detail in AIP-160 (https://google.aip.dev/160). |
| `pageSize` | query | integer (int32) | no | The maximum number of results to return. If not set, the service selects a default. |
| `pageToken` | query | string | no | A page token received from the `next_page_token` field in the response. Send that page token to receive the subsequent page. |

### `certificatemanager.projects.locations.operations.cancel`

- Versions: v1
- `POST https://certificatemanager.googleapis.com/v1/{+name}:cancel`
- Starts asynchronous cancellation on a long-running operation. The server makes a best effort to cancel the operation, but success is not guaranteed. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`. Clients can use Operations.GetOperation or other methods to check whether the cancellation succeeded or whether the operation completed despite cancellation. On successful cancellation, the operation is not deleted; instead, it becomes an operation with an Operation.error value with a google.rpc.Status.code of `1`, corresponding to `Code.CANCELLED`.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `CancelOperationRequest`; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation resource to be cancelled. |

### `certificatemanager.projects.locations.operations.delete`

- Versions: v1
- `DELETE https://certificatemanager.googleapis.com/v1/{+name}`
- Deletes a long-running operation. This method indicates that the client is no longer interested in the operation result. It does not cancel the operation. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation resource to be deleted. |

### `certificatemanager.projects.locations.operations.get`

- Versions: v1
- `GET https://certificatemanager.googleapis.com/v1/{+name}`
- Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation resource. |

### `certificatemanager.projects.locations.operations.list`

- Versions: v1
- `GET https://certificatemanager.googleapis.com/v1/{+name}/operations`
- Lists operations that match the specified filter in the request. If the server doesn't support this method, it returns `UNIMPLEMENTED`.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListOperationsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation's parent resource. |
| `filter` | query | string | no | The standard list filter. |
| `pageSize` | query | integer (int32) | no | The standard list page size. |
| `pageToken` | query | string | no | The standard list page token. |
| `returnPartialSuccess` | query | boolean | no | When set to `true`, operations that are reachable are returned as normal, and those that are unreachable are returned in the ListOperationsResponse.unreachable field. This can only be `true` when reading across collections. For example, when `parent` is set to `"projects/example/locations/-"`. This field is not supported by default and will result in an `UNIMPLEMENTED` error if set unless explicitly documented otherwise in service or product specific documentation. |

### `certificatemanager.projects.locations.trustConfigs.create`

- Versions: v1
- `POST https://certificatemanager.googleapis.com/v1/{+parent}/trustConfigs`
- Creates a new TrustConfig in a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `TrustConfig`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent resource of the TrustConfig. Must be in the format `projects/*/locations/*`. |
| `trustConfigId` | query | string | yes | Required. A user-provided name of the TrustConfig. Must match the regexp `[a-z0-9-]{1,63}`. |

### `certificatemanager.projects.locations.trustConfigs.delete`

- Versions: v1
- `DELETE https://certificatemanager.googleapis.com/v1/{+name}`
- Deletes a single TrustConfig.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. A name of the TrustConfig to delete. Must be in the format `projects/*/locations/*/trustConfigs/*`. |
| `etag` | query | string | no | Optional. The current etag of the TrustConfig. If an etag is provided and does not match the current etag of the resource, deletion will be blocked and an ABORTED error will be returned. |

### `certificatemanager.projects.locations.trustConfigs.get`

- Versions: v1
- `GET https://certificatemanager.googleapis.com/v1/{+name}`
- Gets details of a single TrustConfig.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `TrustConfig`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. A name of the TrustConfig to describe. Must be in the format `projects/*/locations/*/trustConfigs/*`. |

### `certificatemanager.projects.locations.trustConfigs.list`

- Versions: v1
- `GET https://certificatemanager.googleapis.com/v1/{+parent}/trustConfigs`
- Lists TrustConfigs in a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListTrustConfigsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The project and location from which the TrustConfigs should be listed, specified in the format `projects/*/locations/*`. |
| `filter` | query | string | no | Optional. Filter expression to restrict the TrustConfigs returned. |
| `orderBy` | query | string | no | Optional. A list of TrustConfig field names used to specify the order of the returned results. The default sorting order is ascending. To specify descending order for a field, add a suffix `" desc"`. |
| `pageSize` | query | integer (int32) | no | Optional. Maximum number of TrustConfigs to return per call. |
| `pageToken` | query | string | no | Optional. The value returned by the last `ListTrustConfigsResponse`. Indicates that this is a continuation of a prior `ListTrustConfigs` call, and that the system should return the next page of data. |

### `certificatemanager.projects.locations.trustConfigs.patch`

- Versions: v1
- `PATCH https://certificatemanager.googleapis.com/v1/{+name}`
- Updates a TrustConfig.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `TrustConfig`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Identifier. A user-defined name of the trust config. TrustConfig names must be unique globally and match pattern `projects/*/locations/*/trustConfigs/*`. |
| `updateMask` | query | string (google-fieldmask) | yes | Required. The update mask applies to the resource. For the `FieldMask` definition, see https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#fieldmask. |

### Example request skeleton

Generated from the Discovery entry of `certificatemanager.projects.locations.certificateIssuanceConfigs.get` (not in the official docs); replace the `{...}` path variables (URL-encode query values):

```bash
curl -X GET \
  -H "Authorization: Bearer $(gcloud auth print-access-token)" \
  "https://certificatemanager.googleapis.com/v1/{+name}"
```

## Notes

- Generated from the Discovery document(s) v1 of `certificatemanager` (retrieved 2026-11-14). Resources on this page: projects.
- The Required column is `yes` for path variables and required parameters, and `conditional` when the description says "Required if ..." (mutually exclusive alternatives), when a `parent.child` parameter is required only inside an optional parent message or one branch of a oneof. Path variables are `yes` unless a note below names an alternative route without them.
- Message schemas (the request and response types named above) are listed under `references/rest-schemas/certificatemanager/`; they are the `schemas` section of the Discovery documents in Source.
- Source: https://certificatemanager.googleapis.com/$discovery/rest?version=v1 (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
