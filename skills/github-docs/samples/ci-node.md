# Node.js CI Workflow

Node.js プロジェクトのテスト・ビルドを push と PR で自動実行する基本的な CI ワークフロー。

```yaml
# .github/workflows/ci.yml
name: CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - run: npm ci

      - run: npm test

      - run: npm run build
```

## Notes

- `actions/setup-node@v4` の `cache: 'npm'` を指定するだけで `~/.npm` キャッシュが自動管理される
- `npm ci` は `package-lock.json` に基づくクリーンインストールで CI 環境に適している
- `pull_request` トリガーのデフォルトアクティビティタイプは `opened`, `synchronize`, `reopened`
- フォークからの PR では `GITHUB_TOKEN` が読み取り専用になるため、シークレットを使う処理は別途対応が必要
