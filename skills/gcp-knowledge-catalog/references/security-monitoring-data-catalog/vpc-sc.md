---
source: https://docs.cloud.google.com/knowledge-catalog/docs/vpc-sc
---

# VPC Service Controls for Knowledge Catalog

Use VPC Service Controls service perimeters to protect Knowledge Catalog (formerly Dataplex Universal Catalog) resources and mitigate data exfiltration. Restrict the Dataplex API in the perimeter so its methods can't be used to exfiltrate data.

## Signature / Usage

### Add the Dataplex API to the perimeter

```bash
gcloud access-context-manager perimeters update PERIMETER_ID \
--policy=POLICY_ID \
--add-restricted-services=dataplex.googleapis.com
```

### Include resources from other projects in search results

When you search from `project B` inside a perimeter, results include only resources of the project under which the search runs. To include BigQuery resources of `project A` in the same perimeter, configure an egress rule for the Knowledge Catalog caller project.

Adapted (not in the official docs): re-indented so `identityType` sits under `egressFrom` and `methodSelectors` sits under the operation, as the VPC Service Controls egress policy format requires; the source's indentation does not parse as that structure. `projects/projectA` in the source is written `projects/PROJECT_A_NUMBER`, because `resources` take project numbers.

```yaml
egressPolicies:
- egressFrom:
    identityType: ANY_USER_ACCOUNT
  egressTo:
    operations:
    - serviceName: bigquery.googleapis.com
      methodSelectors:
      -   method: '*'
    resources:
    -   projects/PROJECT_A_NUMBER
```

## Options / Props

### Supported features inside a perimeter

| Feature | Notes |
|---|---|
| Lakes | Create and manage within the perimeter |
| Assets | Manage within the perimeter |
| Metadata resources in Catalog | Manage within the perimeter |
| Metadata export | Export to Dataproc Metastore requires additional VPC Service Controls configuration |
| Data insights | Data profiling, data quality and metadata insights scans |
| Data lineage | Use the restricted Virtual IP (VIP) |
| Knowledge Catalog search | `SearchEntries` API; results include only resources within the same perimeter |
| Data products | Communication between the data product, its data assets (such as BigQuery tables) and users stays within authorized perimeters |

### Setup steps

| # | Step |
|---|---|
| 1 | Configure the VPC network (restrict Private Google Access for the perimeter) |
| 2 | Create a service perimeter |
| 3 | Add projects to the perimeter |
| 4 | Add the Dataplex API to the service perimeter |
| 5 | Optional: create an access level |

### Command arguments

| Name | Description |
|---|---|
| `PERIMETER_ID` | ID of the perimeter or its fully qualified identifier |
| `POLICY_ID` | ID of the access policy |

## Notes

- Adapted from the official docs: the egress example lists `projects/projectA`; `EgressTo.resources` entries are `projects/{project_number}` (gcp-security `rest-schemas/accesscontextmanager/accesscontextmanager.md`), so a project number placeholder is used.
- Resources created before the perimeter is set up don't have perimeter protection.
- A perimeter prevents access to data and services outside it: data profiling and data quality scans can't read BigQuery tables or Cloud Storage files outside the perimeter, and the destination BigQuery table for exported scan results must be in a project protected by the perimeter.
- Access levels apply only to requests coming from outside the perimeter; they can't let protected resources reach data or services outside it.
- The egress example allows any user account in `project B` to make BigQuery API calls against `project A` (method `'*'`); Knowledge Catalog calls the BigQuery API to locate assets in `project A`.
- The source also shows Console steps. VPC Service Controls itself is in `gcp-security`; the BigQuery tables are in `gcp-bigquery`.
- Source: https://docs.cloud.google.com/knowledge-catalog/docs/vpc-sc (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)
- Adapted from the official docs: the source egress example indents `identityType: ANY_USER_ACCOUNT` by four spaces under `-   egressFrom:` and `methodSelectors:` by six spaces under `-   serviceName: bigquery.googleapis.com`.

## Related

- [cmek.md](./cmek.md)
- [audit-logging.md](./audit-logging.md)
- [metadata-change-feeds-overview.md](./metadata-change-feeds-overview.md)
