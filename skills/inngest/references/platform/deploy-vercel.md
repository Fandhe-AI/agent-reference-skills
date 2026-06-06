# Deploy: Vercel

Deploying Inngest functions on Vercel using the native integration or manual environment variable configuration.

## Signature / Usage

```ts
// app/api/inngest/route.ts (App Router)
import { serve } from "inngest/next";
import { inngest } from "@/inngest/client";
import { myFunction } from "@/inngest/functions";

export const { GET, POST, PUT } = serve({ client: inngest, functions: [myFunction] });
export const maxDuration = 300; // recommended: set to Vercel max
```

## Notes

- The Vercel integration automatically injects `INNGEST_SIGNING_KEY`, `INNGEST_EVENT_KEY`, and (optionally) `INNGEST_SERVE_ORIGIN` into your project
- Set `maxDuration = 300` on the Inngest API route to prevent premature timeouts for long-running functions
- When using checkpointing, set its `maxRuntime` to 20–40 % below your `maxDuration` value
- **Deployment Protection** may block Inngest's inbound requests. Options:
  1. Disable deployment protection
  2. Enable "Protection Bypass for Automation" (Vercel Pro), copy the secret, and add it to the Inngest Vercel integration settings as "Deployment protection key"
- For custom production domains, set `INNGEST_SERVE_ORIGIN` to override the auto-detected Vercel deployment URL
- Multiple apps: specify additional paths in Vercel Integration settings to run functions on separate bundles or edge runtimes
- For a dedicated staging environment, create a Custom Environment in both Vercel and Inngest, then manually add `INNGEST_SIGNING_KEY` and `INNGEST_EVENT_KEY` scoped to that environment only

## Related

- [Signing Keys](./signing-keys.md)
- [Event Keys](./event-keys.md)
- [Environments](./environments.md)
- [Deploy: Netlify](./deploy-netlify.md)
