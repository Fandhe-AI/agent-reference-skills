---
source: https://docs.cloud.google.com/knowledge-catalog/docs/data-domains-overview
---

# About data domains

Data domains in Knowledge Catalog (formerly Dataplex Universal Catalog) organize data resources into a logical hierarchy that reflects business structure and ownership, decoupled from the Google Cloud folder and project hierarchy. They scope discovery, control who can discover resources and their metadata, and carry shared governance context. This feature is in Preview ("Pre-GA Offerings Terms").

## Signature / Usage

Snippet borrowed from the creation page (the overview itself shows no code). Creating a data domain with the REST API; the request body is saved as `request.json`:

Adapted (not in the official docs): JSON keys are camelCase as defined by the API schema (`displayName`, `contactName`, `contactRole`, `contactId`, `parentDataDomain`).

```json
{
  "displayName": "Finance Domain",
  "description": "Domain for finance datasets and reports.",
  "contacts": {
    "identities": [
      {
        "contactName": "Alice Wonderland",
        "contactRole": "owner",
        "contactId": "alice@example.com"
      }
    ]
  }
}
```

Adapted (not in the official docs): the query parameter is `dataDomainId` as defined by `dataDomains.create`.

```bash
curl -X POST \
     -H "Authorization: Bearer $(gcloud auth print-access-token)" \
     -H "Content-Type: application/json; charset=utf-8" \
     -d @request.json \
     "https://dataplex.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION_ID/dataDomains?dataDomainId=DATA_DOMAIN_ID"
```

### Typical users

- Data domain administrator: creates top-level domains (such as `Sales`, `Supply Chain`, `Marketing`) and subdomains (such as `Online Sales` and `Store Transactions` under `Sales`), and assigns domain owners.
- Data domain owner: includes datasets, tables and data products from different projects, defines domain-level aspects (such as retention standards and cost centers), and grants roles so a group such as `analysts@example.com` can discover the domain's assets and metadata.
- Data domain user: explores the hierarchy, scopes search to a domain, and inspects metadata, schemas and usage guidance.

## Options / Props

### Supported assets

| Asset |
|-------|
| Projects |
| Data products |
| BigQuery datasets |
| BigQuery tables |
| Dataform repositories |
| Dataproc Metastore databases |
| Dataproc Metastore tables |
| Spanner databases |
| BigLake tables |
| AlloyDB for PostgreSQL instances |
| Gemini Enterprise Agent Platform datasets |

### Limitations

| Area | Limitation |
|------|------------|
| Search | Searching outside the domain context (for example global search) does not apply the domain's discoverability permissions; you see only resources you can access in the underlying system such as BigQuery. Inside the domain, `Dataplex Data Domain Entry Reader` shows resources even without direct BigQuery access. |
| Authorization (Preview) | There is no continuous background IAM synchronization; domain authorization is verified only when a binding is created, so revoking the domain principal's IAM role on a resource does not unbind it from the domain. |

## Notes

- Source: https://docs.cloud.google.com/knowledge-catalog/docs/data-domains-overview (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)
- Snippet taken from https://docs.cloud.google.com/knowledge-catalog/docs/data-domains-create
- Adapted from the official docs: the source request body uses snake_case keys (`display_name`, `contact_name`, ...) and the query parameter `data_domain_id`; the Discovery document and schema use camelCase `displayName`, `contacts.identities[].contactName/contactRole/contactId`, `parentDataDomain` and `dataDomainId` (rest/dataplex/dataplex-1.md `dataDomains.create`, rest-schemas/dataplex/dataplex-1.md).
- Data domains organize assets by business structure; data products package related assets into a curated bundle for a use case. They are complementary.
- Domain context is retrievable with the `lookupContext` method, which returns domain context and indicates which domains a data asset belongs to (used to ground AI agents).
- The BigQuery datasets and tables listed as supported assets are covered by the gcp-bigquery skill; Knowledge Catalog catalogs them. "BigLake tables" is the name used in the source (BigLake is now called Lakehouse).

## Related

- [data-domains-create.md](./data-domains-create.md)
- [data-products-overview.md](./data-products-overview.md)
