---
source: https://docs.cloud.google.com/storage/docs/introduction
---

# Cloud Storage overview

Cloud Storage stores unstructured data as objects in buckets, with high durability and global availability. Every bucket belongs to a project, and projects are grouped under an organization.

## Signature / Usage

### Resource names

Resource names are used only by Pub/Sub notifications for Cloud Storage and IAM.

```text
projects/_/buckets/BUCKET_NAME
projects/_/buckets/BUCKET_NAME/objects/OBJECT_NAME
```

A `#NUMBER` appended to a resource name selects a specific object generation. `#0` is a special identifier for the most recent version; add it when the object name ends in a string that would otherwise be read as a generation number.

### Tools

| Tool | Use |
|---|---|
| Google Cloud console | Visual interface in a browser |
| Google Cloud CLI | `gcloud storage` commands (https://docs.cloud.google.com/sdk/gcloud/reference/storage) |
| Client libraries | C++, C#, Go, Java, Node.js, PHP, Python, Ruby |
| REST APIs | JSON API or XML API |
| Terraform | Infrastructure as code |
| gRPC | High performance RPC with Protocol Buffers |
| Cloud Storage FUSE | Mount buckets to a local file system |
| GCSFS | Python library with a file-system interface (https://github.com/fsspec/gcsfs) |

## Options / Props

### Resource hierarchy

| Level | Description |
|---|---|
| Organization | Top-level company node |
| Project | Each has its own Cloud Storage APIs and resources |
| Bucket | Container for objects; has a storage class and location |
| Object | Immutable piece of data (a file of any format); essentially unlimited per bucket |
| Folder | Only in buckets with hierarchical namespace enabled; atomic rename of a folder and its objects |
| Managed folder | Resource overlay used only for permission checking, grants access beyond bucket IAM |

### Key features by use case

| Area | Features |
|---|---|
| AI/ML and analytics | Rapid Bucket (zonal, Rapid storage class), Rapid Cache, hierarchical namespace (up to 8x higher initial QPS; only enabled at bucket creation), Cloud Storage FUSE |
| Security and compliance | IAM, uniform bucket-level access, bucket IP filtering, Google-managed keys / CMEK / CSEK, Bucket Lock, Object Retention, Object Versioning, soft delete (enabled by default on all buckets, 7-day retention) |
| Backup and DR | Dual-regions and multi-regions (automatically replicate data across geographically separated Google Cloud regions for 99.99% availability), turbo replication (100% of newly written objects between dual-region pairs within 15 minutes) |
| Cost | Storage classes (Standard, Nearline, Coldline, Archive, Rapid), Autoclass, Object Lifecycle Management |
| Content distribution | Cloud CDN, Cloud Load Balancing, signed URLs, static website hosting |
| Migration and events | Storage Transfer Service, Transfer Appliance, Eventarc and Pub/Sub notifications |
| Management | Storage Intelligence, Storage Insights datasets, storage batch operations, bucket relocation |

## Notes

- Cloud Storage is Google Cloud's object storage; it is distinct from Cloudflare R2 (`cloudflare-storage`) and Supabase Storage (`supabase`). Cloud Storage FUSE, Filestore and NetApp Volumes are file storage, not object APIs.
- Source inconsistency: this page says "By default, Cloud Storage enables soft delete for all buckets with a seven day retention period"; the soft delete page (https://docs.cloud.google.com/storage/docs/soft-delete, see `soft-delete.md` in this skill) says the default policy is set on newly created buckets, except buckets that use incompatible capabilities (such as zonal buckets that use Rapid Bucket), and that a tag can change the default retention for new buckets (7 to 90 days) or disable soft delete by default.
- The "99.99% availability" figure for dual-regions and multi-regions is this page's wording. The storage classes page (https://docs.cloud.google.com/storage/docs/storage-classes, see `storage-classes.md`) separates the availability SLA from typical monthly availability: in multi-regions and dual-regions, Standard storage has a 99.95% SLA and >99.99% typical monthly availability; Nearline, Coldline and Archive have a 99.9% SLA and 99.95% typical monthly availability.
- Other storage services listed by the page: Managed Lustre, Google Drive, Cloud Storage for Firebase, Persistent Disk, Filestore.
- The source also shows quickstart links (console, gcloud CLI, Terraform) and a code-free capability overview.
- Source: https://docs.cloud.google.com/storage/docs/introduction (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/storage/docs/soft-delete (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/storage/docs/storage-classes (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)

## Related

- [buckets.md](./buckets.md)
- [objects.md](./objects.md)
- [storage-classes.md](./storage-classes.md)
- [locations.md](./locations.md)
- [discover-object-storage-gcloud.md](./discover-object-storage-gcloud.md)
