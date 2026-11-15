---
source: https://docs.cloud.google.com/storage/docs/cloud-storage-fuse/overview
---

# Cloud Storage FUSE overview

Cloud Storage FUSE is an open source FUSE adapter (supported by Google) that mounts Cloud Storage buckets as local file systems, so applications can read and write objects with file system semantics. It translates `/` in object names into directories, can run anywhere with connectivity to Cloud Storage (GKE, Compute Engine VMs, on-premises), and is not POSIX compliant.

## Signature / Usage

### Show which Cloud Storage operations a FUSE command triggers

Set `--log-severity` (CLI) or `logging:severity` (config file) to `TRACE`:

```bash
gcsfuse --log-severity=TRACE example-bucket mp
```

### Directory semantics

Flat-namespace buckets contain implicitly defined directories (simulated folders, managed folders) that are not visible by default. Mount with `--implicit-dirs` (or the `implicit-dirs` config field) to see them; buckets with hierarchical namespace need no flag.

```bash
gcsfuse --implicit-dirs my-bucket /path/to/mount/point
```

Snippet taken from https://docs.cloud.google.com/storage/docs/cloud-storage-fuse/mount-bucket (the overview page shows this option only inline).

## Options / Props

### Supported platforms

| Item | Values |
|------|--------|
| Frameworks validated | TensorFlow V2.x, TensorFlow V1.x, PyTorch V2.x, PyTorch V1.x, JAX 0.4.x |
| Operating systems | Rocky Linux 8.9 or later, Ubuntu 18.04 or later, Debian 10 or later, CentOS 7.9 or later, RHEL 7.9 or later, SLES 15 or later |
| Architectures | x86_64, ARM64 |

### Retry behavior

| Behavior | Value |
|----------|-------|
| Failed requests | Retried with exponential backoff up to a max backoff of `30s` by default; set with `--max-retry-sleep` or `gcs-retries:max-retry-sleep` |
| Stalled `GET` / `READ` | Dynamic timeout based on the 99th percentile latency of past requests, 1.5-second minimum; request is cancelled and retried |
| Stalled upload chunk | Retried after 10 seconds, at most four retries per chunk |

### FUSE operations and the JSON API operations they trigger

| Command | JSON API operations |
|---------|---------------------|
| `gcsfuse --log-severity=TRACE example-bucket mp` | Objects.list (to check credentials) |
| `cd mp` | n/a |
| `ls mp` | Objects.list("") |
| `mkdir subdir` | Objects.get("subdir"), Objects.get("subdir/"), Objects.insert("subdir/") |
| `cp ~/local.txt subdir/` | Objects.get("subdir/local.txt"), Objects.get("subdir/local.txt/"), Objects.insert("subdir/local.txt") to create an empty object, Objects.insert("subdir/local.txt") when closing after done writing |
| `rm -rf subdir` | Objects.list("subdir"), Objects.list("subdir/"), Objects.delete("subdir/local.txt"), Objects.list("subdir/"), Objects.delete("subdir/") |

### Integrations

| Product | How Cloud Storage FUSE is used |
|---------|-------------------------------|
| AI Hypercomputer | Recommended for AI/ML; mount buckets as local file systems |
| Batch | Specify a bucket in a job definition; it is mounted on the job VMs |
| Managed Service for Apache Airflow | Maps bucket folders to Airflow components |
| Cloud Run | Mount a bucket as a volume; content appears as files in the container file system |
| Cluster Toolkit | Create or mount a bucket from a blueprint YAML module |
| Dataflow | Mount buckets onto the worker file system for Beam pipeline code |
| Deep Learning Containers | Use the Cloud Storage FUSE CSI driver (recommended) or install Cloud Storage FUSE |
| Deep Learning VM Images | Pre-installed |
| GKE | Cloud Storage FUSE CSI driver consumes buckets as volumes |
| Vertex AI training | Mounted file system for custom training |
| Vertex AI Workbench | Cloud Storage integration in JupyterLab |

## Notes

- Version 3.7.1 and later support Rapid Bucket with an optimized read path.
- Three caches exist: file caching, stat caching, and list caching.
- Auth uses Application Default Credentials; bucket content access is governed by IAM, local system permissions protect the mount point and locally cached data.
- Pricing: Cloud Storage FUSE is free, but the storage, metadata, and network I/O it generates are charged like any other Cloud Storage interface. Aggressively flushing logs from many machines can incur charges quickly.
- Limitation, metadata: object metadata is not transferred on upload except mtime and symlink targets.
- Limitation, concurrency: when multiple mounts write the same object simultaneously, the first to flush wins; other mounts get a `syscall.ESTALE` error. Concurrent writes to the same object from the same mount are supported. Avoid multiple sources modifying the same object.
- Limitation: no hard links; no file locking or file patching (do not store version control repositories on a mount). Patching an object re-uploads the entire file; only appending to a file of 2 MB and larger re-uploads only the appended content.
- Limitation, semantics: no last access time; some metadata operations such as directory rename are not atomic unless the bucket has hierarchical namespace enabled.
- Limitation, access: authorization is governed by Cloud Storage permissions; POSIX-style access control does not work.
- Limitation, performance: much higher latency than a local file system; do not use as a database backend. Larger files or multiple files at a time improve throughput.
- Limitation, versioning: buckets with object versioning enabled are not formally supported and can behave unpredictably.
- Limitation, gzip: objects with `content-encoding: gzip` are not decompressively transcoded; they are returned compressed. Editing them through the mount can produce unpredictable behavior.
- Limitation, retention: writing to a bucket with a retention policy fails; reading is supported only if mounted read-only with `-o RO`.
- Limitation, local storage: new or modified objects are stored entirely in a local temporary file until closed or synced; ensure enough local capacity.
- Limitation, file handles: the Linux kernel default is 1,024 open file handles. When serving web content on Cloud Run from a mount, maximum concurrent requests per instance is restricted to less than 1,000.
- Limitation, `rsync`: reads and writes one file at a time; use `gcloud storage rsync` for parallel transfers.
- Limitation, listing: `ls` on a mounted bucket calls the paginated Objects: list API and can be expensive and slow for large buckets.
- For a POSIX file system on Google Cloud, the source points to Managed Lustre or Filestore.
- Distance: Cloud Storage is Google Cloud's object storage; Cloud Storage FUSE is a file-system adapter on top of it. Distinct from Cloudflare R2 (`cloudflare-storage`) and Supabase Storage (`supabase`).
- The source also links to the open GitHub issues for known issues and to the semantics document in the gcsfuse repository.
- Source inconsistency: this page writes the read-only option as `-o RO`; the mount-bucket page documents and uses lowercase `-o ro`.
- Source: https://docs.cloud.google.com/storage/docs/cloud-storage-fuse/overview (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/storage/docs/cloud-storage-fuse/mount-bucket (retrieved 2026-11-15; snippet)

## Related

- [install.md](./install.md)
- [mount-bucket.md](./mount-bucket.md)
- [file-caching.md](./file-caching.md)
