---
source: https://saasservicemgmt.googleapis.com/$discovery/rest?version=v1
---

# App Lifecycle Manager API message schemas (saasservicemgmt)

## Signature / Usage

Message types referenced by the methods listed under `references/rest/saasservicemgmt/`.

### `Aggregate`

- Represents the aggregation of a set of population of like records by a certain group. For example, a collection of unit counts can be aggregated and grouped by their state.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `count` | integer (int32) | Required. Number of records in the group. |
| `group` | string | Required. Group by which to aggregate. |

### `Allocation`

- Allocation defines a set of weighted flag variants, specifying how traffic is split based on the randomization unit.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `description` | string | Optional. Description of the allocation. Max length: 500 bytes. |
| `id` | string | Required. Allocation ID. Max length: 128 bytes. |
| `randomizedOn` | string | Required. Key of the context attribute that is used for traffic splitting. |
| `slots` | array<AllocationSlot> | Required. Slots defines the weighted distribution of variants. |

### `AllocationSlot`

- AllocationSlot specifies a variant and the proportion of traffic allocated to it.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `variant` | string | Required. Variant of the allocation slot. |
| `weight` | integer (int32) | Required. Weight defines the proportion of traffic to allocate to the variant, relative to other slots in the same allocation. |

### `AppParams`

- AppParams contains the parameters for creating an AppHub Application.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `group` | string | Optional. Grouping used to construct the name of the AppHub Application. Multiple UnitKinds can specify the same group to use the same Application across their respective units. Corresponds to the app_boundary_id in the ADC composite ApplicationTemplate. Defaults to UnitKind.name |
| `scope` | Scope | Optional. Corresponds to the scope in the ADC composite ApplicationTemplate. Defaults to TYPE_REGIONAL. |

### `Blueprint`

- Blueprints are OCI Images that contain all of the artifacts needed to provision a unit. Metadata such as, type of the engine used to actuate the blueprint (Terraform, for example) and version will come from the image manifest. If the hostname is omitted, it will be assumed to be the regional path to Artifact Registry (eg. us-east1-docker.pkg.dev).
- Version: v1

| Field | Type | Description |
|---|---|---|
| `engine` | string | Output only. Type of the engine used to actuate the blueprint. (Terraform, for example) |
| `package` | string | Optional. Immutable. URI to a blueprint used by the Unit (required unless unitKind or release is set). |
| `version` | string | Output only. Version metadata if present on the blueprint. |

### `ComponentRef`

- ComponentRef represents a reference to a component resource.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `component` | string | Optional. Name of the component in composite.Components |
| `compositeRef` | CompositeRef | Optional. Reference to the Composite ApplicationTemplate. |
| `revision` | string | Optional. Revision of the component. If the component does not have a revision, this field will be explicitly set to the revision of the composite ApplicationTemplate. |

### `CompositeRef`

- CompositeRef represents a reference to a composite resource.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `applicationTemplate` | string | Required. Reference to the ApplicationTemplate resource. |
| `revision` | string | Optional. Revision of the ApplicationTemplate to use. Changes to revision will trigger manual resynchronization. If empty, ApplicationTemplate will be ignored. |
| `syncOperation` | string | Output only. Reference to on-going AppTemplate import and replication operation (i.e. the operation_id for the long-running operation). This field is opaque for external usage. |

### `Decimal`

