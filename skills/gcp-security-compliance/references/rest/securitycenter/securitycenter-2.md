---
source: https://securitycenter.googleapis.com/$discovery/rest?version=v1
---

# Security Command Center API REST API (securitycenter) (part 2/2)

## Signature / Usage

Base URL: `https://securitycenter.googleapis.com`. Methods are listed by `id`; the `Versions` line shows which API versions define the method (preferred: v1).

### `securitycenter.organizations.securityHealthAnalyticsSettings.customModules.listDescendant`

- Versions: v1
- `GET https://securitycenter.googleapis.com/v1/{+parent}/customModules:listDescendant`
-
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/securitycenter`
- Request: —; Response: `ListDescendantSecurityHealthAnalyticsCustomModulesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | — |
| `pageSize` | query | integer (int32) | no | — |
| `pageToken` | query | string | no | — |

### `securitycenter.organizations.securityHealthAnalyticsSettings.customModules.patch`

- Versions: v1
- `PATCH https://securitycenter.googleapis.com/v1/{+name}`
-
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/securitycenter`
- Request: `GoogleCloudSecuritycenterV1SecurityHealthAnalyticsCustomModule`; Response: `GoogleCloudSecuritycenterV1SecurityHealthAnalyticsCustomModule`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | — |
| `updateMask` | query | string (google-fieldmask) | no | — |

### `securitycenter.organizations.securityHealthAnalyticsSettings.customModules.simulate`

- Versions: v1
- `POST https://securitycenter.googleapis.com/v1/{+parent}/customModules:simulate`
-
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/securitycenter`
- Request: `SimulateSecurityHealthAnalyticsCustomModuleRequest`; Response: `SimulateSecurityHealthAnalyticsCustomModuleResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | — |

### `securitycenter.organizations.securityHealthAnalyticsSettings.effectiveCustomModules.get`

- Versions: v1
- `GET https://securitycenter.googleapis.com/v1/{+name}`
-
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/securitycenter`
- Request: —; Response: `GoogleCloudSecuritycenterV1EffectiveSecurityHealthAnalyticsCustomModule`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | — |

### `securitycenter.organizations.securityHealthAnalyticsSettings.effectiveCustomModules.list`

- Versions: v1
- `GET https://securitycenter.googleapis.com/v1/{+parent}/effectiveCustomModules`
-
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/securitycenter`
- Request: —; Response: `ListEffectiveSecurityHealthAnalyticsCustomModulesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | — |
| `pageSize` | query | integer (int32) | no | — |
| `pageToken` | query | string | no | — |

### `securitycenter.organizations.simulations.attackExposureResults.attackPaths.list`

- Versions: v1
- `GET https://securitycenter.googleapis.com/v1/{+parent}/attackPaths`
-
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/securitycenter`
- Request: —; Response: `ListAttackPathsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | — |
| `filter` | query | string | no | — |
| `pageSize` | query | integer (int32) | no | — |
| `pageToken` | query | string | no | — |

### `securitycenter.organizations.simulations.attackExposureResults.valuedResources.list`

- Versions: v1
- `GET https://securitycenter.googleapis.com/v1/{+parent}/valuedResources`
-
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/securitycenter`
- Request: —; Response: `ListValuedResourcesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | — |
| `filter` | query | string | no | — |
| `orderBy` | query | string | no | — |
| `pageSize` | query | integer (int32) | no | — |
| `pageToken` | query | string | no | — |

### `securitycenter.organizations.simulations.attackPaths.list`

- Versions: v1
- `GET https://securitycenter.googleapis.com/v1/{+parent}/attackPaths`
-
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/securitycenter`
- Request: —; Response: `ListAttackPathsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | — |
| `filter` | query | string | no | — |
| `pageSize` | query | integer (int32) | no | — |
| `pageToken` | query | string | no | — |

### `securitycenter.organizations.simulations.get`

- Versions: v1
- `GET https://securitycenter.googleapis.com/v1/{+name}`
-
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/securitycenter`
- Request: —; Response: `Simulation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | — |

### `securitycenter.organizations.simulations.valuedResources.attackPaths.list`

- Versions: v1
- `GET https://securitycenter.googleapis.com/v1/{+parent}/attackPaths`
-
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/securitycenter`
- Request: —; Response: `ListAttackPathsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | — |
| `filter` | query | string | no | — |
| `pageSize` | query | integer (int32) | no | — |
| `pageToken` | query | string | no | — |

### `securitycenter.organizations.simulations.valuedResources.get`

- Versions: v1
- `GET https://securitycenter.googleapis.com/v1/{+name}`
-
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/securitycenter`
- Request: —; Response: `ValuedResource`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | — |

### `securitycenter.organizations.simulations.valuedResources.list`

- Versions: v1
- `GET https://securitycenter.googleapis.com/v1/{+parent}/valuedResources`
-
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/securitycenter`
- Request: —; Response: `ListValuedResourcesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | — |
| `filter` | query | string | no | — |
| `orderBy` | query | string | no | — |
| `pageSize` | query | integer (int32) | no | — |
| `pageToken` | query | string | no | — |

