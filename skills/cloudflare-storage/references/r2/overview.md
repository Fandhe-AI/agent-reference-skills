---
source: https://developers.cloudflare.com/r2/
---

# Cloudflare R2 Overview

Cloudflare R2 is object storage for large amounts of unstructured data without egress bandwidth fees.

## Signature / Usage

```sh
# Create a bucket, then upload and download an object with Wrangler
npx wrangler r2 bucket create my-bucket
wrangler r2 object put my-bucket/myfile.txt --file ./myfile.txt
wrangler r2 object get my-bucket/myfile.txt --file ./downloaded.txt
```

## Notes

- Use cases: storage for cloud-native applications, cloud storage for web content, podcast episodes, data lakes (analytics and big data), output of large batch processes such as machine learning model artifacts or datasets.
- Features: Location Hints (optional parameters at bucket creation to indicate the primary geographical location where data is expected to be accessed from), CORS, public buckets (expose bucket contents directly to the Internet), bucket scoped tokens (granular control over who can access data).
- Related products: Basin Catalog (managed Apache Iceberg data catalog built into an R2 bucket), Workers, Stream, Images.
- R2 is Cloudflare's S3-compatible object storage; for Supabase Storage see the supabase skill, for Vercel Blob see the vercel skill. Worker bindings are covered by the cloudflare-workers skill and Wrangler configuration by the cloudflare-wrangler skill.

## Related

- [Get started](./get-started.md)
- [How R2 works](./how-r2-works.md)
- [Pricing](./pricing.md)
