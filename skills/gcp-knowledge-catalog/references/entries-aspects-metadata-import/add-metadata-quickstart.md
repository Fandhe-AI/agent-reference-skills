---
source: https://docs.cloud.google.com/knowledge-catalog/docs/add-metadata-quickstart
---

# Add metadata to a BigQuery table (quickstart)

Quickstart: copy a public BigQuery table into your own dataset, create a custom aspect type, and add an aspect to the table's entry. Each data asset is an entry; metadata is attached through aspects defined by a reusable aspect type template.

## Signature / Usage

### Create the aspect type from the command line

The source performs the steps in the Google Cloud console only. The following example creates an aspect type with gcloud.

```bash
$ gcloud dataplex aspect-types create test-aspect-type \
    --location=us-central1 --project=test-project \
    --description='test description' \
    --display-name='test display name' \
    --metadata-template-file-name='file.json'
```

### Console flow (summary)

- Create the dataset `catalog_demo_dataset`, then copy `bigquery-public-data.new_york_citibike.citibike_stations` to `catalog_demo_dataset.bike_stations` (**More > Make a copy of table**).
- Create the custom aspect type `data-governance-demo` with location `global` and the template fields below.
- In Knowledge Catalog **Search**, open the `bike_stations` table, add the optional aspect `data-governance-demo`, enter the values, and save.

## Options / Props

### Required roles on the project

| Role | ID |
|---|---|
| Dataplex Catalog Admin | `roles/dataplex.catalogAdmin` |
| BigQuery Data Owner | `roles/bigquery.dataOwner` |
| BigQuery Job User | `roles/bigquery.jobUser` |

### Aspect type template fields (`data-governance-demo`)

| Name | Type | Is required | Description |
|---|---|---|---|
| `source-of-data-asset` | Text | No | - |
| `retention-date` | Date and time | No | - |
| `data-classification` | Enum (values `Public`, `Sensitive`, `Confidential`) | Yes | - |
| `has-pii` | Boolean | Yes | Whether the data asset has personally identifiable information |

### Values entered for the aspect

| Field | Value |
|---|---|
| Source of data asset | `Copied from NYC Citi Bike Trips public dataset` |
| Retention date | a date |
| Data classification | `Public` |
| Has PII | `False` |

## Notes

- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/dataplex/aspect-types/create (gcloud 593.0.0 help). The source twin has no code block. `--metadata-template-file-name` points to a JSON template file that you prepare; the help example uses placeholder names.
- The source also shows only Console steps (no gcloud, REST, or client-library code).
- Cleanup: deleting the project deletes everything in it and loses custom project IDs. The alternative is deleting the dataset `catalog_demo_dataset` and the aspect type `data-governance-demo`. Try the quickstart in a disposable project.
- The BigQuery dataset and table steps are covered by `gcp-bigquery`; Knowledge Catalog catalogs those tables.
- Source: https://docs.cloud.google.com/knowledge-catalog/docs/add-metadata-quickstart (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [about-aspects.md](./about-aspects.md)
- [import-metadata.md](./import-metadata.md)
