---
source: https://compute.googleapis.com/$discovery/rest?version=v1
---

# Compute Engine API REST API (compute) (part 2/12)

## Signature / Usage

Base URL: `https://compute.googleapis.com/compute/v1`. Methods are listed by `id`; the `Versions` line shows which API versions define the method (preferred: v1).

### `compute.disks.waitForReplicationCatchUp`

- Versions: alpha
- `POST https://compute.googleapis.com/compute/alpha/projects/{project}/zones/{zone}/disks/{disk}/waitForReplicationCatchUp`
- Wait for replication to catch up on the secondary disk.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`
- Request: `WaitForReplicationCatchUpRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `zone` | path | string | yes | The name of the zone for this request. |
| `disk` | path | string | yes | The name of the persistent disk. Name should conform to RFC1035 or be an unsigned long integer. |
| `requestId` | query | string | no | An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `compute.externalVpnGateways.delete`

- Versions: v1, preview, beta, alpha
- `DELETE https://compute.googleapis.com/compute/v1/projects/{project}/global/externalVpnGateways/{externalVpnGateway}`
- Deletes the specified externalVpnGateway.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `externalVpnGateway` | path | string | yes | Name of the externalVpnGateways to delete. |
| `requestId` | query | string | no | An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `compute.externalVpnGateways.get`

- Versions: v1, preview, beta, alpha
- `GET https://compute.googleapis.com/compute/v1/projects/{project}/global/externalVpnGateways/{externalVpnGateway}`
- Returns the specified externalVpnGateway. Get a list of available externalVpnGateways by making a list() request.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`, `https://www.googleapis.com/auth/compute.readonly`
- Request: —; Response: `ExternalVpnGateway`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `externalVpnGateway` | path | string | yes | Name of the externalVpnGateway to return. |

### `compute.externalVpnGateways.insert`

- Versions: v1, preview, beta, alpha
- `POST https://compute.googleapis.com/compute/v1/projects/{project}/global/externalVpnGateways`
- Creates a ExternalVpnGateway in the specified project using the data included in the request.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`
- Request: `ExternalVpnGateway`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `requestId` | query | string | no | An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `compute.externalVpnGateways.list`

- Versions: v1, preview, beta, alpha
- `GET https://compute.googleapis.com/compute/v1/projects/{project}/global/externalVpnGateways`
- Retrieves the list of ExternalVpnGateway available to the specified project.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`, `https://www.googleapis.com/auth/compute.readonly`
- Request: —; Response: `ExternalVpnGatewayList`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `filter` | query | string | no | A filter expression that filters resources listed in the response. Most Compute resources support two types of filter expressions: expressions that support regular expressions and expressions that follow API improvement proposal AIP-160. These two types of filter expressions cannot be mixed in one request. If you want to use AIP-160, your expression must specify the field name, an operator, and the value that you want to use for filtering. The value must be a string, a number, or a boolean. The operator must be either `=`, `!=`, `>`, `<`, `<=`, `>=` or `:`. For example, if you are filtering Compute Engine instances, you can exclude instances named `example-instance` by specifying `name != example-instance`. The `:*` comparison can be used to test whether a key has been defined. For example, to find all objects with `owner` label use: labels.owner:\* You can also filter nested fields. For example, you could specify `scheduling.automaticRestart = false` to include instances only if they are not scheduled for automatic restarts. You can use filtering on nested fields to filter based onresource labels. To filter on multiple expressions, provide each separate expression within parentheses. For example: (scheduling.automaticRestart = true) (cpuPlatform = "Intel Skylake") By default, each expression is an `AND` expression. However, you can include `AND` and `OR` expressions explicitly. For example: (cpuPlatform = "Intel Skylake") OR (cpuPlatform = "Intel Broadwell") AND (scheduling.automaticRestart = true) If you want to use a regular expression, use the `eq` (equal) or `ne` (not equal) operator against a single un-parenthesized expression with or without quotes or against multiple parenthesized expressions. Examples: `fieldname eq unquoted literal` `fieldname eq 'single quoted literal'` `fieldname eq "double quoted literal"` `(fieldname1 eq literal) (fieldname2 ne "literal")` The literal value is interpreted as a regular expression using GoogleRE2 library syntax. The literal value must match the entire field. For example, to filter for instances that do not end with name "instance", you would use `name ne .*instance`. You cannot combine constraints on multiple fields using regular expressions. |
| `maxResults` | query | integer (uint32) | no | The maximum number of results per page that should be returned. If the number of available results is larger than `maxResults`, Compute Engine returns a `nextPageToken` that can be used to get the next page of results in subsequent list requests. Acceptable values are `0` to `500`, inclusive. (Default: `500`) |
| `orderBy` | query | string | no | Sorts list results by a certain order. By default, results are returned in alphanumerical order based on the resource name. You can also sort results in descending order based on the creation timestamp using `orderBy="creationTimestamp desc"`. This sorts results based on the `creationTimestamp` field in reverse chronological order (newest result first). Use this to sort resources like operations so that the newest operation is returned first. Currently, only sorting by `name` or `creationTimestamp desc` is supported. |
| `pageToken` | query | string | no | Specifies a page token to use. Set `pageToken` to the `nextPageToken` returned by a previous list request to get the next page of results. |

### `compute.externalVpnGateways.setLabels`

- Versions: v1, preview, beta, alpha
- `POST https://compute.googleapis.com/compute/v1/projects/{project}/global/externalVpnGateways/{resource}/setLabels`
- Sets the labels on an ExternalVpnGateway. To learn more about labels, read the Labeling Resources documentation.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`
- Request: `GlobalSetLabelsRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `resource` | path | string | yes | Name or id of the resource for this request. |

### `compute.externalVpnGateways.testIamPermissions`

- Versions: v1, preview, beta, alpha
- `POST https://compute.googleapis.com/compute/v1/projects/{project}/global/externalVpnGateways/{resource}/testIamPermissions`
- Returns permissions that a caller has on the specified resource.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`, `https://www.googleapis.com/auth/compute.readonly`
- Request: `TestPermissionsRequest`; Response: `TestPermissionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `resource` | path | string | yes | Name or id of the resource for this request. |

### `compute.firewallPolicies.addAssociation`

- Versions: v1, preview, beta, alpha
- `POST https://compute.googleapis.com/compute/v1/locations/global/firewallPolicies/{firewallPolicy}/addAssociation`
- Inserts an association for the specified firewall policy.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`
- Request: `FirewallPolicyAssociation`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `firewallPolicy` | path | string | yes | Name of the firewall policy to update. |
| `replaceExistingAssociation` | query | boolean | no | Indicates whether or not to replace it if an association of the attachment already exists. This is false by default, in which case an error will be returned if an association already exists. |
| `requestId` | query | string | no | An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `compute.firewallPolicies.addPacketMirroringRule`

- Versions: beta, alpha
- `POST https://compute.googleapis.com/compute/beta/locations/global/firewallPolicies/{firewallPolicy}/addPacketMirroringRule`
- Inserts a packet mirroring rule into a firewall policy.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`
- Request: `FirewallPolicyRule`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `firewallPolicy` | path | string | yes | Name of the firewall policy to update. |
| `requestId` | query | string | no | An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `compute.firewallPolicies.addRule`

- Versions: v1, preview, beta, alpha
- `POST https://compute.googleapis.com/compute/v1/locations/global/firewallPolicies/{firewallPolicy}/addRule`
- Inserts a rule into a firewall policy.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`
- Request: `FirewallPolicyRule`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `firewallPolicy` | path | string | yes | Name of the firewall policy to update. |
| `requestId` | query | string | no | An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `compute.firewallPolicies.cloneRules`

- Versions: v1, preview, beta, alpha
- `POST https://compute.googleapis.com/compute/v1/locations/global/firewallPolicies/{firewallPolicy}/cloneRules`
- Copies rules to the specified firewall policy.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `firewallPolicy` | path | string | yes | Name of the firewall policy to update. |
| `requestId` | query | string | no | An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |
| `sourceFirewallPolicy` | query | string | no | The firewall policy from which to copy rules. |

### `compute.firewallPolicies.delete`

- Versions: v1, preview, beta, alpha
- `DELETE https://compute.googleapis.com/compute/v1/locations/global/firewallPolicies/{firewallPolicy}`
- Deletes the specified policy.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `firewallPolicy` | path | string | yes | Name of the firewall policy to delete. |
| `requestId` | query | string | no | An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `compute.firewallPolicies.forceStartProgressiveRollout`

- Versions: alpha
- `POST https://compute.googleapis.com/compute/alpha/locations/global/firewallPolicies/{firewallPolicy}/forceStartProgressiveRollout`
- Starts a brand new progressive rollout of hierarchical firewall policy. This API will return an error when there is an ongoing progressive rollout.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `firewallPolicy` | path | string | yes | Name of the target firewall policy. |

### `compute.firewallPolicies.get`

- Versions: v1, preview, beta, alpha
- `GET https://compute.googleapis.com/compute/v1/locations/global/firewallPolicies/{firewallPolicy}`
- Returns the specified firewall policy.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`, `https://www.googleapis.com/auth/compute.readonly`
- Request: —; Response: `FirewallPolicy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `firewallPolicy` | path | string | yes | Name of the firewall policy to get. |

### `compute.firewallPolicies.getAssociation`

- Versions: v1, preview, beta, alpha
- `GET https://compute.googleapis.com/compute/v1/locations/global/firewallPolicies/{firewallPolicy}/getAssociation`
- Gets an association with the specified name.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`, `https://www.googleapis.com/auth/compute.readonly`
- Request: —; Response: `FirewallPolicyAssociation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `firewallPolicy` | path | string | yes | Name of the firewall policy to which the queried rule belongs. |
| `name` | query | string | no | The name of the association to get from the firewall policy. |

### `compute.firewallPolicies.getIamPolicy`

- Versions: v1, preview, beta, alpha
- `GET https://compute.googleapis.com/compute/v1/locations/global/firewallPolicies/{resource}/getIamPolicy`
- Gets the access control policy for a resource. May be empty if no such policy or resource exists.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`, `https://www.googleapis.com/auth/compute.readonly`
- Request: —; Response: `Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | Name or id of the resource for this request. |
| `optionsRequestedPolicyVersion` | query | integer (int32) | no | Requested IAM Policy version. |

### `compute.firewallPolicies.getPacketMirroringRule`

- Versions: beta, alpha
- `GET https://compute.googleapis.com/compute/beta/locations/global/firewallPolicies/{firewallPolicy}/getPacketMirroringRule`
- Gets a packet mirroring rule of the specified priority.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`, `https://www.googleapis.com/auth/compute.readonly`
- Request: —; Response: `FirewallPolicyRule`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `firewallPolicy` | path | string | yes | Name of the firewall policy to which the queried rule belongs. |
| `priority` | query | integer (int32) | no | The priority of the rule to get from the firewall policy. |

### `compute.firewallPolicies.getRule`

- Versions: v1, preview, beta, alpha
- `GET https://compute.googleapis.com/compute/v1/locations/global/firewallPolicies/{firewallPolicy}/getRule`
- Gets a rule of the specified priority.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`, `https://www.googleapis.com/auth/compute.readonly`
- Request: —; Response: `FirewallPolicyRule`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `firewallPolicy` | path | string | yes | Name of the firewall policy to which the queried rule belongs. |
| `priority` | query | integer (int32) | no | The priority of the rule to get from the firewall policy. |

### `compute.firewallPolicies.insert`

- Versions: v1, preview, beta, alpha
- `POST https://compute.googleapis.com/compute/v1/locations/global/firewallPolicies`
- Creates a new policy in the specified project using the data included in the request.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`
- Request: `FirewallPolicy`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parentId` | query | string | no | Parent ID for this request. The ID can be either be "folders/\[FOLDER_ID\]" if the parent is a folder or "organizations/\[ORGANIZATION_ID\]" if the parent is an organization. |
| `requestId` | query | string | no | An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `compute.firewallPolicies.list`

- Versions: v1, preview, beta, alpha
- `GET https://compute.googleapis.com/compute/v1/locations/global/firewallPolicies`
- Lists all the policies that have been configured for the specified folder or organization.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`, `https://www.googleapis.com/auth/compute.readonly`
- Request: —; Response: `FirewallPolicyList`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `filter` | query | string | no | A filter expression that filters resources listed in the response. Most Compute resources support two types of filter expressions: expressions that support regular expressions and expressions that follow API improvement proposal AIP-160. These two types of filter expressions cannot be mixed in one request. If you want to use AIP-160, your expression must specify the field name, an operator, and the value that you want to use for filtering. The value must be a string, a number, or a boolean. The operator must be either `=`, `!=`, `>`, `<`, `<=`, `>=` or `:`. For example, if you are filtering Compute Engine instances, you can exclude instances named `example-instance` by specifying `name != example-instance`. The `:*` comparison can be used to test whether a key has been defined. For example, to find all objects with `owner` label use: labels.owner:\* You can also filter nested fields. For example, you could specify `scheduling.automaticRestart = false` to include instances only if they are not scheduled for automatic restarts. You can use filtering on nested fields to filter based onresource labels. To filter on multiple expressions, provide each separate expression within parentheses. For example: (scheduling.automaticRestart = true) (cpuPlatform = "Intel Skylake") By default, each expression is an `AND` expression. However, you can include `AND` and `OR` expressions explicitly. For example: (cpuPlatform = "Intel Skylake") OR (cpuPlatform = "Intel Broadwell") AND (scheduling.automaticRestart = true) If you want to use a regular expression, use the `eq` (equal) or `ne` (not equal) operator against a single un-parenthesized expression with or without quotes or against multiple parenthesized expressions. Examples: `fieldname eq unquoted literal` `fieldname eq 'single quoted literal'` `fieldname eq "double quoted literal"` `(fieldname1 eq literal) (fieldname2 ne "literal")` The literal value is interpreted as a regular expression using GoogleRE2 library syntax. The literal value must match the entire field. For example, to filter for instances that do not end with name "instance", you would use `name ne .*instance`. You cannot combine constraints on multiple fields using regular expressions. |
| `maxResults` | query | integer (uint32) | no | The maximum number of results per page that should be returned. If the number of available results is larger than `maxResults`, Compute Engine returns a `nextPageToken` that can be used to get the next page of results in subsequent list requests. Acceptable values are `0` to `500`, inclusive. (Default: `500`) |
| `orderBy` | query | string | no | Sorts list results by a certain order. By default, results are returned in alphanumerical order based on the resource name. You can also sort results in descending order based on the creation timestamp using `orderBy="creationTimestamp desc"`. This sorts results based on the `creationTimestamp` field in reverse chronological order (newest result first). Use this to sort resources like operations so that the newest operation is returned first. Currently, only sorting by `name` or `creationTimestamp desc` is supported. |
| `pageToken` | query | string | no | Specifies a page token to use. Set `pageToken` to the `nextPageToken` returned by a previous list request to get the next page of results. |
| `parentId` | query | string | no | Parent ID for this request. The ID can be either be "folders/\[FOLDER_ID\]" if the parent is a folder or "organizations/\[ORGANIZATION_ID\]" if the parent is an organization. |

