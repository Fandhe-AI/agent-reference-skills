---
source: https://docs.cloud.google.com/bigquery/docs/customer-managed-encryption
---

# Customer-managed Cloud KMS keys (CMEK)

CMEK in Cloud KMS lets you control the key encryption keys that protect BigQuery data at rest. BigQuery uses envelope encryption: table data is encrypted with a data encryption key, which is encrypted with the Cloud KMS key. All data assets in BigQuery managed storage support CMEK. Keys can be created manually or on demand with Cloud KMS Autokey. CMEK support is only available for BigQuery Enterprise, BigQuery Enterprise Plus and BigQuery On-Demand; the feature may not be available in reservations created with certain other editions.

## Signature / Usage

### Trigger creation of the BigQuery service account and find its ID

The service account is not created with the project; a command that uses it creates it. The ID has the form `bq-PROJECT_NUMBER@bigquery-encryption.iam.gserviceaccount.com`.

```bash
bq show --encryption_service_account --project_id=PROJECT_ID
```

### Grant encrypt and decrypt permission

```bash
gcloud kms keys add-iam-policy-binding \
--project=KMS_PROJECT_ID \
--member serviceAccount:bq-PROJECT_NUMBER@bigquery-encryption.iam.gserviceaccount.com \
--role roles/cloudkms.cryptoKeyEncrypterDecrypter \
--location=KMS_KEY_LOCATION \
--keyring=KMS_KEY_RING \
KMS_KEY
```

### Key resource ID

Case-sensitive; a key ID with `/cryptoKeyVersions/` is not accepted (BigQuery uses the `primary` version).

```text
projects/KMS_PROJECT_ID/locations/LOCATION/keyRings/KEY_RING/cryptoKeys/KEY
```

### Create a table protected by Cloud KMS

```sql
CREATE TABLE DATASET_ID.TABLE_ID (
  name STRING, value INT64
) OPTIONS (
    kms_key_name
      = 'projects/KMS_PROJECT_ID/locations/LOCATION/keyRings/KEY_RING/cryptoKeys/KEY');
```

```bash
bq mk --schema name:string,value:integer -t \
--destination_kms_key projects/KMS_PROJECT_ID/locations/LOCATION/keyRings/KEY_RING/cryptoKeys/KEY \
DATASET_ID.TABLE_ID
```

```python
from google.cloud import bigquery

client = bigquery.Client()

# TODO(dev): Change table_id to the full name of the table you want to create.
table_id = "your-project.your_dataset.your_table_name"

# Set the encryption key to use for the table.
# TODO: Replace this key with a key you have created in Cloud KMS.
kms_key_name = "projects/your-project/locations/us/keyRings/test/cryptoKeys/test"

table = bigquery.Table(table_id)
table.encryption_configuration = bigquery.EncryptionConfiguration(
    kms_key_name=kms_key_name
)
table = client.create_table(table)  # API request

print(f"Created {table_id}.")
print(f"Key: {table.encryption_configuration.kms_key_name}.")
```

### Protect query results

```bash
bq query \
--destination_table=DATASET_ID.TABLE_ID \
--destination_kms_key projects/KMS_PROJECT_ID/locations/LOCATION/keyRings/KEY_RING/cryptoKeys/KEY \
"SELECT name,count FROM DATASET_ID.TABLE_ID WHERE gender = 'M' ORDER BY count DESC LIMIT 6"
```

### Load into a CMEK-protected table

```bash
bq load \
--autodetect \
--source_format=NEWLINE_DELIMITED_JSON \
--destination_kms_key projects/KMS_PROJECT_ID/locations/LOCATION/keyRings/KEY_RING/cryptoKeys/KEY \
test2.table4 \
gs://cloud-samples-data/bigquery/us-states/us-states.json
```

### Change a table between default encryption and CMEK

Copy a default-encrypted table to a new CMEK-protected table:

```bash
bq cp \
--destination_kms_key projects/KMS_PROJECT_ID/locations/LOCATION/keyRings/KEY_RING/cryptoKeys/KEY \
SOURCE_DATASET_ID.SOURCE_TABLE_ID DESTINATION_DATASET_ID.DESTINATION_TABLE_ID
```

Overwrite the same table with CMEK protection (`-f` overwrites the destination without prompting):

```bash
bq cp -f \
--destination_kms_key projects/KMS_PROJECT_ID/locations/LOCATION/keyRings/KEY_RING/cryptoKeys/KEY \
DATASET_ID.TABLE_ID DATASET_ID.TABLE_ID
```

To change a table from Cloud KMS protection to default encryption, run `bq cp` on the table to itself without `--destination_kms_key`.

### Change the Cloud KMS key of a table

```sql
ALTER TABLE DATASET_ID.mytable
SET OPTIONS (
  kms_key_name
    = 'projects/KMS_PROJECT_ID/locations/LOCATION/keyRings/KEY_RING/cryptoKeys/KEY');
```

