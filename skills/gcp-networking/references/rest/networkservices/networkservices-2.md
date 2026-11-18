---
source: https://networkservices.googleapis.com/$discovery/rest?version=v1
---

# Network Services API REST API (networkservices) (part 2/2)

## Signature / Usage

Base URL: `https://networkservices.googleapis.com`. Methods are listed by `id`; the `Versions` line shows which API versions define the method (preferred: v1).

### `networkservices.projects.locations.tcpRoutes.patch`

- Versions: v1, v1beta1
- `PATCH https://networkservices.googleapis.com/v1/{+name}`
- Updates the parameters of a single TcpRoute.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `TcpRoute`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Identifier. Name of the TcpRoute resource. It matches pattern `projects/*/locations/*/tcpRoutes/tcp_route_name>`. |
| `updateMask` | query | string (google-fieldmask) | no | Optional. Field mask is used to specify the fields to be overwritten in the TcpRoute resource by the update. The fields specified in the update_mask are relative to the resource, not the full request. A field will be overwritten if it is in the mask. If the user does not provide a mask then all fields will be overwritten. |

### `networkservices.projects.locations.telemetryPolicies.create`

- Versions: v1beta1
- `POST https://networkservices.googleapis.com/v1beta1/{+parent}/telemetryPolicies`
- Creates a new TelemetryPolicy in a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `TelemetryPolicy`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent resource where this policy will be created. Must be in the format `projects/{project}/locations/{location}`. |
| `telemetryPolicyId` | query | string | yes | Required. The ID to use for the telemetry policy, which will become the final component of the telemetry policy's resource name. This value must be 4-63 characters long, and match the regular expression `[a-z]([-a-z0-9]{2,61}[a-z0-9])`. |

### `networkservices.projects.locations.telemetryPolicies.delete`

- Versions: v1beta1
- `DELETE https://networkservices.googleapis.com/v1beta1/{+name}`
- Deletes a single TelemetryPolicy.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. A name of the TelemetryPolicy to delete. Must be in the format `projects/{project}/locations/{location}/telemetryPolicies/{telemetry_policy}`. |
| `etag` | query | string | no | Optional. The etag of the TelemetryPolicy. If this is provided, it must match the server's etag. |

### `networkservices.projects.locations.telemetryPolicies.get`

- Versions: v1beta1
- `GET https://networkservices.googleapis.com/v1beta1/{+name}`
- Gets details of a single TelemetryPolicy.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `TelemetryPolicy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. A name of the TelemetryPolicy to get. Must be in the format `projects/{project}/locations/{location}/telemetryPolicies/{telemetry_policy}`. |

### `networkservices.projects.locations.telemetryPolicies.list`

- Versions: v1beta1
- `GET https://networkservices.googleapis.com/v1beta1/{+parent}/telemetryPolicies`
- Lists TelemetryPolicies in a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListTelemetryPoliciesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The project and location from which the TelemetryPolicies should be listed, specified in the format `projects/{project}/locations/{location}`. |
| `pageSize` | query | integer (int32) | no | Optional. The maximum number of policies to return. The service may return fewer than this value. If unspecified, at most 50 policies will be returned. The maximum value is 1000; values above 1000 will be coerced to 1000. |
| `pageToken` | query | string | no | Optional. A page token, received from a previous `ListTelemetryPolicies` call. Provide this to retrieve the subsequent page. |

### `networkservices.projects.locations.telemetryPolicies.patch`

- Versions: v1beta1
- `PATCH https://networkservices.googleapis.com/v1beta1/{+name}`
- Updates the parameters of a single TelemetryPolicy.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `TelemetryPolicy`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Identifier. Represents the resource name of the policy. Format: `projects/{project}/locations/{location}/telemetryPolicies/{telemetry_policy}` |
| `allowMissing` | query | boolean | no | Optional. If set to true, and the telemetry policy is not found, a new telemetry policy will be created. In this situation, `update_mask` is ignored. |
| `updateMask` | query | string (google-fieldmask) | no | Optional. Field mask is used to specify the fields to be overwritten in the TelemetryPolicy resource by the update. The fields specified in the update_mask are relative to the resource, not the full request. A field will be overwritten if it is in the mask. If the `update_mask` is not provided, the service will treat it as an implied field mask equivalent to all fields provided in the request message. This means that only the fields populated in the `telemetry_policy` field will be updated. The special value `*` can be used to indicate full replacement. |

### `networkservices.projects.locations.tlsRoutes.create`

- Versions: v1, v1beta1
- `POST https://networkservices.googleapis.com/v1/{+parent}/tlsRoutes`
- Creates a new TlsRoute in a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `TlsRoute`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent resource of the TlsRoute. Must be in the format `projects/*/locations/*`. |
| `tlsRouteId` | query | string | yes | Required. Short name of the TlsRoute resource to be created. |

