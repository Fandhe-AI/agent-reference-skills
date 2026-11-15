---
source: https://appengine.googleapis.com/$discovery/rest?version=v1
---

# App Engine Admin API REST API (appengine)

## Signature / Usage

Base URL: `https://appengine.googleapis.com`. Methods are listed by `id`; the `Versions` line shows which API versions define the method (preferred: v1).

### `appengine.apps.authorizedCertificates.create`

- Versions: v1, v1beta, v1alpha
- `POST https://appengine.googleapis.com/v1/apps/{appsId}/authorizedCertificates`
- Uploads the specified SSL certificate.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `AuthorizedCertificate`; Response: `AuthorizedCertificate`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `appsId` | path | string | yes | Part of `parent`. Required. Name of the parent Application resource. Example: apps/myapp. |

### `appengine.apps.authorizedCertificates.delete`

- Versions: v1, v1beta, v1alpha
- `DELETE https://appengine.googleapis.com/v1/apps/{appsId}/authorizedCertificates/{authorizedCertificatesId}`
- Deletes the specified SSL certificate.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `appsId` | path | string | yes | Part of `name`. Required. Name of the resource to delete. Example: apps/myapp/authorizedCertificates/12345. |
| `authorizedCertificatesId` | path | string | yes | Part of `name`. See documentation of `appsId`. |

### `appengine.apps.authorizedCertificates.get`

- Versions: v1, v1beta, v1alpha
- `GET https://appengine.googleapis.com/v1/apps/{appsId}/authorizedCertificates/{authorizedCertificatesId}`
- Gets the specified SSL certificate.
- Scopes: `https://www.googleapis.com/auth/appengine.admin`, `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`
- Request: —; Response: `AuthorizedCertificate`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `appsId` | path | string | yes | Part of `name`. Required. Name of the resource requested. Example: apps/myapp/authorizedCertificates/12345. |
| `authorizedCertificatesId` | path | string | yes | Part of `name`. See documentation of `appsId`. |
| `view` | query | string enum | no | Controls the set of fields returned in the GET response. Values: `BASIC_CERTIFICATE`, `FULL_CERTIFICATE`. |

### `appengine.apps.authorizedCertificates.list`

- Versions: v1, v1beta, v1alpha
- `GET https://appengine.googleapis.com/v1/apps/{appsId}/authorizedCertificates`
- Lists all SSL certificates the user is authorized to administer.
- Scopes: `https://www.googleapis.com/auth/appengine.admin`, `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`
- Request: —; Response: `ListAuthorizedCertificatesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `appsId` | path | string | yes | Part of `parent`. Required. Name of the parent Application resource. Example: apps/myapp. |
| `pageSize` | query | integer (int32) | no | Maximum results to return per page. |
| `pageToken` | query | string | no | Continuation token for fetching the next page of results. |
| `view` | query | string enum | no | Controls the set of fields returned in the LIST response. Values: `BASIC_CERTIFICATE`, `FULL_CERTIFICATE`. |

### `appengine.apps.authorizedCertificates.patch`

- Versions: v1, v1beta, v1alpha
- `PATCH https://appengine.googleapis.com/v1/apps/{appsId}/authorizedCertificates/{authorizedCertificatesId}`
- Updates the specified SSL certificate. To renew a certificate and maintain its existing domain mappings, update certificate_data with a new certificate. The new certificate must be applicable to the same domains as the original certificate. The certificate display_name may also be updated.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `AuthorizedCertificate`; Response: `AuthorizedCertificate`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `appsId` | path | string | yes | Part of `name`. Required. Name of the resource to update. Example: apps/myapp/authorizedCertificates/12345. |
| `authorizedCertificatesId` | path | string | yes | Part of `name`. See documentation of `appsId`. |
| `updateMask` | query | string (google-fieldmask) | no | Standard field mask for the set of fields to be updated. Updates are only supported on the certificate_raw_data and display_name fields. |

### `appengine.apps.authorizedDomains.list`

