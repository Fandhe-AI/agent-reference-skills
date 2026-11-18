---
source: https://docs.cloud.google.com/eventarc/docs/path-patterns
---

# Eventarc Path Patterns

Preview. A path pattern is an expression applied when filtering events, so a trigger can match a single resource (for example, one file) or a broader set. Apply one in the Eventarc console page or with `gcloud` (`--event-filters-path-pattern`). It applies to `resourceName` values of Cloud Audit Logs events, to `instance` and `ref` values of Firebase Realtime Database events, and to `registry` and `device` values of Cloud IoT events.

## Signature / Usage

### Check whether an attribute supports a path pattern

Describe the event provider; `pathPatternSupported: true` indicates a path pattern can be applied:

```bash
gcloud eventarc providers describe cloudaudit.googleapis.com --location=us-central1
```

```text
displayName: Cloud Audit Logs
eventTypes:
- description: An audit log is created that matches the trigger's filter criteria.
  filteringAttributes:
  - attribute: methodName
    description: The identifier of the service's operation.
    required: true
  - attribute: resourceName
    description: The complete path to a resource. Used to filter events for a specific
      resource.
    pathPatternSupported: true
  - attribute: serviceName
    description: The identifier of the Google Cloud service.
    required: true
  - attribute: type
    required: true
  type: google.cloud.audit.log.v1.written
name: projects/project-name/locations/us-central1/providers/cloudaudit.googleapis.com
```

```bash
gcloud eventarc providers describe firebasedatabase.googleapis.com --location=us-central1
```

```text
displayName: Firebase Realtime Database
eventTypes:
- description: New data has been created in the database.
  filteringAttributes:
  - attribute: instance
    description: A single database instance.
    pathPatternSupported: true
    required: true
  - attribute: ref
    description: Pattern to match for the database instance.
    pathPatternSupported: true
    required: true
  - attribute: type
    required: true
  type: google.firebase.database.ref.v1.created
[...]
```

### Capture groups

`buckets/{path=**}/files/{filename=file-*.txt}`. A single segment wildcard can omit `=*` in a capture group: `/projects/_/buckets/{bucket}/objects/file.*`.

## Options / Props

### Path pattern syntax

| Rule | Definition |
|---|---|
| Pattern | `/? Segment (/ Segment)*` |
| Segment | `CaptureGroup \| Expression` |
| CaptureGroup | `{ ID (= Expression)? }` |
| Expression | `Wildcard \| MultiSegmentWildcard \| NameSegment` |
| NameSegment | `(Character* Wildcard? Character*)` |
| ID | `[a-zA-Z0-9_]+` |
| Wildcard | `*` |
| MultiSegmentWildcard | `**` |
| Character (1) | `[\\w\\s\\t~@#$%&.,?:;+='[]()-]` |

| Legend | Meaning |
|---|---|
| `?` | zero or one |
| `*` | zero or more |
| `+` | one or more |
| `\|` | OR |

### Expressions

| Expression | Behavior |
|---|---|
| `*` (Wildcard) | Matches zero or more characters in the pattern. |
| `**` (MultiSegmentWildcard) | Matches zero or more segments in the pattern. |
| NameSegment | Zero or one `*` plus other characters; filters by prefix, suffix or file extension, for example `file-*.txt`. |

### Resource name format (examples, not a complete list)