### `networkservices.projects.locations.tlsRoutes.delete`

- Versions: v1, v1beta1
- `DELETE https://networkservices.googleapis.com/v1/{+name}`
- Deletes a single TlsRoute.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. A name of the TlsRoute to delete. Must be in the format `projects/*/locations/*/tlsRoutes/*`. |

### `networkservices.projects.locations.tlsRoutes.get`

- Versions: v1, v1beta1
- `GET https://networkservices.googleapis.com/v1/{+name}`
- Gets details of a single TlsRoute.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `TlsRoute`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. A name of the TlsRoute to get. Must be in the format `projects/*/locations/*/tlsRoutes/*`. |

### `networkservices.projects.locations.tlsRoutes.list`

- Versions: v1, v1beta1
- `GET https://networkservices.googleapis.com/v1/{+parent}/tlsRoutes`
- Lists TlsRoute in a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListTlsRoutesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The project and location from which the TlsRoutes should be listed, specified in the format `projects/*/locations/*`. |
| `pageSize` | query | integer (int32) | no | Maximum number of TlsRoutes to return per call. |
| `pageToken` | query | string | no | The value returned by the last `ListTlsRoutesResponse` Indicates that this is a continuation of a prior `ListTlsRoutes` call, and that the system should return the next page of data. |
| `returnPartialSuccess` | query | boolean | no | Optional. If true, allow partial responses for multi-regional Aggregated List requests. Otherwise if one of the locations is down or unreachable, the Aggregated List request will fail. |

### `networkservices.projects.locations.tlsRoutes.patch`

- Versions: v1, v1beta1
- `PATCH https://networkservices.googleapis.com/v1/{+name}`
- Updates the parameters of a single TlsRoute.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `TlsRoute`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Identifier. Name of the TlsRoute resource. It matches pattern `projects/*/locations/*/tlsRoutes/tls_route_name>`. |
| `updateMask` | query | string (google-fieldmask) | no | Optional. Field mask is used to specify the fields to be overwritten in the TlsRoute resource by the update. The fields specified in the update_mask are relative to the resource, not the full request. A field will be overwritten if it is in the mask. If the user does not provide a mask then all fields will be overwritten. |

### `networkservices.projects.locations.wasmPlugins.create`

- Versions: v1, v1beta1
- `POST https://networkservices.googleapis.com/v1/{+parent}/wasmPlugins`
- Creates a new `WasmPlugin` resource in a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `WasmPlugin`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent resource of the `WasmPlugin` resource. Must be in the format `projects/{project}/locations/global`. |
| `wasmPluginId` | query | string | yes | Required. User-provided ID of the `WasmPlugin` resource to be created. |

### `networkservices.projects.locations.wasmPlugins.delete`

- Versions: v1, v1beta1
- `DELETE https://networkservices.googleapis.com/v1/{+name}`
- Deletes the specified `WasmPlugin` resource.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. A name of the `WasmPlugin` resource to delete. Must be in the format `projects/{project}/locations/global/wasmPlugins/{wasm_plugin}`. |

### `networkservices.projects.locations.wasmPlugins.get`