### `compute.firewallPolicies.listAssociations`

- Versions: v1, preview, beta, alpha
- `GET https://compute.googleapis.com/compute/v1/locations/global/firewallPolicies/listAssociations`
- Lists associations of a specified target, i.e., organization or folder.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`, `https://www.googleapis.com/auth/compute.readonly`
- Request: —; Response: `FirewallPoliciesListAssociationsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `includeInheritedPolicies` | query | boolean | no | If set to "true", the response will contain a list of all associations for the containing folders and the containing organization of the target. The parameter has no effect if the target is an organization. |
| `targetResource` | query | string | no | The target resource to list associations. It is an organization, or a folder. |

### `compute.firewallPolicies.move`

- Versions: v1, preview, beta, alpha
- `POST https://compute.googleapis.com/compute/v1/locations/global/firewallPolicies/{firewallPolicy}/move`
- Moves the specified firewall policy.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `firewallPolicy` | path | string | yes | Name of the firewall policy to update. |
| `parentId` | query | string | no | The new parent of the firewall policy. The ID can be either be "folders/\[FOLDER_ID\]" if the parent is a folder or "organizations/\[ORGANIZATION_ID\]" if the parent is an organization. |
| `requestId` | query | string | no | An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `compute.firewallPolicies.patch`

- Versions: v1, preview, beta, alpha
- `PATCH https://compute.googleapis.com/compute/v1/locations/global/firewallPolicies/{firewallPolicy}`
- Patches the specified policy with the data included in the request.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`
- Request: `FirewallPolicy`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `firewallPolicy` | path | string | yes | Name of the firewall policy to update. |
| `requestId` | query | string | no | An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `compute.firewallPolicies.patchPacketMirroringRule`

- Versions: beta, alpha
- `POST https://compute.googleapis.com/compute/beta/locations/global/firewallPolicies/{firewallPolicy}/patchPacketMirroringRule`
- Patches a packet mirroring rule of the specified priority.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`
- Request: `FirewallPolicyRule`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `firewallPolicy` | path | string | yes | Name of the firewall policy to update. |
| `priority` | query | integer (int32) | no | The priority of the rule to patch. |
| `requestId` | query | string | no | An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `compute.firewallPolicies.patchRule`

- Versions: v1, preview, beta, alpha
- `POST https://compute.googleapis.com/compute/v1/locations/global/firewallPolicies/{firewallPolicy}/patchRule`
- Patches a rule of the specified priority.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`
- Request: `FirewallPolicyRule`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `firewallPolicy` | path | string | yes | Name of the firewall policy to update. |
| `priority` | query | integer (int32) | no | The priority of the rule to patch. |
| `requestId` | query | string | no | An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `compute.firewallPolicies.removeAssociation`

- Versions: v1, preview, beta, alpha
- `POST https://compute.googleapis.com/compute/v1/locations/global/firewallPolicies/{firewallPolicy}/removeAssociation`
- Removes an association for the specified firewall policy.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `firewallPolicy` | path | string | yes | Name of the firewall policy to update. |
| `name` | query | string | no | Name for the attachment that will be removed. |
| `requestId` | query | string | no | An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `compute.firewallPolicies.removePacketMirroringRule`

- Versions: beta, alpha
- `POST https://compute.googleapis.com/compute/beta/locations/global/firewallPolicies/{firewallPolicy}/removePacketMirroringRule`
- Deletes a packet mirroring rule of the specified priority.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `firewallPolicy` | path | string | yes | Name of the firewall policy to update. |
| `priority` | query | integer (int32) | no | The priority of the rule to remove from the firewall policy. |
| `requestId` | query | string | no | An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `compute.firewallPolicies.removeRule`

- Versions: v1, preview, beta, alpha
- `POST https://compute.googleapis.com/compute/v1/locations/global/firewallPolicies/{firewallPolicy}/removeRule`
- Deletes a rule of the specified priority.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `firewallPolicy` | path | string | yes | Name of the firewall policy to update. |
| `priority` | query | integer (int32) | no | The priority of the rule to remove from the firewall policy. |
| `requestId` | query | string | no | An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `compute.firewallPolicies.setIamPolicy`

- Versions: v1, preview, beta, alpha
- `POST https://compute.googleapis.com/compute/v1/locations/global/firewallPolicies/{resource}/setIamPolicy`
- Sets the access control policy on the specified resource. Replaces any existing policy.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`
- Request: `GlobalOrganizationSetPolicyRequest`; Response: `Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | Name or id of the resource for this request. |

### `compute.firewallPolicies.testIamPermissions`

- Versions: v1, preview, beta, alpha
- `POST https://compute.googleapis.com/compute/v1/locations/global/firewallPolicies/{resource}/testIamPermissions`
- Returns permissions that a caller has on the specified resource.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`, `https://www.googleapis.com/auth/compute.readonly`
- Request: `TestPermissionsRequest`; Response: `TestPermissionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | Name or id of the resource for this request. |

### `compute.firewalls.delete`

- Versions: v1, preview, beta, alpha
- `DELETE https://compute.googleapis.com/compute/v1/projects/{project}/global/firewalls/{firewall}`
- Deletes the specified firewall.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `firewall` | path | string | yes | Name of the firewall rule to delete. |
| `requestId` | query | string | no | An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `compute.firewalls.get`

- Versions: v1, preview, beta, alpha
- `GET https://compute.googleapis.com/compute/v1/projects/{project}/global/firewalls/{firewall}`
- Returns the specified firewall.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`, `https://www.googleapis.com/auth/compute.readonly`
- Request: —; Response: `Firewall`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `firewall` | path | string | yes | Name of the firewall rule to return. |

### `compute.firewalls.insert`

- Versions: v1, preview, beta, alpha
- `POST https://compute.googleapis.com/compute/v1/projects/{project}/global/firewalls`
- Creates a firewall rule in the specified project using the data included in the request.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`
- Request: `Firewall`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `requestId` | query | string | no | An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `compute.firewalls.list`

- Versions: v1, preview, beta, alpha
- `GET https://compute.googleapis.com/compute/v1/projects/{project}/global/firewalls`
- Retrieves the list of firewall rules available to the specified project.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`, `https://www.googleapis.com/auth/compute.readonly`
- Request: —; Response: `FirewallList`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `filter` | query | string | no | A filter expression that filters resources listed in the response. Most Compute resources support two types of filter expressions: expressions that support regular expressions and expressions that follow API improvement proposal AIP-160. These two types of filter expressions cannot be mixed in one request. If you want to use AIP-160, your expression must specify the field name, an operator, and the value that you want to use for filtering. The value must be a string, a number, or a boolean. The operator must be either `=`, `!=`, `>`, `<`, `<=`, `>=` or `:`. For example, if you are filtering Compute Engine instances, you can exclude instances named `example-instance` by specifying `name != example-instance`. The `:*` comparison can be used to test whether a key has been defined. For example, to find all objects with `owner` label use: labels.owner:\* You can also filter nested fields. For example, you could specify `scheduling.automaticRestart = false` to include instances only if they are not scheduled for automatic restarts. You can use filtering on nested fields to filter based onresource labels. To filter on multiple expressions, provide each separate expression within parentheses. For example: (scheduling.automaticRestart = true) (cpuPlatform = "Intel Skylake") By default, each expression is an `AND` expression. However, you can include `AND` and `OR` expressions explicitly. For example: (cpuPlatform = "Intel Skylake") OR (cpuPlatform = "Intel Broadwell") AND (scheduling.automaticRestart = true) If you want to use a regular expression, use the `eq` (equal) or `ne` (not equal) operator against a single un-parenthesized expression with or without quotes or against multiple parenthesized expressions. Examples: `fieldname eq unquoted literal` `fieldname eq 'single quoted literal'` `fieldname eq "double quoted literal"` `(fieldname1 eq literal) (fieldname2 ne "literal")` The literal value is interpreted as a regular expression using GoogleRE2 library syntax. The literal value must match the entire field. For example, to filter for instances that do not end with name "instance", you would use `name ne .*instance`. You cannot combine constraints on multiple fields using regular expressions. |
| `maxResults` | query | integer (uint32) | no | The maximum number of results per page that should be returned. If the number of available results is larger than `maxResults`, Compute Engine returns a `nextPageToken` that can be used to get the next page of results in subsequent list requests. Acceptable values are `0` to `500`, inclusive. (Default: `500`) |
| `orderBy` | query | string | no | Sorts list results by a certain order. By default, results are returned in alphanumerical order based on the resource name. You can also sort results in descending order based on the creation timestamp using `orderBy="creationTimestamp desc"`. This sorts results based on the `creationTimestamp` field in reverse chronological order (newest result first). Use this to sort resources like operations so that the newest operation is returned first. Currently, only sorting by `name` or `creationTimestamp desc` is supported. |
| `pageToken` | query | string | no | Specifies a page token to use. Set `pageToken` to the `nextPageToken` returned by a previous list request to get the next page of results. |

### `compute.firewalls.patch`

- Versions: v1, preview, beta, alpha
- `PATCH https://compute.googleapis.com/compute/v1/projects/{project}/global/firewalls/{firewall}`
- Updates the specified firewall rule with the data included in the request. This method supportsPATCH semantics and uses theJSON merge patch format and processing rules.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`
- Request: `Firewall`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `firewall` | path | string | yes | Name of the firewall rule to patch. |
| `requestId` | query | string | no | An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `compute.firewalls.testIamPermissions`

- Versions: v1, preview, beta, alpha
- `POST https://compute.googleapis.com/compute/v1/projects/{project}/global/firewalls/{resource}/testIamPermissions`
- Returns permissions that a caller has on the specified resource.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`, `https://www.googleapis.com/auth/compute.readonly`
- Request: `TestPermissionsRequest`; Response: `TestPermissionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `resource` | path | string | yes | Name or id of the resource for this request. |

### `compute.firewalls.update`

- Versions: v1, preview, beta, alpha
- `PUT https://compute.googleapis.com/compute/v1/projects/{project}/global/firewalls/{firewall}`
- Updates the specified firewall rule with the data included in the request. Note that all fields will be updated if using PUT, even fields that are not specified. To update individual fields, please use PATCH instead.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`
- Request: `Firewall`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `firewall` | path | string | yes | Name of the firewall rule to update. |
| `requestId` | query | string | no | An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `compute.folderGlobalVmExtensionPolicies.aggregatedList`

- Versions: preview, alpha
- `GET https://compute.googleapis.com/compute/v1/{+folder}/aggregated/vmExtensionPolicies`
- Retrieves the list of all folder level VM Extension Policy resources available to the specified folder. To prevent failure, it's recommended that you set the `returnPartialSuccess` parameter to `true`.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`, `https://www.googleapis.com/auth/compute.readonly`
- Request: —; Response: `FolderVmExtensionPolicyAggregatedListResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `folder` | path | string | yes | Folder ID for this request. |
| `filter` | query | string | no | A filter expression that filters resources listed in the response. Most Compute resources support two types of filter expressions: expressions that support regular expressions and expressions that follow API improvement proposal AIP-160. These two types of filter expressions cannot be mixed in one request. If you want to use AIP-160, your expression must specify the field name, an operator, and the value that you want to use for filtering. The value must be a string, a number, or a boolean. The operator must be either `=`, `!=`, `>`, `<`, `<=`, `>=` or `:`. For example, if you are filtering Compute Engine instances, you can exclude instances named `example-instance` by specifying `name != example-instance`. The `:*` comparison can be used to test whether a key has been defined. For example, to find all objects with `owner` label use: labels.owner:\* You can also filter nested fields. For example, you could specify `scheduling.automaticRestart = false` to include instances only if they are not scheduled for automatic restarts. You can use filtering on nested fields to filter based onresource labels. To filter on multiple expressions, provide each separate expression within parentheses. For example: (scheduling.automaticRestart = true) (cpuPlatform = "Intel Skylake") By default, each expression is an `AND` expression. However, you can include `AND` and `OR` expressions explicitly. For example: (cpuPlatform = "Intel Skylake") OR (cpuPlatform = "Intel Broadwell") AND (scheduling.automaticRestart = true) If you want to use a regular expression, use the `eq` (equal) or `ne` (not equal) operator against a single un-parenthesized expression with or without quotes or against multiple parenthesized expressions. Examples: `fieldname eq unquoted literal` `fieldname eq 'single quoted literal'` `fieldname eq "double quoted literal"` `(fieldname1 eq literal) (fieldname2 ne "literal")` The literal value is interpreted as a regular expression using GoogleRE2 library syntax. The literal value must match the entire field. For example, to filter for instances that do not end with name "instance", you would use `name ne .*instance`. You cannot combine constraints on multiple fields using regular expressions. |
| `includeAllScopes` | query | boolean | no | Indicates whether every visible scope for each scope type (zone, region, global) should be included in the response. For new resource types added after this field, the flag has no effect as new resource types will always include every visible scope for each scope type in response. For resource types which predate this field, if this flag is omitted or false, only scopes of the scope types where the resource type is expected to be found will be included. |
| `maxResults` | query | integer (uint32) | no | The maximum number of results per page that should be returned. If the number of available results is larger than `maxResults`, Compute Engine returns a `nextPageToken` that can be used to get the next page of results in subsequent list requests. Acceptable values are `0` to `500`, inclusive. (Default: `500`) |
| `orderBy` | query | string | no | Sorts list results by a certain order. By default, results are returned in alphanumerical order based on the resource name. You can also sort results in descending order based on the creation timestamp using `orderBy="creationTimestamp desc"`. This sorts results based on the `creationTimestamp` field in reverse chronological order (newest result first). Use this to sort resources like operations so that the newest operation is returned first. Currently, only sorting by `name` or `creationTimestamp desc` is supported. |
| `pageToken` | query | string | no | Specifies a page token to use. Set `pageToken` to the `nextPageToken` returned by a previous list request to get the next page of results. |
| `serviceProjectNumber` | query | string (int64) | no | The Shared VPC service project id or service project number for which aggregated list request is invoked for subnetworks list-usable api. |

### `compute.folderGlobalVmExtensionPolicies.delete`

- Versions: preview, alpha
- `POST https://compute.googleapis.com/compute/v1/{+folder}/global/vmExtensionPolicies/{globalVmExtensionPolicy}/delete`
- Purge scoped resources (zonal policies) from a folder level global VM extension policy, and then delete the global VM extension policy. Purge of the scoped resources is a pre-condition of the global VM extension policy deletion. The deletion of the global VM extension policy happens after the purge rollout is done, so it's not a part of the LRO. It's an automatic process that triggers in the backend.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`
- Request: `GlobalVmExtensionPolicyRolloutOperationRolloutInput`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `folder` | path | string | yes | Folder ID for this request. |
| `globalVmExtensionPolicy` | path | string | yes | Name of the global VM extension policy to purge scoped resources for. |
| `requestId` | query | string | no | An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `compute.folderGlobalVmExtensionPolicies.get`

- Versions: preview, alpha
- `GET https://compute.googleapis.com/compute/v1/{+folder}/global/vmExtensionPolicies/{globalVmExtensionPolicy}`
- Gets details of a folder level GlobalVmExtensionPolicy.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`, `https://www.googleapis.com/auth/compute.readonly`
- Request: —; Response: `GlobalVmExtensionPolicy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `folder` | path | string | yes | Folder ID for this request. |
| `globalVmExtensionPolicy` | path | string | yes | Name of the GlobalVmExtensionPolicy resource to return. |

### `compute.folderGlobalVmExtensionPolicies.getVmExtension`

- Versions: preview, alpha
- `GET https://compute.googleapis.com/compute/v1/{+folder}/global/vmExtensions/{extensionName}`
- Retrieves details of a specific VM extension.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`, `https://www.googleapis.com/auth/compute.readonly`
- Request: —; Response: `GlobalVmExtension`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `folder` | path | string | yes | Folder ID for this request. |
| `extensionName` | path | string | yes | Required. Name of the VM extension for this request. |

