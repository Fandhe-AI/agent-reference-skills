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
| `allowedOrigins` | `string[]` | Extra origins allowed to invoke Server Actions (CSRF protection compares request origin to host; same-origin only by default). |
| `bodySizeLimit` | `number \| string` | Max Server Action request body size (bytes or `'500kb'`/`'2mb'` style string). Default `1MB`. |

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
- Enabling this flag also switches the App Router to React's `experimental` release channel.
- Caveats: tainting tracks objects **by reference** (copies are untainted); does not propagate to values *derived* from a tainted value (must taint the derived value separately too); not a substitute for proper data modeling — don't rely on it as the sole safeguard against leaking sensitive data.

## Related

- [caching.md](./caching.md) (`cacheComponents`, which also affects App Router rendering defaults)
- [bundling.md](./bundling.md)
