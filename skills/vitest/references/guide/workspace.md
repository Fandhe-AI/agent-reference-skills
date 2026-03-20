# ワークスペース

モノレポや異なるテスト設定を単一プロセスで実行するための機能。

## 基本設定

```ts
// vitest.config.ts
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    projects: ['packages/*'],
  },
})
```

## プロジェクト検出

glob パターンにマッチするフォルダが個別プロジェクトとして扱われる。
config ファイルがなくてもプロジェクトとして認識される。

認識される config ファイル名:
- `vitest.config.ts` / `vite.config.js`
- `vitest.unit.config.ts` / `vite.e2e.config.js`
- `vitest.<name>.config.*`

### 除外

```ts
projects: [
  'packages/*',
  '!packages/excluded',
]
```

## インライン設定

glob パターンとインライン設定を混在可能。

```ts
projects: [
  'packages/*',
  {
    extends: true,
    test: {
      name: 'happy-dom',
      environment: 'happy-dom',
      include: ['tests/**/*.browser.test.{ts,js}'],
    },
  },
]
```

## 設定の継承

### extends オプション

`extends: true` でルートレベルの設定を継承:

```ts
{
  extends: true,
  test: {
    name: 'unit',
    include: ['**/*.unit.test.ts'],
  },
}
```

### mergeConfig

```ts
import { defineProject, mergeConfig } from 'vitest/config'
import configShared from '../vitest.shared.js'

export default mergeConfig(
  configShared,
  defineProject({
    test: { environment: 'jsdom' },
  })
)
```

## プロジェクト指定実行

```bash
# 特定プロジェクト
npm run test -- --project e2e

# 複数プロジェクト
npm run test -- --project e2e --project unit
```

## プロジェクト設定で使えないオプション

- `coverage` — プロセス全体設定のみ
- `reporters` — ルートレベルのみ
- `resolveSnapshotPath` — ルートのリゾルバが適用

## 関連

- [設定](./config.md)
- [テスト環境](./environment.md)