```bash
bq update \
--destination_kms_key projects/KMS_PROJECT_ID/locations/LOCATION/keyRings/KEY_RING/cryptoKeys/KEY \
-t DATASET_ID.TABLE_ID
```

### Dataset default key

```sql
CREATE SCHEMA PROJECT_ID.DATASET_ID
OPTIONS (
  default_kms_key_name = 'projects/KMS_PROJECT_ID/locations/LOCATION/keyRings/KEY_RING/cryptoKeys/KEY',
  location = 'LOCATION');
```

```sql
ALTER SCHEMA PROJECT_ID.DATASET_ID
SET OPTIONS (
  default_kms_key_name = 'projects/KMS_PROJECT_ID/locations/LOCATION/keyRings/KEY_RING/cryptoKeys/KEY');
```

Remove the default key by setting it to `NULL`:

```sql
ALTER SCHEMA PROJECT_ID.DATASET_ID
SET OPTIONS (
  default_kms_key_name = NULL);
```

Adapted (not in the official docs): the command is one line; the source splits the arguments across blank lines with no `\` continuation, which runs them as separate commands.

```bash
bq mk --dataset --default_kms_key projects/KMS_PROJECT_ID/locations/LOCATION/keyRings/KEY_RING/cryptoKeys/KEY PROJECT_ID:DATASET_ID
```

Adapted (not in the official docs): the command is one line; the source splits the arguments across blank lines with no `\` continuation, which runs them as separate commands.

```bash
bq update --dataset --default_kms_key projects/KMS_PROJECT_ID/locations/LOCATION/keyRings/KEY_RING/cryptoKeys/KEY PROJECT_ID:DATASET_ID
```

```bash
bq update --dataset --default_kms_key="" PROJECT_ID:DATASET_ID
```

Over the REST API, set `EncryptionConfiguration.kmsKeyName` in `datasets.insert` or `datasets.patch`; to remove the key, set it to null in `datasets.patch`.

### Project default key

```sql
ALTER PROJECT PROJECT_ID
SET OPTIONS (
  `region-LOCATION.default_kms_key_name`
    = 'projects/KMS_PROJECT_ID/locations/LOCATION/keyRings/KEY_RING/cryptoKeys/KEY');
```

```bash
bq query --nouse_legacy_sql \
  'ALTER PROJECT PROJECT_ID
  SET OPTIONS (
  `region-LOCATION.default_kms_key_name`
    ="projects/KMS_PROJECT_ID/locations/LOCATION/keyRings/KEY_RING/cryptoKeys/KEY");'
```

### BigQuery ML models

```sql
CREATE MODEL my_dataset.my_model
OPTIONS(
  model_type='linear_reg',
  input_label_cols=['your_label'],
  kms_key_name='projects/my_project/locations/my_location/keyRings/my_ring/cryptoKeys/my_key')
AS SELECT * FROM my_dataset.my_data
```

```bash
bq show -m my_dataset.my_model
```

The encryption key is in the `kmsKeyName` field. Model copy: `bq cp --destination_kms_key KEY SOURCE_MODEL DESTINATION_MODEL` (add `-f` to overwrite the same model with CMEK protection; `bq cp -f DATASET_ID.MODEL_ID DATASET_ID.MODEL_ID` switches back to default encryption).

### Organization policy

```bash
gcloud resource-manager org-policies --project=PROJECT_ID \
  deny gcp.restrictNonCmekServices is:bigquery.googleapis.com
```

```bash
gcloud resource-manager org-policies --project=PROJECT_ID \
  allow gcp.restrictCmekCryptoKeyProjects under:projects/KMS_PROJECT_ID