- A representation of a decimal value, such as 2.5. Clients may convert values into language-native decimal formats, such as Java's BigDecimal (https://docs.oracle.com/en/java/javase/11/docs/api/java.base/java/math/BigDecimal.html) or Python's decimal.Decimal (https://docs.python.org/3/library/decimal.html).
- Version: v1

| Field | Type | Description |
|---|---|---|
| `value` | string | The decimal value, as a string. The string representation consists of an optional sign, `+` (`U+002B`) or `-` (`U+002D`), followed by a sequence of zero or more decimal digits ("the integer"), optionally followed by a fraction, optionally followed by an exponent. An empty string \*\*should\*\* be interpreted as `0`. The fraction consists of a decimal point followed by zero or more decimal digits. The string must contain at least one digit in either the integer or the fraction. The number formed by the sign, the integer and the fraction is referred to as the significand. The exponent consists of the character `e` (`U+0065`) or `E` (`U+0045`) followed by one or more decimal digits. Services \*\*should\*\* normalize decimal values before storing them by: - Removing an explicitly-provided `+` sign (`+2.5` -> `2.5`). - Replacing a zero-length integer value with `0` (`.5` -> `0.5`). - Coercing the exponent character to upper-case, with explicit sign (`2.5e8` -> `2.5E+8`). - Removing an explicitly-provided zero exponent (`2.5E0` -> `2.5`). Services \*\*may\*\* perform additional normalization based on its own needs and the internal decimal implementation selected, such as shifting the decimal point and exponent value together (example: `2.5E-1` <-> `0.25`). Additionally, services \*\*may\*\* preserve trailing zeroes in the fraction to indicate increased precision, but are not required to do so. Note that only the `.` character is supported to divide the integer and the fraction; `,` \*\*should not\*\* be supported regardless of locale. Additionally, thousand separators \*\*should not\*\* be supported. If a service does support them, values \*\*must\*\* be normalized. The ENBF grammar is: DecimalString = '' \| \[Sign\] Significand \[Exponent\]; Sign = '+' \| '-'; Significand = Digits '.' \| \[Digits\] '.' Digits; Exponent = ('e' \| 'E') \[Sign\] Digits; Digits = { '0' \| '1' \| '2' \| '3' \| '4' \| '5' \| '6' \| '7' \| '8' \| '9' }; Services \*\*should\*\* clearly document the range of supported values, the maximum supported precision (total number of digits), and, if applicable, the scale (number of digits after the decimal point), as well as how it behaves when receiving out-of-bounds values. Services \*\*may\*\* choose to accept values passed as input even when the value has a higher precision or scale than the service supports, and \*\*should\*\* round the value to fit the supported scale. Alternatively, the service \*\*may\*\* error with `400 Bad Request` (`INVALID_ARGUMENT` in gRPC) if precision would be lost. Services \*\*should\*\* error with `400 Bad Request` (`INVALID_ARGUMENT` in gRPC) if the service receives a value outside of the supported range. |

### `Dependency`

- Dependency represent a single dependency with another unit kind by alias.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `alias` | string | Required. An alias for the dependency. Used for input variable mapping. |
| `unitKind` | string | Required. Immutable. The unit kind of the dependency. |

### `Deprovision`

- Deprovision is the unit operation that deprovision the underlying resources represented by a Unit. Can only execute if the Unit is currently provisioned.
- Version: v1

### `DurationLimits`

- DurationLimits defines the time-related constraints for a UnitOperation's execution. This allows users to control how long an operation can run before being cancelled by the system.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `unitOperationTimeout` | string (google-duration) | Optional. The maximum duration a UnitOperation is allowed to execute in the RUNNING state. - Minimum value: 60 seconds (1 minute) - Maximum value: 604800 seconds (7 days) If this field is not set, or if the provided value falls outside the allowed range, the system will use a default timeout of 10800 seconds (3 hours). Upon exceeding this time limit, the UnitOperation will be best-effort cancelled, and its state will be set to FAILED. |

### `Empty`

- A generic empty message that you can re-use to avoid defining duplicated empty messages in your APIs. A typical example is to use it as the request or the response type of an API method. For instance: service Foo { rpc Bar(google.protobuf.Empty) returns (google.protobuf.Empty); }
- Version: v1

### `Engine`

- Engine captures metadata about the underlying actuation engine instance managing this Unit.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `engineId` | string | Optional. Output only. The full resource name of the underlying engine deployment created for this unit (e.g., "projects/{project}/locations/{location}/deployments/{deployment}"). |
| `location` | string | Optional. Output only. The location where the unit's underlying engine deployment is actuated (e.g., "us-central1"). |

### `ErrorBudget`

- The configuration for error budget. If the number of failed units exceeds max(allowed_count, allowed_ratio \* total_units), the rollout will be paused.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `allowedCount` | integer (int32) | Optional. The maximum number of failed units allowed in a location without pausing the rollout. |
| `allowedPercentage` | integer (int32) | Optional. The maximum percentage of units allowed to fail (0, 100\] within a location without pausing the rollout. |

### `EvaluationRule`

- EvaluationRule defines a single rule for evaluating a feature flag. A rule consists of a condition that, if met, assigns a specific variant or allocation to the user.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `allocationId` | string | Optional. The ID of an allocation to target. |
| `condition` | string | Required. A Common Expression Language (CEL) expression that evaluates to a boolean. The expression is evaluated against the provided context. If it returns true, the rule's target is applied. |
| `id` | string | Required. Evaluation rule ID. Max length: 128 bytes. |
| `target` | string | Optional. Deprecated: Use `rule_target` instead. The target variant or allocation to apply if the condition is met. This should match the name of a defined variant or allocation's ID. |
| `variantId` | string | Optional. The name of a variant to target. |

### `EvaluationSpec`

- EvaluationSpec holds rules for evaluating the value of a flag.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `allocations` | array<Allocation> | Optional. A list of allocations. |
| `attributes` | array<string> | Optional. Names of the context attributes that are used in the evaluation rules and allocations. |
| `defaultAllocation` | string | Optional. The ID of an allocation to use as the default. |
| `defaultTarget` | string | Optional. Deprecated: Use `base_target` instead. Default variant or allocation of the flag. |
| `defaultVariant` | string | Optional. The name of a variant to use as the default. |
| `rules` | array<EvaluationRule> | Optional. Evaluation rules define the logic for evaluating the flag against a given context. The rules are evaluated sequentially in their specified order. |
| `variants` | array<Variant> | Optional. A list of variants. |

### `Flag`

- Represents a single Flag.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `annotations` | object | Optional. Annotations is an unstructured key-value map stored with a resource that may be set by external tools to store and retrieve arbitrary metadata. They are not queryable and should be preserved when modifying objects. More info: https://kubernetes.io/docs/user-guide/annotations |
| `createTime` | string (google-datetime) | Output only. The timestamp when the resource was created. |
| `description` | string | Optional. Description of the flag. Max length: 500 bytes. |
| `etag` | string | Output only. An opaque value that uniquely identifies a version or generation of a resource. It can be used to confirm that the client and server agree on the ordering of a resource being written. |
| `evaluationSpec` | EvaluationSpec | Optional. Specification of how the flag value should be evaluated. If a bool flag is created without an evaluation_spec specified, two default variants, "Enabled" (with boolean_value = true) and "Disabled" (with boolean_value = false), are created by default, and "Disabled" is set as the default_variant. |
| `flagSet` | string | Optional. Flag set this flag belongs to. |
| `flagValueType` | string enum | Optional. Immutable. Flag value type. Values: `FLAG_VALUE_TYPE_UNSPECIFIED`, `FLAG_VALUE_TYPE_BOOLEAN`, `FLAG_VALUE_TYPE_INTEGER`, `FLAG_VALUE_TYPE_STRING`, `FLAG_VALUE_TYPE_DOUBLE`. |
| `key` | string | Required. Immutable. Flag key used in runtime evaluation APIs (OpenFeature). Max length: 256 bytes. |
| `labels` | object | Optional. The labels on the resource, which can be used for categorization. similar to Kubernetes resource labels. |
| `name` | string | Identifier. The resource name (full URI of the resource) following the standard naming scheme: "projects/{project}/locations/{location}/flags/{flag_id}" |
| `state` | string enum | Optional. Current state of the flag. Values: `FLAG_STATE_UNSPECIFIED`, `FLAG_STATE_IN_DEVELOPMENT`, `FLAG_STATE_ACTIVE`, `FLAG_STATE_SUNSETTING`, `FLAG_STATE_CLEANUP`. |
| `uid` | string | Output only. The unique identifier of the resource. UID is unique in the time and space for this resource within the scope of the service. It is typically generated by the server on successful creation of a resource and must not be changed. UID is used to uniquely identify resources with resource name reuses. This should be a UUID4. |
| `unitKind` | string | Required. Immutable. UnitKind that can consume this flag. |
| `updateTime` | string (google-datetime) | Output only. The timestamp when the resource was last updated. Any change to the resource made by users must refresh this value. Changes to a resource made by the service should refresh this value. |
| `valueType` | string enum | Optional. Immutable. Deprecated: Use `flag_value_type` instead. Flag value type. Values: `FLAG_VALUE_TYPE_UNSPECIFIED`, `FLAG_VALUE_TYPE_BOOL`, `FLAG_VALUE_TYPE_INT`, `FLAG_VALUE_TYPE_STRING`, `FLAG_VALUE_TYPE_DOUBLE`. |
| `variants` | array<FlagVariant> | Optional. A list of variants. |

### `FlagAttribute`

- FlagAttribute defines a custom property in the evaluation context.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `annotations` | object | Optional. Annotations is an unstructured key-value map stored with a resource that may be set by external tools to store and retrieve arbitrary metadata. They are not queryable and should be preserved when modifying objects. More info: https://kubernetes.io/docs/user-guide/annotations |
| `attributeValueType` | string enum | Optional. Immutable. Type of the attribute. Values: `FLAG_ATTRIBUTE_VALUE_TYPE_UNSPECIFIED`, `FLAG_ATTRIBUTE_VALUE_TYPE_BOOLEAN`, `FLAG_ATTRIBUTE_VALUE_TYPE_INTEGER`, `FLAG_ATTRIBUTE_VALUE_TYPE_STRING`, `FLAG_ATTRIBUTE_VALUE_TYPE_DOUBLE`. |
| `createTime` | string (google-datetime) | Output only. The timestamp when the resource was created. |
| `etag` | string | Output only. An opaque value that uniquely identifies a version or generation of a resource. It can be used to confirm that the client and server agree on the ordering of a resource being written. |
| `key` | string | Required. Immutable. The identifier for the attribute, used as the key in the evaluation context. The attribute key is referenced in the evaluation rules and used in the OpenFeature evaluation API to specify the attribute context. |
| `labels` | object | Optional. The labels on the resource, which can be used for categorization. similar to Kubernetes resource labels. |
| `name` | string | Identifier. The resource name (full URI of the resource) following the standard naming scheme: "projects/{project}/locations/{location}/flagAttributes/{flag_attribute_id}" |
| `uid` | string | Output only. The unique identifier of the resource. UID is unique in the time and space for this resource within the scope of the service. It is typically generated by the server on successful creation of a resource and must not be changed. UID is used to uniquely identify resources with resource name reuses. This should be a UUID4. |
| `updateTime` | string (google-datetime) | Output only. The timestamp when the resource was last updated. Any change to the resource made by users must refresh this value. Changes to a resource made by the service should refresh this value. |
| `valueType` | string enum | Optional. Immutable. Deprecated: Use `attribute_value_type` instead. Type of the attribute. Values: `FLAG_ATTRIBUTE_VALUE_TYPE_UNSPECIFIED`, `BOOLEAN`, `INTEGER`, `STRING`, `DOUBLE`. |

### `FlagNameList`

- Wrapper for a list of flags.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `flags` | array<string> | Required. Flags to be rolled out. |

### `FlagRelease`

- A collection of FlagRevisions.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `allFlags` | boolean | Optional. Immutable. DEPRECATED: Use all_flags_release instead. Rollout all flags in the provided UnitKind. Only one of flag_revisions, all_flags, or flag_sets can be set. |
| `allFlagsRelease` | boolean | Optional. Immutable. Specifies the release includes all flags. |
| `annotations` | object | Optional. Annotations is an unstructured key-value map stored with a resource that may be set by external tools to store and retrieve arbitrary metadata. They are not queryable and should be preserved when modifying objects. More info: https://kubernetes.io/docs/user-guide/annotations |
| `createTime` | string (google-datetime) | Output only. The timestamp when the resource was created. |
| `effectiveFlagRevisions` | array<string> | Output only. An OUTPUT_ONLY field that contains FlagRevisions to be rolled out. This is the ultimate source of truth of what a Rollout or a UnitOperation carries. |
| `etag` | string | Output only. An opaque value that uniquely identifies a version or generation of a resource. It can be used to confirm that the client and server agree on the ordering of a resource being written. |
| `flagNamesRelease` | FlagNameList | Optional. Immutable. Specifies the release consisting of a list of flags. |
| `flagRevisions` | array<string> | Optional. Immutable. DEPRECATED: Use flag_revisions_release instead. FlagRevisions to be rolled out. Only one of flag_revisions, all_flags, or flag_sets can be set. It used to be the ultimate source to truth and has been moved to effective_flag_revisions. |
| `flagRevisionsRelease` | FlagRevisionList | Optional. Immutable. Specifies the release consisting of a list of flag revisions. |
| `flagSets` | array<string> | Optional. Immutable. DEPRECATED: Use flag_sets_release instead. Flag sets to be rolled out. Only one of flag_revisions, all_flags, or flag_sets can be set. |
| `flagSetsRelease` | FlagSetList | Optional. Immutable. Specifies the release consisting of a list of flag sets. |
| `labels` | object | Optional. The labels on the resource, which can be used for categorization. similar to Kubernetes resource labels. |
| `name` | string | Identifier. The resource name (full URI of the resource) following the standard naming scheme: "projects/{project}/locations/{location}/flagReleases/{flag_release_id}" |
| `obsoleteFlags` | array<string> | Optional. Immutable. Deprecated: Use the 'state' field in the 'Flag' resource to manage the cleanup of flag lifecycles including removal from UnitKind and Units. Flags to be removed from given UnitKind and all related Units. If Flag is provided here, its FlagRevisions will be removed from UnitKind and Units. |
| `uid` | string | Output only. The unique identifier of the resource. UID is unique in the time and space for this resource within the scope of the service. It is typically generated by the server on successful creation of a resource and must not be changed. UID is used to uniquely identify resources with resource name reuses. This should be a UUID4. |
| `unitKind` | string | Required. Immutable. The UnitKind this FlagRelease applies to. |
| `updateTime` | string (google-datetime) | Output only. The timestamp when the resource was last updated. Any change to the resource made by users must refresh this value. Changes to a resource made by the service should refresh this value. |

### `FlagRevision`

- A snapshot of the EvaluationSpec for the Flag.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `annotations` | object | Optional. Annotations is an unstructured key-value map stored with a resource that may be set by external tools to store and retrieve arbitrary metadata. They are not queryable and should be preserved when modifying objects. More info: https://kubernetes.io/docs/user-guide/annotations |
| `createTime` | string (google-datetime) | Output only. The timestamp when the resource was created. |
| `etag` | string | Output only. An opaque value that uniquely identifies a version or generation of a resource. It can be used to confirm that the client and server agree on the ordering of a resource being written. |
| `evaluationSpec` | EvaluationSpec | Output only. Immutable. Snapshot of the EvaluationSpec for the flag. DEPRECATED: Use snapshot instead. |
| `flag` | string | Required. Immutable. Name of the Flag this is a revision of. |
| `labels` | object | Optional. The labels on the resource, which can be used for categorization. similar to Kubernetes resource labels. |
| `name` | string | Identifier. The resource name (full URI of the resource) following the standard naming scheme: "projects/{project}/locations/{location}/flagRevisions/{flag_revision_id}" |
| `snapshot` | Flag | Output only. Immutable. Snapshot of the Flag. |
| `uid` | string | Output only. The unique identifier of the resource. UID is unique in the time and space for this resource within the scope of the service. It is typically generated by the server on successful creation of a resource and must not be changed. UID is used to uniquely identify resources with resource name reuses. This should be a UUID4. |
| `updateTime` | string (google-datetime) | Output only. The timestamp when the resource was last updated. Any change to the resource made by users must refresh this value. Changes to a resource made by the service should refresh this value. |

### `FlagRevisionList`

- Wrapper for a list of flag revisions.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `revisions` | array<string> | Required. FlagRevisions to be rolled out. |

### `FlagSetList`

- Wrapper for a list of flag sets.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `sets` | array<string> | Required. Flag sets to be rolled out. |

### `FlagUpdate`

- FlagUpdate is a UnitOperation that pushes new flag values to Units.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `flagRelease` | string | Required. Flag release being applied by UnitOperation. |

### `FlagVariant`

- Variant is an identifier for a value (name assigned to a value).
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `booleanValue` | boolean | Optional. Boolean variant value. |
| `description` | string | Optional. A human-readable description of what this variant does or represents. |
| `doubleValue` | number (double) | Optional. Double variant value. |
| `id` | string | Required. Variant ID. Max length: 128 bytes. |
| `integerValue` | string (int64) | Optional. Integer variant value. |
| `stringValue` | string | Optional. String variant value. |
| `trackingId` | string | Output only. trackingId is unique depending on name and value of the variant within the scope of the service. It is typically generated by the server and must not be changed. trackingId is used to uniquely identify and track variants. |

### `FromMapping`

- Output variables whose values will be passed on to dependencies
- Version: v1

| Field | Type | Description |
|---|---|---|
| `dependency` | string | Required. Alias of the dependency that the outputVariable will pass its value to |
| `outputVariable` | string | Required. Name of the outputVariable on the dependency |

### `GoogleCloudLocationLocation`

- A resource that represents a Google Cloud location.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `displayName` | string | The friendly name for this location, typically a nearby city name. For example, "Tokyo". |
| `labels` | object | Cross-service attributes for the location. For example {"cloud.googleapis.com/region": "us-east1"} |
| `locationId` | string | The canonical id for this location. For example: `"us-east1"`. |
| `metadata` | object | Service-specific metadata. For example the available capacity at the given location. |
| `name` | string | Resource name for the location, which may vary between implementations. For example: `"projects/example-project/locations/us-east1"` |

### `ListFlagAttributesResponse`

- The response structure for the ListFlagAttributes method.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `flagAttributes` | array<FlagAttribute> | The resulting flag attributes. |
| `nextPageToken` | string | If present, the next page token can be provided to a subsequent ListFlagAttributes call to list the next page. If empty, there are no more pages. |
| `unreachable` | array<string> | Locations that could not be reached. |

### `ListFlagReleasesResponse`

- The response structure for the ListFlagReleases method.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `flagReleases` | array<FlagRelease> | The resulting flag releases. |
| `nextPageToken` | string | If present, the next page token can be provided to a subsequent ListFlagReleases call to list the next page. If empty, there are no more pages. |
| `unreachable` | array<string> | Locations that could not be reached. |

### `ListFlagRevisionsResponse`

- The response structure for the ListFlagRevisions method.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `flagRevisions` | array<FlagRevision> | The resulting flag revisions. |
| `nextPageToken` | string | If present, the next page token can be provided to a subsequent ListFlagRevisions call to list the next page. If empty, there are no more pages. |
| `unreachable` | array<string> | Locations that could not be reached. |

### `ListFlagsResponse`

- The response structure for the ListFlags method.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `flags` | array<Flag> | The resulting flags. |
| `nextPageToken` | string | If present, the next page token can be provided to a subsequent ListFlags call to list the next page. If empty, there are no more pages. |
| `unreachable` | array<string> | Locations that could not be reached. |

### `ListLocationsResponse`

- The response message for Locations.ListLocations.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `locations` | array<GoogleCloudLocationLocation> | A list of locations that matches the specified filter in the request. |
| `nextPageToken` | string | The standard List next-page token. |

### `ListReleasesResponse`

- The response structure for the ListReleases method.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | If present, the next page token can be provided to a subsequent ListReleases call to list the next page. If empty, there are no more pages. |
| `releases` | array<Release> | The resulting releases. |
| `unreachable` | array<string> | Locations that could not be reached. |

### `ListRolloutKindsResponse`

- The response structure for the ListRolloutKinds method.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | If present, the next page token can be provided to a subsequent ListRolloutKinds call to list the next page. If empty, there are no more pages. |
| `rolloutKinds` | array<RolloutKind> | The resulting rollout kinds. |
| `unreachable` | array<string> | Locations that could not be reached. |

### `ListRolloutsResponse`

- The response structure for the ListRollouts method.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | If present, the next page token can be provided to a subsequent ListRollouts call to list the next page. If empty, there are no more pages. |
| `rollouts` | array<Rollout> | The resulting rollouts. |
| `unreachable` | array<string> | Locations that could not be reached. |

### `ListSaasResponse`

- The response structure for the ListSaas method.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | If present, the next page token can be provided to a subsequent ListSaas call to list the next page. If empty, there are no more pages. |
| `saas` | array<Saas> | The resulting saas. |
| `unreachable` | array<string> | Locations that could not be reached. |

### `ListTenantsResponse`

- The response structure for the ListTenants method.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | If present, the next page token can be provided to a subsequent ListTenants call to list the next page. If empty, there are no more pages. |
| `tenants` | array<Tenant> | The resulting tenants. |
| `unreachable` | array<string> | Locations that could not be reached. |

### `ListUnitGroupOperationsResponse`

- The response structure for the ListUnitGroupOperations method.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | If present, the next page token can be provided to a subsequent ListUnitGroupOperations call to list the next page. If empty, there are no more pages. |
| `unitGroupOperations` | array<UnitGroupOperation> | The resulting unit group operations. |
| `unreachable` | array<string> | Locations that could not be reached. |

### `ListUnitGroupsResponse`

- The response structure for the ListUnitGroups method.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | If present, the next page token can be provided to a subsequent ListUnitGroups call to list the next page. If empty, there are no more pages. |
| `unitGroups` | array<UnitGroup> | The resulting unit groups. |
| `unreachable` | array<string> | Locations that could not be reached. |

### `ListUnitKindsResponse`

- The response structure for the ListUnitKinds method.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | If present, the next page token can be provided to a subsequent ListUnitKinds call to list the next page. If empty, there are no more pages. |
| `unitKinds` | array<UnitKind> | The resulting unit kinds. |
| `unreachable` | array<string> | Locations that could not be reached. |

### `ListUnitOperationsResponse`

- The response structure for the ListUnitOperations method.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | If present, the next page token can be provided to a subsequent ListUnitOperations call to list the next page. If empty, there are no more pages. |
| `unitOperations` | array<UnitOperation> | The resulting unit operations. |
| `unreachable` | array<string> | Locations that could not be reached. |

### `ListUnitsResponse`

- The response structure for the ListUnits method.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | If present, the next page token can be provided to a subsequent ListUnits call to list the next page. If empty, there are no more pages. |
| `units` | array<Unit> | The resulting units. |
| `unreachable` | array<string> | Locations that could not be reached. |

### `Location`

- Location information that the service is available in.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `name` | string | Optional. Name of location. |

### `Location` (v1beta1)

- Location information that the service is available in.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `name` | string | Optional. Name of location. |
| `type` | string enum | Type of location. Values: `LOCATION_TYPE_UNSPECIFIED`, `CLOUD_GLOBAL`, `CLOUD_REGION`, `CLOUD_ZONE`. |

### `MaintenanceSettings`

- Captures requested directives for performing future maintenance on the unit. This includes a request for the unit to skip maintenance for a period of time and remain pinned to its current release as well as controls for postponing maintenance scheduled in future.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `pinnedUntilTime` | string (google-datetime) | Optional. If present, it fixes the release on the unit until the given time; i.e. changes to the release field will be rejected. Rollouts should and will also respect this by not requesting an upgrade in the first place. |

### `Provision`

- Provision is the unit operation that provision the underlying resources represented by a Unit. Can only execute if the Unit is not currently provisioned.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `inputVariables` | array<UnitVariable> | Optional. Set of input variables. Maximum 100. (optional) |
| `release` | string | Optional. Reference to the Release object to use for the Unit. (optional). |

### `Release`

- A new version to be propagated and deployed to units. This includes pointers to packaged blueprints for actuation via Artifact Registry.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `annotations` | object | Optional. Annotations is an unstructured key-value map stored with a resource that may be set by external tools to store and retrieve arbitrary metadata. They are not queryable and should be preserved when modifying objects. More info: https://kubernetes.io/docs/user-guide/annotations |
| `applicationTemplateComponent` | ComponentRef | Output only. Reference to component and revision in a composite ApplicationTemplate. |
| `blueprint` | Blueprint | Optional. Blueprints are OCI Images that contain all of the artifacts needed to provision a unit. |
| `createTime` | string (google-datetime) | Output only. The timestamp when the resource was created. |
| `etag` | string | Output only. An opaque value that uniquely identifies a version or generation of a resource. It can be used to confirm that the client and server agree on the ordering of a resource being written. |
| `inputVariableDefaults` | array<UnitVariable> | Optional. Mapping of input variables to default values. Maximum 100 |
| `inputVariables` | array<UnitVariable> | Optional. Output only. List of input variables declared on the blueprint and can be present with their values on the unit spec |
| `labels` | object | Optional. The labels on the resource, which can be used for categorization. similar to Kubernetes resource labels. |
| `name` | string | Identifier. The resource name (full URI of the resource) following the standard naming scheme: "projects/{project}/locations/{location}/releases/{release}" |
| `outputVariables` | array<UnitVariable> | Optional. Output only. List of output variables declared on the blueprint and can be present with their values on the unit status |
| `releaseRequirements` | ReleaseRequirements | Optional. Set of requirements to be fulfilled on the Unit when using this Release. |
| `uid` | string | Output only. The unique identifier of the resource. UID is unique in the time and space for this resource within the scope of the service. It is typically generated by the server on successful creation of a resource and must not be changed. UID is used to uniquely identify resources with resource name reuses. This should be a UUID4. |
| `unitKind` | string | Required. Immutable. Reference to the UnitKind this Release corresponds to (required and immutable once created). |
| `updateTime` | string (google-datetime) | Output only. The timestamp when the resource was last updated. Any change to the resource made by users must refresh this value. Changes to a resource made by the service should refresh this value. |

### `ReleaseRequirements`

- Set of requirements to be fulfilled on the Unit when using this Release.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `upgradeableFromReleases` | array<string> | Optional. A list of releases from which a unit can be upgraded to this one (optional). If left empty no constraints will be applied. When provided, unit upgrade requests to this release will check and enforce this constraint. |

### `Rollout`

- Represents a single rollout execution and its results
- Version: v1

| Field | Type | Description |
|---|---|---|
| `annotations` | object | Optional. Annotations is an unstructured key-value map stored with a resource that may be set by external tools to store and retrieve arbitrary metadata. They are not queryable and should be preserved when modifying objects. More info: https://kubernetes.io/docs/user-guide/annotations |
| `control` | RolloutControl | Optional. Requested change to the execution of this rollout. Default RolloutControl.action is ROLLOUT_ACTION_RUN meaning the rollout will be executed to completion while progressing through all natural Rollout States (such as RUNNING -> SUCCEEDED or RUNNING -> FAILED). Requests can only be made when the Rollout is in a non-terminal state. |
| `createTime` | string (google-datetime) | Output only. The timestamp when the resource was created. |
| `deleteTime` | string (google-datetime) | Output only. The timestamp when the resource was marked for deletion (deletion is an asynchronous operation). |
| `effectiveUnitFilter` | string | Optional. Output only. Output only snapshot of the effective unit filter at Rollout start time. Contains a CEL(https://github.com/google/cel-spec) expression consisting of a conjunction of Rollout.unit_filter and RolloutKind.unit_filter. This field captures the filter applied by the Rollout to determine the Unit population. If the associated RolloutKind's unit_filter is modified after the rollout is started, it will not be updated here. |
| `endTime` | string (google-datetime) | Optional. Output only. The time when the rollout finished execution (regardless of success, failure, or cancellation). Will be empty if the rollout hasn't finished yet. Once set, the rollout is in terminal state and all the results are final. |
| `etag` | string | Output only. An opaque value that uniquely identifies a version or generation of a resource. It can be used to confirm that the client and server agree on the ordering of a resource being written. |
| `labels` | object | Optional. The labels on the resource, which can be used for categorization. similar to Kubernetes resource labels. |
| `name` | string | Identifier. The resource name (full URI of the resource) following the standard naming scheme: "projects/{project}/locations/{location}/rollout/{rollout_id}" |
| `parentRollout` | string | Optional. Output only. The direct parent rollout that this rollout is stemming from. The resource name (full URI of the resource) following the standard naming scheme: "projects/{project}/locations/{location}/rollouts/{rollout_id}" |
| `release` | string | Optional. Immutable. Name of the Release that gets rolled out to target Units. Required if no other type of release is specified. |
| `rolloutKind` | string | Required. Immutable. Name of the RolloutKind this rollout is stemming from and adhering to. |
| `rolloutOrchestrationStrategy` | string | Optional. The strategy used for executing this Rollout. This strategy will override whatever strategy is specified in the RolloutKind. If not specified on creation, the strategy from RolloutKind will be used. There are two supported values strategies which are used to control - "Google.Cloud.Simple.AllAtOnce" - "Google.Cloud.Simple.OneLocationAtATime" A rollout with one of these simple strategies will rollout across all locations defined in the targeted UnitKind's Saas Locations. |
| `rootRollout` | string | Optional. Output only. The root rollout that this rollout is stemming from. The resource name (full URI of the resource) following the standard naming scheme: "projects/{project}/locations/{location}/rollouts/{rollout_id}" |
| `startTime` | string (google-datetime) | Optional. Output only. The time when the rollout started executing. Will be empty if the rollout hasn't started yet. |
| `state` | string enum | Output only. Current state of the rollout. Values: `ROLLOUT_STATE_UNSPECIFIED`, `ROLLOUT_STATE_RUNNING`, `ROLLOUT_STATE_PAUSED`, `ROLLOUT_STATE_SUCCEEDED`, `ROLLOUT_STATE_FAILED`, `ROLLOUT_STATE_CANCELLED`, `ROLLOUT_STATE_WAITING`, `ROLLOUT_STATE_CANCELLING`, `ROLLOUT_STATE_RESUMING`, `ROLLOUT_STATE_PAUSING`. |
| `stateMessage` | string | Output only. Human readable message indicating details about the last state transition. |
| `stateTransitionTime` | string (google-datetime) | Optional. Output only. The time when the rollout transitioned into its current state. |
| `stats` | RolloutStats | Optional. Output only. Details about the progress of the rollout. |
| `uid` | string | Output only. The unique identifier of the resource. UID is unique in the time and space for this resource within the scope of the service. It is typically generated by the server on successful creation of a resource and must not be changed. UID is used to uniquely identify resources with resource name reuses. This should be a UUID4. |
| `unitFilter` | string | Optional. CEL(https://github.com/google/cel-spec) formatted filter string against Unit. The filter will be applied to determine the eligible unit population. This filter can only reduce, but not expand the scope of the rollout. If not provided, the unit_filter from the RolloutKind will be used. |
| `updateTime` | string (google-datetime) | Output only. The timestamp when the resource was last updated. Any change to the resource made by users must refresh this value. Changes to a resource made by the service should refresh this value. |

### `Rollout` (v1beta1)

- Represents a single rollout execution and its results
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `annotations` | object | Optional. Annotations is an unstructured key-value map stored with a resource that may be set by external tools to store and retrieve arbitrary metadata. They are not queryable and should be preserved when modifying objects. More info: https://kubernetes.io/docs/user-guide/annotations |
| `control` | RolloutControl | Optional. Requested change to the execution of this rollout. Default RolloutControl.action is ROLLOUT_ACTION_RUN meaning the rollout will be executed to completion while progressing through all natural Rollout States (such as RUNNING -> SUCCEEDED or RUNNING -> FAILED). Requests can only be made when the Rollout is in a non-terminal state. |
| `createTime` | string (google-datetime) | Output only. The timestamp when the resource was created. |
| `deleteTime` | string (google-datetime) | Output only. The timestamp when the resource was marked for deletion (deletion is an asynchronous operation). |
| `effectiveUnitFilter` | string | Optional. Output only. Output only snapshot of the effective unit filter at Rollout start time. Contains a CEL(https://github.com/google/cel-spec) expression consisting of a conjunction of Rollout.unit_filter and RolloutKind.unit_filter. This field captures the filter applied by the Rollout to determine the Unit population. If the associated RolloutKind's unit_filter is modified after the rollout is started, it will not be updated here. |
| `endTime` | string (google-datetime) | Optional. Output only. The time when the rollout finished execution (regardless of success, failure, or cancellation). Will be empty if the rollout hasn't finished yet. Once set, the rollout is in terminal state and all the results are final. |
| `etag` | string | Output only. An opaque value that uniquely identifies a version or generation of a resource. It can be used to confirm that the client and server agree on the ordering of a resource being written. |
| `flagRelease` | string | Optional. Immutable. Name of the FlagRelease to be rolled out to the target Units. Release and FlagRelease are mutually exclusive. |
| `labels` | object | Optional. The labels on the resource, which can be used for categorization. similar to Kubernetes resource labels. |
| `name` | string | Identifier. The resource name (full URI of the resource) following the standard naming scheme: "projects/{project}/locations/{location}/rollout/{rollout_id}" |
| `parentRollout` | string | Optional. Output only. The direct parent rollout that this rollout is stemming from. The resource name (full URI of the resource) following the standard naming scheme: "projects/{project}/locations/{location}/rollouts/{rollout_id}" |
| `release` | string | Optional. Immutable. Name of the Release that gets rolled out to target Units. Required if no other type of release is specified. |
| `rolloutKind` | string | Required. Immutable. Name of the RolloutKind this rollout is stemming from and adhering to. |
| `rolloutOrchestrationStrategy` | string | Optional. The strategy used for executing this Rollout. This strategy will override whatever strategy is specified in the RolloutKind. If not specified on creation, the strategy from RolloutKind will be used. There are two supported values strategies which are used to control - "Google.Cloud.Simple.AllAtOnce" - "Google.Cloud.Simple.OneLocationAtATime" A rollout with one of these simple strategies will rollout across all locations defined in the targeted UnitKind's Saas Locations. |
| `rootRollout` | string | Optional. Output only. The root rollout that this rollout is stemming from. The resource name (full URI of the resource) following the standard naming scheme: "projects/{project}/locations/{location}/rollouts/{rollout_id}" |
| `startTime` | string (google-datetime) | Optional. Output only. The time when the rollout started executing. Will be empty if the rollout hasn't started yet. |
| `state` | string enum | Output only. Current state of the rollout. Values: `ROLLOUT_STATE_UNSPECIFIED`, `ROLLOUT_STATE_RUNNING`, `ROLLOUT_STATE_PAUSED`, `ROLLOUT_STATE_SUCCEEDED`, `ROLLOUT_STATE_FAILED`, `ROLLOUT_STATE_CANCELLED`, `ROLLOUT_STATE_WAITING`, `ROLLOUT_STATE_CANCELLING`, `ROLLOUT_STATE_RESUMING`, `ROLLOUT_STATE_PAUSING`, `ROLLOUT_STATE_AWAITING_APPROVAL`. |
| `stateMessage` | string | Output only. Human readable message indicating details about the last state transition. |
| `stateTransitionTime` | string (google-datetime) | Optional. Output only. The time when the rollout transitioned into its current state. |
| `stats` | RolloutStats | Optional. Output only. Details about the progress of the rollout. |
| `uid` | string | Output only. The unique identifier of the resource. UID is unique in the time and space for this resource within the scope of the service. It is typically generated by the server on successful creation of a resource and must not be changed. UID is used to uniquely identify resources with resource name reuses. This should be a UUID4. |
| `unitFilter` | string | Optional. CEL(https://github.com/google/cel-spec) formatted filter string against Unit. The filter will be applied to determine the eligible unit population. This filter can only reduce, but not expand the scope of the rollout. If not provided, the unit_filter from the RolloutKind will be used. |
| `updateTime` | string (google-datetime) | Output only. The timestamp when the resource was last updated. Any change to the resource made by users must refresh this value. Changes to a resource made by the service should refresh this value. |

### `RolloutControl`

- RolloutControl provides a way to request a change to the execution of a Rollout by pausing or canceling it.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `action` | string enum | Required. Action to be performed on the Rollout. The default behavior is to run the rollout until it naturally reaches a terminal state. Values: `ROLLOUT_ACTION_UNSPECIFIED`, `ROLLOUT_ACTION_RUN`, `ROLLOUT_ACTION_PAUSE`, `ROLLOUT_ACTION_CANCEL`. |
| `runParams` | RunRolloutActionParams | Optional. Parameters for the RUN action. It is an error to specify this if the RolloutAction is not set to RUN. By default, the rollout will retry failed operations when resumed. |

### `RolloutKind`

- An object that describes various settings of Rollout execution. Includes built-in and customizable policies.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `annotations` | object | Optional. Annotations is an unstructured key-value map stored with a resource that may be set by external tools to store and retrieve arbitrary metadata. They are not queryable and should be preserved when modifying objects. More info: https://kubernetes.io/docs/user-guide/annotations |
| `createTime` | string (google-datetime) | Output only. The timestamp when the resource was created. |
| `errorBudget` | ErrorBudget | Optional. The configuration for error budget. If the number of failed units exceeds max(allowed_count, allowed_ratio \* total_units), the rollout will be paused. If not set, all units will be attempted to be updated regardless of the number of failures encountered. |
| `etag` | string | Output only. An opaque value that uniquely identifies a version or generation of a resource. It can be used to confirm that the client and server agree on the ordering of a resource being written. |
| `labels` | object | Optional. The labels on the resource, which can be used for categorization. similar to Kubernetes resource labels. |
| `name` | string | Identifier. The resource name (full URI of the resource) following the standard naming scheme: "projects/{project}/locations/{location}/rolloutKinds/{rollout_kind_id}" |
| `rolloutOrchestrationStrategy` | string | Optional. The strategy used for executing a Rollout. This is a required field. There are two supported values strategies which are used to control - "Google.Cloud.Simple.AllAtOnce" - "Google.Cloud.Simple.OneLocationAtATime" A rollout with one of these simple strategies will rollout across all locations defined in the associated UnitKind's Saas Locations. |
| `uid` | string | Output only. The unique identifier of the resource. UID is unique in the time and space for this resource within the scope of the service. It is typically generated by the server on successful creation of a resource and must not be changed. UID is used to uniquely identify resources with resource name reuses. This should be a UUID4. |
| `unitFilter` | string | Optional. CEL (https://github.com/google/cel-spec) formatted filter string against Unit. The filter will be applied to determine the eligible unit population. This filter can only reduce, but not expand the scope of the rollout. |
| `unitKind` | string | Optional. Immutable. UnitKind that this rollout kind corresponds to. Rollouts stemming from this rollout kind will target the units of this unit kind. In other words, this defines the population of target units to be upgraded by rollouts. |
| `unitUpdatePacing` | UnitUpdatePacing | Optional. Settings for controlling the pacing of rollouts i.e. the number of units to be rolled out in parallel in a region. |
| `updateTime` | string (google-datetime) | Output only. The timestamp when the resource was last updated. Any change to the resource made by users must refresh this value. Changes to a resource made by the service should refresh this value. |
| `updateUnitKindStrategy` | string enum | Optional. The config for updating the unit kind. By default, the unit kind will be updated on the rollout start. Values: `UPDATE_UNIT_KIND_STRATEGY_UNSPECIFIED`, `UPDATE_UNIT_KIND_STRATEGY_ON_START`, `UPDATE_UNIT_KIND_STRATEGY_NEVER`. |

### `RolloutKind` (v1beta1)

- An object that describes various settings of Rollout execution. Includes built-in and customizable policies.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `annotations` | object | Optional. Annotations is an unstructured key-value map stored with a resource that may be set by external tools to store and retrieve arbitrary metadata. They are not queryable and should be preserved when modifying objects. More info: https://kubernetes.io/docs/user-guide/annotations |
| `createTime` | string (google-datetime) | Output only. The timestamp when the resource was created. |
| `errorBudget` | ErrorBudget | Optional. The configuration for error budget. If the number of failed units exceeds max(allowed_count, allowed_ratio \* total_units), the rollout will be paused. If not set, all units will be attempted to be updated regardless of the number of failures encountered. |
| `etag` | string | Output only. An opaque value that uniquely identifies a version or generation of a resource. It can be used to confirm that the client and server agree on the ordering of a resource being written. |
| `labels` | object | Optional. The labels on the resource, which can be used for categorization. similar to Kubernetes resource labels. |
| `locationType` | string enum | Optional. The location type of the rollout. Based on the location type, the rollout will target the corresponding locations. Values: `LOCATION_TYPE_UNSPECIFIED`, `CLOUD_GLOBAL`, `CLOUD_REGION`, `CLOUD_ZONE`. |
| `name` | string | Identifier. The resource name (full URI of the resource) following the standard naming scheme: "projects/{project}/locations/{location}/rolloutKinds/{rollout_kind_id}" |
| `rolloutOrchestrationStrategy` | string | Optional. The strategy used for executing a Rollout. This is a required field. There are two supported values strategies which are used to control - "Google.Cloud.Simple.AllAtOnce" - "Google.Cloud.Simple.OneLocationAtATime" A rollout with one of these simple strategies will rollout across all locations defined in the associated UnitKind's Saas Locations. |
| `uid` | string | Output only. The unique identifier of the resource. UID is unique in the time and space for this resource within the scope of the service. It is typically generated by the server on successful creation of a resource and must not be changed. UID is used to uniquely identify resources with resource name reuses. This should be a UUID4. |
| `unitFilter` | string | Optional. CEL (https://github.com/google/cel-spec) formatted filter string against Unit. The filter will be applied to determine the eligible unit population. This filter can only reduce, but not expand the scope of the rollout. |
| `unitKind` | string | Optional. Immutable. UnitKind that this rollout kind corresponds to. Rollouts stemming from this rollout kind will target the units of this unit kind. In other words, this defines the population of target units to be upgraded by rollouts. |
| `unitUpdatePacing` | UnitUpdatePacing | Optional. Settings for controlling the pacing of rollouts i.e. the number of units to be rolled out in parallel in a region. |
| `updateTime` | string (google-datetime) | Output only. The timestamp when the resource was last updated. Any change to the resource made by users must refresh this value. Changes to a resource made by the service should refresh this value. |
| `updateUnitKindStrategy` | string enum | Optional. The config for updating the unit kind. By default, the unit kind will be updated on the rollout start. Values: `UPDATE_UNIT_KIND_STRATEGY_UNSPECIFIED`, `UPDATE_UNIT_KIND_STRATEGY_ON_START`, `UPDATE_UNIT_KIND_STRATEGY_NEVER`. |

### `RolloutStats`

- RolloutStats contains information about the progress of a rollout.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `estimatedTotalUnitCount` | string (int64) | Optional. Output only. Estimated number of units based. The estimation is computed upon creation of the rollout. |
| `operationsByState` | array<Aggregate> | Optional. Output only. Unordered list. A breakdown of the progress of operations triggered by the rollout. Provides a count of Operations by their state. This can be used to determine the number of units which have been updated, or are scheduled to be updated. There will be at most one entry per group. Possible values for operation groups are: - "SCHEDULED" - "PENDING" - "RUNNING" - "SUCCEEDED" - "FAILED" - "CANCELLED" |

### `RunRolloutActionParams`

- Parameters for the RUN action controlling the behavior of the rollout when it is resumed from a PAUSED state.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `retryFailedOperations` | boolean | Required. If true, the rollout will retry failed operations when resumed. This is applicable only the current state of the Rollout is PAUSED and the requested action is RUN. |

### `Saas`

- Saas is a representation of a SaaS service managed by the Producer.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `annotations` | object | Optional. Annotations is an unstructured key-value map stored with a resource that may be set by external tools to store and retrieve arbitrary metadata. They are not queryable and should be preserved when modifying objects. More info: https://kubernetes.io/docs/user-guide/annotations |
| `applicationTemplate` | CompositeRef | Optional. Reference to composite ApplicationTemplate. When specified, the template components will be imported into their equivalent UnitKind, Release and Blueprint resources. Deleted references will not delete imported resources. Should only be specified on source regions, and be unspecified on replica regions. |
| `blueprintRepo` | string | Output only. Name of repository in Artifact Registry for system-generated Blueprints, eg. Blueprints of imported ApplicationTemplates. |
| `conditions` | array<SaasCondition> | Output only. A set of conditions which indicate the various conditions this resource can have. |
| `createTime` | string (google-datetime) | Output only. The timestamp when the resource was created. |
| `error` | Status | Output only. If the state is FAILED, the corresponding error code and message. Defaults to code=OK for all other states. |
| `etag` | string | Output only. An opaque value that uniquely identifies a version or generation of a resource. It can be used to confirm that the client and server agree on the ordering of a resource being written. |
| `labels` | object | Optional. The labels on the resource, which can be used for categorization. similar to Kubernetes resource labels. |
| `locations` | array<Location> | Optional. List of locations that the service is available in. Rollout refers to the list to generate a rollout plan. |
| `name` | string | Identifier. The resource name (full URI of the resource) following the standard naming scheme: "projects/{project}/locations/{location}/saas/{saas}" |
| `state` | string enum | Output only. State of the Saas. It is always in STATE_ACTIVE state if the application_template is empty. Values: `STATE_UNSPECIFIED`, `STATE_TYPE_UNSPECIFIED`, `STATE_ACTIVE`, `STATE_RUNNING`, `STATE_FAILED`. |
| `uid` | string | Output only. The unique identifier of the resource. UID is unique in the time and space for this resource within the scope of the service. It is typically generated by the server on successful creation of a resource and must not be changed. UID is used to uniquely identify resources with resource name reuses. This should be a UUID4. |
| `updateTime` | string (google-datetime) | Output only. The timestamp when the resource was last updated. Any change to the resource made by users must refresh this value. Changes to a resource made by the service should refresh this value. |

### `SaasCondition`

- SaasCondition describes the status of a Saas.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `lastTransitionTime` | string (google-datetime) | Required. Last time the condition transited from one status to another. |
| `message` | string | Required. Human readable message indicating details about the last transition. |
| `reason` | string | Required. Brief reason for the condition's last transition. |
| `status` | string enum | Required. Status of the condition. Values: `STATUS_UNSPECIFIED`, `STATUS_UNKNOWN`, `STATUS_TRUE`, `STATUS_FALSE`. |
| `type` | string enum | Required. Type of the condition. Values: `TYPE_UNSPECIFIED`, `TYPE_READY`, `TYPE_SYNCHRONIZED`. |

### `Schedule`

- A time specification to schedule the maintenance.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `startTime` | string (google-datetime) | Optional. Start of operation. If not set, will be set to the start of the next window. (optional) |

### `Scope`

- Scope of an application.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `type` | string enum | Required. Scope Type. Values: `TYPE_UNSPECIFIED`, `TYPE_REGIONAL`, `TYPE_GLOBAL`. |

### `Status`

- The `Status` type defines a logical error model that is suitable for different programming environments, including REST APIs and RPC APIs. It is used by gRPC (https://github.com/grpc). Each `Status` message contains three pieces of data: error code, error message, and error details. You can find out more about this error model and how to work with it in the API Design Guide (https://cloud.google.com/apis/design/errors).
- Version: v1

| Field | Type | Description |
|---|---|---|
| `code` | integer (int32) | The status code, which should be an enum value of google.rpc.Code. |
| `details` | array<object> | A list of messages that carry the error details. There is a common set of message types for APIs to use. |
| `message` | string | A developer-facing error message, which should be in English. Any user-facing error message should be localized and sent in the google.rpc.Status.details field, or localized by the client. |

### `Tenant`

- Tenant represents the service producer side of an instance of the service created based on a request from a consumer. In a typical scenario a Tenant has a one-to-one mapping with a resource given out to a service consumer. Example: tenant: name: "projects/svc1/locations/loc/tenants/inst-068afff8" consumer_resource: "projects/gshoe/locations/loc/shoes/black-shoe"
- Version: v1

| Field | Type | Description |
|---|---|---|
| `annotations` | object | Optional. Annotations is an unstructured key-value map stored with a resource that may be set by external tools to store and retrieve arbitrary metadata. They are not queryable and should be preserved when modifying objects. More info: https://kubernetes.io/docs/user-guide/annotations |
| `consumerResource` | string | Optional. Immutable. A reference to the consumer resource this SaaS Tenant is representing. The relationship with a consumer resource can be used by App Lifecycle Manager for retrieving consumer-defined settings and policies such as maintenance policies (using Unified Maintenance Policy API). |
| `createTime` | string (google-datetime) | Output only. The timestamp when the resource was created. |
| `etag` | string | Output only. An opaque value that uniquely identifies a version or generation of a resource. It can be used to confirm that the client and server agree on the ordering of a resource being written. |
| `labels` | object | Optional. The labels on the resource, which can be used for categorization. similar to Kubernetes resource labels. |
| `name` | string | Identifier. The resource name (full URI of the resource) following the standard naming scheme: "projects/{project}/locations/{location}/tenants/{tenant}" |
| `saas` | string | Required. Immutable. A reference to the Saas that defines the product (managed service) that the producer wants to manage with App Lifecycle Manager. Part of the App Lifecycle Manager common data model. |
| `uid` | string | Output only. The unique identifier of the resource. UID is unique in the time and space for this resource within the scope of the service. It is typically generated by the server on successful creation of a resource and must not be changed. UID is used to uniquely identify resources with resource name reuses. This should be a UUID4. |
| `updateTime` | string (google-datetime) | Output only. The timestamp when the resource was last updated. Any change to the resource made by users must refresh this value. Changes to a resource made by the service should refresh this value. |

### `ToMapping`

- Input variables whose values will be passed on to dependencies
- Version: v1

| Field | Type | Description |
|---|---|---|
| `dependency` | string | Required. Alias of the dependency that the inputVariable will pass its value to |
| `ignoreForLookup` | boolean | Optional. Tells App Lifecycle Manager if this mapping should be used during lookup or not |
| `inputVariable` | string | Required. Name of the inputVariable on the dependency |

### `Unit`

- A unit of deployment that has its lifecycle via a CRUD API using an actuation engine under the hood (e.g. based on Terraform, or a custom implementation provided by a service producer). A building block of a SaaS Tenant.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `annotations` | object | Optional. Annotations is an unstructured key-value map stored with a resource that may be set by external tools to store and retrieve arbitrary metadata. They are not queryable and should be preserved when modifying objects. More info: https://kubernetes.io/docs/user-guide/annotations |
| `application` | string | Optional. Reference to the AppHub Application this unit belongs to. All resources deployed in this Unit will be associated with the specified Application. |
| `conditions` | array<UnitCondition> | Optional. Output only. A set of conditions which indicate the various conditions this resource can have. |
| `createTime` | string (google-datetime) | Output only. The timestamp when the resource was created. |
| `dependencies` | array<UnitDependency> | Optional. Output only. Set of dependencies for this unit. Maximum 10. |
| `dependents` | array<UnitDependency> | Optional. Output only. List of Units that depend on this unit. Unit can only be deprovisioned if this list is empty. Maximum 1000. |
| `etag` | string | Output only. An opaque value that uniquely identifies a version or generation of a resource. It can be used to confirm that the client and server agree on the ordering of a resource being written. |
| `inputVariables` | array<UnitVariable> | Optional. Output only. Indicates the current input variables deployed by the unit |
| `labels` | object | Optional. The labels on the resource, which can be used for categorization. similar to Kubernetes resource labels. |
| `maintenance` | MaintenanceSettings | Optional. Captures requested directives for performing future maintenance on the unit. This includes a request for the unit to skip maintenance for a period of time and remain pinned to its current release as well as controls for postponing maintenance scheduled in future. |
| `managementMode` | string enum | Optional. Immutable. Indicates whether the Unit life cycle is controlled by the user or by the system. Immutable once created. Values: `MANAGEMENT_MODE_UNSPECIFIED`, `MANAGEMENT_MODE_USER`, `MANAGEMENT_MODE_SYSTEM`. |
| `name` | string | Identifier. The resource name (full URI of the resource) following the standard naming scheme: "projects/{project}/locations/{location}/units/{unit}" |
| `ongoingOperations` | array<string> | Optional. Output only. List of concurrent UnitOperations that are operating on this Unit. |
| `outputVariables` | array<UnitVariable> | Optional. Output only. Set of key/value pairs corresponding to output variables from execution of actuation templates. The variables are declared in actuation configs (in Terraform for example) and the values are fetched and returned by the actuation engine upon completion of execution. |
| `pendingOperations` | array<string> | Optional. Output only. List of pending (wait to be executed) UnitOperations for this unit. |
| `release` | string | Optional. Output only. The current Release object for this Unit. |
| `satisfiesPzi` | boolean | Output only. Reserved for future use. |
| `satisfiesPzs` | boolean | Output only. Indicates whether the resource location satisfies Zone Separation constraints. This is false by default. |
| `scheduledOperations` | array<string> | Optional. Output only. List of scheduled UnitOperations for this unit. |
| `state` | string enum | Optional. Output only. Current lifecycle state of the resource (e.g. if it's being created or ready to use). Values: `UNIT_STATE_UNSPECIFIED`, `UNIT_STATE_NOT_PROVISIONED`, `UNIT_STATE_PROVISIONING`, `UNIT_STATE_UPDATING`, `UNIT_STATE_DEPROVISIONING`, `UNIT_STATE_READY`, `UNIT_STATE_ERROR`. |
| `systemCleanupAt` | string (google-datetime) | Optional. Output only. If set, indicates the time when the system will start removing the unit. |
| `systemManagedState` | string enum | Optional. Output only. Indicates the system managed state of the unit. Values: `SYSTEM_MANAGED_STATE_UNSPECIFIED`, `SYSTEM_MANAGED_STATE_ACTIVE`, `SYSTEM_MANAGED_STATE_INACTIVE`, `SYSTEM_MANAGED_STATE_DECOMMISSIONED`. |
| `tenant` | string | Optional. Reference to the Saas Tenant resource this unit belongs to. This for example informs the maintenance policies to use for scheduling future updates on a unit. (optional and immutable once created) |
| `uid` | string | Output only. The unique identifier of the resource. UID is unique in the time and space for this resource within the scope of the service. It is typically generated by the server on successful creation of a resource and must not be changed. UID is used to uniquely identify resources with resource name reuses. This should be a UUID4. |
| `unitKind` | string | Optional. Reference to the UnitKind this Unit belongs to. Immutable once set. |
| `updateTime` | string (google-datetime) | Output only. The timestamp when the resource was last updated. Any change to the resource made by users must refresh this value. Changes to a resource made by the service should refresh this value. |

### `Unit` (v1beta1)

- A unit of deployment that has its lifecycle via a CRUD API using an actuation engine under the hood (e.g. based on Terraform, or a custom implementation provided by a service producer). A building block of a SaaS Tenant.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `annotations` | object | Optional. Annotations is an unstructured key-value map stored with a resource that may be set by external tools to store and retrieve arbitrary metadata. They are not queryable and should be preserved when modifying objects. More info: https://kubernetes.io/docs/user-guide/annotations |
| `application` | string | Optional. Reference to the AppHub Application this unit belongs to. All resources deployed in this Unit will be associated with the specified Application. |
| `conditions` | array<UnitCondition> | Optional. Output only. A set of conditions which indicate the various conditions this resource can have. |
| `createTime` | string (google-datetime) | Output only. The timestamp when the resource was created. |
| `dependencies` | array<UnitDependency> | Optional. Output only. Set of dependencies for this unit. Maximum 10. |
| `dependents` | array<UnitDependency> | Optional. Output only. List of Units that depend on this unit. Unit can only be deprovisioned if this list is empty. Maximum 1000. |
| `deploymentLocation` | Location | Optional. Deployment location of the unit. Deployment location is used to determine which cloud_zone, prod_zone or prod_region to use for the unit. |
| `engine` | Engine | Optional. Output only. Metadata about the underlying actuation engine instance managing this Unit. |
| `etag` | string | Output only. An opaque value that uniquely identifies a version or generation of a resource. It can be used to confirm that the client and server agree on the ordering of a resource being written. |
| `flagConfigName` | string | Output only. This field stores the unique identifier for the flag configuration to be used by this Unit. |
| `flagRevisions` | array<string> | Optional. Output only. Flag revisions used by this Unit. |
| `inputVariables` | array<UnitVariable> | Optional. Output only. Indicates the current input variables deployed by the unit |
| `labels` | object | Optional. The labels on the resource, which can be used for categorization. similar to Kubernetes resource labels. |
| `maintenance` | MaintenanceSettings | Optional. Captures requested directives for performing future maintenance on the unit. This includes a request for the unit to skip maintenance for a period of time and remain pinned to its current release as well as controls for postponing maintenance scheduled in future. |
| `managementMode` | string enum | Optional. Immutable. Indicates whether the Unit life cycle is controlled by the user or by the system. Immutable once created. Values: `MANAGEMENT_MODE_UNSPECIFIED`, `MANAGEMENT_MODE_USER`, `MANAGEMENT_MODE_SYSTEM`. |
| `name` | string | Identifier. The resource name (full URI of the resource) following the standard naming scheme: "projects/{project}/locations/{location}/units/{unit}" |
| `ongoingOperations` | array<string> | Optional. Output only. List of concurrent UnitOperations that are operating on this Unit. |
| `outputVariables` | array<UnitVariable> | Optional. Output only. Set of key/value pairs corresponding to output variables from execution of actuation templates. The variables are declared in actuation configs (in Terraform for example) and the values are fetched and returned by the actuation engine upon completion of execution. |
| `pendingOperations` | array<string> | Optional. Output only. List of pending (wait to be executed) UnitOperations for this unit. |
| `release` | string | Optional. Output only. The current Release object for this Unit. |
| `satisfiesPzi` | boolean | Output only. Reserved for future use. |
| `satisfiesPzs` | boolean | Output only. Indicates whether the resource location satisfies Zone Separation constraints. This is false by default. |
| `scheduledOperations` | array<string> | Optional. Output only. List of scheduled UnitOperations for this unit. |
| `state` | string enum | Optional. Output only. Current lifecycle state of the resource (e.g. if it's being created or ready to use). Values: `UNIT_STATE_UNSPECIFIED`, `UNIT_STATE_NOT_PROVISIONED`, `UNIT_STATE_PROVISIONING`, `UNIT_STATE_UPDATING`, `UNIT_STATE_DEPROVISIONING`, `UNIT_STATE_READY`, `UNIT_STATE_ERROR`. |
| `systemCleanupAt` | string (google-datetime) | Optional. Output only. If set, indicates the time when the system will start removing the unit. |
| `systemManagedState` | string enum | Optional. Output only. Indicates the system managed state of the unit. Values: `SYSTEM_MANAGED_STATE_UNSPECIFIED`, `SYSTEM_MANAGED_STATE_ACTIVE`, `SYSTEM_MANAGED_STATE_INACTIVE`, `SYSTEM_MANAGED_STATE_DECOMMISSIONED`. |
| `tenant` | string | Optional. Reference to the Saas Tenant resource this unit belongs to. This for example informs the maintenance policies to use for scheduling future updates on a unit. (optional and immutable once created) |
| `uid` | string | Output only. The unique identifier of the resource. UID is unique in the time and space for this resource within the scope of the service. It is typically generated by the server on successful creation of a resource and must not be changed. UID is used to uniquely identify resources with resource name reuses. This should be a UUID4. |
| `unitGroup` | string | Optional. Output only. Reference to the UnitGroup this unit belongs to. |
| `unitKind` | string | Optional. Reference to the UnitKind this Unit belongs to. Immutable once set. |
| `updateTime` | string (google-datetime) | Output only. The timestamp when the resource was last updated. Any change to the resource made by users must refresh this value. Changes to a resource made by the service should refresh this value. |

### `UnitCondition`

- UnitCondition describes the status of an Unit. UnitCondition is individual components that contribute to an overall state.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `lastTransitionTime` | string (google-datetime) | Required. Last time the condition transited from one status to another. |
| `message` | string | Required. Human readable message indicating details about the last transition. |
| `reason` | string | Required. Brief reason for the condition's last transition. |
| `status` | string enum | Required. Status of the condition. Values: `STATUS_UNSPECIFIED`, `STATUS_UNKNOWN`, `STATUS_TRUE`, `STATUS_FALSE`. |
| `type` | string enum | Required. Type of the condition. Values: `TYPE_UNSPECIFIED`, `TYPE_READY`, `TYPE_UPDATING`, `TYPE_PROVISIONED`, `TYPE_OPERATION_ERROR`, `TYPE_FLAGS_CONFIG_INITIALIZED`, `TYPE_APP_CREATED_OR_ALREADY_EXISTS`, `TYPE_APP_COMPONENTS_REGISTERED`. |

### `UnitDependency`

- Set of dependencies for this unit. Maximum 10.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `alias` | string | Output only. Alias for the name of the dependency. |
| `unit` | string | Output only. A reference to the Unit object. |

### `UnitGroup`

- UnitGroup represents a set of Units to be used by a Tenant. In pooling scenarios, the UnitGroup may be created and provisioned before the Tenant is created.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `annotations` | object | Optional. Annotations is an unstructured key-value map stored with a resource that may be set by external tools to store and retrieve arbitrary metadata. They are not queryable and should be preserved when modifying objects. More info: https://kubernetes.io/docs/user-guide/annotations |
| `createTime` | string (google-datetime) | Output only. The timestamp when the resource was created. |
| `etag` | string | Output only. An opaque value that uniquely identifies a version or generation of a resource. It can be used to confirm that the client and server agree on the ordering of a resource being written. |
| `labels` | object | Optional. The labels on the resource, which can be used for categorization. similar to Kubernetes resource labels. |
| `name` | string | Identifier. The resource name (full URI of the resource) following the standard naming scheme: "projects/{project}/locations/{location}/unitGroups/{unitGroup}" |
| `uid` | string | Output only. The unique identifier of the resource. UID is unique in the time and space for this resource within the scope of the service. It is typically generated by the server on successful creation of a resource and must not be changed. UID is used to uniquely identify resources with resource name reuses. This should be a UUID4. |
| `updateTime` | string (google-datetime) | Output only. The timestamp when the resource was last updated. Any change to the resource made by users must refresh this value. Changes to a resource made by the service should refresh this value. |

### `UnitGroupOperation`

- UnitGroupOperation represents an operation on a UnitGroup.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `annotations` | object | Optional. Annotations is an unstructured key-value map stored with a resource that may be set by external tools to store and retrieve arbitrary metadata. They are not queryable and should be preserved when modifying objects. More info: https://kubernetes.io/docs/user-guide/annotations |
| `createTime` | string (google-datetime) | Output only. The timestamp when the resource was created. |
| `deleteTime` | string (google-datetime) | Output only. The timestamp when the resource was marked for deletion (deletion is an asynchronous operation). |
| `etag` | string | Output only. An opaque value that uniquely identifies a version or generation of a resource. It can be used to confirm that the client and server agree on the ordering of a resource being written. |
| `labels` | object | Optional. The labels on the resource, which can be used for categorization. similar to Kubernetes resource labels. |
| `name` | string | Identifier. The resource name (full URI of the resource) following the standard naming scheme: "projects/{project}/locations/{location}/unitGroupOperations/{unitGroupOperation}" |
| `uid` | string | Output only. The unique identifier of the resource. UID is unique in the time and space for this resource within the scope of the service. It is typically generated by the server on successful creation of a resource and must not be changed. UID is used to uniquely identify resources with resource name reuses. This should be a UUID4. |
| `updateTime` | string (google-datetime) | Output only. The timestamp when the resource was last updated. Any change to the resource made by users must refresh this value. Changes to a resource made by the service should refresh this value. |

### `UnitKind`

- Definition of a Unit. Units belonging to the same UnitKind are managed together; for example they follow the same release model (blueprints, versions etc.) and are typically rolled out together.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `annotations` | object | Optional. Annotations is an unstructured key-value map stored with a resource that may be set by external tools to store and retrieve arbitrary metadata. They are not queryable and should be preserved when modifying objects. More info: https://kubernetes.io/docs/user-guide/annotations |
| `appParams` | AppParams | Optional. AppParams contains the parameters for creating an AppHub Application. |
| `applicationTemplateComponent` | ComponentRef | Optional. Reference to component and revision in a composite ApplicationTemplate. |
| `boundaryType` | string enum | Optional. Output only. BoundaryType describes the type of boundary the Unit Kind represents. Values: `BOUNDARY_TYPE_UNSPECIFIED`, `BOUNDARY_TYPE_TENANT_PROJECT`, `BOUNDARY_TYPE_MANAGED_PROJECT`. |
| `createTime` | string (google-datetime) | Output only. The timestamp when the resource was created. |
| `defaultRelease` | string | Optional. A reference to the Release object to use as default for creating new units of this UnitKind (optional). If not specified, a new unit must explicitly reference which release to use for its creation. |
| `deleteTime` | string (google-datetime) | Output only. The timestamp when the resource was marked for deletion (deletion is an asynchronous operation). |
| `dependencies` | array<Dependency> | Optional. Immutable. List of other unit kinds that this release will depend on. Dependencies will be automatically provisioned if not found. Maximum 10. |
| `durationLimits` | DurationLimits | Optional. Defines the default duration limits for UnitOperations created from this UnitKind. These settings provide a baseline for execution time constraints. The limits specified here can be overridden by more specific settings on an individual UnitOperation resource. See the DurationLimits message definition for details on the constraints like minimum, maximum, and system default values for unit_operation_timeout. If not set, UnitOperations will use the system default duration limits unless overridden on the UnitOperation. |
| `etag` | string | Output only. An opaque value that uniquely identifies a version or generation of a resource. It can be used to confirm that the client and server agree on the ordering of a resource being written. |
| `inputVariableMappings` | array<VariableMapping> | Optional. List of inputVariables for this release that will either be retrieved from a dependency's outputVariables, or will be passed on to a dependency's inputVariables. Maximum 100. |
| `labels` | object | Optional. The labels on the resource, which can be used for categorization. similar to Kubernetes resource labels. |
| `name` | string | Identifier. The resource name (full URI of the resource) following the standard naming scheme: "projects/{project}/locations/{location}/unitKinds/{unitKind}" |
| `outputVariableMappings` | array<VariableMapping> | Optional. List of outputVariables for this unit kind will be passed to this unit's outputVariables. Maximum 100. |
| `saas` | string | Required. Immutable. A reference to the Saas that defines the product (managed service) that the producer wants to manage with App Lifecycle Manager. Part of the App Lifecycle Manager common data model. Immutable once set. |
| `uid` | string | Output only. The unique identifier of the resource. UID is unique in the time and space for this resource within the scope of the service. It is typically generated by the server on successful creation of a resource and must not be changed. UID is used to uniquely identify resources with resource name reuses. This should be a UUID4. |
| `updateTime` | string (google-datetime) | Output only. The timestamp when the resource was last updated. Any change to the resource made by users must refresh this value. Changes to a resource made by the service should refresh this value. |

### `UnitKind` (v1beta1)

- Definition of a Unit. Units belonging to the same UnitKind are managed together; for example they follow the same release model (blueprints, versions etc.) and are typically rolled out together.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `annotations` | object | Optional. Annotations is an unstructured key-value map stored with a resource that may be set by external tools to store and retrieve arbitrary metadata. They are not queryable and should be preserved when modifying objects. More info: https://kubernetes.io/docs/user-guide/annotations |
| `appParams` | AppParams | Optional. AppParams contains the parameters for creating an AppHub Application. |
| `applicationTemplateComponent` | ComponentRef | Optional. Reference to component and revision in a composite ApplicationTemplate. |
| `boundaryType` | string enum | Optional. Output only. BoundaryType describes the type of boundary the Unit Kind represents. Values: `BOUNDARY_TYPE_UNSPECIFIED`, `BOUNDARY_TYPE_TENANT_PROJECT`, `BOUNDARY_TYPE_MANAGED_PROJECT`. |
| `createTime` | string (google-datetime) | Output only. The timestamp when the resource was created. |
| `defaultFlagRevisions` | array<string> | Optional. Default revisions of flags for this UnitKind. Newly created units will use the flag default_flag_revisions present at the time of creation. |
| `defaultRelease` | string | Optional. A reference to the Release object to use as default for creating new units of this UnitKind (optional). If not specified, a new unit must explicitly reference which release to use for its creation. |
| `deleteTime` | string (google-datetime) | Output only. The timestamp when the resource was marked for deletion (deletion is an asynchronous operation). |
| `dependencies` | array<Dependency> | Optional. Immutable. List of other unit kinds that this release will depend on. Dependencies will be automatically provisioned if not found. Maximum 10. |
| `durationLimits` | DurationLimits | Optional. Defines the default duration limits for UnitOperations created from this UnitKind. These settings provide a baseline for execution time constraints. The limits specified here can be overridden by more specific settings on an individual UnitOperation resource. See the DurationLimits message definition for details on the constraints like minimum, maximum, and system default values for unit_operation_timeout. If not set, UnitOperations will use the system default duration limits unless overridden on the UnitOperation. |
| `etag` | string | Output only. An opaque value that uniquely identifies a version or generation of a resource. It can be used to confirm that the client and server agree on the ordering of a resource being written. |
| `inputVariableMappings` | array<VariableMapping> | Optional. List of inputVariables for this release that will either be retrieved from a dependency's outputVariables, or will be passed on to a dependency's inputVariables. Maximum 100. |
| `labels` | object | Optional. The labels on the resource, which can be used for categorization. similar to Kubernetes resource labels. |
| `name` | string | Identifier. The resource name (full URI of the resource) following the standard naming scheme: "projects/{project}/locations/{location}/unitKinds/{unitKind}" |
| `outputVariableMappings` | array<VariableMapping> | Optional. List of outputVariables for this unit kind will be passed to this unit's outputVariables. Maximum 100. |
| `saas` | string | Required. Immutable. A reference to the Saas that defines the product (managed service) that the producer wants to manage with App Lifecycle Manager. Part of the App Lifecycle Manager common data model. Immutable once set. |
| `uid` | string | Output only. The unique identifier of the resource. UID is unique in the time and space for this resource within the scope of the service. It is typically generated by the server on successful creation of a resource and must not be changed. UID is used to uniquely identify resources with resource name reuses. This should be a UUID4. |
| `updateTime` | string (google-datetime) | Output only. The timestamp when the resource was last updated. Any change to the resource made by users must refresh this value. Changes to a resource made by the service should refresh this value. |

### `UnitOperation`

- UnitOperation encapsulates the intent of changing/interacting with the service component represented by the specific Unit. Multiple UnitOperations can be created (requested) and scheduled in the future, however only one will be allowed to execute at a time (that can change in the future for non-mutating operations). UnitOperations allow different actors interacting with the same unit to focus only on the change they have requested. This is a base object that contains the common fields in all unit operations. Next: 22
- Version: v1

| Field | Type | Description |
|---|---|---|
| `annotations` | object | Optional. Annotations is an unstructured key-value map stored with a resource that may be set by external tools to store and retrieve arbitrary metadata. They are not queryable and should be preserved when modifying objects. More info: https://kubernetes.io/docs/user-guide/annotations |
| `cancel` | boolean | Optional. When true, attempt to cancel the operation. Cancellation may fail if the operation is already executing. (Optional) |
| `conditions` | array<UnitOperationCondition> | Optional. Output only. A set of conditions which indicate the various conditions this resource can have. |
| `createTime` | string (google-datetime) | Output only. The timestamp when the resource was created. |
| `deleteTime` | string (google-datetime) | Output only. The timestamp when the resource was marked for deletion (deletion is an asynchronous operation). |
| `deprovision` | Deprovision | Optional. Deprovision operation. |
| `durationLimits` | DurationLimits | Optional. Defines the duration limits for this specific UnitOperation instance. These settings override any default duration limits set on the UnitKind. See the DurationLimits message definition for details on the constraints like minimum, maximum, and system default values for unit_operation_timeout. |
| `engineState` | string | Optional. Output only. The engine state for on-going deployment engine operation(s). This field is opaque for external usage. |
| `errorCategory` | string enum | Optional. Output only. UnitOperationErrorCategory describe the error category. Values: `UNIT_OPERATION_ERROR_CATEGORY_UNSPECIFIED`, `NOT_APPLICABLE`, `FATAL`, `RETRIABLE`, `IGNORABLE`, `STANDARD`. |
| `etag` | string | Output only. An opaque value that uniquely identifies a version or generation of a resource. It can be used to confirm that the client and server agree on the ordering of a resource being written. |
| `labels` | object | Optional. The labels on the resource, which can be used for categorization. similar to Kubernetes resource labels. |
| `name` | string | Identifier. The resource name (full URI of the resource) following the standard naming scheme: "projects/{project}/locations/{location}/unitOperations/{unitOperation}" |
| `parentUnitOperation` | string | Optional. Reference to parent resource: UnitOperation. If an operation needs to create other operations as part of its workflow, each of the child operations should have this field set to the parent. This can be used for tracing. (Optional) |
| `provision` | Provision | Optional. Provision operation. |
| `rollout` | string | Optional. Specifies which rollout created this Unit Operation. This cannot be modified and is used for filtering purposes only. If a dependent unit and unit operation are created as part of another unit operation, they will use the same rolloutId. |
| `schedule` | Schedule | Optional. When to schedule this operation. |
| `state` | string enum | Optional. Output only. UnitOperationState describes the current state of the unit operation. Values: `UNIT_OPERATION_STATE_UNKNOWN`, `UNIT_OPERATION_STATE_PENDING`, `UNIT_OPERATION_STATE_SCHEDULED`, `UNIT_OPERATION_STATE_RUNNING`, `UNIT_OPERATION_STATE_SUCCEEDED`, `UNIT_OPERATION_STATE_FAILED`, `UNIT_OPERATION_STATE_CANCELLED`. |
| `uid` | string | Output only. The unique identifier of the resource. UID is unique in the time and space for this resource within the scope of the service. It is typically generated by the server on successful creation of a resource and must not be changed. UID is used to uniquely identify resources with resource name reuses. This should be a UUID4. |
| `unit` | string | Required. Immutable. The Unit a given UnitOperation will act upon. |
| `updateTime` | string (google-datetime) | Output only. The timestamp when the resource was last updated. Any change to the resource made by users must refresh this value. Changes to a resource made by the service should refresh this value. |
| `upgrade` | Upgrade | Optional. Upgrade operation. |

### `UnitOperation` (v1beta1)

- UnitOperation encapsulates the intent of changing/interacting with the service component represented by the specific Unit. Multiple UnitOperations can be created (requested) and scheduled in the future, however only one will be allowed to execute at a time (that can change in the future for non-mutating operations). UnitOperations allow different actors interacting with the same unit to focus only on the change they have requested. This is a base object that contains the common fields in all unit operations. Next: 22
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `annotations` | object | Optional. Annotations is an unstructured key-value map stored with a resource that may be set by external tools to store and retrieve arbitrary metadata. They are not queryable and should be preserved when modifying objects. More info: https://kubernetes.io/docs/user-guide/annotations |
| `cancel` | boolean | Optional. When true, attempt to cancel the operation. Cancellation may fail if the operation is already executing. (Optional) |
| `conditions` | array<UnitOperationCondition> | Optional. Output only. A set of conditions which indicate the various conditions this resource can have. |
| `createTime` | string (google-datetime) | Output only. The timestamp when the resource was created. |
| `deleteTime` | string (google-datetime) | Output only. The timestamp when the resource was marked for deletion (deletion is an asynchronous operation). |
| `deprovision` | Deprovision | Optional. Deprovision operation. |
| `durationLimits` | DurationLimits | Optional. Defines the duration limits for this specific UnitOperation instance. These settings override any default duration limits set on the UnitKind. See the DurationLimits message definition for details on the constraints like minimum, maximum, and system default values for unit_operation_timeout. |
| `engineState` | string | Optional. Output only. The engine state for on-going deployment engine operation(s). This field is opaque for external usage. |
| `errorCategory` | string enum | Optional. Output only. UnitOperationErrorCategory describe the error category. Values: `UNIT_OPERATION_ERROR_CATEGORY_UNSPECIFIED`, `NOT_APPLICABLE`, `FATAL`, `RETRIABLE`, `IGNORABLE`, `STANDARD`. |
| `etag` | string | Output only. An opaque value that uniquely identifies a version or generation of a resource. It can be used to confirm that the client and server agree on the ordering of a resource being written. |
| `flagUpdate` | FlagUpdate | Optional. Flag update operation. |
| `labels` | object | Optional. The labels on the resource, which can be used for categorization. similar to Kubernetes resource labels. |
| `name` | string | Identifier. The resource name (full URI of the resource) following the standard naming scheme: "projects/{project}/locations/{location}/unitOperations/{unitOperation}" |
| `parentUnitOperation` | string | Optional. Reference to parent resource: UnitOperation. If an operation needs to create other operations as part of its workflow, each of the child operations should have this field set to the parent. This can be used for tracing. (Optional) |
| `provision` | Provision | Optional. Provision operation. |
| `rollout` | string | Optional. Specifies which rollout created this Unit Operation. This cannot be modified and is used for filtering purposes only. If a dependent unit and unit operation are created as part of another unit operation, they will use the same rolloutId. |
| `schedule` | Schedule | Optional. When to schedule this operation. |
| `state` | string enum | Optional. Output only. UnitOperationState describes the current state of the unit operation. Values: `UNIT_OPERATION_STATE_UNKNOWN`, `UNIT_OPERATION_STATE_PENDING`, `UNIT_OPERATION_STATE_SCHEDULED`, `UNIT_OPERATION_STATE_RUNNING`, `UNIT_OPERATION_STATE_SUCCEEDED`, `UNIT_OPERATION_STATE_FAILED`, `UNIT_OPERATION_STATE_CANCELLED`. |
| `uid` | string | Output only. The unique identifier of the resource. UID is unique in the time and space for this resource within the scope of the service. It is typically generated by the server on successful creation of a resource and must not be changed. UID is used to uniquely identify resources with resource name reuses. This should be a UUID4. |
| `unit` | string | Required. Immutable. The Unit a given UnitOperation will act upon. |
| `updateTime` | string (google-datetime) | Output only. The timestamp when the resource was last updated. Any change to the resource made by users must refresh this value. Changes to a resource made by the service should refresh this value. |
| `upgrade` | Upgrade | Optional. Upgrade operation. |

### `UnitOperationCondition`

- UnitOperationCondition describes the status of an Unit Operation. UnitOperationCondition is individual components that contribute to an overall state.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `lastTransitionTime` | string (google-datetime) | Required. Last time the condition transited from one status to another. |
| `message` | string | Required. Human readable message indicating details about the last transition. |
| `reason` | string | Required. Brief reason for the condition's last transition. |
| `status` | string enum | Required. Status of the condition. Values: `STATUS_UNSPECIFIED`, `STATUS_UNKNOWN`, `STATUS_TRUE`, `STATUS_FALSE`. |
| `type` | string enum | Required. Type of the condition. Values: `TYPE_UNSPECIFIED`, `TYPE_SCHEDULED`, `TYPE_RUNNING`, `TYPE_SUCCEEDED`, `TYPE_CANCELLED`, `TYPE_APP_CREATED`, `TYPE_APP_COMPONENTS_REGISTERED`, `TYPE_WORKLOAD_SUCCEEDED`. |

### `UnitUpdatePacing`

- UnitUpdatePacing defines the policy for the maximum number of unit operations that can run for a rollout in parallel in a single region.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `maxConcurrentOperationsCount` | integer (int32) | Optional. An absolute cap on concurrent units operations. If both percent and count are provided, the system uses the MINIMUM (most restrictive). |
| `maxConcurrentOperationsPercent` | Decimal | Optional. The maximum percentage of total units in the scope that can be in-flight. Example: 10.5 for 10.5%. If both percent and count are provided, the system uses the MINIMUM (most restrictive). |

### `UnitVariable`

- UnitVariable describes a parameter for a Unit.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `type` | string enum | Optional. Immutable. Name of a supported variable type. Supported types are string, int, bool. Values: `TYPE_UNSPECIFIED`, `STRING`, `INT`, `BOOL`, `STRUCT`, `LIST`. |
| `value` | string | Optional. String encoded value for the variable. |
| `variable` | string | Required. Immutable. Name of the variable from actuation configs. |

### `Upgrade`

- Upgrade is the unit operation that upgrades a provisioned unit, which may also include the underlying resources represented by a Unit. Can only execute if the Unit is currently provisioned.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `inputVariables` | array<UnitVariable> | Optional. Set of input variables. Maximum 100. (optional) |
| `release` | string | Optional. Reference to the Release object to use for the Unit. (optional). |

### `VariableMapping`

- Mapping of input variables to their respective output variable for depedenencies
- Version: v1

| Field | Type | Description |
|---|---|---|
| `from` | FromMapping | Optional. Output variables which will get their values from dependencies |
| `to` | ToMapping | Optional. Input variables whose values will be passed on to dependencies. |
| `variable` | string | Required. name of the variable |

### `Variant`

- Variant is an identifier for a value (name assigned to a value). DEPRECATED: Use Flag.Variants instead.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `boolValue` | boolean | Optional. Boolean flag value. |
| `doubleValue` | number (double) | Optional. Double flag value. |
| `intValue` | string (int64) | Optional. Integer flag value. |
| `name` | string | Required. Name of the variant. Max length: 128 bytes. |
| `stringValue` | string | Optional. String flag value. |

### Shape of `Aggregate`

Generated from the Discovery schema (not in the official docs); values show each field type:

```json
{
  "count": "integer (int32)",
  "group": "string"
}
```

## Notes

- Generated from the Discovery document(s) v1, v1beta1 of `saasservicemgmt` (retrieved 2026-11-14); a type with the same fields in several versions shows the preferred version; a type whose fields differ between versions is listed once per version (heading suffix `(version)`), and each type's `Version` line names the document it was taken from. A `$ref` resolves to the definition of the same version.
- Source: https://saasservicemgmt.googleapis.com/$discovery/rest?version=v1, https://saasservicemgmt.googleapis.com/$discovery/rest?version=v1beta1 (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