### `securitycenter.organizations.sources.create`

- Versions: v1, v1beta1
- `POST https://securitycenter.googleapis.com/v1/{+parent}/sources`
-
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/securitycenter`
- Request: `Source`; Response: `Source`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | — |

### `securitycenter.organizations.sources.findings.create`

- Versions: v1, v1beta1
- `POST https://securitycenter.googleapis.com/v1/{+parent}/findings`
-
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/securitycenter`
- Request: `Finding`; Response: `Finding`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | — |
| `findingId` | query | string | no | — |

### `securitycenter.organizations.sources.findings.externalSystems.patch`

- Versions: v1
- `PATCH https://securitycenter.googleapis.com/v1/{+name}`
-
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/securitycenter`
- Request: `GoogleCloudSecuritycenterV1ExternalSystem`; Response: `GoogleCloudSecuritycenterV1ExternalSystem`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | — |
| `updateMask` | query | string (google-fieldmask) | no | — |

### `securitycenter.organizations.sources.findings.group`

- Versions: v1, v1beta1
- `POST https://securitycenter.googleapis.com/v1/{+parent}/findings:group`
-
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/securitycenter`
- Request: `GroupFindingsRequest`; Response: `GroupFindingsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | — |

### `securitycenter.organizations.sources.findings.list`

- Versions: v1, v1beta1
- `GET https://securitycenter.googleapis.com/v1/{+parent}/findings`
-
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/securitycenter`
- Request: —; Response: `ListFindingsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | — |
| `compareDuration` | query | string (google-duration) | no | — |
| `fieldMask` | query | string (google-fieldmask) | no | — |
| `filter` | query | string | no | — |
| `orderBy` | query | string | no | — |
| `pageSize` | query | integer (int32) | no | — |
| `pageToken` | query | string | no | — |
| `readTime` | query | string (google-datetime) | no | — |

### `securitycenter.organizations.sources.findings.patch`

- Versions: v1, v1beta1
- `PATCH https://securitycenter.googleapis.com/v1/{+name}`
-
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/securitycenter`
- Request: `Finding`; Response: `Finding`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | — |
| `updateMask` | query | string (google-fieldmask) | no | — |

### `securitycenter.organizations.sources.findings.setMute`

- Versions: v1
- `POST https://securitycenter.googleapis.com/v1/{+name}:setMute`
-
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/securitycenter`
- Request: `SetMuteRequest`; Response: `Finding`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | — |

### `securitycenter.organizations.sources.findings.setState`

- Versions: v1, v1beta1
- `POST https://securitycenter.googleapis.com/v1/{+name}:setState`
-
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/securitycenter`
- Request: `SetFindingStateRequest`; Response: `Finding`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | — |

### `securitycenter.organizations.sources.findings.updateSecurityMarks`

- Versions: v1, v1beta1
- `PATCH https://securitycenter.googleapis.com/v1/{+name}`
-
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/securitycenter`
- Request: `SecurityMarks`; Response: `SecurityMarks`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | — |
| `startTime` | query | string (google-datetime) | no | — |
| `updateMask` | query | string (google-fieldmask) | no | — |

### `securitycenter.organizations.sources.get`

- Versions: v1, v1beta1
- `GET https://securitycenter.googleapis.com/v1/{+name}`
-
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/securitycenter`
- Request: —; Response: `Source`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | — |

### `securitycenter.organizations.sources.getIamPolicy`

- Versions: v1, v1beta1
- `POST https://securitycenter.googleapis.com/v1/{+resource}:getIamPolicy`
-
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/securitycenter`
- Request: `GetIamPolicyRequest`; Response: `Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | — |

### `securitycenter.organizations.sources.list`

- Versions: v1, v1beta1
- `GET https://securitycenter.googleapis.com/v1/{+parent}/sources`
-
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/securitycenter`
- Request: —; Response: `ListSourcesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | — |
| `pageSize` | query | integer (int32) | no | — |
| `pageToken` | query | string | no | — |

### `securitycenter.organizations.sources.patch`

- Versions: v1, v1beta1
- `PATCH https://securitycenter.googleapis.com/v1/{+name}`
-
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/securitycenter`
- Request: `Source`; Response: `Source`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | — |
| `updateMask` | query | string (google-fieldmask) | no | — |

### `securitycenter.organizations.sources.setIamPolicy`

- Versions: v1, v1beta1
- `POST https://securitycenter.googleapis.com/v1/{+resource}:setIamPolicy`
-
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/securitycenter`
- Request: `SetIamPolicyRequest`; Response: `Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | — |

### `securitycenter.organizations.sources.testIamPermissions`

- Versions: v1, v1beta1
- `POST https://securitycenter.googleapis.com/v1/{+resource}:testIamPermissions`
-
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/securitycenter`
- Request: `TestIamPermissionsRequest`; Response: `TestIamPermissionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | — |

### `securitycenter.organizations.updateContainerThreatDetectionSettings`