```

## Options / Props

### Key and dataset location matching

| Dataset location | Key ring location |
|---|---|
| Multi-region `US` | `us` |
| Multi-region `EU` | `europe` |
| Region, for example `asia-northeast1` | the same region |

The `global` key location can't be used in the Google Cloud console but can be used with the bq tool or GoogleSQL.

### Organization policy constraints

| Constraint | Effect |
|---|---|
| `constraints/gcp.restrictNonCmekServices` | With `is:bigquery.googleapis.com` denied, resource creation requests (tables, query result tables) without a Cloud KMS key fail. Applies only to new resources; datasets and project config can still be created without a key. |
| `constraints/gcp.restrictCmekCryptoKeyProjects` | Restricts which projects may supply Cloud KMS keys, for example `under:projects/KMS_PROJECT_ID`. |

### BigQuery ML limitations

| Model type | Restriction |
|---|---|
| DNN, Wide-and-Deep, Autoencoder, Boosted tree | `Global` region CMEK keys are not supported |
| AutoML Tables | `Global` and multi-region keys (`EU`, `US`) are not supported |
| Remote models (over Gemini Enterprise Agent Platform built-in models, hosted models, or Cloud AI services) | CMEK keys aren't supported |

### Limits and conditions

| Topic | Rule |
|---|---|
| Key available and accessible | Key is enabled and the BigQuery service account has encrypt and decrypt permission |
| Streaming inserts | Key must be available for at least 24 consecutive hours in the 48-hour period after a streaming insertion request, or streamed data might not be fully persisted and can be lost |
| Long-term inaccessible key | If the key is unavailable for 60 consecutive days, BigQuery might delete the table and its data; an email goes to the billing account address at least 7 days before deletion |
| Revoking access | Takes effect within an hour; query, `cp`, `extract` and `tabledata.list` fail, no new data can be added, and queries can be degraded for multiple days after access returns |
| Organization policy propagation | Up to 15 minutes; setting it needs the Organization Policy Administrator role, granted at the organization level |
| Key rotation | Existing table keys are not rotated automatically; update the table with the same Cloud KMS key to use the latest version (this update doesn't check organization policy). New tables in a dataset with a default key use the latest version |
| KMS calls | One `cryptoKeys.encrypt` per table creation or truncation, one `cryptoKeys.decrypt` per table in a query; a decryption call is made once per query to a CMEK-encrypted table |
| Key specification | AES-256 keys used as key encryption keys |
| Switching encryption | Can't switch a table in place; copy it with destination encryption set, or `SELECT *` into itself with `WRITE_TRUNCATE` |
| Wildcard tables | CMEK-protected tables can't be queried with a wildcard suffix |
| Scripts | Can't define destination tables for CMEK operations |
| Range decorators | Don't work across an encryption change boundary after `WRITE_TRUNCATE` |
| External data and CSEK | External data (for example BigLake tables over Cloud Storage) uses Cloud Storage encryption; BigQuery and BigLake tables don't support Customer-Supplied Encryption Keys |
| BigQuery Studio code assets | Saved queries, notebooks, data canvases and data preparations use a default Dataform CMEK key per project (not per organization, not via Terraform); it doesn't apply to existing assets |
| BigQuery Connection API | Cloud SQL connection credentials can be protected with CMEK |

### Common errors

| Error | Resolution |
|---|---|
| `Please grant Cloud KMS CryptoKey Encrypter/Decrypter role` | Grant the role to the BigQuery service account |
| `Existing table encryption settings don't match encryption settings specified in the request` | Use the `TRUNCATE` write disposition to replace the table, or another destination table |
| `This region is not supported` | Key region doesn't match the dataset region; use a matching key or dataset |
| `Your administrator requires that you specify an encryption key for queries in project PROJECT_ID.` | `constraints/gcp.restrictNonCmekServices` applies |
| `Your administrator prevents using KMS keys from project KMS_PROJECT_ID to protect resources in project PROJECT_ID.` | `constraints/gcp.restrictCmekCryptoKeyProjects` applies |

## Notes

- Removing access to the key can cause data loss and degraded access; revoke it only on disposable data. Try the `bq cp -f` overwrite, the organization-policy commands and `WRITE_TRUNCATE` switches on a disposable dataset or project first.
- Anyone with permission to a CMEK table can read it as long as the BigQuery service account of the table's project can use the key. Service accounts are per project: a query over `project1.table1` and `project2.table2` writing `project3.table3` uses the `project1`, `project2` and `project3` service accounts respectively.
- Query results go to a temporary table encrypted by a Google-owned key unless a project default key or `--destination_kms_key` applies; the project default also covers cached results tables in anonymous datasets.
- A dataset default key applies only to new tables; in such a dataset you can't encrypt new tables with a non-customer-managed key. Changing a default key doesn't modify existing tables.
- Corrected from the official docs: the source's `bq mk --dataset` / `bq update --dataset` default-key commands are split across lines separated by blank lines without `\`; they are shown as one line each.
- `bq update --destination_kms_key` is in `bq help update` (bq bundled with gcloud 593.0.0: "Cloud KMS key for encryption of the destination table data"), although the `bq update` entry of the bq CLI reference page does not list it. The source also shows the same flag with `-m` for a model.
- The source also shows Console steps, Terraform (`google_bigquery_table`, with `google_kms_crypto_key` and the IAM binding), and Go, Java and Python samples (load, query destination, copy, update); only the Python create-table sample is kept above.
- Remote models and the AI functions call Vertex AI (Agent Platform) models; the Gemini Developer API and `google-genai` SDK are in `google-gemini-api`.
- Cloud KMS keys are covered by `gcp-security`; `constraints/gcp.restrictNonCmekServices` and organization policy in general by `gcp-foundation`. The Cloud Storage and Cloud SQL sides of external sources are in `gcp-storage` and `gcp-databases-relational`.
- Billing: see Cloud KMS pricing (https://cloud.google.com/kms/pricing); prices are not copied here.
- Source: https://docs.cloud.google.com/bigquery/docs/customer-managed-encryption (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [encryption-at-rest.md](./encryption-at-rest.md)
- [audit-logging.md](./audit-logging.md)
- Autokey overview: https://docs.cloud.google.com/kms/docs/autokey-overview
- Creating key rings and keys: https://docs.cloud.google.com/kms/docs/creating-keys
- Set a default Dataform CMEK key: https://docs.cloud.google.com/dataform/docs/cmek#set-default-key
