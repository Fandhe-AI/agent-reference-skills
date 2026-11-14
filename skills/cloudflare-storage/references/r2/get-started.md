---
source: https://developers.cloudflare.com/r2/get-started/
---

# Get started

Choose how to access R2: Workers API, S3-compatible SDKs, CLI tools, or the dashboard.

## Signature / Usage

```sh
npx wrangler r2 bucket create my-bucket
```

## Options / Props

| Method | Use when |
| --- | --- |
| Workers API | You are building an application on Cloudflare Workers that needs to read or write from R2 |
| S3 | You want to use S3-compatible SDKs to interact with R2 in your existing applications |
| CLI tools | You want to upload, download, or manage objects from your terminal |
| Dashboard | You want to quickly view and manage buckets and objects in the browser |

## Notes

- Requires a Cloudflare account with an R2 subscription: in the dashboard select **Storage & databases > R2 > Overview** and complete the checkout flow.
- R2 is free to get started with included free monthly usage. You are billed monthly for usage.
- To develop and test against R2 on your local machine, see Local development (`local-development.md`).

## Related

- [Local development](./local-development.md)
- [Workers API](./get-started-workers-api.md)
- [S3](./get-started-s3.md)
- [CLI](./get-started-cli.md)
- [Pricing](./pricing.md)
