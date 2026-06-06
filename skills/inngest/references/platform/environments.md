# Environments

Isolated execution contexts for the full development lifecycle — production, branch, custom, and local.

## Signature / Usage

```ts
// Configure the target environment in the Inngest client
const inngest = new Inngest({
  id: "my-app",
  env: process.env.BRANCH, // set to branch name for branch environments
});
```

## Options / Props

| Environment Type | Description |
|------------------|-------------|
| Production | Hosts all production apps, functions, and event data |
| Branch | On-demand sandbox per Git branch; shares keys with all other branch envs |
| Custom | Shared non-production space (staging, QA, canary); isolated keys and data |
| Local | Uses the Inngest Dev Server; no billing, no keys required |

## Notes

- Data is fully isolated between environments — same function names do not share data or logs
- Branch environments are created on demand when events are sent or functions registered
- All branch environments share the same Event Keys and Signing Key, enabling a single environment variable set to cover all preview deployments
- Branch environments auto-archive 3 days after the latest deploy; each new deploy extends this window by 3 days. Archiving prevents function triggers but does not delete data
- Custom environments execute at lower priority than production, which may cause higher latency
- Automatic branch detection by platform:
  - Vercel: `VERCEL_GIT_COMMIT_REF` (auto-detected by the SDK)
  - Netlify: `BRANCH`
  - Cloudflare Pages: `CF_PAGES_BRANCH`
  - Railway: `RAILWAY_GIT_BRANCH`
  - Render: `RENDER_GIT_BRANCH`
- You are billed across all environments except local

## Related

- [Signing Keys](./signing-keys.md)
- [Event Keys](./event-keys.md)
- [Branch Environments (deploy guides)](./deploy-vercel.md)
