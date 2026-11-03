---
source: https://developers.cloudflare.com/r2/platform/release-notes/
---

# Release notes

Changes and updates to Cloudflare R2 (most recent entries shown; see the official page for the full history).

## Signature / Usage

```txt
2026-04-27  Empty a bucket or delete folders from the R2 dashboard.
2025-07-03  CRC-64/NVME checksum supported for single and multipart objects; FULL_OBJECT checksum type on multipart uploads.
2024-12-03  SSE-C available to all users via Workers and S3-compatible APIs.
2024-11-21  Sippy can be enabled on buckets in jurisdictions (EU, FedRAMP).
2024-11-20  Oceania (OC) region; default maximum buckets per account is 1 million; Smart Tiered Cache for custom domains.
2024-11-19  Wrangler r2 bucket lifecycle command (list, add, remove).
2024-11-14  Wrangler r2 bucket info command.
2024-11-08  Wrangler r2 bucket dev-url command (enable, disable, status of r2.dev URL).
2024-11-06  Wrangler r2 bucket domain command (list, add, remove, update custom domains).
2024-10-21  Event notifications for buckets in jurisdictions.
2024-09-26  Event notifications GA: up to 5,000 messages/second per Queue, dashboard and Wrangler, lifecycle delete support.
2024-09-18  Set and update minimum TLS version for custom domains.
```

## Notes

- 2025-09-23: the dashboard disables the delete action on objects with a bucket lock rule applied (previously they momentarily vanished from the table).
- 2025-09-22: refreshed R2 dashboard design.
- Note: the 2024-11-20 entry states the default maximum buckets per account is 1 million, while the Limits page lists a default of 100,000.

## Related

- [Limits](./platform-limits.md)
- [Wrangler commands](./wrangler-commands.md)
