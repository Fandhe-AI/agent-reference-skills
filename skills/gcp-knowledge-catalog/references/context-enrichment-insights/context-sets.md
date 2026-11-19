---
source: https://docs.cloud.google.com/knowledge-catalog/docs/context-sets
---

# Context Sets

Preview. A Knowledge Catalog context set is a specialized entry group (`type="context-set"`) that packages data schemas, semantic definitions, and validated query patterns into a bounded, domain-specific knowledge container used to ground AI agents such as Gemini Enterprise and custom agents. Entries inside it (business concepts, data assets, documents, query templates) are enriched with aspects, and IAM policies apply to the whole container.

## Signature / Usage

### Entry structure of an enriched context set

Entries use the Document system entry type (`projects/dataplex-types/locations/global/entryTypes/document`) or the Query Template system entry type (`projects/dataplex-types/locations/global/entryTypes/query-template`). Enrichment-generated entries use slash-separated entry IDs and the `document.type` field.

```text
EntryGroup: projects/cymbal-style/locations/us-central1/entryGroups/online-apparel-store
(EntryGroup.type = "context-set")
│
├── agents (document.type = "context-set")
│     Root directory index for AI agents consulting the context set
│
├── assets/bigquery/cymbal-style/store/* (document.type = "table-context")
│   ├── assets/bigquery/cymbal-style/store/orders
│   │     Linked using entryLinkTypes/reference -> @bigquery .../tables/orders
│   ├── assets/bigquery/cymbal-style/store/products
│   │     Linked using entryLinkTypes/reference -> @bigquery .../tables/products
│   └── assets/bigquery/cymbal-style/store/returns
│         Linked using entryLinkTypes/reference -> @bigquery .../tables/returns
│
├── documents/concepts/* (document.type = "concept")
│   ├── documents/concepts/net-items-sold
│   │     Formula: SUM(orders.quantity) - SUM(returns.quantity)
│   └── documents/concepts/bestseller
│         Definition: Any clothing item with >= 500 net units sold within a 30-day window
│
├── documents/policies/* (document.type = "knowledge-base")
│   └── documents/policies/return-policy-rules
│         Markdown SOP: Exclude items marked 'FINAL_SALE' or 'DAMAGED_IN_TRANSIT' from standard return rates
│
└── documents/learnings/* (document.type = "learning")
    └── documents/learnings/winter-season-date-filter
          Learned rule: Filter winter season queries using fiscal_season = 'WINTER'
```

### Data asset entry

A data asset entry (`document.type: "table-context"` at `assets/bigquery/PROJECT_ID/DATASET_ID/TABLE_ID`) captures domain instructions, column caveats, join hints and verified SQL for a table without overwriting the table's BigQuery description. It links to the target catalog asset through a directed `reference` entry link (`projects/dataplex-types/locations/global/entryLinkTypes/reference`).

Adapted (not in the official docs): each aspect's fields are nested under `data:` as `Aspect.data` requires.

```yaml
name: projects/cymbal-style/locations/us-central1/entryGroups/online-apparel-store/entries/assets/bigquery/cymbal-style/store/orders
entryType: projects/dataplex-types/locations/global/entryTypes/document
aspects:
  dataplex-types.global.document:
    data:
      type: "table-context"
  dataplex-types.global.overview:
    data:
      content: "## Orders table context\nJoin `store.orders` to `store.returns` on `order_id` when calculating net sales..."
```

### Business concept entry

`document.type: "concept"` at `documents/concepts/CONCEPT_ID` defines business terminology, metrics, acronyms and KPI formulas, and links to relevant tables with `reference` entry links.

Adapted (not in the official docs): each aspect's fields are nested under `data:` as `Aspect.data` requires.

```yaml
name: projects/cymbal-style/locations/us-central1/entryGroups/online-apparel-store/entries/documents/concepts/net-items-sold
entryType: projects/dataplex-types/locations/global/entryTypes/document
aspects:
  dataplex-types.global.document:
    data:
      type: "concept"
  dataplex-types.global.overview:
    data:
      content: "Calculates the absolute number of items sold minus customer returns in a given time period."
```