- Versions: v1beta2
- `PATCH https://securitycenter.googleapis.com/v1beta2/{+name}`
-
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/securitycenter`
- Request: `ContainerThreatDetectionSettings`; Response: `ContainerThreatDetectionSettings`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | — |
| `updateMask` | query | string (google-fieldmask) | no | — |

### `securitycenter.organizations.updateEventThreatDetectionSettings`

- Versions: v1beta2
- `PATCH https://securitycenter.googleapis.com/v1beta2/{+name}`
-
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/securitycenter`
- Request: `EventThreatDetectionSettings`; Response: `EventThreatDetectionSettings`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | — |
| `updateMask` | query | string (google-fieldmask) | no | — |

### `securitycenter.organizations.updateOrganizationSettings`

- Versions: v1, v1beta1
- `PATCH https://securitycenter.googleapis.com/v1/{+name}`
-
- Deprecated: `deprecated: true` in the Discovery document
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/securitycenter`
- Request: `OrganizationSettings`; Response: `OrganizationSettings`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | — |
| `updateMask` | query | string (google-fieldmask) | no | — |

### `securitycenter.organizations.updateRapidVulnerabilityDetectionSettings`

- Versions: v1beta2
- `PATCH https://securitycenter.googleapis.com/v1beta2/{+name}`
-
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/securitycenter`
- Request: `RapidVulnerabilityDetectionSettings`; Response: `RapidVulnerabilityDetectionSettings`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | — |
| `updateMask` | query | string (google-fieldmask) | no | — |

### `securitycenter.organizations.updateSecurityHealthAnalyticsSettings`

- Versions: v1beta2
- `PATCH https://securitycenter.googleapis.com/v1beta2/{+name}`
-
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/securitycenter`
- Request: `SecurityHealthAnalyticsSettings`; Response: `SecurityHealthAnalyticsSettings`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | — |
| `updateMask` | query | string (google-fieldmask) | no | — |

### `securitycenter.organizations.updateVirtualMachineThreatDetectionSettings`

- Versions: v1beta2
- `PATCH https://securitycenter.googleapis.com/v1beta2/{+name}`
-
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/securitycenter`
- Request: `VirtualMachineThreatDetectionSettings`; Response: `VirtualMachineThreatDetectionSettings`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | — |
| `updateMask` | query | string (google-fieldmask) | no | — |

### `securitycenter.organizations.updateWebSecurityScannerSettings`

- Versions: v1beta2
- `PATCH https://securitycenter.googleapis.com/v1beta2/{+name}`
-
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/securitycenter`
- Request: `WebSecurityScannerSettings`; Response: `WebSecurityScannerSettings`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | — |
| `updateMask` | query | string (google-fieldmask) | no | — |

### `securitycenter.organizations.valuedResources.list`

- Versions: v1
- `GET https://securitycenter.googleapis.com/v1/{+parent}/valuedResources`
-
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/securitycenter`
- Request: —; Response: `ListValuedResourcesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | — |
| `filter` | query | string | no | — |
| `orderBy` | query | string | no | — |
| `pageSize` | query | integer (int32) | no | — |
| `pageToken` | query | string | no | — |

### `securitycenter.organizations.virtualMachineThreatDetectionSettings.calculate`

- Versions: v1beta2
- `GET https://securitycenter.googleapis.com/v1beta2/{+name}:calculate`
-
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/securitycenter`
- Request: —; Response: `VirtualMachineThreatDetectionSettings`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | — |
| `showEligibleModulesOnly` | query | boolean | no | — |

### `securitycenter.organizations.webSecurityScannerSettings.calculate`

- Versions: v1beta2
- `GET https://securitycenter.googleapis.com/v1beta2/{+name}:calculate`
-
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/securitycenter`
- Request: —; Response: `WebSecurityScannerSettings`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | — |
| `showEligibleModulesOnly` | query | boolean | no | — |

### `securitycenter.projects.assets.group`

- Versions: v1
- `POST https://securitycenter.googleapis.com/v1/{+parent}/assets:group`
-
- Deprecated: `deprecated: true` in the Discovery document
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/securitycenter`
- Request: `GroupAssetsRequest`; Response: `GroupAssetsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | — |

### `securitycenter.projects.assets.list`

- Versions: v1
- `GET https://securitycenter.googleapis.com/v1/{+parent}/assets`
-
- Deprecated: `deprecated: true` in the Discovery document
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/securitycenter`
- Request: —; Response: `ListAssetsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | — |
| `compareDuration` | query | string (google-duration) | no | — |
| `fieldMask` | query | string (google-fieldmask) | no | — |
| `filter` | query | string | no | — |
| `orderBy` | query | string | no | — |
| `pageSize` | query | integer (int32) | no | — |
| `pageToken` | query | string | no | — |
| `readTime` | query | string (google-datetime) | no | — |

### `securitycenter.projects.assets.updateSecurityMarks`

