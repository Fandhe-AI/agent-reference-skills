---
source: https://securitycenter.googleapis.com/$discovery/rest?version=v1
---

# Security Command Center API REST API (securitycenter) (part 1/2)

## Signature / Usage

Base URL: `https://securitycenter.googleapis.com`. Methods are listed by `id`; the `Versions` line shows which API versions define the method (preferred: v1).

### `securitycenter.folders.assets.group`

- Versions: v1
- `POST https://securitycenter.googleapis.com/v1/{+parent}/assets:group`
-
- Deprecated: `deprecated: true` in the Discovery document
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/securitycenter`
- Request: `GroupAssetsRequest`; Response: `GroupAssetsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | — |

### `securitycenter.folders.assets.list`

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

### `securitycenter.folders.assets.updateSecurityMarks`

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

### `securitycenter.folders.bigQueryExports.create`

- Versions: v1
- `POST https://securitycenter.googleapis.com/v1/{+parent}/bigQueryExports`
-
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/securitycenter`
- Request: `GoogleCloudSecuritycenterV1BigQueryExport`; Response: `GoogleCloudSecuritycenterV1BigQueryExport`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | — |
| `bigQueryExportId` | query | string | no | — |

### `securitycenter.folders.bigQueryExports.delete`

- Versions: v1
- `DELETE https://securitycenter.googleapis.com/v1/{+name}`
-
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/securitycenter`
- Request: —; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | — |

### `securitycenter.folders.bigQueryExports.get`

- Versions: v1
- `GET https://securitycenter.googleapis.com/v1/{+name}`
-
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/securitycenter`
- Request: —; Response: `GoogleCloudSecuritycenterV1BigQueryExport`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | — |

### `securitycenter.folders.bigQueryExports.list`

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

### `securitycenter.folders.bigQueryExports.patch`

- Versions: v1
- `PATCH https://securitycenter.googleapis.com/v1/{+name}`
-
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/securitycenter`
- Request: `GoogleCloudSecuritycenterV1BigQueryExport`; Response: `GoogleCloudSecuritycenterV1BigQueryExport`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | — |
| `updateMask` | query | string (google-fieldmask) | no | — |

### `securitycenter.folders.containerThreatDetectionSettings.calculate`

- Versions: v1beta2
- `GET https://securitycenter.googleapis.com/v1beta2/{+name}:calculate`
-
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/securitycenter`
- Request: —; Response: `ContainerThreatDetectionSettings`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | — |
| `showEligibleModulesOnly` | query | boolean | no | — |

### `securitycenter.folders.eventThreatDetectionSettings.calculate`

- Versions: v1beta2
- `GET https://securitycenter.googleapis.com/v1beta2/{+name}:calculate`
-
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/securitycenter`
- Request: —; Response: `EventThreatDetectionSettings`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | — |
| `showEligibleModulesOnly` | query | boolean | no | — |

### `securitycenter.folders.eventThreatDetectionSettings.customModules.create`

- Versions: v1
- `POST https://securitycenter.googleapis.com/v1/{+parent}/customModules`
-
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/securitycenter`
- Request: `EventThreatDetectionCustomModule`; Response: `EventThreatDetectionCustomModule`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | — |

### `securitycenter.folders.eventThreatDetectionSettings.customModules.delete`

- Versions: v1
- `DELETE https://securitycenter.googleapis.com/v1/{+name}`
-
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/securitycenter`
- Request: —; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | — |

### `securitycenter.folders.eventThreatDetectionSettings.customModules.get`

- Versions: v1
- `GET https://securitycenter.googleapis.com/v1/{+name}`
-
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/securitycenter`
- Request: —; Response: `EventThreatDetectionCustomModule`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | — |

### `securitycenter.folders.eventThreatDetectionSettings.customModules.list`

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

### `securitycenter.folders.eventThreatDetectionSettings.customModules.listDescendant`

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

### `securitycenter.folders.eventThreatDetectionSettings.customModules.patch`

- Versions: v1
- `PATCH https://securitycenter.googleapis.com/v1/{+name}`
-
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/securitycenter`
- Request: `EventThreatDetectionCustomModule`; Response: `EventThreatDetectionCustomModule`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | — |
| `updateMask` | query | string (google-fieldmask) | no | — |

### `securitycenter.folders.eventThreatDetectionSettings.effectiveCustomModules.get`

- Versions: v1
- `GET https://securitycenter.googleapis.com/v1/{+name}`
-
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/securitycenter`
- Request: —; Response: `EffectiveEventThreatDetectionCustomModule`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | — |

### `securitycenter.folders.eventThreatDetectionSettings.effectiveCustomModules.list`

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

### `securitycenter.folders.eventThreatDetectionSettings.validateCustomModule`

- Versions: v1
- `POST https://securitycenter.googleapis.com/v1/{+parent}:validateCustomModule`
-
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/securitycenter`
- Request: `ValidateEventThreatDetectionCustomModuleRequest`; Response: `ValidateEventThreatDetectionCustomModuleResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | — |

