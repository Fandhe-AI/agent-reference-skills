---
source: https://docs.cloud.google.com/storage/docs/objects
---

# Objects

Objects are the individual pieces of data in buckets. An object has opaque object data plus object metadata; name and generation number together uniquely identify it within a bucket.

## Signature / Usage

### How gcloud decides whether a destination is a folder

```bash
gcloud storage cp your-file gs://your-bucket/abc/
```

Creates `abc/your-file` (destination ends with `/`, so it is treated as a folder).

```bash
gcloud storage cp top-dir gs://your-bucket/abc --recursive
```

Creates `abc/top-dir/file1` and `abc/top-dir/file2` (multiple sources via `--recursive` or a wildcard such as `**` are treated as a folder destination).

```bash
gcloud storage cp your-file gs://your-bucket/abc
```

Neither rule applies: gcloud lists `your-bucket` with `/` delimiter and prefix `abc`; if objects start with `abc/` it creates `abc/your-file`, otherwise the object `abc`.

```bash
gcloud storage cp home/top-dir gs://your-bucket --recursive
```

Creates `top-dir/file1` and `top-dir/sub-dir/file2`. Without `--recursive`, `gcloud storage cp home/top-dir/** gs://your-bucket` creates `file1` and `file2` (final path component only).

### Simulated folders in REST

```text
https://storage.googleapis.com/storage/v1/b/my-bucket/o?prefix=folder/subfolder/
https://storage.googleapis.com/my-bucket?prefix=folder/subfolder/
```

Folders do not exist in the JSON or XML APIs; use `prefix` and `delimiter` query parameters to simulate them (first URL: JSON API, second: XML API).

## Options / Props

### Object naming requirements

| Rule | Detail |
|---|---|
| Characters | Any sequence of valid Unicode characters |
| Forbidden | Carriage Return or Line Feed characters |
| Forbidden prefix | Cannot start with `.well-known/acme-challenge/` |
| Forbidden names | Cannot be named `.` or `..` |
| Name size, flat namespace | 1-1024 bytes UTF-8 encoded |
| Name size, hierarchical namespace | Folder name segment max 512 bytes plus base name segment max 512 bytes (UTF-8); in `my-folder-1/my-folder-2/my-object.txt` the folder segment is `my-folder-1/my-folder-2/` and the base name is `my-object.txt` |

Applies to both flat namespace and hierarchical namespace buckets.

### Names to avoid (strongly recommended)

| Avoid | Why |
|---|---|
| Control characters illegal in XML 1.0 (#x7F-#x84, #x86-#x9F) | Cause XML listing issues |
| `#` | gcloud interprets a trailing `#NUMERIC_STRING` as a version identifier |
| `[`, `]`, `*`, `?` | gcloud treats them as wildcards; `*` and `?` are also invalid in Windows file names |
| `:`, `"`, `<`, `>`, `\|` | Invalid in Windows file names; downloads to Windows fail unless renamed (`/` is fine and is converted to `\` by tools such as gcloud) |
| `./` and `../` sequences | Downloads resolve them as relative paths, so objects can be overwritten or fail to download |
| Sensitive data or PII | Object names appear in URLs and listings |

### Namespaces

| Namespace | Behavior |
|---|---|
| Flat | No hierarchy; `/` in a name is just a character; console and gcloud simulate folders by treating `/` as a delimiter; managed folders add access control by prefix |
| Hierarchical | Real folders (see hierarchical namespace in the buckets-objects category) |

### Object immutability and limits

| Topic | Detail |
|---|---|
| Immutability | Objects cannot be changed in place (no append or truncate); replacing is atomic until the new upload completes readers get the old version |
| Generation | Changes each time the object's data is replaced |
| Same-object write rate | Once-per-second limit; faster replacement can return `429 Too Many Requests`; handle with exponential backoff retry |
| Rename | Not directly possible; copy then delete the original |
| Count | No limit on objects per bucket |

## Notes

- Simulated folder rename or move requires copying and deleting each object, is non-atomic and can leave a bucket in an inconsistent state if it fails.
- A console-created empty folder is a zero-byte placeholder object such as `folder/`; delete that object to remove the folder. You cannot create a zero-byte folder-mimicking object with the gcloud CLI, and gcloud skips objects whose names end with `/` when downloading locally.
- Retries can change naming: rerunning `gcloud storage cp ./your-dir gs://your-bucket/new --recursive` after a partial first attempt can create `new/your-dir/dir1/abc` instead of `new/dir1/abc`. Add a trailing slash to the destination, or use `gcloud storage rsync`.
- `gs://your-bucket/folder/` and `gs://your-bucket/folder` are different objects.
- Avoid sequential object names in large-scale uploads to spread load (see the request-rate best practices page).
- The source also shows the Console tab for creating folders.
- The source's `gcloud storage cp home/top-dir/** gs://your-bucket` example is unquoted; in bash (without `globstar`) and zsh the shell expands a trailing `**` like `*` before gcloud runs, so quote the wildcard (`'home/top-dir/**'`) to get the described gcloud wildcard behavior.
- Source: https://docs.cloud.google.com/storage/docs/objects (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)

## Related

- [buckets.md](./buckets.md)
- [quotas.md](./quotas.md)
- [introduction.md](./introduction.md)
