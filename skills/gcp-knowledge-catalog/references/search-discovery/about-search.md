---
source: https://docs.cloud.google.com/knowledge-catalog/docs/about-search
---

# About Knowledge Catalog Search

Search in Knowledge Catalog (formerly Dataplex Universal Catalog) discovers resources across an organization with natural language queries (semantic matching), keywords and structured predicates. It indexes metadata from Google Cloud sources such as BigQuery and Cloud SQL, ingested connector context, and context you add (aspects, linked business terms). Results respect your permissions on the source systems and are optimized for discovery, not exhaustive retrieval.

## Signature / Usage

### Widen the search scope across a VPC Service Controls perimeter

Adapted (not in the official docs): the resources are `projects/SEARCH_PROJECT_NUMBER` and `projects/INGRESS_PROJECT_NUMBER` (the official example uses project IDs), because perimeter `resources` take project numbers.

```yaml
egressPolicies:
  - egressFrom:
      identityType: ANY_USER_ACCOUNT
    egressTo:
      # Specify which resources should be present in the search results. In this example,
      # BigQuery.
      operations:
      - methodSelectors:
        - method: '*'
        serviceName: bigquery.googleapis.com
      # Specify project numbers under which the search is performed.
      resources:
      - projects/SEARCH_PROJECT_NUMBER
ingressPolicies:
  - ingressFrom:
      identityType: ANY_USER_ACCOUNT
      sources:
      - accessLevel: '*'
    ingressTo:
      # Specify which resources should be present in the search results. In this example,
      # BigQuery.
      operations:
      - methodSelectors:
        - method: '*'
        serviceName: bigquery.googleapis.com
      # Specify project numbers to expose in search results.
      resources:
      - projects/INGRESS_PROJECT_NUMBER
```

## Options / Props

### Use cases

| Use case | Description | Example queries |
|---|---|---|
| Targeted asset lookup | Find a specific asset by keywords related to asset name, columns or description | `retail_transactions_2026`, `customer_id`, `column:customer_id` |
| Broad data discovery | Open-ended natural language or keyword queries | `quarterly financial reports`, `ad campaign click through rates tables`, `server health metrics`, `audit logs system=bigquery` |
| Scoped asset retrieval for workflows | Enumerate assets in a container (such as a project) or with properties (type, system); common in programmatic and agentic workflows | `type=table projectid:banking-prod PROJECT_ID.classification.tier=PII` |

### Query types

| Query type | Usage | Examples |
|---|---|---|
| Single keyword | Exact and substring matching across metadata elements such as asset name, description and schema | `prd_fin_invoices_fct_v02` |
| Partial keywords and tokenized fragments | Substring matches across metadata, including abbreviated terms, separated words or naming variations | `fin transactions 2026` (matches `prd_fin_transactions_fy2026_raw`) |
| Natural language queries | Semantic matching without exact name or column matches | `customer churn prediction features` |
| Structured predicates | Free text combined with explicit predicate filters | `audit logs system=bigquery` |
| Extended syntax | Precise, scoped search; most used in agentic and programmatic cases | `(system=bigquery OR system=spanner) AND column:credit_card_number PROJECT_ID.classification.tier=PII -projectid:sandbox-project` |

### Ways to access search

| Access path | Reference |
|---|---|
| Google Cloud console **Search** page | https://docs.cloud.google.com/knowledge-catalog/docs/search-assets |
| gcloud CLI | `gcloud dataplex entries search` (https://docs.cloud.google.com/sdk/gcloud/reference/dataplex/entries/search) |
| `searchEntries` API and Cloud Client Libraries | https://docs.cloud.google.com/knowledge-catalog/docs/reference/rest/v1/projects.locations/searchEntries |
| Remote MCP server and MCP Toolbox for Databases | https://docs.cloud.google.com/knowledge-catalog/docs/reference/mcp/tools_list/search_entries |

### Recall limit

| Item | Value |
|---|---|
| Access control limit | 600 restricts (permission evaluation rules); beyond it the access check stops early and matching assets may be left out |
| Likely causes | IAM roles assigned directly on hundreds of individual resources; membership in many Google Groups that each grant access to individual resources; membership in Google Groups with access granted directly across hundreds of resources |

## Notes

- Default scope is your organization; results include only resources from the same organization as the project you search in, and only resources in the same VPC Service Controls perimeter as the search project (in the console, the selected project).
- If you can read BigQuery metadata for an object it appears in search; a table still appears when you have access to the table but not to its dataset.
- Permission changes may propagate to search with a delay when many resources or principals are affected.
- To isolate dev / test / production results, create a separate VPC Service Controls perimeter per environment and put both the data projects and the search projects of that environment in it.
- Fix missing or inconsistent results by reducing access checks below the 600-restrict limit (grant only needed access, remove access on resources or groups you do not need, grant roles at project or folder level). For a complete guaranteed metadata inventory do not use search; export metadata to Cloud Storage and query it with BigQuery.
- The YAML example above opens `ANY_USER_ACCOUNT` ingress and egress with `method: '*'` on `bigquery.googleapis.com` and `accessLevel: '*'`; tailor it to your own perimeter and projects as the source says.
- Keyword-only search mode is retained for backward compatibility (https://docs.cloud.google.com/knowledge-catalog/docs/keyword-search).
- The tables searched are in `gcp-bigquery`; Knowledge Catalog catalogs them. VPC Service Controls itself is in `gcp-security`.
- The scoped asset retrieval example queries are `type=table projectid:banking-prod PROJECT_ID.classification.tier=PII` and `system=spanner projectid:inventory-service (parent=marketing_analytics OR parent=finance_analytics)`.
- Corrected from the official docs: the page's Extended syntax example is `(system:bigquery OR system:spanner) AND column:credit_card_number aspect:classification.tier=PII -projectid:sandbox-project` and its scoped retrieval example is `type=table projectid:banking-prod aspect:classification.tier=PII`. The Search syntax page (search-syntax.md) says `type`, `system` and `location` support only `=` (`system:bigquery` is listed as incorrect) and defines aspect field filters as `ASPECT_TYPE_ID.FIELD_NAME=value` (custom aspect types `PROJECT_ID.ASPECT_TYPE_ID.FIELD_NAME`) without an `aspect:` prefix, so both examples here follow search-syntax.md; `classification` is a custom aspect type in the project `PROJECT_ID`.
- Adapted from the official docs: the VPC Service Controls example writes `projects/SEARCH_PROJECT_ID` and `projects/INGRESS_PROJECT_ID`; perimeter `resources` are `projects/{project_number}` (gcp-security `rest-schemas/accesscontextmanager/accesscontextmanager.md`, EgressTo / IngressTo `resources`), so project numbers are used.
- Source: https://docs.cloud.google.com/knowledge-catalog/docs/about-search (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [search-assets.md](./search-assets.md)
- [search-syntax.md](./search-syntax.md)
- [export-metadata.md](../entries-aspects-metadata-import/export-metadata.md)
