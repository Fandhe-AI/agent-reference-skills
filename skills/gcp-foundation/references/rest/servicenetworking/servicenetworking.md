---
source: https://servicenetworking.googleapis.com/$discovery/rest?version=v1
---

# Service Networking API REST API (servicenetworking)

## Signature / Usage

Base URL: `https://servicenetworking.googleapis.com`. Methods are listed by `id`; the `Versions` line shows which API versions define the method (preferred: v1).

### `servicenetworking.operations.cancel`

- Versions: v1
- `POST https://servicenetworking.googleapis.com/v1/{+name}:cancel`
- Starts asynchronous cancellation on a long-running operation. The server makes a best effort to cancel the operation, but success is not guaranteed. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`. Clients can use Operations.GetOperation or other methods to check whether the cancellation succeeded or whether the operation completed despite cancellation. On successful cancellation, the operation is not deleted; instead, it becomes an operation with an Operation.error value with a google.rpc.Status.code of `1`, corresponding to `Code.CANCELLED`.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/service.management`
- Request: `CancelOperationRequest`; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation resource to be cancelled. |

### `servicenetworking.operations.delete`

- Versions: v1
- `DELETE https://servicenetworking.googleapis.com/v1/{+name}`
- Deletes a long-running operation. This method indicates that the client is no longer interested in the operation result. It does not cancel the operation. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/service.management`
- Request: —; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation resource to be deleted. |

### `servicenetworking.operations.get`

- Versions: v1, v1beta
- `GET https://servicenetworking.googleapis.com/v1/{+name}`
- Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/service.management`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation resource. |

### `servicenetworking.operations.list`

- Versions: v1
- `GET https://servicenetworking.googleapis.com/v1/{+name}`
- Lists operations that match the specified filter in the request. If the server doesn't support this method, it returns `UNIMPLEMENTED`.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/service.management`
- Request: —; Response: `ListOperationsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation's parent resource. |
| `filter` | query | string | no | The standard list filter. |
| `pageSize` | query | integer (int32) | no | The standard list page size. |
| `pageToken` | query | string | no | The standard list page token. |
| `returnPartialSuccess` | query | boolean | no | When set to `true`, operations that are reachable are returned as normal, and those that are unreachable are returned in the ListOperationsResponse.unreachable field. This can only be `true` when reading across collections. For example, when `parent` is set to `"projects/example/locations/-"`. This field is not supported by default and will result in an `UNIMPLEMENTED` error if set unless explicitly documented otherwise in service or product specific documentation. |

### `servicenetworking.services.addSubnetwork`

- Versions: v1, v1beta
- `POST https://servicenetworking.googleapis.com/v1/{+parent}:addSubnetwork`
- For service producers, provisions a new subnet in a peered service's shared VPC network in the requested region and with the requested size that's expressed as a CIDR range (number of leading bits of ipV4 network mask). The method checks against the assigned allocated ranges to find a non-conflicting IP address range. The method will reuse a subnet if subsequent calls contain the same subnet name, region, and prefix length. This method will make producer's tenant project to be a shared VPC service project as needed.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/service.management`
- Request: `AddSubnetworkRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. A tenant project in the service producer organization, in the following format: services/{service}/{collection-id}/{resource-id}. {collection-id} is the cloud resource collection type that represents the tenant project. Only `projects` are supported. {resource-id} is the tenant project numeric id, such as `123456`. {service} the name of the peering service, such as `service-peering.example.com`. This service must already be enabled in the service consumer's project. |

### `servicenetworking.services.connections.create`

- Versions: v1, v1beta
- `POST https://servicenetworking.googleapis.com/v1/{+parent}/connections`
- Creates a private connection that establishes a VPC Network Peering connection to a VPC network in the service producer's organization. The administrator of the service consumer's VPC network invokes this method. The administrator must assign one or more allocated IP ranges for provisioning subnetworks in the service producer's VPC network. This connection is used for all supported services in the service producer's organization, so it only needs to be invoked once.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/service.management`
- Request: `Connection`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The service that is managing peering connectivity for a service producer's organization. For Google services that support this functionality, this value is `services/servicenetworking.googleapis.com`. |

### `servicenetworking.services.connections.deleteConnection`

- Versions: v1
- `POST https://servicenetworking.googleapis.com/v1/{+name}`
- Deletes a private service access connection.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/service.management`
- Request: `DeleteConnectionRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The private service connection that connects to a service producer organization. The name includes both the private service name and the VPC network peering name in the format of `services/{peering_service_name}/connections/{vpc_peering_name}`. For Google services that support this functionality, this is `services/servicenetworking.googleapis.com/connections/servicenetworking-googleapis-com`. |