### `compute.folderGlobalVmExtensionPolicies.insert`

- Versions: preview, alpha
- `POST https://compute.googleapis.com/compute/v1/{+folder}/global/vmExtensionPolicies`
- Creates a new folder level GlobalVmExtensionPolicy.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`
- Request: `GlobalVmExtensionPolicy`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `folder` | path | string | yes | Folder ID for this request. |
| `requestId` | query | string | no | An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `compute.folderGlobalVmExtensionPolicies.list`

- Versions: preview, alpha
- `GET https://compute.googleapis.com/compute/v1/{+folder}/global/vmExtensionPolicies`
- Lists folder level GlobalVmExtensionPolicies.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`, `https://www.googleapis.com/auth/compute.readonly`
- Request: —; Response: `GlobalVmExtensionPolicyList`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `folder` | path | string | yes | Folder ID for this request. |
| `filter` | query | string | no | A filter expression that filters resources listed in the response. Most Compute resources support two types of filter expressions: expressions that support regular expressions and expressions that follow API improvement proposal AIP-160. These two types of filter expressions cannot be mixed in one request. If you want to use AIP-160, your expression must specify the field name, an operator, and the value that you want to use for filtering. The value must be a string, a number, or a boolean. The operator must be either `=`, `!=`, `>`, `<`, `<=`, `>=` or `:`. For example, if you are filtering Compute Engine instances, you can exclude instances named `example-instance` by specifying `name != example-instance`. The `:*` comparison can be used to test whether a key has been defined. For example, to find all objects with `owner` label use: labels.owner:\* You can also filter nested fields. For example, you could specify `scheduling.automaticRestart = false` to include instances only if they are not scheduled for automatic restarts. You can use filtering on nested fields to filter based onresource labels. To filter on multiple expressions, provide each separate expression within parentheses. For example: (scheduling.automaticRestart = true) (cpuPlatform = "Intel Skylake") By default, each expression is an `AND` expression. However, you can include `AND` and `OR` expressions explicitly. For example: (cpuPlatform = "Intel Skylake") OR (cpuPlatform = "Intel Broadwell") AND (scheduling.automaticRestart = true) If you want to use a regular expression, use the `eq` (equal) or `ne` (not equal) operator against a single un-parenthesized expression with or without quotes or against multiple parenthesized expressions. Examples: `fieldname eq unquoted literal` `fieldname eq 'single quoted literal'` `fieldname eq "double quoted literal"` `(fieldname1 eq literal) (fieldname2 ne "literal")` The literal value is interpreted as a regular expression using GoogleRE2 library syntax. The literal value must match the entire field. For example, to filter for instances that do not end with name "instance", you would use `name ne .*instance`. You cannot combine constraints on multiple fields using regular expressions. |
| `maxResults` | query | integer (uint32) | no | The maximum number of results per page that should be returned. If the number of available results is larger than `maxResults`, Compute Engine returns a `nextPageToken` that can be used to get the next page of results in subsequent list requests. Acceptable values are `0` to `500`, inclusive. (Default: `500`) |
| `orderBy` | query | string | no | Sorts list results by a certain order. By default, results are returned in alphanumerical order based on the resource name. You can also sort results in descending order based on the creation timestamp using `orderBy="creationTimestamp desc"`. This sorts results based on the `creationTimestamp` field in reverse chronological order (newest result first). Use this to sort resources like operations so that the newest operation is returned first. Currently, only sorting by `name` or `creationTimestamp desc` is supported. |
| `pageToken` | query | string | no | Specifies a page token to use. Set `pageToken` to the `nextPageToken` returned by a previous list request to get the next page of results. |

### `compute.folderGlobalVmExtensionPolicies.listVmExtensions`

- Versions: preview, alpha
- `GET https://compute.googleapis.com/compute/v1/{+folder}/global/vmExtensions`
- Lists all VM extensions within a folder. This is a read-only API.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`, `https://www.googleapis.com/auth/compute.readonly`
- Request: —; Response: `GlobalListVmExtensionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `folder` | path | string | yes | Required. Folder ID for this request. |
| `filter` | query | string | no | A filter expression that filters resources listed in the response. Most Compute resources support two types of filter expressions: expressions that support regular expressions and expressions that follow API improvement proposal AIP-160. These two types of filter expressions cannot be mixed in one request. If you want to use AIP-160, your expression must specify the field name, an operator, and the value that you want to use for filtering. The value must be a string, a number, or a boolean. The operator must be either `=`, `!=`, `>`, `<`, `<=`, `>=` or `:`. For example, if you are filtering Compute Engine instances, you can exclude instances named `example-instance` by specifying `name != example-instance`. The `:*` comparison can be used to test whether a key has been defined. For example, to find all objects with `owner` label use: labels.owner:\* You can also filter nested fields. For example, you could specify `scheduling.automaticRestart = false` to include instances only if they are not scheduled for automatic restarts. You can use filtering on nested fields to filter based onresource labels. To filter on multiple expressions, provide each separate expression within parentheses. For example: (scheduling.automaticRestart = true) (cpuPlatform = "Intel Skylake") By default, each expression is an `AND` expression. However, you can include `AND` and `OR` expressions explicitly. For example: (cpuPlatform = "Intel Skylake") OR (cpuPlatform = "Intel Broadwell") AND (scheduling.automaticRestart = true) If you want to use a regular expression, use the `eq` (equal) or `ne` (not equal) operator against a single un-parenthesized expression with or without quotes or against multiple parenthesized expressions. Examples: `fieldname eq unquoted literal` `fieldname eq 'single quoted literal'` `fieldname eq "double quoted literal"` `(fieldname1 eq literal) (fieldname2 ne "literal")` The literal value is interpreted as a regular expression using GoogleRE2 library syntax. The literal value must match the entire field. For example, to filter for instances that do not end with name "instance", you would use `name ne .*instance`. You cannot combine constraints on multiple fields using regular expressions. |
| `maxResults` | query | integer (uint32) | no | The maximum number of results per page that should be returned. If the number of available results is larger than `maxResults`, Compute Engine returns a `nextPageToken` that can be used to get the next page of results in subsequent list requests. Acceptable values are `0` to `500`, inclusive. (Default: `500`) |
| `orderBy` | query | string | no | Sorts list results by a certain order. By default, results are returned in alphanumerical order based on the resource name. You can also sort results in descending order based on the creation timestamp using `orderBy="creationTimestamp desc"`. This sorts results based on the `creationTimestamp` field in reverse chronological order (newest result first). Use this to sort resources like operations so that the newest operation is returned first. Currently, only sorting by `name` or `creationTimestamp desc` is supported. |
| `pageToken` | query | string | no | Specifies a page token to use. Set `pageToken` to the `nextPageToken` returned by a previous list request to get the next page of results. |

### `compute.folderGlobalVmExtensionPolicies.update`

- Versions: preview, alpha
- `PATCH https://compute.googleapis.com/compute/v1/{+folder}/global/vmExtensionPolicies/{globalVmExtensionPolicy}`
- Updates a folder level GlobalVmExtensionPolicy.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`
- Request: `GlobalVmExtensionPolicy`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `folder` | path | string | yes | Folder ID for this request. |
| `globalVmExtensionPolicy` | path | string | yes | Name of the global VM extension policy to update. |
| `requestId` | query | string | no | An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `compute.folderRolloutPlans.delete`

- Versions: preview
- `DELETE https://compute.googleapis.com/compute/v1/{+folder}/global/rolloutPlans/{rolloutPlan}`
- Deletes a FolderRolloutPlan.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `folder` | path | string | yes | Folder ID for this request. |
| `rolloutPlan` | path | string | yes | Name of the FolderRolloutPlan resource to delete. |
| `requestId` | query | string | no | An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `compute.folderRolloutPlans.get`

- Versions: preview
- `GET https://compute.googleapis.com/compute/v1/{+folder}/global/rolloutPlans/{rolloutPlan}`
- Gets details of a single folder-scoped RolloutPlan.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`, `https://www.googleapis.com/auth/compute.readonly`
- Request: —; Response: `RolloutPlan`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `folder` | path | string | yes | Folder ID for this request. |
| `rolloutPlan` | path | string | yes | Name of the persistent rollout plan to return. |

### `compute.folderRolloutPlans.insert`

- Versions: preview
- `POST https://compute.googleapis.com/compute/v1/{+folder}/global/rolloutPlans`
- Creates a new RolloutPlan in a given folder and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`
- Request: `RolloutPlan`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `folder` | path | string | yes | Folder ID for this request. |
| `requestId` | query | string | no | An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `compute.folderRolloutPlans.list`

- Versions: preview
- `GET https://compute.googleapis.com/compute/v1/{+folder}/global/rolloutPlans`
- Lists FolderRolloutPlans in a given folder and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`, `https://www.googleapis.com/auth/compute.readonly`
- Request: —; Response: `RolloutPlansListResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `folder` | path | string | yes | Folder ID for this request. |
| `filter` | query | string | no | A filter expression that filters resources listed in the response. Most Compute resources support two types of filter expressions: expressions that support regular expressions and expressions that follow API improvement proposal AIP-160. These two types of filter expressions cannot be mixed in one request. If you want to use AIP-160, your expression must specify the field name, an operator, and the value that you want to use for filtering. The value must be a string, a number, or a boolean. The operator must be either `=`, `!=`, `>`, `<`, `<=`, `>=` or `:`. For example, if you are filtering Compute Engine instances, you can exclude instances named `example-instance` by specifying `name != example-instance`. The `:*` comparison can be used to test whether a key has been defined. For example, to find all objects with `owner` label use: labels.owner:\* You can also filter nested fields. For example, you could specify `scheduling.automaticRestart = false` to include instances only if they are not scheduled for automatic restarts. You can use filtering on nested fields to filter based onresource labels. To filter on multiple expressions, provide each separate expression within parentheses. For example: (scheduling.automaticRestart = true) (cpuPlatform = "Intel Skylake") By default, each expression is an `AND` expression. However, you can include `AND` and `OR` expressions explicitly. For example: (cpuPlatform = "Intel Skylake") OR (cpuPlatform = "Intel Broadwell") AND (scheduling.automaticRestart = true) If you want to use a regular expression, use the `eq` (equal) or `ne` (not equal) operator against a single un-parenthesized expression with or without quotes or against multiple parenthesized expressions. Examples: `fieldname eq unquoted literal` `fieldname eq 'single quoted literal'` `fieldname eq "double quoted literal"` `(fieldname1 eq literal) (fieldname2 ne "literal")` The literal value is interpreted as a regular expression using GoogleRE2 library syntax. The literal value must match the entire field. For example, to filter for instances that do not end with name "instance", you would use `name ne .*instance`. You cannot combine constraints on multiple fields using regular expressions. |
| `maxResults` | query | integer (uint32) | no | The maximum number of results per page that should be returned. If the number of available results is larger than `maxResults`, Compute Engine returns a `nextPageToken` that can be used to get the next page of results in subsequent list requests. Acceptable values are `0` to `500`, inclusive. (Default: `500`) |
| `orderBy` | query | string | no | Sorts list results by a certain order. By default, results are returned in alphanumerical order based on the resource name. You can also sort results in descending order based on the creation timestamp using `orderBy="creationTimestamp desc"`. This sorts results based on the `creationTimestamp` field in reverse chronological order (newest result first). Use this to sort resources like operations so that the newest operation is returned first. Currently, only sorting by `name` or `creationTimestamp desc` is supported. |
| `pageToken` | query | string | no | Specifies a page token to use. Set `pageToken` to the `nextPageToken` returned by a previous list request to get the next page of results. |

### `compute.folderRollouts.advance`

- Versions: preview
- `POST https://compute.googleapis.com/compute/v1/{+folder}/global/rollouts/{rollout}/advance`
- Advances a Rollout to the next wave, or completes it if no waves remain.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `folder` | path | string | yes | Required. Folder ID for this request. |
| `rollout` | path | string | yes | Required. Name of the Rollout resource to advance. |
| `currentWaveNumber` | query | string (int64) | yes | Required. Wave number of the current wave. |
| `requestId` | query | string | no | An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `compute.folderRollouts.cancel`

