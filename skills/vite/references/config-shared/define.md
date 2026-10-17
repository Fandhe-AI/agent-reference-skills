---
source: https://vite.dev/config/shared-options#define
---

# define

Global constant replacements. Entries are defined as globals during dev and statically replaced during build.

## Signature / Usage

```js
export default defineConfig({
  define: {
    __APP_VERSION__: JSON.stringify('v1.0.0'),
    __API_URL__: 'window.__backend_api_url',
  },
})
```

TypeScript declaration in `vite-env.d.ts`:

```ts
// vite-env.d.ts
declare const __APP_VERSION__: string
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `define` | `Record<string, any>` | Replacement map. Values must be a string containing a JSON-serializable value (null, boolean, number, string, array, or object) or a single identifier. |

## Notes

- Replacement uses Oxc's define feature. Non-string values are converted with `JSON.stringify` automatically.
- For TypeScript users, add the type declarations in `vite-env.d.ts` for type checks and Intellisense.
- To expose an unprefixed env variable, use `define` (e.g. `'import.meta.env.ENV_VARIABLE': JSON.stringify(process.env.ENV_VARIABLE)`).

## Related

- [envDir / envPrefix](./env-dir-prefix.md)
- [Using Environment Variables in Config](./env-in-config.md)
