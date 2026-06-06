# Programmatic Build

`build()` API を使い Node.js スクリプトやビルドシステムから Kubb をプログラマティックに実行するワークフロー。

```typescript
import { build } from '@kubb/core'
import { pluginOas } from '@kubb/plugin-oas'
import { pluginTs } from '@kubb/plugin-ts'

const { error, files } = await build({
  config: {
    root: '.',
    input: { path: './petStore.yaml' },
    output: { path: './src/gen', clean: true },
    plugins: [
      pluginOas({ generators: [] }),
      pluginTs({ output: { path: 'models' } }),
    ],
  },
})

if (error) {
  console.error('Generation failed:', error)
  process.exit(1)
}

console.log(`Generated ${files.length} files`)
```

カスタムインメモリストレージを使ったドライラン例:

```typescript
import { build, createStorage } from '@kubb/core'

const store = new Map<string, string>()
const memoryStorage = createStorage(() => ({
  name: 'memory',
  async hasItem(key) { return store.has(key) },
  async getItem(key) { return store.get(key) ?? null },
  async setItem(key, value) { store.set(key, value) },
  async removeItem(key) { store.delete(key) },
  async getKeys(base) { return [...store.keys()].filter(k => k.startsWith(base)) },
  async clear(base) { for (const k of store.keys()) if (k.startsWith(base)) store.delete(k) },
}))

const { files } = await build({
  config: {
    input: { path: './petStore.yaml' },
    output: { path: './gen', storage: memoryStorage },
    plugins: [pluginOas(), pluginTs()],
  },
})
```

## Notes

- `build()` は `{ error, files, driver }` を返す非同期関数
- `error` が `undefined` でない場合は生成失敗
- `output.storage` にカスタムストレージを渡すとファイルシステムへの書き込みを回避できる
- CI やテストでの生成結果検証、ビルドパイプラインへの組み込みに適している