### `securitycenter.folders.findings.bulkMute`

- Versions: v1
- `POST https://securitycenter.googleapis.com/v1/{+parent}/findings:bulkMute`
-
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/securitycenter`
- Request: `BulkMuteFindingsRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | — |

### `securitycenter.folders.getContainerThreatDetectionSettings`

- Versions: v1beta2
- `GET https://securitycenter.googleapis.com/v1beta2/{+name}`
-
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/securitycenter`
- Request: —; Response: `ContainerThreatDetectionSettings`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | — |

### `securitycenter.folders.getEventThreatDetectionSettings`

- Versions: v1beta2
- `GET https://securitycenter.googleapis.com/v1beta2/{+name}`
-
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/securitycenter`
- Request: —; Response: `EventThreatDetectionSettings`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | — |

### `securitycenter.folders.getRapidVulnerabilityDetectionSettings`

- Versions: v1beta2
- `GET https://securitycenter.googleapis.com/v1beta2/{+name}`
-
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/securitycenter`
- Request: —; Response: `RapidVulnerabilityDetectionSettings`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | — |

### `securitycenter.folders.getSecurityCenterSettings`

- Versions: v1beta2
- `GET https://securitycenter.googleapis.com/v1beta2/{+name}`
-
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/securitycenter`
- Request: —; Response: `SecurityCenterSettings`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | — |

### `securitycenter.folders.getSecurityHealthAnalyticsSettings`

- Versions: v1beta2
- `GET https://securitycenter.googleapis.com/v1beta2/{+name}`
-
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/securitycenter`
- Request: —; Response: `SecurityHealthAnalyticsSettings`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | — |

### `securitycenter.folders.getVirtualMachineThreatDetectionSettings`

- Versions: v1beta2
- `GET https://securitycenter.googleapis.com/v1beta2/{+name}`
-
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/securitycenter`
- Request: —; Response: `VirtualMachineThreatDetectionSettings`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | — |

### `securitycenter.folders.getWebSecurityScannerSettings`

- Versions: v1beta2
- `GET https://securitycenter.googleapis.com/v1beta2/{+name}`
-
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/securitycenter`
- Request: —; Response: `WebSecurityScannerSettings`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | — |

### `securitycenter.folders.locations.muteConfigs.delete`

- Versions: v1
- `DELETE https://securitycenter.googleapis.com/v1/{+name}`
-
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/securitycenter`
- Request: —; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | — |

### `securitycenter.folders.locations.muteConfigs.get`

- Versions: v1
- `GET https://securitycenter.googleapis.com/v1/{+name}`
-
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/securitycenter`
- Request: —; Response: `GoogleCloudSecuritycenterV1MuteConfig`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | — |

### `securitycenter.folders.locations.muteConfigs.patch`

- Versions: v1
- `PATCH https://securitycenter.googleapis.com/v1/{+name}`
-
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/securitycenter`
- Request: `GoogleCloudSecuritycenterV1MuteConfig`; Response: `GoogleCloudSecuritycenterV1MuteConfig`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | — |
| `updateMask` | query | string (google-fieldmask) | no | — |

### `securitycenter.folders.muteConfigs.create`

- Versions: v1
- `POST https://securitycenter.googleapis.com/v1/{+parent}/muteConfigs`
-
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/securitycenter`
- Request: `GoogleCloudSecuritycenterV1MuteConfig`; Response: `GoogleCloudSecuritycenterV1MuteConfig`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | — |
| `muteConfigId` | query | string | no | — |

### `securitycenter.folders.muteConfigs.delete`

- Versions: v1
- `DELETE https://securitycenter.googleapis.com/v1/{+name}`
-
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/securitycenter`
- Request: —; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | — |

### `securitycenter.folders.muteConfigs.get`

- Versions: v1
- `GET https://securitycenter.googleapis.com/v1/{+name}`
-
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/securitycenter`
- Request: —; Response: `GoogleCloudSecuritycenterV1MuteConfig`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | — |

### `securitycenter.folders.muteConfigs.list`

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

### `securitycenter.folders.muteConfigs.patch`

- Versions: v1
- `PATCH https://securitycenter.googleapis.com/v1/{+name}`
-
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/securitycenter`
- Request: `GoogleCloudSecuritycenterV1MuteConfig`; Response: `GoogleCloudSecuritycenterV1MuteConfig`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | — |
| `updateMask` | query | string (google-fieldmask) | no | — |

### `securitycenter.folders.notificationConfigs.create`

- Versions: v1
- `POST https://securitycenter.googleapis.com/v1/{+parent}/notificationConfigs`
-
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/securitycenter`
- Request: `NotificationConfig`; Response: `NotificationConfig`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | — |
| `configId` | query | string | no | — |

### `securitycenter.folders.notificationConfigs.delete`

- Versions: v1
- `DELETE https://securitycenter.googleapis.com/v1/{+name}`
-
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/securitycenter`
- Request: —; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | — |

### `securitycenter.folders.notificationConfigs.get`

- Versions: v1
- `GET https://securitycenter.googleapis.com/v1/{+name}`
-
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/securitycenter`
- Request: —; Response: `NotificationConfig`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | — |

### `securitycenter.folders.notificationConfigs.list`

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

### `securitycenter.folders.notificationConfigs.patch`

- Versions: v1
- `PATCH https://securitycenter.googleapis.com/v1/{+name}`
-
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/securitycenter`
- Request: `NotificationConfig`; Response: `NotificationConfig`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | — |
| `updateMask` | query | string (google-fieldmask) | no | — |

### `securitycenter.folders.rapidVulnerabilityDetectionSettings.calculate`

- Versions: v1beta2
- `GET https://securitycenter.googleapis.com/v1beta2/{+name}:calculate`
-
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/securitycenter`
- Request: —; Response: `RapidVulnerabilityDetectionSettings`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | — |

### `securitycenter.folders.securityHealthAnalyticsSettings.calculate`

- Versions: v1beta2
- `GET https://securitycenter.googleapis.com/v1beta2/{+name}:calculate`
-
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/securitycenter`
- Request: —; Response: `SecurityHealthAnalyticsSettings`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | — |
| `showEligibleModulesOnly` | query | boolean | no | — |

### `securitycenter.folders.securityHealthAnalyticsSettings.customModules.create`

- Versions: v1
- `POST https://securitycenter.googleapis.com/v1/{+parent}/customModules`
-
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/securitycenter`
- Request: `GoogleCloudSecuritycenterV1SecurityHealthAnalyticsCustomModule`; Response: `GoogleCloudSecuritycenterV1SecurityHealthAnalyticsCustomModule`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | — |

### `securitycenter.folders.securityHealthAnalyticsSettings.customModules.delete`

- Versions: v1
- `DELETE https://securitycenter.googleapis.com/v1/{+name}`
-
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/securitycenter`
- Request: —; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | — |

### `securitycenter.folders.securityHealthAnalyticsSettings.customModules.get`

- Versions: v1
- `GET https://securitycenter.googleapis.com/v1/{+name}`
-
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/securitycenter`
- Request: —; Response: `GoogleCloudSecuritycenterV1SecurityHealthAnalyticsCustomModule`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | — |

### `securitycenter.folders.securityHealthAnalyticsSettings.customModules.list`

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

### `securitycenter.folders.securityHealthAnalyticsSettings.customModules.listDescendant`

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

### `securitycenter.folders.securityHealthAnalyticsSettings.customModules.patch`

- Versions: v1
- `PATCH https://securitycenter.googleapis.com/v1/{+name}`
-
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/securitycenter`
- Request: `GoogleCloudSecuritycenterV1SecurityHealthAnalyticsCustomModule`; Response: `GoogleCloudSecuritycenterV1SecurityHealthAnalyticsCustomModule`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | — |
| `updateMask` | query | string (google-fieldmask) | no | — |

### `securitycenter.folders.securityHealthAnalyticsSettings.customModules.simulate`

- Versions: v1
- `POST https://securitycenter.googleapis.com/v1/{+parent}/customModules:simulate`
-
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/securitycenter`
- Request: `SimulateSecurityHealthAnalyticsCustomModuleRequest`; Response: `SimulateSecurityHealthAnalyticsCustomModuleResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | — |

