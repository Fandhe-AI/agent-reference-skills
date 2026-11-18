---
source: https://integrations.googleapis.com/$discovery/rest?version=v2
---

# Application Integration API REST API (integrations) (part 1/2)

## Signature / Usage

Base URL: `https://integrations.googleapis.com`. Methods are listed by `id`; the `Versions` line shows which API versions define the method (preferred: v2).

### `integrations.callback.generateToken`

- Versions: v1
- `GET https://integrations.googleapis.com/v1/callback:generateToken`
- Receives the auth code and auth config id to combine that with the client id and secret to retrieve access tokens from the token endpoint. Returns either a success or error message when it's done.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleCloudIntegrationsV1alphaGenerateTokenResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `code` | query | string | no | The auth code for the given request |
| `gcpProjectId` | query | string | no | The gcp project id of the request |
| `product` | query | string enum | no | Which product sends the request Values: `UNSPECIFIED_PRODUCT`, `IP`, `APIGEE`, `SECURITY`. |
| `redirectUri` | query | string | no | Redirect uri of the auth code request |
| `state` | query | string | no | The auth config id for the given request |

### `integrations.connectorPlatformRegions.enumerate`

- Versions: v1
- `GET https://integrations.googleapis.com/v1/connectorPlatformRegions:enumerate`
- Enumerates the regions for which Connector Platform is provisioned.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleCloudIntegrationsV1alphaEnumerateConnectorPlatformRegionsResponse`

### `integrations.projects.getClientmetadata`

- Versions: v1
- `GET https://integrations.googleapis.com/v1/{+parent}/clientmetadata`
- Gets the metadata info for the requested client
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleCloudIntegrationsV1alphaGetClientMetadataResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. Required: The ID of the GCP Project to be provisioned. |

### `integrations.projects.locations.appsScriptProjects.create`

- Versions: v1
- `POST https://integrations.googleapis.com/v1/{+parent}/appsScriptProjects`
- Creates an Apps Script project.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `GoogleCloudIntegrationsV1alphaCreateAppsScriptProjectRequest`; Response: `GoogleCloudIntegrationsV1alphaCreateAppsScriptProjectResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The project that the executed integration belongs to. |

### `integrations.projects.locations.appsScriptProjects.link`

- Versions: v1
- `POST https://integrations.googleapis.com/v1/{+parent}/appsScriptProjects:link`
- Links a existing Apps Script project.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `GoogleCloudIntegrationsV1alphaLinkAppsScriptProjectRequest`; Response: `GoogleCloudIntegrationsV1alphaLinkAppsScriptProjectResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The project that the executed integration belongs to. |

### `integrations.projects.locations.authConfigs.create`

- Versions: v1
- `POST https://integrations.googleapis.com/v1/{+parent}/authConfigs`
- Creates an auth config record. Fetch corresponding credentials for specific auth types, e.g. access token for OAuth 2.0, JWT token for JWT. Encrypt the auth config with Cloud KMS and store the encrypted credentials in Spanner. Returns the encrypted auth config.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `GoogleCloudIntegrationsV1alphaAuthConfig`; Response: `GoogleCloudIntegrationsV1alphaAuthConfig`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. "projects/{project}/locations/{location}" format. |
| `clientCertificate.encryptedPrivateKey` | query | string | no | The ssl certificate encoded in PEM format. This string must include the begin header and end footer lines. For example, -----BEGIN CERTIFICATE----- MIICTTCCAbagAwIBAgIJAPT0tSKNxan/MA0GCSqGSIb3DQEBCwUAMCoxFzAVBgNV BAoTDkdvb2dsZSBURVNUSU5HMQ8wDQYDVQQDEwZ0ZXN0Q0EwHhcNMTUwMTAxMDAw MDAwWhcNMjUwMTAxMDAwMDAwWjAuMRcwFQYDVQQKEw5Hb29nbGUgVEVTVElORzET MBEGA1UEAwwKam9lQGJhbmFuYTCBnzANBgkqhkiG9w0BAQEFAAOBjQAwgYkCgYEA vDYFgMgxi5W488d9J7UpCInl0NXmZQpJDEHE4hvkaRlH7pnC71H0DLt0/3zATRP1 JzY2+eqBmbGl4/sgZKYv8UrLnNyQNUTsNx1iZAfPUflf5FwgVsai8BM0pUciq1NB xD429VFcrGZNucvFLh72RuRFIKH8WUpiK/iZNFkWhZ0CAwEAAaN3MHUwDgYDVR0P AQH/BAQDAgWgMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAMBgNVHRMB Af8EAjAAMBkGA1UdDgQSBBCVgnFBCWgL/iwCqnGrhTPQMBsGA1UdIwQUMBKAEKey Um2o4k2WiEVA0ldQvNYwDQYJKoZIhvcNAQELBQADgYEAYK986R4E3L1v+Q6esBtW JrUwA9UmJRSQr0N5w3o9XzarU37/bkjOP0Fw0k/A6Vv1n3vlciYfBFaBIam1qRHr 5dMsYf4CZS6w50r7hyzqyrwDoyNxkLnd2PdcHT/sym1QmflsjEs7pejtnohO6N2H wQW6M0H7Zt8claGRla4fKkg= -----END CERTIFICATE----- |
| `clientCertificate.passphrase` | query | string | no | 'passphrase' should be left unset if private key is not encrypted. Note that 'passphrase' is not the password for web server, but an extra layer of security to protected private key. |
| `clientCertificate.sslCertificate` | query | string | no | The ssl certificate encoded in PEM format. This string must include the begin header and end footer lines. For example, -----BEGIN CERTIFICATE----- MIICTTCCAbagAwIBAgIJAPT0tSKNxan/MA0GCSqGSIb3DQEBCwUAMCoxFzAVBgNV BAoTDkdvb2dsZSBURVNUSU5HMQ8wDQYDVQQDEwZ0ZXN0Q0EwHhcNMTUwMTAxMDAw MDAwWhcNMjUwMTAxMDAwMDAwWjAuMRcwFQYDVQQKEw5Hb29nbGUgVEVTVElORzET MBEGA1UEAwwKam9lQGJhbmFuYTCBnzANBgkqhkiG9w0BAQEFAAOBjQAwgYkCgYEA vDYFgMgxi5W488d9J7UpCInl0NXmZQpJDEHE4hvkaRlH7pnC71H0DLt0/3zATRP1 JzY2+eqBmbGl4/sgZKYv8UrLnNyQNUTsNx1iZAfPUflf5FwgVsai8BM0pUciq1NB xD429VFcrGZNucvFLh72RuRFIKH8WUpiK/iZNFkWhZ0CAwEAAaN3MHUwDgYDVR0P AQH/BAQDAgWgMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAMBgNVHRMB Af8EAjAAMBkGA1UdDgQSBBCVgnFBCWgL/iwCqnGrhTPQMBsGA1UdIwQUMBKAEKey Um2o4k2WiEVA0ldQvNYwDQYJKoZIhvcNAQELBQADgYEAYK986R4E3L1v+Q6esBtW JrUwA9UmJRSQr0N5w3o9XzarU37/bkjOP0Fw0k/A6Vv1n3vlciYfBFaBIam1qRHr 5dMsYf4CZS6w50r7hyzqyrwDoyNxkLnd2PdcHT/sym1QmflsjEs7pejtnohO6N2H wQW6M0H7Zt8claGRla4fKkg= -----END CERTIFICATE----- |

### `integrations.projects.locations.authConfigs.delete`

- Versions: v1
- `DELETE https://integrations.googleapis.com/v1/{+name}`
- Deletes an auth config.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleProtobufEmpty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name that is associated with the AuthConfig. |

### `integrations.projects.locations.authConfigs.get`

- Versions: v1
- `GET https://integrations.googleapis.com/v1/{+name}`
- Gets a complete auth config. If the auth config doesn't exist, Code.NOT_FOUND exception will be thrown. Returns the decrypted auth config.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleCloudIntegrationsV1alphaAuthConfig`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name that is associated with the AuthConfig. |

### `integrations.projects.locations.authConfigs.list`

- Versions: v1
- `GET https://integrations.googleapis.com/v1/{+parent}/authConfigs`
- Lists all auth configs that match the filter. Restrict to auth configs belong to the current client only.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleCloudIntegrationsV1alphaListAuthConfigsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The client, which owns this collection of AuthConfigs. |
| `filter` | query | string | no | Filtering as supported in https://developers.google.com/authorized-buyers/apis/guides/list-filters. |
| `pageSize` | query | integer (int32) | no | The size of entries in the response. If unspecified, defaults to 100. |
| `pageToken` | query | string | no | The token returned in the previous response. |
| `readMask` | query | string (google-fieldmask) | no | The mask which specifies fields that need to be returned in the AuthConfig's response. |

### `integrations.projects.locations.authConfigs.patch`

- Versions: v1
- `PATCH https://integrations.googleapis.com/v1/{+name}`
- Updates an auth config. If credential is updated, fetch the encrypted auth config from Spanner, decrypt with Cloud KMS key, update the credential fields, re-encrypt with Cloud KMS key and update the Spanner record. For other fields, directly update the Spanner record. Returns the encrypted auth config.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `GoogleCloudIntegrationsV1alphaAuthConfig`; Response: `GoogleCloudIntegrationsV1alphaAuthConfig`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Resource name of the auth config. For more information, see Manage authentication profiles. projects/{project}/locations/{location}/authConfigs/{authConfig}. |
| `clientCertificate.encryptedPrivateKey` | query | string | no | The ssl certificate encoded in PEM format. This string must include the begin header and end footer lines. For example, -----BEGIN CERTIFICATE----- MIICTTCCAbagAwIBAgIJAPT0tSKNxan/MA0GCSqGSIb3DQEBCwUAMCoxFzAVBgNV BAoTDkdvb2dsZSBURVNUSU5HMQ8wDQYDVQQDEwZ0ZXN0Q0EwHhcNMTUwMTAxMDAw MDAwWhcNMjUwMTAxMDAwMDAwWjAuMRcwFQYDVQQKEw5Hb29nbGUgVEVTVElORzET MBEGA1UEAwwKam9lQGJhbmFuYTCBnzANBgkqhkiG9w0BAQEFAAOBjQAwgYkCgYEA vDYFgMgxi5W488d9J7UpCInl0NXmZQpJDEHE4hvkaRlH7pnC71H0DLt0/3zATRP1 JzY2+eqBmbGl4/sgZKYv8UrLnNyQNUTsNx1iZAfPUflf5FwgVsai8BM0pUciq1NB xD429VFcrGZNucvFLh72RuRFIKH8WUpiK/iZNFkWhZ0CAwEAAaN3MHUwDgYDVR0P AQH/BAQDAgWgMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAMBgNVHRMB Af8EAjAAMBkGA1UdDgQSBBCVgnFBCWgL/iwCqnGrhTPQMBsGA1UdIwQUMBKAEKey Um2o4k2WiEVA0ldQvNYwDQYJKoZIhvcNAQELBQADgYEAYK986R4E3L1v+Q6esBtW JrUwA9UmJRSQr0N5w3o9XzarU37/bkjOP0Fw0k/A6Vv1n3vlciYfBFaBIam1qRHr 5dMsYf4CZS6w50r7hyzqyrwDoyNxkLnd2PdcHT/sym1QmflsjEs7pejtnohO6N2H wQW6M0H7Zt8claGRla4fKkg= -----END CERTIFICATE----- |
| `clientCertificate.passphrase` | query | string | no | 'passphrase' should be left unset if private key is not encrypted. Note that 'passphrase' is not the password for web server, but an extra layer of security to protected private key. |
| `clientCertificate.sslCertificate` | query | string | no | The ssl certificate encoded in PEM format. This string must include the begin header and end footer lines. For example, -----BEGIN CERTIFICATE----- MIICTTCCAbagAwIBAgIJAPT0tSKNxan/MA0GCSqGSIb3DQEBCwUAMCoxFzAVBgNV BAoTDkdvb2dsZSBURVNUSU5HMQ8wDQYDVQQDEwZ0ZXN0Q0EwHhcNMTUwMTAxMDAw MDAwWhcNMjUwMTAxMDAwMDAwWjAuMRcwFQYDVQQKEw5Hb29nbGUgVEVTVElORzET MBEGA1UEAwwKam9lQGJhbmFuYTCBnzANBgkqhkiG9w0BAQEFAAOBjQAwgYkCgYEA vDYFgMgxi5W488d9J7UpCInl0NXmZQpJDEHE4hvkaRlH7pnC71H0DLt0/3zATRP1 JzY2+eqBmbGl4/sgZKYv8UrLnNyQNUTsNx1iZAfPUflf5FwgVsai8BM0pUciq1NB xD429VFcrGZNucvFLh72RuRFIKH8WUpiK/iZNFkWhZ0CAwEAAaN3MHUwDgYDVR0P AQH/BAQDAgWgMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAMBgNVHRMB Af8EAjAAMBkGA1UdDgQSBBCVgnFBCWgL/iwCqnGrhTPQMBsGA1UdIwQUMBKAEKey Um2o4k2WiEVA0ldQvNYwDQYJKoZIhvcNAQELBQADgYEAYK986R4E3L1v+Q6esBtW JrUwA9UmJRSQr0N5w3o9XzarU37/bkjOP0Fw0k/A6Vv1n3vlciYfBFaBIam1qRHr 5dMsYf4CZS6w50r7hyzqyrwDoyNxkLnd2PdcHT/sym1QmflsjEs7pejtnohO6N2H wQW6M0H7Zt8claGRla4fKkg= -----END CERTIFICATE----- |
| `updateMask` | query | string (google-fieldmask) | no | Field mask specifying the fields in the above AuthConfig that have been modified and need to be updated. |

