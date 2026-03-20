# 設定 (vitest.config.ts)

`vitest.config.ts`（または `vite.config.ts` の `test` キー）で設定する。

```ts
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    include: ['src/**/*.{test,spec}.{ts,tsx}'],
    setupFiles: ['./src/setup-tests.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
    },
  },
})
```

## コアオプション

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `globals` | `boolean` | `false` | `describe`, `it`, `expect` 等をグローバル公開（import 不要） |
| `environment` | `string` | `'node'` | テスト環境（`node`, `jsdom`, `happy-dom`, `edge-runtime`） |
| `include` | `string[]` | `['**/*.{test,spec}.{js,ts,jsx,tsx}']` | テストファイルの glob パターン |
| `exclude` | `string[]` | `['**/node_modules/**', '**/dist/**', ...]` | 除外パターン |
| `setupFiles` | `string \| string[]` | `[]` | 各テストファイル実行前に実行するファイル |
| `globalSetup` | `string \| string[]` | `[]` | 全スイート実行前に一度だけ実行するファイル |
| `pool` | `string` | `'forks'` | ワーカープール（`threads`, `forks`, `vmThreads`, `vmForks`） |
| `testTimeout` | `number` | `5000` | テストのデフォルトタイムアウト（ms） |
| `hookTimeout` | `number` | `10000` | フックのデフォルトタイムアウト（ms） |
| `retry` | `number` | `0` | 失敗テストのリトライ回数 |
| `reporters` | `string[]` | `['default']` | レポーター（`verbose`, `json`, `html`, `dot` 等） |
| `watch` | `boolean` | dev: `true` | ウォッチモード |
| `passWithNoTests` | `boolean` | `false` | テストファイルなしでも成功終了 |
| `typecheck` | `object` | — | 型テスト設定 |

## カバレッジオプション (`test.coverage`)

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `provider` | `'v8' \| 'istanbul'` | `'v8'` | カバレッジエンジン |
| `reporter` | `string[]` | `['text', 'html', 'clover', 'json']` | 出力フォーマット |
| `include` | `string[]` | 全ファイル | カバレッジ対象 |
| `exclude` | `string[]` | — | カバレッジ除外 |
| `thresholds` | `object` | — | 最低カバレッジ率（`lines`, `branches`, `functions`, `statements`） |
| `reportsDirectory` | `string` | `'./coverage'` | 出力ディレクトリ |
| `all` | `boolean` | `false` | 未カバーファイルもレポートに含める |

## プール

| Pool | Description |
|------|-------------|
| `threads` | Worker Threads（共有メモリ、高速） |
| `forks` | 子プロセス（分離、ネイティブモジュール向き） |
| `vmThreads` | Worker Threads + VM 分離 |
| `vmForks` | 子プロセス + VM 分離 |

## globals: true の TypeScript 設定

```json
// tsconfig.json
{
  "compilerOptions": {
    "types": ["vitest/globals"]
  }
}
```

## setupFiles vs globalSetup

- `setupFiles`: テスト環境内で各ファイルの前に実行
- `globalSetup`: メイン Node プロセスで全スイートの前に一度だけ実行

## 関連

- [CLI](./cli.md)
- [テスト環境](./environment.md)
- [カバレッジ](./coverage.md)