### `securitycenter.folders.securityHealthAnalyticsSettings.effectiveCustomModules.get`

- Versions: v1
- `GET https://securitycenter.googleapis.com/v1/{+name}`
-
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/securitycenter`
- Request: —; Response: `GoogleCloudSecuritycenterV1EffectiveSecurityHealthAnalyticsCustomModule`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | — |

### `securitycenter.folders.securityHealthAnalyticsSettings.effectiveCustomModules.list`

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

### `securitycenter.folders.sources.findings.externalSystems.patch`

- Versions: v1
- `PATCH https://securitycenter.googleapis.com/v1/{+name}`
-
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/securitycenter`
- Request: `GoogleCloudSecuritycenterV1ExternalSystem`; Response: `GoogleCloudSecuritycenterV1ExternalSystem`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | — |
| `updateMask` | query | string (google-fieldmask) | no | — |

### `securitycenter.folders.sources.findings.group`

- Versions: v1
- `POST https://securitycenter.googleapis.com/v1/{+parent}/findings:group`
-
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/securitycenter`
- Request: `GroupFindingsRequest`; Response: `GroupFindingsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | — |

### `securitycenter.folders.sources.findings.list`

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

### `securitycenter.folders.sources.findings.patch`

- Versions: v1
- `PATCH https://securitycenter.googleapis.com/v1/{+name}`
-
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/securitycenter`
- Request: `Finding`; Response: `Finding`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | — |
| `updateMask` | query | string (google-fieldmask) | no | — |

### `securitycenter.folders.sources.findings.setMute`

- Versions: v1
- `POST https://securitycenter.googleapis.com/v1/{+name}:setMute`
-
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/securitycenter`
- Request: `SetMuteRequest`; Response: `Finding`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | — |

### `securitycenter.folders.sources.findings.setState`

- Versions: v1
- `POST https://securitycenter.googleapis.com/v1/{+name}:setState`
-
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/securitycenter`
- Request: `SetFindingStateRequest`; Response: `Finding`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | — |

### `securitycenter.folders.sources.findings.updateSecurityMarks`

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

### `securitycenter.folders.sources.list`

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

### `securitycenter.folders.updateContainerThreatDetectionSettings`

- Versions: v1beta2
- `PATCH https://securitycenter.googleapis.com/v1beta2/{+name}`
-
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/securitycenter`
- Request: `ContainerThreatDetectionSettings`; Response: `ContainerThreatDetectionSettings`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | — |
| `updateMask` | query | string (google-fieldmask) | no | — |

### `securitycenter.folders.updateEventThreatDetectionSettings`

- Versions: v1beta2
- `PATCH https://securitycenter.googleapis.com/v1beta2/{+name}`
-
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/securitycenter`
- Request: `EventThreatDetectionSettings`; Response: `EventThreatDetectionSettings`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | — |
| `updateMask` | query | string (google-fieldmask) | no | — |

### `securitycenter.folders.updateRapidVulnerabilityDetectionSettings`

- Versions: v1beta2
- `PATCH https://securitycenter.googleapis.com/v1beta2/{+name}`
-
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/securitycenter`
- Request: `RapidVulnerabilityDetectionSettings`; Response: `RapidVulnerabilityDetectionSettings`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | — |
| `updateMask` | query | string (google-fieldmask) | no | — |

### `securitycenter.folders.updateSecurityHealthAnalyticsSettings`

- Versions: v1beta2
- `PATCH https://securitycenter.googleapis.com/v1beta2/{+name}`
-
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/securitycenter`
- Request: `SecurityHealthAnalyticsSettings`; Response: `SecurityHealthAnalyticsSettings`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | — |
| `updateMask` | query | string (google-fieldmask) | no | — |

### `securitycenter.folders.updateVirtualMachineThreatDetectionSettings`

- Versions: v1beta2
- `PATCH https://securitycenter.googleapis.com/v1beta2/{+name}`
-
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/securitycenter`
- Request: `VirtualMachineThreatDetectionSettings`; Response: `VirtualMachineThreatDetectionSettings`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | — |
| `updateMask` | query | string (google-fieldmask) | no | — |

### `securitycenter.folders.updateWebSecurityScannerSettings`

- Versions: v1beta2
- `PATCH https://securitycenter.googleapis.com/v1beta2/{+name}`
-
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/securitycenter`
- Request: `WebSecurityScannerSettings`; Response: `WebSecurityScannerSettings`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | — |
| `updateMask` | query | string (google-fieldmask) | no | — |

### `securitycenter.folders.virtualMachineThreatDetectionSettings.calculate`

- Versions: v1beta2
- `GET https://securitycenter.googleapis.com/v1beta2/{+name}:calculate`
-
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/securitycenter`
- Request: —; Response: `VirtualMachineThreatDetectionSettings`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | — |
| `showEligibleModulesOnly` | query | boolean | no | — |

### `securitycenter.folders.webSecurityScannerSettings.calculate`

- Versions: v1beta2
- `GET https://securitycenter.googleapis.com/v1beta2/{+name}:calculate`
-
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/securitycenter`
- Request: —; Response: `WebSecurityScannerSettings`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | — |
| `showEligibleModulesOnly` | query | boolean | no | — |

### `securitycenter.organizations.assets.group`

- Versions: v1, v1beta1
- `POST https://securitycenter.googleapis.com/v1/{+parent}/assets:group`
-
- Deprecated: `deprecated: true` in the Discovery document
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/securitycenter`
- Request: `GroupAssetsRequest`; Response: `GroupAssetsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | — |

