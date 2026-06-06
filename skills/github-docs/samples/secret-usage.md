# Secret Usage in Workflows

シークレットをワークフローで安全に参照・管理するパターン。

```yaml
# .github/workflows/deploy.yml
name: Deploy with Secrets

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    environment: production  # 環境シークレットを有効化

    steps:
      - uses: actions/checkout@v4

      # アクションの入力としてシークレットを渡す
      - uses: some/deploy-action@v1
        with:
          token: ${{ secrets.DEPLOY_TOKEN }}

      # 環境変数経由でシークレットをシェルスクリプトに渡す（推奨）
      - name: Deploy
        run: ./scripts/deploy.sh
        env:
          API_KEY: ${{ secrets.API_KEY }}
          DB_PASSWORD: ${{ secrets.DB_PASSWORD }}

      # GITHUB_TOKEN を使った REST API 呼び出し
      - name: Create Release Comment
        run: |
          curl -X POST \
            -H "Authorization: Bearer $GH_TOKEN" \
            -H "Accept: application/vnd.github+json" \
            https://api.github.com/repos/${{ github.repository }}/issues/1/comments \
            -d '{"body":"Deployed to production!"}'
        env:
          GH_TOKEN: ${{ secrets.GITHUB_TOKEN }}

      # シークレットが設定されているかを条件に使う（直接参照は不可）
      - name: Optional step
        if: env.HAS_OPTIONAL_KEY == 'true'
        run: ./optional-integration.sh
        env:
          HAS_OPTIONAL_KEY: ${{ secrets.OPTIONAL_KEY != '' }}
          OPTIONAL_KEY: ${{ secrets.OPTIONAL_KEY }}
```

## Notes

- シークレットはコマンドライン引数に直接渡さず、必ず環境変数経由で渡す（プロセスリストに表示されるため）
- `if:` 条件でシークレットを直接参照できない。環境変数に変換してから条件に使う
- 環境シークレット（`environment` キーで有効化）はリポジトリシークレットより優先され、デプロイ保護ルールと組み合わせられる
- シークレット登録値はログで自動的に `***` にマスクされる。動的に生成した値は `echo "::add-mask::$VALUE"` で手動マスクする
