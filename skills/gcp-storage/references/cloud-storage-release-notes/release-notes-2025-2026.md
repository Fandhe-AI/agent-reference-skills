---
source: https://docs.cloud.google.com/storage/docs/release-notes
---

# Cloud Storage release notes (2025-2026)

Production updates to Cloud Storage dated January 2025 through November 4, 2026, one line per entry (date, entry type as labeled in the source, summary). Weekly client-library digest entries are omitted. Older notes are on the official page.

## Signature / Usage

The 2025-2026 entries contain no gcloud commands. The command below, from the Storage Insights dataset configuration guide, links a dataset to BigQuery (see the 2025 and 2026 Storage Insights datasets entries).

```bash
gcloud storage insights dataset-configs create-link DATASET_CONFIG_ID --location=LOCATION
```

Snippet taken from https://docs.cloud.google.com/storage/docs/insights/configure-datasets

## Options / Props

### 2026

| Date | Type | Summary |
|------|------|---------|
| Nov 04, 2026 | Feature | Pause hard deletions for a bucket to get more time to restore soft-deleted objects ("Pause permanent (hard) deletions of soft-deleted objects") |
| Oct 30, 2026 | Feature | Cloud Storage MCP server adds the `get_bucket_metadata` tool; `list_buckets`, `get_object_metadata`, and `list_objects` now return detailed metadata |
| Oct 30, 2026 | Feature | Security and compliance findings in Storage Intelligence advisor (Preview): find buckets with objects violating default CMEK policies or enforced encryption rules and re-encrypt them |
| Oct 13, 2026 | Feature | Object enrichments (Preview): pre-trained ML models attach metadata to images and PDFs as object contexts |
| Oct 13, 2026 | Feature | Object contexts with extended data (Preview); retrieve with the `viewFullContext` JSON API method |
| Oct 13, 2026 | Feature | Storage Insights datasets add the Object Contexts Catalog view (`object_contexts_catalog_view`) |
| Sep 30, 2026 | Feature | Client libraries provide automated end-to-end checksumming by default for reads and writes |
| Sep 10, 2026 | Feature | Storage Intelligence advisor is generally available |
| Sep 03, 2026 | Feature | Storage batch operations: CEL filters on Storage Insights dataset fields, up to 1,000 buckets per job, bulk storage class transitions, bulk ACL patches, dry run across buckets and creating jobs from a dry run |
| Aug 21, 2026 | Feature | Rapid Cache supports prefix-level ingest-on-write filtering |
| Aug 17, 2026 | Feature | Buckets with soft delete enabled are retained for a limited time after project deletion and restored if the project is restored |
| Jul 20, 2026 | Feature | Object Lifecycle Management conditions `sizeAboveBytes` and `sizeBelowBytes` |
| Jun 17, 2026 | Feature | Creating composite objects can delete the temporary source objects |
| May 28, 2026 | Breaking | As of August 26, 2026, in hierarchical namespace buckets the Object Lifecycle Management `Delete` action deletes empty folders that meet all conditions of the rule |
| Apr 29, 2026 | Feature | Manage object contexts in the Google Cloud console |
| Apr 27, 2026 | Feature | AI zones support |
| Apr 20, 2026 | Feature | Cloud Storage Model Context Protocol (MCP) server is generally available |
| Apr 08, 2026 | Feature | Multi-object delete XML API: up to 1,000 objects per request; works with Amazon S3-compatible tools |
| Apr 06, 2026 | Feature | Storage batch operations can update object contexts for multiple objects |
| Apr 06, 2026 | Feature | Object contexts are generally available; preserved by default on copy, rewrite, and compose; control with the `dropContextGroups` JSON API parameter |
| Apr 02, 2026 | Feature | Configure allowed or prohibited encryption types for new objects in a bucket |
| Mar 31, 2026 | Feature | Storage Insights datasets: identifying publicly accessible objects is GA; new bucket and object schema fields `encryption`, `retentionPeriod`, `encryptionType`, `retentionExpirationTime` |
| Mar 24, 2026 | Announcement | Anywhere Cache has been renamed to Rapid Cache |
| Mar 12, 2026 | Change | Object uploads using CMEK now fail if the Cloud Storage service agent lacks the IAM role to decrypt the object |
| Mar 10, 2026 | Feature | Rapid Bucket is generally available (Rapid storage class, zone as bucket location) |
| Mar 06, 2026 | Feature | Identify publicly accessible objects with Storage Insights datasets (Preview) |
| Mar 05, 2026 | Feature | Analyze object data and metadata from datasets with BigQuery `ObjectRef` functions (`ref` column) |
| Jan 30, 2026 | Announcement | Object change notification is deprecated; use Pub/Sub notifications for Cloud Storage |
| Jan 28, 2026 | Feature | Partial success option when listing buckets returns available buckets plus names of unreachable ones |
| Jan 21, 2026 | Feature | Bucket relocation with write downtime supports completed multipart uploads |
| Jan 20, 2026 | Feature | Support in Thailand, Bangkok (`asia-southeast3`) |
| Jan 16, 2026 | Feature | Dry run mode for storage batch operations jobs |
| Jan 15, 2026 | Feature | Bulk restore of soft-deleted objects: restore objects that were live at a specific time or by creation time |

