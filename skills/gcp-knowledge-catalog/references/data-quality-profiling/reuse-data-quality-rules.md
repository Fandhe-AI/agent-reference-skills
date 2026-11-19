---
source: https://docs.cloud.google.com/knowledge-catalog/docs/reuse-data-quality-rules
---

# Reuse data quality rules (rule templates and data-rules aspects)

Rule templates in Knowledge Catalog (formerly Dataplex Universal Catalog) share standardized validation checks across data quality scans. Reference system templates or custom SQL templates from scans, or attach rules to BigQuery table entries and business glossary term entries as `data-rules` aspects. Custom templates are `data-quality-rule-template` entries stored in a rule library (an entry group labeled `goog-dataplex-entry-group-type: rule_library`).

## Signature / Usage

### Set up the REST examples

```bash
alias gcurl='curl -H "Authorization: Bearer $(gcloud auth print-access-token)" -H "Content-Type: application/json"'
```

```bash
DATAPLEX_API="dataplex.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION"
```

### Rule template SQL

The query must return invalid rows; if it returns any rows the rule fails. Omit the trailing semicolon. Example 1: values between two values.

```sql
SELECT *
FROM ${data()}
WHERE
  NOT ((${column()}>=${param(min_value)} AND ${column()}<=${param(max_value)}) IS TRUE)
```

Example 2: foreign key validation (parameters `reference_table` as `PROJECT_ID.DATASET_ID.TABLE_ID`, and `reference_column`).

```sql
SELECT t.*
FROM ${data()} AS t
LEFT JOIN `${param(reference_table)}` AS s
  ON t.${column()} = s.`${param(reference_column)}`
WHERE s.`${param(reference_column)}` IS NULL
```

### List system rule templates

```bash
gcurl "https://dataplex.googleapis.com/v1/projects/dataplex-templates/locations/global/entryGroups/rule-library/entries"
```

### Create a rule library

```bash
gcurl -X POST "https://${DATAPLEX_API}/entryGroups?entryGroup_id=RULE_LIBRARY_ID" \
--data @- << EOF
{
"labels": {
  "goog-dataplex-entry-group-type": "rule_library"
},
"description": "DESCRIPTION"
}
EOF
```

### Create a rule template

Adapted (not in the official docs): the heredoc delimiter is quoted (`'EOF'`) so the shell does not expand `${data()}`, `${param(...)}`, `${column()}` and the backticks in the query.

```bash
gcurl -X POST "https://${DATAPLEX_API}/entryGroups/ENTRY_GROUP_ID/entries?entry_id=TEMPLATE_ID" \
--data @- << 'EOF'
{
"entryType": "projects/dataplex-types/locations/global/entryTypes/data-quality-rule-template",
"entrySource": {
  "displayName": "DISPLAY_NAME",
  "description": "DESCRIPTION"
},
"aspects": {
  "dataplex-types.global.data-quality-rule-template": {
     "data": {
       "dimension": "VALIDITY",
       "sqlCollection": [
         {
           "query": "SELECT t.* FROM ${data()} AS t LEFT JOIN `${param(reference_table)}` AS s ON t.${column()} = s.`${param(reference_column)}` WHERE s.`${param(reference_column)}` IS NULL"
         }
       ],
       "inputParameters": {
         "PARAMETER_NAME": { "description": "PARAMETER_DESCRIPTION" }
       },
       "capabilities": ["THRESHOLD"]
     }
  }
}
}
EOF
```

### Update and delete a rule template

Adapted (not in the official docs): the heredoc delimiter is quoted (`'EOF'`) so the shell does not expand `${data()}` and `${column()}`.

```bash
gcurl -X PATCH "https://${DATAPLEX_API}/entryGroups/ENTRY_GROUP_ID/entries/TEMPLATE_ID?updateMask=aspects" \
--data @- << 'EOF'
{
 "aspects": {
   "dataplex-types.global.data-quality-rule-template": {
     "data": {
       "dimension": "VALIDITY",
       "sqlCollection": [
         {
           "query": "SELECT * FROM ${data()} WHERE ${column()} IS NOT NULL"
         }
       ]
     }
   }
 }
}
EOF
```

```bash
gcurl -X DELETE \
"https://${DATAPLEX_API}/entryGroups/ENTRY_GROUP_ID/entries/TEMPLATE_ID"
```

### Create a data quality scan that uses a template

Use `templateReference`. Custom templates use project-specific paths; system templates use `projects/dataplex-templates/locations/global/entryGroups/rule-library/entries/SYSTEM_TEMPLATE_ID` (for example `non_null_expectation`). `FILTER_CONDITION` is an optional AIP-160 filter (for example `name = "RULE_NAME"`).

