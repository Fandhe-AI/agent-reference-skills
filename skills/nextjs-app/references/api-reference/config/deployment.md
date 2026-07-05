# Deployment & Infrastructure Options

`next.config.js` options related to deployment, adapters, and infrastructure-level request handling.

## adapterPath

Configure a custom adapter for Next.js to hook into the build process, letting deployment platforms integrate with the build.

```js filename="next.config.js"
/** @type {import('next').NextConfig} */
const nextConfig = {
  adapterPath: require.resolve('./my-adapter.js'),
}

module.exports = nextConfig
```

- `NEXT_ADAPTER_PATH` env var can be used for zero-config usage in deployment platforms.
- See the dedicated Adapters section (`/docs/app/api-reference/adapters/*`) for building a full adapter (Configuration, Creating an Adapter, API Reference, Testing Adapters, Routing, Runtime Integration, Output Types).

## deploymentId

Sets an identifier for your deployment used for version skew protection and cache busting during rolling deployments.

```js filename="next.config.js"
module.exports = {
  deploymentId: 'my-deployment-id',
}
```

Can also be set via `NEXT_DEPLOYMENT_ID` env var (config value takes precedence if both set).

When configured, Next.js:
- Appends `?dpl=<deploymentId>` to static asset URLs
- Adds `x-deployment-id` header to client navigation requests
- Adds `x-nextjs-deployment-id` header to navigation responses
- Injects `data-dpl-id` attribute on `<html>`

On a deployment ID mismatch between client and server, a hard navigation (full reload) is triggered instead of client-side navigation. Stabilized in `v14.1.4` (was `experimental.deploymentId` since `v13.4.10`).

## proxyClientMaxBodySize

**Experimental.** Sets the max size Next.js buffers in memory for a proxied request body (default **10MB**).

```ts filename="next.config.ts"
const nextConfig: NextConfig = {
  experimental: {
    proxyClientMaxBodySize: '1mb', // or bytes as number, e.g. 1048576
  },
}
```

- Supported string units: `b`, `kb`, `mb`, `gb`
- If the body exceeds the limit, only the first N bytes are buffered, a warning is logged, and the request still proceeds (no error) with a partial body.
- Applies only when proxy is used; limit is per-request.

## htmlLimitedBots

Specifies user agents that receive blocking (non-streaming) metadata instead of [streaming metadata](/docs/app/api-reference/functions/generate-metadata#streaming-metadata).

```ts filename="next.config.ts"
const config: NextConfig = {
  htmlLimitedBots: /MySpecialBot|MyAnotherSpecialBot|SimpleCrawler/,
}
```

- Overrides (not extends) the built-in default bot list (Google crawlers, Bingbot, Twitterbot, Slackbot, etc.).
- Set to `/.*/ ` to fully disable streaming metadata for all bots.
- Introduced in `15.2.0`.

## Related

- [devIndicators / dev-environment options](./dev-environment.md)
- [Self-Hosting - Version Skew](/docs/app/guides/self-hosting#version-skew)
