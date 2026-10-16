# マイグレーションガイド

## Upgrade from v4 to v5

Kubb 5.11.0 / docs 5.x how-to/migration（"Upgrade from v4 to v5"）に準拠。Update packages, migrate the config, regenerate, and fix generated-code imports. Kubb v5 separates specification parsing, code generation, source printing, and storage.

### Before you start

Use Node.js 22.12 or higher in development, CI, and Docker. Update `kubb` and the plugins you use to v5. Plugin package names remain unchanged, although their source now lives in kubb-labs/plugins.

> Remove `@kubb/plugin-solid-query` and `@kubb/plugin-svelte-query`. They have no v5 replacement (last release 4.39.3). Replace `@kubb/plugin-client` with Axios or Fetch and `@kubb/plugin-oas` with the adapter, as described below.

### Defaults that changed

| Behavior | v4 | v5 |
| --- | --- | --- |
| `output.format` | `'prettier'` | `false` |
| `output.lint` | `'auto'` | `false` |
| Root barrel | `'named'` | `false` |
| Tag folder | `<tag>Controller` | `<tag>` |
| React/Vue Query `hooks` | `true` | `false` |
| Client error handling | Errors returned | `throwOnError: true` |
| OpenAPI `int64` mapping | `number` | `bigint` |
| SWR mutation arguments | Trigger shape opt-in | Passed through `trigger()` |

Set these options explicitly where your application relies on the old behavior.

### Migrate the config

| v4 | v5 |
| --- | --- |
| `defineConfig` from `@kubb/core` | Import from `kubb/config`. |
| `input: { path }` or `input: { data }` | Set `input` directly to the path, URL, spec string, or parsed object. |
| `output.storage` | Move to top-level `storage` and import helpers from `kubb/kit`. |
| `hooks.done` | Use an `output.postGenerate` array of strings or `{ name, command }` objects. |
| `output.override` | Remove it. Use a storage driver to control writes. |
| `--debug` | `--reporter file`. |
| `--log-level debug` | Use the supported log levels and reporters. |

The old input wrapper fails with `KUBB_LEGACY_INPUT`. The old hook failure code `KUBB_HOOK_FAILED` becomes `KUBB_POST_GENERATE_FAILED`. Remove `kubb:debug` hooks and `createDebugger`.

```typescript
import { defineConfig } from 'kubb/config'
import { pluginTs } from '@kubb/plugin-ts'

export default defineConfig({
  input: './petStore.yaml',
  output: { path: './src/gen', postGenerate: ['npm run typecheck'] },
  plugins: [pluginTs()],
})
```

#### OpenAPI adapter

Remove `pluginOas()` from `plugins`. `defineConfig` supplies `adapterOas()`, the TypeScript/TSX/Markdown parsers, and a barrel plugin. Set `adapter` only to override its options.

Move `dateType`, `integerType`, `unknownType`, `emptySchemaType`, `enumSuffix`, and `contentType` from plugin options to `adapterOas`. Choose one value for each across the whole config.

- `serverIndex` and `serverVariables` become `server: { index, variables }`.
- `discriminator: 'strict'` becomes `'preserve'` (the default). `'inherit'` becomes `'propagate'`.
- `validate` still defaults to `true`.
- Set `integerType: 'number'` to retain the v4 `int64` mapping.

#### Output layout

Replace `output.barrelType` at the root and on plugins:

| v4 | v5 |
| --- | --- |
| `'named'` | `{ type: 'named' }` |
| `'all'` | `{ type: 'all' }` |
| `'propagate'` (plugin only) | `{ type: 'named', nested: true }` |
| `false` | `false` |

Barrels, formatting, and linting now default to off. Automatic formatter/linter selection prefers the oxc tools.

`output.mode` remains a plugin-level option inferred from `output.path`: an extension means one file, otherwise a directory. `group` works with inferred directory mode. Combining `group` with file mode fails with `KUBB_INVALID_PLUGIN_OPTIONS`.

Tag folders no longer add `Controller` (or `Requests` for Cypress/MCP). To retain it, set ``group: { type: 'tag', name: ({ group }) => `${group}Controller` }``.

### Shared plugin options

