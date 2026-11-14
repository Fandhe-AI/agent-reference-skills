---
source: https://docs.cloud.google.com/iam/docs/conditions-attribute-reference
---

# IAM Conditions Attribute Reference

Supported attributes, operators, and functions for condition expressions (CEL subset).

## Signature / Usage

### Resource attributes

```text
resource.service == "compute.googleapis.com"

resource.type != "compute.googleapis.com/Image"

(resource.type == "compute.googleapis.com/Image" ||
 resource.type == "compute.googleapis.com/Disk")

resource.name != "projects/_/buckets/secret-bucket-123"
resource.name.startsWith("projects/project-123/zones/us-east1-b/instances/prod-")
resource.name.startsWith("projects/_/buckets/my_bucket/objects/test-object-")
resource.name.endsWith(".jpg")
resource.name.extract("projects/{project}/")
```

Scope `resource.name` to the intended types (conditions on a type without a name attribute never grant).

Adapted (not in the official docs): the bucket match is made exact (`==`) and objects are matched by the `/objects/` prefix, so `example-bucket-other` is not matched by a bare `startsWith('.../example-bucket')`.

```text
(resource.type != 'storage.googleapis.com/Bucket' &&
 resource.type != 'storage.googleapis.com/Object') ||
resource.name == 'projects/_/buckets/example-bucket' ||
resource.name.startsWith('projects/_/buckets/example-bucket/objects/')
```

Inherited conditions at organization/folder/project level:

```text
resource.type != 'compute.googleapis.com/Disk' ||
    resource.name.endsWith('devResource')
```

### Resource tags

```text
resource.hasTagKey('123456789012/env')
resource.hasTagKeyId('tagKeys/123456789012')
resource.matchTag('123456789012/env', 'prod')
resource.matchTagId('tagKeys/123456789012', 'tagValues/567890123456')
```

### Principal attributes (Principal Access Boundary bindings)

```text
principal.type == "iam.googleapis.com/ServiceAccount"
principal.type == "iam.googleapis.com/AgentPoolIdentity"
principal.type in ["iam.googleapis.com/WorkspaceIdentity", "iam.googleapis.com/WorkforcePoolIdentity"]

principal.type == 'iam.googleapis.com/WorkspaceIdentity' &&
principal.subject.endsWith('@example.com')
principal.subject.startsWith("resources/aiplatform/")
principal.subject == "example-service-account@example-project.iam.gserviceaccount.com"
```

### Access levels (IAP only)

```text
"accessPolicies/199923665455/accessLevels/CorpNet" in request.auth.access_levels
```

### API attributes

```text
api.getAttribute("iam.googleapis.com/modifiedGrantsByRole", [])

api.getAttribute('iam.googleapis.com/modifiedGrantsByRole', [])
    .hasOnly(['roles/pubsub.editor', 'roles/pubsub.publisher'])
```

### Date/time

```text
date("2023-02-01")
duration("90s")
duration("2592000s")
timestamp("2023-04-12T23:20:50.52Z")
request.time < timestamp("2022-04-12T00:00:00.00Z")
timestamp("2024-04-12T14:30:00.00Z") + duration("1800s")
timestamp("2024-04-12T14:30:00.00Z") - duration("5184000s")

request.time.getDate() > 15
request.time.getDayOfMonth() > 14
request.time.getDayOfWeek("Europe/Berlin") > 0 && request.time.getDayOfWeek("Europe/Berlin") < 6
request.time.getDayOfYear("America/Los_Angeles") >= 0 && request.time.getDayOfYear("America/Los_Angeles") < 5
request.time.getFullYear("America/Los_Angeles") == 2023
request.time.getFullYear() == 2022
request.time.getDayOfWeek("Europe/Berlin") >= 1 &&
request.time.getDayOfWeek("Europe/Berlin") <= 5 &&
request.time.getHours("Europe/Berlin") >= 9 &&
request.time.getHours("Europe/Berlin") <= 17
request.time.getHours("Europe/Berlin") >= 9 && request.time.getMinutes("Europe/Berlin") >= 30
request.time.getMonth("America/Los_Angeles") == 3
```

