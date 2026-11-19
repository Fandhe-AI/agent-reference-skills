---
source: https://docs.cloud.google.com/knowledge-catalog/docs/about-aspects
---

# About aspects and aspect types

Aspects and aspect types in Knowledge Catalog (formerly Dataplex Universal Catalog) attach structured business context, governance policies, and operational attributes to data assets. An aspect type is a reusable schema template (`AspectType`); an aspect (`Aspect`) is a concrete instance of an aspect type attached to an entry, a column, or an entry link. This page covers concepts, scoping rules, and governance boundaries.

## Signature / Usage

### System aspect type resource name

System aspect types are always global and live in a Google-managed project with the project number `655216118709` and the alias `dataplex-types`:

```text
projects/655216118709/locations/global/aspectTypes/schema
```

### Aspect placement

| Target level | Target resource | Key identifier syntax | Common aspect types |
|---|---|---|---|
| Entry level | Data asset (table, model, fileset) | `<aspect_type_id>` | `contacts`, `overview`, `data-profile`, custom SLAs |
| Column level | Field or column within an entry schema | `<aspect_type_id>@Schema.<column_name>` | PII classification, column masking rules, field validation scores |
| Entry link level | Semantic relationship between entries | `<aspect_type_id>` | Relationship confidence, join criteria, mapping lineage |

Column-level aspects use the schema path notation `@Schema.<column_name>` (for example `@Schema.email_address` or `@Schema.billing_address.postal_code`). Entry link-level aspects can be attached to directional or non-directional entry links, except `schema-join` links.

## Options / Props

### Categories of aspect types

| Category | Scope | Notes |
|---|---|---|
| Custom aspect type, global | Replicated across all Google Cloud regions; attachable to entries in any region | One standardized schema across the estate. Choose regional instead if compliance or data residency requires metadata definitions to stay in one geography |
| Custom aspect type, regional | Stored in one region (for example `us-central1`, `europe-west1`); attachable only to entries in the same region | Create and maintain a separate definition per region if you need the same structure in several regions |
| Reusable system aspect type | Attachable to entries, columns, or entry links | `contacts`, `data-profile`, `data-quality-rule-template`, `data-quality-scorecard`, `data-rules`, `generic`, `graph-profile`, `guidelines`, `overview`, `schema-join`, `schema`, `storage`, `usage` |
| Restricted system aspect type | Managed automatically by Google Cloud services; aspects are read-only (you can't create, modify, or delete them) | Including but not limited to: `analytics-hub`, `aspecttype-aspect`, `bigquery-dataset`, `bigquery-table`, `cloudsql-database`, `cloudsql-instance`, `cloudsql-table`, `entrygroup-aspect`, `entrytype-aspect`, `sensitive-data-protection-profile`, `storage-bucket`, `storage-folder` |

### Required and optional aspects

| Kind | Behavior |
|---|---|
| Required aspects | Defined as mandatory by the entry's `EntryType`. Must be populated at entry creation and can't be deleted while the entry exists. For system entries (such as BigQuery tables), required aspects like `Schema` are populated and synchronized automatically |
| Optional aspects | Supplemental metadata added, updated, or removed at any time without affecting the entry's lifecycle |

### Specialized system aspect types

| Aspect type | Purpose |
|---|---|
| `data-quality-scorecard` | Overall data quality scores, evaluation status, and per-column dimension scores from Dataplex data quality scans |
| `data-rules`, `data-quality-rule-template` | Reusable data validation rules and templates applied across datasets |
| `data-profile` | Statistical metrics such as null percentages, distinct values, distribution frequencies |
| `graph-profile` | AI-extracted entities, relationship edges, and knowledge graphs from unstructured documents |

### Project and location scoping constraints

| Resource | Location rule | Project rule |
|---|---|---|
| Entries | The entry's location must match the location of its `EntryType`, or the `EntryType` must be `global` | Can reference global or same-project entry types |
| Aspects on entries | The aspect's `AspectType` must be in the same location as the entry, or the `AspectType` must be `global` | Can reference global system aspect types or same-project custom aspect types |
| Entry links | The entry link's location must match its `EntryLinkType`, or the `EntryLinkType` must be `global` | Can link entries across different projects within the same organization |
| Entry types | Composed of aspect types in the same location as the entry type, or aspect types that are `global` | If an entry type references custom aspect types, they must be in the same project and location |

## Notes

- Custom aspect types apply to entries and columns, not to entry links; entry links only support specific system aspect types, so you can't define custom relationship metadata between entries with a custom aspect type.
- A custom aspect type ID must comply with the Knowledge Catalog resource naming guidelines.
- Each system aspect type has its own IAM permissions (see the IAM permissions page for system aspect types, entry types, and entry link types).
- Gemini in BigQuery grounds SQL generation on standard schema definitions, table constraints, and native table or column descriptions. Custom aspect types are stored in the catalog plane for governance, search, and API retrieval, but aren't injected into Gemini's prompt retrieval pipeline. To give generative AI features business context, also populate native BigQuery table and column descriptions.
- The BigQuery tables themselves are in `gcp-bigquery`; Knowledge Catalog catalogs them.
- Aspects are encapsulated in their parent resources, so an entry and all its metadata can be read or updated in a single API call.
- Source: https://docs.cloud.google.com/knowledge-catalog/docs/about-aspects (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [add-metadata-quickstart.md](./add-metadata-quickstart.md)
- [import-metadata.md](./import-metadata.md)
