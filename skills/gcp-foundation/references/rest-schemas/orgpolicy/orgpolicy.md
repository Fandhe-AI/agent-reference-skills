---
source: https://orgpolicy.googleapis.com/$discovery/rest?version=v2
---

# Organization Policy API message schemas (orgpolicy)

## Signature / Usage

Message types referenced by the methods listed under `references/rest/orgpolicy/`.

### `GoogleCloudOrgpolicyV2AlternatePolicySpec`

- Similar to PolicySpec but with an extra 'launch' field for launch reference. The PolicySpec here is specific for dry-run.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `launch` | string | Reference to the launch that will be used while audit logging and to control the launch. Set only in the alternate policy. |
| `spec` | GoogleCloudOrgpolicyV2PolicySpec | Specify constraint for configurations of Google Cloud resources. |

### `GoogleCloudOrgpolicyV2Constraint`

- A constraint describes a way to restrict a resource's configuration. For example, you could enforce a constraint that controls which Google Cloud services can be activated across an organization, or whether a Compute Engine instance can have serial port connections established. Constraints can be configured by the organization policy administrator to fit the needs of the organization by setting a policy that includes constraints at different locations in the organization's resource hierarchy. Policies are inherited down the resource hierarchy from higher levels, but can also be overridden. For details about the inheritance rules, see `Policy`. Constraints have a default behavior determined by the `constraint_default` field, which is the enforcement behavior that is used in the absence of a policy being defined or inherited for the resource in question.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `booleanConstraint` | GoogleCloudOrgpolicyV2ConstraintBooleanConstraint | Defines this constraint as being a boolean constraint. |
| `constraintDefault` | string enum | The evaluation behavior of this constraint in the absence of a policy. |
| `description` | string | Detailed description of what this constraint controls as well as how and where it is enforced. Mutable. |
| `displayName` | string | The human readable name. Mutable. |
| `equivalentConstraint` | string | Defines the equivalent constraint name, if it exists. Managed constraints can have an equivalent legacy managed constraint, and legacy managed constraints can have an equivalent managed constraint. For example, "constraints/iam.disableServiceAccountKeyUpload" is equivalent to "constraints/iam.managed.disableServiceAccountKeyUpload". |
| `listConstraint` | GoogleCloudOrgpolicyV2ConstraintListConstraint | Defines this constraint as being a list constraint. |
| `name` | string | Immutable. The resource name of the constraint. Must be in one of the following forms: \* `projects/{project_number}/constraints/{constraint_name}` \* `folders/{folder_number}/constraints/{constraint_name}` \* `organizations/{organization_number}/constraints/{constraint_name}` For example, "/projects/123/constraints/compute.disableSerialPortAccess". |
| `supportsDryRun` | boolean | Shows if dry run is supported for this constraint or not. |
| `supportsSimulation` | boolean | Shows if simulation is supported for this constraint or not. |

### `GoogleCloudOrgpolicyV2ConstraintBooleanConstraint`

- A constraint type is enforced or not enforced, which is configured in the `PolicyRule`. If `customConstraintDefinition` is defined, this constraint is a managed constraint.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `customConstraintDefinition` | GoogleCloudOrgpolicyV2ConstraintCustomConstraintDefinition | Custom constraint definition. Defines this as a managed constraint. |

### `GoogleCloudOrgpolicyV2ConstraintCustomConstraintDefinition`

- Custom constraint definition. Defines this as a managed constraint.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `actionType` | string enum | Allow or deny type. |
| `condition` | string | Org policy condition/expression. For example: `resource.instanceName.matches("(production\|test)_(.+_)?[\d]+")` or, `resource.management.auto_upgrade == true` The max length of the condition is 1000 characters. |
| `methodTypes` | array<string> | All the operations being applied for this constraint. |
| `parameters` | object | Stores the structure of `Parameters` used by the constraint condition. The key of `map` represents the name of the parameter. |
| `resourceTypes` | array<string> | The resource instance type that this policy applies to, in the format `/`. Example: \* `compute.googleapis.com/Instance`. |

### `GoogleCloudOrgpolicyV2ConstraintCustomConstraintDefinitionParameter`