- Versions: v1
- `PATCH https://securitycenter.googleapis.com/v1/{+name}`
-
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/securitycenter`
- Request: `SecurityMarks`; Response: `SecurityMarks`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | — |
| `startTime` | query | string (google-datetime) | no | — |
| `updateMask` | query | string (google-fieldmask) | no | — |

### `securitycenter.projects.bigQueryExports.create`

- Versions: v1
- `POST https://securitycenter.googleapis.com/v1/{+parent}/bigQueryExports`
-
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/securitycenter`
- Request: `GoogleCloudSecuritycenterV1BigQueryExport`; Response: `GoogleCloudSecuritycenterV1BigQueryExport`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | — |
| `bigQueryExportId` | query | string | no | — |

### `securitycenter.projects.bigQueryExports.delete`

- Versions: v1
- `DELETE https://securitycenter.googleapis.com/v1/{+name}`
-
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/securitycenter`
- Request: —; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | — |

### `securitycenter.projects.bigQueryExports.get`

- Versions: v1
- `GET https://securitycenter.googleapis.com/v1/{+name}`
-
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/securitycenter`
- Request: —; Response: `GoogleCloudSecuritycenterV1BigQueryExport`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | — |

### `securitycenter.projects.bigQueryExports.list`

- Versions: v1
- `GET https://securitycenter.googleapis.com/v1/{+parent}/bigQueryExports`
-
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/securitycenter`
- Request: —; Response: `ListBigQueryExportsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | — |
| `pageSize` | query | integer (int32) | no | — |
| `pageToken` | query | string | no | — |

### `securitycenter.projects.bigQueryExports.patch`

- Versions: v1
- `PATCH https://securitycenter.googleapis.com/v1/{+name}`
-
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/securitycenter`
- Request: `GoogleCloudSecuritycenterV1BigQueryExport`; Response: `GoogleCloudSecuritycenterV1BigQueryExport`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | — |
| `updateMask` | query | string (google-fieldmask) | no | — |

### `securitycenter.projects.containerThreatDetectionSettings.calculate`

- Versions: v1beta2
- `GET https://securitycenter.googleapis.com/v1beta2/{+name}:calculate`
-
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/securitycenter`
- Request: —; Response: `ContainerThreatDetectionSettings`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | — |
| `showEligibleModulesOnly` | query | boolean | no | — |

### `securitycenter.projects.eventThreatDetectionSettings.calculate`

- Versions: v1beta2
- `GET https://securitycenter.googleapis.com/v1beta2/{+name}:calculate`
-
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/securitycenter`
- Request: —; Response: `EventThreatDetectionSettings`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | — |
| `showEligibleModulesOnly` | query | boolean | no | — |

### `securitycenter.projects.eventThreatDetectionSettings.customModules.create`

- Versions: v1
- `POST https://securitycenter.googleapis.com/v1/{+parent}/customModules`
-
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/securitycenter`
- Request: `EventThreatDetectionCustomModule`; Response: `EventThreatDetectionCustomModule`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | — |

### `securitycenter.projects.eventThreatDetectionSettings.customModules.delete`

- Versions: v1
- `DELETE https://securitycenter.googleapis.com/v1/{+name}`
-
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/securitycenter`
- Request: —; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | — |

### `securitycenter.projects.eventThreatDetectionSettings.customModules.get`

- Versions: v1
- `GET https://securitycenter.googleapis.com/v1/{+name}`
-
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/securitycenter`
- Request: —; Response: `EventThreatDetectionCustomModule`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | — |

### `securitycenter.projects.eventThreatDetectionSettings.customModules.list`

- Versions: v1
- `GET https://securitycenter.googleapis.com/v1/{+parent}/customModules`
-
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/securitycenter`
- Request: —; Response: `ListEventThreatDetectionCustomModulesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | — |
| `pageSize` | query | integer (int32) | no | — |
| `pageToken` | query | string | no | — |

### `securitycenter.projects.eventThreatDetectionSettings.customModules.listDescendant`

- Versions: v1
- `GET https://securitycenter.googleapis.com/v1/{+parent}/customModules:listDescendant`
-
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/securitycenter`
- Request: —; Response: `ListDescendantEventThreatDetectionCustomModulesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | — |
| `pageSize` | query | integer (int32) | no | — |
| `pageToken` | query | string | no | — |

### `securitycenter.projects.eventThreatDetectionSettings.customModules.patch`

- Versions: v1
- `PATCH https://securitycenter.googleapis.com/v1/{+name}`
-
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/securitycenter`
- Request: `EventThreatDetectionCustomModule`; Response: `EventThreatDetectionCustomModule`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | — |
| `updateMask` | query | string (google-fieldmask) | no | — |

### `securitycenter.projects.eventThreatDetectionSettings.effectiveCustomModules.get`

- Versions: v1
- `GET https://securitycenter.googleapis.com/v1/{+name}`
-
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/securitycenter`
- Request: —; Response: `EffectiveEventThreatDetectionCustomModule`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | — |

### `securitycenter.projects.eventThreatDetectionSettings.effectiveCustomModules.list`

- Versions: v1
- `GET https://securitycenter.googleapis.com/v1/{+parent}/effectiveCustomModules`
-
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/securitycenter`
- Request: —; Response: `ListEffectiveEventThreatDetectionCustomModulesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | — |
| `pageSize` | query | integer (int32) | no | — |
| `pageToken` | query | string | no | — |

