# Deploy: Netlify

Deploying Inngest functions on Netlify using the `netlify-plugin-inngest` build plugin for automatic app synchronization.

## Signature / Usage

```bash
npm install --save-dev netlify-plugin-inngest
```

```toml
# netlify.toml
[[plugins]]
package = "netlify-plugin-inngest"

  # optional: override defaults
  [plugins.inputs]
    host = "https://my-specific-domain.com"
    path = "/api/inngest"
```

## Options / Props

| Input | Type | Default | Description |
|-------|------|---------|-------------|
| `host` | `string` | Primary Netlify domain | Domain where the Inngest app is accessible |
| `path` | `string` | `/api/inngest` | URL path for the serve endpoint |

## Notes

- The plugin automatically syncs your Inngest app with Inngest Cloud on every Netlify deploy
- Both `host` and `path` inputs are optional; omit them if your app is served at `/api/inngest` on the primary Netlify domain
- Set `INNGEST_SIGNING_KEY` and `INNGEST_EVENT_KEY` in your Netlify project's environment variables (Netlify UI → Site settings → Environment variables)
- For branch preview environments, set `INNGEST_ENV` to `BRANCH` so the SDK routes events to the correct branch environment

## Related

- [Environments](./environments.md)
- [Signing Keys](./signing-keys.md)
- [Deploy: Vercel](./deploy-vercel.md)
- [Deploy: Cloudflare](./deploy-cloudflare.md)
