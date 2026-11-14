---
source: https://docs.cloud.google.com/iam/docs/roles-permissions
---

# Products owned by gcp-databases-nosql

## Signature / Usage

Owner skill: `gcp-databases-nosql` (status: 未収録（予定）). gcloud groups: `bigtable`, `datastore`, `firestore`, `memcache`, `memorystore`, `redis`.

| Product | REST service (Discovery) | Overview | gcloud group | IAM role prefix | Roles | Former name | Lifecycle | Docs | Status |
|---|---|---|---|---|---|---|---|---|---|
| Bigtable | — | — | `bigtable` | `bigtable.` | 5 | — | — | https://docs.cloud.google.com/iam/docs/roles-permissions/bigtable | 未収録（予定） |
| Firestore | `firestore.googleapis.com` (v1, v1beta1, v1beta2) | Accesses the NoSQL document database built for automatic scaling, high performance, and ease of application development. | `firestore` | `datastore.`, `firestore.` | 18 | — | — | https://cloud.google.com/firestore | 未収録（予定） |
| Memorystore | — | — | `memorystore` | `memorystore.` | 4 | — | — | https://docs.cloud.google.com/iam/docs/roles-permissions/memorystore | 未収録（予定） |
| Memorystore for Memcached | `memcache.googleapis.com` (v1, v1beta2) | Google Cloud Memorystore for Memcached API is used for creating and managing Memcached instances in GCP. | `memcache` | `memcache.` | 4 | — | — | https://cloud.google.com/memorystore/ | 未収録（予定） |
| Memorystore for Redis | `redis.googleapis.com` (v1, v1beta1) | Creates and manages Redis instances on the Google Cloud Platform. | `redis` | `redis.` | 5 | — | — | https://cloud.google.com/memorystore/docs/redis/ | 未収録（予定） |
| Redis Enterprise Cloud | — | — | — | `redisenterprisecloud.` | 2 | — | — | https://docs.cloud.google.com/iam/docs/roles-permissions/redisenterprisecloud | 未収録（予定） |

```bash
gcloud help
gcloud <group> --help
```

The first command lists all groups; the second lists the commands of one group.

## Notes

- Product list: IAM roles-permissions service pages (329 services) as of 2026-11-14.
- REST service, version list, Overview and Docs come from Discovery documents (googleapis/google-api-python-client@ff2498706a01); products without a Discovery document show "—".
- gcloud groups from `gcloud meta list-commands` (593.0.0); the column is filled only where the group name equals the IAM service name. The full group assignment is in `references/gcloud-groups/assignment.md`.
- Lifecycle information covers only products confirmed against official pages as of 2026-11-14 (see `../lifecycle/shutdown-and-deprecated.md`); a product without a Lifecycle entry is not confirmed to be available. Check the official product page before use.
- Source: https://docs.cloud.google.com/iam/docs/roles-permissions (retrieved 2026-11-14; content licensed under CC BY 4.0, code samples under Apache 2.0, https://developers.google.com/site-policies).

## Related

- [assignment.md](../gcloud-groups/assignment.md)
- [renamed-products.md](../renames/renamed-products.md)
