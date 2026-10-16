# React Runtime & Experimental Features

`next.config.js` options that toggle React runtime behavior, Server Actions, and experimental React APIs surfaced through Next.js.

## reactStrictMode

Enables React's [Strict Mode](https://react.dev/reference/react/StrictMode) for the whole app.

```js filename="next.config.js"
module.exports = {
  reactStrictMode: true,
}
```

- Default `true` for the App Router since Next.js 13.5.1 (only needed to opt in for Pages Router); can still be disabled with `reactStrictMode: false`.
- Can be adopted incrementally per-page with `<React.StrictMode>` instead of globally.

## reactCompiler

Enables the [React Compiler](https://react.dev/learn/react-compiler/introduction) to auto-optimize component rendering (reduces need for manual `useMemo`/`useCallback`).

```js filename="next.config.js"
module.exports = {
  reactCompiler: true,
}
```

Requires installing `babel-plugin-react-compiler` as a dev dependency.

| Name | Type | Description |
|------|------|-------------|
| `reactCompiler` | `boolean \| { compilationMode: 'annotation' }` | `true` compiles all relevant files; `{ compilationMode: 'annotation' }` requires opting in per component/hook via the `"use memo"` directive (and `"use no memo"` to opt out). |

- Next.js applies a custom SWC pre-pass so the Babel-based compiler only runs on files with JSX/hooks (faster than plain Babel plugin usage), though builds may still be marginally slower than the default Rust compiler.
- `reactCompiler: { environment: { enablePreserveExistingMemoizationGuarantees: false } }` configures whether the compiler preserves existing memoization guarantees from `useMemo`, `useCallback` and `React.memo`. When omitted, Next.js uses the default of the active compiler implementation; defaults differ between implementations and versions, so set it explicitly for consistent behavior.
- With Turbopack, `experimental.turbopackRustReactCompiler` runs the native Rust port instead of the Babel plugin (see bundling.md).
- Version history: `v16.0.0` stabilized `reactCompiler` and moved it from `experimental.reactCompiler` to the top-level option.

## reactMaxHeadersLength

Sets the max length (bytes) of headers React emits during prerendering for resource preloading (fonts, scripts, stylesheets).

```js filename="next.config.js"
module.exports = {
  reactMaxHeadersLength: 1000, // default: 6000
}
```

- App Router only.
- Lower it if a reverse proxy between browser and server truncates long headers.

## serverActions

Configures Server Actions request behavior.

```js filename="next.config.js"
module.exports = {
  experimental: {
    serverActions: {
      allowedOrigins: ['my-proxy.com', '*.my-proxy.com'],
      bodySizeLimit: '2mb',
    },
  },
}
```

| Name | Type | Description |
|------|------|-------------|
| `allowedOrigins` | `string[]` | Extra hosts allowed to invoke Server Actions. CSRF protection compares the host of the request's `Origin` header against the app's own host (`x-forwarded-host` or `host`); same-origin only by default. A request with no `Origin` header is allowed through with a warning. |
| `bodySizeLimit` | `number \| string` | Max Server Action request body size (bytes or `'500kb'`/`'2mb'` style string). Default `1MB`. |

- `allowedOrigins` matching: only the `host` of the `Origin` header is matched (hostname plus port when the URL carries one, e.g. `my-proxy.com:8443`); write entries the same way. `*` stands in for exactly one label and `**` for one or more (only at the start of a pattern); partial replacement (`app-*.my-proxy.com`) is unsupported; a port cannot be wildcarded, so write it in full.
- Behind a reverse proxy, no entry is needed if the proxy forwards the public host in `x-forwarded-host`; when it forwards its own host, add the host visible in the browser's address bar.
- The `allowedOrigins` check runs in production as well as development. For remote development through a tunnel, list the tunnel hostname both in `allowedDevOrigins` (so the dev server serves its assets) and in `serverActions.allowedOrigins` (so actions are accepted).
- `bodySizeLimit` applies to the raw HTTP body including `multipart/form-data` boundary/header overhead — leave ~10-20 KB headroom for uploads near the limit.
- Server Actions are stable and enabled by default since Next.js 14; `experimental.serverActions: true` was only needed on v13.

## viewTransition

**Experimental.** Enables React's View Transitions API integration for animating navigations/content changes.

```js filename="next.config.js"
module.exports = {
  experimental: {
    viewTransition: true,
  },
}
```

- Enables Next.js-side integration (e.g. triggering transitions on route navigation) for React's `<ViewTransition>` component (imported from `react` directly).
- Removed in `v16.3.0`: the `experimental.viewTransition` config page no longer exists in the `v16.3.0` / `v16.4.2` docs. View transitions now work in the App Router with no configuration (React 19.3 ships `<ViewTransition>` and `addTransitionType`); see the View Transitions guide.

## authInterrupts

**Experimental (canary).** Enables the `forbidden()` and `unauthorized()` APIs and their `forbidden.js` / `unauthorized.js` file conventions.

```js filename="next.config.js"
module.exports = {
  experimental: {
    authInterrupts: true,
  },
}
```

## taint

**Experimental.** Enables React's experimental tainting APIs to mark sensitive server data so it throws if passed across the Server-Client boundary.

```js filename="next.config.js"
module.exports = {
  experimental: {
    taint: true,
  },
}
```

- Enables `experimental_taintObjectReference` (taint an object reference) and `experimental_taintUniqueValue` (taint a specific value, e.g. an API key) from `react`.
- Enabling this flag also switches the App Router to React's `experimental` release channel, and taints `process.env` so it cannot be passed whole to a Client Component (the taint applies to the object reference only: reading `process.env.MY_VAR` or passing a copy like `{ ...process.env }` is unaffected).
- Caveats: tainting tracks objects **by reference** (copies are untainted); does not propagate to values *derived* from a tainted value (must taint the derived value separately too); not a substitute for proper data modeling — don't rely on it as the sole safeguard against leaking sensitive data.

## useOffline

**Experimental** (introduced in `v16.x.0`; the docs do not state the minor version). Enables offline connectivity detection and automatic retry of failed navigation, prefetch and Server Action requests, and makes the `useOffline` hook available from `next/offline` (see `../functions/use-offline.md`).

```js filename="next.config.js"
module.exports = {
  experimental: {
    useOffline: true,
  },
}
```

- Listens for the browser `offline` / `online` events and detects network failures (a non-abort, non-timeout `fetch()` rejection) on navigation, prefetch and Server Action requests, then polls with `HEAD` requests (to the current page URL with the RSC header, aborted after 200 ms; a timeout also counts as online) until connectivity returns.
- Backoff steps: 500 ms, 1 s, 2 s, then 3 s cap; the loop never gives up on its own. Blocked requests are retried once when the check succeeds; prefetches go through the existing prefetch queue.

## Related

- [caching.md](./caching.md) (`cacheComponents`, which also affects App Router rendering defaults)
- [bundling.md](./bundling.md)
