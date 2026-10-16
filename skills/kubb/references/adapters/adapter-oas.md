# @kubb/adapter-oas

The OpenAPI adapter is the first step of every build. It reads the spec from `input` (file, URL, inline content, or a parsed object), validates it, and converts each schema and operation into Kubb's universal AST, which every plugin generates code from. Its options therefore apply to all plugins (Kubb 5.11.0 docs).

It downloads a remote `input` URL and any remote `$ref`s with a plain GET request, without credentials. It also reads the local files that external `$ref`s point to, even outside the spec's folder, and never writes files.

## Installation

`kubb` ships the adapter and `defineConfig` uses `adapterOas()` by default, so no setup is needed. Set `adapter` only to change its options. The standalone package is `@kubb/adapter-oas`:

```bash
npm install --save-dev @kubb/adapter-oas
```

## Signature / Usage

```typescript
import { defineConfig } from 'kubb/config'
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
| `validate` | `boolean` | `true` | Validate the spec with `@readme/openapi-parser` before parsing. Each problem is a `KUBB_INVALID_SPEC` warning and generation continues. `false` skips the check (faster on a large spec). Run `kubb validate` to list every error |
| `contentType` | `'application/json' \| string` | — | Media type to keep when an operation declares several, for request bodies and responses. Without a value, every declared media type is kept |
| `server` | `{ index?: number, variables?: Record<string, string> }` | — | Which entry of the spec's `servers` array resolves into the document `baseURL`. `variables` fills `{variable}` placeholders, falling back to each variable's `default`. Omitted: `baseURL` is `null` |
| `discriminator` | `'preserve' \| 'propagate'` | `'preserve'` | `'preserve'` keeps child schemas as written. `'propagate'` pushes the discriminator property with its literal value into each child schema |
| `enums` | `'inline' \| 'root'` | `'inline'` | `'inline'` keeps each enum on its property. `'root'` lifts every inline enum to a top-level schema (for example `PetStatusEnum`) |
| `dateType` | `false \| 'string' \| 'stringOffset' \| 'stringLocal' \| 'date' \| { dateTime?, date?, time? }` | `'string'` | How `date-time`, `date`, and `time` are represented. `'date'` uses JavaScript `Date`. An object sets each format independently; omitted keys default to `'string'` |
| `integerType` | `'number' \| 'bigint'` | `'bigint'` | How `format: int64` / `uint64` schemas map to TypeScript. Other integers always map to `number`. `type: string` stays `string` whatever its format |
| `unknownType` | `'any' \| 'unknown' \| 'void'` | `'unknown'` | Type for schemas whose type cannot be inferred (`additionalProperties: true`, a missing `type`) |
| `emptySchemaType` | `'any' \| 'unknown' \| 'void'` | `unknownType` (`'unknown'` by default) | Type for empty schemas (`{}`) |
| `enumSuffix` | `string` | `'enum'` | Suffix for derived inline enum names (`PetStatusEnum`, or `PetStatusType` with `'type'`) |

## Dependencies

`@kubb/adapter-oas` has no plugin dependencies. Every other Kubb plugin depends on it, not the other way around.

## Notes

- Stable since Kubb 5.x (5.11.0); the previous `@beta` tag is not needed. It supersedes the v3/v4 `@kubb/plugin-oas` flow (`pluginOas()` inside `plugins: []`), which no longer exists
- `defineConfig` (imported from `kubb/config`) supplies `adapterOas()`, the TypeScript/TSX/Markdown parsers, and a barrel plugin by default. Configure the adapter through the top-level `adapter: adapterOas({...})` key, not as an entry inside `plugins: []`
- Migration (v4 → v5): `dateType`, `integerType`, `unknownType`, `emptySchemaType`, `enumSuffix`, and `contentType` move from plugin options to `adapterOas`; `serverIndex` / `serverVariables` become `server: { index, variables }`; `discriminator: 'strict'` becomes `'preserve'` and `'inherit'` becomes `'propagate'`. Set `integerType: 'number'` to retain the v4 `int64` mapping
- The resolved `baseURL` (from `server`) reaches banner functions through `BannerMeta.baseURL`; it does not set request URLs. Use the client plugin's own `baseURL` option for that
- Tip: pair `unknownType: 'unknown'` with `emptySchemaType: 'any'` so empty 204 response bodies stay easy to use
- `dateType` string variants all emit `string` at the TypeScript level; schema plugins such as `@kubb/plugin-zod` validate the offset or local format

## Related

- [@kubb/plugin-ts](../plugins/plugin-ts.md)
- [quick-start](../getting-started/quick-start.md)