- Versions: v1, v1beta1
- `GET https://networkservices.googleapis.com/v1/{+name}`
- Gets details of the specified `WasmPlugin` resource.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `WasmPlugin`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. A name of the `WasmPlugin` resource to get. Must be in the format `projects/{project}/locations/global/wasmPlugins/{wasm_plugin}`. |
| `view` | query | string enum | no | Determines how much data must be returned in the response. See AIP-157 (https://google.aip.dev/157). Values: `WASM_PLUGIN_VIEW_UNSPECIFIED`, `WASM_PLUGIN_VIEW_BASIC`, `WASM_PLUGIN_VIEW_FULL`. |

### `networkservices.projects.locations.wasmPlugins.list`

- Versions: v1, v1beta1
- `GET https://networkservices.googleapis.com/v1/{+parent}/wasmPlugins`
- Lists `WasmPlugin` resources in a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListWasmPluginsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The project and location from which the `WasmPlugin` resources are listed, specified in the following format: `projects/{project}/locations/global`. |
| `pageSize` | query | integer (int32) | no | Maximum number of `WasmPlugin` resources to return per call. If not specified, at most 50 `WasmPlugin` resources are returned. The maximum value is 1000; values above 1000 are coerced to 1000. |
| `pageToken` | query | string | no | The value returned by the last `ListWasmPluginsResponse` call. Indicates that this is a continuation of a prior `ListWasmPlugins` call, and that the next page of data is to be returned. |

### `networkservices.projects.locations.wasmPlugins.patch`

- Versions: v1, v1beta1
- `PATCH https://networkservices.googleapis.com/v1/{+name}`
- Updates the parameters of the specified `WasmPlugin` resource.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `WasmPlugin`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Identifier. Name of the `WasmPlugin` resource in the following format: `projects/{project}/locations/{location}/wasmPlugins/{wasm_plugin}`. |
| `updateMask` | query | string (google-fieldmask) | no | Optional. Used to specify the fields to be overwritten in the `WasmPlugin` resource by the update. The fields specified in the `update_mask` field are relative to the resource, not the full request. An omitted `update_mask` field is treated as an implied `update_mask` field equivalent to all fields that are populated (that have a non-empty value). The `update_mask` field supports a special value `*`, which means that each field in the given `WasmPlugin` resource (including the empty ones) replaces the current value. |

### `networkservices.projects.locations.wasmPlugins.versions.create`

- Versions: v1, v1beta1
- `POST https://networkservices.googleapis.com/v1/{+parent}/versions`
- Creates a new `WasmPluginVersion` resource in a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `WasmPluginVersion`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent resource of the `WasmPluginVersion` resource. Must be in the format `projects/{project}/locations/global/wasmPlugins/{wasm_plugin}`. |
| `wasmPluginVersionId` | query | string | yes | Required. User-provided ID of the `WasmPluginVersion` resource to be created. |

### `networkservices.projects.locations.wasmPlugins.versions.delete`

- Versions: v1, v1beta1
- `DELETE https://networkservices.googleapis.com/v1/{+name}`
- Deletes the specified `WasmPluginVersion` resource.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. A name of the `WasmPluginVersion` resource to delete. Must be in the format `projects/{project}/locations/global/wasmPlugins/{wasm_plugin}/versions/{wasm_plugin_version}`. |

### `networkservices.projects.locations.wasmPlugins.versions.get`

- Versions: v1, v1beta1
- `GET https://networkservices.googleapis.com/v1/{+name}`
- Gets details of the specified `WasmPluginVersion` resource.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `WasmPluginVersion`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. A name of the `WasmPluginVersion` resource to get. Must be in the format `projects/{project}/locations/global/wasmPlugins/{wasm_plugin}/versions/{wasm_plugin_version}`. |

### `networkservices.projects.locations.wasmPlugins.versions.list`

- Versions: v1, v1beta1
- `GET https://networkservices.googleapis.com/v1/{+parent}/versions`
- Lists `WasmPluginVersion` resources in a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListWasmPluginVersionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The `WasmPlugin` resource whose `WasmPluginVersion`s are listed, specified in the following format: `projects/{project}/locations/global/wasmPlugins/{wasm_plugin}`. |
| `pageSize` | query | integer (int32) | no | Maximum number of `WasmPluginVersion` resources to return per call. If not specified, at most 50 `WasmPluginVersion` resources are returned. The maximum value is 1000; values above 1000 are coerced to 1000. |
| `pageToken` | query | string | no | The value returned by the last `ListWasmPluginVersionsResponse` call. Indicates that this is a continuation of a prior `ListWasmPluginVersions` call, and that the next page of data is to be returned. |

### Example request skeleton

Generated from the Discovery entry of `networkservices.projects.locations.telemetryPolicies.get` (not in the official docs); replace the `{...}` path variables (URL-encode query values):

```bash
curl -X GET \
  -H "Authorization: Bearer $(gcloud auth print-access-token)" \
  "https://networkservices.googleapis.com/v1beta1/{+name}"
```

## Notes

- Generated from the Discovery document(s) v1, v1beta1 of `networkservices` (retrieved 2026-11-14). Resources on this page: projects.
- The Required column is `yes` for path variables and required parameters, and `conditional` when the description says "Required if ..." (mutually exclusive alternatives), when a `parent.child` parameter is required only inside an optional parent message or one branch of a oneof. Path variables are `yes` unless a note below names an alternative route without them.
- Message schemas (the request and response types named above) are listed under `references/rest-schemas/networkservices/`; they are the `schemas` section of the Discovery documents in Source.
- Regional endpoints: the Discovery document (`networkservices` v1, revision 20261027) also lists 12 endpoints of the form `https://networkservices.LOCATION.rep.googleapis.com/` (Regional Endpoint), for LOCATION in `us-central1`, `us-central2`, `us-east1`, `us-east4`, `us-east5`, `us-east7`, `us-south1`, `us-west1`, `us-west2`, `us-west3`, `us-west4`, `us-west8`. The method URLs above use the global host `https://networkservices.googleapis.com/`; to send a request through one of these endpoints, replace the host with the endpoint for the resource's location (for example `https://networkservices.us-central1.rep.googleapis.com/`) and keep the path.
- Source: https://networkservices.googleapis.com/$discovery/rest?version=v1, https://networkservices.googleapis.com/$discovery/rest?version=v1beta1 (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
