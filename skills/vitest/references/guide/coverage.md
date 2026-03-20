# カバレッジ

## プロバイダ

| Provider | Description |
|----------|-------------|
| **v8**（デフォルト） | V8 ネイティブカバレッジ。高速。Node.js, Deno, Chromium ブラウザ対応 |
| **istanbul** | ソースコード計装ベース。全ランタイム対応。計装オーバーヘッドあり |

## セットアップ

```bash
# v8（デフォルト）
npm i -D @vitest/coverage-v8

# istanbul
npm i -D @vitest/coverage-istanbul
```

```ts
// vitest.config.ts
export default defineConfig({
  test: {
    coverage: {
      provider: 'v8', // or 'istanbul'
    },
  },
})
```

## 実行

```bash
vitest run --coverage.enabled
```

または設定で有効化:

```ts
coverage: {
  enabled: true,
}
```

## 主要オプション

```ts
coverage: {
  provider: 'v8',
  reporter: ['text', 'html', 'lcov'],
  include: ['src/**/*.{ts,tsx}'],
  exclude: ['src/**/*.d.ts', 'src/types/**'],
  thresholds: {
    lines: 80,
    branches: 70,
    functions: 80,
    statements: 80,
  },
  reportsDirectory: './coverage',
  all: true, // 未カバーファイルもレポートに含める
}
```

## カバレッジ無視コメント

```ts
/* v8 ignore next */
const result = condition ? 'a' : 'b'

/* v8 ignore start -- @preserve */
// このブロックはカバレッジから除外
/* v8 ignore stop -- @preserve */

/* istanbul ignore if -- @preserve */
if (unlikely) { /* ... */ }
```

## 関連

- [設定](./config.md)
- [CLI](./cli.md)