| Resource type | Full resource name format |
|---|---|
| BigQuery datasets | `//bigquery.googleapis.com/projects/PROJECT_ID/datasets/DATASET_ID` |
| Cloud Billing accounts | `//cloudbilling.googleapis.com/billingAccounts/BILLING_ACCOUNT_ID` |
| Cloud Firestore documents [1] | `//firestore.googleapis.com/projects/PROJECT_ID/databases/DATABASE_ID/documents/DOCUMENT` |
| Cloud Run services | `//run.googleapis.com/projects/PROJECT_ID/locations/LOCATION_ID/services/SERVICE_ID` |
| Cloud SQL instances | `//sqladmin.googleapis.com/projects/PROJECT_ID/instances/INSTANCE_ID` |
| Cloud Storage buckets [2] | `//storage.googleapis.com/projects/_/buckets/BUCKET_ID` |
| Cloud Storage objects [2, 3] | `//storage.googleapis.com/projects/_/buckets/BUCKET_ID/objects/OBJECT_ID` |
| Compute Engine instances | `//compute.googleapis.com/projects/PROJECT_ID/zones/ZONE/instances/INSTANCE_ID` |
| Compute Engine networks | `//compute.googleapis.com/projects/PROJECT_ID/global/networks/NETWORK` |
| Compute Engine subnetworks | `//compute.googleapis.com/projects/PROJECT_ID/regions/REGION/subnetworks/SUBNETWORK` |
| Google Kubernetes Engine clusters | `//container.googleapis.com/projects/PROJECT_ID/clusters/CLUSTER_ID` |
| Identity-Aware Proxy App Engine app service | `//iap.googleapis.com/projects/PROJECT_NUMBER/iap_web/appengine-PROJECT_ID/services/APP_SERVICE_ID` |
| IAP Compute Engine backend service | `//iap.googleapis.com/projects/PROJECT_NUMBER/iap_web/compute/services/BACKEND_SERVICE_ID_OR_NAME` |
| Pub/Sub topics | `//pubsub.googleapis.com/projects/PROJECT_ID/topics/TOPIC_ID` |
| Resource Manager organizations | `//cloudresourcemanager.googleapis.com/organizations/ORGANIZATION_NUMBER` |
| Resource Manager folders | `//cloudresourcemanager.googleapis.com/folders/FOLDER_NUMBER` |
| Resource Manager projects | `//cloudresourcemanager.googleapis.com/projects/PROJECT_ID` |

### Valid patterns

| Pattern | Description |
|---|---|
| `/projects/project-1/datasets/dataset-1` | Specific resource name. |
| `/projects/project-1/regions/region-1/subnetworks/*` | Matches any subnetwork in `project-1` and `region-1`. |
| `/projects/_/buckets/bucket-1/objects/*.txt` | Matches all TXT files in the bucket. |
| `/projects/_/buckets/bucket-1/objects/file-*.txt` | Matches all TXT files with prefix `file-` in the bucket. |
| `/projects/project-1/serviceAccounts/service-account-email-1/keys/**` | Matches any key for a specific service account email. |
| `/projects/_/**/file-*.txt` | Matches any TXT file with prefix `file-` for all buckets. |
| `/projects/_/buckets/bucket-*/objects/file-*.txt` | Matches all TXT files with prefix `file-` for any bucket with prefix `bucket-`. |
| `/projects/_/buckets/{bucket}/objects/file.*` `/projects/_/buckets/{bucket=*}/objects/file.*` `/projects/_/buckets/*/objects/{filename=file.*}` | Three different representations of the same filter. Matches any bucket with a file named `file` of any type. The first two examples also capture the bucket and the last example captures the filename. |
| `/projects/project-1/zones/zone-1/instances/**` | Matches anything in `project-1` and `zone-1`. |
| `/projects/*/zones/zone-1/instances/**` | Matches anything in `zone-1` in any project. |

### Invalid patterns

| Pattern | Description |
|---|---|
| `/projects/_/buckets/bucket-1/objects/` | Empty expression. |
| `/projects//buckets/bucket-1/objects/file1.txt` | Empty expression. |
| `/projects/_/buckets/bucket**/objects/file1.txt` | Expression can contain only one `*`. |
| `/projects/_/buckets/bucket-1/objects/file-*.*` | Expression can contain only one `*`. |
| `/projects/**/buckets/**` | Resource path can contain only one `**`. |
| `/projects/_/buckets/{=*}/objects/file1.txt` | Missing ID in segment. |
| `/projects/_/buckets/{bucket=}/objects/file1.txt` | Empty expression inside a capture group. |
| `/projects/_/buckets/{bucket/objects/file1.txt` | Capture group not closed. |

### Pattern matching