### `servicenetworking.services.connections.list`

- Versions: v1, v1beta
- `GET https://servicenetworking.googleapis.com/v1/{+parent}/connections`
- List the private connections that are configured in a service consumer's VPC network.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/service.management`
- Request: —; Response: `ListConnectionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The service that is managing peering connectivity for a service producer's organization. For Google services that support this functionality, this value is `services/servicenetworking.googleapis.com`. If you specify `services/-` as the parameter value, all configured peering services are listed. |
| `network` | query | string | yes | Required. The name of service consumer's VPC network that's connected with service producer network through a private connection. The network name must be in the following format: `projects/{project}/global/networks/{network}`. {project} is a project number, such as in `12345` that includes the VPC service consumer's VPC network. {network} is the name of the service consumer's VPC network. |

### `servicenetworking.services.connections.patch`

- Versions: v1
- `PATCH https://servicenetworking.googleapis.com/v1/{+name}`
- Updates the allocated ranges that are assigned to a connection.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/service.management`
- Request: `Connection`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The private service connection that connects to a service producer organization. The name includes both the private service name and the VPC network peering name in the format of `services/{peering_service_name}/connections/{vpc_peering_name}`. For Google services that support this functionality, this is `services/servicenetworking.googleapis.com/connections/servicenetworking-googleapis-com`. |
| `force` | query | boolean | no | If a previously defined allocated range is removed, force flag must be set to true. |
| `updateMask` | query | string (google-fieldmask) | no | The update mask. If this is omitted, it defaults to "\*". You can only update the listed peering ranges. |

### `servicenetworking.services.disableVpcServiceControls`

- Versions: v1
- `PATCH https://servicenetworking.googleapis.com/v1/{+parent}:disableVpcServiceControls`
- Disables VPC service controls for a connection.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/service.management`
- Request: `DisableVpcServiceControlsRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The service that is managing peering connectivity for a service producer's organization. For Google services that support this functionality, this value is `services/servicenetworking.googleapis.com`. |

### `servicenetworking.services.dnsRecordSets.add`

- Versions: v1
- `POST https://servicenetworking.googleapis.com/v1/{+parent}/dnsRecordSets:add`
- Service producers can use this method to add DNS record sets to private DNS zones in the shared producer host project.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/service.management`
- Request: `AddDnsRecordSetRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The service that is managing peering connectivity for a service producer's organization. For Google services that support this functionality, this value is `services/servicenetworking.googleapis.com`. |

### `servicenetworking.services.dnsRecordSets.get`

- Versions: v1
- `GET https://servicenetworking.googleapis.com/v1/{+parent}/dnsRecordSets:get`
- Producers can use this method to retrieve information about the DNS record set added to the private zone inside the shared tenant host project associated with a consumer network.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/service.management`
- Request: —; Response: `DnsRecordSet`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. Parent resource identifying the connection which owns this collection of DNS zones in the format services/{service}. |
| `consumerNetwork` | query | string | yes | Required. The consumer network containing the record set. Must be in the form of projects/{project}/global/networks/{network} |
| `domain` | query | string | yes | Required. The domain name of the zone containing the recordset. |
| `type` | query | string | yes | Required. RecordSet Type eg. type='A'. See the list of Supported DNS Types (https://cloud.google.com/dns/records/json-record). |
| `zone` | query | string | yes | Required. The name of the zone containing the record set. |

### `servicenetworking.services.dnsRecordSets.list`

- Versions: v1
- `GET https://servicenetworking.googleapis.com/v1/{+parent}/dnsRecordSets:list`
- Producers can use this method to retrieve a list of available DNS RecordSets available inside the private zone on the tenant host project accessible from their network.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/service.management`
- Request: —; Response: `ListDnsRecordSetsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The service that is managing peering connectivity for a service producer's organization. For Google services that support this functionality, this value is `services/servicenetworking.googleapis.com`. |
| `consumerNetwork` | query | string | yes | Required. The network that the consumer is using to connect with services. Must be in the form of projects/{project}/global/networks/{network} {project} is the project number, as in '12345' {network} is the network name. |
| `zone` | query | string | yes | Required. The name of the private DNS zone in the shared producer host project from which the record set will be removed. |

