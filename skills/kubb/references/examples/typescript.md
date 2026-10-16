# TypeScript Example

OpenAPI 仕様から TypeScript 型を生成する設定例。複数の enum スタイル・optional の表記・出力形式（単一ファイル / ディレクトリ / tag グループ）を、配列形式の config で 1 エントリずつ示す。

## kubb.config.ts

```typescript
import { adapterOas } from '@kubb/adapter-oas'
import { pluginTs } from '@kubb/plugin-ts'
import { defineConfig } from 'kubb/config'

const input = './petStore.yaml'

export default defineConfig([
  {
    root: '.',
    input,
    output: {
      path: './src/legacy',
      clean: true,
      format: false,
      lint: false,
    },
    adapter: adapterOas({ unknownType: 'unknown', validate: false, enums: 'root' }),
    plugins: [
      pluginTs({
        output: {
          path: 'models.ts',
          mode: 'file',
          barrel: false,
        },
        enum: { type: 'enum' },
        syntaxType: 'interface',
      }),
    ],
  },
  {
    root: '.',
    input,
    output: {
      path: './src/gen',
      clean: true,
      format: false,
      lint: false,
    },
    adapter: adapterOas({ unknownType: 'unknown', validate: false, enums: 'root' }),
    plugins: [
      pluginTs({
        output: {
          path: 'models.ts',
          mode: 'file',
          barrel: false,
        },
        enum: { type: 'asConst', keyCasing: 'screamingSnakeCase' },
        arrayType: 'generic',
        syntaxType: 'interface',
      }),
    ],
  },
  {
    root: '.',
    input,
    output: { path: './src/gen2', clean: true, format: false, lint: false },
    adapter: adapterOas({ unknownType: 'unknown', validate: false, enums: 'root' }),
    plugins: [
      pluginTs({
        output: {
          path: 'modelsConst.ts',
          mode: 'file',
          barrel: false,
        },
        enum: { type: 'asConst', typeSuffix: 'enumType' },
      }),
    ],
  },
  {
    root: '.',
    input,
    output: { path: './src/gen3', clean: true, format: false, lint: false },
    adapter: adapterOas({ unknownType: 'unknown', validate: false, enums: 'root' }),
    plugins: [
      pluginTs({
        output: {
          path: 'modelsPascalConst.ts',
          mode: 'file',
          barrel: false,
        },
        enum: { type: 'asConst', constCasing: 'pascalCase' },
      }),
    ],
  },
  {
    root: '.',
    input,
    output: { path: './src/gen4', clean: true, format: false, lint: false },
    adapter: adapterOas({ unknownType: 'unknown', validate: false, enums: 'root' }),
    plugins: [
      pluginTs({
        output: {
          path: 'modelsConstEnum.ts',
          mode: 'file',
          barrel: false,
        },
        enum: { type: 'constEnum' },
      }),
    ],
  },
  {
    root: '.',
    input,
    output: { path: './src/gen5', clean: true, format: false, lint: false },
    adapter: adapterOas({ unknownType: 'unknown', validate: false, enums: 'root' }),
    plugins: [
      pluginTs({
        output: {
          path: 'modelsLiteral.ts',
          mode: 'file',
          barrel: false,
        },
        enum: { type: 'literal' },
      }),
    ],
  },
  {
    root: '.',
    input,
    output: { path: './src/gen6', clean: true, format: false, lint: false, postGenerate: ['npm run typecheck'] },
    adapter: adapterOas({ unknownType: 'unknown', validate: false, enums: 'root' }),
    plugins: [
      pluginTs({
        output: {
          path: 'ts/models',
          mode: 'directory',
        },
      }),
    ],
  },
  {
    root: '.',
    input,
    output: { path: './src/gen7', clean: true, format: false, lint: false },
    adapter: adapterOas({ unknownType: 'unknown', validate: false, enums: 'root' }),
    plugins: [
      pluginTs({
        output: { path: 'modelsInlineLiteral.ts', mode: 'file', barrel: false },
        enum: { type: 'inlineLiteral' },
      }),
    ],
  },
  {
    root: '.',
    input,
    output: { path: './src/gen8', clean: true, format: false, lint: false },
    adapter: adapterOas({ unknownType: 'unknown', validate: false, enums: 'root' }),
    plugins: [
      pluginTs({
        output: { path: 'modelsOptionalUndefined.ts', mode: 'file', barrel: false },
        enum: { type: 'inlineLiteral' },
        optionalType: 'undefined',
      }),
    ],
  },
  {
    root: '.',
    input,
    output: { path: './src/gen9', clean: true, format: false, lint: false },
    adapter: adapterOas({ unknownType: 'unknown', validate: false, enums: 'root' }),
    plugins: [
      pluginTs({
        output: { path: 'modelsOptionalBoth.ts', mode: 'file', barrel: false },
        enum: { type: 'inlineLiteral' },
        optionalType: 'questionTokenAndUndefined',
      }),
    ],
  },
  {
    root: '.',
    input,
    output: { path: './src/gen10', clean: true, format: false, lint: false },
    adapter: adapterOas({ unknownType: 'unknown', validate: false, enums: 'root' }),
    plugins: [
      pluginTs({
        output: { path: 'models', mode: 'directory' },
        enum: { type: 'inlineLiteral' },
        group: { type: 'tag' },
      }),
    ],
  },
  {
    root: '.',
    input,
    output: { path: './src/gen11', clean: true, format: false, lint: false },
    adapter: adapterOas({ unknownType: 'unknown', validate: false, enums: 'root' }),
    plugins: [
      pluginTs({
        output: { path: 'modelsPascalCaseKeys.ts', mode: 'file', barrel: false },
        enum: { type: 'asConst', keyCasing: 'pascalCase' },
      }),
    ],
  },
  {
    root: '.',
    input,
    output: { path: './src/gen12', clean: true, format: false, lint: false, postGenerate: ['npm run typecheck'] },
    adapter: adapterOas({ unknownType: 'unknown', validate: false, enums: 'root' }),
    plugins: [
      pluginTs({
        output: { path: 'modelsCamelCaseKeys.ts', mode: 'file', barrel: false },
        enum: { type: 'asConst', keyCasing: 'camelCase' },
      }),
    ],
  },
])
```

