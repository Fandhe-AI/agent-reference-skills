---
source: https://docs.cloud.google.com/asset-inventory/docs/multiple-projects
---

# Multi-Project Setup (Billing Project) and Client Libraries

How to run Cloud Asset Inventory operations across projects (orchestrator project, cross-project export) and how to call the API from Cloud Client Libraries.

## Signature / Usage

### Orchestrator projects

When one project triggers exports to BigQuery / Cloud Storage or feed monitoring on resources in another project, set the billing project to the project containing the resources so that project's default Cloud Asset Inventory service account is used. If unset, the service account of the calling project is used and may lack permissions.

```bash
# gcloud flag
--billing-project=BILLING_PROJECT_ID

# or set it before running commands
gcloud config list
gcloud config set billing/quota_project BILLING_PROJECT_ID
```

REST header:

```
"X-Goog-User-Project: BILLING_PROJECT_ID"
```

`BILLING_PROJECT_ID` must have the Cloud Asset Inventory API enabled and a service account with permissions on the target Pub/Sub topic, Cloud Storage bucket, or BigQuery table.

### Export across projects (PROJECT_A to PROJECT_B)

1. Enable the Cloud Asset Inventory API in `PROJECT_A`.
2. Make at least one API call in `PROJECT_A` to create the default service account, or create it manually:

```bash
gcloud beta services identity create \
    --service=cloudasset.googleapis.com \
    --project=PROJECT_A_ID
gcloud projects add-iam-policy-binding PROJECT_A_ID \
    --member=serviceAccount:service-PROJECT_A_NUMBER@gcp-sa-cloudasset.iam.gserviceaccount.com \
    --role=roles/cloudasset.serviceAgent
```

Find a project number:

```bash
gcloud projects describe PROJECT_ID --format="value(projectNumber)"
```

3. Grant roles to the `PROJECT_A` service account on `PROJECT_B` resources:

```bash
# Pub/Sub feed
gcloud pubsub topics add-iam-policy-binding projects/PROJECT_B_ID/topics/TOPIC_ID \
    --member=serviceAccount:service-PROJECT_A_NUMBER@gcp-sa-cloudasset.iam.gserviceaccount.com \
    --role=roles/pubsub.publisher

# Cloud Storage bucket
gcloud storage buckets add-iam-policy-binding gs://BUCKET_NAME \
  --member=serviceAccount:service-PROJECT_A_NUMBER@gcp-sa-cloudasset.iam.gserviceaccount.com \
  --role=roles/storage.admin

# BigQuery table
gcloud projects add-iam-policy-binding PROJECT_B_ID \
    --member=serviceAccount:service-PROJECT_A_NUMBER@gcp-sa-cloudasset.iam.gserviceaccount.com \
    --role=roles/bigquery.dataEditor
gcloud projects add-iam-policy-binding PROJECT_B_ID \
    --member=serviceAccount:service-PROJECT_A_NUMBER@gcp-sa-cloudasset.iam.gserviceaccount.com \
    --role=roles/bigquery.user
```

If you call from `PROJECT_B` with gcloud, or use REST, specify `PROJECT_A` as the billing project.

### Client libraries

Install (Cloud Client Libraries; Java uses Maven artifact `google-cloud-asset`):

```bash
dotnet add package Google.Cloud.Asset.V1
go get cloud.google.com/go/asset/apiv1
npm install @google-cloud/asset
composer require google/cloud-asset
pip install --upgrade google-cloud-asset
gem install google-cloud-asset
```

Local Application Default Credentials:

```bash
gcloud init
gcloud auth application-default login
```

Python `ListAssets` sample:

```python
from google.cloud import asset_v1

# TODO project_id = 'Your Google Cloud Project ID'
# TODO asset_types = 'Your asset type list, e.g.,
# ["storage.googleapis.com/Bucket","bigquery.googleapis.com/Table"]'
# TODO page_size = 'Num of assets in one page, which must be between 1 and
# 1000 (both inclusively)'
# TODO content_type ="Content type to list"

project_resource = f"projects/{project_id}"
client = asset_v1.AssetServiceClient()

# Call ListAssets v1 to list assets.
response = client.list_assets(
    request={
        "parent": project_resource,
        "read_time": None,
        "asset_types": asset_types,
        "content_type": content_type,
        "page_size": page_size,
    }
)

for asset in response:
    print(asset)
```

Node.js `ListAssets` sample:

Adapted (not in the official docs): `getProjectId()` and the request preparation moved inside `listAssets()` (no top-level `await` in CommonJS), and `assetTypes` / `contentType` are declared as function parameters.

```javascript
const util = require('util');
const {v1} = require('@google-cloud/asset');
const client = new v1.AssetServiceClient();

// assetTypes: comma-separated asset types (may be empty); contentType: e.g. 'RESOURCE'
async function listAssets(assetTypes, contentType) {
  const projectId = await client.getProjectId();
  const projectResource = `projects/${projectId}`;
  const assetTypesList = assetTypes ? assetTypes.split(',') : [];

  const request = {
    parent: projectResource,
    assetTypes: assetTypesList,
    contentType: contentType,
    // (Optional) Add readTime parameter to list assets at the given time instead of current time:
    //   readTime: { seconds: 1593988758 },
  };

  // Call cloud.assets.v1.ListAssets API.
  const result = await client.listAssets(request);
  // Handle the response.
  console.log(util.inspect(result, {depth: null}));
}
listAssets('compute.googleapis.com/Instance', 'RESOURCE');
```

## Options / Props

| Scenario | Required role for the service agent |
|----------|-------------------------------------|
| Publish a feed to Pub/Sub in another project | `roles/pubsub.publisher` on the topic |
| Export to Cloud Storage in another project | `roles/storage.admin` on the bucket |
| Export to BigQuery in another project | `roles/bigquery.dataEditor` and `roles/bigquery.user` on the project |

## Notes

- `roles/storage.admin` on the bucket and project-level BigQuery roles are broad; scope them to the minimum bucket/project and remove after use where possible.
- Setting a billing project always is good practice to minimize confusion.
- Adapted from the official docs: the Node.js sample moves `getProjectId()` into `listAssets()` and declares `assetTypes` / `contentType` as parameters, so it runs as a CommonJS script.
- The Node.js and Python samples above omit the official TODO variable comments for brevity; official samples also exist for C#, Go, Java, PHP, and Ruby. The client libraries authenticate through Application Default Credentials (ADC).
- Source: https://docs.cloud.google.com/asset-inventory/docs/multiple-projects, https://docs.cloud.google.com/asset-inventory/docs/client-libraries (retrieved 2026-11-14; CC BY 4.0, code samples Apache 2.0)

## Related

- [feeds-pubsub.md](./feeds-pubsub.md)
- [export-to-bigquery.md](./export-to-bigquery.md)
- [export-to-cloud-storage.md](./export-to-cloud-storage.md)
