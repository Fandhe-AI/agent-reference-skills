---
source: https://developers.cloudflare.com/ai-search/get-started/, https://developers.cloudflare.com/ai-search/get-started/dashboard/
---

# Get started

Five ways to create and query an AI Search instance: Workers binding, Wrangler CLI, dashboard, Python SDK, or REST API.

## Signature / Usage

Snippet taken from https://developers.cloudflare.com/ai-search/get-started/wrangler/

```sh
wrangler ai-search create my-instance
wrangler ai-search stats my-instance
wrangler ai-search search my-instance --query "What is Cloudflare?"
```

### Dashboard flow

1. Go to **AI Search** in the Cloudflare dashboard and select **Create Instance**.
2. Name the instance; optionally connect a website or R2 bucket; review; **Create**.
3. Upload files under the **Items** tab (indexed automatically).
4. Test under the **Playground** tab with **Chat** or **Search**.

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| Workers API | guide | — | See get-started-workers.md. |
| CLI | guide | — | See get-started-wrangler.md. |
| REST API | guide | — | See get-started-rest-api.md. |
| Python SDK | guide | — | See get-started-python-sdk.md. |

## Related

- [Workers binding guide](./get-started-workers.md)
- [Wrangler guide](./get-started-wrangler.md)
- [REST API guide](./get-started-rest-api.md)
- [Python SDK guide](./get-started-python-sdk.md)
