---
source: https://docs.cloud.google.com/asset-inventory/docs/monitor-asset-changes
---

# Monitor Asset Changes with Feeds (Pub/Sub)

Create a feed to receive real-time Pub/Sub notifications when resources, IAM policies, access policies, or organization policies change in an organization, folder, or project. Feeds can carry CEL conditions.

## Signature / Usage

The first message on the topic is a welcome string; all later messages are `TemporalAsset` JSON. Sample message for the `RESOURCE` content type:

```json
{
  "asset":{
    "ancestors":[
      "projects/000000000000",
      "folders/000000000000",
      "organizations/000000000000"
    ],
    "assetType":"storage.googleapis.com/Bucket",
    "name":"//storage.googleapis.com/my-bucket",
    "resource":{
      "data":{
        LATEST_ASSET_METADATA
      },
      "discoveryDocumentUri":"https://www.googleapis.com/discovery/v1/apis/storage/v1/rest",
      "discoveryName":"Bucket",
      "location":"us",
      "parent":"//cloudresourcemanager.googleapis.com/projects/000000000000",
      "version":"v1"
    },
    "updateTime":"2024-01-30T00:00:00.000000Z"
  },
  "priorAsset":{
    "assetType":"storage.googleapis.com/Bucket",
    "name":"//storage.googleapis.com/my-bucket",
    "resource":{
      "data":{
        PREVIOUS_ASSET_METADATA
      }
    },
    "updateTime":"2024-01-29T00:00:00.000000Z"
  },
  "priorAssetState":"PRESENT",
  "window":{
    "startTime":"2024-01-30T00:00:00.000000Z"
  }
}
```

Prerequisites: enable the Cloud Asset Inventory API, hold the required role, and create a Pub/Sub topic.

### Create a feed

```bash
gcloud asset feeds create FEED_ID \
    --SCOPE \
    --billing-project=BILLING_PROJECT_ID \
    --pubsub-topic=projects/TOPIC_PROJECT_ID/topics/TOPIC_ID \
    --asset-names=ASSET_NAME_1,ASSET_NAME_2,... \
    --asset-types=ASSET_TYPE_1,ASSET_TYPE_2,... \
    --content-type=CONTENT_TYPE \
    --relationship-types=RELATIONSHIP_TYPE_1,RELATIONSHIP_TYPE_2,... \
    --condition-title="CONDITION_TITLE" \
    --condition-description="CONDITION_DESCRIPTION" \
    --condition-expression="CONDITION_EXPRESSION"
```

Example (bucket `my-bucket` plus any BigQuery table):

```bash
gcloud asset feeds create my-feed \
    --project=my-project \
    --pubsub-topic=projects/my-project/topics/my-topic \
    --asset-names=//storage.googleapis.com/my-bucket \
    --asset-types=bigquery.googleapis.com/Table \
    --content-type=resource
```

Response:

```
assetNames:
- //storage.googleapis.com/my-bucket
assetTypes:
- bigquery.googleapis.com/Table
condition: {}
contentType: RESOURCE
feedOutputConfig:
  pubsubDestination:
    topic: projects/my-project/topics/my-topic
name: projects/000000000000/feeds/my-feed
```

REST create:

```bash
curl -X POST \
     -H "X-Goog-User-Project: BILLING_PROJECT_ID" \
     -H "Authorization: Bearer $(gcloud auth print-access-token)" \
     -H "Content-Type: application/json; charset=utf-8" \
     -d '{
            "feedId": "my-feed",
            "feed": {
              "assetNames": [
                "//storage.googleapis.com/my-bucket"
              ],
              "assetTypes": [
                "bigquery.googleapis.com/Table"
              ],
              "contentType": "RESOURCE",
              "feedOutputConfig": {
                "pubsubDestination": {
                  "topic": "projects/my-project/topics/my-topic"
                }
              }
            }
          }' \
     https://cloudasset.googleapis.com/v1/projects/my-project/feeds
```

### Get, list, update, delete

```bash
gcloud asset feeds describe FEED_ID \
    --SCOPE \
    --billing-project=BILLING_PROJECT_ID

gcloud asset feeds list \
    --SCOPE \
    --billing-project=BILLING_PROJECT_ID

gcloud asset feeds update FEED_ID \
    --SCOPE \
    --billing-project=BILLING_PROJECT_ID \
    --pubsub-topic=projects/TOPIC_PROJECT_ID/topics/TOPIC_ID \
    --clear-asset-names \
    --add-asset-names=ASSET_NAME_1,ASSET_NAME_2,... \
    --remove-asset-names=ASSET_NAME_3,ASSET_NAME_4,... \
    --clear-asset-types \
    --add-asset-types=ASSET_TYPE_1,ASSET_TYPE_2,... \
    --remove-asset-types=ASSET_TYPE_3,ASSET_TYPE_4,... \
    --clear-content-type \
    --content-type=CONTENT_TYPE \
    --clear-relationship-types \
    --remove-relationship-types=RELATIONSHIP_TYPE_1,RELATIONSHIP_TYPE_2,... \
    --add-relationship-types=RELATIONSHIP_TYPE_1,RELATIONSHIP_TYPE_2,...

gcloud asset feeds delete FEED_ID \
    --SCOPE \
    --billing-project=BILLING_PROJECT_ID
```

Update example:

