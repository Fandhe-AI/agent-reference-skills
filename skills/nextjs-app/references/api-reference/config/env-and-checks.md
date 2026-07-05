# Environment, Build Checks & Diagnostics

`next.config.js` options for bundling environment variables, controlling TypeScript build-error strictness, dev logging, and Web Vitals attribution.

## env

**Legacy.** Adds environment variables directly into the JS bundle at build time.

```js filename="next.config.js"
module.exports = {
  env: {
    customKey: 'my-value',
  },
}
```

```jsx
function Page() {
  return <h1>{process.env.customKey}</h1> // replaced with 'my-value' at build time
}
```

- Values set here are **always** included in the client bundle (the `NEXT_PUBLIC_` prefix convention only applies to variables from the environment or `.env` files, not this option).
- Destructuring `process.env` (`const { customKey } = process.env`) does not work, due to webpack `DefinePlugin` string replacement semantics.
- Superseded by the standard [environment variables](/docs/app/guides/environment-variables) approach (`.env` files, `NEXT_PUBLIC_` prefix) — prefer that instead.

## typescript (next.config.js option)

Controls TypeScript build-error strictness and the `tsconfig` path used by Next.js.

```js filename="next.config.js"
module.exports = {
  typescript: {
    ignoreBuildErrors: false,
    tsconfigPath: 'tsconfig.json',
  },
}
```

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `ignoreBuildErrors` | `boolean` | `false` | If `true`, `next build` completes even with TypeScript errors present (**skips type checking entirely** — does not just suppress errors). |
| `tsconfigPath` | `string` | `'tsconfig.json'` | Path to an alternate `tsconfig.json`, e.g. for relaxed settings in CI/monorepo builds while keeping the editor strict. |

- If `ignoreBuildErrors` is disabled, be sure type checks run elsewhere in your build/deploy pipeline (e.g. `tsc --noEmit` in CI) — otherwise this is dangerous.
- For the full TypeScript feature set (IDE plugin, statically typed links, route-aware type helpers), see the standalone [TypeScript page](./typescript.md).

## logging

Configures terminal logging behavior in development (fetch logging, Server Function calls, incoming requests, browser console forwarding).

```js filename="next.config.js"
module.exports = {
  logging: {
    fetches: { fullUrl: true, hmrRefreshes: true },
    serverFunctions: false,
    incomingRequests: { ignore: [/\/api\/v1\/health/] },
    browserToTerminal: 'warn',
  },
}
```

| Name | Type | Description |
|------|------|-------------|
| `fetches.fullUrl` | `boolean` | Logs the full fetch URL (dev only). |
| `fetches.hmrRefreshes` | `boolean` | Also logs fetches restored from the [Server Components HMR cache](./caching.md#servercomponentshmrcache) (off by default). |
| `serverFunctions` | `boolean` | Logs each Server Function call (name, args, duration); default `true` in dev. |
| `incomingRequests` | `false \| { ignore: RegExp[] }` | Disable, or filter out matched incoming requests from dev logs (dev only, no effect on production). |
| `browserToTerminal` | `'warn' \| 'error' \| boolean` | Forwards browser `console.*` calls to the terminal: `'warn'` (warnings/errors, default), `'error'` (errors only), `true` (all), `false` (off). Includes source file/line by default. |

- Set `logging: false` to disable all dev logging.
- `browserToTerminal` was moved from `experimental.browserDebugInfoInTerminal` and stabilized in `v16.2.0`; `incomingRequests` added in `v15.2.0`.

## webVitalsAttribution

**Experimental.** Enables per-metric Web Vitals attribution data (e.g. the specific element responsible for CLS/LCP) via `PerformanceEventTiming` / `PerformanceNavigationTiming` / `PerformanceResourceTiming` entries.

```js filename="next.config.js"
module.exports = {
  experimental: {
    webVitalsAttribution: ['CLS', 'LCP'],
  },
}
```

- Disabled by default; specify the metric names (`NextWebVitalsMetric` values) you want attribution for.

## Related

- [typescript.md](./typescript.md)
- [eslint.md](./eslint.md)
- [caching.md](./caching.md) (`serverComponentsHmrCache`)
