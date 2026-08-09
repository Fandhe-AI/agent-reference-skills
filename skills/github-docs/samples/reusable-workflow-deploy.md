# Reusable Workflow for Deploy

再利用可能ワークフローを定義し、複数のリポジトリ・環境から呼び出すデプロイパターン。

```yaml
# .github/workflows/reusable-deploy.yml  （再利用可能ワークフロー側）
name: Reusable Deploy

on:
  workflow_call:
    inputs:
      environment:
        description: 'Target environment (staging or production)'
        required: true
        type: string
      version:
        description: 'Version to deploy'
        required: false
        type: string
        default: 'latest'
    secrets:
      deploy_key:
        required: true
    outputs:
      deploy_url:
        description: 'Deployed URL'
        value: ${{ jobs.deploy.outputs.url }}

jobs:
  deploy:
    runs-on: ubuntu-latest
    environment: ${{ inputs.environment }}
    outputs:
      url: ${{ steps.deploy.outputs.url }}
    steps:
      - uses: actions/checkout@11d5960a326750d5838078e36cf38b85af677262  # v4.4.0
      - id: deploy
        shell: bash
        # inputs は呼び出し元が自由に決められるため run: 本文へ式展開せず env 経由で渡す
        env:
          VERSION: ${{ inputs.version }}
          TARGET_ENV: ${{ inputs.environment }}
          DEPLOY_KEY: ${{ secrets.deploy_key }}
        run: |
          set -euo pipefail
          echo "Deploying ${VERSION} to ${TARGET_ENV}"
          echo "url=https://${TARGET_ENV}.example.com" >> "${GITHUB_OUTPUT}"
```

```yaml
# .github/workflows/release.yml  （呼び出し元側）
name: Release

on:
  push:
    tags: ['v*']

jobs:
  deploy-staging:
    uses: ./.github/workflows/reusable-deploy.yml
    with:
      environment: staging
      version: ${{ github.ref_name }}
    secrets:
      deploy_key: ${{ secrets.DEPLOY_KEY }}

  deploy-production:
    needs: deploy-staging
    uses: ./.github/workflows/reusable-deploy.yml
    with:
      environment: production
      version: ${{ github.ref_name }}
    secrets: inherit
```

## Notes

- 出力の流れはステップ出力 (`$GITHUB_OUTPUT`) -> ジョブ出力 (`outputs`) -> ワークフロー出力 (`workflow_call.outputs`) の順にマッピングが必要
- `secrets: inherit` で呼び出し元の全シークレットを一括継承できる（同じ Organization 内のワークフローに限る）
- 別リポジトリの再利用可能ワークフローを参照する場合は `owner/repo/.github/workflows/file.yml@<40 桁コミット SHA>` 形式を使う。`@main` や `@v1` などの可動 ref は付け替え可能で、参照先の改変がそのまま自リポジトリの CI で実行されるため使わない
- 再利用可能ワークフローファイルは `.github/workflows/` のルートに配置する（サブディレクトリ不可）
