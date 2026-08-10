# Secret Usage in Workflows

シークレットをワークフローで安全に参照・管理するパターン。

```yaml
# .github/workflows/deploy.yml
name: Deploy with Secrets

on:
  push:
    branches: [main]

permissions:
  contents: read
  issues: write   # 下記 Create Release Comment が Issues API へ POST するため

jobs:
  deploy:
    runs-on: ubuntu-latest
    timeout-minutes: 10
    environment: production  # 環境シークレットを有効化
    env:
      # step レベルの env は同じ step の if からは参照できないため job レベルで定義する
      HAS_OPTIONAL_KEY: ${{ secrets.OPTIONAL_KEY != '' }}

    steps:
      - uses: actions/checkout@11d5960a326750d5838078e36cf38b85af677262  # v4.4.0

      # アクションの入力としてシークレットを渡す（外部 action はコミット SHA 固定）。
      # GITHUB_TOKEN は自リポジトリにしか効かないため、別リポジトリの配信用
      # ワークフローを起動する用途では PAT / GitHub App トークンを入力として渡す
      - name: Trigger deploy in the delivery repository
        uses: actions/github-script@f28e40c7f34bde8b3046d885e986cb6290c5673b  # v7.1.0
        with:
          github-token: ${{ secrets.DEPLOY_TOKEN }}
          script: |
            await github.rest.repos.createDispatchEvent({
              owner: context.repo.owner,
              repo: 'delivery',
              event_type: 'deploy',
            });

      # 環境変数経由でシークレットをシェルスクリプトに渡す（推奨）
      - name: Deploy
        shell: bash
        run: |
          set -euo pipefail
          ./scripts/deploy.sh
        env:
          API_KEY: ${{ secrets.API_KEY }}
          DB_PASSWORD: ${{ secrets.DB_PASSWORD }}

      # GITHUB_TOKEN を使った REST API 呼び出し
      - name: Create Release Comment
        shell: bash
        env:
          GH_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          REPO: ${{ github.repository }}   # 式展開せず env 経由でシェル変数へ渡す
        run: |
          set -euo pipefail
          curl -X POST \
            -H "Authorization: Bearer ${GH_TOKEN}" \
            -H "Accept: application/vnd.github+json" \
            "https://api.github.com/repos/${REPO}/issues/1/comments" \
            -d '{"body":"Deployed to production!"}'

      # シークレットが設定されているかを条件に使う（直接参照は不可）
      - name: Optional step
        if: env.HAS_OPTIONAL_KEY == 'true'
        shell: bash
        run: |
          set -euo pipefail
          ./optional-integration.sh
        env:
          OPTIONAL_KEY: ${{ secrets.OPTIONAL_KEY }}
```

## Notes

- シークレットはコマンドライン引数に直接渡さず、必ず環境変数経由で渡す（プロセスリストに表示されるため）
- `if:` 条件でシークレットを直接参照できない。環境変数に変換してから条件に使う
- そのとき**変換先の env は job（または workflow）レベルに置く**。step レベルの `env:` は同じ step の `if:` 評価時にはまだ利用できず、条件が常に偽になる
- 環境シークレット（`environment` キーで有効化）はリポジトリシークレットより優先され、デプロイ保護ルールと組み合わせられる
- シークレット登録値はログで自動的に `***` にマスクされる。動的に生成した値は `echo "::add-mask::$VALUE"` で手動マスクする
- リポジトリ既定の workflow 権限が read-only の場合、`permissions` に必要な write を明示しないと API 呼び出しが 403 で失敗する。上記の `issues: write` がこれにあたる
- 外部 action は可動タグではなくコミット SHA 固定で参照する（タグは付け替え可能）
- このサンプルは `DEPLOY_TOKEN` / `API_KEY` / `DB_PASSWORD` 等が登録済みであることを前提とする。複製先で未登録のまま実行すると各ステップが失敗する
