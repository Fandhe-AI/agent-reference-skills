---
source: https://recommender.googleapis.com/$discovery/rest?version=v1
---

# Recommender API message schemas (recommender)

## Signature / Usage

Message types referenced by the methods listed under `references/rest/recommender/`.

### `CloudRecommendationsRecommendersDatabasesV1ContentChunk`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `table` | CloudRecommendationsRecommendersDatabasesV1Table | Table with headers and rows content for the content chunk. |

### `CloudRecommendationsRecommendersDatabasesV1CtaConfig`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `isPrimary` | boolean | — |
| `label` | string enum | Enum used to map to the string to be shown in the UI for the button. |
| `redirectPage` | string enum | — |

### `CloudRecommendationsRecommendersDatabasesV1DatabasesPresentationConfig`

- Presentational config that maps to the UI components of templatized issue subtasks.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `ctaConfigs` | array<CloudRecommendationsRecommendersDatabasesV1CtaConfig> | Call to action buttons for the issue. |
| `issueContentChunks` | array<CloudRecommendationsRecommendersDatabasesV1ContentChunk> | Content chunks for the issue. |
| `issueDescription` | CloudRecommendationsRecommendersDatabasesV1Description | Issue description for the issue. |
| `issueTableFields` | array<CloudRecommendationsRecommendersDatabasesV1TableField> | Fields for the table containing metadata associated with the issue. |
| `nextStepsContentChunks` | array<CloudRecommendationsRecommendersDatabasesV1ContentChunk> | Content chunks for the next steps. |
| `nextStepsDescription` | CloudRecommendationsRecommendersDatabasesV1Description | Next steps description for the issue. |
| `nextStepsTableFields` | array<CloudRecommendationsRecommendersDatabasesV1TableField> | Fields for the table containing metadata associated with the next steps. |
| `playbookLinks` | array<CloudRecommendationsRecommendersDatabasesV1PlaybookLink> | Playbook links for the issue. |

### `CloudRecommendationsRecommendersDatabasesV1Description`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `descriptionEnum` | string enum | Enum used to map to the html template to be shown in the UI. |

### `CloudRecommendationsRecommendersDatabasesV1Link`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `label` | string | String label for the link. This value is not translated |
| `redirectPage` | string enum | Enum used to map to the redirect page for the link. |
| `resourceName` | string | Resource name for the table cell. This is used to construct the link. |

### `CloudRecommendationsRecommendersDatabasesV1PlaybookLink`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `label` | string enum | Enum used to map to the string to be shown in the UI for the link. |
| `link` | string | — |

### `CloudRecommendationsRecommendersDatabasesV1SimpleValue`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `enumValue` | string enum | Enum value for the table cell. This should be used when value MUST be translated and represents common status/field like Enabled, Disabled, Success, Failure, etc. |
| `linkValue` | CloudRecommendationsRecommendersDatabasesV1Link | Link value for the table cell. |
| `numberValue` | number (double) | Number value for the table cell. |
| `stringValue` | string | String value for the table cell. This should be used when value doesn't need to be translated. |
| `timestampValue` | string (google-datetime) | Timestamp value for the table cell. |

### `CloudRecommendationsRecommendersDatabasesV1Table`

- Field for adding custom complex table
- Version: v1

| Field | Type | Description |
|---|---|---|
| `headers` | array<string> | Headers for the table. IMPORTANT: Each header defines a column and its title. All Headers must be unique and shouldn't be used more than once within the same list. |
| `rows` | array<CloudRecommendationsRecommendersDatabasesV1TableRow> | Rows for the table. Ensure that the order of the cells in the row matches the order of the headers. |

### `CloudRecommendationsRecommendersDatabasesV1TableField`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `key` | string enum | Enum used to map to the string to be shown in the UI for the field. |
| `numberValue` | number (double) | Number value for the table field. |
| `stringValue` | string | String value for the table field. Note that this string won't be translated. It is advised to provide values that don't require translation. |
| `timestampValue` | string (google-datetime) | Timestamp value for the table field. Timestamp will be shown in the user's timezone with the format: "Feb 27, 2009 3:22:54 PM". |

### `CloudRecommendationsRecommendersDatabasesV1TableRow`

- Table row for a table
- Version: v1

| Field | Type | Description |
|---|---|---|
| `cells` | array<CloudRecommendationsRecommendersDatabasesV1SimpleValue> | Table cells for the table row. |

### `GoogleCloudLocationListLocationsResponse`

- The response message for Locations.ListLocations.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `locations` | array<GoogleCloudLocationLocation> | A list of locations that matches the specified filter in the request. |
| `nextPageToken` | string | The standard List next-page token. |

### `GoogleCloudLocationLocation`

- A resource that represents a Google Cloud location.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `displayName` | string | The friendly name for this location, typically a nearby city name. For example, "Tokyo". |
| `labels` | object | Cross-service attributes for the location. For example {"cloud.googleapis.com/region": "us-east1"} |
| `locationId` | string | The canonical id for this location. For example: `"us-east1"`. |
| `metadata` | object | Service-specific metadata. For example the available capacity at the given location. |
| `name` | string | Resource name for the location, which may vary between implementations. For example: `"projects/example-project/locations/us-east1"` |

