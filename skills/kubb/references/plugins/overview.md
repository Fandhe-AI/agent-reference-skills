# プラグイン概要

Kubb の拡張モデル（adapter / plugin / macro / resolver / printer / parser / storage）とプラグイン一覧（Kubb 5.11.0 / docs 5.x explanation/extensions に準拠）。

## 拡張の選び方

Use an existing plugin when it generates the output you need. To add an output or replace a pipeline layer, build on `kubb/kit`, a subpath of the `kubb` package.

| 変更したいもの | 拡張 | 理由 |
| --- | --- | --- |
| Input format | Adapter | Translate the format into Kubb's shared AST |
| Schema meaning before generation | Macro | Transform nodes before the plugin processes them |
| Generated names or paths | Resolver | Keep declarations and imports consistent |
| Code emitted for a schema type | Printer | Change one output target without changing the input model |
| A new kind of output | Plugin and generators | Choose the files and content to generate |
| File syntax or assembly | Parser | Convert emitted nodes into source text |
| Where files are stored | Storage | Reuse generation with another destination |

Macros run before printer handlers, so a macro change is visible to every output target while a printer change stays in one.

## Plugins

A plugin factory returns a name, options, and lifecycle hooks. It registers generators and a resolver during `kubb:plugin:setup`, then produces files during generation. Setup runs once per plugin.

### 依存関係と順序

Declared dependencies run before their dependents. Kubb uses `enforce: 'pre'`, normal plugins, then `enforce: 'post'` and declaration order to break ties. Dependencies take priority over `enforce`. A plugin declares its dependencies as a record keyed by plugin name. A missing required entry fails the run with `KUBB_MISSING_DEPENDENCY` before any plugin runs, and an `optional: true` entry is skipped when its plugin is missing. Post-enforced plugins can process other plugins' emitted files; the built-in barrel plugin uses this to generate re-exports.

## Generators / Resolvers / Macros / Printers / Renderers

- **Generators** handle `schema` nodes, `operation` nodes, or the complete `operations` batch. They return files directly or elements for a renderer
- **Resolvers** determine identifiers, filenames, and paths. The plugin's `resolver` option patches its defaults
- **Macros** rewrite the AST before generation. **Printers** turn schema nodes into output for one target (TypeScript types, Zod expressions)
- **Renderers**: `kubb/jsx` provides the JSX renderer without React. Enable it per generator through `renderer`

## プラグイン一覧

| 区分 | パッケージ |
| --- | --- |
| 型生成 | `@kubb/plugin-ts` |
| HTTP クライアント | `@kubb/plugin-axios` / `@kubb/plugin-fetch` / `@kubb/plugin-client`（ユーザーが書いたクライアントモジュールを呼ぶ型付き関数） |
| データフェッチング | `@kubb/plugin-react-query` / `@kubb/plugin-vue-query` / `@kubb/plugin-swr` |
| バリデーション・モック | `@kubb/plugin-zod` / `@kubb/plugin-faker` / `@kubb/plugin-msw` |
| テスト・ドキュメント | `@kubb/plugin-cypress` / `@kubb/plugin-redoc` |
| AI 連携 | `@kubb/plugin-mcp` |
| 出力構成 | `@kubb/plugin-barrel`（ビルトイン） |

## 設定例

```typescript
import { defineConfig } from 'kubb/config'
import { pluginTs } from '@kubb/plugin-ts'
import { pluginAxios } from '@kubb/plugin-axios'

export default defineConfig({
  input: './petstore.yaml',
  output: { path: './src/gen' },
  plugins: [pluginTs(), pluginAxios()],
})
```

## Notes

- v5: plugin sources moved to kubb-labs/plugins with independent versions per plugin. Package names are unchanged
- v5: `@kubb/plugin-solid-query` and `@kubb/plugin-svelte-query` are removed with no replacement (last 4.39.3)
- v5: `@kubb/plugin-oas` is replaced by `adapterOas`, which `defineConfig` supplies by default together with the TypeScript/TSX/Markdown parsers and a barrel plugin
- v5: `@kubb/plugin-client` role changed; use `pluginAxios()` / `pluginFetch()` for Axios / Fetch clients
- Extensions are also installable from the Kubb registry via `kubb add <extension>`

## Related

- [core.md](./core.md)
- [README.md](./README.md)
- [../guides/migration-guide.md](../guides/migration-guide.md)