### `securitycenter.organizations.assets.list`

- Versions: v1, v1beta1
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

### `securitycenter.organizations.assets.runDiscovery`

- Versions: v1, v1beta1
- `POST https://securitycenter.googleapis.com/v1/{+parent}/assets:runDiscovery`
-
- Deprecated: `deprecated: true` in the Discovery document
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/securitycenter`
- Request: `RunAssetDiscoveryRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | — |

### `securitycenter.organizations.assets.updateSecurityMarks`

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

### `securitycenter.organizations.attackPaths.list`

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

### `securitycenter.organizations.bigQueryExports.create`

- Versions: v1
- `POST https://securitycenter.googleapis.com/v1/{+parent}/bigQueryExports`
-
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/securitycenter`
- Request: `GoogleCloudSecuritycenterV1BigQueryExport`; Response: `GoogleCloudSecuritycenterV1BigQueryExport`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | — |
| `bigQueryExportId` | query | string | no | — |

### `securitycenter.organizations.bigQueryExports.delete`

- Versions: v1
- `DELETE https://securitycenter.googleapis.com/v1/{+name}`
-
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/securitycenter`
- Request: —; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | — |

### `securitycenter.organizations.bigQueryExports.get`

- Versions: v1
- `GET https://securitycenter.googleapis.com/v1/{+name}`
-
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/securitycenter`
- Request: —; Response: `GoogleCloudSecuritycenterV1BigQueryExport`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | — |

### `securitycenter.organizations.bigQueryExports.list`

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

### `securitycenter.organizations.bigQueryExports.patch`

- Versions: v1
- `PATCH https://securitycenter.googleapis.com/v1/{+name}`
-
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/securitycenter`
- Request: `GoogleCloudSecuritycenterV1BigQueryExport`; Response: `GoogleCloudSecuritycenterV1BigQueryExport`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | — |
| `updateMask` | query | string (google-fieldmask) | no | — |

### `securitycenter.organizations.containerThreatDetectionSettings.calculate`

- Versions: v1beta2
- `GET https://securitycenter.googleapis.com/v1beta2/{+name}:calculate`
-
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/securitycenter`
- Request: —; Response: `ContainerThreatDetectionSettings`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | — |
| `showEligibleModulesOnly` | query | boolean | no | — |

### `securitycenter.organizations.eventThreatDetectionSettings.calculate`

- Versions: v1beta2
- `GET https://securitycenter.googleapis.com/v1beta2/{+name}:calculate`
-
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/securitycenter`
- Request: —; Response: `EventThreatDetectionSettings`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | — |
| `showEligibleModulesOnly` | query | boolean | no | — |

### `securitycenter.organizations.eventThreatDetectionSettings.customModules.create`

- Versions: v1
- `POST https://securitycenter.googleapis.com/v1/{+parent}/customModules`
-
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/securitycenter`
- Request: `EventThreatDetectionCustomModule`; Response: `EventThreatDetectionCustomModule`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | — |

### `securitycenter.organizations.eventThreatDetectionSettings.customModules.delete`

- Versions: v1
- `DELETE https://securitycenter.googleapis.com/v1/{+name}`
-
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/securitycenter`
- Request: —; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | — |

### `securitycenter.organizations.eventThreatDetectionSettings.customModules.get`

- Versions: v1
- `GET https://securitycenter.googleapis.com/v1/{+name}`
-
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/securitycenter`
- Request: —; Response: `EventThreatDetectionCustomModule`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | — |

### `securitycenter.organizations.eventThreatDetectionSettings.customModules.list`

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

### `securitycenter.organizations.eventThreatDetectionSettings.customModules.listDescendant`

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

### `securitycenter.organizations.eventThreatDetectionSettings.customModules.patch`

- Versions: v1
- `PATCH https://securitycenter.googleapis.com/v1/{+name}`
-
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/securitycenter`
- Request: `EventThreatDetectionCustomModule`; Response: `EventThreatDetectionCustomModule`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | — |
| `updateMask` | query | string (google-fieldmask) | no | — |

### `securitycenter.organizations.eventThreatDetectionSettings.effectiveCustomModules.get`

- Versions: v1
- `GET https://securitycenter.googleapis.com/v1/{+name}`
-
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/securitycenter`
- Request: —; Response: `EffectiveEventThreatDetectionCustomModule`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | — |

### `securitycenter.organizations.eventThreatDetectionSettings.effectiveCustomModules.list`

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

### `securitycenter.organizations.eventThreatDetectionSettings.validateCustomModule`

- Versions: v1
- `POST https://securitycenter.googleapis.com/v1/{+parent}:validateCustomModule`
-
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/securitycenter`
- Request: `ValidateEventThreatDetectionCustomModuleRequest`; Response: `ValidateEventThreatDetectionCustomModuleResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | — |

