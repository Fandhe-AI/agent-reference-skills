---
source: https://docs.cloud.google.com/storage/docs/buckets
---

# Buckets

Buckets are the basic containers that hold and organize data in Cloud Storage. Every object lives in a bucket, where you set the location, storage class and access.

## Signature / Usage

Create a bucket with a globally unique name (see the naming rules below):

```bash
gcloud storage buckets create gs://BUCKET_NAME/ --uniform-bucket-level-access
```

## Options / Props

### Bucket properties

| Property | Detail |
|---|---|
| Nesting | Buckets cannot be nested |
| Count | No limit on buckets per project or location; there are limits on the rate of bucket creation and deletion |
| Name and location | Globally unique name and geographic location chosen at creation |
| Rename | A bucket cannot be renamed; create a new bucket and move the contents |
| Pricing | Depends on bucket location and the storage classes of objects within it |
| Access | IAM controls access to individual buckets |

### Bucket naming requirements

| Rule | Detail |
|---|---|
| Characters | Only lowercase letters, numeric characters, dashes (`-`), underscores (`_`) and dots (`.`); spaces not allowed; names containing dots require domain ownership verification |
| Start / end | Must start and end with a number or letter |
| Length | 3-63 characters; names containing dots can be up to 222 characters, each dot-separated component no longer than 63 characters |
| IP address | Cannot be represented as an IP address in dotted-decimal notation (for example 192.168.5.4) |
| Prefix | Cannot begin with the "goog" prefix |
| Content | Cannot contain "google" or close misspellings such as "g00gle" |

Valid examples: `my-travel-maps`, `0f75d593-8e7b-4418-a5ba-cb2970f0b91e`, `test.example.com` (requires verification of ownership for `example.com`). Invalid examples: `My-Travel-Maps` (uppercase), `my_google_bucket` (contains "google"), `test bucket` (space).

### Bucket name considerations

| Topic | Detail |
|---|---|
| Namespace | Single global namespace shared by all users; a name that already belongs to a bucket returns an error |
| Visibility | Names are publicly visible; do not use user IDs, email addresses, project names, project numbers or PII |
| Reuse after deletion | Anyone can reuse the name; typically available again within seconds, but if the project is deleted the name may not be released for weeks or longer |
| Restore | If someone reuses your bucket's name you cannot restore your deleted bucket even if soft delete was enabled |
| Same name, new location | Requests within 10 minutes of the old bucket's deletion may fail with `404-Bucket Not Found`; the XML API may also fail creating such a bucket for up to 10 minutes |
| DNS use | For `CNAME` / `A` redirects follow DNS conventions: no underscores, no `..`, `-.` or `.-` |

Best practices when names may be reused: use a strong, hard-to-guess naming convention; remove all references to a deleted bucket's name; consider emptying and keeping a bucket instead of deleting it.

## Notes

- Folder-like access: enable hierarchical namespace when creating a bucket to use real folders, or mount a bucket with Cloud Storage FUSE to access it with file system semantics.
- Cloud Storage is Google Cloud's object storage; it is distinct from Cloudflare R2 (`cloudflare-storage`) and Supabase Storage (`supabase`).
- Snippet taken from https://docs.cloud.google.com/storage/docs/discover-object-storage-gcloud (the buckets page itself has no code).
- Source: https://docs.cloud.google.com/storage/docs/discover-object-storage-gcloud (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/storage/docs/buckets (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)

## Related

- [objects.md](./objects.md)
- [locations.md](./locations.md)
- [storage-classes.md](./storage-classes.md)
- [quotas.md](./quotas.md)
- [discover-object-storage-gcloud.md](./discover-object-storage-gcloud.md)