### `securitycenter.projects.eventThreatDetectionSettings.validateCustomModule`

- Versions: v1
- `POST https://securitycenter.googleapis.com/v1/{+parent}:validateCustomModule`
-
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/securitycenter`
- Request: `ValidateEventThreatDetectionCustomModuleRequest`; Response: `ValidateEventThreatDetectionCustomModuleResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | — |

### `securitycenter.projects.findings.bulkMute`

- Versions: v1
- `POST https://securitycenter.googleapis.com/v1/{+parent}/findings:bulkMute`
-
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/securitycenter`
- Request: `BulkMuteFindingsRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | — |

### `securitycenter.projects.getContainerThreatDetectionSettings`

- Versions: v1beta2
- `GET https://securitycenter.googleapis.com/v1beta2/{+name}`
-
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/securitycenter`
- Request: —; Response: `ContainerThreatDetectionSettings`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | — |

### `securitycenter.projects.getEventThreatDetectionSettings`

- Versions: v1beta2
- `GET https://securitycenter.googleapis.com/v1beta2/{+name}`
-
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/securitycenter`
- Request: —; Response: `EventThreatDetectionSettings`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | — |

### `securitycenter.projects.getRapidVulnerabilityDetectionSettings`

- Versions: v1beta2
- `GET https://securitycenter.googleapis.com/v1beta2/{+name}`
-
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/securitycenter`
- Request: —; Response: `RapidVulnerabilityDetectionSettings`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | — |

### `securitycenter.projects.getSecurityCenterSettings`

- Versions: v1beta2
- `GET https://securitycenter.googleapis.com/v1beta2/{+name}`
-
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/securitycenter`
- Request: —; Response: `SecurityCenterSettings`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | — |

### `securitycenter.projects.getSecurityHealthAnalyticsSettings`

- Versions: v1beta2
- `GET https://securitycenter.googleapis.com/v1beta2/{+name}`
-
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/securitycenter`
- Request: —; Response: `SecurityHealthAnalyticsSettings`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | — |

### `securitycenter.projects.getVirtualMachineThreatDetectionSettings`

- Versions: v1beta2
- `GET https://securitycenter.googleapis.com/v1beta2/{+name}`
-
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/securitycenter`
- Request: —; Response: `VirtualMachineThreatDetectionSettings`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | — |

### `securitycenter.projects.getWebSecurityScannerSettings`

- Versions: v1beta2
- `GET https://securitycenter.googleapis.com/v1beta2/{+name}`
-
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/securitycenter`
- Request: —; Response: `WebSecurityScannerSettings`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | — |

### `securitycenter.projects.locations.clusters.containerThreatDetectionSettings.calculate`

- Versions: v1beta2
- `GET https://securitycenter.googleapis.com/v1beta2/{+name}:calculate`
-
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/securitycenter`
- Request: —; Response: `ContainerThreatDetectionSettings`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | — |
| `showEligibleModulesOnly` | query | boolean | no | — |

### `securitycenter.projects.locations.clusters.getContainerThreatDetectionSettings`

- Versions: v1beta2
- `GET https://securitycenter.googleapis.com/v1beta2/{+name}`
-
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/securitycenter`
- Request: —; Response: `ContainerThreatDetectionSettings`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | — |

### `securitycenter.projects.locations.clusters.updateContainerThreatDetectionSettings`

- Versions: v1beta2
- `PATCH https://securitycenter.googleapis.com/v1beta2/{+name}`
-
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/securitycenter`
- Request: `ContainerThreatDetectionSettings`; Response: `ContainerThreatDetectionSettings`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | — |
| `updateMask` | query | string (google-fieldmask) | no | — |

### `securitycenter.projects.locations.muteConfigs.delete`

- Versions: v1
- `DELETE https://securitycenter.googleapis.com/v1/{+name}`
-
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/securitycenter`
- Request: —; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | — |

### `securitycenter.projects.locations.muteConfigs.get`

- Versions: v1
- `GET https://securitycenter.googleapis.com/v1/{+name}`
-
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/securitycenter`
- Request: —; Response: `GoogleCloudSecuritycenterV1MuteConfig`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | — |

### `securitycenter.projects.locations.muteConfigs.patch`

- Versions: v1
- `PATCH https://securitycenter.googleapis.com/v1/{+name}`
-
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/securitycenter`
- Request: `GoogleCloudSecuritycenterV1MuteConfig`; Response: `GoogleCloudSecuritycenterV1MuteConfig`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | — |
| `updateMask` | query | string (google-fieldmask) | no | — |

### `securitycenter.projects.muteConfigs.create`

- Versions: v1
- `POST https://securitycenter.googleapis.com/v1/{+parent}/muteConfigs`
-
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/securitycenter`
- Request: `GoogleCloudSecuritycenterV1MuteConfig`; Response: `GoogleCloudSecuritycenterV1MuteConfig`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | — |
| `muteConfigId` | query | string | no | — |

### `securitycenter.projects.muteConfigs.delete`

- Versions: v1
- `DELETE https://securitycenter.googleapis.com/v1/{+name}`
-
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/securitycenter`
- Request: —; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | — |

### `securitycenter.projects.muteConfigs.get`

- Versions: v1
- `GET https://securitycenter.googleapis.com/v1/{+name}`
-
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/securitycenter`
- Request: —; Response: `GoogleCloudSecuritycenterV1MuteConfig`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | — |

### `securitycenter.projects.muteConfigs.list`

- Versions: v1
- `GET https://securitycenter.googleapis.com/v1/{+parent}/muteConfigs`
-
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/securitycenter`
- Request: —; Response: `ListMuteConfigsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | — |
| `pageSize` | query | integer (int32) | no | — |
| `pageToken` | query | string | no | — |