### `GoogleCloudRecommenderV1CostProjection`

- Contains metadata about how much money a recommendation can save or incur.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `cost` | GoogleTypeMoney | An approximate projection on amount saved or amount incurred. Negative cost units indicate cost savings and positive cost units indicate increase. See google.type.Money documentation for positive/negative units. A user's permissions may affect whether the cost is computed using list prices or custom contract prices. |
| `costInLocalCurrency` | GoogleTypeMoney | The approximate cost savings in the billing account's local currency. |
| `duration` | string (google-duration) | Duration for which this cost applies. |

### `GoogleCloudRecommenderV1Impact`

- Contains the impact a recommendation can have for a given category.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `category` | string enum | Category that is being targeted. |
| `costProjection` | GoogleCloudRecommenderV1CostProjection | Use with CategoryType.COST |
| `reliabilityProjection` | GoogleCloudRecommenderV1ReliabilityProjection | Use with CategoryType.RELIABILITY |
| `securityProjection` | GoogleCloudRecommenderV1SecurityProjection | Use with CategoryType.SECURITY |
| `service` | string | The service that this impact is associated with. |
| `sustainabilityProjection` | GoogleCloudRecommenderV1SustainabilityProjection | Use with CategoryType.SUSTAINABILITY |

### `GoogleCloudRecommenderV1Insight`

- An insight along with the information used to derive the insight. The insight may have associated recommendations as well.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `associatedRecommendations` | array<GoogleCloudRecommenderV1InsightRecommendationReference> | Recommendations derived from this insight. |
| `category` | string enum | Category being targeted by the insight. |
| `content` | object | A struct of custom fields to explain the insight. Example: "grantedPermissionsCount": "1000" |
| `description` | string | Free-form human readable summary in English. The maximum length is 500 characters. |
| `etag` | string | Fingerprint of the Insight. Provides optimistic locking when updating states. |
| `insightSubtype` | string | Insight subtype. Insight content schema will be stable for a given subtype. |
| `lastRefreshTime` | string (google-datetime) | Timestamp of the latest data used to generate the insight. |
| `name` | string | Identifier. Name of the insight. |
| `observationPeriod` | string (google-duration) | Observation period that led to the insight. The source data used to generate the insight ends at last_refresh_time and begins at (last_refresh_time - observation_period). |
| `severity` | string enum | Insight's severity. |
| `stateInfo` | GoogleCloudRecommenderV1InsightStateInfo | Information state and metadata. |
| `targetResources` | array<string> | Fully qualified resource names that this insight is targeting. |

### `GoogleCloudRecommenderV1InsightRecommendationReference`

- Reference to an associated recommendation.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `recommendation` | string | Recommendation resource name, e.g. projects/\[PROJECT_NUMBER\]/locations/\[LOCATION\]/recommenders/\[RECOMMENDER_ID\]/recommendations/\[RECOMMENDATION_ID\] |

### `GoogleCloudRecommenderV1InsightStateInfo`

- Information related to insight state.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `state` | string enum | Insight state. |
| `stateMetadata` | object | A map of metadata for the state, provided by user or automations systems. |

### `GoogleCloudRecommenderV1InsightTypeConfig`

- Configuration for an InsightType.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `annotations` | object | Allows clients to store small amounts of arbitrary data. Annotations must follow the Kubernetes syntax. The total size of all keys and values combined is limited to 256k. Key can have 2 segments: prefix (optional) and name (required), separated by a slash (/). Prefix must be a DNS subdomain. Name must be 63 characters or less, begin and end with alphanumerics, with dashes (-), underscores (\_), dots (.), and alphanumerics between. |
| `displayName` | string | A user-settable field to provide a human-readable name to be used in user interfaces. |
| `etag` | string | Fingerprint of the InsightTypeConfig. Provides optimistic locking when updating. |
| `insightTypeGenerationConfig` | GoogleCloudRecommenderV1InsightTypeGenerationConfig | InsightTypeGenerationConfig which configures the generation of insights for this insight type. |
| `name` | string | Identifier. Name of insight type config. Eg, projects/\[PROJECT_NUMBER\]/locations/\[LOCATION\]/insightTypes/\[INSIGHT_TYPE_ID\]/config |
| `revisionId` | string | Output only. Immutable. The revision ID of the config. A new revision is committed whenever the config is changed in any way. The format is an 8-character hexadecimal string. |
| `updateTime` | string (google-datetime) | Last time when the config was updated. |

### `GoogleCloudRecommenderV1InsightTypeGenerationConfig`

- A configuration to customize the generation of insights. Eg, customizing the lookback period considered when generating a insight.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `params` | object | Parameters for this InsightTypeGenerationConfig. These configs can be used by or are applied to all subtypes. |

### `GoogleCloudRecommenderV1ListInsightsResponse`

