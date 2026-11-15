---
source: https://docs.cloud.google.com/storage-transfer/docs/known-limitations-transfer
---

# Known limitations of Storage Transfer Service

Limits of Cloud Storage and Storage Transfer Service that apply to all transfers, plus extra limits for file system (agent-based) transfers.

## Signature / Usage

Transfers involving a file system need agents; file-name and size limits below apply to the job. Example job that uses an agent pool:

```bash
gcloud transfer jobs create \
  gs://my-storage-bucket posix:///tmp/destination \
  --destination-agent-pool=my-destination-agent-pool
```

## Options / Props

| Limit | Value |
|---|---|
| Cloud Storage max single-object size | 5 TiB (larger objects fail to transfer) |
| Max path length (file system) | 1024 bytes, including destination prefix |
| Agents per agent pool | 100 |
| Agent pools per project | 800 |
| Agent memory | min 1 GiB; 6 GiB for high-performance uploads; 1 GB per 1 million files in the largest directory |
| Single transfer scale tested | hundreds of TB, up to 1 billion files, several 10s of Gbps |
| Change detection | no sub-hourly change detection; scans at most once an hour |
| Paused job | paused over 30 days = inactive: aborted and schedule disabled until re-enabled |
| File names | UTF-8, unicode-compatible, no `\n` or `\r` (otherwise the listing task fails; fix names and re-run) |
| File types | regular files and Unix hidden files (`.`); devices, named pipes, sockets raise `UNSUPPORTED_FILE_MODE` |

Behavior when a source object changes during transfer (source files are not locked):

| Direction | Behavior |
|---|---|
| Non-Google cloud to Google Cloud | Transfer of that object fails; not transferred |
| File system to Google Cloud | Retries upload; repeated failure logs `FILE_MODIFIED_FAILURE` |
| Google Cloud to file system | Retries download; repeated failure logs `PRECONDITION_FAILURE` |

To resolve: retry; if it keeps failing, prevent updates during transfer (Cloud Storage object hold, S3 Object Lock, Azure immutability policy, read-only files), then re-enable updates afterwards.

Job locations (chosen from the source bucket region; if unlisted, the default region of the outer region): africa-south1, asia-east1, asia-east2, asia-northeast1-3, asia-south1, asia-south2, asia-southeast1-3, asia1, australia-southeast1-2, europe-north1-2, europe-southwest1, europe-west1-4, europe-west6, europe-west8-10, europe-west12, me-central1-2, me-west1, nam4, northamerica-northeast1-2, northamerica-south1, southamerica-east1, southamerica-west1, us-central1-2, us-east1, us-east4, us-east5, us-east7, us-west1-4.

## Notes

- Transfer agents require Docker and run on Linux servers or VMs; mount CIFS/SMB volumes on a Linux host first.
- File system transfers: only the full contents of a file system directory (recursively) transfer per job; no globbing or filtering within a job (a manifest file, `--manifest-file`, can still list specific files). Split into multiple jobs for subdirectories or larger data sets. Agentless (cloud) transfers support object conditions such as include / exclude prefixes (see [create-transfers.md](./create-transfers.md)).
- Empty directories are not created in Cloud Storage (flat namespace); ADLS Gen2 hierarchical namespaces are not recreated.
- With "delete objects from source after transfer" on a version-suspended Amazon S3 bucket, the object with a null version ID is removed, not the current version. This option is destructive; try it on a disposable bucket first.
- Security: users who can create jobs can read from and write to any directory the agent can access. Running agents as root with access to the entire file system can let a malicious actor take over the host; restrict agent access to necessary directories (https://docs.cloud.google.com/storage-transfer/docs/on-prem-agent-details#restrict-directory-access).
- Snippet taken from https://docs.cloud.google.com/storage-transfer/docs/create-transfers.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/transfer/jobs/create (`--manifest-file`; retrieved 2026-11-14)
- Source: https://docs.cloud.google.com/storage-transfer/docs/known-limitations-transfer (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)

## Related

- [quotas.md](./quotas.md)
- [metadata-preservation.md](./metadata-preservation.md)
- [create-transfers.md](./create-transfers.md)