### `securitycenter.projects.muteConfigs.patch`

- Versions: v1
- `PATCH https://securitycenter.googleapis.com/v1/{+name}`
-
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/securitycenter`
- Request: `GoogleCloudSecuritycenterV1MuteConfig`; Response: `GoogleCloudSecuritycenterV1MuteConfig`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | — |
| `updateMask` | query | string (google-fieldmask) | no | — |

### `securitycenter.projects.notificationConfigs.create`

- Versions: v1
- `POST https://securitycenter.googleapis.com/v1/{+parent}/notificationConfigs`
-
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/securitycenter`
- Request: `NotificationConfig`; Response: `NotificationConfig`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | — |
| `configId` | query | string | no | — |

### `securitycenter.projects.notificationConfigs.delete`

- Versions: v1
- `DELETE https://securitycenter.googleapis.com/v1/{+name}`
-
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/securitycenter`
- Request: —; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | — |

### `securitycenter.projects.notificationConfigs.get`

- Versions: v1
- `GET https://securitycenter.googleapis.com/v1/{+name}`
-
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/securitycenter`
- Request: —; Response: `NotificationConfig`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | — |

### `securitycenter.projects.notificationConfigs.list`

- Versions: v1
- `GET https://securitycenter.googleapis.com/v1/{+parent}/notificationConfigs`
-
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/securitycenter`
- Request: —; Response: `ListNotificationConfigsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | — |
| `pageSize` | query | integer (int32) | no | — |
| `pageToken` | query | string | no | — |

### `securitycenter.projects.notificationConfigs.patch`

- Versions: v1
- `PATCH https://securitycenter.googleapis.com/v1/{+name}`
-
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/securitycenter`
- Request: `NotificationConfig`; Response: `NotificationConfig`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | — |
| `updateMask` | query | string (google-fieldmask) | no | — |

### `securitycenter.projects.rapidVulnerabilityDetectionSettings.calculate`

- Versions: v1beta2
- `GET https://securitycenter.googleapis.com/v1beta2/{+name}:calculate`
-
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/securitycenter`
- Request: —; Response: `RapidVulnerabilityDetectionSettings`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | — |

### `securitycenter.projects.securityHealthAnalyticsSettings.calculate`

- Versions: v1beta2
- `GET https://securitycenter.googleapis.com/v1beta2/{+name}:calculate`
-
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/securitycenter`
- Request: —; Response: `SecurityHealthAnalyticsSettings`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | — |
| `showEligibleModulesOnly` | query | boolean | no | — |

### `securitycenter.projects.securityHealthAnalyticsSettings.customModules.create`

- Versions: v1
- `POST https://securitycenter.googleapis.com/v1/{+parent}/customModules`
-
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/securitycenter`
- Request: `GoogleCloudSecuritycenterV1SecurityHealthAnalyticsCustomModule`; Response: `GoogleCloudSecuritycenterV1SecurityHealthAnalyticsCustomModule`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | — |

### `securitycenter.projects.securityHealthAnalyticsSettings.customModules.delete`

- Versions: v1
- `DELETE https://securitycenter.googleapis.com/v1/{+name}`
-
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/securitycenter`
- Request: —; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | — |

### `securitycenter.projects.securityHealthAnalyticsSettings.customModules.get`

- Versions: v1
- `GET https://securitycenter.googleapis.com/v1/{+name}`
-
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/securitycenter`
- Request: —; Response: `GoogleCloudSecuritycenterV1SecurityHealthAnalyticsCustomModule`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | — |

### `securitycenter.projects.securityHealthAnalyticsSettings.customModules.list`

- Versions: v1
- `GET https://securitycenter.googleapis.com/v1/{+parent}/customModules`
-
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/securitycenter`
- Request: —; Response: `ListSecurityHealthAnalyticsCustomModulesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | — |
| `pageSize` | query | integer (int32) | no | — |
| `pageToken` | query | string | no | — |

