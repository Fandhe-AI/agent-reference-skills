---
source: https://docs.cloud.google.com/knowledge-catalog/docs/use-data-products
---

# Use data products (consumer guide)

Data product consumers find curated asset collections, request access through built-in approval workflows, and then query the underlying data (such as BigQuery tables) with their user credentials, a service account, or a remote Model Context Protocol (MCP) server.

## Signature / Usage

### Search for data products (REST)

Uses the `searchEntries` method:

Adapted (not in the official docs): `query` and `pageSize` are sent as query parameters (`-G` with `--data-urlencode`) because `searchEntries` has no request body; `-X POST` keeps the method `POST` (as defined for `searchEntries`) and `Content-Length: 0` marks the empty body.

```bash
curl -X POST -G \
-H "Authorization: Bearer $(gcloud auth print-access-token)" \
-H "Content-Length: 0" \
--data-urlencode 'query=ADDITIONAL_KEYWORDS (type=(DATA_PRODUCT))' \
--data-urlencode 'pageSize=10' \
"https://dataplex.googleapis.com/v1/projects/PROJECT_ID/locations/global:searchEntries"
```

`ADDITIONAL_KEYWORDS` is optional extra criteria (for example `displayName:'My Data Product'` or `description:'sales'`); `PROJECT_ID` is the project in which the data product is created.

### Request access (REST)

Consumers with the `dataplex.dataProducts.get` permission create a `ChangeRequest` with the custom method `:requestAccess`:

Adapted (not in the official docs): JSON keys are camelCase as defined by the API schema (`changeRequest`, `dataProductAccessRequest`, `accessGroupId`), and the top-level `parent` is removed because the parent is the URL.

```bash
curl -X POST \
-H "Authorization: Bearer $(gcloud auth print-access-token)" \
-H "Content-Type: application/json" \
-d '{
  "changeRequest": {
    "justification": "JUSTIFICATION_TEXT",
    "dataProductAccessRequest": {
      "parent": "projects/PROJECT_ID/locations/LOCATION/dataProducts/DATA_PRODUCT_ID",
      "accessGroupId": "DATA_PRODUCT_ACCESS_GROUP_ID"
    }
  }
}' \
"https://dataplex.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/dataProducts/DATA_PRODUCT_ID:requestAccess"
```

### View access requests (REST)

The page describes a custom collection method `:listMine`, which is not in the Discovery document (see Notes). List the requests you authored with `changeRequests.list` and its `author` filter:

Adapted (not in the official docs): `changeRequests.list` with the `author` filter replaces the page's `changeRequests:listMine` request.

```bash
curl -X GET -G \
-H "Authorization: Bearer $(gcloud auth print-access-token)" \
--data-urlencode 'filter=author=REQUESTER_EMAIL' \
"https://dataplex.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/changeRequests"
```

Get one request by the ID returned when it was created:

```bash
curl -X GET \
-H "Authorization: Bearer $(gcloud auth print-access-token)" \
-H "Content-Type: application/json" \
"https://dataplex.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/changeRequests/CHANGE_REQUEST_ID"
```

### Access assets with a service account

If the request was approved for a service account, you receive `roles/iam.serviceAccountTokenCreator` on the data producer service account. Create an impersonation chain:

```bash
gcloud config set auth/impersonate_service_account CONSUMER_SERVICE_ACCOUNT,PRODUCER_SERVICE_ACCOUNT
```

`CONSUMER_SERVICE_ACCOUNT` is the fully qualified email of the consumer's service account; `PRODUCER_SERVICE_ACCOUNT` is the one mapped to the data product access group (see the **Data Assets** tab of the data product).

## Options / Props

### Required roles

| Role | Role ID | Purpose |
|------|---------|---------|
| Dataplex Catalog Viewer | `roles/dataplex.catalogViewer` | Search for data products |
| Dataplex Data Products Consumer | `roles/dataplex.dataProductsConsumer` | Search for data assets and request access |
| Dataplex Data Products Viewer | `roles/dataplex.dataProductsViewer` | Read-only view of data product definitions and metadata |

### Access request statuses

| Where | Status | Meaning |
|-------|--------|---------|
| Governance workflows, **My requests** | New | Created, pending review by the approver |
| Governance workflows, **My requests** | Approved | Approved; backend systems are still provisioning access |
| Governance workflows, **My requests** | Rejected | Denied; see the approver's comments |
| Data product **Access summary** | No Access | No access and no request yet |
| Data product **Access summary** | Under review | Request submitted, pending review |
| Data product **Access summary** | Approved | Approved; membership propagation to the Google Group is still processing |
| Data product **Access summary** | Access granted | Access is fully active |
| Data product **Access summary** | Rejected | Request for this access group was rejected |

## Notes

- Adapted from the official docs: the page's `requestAccess` body uses snake_case keys (`change_request`, `data_product_access_request`, `access_group_id`) and an extra top-level `parent`. The schema fields are `changeRequest` and `validateOnly` for `RequestDataProductAccessRequest` and `justification`, `dataProductAccessRequest` (`parent`, `accessGroupId`, optional `requestedPrincipal`) for the change request (rest-schemas/dataplex/dataplex-2.md, dataplex-1.md); the data product is in the URL. The page's `changeRequests:listMine` request is replaced by `changeRequests.list` with `filter` on `author` (rest/dataplex/dataplex-1.md).
- Adapted from the official docs: the page sends `{"query": ..., "pageSize": 10}` as a JSON body of `searchEntries`; the method has no request body and `query`, `pageSize`, `scope`, `semanticSearch` are query parameters (rest/dataplex/dataplex-2.md, `projects.locations.searchEntries`).
- Source: https://docs.cloud.google.com/knowledge-catalog/docs/use-data-products (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)
- Enable the Dataplex and BigQuery APIs first (needs `serviceusage.services.enable`, for example via `roles/serviceusage.serviceUsageAdmin`). Grant roles on the data product or the project.
- To view the metadata of an asset you also need `viewer` access to it in the source system; for BigQuery datasets and tables that is `roles/bigquery.metadataViewer`.
- The dataplex v1 Discovery document (revision 20261106) lists `list`, `get`, `patch`, `approve`, `reject`, `delete` and IAM methods for `changeRequests` but no `listMine`; the page (retrieved 2026-11-19) documents `:listMine`.
- Service-account access: to query BigQuery objects that require job creation, grant `roles/bigquery.jobUser` to both producer and consumer service accounts in the project where the query runs.
- Access requests for a service account are only possible when the data product supports service accounts. After approval the requester can open assets from the **Assets** tab; BigQuery tables and views offer **Open in BigQuery**.
- Remote MCP server access is Preview ("Pre-GA Offerings Terms"); see the Knowledge Catalog remote MCP server page.
- The source also shows Console steps and deletion of an access request in the console.
- The underlying BigQuery tables are covered by the gcp-bigquery skill.

## Related

- [data-products-overview.md](./data-products-overview.md)
- [manage-requests.md](./manage-requests.md)
- [about-governance-workflows.md](./about-governance-workflows.md)
