# Programmatic Build

`createKubb()` API を使い Node.js スクリプトやビルドシステムから Kubb をプログラマティックに実行するワークフロー。

```typescript
import { createKubb } from 'kubb'
import { Diagnostics } from 'kubb/kit'
import { adapterOas } from '@kubb/adapter-oas'
import { parserTs, parserTsx } from '@kubb/parser-ts'
import { pluginTs } from '@kubb/plugin-ts'

const kubb = createKubb({
  adapter: adapterOas(),
  parsers: [parserTs(), parserTsx()],
  input: './petStore.yaml',
  output: { path: './gen', clean: true },
  plugins: [pluginTs()],
})

kubb.hooks.hook('kubb:plugin:end', ({ plugin, duration }) => {
  console.log(`${plugin.name} completed in ${duration}ms`)
})

const { files, diagnostics } = await kubb.safeBuild()

if (Diagnostics.hasError(diagnostics)) {
  console.error('Generation failed')
  process.exit(1)
}

console.log(`Generated ${files.length} files`)
```

## Notes

- `createKubb()` は `kubb.config.ts` の `defineConfig` と同じ形の `UserConfig` を受け取り、`Kubb` インスタンスを返す
- `.safeBuild()` は例外を投げず `{ files, diagnostics }` を返す。例外を投げさせたい場合は `.build()` を使う
- `Diagnostics.hasError()`（`kubb/kit` からインポート）で診断結果にエラーが含まれるか判定できる
- `kubb.hooks.hook('kubb:plugin:end', ...)` で各プラグインの完了イベントを購読できる
- v5 で旧 `@kubb/core` の `build()` 関数は `kubb` パッケージの `createKubb().safeBuild()` / `.build()` に置き換わった。CI やビルドパイプラインへの組み込みに適している