- Versions: preview
- `PATCH https://compute.googleapis.com/compute/v1/{+folder}/global/rollouts/{rollout}`
- Cancels a Rollout.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `folder` | path | string | yes | Required. Folder ID for this request. |
| `rollout` | path | string | yes | Name of the Rollout resource to cancel. |
| `requestId` | query | string | no | An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |
| `rollback` | query | boolean | no | Optional. If true, then the ongoing rollout must be rolled back. Else, just cancel the rollout without taking any further actions. Note that products must support at least one of these options, however, it does not need to support both. |

### `compute.folderRollouts.delete`

- Versions: preview
- `DELETE https://compute.googleapis.com/compute/v1/{+folder}/global/rollouts/{rollout}`
- Deletes a Rollout.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `folder` | path | string | yes | Required. Folder ID for this request. |
| `rollout` | path | string | yes | Name of the Rollout resource to delete. |
| `requestId` | query | string | no | An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `compute.folderRollouts.get`

- Versions: preview
- `GET https://compute.googleapis.com/compute/v1/{+folder}/global/rollouts/{rollout}`
- Gets details of a single folder-scoped Rollout.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`, `https://www.googleapis.com/auth/compute.readonly`
- Request: —; Response: `Rollout`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `folder` | path | string | yes | Folder ID for this request. |
| `rollout` | path | string | yes | Name of the persistent rollout to return. |

### `compute.folderRollouts.list`

- Versions: preview
- `GET https://compute.googleapis.com/compute/v1/{+folder}/global/rollouts`
- Lists Rollouts in a given folder and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`, `https://www.googleapis.com/auth/compute.readonly`
- Request: —; Response: `FolderRolloutsListResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `folder` | path | string | yes | Required. Folder ID for this request. |
| `filter` | query | string | no | A filter expression that filters resources listed in the response. Most Compute resources support two types of filter expressions: expressions that support regular expressions and expressions that follow API improvement proposal AIP-160. These two types of filter expressions cannot be mixed in one request. If you want to use AIP-160, your expression must specify the field name, an operator, and the value that you want to use for filtering. The value must be a string, a number, or a boolean. The operator must be either `=`, `!=`, `>`, `<`, `<=`, `>=` or `:`. For example, if you are filtering Compute Engine instances, you can exclude instances named `example-instance` by specifying `name != example-instance`. The `:*` comparison can be used to test whether a key has been defined. For example, to find all objects with `owner` label use: labels.owner:\* You can also filter nested fields. For example, you could specify `scheduling.automaticRestart = false` to include instances only if they are not scheduled for automatic restarts. You can use filtering on nested fields to filter based onresource labels. To filter on multiple expressions, provide each separate expression within parentheses. For example: (scheduling.automaticRestart = true) (cpuPlatform = "Intel Skylake") By default, each expression is an `AND` expression. However, you can include `AND` and `OR` expressions explicitly. For example: (cpuPlatform = "Intel Skylake") OR (cpuPlatform = "Intel Broadwell") AND (scheduling.automaticRestart = true) If you want to use a regular expression, use the `eq` (equal) or `ne` (not equal) operator against a single un-parenthesized expression with or without quotes or against multiple parenthesized expressions. Examples: `fieldname eq unquoted literal` `fieldname eq 'single quoted literal'` `fieldname eq "double quoted literal"` `(fieldname1 eq literal) (fieldname2 ne "literal")` The literal value is interpreted as a regular expression using GoogleRE2 library syntax. The literal value must match the entire field. For example, to filter for instances that do not end with name "instance", you would use `name ne .*instance`. You cannot combine constraints on multiple fields using regular expressions. |
| `maxResults` | query | integer (uint32) | no | The maximum number of results per page that should be returned. If the number of available results is larger than `maxResults`, Compute Engine returns a `nextPageToken` that can be used to get the next page of results in subsequent list requests. Acceptable values are `0` to `500`, inclusive. (Default: `500`) |
| `orderBy` | query | string | no | Sorts list results by a certain order. By default, results are returned in alphanumerical order based on the resource name. You can also sort results in descending order based on the creation timestamp using `orderBy="creationTimestamp desc"`. This sorts results based on the `creationTimestamp` field in reverse chronological order (newest result first). Use this to sort resources like operations so that the newest operation is returned first. Currently, only sorting by `name` or `creationTimestamp desc` is supported. |
| `pageToken` | query | string | no | Specifies a page token to use. Set `pageToken` to the `nextPageToken` returned by a previous list request to get the next page of results. |

### `compute.folderRollouts.pause`

- Versions: preview
- `POST https://compute.googleapis.com/compute/v1/{+folder}/global/rollouts/{rollout}/pause`
- Pauses a Rollout.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `folder` | path | string | yes | Required. Folder ID for this request. |
| `rollout` | path | string | yes | Required. Name of the Rollout resource to pause. |
| `etag` | query | string | no | The etag of the Rollout. If this is provided, the request will only succeed if the etag matches the current etag of the Rollout. |
| `requestId` | query | string | no | An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `compute.folderRollouts.resume`

- Versions: preview
- `POST https://compute.googleapis.com/compute/v1/{+folder}/global/rollouts/{rollout}/resume`
- Resumes a Rollout.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `folder` | path | string | yes | Required. Folder ID for this request. |
| `rollout` | path | string | yes | Required. Name of the Rollout resource to resume. |
| `etag` | query | string | no | The etag of the Rollout. If this is provided, the request will only succeed if the etag matches the current etag of the Rollout. |
| `requestId` | query | string | no | An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `compute.folderZoneVmExtensionPolicies.delete`

- Versions: preview, alpha
- `DELETE https://compute.googleapis.com/compute/v1/{+folder}/zones/{zone}/vmExtensionPolicies/{vmExtensionPolicy}`
- Deletes a specified zone VM extension policy within a folder.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `folder` | path | string | yes | Folder ID for this request. |
| `zone` | path | string | yes | Name of the zone for this request. |
| `vmExtensionPolicy` | path | string | yes | Name of the zone VM extension policy to delete. |
| `requestId` | query | string | no | An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `compute.folderZoneVmExtensionPolicies.get`

- Versions: preview, alpha
- `GET https://compute.googleapis.com/compute/v1/{+folder}/zones/{zone}/vmExtensionPolicies/{vmExtensionPolicy}`
- Retrieves details of a specific zone VM extension policy within a folder.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`, `https://www.googleapis.com/auth/compute.readonly`
- Request: —; Response: `VmExtensionPolicy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `folder` | path | string | yes | Folder ID for this request. |
| `zone` | path | string | yes | Name of the zone for this request. |
| `vmExtensionPolicy` | path | string | yes | Name of the VM extension policy resource to return. |

### `compute.folderZoneVmExtensionPolicies.getVmExtension`

- Versions: preview, alpha
- `GET https://compute.googleapis.com/compute/v1/{+folder}/zones/{zone}/vmExtensions/{extensionName}`
- Retrieves details of a specific VM extension within a folder.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`, `https://www.googleapis.com/auth/compute.readonly`
- Request: —; Response: `VmExtension`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `folder` | path | string | yes | Folder ID for this request. |
| `zone` | path | string | yes | Name of the zone for this request. |
| `extensionName` | path | string | yes | Required. Name of the VM extension for this request. |

### `compute.folderZoneVmExtensionPolicies.insert`

- Versions: preview, alpha
- `POST https://compute.googleapis.com/compute/v1/{+folder}/zones/{zone}/vmExtensionPolicies`
- Creates a new zone-level VM extension policy within a folder.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`
- Request: `VmExtensionPolicy`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `folder` | path | string | yes | Folder ID for this request. |
| `zone` | path | string | yes | Name of the zone for this request. |
| `requestId` | query | string | no | An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `compute.folderZoneVmExtensionPolicies.list`

- Versions: preview, alpha
- `GET https://compute.googleapis.com/compute/v1/{+folder}/zones/{zone}/vmExtensionPolicies`
- Lists all VM extension policies within a specific zone for a folder.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`, `https://www.googleapis.com/auth/compute.readonly`
- Request: —; Response: `VmExtensionPolicyList`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `folder` | path | string | yes | Folder ID for this request. |
| `zone` | path | string | yes | Name of the zone for this request. |
| `filter` | query | string | no | A filter expression that filters resources listed in the response. Most Compute resources support two types of filter expressions: expressions that support regular expressions and expressions that follow API improvement proposal AIP-160. These two types of filter expressions cannot be mixed in one request. If you want to use AIP-160, your expression must specify the field name, an operator, and the value that you want to use for filtering. The value must be a string, a number, or a boolean. The operator must be either `=`, `!=`, `>`, `<`, `<=`, `>=` or `:`. For example, if you are filtering Compute Engine instances, you can exclude instances named `example-instance` by specifying `name != example-instance`. The `:*` comparison can be used to test whether a key has been defined. For example, to find all objects with `owner` label use: labels.owner:\* You can also filter nested fields. For example, you could specify `scheduling.automaticRestart = false` to include instances only if they are not scheduled for automatic restarts. You can use filtering on nested fields to filter based onresource labels. To filter on multiple expressions, provide each separate expression within parentheses. For example: (scheduling.automaticRestart = true) (cpuPlatform = "Intel Skylake") By default, each expression is an `AND` expression. However, you can include `AND` and `OR` expressions explicitly. For example: (cpuPlatform = "Intel Skylake") OR (cpuPlatform = "Intel Broadwell") AND (scheduling.automaticRestart = true) If you want to use a regular expression, use the `eq` (equal) or `ne` (not equal) operator against a single un-parenthesized expression with or without quotes or against multiple parenthesized expressions. Examples: `fieldname eq unquoted literal` `fieldname eq 'single quoted literal'` `fieldname eq "double quoted literal"` `(fieldname1 eq literal) (fieldname2 ne "literal")` The literal value is interpreted as a regular expression using GoogleRE2 library syntax. The literal value must match the entire field. For example, to filter for instances that do not end with name "instance", you would use `name ne .*instance`. You cannot combine constraints on multiple fields using regular expressions. |
| `maxResults` | query | integer (uint32) | no | The maximum number of results per page that should be returned. If the number of available results is larger than `maxResults`, Compute Engine returns a `nextPageToken` that can be used to get the next page of results in subsequent list requests. Acceptable values are `0` to `500`, inclusive. (Default: `500`) |
| `orderBy` | query | string | no | Sorts list results by a certain order. By default, results are returned in alphanumerical order based on the resource name. You can also sort results in descending order based on the creation timestamp using `orderBy="creationTimestamp desc"`. This sorts results based on the `creationTimestamp` field in reverse chronological order (newest result first). Use this to sort resources like operations so that the newest operation is returned first. Currently, only sorting by `name` or `creationTimestamp desc` is supported. |
| `pageToken` | query | string | no | Specifies a page token to use. Set `pageToken` to the `nextPageToken` returned by a previous list request to get the next page of results. |

### `compute.folderZoneVmExtensionPolicies.listVmExtensions`

