# Environment Variables

Next.js loads environment variables from `.env*` files into `process.env`, and can bundle variables for the browser when prefixed with `NEXT_PUBLIC_`.

## Signature / Usage

```txt filename=".env"
DB_HOST=localhost
NEXT_PUBLIC_ANALYTICS_ID=abcdefghijk
```

```js filename="app/api/route.js"
export async function GET() {
  const db = await myDB.connect({ host: process.env.DB_HOST })
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `NEXT_PUBLIC_` prefix | naming convention | Inlines the value into the client JS bundle at build time |
| `@next/env` `loadEnvConfig(dir)` | function | Loads `.env*` files outside the Next.js runtime (e.g. ORM config, test runner) |
| `$VARIABLE` in `.env` | reference syntax | Expands to another variable's value; escape with `\$` for a literal `$` |
| `.env.test` | file | Loaded only when `NODE_ENV=test`; `.env.local` is *not* loaded in test |

## Notes

- Non-`NEXT_PUBLIC_` variables are server-only; dynamic lookups (`process.env[varName]`) are **not** inlined even for `NEXT_PUBLIC_` variables — only static `process.env.NEXT_PUBLIC_X` references are replaced at build time.
- `NEXT_PUBLIC_` values are frozen at build time — promoting the same build/image across environments will carry the original build's values; for true runtime values, read `process.env.MY_VALUE` inside a dynamically-rendered Server Component (e.g. after `await connection()`).
- Load order (first match wins): `process.env` → `.env.$(NODE_ENV).local` → `.env.local` (skipped when `NODE_ENV=test`) → `.env.$(NODE_ENV)` → `.env`.
- With a `/src` folder, `.env*` files still belong at the project root, not inside `src/`.
- `.env*` files should be gitignored except `.env` and `.env.test` (defaults meant to be committed); `.env*.local` files should never be committed.

## Related

- [Instrumentation](./instrumentation.md)
