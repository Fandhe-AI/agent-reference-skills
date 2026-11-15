---
source: https://docs.cloud.google.com/resource-manager/docs/organization-policy/defining-locations
---

# Restricting Resource Locations (`gcp.resourceLocations`)

Limit the physical location where new resources of supported services can be created, using the resource locations constraint with value groups.

## Signature / Usage

Legacy managed list constraint. Deny example:

```yaml
name: organizations/ORGANIZATION_ID/policies/gcp.resourceLocations
spec:
  rules:
  - values:
      deniedValues:
      - in:us-east1-locations
      - in:northamerica-northeast1-locations
```

```bash
gcloud org-policies set-policy POLICY_PATH
```

Response:

```yaml
name: organizations/01234567890/policies/gcp.resourceLocations
spec:
  rules:
  - values:
      deniedValues:
      - in:us-east1-locations
      - in:northamerica-northeast1-locations
```

Inheritance:

```yaml
name: organizations/01234567890/policies/gcp.resourceLocations
spec:
  inheritFromParent: true
  rules:
  - values:
      deniedValues:
      - in:us-west1-locations
```

Legacy Resource Manager v1 API call:

Adapted (not in the official docs): the request body is valid JSON (quoted keys, no line-continuation backslashes inside the body), the `in:` value in the inheritance example above is the value group `in:us-west1-locations`, and the token is expanded quoted.

```bash
curl -X POST -H "Content-Type: application/json" \
  -H "Authorization: Bearer ${bearer_token}" \
  -d '{"policy": {"etag": "BwVtXec438Y=", "constraint": "constraints/gcp.resourceLocations", "list_policy": {"denied_values": ["in:europe-locations", "in:southamerica-locations"]}}}' \
  https://cloudresourcemanager.googleapis.com/v1/organizations/123456789:setOrgPolicy
```

### Allow or deny VMs in AI zones (custom constraint)

```yaml
name: organizations/ORGANIZATION_ID/customConstraints/custom.allowOnlyAiZones
resource_types:
- compute.googleapis.com/Instance
method_types:
- CREATE
- UPDATE
actionType: ALLOW
condition: "resource.zone.contains('-ai')"
displayName: allowOnlyAiZones
description: Allow VMs to be created in AI zones only.
```

```yaml
name: organizations/ORGANIZATION_ID/customConstraints/custom.denyAiZones
resource_types:
- compute.googleapis.com/Instance
method_types:
- CREATE
- UPDATE
actionType: DENY
condition: "resource.zone.contains('-ai')"
displayName: denyAiZones
description: Deny VMs from being created in AI zones.
```

```bash
gcloud org-policies set-custom-constraint CONSTRAINT_PATH
```

```yaml
name: projects/PROJECT_ID/policies/CONSTRAINT_NAME
spec:
  rules:
  - enforce: true
```

```bash
gcloud org-policies set-policy POLICY_PATH
```

### Error and audit log

Format: `LOCATION_IN_REQUEST violates constraint constraints/gcp.resourceLocations on the resource RESOURCE_TESTED.`

```text
Location ZONE:us-east1-b violates constraint constraints/gcp.resourceLocations
on the resource
projects/policy-violation-test/zones/us-east1-b/instances/instance-3.
```

Audit log excerpt (abridged by the official page):

```text
{
 insertId: "5u759gdngec"
 logName: "projects/policy-violation-test/logs/cloudaudit.googleapis.com%2Factivity"
 protoPayload: {
  @type: "type.googleapis.com/google.cloud.audit.AuditLog"
  methodName: "beta.compute.instances.insert"
  response: {
   @type: "type.googleapis.com/error"
   error: {
    code: 412
    message: "Location ZONE:us-east1-b violates constraint constraints/gcp.resourceLocations on the resource projects/policy-violation-test/zones/us-east1-b/instances/instance-3."
   }
  }
  serviceName: "compute.googleapis.com"
  status: {
   code: 3
   message: "INVALID_ARGUMENT"
  }
 }
 severity: "ERROR"
}
```

(The official entry also contains `authenticationInfo`, `authorizationInfo`, `request`, `requestMetadata`, `resourceLocation`, `resource`, and timestamps; they are shown as `{...}` placeholders there.)

## Options / Props

Location types: `multi-region` (for example `us`, `asia`, `europe`, `global`; mostly storage), `region` (`us-west1`, `asia-northeast1`, `europe-west1`), `zone` (`us-east1-b`; AI zones such as `us-central1-ai1a` carry `ai` in the name).

Value-group prefix `in:` rules:

