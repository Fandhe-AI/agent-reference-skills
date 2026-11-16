---
source: https://docs.cloud.google.com/firestore/native/docs/securing-with-vpc-sc
---

# VPC Service Controls

VPC Service Controls lets organizations define a perimeter around Google Cloud resources to mitigate data exfiltration. Firestore bundles several APIs, and import / export needs the Firestore service agent for full egress protection.

## Signature / Usage

### Restrict the bundled services

Restricting `firestore.googleapis.com` also restricts `datastore.googleapis.com` and `firestorekeyvisualizer.googleapis.com`. To restrict `datastore.googleapis.com`, restrict `firestore.googleapis.com` instead. With the Google Cloud CLI, use:

```text
--perimeter-restricted-services=firestore.googleapis.com
```

### Firestore service agent

Replace `PROJECT_NUMBER` and `PROJECT_ID` with your own values:

```text
service-PROJECT_NUMBER@gcp-sa-firestore.iam.gserviceaccount.com
PROJECT_ID@appspot.gserviceaccount.com
```

The first is the Firestore service agent (preferred, Firestore-specific); the second is the App Engine default service account that Firestore previously used for import / export (shared by more than one service).

## Options / Props

| Item | Detail |
|------|--------|
| Bundled APIs | `firestore.googleapis.com`, `datastore.googleapis.com`, `firestorekeyvisualizer.googleapis.com` |
| Org policy constraint | `firestore.requireP4SAforImportExport` ("Require Firestore Service Agent for import/export") |
| Bucket role for cross-project buckets | `Firestore Service Agent` (read and write on a Cloud Storage bucket); use a custom role for read-only or write-only |
| Same-project buckets | No permission changes needed; the service agent can access them by default |

### Migrating to the Firestore service agent

1. Console: Databases > database > Import/Export; the **Import/Export jobs run as** label shows the account.
2. If not migrated, click **Check Bucket Status**; for each listed bucket you will keep using, click **Fix** and add the service agent with role Service Agents > Firestore Service Agent.
3. Click **Migrate to Firestore Service Agent** (confirm with **Migrate** if some buckets still fail checks).

Alternative: set the organization policy constraint above. It does not grant bucket permissions; if it breaks import / export workflows you can disable it, fix bucket permissions, then enable it again.

## Notes

- The migration cannot be undone.
- App Engine legacy bundled services for Datastore (Java 8 Datastore with App Engine APIs, Python 2 NDB, Go 1.11 Datastore with App Engine APIs) do not support service perimeters; protecting Datastore with a perimeter blocks their traffic.
- VPC Service Controls is not compatible with the App Engine service account for import / export; the project-level migration is recommended over the org-wide constraint because it localizes the effect to one project.
- Import / export that uses a bucket in another project fails after migration unless that bucket grants the service agent access.
- The source's console steps are summarized, not reproduced.
- Source: https://docs.cloud.google.com/firestore/native/docs/securing-with-vpc-sc (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [cmek.md](./cmek.md)
- [iam.md](./iam.md)