| Pattern | Resource | Matches? |
|---|---|---|
| `/buckets/bucket-1/objects/file1.txt` | `/buckets/bucket-1/objects/file1.txt` | Yes |
| `/buckets/bucket-1/objects/file1.txt` | `/buckets/bucket-1/objects/file2.txt` | No |
| `/buckets/bucket-1/objects/*` | `/buckets/bucket-1/objects/file3.txt` | Yes |
| `/buckets/bucket-1/objects/*` | `/buckets/bucket-1/objects/file4.jpg` | Yes |
| `/buckets/bucket-1/objects/*` | `/buckets/bucket-1/objects/files/file4.jpg` | No |
| `/buckets/bucket-1/objects/*` | `/buckets/bucket-1/objects` | No |
| `/buckets/bucket-1/objects/*.txt` | `/buckets/bucket-1/objects/file5.txt` | Yes |
| `/buckets/bucket-1/objects/*.txt` | `/buckets/bucket-1/objects/file6.jpg` | No |
| `/buckets/bucket-1/objects/file-*.txt` | `/buckets/bucket-1/objects/file-777.txt` | Yes |
| `/buckets/bucket-1/objects/file-*.txt` | `/buckets/bucket-1/objects/file-.txt` | Yes |
| `/buckets/bucket-1/objects/file-*.txt` | `/buckets/bucket-1/objects/file.txt` | No |
| `/projects/_/**/{filename=file-*.txt}` | `/projects/_/objects/object-1/files/file-9.txt` | Yes |
| `/projects/_/**/{filename=file-*.txt}` | `/projects/_/{ob}jects/**/-+=*/file-9.txt` | Yes |
| `/projects/_/**/{filename=file-*.txt}` | `/projects/_/file-10.txt` | Yes |
| `/projects/_/**/{filename=file-*.txt}` | `/projects/_/files-1/file-1.txt/files-2/file-2.txt` | Yes |
| `/projects/_/**/{filename=file-*.txt}` | `/projects/_//file-1234.txt` | Yes |
| `/projects/_/**/{filename=file-*.txt}` | `/projects/_/files/file-5.txt/file.txt` | No |
| `{collection=[clients,users]}/id` | `users/id` | No |
| `{collection=[clients,users]}/id` | `clients/id` | No |
| `{collection=[clients,users]}/id` | `[clients,users]/id` | Yes |
| `{collection=clients,users}/id` | `users/id` | No |
| `{collection=clients,users}/id` | `clients/id` | No |
| `{collection=clients,users}/id` | `clients,users/id` | Yes |
| `all users/{id=.*_ +1@gmail.com}` | `all-users/aa_ +1@gmail.com` | No |
| `all users/{id=.*_ +1@gmail.com}` | `all users/bb_+1@gmail.com` | No |
| `all users/{id=.*_ +1@gmail.com}` | `all users/cc +1@gmail.com` | Yes |

## Notes

- Path pattern syntax: (1) Only listed ASCII characters are supported. Regular expression matching is not supported. Supported metacharacters: `\w` a word, also `[a-zA-Z0-9_]`; `\t` a tab; `\s` a whitespace character.
- Expressions: An expression cannot be empty. A path can contain many single segment wildcards, but only one multiple segment wildcard; for example `/projects/**/buckets/**` is invalid.
- Preview: subject to the "Pre-GA Offerings Terms" in the General Service Terms; Pre-GA features are available "as is" and might have limited support.
- The `gcloud eventarc triggers create` help (gcloud 593.0.0) lists `--event-filters-path-pattern=[ATTRIBUTE=PATH_PATTERN,...]` and says path pattern format is currently only available for the `resourceName` attribute for Cloud Audit Log events; `triggers update` has the same flag.
- Resource names can contain location identifiers (for example `/projects/$PROJECT_ID/locations/$REGION/triggers/my-trigger`), but matching is constrained by resource regionality: for Cloud Audit Logs triggers, location wildcards only match triggers from the Cloud Audit Logs region, or global triggers.
- Capture groups have no semantic meaning; only the syntax is supported.
- Resource name footnotes: [1] For Cloud Firestore, don't specify a leading slash when creating a trigger. [2] For Cloud Storage, resource names contain an underscore (`_`) rather than a project ID; you cannot replace the underscore with a project ID, project name or project number. [3] For Cloud Storage, use the entire object name, including forward slashes, which are part of the object name, not path separators.
- Backslash escapes that the rendered source shows inside the invalid-pattern examples (such as `bucket\*\*`) are display artifacts and are written here as the plain patterns.
- The source also shows the syntax diagram image and Console instructions.
- Source: https://docs.cloud.google.com/eventarc/docs/path-patterns (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [determining-filters-cal.md](./determining-filters-cal.md)
- [managing-triggers.md](./managing-triggers.md)
