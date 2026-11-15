---
source: https://recommender.googleapis.com/$discovery/rest?version=v1
---

# Recommender API REST API (recommender)

## Signature / Usage

Base URL: `https://recommender.googleapis.com`. Methods are listed by `id`; the `Versions` line shows which API versions define the method (preferred: v1).

### `recommender.billingAccounts.locations.insightTypes.getConfig`

- Versions: v1, v1beta1
- `GET https://recommender.googleapis.com/v1/{+name}`
- Gets the requested InsightTypeConfig. There is only one instance of the config for each InsightType.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleCloudRecommenderV1InsightTypeConfig`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the InsightTypeConfig to get. Acceptable formats: \* `projects/[PROJECT_NUMBER]/locations/[LOCATION]/insightTypes/[INSIGHT_TYPE_ID]/config` \* `projects/[PROJECT_ID]/locations/[LOCATION]/insightTypes/[INSIGHT_TYPE_ID]/config` \* `organizations/[ORGANIZATION_ID]/locations/[LOCATION]/insightTypes/[INSIGHT_TYPE_ID]/config` \* `billingAccounts/[BILLING_ACCOUNT_ID]/locations/[LOCATION]/insightTypes/[INSIGHT_TYPE_ID]/config` |

### `recommender.billingAccounts.locations.insightTypes.insights.get`

- Versions: v1, v1beta1
- `GET https://recommender.googleapis.com/v1/{+name}`
- Gets the requested insight. Requires the recommender.\*.get IAM permission for the specified insight type.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleCloudRecommenderV1Insight`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the insight. |

### `recommender.billingAccounts.locations.insightTypes.insights.list`

- Versions: v1, v1beta1
- `GET https://recommender.googleapis.com/v1/{+parent}/insights`
- Lists insights for the specified Cloud Resource. Requires the recommender.\*.list IAM permission for the specified insight type.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleCloudRecommenderV1ListInsightsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The container resource on which to execute the request. Acceptable formats: \* `projects/[PROJECT_NUMBER]/locations/[LOCATION]/insightTypes/[INSIGHT_TYPE_ID]` \* `projects/[PROJECT_ID]/locations/[LOCATION]/insightTypes/[INSIGHT_TYPE_ID]` \* `billingAccounts/[BILLING_ACCOUNT_ID]/locations/[LOCATION]/insightTypes/[INSIGHT_TYPE_ID]` \* `folders/[FOLDER_ID]/locations/[LOCATION]/insightTypes/[INSIGHT_TYPE_ID]` \* `organizations/[ORGANIZATION_ID]/locations/[LOCATION]/insightTypes/[INSIGHT_TYPE_ID]` LOCATION here refers to GCP Locations: https://cloud.google.com/about/locations/ INSIGHT_TYPE_ID refers to supported insight types: https://cloud.google.com/recommender/docs/insights/insight-types. |
| `filter` | query | string | no | Optional. Filter expression to restrict the insights returned. Supported filter fields: \* `stateInfo.state` \* `insightSubtype` \* `severity` \* `targetResources` Examples: \* `stateInfo.state = ACTIVE OR stateInfo.state = DISMISSED` \* `insightSubtype = PERMISSIONS_USAGE` \* `severity = CRITICAL OR severity = HIGH` \* `targetResources : //compute.googleapis.com/projects/1234/zones/us-central1-a/instances/instance-1` \* `stateInfo.state = ACTIVE AND (severity = CRITICAL OR severity = HIGH)` The max allowed filter length is 500 characters. (These expressions are based on the filter language described at https://google.aip.dev/160) |
| `pageSize` | query | integer (int32) | no | Optional. The maximum number of results to return from this request. Non-positive values are ignored. If not specified, the server will determine the number of results to return. |
| `pageToken` | query | string | no | Optional. If present, retrieves the next batch of results from the preceding call to this method. `page_token` must be the value of `next_page_token` from the previous response. The values of other method parameters must be identical to those in the previous call. |

### `recommender.billingAccounts.locations.insightTypes.insights.markAccepted`

- Versions: v1, v1beta1
- `POST https://recommender.googleapis.com/v1/{+name}:markAccepted`
- Marks the Insight State as Accepted. Users can use this method to indicate to the Recommender API that they have applied some action based on the insight. This stops the insight content from being updated. MarkInsightAccepted can be applied to insights in ACTIVE state. Requires the recommender.\*.update IAM permission for the specified insight.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `GoogleCloudRecommenderV1MarkInsightAcceptedRequest`; Response: `GoogleCloudRecommenderV1Insight`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the insight. |

### `recommender.billingAccounts.locations.insightTypes.updateConfig`

- Versions: v1, v1beta1
- `PATCH https://recommender.googleapis.com/v1/{+name}`
- Updates an InsightTypeConfig change. This will create a new revision of the config.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `GoogleCloudRecommenderV1InsightTypeConfig`; Response: `GoogleCloudRecommenderV1InsightTypeConfig`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Identifier. Name of insight type config. Eg, projects/\[PROJECT_NUMBER\]/locations/\[LOCATION\]/insightTypes/\[INSIGHT_TYPE_ID\]/config |
| `updateMask` | query | string (google-fieldmask) | no | The list of fields to be updated. |
| `validateOnly` | query | boolean | no | If true, validate the request and preview the change, but do not actually update it. |

### `recommender.billingAccounts.locations.list`

- Versions: v1beta1
- `GET https://recommender.googleapis.com/v1beta1/{+name}/locations`
- Lists locations with recommendations or insights.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleCloudLocationListLocationsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The resource that owns the locations collection, if applicable. |
| `extraLocationTypes` | query | repeated string | no | Optional. Do not use this field unless explicitly documented otherwise. This is primarily for internal usage. |
| `filter` | query | string | no | A filter to narrow down results to a preferred subset. The filtering language accepts strings like `"displayName=tokyo"`, and is documented in more detail in AIP-160 (https://google.aip.dev/160). |
| `pageSize` | query | integer (int32) | no | The maximum number of results to return. If not set, the service selects a default. |
| `pageToken` | query | string | no | A page token received from the `next_page_token` field in the response. Send that page token to receive the subsequent page. |

### `recommender.billingAccounts.locations.recommenders.getConfig`

- Versions: v1, v1beta1
- `GET https://recommender.googleapis.com/v1/{+name}`
- Gets the requested Recommender Config. There is only one instance of the config for each Recommender.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleCloudRecommenderV1RecommenderConfig`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the Recommendation Config to get. Acceptable formats: \* `projects/[PROJECT_NUMBER]/locations/[LOCATION]/recommenders/[RECOMMENDER_ID]/config` \* `projects/[PROJECT_ID]/locations/[LOCATION]/recommenders/[RECOMMENDER_ID]/config` \* `organizations/[ORGANIZATION_ID]/locations/[LOCATION]/recommenders/[RECOMMENDER_ID]/config` \* `billingAccounts/[BILLING_ACCOUNT_ID]/locations/[LOCATION]/recommenders/[RECOMMENDER_ID]/config` |

### `recommender.billingAccounts.locations.recommenders.recommendations.get`

- Versions: v1, v1beta1
- `GET https://recommender.googleapis.com/v1/{+name}`
- Gets the requested recommendation. Requires the recommender.\*.get IAM permission for the specified recommender.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleCloudRecommenderV1Recommendation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the recommendation. |

### `recommender.billingAccounts.locations.recommenders.recommendations.list`

- Versions: v1, v1beta1
- `GET https://recommender.googleapis.com/v1/{+parent}/recommendations`
- Lists recommendations for the specified Cloud Resource. Requires the recommender.\*.list IAM permission for the specified recommender.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleCloudRecommenderV1ListRecommendationsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The container resource on which to execute the request. Acceptable formats: \* `projects/[PROJECT_NUMBER]/locations/[LOCATION]/recommenders/[RECOMMENDER_ID]` \* `projects/[PROJECT_ID]/locations/[LOCATION]/recommenders/[RECOMMENDER_ID]` \* `billingAccounts/[BILLING_ACCOUNT_ID]/locations/[LOCATION]/recommenders/[RECOMMENDER_ID]` \* `folders/[FOLDER_ID]/locations/[LOCATION]/recommenders/[RECOMMENDER_ID]` \* `organizations/[ORGANIZATION_ID]/locations/[LOCATION]/recommenders/[RECOMMENDER_ID]` LOCATION here refers to GCP Locations: https://cloud.google.com/about/locations/ RECOMMENDER_ID refers to supported recommenders: https://cloud.google.com/recommender/docs/recommenders. |
| `filter` | query | string | no | Filter expression to restrict the recommendations returned. Supported filter fields: \* `state_info.state` \* `recommenderSubtype` \* `priority` \* `targetResources` Examples: \* `stateInfo.state = ACTIVE OR stateInfo.state = DISMISSED` \* `recommenderSubtype = REMOVE_ROLE OR recommenderSubtype = REPLACE_ROLE` \* `priority = P1 OR priority = P2` \* `targetResources : //compute.googleapis.com/projects/1234/zones/us-central1-a/instances/instance-1` \* `stateInfo.state = ACTIVE AND (priority = P1 OR priority = P2)` The max allowed filter length is 500 characters. (These expressions are based on the filter language described at https://google.aip.dev/160) |
| `pageSize` | query | integer (int32) | no | Optional. The maximum number of results to return from this request. Non-positive values are ignored. If not specified, the server will determine the number of results to return. |
| `pageToken` | query | string | no | Optional. If present, retrieves the next batch of results from the preceding call to this method. `page_token` must be the value of `next_page_token` from the previous response. The values of other method parameters must be identical to those in the previous call. |

### `recommender.billingAccounts.locations.recommenders.recommendations.markClaimed`

- Versions: v1, v1beta1
- `POST https://recommender.googleapis.com/v1/{+name}:markClaimed`
- Marks the Recommendation State as Claimed. Users can use this method to indicate to the Recommender API that they are starting to apply the recommendation themselves. This stops the recommendation content from being updated. Associated insights are frozen and placed in the ACCEPTED state. MarkRecommendationClaimed can be applied to recommendations in CLAIMED, SUCCEEDED, FAILED, or ACTIVE state. Requires the recommender.\*.update IAM permission for the specified recommender.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `GoogleCloudRecommenderV1MarkRecommendationClaimedRequest`; Response: `GoogleCloudRecommenderV1Recommendation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the recommendation. |

### `recommender.billingAccounts.locations.recommenders.recommendations.markDismissed`

- Versions: v1, v1beta1
- `POST https://recommender.googleapis.com/v1/{+name}:markDismissed`
- Mark the Recommendation State as Dismissed. Users can use this method to indicate to the Recommender API that an ACTIVE recommendation has to be marked back as DISMISSED. MarkRecommendationDismissed can be applied to recommendations in ACTIVE state. Requires the recommender.\*.update IAM permission for the specified recommender.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `GoogleCloudRecommenderV1MarkRecommendationDismissedRequest`; Response: `GoogleCloudRecommenderV1Recommendation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the recommendation. |

### `recommender.billingAccounts.locations.recommenders.recommendations.markFailed`

- Versions: v1, v1beta1
- `POST https://recommender.googleapis.com/v1/{+name}:markFailed`
- Marks the Recommendation State as Failed. Users can use this method to indicate to the Recommender API that they have applied the recommendation themselves, and the operation failed. This stops the recommendation content from being updated. Associated insights are frozen and placed in the ACCEPTED state. MarkRecommendationFailed can be applied to recommendations in ACTIVE, CLAIMED, SUCCEEDED, or FAILED state. Requires the recommender.\*.update IAM permission for the specified recommender.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `GoogleCloudRecommenderV1MarkRecommendationFailedRequest`; Response: `GoogleCloudRecommenderV1Recommendation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the recommendation. |

### `recommender.billingAccounts.locations.recommenders.recommendations.markSucceeded`

- Versions: v1, v1beta1
- `POST https://recommender.googleapis.com/v1/{+name}:markSucceeded`
- Marks the Recommendation State as Succeeded. Users can use this method to indicate to the Recommender API that they have applied the recommendation themselves, and the operation was successful. This stops the recommendation content from being updated. Associated insights are frozen and placed in the ACCEPTED state. MarkRecommendationSucceeded can be applied to recommendations in ACTIVE, CLAIMED, SUCCEEDED, or FAILED state. Requires the recommender.\*.update IAM permission for the specified recommender.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `GoogleCloudRecommenderV1MarkRecommendationSucceededRequest`; Response: `GoogleCloudRecommenderV1Recommendation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the recommendation. |

### `recommender.billingAccounts.locations.recommenders.updateConfig`

- Versions: v1, v1beta1
- `PATCH https://recommender.googleapis.com/v1/{+name}`
- Updates a Recommender Config. This will create a new revision of the config.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `GoogleCloudRecommenderV1RecommenderConfig`; Response: `GoogleCloudRecommenderV1RecommenderConfig`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Identifier. Name of recommender config. Eg, projects/\[PROJECT_NUMBER\]/locations/\[LOCATION\]/recommenders/\[RECOMMENDER_ID\]/config |
| `updateMask` | query | string (google-fieldmask) | no | The list of fields to be updated. |
| `validateOnly` | query | boolean | no | If true, validate the request and preview the change, but do not actually update it. |

### `recommender.folders.locations.insightTypes.insights.get`

- Versions: v1, v1beta1
- `GET https://recommender.googleapis.com/v1/{+name}`
- Gets the requested insight. Requires the recommender.\*.get IAM permission for the specified insight type.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleCloudRecommenderV1Insight`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the insight. |

### `recommender.folders.locations.insightTypes.insights.list`

- Versions: v1, v1beta1
- `GET https://recommender.googleapis.com/v1/{+parent}/insights`
- Lists insights for the specified Cloud Resource. Requires the recommender.\*.list IAM permission for the specified insight type.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleCloudRecommenderV1ListInsightsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The container resource on which to execute the request. Acceptable formats: \* `projects/[PROJECT_NUMBER]/locations/[LOCATION]/insightTypes/[INSIGHT_TYPE_ID]` \* `projects/[PROJECT_ID]/locations/[LOCATION]/insightTypes/[INSIGHT_TYPE_ID]` \* `billingAccounts/[BILLING_ACCOUNT_ID]/locations/[LOCATION]/insightTypes/[INSIGHT_TYPE_ID]` \* `folders/[FOLDER_ID]/locations/[LOCATION]/insightTypes/[INSIGHT_TYPE_ID]` \* `organizations/[ORGANIZATION_ID]/locations/[LOCATION]/insightTypes/[INSIGHT_TYPE_ID]` LOCATION here refers to GCP Locations: https://cloud.google.com/about/locations/ INSIGHT_TYPE_ID refers to supported insight types: https://cloud.google.com/recommender/docs/insights/insight-types. |
| `filter` | query | string | no | Optional. Filter expression to restrict the insights returned. Supported filter fields: \* `stateInfo.state` \* `insightSubtype` \* `severity` \* `targetResources` Examples: \* `stateInfo.state = ACTIVE OR stateInfo.state = DISMISSED` \* `insightSubtype = PERMISSIONS_USAGE` \* `severity = CRITICAL OR severity = HIGH` \* `targetResources : //compute.googleapis.com/projects/1234/zones/us-central1-a/instances/instance-1` \* `stateInfo.state = ACTIVE AND (severity = CRITICAL OR severity = HIGH)` The max allowed filter length is 500 characters. (These expressions are based on the filter language described at https://google.aip.dev/160) |
| `pageSize` | query | integer (int32) | no | Optional. The maximum number of results to return from this request. Non-positive values are ignored. If not specified, the server will determine the number of results to return. |
| `pageToken` | query | string | no | Optional. If present, retrieves the next batch of results from the preceding call to this method. `page_token` must be the value of `next_page_token` from the previous response. The values of other method parameters must be identical to those in the previous call. |

### `recommender.folders.locations.insightTypes.insights.markAccepted`

- Versions: v1, v1beta1
- `POST https://recommender.googleapis.com/v1/{+name}:markAccepted`
- Marks the Insight State as Accepted. Users can use this method to indicate to the Recommender API that they have applied some action based on the insight. This stops the insight content from being updated. MarkInsightAccepted can be applied to insights in ACTIVE state. Requires the recommender.\*.update IAM permission for the specified insight.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `GoogleCloudRecommenderV1MarkInsightAcceptedRequest`; Response: `GoogleCloudRecommenderV1Insight`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the insight. |

### `recommender.folders.locations.list`

- Versions: v1beta1
- `GET https://recommender.googleapis.com/v1beta1/{+name}/locations`
- Lists locations with recommendations or insights.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleCloudLocationListLocationsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The resource that owns the locations collection, if applicable. |
| `extraLocationTypes` | query | repeated string | no | Optional. Do not use this field unless explicitly documented otherwise. This is primarily for internal usage. |
| `filter` | query | string | no | A filter to narrow down results to a preferred subset. The filtering language accepts strings like `"displayName=tokyo"`, and is documented in more detail in AIP-160 (https://google.aip.dev/160). |
| `pageSize` | query | integer (int32) | no | The maximum number of results to return. If not set, the service selects a default. |
| `pageToken` | query | string | no | A page token received from the `next_page_token` field in the response. Send that page token to receive the subsequent page. |

### `recommender.folders.locations.recommenders.recommendations.get`

- Versions: v1, v1beta1
- `GET https://recommender.googleapis.com/v1/{+name}`
- Gets the requested recommendation. Requires the recommender.\*.get IAM permission for the specified recommender.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleCloudRecommenderV1Recommendation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the recommendation. |

### `recommender.folders.locations.recommenders.recommendations.list`

- Versions: v1, v1beta1
- `GET https://recommender.googleapis.com/v1/{+parent}/recommendations`
- Lists recommendations for the specified Cloud Resource. Requires the recommender.\*.list IAM permission for the specified recommender.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleCloudRecommenderV1ListRecommendationsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The container resource on which to execute the request. Acceptable formats: \* `projects/[PROJECT_NUMBER]/locations/[LOCATION]/recommenders/[RECOMMENDER_ID]` \* `projects/[PROJECT_ID]/locations/[LOCATION]/recommenders/[RECOMMENDER_ID]` \* `billingAccounts/[BILLING_ACCOUNT_ID]/locations/[LOCATION]/recommenders/[RECOMMENDER_ID]` \* `folders/[FOLDER_ID]/locations/[LOCATION]/recommenders/[RECOMMENDER_ID]` \* `organizations/[ORGANIZATION_ID]/locations/[LOCATION]/recommenders/[RECOMMENDER_ID]` LOCATION here refers to GCP Locations: https://cloud.google.com/about/locations/ RECOMMENDER_ID refers to supported recommenders: https://cloud.google.com/recommender/docs/recommenders. |
| `filter` | query | string | no | Filter expression to restrict the recommendations returned. Supported filter fields: \* `state_info.state` \* `recommenderSubtype` \* `priority` \* `targetResources` Examples: \* `stateInfo.state = ACTIVE OR stateInfo.state = DISMISSED` \* `recommenderSubtype = REMOVE_ROLE OR recommenderSubtype = REPLACE_ROLE` \* `priority = P1 OR priority = P2` \* `targetResources : //compute.googleapis.com/projects/1234/zones/us-central1-a/instances/instance-1` \* `stateInfo.state = ACTIVE AND (priority = P1 OR priority = P2)` The max allowed filter length is 500 characters. (These expressions are based on the filter language described at https://google.aip.dev/160) |
| `pageSize` | query | integer (int32) | no | Optional. The maximum number of results to return from this request. Non-positive values are ignored. If not specified, the server will determine the number of results to return. |
| `pageToken` | query | string | no | Optional. If present, retrieves the next batch of results from the preceding call to this method. `page_token` must be the value of `next_page_token` from the previous response. The values of other method parameters must be identical to those in the previous call. |

### `recommender.folders.locations.recommenders.recommendations.markClaimed`

- Versions: v1, v1beta1
- `POST https://recommender.googleapis.com/v1/{+name}:markClaimed`
- Marks the Recommendation State as Claimed. Users can use this method to indicate to the Recommender API that they are starting to apply the recommendation themselves. This stops the recommendation content from being updated. Associated insights are frozen and placed in the ACCEPTED state. MarkRecommendationClaimed can be applied to recommendations in CLAIMED, SUCCEEDED, FAILED, or ACTIVE state. Requires the recommender.\*.update IAM permission for the specified recommender.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `GoogleCloudRecommenderV1MarkRecommendationClaimedRequest`; Response: `GoogleCloudRecommenderV1Recommendation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the recommendation. |

### `recommender.folders.locations.recommenders.recommendations.markDismissed`

- Versions: v1, v1beta1
- `POST https://recommender.googleapis.com/v1/{+name}:markDismissed`
- Mark the Recommendation State as Dismissed. Users can use this method to indicate to the Recommender API that an ACTIVE recommendation has to be marked back as DISMISSED. MarkRecommendationDismissed can be applied to recommendations in ACTIVE state. Requires the recommender.\*.update IAM permission for the specified recommender.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `GoogleCloudRecommenderV1MarkRecommendationDismissedRequest`; Response: `GoogleCloudRecommenderV1Recommendation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the recommendation. |

### `recommender.folders.locations.recommenders.recommendations.markFailed`

- Versions: v1, v1beta1
- `POST https://recommender.googleapis.com/v1/{+name}:markFailed`
- Marks the Recommendation State as Failed. Users can use this method to indicate to the Recommender API that they have applied the recommendation themselves, and the operation failed. This stops the recommendation content from being updated. Associated insights are frozen and placed in the ACCEPTED state. MarkRecommendationFailed can be applied to recommendations in ACTIVE, CLAIMED, SUCCEEDED, or FAILED state. Requires the recommender.\*.update IAM permission for the specified recommender.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `GoogleCloudRecommenderV1MarkRecommendationFailedRequest`; Response: `GoogleCloudRecommenderV1Recommendation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the recommendation. |

### `recommender.folders.locations.recommenders.recommendations.markSucceeded`

- Versions: v1, v1beta1
- `POST https://recommender.googleapis.com/v1/{+name}:markSucceeded`
- Marks the Recommendation State as Succeeded. Users can use this method to indicate to the Recommender API that they have applied the recommendation themselves, and the operation was successful. This stops the recommendation content from being updated. Associated insights are frozen and placed in the ACCEPTED state. MarkRecommendationSucceeded can be applied to recommendations in ACTIVE, CLAIMED, SUCCEEDED, or FAILED state. Requires the recommender.\*.update IAM permission for the specified recommender.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `GoogleCloudRecommenderV1MarkRecommendationSucceededRequest`; Response: `GoogleCloudRecommenderV1Recommendation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the recommendation. |

### `recommender.insightTypes.list`

- Versions: v1beta1
- `GET https://recommender.googleapis.com/v1beta1/insightTypes`
- Lists available InsightTypes. No IAM permissions are required.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleCloudRecommenderV1beta1ListInsightTypesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `pageSize` | query | integer (int32) | no | Optional. The number of InsightTypes to return per page. The service may return fewer than this value. |
| `pageToken` | query | string | no | Optional. A page token, received from a previous `ListRecommenders` call. Provide this to retrieve the subsequent page. |

### `recommender.organizations.locations.insightTypes.getConfig`

- Versions: v1, v1beta1
- `GET https://recommender.googleapis.com/v1/{+name}`
- Gets the requested InsightTypeConfig. There is only one instance of the config for each InsightType.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleCloudRecommenderV1InsightTypeConfig`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the InsightTypeConfig to get. Acceptable formats: \* `projects/[PROJECT_NUMBER]/locations/[LOCATION]/insightTypes/[INSIGHT_TYPE_ID]/config` \* `projects/[PROJECT_ID]/locations/[LOCATION]/insightTypes/[INSIGHT_TYPE_ID]/config` \* `organizations/[ORGANIZATION_ID]/locations/[LOCATION]/insightTypes/[INSIGHT_TYPE_ID]/config` \* `billingAccounts/[BILLING_ACCOUNT_ID]/locations/[LOCATION]/insightTypes/[INSIGHT_TYPE_ID]/config` |

### `recommender.organizations.locations.insightTypes.insights.get`

- Versions: v1, v1beta1
- `GET https://recommender.googleapis.com/v1/{+name}`
- Gets the requested insight. Requires the recommender.\*.get IAM permission for the specified insight type.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleCloudRecommenderV1Insight`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the insight. |

### `recommender.organizations.locations.insightTypes.insights.list`

- Versions: v1, v1beta1
- `GET https://recommender.googleapis.com/v1/{+parent}/insights`
- Lists insights for the specified Cloud Resource. Requires the recommender.\*.list IAM permission for the specified insight type.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleCloudRecommenderV1ListInsightsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The container resource on which to execute the request. Acceptable formats: \* `projects/[PROJECT_NUMBER]/locations/[LOCATION]/insightTypes/[INSIGHT_TYPE_ID]` \* `projects/[PROJECT_ID]/locations/[LOCATION]/insightTypes/[INSIGHT_TYPE_ID]` \* `billingAccounts/[BILLING_ACCOUNT_ID]/locations/[LOCATION]/insightTypes/[INSIGHT_TYPE_ID]` \* `folders/[FOLDER_ID]/locations/[LOCATION]/insightTypes/[INSIGHT_TYPE_ID]` \* `organizations/[ORGANIZATION_ID]/locations/[LOCATION]/insightTypes/[INSIGHT_TYPE_ID]` LOCATION here refers to GCP Locations: https://cloud.google.com/about/locations/ INSIGHT_TYPE_ID refers to supported insight types: https://cloud.google.com/recommender/docs/insights/insight-types. |
| `filter` | query | string | no | Optional. Filter expression to restrict the insights returned. Supported filter fields: \* `stateInfo.state` \* `insightSubtype` \* `severity` \* `targetResources` Examples: \* `stateInfo.state = ACTIVE OR stateInfo.state = DISMISSED` \* `insightSubtype = PERMISSIONS_USAGE` \* `severity = CRITICAL OR severity = HIGH` \* `targetResources : //compute.googleapis.com/projects/1234/zones/us-central1-a/instances/instance-1` \* `stateInfo.state = ACTIVE AND (severity = CRITICAL OR severity = HIGH)` The max allowed filter length is 500 characters. (These expressions are based on the filter language described at https://google.aip.dev/160) |
| `pageSize` | query | integer (int32) | no | Optional. The maximum number of results to return from this request. Non-positive values are ignored. If not specified, the server will determine the number of results to return. |
| `pageToken` | query | string | no | Optional. If present, retrieves the next batch of results from the preceding call to this method. `page_token` must be the value of `next_page_token` from the previous response. The values of other method parameters must be identical to those in the previous call. |

### `recommender.organizations.locations.insightTypes.insights.markAccepted`

- Versions: v1, v1beta1
- `POST https://recommender.googleapis.com/v1/{+name}:markAccepted`
- Marks the Insight State as Accepted. Users can use this method to indicate to the Recommender API that they have applied some action based on the insight. This stops the insight content from being updated. MarkInsightAccepted can be applied to insights in ACTIVE state. Requires the recommender.\*.update IAM permission for the specified insight.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `GoogleCloudRecommenderV1MarkInsightAcceptedRequest`; Response: `GoogleCloudRecommenderV1Insight`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the insight. |

### `recommender.organizations.locations.insightTypes.updateConfig`

- Versions: v1, v1beta1
- `PATCH https://recommender.googleapis.com/v1/{+name}`
- Updates an InsightTypeConfig change. This will create a new revision of the config.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `GoogleCloudRecommenderV1InsightTypeConfig`; Response: `GoogleCloudRecommenderV1InsightTypeConfig`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Identifier. Name of insight type config. Eg, projects/\[PROJECT_NUMBER\]/locations/\[LOCATION\]/insightTypes/\[INSIGHT_TYPE_ID\]/config |
| `updateMask` | query | string (google-fieldmask) | no | The list of fields to be updated. |
| `validateOnly` | query | boolean | no | If true, validate the request and preview the change, but do not actually update it. |

### `recommender.organizations.locations.list`

- Versions: v1beta1
- `GET https://recommender.googleapis.com/v1beta1/{+name}/locations`
- Lists locations with recommendations or insights.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleCloudLocationListLocationsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The resource that owns the locations collection, if applicable. |
| `extraLocationTypes` | query | repeated string | no | Optional. Do not use this field unless explicitly documented otherwise. This is primarily for internal usage. |
| `filter` | query | string | no | A filter to narrow down results to a preferred subset. The filtering language accepts strings like `"displayName=tokyo"`, and is documented in more detail in AIP-160 (https://google.aip.dev/160). |
| `pageSize` | query | integer (int32) | no | The maximum number of results to return. If not set, the service selects a default. |
| `pageToken` | query | string | no | A page token received from the `next_page_token` field in the response. Send that page token to receive the subsequent page. |

### `recommender.organizations.locations.recommenders.getConfig`

- Versions: v1, v1beta1
- `GET https://recommender.googleapis.com/v1/{+name}`
- Gets the requested Recommender Config. There is only one instance of the config for each Recommender.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleCloudRecommenderV1RecommenderConfig`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the Recommendation Config to get. Acceptable formats: \* `projects/[PROJECT_NUMBER]/locations/[LOCATION]/recommenders/[RECOMMENDER_ID]/config` \* `projects/[PROJECT_ID]/locations/[LOCATION]/recommenders/[RECOMMENDER_ID]/config` \* `organizations/[ORGANIZATION_ID]/locations/[LOCATION]/recommenders/[RECOMMENDER_ID]/config` \* `billingAccounts/[BILLING_ACCOUNT_ID]/locations/[LOCATION]/recommenders/[RECOMMENDER_ID]/config` |

### `recommender.organizations.locations.recommenders.recommendations.get`

- Versions: v1, v1beta1
- `GET https://recommender.googleapis.com/v1/{+name}`
- Gets the requested recommendation. Requires the recommender.\*.get IAM permission for the specified recommender.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleCloudRecommenderV1Recommendation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the recommendation. |

### `recommender.organizations.locations.recommenders.recommendations.list`

- Versions: v1, v1beta1
- `GET https://recommender.googleapis.com/v1/{+parent}/recommendations`
- Lists recommendations for the specified Cloud Resource. Requires the recommender.\*.list IAM permission for the specified recommender.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleCloudRecommenderV1ListRecommendationsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The container resource on which to execute the request. Acceptable formats: \* `projects/[PROJECT_NUMBER]/locations/[LOCATION]/recommenders/[RECOMMENDER_ID]` \* `projects/[PROJECT_ID]/locations/[LOCATION]/recommenders/[RECOMMENDER_ID]` \* `billingAccounts/[BILLING_ACCOUNT_ID]/locations/[LOCATION]/recommenders/[RECOMMENDER_ID]` \* `folders/[FOLDER_ID]/locations/[LOCATION]/recommenders/[RECOMMENDER_ID]` \* `organizations/[ORGANIZATION_ID]/locations/[LOCATION]/recommenders/[RECOMMENDER_ID]` LOCATION here refers to GCP Locations: https://cloud.google.com/about/locations/ RECOMMENDER_ID refers to supported recommenders: https://cloud.google.com/recommender/docs/recommenders. |
| `filter` | query | string | no | Filter expression to restrict the recommendations returned. Supported filter fields: \* `state_info.state` \* `recommenderSubtype` \* `priority` \* `targetResources` Examples: \* `stateInfo.state = ACTIVE OR stateInfo.state = DISMISSED` \* `recommenderSubtype = REMOVE_ROLE OR recommenderSubtype = REPLACE_ROLE` \* `priority = P1 OR priority = P2` \* `targetResources : //compute.googleapis.com/projects/1234/zones/us-central1-a/instances/instance-1` \* `stateInfo.state = ACTIVE AND (priority = P1 OR priority = P2)` The max allowed filter length is 500 characters. (These expressions are based on the filter language described at https://google.aip.dev/160) |
| `pageSize` | query | integer (int32) | no | Optional. The maximum number of results to return from this request. Non-positive values are ignored. If not specified, the server will determine the number of results to return. |
| `pageToken` | query | string | no | Optional. If present, retrieves the next batch of results from the preceding call to this method. `page_token` must be the value of `next_page_token` from the previous response. The values of other method parameters must be identical to those in the previous call. |

### `recommender.organizations.locations.recommenders.recommendations.markClaimed`

- Versions: v1, v1beta1
- `POST https://recommender.googleapis.com/v1/{+name}:markClaimed`
- Marks the Recommendation State as Claimed. Users can use this method to indicate to the Recommender API that they are starting to apply the recommendation themselves. This stops the recommendation content from being updated. Associated insights are frozen and placed in the ACCEPTED state. MarkRecommendationClaimed can be applied to recommendations in CLAIMED, SUCCEEDED, FAILED, or ACTIVE state. Requires the recommender.\*.update IAM permission for the specified recommender.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `GoogleCloudRecommenderV1MarkRecommendationClaimedRequest`; Response: `GoogleCloudRecommenderV1Recommendation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the recommendation. |

### `recommender.organizations.locations.recommenders.recommendations.markDismissed`

- Versions: v1, v1beta1
- `POST https://recommender.googleapis.com/v1/{+name}:markDismissed`
- Mark the Recommendation State as Dismissed. Users can use this method to indicate to the Recommender API that an ACTIVE recommendation has to be marked back as DISMISSED. MarkRecommendationDismissed can be applied to recommendations in ACTIVE state. Requires the recommender.\*.update IAM permission for the specified recommender.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `GoogleCloudRecommenderV1MarkRecommendationDismissedRequest`; Response: `GoogleCloudRecommenderV1Recommendation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the recommendation. |

### `recommender.organizations.locations.recommenders.recommendations.markFailed`

- Versions: v1, v1beta1
- `POST https://recommender.googleapis.com/v1/{+name}:markFailed`
- Marks the Recommendation State as Failed. Users can use this method to indicate to the Recommender API that they have applied the recommendation themselves, and the operation failed. This stops the recommendation content from being updated. Associated insights are frozen and placed in the ACCEPTED state. MarkRecommendationFailed can be applied to recommendations in ACTIVE, CLAIMED, SUCCEEDED, or FAILED state. Requires the recommender.\*.update IAM permission for the specified recommender.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `GoogleCloudRecommenderV1MarkRecommendationFailedRequest`; Response: `GoogleCloudRecommenderV1Recommendation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the recommendation. |

### `recommender.organizations.locations.recommenders.recommendations.markSucceeded`

- Versions: v1, v1beta1
- `POST https://recommender.googleapis.com/v1/{+name}:markSucceeded`
- Marks the Recommendation State as Succeeded. Users can use this method to indicate to the Recommender API that they have applied the recommendation themselves, and the operation was successful. This stops the recommendation content from being updated. Associated insights are frozen and placed in the ACCEPTED state. MarkRecommendationSucceeded can be applied to recommendations in ACTIVE, CLAIMED, SUCCEEDED, or FAILED state. Requires the recommender.\*.update IAM permission for the specified recommender.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `GoogleCloudRecommenderV1MarkRecommendationSucceededRequest`; Response: `GoogleCloudRecommenderV1Recommendation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the recommendation. |

### `recommender.organizations.locations.recommenders.updateConfig`

- Versions: v1, v1beta1
- `PATCH https://recommender.googleapis.com/v1/{+name}`
- Updates a Recommender Config. This will create a new revision of the config.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `GoogleCloudRecommenderV1RecommenderConfig`; Response: `GoogleCloudRecommenderV1RecommenderConfig`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Identifier. Name of recommender config. Eg, projects/\[PROJECT_NUMBER\]/locations/\[LOCATION\]/recommenders/\[RECOMMENDER_ID\]/config |
| `updateMask` | query | string (google-fieldmask) | no | The list of fields to be updated. |
| `validateOnly` | query | boolean | no | If true, validate the request and preview the change, but do not actually update it. |

### `recommender.projects.locations.insightTypes.getConfig`

- Versions: v1, v1beta1
- `GET https://recommender.googleapis.com/v1/{+name}`
- Gets the requested InsightTypeConfig. There is only one instance of the config for each InsightType.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleCloudRecommenderV1InsightTypeConfig`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the InsightTypeConfig to get. Acceptable formats: \* `projects/[PROJECT_NUMBER]/locations/[LOCATION]/insightTypes/[INSIGHT_TYPE_ID]/config` \* `projects/[PROJECT_ID]/locations/[LOCATION]/insightTypes/[INSIGHT_TYPE_ID]/config` \* `organizations/[ORGANIZATION_ID]/locations/[LOCATION]/insightTypes/[INSIGHT_TYPE_ID]/config` \* `billingAccounts/[BILLING_ACCOUNT_ID]/locations/[LOCATION]/insightTypes/[INSIGHT_TYPE_ID]/config` |

### `recommender.projects.locations.insightTypes.insights.get`

- Versions: v1, v1beta1
- `GET https://recommender.googleapis.com/v1/{+name}`
- Gets the requested insight. Requires the recommender.\*.get IAM permission for the specified insight type.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleCloudRecommenderV1Insight`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the insight. |

### `recommender.projects.locations.insightTypes.insights.list`

- Versions: v1, v1beta1
- `GET https://recommender.googleapis.com/v1/{+parent}/insights`
- Lists insights for the specified Cloud Resource. Requires the recommender.\*.list IAM permission for the specified insight type.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleCloudRecommenderV1ListInsightsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The container resource on which to execute the request. Acceptable formats: \* `projects/[PROJECT_NUMBER]/locations/[LOCATION]/insightTypes/[INSIGHT_TYPE_ID]` \* `projects/[PROJECT_ID]/locations/[LOCATION]/insightTypes/[INSIGHT_TYPE_ID]` \* `billingAccounts/[BILLING_ACCOUNT_ID]/locations/[LOCATION]/insightTypes/[INSIGHT_TYPE_ID]` \* `folders/[FOLDER_ID]/locations/[LOCATION]/insightTypes/[INSIGHT_TYPE_ID]` \* `organizations/[ORGANIZATION_ID]/locations/[LOCATION]/insightTypes/[INSIGHT_TYPE_ID]` LOCATION here refers to GCP Locations: https://cloud.google.com/about/locations/ INSIGHT_TYPE_ID refers to supported insight types: https://cloud.google.com/recommender/docs/insights/insight-types. |
| `filter` | query | string | no | Optional. Filter expression to restrict the insights returned. Supported filter fields: \* `stateInfo.state` \* `insightSubtype` \* `severity` \* `targetResources` Examples: \* `stateInfo.state = ACTIVE OR stateInfo.state = DISMISSED` \* `insightSubtype = PERMISSIONS_USAGE` \* `severity = CRITICAL OR severity = HIGH` \* `targetResources : //compute.googleapis.com/projects/1234/zones/us-central1-a/instances/instance-1` \* `stateInfo.state = ACTIVE AND (severity = CRITICAL OR severity = HIGH)` The max allowed filter length is 500 characters. (These expressions are based on the filter language described at https://google.aip.dev/160) |
| `pageSize` | query | integer (int32) | no | Optional. The maximum number of results to return from this request. Non-positive values are ignored. If not specified, the server will determine the number of results to return. |
| `pageToken` | query | string | no | Optional. If present, retrieves the next batch of results from the preceding call to this method. `page_token` must be the value of `next_page_token` from the previous response. The values of other method parameters must be identical to those in the previous call. |

### `recommender.projects.locations.insightTypes.insights.markAccepted`

- Versions: v1, v1beta1
- `POST https://recommender.googleapis.com/v1/{+name}:markAccepted`
- Marks the Insight State as Accepted. Users can use this method to indicate to the Recommender API that they have applied some action based on the insight. This stops the insight content from being updated. MarkInsightAccepted can be applied to insights in ACTIVE state. Requires the recommender.\*.update IAM permission for the specified insight.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `GoogleCloudRecommenderV1MarkInsightAcceptedRequest`; Response: `GoogleCloudRecommenderV1Insight`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the insight. |

### `recommender.projects.locations.insightTypes.updateConfig`

- Versions: v1, v1beta1
- `PATCH https://recommender.googleapis.com/v1/{+name}`
- Updates an InsightTypeConfig change. This will create a new revision of the config.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `GoogleCloudRecommenderV1InsightTypeConfig`; Response: `GoogleCloudRecommenderV1InsightTypeConfig`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Identifier. Name of insight type config. Eg, projects/\[PROJECT_NUMBER\]/locations/\[LOCATION\]/insightTypes/\[INSIGHT_TYPE_ID\]/config |
| `updateMask` | query | string (google-fieldmask) | no | The list of fields to be updated. |
| `validateOnly` | query | boolean | no | If true, validate the request and preview the change, but do not actually update it. |

### `recommender.projects.locations.list`

- Versions: v1beta1
- `GET https://recommender.googleapis.com/v1beta1/{+name}/locations`
- Lists locations with recommendations or insights.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleCloudLocationListLocationsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The resource that owns the locations collection, if applicable. |
| `extraLocationTypes` | query | repeated string | no | Optional. Do not use this field unless explicitly documented otherwise. This is primarily for internal usage. |
| `filter` | query | string | no | A filter to narrow down results to a preferred subset. The filtering language accepts strings like `"displayName=tokyo"`, and is documented in more detail in AIP-160 (https://google.aip.dev/160). |
| `pageSize` | query | integer (int32) | no | The maximum number of results to return. If not set, the service selects a default. |
| `pageToken` | query | string | no | A page token received from the `next_page_token` field in the response. Send that page token to receive the subsequent page. |

### `recommender.projects.locations.recommenders.getConfig`

- Versions: v1, v1beta1
- `GET https://recommender.googleapis.com/v1/{+name}`
- Gets the requested Recommender Config. There is only one instance of the config for each Recommender.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleCloudRecommenderV1RecommenderConfig`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the Recommendation Config to get. Acceptable formats: \* `projects/[PROJECT_NUMBER]/locations/[LOCATION]/recommenders/[RECOMMENDER_ID]/config` \* `projects/[PROJECT_ID]/locations/[LOCATION]/recommenders/[RECOMMENDER_ID]/config` \* `organizations/[ORGANIZATION_ID]/locations/[LOCATION]/recommenders/[RECOMMENDER_ID]/config` \* `billingAccounts/[BILLING_ACCOUNT_ID]/locations/[LOCATION]/recommenders/[RECOMMENDER_ID]/config` |

### `recommender.projects.locations.recommenders.recommendations.get`

- Versions: v1, v1beta1
- `GET https://recommender.googleapis.com/v1/{+name}`
- Gets the requested recommendation. Requires the recommender.\*.get IAM permission for the specified recommender.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleCloudRecommenderV1Recommendation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the recommendation. |

### `recommender.projects.locations.recommenders.recommendations.list`

- Versions: v1, v1beta1
- `GET https://recommender.googleapis.com/v1/{+parent}/recommendations`
- Lists recommendations for the specified Cloud Resource. Requires the recommender.\*.list IAM permission for the specified recommender.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleCloudRecommenderV1ListRecommendationsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The container resource on which to execute the request. Acceptable formats: \* `projects/[PROJECT_NUMBER]/locations/[LOCATION]/recommenders/[RECOMMENDER_ID]` \* `projects/[PROJECT_ID]/locations/[LOCATION]/recommenders/[RECOMMENDER_ID]` \* `billingAccounts/[BILLING_ACCOUNT_ID]/locations/[LOCATION]/recommenders/[RECOMMENDER_ID]` \* `folders/[FOLDER_ID]/locations/[LOCATION]/recommenders/[RECOMMENDER_ID]` \* `organizations/[ORGANIZATION_ID]/locations/[LOCATION]/recommenders/[RECOMMENDER_ID]` LOCATION here refers to GCP Locations: https://cloud.google.com/about/locations/ RECOMMENDER_ID refers to supported recommenders: https://cloud.google.com/recommender/docs/recommenders. |
| `filter` | query | string | no | Filter expression to restrict the recommendations returned. Supported filter fields: \* `state_info.state` \* `recommenderSubtype` \* `priority` \* `targetResources` Examples: \* `stateInfo.state = ACTIVE OR stateInfo.state = DISMISSED` \* `recommenderSubtype = REMOVE_ROLE OR recommenderSubtype = REPLACE_ROLE` \* `priority = P1 OR priority = P2` \* `targetResources : //compute.googleapis.com/projects/1234/zones/us-central1-a/instances/instance-1` \* `stateInfo.state = ACTIVE AND (priority = P1 OR priority = P2)` The max allowed filter length is 500 characters. (These expressions are based on the filter language described at https://google.aip.dev/160) |
| `pageSize` | query | integer (int32) | no | Optional. The maximum number of results to return from this request. Non-positive values are ignored. If not specified, the server will determine the number of results to return. |
| `pageToken` | query | string | no | Optional. If present, retrieves the next batch of results from the preceding call to this method. `page_token` must be the value of `next_page_token` from the previous response. The values of other method parameters must be identical to those in the previous call. |

### `recommender.projects.locations.recommenders.recommendations.markClaimed`

- Versions: v1, v1beta1
- `POST https://recommender.googleapis.com/v1/{+name}:markClaimed`
- Marks the Recommendation State as Claimed. Users can use this method to indicate to the Recommender API that they are starting to apply the recommendation themselves. This stops the recommendation content from being updated. Associated insights are frozen and placed in the ACCEPTED state. MarkRecommendationClaimed can be applied to recommendations in CLAIMED, SUCCEEDED, FAILED, or ACTIVE state. Requires the recommender.\*.update IAM permission for the specified recommender.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `GoogleCloudRecommenderV1MarkRecommendationClaimedRequest`; Response: `GoogleCloudRecommenderV1Recommendation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the recommendation. |

### `recommender.projects.locations.recommenders.recommendations.markDismissed`

- Versions: v1, v1beta1
- `POST https://recommender.googleapis.com/v1/{+name}:markDismissed`
- Mark the Recommendation State as Dismissed. Users can use this method to indicate to the Recommender API that an ACTIVE recommendation has to be marked back as DISMISSED. MarkRecommendationDismissed can be applied to recommendations in ACTIVE state. Requires the recommender.\*.update IAM permission for the specified recommender.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `GoogleCloudRecommenderV1MarkRecommendationDismissedRequest`; Response: `GoogleCloudRecommenderV1Recommendation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the recommendation. |

### `recommender.projects.locations.recommenders.recommendations.markFailed`

- Versions: v1, v1beta1
- `POST https://recommender.googleapis.com/v1/{+name}:markFailed`
- Marks the Recommendation State as Failed. Users can use this method to indicate to the Recommender API that they have applied the recommendation themselves, and the operation failed. This stops the recommendation content from being updated. Associated insights are frozen and placed in the ACCEPTED state. MarkRecommendationFailed can be applied to recommendations in ACTIVE, CLAIMED, SUCCEEDED, or FAILED state. Requires the recommender.\*.update IAM permission for the specified recommender.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `GoogleCloudRecommenderV1MarkRecommendationFailedRequest`; Response: `GoogleCloudRecommenderV1Recommendation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the recommendation. |

### `recommender.projects.locations.recommenders.recommendations.markSucceeded`

- Versions: v1, v1beta1
- `POST https://recommender.googleapis.com/v1/{+name}:markSucceeded`
- Marks the Recommendation State as Succeeded. Users can use this method to indicate to the Recommender API that they have applied the recommendation themselves, and the operation was successful. This stops the recommendation content from being updated. Associated insights are frozen and placed in the ACCEPTED state. MarkRecommendationSucceeded can be applied to recommendations in ACTIVE, CLAIMED, SUCCEEDED, or FAILED state. Requires the recommender.\*.update IAM permission for the specified recommender.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `GoogleCloudRecommenderV1MarkRecommendationSucceededRequest`; Response: `GoogleCloudRecommenderV1Recommendation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the recommendation. |

### `recommender.projects.locations.recommenders.updateConfig`

- Versions: v1, v1beta1
- `PATCH https://recommender.googleapis.com/v1/{+name}`
- Updates a Recommender Config. This will create a new revision of the config.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `GoogleCloudRecommenderV1RecommenderConfig`; Response: `GoogleCloudRecommenderV1RecommenderConfig`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Identifier. Name of recommender config. Eg, projects/\[PROJECT_NUMBER\]/locations/\[LOCATION\]/recommenders/\[RECOMMENDER_ID\]/config |
| `updateMask` | query | string (google-fieldmask) | no | The list of fields to be updated. |
| `validateOnly` | query | boolean | no | If true, validate the request and preview the change, but do not actually update it. |

### `recommender.recommenders.list`

- Versions: v1beta1
- `GET https://recommender.googleapis.com/v1beta1/recommenders`
- Lists all available Recommenders. No IAM permissions are required.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleCloudRecommenderV1beta1ListRecommendersResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `pageSize` | query | integer (int32) | no | Optional. The number of RecommenderTypes to return per page. The service may return fewer than this value. |
| `pageToken` | query | string | no | Optional. A page token, received from a previous `ListRecommenders` call. Provide this to retrieve the subsequent page. |

### Example request skeleton

Generated from the Discovery entry of `recommender.billingAccounts.locations.insightTypes.getConfig` (not in the official docs); replace the `{...}` path variables (URL-encode query values):

```bash
curl -X GET \
  -H "Authorization: Bearer $(gcloud auth print-access-token)" \
  "https://recommender.googleapis.com/v1/{+name}"
```

## Notes

- Generated from the Discovery document(s) v1, v1beta1 of `recommender` (retrieved 2026-11-14). Resources on this page: billingAccounts, folders, insightTypes, organizations, projects, recommenders.
- The Required column is `yes` for path variables and required parameters, and `conditional` when the description says "Required if ..." (mutually exclusive alternatives) or when a `parent.child` parameter is required only inside an optional parent message or one branch of a oneof.
- Message schemas are listed under `references/rest-schemas/recommender/`.
- Source: https://recommender.googleapis.com/$discovery/rest?version=v1, https://recommender.googleapis.com/$discovery/rest?version=v1beta1 (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