| Entered value | Result |
|---------------|--------|
| `in:` value with an invalid group | Policy change fails |
| Region such as `us-east1` | Becomes `in:us-east1-locations` |
| Group such as `us-locations` | Becomes `in:us-locations` |
| Zone (`us-east1-b`) or multi-region (`us`) | Unchanged |

Top-level value groups (each group expands to child region groups, such as `in:us-east1-locations`; multi-region values like `nam10` / `eur3` are members of the geography groups):

| Group | Contains |
|-------|----------|
| `in:asia-locations` | `asia-east2`, `id`, `il`, `in`, `jp`, `kr`, `me-central1`, `sa`, `sg`, `tw` groups; values `asia`, `asia1`, `aws-ap-northeast-2` |
| `in:eu-locations` | `de`, `europe-central2`, `europe-north1`, `europe-north2`, `europe-southwest1`, `europe-west1`, `europe-west4`, `europe-west9`, `it` groups; values `EU`, `eu`, `eur3`, `eur4`, `eur8`, `europe-west` |
| `in:europe-locations` | EU groups plus `ch`, `gb`; values include `eur5`, `eur7`, `europe` |
| `in:us-locations` | `us-central1`, `us-central2`, `us-east1`, `us-east4`, `us-east5`, `us-south1`, `us-west1`, `us-west2`, `us-west3`, `us-west4` groups; values `US`, `us`, `nam3`-`nam15`, `aws-us-east-1`, `azure-eastus2`, `us-central` |
| `in:northamerica-locations` | `canada-locations`, `northamerica-south1-locations`, `us-locations`; value `nam14` |
| `in:canada-locations` | `northamerica-northeast1` (Montreal), `northamerica-northeast2` (Toronto); value `ca` |
| `in:southamerica-locations` | `br-locations` (`southamerica-east1`), `cl-locations` (`southamerica-west1`) |
| `in:australia-locations` | `australia-southeast1` (Sydney), `australia-southeast2` (Melbourne); value `au` |
| `in:africa-south1-locations` | `africa-south1` and zones (Johannesburg) |
| `in:aws-locations` / `in:azure-locations` | Multi-cloud values `aws-*`, `azure-eastus2`, `azure-westus2` |
| `in:low-carbon-locations` | Aggregates `canada`, `eu`, `europe`, `northamerica`, `southamerica`, `us` low-carbon groups (for example `in:us-low-carbon-locations` = `us-central1` + `us-west1`) |
| Country groups | `in:jp-locations`, `in:kr-locations`, `in:in-locations`, `in:sg-locations`, `in:tw-locations`, `in:de-locations`, `in:gb-locations`, `in:ch-locations`, `in:it-locations`, `in:il-locations`, `in:sa-locations`, `in:th-locations`, `in:id-locations`, `in:br-locations`, `in:cl-locations` |
| City / region groups | `in:<region>-locations`, e.g. `in:us-central1-locations` (Iowa), `in:us-west1-locations` (Oregon), `in:asia-northeast1-locations` (Tokyo), `in:europe-west1-locations` (Belgium), `in:europe-west4-locations` (Netherlands), `in:europe-west3-locations` (Frankfurt), `in:europe-west2-locations` (London) |

## Notes

- Applies only to newly created resources; existing resources keep working. Global resources (e.g. Compute Engine global addresses) and resources without selectable locations are not affected. Not enforced on sub-resource creation for services such as Cloud Storage and Dataproc.
- This constraint is not a data residency commitment; some services may store or process data elsewhere. Supported services and their special behavior are in the "Resource Locations Supported Services" page.
- Enforcing it can break services that create resources in disallowed locations: test on non-production projects/folders first, then roll out gradually. Use value groups to avoid breaking as Google adds locations.
- `global` counts as a multi-region; services distinguish "US" vs "us" and "EU" vs "eu".
- Existing violations are not remediated; Security Health Analytics (Security Command Center) can detect location violations.
- Custom-constraint conditions cannot use value groups; the AI-zone constraints apply to VMs only, not to disks. Changes take up to 15 minutes.
- To get an OAuth token for the v1 API, use the OAuth 2.0 Playground with the `https://www.googleapis.com/auth/cloud-platform` scope (or `gcloud auth print-access-token`; prefer the gcloud flow in gcp-cli over pasting tokens into shell history).
- Source: https://docs.cloud.google.com/resource-manager/docs/organization-policy/defining-locations
- Retrieved 2026-11-14. Content is CC BY 4.0; code examples are Apache 2.0. The per-service supported-locations list (`defining-locations-supported-services`) is not reproduced here.

## Related

- [constraints-reference.md](./constraints-reference.md)
- [custom-constraints.md](./custom-constraints.md)
- [resource-service-usage.md](./resource-service-usage.md)