- Versions: preview, alpha
- `GET https://compute.googleapis.com/compute/v1/{+folder}/zones/{zone}/vmExtensions`
- Lists all VM extensions within a specific zone for a folder. This is a read-only API.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`, `https://www.googleapis.com/auth/compute.readonly`
- Request: —; Response: `ListVmExtensionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `folder` | path | string | yes | Folder ID for this request. |
| `zone` | path | string | yes | Name of the zone for this request. |
| `filter` | query | string | no | A filter expression that filters resources listed in the response. Most Compute resources support two types of filter expressions: expressions that support regular expressions and expressions that follow API improvement proposal AIP-160. These two types of filter expressions cannot be mixed in one request. If you want to use AIP-160, your expression must specify the field name, an operator, and the value that you want to use for filtering. The value must be a string, a number, or a boolean. The operator must be either `=`, `!=`, `>`, `<`, `<=`, `>=` or `:`. For example, if you are filtering Compute Engine instances, you can exclude instances named `example-instance` by specifying `name != example-instance`. The `:*` comparison can be used to test whether a key has been defined. For example, to find all objects with `owner` label use: labels.owner:\* You can also filter nested fields. For example, you could specify `scheduling.automaticRestart = false` to include instances only if they are not scheduled for automatic restarts. You can use filtering on nested fields to filter based onresource labels. To filter on multiple expressions, provide each separate expression within parentheses. For example: (scheduling.automaticRestart = true) (cpuPlatform = "Intel Skylake") By default, each expression is an `AND` expression. However, you can include `AND` and `OR` expressions explicitly. For example: (cpuPlatform = "Intel Skylake") OR (cpuPlatform = "Intel Broadwell") AND (scheduling.automaticRestart = true) If you want to use a regular expression, use the `eq` (equal) or `ne` (not equal) operator against a single un-parenthesized expression with or without quotes or against multiple parenthesized expressions. Examples: `fieldname eq unquoted literal` `fieldname eq 'single quoted literal'` `fieldname eq "double quoted literal"` `(fieldname1 eq literal) (fieldname2 ne "literal")` The literal value is interpreted as a regular expression using GoogleRE2 library syntax. The literal value must match the entire field. For example, to filter for instances that do not end with name "instance", you would use `name ne .*instance`. You cannot combine constraints on multiple fields using regular expressions. |
| `maxResults` | query | integer (uint32) | no | The maximum number of results per page that should be returned. If the number of available results is larger than `maxResults`, Compute Engine returns a `nextPageToken` that can be used to get the next page of results in subsequent list requests. Acceptable values are `0` to `500`, inclusive. (Default: `500`) |
| `orderBy` | query | string | no | Sorts list results by a certain order. By default, results are returned in alphanumerical order based on the resource name. You can also sort results in descending order based on the creation timestamp using `orderBy="creationTimestamp desc"`. This sorts results based on the `creationTimestamp` field in reverse chronological order (newest result first). Use this to sort resources like operations so that the newest operation is returned first. Currently, only sorting by `name` or `creationTimestamp desc` is supported. |
| `pageToken` | query | string | no | Specifies a page token to use. Set `pageToken` to the `nextPageToken` returned by a previous list request to get the next page of results. |

### `compute.folderZoneVmExtensionPolicies.update`

- Versions: preview, alpha
- `PATCH https://compute.googleapis.com/compute/v1/{+folder}/zones/{zone}/vmExtensionPolicies/{vmExtensionPolicy}`
- Modifies an existing zone VM extension policy within a folder.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`
- Request: `VmExtensionPolicy`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `folder` | path | string | yes | Folder ID for this request. |
| `zone` | path | string | yes | Name of the zone for this request. |
| `vmExtensionPolicy` | path | string | yes | Name of the zone VM extension policy to update. |
| `requestId` | query | string | no | An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `compute.forwardingRules.aggregatedList`

- Versions: v1, preview, beta, alpha
- `GET https://compute.googleapis.com/compute/v1/projects/{project}/aggregated/forwardingRules`
- Retrieves an aggregated list of forwarding rules. To prevent failure, it is recommended that you set the `returnPartialSuccess` parameter to `true`.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`, `https://www.googleapis.com/auth/compute.readonly`
- Request: —; Response: `ForwardingRuleAggregatedList`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `filter` | query | string | no | A filter expression that filters resources listed in the response. Most Compute resources support two types of filter expressions: expressions that support regular expressions and expressions that follow API improvement proposal AIP-160. These two types of filter expressions cannot be mixed in one request. If you want to use AIP-160, your expression must specify the field name, an operator, and the value that you want to use for filtering. The value must be a string, a number, or a boolean. The operator must be either `=`, `!=`, `>`, `<`, `<=`, `>=` or `:`. For example, if you are filtering Compute Engine instances, you can exclude instances named `example-instance` by specifying `name != example-instance`. The `:*` comparison can be used to test whether a key has been defined. For example, to find all objects with `owner` label use: labels.owner:\* You can also filter nested fields. For example, you could specify `scheduling.automaticRestart = false` to include instances only if they are not scheduled for automatic restarts. You can use filtering on nested fields to filter based onresource labels. To filter on multiple expressions, provide each separate expression within parentheses. For example: (scheduling.automaticRestart = true) (cpuPlatform = "Intel Skylake") By default, each expression is an `AND` expression. However, you can include `AND` and `OR` expressions explicitly. For example: (cpuPlatform = "Intel Skylake") OR (cpuPlatform = "Intel Broadwell") AND (scheduling.automaticRestart = true) If you want to use a regular expression, use the `eq` (equal) or `ne` (not equal) operator against a single un-parenthesized expression with or without quotes or against multiple parenthesized expressions. Examples: `fieldname eq unquoted literal` `fieldname eq 'single quoted literal'` `fieldname eq "double quoted literal"` `(fieldname1 eq literal) (fieldname2 ne "literal")` The literal value is interpreted as a regular expression using GoogleRE2 library syntax. The literal value must match the entire field. For example, to filter for instances that do not end with name "instance", you would use `name ne .*instance`. You cannot combine constraints on multiple fields using regular expressions. |
| `includeAllScopes` | query | boolean | no | Indicates whether every visible scope for each scope type (zone, region, global) should be included in the response. For new resource types added after this field, the flag has no effect as new resource types will always include every visible scope for each scope type in response. For resource types which predate this field, if this flag is omitted or false, only scopes of the scope types where the resource type is expected to be found will be included. |
| `maxResults` | query | integer (uint32) | no | The maximum number of results per page that should be returned. If the number of available results is larger than `maxResults`, Compute Engine returns a `nextPageToken` that can be used to get the next page of results in subsequent list requests. Acceptable values are `0` to `500`, inclusive. (Default: `500`) |
| `orderBy` | query | string | no | Sorts list results by a certain order. By default, results are returned in alphanumerical order based on the resource name. You can also sort results in descending order based on the creation timestamp using `orderBy="creationTimestamp desc"`. This sorts results based on the `creationTimestamp` field in reverse chronological order (newest result first). Use this to sort resources like operations so that the newest operation is returned first. Currently, only sorting by `name` or `creationTimestamp desc` is supported. |
| `pageToken` | query | string | no | Specifies a page token to use. Set `pageToken` to the `nextPageToken` returned by a previous list request to get the next page of results. |
| `serviceProjectNumber` | query | string (int64) | no | The Shared VPC service project id or service project number for which aggregated list request is invoked for subnetworks list-usable api. |

### `compute.forwardingRules.delete`

- Versions: v1, preview, beta, alpha
- `DELETE https://compute.googleapis.com/compute/v1/projects/{project}/regions/{region}/forwardingRules/{forwardingRule}`
- Deletes the specified ForwardingRule resource.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `region` | path | string | yes | Name of the region scoping this request. |
| `forwardingRule` | path | string | yes | Name of the ForwardingRule resource to delete. |
| `requestId` | query | string | no | An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `compute.forwardingRules.get`

- Versions: v1, preview, beta, alpha
- `GET https://compute.googleapis.com/compute/v1/projects/{project}/regions/{region}/forwardingRules/{forwardingRule}`
- Returns the specified ForwardingRule resource.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`, `https://www.googleapis.com/auth/compute.readonly`
- Request: —; Response: `ForwardingRule`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `region` | path | string | yes | Name of the region scoping this request. |
| `forwardingRule` | path | string | yes | Name of the ForwardingRule resource to return. |
| `view` | query | string enum | no | — Values: `BASIC`, `FULL`. |

### `compute.forwardingRules.insert`

- Versions: v1, preview, beta, alpha
- `POST https://compute.googleapis.com/compute/v1/projects/{project}/regions/{region}/forwardingRules`
- Creates a ForwardingRule resource in the specified project and region using the data included in the request.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`
- Request: `ForwardingRule`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `region` | path | string | yes | Name of the region scoping this request. |
| `requestId` | query | string | no | An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `compute.forwardingRules.list`

- Versions: v1, preview, beta, alpha
- `GET https://compute.googleapis.com/compute/v1/projects/{project}/regions/{region}/forwardingRules`
- Retrieves a list of ForwardingRule resources available to the specified project and region.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`, `https://www.googleapis.com/auth/compute.readonly`
- Request: —; Response: `ForwardingRuleList`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `region` | path | string | yes | Name of the region scoping this request. |
| `filter` | query | string | no | A filter expression that filters resources listed in the response. Most Compute resources support two types of filter expressions: expressions that support regular expressions and expressions that follow API improvement proposal AIP-160. These two types of filter expressions cannot be mixed in one request. If you want to use AIP-160, your expression must specify the field name, an operator, and the value that you want to use for filtering. The value must be a string, a number, or a boolean. The operator must be either `=`, `!=`, `>`, `<`, `<=`, `>=` or `:`. For example, if you are filtering Compute Engine instances, you can exclude instances named `example-instance` by specifying `name != example-instance`. The `:*` comparison can be used to test whether a key has been defined. For example, to find all objects with `owner` label use: labels.owner:\* You can also filter nested fields. For example, you could specify `scheduling.automaticRestart = false` to include instances only if they are not scheduled for automatic restarts. You can use filtering on nested fields to filter based onresource labels. To filter on multiple expressions, provide each separate expression within parentheses. For example: (scheduling.automaticRestart = true) (cpuPlatform = "Intel Skylake") By default, each expression is an `AND` expression. However, you can include `AND` and `OR` expressions explicitly. For example: (cpuPlatform = "Intel Skylake") OR (cpuPlatform = "Intel Broadwell") AND (scheduling.automaticRestart = true) If you want to use a regular expression, use the `eq` (equal) or `ne` (not equal) operator against a single un-parenthesized expression with or without quotes or against multiple parenthesized expressions. Examples: `fieldname eq unquoted literal` `fieldname eq 'single quoted literal'` `fieldname eq "double quoted literal"` `(fieldname1 eq literal) (fieldname2 ne "literal")` The literal value is interpreted as a regular expression using GoogleRE2 library syntax. The literal value must match the entire field. For example, to filter for instances that do not end with name "instance", you would use `name ne .*instance`. You cannot combine constraints on multiple fields using regular expressions. |
| `maxResults` | query | integer (uint32) | no | The maximum number of results per page that should be returned. If the number of available results is larger than `maxResults`, Compute Engine returns a `nextPageToken` that can be used to get the next page of results in subsequent list requests. Acceptable values are `0` to `500`, inclusive. (Default: `500`) |
| `orderBy` | query | string | no | Sorts list results by a certain order. By default, results are returned in alphanumerical order based on the resource name. You can also sort results in descending order based on the creation timestamp using `orderBy="creationTimestamp desc"`. This sorts results based on the `creationTimestamp` field in reverse chronological order (newest result first). Use this to sort resources like operations so that the newest operation is returned first. Currently, only sorting by `name` or `creationTimestamp desc` is supported. |
| `pageToken` | query | string | no | Specifies a page token to use. Set `pageToken` to the `nextPageToken` returned by a previous list request to get the next page of results. |

### `compute.forwardingRules.patch`

- Versions: v1, preview, beta, alpha
- `PATCH https://compute.googleapis.com/compute/v1/projects/{project}/regions/{region}/forwardingRules/{forwardingRule}`
- Updates the specified forwarding rule with the data included in the request. This method supportsPATCH semantics and uses theJSON merge patch format and processing rules. Currently, you can only patch the network_tier field.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`
- Request: `ForwardingRule`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `region` | path | string | yes | Name of the region scoping this request. |
| `forwardingRule` | path | string | yes | Name of the ForwardingRule resource to patch. |
| `requestId` | query | string | no | An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `compute.forwardingRules.setLabels`

- Versions: v1, preview, beta, alpha
- `POST https://compute.googleapis.com/compute/v1/projects/{project}/regions/{region}/forwardingRules/{resource}/setLabels`
- Sets the labels on the specified resource. To learn more about labels, read the Labeling Resources documentation.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`
- Request: `RegionSetLabelsRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `region` | path | string | yes | The region for this request. |
| `resource` | path | string | yes | Name or id of the resource for this request. |
| `requestId` | query | string | no | An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `compute.forwardingRules.setTarget`

- Versions: v1, preview, beta, alpha
- `POST https://compute.googleapis.com/compute/v1/projects/{project}/regions/{region}/forwardingRules/{forwardingRule}/setTarget`
- Changes target URL for forwarding rule. The new target should be of the same type as the old target.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`
- Request: `TargetReference`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `region` | path | string | yes | Name of the region scoping this request. |
| `forwardingRule` | path | string | yes | Name of the ForwardingRule resource in which target is to be set. |
| `requestId` | query | string | no | An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `compute.forwardingRules.testIamPermissions`

- Versions: beta, alpha
- `POST https://compute.googleapis.com/compute/beta/projects/{project}/regions/{region}/forwardingRules/{resource}/testIamPermissions`
- Returns permissions that a caller has on the specified resource.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`, `https://www.googleapis.com/auth/compute.readonly`
- Request: `TestPermissionsRequest`; Response: `TestPermissionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `region` | path | string | yes | The name of the region for this request. |
| `resource` | path | string | yes | Name or id of the resource for this request. |

### `compute.futureReservations.aggregatedList`

- Versions: v1, preview, beta, alpha
- `GET https://compute.googleapis.com/compute/v1/projects/{project}/aggregated/futureReservations`
- Retrieves an aggregated list of future reservations. To prevent failure, it is recommended that you set the `returnPartialSuccess` parameter to `true`.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`, `https://www.googleapis.com/auth/compute.readonly`
- Request: —; Response: `FutureReservationsAggregatedListResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `filter` | query | string | no | A filter expression that filters resources listed in the response. Most Compute resources support two types of filter expressions: expressions that support regular expressions and expressions that follow API improvement proposal AIP-160. These two types of filter expressions cannot be mixed in one request. If you want to use AIP-160, your expression must specify the field name, an operator, and the value that you want to use for filtering. The value must be a string, a number, or a boolean. The operator must be either `=`, `!=`, `>`, `<`, `<=`, `>=` or `:`. For example, if you are filtering Compute Engine instances, you can exclude instances named `example-instance` by specifying `name != example-instance`. The `:*` comparison can be used to test whether a key has been defined. For example, to find all objects with `owner` label use: labels.owner:\* You can also filter nested fields. For example, you could specify `scheduling.automaticRestart = false` to include instances only if they are not scheduled for automatic restarts. You can use filtering on nested fields to filter based onresource labels. To filter on multiple expressions, provide each separate expression within parentheses. For example: (scheduling.automaticRestart = true) (cpuPlatform = "Intel Skylake") By default, each expression is an `AND` expression. However, you can include `AND` and `OR` expressions explicitly. For example: (cpuPlatform = "Intel Skylake") OR (cpuPlatform = "Intel Broadwell") AND (scheduling.automaticRestart = true) If you want to use a regular expression, use the `eq` (equal) or `ne` (not equal) operator against a single un-parenthesized expression with or without quotes or against multiple parenthesized expressions. Examples: `fieldname eq unquoted literal` `fieldname eq 'single quoted literal'` `fieldname eq "double quoted literal"` `(fieldname1 eq literal) (fieldname2 ne "literal")` The literal value is interpreted as a regular expression using GoogleRE2 library syntax. The literal value must match the entire field. For example, to filter for instances that do not end with name "instance", you would use `name ne .*instance`. You cannot combine constraints on multiple fields using regular expressions. |
| `includeAllScopes` | query | boolean | no | Indicates whether every visible scope for each scope type (zone, region, global) should be included in the response. For new resource types added after this field, the flag has no effect as new resource types will always include every visible scope for each scope type in response. For resource types which predate this field, if this flag is omitted or false, only scopes of the scope types where the resource type is expected to be found will be included. |
| `maxResults` | query | integer (uint32) | no | The maximum number of results per page that should be returned. If the number of available results is larger than `maxResults`, Compute Engine returns a `nextPageToken` that can be used to get the next page of results in subsequent list requests. Acceptable values are `0` to `500`, inclusive. (Default: `500`) |
| `orderBy` | query | string | no | Sorts list results by a certain order. By default, results are returned in alphanumerical order based on the resource name. You can also sort results in descending order based on the creation timestamp using `orderBy="creationTimestamp desc"`. This sorts results based on the `creationTimestamp` field in reverse chronological order (newest result first). Use this to sort resources like operations so that the newest operation is returned first. Currently, only sorting by `name` or `creationTimestamp desc` is supported. |
| `pageToken` | query | string | no | Specifies a page token to use. Set `pageToken` to the `nextPageToken` returned by a previous list request to get the next page of results. |
| `serviceProjectNumber` | query | string (int64) | no | The Shared VPC service project id or service project number for which aggregated list request is invoked for subnetworks list-usable api. |

### `compute.futureReservations.cancel`

- Versions: v1, preview, beta, alpha
- `POST https://compute.googleapis.com/compute/v1/projects/{project}/zones/{zone}/futureReservations/{futureReservation}/cancel`
- Cancel the specified future reservation.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `zone` | path | string | yes | Name of the zone for this request. Name should conform to RFC1035. |
| `futureReservation` | path | string | yes | Name of the future reservation to retrieve. Name should conform to RFC1035. |
| `requestId` | query | string | no | An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `compute.futureReservations.delete`