- Response to the `ListInsights` method.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `insights` | array<GoogleCloudRecommenderV1Insight> | The set of insights for the `parent` resource. |
| `nextPageToken` | string | A token that can be used to request the next page of results. This field is empty if there are no additional results. |

### `GoogleCloudRecommenderV1ListRecommendationsResponse`

- Response to the `ListRecommendations` method.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | A token that can be used to request the next page of results. This field is empty if there are no additional results. |
| `recommendations` | array<GoogleCloudRecommenderV1Recommendation> | The set of recommendations for the `parent` resource. |

### `GoogleCloudRecommenderV1MarkInsightAcceptedRequest`

- Request for the `MarkInsightAccepted` method.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `etag` | string | Required. Fingerprint of the Insight. Provides optimistic locking. |
| `stateMetadata` | object | Optional. State properties user wish to include with this state. Full replace of the current state_metadata. |

### `GoogleCloudRecommenderV1MarkRecommendationClaimedRequest`

- Request for the `MarkRecommendationClaimed` Method.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `etag` | string | Required. Fingerprint of the Recommendation. Provides optimistic locking. |
| `stateMetadata` | object | State properties to include with this state. Overwrites any existing `state_metadata`. Keys must match the regex `/^a-z0-9{0,62}$/`. Values must match the regex `/^[a-zA-Z0-9_./-]{0,255}$/`. |

### `GoogleCloudRecommenderV1MarkRecommendationDismissedRequest`

- Request for the `MarkRecommendationDismissed` Method.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `etag` | string | Fingerprint of the Recommendation. Provides optimistic locking. |

### `GoogleCloudRecommenderV1MarkRecommendationFailedRequest`

- Request for the `MarkRecommendationFailed` Method.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `etag` | string | Required. Fingerprint of the Recommendation. Provides optimistic locking. |
| `stateMetadata` | object | State properties to include with this state. Overwrites any existing `state_metadata`. Keys must match the regex `/^a-z0-9{0,62}$/`. Values must match the regex `/^[a-zA-Z0-9_./-]{0,255}$/`. |

### `GoogleCloudRecommenderV1MarkRecommendationSucceededRequest`

- Request for the `MarkRecommendationSucceeded` Method.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `etag` | string | Required. Fingerprint of the Recommendation. Provides optimistic locking. |
| `stateMetadata` | object | State properties to include with this state. Overwrites any existing `state_metadata`. Keys must match the regex `/^a-z0-9{0,62}$/`. Values must match the regex `/^[a-zA-Z0-9_./-]{0,255}$/`. |

### `GoogleCloudRecommenderV1Operation`

- Contains an operation for a resource loosely based on the JSON-PATCH format with support for: \* Custom filters for describing partial array patch. \* Extended path values for describing nested arrays. \* Custom fields for describing the resource for which the operation is being described. \* Allows extension to custom operations not natively supported by RFC6902. See https://tools.ietf.org/html/rfc6902 for details on the original RFC.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `action` | string | Type of this operation. Contains one of 'add', 'remove', 'replace', 'move', 'copy', 'test' and custom operations. This field is case-insensitive and always populated. |
| `path` | string | Path to the target field being operated on. If the operation is at the resource level, then path should be "/". This field is always populated. |
| `pathFilters` | object | Set of filters to apply if `path` refers to array elements or nested array elements in order to narrow down to a single unique element that is being tested/modified. This is intended to be an exact match per filter. To perform advanced matching, use path_value_matchers. \* Example: { "/versions/\*/name" : "it-123" "/versions/\*/targetSize/percent": 20 } \* Example: { "/bindings/\*/role": "roles/owner" "/bindings/\*/condition" : null } \* Example: { "/bindings/\*/role": "roles/owner" "/bindings/\*/members/\*" : \["x@example.com", "y@example.com"\] } When both path_filters and path_value_matchers are set, an implicit AND must be performed. |
| `pathValueMatchers` | object | Similar to path_filters, this contains set of filters to apply if `path` field refers to array elements. This is meant to support value matching beyond exact match. To perform exact match, use path_filters. When both path_filters and path_value_matchers are set, an implicit AND must be performed. |
| `resource` | string | Contains the fully qualified resource name. This field is always populated. ex: //cloudresourcemanager.googleapis.com/projects/foo. |
| `resourceType` | string | Type of GCP resource being modified/tested. This field is always populated. Example: cloudresourcemanager.googleapis.com/Project, compute.googleapis.com/Instance |
| `sourcePath` | string | Can be set with action 'copy' or 'move' to indicate the source field within resource or source_resource, ignored if provided for other operation types. |
| `sourceResource` | string | Can be set with action 'copy' to copy resource configuration across different resources of the same type. Example: A resource clone can be done via action = 'copy', path = "/", from = "/", source_resource = and resource_name = . This field is empty for all other values of `action`. |
| `value` | any | Value for the `path` field. Will be set for actions:'add'/'replace'. Maybe set for action: 'test'. Either this or `value_matcher` will be set for 'test' operation. An exact match must be performed. |
| `valueMatcher` | GoogleCloudRecommenderV1ValueMatcher | Can be set for action 'test' for advanced matching for the value of 'path' field. Either this or `value` will be set for 'test' operation. |

