# テスト環境

## 組み込み環境

| Environment | Description |
|-------------|-------------|
| `node`（デフォルト） | Node.js 環境 |
| `jsdom` | jsdom パッケージによるブラウザ API エミュレーション |
| `happy-dom` | jsdom より高速なブラウザ API エミュレーション（API は少なめ） |
| `edge-runtime` | Vercel Edge Runtime エミュレーション |

## グローバル設定

```ts
// vitest.config.ts
export default defineConfig({
  test: {
    environment: 'jsdom',
  },
})
```

## ファイル単位の環境指定

テストファイル先頭のコメントで個別に環境を上書きできる。

```ts
// @vitest-environment jsdom

import { expect, test } from 'vitest'

test('DOM test', () => {
  expect(typeof window).not.toBe('undefined')
})
```

## glob パターンでの環境指定

```ts
// vitest.config.ts
export default defineConfig({
  test: {
    environmentMatchGlobs: [
      ['**/*.dom.test.ts', 'jsdom'],
      ['**/*.node.test.ts', 'node'],
      ['**/*.edge.test.ts', 'edge-runtime'],
    ],
  },
})
```

## カスタム環境

`vitest-environment-${name}` パッケージまたはファイルパスで独自環境を作成可能。

```ts
// vitest-environment-custom.ts
export default {
  name: 'custom',
  transformMode: 'ssr',
  setup() {
    // 環境セットアップ
    return {
      teardown() {
        // クリーンアップ
      },
    }
  },
}
```

## 関連

- [設定](./config.md)
- [ワークスペース](./workspace.md)
