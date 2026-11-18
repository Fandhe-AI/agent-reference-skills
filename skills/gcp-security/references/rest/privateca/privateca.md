---
source: https://privateca.googleapis.com/$discovery/rest?version=v1
---

# Certificate Authority API REST API (privateca)

## Signature / Usage

Base URL: `https://privateca.googleapis.com`. Methods are listed by `id`; the `Versions` line shows which API versions define the method (preferred: v1).

### `privateca.projects.locations.caPools.certificateAuthorities.activate`

- Versions: v1
- `POST https://privateca.googleapis.com/v1/{+name}:activate`
- Activate a CertificateAuthority that is in state AWAITING_USER_ACTIVATION and is of type SUBORDINATE. After the parent Certificate Authority signs a certificate signing request from FetchCertificateAuthorityCsr, this method can complete the activation process.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `ActivateCertificateAuthorityRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name for this CertificateAuthority in the format `projects/*/locations/*/caPools/*/certificateAuthorities/*`. |

### `privateca.projects.locations.caPools.certificateAuthorities.certificateRevocationLists.get`

- Versions: v1
- `GET https://privateca.googleapis.com/v1/{+name}`
- Returns a CertificateRevocationList.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `CertificateRevocationList`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the CertificateRevocationList to get. |

### `privateca.projects.locations.caPools.certificateAuthorities.certificateRevocationLists.getIamPolicy`

- Versions: v1
- `GET https://privateca.googleapis.com/v1/{+resource}:getIamPolicy`
- Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |
| `options.requestedPolicyVersion` | query | integer (int32) | no | Optional. The maximum policy version that will be used to format the policy. Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected. Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset. The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1. To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). |

### `privateca.projects.locations.caPools.certificateAuthorities.certificateRevocationLists.list`

- Versions: v1
- `GET https://privateca.googleapis.com/v1/{+parent}/certificateRevocationLists`
- Lists CertificateRevocationLists.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListCertificateRevocationListsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The resource name of the location associated with the CertificateRevocationLists, in the format `projects/*/locations/*/caPools/*/certificateAuthorities/*`. |
| `filter` | query | string | no | Optional. Only include resources that match the filter in the response. |
| `orderBy` | query | string | no | Optional. Specify how the results should be sorted. |
| `pageSize` | query | integer (int32) | no | Optional. Limit on the number of CertificateRevocationLists to include in the response. Further CertificateRevocationLists can subsequently be obtained by including the ListCertificateRevocationListsResponse.next_page_token in a subsequent request. If unspecified, the server will pick an appropriate default. |
| `pageToken` | query | string | no | Optional. Pagination token, returned earlier via ListCertificateRevocationListsResponse.next_page_token. |

### `privateca.projects.locations.caPools.certificateAuthorities.certificateRevocationLists.patch`

- Versions: v1
- `PATCH https://privateca.googleapis.com/v1/{+name}`
- Update a CertificateRevocationList.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `CertificateRevocationList`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Identifier. The resource name for this CertificateRevocationList in the format `projects/*/locations/*/caPools/*certificateAuthorities/*/ certificateRevocationLists/*`. |
| `requestId` | query | string | no | Optional. An ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |
| `updateMask` | query | string (google-fieldmask) | yes | Required. A list of fields to be updated in this request. |

### `privateca.projects.locations.caPools.certificateAuthorities.certificateRevocationLists.setIamPolicy`

- Versions: v1
- `POST https://privateca.googleapis.com/v1/{+resource}:setIamPolicy`
- Sets the access control policy on the specified resource. Replaces any existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and `PERMISSION_DENIED` errors.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `SetIamPolicyRequest`; Response: `Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being specified. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `privateca.projects.locations.caPools.certificateAuthorities.certificateRevocationLists.testIamPermissions`

- Versions: v1
- `POST https://privateca.googleapis.com/v1/{+resource}:testIamPermissions`
- Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a `NOT_FOUND` error. Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `TestIamPermissionsRequest`; Response: `TestIamPermissionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy detail is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `privateca.projects.locations.caPools.certificateAuthorities.create`

- Versions: v1
- `POST https://privateca.googleapis.com/v1/{+parent}/certificateAuthorities`
- Create a new CertificateAuthority in a given Project and Location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `CertificateAuthority`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The resource name of the CaPool associated with the CertificateAuthorities, in the format `projects/*/locations/*/caPools/*`. |
| `certificateAuthorityId` | query | string | yes | Required. It must be unique within a location and match the regular expression `[a-zA-Z0-9_-]{1,63}` |
| `requestId` | query | string | no | Optional. An ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `privateca.projects.locations.caPools.certificateAuthorities.delete`

- Versions: v1
- `DELETE https://privateca.googleapis.com/v1/{+name}`
- Delete a CertificateAuthority.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name for this CertificateAuthority in the format `projects/*/locations/*/caPools/*/certificateAuthorities/*`. |
| `ignoreActiveCertificates` | query | boolean | no | Optional. This field allows the CA to be deleted even if the CA has active certs. Active certs include both unrevoked and unexpired certs. |
| `ignoreDependentResources` | query | boolean | no | Optional. This field allows this CA to be deleted even if it's being depended on by another resource. However, doing so may result in unintended and unrecoverable effects on any dependent resources since the CA will no longer be able to issue certificates. |
| `requestId` | query | string | no | Optional. An ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |
| `skipGracePeriod` | query | boolean | no | Optional. If this flag is set, the Certificate Authority will be deleted as soon as possible without a 30-day grace period where undeletion would have been allowed. If you proceed, there will be no way to recover this CA. |

### `privateca.projects.locations.caPools.certificateAuthorities.disable`

- Versions: v1
- `POST https://privateca.googleapis.com/v1/{+name}:disable`
- Disable a CertificateAuthority.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `DisableCertificateAuthorityRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name for this CertificateAuthority in the format `projects/*/locations/*/caPools/*/certificateAuthorities/*`. |

### `privateca.projects.locations.caPools.certificateAuthorities.enable`

- Versions: v1
- `POST https://privateca.googleapis.com/v1/{+name}:enable`
- Enable a CertificateAuthority.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `EnableCertificateAuthorityRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name for this CertificateAuthority in the format `projects/*/locations/*/caPools/*/certificateAuthorities/*`. |

### `privateca.projects.locations.caPools.certificateAuthorities.fetch`

- Versions: v1
- `GET https://privateca.googleapis.com/v1/{+name}:fetch`
- Fetch a certificate signing request (CSR) from a CertificateAuthority that is in state AWAITING_USER_ACTIVATION and is of type SUBORDINATE. The CSR must then be signed by the desired parent Certificate Authority, which could be another CertificateAuthority resource, or could be an on-prem certificate authority. See also ActivateCertificateAuthority.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `FetchCertificateAuthorityCsrResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name for this CertificateAuthority in the format `projects/*/locations/*/caPools/*/certificateAuthorities/*`. |

### `privateca.projects.locations.caPools.certificateAuthorities.get`

- Versions: v1
- `GET https://privateca.googleapis.com/v1/{+name}`
- Returns a CertificateAuthority.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `CertificateAuthority`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the CertificateAuthority to get. |

### `privateca.projects.locations.caPools.certificateAuthorities.list`

- Versions: v1
- `GET https://privateca.googleapis.com/v1/{+parent}/certificateAuthorities`
- Lists CertificateAuthorities.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListCertificateAuthoritiesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The resource name of the CaPool associated with the CertificateAuthorities, in the format `projects/*/locations/*/caPools/*`. |
| `filter` | query | string | no | Optional. Only include resources that match the filter in the response. |
| `orderBy` | query | string | no | Optional. Specify how the results should be sorted. |
| `pageSize` | query | integer (int32) | no | Optional. Limit on the number of CertificateAuthorities to include in the response. Further CertificateAuthorities can subsequently be obtained by including the ListCertificateAuthoritiesResponse.next_page_token in a subsequent request. If unspecified, the server will pick an appropriate default. |
| `pageToken` | query | string | no | Optional. Pagination token, returned earlier via ListCertificateAuthoritiesResponse.next_page_token. |

### `privateca.projects.locations.caPools.certificateAuthorities.patch`

- Versions: v1
- `PATCH https://privateca.googleapis.com/v1/{+name}`
- Update a CertificateAuthority.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `CertificateAuthority`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Identifier. The resource name for this CertificateAuthority in the format `projects/*/locations/*/caPools/*/certificateAuthorities/*`. |
| `requestId` | query | string | no | Optional. An ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |
| `updateMask` | query | string (google-fieldmask) | yes | Required. A list of fields to be updated in this request. |

### `privateca.projects.locations.caPools.certificateAuthorities.undelete`

- Versions: v1
- `POST https://privateca.googleapis.com/v1/{+name}:undelete`
- Undelete a CertificateAuthority that has been deleted.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `UndeleteCertificateAuthorityRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name for this CertificateAuthority in the format `projects/*/locations/*/caPools/*/certificateAuthorities/*`. |

### `privateca.projects.locations.caPools.certificates.create`

- Versions: v1
- `POST https://privateca.googleapis.com/v1/{+parent}/certificates`
- Create a new Certificate in a given Project, Location from a particular CaPool.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `Certificate`; Response: `Certificate`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The resource name of the CaPool associated with the Certificate, in the format `projects/*/locations/*/caPools/*`. |
| `certificateId` | query | string | conditional | Optional. It must be unique within a location and match the regular expression `[a-zA-Z0-9_-]{1,63}`. This field is required when using a CertificateAuthority in the Enterprise CertificateAuthority.tier, but is optional and its value is ignored otherwise. |
| `issuingCertificateAuthorityId` | query | string | no | Optional. The resource ID of the CertificateAuthority that should issue the certificate. This optional field will ignore the load-balancing scheme of the Pool and directly issue the certificate from the CA with the specified ID, contained in the same CaPool referenced by `parent`. Per-CA quota rules apply. If left empty, a CertificateAuthority will be chosen from the CaPool by the service. For example, to issue a Certificate from a Certificate Authority with resource name "projects/my-project/locations/us-central1/caPools/my-pool/certificateAuthorities/my-ca", you can set the parent to "projects/my-project/locations/us-central1/caPools/my-pool" and the issuing_certificate_authority_id to "my-ca". |
| `requestId` | query | string | no | Optional. An ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |
| `validateOnly` | query | boolean | no | Optional. If this is true, no Certificate resource will be persisted regardless of the CaPool's tier, and the returned Certificate will not contain the pem_certificate field. |

### `privateca.projects.locations.caPools.certificates.get`

- Versions: v1
- `GET https://privateca.googleapis.com/v1/{+name}`
- Returns a Certificate.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Certificate`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the Certificate to get. |

### `privateca.projects.locations.caPools.certificates.list`

- Versions: v1
- `GET https://privateca.googleapis.com/v1/{+parent}/certificates`
- Lists Certificates.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListCertificatesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The resource name of the parent associated with the Certificates, in the format `projects/*/locations/*/caPools/*`. The parent resource name can be in one of two forms: 1. \*\*Specific CA Pool:\*\* To list certificates within a single CA Pool: `projects/*/locations/*/caPools/*` 2. \*\*All CA Pools in a Location:\*\* To list certificates across \*all\* CA Pools in a given project and location, use the wildcard character (`-`) in place of the CA Pool ID. Example: `projects/*/locations/*/caPools/-` |
| `filter` | query | string | no | Optional. Only include resources that match the filter in the response. For details on supported filters and syntax, see Certificates Filtering documentation (https://cloud.google.com/certificate-authority-service/docs/sorting-filtering-certificates#filtering_support). |
| `orderBy` | query | string | no | Optional. Specify how the results should be sorted. For details on supported fields and syntax, see Certificates Sorting documentation (https://cloud.google.com/certificate-authority-service/docs/sorting-filtering-certificates#sorting_support). |
| `pageSize` | query | integer (int32) | no | Optional. Limit on the number of Certificates to include in the response. Further Certificates can subsequently be obtained by including the ListCertificatesResponse.next_page_token in a subsequent request. If unspecified, the server will pick an appropriate default. |
| `pageToken` | query | string | no | Optional. Pagination token, returned earlier via ListCertificatesResponse.next_page_token. |

### `privateca.projects.locations.caPools.certificates.patch`

- Versions: v1
- `PATCH https://privateca.googleapis.com/v1/{+name}`
- Update a Certificate. Currently, the only field you can update is the labels field.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `Certificate`; Response: `Certificate`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Identifier. The resource name for this Certificate in the format `projects/*/locations/*/caPools/*/certificates/*`. |
| `requestId` | query | string | no | Optional. An ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |
| `updateMask` | query | string (google-fieldmask) | yes | Required. A list of fields to be updated in this request. |

### `privateca.projects.locations.caPools.certificates.revoke`

- Versions: v1
- `POST https://privateca.googleapis.com/v1/{+name}:revoke`
- Revoke a Certificate.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `RevokeCertificateRequest`; Response: `Certificate`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name for this Certificate in the format `projects/*/locations/*/caPools/*/certificates/*`. |

### `privateca.projects.locations.caPools.create`

- Versions: v1
- `POST https://privateca.googleapis.com/v1/{+parent}/caPools`
- Create a CaPool.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `CaPool`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The resource name of the location associated with the CaPool, in the format `projects/*/locations/*`. |
| `caPoolId` | query | string | yes | Required. It must be unique within a location and match the regular expression `[a-zA-Z0-9_-]{1,63}` |
| `requestId` | query | string | no | Optional. An ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `privateca.projects.locations.caPools.delete`

- Versions: v1
- `DELETE https://privateca.googleapis.com/v1/{+name}`
- Delete a CaPool.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name for this CaPool in the format `projects/*/locations/*/caPools/*`. |
| `ignoreDependentResources` | query | boolean | no | Optional. This field allows this pool to be deleted even if it's being depended on by another resource. However, doing so may result in unintended and unrecoverable effects on any dependent resources since the pool will no longer be able to issue certificates. |
| `requestId` | query | string | no | Optional. An ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `privateca.projects.locations.caPools.fetchCaCerts`

- Versions: v1
- `POST https://privateca.googleapis.com/v1/{+caPool}:fetchCaCerts`
- FetchCaCerts returns the current trust anchor for the CaPool. This will include CA certificate chains for all certificate authorities in the ENABLED, DISABLED, or STAGED states.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `FetchCaCertsRequest`; Response: `FetchCaCertsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `caPool` | path | string | yes | Required. The resource name for the CaPool in the format `projects/*/locations/*/caPools/*`. |

### `privateca.projects.locations.caPools.get`

- Versions: v1
- `GET https://privateca.googleapis.com/v1/{+name}`
- Returns a CaPool.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `CaPool`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the CaPool to get. |

### `privateca.projects.locations.caPools.getIamPolicy`

- Versions: v1
- `GET https://privateca.googleapis.com/v1/{+resource}:getIamPolicy`
- Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |
| `options.requestedPolicyVersion` | query | integer (int32) | no | Optional. The maximum policy version that will be used to format the policy. Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected. Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset. The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1. To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). |

### `privateca.projects.locations.caPools.list`

- Versions: v1
- `GET https://privateca.googleapis.com/v1/{+parent}/caPools`
- Lists CaPools.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListCaPoolsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The resource name of the location associated with the CaPools, in the format `projects/*/locations/*`. |
| `filter` | query | string | no | Optional. Only include resources that match the filter in the response. |
| `orderBy` | query | string | no | Optional. Specify how the results should be sorted. |
| `pageSize` | query | integer (int32) | no | Optional. Limit on the number of CaPools to include in the response. Further CaPools can subsequently be obtained by including the ListCaPoolsResponse.next_page_token in a subsequent request. If unspecified, the server will pick an appropriate default. |
| `pageToken` | query | string | no | Optional. Pagination token, returned earlier via ListCaPoolsResponse.next_page_token. |

### `privateca.projects.locations.caPools.patch`

- Versions: v1
- `PATCH https://privateca.googleapis.com/v1/{+name}`
- Update a CaPool.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `CaPool`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Identifier. The resource name for this CaPool in the format `projects/*/locations/*/caPools/*`. |
| `requestId` | query | string | no | Optional. An ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |
| `updateMask` | query | string (google-fieldmask) | yes | Required. A list of fields to be updated in this request. |

### `privateca.projects.locations.caPools.setIamPolicy`

- Versions: v1
- `POST https://privateca.googleapis.com/v1/{+resource}:setIamPolicy`
- Sets the access control policy on the specified resource. Replaces any existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and `PERMISSION_DENIED` errors.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `SetIamPolicyRequest`; Response: `Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being specified. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `privateca.projects.locations.caPools.testIamPermissions`

- Versions: v1
- `POST https://privateca.googleapis.com/v1/{+resource}:testIamPermissions`
- Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a `NOT_FOUND` error. Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `TestIamPermissionsRequest`; Response: `TestIamPermissionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy detail is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `privateca.projects.locations.certificateAuthorities.certificateRevocationLists.getIamPolicy`

- Versions: v1beta1
- `GET https://privateca.googleapis.com/v1beta1/{+resource}:getIamPolicy`
- Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |
| `options.requestedPolicyVersion` | query | integer (int32) | no | Optional. The maximum policy version that will be used to format the policy. Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected. Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset. The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1. To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). |

### `privateca.projects.locations.certificateAuthorities.certificateRevocationLists.setIamPolicy`

- Versions: v1beta1
- `POST https://privateca.googleapis.com/v1beta1/{+resource}:setIamPolicy`
- Sets the access control policy on the specified resource. Replaces any existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and `PERMISSION_DENIED` errors.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `SetIamPolicyRequest`; Response: `Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being specified. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `privateca.projects.locations.certificateAuthorities.certificateRevocationLists.testIamPermissions`

- Versions: v1beta1
- `POST https://privateca.googleapis.com/v1beta1/{+resource}:testIamPermissions`
- Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a `NOT_FOUND` error. Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `TestIamPermissionsRequest`; Response: `TestIamPermissionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy detail is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `privateca.projects.locations.certificateAuthorities.getIamPolicy`

- Versions: v1beta1
- `GET https://privateca.googleapis.com/v1beta1/{+resource}:getIamPolicy`
- Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |
| `options.requestedPolicyVersion` | query | integer (int32) | no | Optional. The maximum policy version that will be used to format the policy. Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected. Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset. The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1. To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). |

### `privateca.projects.locations.certificateAuthorities.setIamPolicy`

- Versions: v1beta1
- `POST https://privateca.googleapis.com/v1beta1/{+resource}:setIamPolicy`
- Sets the access control policy on the specified resource. Replaces any existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and `PERMISSION_DENIED` errors.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `SetIamPolicyRequest`; Response: `Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being specified. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `privateca.projects.locations.certificateAuthorities.testIamPermissions`

- Versions: v1beta1
- `POST https://privateca.googleapis.com/v1beta1/{+resource}:testIamPermissions`
- Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a `NOT_FOUND` error. Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `TestIamPermissionsRequest`; Response: `TestIamPermissionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy detail is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `privateca.projects.locations.certificateTemplates.create`

- Versions: v1
- `POST https://privateca.googleapis.com/v1/{+parent}/certificateTemplates`
- Create a new CertificateTemplate in a given Project and Location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `CertificateTemplate`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The resource name of the location associated with the CertificateTemplate, in the format `projects/*/locations/*`. |
| `certificateTemplateId` | query | string | yes | Required. It must be unique within a location and match the regular expression `[a-zA-Z0-9_-]{1,63}` |
| `requestId` | query | string | no | Optional. An ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `privateca.projects.locations.certificateTemplates.delete`

- Versions: v1
- `DELETE https://privateca.googleapis.com/v1/{+name}`
- DeleteCertificateTemplate deletes a CertificateTemplate.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name for this CertificateTemplate in the format `projects/*/locations/*/certificateTemplates/*`. |
| `requestId` | query | string | no | Optional. An ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `privateca.projects.locations.certificateTemplates.get`

- Versions: v1
- `GET https://privateca.googleapis.com/v1/{+name}`
- Returns a CertificateTemplate.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `CertificateTemplate`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the CertificateTemplate to get. |

### `privateca.projects.locations.certificateTemplates.getIamPolicy`

- Versions: v1
- `GET https://privateca.googleapis.com/v1/{+resource}:getIamPolicy`
- Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |
| `options.requestedPolicyVersion` | query | integer (int32) | no | Optional. The maximum policy version that will be used to format the policy. Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected. Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset. The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1. To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). |

### `privateca.projects.locations.certificateTemplates.list`

- Versions: v1
- `GET https://privateca.googleapis.com/v1/{+parent}/certificateTemplates`
- Lists CertificateTemplates.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListCertificateTemplatesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The resource name of the location associated with the CertificateTemplates, in the format `projects/*/locations/*`. |
| `filter` | query | string | no | Optional. Only include resources that match the filter in the response. |
| `orderBy` | query | string | no | Optional. Specify how the results should be sorted. |
| `pageSize` | query | integer (int32) | no | Optional. Limit on the number of CertificateTemplates to include in the response. Further CertificateTemplates can subsequently be obtained by including the ListCertificateTemplatesResponse.next_page_token in a subsequent request. If unspecified, the server will pick an appropriate default. |
| `pageToken` | query | string | no | Optional. Pagination token, returned earlier via ListCertificateTemplatesResponse.next_page_token. |

### `privateca.projects.locations.certificateTemplates.patch`

- Versions: v1
- `PATCH https://privateca.googleapis.com/v1/{+name}`
- Update a CertificateTemplate.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `CertificateTemplate`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Identifier. The resource name for this CertificateTemplate in the format `projects/*/locations/*/certificateTemplates/*`. |
| `requestId` | query | string | no | Optional. An ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |
| `updateMask` | query | string (google-fieldmask) | yes | Required. A list of fields to be updated in this request. |

### `privateca.projects.locations.certificateTemplates.setIamPolicy`

- Versions: v1
- `POST https://privateca.googleapis.com/v1/{+resource}:setIamPolicy`
- Sets the access control policy on the specified resource. Replaces any existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and `PERMISSION_DENIED` errors.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `SetIamPolicyRequest`; Response: `Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being specified. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `privateca.projects.locations.certificateTemplates.testIamPermissions`

- Versions: v1
- `POST https://privateca.googleapis.com/v1/{+resource}:testIamPermissions`
- Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a `NOT_FOUND` error. Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `TestIamPermissionsRequest`; Response: `TestIamPermissionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy detail is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `privateca.projects.locations.get`

- Versions: v1, v1beta1
- `GET https://privateca.googleapis.com/v1/{+name}`
- Gets information about a location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Location`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Resource name for the location. |

### `privateca.projects.locations.list`

- Versions: v1, v1beta1
- `GET https://privateca.googleapis.com/v1/{+name}/locations`
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

### `privateca.projects.locations.operations.cancel`

- Versions: v1, v1beta1
- `POST https://privateca.googleapis.com/v1/{+name}:cancel`
- Starts asynchronous cancellation on a long-running operation. The server makes a best effort to cancel the operation, but success is not guaranteed. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`. Clients can use Operations.GetOperation or other methods to check whether the cancellation succeeded or whether the operation completed despite cancellation. On successful cancellation, the operation is not deleted; instead, it becomes an operation with an Operation.error value with a google.rpc.Status.code of `1`, corresponding to `Code.CANCELLED`.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `CancelOperationRequest`; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation resource to be cancelled. |

### `privateca.projects.locations.operations.delete`

- Versions: v1, v1beta1
- `DELETE https://privateca.googleapis.com/v1/{+name}`
- Deletes a long-running operation. This method indicates that the client is no longer interested in the operation result. It does not cancel the operation. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation resource to be deleted. |

### `privateca.projects.locations.operations.get`

- Versions: v1, v1beta1
- `GET https://privateca.googleapis.com/v1/{+name}`
- Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation resource. |

### `privateca.projects.locations.operations.list`

- Versions: v1, v1beta1
- `GET https://privateca.googleapis.com/v1/{+name}/operations`
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

### `privateca.projects.locations.reusableConfigs.getIamPolicy`

- Versions: v1beta1
- `GET https://privateca.googleapis.com/v1beta1/{+resource}:getIamPolicy`
- Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |
| `options.requestedPolicyVersion` | query | integer (int32) | no | Optional. The maximum policy version that will be used to format the policy. Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected. Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset. The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1. To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). |

### `privateca.projects.locations.reusableConfigs.setIamPolicy`

- Versions: v1beta1
- `POST https://privateca.googleapis.com/v1beta1/{+resource}:setIamPolicy`
- Sets the access control policy on the specified resource. Replaces any existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and `PERMISSION_DENIED` errors.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `SetIamPolicyRequest`; Response: `Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being specified. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `privateca.projects.locations.reusableConfigs.testIamPermissions`

- Versions: v1beta1
- `POST https://privateca.googleapis.com/v1beta1/{+resource}:testIamPermissions`
- Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a `NOT_FOUND` error. Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `TestIamPermissionsRequest`; Response: `TestIamPermissionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy detail is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### Example request skeleton

Generated from the Discovery entry of `privateca.projects.locations.caPools.certificateAuthorities.certificateRevocationLists.get` (not in the official docs); replace the `{...}` path variables (URL-encode query values):

```bash
curl -X GET \
  -H "Authorization: Bearer $(gcloud auth print-access-token)" \
  "https://privateca.googleapis.com/v1/{+name}"
```

## Notes

- Generated from the Discovery document(s) v1, v1beta1 of `privateca` (retrieved 2026-11-14). Resources on this page: projects.
- The Required column is `yes` for path variables and required parameters, and `conditional` when the description says "Required if ..." (mutually exclusive alternatives), when a `parent.child` parameter is required only inside an optional parent message or one branch of a oneof. Path variables are `yes` unless a note below names an alternative route without them.
- Message schemas (the request and response types named above) are listed under `references/rest-schemas/privateca/`; they are the `schemas` section of the Discovery documents in Source.
- Corrected from the Discovery document: the description of `name` in `privateca.projects.locations.caPools.certificateAuthorities.certificateRevocationLists.patch` gives the resource name format `projects/*/locations/*/caPools/*certificateAuthorities/*/ certificateRevocationLists/*`, but the path pattern of `name` is `^projects/[^/]+/locations/[^/]+/caPools/[^/]+/certificateAuthorities/[^/]+/certificateRevocationLists/[^/]+$`; a value must match the pattern to reach the route.
- Corrected from the official docs (the Discovery text above is verbatim): the `CertificateRevocationList` `name` format is written `projects/*/locations/*/caPools/*certificateAuthorities/*/ certificateRevocationLists/*` (no `/` after `caPools/*`, and a space before `certificateRevocationLists`); the Discovery path pattern of `certificateRevocationLists.patch` is `projects/[^/]+/locations/[^/]+/caPools/[^/]+/certificateAuthorities/[^/]+/certificateRevocationLists/[^/]+`.
- Source: https://privateca.googleapis.com/$discovery/rest?version=v1, https://privateca.googleapis.com/$discovery/rest?version=v1beta1 (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
