---
source: https://docs.cloud.google.com/vpc-service-controls/docs/create-service-perimeters
---

# Create a service perimeter

Create a regular VPC Service Controls service perimeter in enforced or dry run mode, add projects or VPC networks, choose restricted services, and optionally attach access levels, VPC accessible services, and ingress / egress policies. Service perimeters cannot contain projects from different organizations.

## Signature / Usage

### Create a perimeter in enforced mode (gcloud)

Adapted (not in the official docs): the three optional `[--...]` template lines are removed because the shell passes the brackets literally and gcloud rejects them; the optional flags are listed under Options / Props.

```bash
gcloud access-context-manager perimeters create NAME \
  --title=TITLE \
  --resources=RESOURCES \
  --restricted-services=RESTRICTED-SERVICES \
  --ingress-policies=INGRESS-FILENAME.yaml \
  --egress-policies=EGRESS-FILENAME.yaml \
  --policy=POLICY_NAME
```

### Create a perimeter in dry run mode (gcloud)

Adapted (not in the official docs): the three optional `[--perimeter-...]` template lines are removed because the shell passes the brackets literally and gcloud rejects them; the optional flags are listed under Options / Props.

```bash
gcloud access-context-manager perimeters dry-run create NAME \
  --perimeter-title=TITLE \
  --perimeter-type=TYPE \
  --perimeter-resources=RESOURCES \
  --perimeter-restricted-services=RESTRICTED-SERVICES \
  --perimeter-ingress-policies=INGRESS-FILENAME.yaml \
  --perimeter-egress-policies=EGRESS-FILENAME.yaml \
  --policy=POLICY_NAME
```

Example: a dry run perimeter named `ProdPerimeter` with two projects that restricts Cloud Storage and BigQuery.

```bash
gcloud access-context-manager perimeters \
  dry-run create ProdPerimeter --perimeter-title="Production Perimeter" \
  --perimeter-type="regular" \
  --perimeter-resources=projects/12345,projects/67890 \
  --perimeter-restricted-services=storage.googleapis.com,bigquery.googleapis.com \
  --perimeter-ingress-policies=ingress.yaml \
  --perimeter-egress-policies=egress.yaml \
  --policy=330193482019
```

### Create a perimeter (API)

```text
POST https://accesscontextmanager.googleapis.com/v1/accessPolicies/POLICY_NAME/servicePerimeters
```

The request body is a `ServicePerimeter` resource with `perimeterType` set to `PERIMETER_TYPE_REGULAR`. For dry run mode, the proposed perimeter goes in `spec` and `useExplicitDryRunSpec` is set to true. The response body is an `Operation` resource.

## Options / Props

### Placeholders

| Name | Description |
|------|-------------|
| `NAME` | Perimeter name. Max 50 characters, starts with a letter, only ASCII letters (a-z, A-Z), digits (0-9) or `_`. Case sensitive and unique within an access policy. |
| `TITLE` | Human-readable title of the perimeter. |
| `TYPE` | Perimeter type, for example "regular" or "bridge". |
| `RESOURCES` | Comma-separated project numbers or VPC networks. Project format `projects/project_number` (project number only, not name or ID); VPC format `//compute.googleapis.com/projects/project-id/global/networks/network_name`. |
| `RESTRICTED-SERVICES` | Comma-separated services, for example `storage.googleapis.com,bigquery.googleapis.com`. |
| `INGRESS-FILENAME` | JSON or YAML file with source, identity, project and service attributes (ingress rules reference). |
| `EGRESS-FILENAME` | JSON or YAML file with identity, project and service attributes (egress rules reference). |
| `POLICY_NAME` | Numeric name of the organization's access policy, for example `330193482019`. Only needed if no default access policy is set. |

### Optional flags

| Flag (enforced / dry run) | Description |
|---|---|
| `--access-levels` / `--perimeter-access-levels` | Comma-separated access levels (`LEVELS`) to apply; only if adding access levels at creation. |
| `--enable-vpc-accessible-services` and `--vpc-allowed-services` / `--perimeter-enable-vpc-accessible-services` and `--perimeter-vpc-allowed-services` | Add VPC accessible services at creation. `ACCESSIBLE-SERVICES` are the services networks inside the perimeter may access; others are blocked. A service can be accessible only if it is also protected by the perimeter. Use `RESTRICTED-SERVICES` in the list to include all protected services, for example `--perimeter-vpc-allowed-services=RESTRICTED-SERVICES`. |

### VPC accessible services options (console)

| Option | Meaning |
|---|---|
| All services | Allows all Google Cloud services. |
| No services | Allows none of the Google Cloud services. |
| All restricted services | Allows only the services protected in this perimeter. |
| Selected services | Allows only the selected services; the "Include all restricted services" toggle adds the protected services. |

## Notes

- Corrected from the official docs: both synopsis blocks also contained the lines `[--access-levels=LEVELS]`, `[--enable-vpc-accessible-services]`, `[--vpc-allowed-services=ACCESSIBLE-SERVICES]` (and the `--perimeter-` equivalents); gcloud 593.0.0 reports them as unrecognized arguments when the brackets are typed. Add the flags without brackets when you need them.
- Create access levels before the perimeter if you want external access configured at creation.
- After you create or update a perimeter, changes can take up to 30 minutes to propagate. In that time the perimeter might block requests with `Error 403: Request is prohibited by organization's policy.` Creating or changing an enforced perimeter can block production traffic: try it on a disposable project first and prefer dry run mode.
- Enforced perimeters actively prevent access to protected services; dry run perimeters log violations as though services were protected but do not block access. The console default is Enforced mode.
- The source recommends restricting all services when you create a perimeter to mitigate the risk of data exfiltration.
- Access levels and ingress rules work together: a request is allowed if it satisfies the conditions of either the access level or the ingress rule. Ingress source types are projects, access levels and VPC networks.
- The source also shows the Console steps (including adding ingress / egress rules in the UI) and links to codelabs; they are omitted here.
- Source: https://docs.cloud.google.com/vpc-service-controls/docs/create-service-perimeters (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [dry-run-mode.md](./dry-run-mode.md)
- [manage-service-perimeters.md](./manage-service-perimeters.md)
- [configuring-ingress-egress-policies.md](./configuring-ingress-egress-policies.md)
- [create-perimeter-bridges.md](./create-perimeter-bridges.md)
