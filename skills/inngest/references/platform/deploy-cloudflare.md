# Deploy: Cloudflare Pages

Deploying Inngest functions on Cloudflare Pages.

## Signature / Usage

```js
// functions/api/inngest.js
import { serve } from "inngest/cloudflare";
import { inngest } from "../../inngest/client";
import { myFunction } from "../../inngest/functions";

export const onRequest = serve({ client: inngest, functions: [myFunction] });
```

## Notes

- After deploying, manually sync your app with Inngest Cloud via the dashboard (Apps → Sync App) or the REST API
- Required environment variables in Cloudflare Pages settings:
  - `NODE_VERSION`: `16`
  - `INNGEST_SIGNING_KEY`: from the Inngest dashboard
  - `INNGEST_EVENT_KEY`: from the Inngest dashboard
- Use `CF_PAGES_BRANCH` to set `INNGEST_ENV` for branch environment routing in preview deployments

## Related

- [Environments](./environments.md)
- [Signing Keys](./signing-keys.md)
- [Deploy: Vercel](./deploy-vercel.md)
- [Deploy: Netlify](./deploy-netlify.md)
