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

permissions:
  contents: read   # 既定値に依存せず最小権限を明示する

jobs:
  test:
    runs-on: ubuntu-latest
    timeout-minutes: 10

    steps:
      - uses: actions/checkout@11d5960a326750d5838078e36cf38b85af677262  # v4.4.0

      - uses: actions/setup-node@49933ea5288caeca8642d1e84afbd3f7d6820020  # v4.4.0
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        shell: bash
        run: |
          set -euo pipefail
          npm ci

      - name: Test
        shell: bash
        run: |
          set -euo pipefail
          npm test

      - name: Build
        shell: bash
        run: |
          set -euo pipefail
          npm run build
```

## Notes

- `actions/setup-node` の `cache: 'npm'` を指定するだけで `~/.npm` キャッシュが自動管理される
- 外部 action はコミット SHA 固定で参照する（バージョンは末尾コメントで示す）。可動タグは付け替え可能でサプライチェーン攻撃の経路になる
- `npm ci` は `package-lock.json` に基づくクリーンインストールで CI 環境に適している
- `pull_request` トリガーのデフォルトアクティビティタイプは `opened`, `synchronize`, `reopened`
- フォークからの PR では `GITHUB_TOKEN` が読み取り専用になるため、シークレットを使う処理は別途対応が必要