| Removed or renamed | Replacement |
| --- | --- |
| `transformers.name` | `resolver.name`. Call the exported preset to keep default casing. |
| `transformers.schema` | `macros`. |
| `mapper` | Schema macros or a `printer.nodes` override. |
| `generators` | A custom plugin. |
| `paramsType`, `pathParamsType`, `paramsCasing` | One grouped `{ body, path, query, headers }` object, with names from the spec. |

Required parameters make their group required. Unused groups are typed `never`. Update positional call sites:

```typescript
useGetPet({ path: { petId } })
useFindPets({ query: { status: 'available' } })
useUpdatePet().mutate({ path: { petId }, body: pet })
```

After moving a name transformer, check identifiers because resolver inputs may have different casing.

### HTTP clients

Replace `pluginClient({ client: 'axios' })` with `pluginAxios()`, or `client: 'fetch'` with `pluginFetch()`.

- `clientType` and `wrapper` become `sdk`. `sdk.mode: 'tag'` is the default. `sdk.name` adds a root class. Use `mode: 'flat'` for one class. Leave `sdk` unset for standalone functions used by query plugins.
- `dataReturnType` is removed. Clients return `{ data, error, request, response }`. Read `data` for the body. Set `throwOnError: false` to inspect errors without throwing.
- `parser: 'zod'` becomes `validator: 'zod'`. The old `'client'` parser becomes the default `false` validator.
- Authentication uses OpenAPI security schemes and the bundled client's `auth` resolver.
- Remove `operations`, `clientType: 'staticClass'`, `importPath`, `bundle`, and `urlType`. The client is bundled into `.kubb/client.ts`. URL-only helpers require a custom plugin.

```typescript
const { data: pet } = await getPet({ path: { petId: 1 } })
```

### TypeScript (`@kubb/plugin-ts`)

Move `enumType`, `enumTypeSuffix`, and `enumKeyCasing` under `enum` as `type`, `typeSuffix`, and `keyCasing`. Replace `'asPascalConst'` with `{ type: 'asConst', constCasing: 'pascalCase' }`.

Generated request inputs use `*Options` with `body`, `path`, `query`, and `headers`. Properties preserve OpenAPI names, including `pet_id` and `X-Api-Key`.

Default enums are const-asserted objects plus a `*Key` type union. Inline enum names are operation-scoped. Set `enum` to choose another representation. Open string unions retain suggestions with `(string & {})`. Shared fields in discriminated unions move into a common intersection.

JSDoc drops the format suffix from `@type`, includes specification examples, and adds `@type object` for objects.

### Zod (`@kubb/plugin-zod`)

Upgrade `zod` to v4 and remove `version`.

- Replace `typed: true` with `inferred: true` for `z.infer` aliases. Their names now end in `Type`: `PetSchema` becomes `PetSchemaType`.
- Replace `wrapOutput` with a printer override. `this.base(node)` preserves the default expression for decoration.
- Remove `operations`. Rebuilding its operation/path maps requires a custom plugin.
- Response schemas gain `Status<code>`: `listPets200Schema` becomes `listPetsStatus200Schema`.
- Output uses chained Zod 4 calls. Functional wrappers remain for `mini: true`. Getters are used only for circular references.

### React Query (`@kubb/plugin-react-query`)

Register an Axios or Fetch client plugin. `client` is now `'axios' | 'fetch'`, auto-detected when exactly one client is registered. Move `baseURL` and validation to that client. Remove the query plugin's `parser`.

Set `hooks: true` to keep `use*` hooks. The default `false` still emits keys and option factories.

Queries and mutations use grouped `*Options`. The trailing client config excludes `path`, `query`, `body`, `headers`, and `url`. `TData` now contains only 2xx responses. Errors use `TError`. Remove imports of `*MutationKey` type aliases and use the runtime key helper.

The generated auto `enabled` guard is removed. Set TanStack Query's `enabled` or `skipToken` when deferring a request. Suspense hooks always run.

### Vue Query (`@kubb/plugin-vue-query`)

Apply the React Query changes above. Each parameter group accepts `MaybeRefOrGetter`, and generated client calls unwrap it with `toValue()`. Set `hooks: true` to retain composables.

### SWR (`@kubb/plugin-swr`)

Use the same client selector, grouped parameters, and client-level validation. Remove `mutation.paramsToTrigger`. Mutation parameters always pass through `trigger()`:

```typescript
useUpdatePet().trigger({ path: { petId }, body: pet })
```