- Versions: v1, preview, beta, alpha
- `DELETE https://compute.googleapis.com/compute/v1/projects/{project}/zones/{zone}/futureReservations/{futureReservation}`
- Deletes the specified future reservation.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `zone` | path | string | yes | Name of the zone for this request. Name should conform to RFC1035. |
| `futureReservation` | path | string | yes | Name of the future reservation to retrieve. Name should conform to RFC1035. |
| `requestId` | query | string | no | An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `compute.futureReservations.get`

- Versions: v1, preview, beta, alpha
- `GET https://compute.googleapis.com/compute/v1/projects/{project}/zones/{zone}/futureReservations/{futureReservation}`
- Retrieves information about the specified future reservation.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`, `https://www.googleapis.com/auth/compute.readonly`
- Request: —; Response: `FutureReservation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `zone` | path | string | yes | Name of the zone for this request. Name should conform to RFC1035. |
| `futureReservation` | path | string | yes | Name of the future reservation to retrieve. Name should conform to RFC1035. |

### `compute.futureReservations.insert`

- Versions: v1, preview, beta, alpha
- `POST https://compute.googleapis.com/compute/v1/projects/{project}/zones/{zone}/futureReservations`
- Creates a new Future Reservation.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`
- Request: `FutureReservation`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `zone` | path | string | yes | Name of the zone for this request. Name should conform to RFC1035. |
| `requestId` | query | string | no | An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `compute.futureReservations.list`

- Versions: v1, preview, beta, alpha
- `GET https://compute.googleapis.com/compute/v1/projects/{project}/zones/{zone}/futureReservations`
- A list of all the future reservations that have been configured for the specified project in specified zone.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`, `https://www.googleapis.com/auth/compute.readonly`
- Request: —; Response: `FutureReservationsListResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `zone` | path | string | yes | Name of the zone for this request. Name should conform to RFC1035. |
| `filter` | query | string | no | A filter expression that filters resources listed in the response. Most Compute resources support two types of filter expressions: expressions that support regular expressions and expressions that follow API improvement proposal AIP-160. These two types of filter expressions cannot be mixed in one request. If you want to use AIP-160, your expression must specify the field name, an operator, and the value that you want to use for filtering. The value must be a string, a number, or a boolean. The operator must be either `=`, `!=`, `>`, `<`, `<=`, `>=` or `:`. For example, if you are filtering Compute Engine instances, you can exclude instances named `example-instance` by specifying `name != example-instance`. The `:*` comparison can be used to test whether a key has been defined. For example, to find all objects with `owner` label use: labels.owner:\* You can also filter nested fields. For example, you could specify `scheduling.automaticRestart = false` to include instances only if they are not scheduled for automatic restarts. You can use filtering on nested fields to filter based onresource labels. To filter on multiple expressions, provide each separate expression within parentheses. For example: (scheduling.automaticRestart = true) (cpuPlatform = "Intel Skylake") By default, each expression is an `AND` expression. However, you can include `AND` and `OR` expressions explicitly. For example: (cpuPlatform = "Intel Skylake") OR (cpuPlatform = "Intel Broadwell") AND (scheduling.automaticRestart = true) If you want to use a regular expression, use the `eq` (equal) or `ne` (not equal) operator against a single un-parenthesized expression with or without quotes or against multiple parenthesized expressions. Examples: `fieldname eq unquoted literal` `fieldname eq 'single quoted literal'` `fieldname eq "double quoted literal"` `(fieldname1 eq literal) (fieldname2 ne "literal")` The literal value is interpreted as a regular expression using GoogleRE2 library syntax. The literal value must match the entire field. For example, to filter for instances that do not end with name "instance", you would use `name ne .*instance`. You cannot combine constraints on multiple fields using regular expressions. |
| `maxResults` | query | integer (uint32) | no | The maximum number of results per page that should be returned. If the number of available results is larger than `maxResults`, Compute Engine returns a `nextPageToken` that can be used to get the next page of results in subsequent list requests. Acceptable values are `0` to `500`, inclusive. (Default: `500`) |
| `orderBy` | query | string | no | Sorts list results by a certain order. By default, results are returned in alphanumerical order based on the resource name. You can also sort results in descending order based on the creation timestamp using `orderBy="creationTimestamp desc"`. This sorts results based on the `creationTimestamp` field in reverse chronological order (newest result first). Use this to sort resources like operations so that the newest operation is returned first. Currently, only sorting by `name` or `creationTimestamp desc` is supported. |
| `pageToken` | query | string | no | Specifies a page token to use. Set `pageToken` to the `nextPageToken` returned by a previous list request to get the next page of results. |

### `compute.futureReservations.update`

- Versions: v1, preview, beta, alpha
- `PATCH https://compute.googleapis.com/compute/v1/projects/{project}/zones/{zone}/futureReservations/{futureReservation}`
- Updates the specified future reservation.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`
- Request: `FutureReservation`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `zone` | path | string | yes | Name of the zone for this request. Name should conform to RFC1035. |
| `futureReservation` | path | string | yes | Name of the reservation to update. Name should conform to RFC1035. |
| `requestId` | query | string | no | An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |
| `updateMask` | query | string (google-fieldmask) | no | update_mask indicates fields to be updated as part of this request. |

### `compute.globalAddresses.delete`

- Versions: v1, preview, beta, alpha
- `DELETE https://compute.googleapis.com/compute/v1/projects/{project}/global/addresses/{address}`
- Deletes the specified address resource.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `address` | path | string | yes | Name of the address resource to delete. |
| `requestId` | query | string | no | An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `compute.globalAddresses.get`

- Versions: v1, preview, beta, alpha
- `GET https://compute.googleapis.com/compute/v1/projects/{project}/global/addresses/{address}`
- Returns the specified address resource.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`, `https://www.googleapis.com/auth/compute.readonly`
- Request: —; Response: `Address`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `address` | path | string | yes | Name of the address resource to return. |

### `compute.globalAddresses.getOwnerInstance`

- Versions: alpha
- `GET https://compute.googleapis.com/compute/alpha/projects/{project}/global/addresses/getOwnerInstance`
- Find owner instance from given ip address
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`, `https://www.googleapis.com/auth/compute.readonly`
- Request: —; Response: `GetOwnerInstanceResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `ipAddress` | query | string | no | The VM IP address. |

### `compute.globalAddresses.insert`

- Versions: v1, preview, beta, alpha
- `POST https://compute.googleapis.com/compute/v1/projects/{project}/global/addresses`
- Creates an address resource in the specified project by using the data included in the request.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`
- Request: `Address`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `requestId` | query | string | no | An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `compute.globalAddresses.list`

- Versions: v1, preview, beta, alpha
- `GET https://compute.googleapis.com/compute/v1/projects/{project}/global/addresses`
- Retrieves a list of global addresses.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`, `https://www.googleapis.com/auth/compute.readonly`
- Request: —; Response: `AddressList`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `filter` | query | string | no | A filter expression that filters resources listed in the response. Most Compute resources support two types of filter expressions: expressions that support regular expressions and expressions that follow API improvement proposal AIP-160. These two types of filter expressions cannot be mixed in one request. If you want to use AIP-160, your expression must specify the field name, an operator, and the value that you want to use for filtering. The value must be a string, a number, or a boolean. The operator must be either `=`, `!=`, `>`, `<`, `<=`, `>=` or `:`. For example, if you are filtering Compute Engine instances, you can exclude instances named `example-instance` by specifying `name != example-instance`. The `:*` comparison can be used to test whether a key has been defined. For example, to find all objects with `owner` label use: labels.owner:\* You can also filter nested fields. For example, you could specify `scheduling.automaticRestart = false` to include instances only if they are not scheduled for automatic restarts. You can use filtering on nested fields to filter based onresource labels. To filter on multiple expressions, provide each separate expression within parentheses. For example: (scheduling.automaticRestart = true) (cpuPlatform = "Intel Skylake") By default, each expression is an `AND` expression. However, you can include `AND` and `OR` expressions explicitly. For example: (cpuPlatform = "Intel Skylake") OR (cpuPlatform = "Intel Broadwell") AND (scheduling.automaticRestart = true) If you want to use a regular expression, use the `eq` (equal) or `ne` (not equal) operator against a single un-parenthesized expression with or without quotes or against multiple parenthesized expressions. Examples: `fieldname eq unquoted literal` `fieldname eq 'single quoted literal'` `fieldname eq "double quoted literal"` `(fieldname1 eq literal) (fieldname2 ne "literal")` The literal value is interpreted as a regular expression using GoogleRE2 library syntax. The literal value must match the entire field. For example, to filter for instances that do not end with name "instance", you would use `name ne .*instance`. You cannot combine constraints on multiple fields using regular expressions. |
| `maxResults` | query | integer (uint32) | no | The maximum number of results per page that should be returned. If the number of available results is larger than `maxResults`, Compute Engine returns a `nextPageToken` that can be used to get the next page of results in subsequent list requests. Acceptable values are `0` to `500`, inclusive. (Default: `500`) |
| `orderBy` | query | string | no | Sorts list results by a certain order. By default, results are returned in alphanumerical order based on the resource name. You can also sort results in descending order based on the creation timestamp using `orderBy="creationTimestamp desc"`. This sorts results based on the `creationTimestamp` field in reverse chronological order (newest result first). Use this to sort resources like operations so that the newest operation is returned first. Currently, only sorting by `name` or `creationTimestamp desc` is supported. |
| `pageToken` | query | string | no | Specifies a page token to use. Set `pageToken` to the `nextPageToken` returned by a previous list request to get the next page of results. |

### `compute.globalAddresses.move`

- Versions: v1, preview, beta, alpha
- `POST https://compute.googleapis.com/compute/v1/projects/{project}/global/addresses/{address}/move`
- Moves the specified address resource from one project to another project.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`
- Request: `GlobalAddressesMoveRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Source project ID which the Address is moved from. |
| `address` | path | string | yes | Name of the address resource to move. |
| `requestId` | query | string | no | An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `compute.globalAddresses.setLabels`

- Versions: v1, preview, beta, alpha
- `POST https://compute.googleapis.com/compute/v1/projects/{project}/global/addresses/{resource}/setLabels`
- Sets the labels on a GlobalAddress. To learn more about labels, read theLabeling Resources documentation.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`
- Request: `GlobalSetLabelsRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `resource` | path | string | yes | Name or id of the resource for this request. |

### `compute.globalAddresses.testIamPermissions`

- Versions: v1, preview, beta, alpha
- `POST https://compute.googleapis.com/compute/v1/projects/{project}/global/addresses/{resource}/testIamPermissions`
- Returns permissions that a caller has on the specified resource.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`, `https://www.googleapis.com/auth/compute.readonly`
- Request: `TestPermissionsRequest`; Response: `TestPermissionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `resource` | path | string | yes | Name or id of the resource for this request. |

### `compute.globalFolderOperations.get`

- Versions: preview, alpha
- `GET https://compute.googleapis.com/compute/v1/{+folder}/global/operations/{operation}`
- Retrieves the specified Operations resource.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`, `https://www.googleapis.com/auth/compute.readonly`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `folder` | path | string | yes | Folder ID for this request. |
| `operation` | path | string | yes | Name of the Operations resource to return. |

### `compute.globalFolderOperations.list`

- Versions: preview, alpha
- `GET https://compute.googleapis.com/compute/v1/{+folder}/global/operations`
- Retrieves a list of Operation resources contained within the specified folder.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`, `https://www.googleapis.com/auth/compute.readonly`
- Request: —; Response: `OperationList`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `folder` | path | string | yes | Folder ID for this request. |
| `filter` | query | string | no | A filter expression that filters resources listed in the response. Most Compute resources support two types of filter expressions: expressions that support regular expressions and expressions that follow API improvement proposal AIP-160. These two types of filter expressions cannot be mixed in one request. If you want to use AIP-160, your expression must specify the field name, an operator, and the value that you want to use for filtering. The value must be a string, a number, or a boolean. The operator must be either `=`, `!=`, `>`, `<`, `<=`, `>=` or `:`. For example, if you are filtering Compute Engine instances, you can exclude instances named `example-instance` by specifying `name != example-instance`. The `:*` comparison can be used to test whether a key has been defined. For example, to find all objects with `owner` label use: labels.owner:\* You can also filter nested fields. For example, you could specify `scheduling.automaticRestart = false` to include instances only if they are not scheduled for automatic restarts. You can use filtering on nested fields to filter based onresource labels. To filter on multiple expressions, provide each separate expression within parentheses. For example: (scheduling.automaticRestart = true) (cpuPlatform = "Intel Skylake") By default, each expression is an `AND` expression. However, you can include `AND` and `OR` expressions explicitly. For example: (cpuPlatform = "Intel Skylake") OR (cpuPlatform = "Intel Broadwell") AND (scheduling.automaticRestart = true) If you want to use a regular expression, use the `eq` (equal) or `ne` (not equal) operator against a single un-parenthesized expression with or without quotes or against multiple parenthesized expressions. Examples: `fieldname eq unquoted literal` `fieldname eq 'single quoted literal'` `fieldname eq "double quoted literal"` `(fieldname1 eq literal) (fieldname2 ne "literal")` The literal value is interpreted as a regular expression using GoogleRE2 library syntax. The literal value must match the entire field. For example, to filter for instances that do not end with name "instance", you would use `name ne .*instance`. You cannot combine constraints on multiple fields using regular expressions. |
| `maxResults` | query | integer (uint32) | no | The maximum number of results per page that should be returned. If the number of available results is larger than `maxResults`, Compute Engine returns a `nextPageToken` that can be used to get the next page of results in subsequent list requests. Acceptable values are `0` to `500`, inclusive. (Default: `500`) |
| `orderBy` | query | string | no | Sorts list results by a certain order. By default, results are returned in alphanumerical order based on the resource name. You can also sort results in descending order based on the creation timestamp using `orderBy="creationTimestamp desc"`. This sorts results based on the `creationTimestamp` field in reverse chronological order (newest result first). Use this to sort resources like operations so that the newest operation is returned first. Currently, only sorting by `name` or `creationTimestamp desc` is supported. |
| `pageToken` | query | string | no | Specifies a page token to use. Set `pageToken` to the `nextPageToken` returned by a previous list request to get the next page of results. |

