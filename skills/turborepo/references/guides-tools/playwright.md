# Playwright

## 環境変数の設定（Strict Mode 対応）

```json
{
  "tasks": {
    "e2e": { "passThroughEnv": ["PLAYWRIGHT_*"] }
  }
}
```

またはグローバル:

```json
{ "globalPassThroughEnv": ["PLAYWRIGHT_*"] }
```

## タスクグラフの設計

```json
{ "tasks": { "e2e": { "dependsOn": ["^build"] } } }
```

上流ビルドをスキップする場合:

```bash
turbo run e2e --filter=@repo/playwright-myapp --only
```

## 共有ユーティリティパッケージ

Playwright を重複インストールしないよう `peerDependencies` を使用:

```json
{
  "name": "@repo/playwright-utilities",
  "peerDependencies": { "playwright": "workspace:*" }
}
```