```bash
gcloud asset feeds update my-feed \
    --project=my-project \
    --pubsub-topic=projects/my-project/topics/my-topic \
    --clear-asset-names \
    --add-asset-types=gkemulticloud.googleapis.com/AttachedCluster
```

REST equivalents (`GET`, `PATCH`, `DELETE` on the feed resource):

```bash
curl -X GET \
     -H "X-Goog-User-Project: BILLING_PROJECT_ID" \
     -H "Authorization: Bearer $(gcloud auth print-access-token)" \
     https://cloudasset.googleapis.com/v1/projects/my-project/feeds/my-feed

curl -X DELETE \
     -H "X-Goog-User-Project: BILLING_PROJECT_ID" \
     -H "Authorization: Bearer $(gcloud auth print-access-token)" \
     https://cloudasset.googleapis.com/v1/projects/000000000000/feeds/my-feed
```

### Feed conditions (CEL)

Examples from the official page:

```
temporal_asset.deleted == false &&
temporal_asset.prior_asset_state == google.cloud.asset.v1.TemporalAsset.PriorAssetState.DOES_NOT_EXIST

"folders/12345" in temporal_asset.asset.ancestors ||
"folders/23456" in temporal_asset.asset.ancestors

size(temporal_asset.asset.resource.data.allowed) >
size(temporal_asset.prior_asset.resource.data.allowed)

temporal_asset.asset.resource.data.machineType.endsWith('/machineTypes/n1-standard-1')

temporal_asset.asset.iam_policy.bindings.exists(b, b.members.exists(m, m == "allUsers"))

temporal_asset.deleted == true && temporal_asset.prior_asset_state == google.cloud.asset.v1.TemporalAsset.PriorAssetState.PRESENT && "test" in temporal_asset.prior_asset.resource.data.labels
```

Handle unset fields (include unlabeled assets when excluding label `xyz`):

```
(has(temporal_asset.asset.resource.data) && (!has(temporal_asset.asset.resource.data.labels) || !('xyz' in temporal_asset.asset.resource.data.labels)))
```

## Options / Props

| Flag / field | Description |
|--------------|-------------|
| `SCOPE` | `project=PROJECT_ID`, `folder=FOLDER_ID`, or `organization=ORGANIZATION_ID` |
| `FEED_ID` | Unique feed identifier |
| `--billing-project` | Optional; project of the default Cloud Asset Inventory service agent that can manage your Pub/Sub topic |
| `--pubsub-topic` | `projects/TOPIC_PROJECT_ID/topics/TOPIC_ID` |
| `--asset-names` | Comma-separated full asset names |
| `--asset-types` | Comma-separated asset types; RE2 regular expressions supported; a regex matching no supported type returns `INVALID_ARGUMENT`; omitted means all types. At least one of asset names or asset types is required |
| `--content-type` | Content type; omitted returns basic information only |
| `--relationship-types` | Needs Security Command Center Premium or Enterprise and `--content-type=RELATIONSHIP` |
| `--condition-title/-description/-expression` | Optional CEL condition |

Condition variables: `temporal_asset` (most recent change as `TemporalAsset`; sent if the condition is true). Supported CEL pieces: variables, operators, functions (for example `contains`, `endsWith`, `exists`, `has`, `size`), logical `&&` and `||`.

Feed log fields (`jsonPayload`): `name` (`projects|folders|organizations/.../feeds/FEED_ID`), `asset_name`, `condition` (`Expr`), `error_status` (`Status`), `feed_output_config` (`FeedOutputConfig`).

## Notes

- Limits: feed create/update/delete can take up to 10 minutes to take effect; the project holding the feed must outlive it (its service account publishes to the topic; the feed is deleted once the project is permanently deleted); up to 200 feeds per parent (children not counted).
- Condition limits: 3,000 characters; most variables are lowercase_with_underscores except sub-fields of `data`, which are camelCase (`exampleVariable`); validation at create/update is not comprehensive, especially for the dynamically typed `temporal_asset.asset.resource.data`; evaluation errors suppress notifications (errors are logged); conditions on absent fields in `data` raise runtime errors, so add `has()` checks; static enums can be written as fully qualified names or raw integers, dynamic enums in `data` are raw strings (for example `lifecycleState == "ACTIVE"`). Prefer filtering with `--asset-types` / `--content-type` over conditions where possible.
- Troubleshooting: feeds fire only on metadata changes (uploading an object to a bucket is not a metadata change); asset must match a configured name or type; for project deletion, `deleted` is not set until permanent deletion (30-day undo), so monitor `temporal_asset.asset.resource.data.lifecycleState == "DELETE_REQUESTED"`; check Cloud Logging by selecting the `Cloud Pub/Sub Topic` resource and the topic ID. Logging is enabled by default; non-UTF-8 characters are replaced with `?`.
- A Pub/Sub message exceeding Pub/Sub size limits is discarded (see quota page).
- Source: https://docs.cloud.google.com/asset-inventory/docs/monitor-asset-changes (retrieved 2026-11-14; CC BY 4.0, code samples Apache 2.0)

## Related

- [audit-logging-quota.md](../asset-inventory-core/audit-logging-quota.md)
- [access-control-quotas.md](../asset-inventory-core/access-control-quotas.md)
- [asset-types-names.md](../asset-inventory-core/asset-types-names.md)
- [billing-project-and-client-libraries.md](./billing-project-and-client-libraries.md)