- Versions: v1, v1beta, v1alpha
- `GET https://appengine.googleapis.com/v1/apps/{appsId}/authorizedDomains`
- Lists all domains the user is authorized to administer.
- Scopes: `https://www.googleapis.com/auth/appengine.admin`, `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`
- Request: —; Response: `ListAuthorizedDomainsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `appsId` | path | string | yes | Part of `parent`. Required. Name of the parent Application resource. Example: apps/myapp. |
| `pageSize` | query | integer (int32) | no | Maximum results to return per page. |
| `pageToken` | query | string | no | Continuation token for fetching the next page of results. |

### `appengine.apps.create`

- Versions: v1, v1beta
- `POST https://appengine.googleapis.com/v1/apps`
- Creates an App Engine application for a Google Cloud Platform project. Required fields: id - The ID of the target Cloud Platform project. location - The region (https://cloud.google.com/appengine/docs/locations) where you want the App Engine application located.For more information about App Engine applications, see Managing Projects, Applications, and Billing (https://cloud.google.com/appengine/docs/standard/python/console/).
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `Application`; Response: `Operation`

### `appengine.apps.domainMappings.create`

- Versions: v1, v1beta, v1alpha
- `POST https://appengine.googleapis.com/v1/apps/{appsId}/domainMappings`
- Maps a domain to an application. A user must be authorized to administer a domain in order to map it to an application. For a list of available authorized domains, see AuthorizedDomains.ListAuthorizedDomains.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `DomainMapping`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `appsId` | path | string | yes | Part of `parent`. Required. Name of the parent Application resource. Example: apps/myapp. |
| `overrideStrategy` | query | string enum | no | Whether the domain creation should override any existing mappings for this domain. By default, overrides are rejected. Values: `UNSPECIFIED_DOMAIN_OVERRIDE_STRATEGY`, `STRICT`, `OVERRIDE`. |

### `appengine.apps.domainMappings.delete`

- Versions: v1, v1beta, v1alpha
- `DELETE https://appengine.googleapis.com/v1/apps/{appsId}/domainMappings/{domainMappingsId}`
- Deletes the specified domain mapping. A user must be authorized to administer the associated domain in order to delete a DomainMapping resource.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `appsId` | path | string | yes | Part of `name`. Required. Name of the resource to delete. Example: apps/myapp/domainMappings/example.com. |
| `domainMappingsId` | path | string | yes | Part of `name`. See documentation of `appsId`. |

### `appengine.apps.domainMappings.get`

- Versions: v1, v1beta, v1alpha
- `GET https://appengine.googleapis.com/v1/apps/{appsId}/domainMappings/{domainMappingsId}`
- Gets the specified domain mapping.
- Scopes: `https://www.googleapis.com/auth/appengine.admin`, `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`
- Request: —; Response: `DomainMapping`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `appsId` | path | string | yes | Part of `name`. Required. Name of the resource requested. Example: apps/myapp/domainMappings/example.com. |
| `domainMappingsId` | path | string | yes | Part of `name`. See documentation of `appsId`. |

### `appengine.apps.domainMappings.list`

- Versions: v1, v1beta, v1alpha
- `GET https://appengine.googleapis.com/v1/apps/{appsId}/domainMappings`
- Lists the domain mappings on an application.
- Scopes: `https://www.googleapis.com/auth/appengine.admin`, `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`
- Request: —; Response: `ListDomainMappingsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `appsId` | path | string | yes | Part of `parent`. Required. Name of the parent Application resource. Example: apps/myapp. |
| `pageSize` | query | integer (int32) | no | Maximum results to return per page. |
| `pageToken` | query | string | no | Continuation token for fetching the next page of results. |

### `appengine.apps.domainMappings.patch`

- Versions: v1, v1beta, v1alpha
- `PATCH https://appengine.googleapis.com/v1/apps/{appsId}/domainMappings/{domainMappingsId}`
- Updates the specified domain mapping. To map an SSL certificate to a domain mapping, update certificate_id to point to an AuthorizedCertificate resource. A user must be authorized to administer the associated domain in order to update a DomainMapping resource.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `DomainMapping`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `appsId` | path | string | yes | Part of `name`. Required. Name of the resource to update. Example: apps/myapp/domainMappings/example.com. |
| `domainMappingsId` | path | string | yes | Part of `name`. See documentation of `appsId`. |
| `updateMask` | query | string (google-fieldmask) | yes | Required. Standard field mask for the set of fields to be updated. |

### `appengine.apps.firewall.ingressRules.batchUpdate`

- Versions: v1, v1beta
- `POST https://appengine.googleapis.com/v1/apps/{appsId}/firewall/ingressRules:batchUpdate`
- Replaces the entire firewall ruleset in one bulk operation. This overrides and replaces the rules of an existing firewall with the new rules.If the final rule does not match traffic with the '\*' wildcard IP range, then an "allow all" rule is explicitly added to the end of the list.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `BatchUpdateIngressRulesRequest`; Response: `BatchUpdateIngressRulesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `appsId` | path | string | yes | Part of `name`. Name of the Firewall collection to set. Example: apps/myapp/firewall/ingressRules. |

### `appengine.apps.firewall.ingressRules.create`

- Versions: v1, v1beta
- `POST https://appengine.googleapis.com/v1/apps/{appsId}/firewall/ingressRules`
- Creates a firewall rule for the application.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `FirewallRule`; Response: `FirewallRule`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `appsId` | path | string | yes | Part of `parent`. Required. Name of the parent Firewall collection in which to create a new rule. Example: apps/myapp/firewall/ingressRules. |

### `appengine.apps.firewall.ingressRules.delete`

- Versions: v1, v1beta
- `DELETE https://appengine.googleapis.com/v1/apps/{appsId}/firewall/ingressRules/{ingressRulesId}`
- Deletes the specified firewall rule.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `appsId` | path | string | yes | Part of `name`. Name of the Firewall resource to delete. Example: apps/myapp/firewall/ingressRules/100. |
| `ingressRulesId` | path | string | yes | Part of `name`. See documentation of `appsId`. |

### `appengine.apps.firewall.ingressRules.get`

- Versions: v1, v1beta
- `GET https://appengine.googleapis.com/v1/apps/{appsId}/firewall/ingressRules/{ingressRulesId}`
- Gets the specified firewall rule.
- Scopes: `https://www.googleapis.com/auth/appengine.admin`, `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`
- Request: —; Response: `FirewallRule`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `appsId` | path | string | yes | Part of `name`. Name of the Firewall resource to retrieve. Example: apps/myapp/firewall/ingressRules/100. |
| `ingressRulesId` | path | string | yes | Part of `name`. See documentation of `appsId`. |

### `appengine.apps.firewall.ingressRules.list`

- Versions: v1, v1beta
- `GET https://appengine.googleapis.com/v1/apps/{appsId}/firewall/ingressRules`
- Lists the firewall rules of an application.
- Scopes: `https://www.googleapis.com/auth/appengine.admin`, `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`
- Request: —; Response: `ListIngressRulesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `appsId` | path | string | yes | Part of `parent`. Name of the Firewall collection to retrieve. Example: apps/myapp/firewall/ingressRules. |
| `matchingAddress` | query | string | no | A valid IP Address. If set, only rules matching this address will be returned. The first returned rule will be the rule that fires on requests from this IP. |
| `pageSize` | query | integer (int32) | no | Maximum results to return per page. |
| `pageToken` | query | string | no | Continuation token for fetching the next page of results. |

### `appengine.apps.firewall.ingressRules.patch`

- Versions: v1, v1beta
- `PATCH https://appengine.googleapis.com/v1/apps/{appsId}/firewall/ingressRules/{ingressRulesId}`
- Updates the specified firewall rule.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `FirewallRule`; Response: `FirewallRule`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `appsId` | path | string | yes | Part of `name`. Name of the Firewall resource to update. Example: apps/myapp/firewall/ingressRules/100. |
| `ingressRulesId` | path | string | yes | Part of `name`. See documentation of `appsId`. |
| `updateMask` | query | string (google-fieldmask) | no | Standard field mask for the set of fields to be updated. |

### `appengine.apps.get`

- Versions: v1, v1beta
- `GET https://appengine.googleapis.com/v1/apps/{appsId}`
- Gets information about an application.
- Scopes: `https://www.googleapis.com/auth/appengine.admin`, `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`
- Request: —; Response: `Application`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `appsId` | path | string | yes | Part of `name`. Required. Name of the Application resource to get. Example: apps/myapp. |
| `includeExtraData` | query | string enum | no | Options to include extra data Values: `INCLUDE_EXTRA_DATA_UNSPECIFIED`, `INCLUDE_EXTRA_DATA_NONE`, `INCLUDE_GOOGLE_GENERATED_METADATA`. |

### `appengine.apps.listRuntimes`

- Versions: v1, v1beta
- `GET https://appengine.googleapis.com/v1/apps/{appsId}:listRuntimes`
- Lists all the available runtimes for the application.
- Scopes: `https://www.googleapis.com/auth/appengine.admin`, `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`
- Request: —; Response: `ListRuntimesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `appsId` | path | string | yes | Part of `parent`. Required. Name of the parent Application resource. Example: apps/myapp. |
| `environment` | query | string enum | no | Optional. The environment of the Application. Values: `ENVIRONMENT_UNSPECIFIED`, `STANDARD`, `FLEXIBLE`. |

### `appengine.apps.locations.get`

- Versions: v1, v1beta, v1alpha
- `GET https://appengine.googleapis.com/v1/apps/{appsId}/locations/{locationsId}`
- Gets information about a location.
- Scopes: `https://www.googleapis.com/auth/appengine.admin`, `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`
- Request: —; Response: `Location`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `appsId` | path | string | yes | Part of `name`. Resource name for the location. |
| `locationsId` | path | string | yes | Part of `name`. See documentation of `appsId`. |

### `appengine.apps.locations.list`

- Versions: v1, v1beta, v1alpha
- `GET https://appengine.googleapis.com/v1/apps/{appsId}/locations`
- Lists information about the supported locations for this service.This method lists locations based on the resource scope provided in the ListLocationsRequest.name field: Global locations: If name is empty, the method lists the public locations available to all projects. Project-specific locations: If name follows the format projects/{project}, the method lists locations visible to that specific project. This includes public, private, or other project-specific locations enabled for the project.For gRPC and client library implementations, the resource name is passed as the name field. For direct service calls, the resource name is incorporated into the request path based on the specific service implementation and version.
- Scopes: `https://www.googleapis.com/auth/appengine.admin`, `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`
- Request: —; Response: `ListLocationsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `appsId` | path | string | yes | Part of `name`. The resource that owns the locations collection, if applicable. |
| `extraLocationTypes` | query | repeated string | no | Optional. Do not use this field unless explicitly documented otherwise. This is primarily for internal usage. |
| `filter` | query | string | no | A filter to narrow down results to a preferred subset. The filtering language accepts strings like "displayName=tokyo", and is documented in more detail in AIP-160 (https://google.aip.dev/160). |
| `pageSize` | query | integer (int32) | no | The maximum number of results to return. If not set, the service selects a default. |
| `pageToken` | query | string | no | A page token received from the next_page_token field in the response. Send that page token to receive the subsequent page. |

### `appengine.apps.operations.get`

- Versions: v1, v1beta, v1alpha
- `GET https://appengine.googleapis.com/v1/apps/{appsId}/operations/{operationsId}`
- Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service.
- Scopes: `https://www.googleapis.com/auth/appengine.admin`, `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `appsId` | path | string | yes | Part of `name`. The name of the operation resource. |
| `operationsId` | path | string | yes | Part of `name`. See documentation of `appsId`. |

### `appengine.apps.operations.list`

- Versions: v1, v1beta, v1alpha
- `GET https://appengine.googleapis.com/v1/apps/{appsId}/operations`
- Lists operations that match the specified filter in the request. If the server doesn't support this method, it returns UNIMPLEMENTED.
- Scopes: `https://www.googleapis.com/auth/appengine.admin`, `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`
- Request: —; Response: `ListOperationsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `appsId` | path | string | yes | Part of `name`. The name of the operation's parent resource. |
| `filter` | query | string | no | The standard list filter. |
| `pageSize` | query | integer (int32) | no | The standard list page size. |
| `pageToken` | query | string | no | The standard list page token. |
| `returnPartialSuccess` | query | boolean | no | When set to true, operations that are reachable are returned as normal, and those that are unreachable are returned in the ListOperationsResponse.unreachable field.This can only be true when reading across collections. For example, when parent is set to "projects/example/locations/-".This field is not supported by default and will result in an UNIMPLEMENTED error if set unless explicitly documented otherwise in service or product specific documentation. |

### `appengine.apps.patch`

- Versions: v1, v1beta
- `PATCH https://appengine.googleapis.com/v1/apps/{appsId}`
- Updates the specified Application resource. You can update the following fields: auth_domain - Google authentication domain for controlling user access to the application. default_cookie_expiration - Cookie expiration policy for the application. iap - Identity-Aware Proxy properties for the application.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `Application`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `appsId` | path | string | yes | Part of `name`. Required. Name of the Application resource to update. Example: apps/myapp. |
| `updateMask` | query | string (google-fieldmask) | yes | Required. Standard field mask for the set of fields to be updated. |

### `appengine.apps.repair`

- Versions: v1, v1beta
- `POST https://appengine.googleapis.com/v1/apps/{appsId}:repair`
- Recreates the required App Engine features for the specified App Engine application, for example a Cloud Storage bucket or App Engine service account. Use this method if you receive an error message about a missing feature, for example, Error retrieving the App Engine service account. If you have deleted your App Engine service account, this will not be able to recreate it. Instead, you should attempt to use the IAM undelete API if possible at https://cloud.google.com/iam/reference/rest/v1/projects.serviceAccounts/undelete?apix_params=%7B"name"%3A"projects%2F-%2FserviceAccounts%2Funique_id"%2C"resource"%3A%7B%7D%7D . If the deletion was recent, the numeric ID can be found in the Cloud Console Activity Log.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `RepairApplicationRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `appsId` | path | string | yes | Part of `name`. Required. Name of the application to repair. Example: apps/myapp |

### `appengine.apps.services.delete`

- Versions: v1, v1beta
- `DELETE https://appengine.googleapis.com/v1/apps/{appsId}/services/{servicesId}`
- Deletes the specified service and all enclosed versions.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `appsId` | path | string | yes | Part of `name`. Required. Name of the resource requested. Example: apps/myapp/services/default. |
| `servicesId` | path | string | yes | Part of `name`. See documentation of `appsId`. |

### `appengine.apps.services.get`

- Versions: v1, v1beta
- `GET https://appengine.googleapis.com/v1/apps/{appsId}/services/{servicesId}`
- Gets the current configuration of the specified service.
- Scopes: `https://www.googleapis.com/auth/appengine.admin`, `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`
- Request: —; Response: `Service`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `appsId` | path | string | yes | Part of `name`. Required. Name of the resource requested. Example: apps/myapp/services/default. |
| `servicesId` | path | string | yes | Part of `name`. See documentation of `appsId`. |

### `appengine.apps.services.list`

- Versions: v1, v1beta
- `GET https://appengine.googleapis.com/v1/apps/{appsId}/services`
- Lists all the services in the application.
- Scopes: `https://www.googleapis.com/auth/appengine.admin`, `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`
- Request: —; Response: `ListServicesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `appsId` | path | string | yes | Part of `parent`. Required. Name of the parent Application resource. Example: apps/myapp. |
| `pageSize` | query | integer (int32) | no | Maximum results to return per page. |
| `pageToken` | query | string | no | Continuation token for fetching the next page of results. |

### `appengine.apps.services.patch`

- Versions: v1, v1beta
- `PATCH https://appengine.googleapis.com/v1/apps/{appsId}/services/{servicesId}`
- Updates the configuration of the specified service.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `Service`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `appsId` | path | string | yes | Part of `name`. Required. Name of the resource to update. Example: apps/myapp/services/default. |
| `servicesId` | path | string | yes | Part of `name`. See documentation of `appsId`. |
| `migrateTraffic` | query | boolean | no | Set to true to gradually shift traffic to one or more versions that you specify. By default, traffic is shifted immediately. For gradual traffic migration, the target versions must be located within instances that are configured for both warmup requests (https://cloud.google.com/appengine/docs/admin-api/reference/rest/v1/apps.services.versions#InboundServiceType) and automatic scaling (https://cloud.google.com/appengine/docs/admin-api/reference/rest/v1/apps.services.versions#AutomaticScaling). You must specify the shardBy (https://cloud.google.com/appengine/docs/admin-api/reference/rest/v1/apps.services#ShardBy) field in the Service resource. Gradual traffic migration is not supported in the App Engine flexible environment. For examples, see Migrating and Splitting Traffic (https://cloud.google.com/appengine/docs/admin-api/migrating-splitting-traffic). |
| `updateMask` | query | string (google-fieldmask) | yes | Required. Standard field mask for the set of fields to be updated. |

### `appengine.apps.services.versions.create`

- Versions: v1, v1beta
- `POST https://appengine.googleapis.com/v1/apps/{appsId}/services/{servicesId}/versions`
- Deploys code and resource files to a new version.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `Version`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `appsId` | path | string | yes | Part of `parent`. Required. Name of the parent resource to create this version under. Example: apps/myapp/services/default. |
| `servicesId` | path | string | yes | Part of `parent`. See documentation of `appsId`. |

### `appengine.apps.services.versions.delete`

- Versions: v1, v1beta
- `DELETE https://appengine.googleapis.com/v1/apps/{appsId}/services/{servicesId}/versions/{versionsId}`
- Deletes an existing Version resource.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `appsId` | path | string | yes | Part of `name`. Required. Name of the resource requested. Example: apps/myapp/services/default/versions/v1. |
| `servicesId` | path | string | yes | Part of `name`. See documentation of `appsId`. |
| `versionsId` | path | string | yes | Part of `name`. See documentation of `appsId`. |

### `appengine.apps.services.versions.exportAppImage`

- Versions: v1, v1beta
- `POST https://appengine.googleapis.com/v1/apps/{appsId}/services/{servicesId}/versions/{versionsId}:exportAppImage`
- Exports a user image to Artifact Registry.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `ExportAppImageRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `appsId` | path | string | yes | Part of `name`. Required. Name of the App Engine version resource. Format: apps/{app}/services/{service}/versions/{version} |
| `servicesId` | path | string | yes | Part of `name`. See documentation of `appsId`. |
| `versionsId` | path | string | yes | Part of `name`. See documentation of `appsId`. |

### `appengine.apps.services.versions.get`

- Versions: v1, v1beta
- `GET https://appengine.googleapis.com/v1/apps/{appsId}/services/{servicesId}/versions/{versionsId}`
- Gets the specified Version resource. By default, only a BASIC_VIEW will be returned. Specify the FULL_VIEW parameter to get the full resource.
- Scopes: `https://www.googleapis.com/auth/appengine.admin`, `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`
- Request: —; Response: `Version`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `appsId` | path | string | yes | Part of `name`. Required. Name of the resource requested. Example: apps/myapp/services/default/versions/v1. |
| `servicesId` | path | string | yes | Part of `name`. See documentation of `appsId`. |
| `versionsId` | path | string | yes | Part of `name`. See documentation of `appsId`. |
| `view` | query | string enum | no | Controls the set of fields returned in the Get response. Values: `BASIC`, `FULL`. |

### `appengine.apps.services.versions.instances.debug`

- Versions: v1, v1beta
- `POST https://appengine.googleapis.com/v1/apps/{appsId}/services/{servicesId}/versions/{versionsId}/instances/{instancesId}:debug`
- Enables debugging on a VM instance. This allows you to use the SSH command to connect to the virtual machine where the instance lives. While in "debug mode", the instance continues to serve live traffic. You should delete the instance when you are done debugging and then allow the system to take over and determine if another instance should be started.Only applicable for instances in App Engine flexible environment.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `DebugInstanceRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `appsId` | path | string | yes | Part of `name`. Required. Name of the resource requested. Example: apps/myapp/services/default/versions/v1/instances/instance-1. |
| `servicesId` | path | string | yes | Part of `name`. See documentation of `appsId`. |
| `versionsId` | path | string | yes | Part of `name`. See documentation of `appsId`. |
| `instancesId` | path | string | yes | Part of `name`. See documentation of `appsId`. |

### `appengine.apps.services.versions.instances.delete`

- Versions: v1, v1beta
- `DELETE https://appengine.googleapis.com/v1/apps/{appsId}/services/{servicesId}/versions/{versionsId}/instances/{instancesId}`
- Stops a running instance.The instance might be automatically recreated based on the scaling settings of the version. For more information, see "How Instances are Managed" (standard environment (https://cloud.google.com/appengine/docs/standard/python/how-instances-are-managed) | flexible environment (https://cloud.google.com/appengine/docs/flexible/python/how-instances-are-managed)).To ensure that instances are not re-created and avoid getting billed, you can stop all instances within the target version by changing the serving status of the version to STOPPED with the apps.services.versions.patch (https://cloud.google.com/appengine/docs/admin-api/reference/rest/v1/apps.services.versions/patch) method.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `appsId` | path | string | yes | Part of `name`. Required. Name of the resource requested. Example: apps/myapp/services/default/versions/v1/instances/instance-1. |
| `servicesId` | path | string | yes | Part of `name`. See documentation of `appsId`. |
| `versionsId` | path | string | yes | Part of `name`. See documentation of `appsId`. |
| `instancesId` | path | string | yes | Part of `name`. See documentation of `appsId`. |

### `appengine.apps.services.versions.instances.get`

- Versions: v1, v1beta
- `GET https://appengine.googleapis.com/v1/apps/{appsId}/services/{servicesId}/versions/{versionsId}/instances/{instancesId}`
- Gets instance information.
- Scopes: `https://www.googleapis.com/auth/appengine.admin`, `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`
- Request: —; Response: `Instance`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `appsId` | path | string | yes | Part of `name`. Required. Name of the resource requested. Example: apps/myapp/services/default/versions/v1/instances/instance-1. |
| `servicesId` | path | string | yes | Part of `name`. See documentation of `appsId`. |
| `versionsId` | path | string | yes | Part of `name`. See documentation of `appsId`. |
| `instancesId` | path | string | yes | Part of `name`. See documentation of `appsId`. |

### `appengine.apps.services.versions.instances.list`

- Versions: v1, v1beta
- `GET https://appengine.googleapis.com/v1/apps/{appsId}/services/{servicesId}/versions/{versionsId}/instances`
- Lists the instances of a version.Tip: To aggregate details about instances over time, see the Stackdriver Monitoring API (https://cloud.google.com/monitoring/api/ref_v3/rest/v3/projects.timeSeries/list).
- Scopes: `https://www.googleapis.com/auth/appengine.admin`, `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`
- Request: —; Response: `ListInstancesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `appsId` | path | string | yes | Part of `parent`. Required. Name of the parent Version resource. Example: apps/myapp/services/default/versions/v1. |
| `servicesId` | path | string | yes | Part of `parent`. See documentation of `appsId`. |
| `versionsId` | path | string | yes | Part of `parent`. See documentation of `appsId`. |
| `pageSize` | query | integer (int32) | no | Maximum results to return per page. |
| `pageToken` | query | string | no | Continuation token for fetching the next page of results. |

### `appengine.apps.services.versions.list`

- Versions: v1, v1beta
- `GET https://appengine.googleapis.com/v1/apps/{appsId}/services/{servicesId}/versions`
- Lists the versions of a service.
- Scopes: `https://www.googleapis.com/auth/appengine.admin`, `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`
- Request: —; Response: `ListVersionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `appsId` | path | string | yes | Part of `parent`. Required. Name of the parent Service resource. Example: apps/myapp/services/default. |
| `servicesId` | path | string | yes | Part of `parent`. See documentation of `appsId`. |
| `pageSize` | query | integer (int32) | no | Maximum results to return per page. |
| `pageToken` | query | string | no | Continuation token for fetching the next page of results. |
| `view` | query | string enum | no | Controls the set of fields returned in the List response. Values: `BASIC`, `FULL`. |

### `appengine.apps.services.versions.patch`

- Versions: v1, v1beta
- `PATCH https://appengine.googleapis.com/v1/apps/{appsId}/services/{servicesId}/versions/{versionsId}`
- Updates the specified Version resource. You can specify the following fields depending on the App Engine environment and type of scaling that the version resource uses:Standard environment instance_class (https://cloud.google.com/appengine/docs/admin-api/reference/rest/v1/apps.services.versions#Version.FIELDS.instance_class)automatic scaling in the standard environment: automatic_scaling.min_idle_instances (https://cloud.google.com/appengine/docs/admin-api/reference/rest/v1/apps.services.versions#Version.FIELDS.automatic_scaling) automatic_scaling.max_idle_instances (https://cloud.google.com/appengine/docs/admin-api/reference/rest/v1/apps.services.versions#Version.FIELDS.automatic_scaling) automaticScaling.standard_scheduler_settings.max_instances (https://cloud.google.com/appengine/docs/admin-api/reference/rest/v1/apps.services.versions#StandardSchedulerSettings) automaticScaling.standard_scheduler_settings.min_instances (https://cloud.google.com/appengine/docs/admin-api/reference/rest/v1/apps.services.versions#StandardSchedulerSettings) automaticScaling.standard_scheduler_settings.target_cpu_utilization (https://cloud.google.com/appengine/docs/admin-api/reference/rest/v1/apps.services.versions#StandardSchedulerSettings) automaticScaling.standard_scheduler_settings.target_throughput_utilization (https://cloud.google.com/appengine/docs/admin-api/reference/rest/v1/apps.services.versions#StandardSchedulerSettings)basic scaling or manual scaling in the standard environment: serving_status (https://cloud.google.com/appengine/docs/admin-api/reference/rest/v1/apps.services.versions#Version.FIELDS.serving_status) manual_scaling.instances (https://cloud.google.com/appengine/docs/admin-api/reference/rest/v1/apps.services.versions#manualscaling)Flexible environment serving_status (https://cloud.google.com/appengine/docs/admin-api/reference/rest/v1/apps.services.versions#Version.FIELDS.serving_status)automatic scaling in the flexible environment: automatic_scaling.min_total_instances (https://cloud.google.com/appengine/docs/admin-api/reference/rest/v1/apps.services.versions#Version.FIELDS.automatic_scaling) automatic_scaling.max_total_instances (https://cloud.google.com/appengine/docs/admin-api/reference/rest/v1/apps.services.versions#Version.FIELDS.automatic_scaling) automatic_scaling.cool_down_period_sec (https://cloud.google.com/appengine/docs/admin-api/reference/rest/v1/apps.services.versions#Version.FIELDS.automatic_scaling) automatic_scaling.cpu_utilization.target_utilization (https://cloud.google.com/appengine/docs/admin-api/reference/rest/v1/apps.services.versions#Version.FIELDS.automatic_scaling)manual scaling in the flexible environment: manual_scaling.instances (https://cloud.google.com/appengine/docs/admin-api/reference/rest/v1/apps.services.versions#manualscaling)
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `Version`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `appsId` | path | string | yes | Part of `name`. Required. Name of the resource to update. Example: apps/myapp/services/default/versions/1. |
| `servicesId` | path | string | yes | Part of `name`. See documentation of `appsId`. |
| `versionsId` | path | string | yes | Part of `name`. See documentation of `appsId`. |
| `updateMask` | query | string (google-fieldmask) | no | Standard field mask for the set of fields to be updated. |

### `appengine.projects.locations.applications.authorizedCertificates.create`

- Versions: v1, v1beta, v1alpha
- `POST https://appengine.googleapis.com/v1/projects/{projectsId}/locations/{locationsId}/applications/{applicationsId}/authorizedCertificates`
- Uploads the specified SSL certificate.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `AuthorizedCertificate`; Response: `AuthorizedCertificate`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `projectsId` | path | string | yes | Part of `parent`. Required. Name of the parent Application resource. Example: apps/myapp. |
| `locationsId` | path | string | yes | Part of `parent`. See documentation of `projectsId`. |
| `applicationsId` | path | string | yes | Part of `parent`. See documentation of `projectsId`. |

### `appengine.projects.locations.applications.authorizedCertificates.delete`

- Versions: v1, v1beta, v1alpha
- `DELETE https://appengine.googleapis.com/v1/projects/{projectsId}/locations/{locationsId}/applications/{applicationsId}/authorizedCertificates/{authorizedCertificatesId}`
- Deletes the specified SSL certificate.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `projectsId` | path | string | yes | Part of `name`. Required. Name of the resource to delete. Example: apps/myapp/authorizedCertificates/12345. |
| `locationsId` | path | string | yes | Part of `name`. See documentation of `projectsId`. |
| `applicationsId` | path | string | yes | Part of `name`. See documentation of `projectsId`. |
| `authorizedCertificatesId` | path | string | yes | Part of `name`. See documentation of `projectsId`. |

### `appengine.projects.locations.applications.authorizedCertificates.get`

- Versions: v1, v1beta, v1alpha
- `GET https://appengine.googleapis.com/v1/projects/{projectsId}/locations/{locationsId}/applications/{applicationsId}/authorizedCertificates/{authorizedCertificatesId}`
- Gets the specified SSL certificate.
- Scopes: `https://www.googleapis.com/auth/appengine.admin`, `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`
- Request: —; Response: `AuthorizedCertificate`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `projectsId` | path | string | yes | Part of `name`. Required. Name of the resource requested. Example: apps/myapp/authorizedCertificates/12345. |
| `locationsId` | path | string | yes | Part of `name`. See documentation of `projectsId`. |
| `applicationsId` | path | string | yes | Part of `name`. See documentation of `projectsId`. |
| `authorizedCertificatesId` | path | string | yes | Part of `name`. See documentation of `projectsId`. |
| `view` | query | string enum | no | Controls the set of fields returned in the GET response. Values: `BASIC_CERTIFICATE`, `FULL_CERTIFICATE`. |

### `appengine.projects.locations.applications.authorizedCertificates.list`

- Versions: v1, v1beta, v1alpha
- `GET https://appengine.googleapis.com/v1/projects/{projectsId}/locations/{locationsId}/applications/{applicationsId}/authorizedCertificates`
- Lists all SSL certificates the user is authorized to administer.
- Scopes: `https://www.googleapis.com/auth/appengine.admin`, `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`
- Request: —; Response: `ListAuthorizedCertificatesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `projectsId` | path | string | yes | Part of `parent`. Required. Name of the parent Application resource. Example: apps/myapp. |
| `locationsId` | path | string | yes | Part of `parent`. See documentation of `projectsId`. |
| `applicationsId` | path | string | yes | Part of `parent`. See documentation of `projectsId`. |
| `pageSize` | query | integer (int32) | no | Maximum results to return per page. |
| `pageToken` | query | string | no | Continuation token for fetching the next page of results. |
| `view` | query | string enum | no | Controls the set of fields returned in the LIST response. Values: `BASIC_CERTIFICATE`, `FULL_CERTIFICATE`. |

### `appengine.projects.locations.applications.authorizedCertificates.patch`

- Versions: v1, v1beta, v1alpha
- `PATCH https://appengine.googleapis.com/v1/projects/{projectsId}/locations/{locationsId}/applications/{applicationsId}/authorizedCertificates/{authorizedCertificatesId}`
- Updates the specified SSL certificate. To renew a certificate and maintain its existing domain mappings, update certificate_data with a new certificate. The new certificate must be applicable to the same domains as the original certificate. The certificate display_name may also be updated.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `AuthorizedCertificate`; Response: `AuthorizedCertificate`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `projectsId` | path | string | yes | Part of `name`. Required. Name of the resource to update. Example: apps/myapp/authorizedCertificates/12345. |
| `locationsId` | path | string | yes | Part of `name`. See documentation of `projectsId`. |
| `applicationsId` | path | string | yes | Part of `name`. See documentation of `projectsId`. |
| `authorizedCertificatesId` | path | string | yes | Part of `name`. See documentation of `projectsId`. |
| `updateMask` | query | string (google-fieldmask) | no | Standard field mask for the set of fields to be updated. Updates are only supported on the certificate_raw_data and display_name fields. |

### `appengine.projects.locations.applications.authorizedDomains.list`

- Versions: v1, v1beta, v1alpha
- `GET https://appengine.googleapis.com/v1/projects/{projectsId}/locations/{locationsId}/applications/{applicationsId}/authorizedDomains`
- Lists all domains the user is authorized to administer.
- Scopes: `https://www.googleapis.com/auth/appengine.admin`, `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`
- Request: —; Response: `ListAuthorizedDomainsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `projectsId` | path | string | yes | Part of `parent`. Required. Name of the parent Application resource. Example: apps/myapp. |
| `locationsId` | path | string | yes | Part of `parent`. See documentation of `projectsId`. |
| `applicationsId` | path | string | yes | Part of `parent`. See documentation of `projectsId`. |
| `pageSize` | query | integer (int32) | no | Maximum results to return per page. |
| `pageToken` | query | string | no | Continuation token for fetching the next page of results. |

### `appengine.projects.locations.applications.domainMappings.create`

- Versions: v1, v1beta, v1alpha
- `POST https://appengine.googleapis.com/v1/projects/{projectsId}/locations/{locationsId}/applications/{applicationsId}/domainMappings`
- Maps a domain to an application. A user must be authorized to administer a domain in order to map it to an application. For a list of available authorized domains, see AuthorizedDomains.ListAuthorizedDomains.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `DomainMapping`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `projectsId` | path | string | yes | Part of `parent`. Required. Name of the parent Application resource. Example: apps/myapp. |
| `locationsId` | path | string | yes | Part of `parent`. See documentation of `projectsId`. |
| `applicationsId` | path | string | yes | Part of `parent`. See documentation of `projectsId`. |
| `overrideStrategy` | query | string enum | no | Whether the domain creation should override any existing mappings for this domain. By default, overrides are rejected. Values: `UNSPECIFIED_DOMAIN_OVERRIDE_STRATEGY`, `STRICT`, `OVERRIDE`. |

### `appengine.projects.locations.applications.domainMappings.delete`

- Versions: v1, v1beta, v1alpha
- `DELETE https://appengine.googleapis.com/v1/projects/{projectsId}/locations/{locationsId}/applications/{applicationsId}/domainMappings/{domainMappingsId}`
- Deletes the specified domain mapping. A user must be authorized to administer the associated domain in order to delete a DomainMapping resource.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `projectsId` | path | string | yes | Part of `name`. Required. Name of the resource to delete. Example: apps/myapp/domainMappings/example.com. |
| `locationsId` | path | string | yes | Part of `name`. See documentation of `projectsId`. |
| `applicationsId` | path | string | yes | Part of `name`. See documentation of `projectsId`. |
| `domainMappingsId` | path | string | yes | Part of `name`. See documentation of `projectsId`. |

### `appengine.projects.locations.applications.domainMappings.get`

- Versions: v1, v1beta, v1alpha
- `GET https://appengine.googleapis.com/v1/projects/{projectsId}/locations/{locationsId}/applications/{applicationsId}/domainMappings/{domainMappingsId}`
- Gets the specified domain mapping.
- Scopes: `https://www.googleapis.com/auth/appengine.admin`, `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`
- Request: —; Response: `DomainMapping`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `projectsId` | path | string | yes | Part of `name`. Required. Name of the resource requested. Example: apps/myapp/domainMappings/example.com. |
| `locationsId` | path | string | yes | Part of `name`. See documentation of `projectsId`. |
| `applicationsId` | path | string | yes | Part of `name`. See documentation of `projectsId`. |
| `domainMappingsId` | path | string | yes | Part of `name`. See documentation of `projectsId`. |

### `appengine.projects.locations.applications.domainMappings.list`

- Versions: v1, v1beta, v1alpha
- `GET https://appengine.googleapis.com/v1/projects/{projectsId}/locations/{locationsId}/applications/{applicationsId}/domainMappings`
- Lists the domain mappings on an application.
- Scopes: `https://www.googleapis.com/auth/appengine.admin`, `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`
- Request: —; Response: `ListDomainMappingsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `projectsId` | path | string | yes | Part of `parent`. Required. Name of the parent Application resource. Example: apps/myapp. |
| `locationsId` | path | string | yes | Part of `parent`. See documentation of `projectsId`. |
| `applicationsId` | path | string | yes | Part of `parent`. See documentation of `projectsId`. |
| `pageSize` | query | integer (int32) | no | Maximum results to return per page. |
| `pageToken` | query | string | no | Continuation token for fetching the next page of results. |

### `appengine.projects.locations.applications.domainMappings.patch`

- Versions: v1, v1beta, v1alpha
- `PATCH https://appengine.googleapis.com/v1/projects/{projectsId}/locations/{locationsId}/applications/{applicationsId}/domainMappings/{domainMappingsId}`
- Updates the specified domain mapping. To map an SSL certificate to a domain mapping, update certificate_id to point to an AuthorizedCertificate resource. A user must be authorized to administer the associated domain in order to update a DomainMapping resource.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `DomainMapping`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `projectsId` | path | string | yes | Part of `name`. Required. Name of the resource to update. Example: apps/myapp/domainMappings/example.com. |
| `locationsId` | path | string | yes | Part of `name`. See documentation of `projectsId`. |
| `applicationsId` | path | string | yes | Part of `name`. See documentation of `projectsId`. |
| `domainMappingsId` | path | string | yes | Part of `name`. See documentation of `projectsId`. |
| `updateMask` | query | string (google-fieldmask) | yes | Required. Standard field mask for the set of fields to be updated. |

### `appengine.projects.locations.applications.patch`

- Versions: v1, v1beta
- `PATCH https://appengine.googleapis.com/v1/projects/{projectsId}/locations/{locationsId}/applications/{applicationsId}`
- Updates the specified Application resource. You can update the following fields: auth_domain - Google authentication domain for controlling user access to the application. default_cookie_expiration - Cookie expiration policy for the application. iap - Identity-Aware Proxy properties for the application.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `Application`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `projectsId` | path | string | yes | Part of `name`. Required. Name of the Application resource to update. Example: apps/myapp. |
| `locationsId` | path | string | yes | Part of `name`. See documentation of `projectsId`. |
| `applicationsId` | path | string | yes | Part of `name`. See documentation of `projectsId`. |
| `updateMask` | query | string (google-fieldmask) | yes | Required. Standard field mask for the set of fields to be updated. |

### `appengine.projects.locations.applications.services.delete`

- Versions: v1, v1beta
- `DELETE https://appengine.googleapis.com/v1/projects/{projectsId}/locations/{locationsId}/applications/{applicationsId}/services/{servicesId}`
- Deletes the specified service and all enclosed versions.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `projectsId` | path | string | yes | Part of `name`. Required. Name of the resource requested. Example: apps/myapp/services/default. |
| `locationsId` | path | string | yes | Part of `name`. See documentation of `projectsId`. |
| `applicationsId` | path | string | yes | Part of `name`. See documentation of `projectsId`. |
| `servicesId` | path | string | yes | Part of `name`. See documentation of `projectsId`. |

### `appengine.projects.locations.applications.services.patch`

- Versions: v1, v1beta
- `PATCH https://appengine.googleapis.com/v1/projects/{projectsId}/locations/{locationsId}/applications/{applicationsId}/services/{servicesId}`
- Updates the configuration of the specified service.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `Service`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `projectsId` | path | string | yes | Part of `name`. Required. Name of the resource to update. Example: apps/myapp/services/default. |
| `locationsId` | path | string | yes | Part of `name`. See documentation of `projectsId`. |
| `applicationsId` | path | string | yes | Part of `name`. See documentation of `projectsId`. |
| `servicesId` | path | string | yes | Part of `name`. See documentation of `projectsId`. |
| `migrateTraffic` | query | boolean | no | Set to true to gradually shift traffic to one or more versions that you specify. By default, traffic is shifted immediately. For gradual traffic migration, the target versions must be located within instances that are configured for both warmup requests (https://cloud.google.com/appengine/docs/admin-api/reference/rest/v1/apps.services.versions#InboundServiceType) and automatic scaling (https://cloud.google.com/appengine/docs/admin-api/reference/rest/v1/apps.services.versions#AutomaticScaling). You must specify the shardBy (https://cloud.google.com/appengine/docs/admin-api/reference/rest/v1/apps.services#ShardBy) field in the Service resource. Gradual traffic migration is not supported in the App Engine flexible environment. For examples, see Migrating and Splitting Traffic (https://cloud.google.com/appengine/docs/admin-api/migrating-splitting-traffic). |
| `updateMask` | query | string (google-fieldmask) | yes | Required. Standard field mask for the set of fields to be updated. |

### `appengine.projects.locations.applications.services.versions.delete`

- Versions: v1, v1beta
- `DELETE https://appengine.googleapis.com/v1/projects/{projectsId}/locations/{locationsId}/applications/{applicationsId}/services/{servicesId}/versions/{versionsId}`
- Deletes an existing Version resource.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `projectsId` | path | string | yes | Part of `name`. Required. Name of the resource requested. Example: apps/myapp/services/default/versions/v1. |
| `locationsId` | path | string | yes | Part of `name`. See documentation of `projectsId`. |
| `applicationsId` | path | string | yes | Part of `name`. See documentation of `projectsId`. |
| `servicesId` | path | string | yes | Part of `name`. See documentation of `projectsId`. |
| `versionsId` | path | string | yes | Part of `name`. See documentation of `projectsId`. |

### `appengine.projects.locations.applications.services.versions.exportAppImage`

- Versions: v1, v1beta
- `POST https://appengine.googleapis.com/v1/projects/{projectsId}/locations/{locationsId}/applications/{applicationsId}/services/{servicesId}/versions/{versionsId}:exportAppImage`
- Exports a user image to Artifact Registry.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `ExportAppImageRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `projectsId` | path | string | yes | Part of `name`. Required. Name of the App Engine version resource. Format: apps/{app}/services/{service}/versions/{version} |
| `locationsId` | path | string | yes | Part of `name`. See documentation of `projectsId`. |
| `applicationsId` | path | string | yes | Part of `name`. See documentation of `projectsId`. |
| `servicesId` | path | string | yes | Part of `name`. See documentation of `projectsId`. |
| `versionsId` | path | string | yes | Part of `name`. See documentation of `projectsId`. |

### `appengine.projects.locations.applications.services.versions.instances.debug`

- Versions: v1, v1beta
- `POST https://appengine.googleapis.com/v1/projects/{projectsId}/locations/{locationsId}/applications/{applicationsId}/services/{servicesId}/versions/{versionsId}/instances/{instancesId}:debug`
- Enables debugging on a VM instance. This allows you to use the SSH command to connect to the virtual machine where the instance lives. While in "debug mode", the instance continues to serve live traffic. You should delete the instance when you are done debugging and then allow the system to take over and determine if another instance should be started.Only applicable for instances in App Engine flexible environment.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `DebugInstanceRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `projectsId` | path | string | yes | Part of `name`. Required. Name of the resource requested. Example: apps/myapp/services/default/versions/v1/instances/instance-1. |
| `locationsId` | path | string | yes | Part of `name`. See documentation of `projectsId`. |
| `applicationsId` | path | string | yes | Part of `name`. See documentation of `projectsId`. |
| `servicesId` | path | string | yes | Part of `name`. See documentation of `projectsId`. |
| `versionsId` | path | string | yes | Part of `name`. See documentation of `projectsId`. |
| `instancesId` | path | string | yes | Part of `name`. See documentation of `projectsId`. |

### `appengine.projects.locations.applications.services.versions.instances.delete`

- Versions: v1, v1beta
- `DELETE https://appengine.googleapis.com/v1/projects/{projectsId}/locations/{locationsId}/applications/{applicationsId}/services/{servicesId}/versions/{versionsId}/instances/{instancesId}`
- Stops a running instance.The instance might be automatically recreated based on the scaling settings of the version. For more information, see "How Instances are Managed" (standard environment (https://cloud.google.com/appengine/docs/standard/python/how-instances-are-managed) | flexible environment (https://cloud.google.com/appengine/docs/flexible/python/how-instances-are-managed)).To ensure that instances are not re-created and avoid getting billed, you can stop all instances within the target version by changing the serving status of the version to STOPPED with the apps.services.versions.patch (https://cloud.google.com/appengine/docs/admin-api/reference/rest/v1/apps.services.versions/patch) method.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `projectsId` | path | string | yes | Part of `name`. Required. Name of the resource requested. Example: apps/myapp/services/default/versions/v1/instances/instance-1. |
| `locationsId` | path | string | yes | Part of `name`. See documentation of `projectsId`. |
| `applicationsId` | path | string | yes | Part of `name`. See documentation of `projectsId`. |
| `servicesId` | path | string | yes | Part of `name`. See documentation of `projectsId`. |
| `versionsId` | path | string | yes | Part of `name`. See documentation of `projectsId`. |
| `instancesId` | path | string | yes | Part of `name`. See documentation of `projectsId`. |

### `appengine.projects.locations.applications.services.versions.patch`

- Versions: v1, v1beta
- `PATCH https://appengine.googleapis.com/v1/projects/{projectsId}/locations/{locationsId}/applications/{applicationsId}/services/{servicesId}/versions/{versionsId}`
- Updates the specified Version resource. You can specify the following fields depending on the App Engine environment and type of scaling that the version resource uses:Standard environment instance_class (https://cloud.google.com/appengine/docs/admin-api/reference/rest/v1/apps.services.versions#Version.FIELDS.instance_class)automatic scaling in the standard environment: automatic_scaling.min_idle_instances (https://cloud.google.com/appengine/docs/admin-api/reference/rest/v1/apps.services.versions#Version.FIELDS.automatic_scaling) automatic_scaling.max_idle_instances (https://cloud.google.com/appengine/docs/admin-api/reference/rest/v1/apps.services.versions#Version.FIELDS.automatic_scaling) automaticScaling.standard_scheduler_settings.max_instances (https://cloud.google.com/appengine/docs/admin-api/reference/rest/v1/apps.services.versions#StandardSchedulerSettings) automaticScaling.standard_scheduler_settings.min_instances (https://cloud.google.com/appengine/docs/admin-api/reference/rest/v1/apps.services.versions#StandardSchedulerSettings) automaticScaling.standard_scheduler_settings.target_cpu_utilization (https://cloud.google.com/appengine/docs/admin-api/reference/rest/v1/apps.services.versions#StandardSchedulerSettings) automaticScaling.standard_scheduler_settings.target_throughput_utilization (https://cloud.google.com/appengine/docs/admin-api/reference/rest/v1/apps.services.versions#StandardSchedulerSettings)basic scaling or manual scaling in the standard environment: serving_status (https://cloud.google.com/appengine/docs/admin-api/reference/rest/v1/apps.services.versions#Version.FIELDS.serving_status) manual_scaling.instances (https://cloud.google.com/appengine/docs/admin-api/reference/rest/v1/apps.services.versions#manualscaling)Flexible environment serving_status (https://cloud.google.com/appengine/docs/admin-api/reference/rest/v1/apps.services.versions#Version.FIELDS.serving_status)automatic scaling in the flexible environment: automatic_scaling.min_total_instances (https://cloud.google.com/appengine/docs/admin-api/reference/rest/v1/apps.services.versions#Version.FIELDS.automatic_scaling) automatic_scaling.max_total_instances (https://cloud.google.com/appengine/docs/admin-api/reference/rest/v1/apps.services.versions#Version.FIELDS.automatic_scaling) automatic_scaling.cool_down_period_sec (https://cloud.google.com/appengine/docs/admin-api/reference/rest/v1/apps.services.versions#Version.FIELDS.automatic_scaling) automatic_scaling.cpu_utilization.target_utilization (https://cloud.google.com/appengine/docs/admin-api/reference/rest/v1/apps.services.versions#Version.FIELDS.automatic_scaling)manual scaling in the flexible environment: manual_scaling.instances (https://cloud.google.com/appengine/docs/admin-api/reference/rest/v1/apps.services.versions#manualscaling)
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `Version`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `projectsId` | path | string | yes | Part of `name`. Required. Name of the resource to update. Example: apps/myapp/services/default/versions/1. |
| `locationsId` | path | string | yes | Part of `name`. See documentation of `projectsId`. |
| `applicationsId` | path | string | yes | Part of `name`. See documentation of `projectsId`. |
| `servicesId` | path | string | yes | Part of `name`. See documentation of `projectsId`. |
| `versionsId` | path | string | yes | Part of `name`. See documentation of `projectsId`. |
| `updateMask` | query | string (google-fieldmask) | no | Standard field mask for the set of fields to be updated. |

### `appengine.projects.locations.get`

- Versions: v1beta, v1alpha
- `GET https://appengine.googleapis.com/v1beta/projects/{projectsId}/locations/{locationsId}`
- Gets information about a location.
- Scopes: `https://www.googleapis.com/auth/appengine.admin`, `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`
- Request: —; Response: `Location`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `projectsId` | path | string | yes | Part of `name`. Resource name for the location. |
| `locationsId` | path | string | yes | Part of `name`. See documentation of `projectsId`. |

### `appengine.projects.locations.list`

- Versions: v1beta, v1alpha
- `GET https://appengine.googleapis.com/v1beta/projects/{projectsId}/locations`
- Lists information about the supported locations for this service.This method lists locations based on the resource scope provided in the ListLocationsRequest.name field: Global locations: If name is empty, the method lists the public locations available to all projects. Project-specific locations: If name follows the format projects/{project}, the method lists locations visible to that specific project. This includes public, private, or other project-specific locations enabled for the project.For gRPC and client library implementations, the resource name is passed as the name field. For direct service calls, the resource name is incorporated into the request path based on the specific service implementation and version.
- Scopes: `https://www.googleapis.com/auth/appengine.admin`, `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`
- Request: —; Response: `ListLocationsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `projectsId` | path | string | yes | Part of `name`. The resource that owns the locations collection, if applicable. |
| `extraLocationTypes` | query | repeated string | no | Optional. Do not use this field unless explicitly documented otherwise. This is primarily for internal usage. |
| `filter` | query | string | no | A filter to narrow down results to a preferred subset. The filtering language accepts strings like "displayName=tokyo", and is documented in more detail in AIP-160 (https://google.aip.dev/160). |
| `pageSize` | query | integer (int32) | no | The maximum number of results to return. If not set, the service selects a default. |
| `pageToken` | query | string | no | A page token received from the next_page_token field in the response. Send that page token to receive the subsequent page. |

### `appengine.projects.locations.operations.get`

- Versions: v1beta, v1alpha
- `GET https://appengine.googleapis.com/v1beta/projects/{projectsId}/locations/{locationsId}/operations/{operationsId}`
- Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service.
- Scopes: `https://www.googleapis.com/auth/appengine.admin`, `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `projectsId` | path | string | yes | Part of `name`. The name of the operation resource. |
| `locationsId` | path | string | yes | Part of `name`. See documentation of `projectsId`. |
| `operationsId` | path | string | yes | Part of `name`. See documentation of `projectsId`. |

### `appengine.projects.locations.operations.list`

- Versions: v1beta, v1alpha
- `GET https://appengine.googleapis.com/v1beta/projects/{projectsId}/locations/{locationsId}/operations`
- Lists operations that match the specified filter in the request. If the server doesn't support this method, it returns UNIMPLEMENTED.
- Scopes: `https://www.googleapis.com/auth/appengine.admin`, `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`
- Request: —; Response: `ListOperationsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `projectsId` | path | string | yes | Part of `name`. The name of the operation's parent resource. |
| `locationsId` | path | string | yes | Part of `name`. See documentation of `projectsId`. |
| `filter` | query | string | no | The standard list filter. |
| `pageSize` | query | integer (int32) | no | The standard list page size. |
| `pageToken` | query | string | no | The standard list page token. |
| `returnPartialSuccess` | query | boolean | no | When set to true, operations that are reachable are returned as normal, and those that are unreachable are returned in the ListOperationsResponse.unreachable field.This can only be true when reading across collections. For example, when parent is set to "projects/example/locations/-".This field is not supported by default and will result in an UNIMPLEMENTED error if set unless explicitly documented otherwise in service or product specific documentation. |

### Example request skeleton

Generated from the Discovery entry of `appengine.apps.authorizedCertificates.get` (not in the official docs); replace the `{...}` path variables (URL-encode query values):

```bash
curl -X GET \
  -H "Authorization: Bearer $(gcloud auth print-access-token)" \
  "https://appengine.googleapis.com/v1/apps/{appsId}/authorizedCertificates/{authorizedCertificatesId}"
```

## Notes

- Generated from the Discovery document(s) v1, v1beta, v1alpha of `appengine` (retrieved 2026-11-14). Resources on this page: apps, projects.
- The Required column is `yes` for path variables and required parameters, and `conditional` when the description says "Required if ..." (mutually exclusive alternatives), when a `parent.child` parameter is required only inside an optional parent message or one branch of a oneof. Path variables are always `yes`.
- Message schemas (the request and response types named above) are listed under `references/rest-schemas/appengine/`; they are the `schemas` section of the Discovery documents in Source.
- Source: https://appengine.googleapis.com/$discovery/rest?version=v1, https://appengine.googleapis.com/$discovery/rest?version=v1beta, https://appengine.googleapis.com/$discovery/rest?version=v1alpha (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