### `integrations.projects.locations.certificates.create`

- Versions: v1
- `POST https://integrations.googleapis.com/v1/{+parent}/certificates`
- Creates a new certificate. The certificate will be registered to the trawler service and will be encrypted using cloud KMS and stored in Spanner Returns the certificate.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `GoogleCloudIntegrationsV1alphaCertificate`; Response: `GoogleCloudIntegrationsV1alphaCertificate`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. "projects/{project}/locations/{location}" format. |

### `integrations.projects.locations.certificates.delete`

- Versions: v1
- `DELETE https://integrations.googleapis.com/v1/{+name}`
- Delete a certificate
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleProtobufEmpty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name that is associated with the Certificate. |

### `integrations.projects.locations.certificates.get`

- Versions: v1
- `GET https://integrations.googleapis.com/v1/{+name}`
- Get a certificates in the specified project.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleCloudIntegrationsV1alphaCertificate`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The certificate to retrieve. Format: projects/{project}/locations/{location}/certificates/{certificate} |

### `integrations.projects.locations.certificates.list`

- Versions: v1
- `GET https://integrations.googleapis.com/v1/{+parent}/certificates`
- List all the certificates that match the filter. Restrict to certificate of current client only.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleCloudIntegrationsV1alphaListCertificatesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The client, which owns this collection of Certificates. |
| `filter` | query | string | no | Filtering as supported in https://developers.google.com/authorized-buyers/apis/guides/list-filters. |
| `pageSize` | query | integer (int32) | no | The size of entries in the response. If unspecified, defaults to 100. |
| `pageToken` | query | string | no | The token returned in the previous response. |
| `readMask` | query | string (google-fieldmask) | no | The mask which specifies fields that need to be returned in the Certificate's response. |

### `integrations.projects.locations.certificates.patch`

- Versions: v1
- `PATCH https://integrations.googleapis.com/v1/{+name}`
- Updates the certificate by id. If new certificate file is updated, it will register with the trawler service, re-encrypt with cloud KMS and update the Spanner record. Other fields will directly update the Spanner record. Returns the Certificate.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `GoogleCloudIntegrationsV1alphaCertificate`; Response: `GoogleCloudIntegrationsV1alphaCertificate`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Output only. Auto generated primary key |
| `updateMask` | query | string (google-fieldmask) | no | Field mask specifying the fields in the above Certificate that have been modified and need to be updated. |

### `integrations.projects.locations.clients.changeConfig`

- Versions: v1
- `POST https://integrations.googleapis.com/v1/{+parent}/clients:changeConfig`
- Updates the client customer configuration for the given project and location resource name
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `GoogleCloudIntegrationsV1alphaChangeCustomerConfigRequest`; Response: `GoogleCloudIntegrationsV1alphaChangeCustomerConfigResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. Required: Format - projects/{project}/locations/{location} |

### `integrations.projects.locations.clients.deprovision`

- Versions: v1
- `POST https://integrations.googleapis.com/v1/{+parent}/clients:deprovision`
- Perform the deprovisioning steps to disable a user GCP project to use IP and purge all related data in a wipeout-compliant way.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `GoogleCloudIntegrationsV1alphaDeprovisionClientRequest`; Response: `GoogleProtobufEmpty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. Required: The ID of the GCP Project to be deprovisioned. |

### `integrations.projects.locations.clients.provision`

- Versions: v1
- `POST https://integrations.googleapis.com/v1/{+parent}/clients:provision`
- Perform the provisioning steps to enable a user GCP project to use IP. If GCP project already registered on IP end via Apigee Integration, provisioning will fail.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `GoogleCloudIntegrationsV1alphaProvisionClientRequest`; Response: `GoogleProtobufEmpty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. Required: The ID of the GCP Project to be provisioned. |

### `integrations.projects.locations.clients.provisionClientPostProcessor`

- Versions: v1
- `POST https://integrations.googleapis.com/v1/{+parent}/clients:provisionClientPostProcessor`
- Perform post provisioning steps after client is provisioned.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `GoogleCloudIntegrationsV1alphaProvisionClientPostProcessorRequest`; Response: `GoogleCloudIntegrationsV1alphaProvisionClientPostProcessorResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. Required: The ID of the GCP Project to be provisioned. |

### `integrations.projects.locations.clients.replace`

- Versions: v1
- `POST https://integrations.googleapis.com/v1/{+parent}/clients:replace`
- Update run-as service account for provisioned client
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `GoogleCloudIntegrationsV1alphaReplaceServiceAccountRequest`; Response: `GoogleProtobufEmpty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. Required: The ID of the GCP Project to be provisioned. |

### `integrations.projects.locations.clients.switch`

- Versions: v1
- `POST https://integrations.googleapis.com/v1/{+parent}/clients:switch`
- Update client from GMEK to CMEK
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `GoogleCloudIntegrationsV1alphaSwitchEncryptionRequest`; Response: `GoogleProtobufEmpty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. Required: The ID of the GCP Project to be provisioned. |

### `integrations.projects.locations.clients.switchVariableMasking`

- Versions: v1
- `POST https://integrations.googleapis.com/v1/{+parent}/clients:switchVariableMasking`
- Update variable masking for provisioned client
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `GoogleCloudIntegrationsV1alphaSwitchVariableMaskingRequest`; Response: `GoogleProtobufEmpty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. Required: The ID of the GCP Project to be provisioned. |

### `integrations.projects.locations.clients.toggleHttp`

- Versions: v1
- `POST https://integrations.googleapis.com/v1/{+parent}/clients:toggleHttp`
- Enable/Disable http call for provisioned client
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `GoogleCloudIntegrationsV1alphaToggleHttpRequest`; Response: `GoogleProtobufEmpty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. Required: The ID of the GCP Project to be provisioned. |

### `integrations.projects.locations.cloudFunctions.create`

- Versions: v1
- `POST https://integrations.googleapis.com/v1/{+parent}/cloudFunctions`
- Creates a cloud function project.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `GoogleCloudIntegrationsV1alphaCreateCloudFunctionRequest`; Response: `GoogleCloudIntegrationsV1alphaCreateCloudFunctionResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The project that the executed integration belongs to. |

### `integrations.projects.locations.connections.getConnectionSchemaMetadata`

- Versions: v1
- `GET https://integrations.googleapis.com/v1/{+name}`
- Lists the available entities and actions associated with a Connection.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleCloudIntegrationsV1alphaConnectionSchemaMetadata`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. ConnectionSchemaMetadata name. Format: projects/{project}/locations/{location}/connections/{connection}/connectionSchemaMetadata |

### `integrations.projects.locations.connections.list`

- Versions: v1
- `GET https://integrations.googleapis.com/v1/{+parent}/connections`
- Lists Connections in a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleCloudIntegrationsV1alphaListConnectionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. Parent resource of the Connection, of the form: `projects/*/locations/*` |
| `filter` | query | string | no | Filter. |
| `orderBy` | query | string | no | Order by parameters. |
| `pageSize` | query | integer (int32) | no | Page size. |
| `pageToken` | query | string | no | Page token. |

### `integrations.projects.locations.connections.runtimeActionSchemas.list`

- Versions: v1
- `GET https://integrations.googleapis.com/v1/{+parent}/runtimeActionSchemas`
- Lists the JSON schemas for the inputs and outputs of actions, filtered by action name.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleCloudIntegrationsV1alphaListRuntimeActionSchemasResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. Parent resource of RuntimeActionSchema. Format: projects/{project}/locations/{location}/connections/{connection} |
| `filter` | query | string | no | Filter. Only the action field with literal equality operator is supported. |
| `pageSize` | query | integer (int32) | no | Page size. |
| `pageToken` | query | string | no | Page token. |

### `integrations.projects.locations.connections.runtimeEntitySchemas.list`

- Versions: v1
- `GET https://integrations.googleapis.com/v1/{+parent}/runtimeEntitySchemas`
- Lists the JSON schemas for the properties of runtime entities, filtered by entity name.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleCloudIntegrationsV1alphaListRuntimeEntitySchemasResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. Parent resource of RuntimeEntitySchema. Format: projects/{project}/locations/{location}/connections/{connection} |
| `filter` | query | string | no | Filter. Only the entity field with literal equality operator is supported. |
| `pageSize` | query | integer (int32) | no | Page size. |
| `pageToken` | query | string | no | Page token. |

### `integrations.projects.locations.generateIntegration`

- Versions: v2
- `POST https://integrations.googleapis.com/v2/{+parent}:generateIntegration`
- Generates an integration skeleton based on a natural language prompt.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `GoogleCloudIntegrationsV2DuetGenerateIntegrationRequest`; Response: `GoogleCloudIntegrationsV2DuetGenerateIntegrationResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The location in which the integration will be generated. Format: `projects/{project}/locations/{location}` |

### `integrations.projects.locations.generateOpenApiSpec`

- Versions: v1
- `POST https://integrations.googleapis.com/v1/{+name}:generateOpenApiSpec`
- Generate OpenAPI spec for the requested integrations and api triggers
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `GoogleCloudIntegrationsV1alphaGenerateOpenApiSpecRequest`; Response: `GoogleCloudIntegrationsV1alphaGenerateOpenApiSpecResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Project and location from which the integrations should be fetched. Format: projects/{project}/location/{location} |

### `integrations.projects.locations.getClients`

- Versions: v1
- `GET https://integrations.googleapis.com/v1/{+parent}/clients`
- Gets the client configuration for the given project and location resource name
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleCloudIntegrationsV1alphaGetClientResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. Required: The ID of the GCP Project to be provisioned. |

### `integrations.projects.locations.integrations.delete`

- Versions: v1
- `DELETE https://integrations.googleapis.com/v1/{+name}`
- Delete the selected integration and all versions inside
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleProtobufEmpty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The location resource of the request. |

### `integrations.projects.locations.integrations.execute`

- Versions: v2, v1
- `POST https://integrations.googleapis.com/v2/{+parent}:execute`
- Executes integrations synchronously. The response is not returned until the requested execution is either fulfilled or experienced an error. Only one integration can be executed. Request format URL: https://integrations.googleapis.com/v2/projects/$PROJECT/locations/$LOCATION/integrations/$INTEGRATION_NAME:execute Request payload: (the entire payload is optional unless input variables need to be set.) {"variable1": "hello world", "variable2": 1, "variable3": {"my_json_key": "my json string value" }
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleApiHttpBody`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The integration resource name. |
| `requestId` | query | string | no | Optional. This is used to de-dup incoming request: if the duplicate request was detected, the response from the previous execution is returned. |
| `triggerId` | query | string | yes | Required. The API trigger id associated with the integration. An integration can have multiple trigger_id. This field is required to disambiguate which trigger should be invoked. |

### `integrations.projects.locations.integrations.executeEvent`

- Versions: v1
- `POST https://integrations.googleapis.com/v1/{+name}:executeEvent`
- Executes an integration on receiving events from Integration Connector triggers, Eventarc or CPS Trigger. Input data to integration is received in body in json format
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleCloudIntegrationsV1alphaExecuteEventResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The integration resource name. Format: projects/{gcp_project_id}/locations/{location}/integrations/{integration_id} |
| `triggerId` | query | string | yes | Required. Id of the integration trigger config. The trigger_id is in the format: `integration_connector_trigger/projects/{gcp_project_id}/location/{location}/connections/{connection_name}/subscriptions/{subscription_name}`. |