SWR drops the parameter-presence guard and keys requests off `shouldFetch`. Set it to `false` to disable a request.

### Faker (`@kubb/plugin-faker`)

Remove `paramsCasing` and `mapper`. Use macros or printers, keeping mock values compatible with the TypeScript output. `createPet` keeps its name but accepts generic `TData`, preserving the types of override fields in its return value.

### MSW (`@kubb/plugin-msw`)

The `parser`, `handlers`, and `baseURL` options retain their v4 behavior. Generated handlers use `HttpResponseResolver` typed against request bodies and headers. Apply the shared resolver, adapter `contentType`, and generator-option migrations.

### Cypress (`@kubb/plugin-cypress`)

Request helpers take grouped `*Options` followed by the unchanged `Partial<Cypress.RequestOptions>`. Remove `dataReturnType`. Helpers yield the body as `Cypress.Chainable<T>`. HTTP methods are uppercase and imports use `*Options`/`*Response` names. `baseURL`, `exclude`, `include`, and `override` retain their shape. There is no validator option.

### MCP (`@kubb/plugin-mcp`)

Register TypeScript, Zod, and an Axios or Fetch client. `client` selects the registered client. Move `baseURL` there and remove `paramsCasing`. Handlers receive grouped `*Options` plus the MCP `ServerContext`, delegate to generated client operations, and read `res.data`.

### Verify the upgrade

Run `kubb generate`, review generated-file changes, and type-check your application. Update response imports for `Status<code>` names, Zod inferred-type imports for `Type`, and imports from renamed tag folders. Enable formatting, linting, and barrels explicitly if needed.

---

## Kubb v3 への移行

### 新機能

- **Static Class Client**: `clientType: 'staticClass'` でクラスベースのクライアント生成
- **Generators**: テンプレートに代わる新しいコード生成システム
- **CLI 改善**: 20-30% の高速化、プログレスバー、`--debug` モード
- **`output.extension`**: ファイル拡張子の制御
- **`output.barrelType`**: `exportType` の後継

### パッケージリネーム

| v2 パッケージ | v3 パッケージ |
|--------------|--------------|
| `@kubb/swagger-client` | `@kubb/plugin-client` |
| `@kubb/swagger-faker` | `@kubb/plugin-faker` |
| `@kubb/swagger-msw` | `@kubb/plugin-msw` |
| `@kubb/swagger` | `@kubb/plugin-oas` |
| `@kubb/swagger-ts` | `@kubb/plugin-ts` |
| `@kubb/swagger-zod` | `@kubb/plugin-zod` |
| `@kubb/swagger-redoc` | `@kubb/plugin-redoc` |
| `@kubb/swagger-swr` | `@kubb/plugin-swr` |

### TanStack Query パッケージの分割

統合パッケージがフレームワーク別に分割。TanStack Query v4 のサポートは廃止（v5 必須）:

- `@kubb/plugin-react-query`
- `@kubb/plugin-vue-query`
- `@kubb/plugin-svelte-query`
- `@kubb/plugin-solid-query`

### MSW v2 必須

MSW v1 のサポートは廃止。v2 が必須。

### 出力設定の変更

| v2 | v3 |
|----|-----|
| `output.extName` | `output.extension` に統合 |
| `output.exportAs` | group 設定に統合 |
| `exportType` | `output.barrelType` |
| `group.output` | 自動生成（root + plugin パスから） |

### プラグイン固有の変更

**@kubb/plugin-client**:
- `client.importPath` → `importPath`
- 新オプション: `operations`, `parser`（`'client'` \| `'zod'`）, `paramsType`

**@kubb/plugin-ts**:
- `enumSuffix` デフォルト: `'enum'`
- `mapper` で TypeScript ノードオーバーライド

**@kubb/plugin-zod**:
- `typedSchema` → `inferred`
- 新オプション: `operations`, `mapper`

**@kubb/plugin-swr / @kubb/plugin-react-query**:
- `dataReturnType` → `client.dataReturnType`
- 新オプション: `paramsType`
- ミューテーションに `mutationKey` 生成
- 必須パラメータに基づく `enabled` 自動生成

**@kubb/plugin-oas**:
- `experimentalFilter`, `experimentalSort` 削除（外部ツール openapi-format の使用を推奨）

### Node.js サポート

v3 の最小要件は Node.js 20（v18 サポート廃止）。