- Defines a parameter structure.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `defaultValue` | any | Sets the value of the parameter in an assignment if no value is given. |
| `item` | string enum | Determines the parameter's value structure. For example, `LIST` can be specified by defining `type: LIST`, and `item: STRING`. |
| `metadata` | GoogleCloudOrgpolicyV2ConstraintCustomConstraintDefinitionParameterMetadata | Defines subproperties primarily used by the UI to display user-friendly information. |
| `type` | string enum | Type of the parameter. |
| `validValuesExpr` | string | Provides a CEL expression to specify the acceptable parameter values during assignment. For example, parameterName in ("parameterValue1", "parameterValue2"). |

### `GoogleCloudOrgpolicyV2ConstraintCustomConstraintDefinitionParameterMetadata`

- Defines Metadata structure.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `description` | string | Detailed description of what this `parameter` is and its use. Mutable. |

### `GoogleCloudOrgpolicyV2ConstraintListConstraint`

- A constraint type that allows or disallows a list of string values, which are configured in the `PolicyRule`.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `supportsIn` | boolean | Indicates whether values grouped into categories can be used in `Policy.allowed_values` and `Policy.denied_values`. For example, `"in:Python"` would match any value in the 'Python' group. |
| `supportsUnder` | boolean | Indicates whether subtrees of the Resource Manager resource hierarchy can be used in `Policy.allowed_values` and `Policy.denied_values`. For example, `"under:folders/123"` would match any resource under the 'folders/123' folder. |

### `GoogleCloudOrgpolicyV2CustomConstraint`

- A custom constraint defined by customers which can \*only\* be applied to the given resource types and organization. By creating a custom constraint, customers can apply policies of this custom constraint. \*Creating a custom constraint itself does NOT apply any policy enforcement\*.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `actionType` | string enum | Allow or deny type. |
| `condition` | string | A Common Expression Language (CEL) condition which is used in the evaluation of the constraint. For example: `resource.instanceName.matches("(production\|test)_(.+_)?[\d]+")` or, `resource.management.auto_upgrade == true` The max length of the condition is 1000 characters. |
| `description` | string | Detailed information about this custom policy constraint. The max length of the description is 2000 characters. |
| `displayName` | string | One line display name for the UI. The max length of the display_name is 200 characters. |
| `methodTypes` | array<string> | All the operations being applied for this constraint. |
| `name` | string | Immutable. Name of the constraint. This is unique within the organization. The name must be of the form: \* `organizations/{organization_id}/customConstraints/{custom_constraint_id}` Example: `organizations/123/customConstraints/custom.createOnlyE2TypeVms` The max length is 71 characters and the minimum length is 1. Note that the prefix `organizations/{organization_id}/customConstraints/custom.` is not counted. |
| `resourceTypes` | array<string> | Immutable. The resource instance type on which this policy applies. Format will be of the form : `/` Example: \* `compute.googleapis.com/Instance`. |
| `updateTime` | string (google-datetime) | Output only. The last time this custom constraint was updated. This represents the last time that the `CreateCustomConstraint` or `UpdateCustomConstraint` methods were called. |

### `GoogleCloudOrgpolicyV2ListConstraintsResponse`

- The response returned from the ListConstraints method.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `constraints` | array<GoogleCloudOrgpolicyV2Constraint> | The collection of constraints that are available on the targeted resource. |
| `nextPageToken` | string | Page token used to retrieve the next page. This is not used. |

### `GoogleCloudOrgpolicyV2ListCustomConstraintsResponse`

- The response returned from the ListCustomConstraints method. It will be empty if no custom or managed constraints are set on the organization resource.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `customConstraints` | array<GoogleCloudOrgpolicyV2CustomConstraint> | All custom and managed constraints that exist on the organization resource. It will be empty if no custom constraints are set. |
| `nextPageToken` | string | Page token used to retrieve the next page. This is not used, but the server may at any point start supplying a valid token. |

### `GoogleCloudOrgpolicyV2ListPoliciesResponse`

- The response returned from the ListPolicies method. It will be empty if no policies are set on the resource.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | Page token used to retrieve the next page. This is not used, but the server may at any point start supplying a valid token. |
| `policies` | array<GoogleCloudOrgpolicyV2Policy> | All policies that exist on the resource. It will be empty if no policies are set. |

### `GoogleCloudOrgpolicyV2Policy`