```bash
gcurl -X POST "https://${DATAPLEX_API}/dataScans?data_scan_id=DATASCAN_ID" \
--data @- << EOF
{
"data": {
  "resource": "//bigquery.googleapis.com/projects/BIGQUERY_PROJECT_ID/datasets/DATASET_ID/tables/TABLE_ID"
},
"executionIdentity": {
  "serviceAccount": { "email": "SERVICE_ACCOUNT_EMAIL" }
},
"executionSpec": { "trigger": { "onDemand": {} } },
"type": "DATA_QUALITY",
"dataQualitySpec": {
  "rules": [
    {
      "templateReference": {
        "name": "projects/PROJECT_ID/locations/LOCATION/entryGroups/ENTRY_GROUP_ID/entries/TEMPLATE_ID",
        "values": { "PARAMETER_NAME": { "value" : "PARAMETER_VALUE" } }
      },
      "column": "COLUMN_NAME",
      "name": "RULE_NAME"
    }
  ],
  "filter": "FILTER_CONDITION"
}
}
EOF
```

### Attach rules to a BigQuery table column

Patch the `@bigquery` entry with a `data-rules` aspect for that column.

```bash
gcurl -X PATCH "https://${DATAPLEX_API}/entryGroups/@bigquery/entries/projects/PROJECT_ID/locations/LOCATION/datasets/DATASET_ID/tables/TABLE_ID?updateMask=aspects&aspect_keys=projects/dataplex-types/locations/global/aspectTypes/data-rules@Schema.COLUMN_NAME" \
--data @- << EOF
{
"aspects": {
  "dataplex-types.global.data-rules@Schema.COLUMN_NAME": {
    "aspectType": "projects/dataplex-types/locations/global/aspectTypes/data-rules",
    "data": {
      "rules": [
        {
          "templateReference": "projects/PROJECT_ID/locations/LOCATION/entryGroups/ENTRY_GROUP_ID/entries/TEMPLATE_ID",
          "column": "COLUMN_NAME",
            "values": { "PARAMETER_NAME": { "value" : "PARAMETER_VALUE" } }
          }
      ]
    }
  }
}
}
EOF
```

### Attach rules to a business glossary term

Patch the `@dataplex` entry of the term; linked BigQuery tables inherit the rules.

```bash
gcurl -X PATCH "https://${DATAPLEX_API}/entryGroups/@dataplex/entries/projects/PROJECT_ID/locations/LOCATION/glossaries/GLOSSARY_ID/terms/TERM_ID?updateMask=aspects&aspect_keys=projects/dataplex-types/locations/global/aspectTypes/data-rules" \
--data @- << EOF
{
"aspects": {
  "dataplex-types.global.data-rules": {
    "aspectType": "projects/dataplex-types/locations/global/aspectTypes/data-rules",
    "data": {
      "rules": [
        {
          "templateReference": "projects/PROJECT_ID/locations/LOCATION/entryGroups/ENTRY_GROUP_ID/entries/TEMPLATE_ID",
          "column": "COLUMN_NAME",
            "values": { "PARAMETER_NAME": { "value" : "PARAMETER_VALUE" } }
          }
      ]
    }
  }
}
}
EOF
```

### Import rules from another table

Get the `data-rules` aspect from the source entry, extract the `rules` list from `dataplex-types.global.data-rules`, then attach it to the target entry.

```bash
gcurl "https://dataplex.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/entryGroups/ENTRY_GROUP_ID/entries/SOURCE_ENTRY_ID?view=FULL"
```

### Run rules declared on catalog entries

Set `enableCatalogBasedRules` to `true`; a filter is optional. Subsequent runs evaluate the rules attached to the entry or inherited from glossary terms as observed at execution time.

```bash
gcurl -X POST "https://${DATAPLEX_API}/dataScans?data_scan_id=DATASCAN_ID" \
--data @- << EOF
{
"type": "DATA_QUALITY",
"data": {
  "resource": "//bigquery.googleapis.com/projects/PROJECT_ID/datasets/DATASET_ID/tables/TABLE_ID"
},
"executionIdentity": {
  "serviceAccount": { "email": "SERVICE_ACCOUNT_EMAIL" }
},
"executionSpec": { "trigger": { "onDemand": {} } },
"dataQualitySpec": {
  "enableCatalogBasedRules": true,
  "filter": "FILTER_CONDITION"
}
}
EOF
```

### Aspect payload examples

`data-rules` aspect (`payload.json`):

```json
{
  "aspects": {
    "dataplex-types.global.data-rules": {
      "data": {
        "rules": [
          {
            "name": "valid-email",
            "dimension": "VALIDITY",
            "type": "TEMPLATE_REFERENCE",
            "templateReference": {
              "name": "projects/my-project/locations/us-central1/entryGroups/my-rules/entries/email-check",
              "values": {
                "column_name": {
                    "value": "email"
                }
              }
            }
          }
        ]
      }
    }
  }
}
```