### `GoogleCloudRecommenderV1OperationGroup`

- Group of operations that need to be performed atomically.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `operations` | array<GoogleCloudRecommenderV1Operation> | List of operations across one or more resources that belong to this group. Loosely based on RFC6902 and should be performed in the order they appear. |

### `GoogleCloudRecommenderV1Recommendation`

- A recommendation along with a suggested action. E.g., a rightsizing recommendation for an underutilized VM, IAM role recommendations, etc
- Version: v1

| Field | Type | Description |
|---|---|---|
| `additionalImpact` | array<GoogleCloudRecommenderV1Impact> | Optional set of additional impact that this recommendation may have when trying to optimize for the primary category. These may be positive or negative. |
| `associatedInsights` | array<GoogleCloudRecommenderV1RecommendationInsightReference> | Insights that led to this recommendation. |
| `content` | GoogleCloudRecommenderV1RecommendationContent | Content of the recommendation describing recommended changes to resources. |
| `description` | string | Free-form human readable summary in English. The maximum length is 500 characters. |
| `etag` | string | Fingerprint of the Recommendation. Provides optimistic locking when updating states. |
| `lastRefreshTime` | string (google-datetime) | Last time this recommendation was refreshed by the system that created it in the first place. |
| `name` | string | Identifier. Name of recommendation. |
| `primaryImpact` | GoogleCloudRecommenderV1Impact | The primary impact that this recommendation can have while trying to optimize for one category. |
| `priority` | string enum | Recommendation's priority. |
| `recommenderSubtype` | string | Contains an identifier for a subtype of recommendations produced for the same recommender. Subtype is a function of content and impact, meaning a new subtype might be added when significant changes to `content` or `primary_impact.category` are introduced. See the Recommenders section to see a list of subtypes for a given Recommender. Examples: For recommender = "google.iam.policy.Recommender", recommender_subtype can be one of "REMOVE_ROLE"/"REPLACE_ROLE" |
| `stateInfo` | GoogleCloudRecommenderV1RecommendationStateInfo | Information for state. Contains state and metadata. |
| `targetResources` | array<string> | Fully qualified resource names that this recommendation is targeting. |
| `xorGroupId` | string | Corresponds to a mutually exclusive group ID within a recommender. A non-empty ID indicates that the recommendation belongs to a mutually exclusive group. This means that only one recommendation within the group is suggested to be applied. |

### `GoogleCloudRecommenderV1RecommendationContent`

- Contains what resources are changing and how they are changing.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `operationGroups` | array<GoogleCloudRecommenderV1OperationGroup> | Operations to one or more Google Cloud resources grouped in such a way that, all operations within one group are expected to be performed atomically and in an order. |
| `overview` | object | Condensed overview information about the recommendation. |

### `GoogleCloudRecommenderV1RecommendationInsightReference`

- Reference to an associated insight.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `insight` | string | Insight resource name, e.g. projects/\[PROJECT_NUMBER\]/locations/\[LOCATION\]/insightTypes/\[INSIGHT_TYPE_ID\]/insights/\[INSIGHT_ID\] |

### `GoogleCloudRecommenderV1RecommendationStateInfo`

- Information for state. Contains state and metadata.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `state` | string enum | The state of the recommendation, Eg ACTIVE, SUCCEEDED, FAILED. |
| `stateMetadata` | object | A map of metadata for the state, provided by user or automations systems. |

### `GoogleCloudRecommenderV1RecommenderConfig`

- Configuration for a Recommender.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `annotations` | object | Allows clients to store small amounts of arbitrary data. Annotations must follow the Kubernetes syntax. The total size of all keys and values combined is limited to 256k. Key can have 2 segments: prefix (optional) and name (required), separated by a slash (/). Prefix must be a DNS subdomain. Name must be 63 characters or less, begin and end with alphanumerics, with dashes (-), underscores (\_), dots (.), and alphanumerics between. |
| `displayName` | string | A user-settable field to provide a human-readable name to be used in user interfaces. |
| `etag` | string | Fingerprint of the RecommenderConfig. Provides optimistic locking when updating. |
| `name` | string | Identifier. Name of recommender config. Eg, projects/\[PROJECT_NUMBER\]/locations/\[LOCATION\]/recommenders/\[RECOMMENDER_ID\]/config |
| `recommenderGenerationConfig` | GoogleCloudRecommenderV1RecommenderGenerationConfig | RecommenderGenerationConfig which configures the Generation of recommendations for this recommender. |
| `revisionId` | string | Output only. Immutable. The revision ID of the config. A new revision is committed whenever the config is changed in any way. The format is an 8-character hexadecimal string. |
| `updateTime` | string (google-datetime) | Last time when the config was updated. |

### `GoogleCloudRecommenderV1RecommenderGenerationConfig`

