# Upgrading to Version 15

Upgrade a Next.js application from version 14 to 15.

## Signature / Usage

```bash filename="Terminal"
npx @next/codemod@canary upgrade latest
```

## Breaking / notable changes

- **React 19**: minimum `react`/`react-dom` is 19; `useFormState` deprecated in favor of `useActionState`; `useFormStatus` gains `data`/`method`/`action` keys.
- **Async Request APIs**: `cookies()`, `headers()`, `draftMode()`, `params`, and `searchParams` become asynchronous (`await` required); temporary synchronous access still works with a dev warning and an `UnsafeUnwrapped*` typecast. Migrate with the `next-async-request-api` codemod.
- **`runtime` config**: `experimental-edge` value is now an error — use `'edge'` (`app-dir-runtime-config-experimental-edge` codemod).
- **`fetch` requests**: no longer cached by default; opt in per-request with `{ cache: 'force-cache' }`, or per route with `export const fetchCache = 'default-cache'`.
- **Route Handler `GET`**: no longer cached by default; opt in with `export const dynamic = 'force-static'`.
- **Client Cache**: page segments are no longer reused from the client cache on `<Link>`/`useRouter` navigation by default (still reused on back/forward and for shared layouts); opt in with the `staleTimes` config.
- `@next/font` package removed — use built-in `next/font` (`built-in-next-font` codemod).
- `experimental.bundlePagesExternals` → stable `bundlePagesRouterDependencies`; `experimental.serverComponentsExternalPackages` → stable `serverExternalPackages`.
- Auto instrumentation for Speed Insights removed — follow the Vercel Speed Insights Quickstart instead.
- `NextRequest.geo`/`.ip` removed — use `@vercel/functions`'s `geolocation()`/`ipAddress()` (`next-request-geo-ip` codemod).

## Notes

- If you see peer dependency warnings, update `react`/`react-dom` to the suggested versions or use `--force`/`--legacy-peer-deps`.
- If using TypeScript, also upgrade `@types/react` and `@types/react-dom`.

## Related

- [Codemods](./codemods.md)
- [Version 16 Upgrade](./version-16.md)
- [Version 14 Upgrade](./version-14.md)