`data-quality-rule-template` aspect:

```json
{
  "entryType": "projects/dataplex-types/locations/global/entryTypes/data-quality-rule-template",
  "aspects": {
    "dataplex-types.global.data-quality-rule-template": {
      "data": {
        "dimension": "COMPLETENESS",
        "sqlCollection": [
          {
              "query": "SELECT * FROM ${data()} WHERE ${column()} > ${param(p1)}"
          }
        ],
        "inputParameters": {
          "p1": {
              "description": "The parameter description"
          }
        },
        "capabilities": [
          "THRESHOLD",
          "IGNORE_NULL"
        ]
      }
    }
  }
}
```

## Options / Props

### Template SQL parameters

| Parameter | Meaning |
|---|---|
| `${param(name)}` | Input parameter (case-sensitive), for example `${param(min_value)}`. |
| `$${...}` | Escapes a literal `${...}` so it is not replaced as a parameter. |
| `${project()}` | Project ID of the resource being scanned. |
| `${dataset()}` | BigQuery dataset ID of the scanned resource, formatted as `PROJECT_ID.DATASET_ID`. |
| `${table()}` | BigQuery table ID of the scanned resource, formatted as `PROJECT_ID.DATASET_ID.TABLE_ID`. |
| `${column()}` | Column the rule is evaluated on. Evaluation errors if the rule is attached at table level but references `${column()}`. |
| `${data()}` | Source table with all precondition filters (row filters, sampling percentages, incremental filters) from the scan specification. |

### Roles and permissions

| Task | Required |
|---|---|
| Enable the Dataplex API | `serviceusage.services.enable` (for example `roles/serviceusage.serviceUsageAdmin`). |
| Manage data scans | The data scan roles from the "use auto data quality" page. |
| Create or update rule templates | `roles/dataplex.catalogEditor` or `roles/dataplex.entryOwner` on the template's entry group or project. |
| Reference a template from a rule | `dataplex.entries.get` and `dataplex.entries.getData` on the template's entry group or project. |
| Attach rules to BigQuery tables | `bigquery.tables.update` or `roles/bigquery.dataEditor` on the table plus `dataplex.entryGroups.useDataRulesAspect` on the `@bigquery` entry group in the table location; or `roles/dataplex.catalogEditor` on the `@bigquery` entry group. |
| Attach rules to glossary terms | `dataplex.glossaryTerms.update` on the term plus `dataplex.entryGroups.useDataRulesAspect` on the `@dataplex` entry group; or `roles/dataplex.catalogEditor` on the `@dataplex` entry group. |
| Create scans with entry-based rules | `bigquery.tables.get` and `bigquery.tables.getData` on the table; or `dataplex.entries.get` and `dataplex.entries.getData` on the `@bigquery` entry group in the table location. |

### Service account (mandatory for scans with reusable rules)

| Requirement | Detail |
|---|---|
| Acting as the account | `iam.serviceAccounts.actAs` on the project hosting the service account (typically `roles/iam.serviceAccountUser`). |
| Dataplex Service Agent | `service-PROJECT_ID@gcp-sa-dataplex.iam.gserviceaccount.com` of the scan project needs `iam.serviceAccounts.getAccessToken` on the service account (for example `roles/iam.serviceAccountTokenCreator`). |
| The account's own access | `bigquery.tables.getData` on the scanned table (for example `roles/bigquery.dataViewer`); `bigquery.jobs.create` in the scan project (for example `roles/bigquery.jobUser`); `roles/bigquery.dataEditor` on the export dataset if exporting. |

### System rule templates vs built-in rules

| Feature | System rule templates | Built-in rules |
|---|---|---|
| Source | Reusable templates in the catalog (project `dataplex-templates`, entry group `rule-library`, usable in any region) | Built in to the API |
| Referencing | Catalog entries and scans | Scans only |

- Assertion Row Count metric is populated for all template reference rules, not only SQL assertion rules.
- Statistic Range Expectation template (aggregate) doesn't support `ignore null` and doesn't report a `nullCount` metric; it passes if the statistic is within the range.
- Uniqueness Expectation template calculates `passedCount` differently: it returns all rows with duplicates or nulls as failing. For values `(a, a, b, b, c, d, e)` the built-in rule gives 5 passing rows `(a, b, c, d, e)`; the template gives 4 failing rows `(a, a, b, b)` and 3 passing rows `(c, d, e)`.

### `data-rules` aspect fields (`dataplex-types.global.data-rules`)