- Defines an organization policy that is used to specify constraints for configurations of Google Cloud resources.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `alternate` | GoogleCloudOrgpolicyV2AlternatePolicySpec | Deprecated. |
| `dryRunSpec` | GoogleCloudOrgpolicyV2PolicySpec | Dry-run policy. Audit-only policy, can be used to monitor how the policy would have impacted the existing and future resources if it's enforced. |
| `etag` | string | Optional. An opaque tag indicating the current state of the policy, used for concurrency control. This entity tag (ETag) is computed by the server based on the value of other fields, and may be sent on update and delete requests to ensure the client has an up-to-date value before proceeding. |
| `name` | string | Immutable. The resource name of the policy. Must be one of the following forms, where `constraint_name` is the name of the constraint that this policy configures: \* `projects/{project_number}/policies/{constraint_name}` \* `folders/{folder_number}/policies/{constraint_name}` \* `organizations/{organization_number}/policies/{constraint_name}` For example, `projects/123/policies/compute.disableSerialPortAccess`. Note: `projects/{project_id}/policies/{constraint_name}` is also an acceptable name for API requests, but responses will return the name using the equivalent project number. |
| `spec` | GoogleCloudOrgpolicyV2PolicySpec | Basic information about the organization policy. |

### `GoogleCloudOrgpolicyV2PolicySpec`

- Defines a Google Cloud policy specification that is used to specify constraints for configurations of Google Cloud resources.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `etag` | string | An opaque tag indicating the current version of the policySpec, used for concurrency control. This field is ignored if used in a `CreatePolicy` request. When the policy is returned from either a `GetPolicy` or a `ListPolicies` request, this entity tag (ETag) indicates the version of the current policySpec to use when executing a read-modify-write loop. When the policy is returned from a `GetEffectivePolicy` request, the ETag will be unset. |
| `inheritFromParent` | boolean | Determines the inheritance behavior for this policy. If `inherit_from_parent` is true, policy rules set higher up in the hierarchy (up to the closest root) are inherited and present in the effective policy. If it is false, then no rules are inherited, and this policy becomes the new root for evaluation. This field can be set only for policies that configure list constraints. |
| `reset` | boolean | Ignores policies set above this resource and restores the `constraint_default` enforcement behavior of the specific constraint at this resource. This field can be set in policies for either list or boolean constraints. If set, `rules` must be empty and `inherit_from_parent` must be set to false. |
| `rules` | array<GoogleCloudOrgpolicyV2PolicySpecPolicyRule> | In policies for boolean constraints, the following requirements apply: - There must be exactly one policy rule where a condition is unset. - Boolean policy rules with conditions must set `enforced` to the opposite of the policy rule without a condition. - During policy evaluation, policy rules with conditions that are true for a target resource take precedence. |
| `updateTime` | string (google-datetime) | Output only. The time stamp this was previously updated. This represents the last time a call to `CreatePolicy` or `UpdatePolicy` was made for that policy. |

### `GoogleCloudOrgpolicyV2PolicySpecPolicyRule`

- A rule used to express this policy.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `allowAll` | boolean | Setting this to true means that all values are allowed. This field can be set only in policies for list constraints. |
| `condition` | GoogleTypeExpr | A condition that determines whether this rule is used to evaluate the policy. When set, the google.type.Expr.expression field must contain 1 to 10 subexpressions, joined by the `\|\|` or `&&` operators. Each subexpression must use the `resource.matchTag()`, `resource.matchTagId()`, `resource.hasTagKey()`, or `resource.hasTagKeyId()` Common Expression Language (CEL) function. The `resource.matchTag()` function takes the following arguments: \* `key_name`: the namespaced name of the tag key, with the organization ID and a slash (`/`) as a prefix; for example, `123456789012/environment` \* `value_name`: the short name of the tag value For example: `resource.matchTag('123456789012/environment, 'prod')` The `resource.matchTagId()` function takes the following arguments: \* `key_id`: the permanent ID of the tag key; for example, `tagKeys/123456789012` \* `value_id`: the permanent ID of the tag value; for example, `tagValues/567890123456` For example: `resource.matchTagId('tagKeys/123456789012', 'tagValues/567890123456')` The `resource.hasTagKey()` function takes the following argument: \* `key_name`: the namespaced name of the tag key, with the organization ID and a slash (`/`) as a prefix; for example, `123456789012/environment` For example: `resource.hasTagKey('123456789012/environment')` The `resource.hasTagKeyId()` function takes the following arguments: \* `key_id`: the permanent ID of the tag key; for example, `tagKeys/123456789012` For example: `resource.hasTagKeyId('tagKeys/123456789012')` |
| `denyAll` | boolean | Setting this to true means that all values are denied. This field can be set only in policies for list constraints. |
| `enforce` | boolean | If `true`, then the policy is enforced. If `false`, then any configuration is acceptable. This field can be set in policies for boolean constraints, custom constraints and managed constraints. |
| `parameters` | object | Optional. Required for managed constraints if parameters are defined. Passes parameter values when policy enforcement is enabled. Ensure that parameter value types match those defined in the constraint definition. For example: { "allowedLocations" : \["us-east1", "us-west1"\], "allowAll" : true } |
| `values` | GoogleCloudOrgpolicyV2PolicySpecPolicyRuleStringValues | List of values to be used for this policy rule. This field can be set only in policies for list constraints. |