- A Configuration to customize the generation of recommendations. Eg, customizing the lookback period considered when generating a recommendation.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `params` | object | Parameters for this RecommenderGenerationConfig. These configs can be used by or are applied to all subtypes. |

### `GoogleCloudRecommenderV1ReliabilityProjection`

- Contains information on the impact of a reliability recommendation.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `details` | object | Per-recommender projection. |
| `risks` | array<string> | Reliability risks mitigated by this recommendation. |

### `GoogleCloudRecommenderV1SecurityProjection`

- Contains various ways of describing the impact on Security.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `details` | object | Additional security impact details that is provided by the recommender. |

### `GoogleCloudRecommenderV1SustainabilityProjection`

- Contains metadata about how much sustainability a recommendation can save or incur.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `duration` | string (google-duration) | Duration for which this sustainability applies. |
| `kgCO2e` | number (double) | Carbon Footprint generated in kg of CO2 equivalent. Chose kg_c_o2e so that the name renders correctly in camelCase (kgCO2e). |

### `GoogleCloudRecommenderV1ValueMatcher`

- Contains various matching options for values for a GCP resource field.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `matchesPattern` | string | To be used for full regex matching. The regular expression is using the Google RE2 syntax (https://github.com/google/re2/wiki/Syntax), so to be used with RE2::FullMatch |

### `GoogleCloudRecommenderV1beta1CostProjection`

- Contains metadata about how much money a recommendation can save or incur.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `cost` | GoogleTypeMoney | An approximate projection on amount saved or amount incurred. Negative cost units indicate cost savings and positive cost units indicate increase. See google.type.Money documentation for positive/negative units. A user's permissions may affect whether the cost is computed using list prices or custom contract prices. |
| `costInLocalCurrency` | GoogleTypeMoney | The approximate cost savings in the billing account's local currency. |
| `duration` | string (google-duration) | Duration for which this cost applies. |
| `pricingType` | string enum | How the cost is calculated. |

### `GoogleCloudRecommenderV1beta1Impact`

- Contains the impact a recommendation can have for a given category.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `category` | string enum | Category that is being targeted. |
| `costProjection` | GoogleCloudRecommenderV1beta1CostProjection | Use with CategoryType.COST |
| `reliabilityProjection` | GoogleCloudRecommenderV1beta1ReliabilityProjection | Use with CategoryType.RELIABILITY |
| `securityProjection` | GoogleCloudRecommenderV1beta1SecurityProjection | Use with CategoryType.SECURITY |
| `service` | string | The service that this impact is associated with. |
| `sustainabilityProjection` | GoogleCloudRecommenderV1beta1SustainabilityProjection | Use with CategoryType.SUSTAINABILITY |

### `GoogleCloudRecommenderV1beta1Insight`

- An insight along with the information used to derive the insight. The insight may have associated recommendations as well.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `associatedRecommendations` | array<GoogleCloudRecommenderV1beta1InsightRecommendationReference> | Recommendations derived from this insight. |
| `category` | string enum | Category being targeted by the insight. |
| `content` | object | A struct of custom fields to explain the insight. Example: "grantedPermissionsCount": "1000" |
| `description` | string | Free-form human readable summary in English. The maximum length is 500 characters. |
| `etag` | string | Fingerprint of the Insight. Provides optimistic locking when updating states. |
| `insightSubtype` | string | Insight subtype. Insight content schema will be stable for a given subtype. |
| `lastRefreshTime` | string (google-datetime) | Timestamp of the latest data used to generate the insight. |
| `name` | string | Identifier. Name of the insight. |
| `observationPeriod` | string (google-duration) | Observation period that led to the insight. The source data used to generate the insight ends at last_refresh_time and begins at (last_refresh_time - observation_period). |
| `severity` | string enum | Insight's severity. |
| `stateInfo` | GoogleCloudRecommenderV1beta1InsightStateInfo | Information state and metadata. |
| `targetResources` | array<string> | Fully qualified resource names that this insight is targeting. |

### `GoogleCloudRecommenderV1beta1InsightRecommendationReference`

- Reference to an associated recommendation.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `recommendation` | string | Recommendation resource name, e.g. projects/\[PROJECT_NUMBER\]/locations/\[LOCATION\]/recommenders/\[RECOMMENDER_ID\]/recommendations/\[RECOMMENDATION_ID\] |

### `GoogleCloudRecommenderV1beta1InsightStateInfo`

- Information related to insight state.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `state` | string enum | Insight state. |
| `stateMetadata` | object | A map of metadata for the state, provided by user or automations systems. |

### `GoogleCloudRecommenderV1beta1InsightType`

- The type of insight.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `name` | string | The insight_type's name in format insightTypes/{insight_type} eg: insightTypes/google.iam.policy.Insight |

### `GoogleCloudRecommenderV1beta1InsightTypeConfig`

- Configuration for an InsightType.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `annotations` | object | Allows clients to store small amounts of arbitrary data. Annotations must follow the Kubernetes syntax. The total size of all keys and values combined is limited to 256k. Key can have 2 segments: prefix (optional) and name (required), separated by a slash (/). Prefix must be a DNS subdomain. Name must be 63 characters or less, begin and end with alphanumerics, with dashes (-), underscores (\_), dots (.), and alphanumerics between. |
| `displayName` | string | A user-settable field to provide a human-readable name to be used in user interfaces. |
| `etag` | string | Fingerprint of the InsightTypeConfig. Provides optimistic locking when updating. |
| `insightTypeGenerationConfig` | GoogleCloudRecommenderV1beta1InsightTypeGenerationConfig | InsightTypeGenerationConfig which configures the generation of insights for this insight type. |
| `name` | string | Identifier. Name of insight type config. Eg, projects/\[PROJECT_NUMBER\]/locations/\[LOCATION\]/insightTypes/\[INSIGHT_TYPE_ID\]/config |
| `revisionId` | string | Output only. Immutable. The revision ID of the config. A new revision is committed whenever the config is changed in any way. The format is an 8-character hexadecimal string. |
| `updateTime` | string (google-datetime) | Last time when the config was updated. |

### `GoogleCloudRecommenderV1beta1InsightTypeGenerationConfig`

- A configuration to customize the generation of insights. Eg, customizing the lookback period considered when generating a insight.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `params` | object | Parameters for this InsightTypeGenerationConfig. These configs can be used by or are applied to all subtypes. |

### `GoogleCloudRecommenderV1beta1ListInsightTypesResponse`

- Response for the `ListInsightTypes` method. Next ID: 3
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `insightTypes` | array<GoogleCloudRecommenderV1beta1InsightType> | The set of recommenders available |
| `nextPageToken` | string | A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. |

### `GoogleCloudRecommenderV1beta1ListInsightsResponse`

- Response to the `ListInsights` method.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `insights` | array<GoogleCloudRecommenderV1beta1Insight> | The set of insights for the `parent` resource. |
| `nextPageToken` | string | A token that can be used to request the next page of results. This field is empty if there are no additional results. |

### `GoogleCloudRecommenderV1beta1ListRecommendationsResponse`

- Response to the `ListRecommendations` method.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | A token that can be used to request the next page of results. This field is empty if there are no additional results. |
| `recommendations` | array<GoogleCloudRecommenderV1beta1Recommendation> | The set of recommendations for the `parent` resource. |

### `GoogleCloudRecommenderV1beta1ListRecommendersResponse`

- Response for the `ListRecommender` method. Next ID: 3
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. |
| `recommenders` | array<GoogleCloudRecommenderV1beta1RecommenderType> | The set of recommenders available |

### `GoogleCloudRecommenderV1beta1MarkInsightAcceptedRequest`

- Request for the `MarkInsightAccepted` method.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `etag` | string | Required. Fingerprint of the Insight. Provides optimistic locking. |
| `stateMetadata` | object | Optional. State properties user wish to include with this state. Full replace of the current state_metadata. |

### `GoogleCloudRecommenderV1beta1MarkRecommendationClaimedRequest`

- Request for the `MarkRecommendationClaimed` Method.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `etag` | string | Required. Fingerprint of the Recommendation. Provides optimistic locking. |
| `stateMetadata` | object | State properties to include with this state. Overwrites any existing `state_metadata`. Keys must match the regex `/^a-z0-9{0,62}$/`. Values must match the regex `/^[a-zA-Z0-9_./-]{0,255}$/`. |

### `GoogleCloudRecommenderV1beta1MarkRecommendationDismissedRequest`

- Request for the `MarkRecommendationDismissed` Method.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `etag` | string | Fingerprint of the Recommendation. Provides optimistic locking. |

### `GoogleCloudRecommenderV1beta1MarkRecommendationFailedRequest`

- Request for the `MarkRecommendationFailed` Method.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `etag` | string | Required. Fingerprint of the Recommendation. Provides optimistic locking. |
| `stateMetadata` | object | State properties to include with this state. Overwrites any existing `state_metadata`. Keys must match the regex `/^a-z0-9{0,62}$/`. Values must match the regex `/^[a-zA-Z0-9_./-]{0,255}$/`. |

### `GoogleCloudRecommenderV1beta1MarkRecommendationSucceededRequest`

- Request for the `MarkRecommendationSucceeded` Method.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `etag` | string | Required. Fingerprint of the Recommendation. Provides optimistic locking. |
| `stateMetadata` | object | State properties to include with this state. Overwrites any existing `state_metadata`. Keys must match the regex `/^a-z0-9{0,62}$/`. Values must match the regex `/^[a-zA-Z0-9_./-]{0,255}$/`. |

### `GoogleCloudRecommenderV1beta1Operation`

- Contains an operation for a resource loosely based on the JSON-PATCH format with support for: \* Custom filters for describing partial array patch. \* Extended path values for describing nested arrays. \* Custom fields for describing the resource for which the operation is being described. \* Allows extension to custom operations not natively supported by RFC6902. See https://tools.ietf.org/html/rfc6902 for details on the original RFC.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `action` | string | Type of this operation. Contains one of 'add', 'remove', 'replace', 'move', 'copy', 'test' and 'custom' operations. This field is case-insensitive and always populated. |
| `path` | string | Path to the target field being operated on. If the operation is at the resource level, then path should be "/". This field is always populated. |
| `pathFilters` | object | Set of filters to apply if `path` refers to array elements or nested array elements in order to narrow down to a single unique element that is being tested/modified. This is intended to be an exact match per filter. To perform advanced matching, use path_value_matchers. \* Example: { "/versions/\*/name" : "it-123" "/versions/\*/targetSize/percent": 20 } \* Example: { "/bindings/\*/role": "roles/owner" "/bindings/\*/condition" : null } \* Example: { "/bindings/\*/role": "roles/owner" "/bindings/\*/members/\*" : \["x@example.com", "y@example.com"\] } When both path_filters and path_value_matchers are set, an implicit AND must be performed. |
| `pathValueMatchers` | object | Similar to path_filters, this contains set of filters to apply if `path` field refers to array elements. This is meant to support value matching beyond exact match. To perform exact match, use path_filters. When both path_filters and path_value_matchers are set, an implicit AND must be performed. |
| `resource` | string | Contains the fully qualified resource name. This field is always populated. ex: //cloudresourcemanager.googleapis.com/projects/foo. |
| `resourceType` | string | Type of GCP resource being modified/tested. This field is always populated. Example: cloudresourcemanager.googleapis.com/Project, compute.googleapis.com/Instance |
| `sourcePath` | string | Can be set with action 'copy' or 'move' to indicate the source field within resource or source_resource, ignored if provided for other operation types. |
| `sourceResource` | string | Can be set with action 'copy' to copy resource configuration across different resources of the same type. Example: A resource clone can be done via action = 'copy', path = "/", from = "/", source_resource = and resource_name = . This field is empty for all other values of `action`. |
| `value` | any | Value for the `path` field. Will be set for actions:'add'/'replace'. Maybe set for action: 'test'. Either this or `value_matcher` will be set for 'test' operation. An exact match must be performed. |
| `valueMatcher` | GoogleCloudRecommenderV1beta1ValueMatcher | Can be set for action 'test' for advanced matching for the value of 'path' field. Either this or `value` will be set for 'test' operation. |

### `GoogleCloudRecommenderV1beta1OperationGroup`

- Group of operations that need to be performed atomically.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `operations` | array<GoogleCloudRecommenderV1beta1Operation> | List of operations across one or more resources that belong to this group. Loosely based on RFC6902 and should be performed in the order they appear. |

### `GoogleCloudRecommenderV1beta1Recommendation`

- A recommendation along with a suggested action. E.g., a rightsizing recommendation for an underutilized VM, IAM role recommendations, etc
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `additionalImpact` | array<GoogleCloudRecommenderV1beta1Impact> | Optional set of additional impact that this recommendation may have when trying to optimize for the primary category. These may be positive or negative. |
| `associatedInsights` | array<GoogleCloudRecommenderV1beta1RecommendationInsightReference> | Insights that led to this recommendation. |
| `content` | GoogleCloudRecommenderV1beta1RecommendationContent | Content of the recommendation describing recommended changes to resources. |
| `description` | string | Free-form human readable summary in English. The maximum length is 500 characters. |
| `etag` | string | Fingerprint of the Recommendation. Provides optimistic locking when updating states. |
| `lastRefreshTime` | string (google-datetime) | Last time this recommendation was refreshed by the system that created it in the first place. |
| `name` | string | Identifier. Name of recommendation. |
| `primaryImpact` | GoogleCloudRecommenderV1beta1Impact | The primary impact that this recommendation can have while trying to optimize for one category. |
| `priority` | string enum | Recommendation's priority. |
| `recommenderSubtype` | string | Contains an identifier for a subtype of recommendations produced for the same recommender. Subtype is a function of content and impact, meaning a new subtype might be added when significant changes to `content` or `primary_impact.category` are introduced. See the Recommenders section to see a list of subtypes for a given Recommender. Examples: For recommender = "google.iam.policy.Recommender", recommender_subtype can be one of "REMOVE_ROLE"/"REPLACE_ROLE" |
| `stateInfo` | GoogleCloudRecommenderV1beta1RecommendationStateInfo | Information for state. Contains state and metadata. |
| `targetResources` | array<string> | Fully qualified resource names that this recommendation is targeting. |
| `xorGroupId` | string | Corresponds to a mutually exclusive group ID within a recommender. A non-empty ID indicates that the recommendation belongs to a mutually exclusive group. This means that only one recommendation within the group is suggested to be applied. |

### `GoogleCloudRecommenderV1beta1RecommendationContent`

- Contains what resources are changing and how they are changing.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `operationGroups` | array<GoogleCloudRecommenderV1beta1OperationGroup> | Operations to one or more Google Cloud resources grouped in such a way that, all operations within one group are expected to be performed atomically and in an order. |
| `overview` | object | Condensed overview information about the recommendation. |

### `GoogleCloudRecommenderV1beta1RecommendationInsightReference`

- Reference to an associated insight.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `insight` | string | Insight resource name, e.g. projects/\[PROJECT_NUMBER\]/locations/\[LOCATION\]/insightTypes/\[INSIGHT_TYPE_ID\]/insights/\[INSIGHT_ID\] |

### `GoogleCloudRecommenderV1beta1RecommendationStateInfo`

- Information for state. Contains state and metadata.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `state` | string enum | The state of the recommendation, Eg ACTIVE, SUCCEEDED, FAILED. |
| `stateMetadata` | object | A map of metadata for the state, provided by user or automations systems. |

### `GoogleCloudRecommenderV1beta1RecommenderConfig`

- Configuration for a Recommender.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `annotations` | object | Allows clients to store small amounts of arbitrary data. Annotations must follow the Kubernetes syntax. The total size of all keys and values combined is limited to 256k. Key can have 2 segments: prefix (optional) and name (required), separated by a slash (/). Prefix must be a DNS subdomain. Name must be 63 characters or less, begin and end with alphanumerics, with dashes (-), underscores (\_), dots (.), and alphanumerics between. |
| `displayName` | string | A user-settable field to provide a human-readable name to be used in user interfaces. |
| `etag` | string | Fingerprint of the RecommenderConfig. Provides optimistic locking when updating. |
| `name` | string | Identifier. Name of recommender config. Eg, projects/\[PROJECT_NUMBER\]/locations/\[LOCATION\]/recommenders/\[RECOMMENDER_ID\]/config |
| `recommenderGenerationConfig` | GoogleCloudRecommenderV1beta1RecommenderGenerationConfig | RecommenderGenerationConfig which configures the Generation of recommendations for this recommender. |
| `revisionId` | string | Output only. Immutable. The revision ID of the config. A new revision is committed whenever the config is changed in any way. The format is an 8-character hexadecimal string. |
| `updateTime` | string (google-datetime) | Last time when the config was updated. |

### `GoogleCloudRecommenderV1beta1RecommenderGenerationConfig`

- A Configuration to customize the generation of recommendations. Eg, customizing the lookback period considered when generating a recommendation.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `params` | object | Parameters for this RecommenderGenerationConfig. These configs can be used by or are applied to all subtypes. |

### `GoogleCloudRecommenderV1beta1RecommenderType`

- The type of a recommender.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `name` | string | The recommender's name in format RecommenderTypes/{recommender_type} eg: recommenderTypes/google.iam.policy.Recommender |

### `GoogleCloudRecommenderV1beta1ReliabilityProjection`

- Contains information on the impact of a reliability recommendation.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `details` | object | Per-recommender projection. |
| `risks` | array<string> | Reliability risks mitigated by this recommendation. |

### `GoogleCloudRecommenderV1beta1SecurityProjection`

- Contains various ways of describing the impact on Security.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `details` | object | This field can be used by the recommender to define details specific to security impact. |

### `GoogleCloudRecommenderV1beta1SustainabilityProjection`

- Contains metadata about how much sustainability a recommendation can save or incur.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `duration` | string (google-duration) | Duration for which this sustanability applies. |
| `kgCO2e` | number (double) | Carbon Footprint generated in kg of CO2 equivalent. Chose kg_c_o2e so that the name renders correctly in camelCase (kgCO2e). |

### `GoogleCloudRecommenderV1beta1ValueMatcher`

- Contains various matching options for values for a GCP resource field.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `matchesPattern` | string | To be used for full regex matching. The regular expression is using the Google RE2 syntax (https://github.com/google/re2/wiki/Syntax), so to be used with RE2::FullMatch |

### `GoogleTypeMoney`

- Represents an amount of money with its currency type.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `currencyCode` | string | The three-letter currency code defined in ISO 4217. |
| `nanos` | integer (int32) | Number of nano (10^-9) units of the amount. The value must be between -999,999,999 and +999,999,999 inclusive. If `units` is positive, `nanos` must be positive or zero. If `units` is zero, `nanos` can be positive, zero, or negative. If `units` is negative, `nanos` must be negative or zero. For example $-1.75 is represented as `units`=-1 and `nanos`=-750,000,000. |
| `units` | string (int64) | The whole units of the amount. For example if `currencyCode` is `"USD"`, then 1 unit is one US dollar. |

### Shape of `CloudRecommendationsRecommendersDatabasesV1ContentChunk`

Generated from the Discovery schema (not in the official docs); values show each field type:

```json
{
  "table": "CloudRecommendationsRecommendersDatabasesV1Table"
}
```

## Notes

- Generated from the Discovery document(s) v1, v1beta1 of `recommender` (retrieved 2026-11-14); a type shared by several versions shows the preferred version, and each type's `Version` line names the document it was taken from.
- Source: https://recommender.googleapis.com/$discovery/rest?version=v1, https://recommender.googleapis.com/$discovery/rest?version=v1beta1 (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