### `securitycenter.organizations.findings.bulkMute`

- Versions: v1
- `POST https://securitycenter.googleapis.com/v1/{+parent}/findings:bulkMute`
-
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/securitycenter`
- Request: `BulkMuteFindingsRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | — |

### `securitycenter.organizations.getContainerThreatDetectionSettings`

- Versions: v1beta2
- `GET https://securitycenter.googleapis.com/v1beta2/{+name}`
-
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/securitycenter`
- Request: —; Response: `ContainerThreatDetectionSettings`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | — |

### `securitycenter.organizations.getEventThreatDetectionSettings`

- Versions: v1beta2
- `GET https://securitycenter.googleapis.com/v1beta2/{+name}`
-
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/securitycenter`
- Request: —; Response: `EventThreatDetectionSettings`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | — |

### `securitycenter.organizations.getOrganizationSettings`

- Versions: v1, v1beta1
- `GET https://securitycenter.googleapis.com/v1/{+name}`
-
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/securitycenter`
- Request: —; Response: `OrganizationSettings`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | — |

### `securitycenter.organizations.getRapidVulnerabilityDetectionSettings`

- Versions: v1beta2
- `GET https://securitycenter.googleapis.com/v1beta2/{+name}`
-
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/securitycenter`
- Request: —; Response: `RapidVulnerabilityDetectionSettings`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | — |

### `securitycenter.organizations.getSecurityCenterSettings`

- Versions: v1beta2
- `GET https://securitycenter.googleapis.com/v1beta2/{+name}`
-
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/securitycenter`
- Request: —; Response: `SecurityCenterSettings`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | — |

### `securitycenter.organizations.getSecurityHealthAnalyticsSettings`

- Versions: v1beta2
- `GET https://securitycenter.googleapis.com/v1beta2/{+name}`
-
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/securitycenter`
- Request: —; Response: `SecurityHealthAnalyticsSettings`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | — |

### `securitycenter.organizations.getSubscription`

- Versions: v1beta2
- `GET https://securitycenter.googleapis.com/v1beta2/{+name}`
-
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/securitycenter`
- Request: —; Response: `Subscription`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | — |

### `securitycenter.organizations.getVirtualMachineThreatDetectionSettings`

- Versions: v1beta2
- `GET https://securitycenter.googleapis.com/v1beta2/{+name}`
-
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/securitycenter`
- Request: —; Response: `VirtualMachineThreatDetectionSettings`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | — |

### `securitycenter.organizations.getWebSecurityScannerSettings`

- Versions: v1beta2
- `GET https://securitycenter.googleapis.com/v1beta2/{+name}`
-
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/securitycenter`
- Request: —; Response: `WebSecurityScannerSettings`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | — |

### `securitycenter.organizations.locations.muteConfigs.delete`

- Versions: v1
- `DELETE https://securitycenter.googleapis.com/v1/{+name}`
-
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/securitycenter`
- Request: —; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | — |

### `securitycenter.organizations.locations.muteConfigs.get`

- Versions: v1
- `GET https://securitycenter.googleapis.com/v1/{+name}`
-
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/securitycenter`
- Request: —; Response: `GoogleCloudSecuritycenterV1MuteConfig`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | — |

### `securitycenter.organizations.locations.muteConfigs.patch`

- Versions: v1
- `PATCH https://securitycenter.googleapis.com/v1/{+name}`
-
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/securitycenter`
- Request: `GoogleCloudSecuritycenterV1MuteConfig`; Response: `GoogleCloudSecuritycenterV1MuteConfig`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | — |
| `updateMask` | query | string (google-fieldmask) | no | — |

### `securitycenter.organizations.muteConfigs.create`

- Versions: v1
- `POST https://securitycenter.googleapis.com/v1/{+parent}/muteConfigs`
-
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/securitycenter`
- Request: `GoogleCloudSecuritycenterV1MuteConfig`; Response: `GoogleCloudSecuritycenterV1MuteConfig`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | — |
| `muteConfigId` | query | string | no | — |

### `securitycenter.organizations.muteConfigs.delete`

- Versions: v1
- `DELETE https://securitycenter.googleapis.com/v1/{+name}`
-
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/securitycenter`
- Request: —; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | — |

### `securitycenter.organizations.muteConfigs.get`

- Versions: v1
- `GET https://securitycenter.googleapis.com/v1/{+name}`
-
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/securitycenter`
- Request: —; Response: `GoogleCloudSecuritycenterV1MuteConfig`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | — |

### `securitycenter.organizations.muteConfigs.list`

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

### `securitycenter.organizations.muteConfigs.patch`

- Versions: v1
- `PATCH https://securitycenter.googleapis.com/v1/{+name}`
-
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/securitycenter`
- Request: `GoogleCloudSecuritycenterV1MuteConfig`; Response: `GoogleCloudSecuritycenterV1MuteConfig`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | — |
| `updateMask` | query | string (google-fieldmask) | no | — |

### `securitycenter.organizations.notificationConfigs.create`

- Versions: v1
- `POST https://securitycenter.googleapis.com/v1/{+parent}/notificationConfigs`
-
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/securitycenter`
- Request: `NotificationConfig`; Response: `NotificationConfig`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | — |
| `configId` | query | string | no | — |

### `securitycenter.organizations.notificationConfigs.delete`

- Versions: v1
- `DELETE https://securitycenter.googleapis.com/v1/{+name}`
-
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/securitycenter`
- Request: —; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | — |

### `securitycenter.organizations.notificationConfigs.get`

- Versions: v1
- `GET https://securitycenter.googleapis.com/v1/{+name}`
-
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/securitycenter`
- Request: —; Response: `NotificationConfig`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | — |

### `securitycenter.organizations.notificationConfigs.list`

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

### `securitycenter.organizations.notificationConfigs.patch`

- Versions: v1
- `PATCH https://securitycenter.googleapis.com/v1/{+name}`
-
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/securitycenter`
- Request: `NotificationConfig`; Response: `NotificationConfig`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | — |
| `updateMask` | query | string (google-fieldmask) | no | — |

### `securitycenter.organizations.operations.cancel`

- Versions: v1, v1beta1
- `POST https://securitycenter.googleapis.com/v1/{+name}:cancel`
-
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/securitycenter`
- Request: —; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | — |

### `securitycenter.organizations.operations.delete`

- Versions: v1, v1beta1
- `DELETE https://securitycenter.googleapis.com/v1/{+name}`
-
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/securitycenter`
- Request: —; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | — |

### `securitycenter.organizations.operations.get`

- Versions: v1, v1beta1
- `GET https://securitycenter.googleapis.com/v1/{+name}`
-
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/securitycenter`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | — |

### `securitycenter.organizations.operations.list`

- Versions: v1, v1beta1
- `GET https://securitycenter.googleapis.com/v1/{+name}`
-
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/securitycenter`
- Request: —; Response: `ListOperationsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | — |
| `filter` | query | string | no | — |
| `pageSize` | query | integer (int32) | no | — |
| `pageToken` | query | string | no | — |
| `returnPartialSuccess` | query | boolean | no | — |