### `securitycenter.projects.securityHealthAnalyticsSettings.customModules.listDescendant`

- Versions: v1
- `GET https://securitycenter.googleapis.com/v1/{+parent}/customModules:listDescendant`
-
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/securitycenter`
- Request: —; Response: `ListDescendantSecurityHealthAnalyticsCustomModulesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | — |
| `pageSize` | query | integer (int32) | no | — |
| `pageToken` | query | string | no | — |

### `securitycenter.projects.securityHealthAnalyticsSettings.customModules.patch`

- Versions: v1
- `PATCH https://securitycenter.googleapis.com/v1/{+name}`
-
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/securitycenter`
- Request: `GoogleCloudSecuritycenterV1SecurityHealthAnalyticsCustomModule`; Response: `GoogleCloudSecuritycenterV1SecurityHealthAnalyticsCustomModule`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | — |
| `updateMask` | query | string (google-fieldmask) | no | — |

### `securitycenter.projects.securityHealthAnalyticsSettings.customModules.simulate`

- Versions: v1
- `POST https://securitycenter.googleapis.com/v1/{+parent}/customModules:simulate`
-
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/securitycenter`
- Request: `SimulateSecurityHealthAnalyticsCustomModuleRequest`; Response: `SimulateSecurityHealthAnalyticsCustomModuleResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | — |

### `securitycenter.projects.securityHealthAnalyticsSettings.effectiveCustomModules.get`

- Versions: v1
- `GET https://securitycenter.googleapis.com/v1/{+name}`
-
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/securitycenter`
- Request: —; Response: `GoogleCloudSecuritycenterV1EffectiveSecurityHealthAnalyticsCustomModule`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | — |

### `securitycenter.projects.securityHealthAnalyticsSettings.effectiveCustomModules.list`

- Versions: v1
- `GET https://securitycenter.googleapis.com/v1/{+parent}/effectiveCustomModules`
-
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/securitycenter`
- Request: —; Response: `ListEffectiveSecurityHealthAnalyticsCustomModulesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | — |
| `pageSize` | query | integer (int32) | no | — |
| `pageToken` | query | string | no | — |

### `securitycenter.projects.sources.findings.externalSystems.patch`

- Versions: v1
- `PATCH https://securitycenter.googleapis.com/v1/{+name}`
-
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/securitycenter`
- Request: `GoogleCloudSecuritycenterV1ExternalSystem`; Response: `GoogleCloudSecuritycenterV1ExternalSystem`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | — |
| `updateMask` | query | string (google-fieldmask) | no | — |

### `securitycenter.projects.sources.findings.group`

- Versions: v1
- `POST https://securitycenter.googleapis.com/v1/{+parent}/findings:group`
-
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/securitycenter`
- Request: `GroupFindingsRequest`; Response: `GroupFindingsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | — |

### `securitycenter.projects.sources.findings.list`

- Versions: v1
- `GET https://securitycenter.googleapis.com/v1/{+parent}/findings`
-
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/securitycenter`
- Request: —; Response: `ListFindingsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | — |
| `compareDuration` | query | string (google-duration) | no | — |
| `fieldMask` | query | string (google-fieldmask) | no | — |
| `filter` | query | string | no | — |
| `orderBy` | query | string | no | — |
| `pageSize` | query | integer (int32) | no | — |
| `pageToken` | query | string | no | — |
| `readTime` | query | string (google-datetime) | no | — |

### `securitycenter.projects.sources.findings.patch`

- Versions: v1
- `PATCH https://securitycenter.googleapis.com/v1/{+name}`
-
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/securitycenter`
- Request: `Finding`; Response: `Finding`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | — |
| `updateMask` | query | string (google-fieldmask) | no | — |

### `securitycenter.projects.sources.findings.setMute`

- Versions: v1
- `POST https://securitycenter.googleapis.com/v1/{+name}:setMute`
-
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/securitycenter`
- Request: `SetMuteRequest`; Response: `Finding`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | — |

### `securitycenter.projects.sources.findings.setState`

- Versions: v1
- `POST https://securitycenter.googleapis.com/v1/{+name}:setState`
-
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/securitycenter`
- Request: `SetFindingStateRequest`; Response: `Finding`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | — |

### `securitycenter.projects.sources.findings.updateSecurityMarks`

- Versions: v1
- `PATCH https://securitycenter.googleapis.com/v1/{+name}`
-
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/securitycenter`
- Request: `SecurityMarks`; Response: `SecurityMarks`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | — |
| `startTime` | query | string (google-datetime) | no | — |
| `updateMask` | query | string (google-fieldmask) | no | — |

### `securitycenter.projects.sources.list`

- Versions: v1
- `GET https://securitycenter.googleapis.com/v1/{+parent}/sources`
-
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/securitycenter`
- Request: —; Response: `ListSourcesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | — |
| `pageSize` | query | integer (int32) | no | — |
| `pageToken` | query | string | no | — |

### `securitycenter.projects.updateContainerThreatDetectionSettings`