### `servicenetworking.services.dnsRecordSets.remove`

- Versions: v1
- `POST https://servicenetworking.googleapis.com/v1/{+parent}/dnsRecordSets:remove`
- Service producers can use this method to remove DNS record sets from private DNS zones in the shared producer host project.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/service.management`
- Request: `RemoveDnsRecordSetRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The service that is managing peering connectivity for a service producer's organization. For Google services that support this functionality, this value is `services/servicenetworking.googleapis.com`. |

### `servicenetworking.services.dnsRecordSets.update`

- Versions: v1
- `POST https://servicenetworking.googleapis.com/v1/{+parent}/dnsRecordSets:update`
- Service producers can use this method to update DNS record sets from private DNS zones in the shared producer host project.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/service.management`
- Request: `UpdateDnsRecordSetRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The service that is managing peering connectivity for a service producer's organization. For Google services that support this functionality, this value is `services/servicenetworking.googleapis.com`. |

### `servicenetworking.services.dnsZones.add`

- Versions: v1
- `POST https://servicenetworking.googleapis.com/v1/{+parent}/dnsZones:add`
- Service producers can use this method to add private DNS zones in the shared producer host project and matching peering zones in the consumer project.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/service.management`
- Request: `AddDnsZoneRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The service that is managing peering connectivity for a service producer's organization. For Google services that support this functionality, this value is `services/servicenetworking.googleapis.com`. |

### `servicenetworking.services.dnsZones.remove`

- Versions: v1
- `POST https://servicenetworking.googleapis.com/v1/{+parent}/dnsZones:remove`
- Service producers can use this method to remove private DNS zones in the shared producer host project and matching peering zones in the consumer project.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/service.management`
- Request: `RemoveDnsZoneRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The service that is managing peering connectivity for a service producer's organization. For Google services that support this functionality, this value is `services/servicenetworking.googleapis.com`. |

### `servicenetworking.services.enableVpcServiceControls`

- Versions: v1
- `PATCH https://servicenetworking.googleapis.com/v1/{+parent}:enableVpcServiceControls`
- Enables VPC service controls for a connection.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/service.management`
- Request: `EnableVpcServiceControlsRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The service that is managing peering connectivity for a service producer's organization. For Google services that support this functionality, this value is `services/servicenetworking.googleapis.com`. |

### `servicenetworking.services.projects.global.networks.dnsZones.get`

- Versions: v1
- `GET https://servicenetworking.googleapis.com/v1/{+name}`
- Service producers can use this method to retrieve a DNS zone in the shared producer host project and the matching peering zones in consumer project
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/service.management`
- Request: —; Response: `GetDnsZoneResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The network that the consumer is using to connect with services. Must be in the form of services/{service}/projects/{project}/global/networks/{network}/dnsZones/{zoneName} Where {service} is the peering service that is managing connectivity for the service producer's organization. For Google services that support this {project} is the project number, as in '12345' {network} is the network name. {zoneName} is the DNS zone name |

### `servicenetworking.services.projects.global.networks.dnsZones.list`

- Versions: v1
- `GET https://servicenetworking.googleapis.com/v1/{+parent}/dnsZones:list`
- \* Service producers can use this method to retrieve a list of available DNS zones in the shared producer host project and the matching peering zones in the consumer project. \*
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/service.management`
- Request: —; Response: `ListDnsZonesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. Parent resource identifying the connection which owns this collection of DNS zones in the format services/{service}/projects/{project}/global/networks/{network} Service: The service that is managing connectivity for the service producer's organization. For Google services that support this functionality, this value is `servicenetworking.googleapis.com`. Projects: the consumer project containing the consumer network. Network: The consumer network accessible from the tenant project. |

