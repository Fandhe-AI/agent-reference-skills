---
source: https://docs.cloud.google.com/transfer-appliance/docs/4.0/known-limitations
---

# Transfer Appliance known limitations

Limits for data copied to a Transfer Appliance. If you plan to order many appliances and cannot follow these, run a proof-of-concept with one appliance and representative data first.

## Signature / Usage

The single file-share protocol is set at configuration time (snippet from the transfer-data page):

```bash
ta config --data_port=PORT --ip=IP_ADDRESS --fileshare=smb
```

## Options / Props

| Limit | Value |
|---|---|
| File share protocol | One per appliance; cannot run several or switch after configuration |
| Maximum file size | 5 TiB per object; larger objects fail |
| Maximum files per directory | 500,000 files or directories (avoids poor ingest performance) |
| Maximum path length | 1024 bytes, including the destination object prefix |
| Minimum file size | 1MB; archive many small files before copying |
| Preserved metadata | symlinks, numeric MODE, `mtime`; other metadata is not preserved |
| File names | Unicode-compatible, no newlines (a directory with newline names fails to copy) |
| File types | Regular files only; devices, named pipes, sockets unsupported; empty directories not created in Cloud Storage |

## Notes

- Changing the protocol after data transfer began requires resetting the appliance, which erases data already transferred (destructive). Order separate appliances for NFS and SMB.
- Replace newlines in file names before copying.
- Object versioning on the destination bucket can create multiple versions of the same object and extra storage cost; disable it on the destination bucket when ordering (https://docs.cloud.google.com/storage/docs/using-object-versioning#set).
- Source inconsistency: this page states the maximum file size as 5 TiB; the procedure guide states less than 5 terabytes (TB). 5 TB and 5 TiB differ by about 10%.
- Snippet taken from https://docs.cloud.google.com/transfer-appliance/docs/4.0/transfer-data.
- Source: https://docs.cloud.google.com/transfer-appliance/docs/4.0/known-limitations (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/transfer-appliance/docs/4.0/transfer-data (snippet; retrieved 2026-11-15)

## Related

- [transfer-data.md](./transfer-data.md)
- [procedure-guide.md](./procedure-guide.md)