### `compute.globalForwardingRules.delete`

- Versions: v1, preview, beta, alpha
- `DELETE https://compute.googleapis.com/compute/v1/projects/{project}/global/forwardingRules/{forwardingRule}`
- Deletes the specified GlobalForwardingRule resource.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `forwardingRule` | path | string | yes | Name of the ForwardingRule resource to delete. |
| `requestId` | query | string | no | An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `compute.globalForwardingRules.get`

- Versions: v1, preview, beta, alpha
- `GET https://compute.googleapis.com/compute/v1/projects/{project}/global/forwardingRules/{forwardingRule}`
- Returns the specified GlobalForwardingRule resource. Gets a list of available forwarding rules by making a list() request.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`, `https://www.googleapis.com/auth/compute.readonly`
- Request: —; Response: `ForwardingRule`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `forwardingRule` | path | string | yes | Name of the ForwardingRule resource to return. |
| `view` | query | string enum | no | — Values: `BASIC`, `FULL`. |

### `compute.globalForwardingRules.insert`

- Versions: v1, preview, beta, alpha
- `POST https://compute.googleapis.com/compute/v1/projects/{project}/global/forwardingRules`
- Creates a GlobalForwardingRule resource in the specified project using the data included in the request.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`
- Request: `ForwardingRule`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `requestId` | query | string | no | An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `compute.globalForwardingRules.list`

- Versions: v1, preview, beta, alpha
- `GET https://compute.googleapis.com/compute/v1/projects/{project}/global/forwardingRules`
- Retrieves a list of GlobalForwardingRule resources available to the specified project.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`, `https://www.googleapis.com/auth/compute.readonly`
- Request: —; Response: `ForwardingRuleList`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `filter` | query | string | no | A filter expression that filters resources listed in the response. Most Compute resources support two types of filter expressions: expressions that support regular expressions and expressions that follow API improvement proposal AIP-160. These two types of filter expressions cannot be mixed in one request. If you want to use AIP-160, your expression must specify the field name, an operator, and the value that you want to use for filtering. The value must be a string, a number, or a boolean. The operator must be either `=`, `!=`, `>`, `<`, `<=`, `>=` or `:`. For example, if you are filtering Compute Engine instances, you can exclude instances named `example-instance` by specifying `name != example-instance`. The `:*` comparison can be used to test whether a key has been defined. For example, to find all objects with `owner` label use: labels.owner:\* You can also filter nested fields. For example, you could specify `scheduling.automaticRestart = false` to include instances only if they are not scheduled for automatic restarts. You can use filtering on nested fields to filter based onresource labels. To filter on multiple expressions, provide each separate expression within parentheses. For example: (scheduling.automaticRestart = true) (cpuPlatform = "Intel Skylake") By default, each expression is an `AND` expression. However, you can include `AND` and `OR` expressions explicitly. For example: (cpuPlatform = "Intel Skylake") OR (cpuPlatform = "Intel Broadwell") AND (scheduling.automaticRestart = true) If you want to use a regular expression, use the `eq` (equal) or `ne` (not equal) operator against a single un-parenthesized expression with or without quotes or against multiple parenthesized expressions. Examples: `fieldname eq unquoted literal` `fieldname eq 'single quoted literal'` `fieldname eq "double quoted literal"` `(fieldname1 eq literal) (fieldname2 ne "literal")` The literal value is interpreted as a regular expression using GoogleRE2 library syntax. The literal value must match the entire field. For example, to filter for instances that do not end with name "instance", you would use `name ne .*instance`. You cannot combine constraints on multiple fields using regular expressions. |
| `maxResults` | query | integer (uint32) | no | The maximum number of results per page that should be returned. If the number of available results is larger than `maxResults`, Compute Engine returns a `nextPageToken` that can be used to get the next page of results in subsequent list requests. Acceptable values are `0` to `500`, inclusive. (Default: `500`) |
| `orderBy` | query | string | no | Sorts list results by a certain order. By default, results are returned in alphanumerical order based on the resource name. You can also sort results in descending order based on the creation timestamp using `orderBy="creationTimestamp desc"`. This sorts results based on the `creationTimestamp` field in reverse chronological order (newest result first). Use this to sort resources like operations so that the newest operation is returned first. Currently, only sorting by `name` or `creationTimestamp desc` is supported. |
| `pageToken` | query | string | no | Specifies a page token to use. Set `pageToken` to the `nextPageToken` returned by a previous list request to get the next page of results. |

### `compute.globalForwardingRules.patch`

- Versions: v1, preview, beta, alpha
- `PATCH https://compute.googleapis.com/compute/v1/projects/{project}/global/forwardingRules/{forwardingRule}`
- Updates the specified forwarding rule with the data included in the request. This method supportsPATCH semantics and uses theJSON merge patch format and processing rules. Currently, you can only patch the network_tier field.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`
- Request: `ForwardingRule`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `forwardingRule` | path | string | yes | Name of the ForwardingRule resource to patch. |
| `requestId` | query | string | no | An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `compute.globalForwardingRules.setLabels`

- Versions: v1, preview, beta, alpha
- `POST https://compute.googleapis.com/compute/v1/projects/{project}/global/forwardingRules/{resource}/setLabels`
- Sets the labels on the specified resource. To learn more about labels, read the Labeling resources documentation.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`
- Request: `GlobalSetLabelsRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `resource` | path | string | yes | Name or id of the resource for this request. |

### `compute.globalForwardingRules.setTarget`

- Versions: v1, preview, beta, alpha
- `POST https://compute.googleapis.com/compute/v1/projects/{project}/global/forwardingRules/{forwardingRule}/setTarget`
- Changes target URL for the GlobalForwardingRule resource. The new target should be of the same type as the old target.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`
- Request: `TargetReference`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `forwardingRule` | path | string | yes | Name of the ForwardingRule resource in which target is to be set. |
| `requestId` | query | string | no | An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `compute.globalForwardingRules.testIamPermissions`

- Versions: beta, alpha
- `POST https://compute.googleapis.com/compute/beta/projects/{project}/global/forwardingRules/{resource}/testIamPermissions`
- Returns permissions that a caller has on the specified resource.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`, `https://www.googleapis.com/auth/compute.readonly`
- Request: `TestPermissionsRequest`; Response: `TestPermissionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `resource` | path | string | yes | Name or id of the resource for this request. |

### `compute.globalFrontendSettings.get`

- Versions: v1, preview, beta, alpha
- `GET https://compute.googleapis.com/compute/v1/projects/{project}/global/globalFrontendSettings`
- Gets the Global Frontend Billing Bundle Settings for a project.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`, `https://www.googleapis.com/auth/compute.readonly`
- Request: —; Response: `GlobalFrontendSettings`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Required. Project ID for this request. |

### `compute.globalFrontendSettings.patch`

- Versions: v1, preview, beta, alpha
- `PATCH https://compute.googleapis.com/compute/v1/projects/{project}/global/globalFrontendSettings`
- Updates the Global Frontend Billing Bundle Settings for a project.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`
- Request: `GlobalFrontendSettings`; Response: `GlobalFrontendSettingsPatchResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Required. Project ID for this request. |
| `requestId` | query | string | no | An optional request ID to identify requests. |
| `updateMask` | query | string (google-fieldmask) | no | Field mask to support patch. E.g., "type". |

### `compute.globalNetworkEndpointGroups.attachNetworkEndpoints`

- Versions: v1, preview, beta, alpha
- `POST https://compute.googleapis.com/compute/v1/projects/{project}/global/networkEndpointGroups/{networkEndpointGroup}/attachNetworkEndpoints`
- Attach a network endpoint to the specified network endpoint group.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`
- Request: `GlobalNetworkEndpointGroupsAttachEndpointsRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `networkEndpointGroup` | path | string | yes | The name of the network endpoint group where you are attaching network endpoints to. It should comply with RFC1035. |
| `requestId` | query | string | no | An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `compute.globalNetworkEndpointGroups.delete`

- Versions: v1, preview, beta, alpha
- `DELETE https://compute.googleapis.com/compute/v1/projects/{project}/global/networkEndpointGroups/{networkEndpointGroup}`
- Deletes the specified network endpoint group.Note that the NEG cannot be deleted if there are backend services referencing it.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `networkEndpointGroup` | path | string | yes | The name of the network endpoint group to delete. It should comply with RFC1035. |
| `requestId` | query | string | no | An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `compute.globalNetworkEndpointGroups.detachNetworkEndpoints`

- Versions: v1, preview, beta, alpha
- `POST https://compute.googleapis.com/compute/v1/projects/{project}/global/networkEndpointGroups/{networkEndpointGroup}/detachNetworkEndpoints`
- Detach the network endpoint from the specified network endpoint group.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`
- Request: `GlobalNetworkEndpointGroupsDetachEndpointsRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `networkEndpointGroup` | path | string | yes | The name of the network endpoint group where you are removing network endpoints. It should comply with RFC1035. |
| `requestId` | query | string | no | An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `compute.globalNetworkEndpointGroups.get`

- Versions: v1, preview, beta, alpha
- `GET https://compute.googleapis.com/compute/v1/projects/{project}/global/networkEndpointGroups/{networkEndpointGroup}`
- Returns the specified network endpoint group.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`, `https://www.googleapis.com/auth/compute.readonly`
- Request: —; Response: `NetworkEndpointGroup`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `networkEndpointGroup` | path | string | yes | The name of the network endpoint group. It should comply with RFC1035. |

### `compute.globalNetworkEndpointGroups.insert`

- Versions: v1, preview, beta, alpha
- `POST https://compute.googleapis.com/compute/v1/projects/{project}/global/networkEndpointGroups`
- Creates a network endpoint group in the specified project using the parameters that are included in the request. Note: Use the following APIs to manage network endpoint groups: - To manage NEGs with zonal scope (such as zonal NEGs, hybrid connectivity NEGs): zonal API - To manage NEGs with regional scope (such as regional internet NEGs, serverless NEGs, Private Service Connect NEGs): regional API - To manage NEGs with global scope (such as global internet NEGs):global API
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`
- Request: `NetworkEndpointGroup`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `requestId` | query | string | no | An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `compute.globalNetworkEndpointGroups.list`

- Versions: v1, preview, beta, alpha
- `GET https://compute.googleapis.com/compute/v1/projects/{project}/global/networkEndpointGroups`
- Retrieves the list of network endpoint groups that are located in the specified project.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`, `https://www.googleapis.com/auth/compute.readonly`
- Request: —; Response: `NetworkEndpointGroupList`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `filter` | query | string | no | A filter expression that filters resources listed in the response. Most Compute resources support two types of filter expressions: expressions that support regular expressions and expressions that follow API improvement proposal AIP-160. These two types of filter expressions cannot be mixed in one request. If you want to use AIP-160, your expression must specify the field name, an operator, and the value that you want to use for filtering. The value must be a string, a number, or a boolean. The operator must be either `=`, `!=`, `>`, `<`, `<=`, `>=` or `:`. For example, if you are filtering Compute Engine instances, you can exclude instances named `example-instance` by specifying `name != example-instance`. The `:*` comparison can be used to test whether a key has been defined. For example, to find all objects with `owner` label use: labels.owner:\* You can also filter nested fields. For example, you could specify `scheduling.automaticRestart = false` to include instances only if they are not scheduled for automatic restarts. You can use filtering on nested fields to filter based onresource labels. To filter on multiple expressions, provide each separate expression within parentheses. For example: (scheduling.automaticRestart = true) (cpuPlatform = "Intel Skylake") By default, each expression is an `AND` expression. However, you can include `AND` and `OR` expressions explicitly. For example: (cpuPlatform = "Intel Skylake") OR (cpuPlatform = "Intel Broadwell") AND (scheduling.automaticRestart = true) If you want to use a regular expression, use the `eq` (equal) or `ne` (not equal) operator against a single un-parenthesized expression with or without quotes or against multiple parenthesized expressions. Examples: `fieldname eq unquoted literal` `fieldname eq 'single quoted literal'` `fieldname eq "double quoted literal"` `(fieldname1 eq literal) (fieldname2 ne "literal")` The literal value is interpreted as a regular expression using GoogleRE2 library syntax. The literal value must match the entire field. For example, to filter for instances that do not end with name "instance", you would use `name ne .*instance`. You cannot combine constraints on multiple fields using regular expressions. |
| `maxResults` | query | integer (uint32) | no | The maximum number of results per page that should be returned. If the number of available results is larger than `maxResults`, Compute Engine returns a `nextPageToken` that can be used to get the next page of results in subsequent list requests. Acceptable values are `0` to `500`, inclusive. (Default: `500`) |
| `orderBy` | query | string | no | Sorts list results by a certain order. By default, results are returned in alphanumerical order based on the resource name. You can also sort results in descending order based on the creation timestamp using `orderBy="creationTimestamp desc"`. This sorts results based on the `creationTimestamp` field in reverse chronological order (newest result first). Use this to sort resources like operations so that the newest operation is returned first. Currently, only sorting by `name` or `creationTimestamp desc` is supported. |
| `pageToken` | query | string | no | Specifies a page token to use. Set `pageToken` to the `nextPageToken` returned by a previous list request to get the next page of results. |

