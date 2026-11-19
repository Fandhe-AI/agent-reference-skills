---
source: https://docs.cloud.google.com/knowledge-catalog/docs/import-export-glossaries-entrylinks-overview
---

# Import and export glossaries and entry links (overview)

Knowledge Catalog (formerly Dataplex Universal Catalog) supports bulk import and export of business glossaries and entry links, so terms and their relationships can be updated without editing each one in the Google Cloud console. Two methods exist: JSON-based metadata import through the Dataplex API, and open-source Google Sheets utilities.

## Signature / Usage

Snippet borrowed from the gcloud help for creating a single glossary term (the overview itself shows no code):

Adapted (not in the official docs): the `--parent` value is written on one line; the help example splits the quoted path with a backslash inside single quotes, which would put a literal backslash and newline into the value.

```bash
gcloud dataplex glossaries terms create test-term \
    --glossary=test-glossary --location=us-central1 \
    --project=test-project \
    --parent='projects/test-project/locations/us-central1/glossaries/test-glossary/categories/test-category' \
    --description='test description' --display-name='displayName'
```

### Round-trip editing with Google Sheets

1. Export existing glossaries and entry links to Google Sheets with the glossary export and entry links export utilities.
2. Edit in the sheet. Symmetric links (`synonym`, `related`) are simplified to a single direction on export to avoid duplicate rows, so manage each once; new rows must follow the column schema.
3. Run the glossary import first so new terms and categories exist, then run the entry links import, which stages the links in your Cloud Storage bucket and applies the `definition`, `related` and `synonym` links.

## Options / Props

### Entry link types

| Type | Meaning |
|------|---------|
| `definition` | Associates a glossary term with a data asset (for example, a BigQuery column) |
| `related` | Relates two glossary terms |
| `synonym` | Relates two synonymous glossary terms |

### Import and export methods

| Method | Description | Example use case |
|--------|-------------|------------------|
| JSON-based metadata import | Built-in, fully managed; uses the Dataplex API with JSON metadata files | Daily scheduled pipeline that synchronizes terms from an external enterprise database |
| Google Sheets-based utilities | Open-source Python script in the `dataplex-labs` repository that syncs a Google Sheet with Knowledge Catalog | Governance team drafts and reviews many terms with non-technical stakeholders before bulk upload |

## Notes

- Source: https://docs.cloud.google.com/knowledge-catalog/docs/import-export-glossaries-entrylinks-overview (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)
- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/dataplex/glossaries/terms/create (gcloud 593.0.0 help)
- Adapted from the official gcloud help: the original `--parent='projects/test-project/locations/us-central1/glossaries\` followed by a line break and `/test-glossary/categories/test-category'` was joined into one path.
- The source links to separate pages for JSON import, Sheets import and Sheets export of glossaries and entry links; those pages are not part of this category.
- Try the command on a disposable project; it creates a glossary term.

## Related

- [quickstart-business-glossary.md](./quickstart-business-glossary.md)
- [about-governance-workflows.md](./about-governance-workflows.md)
