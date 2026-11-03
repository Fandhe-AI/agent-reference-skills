---
source: https://developers.cloudflare.com/r2/buckets/storage-classes/
---

# Storage classes

Storage classes trade storage cost against access cost. Every object has a storage class: Standard or Infrequent Access.

## Signature / Usage

```sh
aws s3api copy-object \
  --endpoint-url https://<ACCOUNT_ID>.r2.cloudflarestorage.com \
  --bucket bucket-name \
  --key path/to/object.txt \
  --copy-source /bucket-name/path/to/object.txt \
  --storage-class STANDARD_IA
```

## Options / Props

| Storage class | Minimum storage duration | Data retrieval fees (processing) | Egress fees (data transfer to Internet) |
| --- | --- | --- | --- |
| Standard | None | None | None |
| Infrequent Access | 30 days | Yes | None |

## Notes

- All classes: compatible with Workers API, S3 API, and public buckets; 99.999999999% annual durability; no minimum object size.
- Standard is the default for new buckets. Infrequent Access has lower storage cost but retrieval fees and a 30-day minimum duration; you are charged for the minimum duration even if the object is deleted, moved, or replaced earlier.
- The default storage class of a bucket can be changed in the dashboard after creation.
- Change an existing object's class with `CopyObject` and the `x-amz-storage-class` header (`STANDARD` or `STANDARD_IA`).
- Lifecycle rules can transition Standard to Infrequent Access, but not back to Standard.

## Related

- [Object lifecycles](./buckets-object-lifecycles.md)
- [Pricing](./pricing.md)
- [S3 API compatibility](./s3-api-compatibility.md)