- Versions: v1beta2
- `PATCH https://securitycenter.googleapis.com/v1beta2/{+name}`
-
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/securitycenter`
- Request: `ContainerThreatDetectionSettings`; Response: `ContainerThreatDetectionSettings`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | — |
| `updateMask` | query | string (google-fieldmask) | no | — |

### `securitycenter.projects.updateEventThreatDetectionSettings`

- Versions: v1beta2
- `PATCH https://securitycenter.googleapis.com/v1beta2/{+name}`
-
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/securitycenter`
- Request: `EventThreatDetectionSettings`; Response: `EventThreatDetectionSettings`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | — |
| `updateMask` | query | string (google-fieldmask) | no | — |

### `securitycenter.projects.updateRapidVulnerabilityDetectionSettings`

- Versions: v1beta2
- `PATCH https://securitycenter.googleapis.com/v1beta2/{+name}`
-
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/securitycenter`
- Request: `RapidVulnerabilityDetectionSettings`; Response: `RapidVulnerabilityDetectionSettings`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | — |
| `updateMask` | query | string (google-fieldmask) | no | — |

### `securitycenter.projects.updateSecurityHealthAnalyticsSettings`

- Versions: v1beta2
- `PATCH https://securitycenter.googleapis.com/v1beta2/{+name}`
-
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/securitycenter`
- Request: `SecurityHealthAnalyticsSettings`; Response: `SecurityHealthAnalyticsSettings`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | — |
| `updateMask` | query | string (google-fieldmask) | no | — |

### `securitycenter.projects.updateVirtualMachineThreatDetectionSettings`

- Versions: v1beta2
- `PATCH https://securitycenter.googleapis.com/v1beta2/{+name}`
-
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/securitycenter`
- Request: `VirtualMachineThreatDetectionSettings`; Response: `VirtualMachineThreatDetectionSettings`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | — |
| `updateMask` | query | string (google-fieldmask) | no | — |

### `securitycenter.projects.updateWebSecurityScannerSettings`

- Versions: v1beta2
- `PATCH https://securitycenter.googleapis.com/v1beta2/{+name}`
-
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/securitycenter`
- Request: `WebSecurityScannerSettings`; Response: `WebSecurityScannerSettings`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | — |
| `updateMask` | query | string (google-fieldmask) | no | — |

### `securitycenter.projects.virtualMachineThreatDetectionSettings.calculate`

- Versions: v1beta2
- `GET https://securitycenter.googleapis.com/v1beta2/{+name}:calculate`
-
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/securitycenter`
- Request: —; Response: `VirtualMachineThreatDetectionSettings`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | — |
| `showEligibleModulesOnly` | query | boolean | no | — |

### `securitycenter.projects.webSecurityScannerSettings.calculate`

- Versions: v1beta2
- `GET https://securitycenter.googleapis.com/v1beta2/{+name}:calculate`
-
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/securitycenter`
- Request: —; Response: `WebSecurityScannerSettings`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | — |
| `showEligibleModulesOnly` | query | boolean | no | — |

### Example request skeleton

Generated from the Discovery entry of `securitycenter.organizations.securityHealthAnalyticsSettings.customModules.listDescendant` (not in the official docs); replace the `{...}` path variables (URL-encode query values):

```bash
curl -X GET \
  -H "Authorization: Bearer $(gcloud auth print-access-token)" \
  "https://securitycenter.googleapis.com/v1/{+parent}/customModules:listDescendant"
```

## Notes

- Generated from the Discovery document(s) v1, v1beta2, v1beta1 of `securitycenter` (retrieved 2026-11-14). Resources on this page: organizations, projects.
- The Required column is `yes` for path variables and required parameters, and `conditional` when the description says "Required if ..." (mutually exclusive alternatives), when a `parent.child` parameter is required only inside an optional parent message or one branch of a oneof. Path variables are `yes` unless a note below names an alternative route without them.
- Message schemas (the request and response types named above) are listed under `references/rest-schemas/securitycenter/`; they are the `schemas` section of the Discovery documents in Source.
- Deprecated methods (`deprecated: true` in Discovery): `securitycenter.organizations.updateOrganizationSettings`, `securitycenter.projects.assets.group`, `securitycenter.projects.assets.list`. Avoid them in new code.
- Regional endpoints: the Discovery document (`securitycenter` v1, revision 20261023) also lists 3 endpoints of the form `https://securitycenter.LOCATION.rep.googleapis.com/` (Regional Endpoint), for LOCATION in `eu`, `me-central2`, `us`. The method URLs above use the global host `https://securitycenter.googleapis.com/`; to send a request through one of these endpoints, replace the host with the endpoint for the resource's location (for example `https://securitycenter.me-central2.rep.googleapis.com/`) and keep the path.
- Source: https://securitycenter.googleapis.com/$discovery/rest?version=v1, https://securitycenter.googleapis.com/$discovery/rest?version=v1beta2, https://securitycenter.googleapis.com/$discovery/rest?version=v1beta1 (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