### `securitycenter.organizations.rapidVulnerabilityDetectionSettings.calculate`

- Versions: v1beta2
- `GET https://securitycenter.googleapis.com/v1beta2/{+name}:calculate`
-
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/securitycenter`
- Request: —; Response: `RapidVulnerabilityDetectionSettings`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | — |

### `securitycenter.organizations.resourceValueConfigs.batchCreate`

- Versions: v1
- `POST https://securitycenter.googleapis.com/v1/{+parent}/resourceValueConfigs:batchCreate`
-
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/securitycenter`
- Request: `BatchCreateResourceValueConfigsRequest`; Response: `BatchCreateResourceValueConfigsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | — |

### `securitycenter.organizations.resourceValueConfigs.delete`

- Versions: v1
- `DELETE https://securitycenter.googleapis.com/v1/{+name}`
-
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/securitycenter`
- Request: —; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | — |

### `securitycenter.organizations.resourceValueConfigs.get`

- Versions: v1
- `GET https://securitycenter.googleapis.com/v1/{+name}`
-
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/securitycenter`
- Request: —; Response: `GoogleCloudSecuritycenterV1ResourceValueConfig`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | — |

### `securitycenter.organizations.resourceValueConfigs.list`

- Versions: v1
- `GET https://securitycenter.googleapis.com/v1/{+parent}/resourceValueConfigs`
-
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/securitycenter`
- Request: —; Response: `ListResourceValueConfigsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | — |
| `pageSize` | query | integer (int32) | no | — |
| `pageToken` | query | string | no | — |