### `servicenetworking.services.projects.global.networks.get`

- Versions: v1
- `GET https://servicenetworking.googleapis.com/v1/{+name}`
- Service producers use this method to get the configuration of their connection including the import/export of custom routes and subnetwork routes with public IP.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/service.management`
- Request: —; Response: `ConsumerConfig`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the consumer config to retrieve in the format: `services/{service}/projects/{project}/global/networks/{network}`. {service} is the peering service that is managing connectivity for the service producer's organization. For Google services that support this functionality, this value is `servicenetworking.googleapis.com`. {project} is a project number e.g. `12345` that contains the service consumer's VPC network. {network} is the name of the service consumer's VPC network. |
| `includeUsedIpRanges` | query | boolean | no | Optional. When true, include the used IP ranges as part of the GetConsumerConfig output. This includes routes created inside the service networking network, consumer network, peers of the consumer network, and reserved ranges inside the service networking network. By default, this is false |

### `servicenetworking.services.projects.global.networks.getVpcServiceControls`

- Versions: v1
- `GET https://servicenetworking.googleapis.com/v1/{+name}/vpcServiceControls`
- Consumers use this method to find out the state of VPC Service Controls. The controls could be enabled or disabled for a connection.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/service.management`
- Request: —; Response: `VpcServiceControls`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the VPC Service Controls config to retrieve in the format: `services/{service}/projects/{project}/global/networks/{network}`. {service} is the peering service that is managing connectivity for the service producer's organization. For Google services that support this functionality, this value is `servicenetworking.googleapis.com`. {project} is a project number e.g. `12345` that contains the service consumer's VPC network. {network} is the name of the service consumer's VPC network. |

### `servicenetworking.services.projects.global.networks.peeredDnsDomains.create`

- Versions: v1
- `POST https://servicenetworking.googleapis.com/v1/{+parent}/peeredDnsDomains`
- Creates a peered DNS domain which sends requests for records in given namespace originating in the service producer VPC network to the consumer VPC network to be resolved.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/service.management`
- Request: `PeeredDnsDomain`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. Parent resource identifying the connection for which the peered DNS domain will be created in the format: `services/{service}/projects/{project}/global/networks/{network}` {service} is the peering service that is managing connectivity for the service producer's organization. For Google services that support this functionality, this value is `servicenetworking.googleapis.com`. {project} is the number of the project that contains the service consumer's VPC network e.g. `12345`. {network} is the name of the service consumer's VPC network. |

### `servicenetworking.services.projects.global.networks.peeredDnsDomains.delete`

- Versions: v1
- `DELETE https://servicenetworking.googleapis.com/v1/{+name}`
- Deletes a peered DNS domain.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/service.management`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the peered DNS domain to delete in the format: `services/{service}/projects/{project}/global/networks/{network}/peeredDnsDomains/{name}`. {service} is the peering service that is managing connectivity for the service producer's organization. For Google services that support this functionality, this value is `servicenetworking.googleapis.com`. {project} is the number of the project that contains the service consumer's VPC network e.g. `12345`. {network} is the name of the service consumer's VPC network. {name} is the name of the peered DNS domain. |

### `servicenetworking.services.projects.global.networks.peeredDnsDomains.list`

- Versions: v1
- `GET https://servicenetworking.googleapis.com/v1/{+parent}/peeredDnsDomains`
- Lists peered DNS domains for a connection.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/service.management`
- Request: —; Response: `ListPeeredDnsDomainsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. Parent resource identifying the connection which owns this collection of peered DNS domains in the format: `services/{service}/projects/{project}/global/networks/{network}`. {service} is the peering service that is managing connectivity for the service producer's organization. For Google services that support this functionality, this value is `servicenetworking.googleapis.com`. {project} is a project number e.g. `12345` that contains the service consumer's VPC network. {network} is the name of the service consumer's VPC network. |

### `servicenetworking.services.projects.global.networks.updateConsumerConfig`

