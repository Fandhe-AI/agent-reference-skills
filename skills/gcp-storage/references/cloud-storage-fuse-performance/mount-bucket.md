---
source: https://docs.cloud.google.com/storage/docs/cloud-storage-fuse/mount-bucket
---

# Mount Cloud Storage buckets with Cloud Storage FUSE

Mount buckets to a local directory with `gcsfuse` (static, dynamic, read-only, single directory), with the Linux `mount` command, or persistently through `/etc/fstab`. You cannot use Cloud Shell to mount buckets; run the commands on a Debian or Ubuntu machine.

## Signature / Usage

### Authenticate with Application Default Credentials

```bash
gcloud init
gcloud auth application-default login
```

`gcloud auth application-default login` is not needed in Cloud Shell. A Compute Engine VM's service account can also authenticate Cloud Storage FUSE.

### Mount a bucket

```text
gcsfuse GLOBAL_OPTIONS BUCKET_NAME MOUNT_POINT
```

- `GLOBAL_OPTIONS`: options controlling the mount (see the CLI reference or the configuration file).
- `BUCKET_NAME`: the bucket to mount, for example `my-bucket`. Omit it for dynamic mounting.
- `MOUNT_POINT`: the local directory, for example `/path/to/mount/point`.

### Static mounting

```bash
mkdir /path/to/mount/point
gcsfuse my-bucket /path/to/mount/point
```

### Dynamic mounting

Mounts every bucket the user can access as a subdirectory. Buckets cannot be listed from the root mount point; name the bucket in the path.

```bash
mkdir /path/to/mount/point
gcsfuse /path/to/mount/point
```

```bash
ls /path/to/mount/point/my-bucket-1/
ls /path/to/mount/point/my-bucket-2/
ls /path/to/mount/point/my-bucket-3/
```

### Read-only and single directory

```bash
gcsfuse -o ro my-bucket  /path/to/mount/point
```

```bash
gcsfuse --only-dir a/b my-bucket /path/to/mount/point
```

### Linux `mount` command

Run as root. Hyphens in `gcsfuse` options become underscores (`implicit_dirs`).

```bash
sudo mount -t gcsfuse -o rw,user my-bucket /path/to/mount/point
```

```bash
sudo mount -t gcsfuse -o implicit_dirs my-bucket /path/to/mount/point
```

### Persistent mounting (`/etc/fstab`)

The install includes the helper `/sbin/mount.gcsfuse`. Add one of these lines to `/etc/fstab` (they are fstab entries, not shell commands):

```text
my-bucket /mount/point gcsfuse rw,noauto,user
```

```text
my-bucket /mount/point gcsfuse rw,_netdev,user
```

```text
my-bucket /mount/point gcsfuse rw,_netdev,allow_other,uid=1001,gid=1001
```

### Buckets with folders

```bash
gcsfuse --implicit-dirs my-bucket /path/to/mount/point
```

For a hierarchical namespace bucket, no flag is needed:

```bash
gcsfuse my-bucket /path/to/mount/point
```

### Allow other users, then unmount

```bash
mount -t gcsfuse -o allow_other my-bucket /path/to/mount/point
```

```bash
fusermount -u /path/to/mount/point
```

## Options / Props

| Item | Detail |
|------|--------|
| Role to mount, read, and write | Storage Object User (`roles/storage.objectUser`) on the bucket |
| Required permissions (subset of the role) | `storage.objects.create`, `storage.objects.delete`, `storage.objects.get`, `storage.objects.list`, `storage.objects.update` |
| Minimum role to mount and view | Storage Object Viewer (`roles/storage.objectViewer`); it contains `storage.objects.get` and `storage.objects.list`, so it can read object data but not write (see Notes) |
| `--implicit-dirs` / `implicit-dirs` | Shows implicitly defined and managed folders in flat-namespace buckets |
| `--only-dir` / `only-dir` | Mounts a single directory within the bucket |
| `--foreground` / `foreground` | Keeps `gcsfuse` in the foreground (for example, debug logging) |
| `-o ro` | Read-only mount |
| `fstab` `rw` | Read and write permissions |
| `fstab` `noauto` | Do not mount at boot |
| `fstab` `user` | Lets any user mount; then `mount /mount/point` works as non-root |
| `fstab` `_netdev` | Wait for the network before mounting at boot |
| `fstab` `uid`, `gid` | Mount automatically as a specific non-root user |

## Notes

- Reboot: remount the bucket, or use persistent mounting.
- By default the mount point is accessible only to the invoking user (a FUSE kernel security measure). To let others access it without mounting as root, add `user_allow_other` to `/etc/fuse.conf`.
- Managed folders: empty managed folders do not appear; IAM on a managed folder cannot be set or managed through Cloud Storage FUSE; `cp` and `mv` of a managed folder do not keep its IAM policies, so set new ones.
- Flags in `/etc/fstab` and `mount -o` must use underscores instead of hyphens.
- `allow_other` exposes the mounted bucket to other local users; use it only when that is intended.
- Distance: Cloud Storage FUSE gives file-system access to Google Cloud's object storage; it is not an object API and is distinct from Cloudflare R2 (`cloudflare-storage`) and Supabase Storage (`supabase`). Application Default Credentials setup is covered by the `gcp-foundation` skill.
- Source inconsistency: the FUSE page says Storage Object Viewer "contains the `storage.objects.list` permission, but doesn't allow you to perform read or write operations", but the Cloud Storage IAM page and the IAM roles reference say `roles/storage.objectViewer` contains `storage.objects.get` and `storage.objects.list`, so it can read object data. The table above follows the IAM reference; do not grant this role expecting it to expose only object names.
- The five permissions in the table are the source's "Required permissions" list; `roles/storage.objectUser` contains more (28 permissions in the IAM roles reference, including `storage.objects.restore`, `storage.objects.move`, `storage.folders.*` and `storage.managedFolders.*`).
- Source inconsistency: this page documents and uses the read-only option as lowercase `-o ro`; the Cloud Storage FUSE overview page writes it as `-o RO` (retention-policy limitation); use lowercase `-o ro`.
- Source: https://docs.cloud.google.com/storage/docs/access-control/iam (Storage Object Viewer permissions; retrieved 2026-11-15)
- Source: https://docs.cloud.google.com/iam/docs/roles-permissions/storage (IAM roles reference for Cloud Storage; retrieved 2026-11-14)
- Source: https://docs.cloud.google.com/storage/docs/cloud-storage-fuse/mount-bucket (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)

## Related

- [overview.md](./overview.md)
- [install.md](./install.md)
- [file-caching.md](./file-caching.md)