| Field | Type | Description |
|---|---|---|
| `rules` | Array | Required. List of data quality rules. |
| `rules[].name` | String | Required. Name of the rule. |
| `rules[].dimension` | String | Optional. Data quality dimension. |
| `rules[].description` | String | Optional. Description. |
| `rules[].suspended` | Boolean | Optional. Whether the rule is suspended. Default `false`. |
| `rules[].threshold` | Double | Optional. Passing threshold, `0.0` to `1.0`. Default `1.0`. |
| `rules[].type` | Enum | Required. The only supported value is `TEMPLATE_REFERENCE`. |
| `rules[].ignore_null` | Boolean | Optional. If `true`, null rows are ignored when determining success. |
| `rules[].attributes` | Map | Optional. Custom key-value pairs. |
| `rules[].templateReference` | Object | Required. Reference to the rule template. |
| `rules[].templateReference.name` | String | Required. Resource name of the rule template. |
| `rules[].templateReference.values` | Map | Optional. Parameter names and values. |
| `rules[].templateReference.values[].parameterValue.value` | String | Required. Value of the parameter. |

### `data-quality-rule-template` aspect fields

| Field | Type | Description |
|---|---|---|
| `dimension` | String | Required. Dimension of the template. |
| `sqlCollection` | Array | Required. SQL queries for the template. |
| `sqlCollection[].sql.query` | String | Required. SQL query that returns invalid rows. |
| `inputParameters` | Map | Optional. Input parameters. |
| `inputParameters[].parameterDescription.description` | String | Optional. Description of the parameter. |
| `inputParameters[].parameterDescription.defaultValue` | String | Optional. Default value if none is provided. |
| `capabilities` | Array | Optional. Template capabilities such as `THRESHOLD` or `IGNORE_NULL`. |

## Notes

- Source: https://docs.cloud.google.com/knowledge-catalog/docs/reuse-data-quality-rules (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)
- Corrected from the official docs: the official page lists `bigquery.jobs.insert` as the permission the service account needs in the scan project; that is the REST method `jobs.insert`, not an IAM permission. The IAM permission to run jobs is `bigquery.jobs.create`, which `roles/bigquery.jobUser` contains (IAM roles and permissions reference, https://docs.cloud.google.com/iam/docs/roles-permissions/bigquery, retrieved 2026-11-14).
- Official docs inconsistency: this page writes the Dataplex Service Agent email as `service-PROJECT_ID@gcp-sa-dataplex.iam.gserviceaccount.com`, while the IAM page (https://docs.cloud.google.com/knowledge-catalog/docs/iam-and-access-control) writes it as `service-CUSTOMER_PROJECT_NUMBER@gcp-sa-dataplex.iam.gserviceaccount.com`. The IAM page's form uses a project number; see overview-setup-iam/iam-and-access-control.md.
- Knowledge Catalog was formerly Dataplex Universal Catalog; the API, gcloud group, and IAM names stay `dataplex`. The BigQuery tables themselves are covered by the gcp-bigquery skill.
- Corrected from the official docs: the create and update template examples use `<< EOF` (unquoted) while the JSON contains `${data()}`, `${param(...)}`, `${column()}` and backticks, which the shell would expand or reject; the fences use `<< 'EOF'`. The other heredocs contain no `$` or backticks and are unchanged.
- The source uses snake_case query parameters (`entryGroup_id`, `entry_id`, `data_scan_id`, `aspect_keys`); the Discovery document names them `entryGroupId`, `entryId`, `dataScanId`. Copied as the source writes them.
- The BigQuery table and glossary term REST examples put `column` inside the rule object and omit `name` and `type`, while the `data-rules` fields table marks `name` and `type` as required and a Note in the source says the column is determined by the aspect path rather than a field. The later JSON payload example includes `name` and `type`. Copied as the source writes them; check against the fields table before use.
- The `gcurl` alias adds an access token; an alias is not expanded in non-interactive scripts, so run these in an interactive shell or substitute the `curl` command.
- Rule templates are used only from the same location as the scan, or from a global location. A rule library location can't be changed after creation.
- Deleting a rule template (`DELETE` on the entry) is destructive; try it on a disposable rule library first.
- Pricing: BigQuery charges for the job run in the scan project; there is no Knowledge Catalog processing charge for the scan; `data-rules` and `data-quality-rule-template` aspect storage is charged as metadata storage (see Knowledge Catalog pricing at https://docs.cloud.google.com/dataplex/pricing).
- The source also shows Console steps and Terraform examples (`google_dataplex_entry_group`, `google_dataplex_entry`, `google_dataplex_datascan`); they are omitted.

## Related

- [auto-data-quality-overview.md](./auto-data-quality-overview.md)
- [system-rule-templates-list.md](./system-rule-templates-list.md)
