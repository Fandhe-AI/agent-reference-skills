---
source: https://domains.googleapis.com/$discovery/rest?version=v1
---

# Cloud Domains API REST API (domains)

## Signature / Usage

Base URL: `https://domains.googleapis.com`. Methods are listed by `id`; the `Versions` line shows which API versions define the method (preferred: v1).

### `domains.projects.locations.get`

- Versions: v1, v1beta1, v1alpha2
- `GET https://domains.googleapis.com/v1/{+name}`
- Gets information about a location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Location`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Resource name for the location. |

### `domains.projects.locations.list`

- Versions: v1, v1beta1, v1alpha2
- `GET https://domains.googleapis.com/v1/{+name}/locations`
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

### `domains.projects.locations.operations.get`

- Versions: v1, v1beta1, v1alpha2
- `GET https://domains.googleapis.com/v1/{+name}`
- Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation resource. |

### `domains.projects.locations.operations.list`

- Versions: v1, v1beta1, v1alpha2
- `GET https://domains.googleapis.com/v1/{+name}/operations`
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

### `domains.projects.locations.registrations.configureContactSettings`

- Versions: v1, v1beta1, v1alpha2
- `POST https://domains.googleapis.com/v1/{+registration}:configureContactSettings`
- Updates a `Registration`'s contact settings. Some changes require confirmation by the domain's registrant contact . Caution: Please consider carefully any changes to contact privacy settings when changing from `REDACTED_CONTACT_DATA` to `PUBLIC_CONTACT_DATA.` There may be a delay in reflecting updates you make to registrant contact information such that any changes you make to contact privacy (including from `REDACTED_CONTACT_DATA` to `PUBLIC_CONTACT_DATA`) will be applied without delay but changes to registrant contact information may take a limited time to be publicized. This means that changes to contact privacy from `REDACTED_CONTACT_DATA` to `PUBLIC_CONTACT_DATA` may make the previous registrant contact data public until the modified registrant contact details are published.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `ConfigureContactSettingsRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `registration` | path | string | yes | Required. The name of the `Registration` whose contact settings are being updated, in the format `projects/*/locations/*/registrations/*`. |

### `domains.projects.locations.registrations.configureDnsSettings`

- Versions: v1, v1beta1, v1alpha2
- `POST https://domains.googleapis.com/v1/{+registration}:configureDnsSettings`
- Updates a `Registration`'s DNS settings.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `ConfigureDnsSettingsRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `registration` | path | string | yes | Required. The name of the `Registration` whose DNS settings are being updated, in the format `projects/*/locations/*/registrations/*`. |

### `domains.projects.locations.registrations.configureManagementSettings`

- Versions: v1, v1beta1, v1alpha2
- `POST https://domains.googleapis.com/v1/{+registration}:configureManagementSettings`
- Updates a `Registration`'s management settings.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `ConfigureManagementSettingsRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `registration` | path | string | yes | Required. The name of the `Registration` whose management settings are being updated, in the format `projects/*/locations/*/registrations/*`. |

### `domains.projects.locations.registrations.delete`

- Versions: v1, v1beta1, v1alpha2
- `DELETE https://domains.googleapis.com/v1/{+name}`
- Deletes a `Registration` resource. This method works on any `Registration` resource using Subscription or Commitment billing, provided that the resource was created at least 1 day in the past. When an active registration is successfully deleted, you can continue to use the domain in Google Domains (https://domains.google/) until it expires. The calling user becomes the domain's sole owner in Google Domains, and permissions for the domain are subsequently managed there. The domain does not renew automatically unless the new owner sets up billing in Google Domains. After January 2024 you will only be able to delete `Registration` resources when `state` is one of: `EXPORTED`, `EXPIRED`,`REGISTRATION_FAILED` or `TRANSFER_FAILED`. See Cloud Domains feature deprecation (https://cloud.google.com/domains/docs/deprecations/feature-deprecations) for more details.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the `Registration` to delete, in the format `projects/*/locations/*/registrations/*`. |

### `domains.projects.locations.registrations.export`

- Versions: v1, v1beta1, v1alpha2
- `POST https://domains.googleapis.com/v1/{+name}:export`
- Deprecated: For more information, see Cloud Domains feature deprecation (https://cloud.google.com/domains/docs/deprecations/feature-deprecations) Exports a `Registration` resource, such that it is no longer managed by Cloud Domains. When an active domain is successfully exported, you can continue to use the domain in Google Domains (https://domains.google/) until it expires. The calling user becomes the domain's sole owner in Google Domains, and permissions for the domain are subsequently managed there. The domain does not renew automatically unless the new owner sets up billing in Google Domains.
- Deprecated: `deprecated: true` in the Discovery document
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `ExportRegistrationRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the `Registration` to export, in the format `projects/*/locations/*/registrations/*`. |

### `domains.projects.locations.registrations.get`

- Versions: v1, v1beta1, v1alpha2
- `GET https://domains.googleapis.com/v1/{+name}`
- Gets the details of a `Registration` resource.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Registration`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the `Registration` to get, in the format `projects/*/locations/*/registrations/*`. |

### `domains.projects.locations.registrations.getIamPolicy`

- Versions: v1, v1beta1, v1alpha2
- `GET https://domains.googleapis.com/v1/{+resource}:getIamPolicy`
- Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |
| `options.requestedPolicyVersion` | query | integer (int32) | no | Optional. The maximum policy version that will be used to format the policy. Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected. Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset. The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1. To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). |

### `domains.projects.locations.registrations.import`

- Versions: v1, v1beta1, v1alpha2
- `POST https://domains.googleapis.com/v1/{+parent}/registrations:import`
- Deprecated: For more information, see Cloud Domains feature deprecation (https://cloud.google.com/domains/docs/deprecations/feature-deprecations) Imports a domain name from Google Domains (https://domains.google/) for use in Cloud Domains. To transfer a domain from another registrar, use the `TransferDomain` method instead. Since individual users can own domains in Google Domains, the calling user must have ownership permission on the domain.
- Deprecated: `deprecated: true` in the Discovery document
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `ImportDomainRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent resource of the Registration. Must be in the format `projects/*/locations/*`. |

### `domains.projects.locations.registrations.initiatePushTransfer`

- Versions: v1, v1beta1, v1alpha2
- `POST https://domains.googleapis.com/v1/{+registration}:initiatePushTransfer`
- Initiates the `Push Transfer` process to transfer the domain to another registrar. The process might complete instantly or might require confirmation or additional work. Check the emails sent to the email address of the registrant. The process is aborted after a timeout if it's not completed. This method is only supported for domains that have the `REQUIRE_PUSH_TRANSFER` property in the list of `domain_properties`. The domain must also be unlocked before it can be transferred to a different registrar. For more information, see Transfer a registered domain to another registrar (https://cloud.google.com/domains/docs/transfer-domain-to-another-registrar).
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `InitiatePushTransferRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `registration` | path | string | yes | Required. The name of the `Registration` for which the push transfer is initiated, in the format `projects/*/locations/*/registrations/*`. |

### `domains.projects.locations.registrations.list`

- Versions: v1, v1beta1, v1alpha2
- `GET https://domains.googleapis.com/v1/{+parent}/registrations`
- Lists the `Registration` resources in a project.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListRegistrationsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The project and location from which to list `Registration`s, specified in the format `projects/*/locations/*`. |
| `filter` | query | string | no | Filter expression to restrict the `Registration`s returned. The expression must specify the field name, a comparison operator, and the value that you want to use for filtering. The value must be a string, a number, a boolean, or an enum value. The comparison operator should be one of =, !=, >, <, >=, <=, or : for prefix or wildcard matches. For example, to filter to a specific domain name, use an expression like `domainName="example.com"`. You can also check for the existence of a field; for example, to find domains using custom DNS settings, use an expression like `dnsSettings.customDns:*`. You can also create compound filters by combining expressions with the `AND` and `OR` operators. For example, to find domains that are suspended or have specific issues flagged, use an expression like `(state=SUSPENDED) OR (issue:*)`. |
| `pageSize` | query | integer (int32) | no | Maximum number of results to return. |
| `pageToken` | query | string | no | When set to the `next_page_token` from a prior response, provides the next page of results. |

### `domains.projects.locations.registrations.patch`

- Versions: v1, v1beta1, v1alpha2
- `PATCH https://domains.googleapis.com/v1/{+name}`
- Updates select fields of a `Registration` resource, notably `labels`. To update other fields, use the appropriate custom update method: \* To update management settings, see `ConfigureManagementSettings` \* To update DNS configuration, see `ConfigureDnsSettings` \* To update contact information, see `ConfigureContactSettings`
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `Registration`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Output only. Name of the `Registration` resource, in the format `projects/*/locations/*/registrations/`. |
| `updateMask` | query | string (google-fieldmask) | yes | Required. The field mask describing which fields to update as a comma-separated list. For example, if only the labels are being updated, the `update_mask` is `"labels"`. |
| `validateOnly` | query | boolean | no | Optional. If set, validates the request without actually updating the registration. |

### `domains.projects.locations.registrations.register`

- Versions: v1, v1beta1, v1alpha2
- `POST https://domains.googleapis.com/v1/{+parent}/registrations:register`
- Registers a new domain name and creates a corresponding `Registration` resource. Call `RetrieveRegisterParameters` first to check availability of the domain name and determine parameters like price that are needed to build a call to this method. A successful call creates a `Registration` resource in state `REGISTRATION_PENDING`, which resolves to `ACTIVE` within 1-2 minutes, indicating that the domain was successfully registered. If the resource ends up in state `REGISTRATION_FAILED`, it indicates that the domain was not registered successfully, and you can safely delete the resource and retry registration.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `RegisterDomainRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent resource of the `Registration`. Must be in the format `projects/*/locations/*`. |

### `domains.projects.locations.registrations.renewDomain`

- Versions: v1, v1beta1, v1alpha2
- `POST https://domains.googleapis.com/v1/{+registration}:renewDomain`
- Renews a recently expired domain. This method can only be called on domains that expired in the previous 30 days. After the renewal, the new expiration time of the domain is one year after the old expiration time and you are charged a `yearly_price` for the renewal.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `RenewDomainRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `registration` | path | string | yes | Required. The name of the `Registration` whish is being renewed, in the format `projects/*/locations/*/registrations/*`. |

### `domains.projects.locations.registrations.resetAuthorizationCode`

- Versions: v1, v1beta1, v1alpha2
- `POST https://domains.googleapis.com/v1/{+registration}:resetAuthorizationCode`
- Resets the authorization code of the `Registration` to a new random string. You can call this method only after 60 days have elapsed since the initial domain registration. Domains that have the `REQUIRE_PUSH_TRANSFER` property in the list of `domain_properties` don't support authorization codes and must use the `InitiatePushTransfer` method to initiate the process to transfer the domain to a different registrar.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `ResetAuthorizationCodeRequest`; Response: `AuthorizationCode`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `registration` | path | string | yes | Required. The name of the `Registration` whose authorization code is being reset, in the format `projects/*/locations/*/registrations/*`. |

### `domains.projects.locations.registrations.retrieveAuthorizationCode`

- Versions: v1, v1beta1, v1alpha2
- `GET https://domains.googleapis.com/v1/{+registration}:retrieveAuthorizationCode`
- Gets the authorization code of the `Registration` for the purpose of transferring the domain to another registrar. You can call this method only after 60 days have elapsed since the initial domain registration. Domains that have the `REQUIRE_PUSH_TRANSFER` property in the list of `domain_properties` don't support authorization codes and must use the `InitiatePushTransfer` method to initiate the process to transfer the domain to a different registrar.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `AuthorizationCode`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `registration` | path | string | yes | Required. The name of the `Registration` whose authorization code is being retrieved, in the format `projects/*/locations/*/registrations/*`. |

### `domains.projects.locations.registrations.retrieveGoogleDomainsDnsRecords`

- Versions: v1, v1beta1, v1alpha2
- `GET https://domains.googleapis.com/v1/{+registration}:retrieveGoogleDomainsDnsRecords`
- Lists the DNS records from the Google Domains DNS zone for domains that use the deprecated `google_domains_dns` in the `Registration`'s `dns_settings`.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `RetrieveGoogleDomainsDnsRecordsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `registration` | path | string | yes | Required. The name of the `Registration` whose Google Domains DNS records details you are retrieving, in the format `projects/*/locations/*/registrations/*`. |
| `pageSize` | query | integer (int32) | no | Optional. Maximum number of results to return. |
| `pageToken` | query | string | no | Optional. When set to the `next_page_token` from a prior response, provides the next page of results. |

### `domains.projects.locations.registrations.retrieveGoogleDomainsForwardingConfig`

- Versions: v1, v1beta1, v1alpha2
- `GET https://domains.googleapis.com/v1/{+registration}:retrieveGoogleDomainsForwardingConfig`
- Lists the deprecated domain and email forwarding configurations you set up in the deprecated Google Domains UI. The configuration is present only for domains with the `google_domains_redirects_data_available` set to `true` in the `Registration`'s `dns_settings`. A forwarding configuration might not work correctly if required DNS records are not present in the domain's authoritative DNS Zone.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `RetrieveGoogleDomainsForwardingConfigResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `registration` | path | string | yes | Required. The name of the `Registration` whose Google Domains forwarding configuration details are being retrieved, in the format `projects/*/locations/*/registrations/*`. |

### `domains.projects.locations.registrations.retrieveImportableDomains`

- Versions: v1, v1beta1, v1alpha2
- `GET https://domains.googleapis.com/v1/{+location}/registrations:retrieveImportableDomains`
- Deprecated: For more information, see Cloud Domains feature deprecation (https://cloud.google.com/domains/docs/deprecations/feature-deprecations) Lists domain names from Google Domains (https://domains.google/) that can be imported to Cloud Domains using the `ImportDomain` method. Since individual users can own domains in Google Domains, the list of domains returned depends on the individual user making the call. Domains already managed by Cloud Domains are not returned.
- Deprecated: `deprecated: true` in the Discovery document
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `RetrieveImportableDomainsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `location` | path | string | yes | Required. The location. Must be in the format `projects/*/locations/*`. |
| `pageSize` | query | integer (int32) | no | Maximum number of results to return. |
| `pageToken` | query | string | no | When set to the `next_page_token` from a prior response, provides the next page of results. |

### `domains.projects.locations.registrations.retrieveRegisterParameters`

- Versions: v1, v1beta1, v1alpha2
- `GET https://domains.googleapis.com/v1/{+location}/registrations:retrieveRegisterParameters`
- Gets parameters needed to register a new domain name, including price and up-to-date availability. Use the returned values to call `RegisterDomain`.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `RetrieveRegisterParametersResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `location` | path | string | yes | Required. The location. Must be in the format `projects/*/locations/*`. |
| `domainName` | query | string | yes | Required. The domain name. Unicode domain names must be expressed in Punycode format. |

### `domains.projects.locations.registrations.retrieveTransferParameters`

- Versions: v1, v1beta1, v1alpha2
- `GET https://domains.googleapis.com/v1/{+location}/registrations:retrieveTransferParameters`
- Deprecated: For more information, see Cloud Domains feature deprecation (https://cloud.google.com/domains/docs/deprecations/feature-deprecations) Gets parameters needed to transfer a domain name from another registrar to Cloud Domains. For domains already managed by Google Domains (https://domains.google/), use `ImportDomain` instead. Use the returned values to call `TransferDomain`.
- Deprecated: `deprecated: true` in the Discovery document
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `RetrieveTransferParametersResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `location` | path | string | yes | Required. The location. Must be in the format `projects/*/locations/*`. |
| `domainName` | query | string | yes | Required. The domain name. Unicode domain names must be expressed in Punycode format. |

### `domains.projects.locations.registrations.searchDomains`

- Versions: v1, v1beta1, v1alpha2
- `GET https://domains.googleapis.com/v1/{+location}/registrations:searchDomains`
- Searches for available domain names similar to the provided query. Availability results from this method are approximate; call `RetrieveRegisterParameters` on a domain before registering to confirm availability.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `SearchDomainsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `location` | path | string | yes | Required. The location. Must be in the format `projects/*/locations/*`. |
| `query` | query | string | yes | Required. String used to search for available domain names. |

### `domains.projects.locations.registrations.setIamPolicy`

- Versions: v1, v1beta1, v1alpha2
- `POST https://domains.googleapis.com/v1/{+resource}:setIamPolicy`
- Sets the access control policy on the specified resource. Replaces any existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and `PERMISSION_DENIED` errors.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `SetIamPolicyRequest`; Response: `Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being specified. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `domains.projects.locations.registrations.testIamPermissions`

- Versions: v1, v1beta1, v1alpha2
- `POST https://domains.googleapis.com/v1/{+resource}:testIamPermissions`
- Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a `NOT_FOUND` error. Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `TestIamPermissionsRequest`; Response: `TestIamPermissionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy detail is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `domains.projects.locations.registrations.transfer`

- Versions: v1, v1beta1, v1alpha2
- `POST https://domains.googleapis.com/v1/{+parent}/registrations:transfer`
- Deprecated: For more information, see Cloud Domains feature deprecation (https://cloud.google.com/domains/docs/deprecations/feature-deprecations) Transfers a domain name from another registrar to Cloud Domains. For domains already managed by Google Domains (https://domains.google/), use `ImportDomain` instead. Before calling this method, go to the domain's current registrar to unlock the domain for transfer and retrieve the domain's transfer authorization code. Then call `RetrieveTransferParameters` to confirm that the domain is unlocked and to get values needed to build a call to this method. A successful call creates a `Registration` resource in state `TRANSFER_PENDING`. It can take several days to complete the transfer process. The registrant can often speed up this process by approving the transfer through the current registrar, either by clicking a link in an email from the registrar or by visiting the registrar's website. A few minutes after transfer approval, the resource transitions to state `ACTIVE`, indicating that the transfer was successful. If the transfer is rejected or the request expires without being approved, the resource can end up in state `TRANSFER_FAILED`. If transfer fails, you can safely delete the resource and retry the transfer.
- Deprecated: `deprecated: true` in the Discovery document
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `TransferDomainRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent resource of the `Registration`. Must be in the format `projects/*/locations/*`. |

### Example request skeleton

Generated from the Discovery entry of `domains.projects.locations.get` (not in the official docs); replace the `{...}` path variables (URL-encode query values):

```bash
curl -X GET \
  -H "Authorization: Bearer $(gcloud auth print-access-token)" \
  "https://domains.googleapis.com/v1/{+name}"
```

## Notes

- Generated from the Discovery document(s) v1, v1beta1, v1alpha2 of `domains` (retrieved 2026-11-14). Resources on this page: projects.
- The Required column is `yes` for path variables and required parameters, and `conditional` when the description says "Required if ..." (mutually exclusive alternatives), when a `parent.child` parameter is required only inside an optional parent message or one branch of a oneof, or when a path variable is described as optional (the method then also accepts the URL without that segment, as its description says).
- Message schemas (the request and response types named above) are listed under `references/rest-schemas/domains/`; they are the `schemas` section of the Discovery documents in Source.
- Deprecated methods (`deprecated: true` in Discovery): `domains.projects.locations.registrations.export`, `domains.projects.locations.registrations.import`, `domains.projects.locations.registrations.retrieveImportableDomains`, `domains.projects.locations.registrations.retrieveTransferParameters`, `domains.projects.locations.registrations.transfer`. Avoid them in new code.
- Methods whose description announces a deprecation or a deprecation-related restriction: `domains.projects.locations.registrations.delete`, `domains.projects.locations.registrations.retrieveGoogleDomainsDnsRecords`, `domains.projects.locations.registrations.retrieveGoogleDomainsForwardingConfig`; read the method description above for the replacement.
- Restriction: after January 2024, `domains.projects.locations.registrations.delete` deletes a `Registration` only when `state` is `EXPORTED`, `EXPIRED`, `REGISTRATION_FAILED` or `TRANSFER_FAILED`; see https://cloud.google.com/domains/docs/deprecations/feature-deprecations.
- Descriptions are verbatim from Discovery, which drops angle-bracket placeholders of the source comments: a format such as `projects//locations/global` stands for `projects/{project}/locations/global` (likewise `"@.iam.gserviceaccount.com"` lost the account ID before `@`, and a name format ending in a collection such as `projects/*/locations/*/registrations/` lost its last ID), and an expression such as `... && in labels` lost its left operand (for example `'label_value' in labels`). Check the method or field in the product's REST reference before relying on such a format.
- Source: https://domains.googleapis.com/$discovery/rest?version=v1, https://domains.googleapis.com/$discovery/rest?version=v1beta1, https://domains.googleapis.com/$discovery/rest?version=v1alpha2 (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