### `integrations.projects.locations.integrations.executions.cancel`

- Versions: v1
- `POST https://integrations.googleapis.com/v1/{+name}:cancel`
- Cancellation of an execution and associated sub-executions. This will not cancel an IN_PROCESS or completed(SUCCESSFUL, FAILED or CANCELLED) executions.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `GoogleCloudIntegrationsV1alphaCancelExecutionRequest`; Response: `GoogleCloudIntegrationsV1alphaCancelExecutionResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The execution resource name. Format: projects/{gcp_project_id}/locations/{location}/products/{product}/integrations/{integration_id}/executions/{execution_id} |

### `integrations.projects.locations.integrations.executions.download`

- Versions: v1
- `GET https://integrations.googleapis.com/v1/{+name}:download`
- Download the execution.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleCloudIntegrationsV1alphaDownloadExecutionResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The execution resource name. Format: projects/{gcp_project_id}/locations/{location}/products/{product}/integrations/{integration_id}/executions/{execution_id} |

### `integrations.projects.locations.integrations.executions.get`

- Versions: v1
- `GET https://integrations.googleapis.com/v1/{+name}`
- Get an execution in the specified project.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleCloudIntegrationsV1alphaExecution`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The execution resource name. Format: projects/{gcp_project_id}/locations/{location}/products/{product}/integrations/{integration_id}/executions/{execution_id} |

### `integrations.projects.locations.integrations.executions.list`

- Versions: v2, v1
- `GET https://integrations.googleapis.com/v2/{+parent}/executions`
- Lists the results of all the integration executions. The response includes the same information as the execution log (https://cloud.google.com/application-integration/docs/viewing-logs) in the Integration UI.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleCloudIntegrationsV2ListExecutionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. parent resource name of integration execution. |
| `filter` | query | string | no | Optional. Standard filter field, we support filtering on following fields: integration_name: the name of the integration. create_time: the execution created time. update_time: the execution last update time. state: the state of the executions. execution_id: the id of the execution. trigger_id: the id of the trigger. All fields support for EQUALS, in additional: create_time and update_time support for LESS_THAN, GREATER_THAN Also supports operators like AND, OR, NOT For example: trigger_id=\"id1\" AND integration_name=\"testIntegration\" |
| `pageSize` | query | integer (int32) | no | Optional. The size of entries in the response. |
| `pageToken` | query | string | no | Optional. The token returned in the previous response. |
| `readMask` | query | string (google-fieldmask) | no | Optional. View mask for the response data. If set, only the field specified will be returned as part of the result. If not set, all fields in execution info will be filled and returned. |

### `integrations.projects.locations.integrations.executions.replay`

- Versions: v1
- `POST https://integrations.googleapis.com/v1/{+name}:replay`
- Re-execute an existing execution, with same request parameters and execution strategy.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `GoogleCloudIntegrationsV1alphaReplayExecutionRequest`; Response: `GoogleCloudIntegrationsV1alphaReplayExecutionResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Next ID: 6 The execution resource name. Format: projects/{gcp_project_id}/locations/{location}/integrations/{integration}/executions/{execution_id} |

### `integrations.projects.locations.integrations.executions.suspensions.lift`

- Versions: v1
- `POST https://integrations.googleapis.com/v1/{+name}:lift`
- \* Lifts suspension for the Suspension task. Fetch corresponding suspension with provided suspension Id, resolve suspension, and set up suspension result for the Suspension Task.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `GoogleCloudIntegrationsV1alphaLiftSuspensionRequest`; Response: `GoogleCloudIntegrationsV1alphaLiftSuspensionResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource that the suspension belongs to. "projects/{project}/locations/{location}/products/{product}/integrations/{integration}/executions/{execution}/suspensions/{suspenion}" format. |

### `integrations.projects.locations.integrations.executions.suspensions.list`

- Versions: v1
- `GET https://integrations.googleapis.com/v1/{+parent}/suspensions`
- \* Lists suspensions associated with a specific execution. Only those with permissions to resolve the relevant suspensions will be able to view them.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleCloudIntegrationsV1alphaListSuspensionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. projects/{gcp_project_id}/locations/{location}/products/{product}/integrations/{integration_name}/executions/{execution_name} |
| `filter` | query | string | no | Standard filter field. |
| `orderBy` | query | string | no | Field name to order by. |
| `pageSize` | query | integer (int32) | no | Maximum number of entries in the response. |
| `pageToken` | query | string | no | Token to retrieve a specific page. |

### `integrations.projects.locations.integrations.executions.suspensions.resolve`

- Versions: v1
- `POST https://integrations.googleapis.com/v1/{+name}:resolve`
- \* Resolves (lifts/rejects) any number of suspensions. If the integration is already running, only the status of the suspension is updated. Otherwise, the suspended integration will begin execution again.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `GoogleCloudIntegrationsV1alphaResolveSuspensionRequest`; Response: `GoogleCloudIntegrationsV1alphaResolveSuspensionResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. projects/{gcp_project_id}/locations/{location}/products/{product}/integrations/{integration_name}/executions/{execution_name}/suspensions/{suspension_id} |

### `integrations.projects.locations.integrations.executions.taskExecutions.get`

- Versions: v2
- `GET https://integrations.googleapis.com/v2/{+name}`
- Get a TaskExecution in the specified project.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleCloudIntegrationsV2TaskExecution`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The TaskExecution to retrieve. Format: projects/{project}/locations/{location}/integrations/{integration}/executions/{execution}/taskExecutions/{task_execution} |

### `integrations.projects.locations.integrations.executions.troubleshoot`

- Versions: v2
- `GET https://integrations.googleapis.com/v2/{+name}:troubleshoot`
- View detailed explanation of why an integration execution failed, using LLM
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleCloudIntegrationsV2DuetTroubleshootExecutionResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Execution resource name. Format: `projects/{project}/locations/{location}/integrations/{integration}/executions/{execution_id}` |

### `integrations.projects.locations.integrations.generateIntegrationBranch`

- Versions: v2
- `POST https://integrations.googleapis.com/v2/{+parent}:generateIntegrationBranch`
- Generates an integration branch.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `GoogleCloudIntegrationsV2DuetGenerateIntegrationBranchRequest`; Response: `GoogleCloudIntegrationsV2DuetGenerateIntegrationBranchResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. Format: `projects/{project}/locations/{location}/integrations/{integration}` |

### `integrations.projects.locations.integrations.generateIntegrationDocument`

- Versions: v2
- `POST https://integrations.googleapis.com/v2/{+parent}:generateIntegrationDocument`
- Generates documentation for an integration version.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `GoogleCloudIntegrationsV2DuetGenerateIntegrationDocumentRequest`; Response: `GoogleCloudIntegrationsV2DuetGenerateIntegrationDocumentResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. Format: `projects/{project}/locations/{location}/integrations/{integration}` |

### `integrations.projects.locations.integrations.generateJavascript`

- Versions: v2
- `POST https://integrations.googleapis.com/v2/{+parent}:generateJavascript`
- Generates Javascript code for data mapping.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `GoogleCloudIntegrationsV2DuetGenerateJavascriptRequest`; Response: `GoogleCloudIntegrationsV2DuetGenerateJavascriptResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. Format: `projects/{project}/locations/{location}/integrations/{integration}` |

### `integrations.projects.locations.integrations.list`

- Versions: v1
- `GET https://integrations.googleapis.com/v1/{+parent}/integrations`
- Returns the list of all integrations in the specified project.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleCloudIntegrationsV1alphaListIntegrationsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. Project and location from which the integrations should be listed. Format: projects/{project} |
| `filter` | query | string | no | Filter on fields of IntegrationVersion. Fields can be compared with literal values by use of ":" (containment), "=" (equality), ">" (greater), "<" (less than), >=" (greater than or equal to), "<=" (less than or equal to), and "!=" (inequality) operators. Negation, conjunction, and disjunction are written using NOT, AND, and OR keywords. For example, organization_id=\"1\" AND state=ACTIVE AND description:"test". Filtering cannot be performed on repeated fields like `task_config`. |
| `orderBy` | query | string | no | The results would be returned in order you specified here. Supported sort keys are: Descending sort order by "last_modified_time", "created_time", "snapshot_number". Ascending sort order by the integration name. |
| `pageSize` | query | integer (int32) | no | The page size for the resquest. |
| `pageToken` | query | string | no | The page token for the resquest. |

### `integrations.projects.locations.integrations.recommendTasks`

- Versions: v2
- `POST https://integrations.googleapis.com/v2/{+parent}:recommendTasks`
- Recommends tasks to replace a selected task.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `GoogleCloudIntegrationsV2DuetRecommendTasksRequest`; Response: `GoogleCloudIntegrationsV2DuetRecommendTasksResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. Format: `projects/{project}/locations/{location}/integrations/{integration}` |

### `integrations.projects.locations.integrations.schedule`

- Versions: v2, v1
- `POST https://integrations.googleapis.com/v2/{+parent}:schedule`
- Schedules an integration for execution.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleApiHttpBody`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The integration resource name. |
| `requestId` | query | string | no | Optional. This is used to de-dup incoming request: if the duplicate request was detected, the response from the previous execution is returned. |
| `scheduleTime` | query | string (google-datetime) | no | Optional. The time that the integration should be executed. If the time is less or equal to the current time, the integration is executed immediately. |
| `triggerId` | query | string | yes | Required. The API trigger id associated with the integration. An integration can have multiple trigger_id. This field is required to disambiguate which trigger should be invoked |

### `integrations.projects.locations.integrations.search`

- Versions: v1
- `GET https://integrations.googleapis.com/v1/{+parent}/integrations:search`
- Searches and returns the list of integrations in the specified project.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleCloudIntegrationsV1alphaSearchIntegrationsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. Project and location from which the integrations should be listed. Format: projects/\*/locations/\*/resources/integrations |
| `enableNaturalLanguageQueryUnderstanding` | query | boolean | no | Optional. Whether to enable natural language query understanding. |
| `filter` | query | string | no | Optional. The pre-filter to be applied to the search. This should follow the expressions defined in https://cloud.google.com/generative-ai-app-builder/docs/filter-search-metadata. For example, "status:ANY("ACTIVE")" will return all the resources whose status contains the "ACTIVE". |
| `pageSize` | query | integer (int32) | no | Optional. The maximum number of results to return. The service may return fewer than this value. If unspecified, at most 10 results will be returned. The maximum value is 100; values above 100 will be coerced to 100. |
| `pageToken` | query | string | no | Optional. A page token, received from a previous `SearchIntegrations` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `SearchIntegrations` must match the call that provided the page token. |
| `query` | query | string | yes | Required. The user query |

### `integrations.projects.locations.integrations.test`

- Versions: v1
- `POST https://integrations.googleapis.com/v1/{+name}:test`
- Execute the integration in draft state
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `GoogleCloudIntegrationsV1alphaTestIntegrationsRequest`; Response: `GoogleCloudIntegrationsV1alphaTestIntegrationsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Output only. Auto-generated primary key. |

### `integrations.projects.locations.integrations.versions.create`

- Versions: v1
- `POST https://integrations.googleapis.com/v1/{+parent}/versions`
- Create a integration with a draft version in the specified project.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `GoogleCloudIntegrationsV1alphaIntegrationVersion`; Response: `GoogleCloudIntegrationsV1alphaIntegrationVersion`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent resource where this version will be created. Format: projects/{project}/locations/{location}/integrations/{integration} |
| `createSampleIntegrations` | query | boolean | no | Optional. Optional. Indicates if sample workflow should be created. |
| `newIntegration` | query | boolean | no | Set this flag to true, if draft version is to be created for a brand new integration. False, if the request is for an existing integration. For backward compatibility reasons, even if this flag is set to `false` and no existing integration is found, a new draft integration will still be created. |

### `integrations.projects.locations.integrations.versions.delete`

- Versions: v1
- `DELETE https://integrations.googleapis.com/v1/{+name}`
- Soft-deletes the integration. Changes the status of the integration to ARCHIVED. If the integration being ARCHIVED is tagged as "HEAD", the tag is removed from this snapshot and set to the previous non-ARCHIVED snapshot. The PUBLISH_REQUESTED, DUE_FOR_DELETION tags are removed too. This RPC throws an exception if the version being deleted is DRAFT, and if the `locked_by` user is not the same as the user performing the Delete. Audit fields updated include last_modified_timestamp, last_modified_by. Any existing lock is released when Deleting a integration. Currently, there is no undelete mechanism.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleProtobufEmpty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The version to delete. Format: projects/{project}/locations/{location}/integrations/{integration}/versions/{version} |

### `integrations.projects.locations.integrations.versions.download`

- Versions: v1
- `GET https://integrations.googleapis.com/v1/{+name}:download`
- Downloads an integration. Retrieves the `IntegrationVersion` for a given `integration_id` and returns the response as a string.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleCloudIntegrationsV1alphaDownloadIntegrationVersionResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The version to download. Format: projects/{project}/locations/{location}/integrations/{integration}/versions/{version} |
| `fileFormat` | query | string enum | no | File format for download request. Values: `FILE_FORMAT_UNSPECIFIED`, `JSON`, `YAML`, `WORKFLOW_TEXTPROTO`. |
| `files` | query | repeated string enum | no | Optional. Integration related file to download like Integration Json, Config variable, testcase etc. Values: `INTEGRATION_FILE_UNSPECIFIED`, `INTEGRATION`, `INTEGRATION_CONFIG_VARIABLES`. |

### `integrations.projects.locations.integrations.versions.downloadJsonPackage`

- Versions: v1
- `GET https://integrations.googleapis.com/v1/{+name}:downloadJsonPackage`
- Downloads an Integration version package like IntegrationVersion,Integration Config etc. Retrieves the IntegrationVersion package for a given `integration_id` and returns the response as a JSON.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleCloudIntegrationsV1alphaDownloadJsonPackageResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Integration version name Format: projects/{project}/locations/{location}/integrations/{integration}/versions/{version} |
| `files` | query | repeated string enum | no | Optional. Integration related file to download like Integration Version, Config variable, testcase etc. Values: `INTEGRATION_FILE_UNSPECIFIED`, `INTEGRATION`, `INTEGRATION_CONFIG_VARIABLES`. |

### `integrations.projects.locations.integrations.versions.get`

- Versions: v1
- `GET https://integrations.googleapis.com/v1/{+name}`
- Get a integration in the specified project.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleCloudIntegrationsV1alphaIntegrationVersion`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The version to retrieve. Format: projects/{project}/locations/{location}/integrations/{integration}/versions/{version} |

### `integrations.projects.locations.integrations.versions.list`

- Versions: v1
- `GET https://integrations.googleapis.com/v1/{+parent}/versions`
- Returns the list of all integration versions in the specified project.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleCloudIntegrationsV1alphaListIntegrationVersionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent resource where this version will be created. Format: projects/{project}/locations/{location}/integrations/{integration} Specifically, when parent equals: 1. projects//locations//integrations/, Meaning: "List versions (with filter) for a particular integration". 2. projects//locations//integrations/- Meaning: "List versions (with filter) for a client within a particular region". |
| `fieldMask` | query | string (google-fieldmask) | no | The field mask which specifies the particular data to be returned. |
| `filter` | query | string | no | Filter on fields of IntegrationVersion. Fields can be compared with literal values by use of ":" (containment), "=" (equality), ">" (greater), "<" (less than), >=" (greater than or equal to), "<=" (less than or equal to), and "!=" (inequality) operators. Negation, conjunction, and disjunction are written using NOT, AND, and OR keywords. For example, organization_id=\"1\" AND state=ACTIVE AND description:"test". Filtering cannot be performed on repeated fields like `task_config`. |
| `orderBy` | query | string | no | The results would be returned in order you specified here. Currently supported sort keys are: Descending sort order for "last\_modified\_time", "created\_time", and "snapshot\_number". Ascending sort order for `name`. |
| `pageSize` | query | integer (int32) | no | The maximum number of versions to return. The service may return fewer than this value. If unspecified, at most 50 versions will be returned. The maximum value is 1000; values above 1000 will be coerced to 1000. |
| `pageToken` | query | string | no | A page token, received from a previous `ListIntegrationVersions` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListIntegrationVersions` must match the call that provided the page token. |

### `integrations.projects.locations.integrations.versions.patch`

- Versions: v1
- `PATCH https://integrations.googleapis.com/v1/{+name}`
- Update a integration with a draft version in the specified project.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `GoogleCloudIntegrationsV1alphaIntegrationVersion`; Response: `GoogleCloudIntegrationsV1alphaIntegrationVersion`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Output only. Auto-generated primary key. |
| `updateMask` | query | string (google-fieldmask) | no | Field mask specifying the fields in the above integration that have been modified and need to be updated. |

### `integrations.projects.locations.integrations.versions.publish`

- Versions: v1
- `POST https://integrations.googleapis.com/v1/{+name}:publish`
- This RPC throws an exception if the integration is in ARCHIVED or ACTIVE state. This RPC throws an exception if the version being published is DRAFT, and if the `locked_by` user is not the same as the user performing the Publish. Audit fields updated include last_published_timestamp, last_published_by, last_modified_timestamp, last_modified_by. Any existing lock is on this integration is released.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `GoogleCloudIntegrationsV1alphaPublishIntegrationVersionRequest`; Response: `GoogleCloudIntegrationsV1alphaPublishIntegrationVersionResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The version to publish. Format: projects/{project}/locations/{location}/integrations/{integration}/versions/{version} |

### `integrations.projects.locations.integrations.versions.test`

- Versions: v1
- `POST https://integrations.googleapis.com/v1/{+name}:test`
- Execute the integration in draft state
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `GoogleCloudIntegrationsV1alphaTestIntegrationsRequest`; Response: `GoogleCloudIntegrationsV1alphaTestIntegrationsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Output only. Auto-generated primary key. |

### `integrations.projects.locations.integrations.versions.testCases.create`

- Versions: v1
- `POST https://integrations.googleapis.com/v1/{+parent}/testCases`
- Creates a new test case
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `GoogleCloudIntegrationsV1alphaTestCase`; Response: `GoogleCloudIntegrationsV1alphaTestCase`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent resource where this test case will be created. Format: projects/{project}/locations/{location}/integrations/{integration}/versions/{integration_version} |
| `testCaseId` | query | string | yes | Required. Required |

### `integrations.projects.locations.integrations.versions.testCases.delete`

- Versions: v1
- `DELETE https://integrations.googleapis.com/v1/{+name}`
- Deletes a test case
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleProtobufEmpty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. ID for the test case to be deleted |

### `integrations.projects.locations.integrations.versions.testCases.download`

- Versions: v1
- `GET https://integrations.googleapis.com/v1/{+name}:download`
- Downloads a test case. Retrieves the `TestCase` for a given `test_case_id` and returns the response as a string.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleCloudIntegrationsV1alphaDownloadTestCaseResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The test case to download. Format: projects/{project}/locations/{location}/integrations/{integration}/versions/{integration_version}/testCases/{test_case_id} |
| `fileFormat` | query | string enum | no | File format for download request. Values: `FILE_FORMAT_UNSPECIFIED`, `JSON`, `YAML`, `WORKFLOW_TEXTPROTO`. |

### `integrations.projects.locations.integrations.versions.testCases.execute`

- Versions: v1
- `POST https://integrations.googleapis.com/v1/{+parent}/testCases:execute`
- Executes all test cases in an integration version.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `GoogleCloudIntegrationsV1alphaExecuteTestCasesRequest`; Response: `GoogleCloudIntegrationsV1alphaExecuteTestCasesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent resource whose test cases are executed. Format: projects/{project}/locations/{location}/integrations/{integration}/versions/{integration_version} |

### `integrations.projects.locations.integrations.versions.testCases.executeTest`

- Versions: v1
- `POST https://integrations.googleapis.com/v1/{+testCaseName}:executeTest`
- Executes functional test
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `GoogleCloudIntegrationsV1alphaExecuteTestCaseRequest`; Response: `GoogleCloudIntegrationsV1alphaExecuteTestCaseResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `testCaseName` | path | string | yes | Required. Test case resource name |

### `integrations.projects.locations.integrations.versions.testCases.get`

- Versions: v1
- `GET https://integrations.googleapis.com/v1/{+name}`
- Get a test case
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleCloudIntegrationsV1alphaTestCase`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The ID of the test case to retrieve |

### `integrations.projects.locations.integrations.versions.testCases.list`

- Versions: v1
- `GET https://integrations.googleapis.com/v1/{+parent}/testCases`
- Lists all the test cases that satisfy the filters.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleCloudIntegrationsV1alphaListTestCasesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent resource where this TestCase was created. |
| `filter` | query | string | no | Optional. Standard filter field. Filtering as supported in https://developers.google.com/authorized-buyers/apis/guides/list-filters. |
| `orderBy` | query | string | no | Optional. The results would be returned in order specified here. Currently supported sort keys are: Descending sort order for "last_modified_time", "created_time". Ascending sort order for "name". |
| `pageSize` | query | integer (int32) | no | Optional. The maximum number of test cases to return. The service may return fewer than this value. If unspecified, at most 100 test cases will be returned. |
| `pageToken` | query | string | no | Optional. A page token, received from a previous `ListTestCases` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListTestCases` must match the call that provided the page token. |
| `readMask` | query | string (google-fieldmask) | no | Optional. The mask which specifies fields that need to be returned in the TestCases's response. |

### `integrations.projects.locations.integrations.versions.testCases.patch`

- Versions: v1
- `PATCH https://integrations.googleapis.com/v1/{+name}`
- Updates a test case
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `GoogleCloudIntegrationsV1alphaTestCase`; Response: `GoogleCloudIntegrationsV1alphaTestCase`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Output only. Auto-generated primary key. |
| `updateMask` | query | string (google-fieldmask) | no | Optional. Field mask specifying the fields in the above integration that have been modified and need to be updated. |

### `integrations.projects.locations.integrations.versions.testCases.takeoverEditLock`

- Versions: v1
- `POST https://integrations.googleapis.com/v1/{+name}:takeoverEditLock`
- Clear the lock fields and assign them to current user
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `GoogleCloudIntegrationsV1alphaTakeoverTestCaseEditLockRequest`; Response: `GoogleCloudIntegrationsV1alphaTestCase`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The ID of test case to takeover edit lock. Format: projects/{project}/locations/{location}/integrations/{integration}/versions/{integration_version}/testCases/{test_case_id} |

### `integrations.projects.locations.integrations.versions.testCases.upload`

- Versions: v1
- `POST https://integrations.googleapis.com/v1/{+parent}/testCases:upload`
- Uploads a test case. The content can be a previously downloaded test case. Performs the same function as CreateTestCase, but accepts input in a string format, which holds the complete representation of the TestCase content.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `GoogleCloudIntegrationsV1alphaUploadTestCaseRequest`; Response: `GoogleCloudIntegrationsV1alphaUploadTestCaseResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The test case to upload. Format: projects/{project}/locations/{location}/integrations/{integration}/versions/{integration_version} |

### `integrations.projects.locations.integrations.versions.unpublish`

- Versions: v1
- `POST https://integrations.googleapis.com/v1/{+name}:unpublish`
- Sets the status of the ACTIVE integration to SNAPSHOT with a new tag "PREVIOUSLY_PUBLISHED" after validating it. The "HEAD" and "PUBLISH_REQUESTED" tags do not change. This RPC throws an exception if the version being snapshot is not ACTIVE. Audit fields added include action, action_by, action_timestamp.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `GoogleCloudIntegrationsV1alphaUnpublishIntegrationVersionRequest`; Response: `GoogleProtobufEmpty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The version to deactivate. Format: projects/{project}/locations/{location}/integrations/{integration}/versions/{version} |

### `integrations.projects.locations.integrations.versions.upload`

- Versions: v1
- `POST https://integrations.googleapis.com/v1/{+parent}/versions:upload`
- Uploads an integration. The content can be a previously downloaded integration. Performs the same function as CreateDraftIntegrationVersion, but accepts input in a string format, which holds the complete representation of the IntegrationVersion content.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `GoogleCloudIntegrationsV1alphaUploadIntegrationVersionRequest`; Response: `GoogleCloudIntegrationsV1alphaUploadIntegrationVersionResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The version to upload. Format: projects/{project}/locations/{location}/integrations/{integration} |

### `integrations.projects.locations.products.authConfigs.create`

- Versions: v1
- `POST https://integrations.googleapis.com/v1/{+parent}/authConfigs`
- Creates an auth config record. Fetch corresponding credentials for specific auth types, e.g. access token for OAuth 2.0, JWT token for JWT. Encrypt the auth config with Cloud KMS and store the encrypted credentials in Spanner. Returns the encrypted auth config.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `GoogleCloudIntegrationsV1alphaAuthConfig`; Response: `GoogleCloudIntegrationsV1alphaAuthConfig`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. "projects/{project}/locations/{location}" format. |
| `clientCertificate.encryptedPrivateKey` | query | string | no | The ssl certificate encoded in PEM format. This string must include the begin header and end footer lines. For example, -----BEGIN CERTIFICATE----- MIICTTCCAbagAwIBAgIJAPT0tSKNxan/MA0GCSqGSIb3DQEBCwUAMCoxFzAVBgNV BAoTDkdvb2dsZSBURVNUSU5HMQ8wDQYDVQQDEwZ0ZXN0Q0EwHhcNMTUwMTAxMDAw MDAwWhcNMjUwMTAxMDAwMDAwWjAuMRcwFQYDVQQKEw5Hb29nbGUgVEVTVElORzET MBEGA1UEAwwKam9lQGJhbmFuYTCBnzANBgkqhkiG9w0BAQEFAAOBjQAwgYkCgYEA vDYFgMgxi5W488d9J7UpCInl0NXmZQpJDEHE4hvkaRlH7pnC71H0DLt0/3zATRP1 JzY2+eqBmbGl4/sgZKYv8UrLnNyQNUTsNx1iZAfPUflf5FwgVsai8BM0pUciq1NB xD429VFcrGZNucvFLh72RuRFIKH8WUpiK/iZNFkWhZ0CAwEAAaN3MHUwDgYDVR0P AQH/BAQDAgWgMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAMBgNVHRMB Af8EAjAAMBkGA1UdDgQSBBCVgnFBCWgL/iwCqnGrhTPQMBsGA1UdIwQUMBKAEKey Um2o4k2WiEVA0ldQvNYwDQYJKoZIhvcNAQELBQADgYEAYK986R4E3L1v+Q6esBtW JrUwA9UmJRSQr0N5w3o9XzarU37/bkjOP0Fw0k/A6Vv1n3vlciYfBFaBIam1qRHr 5dMsYf4CZS6w50r7hyzqyrwDoyNxkLnd2PdcHT/sym1QmflsjEs7pejtnohO6N2H wQW6M0H7Zt8claGRla4fKkg= -----END CERTIFICATE----- |
| `clientCertificate.passphrase` | query | string | no | 'passphrase' should be left unset if private key is not encrypted. Note that 'passphrase' is not the password for web server, but an extra layer of security to protected private key. |
| `clientCertificate.sslCertificate` | query | string | no | The ssl certificate encoded in PEM format. This string must include the begin header and end footer lines. For example, -----BEGIN CERTIFICATE----- MIICTTCCAbagAwIBAgIJAPT0tSKNxan/MA0GCSqGSIb3DQEBCwUAMCoxFzAVBgNV BAoTDkdvb2dsZSBURVNUSU5HMQ8wDQYDVQQDEwZ0ZXN0Q0EwHhcNMTUwMTAxMDAw MDAwWhcNMjUwMTAxMDAwMDAwWjAuMRcwFQYDVQQKEw5Hb29nbGUgVEVTVElORzET MBEGA1UEAwwKam9lQGJhbmFuYTCBnzANBgkqhkiG9w0BAQEFAAOBjQAwgYkCgYEA vDYFgMgxi5W488d9J7UpCInl0NXmZQpJDEHE4hvkaRlH7pnC71H0DLt0/3zATRP1 JzY2+eqBmbGl4/sgZKYv8UrLnNyQNUTsNx1iZAfPUflf5FwgVsai8BM0pUciq1NB xD429VFcrGZNucvFLh72RuRFIKH8WUpiK/iZNFkWhZ0CAwEAAaN3MHUwDgYDVR0P AQH/BAQDAgWgMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAMBgNVHRMB Af8EAjAAMBkGA1UdDgQSBBCVgnFBCWgL/iwCqnGrhTPQMBsGA1UdIwQUMBKAEKey Um2o4k2WiEVA0ldQvNYwDQYJKoZIhvcNAQELBQADgYEAYK986R4E3L1v+Q6esBtW JrUwA9UmJRSQr0N5w3o9XzarU37/bkjOP0Fw0k/A6Vv1n3vlciYfBFaBIam1qRHr 5dMsYf4CZS6w50r7hyzqyrwDoyNxkLnd2PdcHT/sym1QmflsjEs7pejtnohO6N2H wQW6M0H7Zt8claGRla4fKkg= -----END CERTIFICATE----- |

### `integrations.projects.locations.products.authConfigs.delete`

- Versions: v1
- `DELETE https://integrations.googleapis.com/v1/{+name}`
- Deletes an auth config.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleProtobufEmpty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name that is associated with the AuthConfig. |

### `integrations.projects.locations.products.authConfigs.get`

- Versions: v1
- `GET https://integrations.googleapis.com/v1/{+name}`
- Gets a complete auth config. If the auth config doesn't exist, Code.NOT_FOUND exception will be thrown. Returns the decrypted auth config.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleCloudIntegrationsV1alphaAuthConfig`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name that is associated with the AuthConfig. |

### `integrations.projects.locations.products.authConfigs.list`

- Versions: v1
- `GET https://integrations.googleapis.com/v1/{+parent}/authConfigs`
- Lists all auth configs that match the filter. Restrict to auth configs belong to the current client only.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleCloudIntegrationsV1alphaListAuthConfigsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The client, which owns this collection of AuthConfigs. |
| `filter` | query | string | no | Filtering as supported in https://developers.google.com/authorized-buyers/apis/guides/list-filters. |
| `pageSize` | query | integer (int32) | no | The size of entries in the response. If unspecified, defaults to 100. |
| `pageToken` | query | string | no | The token returned in the previous response. |
| `readMask` | query | string (google-fieldmask) | no | The mask which specifies fields that need to be returned in the AuthConfig's response. |

### `integrations.projects.locations.products.authConfigs.patch`

- Versions: v1
- `PATCH https://integrations.googleapis.com/v1/{+name}`
- Updates an auth config. If credential is updated, fetch the encrypted auth config from Spanner, decrypt with Cloud KMS key, update the credential fields, re-encrypt with Cloud KMS key and update the Spanner record. For other fields, directly update the Spanner record. Returns the encrypted auth config.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `GoogleCloudIntegrationsV1alphaAuthConfig`; Response: `GoogleCloudIntegrationsV1alphaAuthConfig`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Resource name of the auth config. For more information, see Manage authentication profiles. projects/{project}/locations/{location}/authConfigs/{authConfig}. |
| `clientCertificate.encryptedPrivateKey` | query | string | no | The ssl certificate encoded in PEM format. This string must include the begin header and end footer lines. For example, -----BEGIN CERTIFICATE----- MIICTTCCAbagAwIBAgIJAPT0tSKNxan/MA0GCSqGSIb3DQEBCwUAMCoxFzAVBgNV BAoTDkdvb2dsZSBURVNUSU5HMQ8wDQYDVQQDEwZ0ZXN0Q0EwHhcNMTUwMTAxMDAw MDAwWhcNMjUwMTAxMDAwMDAwWjAuMRcwFQYDVQQKEw5Hb29nbGUgVEVTVElORzET MBEGA1UEAwwKam9lQGJhbmFuYTCBnzANBgkqhkiG9w0BAQEFAAOBjQAwgYkCgYEA vDYFgMgxi5W488d9J7UpCInl0NXmZQpJDEHE4hvkaRlH7pnC71H0DLt0/3zATRP1 JzY2+eqBmbGl4/sgZKYv8UrLnNyQNUTsNx1iZAfPUflf5FwgVsai8BM0pUciq1NB xD429VFcrGZNucvFLh72RuRFIKH8WUpiK/iZNFkWhZ0CAwEAAaN3MHUwDgYDVR0P AQH/BAQDAgWgMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAMBgNVHRMB Af8EAjAAMBkGA1UdDgQSBBCVgnFBCWgL/iwCqnGrhTPQMBsGA1UdIwQUMBKAEKey Um2o4k2WiEVA0ldQvNYwDQYJKoZIhvcNAQELBQADgYEAYK986R4E3L1v+Q6esBtW JrUwA9UmJRSQr0N5w3o9XzarU37/bkjOP0Fw0k/A6Vv1n3vlciYfBFaBIam1qRHr 5dMsYf4CZS6w50r7hyzqyrwDoyNxkLnd2PdcHT/sym1QmflsjEs7pejtnohO6N2H wQW6M0H7Zt8claGRla4fKkg= -----END CERTIFICATE----- |
| `clientCertificate.passphrase` | query | string | no | 'passphrase' should be left unset if private key is not encrypted. Note that 'passphrase' is not the password for web server, but an extra layer of security to protected private key. |
| `clientCertificate.sslCertificate` | query | string | no | The ssl certificate encoded in PEM format. This string must include the begin header and end footer lines. For example, -----BEGIN CERTIFICATE----- MIICTTCCAbagAwIBAgIJAPT0tSKNxan/MA0GCSqGSIb3DQEBCwUAMCoxFzAVBgNV BAoTDkdvb2dsZSBURVNUSU5HMQ8wDQYDVQQDEwZ0ZXN0Q0EwHhcNMTUwMTAxMDAw MDAwWhcNMjUwMTAxMDAwMDAwWjAuMRcwFQYDVQQKEw5Hb29nbGUgVEVTVElORzET MBEGA1UEAwwKam9lQGJhbmFuYTCBnzANBgkqhkiG9w0BAQEFAAOBjQAwgYkCgYEA vDYFgMgxi5W488d9J7UpCInl0NXmZQpJDEHE4hvkaRlH7pnC71H0DLt0/3zATRP1 JzY2+eqBmbGl4/sgZKYv8UrLnNyQNUTsNx1iZAfPUflf5FwgVsai8BM0pUciq1NB xD429VFcrGZNucvFLh72RuRFIKH8WUpiK/iZNFkWhZ0CAwEAAaN3MHUwDgYDVR0P AQH/BAQDAgWgMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAMBgNVHRMB Af8EAjAAMBkGA1UdDgQSBBCVgnFBCWgL/iwCqnGrhTPQMBsGA1UdIwQUMBKAEKey Um2o4k2WiEVA0ldQvNYwDQYJKoZIhvcNAQELBQADgYEAYK986R4E3L1v+Q6esBtW JrUwA9UmJRSQr0N5w3o9XzarU37/bkjOP0Fw0k/A6Vv1n3vlciYfBFaBIam1qRHr 5dMsYf4CZS6w50r7hyzqyrwDoyNxkLnd2PdcHT/sym1QmflsjEs7pejtnohO6N2H wQW6M0H7Zt8claGRla4fKkg= -----END CERTIFICATE----- |
| `updateMask` | query | string (google-fieldmask) | no | Field mask specifying the fields in the above AuthConfig that have been modified and need to be updated. |

### `integrations.projects.locations.products.certificates.create`

- Versions: v1
- `POST https://integrations.googleapis.com/v1/{+parent}/certificates`
- Creates a new certificate. The certificate will be registered to the trawler service and will be encrypted using cloud KMS and stored in Spanner Returns the certificate.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `GoogleCloudIntegrationsV1alphaCertificate`; Response: `GoogleCloudIntegrationsV1alphaCertificate`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. "projects/{project}/locations/{location}" format. |

### `integrations.projects.locations.products.certificates.delete`

- Versions: v1
- `DELETE https://integrations.googleapis.com/v1/{+name}`
- Delete a certificate
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleProtobufEmpty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name that is associated with the Certificate. |

### `integrations.projects.locations.products.certificates.get`

- Versions: v1
- `GET https://integrations.googleapis.com/v1/{+name}`
- Get a certificates in the specified project.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleCloudIntegrationsV1alphaCertificate`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The certificate to retrieve. Format: projects/{project}/locations/{location}/certificates/{certificate} |

### `integrations.projects.locations.products.certificates.list`

- Versions: v1
- `GET https://integrations.googleapis.com/v1/{+parent}/certificates`
- List all the certificates that match the filter. Restrict to certificate of current client only.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleCloudIntegrationsV1alphaListCertificatesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The client, which owns this collection of Certificates. |
| `filter` | query | string | no | Filtering as supported in https://developers.google.com/authorized-buyers/apis/guides/list-filters. |
| `pageSize` | query | integer (int32) | no | The size of entries in the response. If unspecified, defaults to 100. |
| `pageToken` | query | string | no | The token returned in the previous response. |
| `readMask` | query | string (google-fieldmask) | no | The mask which specifies fields that need to be returned in the Certificate's response. |

### `integrations.projects.locations.products.certificates.patch`

- Versions: v1
- `PATCH https://integrations.googleapis.com/v1/{+name}`
- Updates the certificate by id. If new certificate file is updated, it will register with the trawler service, re-encrypt with cloud KMS and update the Spanner record. Other fields will directly update the Spanner record. Returns the Certificate.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `GoogleCloudIntegrationsV1alphaCertificate`; Response: `GoogleCloudIntegrationsV1alphaCertificate`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Output only. Auto generated primary key |
| `updateMask` | query | string (google-fieldmask) | no | Field mask specifying the fields in the above Certificate that have been modified and need to be updated. |

### `integrations.projects.locations.products.cloudFunctions.create`

- Versions: v1
- `POST https://integrations.googleapis.com/v1/{+parent}/cloudFunctions`
- Creates a cloud function project.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `GoogleCloudIntegrationsV1alphaCreateCloudFunctionRequest`; Response: `GoogleCloudIntegrationsV1alphaCreateCloudFunctionResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The project that the executed integration belongs to. |

### `integrations.projects.locations.products.integrations.execute`

- Versions: v1
- `POST https://integrations.googleapis.com/v1/{+name}:execute`
- Executes integrations synchronously by passing the trigger id in the request body. The request is not returned until the requested executions are either fulfilled or experienced an error. If the integration name is not specified (passing `-`), all of the associated integration under the given trigger_id will be executed. Otherwise only the specified integration for the given `trigger_id` is executed. This is helpful for execution the integration from UI.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `GoogleCloudIntegrationsV1alphaExecuteIntegrationsRequest`; Response: `GoogleCloudIntegrationsV1alphaExecuteIntegrationsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The integration resource name. |

### `integrations.projects.locations.products.integrations.executions.download`

- Versions: v1
- `GET https://integrations.googleapis.com/v1/{+name}:download`
- Download the execution.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleCloudIntegrationsV1alphaDownloadExecutionResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The execution resource name. Format: projects/{gcp_project_id}/locations/{location}/products/{product}/integrations/{integration_id}/executions/{execution_id} |

### `integrations.projects.locations.products.integrations.executions.get`

- Versions: v1
- `GET https://integrations.googleapis.com/v1/{+name}`
- Get an execution in the specified project.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleCloudIntegrationsV1alphaExecution`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The execution resource name. Format: projects/{gcp_project_id}/locations/{location}/products/{product}/integrations/{integration_id}/executions/{execution_id} |

### `integrations.projects.locations.products.integrations.executions.list`

- Versions: v1
- `GET https://integrations.googleapis.com/v1/{+parent}/executions`
- Lists the results of all the integration executions. The response includes the same information as the execution log (https://cloud.google.com/application-integration/docs/viewing-logs) in the Integration UI.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleCloudIntegrationsV1alphaListExecutionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent resource name of the integration execution. |
| `filter` | query | string | no | Optional. Standard filter field, we support filtering on following fields: workflow_name: the name of the integration. CreateTimestamp: the execution created time. event_execution_state: the state of the executions. execution_id: the id of the execution. trigger_id: the id of the trigger. parameter_type: the type of the parameters involved in the execution. All fields support for EQUALS, in additional: CreateTimestamp support for LESS_THAN, GREATER_THAN ParameterType support for HAS For example: "parameter_type" HAS \"string\" Also supports operators like AND, OR, NOT For example, trigger_id=\"id1\" AND workflow_name=\"testWorkflow\" |
| `filterParams.customFilter` | query | string | no | Optional user-provided custom filter. |
| `filterParams.endTime` | query | string (int64) | no | End timestamp. |
| `filterParams.eventStatuses` | query | repeated string | no | List of possible event statuses. |
| `filterParams.executionId` | query | string | no | Execution id. |
| `filterParams.parameterKey` | query | string | no | Param key. DEPRECATED. Use parameter_pair_key instead. |
| `filterParams.parameterPairKey` | query | string | no | Param key in the key value pair filter. |
| `filterParams.parameterPairValue` | query | string | no | Param value in the key value pair filter. |
| `filterParams.parameterType` | query | string | no | Param type. |
| `filterParams.parameterValue` | query | string | no | Param value. DEPRECATED. Use parameter_pair_value instead. |
| `filterParams.startTime` | query | string (int64) | no | Start timestamp. |
| `filterParams.taskStatuses` | query | repeated string | no | List of possible task statuses. |
| `filterParams.workflowName` | query | string | no | Workflow name. |
| `orderBy` | query | string | no | Optional. The results would be returned in order you specified here. Currently supporting "create_time". |
| `pageSize` | query | integer (int32) | no | Optional. The size of entries in the response. |
| `pageToken` | query | string | no | Optional. The token returned in the previous response. |
| `readMask` | query | string (google-fieldmask) | no | Optional. View mask for the response data. If set, only the field specified will be returned as part of the result. If not set, all fields in Execution will be filled and returned. Supported fields: trigger_id execution_method create_time update_time execution_details execution_details.state execution_details.execution_snapshots execution_details.attempt_stats execution_details.event_execution_snapshots_size request_parameters cloud_logging_details snapshot_number replay_info |
| `refreshAcl` | query | boolean | no | Optional. If true, the service will use the most recent acl information to list event execution infos and renew the acl cache. Note that fetching the most recent acl is synchronous, so it will increase RPC call latency. |
| `snapshotMetadataWithoutParams` | query | boolean | no | Optional. If true, the service will provide execution info with snapshot metadata only i.e. without event parameters. |
| `truncateParams` | query | boolean | no | Optional. If true, the service will truncate the params to only keep the first 1000 characters of string params and empty the executions in order to make response smaller. Only works for UI and when the params fields are not filtered out. |

### `integrations.projects.locations.products.integrations.executions.suspensions.lift`

- Versions: v1
- `POST https://integrations.googleapis.com/v1/{+name}:lift`
- \* Lifts suspension for the Suspension task. Fetch corresponding suspension with provided suspension Id, resolve suspension, and set up suspension result for the Suspension Task.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `GoogleCloudIntegrationsV1alphaLiftSuspensionRequest`; Response: `GoogleCloudIntegrationsV1alphaLiftSuspensionResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource that the suspension belongs to. "projects/{project}/locations/{location}/products/{product}/integrations/{integration}/executions/{execution}/suspensions/{suspenion}" format. |

### `integrations.projects.locations.products.integrations.executions.suspensions.list`

- Versions: v1
- `GET https://integrations.googleapis.com/v1/{+parent}/suspensions`
- \* Lists suspensions associated with a specific execution. Only those with permissions to resolve the relevant suspensions will be able to view them.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleCloudIntegrationsV1alphaListSuspensionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. projects/{gcp_project_id}/locations/{location}/products/{product}/integrations/{integration_name}/executions/{execution_name} |
| `filter` | query | string | no | Standard filter field. |
| `orderBy` | query | string | no | Field name to order by. |
| `pageSize` | query | integer (int32) | no | Maximum number of entries in the response. |
| `pageToken` | query | string | no | Token to retrieve a specific page. |

### `integrations.projects.locations.products.integrations.executions.suspensions.resolve`

- Versions: v1
- `POST https://integrations.googleapis.com/v1/{+name}:resolve`
- \* Resolves (lifts/rejects) any number of suspensions. If the integration is already running, only the status of the suspension is updated. Otherwise, the suspended integration will begin execution again.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `GoogleCloudIntegrationsV1alphaResolveSuspensionRequest`; Response: `GoogleCloudIntegrationsV1alphaResolveSuspensionResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. projects/{gcp_project_id}/locations/{location}/products/{product}/integrations/{integration_name}/executions/{execution_name}/suspensions/{suspension_id} |

### `integrations.projects.locations.products.integrations.list`

- Versions: v1
- `GET https://integrations.googleapis.com/v1/{+parent}/integrations`
- Returns the list of all integrations in the specified project.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleCloudIntegrationsV1alphaListIntegrationsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. Project and location from which the integrations should be listed. Format: projects/{project} |
| `filter` | query | string | no | Filter on fields of IntegrationVersion. Fields can be compared with literal values by use of ":" (containment), "=" (equality), ">" (greater), "<" (less than), >=" (greater than or equal to), "<=" (less than or equal to), and "!=" (inequality) operators. Negation, conjunction, and disjunction are written using NOT, AND, and OR keywords. For example, organization_id=\"1\" AND state=ACTIVE AND description:"test". Filtering cannot be performed on repeated fields like `task_config`. |
| `orderBy` | query | string | no | The results would be returned in order you specified here. Supported sort keys are: Descending sort order by "last_modified_time", "created_time", "snapshot_number". Ascending sort order by the integration name. |
| `pageSize` | query | integer (int32) | no | The page size for the resquest. |
| `pageToken` | query | string | no | The page token for the resquest. |

### `integrations.projects.locations.products.integrations.schedule`

- Versions: v1
- `POST https://integrations.googleapis.com/v1/{+name}:schedule`
- Schedules an integration for execution by passing the trigger id and the scheduled time in the request body.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `GoogleCloudIntegrationsV1alphaScheduleIntegrationsRequest`; Response: `GoogleCloudIntegrationsV1alphaScheduleIntegrationsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The integration resource name. |

### `integrations.projects.locations.products.integrations.test`

- Versions: v1
- `POST https://integrations.googleapis.com/v1/{+name}:test`
- Execute the integration in draft state
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `GoogleCloudIntegrationsV1alphaTestIntegrationsRequest`; Response: `GoogleCloudIntegrationsV1alphaTestIntegrationsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Output only. Auto-generated primary key. |

### `integrations.projects.locations.products.integrations.versions.create`

- Versions: v1
- `POST https://integrations.googleapis.com/v1/{+parent}/versions`
- Create a integration with a draft version in the specified project.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `GoogleCloudIntegrationsV1alphaIntegrationVersion`; Response: `GoogleCloudIntegrationsV1alphaIntegrationVersion`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent resource where this version will be created. Format: projects/{project}/locations/{location}/integrations/{integration} |
| `createSampleIntegrations` | query | boolean | no | Optional. Optional. Indicates if sample workflow should be created. |
| `newIntegration` | query | boolean | no | Set this flag to true, if draft version is to be created for a brand new integration. False, if the request is for an existing integration. For backward compatibility reasons, even if this flag is set to `false` and no existing integration is found, a new draft integration will still be created. |

### `integrations.projects.locations.products.integrations.versions.delete`

- Versions: v1
- `DELETE https://integrations.googleapis.com/v1/{+name}`
- Soft-deletes the integration. Changes the status of the integration to ARCHIVED. If the integration being ARCHIVED is tagged as "HEAD", the tag is removed from this snapshot and set to the previous non-ARCHIVED snapshot. The PUBLISH_REQUESTED, DUE_FOR_DELETION tags are removed too. This RPC throws an exception if the version being deleted is DRAFT, and if the `locked_by` user is not the same as the user performing the Delete. Audit fields updated include last_modified_timestamp, last_modified_by. Any existing lock is released when Deleting a integration. Currently, there is no undelete mechanism.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleProtobufEmpty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The version to delete. Format: projects/{project}/locations/{location}/integrations/{integration}/versions/{version} |

### `integrations.projects.locations.products.integrations.versions.download`

- Versions: v1
- `GET https://integrations.googleapis.com/v1/{+name}:download`
- Downloads an integration. Retrieves the `IntegrationVersion` for a given `integration_id` and returns the response as a string.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleCloudIntegrationsV1alphaDownloadIntegrationVersionResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The version to download. Format: projects/{project}/locations/{location}/integrations/{integration}/versions/{version} |
| `fileFormat` | query | string enum | no | File format for download request. Values: `FILE_FORMAT_UNSPECIFIED`, `JSON`, `YAML`, `WORKFLOW_TEXTPROTO`. |
| `files` | query | repeated string enum | no | Optional. Integration related file to download like Integration Json, Config variable, testcase etc. Values: `INTEGRATION_FILE_UNSPECIFIED`, `INTEGRATION`, `INTEGRATION_CONFIG_VARIABLES`. |

### `integrations.projects.locations.products.integrations.versions.get`

- Versions: v1
- `GET https://integrations.googleapis.com/v1/{+name}`
- Get a integration in the specified project.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleCloudIntegrationsV1alphaIntegrationVersion`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The version to retrieve. Format: projects/{project}/locations/{location}/integrations/{integration}/versions/{version} |

### `integrations.projects.locations.products.integrations.versions.list`

- Versions: v1
- `GET https://integrations.googleapis.com/v1/{+parent}/versions`
- Returns the list of all integration versions in the specified project.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleCloudIntegrationsV1alphaListIntegrationVersionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent resource where this version will be created. Format: projects/{project}/locations/{location}/integrations/{integration} Specifically, when parent equals: 1. projects//locations//integrations/, Meaning: "List versions (with filter) for a particular integration". 2. projects//locations//integrations/- Meaning: "List versions (with filter) for a client within a particular region". |
| `fieldMask` | query | string (google-fieldmask) | no | The field mask which specifies the particular data to be returned. |
| `filter` | query | string | no | Filter on fields of IntegrationVersion. Fields can be compared with literal values by use of ":" (containment), "=" (equality), ">" (greater), "<" (less than), >=" (greater than or equal to), "<=" (less than or equal to), and "!=" (inequality) operators. Negation, conjunction, and disjunction are written using NOT, AND, and OR keywords. For example, organization_id=\"1\" AND state=ACTIVE AND description:"test". Filtering cannot be performed on repeated fields like `task_config`. |
| `orderBy` | query | string | no | The results would be returned in order you specified here. Currently supported sort keys are: Descending sort order for "last\_modified\_time", "created\_time", and "snapshot\_number". Ascending sort order for `name`. |
| `pageSize` | query | integer (int32) | no | The maximum number of versions to return. The service may return fewer than this value. If unspecified, at most 50 versions will be returned. The maximum value is 1000; values above 1000 will be coerced to 1000. |
| `pageToken` | query | string | no | A page token, received from a previous `ListIntegrationVersions` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListIntegrationVersions` must match the call that provided the page token. |

### `integrations.projects.locations.products.integrations.versions.patch`

- Versions: v1
- `PATCH https://integrations.googleapis.com/v1/{+name}`
- Update a integration with a draft version in the specified project.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `GoogleCloudIntegrationsV1alphaIntegrationVersion`; Response: `GoogleCloudIntegrationsV1alphaIntegrationVersion`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Output only. Auto-generated primary key. |
| `updateMask` | query | string (google-fieldmask) | no | Field mask specifying the fields in the above integration that have been modified and need to be updated. |

### `integrations.projects.locations.products.integrations.versions.publish`

- Versions: v1
- `POST https://integrations.googleapis.com/v1/{+name}:publish`
- This RPC throws an exception if the integration is in ARCHIVED or ACTIVE state. This RPC throws an exception if the version being published is DRAFT, and if the `locked_by` user is not the same as the user performing the Publish. Audit fields updated include last_published_timestamp, last_published_by, last_modified_timestamp, last_modified_by. Any existing lock is on this integration is released.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `GoogleCloudIntegrationsV1alphaPublishIntegrationVersionRequest`; Response: `GoogleCloudIntegrationsV1alphaPublishIntegrationVersionResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The version to publish. Format: projects/{project}/locations/{location}/integrations/{integration}/versions/{version} |

### `integrations.projects.locations.products.integrations.versions.takeoverEditLock`

- Versions: v1
- `POST https://integrations.googleapis.com/v1/{+integrationVersion}:takeoverEditLock`
- Clears the `locked_by` and `locked_at_timestamp`in the DRAFT version of this integration. It then performs the same action as the CreateDraftIntegrationVersion (i.e., copies the DRAFT version of the integration as a SNAPSHOT and then creates a new DRAFT version with the `locked_by` set to the `user_taking_over` and the `locked_at_timestamp` set to the current timestamp). Both the `locked_by` and `user_taking_over` are notified via email about the takeover. This RPC throws an exception if the integration is not in DRAFT status or if the `locked_by` and `locked_at_timestamp` fields are not set.The TakeoverEdit lock is treated the same as an edit of the integration, and hence shares ACLs with edit. Audit fields updated include last_modified_timestamp, last_modified_by.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `GoogleCloudIntegrationsV1alphaTakeoverEditLockRequest`; Response: `GoogleCloudIntegrationsV1alphaTakeoverEditLockResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `integrationVersion` | path | string | yes | Required. The version to take over edit lock. Format: projects/{project}/locations/{location}/integrations/{integration}/versions/{version} |

### `integrations.projects.locations.products.integrations.versions.unpublish`

- Versions: v1
- `POST https://integrations.googleapis.com/v1/{+name}:unpublish`
- Sets the status of the ACTIVE integration to SNAPSHOT with a new tag "PREVIOUSLY_PUBLISHED" after validating it. The "HEAD" and "PUBLISH_REQUESTED" tags do not change. This RPC throws an exception if the version being snapshot is not ACTIVE. Audit fields added include action, action_by, action_timestamp.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `GoogleCloudIntegrationsV1alphaUnpublishIntegrationVersionRequest`; Response: `GoogleProtobufEmpty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The version to deactivate. Format: projects/{project}/locations/{location}/integrations/{integration}/versions/{version} |

### `integrations.projects.locations.products.integrations.versions.upload`

- Versions: v1
- `POST https://integrations.googleapis.com/v1/{+parent}/versions:upload`
- Uploads an integration. The content can be a previously downloaded integration. Performs the same function as CreateDraftIntegrationVersion, but accepts input in a string format, which holds the complete representation of the IntegrationVersion content.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `GoogleCloudIntegrationsV1alphaUploadIntegrationVersionRequest`; Response: `GoogleCloudIntegrationsV1alphaUploadIntegrationVersionResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The version to upload. Format: projects/{project}/locations/{location}/integrations/{integration} |

### `integrations.projects.locations.products.sfdcInstances.create`

- Versions: v1
- `POST https://integrations.googleapis.com/v1/{+parent}/sfdcInstances`
- Creates an sfdc instance record. Store the sfdc instance in Spanner. Returns the sfdc instance.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `GoogleCloudIntegrationsV1alphaSfdcInstance`; Response: `GoogleCloudIntegrationsV1alphaSfdcInstance`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. "projects/{project}/locations/{location}" format. |

### `integrations.projects.locations.products.sfdcInstances.delete`

- Versions: v1
- `DELETE https://integrations.googleapis.com/v1/{+name}`
- Deletes an sfdc instance.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleProtobufEmpty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name that is associated with the SfdcInstance. |

### `integrations.projects.locations.products.sfdcInstances.get`

- Versions: v1
- `GET https://integrations.googleapis.com/v1/{+name}`
- Gets an sfdc instance. If the instance doesn't exist, Code.NOT_FOUND exception will be thrown.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleCloudIntegrationsV1alphaSfdcInstance`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name that is associated with the SfdcInstance. |

### `integrations.projects.locations.products.sfdcInstances.list`

- Versions: v1
- `GET https://integrations.googleapis.com/v1/{+parent}/sfdcInstances`
- Lists all sfdc instances that match the filter. Restrict to sfdc instances belonging to the current client only.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleCloudIntegrationsV1alphaListSfdcInstancesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The client, which owns this collection of SfdcInstances. |
| `filter` | query | string | no | Filtering as supported in https://developers.google.com/authorized-buyers/apis/guides/list-filters. |
| `pageSize` | query | integer (int32) | no | The size of entries in the response. If unspecified, defaults to 100. |
| `pageToken` | query | string | no | The token returned in the previous response. |
| `readMask` | query | string (google-fieldmask) | no | The mask which specifies fields that need to be returned in the SfdcInstance's response. |

### `integrations.projects.locations.products.sfdcInstances.patch`

- Versions: v1
- `PATCH https://integrations.googleapis.com/v1/{+name}`
- Updates an sfdc instance. Updates the sfdc instance in spanner. Returns the sfdc instance.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `GoogleCloudIntegrationsV1alphaSfdcInstance`; Response: `GoogleCloudIntegrationsV1alphaSfdcInstance`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Resource name of the SFDC instance projects/{project}/locations/{location}/sfdcInstances/{sfdcInstance}. |
| `updateMask` | query | string (google-fieldmask) | no | Field mask specifying the fields in the above SfdcInstance that have been modified and need to be updated. |

### `integrations.projects.locations.products.sfdcInstances.sfdcChannels.create`

- Versions: v1
- `POST https://integrations.googleapis.com/v1/{+parent}/sfdcChannels`
- Creates an sfdc channel record. Store the sfdc channel in Spanner. Returns the sfdc channel.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `GoogleCloudIntegrationsV1alphaSfdcChannel`; Response: `GoogleCloudIntegrationsV1alphaSfdcChannel`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. "projects/{project}/locations/{location}" format. |

### `integrations.projects.locations.products.sfdcInstances.sfdcChannels.delete`

- Versions: v1
- `DELETE https://integrations.googleapis.com/v1/{+name}`
- Deletes an sfdc channel.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleProtobufEmpty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name that is associated with the SfdcChannel. |

### `integrations.projects.locations.products.sfdcInstances.sfdcChannels.get`

- Versions: v1
- `GET https://integrations.googleapis.com/v1/{+name}`
- Gets an sfdc channel. If the channel doesn't exist, Code.NOT_FOUND exception will be thrown.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleCloudIntegrationsV1alphaSfdcChannel`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name that is associated with the SfdcChannel. |

### `integrations.projects.locations.products.sfdcInstances.sfdcChannels.list`

- Versions: v1
- `GET https://integrations.googleapis.com/v1/{+parent}/sfdcChannels`
- Lists all sfdc channels that match the filter. Restrict to sfdc channels belonging to the current client only.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleCloudIntegrationsV1alphaListSfdcChannelsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The client, which owns this collection of SfdcChannels. |
| `filter` | query | string | no | Filtering as supported in https://developers.google.com/authorized-buyers/apis/guides/list-filters. |
| `pageSize` | query | integer (int32) | no | The size of entries in the response. If unspecified, defaults to 100. |
| `pageToken` | query | string | no | The token returned in the previous response. |
| `readMask` | query | string (google-fieldmask) | no | The mask which specifies fields that need to be returned in the SfdcChannel's response. |

### `integrations.projects.locations.products.sfdcInstances.sfdcChannels.patch`

- Versions: v1
- `PATCH https://integrations.googleapis.com/v1/{+name}`
- Updates an sfdc channel. Updates the sfdc channel in spanner. Returns the sfdc channel.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `GoogleCloudIntegrationsV1alphaSfdcChannel`; Response: `GoogleCloudIntegrationsV1alphaSfdcChannel`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Resource name of the SFDC channel projects/{project}/locations/{location}/sfdcInstances/{sfdc_instance}/sfdcChannels/{sfdc_channel}. |
| `updateMask` | query | string (google-fieldmask) | no | Field mask specifying the fields in the above SfdcChannel that have been modified and need to be updated. |

### `integrations.projects.locations.sfdcInstances.create`

- Versions: v1
- `POST https://integrations.googleapis.com/v1/{+parent}/sfdcInstances`
- Creates an sfdc instance record. Store the sfdc instance in Spanner. Returns the sfdc instance.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `GoogleCloudIntegrationsV1alphaSfdcInstance`; Response: `GoogleCloudIntegrationsV1alphaSfdcInstance`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. "projects/{project}/locations/{location}" format. |

### `integrations.projects.locations.sfdcInstances.delete`

- Versions: v1
- `DELETE https://integrations.googleapis.com/v1/{+name}`
- Deletes an sfdc instance.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleProtobufEmpty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name that is associated with the SfdcInstance. |

### `integrations.projects.locations.sfdcInstances.get`

- Versions: v1
- `GET https://integrations.googleapis.com/v1/{+name}`
- Gets an sfdc instance. If the instance doesn't exist, Code.NOT_FOUND exception will be thrown.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleCloudIntegrationsV1alphaSfdcInstance`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name that is associated with the SfdcInstance. |

### `integrations.projects.locations.sfdcInstances.list`

- Versions: v1
- `GET https://integrations.googleapis.com/v1/{+parent}/sfdcInstances`
- Lists all sfdc instances that match the filter. Restrict to sfdc instances belonging to the current client only.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleCloudIntegrationsV1alphaListSfdcInstancesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The client, which owns this collection of SfdcInstances. |
| `filter` | query | string | no | Filtering as supported in https://developers.google.com/authorized-buyers/apis/guides/list-filters. |
| `pageSize` | query | integer (int32) | no | The size of entries in the response. If unspecified, defaults to 100. |
| `pageToken` | query | string | no | The token returned in the previous response. |
| `readMask` | query | string (google-fieldmask) | no | The mask which specifies fields that need to be returned in the SfdcInstance's response. |

### `integrations.projects.locations.sfdcInstances.patch`

- Versions: v1
- `PATCH https://integrations.googleapis.com/v1/{+name}`
- Updates an sfdc instance. Updates the sfdc instance in spanner. Returns the sfdc instance.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `GoogleCloudIntegrationsV1alphaSfdcInstance`; Response: `GoogleCloudIntegrationsV1alphaSfdcInstance`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Resource name of the SFDC instance projects/{project}/locations/{location}/sfdcInstances/{sfdcInstance}. |
| `updateMask` | query | string (google-fieldmask) | no | Field mask specifying the fields in the above SfdcInstance that have been modified and need to be updated. |

### `integrations.projects.locations.sfdcInstances.sfdcChannels.create`

- Versions: v1
- `POST https://integrations.googleapis.com/v1/{+parent}/sfdcChannels`
- Creates an sfdc channel record. Store the sfdc channel in Spanner. Returns the sfdc channel.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `GoogleCloudIntegrationsV1alphaSfdcChannel`; Response: `GoogleCloudIntegrationsV1alphaSfdcChannel`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. "projects/{project}/locations/{location}" format. |

### `integrations.projects.locations.sfdcInstances.sfdcChannels.delete`

- Versions: v1
- `DELETE https://integrations.googleapis.com/v1/{+name}`
- Deletes an sfdc channel.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleProtobufEmpty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name that is associated with the SfdcChannel. |

### `integrations.projects.locations.sfdcInstances.sfdcChannels.get`

- Versions: v1
- `GET https://integrations.googleapis.com/v1/{+name}`
- Gets an sfdc channel. If the channel doesn't exist, Code.NOT_FOUND exception will be thrown.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleCloudIntegrationsV1alphaSfdcChannel`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name that is associated with the SfdcChannel. |

### `integrations.projects.locations.sfdcInstances.sfdcChannels.list`

- Versions: v1
- `GET https://integrations.googleapis.com/v1/{+parent}/sfdcChannels`
- Lists all sfdc channels that match the filter. Restrict to sfdc channels belonging to the current client only.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleCloudIntegrationsV1alphaListSfdcChannelsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The client, which owns this collection of SfdcChannels. |
| `filter` | query | string | no | Filtering as supported in https://developers.google.com/authorized-buyers/apis/guides/list-filters. |
| `pageSize` | query | integer (int32) | no | The size of entries in the response. If unspecified, defaults to 100. |
| `pageToken` | query | string | no | The token returned in the previous response. |
| `readMask` | query | string (google-fieldmask) | no | The mask which specifies fields that need to be returned in the SfdcChannel's response. |

### Example request skeleton

Generated from the Discovery entry of `integrations.callback.generateToken` (not in the official docs); replace the `{...}` path variables (URL-encode query values):

```bash
curl -X GET \
  -H "Authorization: Bearer $(gcloud auth print-access-token)" \
  "https://integrations.googleapis.com/v1/callback:generateToken"
```

## Notes

- Generated from the Discovery document(s) v2, v1 of `integrations` (retrieved 2026-11-14). Resources on this page: callback, connectorPlatformRegions, projects.
- The Required column is `yes` for path variables and required parameters, and `conditional` when the description says "Required if ..." (mutually exclusive alternatives), when a `parent.child` parameter is required only inside an optional parent message or one branch of a oneof. Path variables are `yes` unless a note below names an alternative route without them.
- Message schemas (the request and response types named above) are listed under `references/rest-schemas/integrations/`; they are the `schemas` section of the Discovery documents in Source.
- Corrected from the Discovery document: the description of `name` in `integrations.projects.locations.generateOpenApiSpec` gives the resource name format `projects/{project}/location/{location}`, but the path pattern of `name` is `^projects/[^/]+/locations/[^/]+$`; a value must match the pattern to reach the route.
- Corrected from the Discovery document: the description of `name` in `integrations.projects.locations.integrations.executions.cancel` gives the resource name format `projects/{gcp_project_id}/locations/{location}/products/{product}/integrations/{integration_id}/executions/{execution_id}`, but the path pattern of `name` is `^projects/[^/]+/locations/[^/]+/integrations/[^/]+/executions/[^/]+$`; a value must match the pattern to reach the route.
- Corrected from the Discovery document: the description of `name` in `integrations.projects.locations.integrations.executions.download` gives the resource name format `projects/{gcp_project_id}/locations/{location}/products/{product}/integrations/{integration_id}/executions/{execution_id}`, but the path pattern of `name` is `^projects/[^/]+/locations/[^/]+/integrations/[^/]+/executions/[^/]+$`; a value must match the pattern to reach the route.
- Corrected from the Discovery document: the description of `name` in `integrations.projects.locations.integrations.executions.get` gives the resource name format `projects/{gcp_project_id}/locations/{location}/products/{product}/integrations/{integration_id}/executions/{execution_id}`, but the path pattern of `name` is `^projects/[^/]+/locations/[^/]+/integrations/[^/]+/executions/[^/]+$`; a value must match the pattern to reach the route.
- Corrected from the Discovery document: the description of `parent` in `integrations.projects.locations.integrations.list` gives the resource name format `projects/{project}`, but the path pattern of `parent` is `^projects/[^/]+/locations/[^/]+$`; a value must match the pattern to reach the route.
- Corrected from the Discovery document: the description of `parent` in `integrations.projects.locations.integrations.search` gives the resource name format `projects/*/locations/*/resources/integrations`, but the path pattern of `parent` is `^projects/[^/]+/locations/[^/]+$`; a value must match the pattern to reach the route.
- Corrected from the Discovery document: the description of `name` in `integrations.projects.locations.products.certificates.get` gives the resource name format `projects/{project}/locations/{location}/certificates/{certificate}`, but the path pattern of `name` is `^projects/[^/]+/locations/[^/]+/products/[^/]+/certificates/[^/]+$`; a value must match the pattern to reach the route.
- Corrected from the Discovery document: the description of `parent` in `integrations.projects.locations.products.integrations.list` gives the resource name format `projects/{project}`, but the path pattern of `parent` is `^projects/[^/]+/locations/[^/]+/products/[^/]+$`; a value must match the pattern to reach the route.
- Corrected from the Discovery document: the description of `parent` in `integrations.projects.locations.products.integrations.versions.create` gives the resource name format `projects/{project}/locations/{location}/integrations/{integration}`, but the path pattern of `parent` is `^projects/[^/]+/locations/[^/]+/products/[^/]+/integrations/[^/]+$`; a value must match the pattern to reach the route.
- Corrected from the Discovery document: the description of `name` in `integrations.projects.locations.products.integrations.versions.delete` gives the resource name format `projects/{project}/locations/{location}/integrations/{integration}/versions/{version}`, but the path pattern of `name` is `^projects/[^/]+/locations/[^/]+/products/[^/]+/integrations/[^/]+/versions/[^/]+$`; a value must match the pattern to reach the route.
- Corrected from the Discovery document: the description of `name` in `integrations.projects.locations.products.integrations.versions.download` gives the resource name format `projects/{project}/locations/{location}/integrations/{integration}/versions/{version}`, but the path pattern of `name` is `^projects/[^/]+/locations/[^/]+/products/[^/]+/integrations/[^/]+/versions/[^/]+$`; a value must match the pattern to reach the route.
- Corrected from the Discovery document: the description of `name` in `integrations.projects.locations.products.integrations.versions.get` gives the resource name format `projects/{project}/locations/{location}/integrations/{integration}/versions/{version}`, but the path pattern of `name` is `^projects/[^/]+/locations/[^/]+/products/[^/]+/integrations/[^/]+/versions/[^/]+$`; a value must match the pattern to reach the route.
- Corrected from the Discovery document: the description of `parent` in `integrations.projects.locations.products.integrations.versions.list` gives the resource name format `projects/{project}/locations/{location}/integrations/{integration}`, but the path pattern of `parent` is `^projects/[^/]+/locations/[^/]+/products/[^/]+/integrations/[^/]+$`; a value must match the pattern to reach the route.
- Corrected from the Discovery document: the description of `name` in `integrations.projects.locations.products.integrations.versions.publish` gives the resource name format `projects/{project}/locations/{location}/integrations/{integration}/versions/{version}`, but the path pattern of `name` is `^projects/[^/]+/locations/[^/]+/products/[^/]+/integrations/[^/]+/versions/[^/]+$`; a value must match the pattern to reach the route.
- Corrected from the Discovery document: the description of `integrationVersion` in `integrations.projects.locations.products.integrations.versions.takeoverEditLock` gives the resource name format `projects/{project}/locations/{location}/integrations/{integration}/versions/{version}`, but the path pattern of `integrationVersion` is `^projects/[^/]+/locations/[^/]+/products/[^/]+/integrations/[^/]+/versions/[^/]+$`; a value must match the pattern to reach the route.
- Corrected from the Discovery document: the description of `name` in `integrations.projects.locations.products.integrations.versions.unpublish` gives the resource name format `projects/{project}/locations/{location}/integrations/{integration}/versions/{version}`, but the path pattern of `name` is `^projects/[^/]+/locations/[^/]+/products/[^/]+/integrations/[^/]+/versions/[^/]+$`; a value must match the pattern to reach the route.
- Corrected from the Discovery document: the description of `parent` in `integrations.projects.locations.products.integrations.versions.upload` gives the resource name format `projects/{project}/locations/{location}/integrations/{integration}`, but the path pattern of `parent` is `^projects/[^/]+/locations/[^/]+/products/[^/]+/integrations/[^/]+$`; a value must match the pattern to reach the route.
- Descriptions are verbatim from Discovery, which drops angle-bracket placeholders of the source comments: a format such as `projects//locations/global` stands for `projects/{project}/locations/global` (likewise `"@.iam.gserviceaccount.com"` lost the account ID before `@`, and a name format ending in a collection such as `projects/*/locations/*/registrations/` lost its last ID), and an expression such as `... && in labels` lost its left operand (for example `'label_value' in labels`). Check the method or field in the product's REST reference before relying on such a format.
- Source: https://integrations.googleapis.com/$discovery/rest?version=v2, https://integrations.googleapis.com/$discovery/rest?version=v1 (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