### `securitycenter.organizations.resourceValueConfigs.patch`

- Versions: v1
- `PATCH https://securitycenter.googleapis.com/v1/{+name}`
-
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/securitycenter`
- Request: `GoogleCloudSecuritycenterV1ResourceValueConfig`; Response: `GoogleCloudSecuritycenterV1ResourceValueConfig`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | — |
| `updateMask` | query | string (google-fieldmask) | no | — |

### `securitycenter.organizations.securityHealthAnalyticsSettings.calculate`

- Versions: v1beta2
- `GET https://securitycenter.googleapis.com/v1beta2/{+name}:calculate`
-
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/securitycenter`
- Request: —; Response: `SecurityHealthAnalyticsSettings`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | — |
| `showEligibleModulesOnly` | query | boolean | no | — |

### `securitycenter.organizations.securityHealthAnalyticsSettings.customModules.create`

- Versions: v1
- `POST https://securitycenter.googleapis.com/v1/{+parent}/customModules`
-
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/securitycenter`
- Request: `GoogleCloudSecuritycenterV1SecurityHealthAnalyticsCustomModule`; Response: `GoogleCloudSecuritycenterV1SecurityHealthAnalyticsCustomModule`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | — |

### `securitycenter.organizations.securityHealthAnalyticsSettings.customModules.delete`

- Versions: v1
- `DELETE https://securitycenter.googleapis.com/v1/{+name}`
-
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/securitycenter`
- Request: —; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | — |

### `securitycenter.organizations.securityHealthAnalyticsSettings.customModules.get`

- Versions: v1
- `GET https://securitycenter.googleapis.com/v1/{+name}`
-
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/securitycenter`
- Request: —; Response: `GoogleCloudSecuritycenterV1SecurityHealthAnalyticsCustomModule`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | — |

### `securitycenter.organizations.securityHealthAnalyticsSettings.customModules.list`

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

### Example request skeleton

Generated from the Discovery entry of `securitycenter.folders.assets.list` (not in the official docs); replace the `{...}` path variables (URL-encode query values):

```bash
curl -X GET \
  -H "Authorization: Bearer $(gcloud auth print-access-token)" \
  "https://securitycenter.googleapis.com/v1/{+parent}/assets"
```

## Notes

- Generated from the Discovery document(s) v1, v1beta2, v1beta1 of `securitycenter` (retrieved 2026-11-14). Resources on this page: folders, organizations.
- The Required column is `yes` for path variables and required parameters, and `conditional` when the description says "Required if ..." (mutually exclusive alternatives), when a `parent.child` parameter is required only inside an optional parent message or one branch of a oneof. Path variables are `yes` unless a note below names an alternative route without them.
- Message schemas (the request and response types named above) are defined in the `schemas` section of the Discovery documents in Source.
- Deprecated methods (`deprecated: true` in Discovery): `securitycenter.folders.assets.group`, `securitycenter.folders.assets.list`, `securitycenter.organizations.assets.group`, `securitycenter.organizations.assets.list`, `securitycenter.organizations.assets.runDiscovery`. Avoid them in new code.
- Source: https://securitycenter.googleapis.com/$discovery/rest?version=v1, https://securitycenter.googleapis.com/$discovery/rest?version=v1beta2, https://securitycenter.googleapis.com/$discovery/rest?version=v1beta1 (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