### 2025

| Date | Type | Summary |
|------|------|---------|
| Dec 16, 2025 | Feature | Storage Insights datasets for activity data (object mutations, errors, activity trends) |
| Dec 16, 2025 | Feature | Rapid Cache can serve BigQuery object read requests |
| Nov 14, 2025 | Feature | Relocate buckets in the Google Cloud console |
| Nov 11, 2025 | Feature | Autoclass for buckets with hierarchical namespace enabled |
| Oct 23, 2025 | Feature | Storage batch operations can manage object retention configurations with the `PutMetadata` transformation |
| Sep 30, 2025 | Feature | Object contexts in Preview |
| Sep 17, 2025 | Feature | `bucket_attributes_view` and `bucket_attributes_latest_snapshot_view` add `objectCount` and `totalSize` |
| Sep 10, 2025 | Feature | Cloud Storage FUSE buffered reads (two to five times faster sequential reads of large files) |
| Aug 28, 2025 | Change | From October 31, 2025, an Object Lifecycle Management `age` condition of `0` is satisfied at midnight UTC after object creation |
| Aug 12, 2025 | Feature | Anywhere Cache in `asia-south1-b` and `asia-south1-c` |
| Aug 11, 2025 | Feature | Anywhere Cache in `asia-south1-a` |
| Jul 14, 2025 | Feature | Datasets add `bucket_attributes_latest_snapshot_view` and `object_attributes_latest_snapshot_view`; `events_view` adds `globalManifest.snapshotTime` and `eventCode` |
| Jul 08, 2025 | Feature | Anywhere Cache in `us-west3-a`, `us-west3-b`, `us-west3-c` |
| Jul 02, 2025 | Feature | Bucket IP filtering is generally available |
| Jun 23, 2025 | Feature | Cloud Audit Logs cover error scenarios with fuller error messages (analyzable by Gemini Cloud Assist) |
| Jun 16, 2025 | Feature | Cloud Storage FUSE version 3.0: automated configurations, performance tuning guide, `global-max-blocks` option |
| Jun 05, 2025 | Change | Limit for `matchesPrefix` / `matchesSuffix` lifecycle prefixes and suffixes across all rules raised from 50 to 1,000 |
| Apr 17, 2025 | Change | Best practices for media workloads published |
| Mar 31, 2025 | Feature | Cloud Storage FUSE metrics |
| Mar 31, 2025 | Feature | Storage batch operations generally available |
| Mar 31, 2025 | Change | Bucket IP filtering: all regions, dual-regions, multi-regions; custom organization policies can enforce it |
| Mar 21, 2025 | Feature | Cross-bucket replication is GA |
| Mar 21, 2025 | Feature | Storage Intelligence is GA |
| Mar 21, 2025 | Feature | Storage Insights datasets is GA (Storage Intelligence subscription only) |
| Mar 17, 2025 | Feature | `DE` configurable dual-region code (`europe-west3` Frankfurt and `europe-west10` Berlin) |
| Mar 13, 2025 | Feature | Anywhere Cache is generally available |
| Mar 05, 2025 | Feature | Configurable dual-regions include Turin, Italy (`europe-west12`) |
| Mar 04, 2025 | Feature | Support in Stockholm, Sweden (`europe-north2`) |
| Feb 26, 2025 | Feature | Bucket relocation is GA |
| Feb 24, 2025 | Feature | `Objects: move` supports flat and hierarchical namespace buckets |
| Feb 05, 2025 | Announcement | Billing changes for accessing Cloud Storage through BigQuery take effect Feb 21, 2025 (originally Feb 01, 2025) |
| Jan 31, 2025 | Feature | Client-side traces with OpenTelemetry in the client libraries |

## Notes

- Entry types are copied from the source (Feature, Change, Breaking, Announcement). Summaries are abbreviated; feature names are verbatim.
- Weekly "Libraries" digests (per-language client library changelogs, for example the Java 2.61.0 entry dated December 22, 2025) are not summarized.
- Several 2025 and 2026 entries refer to Anywhere Cache; it was renamed Rapid Cache on March 24, 2026 and `anywhere-cache` pages in the docs may still use the old name.
- The May 28, 2026 entry changes behavior: from August 26, 2026, lifecycle `Delete` removes empty folders in hierarchical namespace buckets, which is destructive; test lifecycle rules on a disposable bucket first.
- Older notes (2024 and earlier) are at the official URL.
- Distance: Cloud Storage is Google Cloud's object storage; distinct from Cloudflare R2 (`cloudflare-storage`) and Supabase Storage (`supabase`).
- Source: https://docs.cloud.google.com/storage/docs/release-notes (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/storage/docs/insights/configure-datasets (snippet)

## Related

- Machine-readable feed: https://docs.cloud.google.com/feeds/storage-release-notes.xml
