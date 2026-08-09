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

permissions:
  contents: read   # 既定値に依存せず最小権限を明示する

jobs:
  build:
    runs-on: ubuntu-latest
    outputs:
      artifact_name: ${{ steps.set-output.outputs.artifact_name }}

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

      - name: Build
        shell: bash
        run: |
          set -euo pipefail
          npm run build

      - id: set-output
        shell: bash
        env:
          SHA: ${{ github.sha }}
        run: |
          set -euo pipefail
          echo "artifact_name=dist-${SHA}" >> "${GITHUB_OUTPUT}"

      - uses: actions/upload-artifact@ea165f8d65b6e75b540449e92b4886f43607fa02  # v4.6.2
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
      # ジョブ間で workspace は共有されない。deploy.sh を使うため deploy ジョブでも
      # checkout が必要（省くと `No such file or directory` で必ず失敗する）
      - uses: actions/checkout@11d5960a326750d5838078e36cf38b85af677262  # v4.4.0

      - uses: actions/download-artifact@d3f86a106a0bac45b974a628896c90dbdf5c8093  # v4.3.0
        with:
          name: ${{ needs.build.outputs.artifact_name }}
          path: dist/

      - name: Deploy
        shell: bash
        run: |
          set -euo pipefail
          ./scripts/deploy.sh
        env:
          DEPLOY_KEY: ${{ secrets.DEPLOY_KEY }}
```

## Notes

- `needs: build` でジョブ依存関係を定義し、build 完了後に deploy を実行する
- `environment` キーで GitHub Environments のデプロイ保護ルール（レビュー必須等）が適用される
- `paths-ignore` で Markdown 変更時のデプロイをスキップしてリソースを節約できる
- ジョブ間のデータ受け渡しには `outputs` + `upload-artifact` / `download-artifact` を組み合わせる
- **ジョブ間で workspace は共有されない**。後続ジョブでリポジトリ内のスクリプトや設定を使うなら、そのジョブでも `actions/checkout` を実行するか、必要なファイルを artifact に含めて受け渡す