- Versions: v1
- `PATCH https://servicenetworking.googleapis.com/v1/{+parent}:updateConsumerConfig`
- Service producers use this method to update the configuration of their connection including the import/export of custom routes and subnetwork routes with public IP.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/service.management`
- Request: `UpdateConsumerConfigRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. Parent resource identifying the connection for which the consumer config is being updated in the format: `services/{service}/projects/{project}/global/networks/{network}` {service} is the peering service that is managing connectivity for the service producer's organization. For Google services that support this functionality, this value is `servicenetworking.googleapis.com`. {project} is the number of the project that contains the service consumer's VPC network e.g. `12345`. {network} is the name of the service consumer's VPC network. |

### `servicenetworking.services.roles.add`

- Versions: v1
- `POST https://servicenetworking.googleapis.com/v1/{+parent}/roles:add`
- Service producers can use this method to add roles in the shared VPC host project. Each role is bound to the provided member. Each role must be selected from within an allowlisted set of roles. Each role is applied at only the granularity specified in the allowlist.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/service.management`
- Request: `AddRolesRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. This is in a form services/{service} where {service} is the name of the private access management service. For example 'service-peering.example.com'. |

### `servicenetworking.services.searchRange`

- Versions: v1, v1beta
- `POST https://servicenetworking.googleapis.com/v1/{+parent}:searchRange`
- Service producers can use this method to find a currently unused range within consumer allocated ranges. This returned range is not reserved, and not guaranteed to remain unused. It will validate previously provided allocated ranges, find non-conflicting sub-range of requested size (expressed in number of leading bits of ipv4 network mask, as in CIDR range notation).
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/service.management`
- Request: `SearchRangeRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. This is in a form services/{service}. {service} the name of the private access management service, for example 'service-peering.example.com'. |

### `servicenetworking.services.updateConnections`

- Versions: v1beta
- `PATCH https://servicenetworking.googleapis.com/v1beta/{+name}/connections`
- Updates the allocated ranges that are assigned to a connection. The response from the `get` operation will be of type `Connection` if the operation successfully completes.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/service.management`
- Request: `GoogleCloudServicenetworkingV1betaConnection`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The service producer peering service that is managing peering connectivity for a service producer organization. For Google services that support this functionality, this is `services/servicenetworking.googleapis.com`. |
| `force` | query | boolean | no | If a previously defined allocated range is removed, force flag must be set to true. |
| `updateMask` | query | string (google-fieldmask) | no | The update mask. If this is omitted, it defaults to "\*". You can only update the listed peering ranges. |

### `servicenetworking.services.validate`

- Versions: v1
- `POST https://servicenetworking.googleapis.com/v1/{+parent}:validate`
- Service producers use this method to validate if the consumer provided network, project and requested range are valid. This allows them to use a fail-fast mechanism for consumer requests, and not have to wait for AddSubnetwork operation completion to determine if user request is invalid.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/service.management`
- Request: `ValidateConsumerConfigRequest`; Response: `ValidateConsumerConfigResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. This is in a form services/{service} where {service} is the name of the private access management service. For example 'service-peering.example.com'. |

### Example request skeleton

Generated from the Discovery entry of `servicenetworking.operations.get` (not in the official docs); replace the `{...}` path variables (URL-encode query values):

```bash
curl -X GET \
  -H "Authorization: Bearer $(gcloud auth print-access-token)" \
  "https://servicenetworking.googleapis.com/v1/{+name}"
```

## Notes

- Generated from the Discovery document(s) v1, v1beta of `servicenetworking` (retrieved 2026-11-14). Resources on this page: operations, services.
- The Required column is `yes` for path variables and required parameters, and `conditional` when the description says "Required if ..." (mutually exclusive alternatives), when a `parent.child` parameter is required only inside an optional parent message or one branch of a oneof. Path variables are `yes` unless a note below names an alternative route without them.
- Message schemas (the request and response types named above) are listed under `references/rest-schemas/servicenetworking/`; they are the `schemas` section of the Discovery documents in Source.
- Source: https://servicenetworking.googleapis.com/$discovery/rest?version=v1, https://servicenetworking.googleapis.com/$discovery/rest?version=v1beta (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