### `GoogleCloudOrgpolicyV2PolicySpecPolicyRuleStringValues`

- A message that holds specific allowed and denied values. This message can define specific values and subtrees of the Resource Manager resource hierarchy (`Organizations`, `Folders`, `Projects`) that are allowed or denied. This is achieved by using the `under:` and optional `is:` prefixes. The `under:` prefix is used to denote resource subtree values. The `is:` prefix is used to denote specific values, and is required only if the value contains a ":". Values prefixed with "is:" are treated the same as values with no prefix. Ancestry subtrees must be in one of the following formats: - `projects/` (for example, `projects/tokyo-rain-123`) - `folders/` (for example, `folders/1234`) - `organizations/` (for example, `organizations/1234`) The `supports_under` field of the associated `Constraint` defines whether ancestry prefixes can be used.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `allowedValues` | array<string> | List of values allowed at this resource. |
| `deniedValues` | array<string> | List of values denied at this resource. |

### `GoogleProtobufEmpty`

- A generic empty message that you can re-use to avoid defining duplicated empty messages in your APIs. A typical example is to use it as the request or the response type of an API method. For instance: service Foo { rpc Bar(google.protobuf.Empty) returns (google.protobuf.Empty); }
- Version: v2

### `GoogleTypeExpr`

- Represents a textual expression in the Common Expression Language (CEL) syntax. CEL is a C-like expression language. The syntax and semantics of CEL are documented at https://github.com/google/cel-spec. Example (Comparison): title: "Summary size limit" description: "Determines if a summary is less than 100 chars" expression: "document.summary.size() < 100" Example (Equality): title: "Requestor is owner" description: "Determines if requestor is the document owner" expression: "document.owner == request.auth.claims.email" Example (Logic): title: "Public documents" description: "Determine whether the document should be publicly visible" expression: "document.type != 'private' && document.type != 'internal'" Example (Data Manipulation): title: "Notification string" description: "Create a notification string with a timestamp." expression: "'New message received at ' + string(document.create_time)" The exact variables and functions that may be referenced within an expression are determined by the service that evaluates it. See the service documentation for additional information.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `description` | string | Optional. Description of the expression. This is a longer text which describes the expression, e.g. when hovered over it in a UI. |
| `expression` | string | Textual representation of an expression in Common Expression Language syntax. |
| `location` | string | Optional. String indicating the location of the expression for error reporting, e.g. a file name and a position in the file. |
| `title` | string | Optional. Title for the expression, i.e. a short string describing its purpose. This can be used e.g. in UIs which allow to enter the expression. |

### Shape of `GoogleCloudOrgpolicyV2AlternatePolicySpec`

Generated from the Discovery schema (not in the official docs); values show each field type:

```json
{
  "launch": "string",
  "spec": "GoogleCloudOrgpolicyV2PolicySpec"
}
```

## Notes

- Generated from the Discovery document(s) of `orgpolicy` (retrieved 2026-11-14); a type shared by several versions shows the preferred version.
- Source: https://orgpolicy.googleapis.com/$discovery/rest?version=v2 (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
