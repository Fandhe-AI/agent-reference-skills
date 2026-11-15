---
source: https://docs.cloud.google.com/storage/docs/access-control/lists
---

# Access control lists (ACLs)

ACLs are a legacy mechanism to control access to individual buckets and objects through entries of a permission and a scope. In most cases avoid them and enable uniform bucket-level access.

## Signature / Usage

To make sure updates to publicly readable objects become visible immediately (they are served with a `Cache-Control` that allows caching for 3600 seconds by default), set the object `Cache-Control` metadata to:

```text
Cache-Control:private, max-age=0, no-transform
```

### Entries

- Each ACL entry has a permission (what) and a scope/grantee (who). A bucket or object can have at most 100 ACL entries; a group or domain scope counts as one entry regardless of member count.
- Example: `READER` for scope `allUsers` plus `WRITER` for a collaborator's email.
- A request not granted by the ACL fails with `403 Forbidden`. Creating a bucket depends on project permission, not ACLs.
- Permissions are concentric: `WRITER` includes `READER`; `OWNER` includes `WRITER` and `READER`. With multiple entries for one scope the most permissive applies. In the XML API two entries with the same scope produce an error; grant the higher permission instead.

### Should you use ACLs?

Avoid them (enable uniform bucket-level access) because: ACLs cannot control the project or non-Storage resources; domain restricted sharing and custom organization policies do not prevent access granted by ACLs; unexpected behavior can occur with IAM conditions set at or above project level. Use them to customize access to individual objects or when exclusively using the XML API / Amazon S3 interoperability.

## Options / Props

### Permissions

| Permission (XML API) | Buckets | Objects |
|---|---|---|
| `READER` (`READ`) | List bucket contents; read bucket metadata excluding ACLs | Download object data |
| `WRITER` (`WRITE`) | `READER` plus create, replace, delete objects (including multipart uploads) | Not applicable to objects |
| `OWNER` (`FULL_CONTROL`) | `WRITER` plus read/write bucket metadata including ACLs, and work with tags | `READER` plus read/write object metadata including ACLs |
| Default | Predefined `project-private` ACL; owned by `project-owners` group | `project-private`; owned by the original requester who uploaded |

There are no discrete permissions for reading or writing ACLs; grant `OWNER`.

### Scopes

| Scope | Example |
|---|---|
| All entities (labeled `Public` in console) | `allUsers` |
| All valid accounts incl. service accounts (labeled `Public` in console) | `allAuthenticatedUsers` |
| User account email | `jeffersonloveshiking@gmail.com` |
| Service account email | `my-service-account@my-project.iam.gserviceaccount.com` |
| Google group email | `work-group@googlegroups.com` |
| Project convenience values (use project number) | `owners-123456789012` (for example `editors-867489160491`) |
| Google Workspace / Cloud Identity domain | `dana@example.com` |

Email addresses are remembered as given until entries are removed or replaced; update ACLs when a user changes email.

### Predefined ACLs

| JSON API / `gcloud storage` | XML API | Description |
|---|---|---|
| `private` | `private` | Owner gets `OWNER` |
| `bucketOwnerRead` | `bucket-owner-read` | Object owner `OWNER`, bucket owner `READER`; objects only |
| `bucketOwnerFullControl` | `bucket-owner-full-control` | Object and bucket owners `OWNER`; objects only |
| `projectPrivate` | `project-private` | Project team `READER`; project owners and editors `OWNER`; default for new buckets and (unless default object ACL changed) objects |
| `authenticatedRead` | `authenticated-read` | Owner `OWNER`; all authenticated account holders `READER` |
| `publicRead` | `public-read` | Owner `OWNER`; all users `READER`. On an object anyone on the Internet can read it without authenticating; on a bucket anyone can list objects without authenticating |
| `publicReadWrite` | `public-read-write` | Buckets only. Bucket owner `OWNER`; all users `READER` and `WRITER`: anyone can list, create, replace and delete objects without authenticating |

Important: setting a bucket to `publicReadWrite` allows anyone on the Internet to upload anything to your bucket; you are responsible for this content.

### Default ACLs

- Buckets without a predefined ACL at creation get `projectPrivate`; all buckets are owned by the project owners group.
- Every bucket has a default object ACL (initially `projectPrivate`) applied to uploads without a predefined or explicit ACL (explicit ACL in the request is JSON API only). Changing it does not affect existing objects or buckets.
- Authenticated upload: uploader is object owner (cannot be changed except by replacing the object), gets `OWNER` (escalated automatically if less), project owners and editors get `OWNER`, project team gets `READER`.
- Anonymous upload (possible if a bucket grants `allUsers` `WRITER` or `OWNER`): default bucket ACLs apply; anonymous users cannot specify a predefined ACL.
- After changing the default object ACL wait at least 30 seconds before creating new objects.

## Notes

- Caution: applying a predefined ACL to an existing bucket or object completely replaces the existing ACL. For example if you are in project owners but not the owner of an object with `projectPrivate`, applying `publicRead` removes your `OWNER` permission and you lose access to the object ACL; the IAM role Storage Object Admin (`roles/storage.objectAdmin`) can fix this.
- `allUsers` and `publicRead` / `publicReadWrite` make data publicly accessible; use only for intentionally public content.
- ACL rules: you cannot apply an ACL that changes the bucket or object owner; the owner always keeps `OWNER` (added automatically if omitted, but the project owners group is not added to objects, so include it explicitly). Ownership is permanent but object ownership can effectively change by replacing the object (needs `WRITER` or `OWNER` on the bucket).
- IAM and ACLs work in tandem (either grant suffices). An IAM deny policy overrides ACL-granted access for the same permission (for example a deny on `storage.objects.get` blocks an object `READER` grant; a deny on `storage.buckets.get` blocks bucket metadata but a bucket `WRITER` grant still allows listing, creating and deleting objects).
- Uniform bucket-level access disables all ownership properties and ACL use.
- XML API permission names are `READ`, `WRITE`, `FULL_CONTROL`.
- Cloud Storage is Google Cloud's object storage; it is distinct from Cloudflare R2 (`cloudflare-storage`) and Supabase Storage (`supabase`).
- Source: https://docs.cloud.google.com/storage/docs/access-control/lists (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)

## Related

- [access-control.md](./access-control.md)
- [iam.md](./iam.md)
- [uniform-bucket-level-access.md](./uniform-bucket-level-access.md)
