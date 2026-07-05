# Development Environment Options

`next.config.js` options that only affect local development server behavior.

## allowedDevOrigins

Configures additional origins allowed to request the dev server (Next.js blocks cross-origin requests to dev-only assets by default).

```js filename="next.config.js"
module.exports = {
  allowedDevOrigins: ['local-origin.dev', '*.local-origin.dev'],
}
```

## devIndicators

Configures the on-screen indicator that shows context about the current route during development.

```ts filename="next.config.ts"
const nextConfig: NextConfig = {
  devIndicators: {
    position: 'bottom-right', // 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right'
  },
}
```

Set `devIndicators: false` to hide it entirely (compile/runtime errors still surface).

| Name | Type | Description |
|------|------|-------------|
| `position` | `'bottom-left' \| 'bottom-right' \| 'top-left' \| 'top-right'` | Where the indicator renders. Default `bottom-left`. |

- Use `next build --debug` to check whether a route is static (`○`) or dynamic (`ƒ`) if the indicator marks it unexpectedly.
- `appIsrStatus`, `buildActivity`, `buildActivityPosition` were deprecated in `15.2.0` and removed in `16.0.0`.

## httpAgentOptions

Controls HTTP Keep-Alive for server-side `fetch()` calls (relevant for Node.js < 18, where `fetch()` is polyfilled with undici).

```js filename="next.config.js"
module.exports = {
  httpAgentOptions: {
    keepAlive: false,
  },
}
```

## onDemandEntries

Controls how the dev server disposes or keeps built pages in memory.

```js filename="next.config.js"
module.exports = {
  onDemandEntries: {
    maxInactiveAge: 25 * 1000, // ms to keep pages in buffer
    pagesBufferLength: 2, // number of pages kept without disposal
  },
}
```

| Name | Type | Description |
|------|------|-------------|
| `maxInactiveAge` | `number` | Period (ms) the server keeps pages in the buffer. |
| `pagesBufferLength` | `number` | Number of pages kept simultaneously without being disposed. |

## Related

- [deployment options](./deployment.md)
