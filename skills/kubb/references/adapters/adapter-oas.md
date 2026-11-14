# @kubb/adapter-oas

The OpenAPI adapter is the first step of every build. It reads the spec from `input` (file, URL, inline content, or a parsed object), validates it, and converts each schema and operation into Kubb's universal AST, which every plugin generates code from. Its options therefore apply to all plugins.

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
    pathParamsCasing: 'camelcase',
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
| `validate` | `boolean` | `true` | Validate the spec with `@readme/openapi-parser` before parsing. Each problem is a `KUBB_INVALID_SPEC` warning and generation continues. `false` skips the check (faster on a large spec). Run `kubb validate` to list every error. An OpenAPI 3.2 document is not validated yet (`@readme/openapi-parser` does not support 3.2); Kubb reports one warning that says so |
| `contentType` | `'application/json' \| string` | — | Media type to keep when an operation declares several, for request bodies and responses. Without a value, every declared media type is kept |
| `server` | `{ index?: number, variables?: Record<string, string> }` | — | Which entry of the spec's `servers` array resolves into the document `baseURL`. `variables` fills `{variable}` placeholders, falling back to each variable's `default`. When `server` or `server.index` is omitted, `baseURL` is `null` |
| `discriminator` | `'preserve' \| 'propagate'` | `'preserve'` | `'preserve'` keeps child schemas as written; the parent union still narrows each branch by its discriminator value. `'propagate'` also writes the discriminator property with its literal value into each child schema, so `Cat` and `Dog` are narrowed when used on their own |
| `enums` | `'inline' \| 'root'` | `'inline'` | `'inline'` keeps each enum on its property. `'root'` lifts every inline enum to a top-level schema (for example `PetStatusEnum`); the names are the same in both modes, and with `'root'` a plugin that writes one file per schema gives the enum its own file |
| `pathParamsCasing` | `'camelcase'` | `undefined` | Renames `path` parameters and their `{placeholder}` in the operation path. With `'camelcase'`, `{pet-id}`, `{pet_id}` and `{PetId}` all become `petId`; colliding names get a counter suffix (`groupId`, `groupId2`). Request URLs do not change. The `matrix` style sends the name, so an operation with a matrix path parameter keeps its spec names. Query, header, cookie and body names are not changed. Omit it to keep the spec names |
| `dateType` | `false \| 'string' \| 'stringOffset' \| 'stringLocal' \| 'date' \| { dateTime?, date?, time? }` | `'string'` | How `date-time`, `date`, and `time` are represented. `'date'` uses JavaScript `Date`. An object sets each format independently; omitted keys default to `'string'` |
| `integerType` | `'number' \| 'bigint'` | `'bigint'` | How `format: int64` / `uint64` schemas map to TypeScript. Other integers always map to `number`. `type: string` stays `string` whatever its format |
| `unknownType` | `'any' \| 'unknown' \| 'void'` | `'unknown'` | Type for open map values and parameters without a schema: the values of `additionalProperties: {}`, a `patternProperties` entry set to `true` or `{}`, the extra items of an open `prefixItems` tuple, and a parameter without a `schema`. `additionalProperties: true` is not affected, and `@kubb/plugin-ts` always types its values as `unknown` |
| `emptySchemaType` | `'any' \| 'unknown' \| 'void'` | `unknownType` (`'unknown'` by default) | Type for a schema with nothing to infer a type from: an empty schema (`{}`), a schema without a `type` such as one that holds only a `description`, and a response without a schema. Follows `unknownType` when unset |
| `enumSuffix` | `string` | `'enum'` | Suffix for derived inline enum names (`PetStatusEnum`, or `PetStatusType` with `'type'`). Plugins derive their own names from it, such as `petStatusEnum` and `PetStatusEnumKey` in `@kubb/plugin-ts` |

## Dependencies

`@kubb/adapter-oas` has no plugin dependencies. Every other Kubb plugin depends on it, not the other way around.

## Notes

- Source: https://kubb.dev/extensions/kubb-labs/adapter-oas (packages/adapter-oas/docs/{overview,options}.md of kubb@5.20.0, retrieved 2026-11-14)
- Stable since Kubb 5.x; the previous `@beta` tag is not needed. It supersedes the v3/v4 `@kubb/plugin-oas` flow (`pluginOas()` inside `plugins: []`), which no longer exists
- `defineConfig` (imported from `kubb/config`) supplies `adapterOas()`, the TypeScript/TSX/Markdown parsers, and a barrel plugin by default. Configure the adapter through the top-level `adapter: adapterOas({...})` key, not as an entry inside `plugins: []`
- Migration (v4 → v5): `dateType`, `integerType`, `unknownType`, `emptySchemaType`, `enumSuffix`, and `contentType` move from plugin options to `adapterOas`; `serverIndex` / `serverVariables` become `server: { index, variables }`; `discriminator: 'strict'` becomes `'preserve'` and `'inherit'` becomes `'propagate'`. Set `integerType: 'number'` to retain the v4 `int64` mapping
- The resolved `baseURL` (from `server`) reaches banner functions through `BannerMeta.baseURL`; it does not set request URLs. Use the client plugin's own `baseURL` option for that
- Tip: pair `unknownType: 'unknown'` with `emptySchemaType: 'any'` so empty 204 response bodies stay easy to use
- OpenAPI 3.2 documents are read by the adapter (since 5.18.0 it also reads the 3.0 / 3.1 / 3.2 fields it skipped, such as `summary`, `contact`, `license`, `tags` and `auth`) but are not validated yet
- Migration (5.11 → 5.20): added the `pathParamsCasing` option (`'camelcase'`); `meta.securitySchemes` and `InputSecurityScheme` were removed in 5.18.0 and replaced by `meta.auth` and `AuthScheme`, so plugins reading security schemes must read `meta.auth` (changelog v5.18.0, `@kubb/adapter-oas`); the `unknownType` / `emptySchemaType` wording changed to open map values / empty-or-typeless schemas (docs diff 5.11 → 5.20)
- `dateType` string variants all emit `string` at the TypeScript level; schema plugins such as `@kubb/plugin-zod` validate the offset or local format

## Related

- [@kubb/plugin-ts](../plugins/plugin-ts.md)
- [quick-start](../getting-started/quick-start.md)