## 依存関係

```json
{
  "dependencies": {
    "@kubb/adapter-oas": "catalog:",
    "@kubb/plugin-ts": "workspace:*",
    "axios": "^1.20.0",
    "kubb": "catalog:"
  },
  "devDependencies": {
    "typescript": "catalog:"
  }
}
```

## enum.type の比較

| 設定 | 出力 |
|------|------|
| `{ type: 'enum' }` | TypeScript `enum`（ランタイムコードあり） |
| `{ type: 'asConst' }`（既定） | `as const` オブジェクト + 値のユニオン型（`*Key`） |
| `{ type: 'asConst', constCasing: 'pascalCase' }` | const 名が PascalCase |
| `{ type: 'constEnum' }` | `const enum`（`--isolatedModules` とは非互換） |
| `{ type: 'literal' }` | 名前付きユニオン型（ランタイム値なし） |
| `{ type: 'inlineLiteral' }` | `literal` と同じユニオンを各使用箇所へ inline |

## Notes

- Source: `examples/typescript` of kubb-labs/plugins at tag `@kubb/plugin-client@5.5.15` (`kubb.config.ts`, `package.json`). `catalog:` / `workspace:*` are monorepo specifiers; replace with real versions outside the repo
- Replaces the v3/v4 shape (`enumType: 'asPascalConst'` etc., `barrelType`, `pluginOas`). `'asPascalConst'` is now `{ type: 'asConst', constCasing: 'pascalCase' }` (see [../plugins/plugin-ts.md](../plugins/plugin-ts.md))
- The package declares `node >=22.12`

## Related

- [../plugins/plugin-ts.md](../plugins/plugin-ts.md)
- [../adapters/adapter-oas.md](../adapters/adapter-oas.md)
