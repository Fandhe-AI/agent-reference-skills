---
source: https://docs.cloud.google.com/storage/docs/folders-overview
---

# Folders overview (hierarchical namespace)

In buckets with hierarchical namespace enabled, folders are real resources organized in a true file system structure, enabling atomic folder renames. This is distinct from simulated folders (flat namespace) and managed folders (IAM on groups of objects).

## Signature / Usage

Maximum depth example from the source:

```text
folder1/folder2/folder3/.../folder50/my-data.txt
```

### Folder operations

- Create: explicit create, or automatic when an object path names a missing folder (creating `dir1/foo.txt` creates `dir1/`).
- List: evaluates the true folder structure; filters `prefix`, `delimiter` (`/` for directory-like mode), `lexicographicStart`, `lexicographicEnd`; paginated, at most 1000 folders per response page.
- Get metadata: returns the folder resource itself, not its contents.
- Rename or move: same underlying operation; an atomic metadata-only change that updates paths of child folders, objects and managed folders without copying or deleting objects. It starts a long-running operation whose duration depends on the number of folders renamed. During it you can read and list the folders but cannot run write operations on them. In the console **Rename folder** and **Move folder** run the same backend operation.
- Delete: permanent. A folder that becomes empty because its objects were deleted is not removed with them; delete it with the delete folder operation. Exception: from August 26, 2026, an Object Lifecycle Management `Delete` rule deletes empty folders that meet all of the rule's conditions (see Notes).

## Options / Props

### Folder metadata

| Field | Description |
|---|---|
| `bucket` | Bucket name, for example `my-bucket` |
| `id` | Unique identifier within the bucket, for example `hns-bucket/dir1/` |
| `kind` | Always `storage#folder` |
| `name` | Folder name, for example `dir1/` |
| `selfLink` | URL referencing the folder in the API |
| `timeCreated` | Creation time, for example `2023-05-05T16:32:08.878000+00:00` |
| `updated` | Last update time, for example `2024-05-06T16:32:08.878000+00:00` |

### Naming and limits

| Object name | Parent folder | Location |
|---|---|---|
| `foo.txt` | Root folder | Every bucket has an unnamed root folder |
| `dir1/foo.txt` | `dir1/` | Full name `dir1/foo.txt`; top-level folder `dir1/` |
| `dir1/` | `dir1/` | A trailing slash does not make an object a folder; it is a separate object inside folder `dir1/` |
| `/foo.txt` | `/` | A leading slash defines a top-level folder named `/` |
| `dir1//foo.txt` | `dir1//` | Consecutive slashes define nested folders; `dir1//` is a child of `dir1/` |

| Limit | Value |
|---|---|
| Maximum folder name size | 512 bytes (UTF-8 encoded) |
| Maximum folder depth | 50 stacked child folders |
| Depth when the folder has an associated managed folder | at most 15 stacked child folders |

## Notes

- Hierarchical namespace buckets support all valid object names, including leading, trailing or consecutive slashes; missing folder resources in an upload path are created automatically.
- Folder names are more broadly visible than metadata (they appear in URLs and listings); do not put sensitive information or PII in folder names.
- Associated managed folders: creating a managed folder creates any missing folders in its path (for example `2025/training-data/` creates `2025/` and `training-data/`); deleting a folder deletes its associated managed folder and its IAM policies (fails without permission to delete the managed folder); renaming a folder renames the associated managed folder. In these buckets a managed folder cannot exist without an associated folder.
- Folder delete is destructive; try it on a disposable resource first.
- Lifecycle exception: the Cloud Storage release notes (May 28, 2026, Breaking) say: "As of August 26, 2026, in buckets with hierarchical namespace enabled, the Object Lifecycle Management `Delete` action will delete empty folders when the empty folder meets all of the conditions in the lifecycle rule." Source inconsistency: the folders overview page still says folders "are not automatically removed when they become empty. You must delete them explicitly." without this exception. The lifecycle page adds that `sizeBelowBytes` can never be satisfied by an empty folder. This applies to folders only, not managed folders.
- Source: https://docs.cloud.google.com/storage/docs/release-notes (May 28, 2026 entry; retrieved 2026-11-15; CC BY 4.0)
- Source: https://docs.cloud.google.com/storage/docs/lifecycle (retrieved 2026-11-15; CC BY 4.0)
- The source also shows Console and API steps in other pages (create/manage folders, rename folder).
- Cloud Storage is Google Cloud's object storage; it is distinct from Cloudflare R2 (`cloudflare-storage`) and Supabase Storage (`supabase`). Folders here are object storage namespaces, not Filestore file storage.
- Source: https://docs.cloud.google.com/storage/docs/folders-overview (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)

## Related

- [metadata.md](./metadata.md)
