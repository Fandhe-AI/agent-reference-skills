---
source: https://docs.cloud.google.com/bigquery/docs/datasets
---

# Create datasets

Create datasets to store tables and views in top-level containers. You can create a dataset with the console, the `CREATE SCHEMA` SQL statement, `bq mk`, Terraform, the `datasets.insert` API method, or client libraries.

## Signature / Usage

### SQL

Use the `CREATE SCHEMA` statement. To create a dataset in a project other than your default project, use `PROJECT_ID.DATASET_ID`.

```sql
CREATE SCHEMA PROJECT_ID.DATASET_ID
  OPTIONS (
    default_kms_key_name = 'KMS_KEY_NAME',
    default_partition_expiration_days = PARTITION_EXPIRATION,
    default_table_expiration_days = TABLE_EXPIRATION,
    description = 'DESCRIPTION',
    labels = [('KEY_1','VALUE_1'),('KEY_2','VALUE_2')],
    location = 'LOCATION',
    max_time_travel_hours = HOURS,
    storage_billing_model = BILLING_MODEL);
```

### bq

Use `bq mk` with the `--location` flag. To create a dataset in a project other than your default project, use `PROJECT_ID:DATASET_ID`.

```bash
bq --location=LOCATION mk \
    --dataset \
    --default_kms_key=KMS_KEY_NAME \
    --default_partition_expiration=PARTITION_EXPIRATION \
    --default_table_expiration=TABLE_EXPIRATION \
    --description="DESCRIPTION" \
    --label=KEY_1:VALUE_1 \
    --label=KEY_2:VALUE_2 \
    --add_tags=KEY_3:VALUE_3[,...] \
    --max_time_travel_hours=HOURS \
    --storage_billing_model=BILLING_MODEL \
    PROJECT_ID:DATASET_ID
```

Example: a dataset `mydataset` in `US` with a default table expiration of 3600 seconds and a description. The `-d` shortcut replaces `--dataset`; if you omit both, the command defaults to creating a dataset.

```bash
bq --location=US mk -d \
    --default_table_expiration 3600 \
    --description "This is my dataset." \
    mydataset
```

### Python

```python
from google.cloud import bigquery

# Construct a BigQuery client object.
client = bigquery.Client()

# TODO(developer): Set dataset_id to the ID of the dataset to create.
# dataset_id = "{}.your_dataset".format(client.project)

# Construct a full Dataset object to send to the API.
dataset = bigquery.Dataset(dataset_id)

# TODO(developer): Specify the geographic location where the dataset should reside.
dataset.location = "US"

# Send the dataset to the API for creation, with an explicit timeout.
# Raises google.api_core.exceptions.Conflict if the Dataset already
# exists within the project.
dataset = client.create_dataset(dataset, timeout=30)  # Make an API request.
print("Created dataset {}.{}".format(client.project, dataset.dataset_id))
```

### Node.js

```javascript
// Import the Google Cloud client library and create a client
const {BigQuery} = require('@google-cloud/bigquery');
const bigquery = new BigQuery();

async function createDataset() {
  // Creates a new dataset named "my_dataset".

  /**
   * TODO(developer): Uncomment the following lines before running the sample.
   */
  // const datasetId = "my_new_dataset";

  // Specify the geographic location where the dataset should reside
  const options = {
    location: 'US',
  };

  // Create a new dataset
  const [dataset] = await bigquery.createDataset(datasetId, options);
  console.log(`Dataset ${dataset.id} created.`);
}
createDataset();
```

### REST

Call the `datasets.insert` method with a defined dataset resource.

## Options / Props

### Required permissions

| Item | Value |
|---|---|
| Permission | `bigquery.datasets.create` |
| Roles that include it | `roles/bigquery.dataEditor`, `roles/bigquery.dataOwner`, `roles/bigquery.user`, `roles/bigquery.admin` |

### Dataset naming

| Rule | Value |
|---|---|
| Uniqueness | Unique per project |
| Length | Up to 1,024 characters |
| Characters | Letters (upper or lower case), numbers, underscores. No spaces or special characters such as `-`, `&`, `@`, `%`. |
| Case | Case-sensitive by default (`mydataset` and `MyDataset` can coexist unless one has case-sensitivity turned off) |

### SQL option and bq flag placeholders

| Placeholder | Meaning |
|---|---|
| `KMS_KEY_NAME` | Default Cloud KMS key for new tables in the dataset. You cannot create a Google-encrypted table in a dataset with this set. |
| `PARTITION_EXPIRATION` | Default lifetime of partitions in new partitioned tables. SQL: days; bq: seconds. No minimum. A table-level partition expiration (`time_partitioning_expiration` / `--time_partitioning_expiration`) takes precedence. |
| `TABLE_EXPIRATION` | Default lifetime of new tables. SQL: days, minimum 0.042 (one hour); bq: seconds, minimum 3600. Applied when the table is created without its own expiration. |
| `LOCATION` | Dataset location; cannot be changed after creation. |
| `HOURS` | Time travel window in hours: an integer multiple of 24 (48, 72, 96, 120, 144, 168), between 48 and 168. Default 168. |
| `BILLING_MODEL` | `PHYSICAL` or `LOGICAL` (default `LOGICAL`). A change takes 24 hours to apply; wait 14 days before changing again. |

### Hidden datasets

| Restriction |
|---|
| Name begins with an underscore; hidden from the console Explorer panel. |
| Not in any `INFORMATION_SCHEMA` view. |
| Can't be used with linked datasets. |
| Can't be a source dataset for authorized datasets, authorized routines, or authorized views. |
| Don't appear in Knowledge Catalog. |
| Can't be the source dataset for a dataset replica. |

## Notes

- The creator of a dataset is automatically assigned `roles/bigquery.dataOwner` on it, so anyone able to create a dataset can also delete it.
- If you don't specify a location, the default location is used. Choosing `EU` or an EU-based region keeps Core BigQuery Customer Data in the EU.
- If your project is not associated with a billing account, BigQuery automatically sets the default table expiration for new datasets. You can specify a shorter default table expiration but not a longer one.
- Hidden datasets are also created automatically for cached query results. You can query their tables and views with the bq command-line tool or the API.
- Dataset limitations: location is fixed at creation; all tables in a query must be in the same location; external datasets don't support table expiration, replicas, time travel, default collation, default rounding mode, or case-insensitive table names; copying a table needs same-location datasets.
- Terraform: with `google_bigquery_dataset`, the dataset is automatically granted to members of project-level basic roles. The source recommends `google_bigquery_iam` resources for access, or `google_bigquery_dataset_access` when authorized objects such as authorized views are used. The Cloud Resource Manager API must be enabled. Terraform usage itself is in the `gcp-iac` skill.
- In the `bq mk` template, `[,...]` after `--add_tags=KEY_3:VALUE_3` marks repetition (comma-separated `KEY:VALUE` pairs); remove it before running.
- The source also shows Console steps, Terraform (dataset, IAM policy, CMEK), C#, Go, Java, PHP, and Ruby; they were omitted. The Terraform IAM example grants `roles/bigquery.admin`, which is not a recommendation.
- Try dataset-level changes on a disposable dataset first; the Python and Node.js samples create a dataset in `US`.
- Source: https://docs.cloud.google.com/bigquery/docs/datasets (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [datasets-intro.md](./datasets-intro.md)
- [time-travel.md](./time-travel.md)
- [resource-hierarchy.md](./resource-hierarchy.md)
