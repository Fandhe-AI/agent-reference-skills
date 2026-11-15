---
source: https://docs.cloud.google.com/storage/docs/interoperability
---

# Interoperability with other storage platforms

Cloud Storage interoperates with some other object storage platforms such as Amazon S3 through the XML API, the gcloud CLI and Storage Transfer Service.

## Signature / Usage

### gcloud CLI with Amazon S3

After adding Amazon S3 credentials to `~/.aws/credentials`, `gcloud storage` can manage objects in S3 buckets.

```bash
gcloud storage ls s3://my-aws-bucket
```

```bash
gcloud storage rsync s3://my-aws-bucket gs://example-bucket --delete-unmatched-destination-objects --recursive
```

### S3 bucket names containing dots

Amazon S3 does not support virtual-hosted bucket URLs with dots, so gcloud may report `invalid certificate`. Use path-style URLs by setting `storage/s3_endpoint_url`:

```text
storage/s3_endpoint_url https://s3.REGION_CODE.amazonaws.com
```

The block is the property name and value, not a shell command. `REGION_CODE` is the region of the bucket, for example `us-east-2`. Set the property with `gcloud config set` (applies to all commands) or in a named configuration applied per command with the `--configuration` flag.

## Notes

- `--delete-unmatched-destination-objects` is destructive: it deletes objects in the destination bucket that are not in the source. Try it on a disposable bucket first, or omit it.
- XML API tools and libraries: change the request endpoint to `https://storage.googleapis.com` and configure them with Cloud Storage HMAC keys; the V4 signing process (RSA signature or S3 workflow with HMAC credentials) puts the signature in the `Authorization` header. See https://docs.cloud.google.com/storage/docs/aws-simple-migration.
- Storage Transfer Service imports online data from Amazon S3, Azure Blob Storage and HTTP/HTTPS sources, supports recurring transfers, deleting source objects and object selection; event-driven transfers can keep a bucket in sync with S3 using Amazon S3 Event Notifications.
- Amazon S3 is a trademark of Amazon.com, Inc. or its affiliates.
- Cloud Storage is Google Cloud's object storage; it is distinct from Cloudflare R2 (`cloudflare-storage`) and Supabase Storage (`supabase`).
- Source: https://docs.cloud.google.com/storage/docs/interoperability (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)

## Related

- [xml-api-overview.md](./xml-api-overview.md)
- [hmackeys.md](./hmackeys.md)
- [gsutil-transition-to-gcloud.md](./gsutil-transition-to-gcloud.md)