### `compute.globalNetworkEndpointGroups.listNetworkEndpoints`

- Versions: v1, preview, beta, alpha
- `POST https://compute.googleapis.com/compute/v1/projects/{project}/global/networkEndpointGroups/{networkEndpointGroup}/listNetworkEndpoints`
- Lists the network endpoints in the specified network endpoint group.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`, `https://www.googleapis.com/auth/compute.readonly`
- Request: —; Response: `NetworkEndpointGroupsListNetworkEndpoints`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `networkEndpointGroup` | path | string | yes | The name of the network endpoint group from which you want to generate a list of included network endpoints. It should comply with RFC1035. |
| `filter` | query | string | no | A filter expression that filters resources listed in the response. Most Compute resources support two types of filter expressions: expressions that support regular expressions and expressions that follow API improvement proposal AIP-160. These two types of filter expressions cannot be mixed in one request. If you want to use AIP-160, your expression must specify the field name, an operator, and the value that you want to use for filtering. The value must be a string, a number, or a boolean. The operator must be either `=`, `!=`, `>`, `<`, `<=`, `>=` or `:`. For example, if you are filtering Compute Engine instances, you can exclude instances named `example-instance` by specifying `name != example-instance`. The `:*` comparison can be used to test whether a key has been defined. For example, to find all objects with `owner` label use: labels.owner:\* You can also filter nested fields. For example, you could specify `scheduling.automaticRestart = false` to include instances only if they are not scheduled for automatic restarts. You can use filtering on nested fields to filter based onresource labels. To filter on multiple expressions, provide each separate expression within parentheses. For example: (scheduling.automaticRestart = true) (cpuPlatform = "Intel Skylake") By default, each expression is an `AND` expression. However, you can include `AND` and `OR` expressions explicitly. For example: (cpuPlatform = "Intel Skylake") OR (cpuPlatform = "Intel Broadwell") AND (scheduling.automaticRestart = true) If you want to use a regular expression, use the `eq` (equal) or `ne` (not equal) operator against a single un-parenthesized expression with or without quotes or against multiple parenthesized expressions. Examples: `fieldname eq unquoted literal` `fieldname eq 'single quoted literal'` `fieldname eq "double quoted literal"` `(fieldname1 eq literal) (fieldname2 ne "literal")` The literal value is interpreted as a regular expression using GoogleRE2 library syntax. The literal value must match the entire field. For example, to filter for instances that do not end with name "instance", you would use `name ne .*instance`. You cannot combine constraints on multiple fields using regular expressions. |
| `maxResults` | query | integer (uint32) | no | The maximum number of results per page that should be returned. If the number of available results is larger than `maxResults`, Compute Engine returns a `nextPageToken` that can be used to get the next page of results in subsequent list requests. Acceptable values are `0` to `500`, inclusive. (Default: `500`) |
| `orderBy` | query | string | no | Sorts list results by a certain order. By default, results are returned in alphanumerical order based on the resource name. You can also sort results in descending order based on the creation timestamp using `orderBy="creationTimestamp desc"`. This sorts results based on the `creationTimestamp` field in reverse chronological order (newest result first). Use this to sort resources like operations so that the newest operation is returned first. Currently, only sorting by `name` or `creationTimestamp desc` is supported. |
| `pageToken` | query | string | no | Specifies a page token to use. Set `pageToken` to the `nextPageToken` returned by a previous list request to get the next page of results. |

### `compute.globalOperations.aggregatedList`

- Versions: v1, preview, beta, alpha
- `GET https://compute.googleapis.com/compute/v1/projects/{project}/aggregated/operations`
- Retrieves an aggregated list of all operations. To prevent failure, Google recommends that you set the `returnPartialSuccess` parameter to `true`.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`, `https://www.googleapis.com/auth/compute.readonly`
- Request: —; Response: `OperationAggregatedList`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `filter` | query | string | no | A filter expression that filters resources listed in the response. Most Compute resources support two types of filter expressions: expressions that support regular expressions and expressions that follow API improvement proposal AIP-160. These two types of filter expressions cannot be mixed in one request. If you want to use AIP-160, your expression must specify the field name, an operator, and the value that you want to use for filtering. The value must be a string, a number, or a boolean. The operator must be either `=`, `!=`, `>`, `<`, `<=`, `>=` or `:`. For example, if you are filtering Compute Engine instances, you can exclude instances named `example-instance` by specifying `name != example-instance`. The `:*` comparison can be used to test whether a key has been defined. For example, to find all objects with `owner` label use: labels.owner:\* You can also filter nested fields. For example, you could specify `scheduling.automaticRestart = false` to include instances only if they are not scheduled for automatic restarts. You can use filtering on nested fields to filter based onresource labels. To filter on multiple expressions, provide each separate expression within parentheses. For example: (scheduling.automaticRestart = true) (cpuPlatform = "Intel Skylake") By default, each expression is an `AND` expression. However, you can include `AND` and `OR` expressions explicitly. For example: (cpuPlatform = "Intel Skylake") OR (cpuPlatform = "Intel Broadwell") AND (scheduling.automaticRestart = true) If you want to use a regular expression, use the `eq` (equal) or `ne` (not equal) operator against a single un-parenthesized expression with or without quotes or against multiple parenthesized expressions. Examples: `fieldname eq unquoted literal` `fieldname eq 'single quoted literal'` `fieldname eq "double quoted literal"` `(fieldname1 eq literal) (fieldname2 ne "literal")` The literal value is interpreted as a regular expression using GoogleRE2 library syntax. The literal value must match the entire field. For example, to filter for instances that do not end with name "instance", you would use `name ne .*instance`. You cannot combine constraints on multiple fields using regular expressions. |
| `includeAllScopes` | query | boolean | no | Indicates whether every visible scope for each scope type (zone, region, global) should be included in the response. For new resource types added after this field, the flag has no effect as new resource types will always include every visible scope for each scope type in response. For resource types which predate this field, if this flag is omitted or false, only scopes of the scope types where the resource type is expected to be found will be included. |
| `maxResults` | query | integer (uint32) | no | The maximum number of results per page that should be returned. If the number of available results is larger than `maxResults`, Compute Engine returns a `nextPageToken` that can be used to get the next page of results in subsequent list requests. Acceptable values are `0` to `500`, inclusive. (Default: `500`) |
| `orderBy` | query | string | no | Sorts list results by a certain order. By default, results are returned in alphanumerical order based on the resource name. You can also sort results in descending order based on the creation timestamp using `orderBy="creationTimestamp desc"`. This sorts results based on the `creationTimestamp` field in reverse chronological order (newest result first). Use this to sort resources like operations so that the newest operation is returned first. Currently, only sorting by `name` or `creationTimestamp desc` is supported. |
| `pageToken` | query | string | no | Specifies a page token to use. Set `pageToken` to the `nextPageToken` returned by a previous list request to get the next page of results. |
| `serviceProjectNumber` | query | string (int64) | no | The Shared VPC service project id or service project number for which aggregated list request is invoked for subnetworks list-usable api. |

### `compute.globalOperations.delete`

- Versions: v1, preview, beta, alpha
- `DELETE https://compute.googleapis.com/compute/v1/projects/{project}/global/operations/{operation}`
- Deletes the specified Operations resource.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `operation` | path | string | yes | Name of the Operations resource to delete, or its unique numeric identifier. |

### `compute.globalOperations.get`

- Versions: v1, preview, beta, alpha
- `GET https://compute.googleapis.com/compute/v1/projects/{project}/global/operations/{operation}`
- Retrieves the specified Operations resource.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`, `https://www.googleapis.com/auth/compute.readonly`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `operation` | path | string | yes | Name of the Operations resource to return, or its unique numeric identifier. |

### `compute.globalOperations.list`

- Versions: v1, preview, beta, alpha
- `GET https://compute.googleapis.com/compute/v1/projects/{project}/global/operations`
- Retrieves a list of Operation resources contained within the specified project.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`, `https://www.googleapis.com/auth/compute.readonly`
- Request: —; Response: `OperationList`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `filter` | query | string | no | A filter expression that filters resources listed in the response. Most Compute resources support two types of filter expressions: expressions that support regular expressions and expressions that follow API improvement proposal AIP-160. These two types of filter expressions cannot be mixed in one request. If you want to use AIP-160, your expression must specify the field name, an operator, and the value that you want to use for filtering. The value must be a string, a number, or a boolean. The operator must be either `=`, `!=`, `>`, `<`, `<=`, `>=` or `:`. For example, if you are filtering Compute Engine instances, you can exclude instances named `example-instance` by specifying `name != example-instance`. The `:*` comparison can be used to test whether a key has been defined. For example, to find all objects with `owner` label use: labels.owner:\* You can also filter nested fields. For example, you could specify `scheduling.automaticRestart = false` to include instances only if they are not scheduled for automatic restarts. You can use filtering on nested fields to filter based onresource labels. To filter on multiple expressions, provide each separate expression within parentheses. For example: (scheduling.automaticRestart = true) (cpuPlatform = "Intel Skylake") By default, each expression is an `AND` expression. However, you can include `AND` and `OR` expressions explicitly. For example: (cpuPlatform = "Intel Skylake") OR (cpuPlatform = "Intel Broadwell") AND (scheduling.automaticRestart = true) If you want to use a regular expression, use the `eq` (equal) or `ne` (not equal) operator against a single un-parenthesized expression with or without quotes or against multiple parenthesized expressions. Examples: `fieldname eq unquoted literal` `fieldname eq 'single quoted literal'` `fieldname eq "double quoted literal"` `(fieldname1 eq literal) (fieldname2 ne "literal")` The literal value is interpreted as a regular expression using GoogleRE2 library syntax. The literal value must match the entire field. For example, to filter for instances that do not end with name "instance", you would use `name ne .*instance`. You cannot combine constraints on multiple fields using regular expressions. |
| `maxResults` | query | integer (uint32) | no | The maximum number of results per page that should be returned. If the number of available results is larger than `maxResults`, Compute Engine returns a `nextPageToken` that can be used to get the next page of results in subsequent list requests. Acceptable values are `0` to `500`, inclusive. (Default: `500`) |
| `orderBy` | query | string | no | Sorts list results by a certain order. By default, results are returned in alphanumerical order based on the resource name. You can also sort results in descending order based on the creation timestamp using `orderBy="creationTimestamp desc"`. This sorts results based on the `creationTimestamp` field in reverse chronological order (newest result first). Use this to sort resources like operations so that the newest operation is returned first. Currently, only sorting by `name` or `creationTimestamp desc` is supported. |
| `pageToken` | query | string | no | Specifies a page token to use. Set `pageToken` to the `nextPageToken` returned by a previous list request to get the next page of results. |

### `compute.globalOperations.wait`

- Versions: v1, preview, beta, alpha
- `POST https://compute.googleapis.com/compute/v1/projects/{project}/global/operations/{operation}/wait`
- Waits for the specified Operation resource to return as `DONE` or for the request to approach the 2 minute deadline, and retrieves the specified Operation resource. This method differs from the `GET` method in that it waits for no more than the default deadline (2 minutes) and then returns the current state of the operation, which might be `DONE` or still in progress. This method is called on a best-effort basis. Specifically: - In uncommon cases, when the server is overloaded, the request might return before the default deadline is reached, or might return after zero seconds. - If the default deadline is reached, there is no guarantee that the operation is actually done when the method returns. Be prepared to retry if the operation is not `DONE`.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`, `https://www.googleapis.com/auth/compute.readonly`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `operation` | path | string | yes | Name of the Operations resource to return, or its unique numeric identifier. |

### `compute.globalOrganizationOperations.delete`

- Versions: v1, preview, beta, alpha
- `DELETE https://compute.googleapis.com/compute/v1/locations/global/operations/{operation}`
- Deletes the specified Operations resource.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `operation` | path | string | yes | Name of the Operations resource to delete, or its unique numeric identifier. |
| `parentId` | query | string | no | Parent ID for this request. |

### `compute.globalOrganizationOperations.get`

- Versions: v1, preview, beta, alpha
- `GET https://compute.googleapis.com/compute/v1/locations/global/operations/{operation}`
- Retrieves the specified Operations resource. Gets a list of operations by making a `list()` request.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`, `https://www.googleapis.com/auth/compute.readonly`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `operation` | path | string | yes | Name of the Operations resource to return. Parent is derived from this field. |
| `parentId` | query | string | no | Parent ID for this request. Not used. Parent is derived from resource_id. |

### Example request skeleton

Generated from the Discovery entry of `compute.externalVpnGateways.get` (not in the official docs); replace the `{...}` path variables (URL-encode query values):

```bash
curl -X GET \
  -H "Authorization: Bearer $(gcloud auth print-access-token)" \
  "https://compute.googleapis.com/compute/v1/projects/{project}/global/externalVpnGateways/{externalVpnGateway}"
```

## Notes

- Generated from the Discovery document(s) v1, preview, beta, alpha of `compute` (retrieved 2026-11-14). Resources on this page: disks, externalVpnGateways, firewallPolicies, firewalls, folderGlobalVmExtensionPolicies, folderRolloutPlans, folderRollouts, folderZoneVmExtensionPolicies, forwardingRules, futureReservations, globalAddresses, globalFolderOperations, globalForwardingRules, globalFrontendSettings, globalNetworkEndpointGroups, globalOperations, globalOrganizationOperations.
- The Required column is `yes` for path variables and required parameters, and `conditional` when the description says "Required if ..." (mutually exclusive alternatives), when a `parent.child` parameter is required only inside an optional parent message or one branch of a oneof. Path variables are `yes` unless a note below names an alternative route without them.
- Message schemas (the request and response types named above) are listed under `references/rest-schemas/compute/`; they are the `schemas` section of the Discovery documents in Source.
- Source: https://compute.googleapis.com/$discovery/rest?version=v1, https://compute.googleapis.com/$discovery/rest?version=preview, https://compute.googleapis.com/$discovery/rest?version=beta, https://compute.googleapis.com/$discovery/rest?version=alpha (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
