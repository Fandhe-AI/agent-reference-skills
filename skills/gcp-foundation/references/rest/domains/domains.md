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
- Lists information about the supported locations for this service. This method lists locations based on the resource scope provided in the ListLocationsRequest.name field: \* \*\*Global locations\*\*: If `name` is empty, the method lists the public locations available to all projects. \* \*\*Project-specific locations\*\*: If `name` follows the format `projects/{project}`, the method lists locations visible…
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListLocationsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The resource that owns the locations collection, if applicable. |
| `extraLocationTypes` | query | string | no | Optional. Do not use this field unless explicitly documented otherwise. This is primarily for internal usage. |
| `filter` | query | string | no | A filter to narrow down results to a preferred subset. The filtering language accepts strings like `"displayName=tokyo"`, and is documented in more detail in [AIP-160](https://google.aip.dev/160). |
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
| `returnPartialSuccess` | query | boolean | no | When set to `true`, operations that are reachable are returned as normal, and those that are unreachable are returned in the ListOperationsResponse.unreachable field. This can only be `true` when reading across collections. For example, when `parent` is set to `"projects/example/locations/-"`. This… |

### `domains.projects.locations.registrations.configureContactSettings`

- Versions: v1, v1beta1, v1alpha2
- `POST https://domains.googleapis.com/v1/{+registration}:configureContactSettings`
- Updates a `Registration`'s contact settings. Some changes require confirmation by the domain's registrant contact . Caution: Please consider carefully any changes to contact privacy settings when changing from `REDACTED_CONTACT_DATA` to `PUBLIC_CONTACT_DATA.` There may be a delay in reflecting updates you make to registrant contact information such that any changes you make to contact privacy (in…
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
- Deletes a `Registration` resource. This method works on any `Registration` resource using [Subscription or Commitment billing](/domains/pricing#billing-models), provided that the resource was created at least 1 day in the past. When an active registration is successfully deleted, you can continue to use the domain in [Google Domains](https://domains.google/) until it expires. The calling user bec…
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the `Registration` to delete, in the format `projects/*/locations/*/registrations/*`. |

### `domains.projects.locations.registrations.export`

- Versions: v1, v1beta1, v1alpha2
- `POST https://domains.googleapis.com/v1/{+name}:export`
- Deprecated: For more information, see [Cloud Domains feature deprecation](https://cloud.google.com/domains/docs/deprecations/feature-deprecations) Exports a `Registration` resource, such that it is no longer managed by Cloud Domains. When an active domain is successfully exported, you can continue to use the domain in [Google Domains](https://domains.google/) until it expires. The calling user be…
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
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |
| `options.requestedPolicyVersion` | query | integer (int32) | no | Optional. The maximum policy version that will be used to format the policy. Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected. Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify a… |

### `domains.projects.locations.registrations.import`

- Versions: v1, v1beta1, v1alpha2
- `POST https://domains.googleapis.com/v1/{+parent}/registrations:import`
- Deprecated: For more information, see [Cloud Domains feature deprecation](https://cloud.google.com/domains/docs/deprecations/feature-deprecations) Imports a domain name from [Google Domains](https://domains.google/) for use in Cloud Domains. To transfer a domain from another registrar, use the `TransferDomain` method instead. Since individual users can own domains in Google Domains, the calling u…
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `ImportDomainRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent resource of the Registration. Must be in the format `projects/*/locations/*`. |

### `domains.projects.locations.registrations.initiatePushTransfer`

- Versions: v1, v1beta1, v1alpha2
- `POST https://domains.googleapis.com/v1/{+registration}:initiatePushTransfer`
- Initiates the `Push Transfer` process to transfer the domain to another registrar. The process might complete instantly or might require confirmation or additional work. Check the emails sent to the email address of the registrant. The process is aborted after a timeout if it's not completed. This method is only supported for domains that have the `REQUIRE_PUSH_TRANSFER` property in the list of `…
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
| `filter` | query | string | no | Filter expression to restrict the `Registration`s returned. The expression must specify the field name, a comparison operator, and the value that you want to use for filtering. The value must be a string, a number, a boolean, or an enum value. The comparison operator should be one of =, !=, >, <, >… |
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
| `updateMask` | query | string (google-fieldmask) | no | Required. The field mask describing which fields to update as a comma-separated list. For example, if only the labels are being updated, the `update_mask` is `"labels"`. |
| `validateOnly` | query | boolean | no | Optional. If set, validates the request without actually updating the registration. |

### `domains.projects.locations.registrations.register`

- Versions: v1, v1beta1, v1alpha2
- `POST https://domains.googleapis.com/v1/{+parent}/registrations:register`
- Registers a new domain name and creates a corresponding `Registration` resource. Call `RetrieveRegisterParameters` first to check availability of the domain name and determine parameters like price that are needed to build a call to this method. A successful call creates a `Registration` resource in state `REGISTRATION_PENDING`, which resolves to `ACTIVE` within 1-2 minutes, indicating that the d…
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
- Resets the authorization code of the `Registration` to a new random string. You can call this method only after 60 days have elapsed since the initial domain registration. Domains that have the `REQUIRE_PUSH_TRANSFER` property in the list of `domain_properties` don't support authorization codes and must use the `InitiatePushTransfer` method to initiate the process to transfer the domain to a diff…
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `ResetAuthorizationCodeRequest`; Response: `AuthorizationCode`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `registration` | path | string | yes | Required. The name of the `Registration` whose authorization code is being reset, in the format `projects/*/locations/*/registrations/*`. |

### `domains.projects.locations.registrations.retrieveAuthorizationCode`

- Versions: v1, v1beta1, v1alpha2
- `GET https://domains.googleapis.com/v1/{+registration}:retrieveAuthorizationCode`
- Gets the authorization code of the `Registration` for the purpose of transferring the domain to another registrar. You can call this method only after 60 days have elapsed since the initial domain registration. Domains that have the `REQUIRE_PUSH_TRANSFER` property in the list of `domain_properties` don't support authorization codes and must use the `InitiatePushTransfer` method to initiate the p…
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
- Deprecated: For more information, see [Cloud Domains feature deprecation](https://cloud.google.com/domains/docs/deprecations/feature-deprecations) Lists domain names from [Google Domains](https://domains.google/) that can be imported to Cloud Domains using the `ImportDomain` method. Since individual users can own domains in Google Domains, the list of domains returned depends on the individual us…
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
| `domainName` | query | string | no | Required. The domain name. Unicode domain names must be expressed in Punycode format. |

### `domains.projects.locations.registrations.retrieveTransferParameters`

- Versions: v1, v1beta1, v1alpha2
- `GET https://domains.googleapis.com/v1/{+location}/registrations:retrieveTransferParameters`
- Deprecated: For more information, see [Cloud Domains feature deprecation](https://cloud.google.com/domains/docs/deprecations/feature-deprecations) Gets parameters needed to transfer a domain name from another registrar to Cloud Domains. For domains already managed by [Google Domains](https://domains.google/), use `ImportDomain` instead. Use the returned values to call `TransferDomain`.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `RetrieveTransferParametersResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `location` | path | string | yes | Required. The location. Must be in the format `projects/*/locations/*`. |
| `domainName` | query | string | no | Required. The domain name. Unicode domain names must be expressed in Punycode format. |

### `domains.projects.locations.registrations.searchDomains`

- Versions: v1, v1beta1, v1alpha2
- `GET https://domains.googleapis.com/v1/{+location}/registrations:searchDomains`
- Searches for available domain names similar to the provided query. Availability results from this method are approximate; call `RetrieveRegisterParameters` on a domain before registering to confirm availability.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `SearchDomainsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `location` | path | string | yes | Required. The location. Must be in the format `projects/*/locations/*`. |
| `query` | query | string | no | Required. String used to search for available domain names. |

### `domains.projects.locations.registrations.setIamPolicy`

- Versions: v1, v1beta1, v1alpha2
- `POST https://domains.googleapis.com/v1/{+resource}:setIamPolicy`
- Sets the access control policy on the specified resource. Replaces any existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and `PERMISSION_DENIED` errors.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `SetIamPolicyRequest`; Response: `Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being specified. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `domains.projects.locations.registrations.testIamPermissions`

- Versions: v1, v1beta1, v1alpha2
- `POST https://domains.googleapis.com/v1/{+resource}:testIamPermissions`
- Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a `NOT_FOUND` error. Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `TestIamPermissionsRequest`; Response: `TestIamPermissionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy detail is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `domains.projects.locations.registrations.transfer`

- Versions: v1, v1beta1, v1alpha2
- `POST https://domains.googleapis.com/v1/{+parent}/registrations:transfer`
- Deprecated: For more information, see [Cloud Domains feature deprecation](https://cloud.google.com/domains/docs/deprecations/feature-deprecations) Transfers a domain name from another registrar to Cloud Domains. For domains already managed by [Google Domains](https://domains.google/), use `ImportDomain` instead. Before calling this method, go to the domain's current registrar to unlock the domain…
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `TransferDomainRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent resource of the `Registration`. Must be in the format `projects/*/locations/*`. |

## Notes

- Generated from the Discovery document(s) v1, v1beta1, v1alpha2 of `domains` (retrieved 2026-11-14). Resources on this page: projects.
- Message schemas are listed under `references/rest-schemas/domains/`.
- Source: https://domains.googleapis.com/$discovery/rest?version=v1 (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
