# Programmatic Build

`createKubb()` API を使い Node.js スクリプトやビルドシステムから Kubb をプログラマティックに実行するワークフロー。

```typescript
import { createKubb } from 'kubb'
import { Diagnostics } from 'kubb/kit'
import { pluginTs } from '@kubb/plugin-ts'
import { pluginAxios } from '@kubb/plugin-axios'

const kubb = createKubb({
  input: './petStore.yaml',
  output: { path: './gen' },
  plugins: [pluginTs(), pluginAxios()],
})

const { files, storage, diagnostics } = await kubb.safeBuild()

if (Diagnostics.hasError(diagnostics)) {
  for (const diagnostic of diagnostics.filter(Diagnostics.isProblem)) {
    if (diagnostic.severity === 'error') {
      console.error(`${diagnostic.plugin ?? 'kubb'}: ${diagnostic.message}`)
    }
  }
  process.exit(1)
}

for (const { plugin, duration } of diagnostics.filter(Diagnostics.isPerformance)) {
  console.log(`${plugin}: ${duration}ms`)
}
console.log(`Generated ${files.length} files`)
const paths = await storage.readKeys()
paths.forEach((path) => console.log(`  ${path}`))
```

## Notes

- `createKubb()` は `UserConfig` を受け取り `Kubb` インスタンスを返す。`defineConfig` と同じデフォルトが適用されるため、CLI とスクリプトで同じファイルが生成される。デフォルトなしの素のエンジンが必要な場合は `@kubb/core` から import する
- `.safeBuild()` は例外を投げず、問題を `BuildOutput.diagnostics` に集めて返す（`BuildOutput` は `files` / `storage` / `driver` / `diagnostics`）。`.build()` は error 診断があると `AggregateError` を投げる
- プラグインは `safeBuild()` が例外を投げなくても失敗しうるため、ファイル処理の前に `Diagnostics.hasError(diagnostics)`（`kubb/kit`）で確認する
- `using kubb = createKubb(config)` で `Symbol.dispose` による解放ができる。`kubb.hooks.hook(name, handler)` はビルド前に登録する
