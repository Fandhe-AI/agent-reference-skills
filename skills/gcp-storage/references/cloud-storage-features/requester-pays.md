---
source: https://docs.cloud.google.com/storage/docs/requester-pays
---

# Requester Pays

Requester Pays lets you share bucket data while requiring requesters to pay data processing and network charges by including a billing project in each request.

## Signature / Usage

Permissions that gate access to a Requester Pays bucket (verbatim from the source):

```text
serviceusage.services.use
resourcemanager.projects.createBillingAssignment
```

- A requester that includes a billing project in the request must use a project in good standing and hold a role in that project containing `serviceusage.services.use` (the **Service Usage Consumer** role contains it).
- A requester that does not include a billing project needs `resourcemanager.projects.createBillingAssignment` on the project containing the bucket (the **Billing Project Manager** role contains it); charges are billed to the bucket's project.
- All other requests fail with `400 UserProjectMissing`.
- The requester still needs normal permission for the action (for example `storage.objects.create` to upload).
- Disabling Requester Pays also requires a billing project in the request or `resourcemanager.projects.createBillingAssignment`.
- Enable or disable by setting the bucket's Requester Pays metadata flag (see "Use Requester Pays" in the official docs: https://docs.cloud.google.com/storage/docs/using-requester-pays).

## Options / Props

| Topic | Rule |
|---|---|
| Charges moved to the requester | Data processing (operations, replication, retrieval) and network usage |
| Charges not moved | Data storage charges, including early deletion charges, always stay with the bucket's project |
| Restrictions | Not usable for Cloud SQL imports/exports; not usable for Pub/Sub exports |
| Source-billed operations | Copy/rewrite charge the source bucket's project; usually include a billing project only if the source bucket has Requester Pays |
| `gcloud storage cp --no-clobber` | Needs a billing project if either source or destination (or both) has Requester Pays |
| Resumable uploads | Only the first request needs the billing project; it applies to the whole upload, later ones are ignored |
| JSON API rewrites / XML API multipart uploads | Each request can use a different billing project; earlier ones do not carry over |
| Storage Transfer Service | No charge when used with a billing project in the request (promotional price) |

## Notes

- Buckets with Requester Pays disabled still accept requests that include a billing project, and charges apply to that project. Consider billing implications before including a billing project in all requests.
- Billing project charges do not appear separately in billing. To separate them, create a project with no Cloud Storage resources dedicated to making requests to other projects' resources.
- Related roles and project IAM concepts live in `gcp-foundation`.
- Cloud Storage is Google Cloud's object storage; it is distinct from Cloudflare R2 (`cloudflare-storage`) and Supabase Storage (`supabase`).
- Source: https://docs.cloud.google.com/storage/docs/requester-pays (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)

## Related

- [autoclass.md](./autoclass.md)
