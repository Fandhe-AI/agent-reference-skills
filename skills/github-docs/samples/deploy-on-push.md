# Deploy on Push to Main

main ブランチへの push 時にビルドしてデプロイ環境へ自動リリースするワークフロー。

```yaml
# .github/workflows/deploy.yml
name: Deploy

on:
  push:
    branches: [main]
    paths-ignore:
      - '**.md'

jobs:
  build:
    runs-on: ubuntu-latest
    outputs:
      artifact_name: ${{ steps.set-output.outputs.artifact_name }}

    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - run: npm ci
      - run: npm run build

      - id: set-output
        run: echo "artifact_name=dist-${{ github.sha }}" >> $GITHUB_OUTPUT

      - uses: actions/upload-artifact@v4
        with:
          name: ${{ steps.set-output.outputs.artifact_name }}
          path: dist/

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: production
      url: https://example.com

    steps:
      - uses: actions/download-artifact@v4
        with:
          name: ${{ needs.build.outputs.artifact_name }}
          path: dist/

      - run: ./scripts/deploy.sh
        env:
          DEPLOY_KEY: ${{ secrets.DEPLOY_KEY }}
```

## Notes

- `needs: build` でジョブ依存関係を定義し、build 完了後に deploy を実行する
- `environment` キーで GitHub Environments のデプロイ保護ルール（レビュー必須等）が適用される
- `paths-ignore` で Markdown 変更時のデプロイをスキップしてリソースを節約できる
- ジョブ間のデータ受け渡しには `outputs` + `upload-artifact` / `download-artifact` を組み合わせる
