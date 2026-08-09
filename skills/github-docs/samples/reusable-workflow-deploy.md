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

permissions:
  contents: read   # 呼び出し元から継承せず、再利用可能ワークフロー側でも最小権限を明示する

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
          # 呼び出し元が制御する入力は許可リストで検証してから出力へ書く。
          # 未検証のまま単一行形式で $GITHUB_OUTPUT へ書くと、改行を含む値で
          # 任意の出力行を注入できる
          case "${TARGET_ENV}" in
            staging|production) ;;
            *) echo 'unsupported environment' >&2; exit 1 ;;
          esac
          echo "Deploying ${VERSION} to ${TARGET_ENV}"
          echo "url=https://${TARGET_ENV}.example.com" >> "${GITHUB_OUTPUT}"
```

```yaml
# .github/workflows/release.yml  （呼び出し元側）
name: Release

on:
  push:
    tags: ['v*']

permissions:
  contents: read

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
    # callee が宣言するシークレットだけを明示的に渡す。`secrets: inherit` は
    # 呼び出し元の全シークレットを一括注入するため使わない
    secrets:
      deploy_key: ${{ secrets.DEPLOY_KEY_PRODUCTION }}
```

## Notes

- 出力の流れはステップ出力 (`$GITHUB_OUTPUT`) -> ジョブ出力 (`outputs`) -> ワークフロー出力 (`workflow_call.outputs`) の順にマッピングが必要
- **シークレットは callee が宣言したものだけを個別に渡す**。`secrets: inherit` は呼び出し元の全シークレットを callee へ一括注入するため、callee が必要としない資格情報まで露出範囲が広がる。最小権限の観点から推奨しない（同一 Organization 内でのみ動作するという制約もある）
- 別リポジトリの再利用可能ワークフローを参照する場合は `owner/repo/.github/workflows/file.yml@<40 桁コミット SHA>` 形式を使う。`@main` や `@v1` などの可動 ref は付け替え可能で、参照先の改変がそのまま自リポジトリの CI で実行されるため使わない
- 再利用可能ワークフローファイルは `.github/workflows/` のルートに配置する（サブディレクトリ不可）
- 呼び出し元が渡す `inputs` は信頼できない。`$GITHUB_OUTPUT` へ書く前に許可リスト等で検証する。未検証の値を `名前=値` の単一行形式で書くと、改行を含む入力で出力行を注入できる