### Document and self-learning entry

`document.type: "knowledge-base"` or `"learning"` under `documents/*` stores SOPs, compliance policies (for example GDPR or HIPAA handling rules) and tacit rules extracted from downstream agent conversation traces (`documents/learnings/LEARNING_SLUG`).

Adapted (not in the official docs): each aspect's fields are nested under `data:` as `Aspect.data` requires.

```yaml
name: projects/cymbal-style/locations/us-central1/entryGroups/online-apparel-store/entries/documents/policies/return-policy-rules
entryType: projects/dataplex-types/locations/global/entryTypes/document
aspects:
  dataplex-types.global.document:
    data:
      type: "knowledge-base"
  dataplex-types.global.overview:
    data:
      content: "## Return Policy Rules\nItems marked FINAL_SALE or DAMAGED_IN_TRANSIT are excluded from return rates..."
```

### Query template entry

`queries` aspects can be attached to data asset entries, or dedicated Query Template entries can be created programmatically (`dataplex-types.global.query-template` aspect). When an enrichment task runs on a context set containing certified Query Template entries, the agent preserves them without modifying or deleting them.

Adapted (not in the official docs): each aspect's fields are nested under `data:` as `Aspect.data` requires.

```yaml
name: projects/cymbal-style/locations/us-central1/entryGroups/online-apparel-store/entries/queries/top-categories-by-season
entryType: projects/dataplex-types/locations/global/entryTypes/query-template
aspects:
  dataplex-types.global.query-template:
    data:
      intent: "Identify top-performing product categories by revenue for a given season."
      nlQuery: "Which ecommerce product categories performed best in winter?"
      query: "SELECT category, SUM(revenue) FROM store.orders WHERE fiscal_season = @season GROUP BY category ORDER BY 2 DESC LIMIT @limit"
      sourceType: "BIGQUERY"
      sourceDialect: "GOOGLE_SQL"
      parameters:
        - name: "season"
          type: "STRING"
          sampleValues:
            - "WINTER"
        - name: "limit"
          type: "NUMBER"
          sampleValues:
            - "5"
```

## Options / Props

### Entries generated by an enrichment task

| Entry category | Entry ID pattern | `document.type` | Required aspects |
|---|---|---|---|
| Context set root index | `agents` (fixed system ID) | `context-set` | `document`, `overview` |
| Directory index | `assets`, `assets/bigquery/PROJECT_ID/DATASET_ID`, `documents`, `documents/SUBFOLDER` | `knowledge-base-index` | `document`, `overview` |
| Data assets | `assets/bigquery/PROJECT_ID/DATASET_ID/TABLE_ID`, `assets/biglake/PROJECT_ID/CATALOG_ID/NAMESPACE_ID/TABLE_ID` | `table-context` | `document`, `overview` (optional: `queries`, `schema`) |
| Business concept | `documents/concepts/CONCEPT_ID` | `concept` | `document`, `overview` |
| Agent self-learning | `documents/learnings/LEARNING_SLUG` | `learning` | `document`, `overview` |
| Domain documentation | `documents/SUBFOLDER/DOCUMENT_SLUG`, `documents/DOCUMENT_SLUG` | `knowledge-base` | `document`, `overview` |

### Query template fields

| Field | Description |
|---|---|
| `intent` | Analytical intent of the query. |
| `nlQuery` | Example natural language question. |
| `query` | Parameterized SQL with placeholders such as `@season` and `@limit`. |
| `sourceType` | `BIGQUERY`, `SPANNER`, `ALLOYDB`, `CLOUD_SQL`, or `LOOKER`. |
| `sourceDialect` | Optional: `GOOGLE_SQL`, `POSTGRESQL`, `MYSQL`, or `LOOKER_QUERY`. |
| `parameters` | Typed parameters with descriptions and `sampleValues`. |

