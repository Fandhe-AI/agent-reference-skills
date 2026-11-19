---
source: https://docs.cloud.google.com/knowledge-catalog/docs/metadata-change-feeds-overview
---

# Metadata change feeds overview

Metadata change feeds publish a Pub/Sub notification in near real time whenever an entry or aspect is created, updated or deleted within a scope (organization, projects or entry groups), so you can build event-driven workflows. In the API the resource is `metadataFeeds` (`projects/PROJECT_ID/locations/LOCATION/metadataFeeds/FEED_ID`).

## Signature / Usage

### Feed configuration (scope, filters, destination)

This example monitors projects `PROJECT_ID_1` and `PROJECT_ID_2` for `CREATE` events and sends notifications to `TOPIC_ID`.

```json
{
  "scope": {
    "projects": [
      "projects/PROJECT_ID_1",
      "projects/PROJECT_ID_2"
    ]
  },
  "filters": {
    "changeTypes": [
      "CREATE"
    ]
  },
  "pubsubTopic": "projects/PROJECT_ID_PUBSUB/topics/TOPIC_ID"
}
```

### Message attributes (entry creation event)

```json
{
  "feed_name": "projects/PROJECT_ID/locations/LOCATION/metadataFeeds/FEED_ID",
  "entry_change_type": "CREATE",
  "timestamp": "2026-02-03T23:12:03.054469Z",
  "entry_type": "projects/PROJECT_NUMBER/locations/global/entryTypes/ENTRY_TYPE_ID"
}
```

### Data payload

```json
{
  "entryName": "projects/PROJECT_ID/locations/LOCATION/entryGroups/ENTRY_GROUP_ID/entries/ENTRY_ID",
  "fullyQualifiedName": "bigquery:PROJECT_ID.DATASET_ID.TABLE_ID",
  "updatedAspects": [
    "projects/PROJECT_NUMBER/locations/global/aspectTypes/updated-aspect-type"
  ],
  "createdAspects": [
    "projects/PROJECT_NUMBER/locations/global/aspectTypes/created-aspect-type"
  ],
  "deletedAspects": [
    "projects/PROJECT_NUMBER/locations/global/aspectTypes/deleted-aspect-type"
  ]
}
```

## Options / Props

### Feed configuration

| Part | Description | Resource name format |
|---|---|---|
| Scope | Resources to monitor: organization, specific projects or specific entry groups | `projects/PROJECT_ID/locations/LOCATION/entryGroups/ENTRY_GROUP_ID` (entry group example) |
| Filters | Entry type, aspect type or change type (`CREATE`, `UPDATE`, `DELETE`); with no filters all change types in scope notify | `projects/PROJECT_ID/locations/global/entryTypes/ENTRY_TYPE` (entry type example) |
| Destination | Pub/Sub topic that receives notifications | `projects/PROJECT_ID/topics/TOPIC_ID` |

### Message attributes

| Attribute | Description |
|---|---|
| `timestamp` | When the change happened |
| `entry_name` | `projects/PROJECT_ID/locations/LOCATION/entryGroups/ENTRY_GROUP_ID/entries/ENTRY_ID` |
| `feed_name` | `projects/PROJECT_ID/locations/LOCATION/metadataFeeds/FEED_ID` |
| `entry_type` | `projects/PROJECT_NUMBER/locations/LOCATION/entryTypes/ENTRY_TYPE_ID` |
| `entry_change_type` | `CREATE`, `UPDATE` or `DELETE` |

### Limitations

| Area | Behavior |
|---|---|
| Delivery | At least once; handle duplicates in the subscriber |
| Ordering | Not guaranteed |
| Latency | Near real-time |
| Activation delay | A new or updated feed can take up to 10 minutes to become active (backend caching) |
| Payload | Only change signatures (entry name, entry type, change type, changed aspect types or keys); call `GetEntry` for current state |
| Generic storage aspects | Not supported |

## Notes

- Corrected from the official docs: the page's attributes table gives `feed_name` as `.../metadataChangeFeeds/FEED_ID` and `entry_change_type` as `CREATED`, `UPDATED` or `DELETED`. Its own example message uses `metadataFeeds` and `CREATE`, and the API schema defines the resource as `metadataFeeds` with change types `CREATE`, `UPDATE`, `DELETE` (rest-schemas/dataplex/dataplex-2.md, `GoogleCloudDataplexV1MetadataFeed`), so the table uses those.
- Use cases: metadata sync to an external catalog or search index, policy enforcement when a data classification aspect changes, data quality automation, ETL/ELT triggering, auditing to an audit table.
- VPC Service Controls: feeds are compliant. An organization-scoped feed notifies only for projects within the feed's perimeter; for project- or entry-group-scoped feeds, all specified projects or entry groups must be in the same perimeter as the feed or creation fails.
- Pricing: no additional charge for feeds, but Pub/Sub message delivery, storage and data egress are billed. Pub/Sub itself is in `gcp-messaging-workflows`.
- The source also shows an architecture diagram. For quotas see the Knowledge Catalog quotas and limits page.
- Source: https://docs.cloud.google.com/knowledge-catalog/docs/metadata-change-feeds-overview (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [vpc-sc.md](./vpc-sc.md)
- [audit-logging.md](./audit-logging.md)
