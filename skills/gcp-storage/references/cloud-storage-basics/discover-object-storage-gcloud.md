---
source: https://docs.cloud.google.com/storage/docs/discover-object-storage-gcloud
---

# Discover object storage with the Google Cloud CLI

Quickstart that uses `gcloud storage` to create a bucket, upload and download an object, copy into a simulated folder, list contents, change access and clean up. It typically uses less than $0.01 USD of resources.

## Signature / Usage

Replace `BUCKET_NAME` with a globally unique bucket name and `OBJECT_LOCATION` with the local path of a file. In Cloud Shell or a Compute Engine instance the Google Cloud SDK is pre-installed and authenticated; if a Compute Engine instance has no Cloud Storage service account scope, run `gcloud init`.

### Create a bucket

```bash
gcloud storage buckets create gs://BUCKET_NAME/ --uniform-bucket-level-access
```

A name already in use returns `ServiceException: 409 Bucket my-awesome-bucket already exists.`

### Upload, download, copy

```bash
gcloud storage cp OBJECT_LOCATION gs://BUCKET_NAME
```

```bash
gcloud storage cp gs://BUCKET_NAME/kitten.png Desktop/kitten2.png
```

```bash
gcloud storage cp gs://BUCKET_NAME/kitten.png gs://BUCKET_NAME/quickstart-folder/kitten3.png
```

### List

```bash
gcloud storage ls gs://BUCKET_NAME
```

```bash
gcloud storage ls gs://BUCKET_NAME/kitten.png --long
```

### Make objects public, then remove

Grants all users read access to the objects in the bucket (public access).

```bash
gcloud storage buckets add-iam-policy-binding gs://BUCKET_NAME --member=allUsers --role=roles/storage.objectViewer
```

```bash
gcloud storage buckets remove-iam-policy-binding gs://BUCKET_NAME --member=allUsers --role=roles/storage.objectViewer
```

### Delete an object and clean up

```bash
gcloud storage rm gs://BUCKET_NAME/kitten.png
```

```bash
gcloud storage rm gs://BUCKET_NAME --recursive
```

## Options / Props

Bucket naming requirements:

| Rule | Detail |
|---|---|
| Characters | Lowercase letters, numbers, dashes (`-`), underscores (`_`), dots (`.`); no spaces; names with dots require domain verification |
| Start / end | Must start and end with a number or letter |
| Length | 3-63 characters; names with dots up to 222 characters, each dot-separated component at most 63 |
| Not an IP | Cannot be an IP address in dotted-decimal notation (for example 192.168.5.4) |
| Prefix | Cannot begin with `goog` |
| Content | Cannot contain `google` or close misspellings such as `g00gle` |

## Notes

- Makes the bucket publicly accessible; use only for intentionally public content. After removing public access, cached copies may remain accessible for a period of time.
- Do not put sensitive information in the bucket name: the namespace is global and publicly visible.
- `gcloud storage rm gs://BUCKET_NAME --recursive` is destructive: it deletes the bucket and everything in it. Try it on a disposable bucket first.
- The source also shows granting `roles/storage.objectCreator` to a single user with `add-iam-policy-binding` / `remove-iam-policy-binding`, and a console quickstart link.
- Source: https://docs.cloud.google.com/storage/docs/discover-object-storage-gcloud (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)

## Related

- [buckets.md](./buckets.md)
- [objects.md](./objects.md)
- [gsutil-transition-to-gcloud.md](./gsutil-transition-to-gcloud.md)
