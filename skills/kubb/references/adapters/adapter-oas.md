# @kubb/adapter-oas

The OpenAPI adapter sits between your spec and every Kubb plugin. It reads the spec from `input` (file, URL, inline content, or a parsed object), validates it, and converts each schema and operation into Kubb's universal AST that downstream plugins consume.

## Installation

```bash
bun add -d @kubb/adapter-oas@beta
pnpm add -D @kubb/adapter-oas@beta
npm install --save-dev @kubb/adapter-oas@beta
yarn add -D @kubb/adapter-oas@beta
```

## Signature / Usage

```typescript
import { defineConfig } from 'kubb'
import { adapterOas } from '@kubb/adapter-oas'
import { pluginTs } from '@kubb/plugin-ts'

export default defineConfig({
  input: './petStore.yaml',
  output: { path: './src/gen' },
  adapter: adapterOas({
    validate: true,
    server: { index: 0, variables: { env: 'prod' } },
    discriminator: 'propagate',
    enums: 'root',
    dateType: 'date',
    integerType: 'number',
    unknownType: 'unknown',
    emptySchemaType: 'unknown',
    enumSuffix: 'enum',
  }),
  plugins: [pluginTs()],
})
```

## Options / Props

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `validate` | `boolean` | `true` | Validate the spec before parsing |
| `contentType` | `'application/json' \| string` | — | Preferred media type for request and response schemas |
| `server` | `{ index?: number, variables?: Record<string, string> }` | — | Which spec server Kubb resolves into the document `baseURL` |
| `discriminator` | `'preserve' \| 'propagate'` | `'preserve'` | How `discriminator` fields are interpreted |
| `enums` | `'inline' \| 'root'` | `'inline'` | Where inline enums live |
| `dateType` | `false \| 'string' \| 'stringOffset' \| 'stringLocal' \| 'date'` | `'string'` | How `format: date-time` schemas are represented |
| `integerType` | `'number' \| 'bigint'` | `'bigint'` | How integers map to TypeScript |
| `unknownType` | `'any' \| 'unknown' \| 'void'` | `'any'` | Type for schemas Kubb cannot infer |
| `emptySchemaType` | `'any' \| 'unknown' \| 'void'` | `unknownType` value (`'any'` by default) | Type for empty schemas |
| `enumSuffix` | `string` | `'enum'` | Suffix for derived enum names |

## Dependencies

`@kubb/adapter-oas` has no plugin dependencies. Every other Kubb plugin depends on it, not the other way around.

## Notes

- `@kubb/adapter-oas` is currently `@beta` and belongs to Kubb v5. It supersedes the v3/v4 `@kubb/plugin-oas` flow documented elsewhere in this skill (`pluginOas()` inside `plugins: []`).
- In v5, `defineConfig` is imported from `kubb` (not `@kubb/core`), and the adapter is configured via a top-level `adapter: adapterOas({...})` key, not as an entry inside `plugins: []`. Do not mix the two config shapes.
- The resolved `baseURL` (from `server`) reaches banner functions through `BannerMeta.baseURL`; it does not set request URLs directly.
- Tip: pair `unknownType: 'unknown'` with `emptySchemaType: 'any'` for a safer fallback split.

## Related

- [@kubb/plugin-ts](../plugins/plugin-ts.md)
- [quick-start](../getting-started/quick-start.md)