### Destination IP/port (IAP TCP forwarding)

```text
destination.ip == "10.0.0.1"
destination.ip != "10.0.0.1"
destination.port == 21
destination.port < 3001
```

### Forwarding rules

```text
!compute.isForwardingRuleCreationOperation() || (
  compute.isForwardingRuleCreationOperation() &&
  compute.matchLoadBalancingSchemes([
    'INTERNAL', 'INTERNAL_MANAGED', 'INTERNAL_SELF_MANAGED'
  ])
)
```

### URL path and host (IAP, Cloud Run)

Adapted (not in the official docs): `endsWith("example.com")` changed to `endsWith(".example.com")` so it does not also match unrelated domains such as `attackerexample.com`; it also excludes the bare `example.com` host (add `request.host == "example.com"` if needed).

```text
request.path == "/admin"
request.path.startsWith("/admin")
request.path.endsWith("/payroll.js")
request.host == "hr.example.com"
request.host.endsWith(".example.com")
```

### extract()

```text
resource.name.extract("projects/{project}/")
```

Examples against `projects/_/buckets/acme-orders-aaa/objects/data_lake/orders/order_date=2019-11-03/aef87g87ae0876`:

| Extraction template | Output |
|---|---|
| `/order_date={date}/` | `2019-11-03` |
| `buckets/{name}/` | `acme-orders-aaa` |
| `/orders/{empty}order_date` | Empty `string` |
| `{start}/objects/data_lake` | `projects/_/buckets/acme-orders-aaa` |
| `orders/{end}` | `order_date=2019-11-03/aef87g87ae0876` |
| `{all}` | the entire resource name |
| `/orders/{none}/order_date=` | Empty `string` |
| `/orders/order_date=2019-11-03/{id}/data_lake` | Empty `string` |

## Options / Props

### Attributes

| Attribute | Type | Operators / functions | Usable in |
|-----------|------|----------------------|-----------|
| `resource.service` | string | `==`, `!=` (exact only) | Allow role bindings |
| `resource.type` | string | `==`, `!=` (exact only) | Allow role bindings |
| `resource.name` | string | `startsWith()`, `endsWith()`, `extract()`, `==`, `!=`; no wildcards; relative resource name without leading `/` | Allow role bindings |
| tag functions | bool | `hasTagKey`, `hasTagKeyId`, `matchTag`, `matchTagId` | Allow role bindings and deny rules |
| `principal.type` | string | `==`, `!=`, `in`; values `iam.googleapis.com/WorkspaceIdentity`, `WorkforcePoolIdentity`, `WorkloadPoolIdentity`, `ServiceAccount`, `AgentPoolIdentity` | Principal Access Boundary bindings |
| `principal.subject` | string | `==`, `!=`, `in`, `startsWith()`, `endsWith()` | Principal Access Boundary bindings |
| `request.auth.access_levels` | list of string | `in` | Allow bindings (IAP) |
| `api.getAttribute(name, default)` | V\<T\> | `hasOnly(list)` | Allow bindings |
| `request.time` | Timestamp | comparisons, `+`/`-` Duration, `getDate/getDayOfMonth/getDayOfWeek/getDayOfYear/getFullYear/getHours/getMilliseconds/getMinutes/getMonth/getSeconds([timeZone])` | Allow bindings, all services |
| `destination.ip` | string | `==`, `!=` | Allow bindings (IAP tunnel) |
| `destination.port` | int | `==`, `!=`, `<`, `<=`, `>`, `>=` | Allow bindings (IAP tunnel) |
| `compute.isForwardingRuleCreationOperation()`, `compute.matchLoadBalancingSchemes(list)` | bool | | Allow bindings (Load Balancing, Cloud VPN, Compute protocol forwarding, Cloud Service Mesh) |
| `request.path` | string | `==`, `startsWith()`, `endsWith()` | Allow bindings (IAP, Cloud Run) |
| `request.host` | string | `==`, `endsWith()` | Allow bindings (IAP, Cloud Run) |

