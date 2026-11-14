# Barrel files

Barrel file は、ディレクトリ内のすべてを re-export する `index.ts`。利用側は 1 か所から import できる。`@kubb/plugin-barrel` は `kubb` に同梱され、`defineConfig` が自動登録する。root barrel は既定で無効のため、`output.barrel` を設定するまで Kubb は root の `index.ts` を書かない。各 Plugin の既定 `output` は `barrel: { type: 'named' }` を持つため、`pluginTs()` のような Plugin は既に `types/index.ts` を書く。

## ルート barrel を有効化する

`defineConfig` の `output.barrel` を設定すると root の `index.ts` が書かれる。Plugin は自身の `output` に `barrel` が無いときのみこの値を継承する。既定の `output` のままの Plugin は `{ type: 'named' }` を保つ。`type` は per-symbol の re-export なら `'named'`、`export *` なら `'all'`。

```typescript
import { defineConfig } from 'kubb/config'
import { pluginTs } from '@kubb/plugin-ts'

export default defineConfig({
  input: './petStore.yaml',
  output: { path: './src/gen', barrel: { type: 'named' } },
  plugins: [pluginTs()],
})
```

## Plugin 単位で調整する

Plugin の `output` 内に `barrel` を設定すると、その Plugin の barrel を変更または無効化できる。`nested: true` は 1 つの flat な barrel の代わりに各サブディレクトリへ `index.ts` を書き出す。`false` はその Plugin の barrel を生成せず、ルート barrel からもそのファイルを除外する。

```typescript
import { defineConfig } from 'kubb/config'
import { pluginTs } from '@kubb/plugin-ts'
import { pluginZod } from '@kubb/plugin-zod'

export default defineConfig({
  input: './petStore.yaml',
  output: { path: './src/gen', barrel: { type: 'named' } },
  plugins: [
    pluginTs({ output: { path: 'types', barrel: { type: 'all', nested: true } } }),
    pluginZod({ output: { path: 'zod', barrel: false } }),
  ],
})
```

## Notes

- Plugin が barrel を持つのは `output.mode: 'directory'` のときのみ（ファイル拡張子のない `output.path` が暗黙にこのモードを意味する）。
- `type` の違いの詳細は `@kubb/plugin-barrel` の options（`type`）を参照。
- Source: https://kubb.dev/docs/5.x/how-to/barrel-files (docs/5.x/how-to/barrel-files.md of kubb@5.20.0, retrieved 2026-11-14)
- Migration (5.11 → 5.20): the root `output.barrel` is no longer described as "the default every plugin inherits"; a plugin inherits it only when its own `output` sets no `barrel` (docs diff 5.11 → 5.20, see also `reference/configuration`)

## Related

- [creating-plugins.md](./creating-plugins.md)
