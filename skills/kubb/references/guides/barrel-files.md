# Barrel files

Barrel file は、ディレクトリ内のすべてを re-export する `index.ts`。利用側は 1 か所から import できる。`@kubb/plugin-barrel` は `kubb` に同梱され、`defineConfig` が自動登録する。`output.barrel` を設定するまで何も生成しない。

## ルート barrel を有効化する

`defineConfig` の `output.barrel` を設定する。ルートの `index.ts` と、各 Plugin が継承する既定値を制御する。`type` は per-symbol の re-export なら `'named'`、`export *` なら `'all'`。

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

- Plugin が barrel を持つのは `output.mode: 'directory'` のときのみ（拡張子なしの `output.path` が暗黙にこのモードを意味する）。
- `type` の違いの詳細は `@kubb/plugin-barrel` の options（`type`）を参照。
- 出典: https://kubb.dev/docs/5.x/how-to/barrel-files（kubb@5.11.0）

## Related

- [creating-plugins.md](./creating-plugins.md)