### Comparison with related constructs

| Construct | Scope | Use when |
|---|---|---|
| Knowledge Catalog context set | Bounded entry group (`type="context-set"`) for a business domain | Grounding analytical AI agents (Gemini Enterprise, ADK agents) over BigQuery and lakehouse assets. |
| Context graph | Open, interactive graph across all cataloged entries and entry links | Interactively discovering assets and tracing multi-hop relationships in New chat. |
| Database context set (QueryData) | Entry group (`type="context-set"`) for transactional database schemas (AlloyDB for PostgreSQL, Cloud SQL, Spanner) | Grounding conversational SQL directly on operational databases. |
| Data product | Governed asset bundle with data contracts, SLAs, data-plane access control | Packaging and granting data-plane access to curated datasets. |

### Preview boundaries

| Boundary | Behavior |
|---|---|
| Regional scope | Single-region context sets (such as `us-central1`) must align with the region of the assets they package. Multi-region (`us`, `eu`) and `global` context sets can reference assets across compatible regions; the enrichment task runs in one selected execution region. |
| Enrichment tasks | Each context set can be enriched by only one enrichment task. |
| Cross-context-set references | Referencing a subset of entries from one context set inside another isn't supported. |
| Quotas | Context sets share the quotas of standard Knowledge Catalog entry groups. |

## Notes

- Adapted from the official docs: the YAML examples place aspect fields (`type`, `content`, `intent`, `nlQuery`, ...) directly under the aspect key. `GoogleCloudDataplexV1Aspect` carries the aspect content in its `data` field (rest-schemas/dataplex/dataplex-1.md), so each example nests the fields under `data:`.
- Preview: subject to the "Pre-GA Offerings Terms"; Pre-GA features are available "as is" and might have limited support.
- Agents consult context sets by progressive disclosure: the `agents` root index and `queries` aspects first, then `assets/*` entries and `schema` aspects, then concept / learning / knowledge-base entries. If a context set definition conflicts with a business glossary term, consuming agents prioritize the context set definition.
- Downstream agents consume context sets through MCP or the Knowledge Catalog APIs (`ListEntries`, `LookupEntry`, `lookupContext`). A pre-configured agent is pointed at `projects/PROJECT_ID/locations/LOCATION/entryGroups/CONTEXT_SET_ID` and reads `entries/agents`.
- Granting an agent access to a context set doesn't bypass access controls on underlying tables; the identity running a query needs data-plane IAM permissions on BigQuery or Cloud Storage. Context sets don't grant data access; a context set can be linked to a data product through the product's `additional_context` references.
- Enrichment tasks that populate context sets run under a user-managed service account impersonated by the Dataplex Service Agent through `roles/iam.serviceAccountTokenCreator`. Enrichment proposals are staged as reviewable change requests before approval.
- Recommended model for enrichment and self-learning in Gemini Enterprise: Gemini 3.8 Flash or later.
- Pricing: an empty context set entry group or an unapproved enrichment batch change request incurs no metadata storage charge; standard Knowledge Catalog metadata storage charges apply once entries are created. During Preview, running enrichment tasks and staging unapproved batch change requests are offered at no charge; BigQuery query processing and Cloud Storage staging reads / writes in your project are charged when optional customer-managed resources are used.
- Knowledge Catalog (formerly Dataplex Universal Catalog) keeps the `dataplex` API, gcloud group and IAM names; Lakehouse is the former BigLake (`assets/biglake/...` entry IDs, `biglake` API). The BigQuery tables referenced by data asset entries are covered by `gcp-bigquery`; Knowledge Catalog catalogs them.
- Source shows no Console or client-library forms beyond the YAML resource representations above.
- Source: https://docs.cloud.google.com/knowledge-catalog/docs/context-sets (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [about-enrichment-tasks.md](./about-enrichment-tasks.md)
- [create-enrichment-tasks.md](./create-enrichment-tasks.md)
- [data-relationships.md](./data-relationships.md)