### API attributes

| Attribute | Type | Description |
|-----------|------|-------------|
| `storage.googleapis.com/objectListPrefix` | string | `prefix` parameter of an object list request. Supported only in Credential Access Boundaries. |
| `iam.googleapis.com/modifiedGrantsByRole` | list\<string\> | Role names modified by a set-allow-policy request. Accepted on projects, folders, organizations. Default must be `[]`. |
| `mcp.googleapis.com/tool.name` | string | Name of the MCP tool being accessed. |
| `mcp.googleapis.com/tool.isReadOnly` | boolean | Whether the MCP tool is read-only. |
| `aiplatform.googleapis.com/memoryScope` | map\<string, string\> | `scope` field of a Memory Bank Memory (Vertex AI Agent Engine). |
| `aiplatform.googleapis.com/sessionUserId` | string | `user_id` of a Session (Vertex AI Agent Engine). |

## Notes

- Corrected from the official docs: the host example `request.host.endsWith("example.com")` also matches unrelated domains (for example `attackerexample.com`); it is shown as `.example.com`.
- Use exact equality or inequality for `resource.service` and `resource.type`; prefix/suffix checks can give unexpected results.
- When using `resource.name`, restrict it with `resource.type`, not `resource.service`, so new resource types added later do not change the condition scope.
- A part of a condition using an attribute a resource does not provide never grants access (for example `resource.name` on IAM resources).
- Certain areas of the Google Cloud console do not recognize tag-based conditions in role bindings and may wrongly block actions; use gcloud instead.
- `principal.subject` evaluates against a principal's primary email only, not aliases. Pair with `principal.type` since identifiers are not unique across types. `startsWith()` / `endsWith()` match all principals with that prefix/suffix (e.g. `security-admin` also matches `security-admin-fake@example.com`).
- Access levels: case-sensitive full name `accessPolicies/POLICY_NUMBER/accessLevels/ACCESS_LEVEL`. A binding that uses them must grant a role containing only `iap.tunnelInstances.accessViaIAP` and `iap.webServiceVersions.accessViaIAP` (for example `roles/iap.tunnelResourceAccessor`, `roles/iap.httpsResourceAccessor`).
- Cloud Storage API attributes in conditional role bindings make Cloud Storage methods fail and slow permission checks; use them only in Credential Access Boundaries.
- If a service does not recognize `modifiedGrantsByRole`, you cannot limit an IAM admin's role granting for it; the request fails (BigQuery datasets are an exception: limited admins can still grant roles there).
- An invalid `timestamp()` argument means the condition never allows access. Avoid `==`/`!=` on timestamps (millisecond precision). All timestamps are UTC; pass a tz name or offset (e.g. `Europe/Berlin`, `+01:00`) to functions for other zones. `getDate` is one-based; `getDayOfMonth`, `getDayOfWeek` (Sunday = 0), `getDayOfYear`, `getMonth` (0-11) are zero-based.
- Do not use `startsWith()` / `endsWith()` on `destination.ip` (not for CIDR checks) or `startsWith()` / `==` on `request.host`. For `request.path`, prefer `!request.path.startsWith("/admin")` over `!=`.
- In the Google Cloud console, forwarding rule attributes require the Condition editor, not the builder.
- `extract()` returns an empty string if the prefix or suffix is missing, or the suffix appears only before the prefix.
- Source: https://docs.cloud.google.com/iam/docs/conditions-attribute-reference (retrieved 2026-11-14; CC BY 4.0, code samples Apache 2.0)

## Related

- [conditions-overview.md](./conditions-overview.md)
- [conditions-resource-attributes.md](./conditions-resource-attributes.md)
- [temporary-and-resource-based-access.md](./temporary-and-resource-based-access.md)
